# -*- coding: utf-8 -*-
"""O que funciona? — adaptador das auditorias para o site.

Lê as camadas de publicação das Auditorias 2 (Prosperidade) e 3 (Economia) e grava em
assets/data/oqf/ arquivos pequenos, carregados sob demanda pelo navegador:

  manifest.js          versões, hashes, indicadores, disponibilidade por entidade e por ano
  series/<ENT>.js      séries de cada entidade-piloto (BRA, DEU, FRG, GDR, SUN, RUS, UKR)
  world/<ISO>.js       séries resumidas dos demais países (expansão automática, sem revisão manual)
  world_avail.js       disponibilidade por país × ano × camada (pinta o mapa; não pinta valores)
  terms.js             painel por mandato da Auditoria 3 (só categorias S e R)

Regras aplicadas aqui (e testadas no fim):
  - só entram observações com elegivel_publicacao == "sim" (categorias S e R);
  - uma série original (serie_id / serie_original) por indicador e entidade; nada é emendado;
  - nenhum valor é interpolado, convertido de unidade ou recalculado (só a escala de exibição,
    declarada no indicador: fração 0–1 mostrada como %);
  - anos com só projeção ficam marcados como "p" na disponibilidade, sem valor;
  - id_observacao de cada ponto é preservado.

Uso:
  python3 _src/oqf/prepare_data.py --a2 <pasta da Auditoria 2 v0.2.1> --a3 <pasta da Auditoria 3 v0.2>
  python3 _src/build.py
"""
import argparse
import hashlib
import json
import os
import re
import shutil
import sys
from datetime import date

import pandas as pd

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
OUT = os.path.join(ROOT, "assets", "data", "oqf")
Y0, Y1 = 1945, 2026
PILOT_ENTS = ["BRA", "DEU", "FRG", "GDR", "SUN", "RUS", "UKR"]
PILOTS = ["BRA", "DEU", "RUS", "UKR"]
# entidades de cada país-piloto no mapa (nunca somadas nem emendadas)
ENTS = {"BRA": ["BRA"], "DEU": ["DEU", "FRG", "GDR"], "RUS": ["RUS", "SUN"], "UKR": ["UKR"]}

# --------------------------------------------------------------------------- indicadores
# serie: uma série original por indicador (a mesma para todas as entidades), ou dict por entidade.
# scale: multiplicador SÓ de exibição (fração 0–1 → %). dec: casas decimais na exibição.
IND = [
    # Auditoria 2 — Prosperidade
    dict(id="life_exp", audit="a2", layer="pros", pillar="saude", serie="WPP:LEx", dec=1,
         pt="Expectativa de vida ao nascer", en="Life expectancy at birth", unit_pt="anos", unit_en="years"),
    dict(id="infant", audit="a2", layer="pros", pillar="saude", serie="IGME:IMR", dec=1,
         pt="Mortalidade infantil", en="Infant mortality", unit_pt="óbitos < 1 ano por mil nascidos vivos",
         unit_en="deaths under 1 per 1,000 live births"),
    dict(id="school", audit="a2", layer="pros", pillar="educacao", serie="HDR:mys", dec=1,
         pt="Anos médios de estudo (25 anos ou mais)", en="Mean years of schooling (25+)", unit_pt="anos", unit_en="years"),
    dict(id="hdi", audit="a2", layer="pros", pillar="indice", serie="HDR:hdi", dec=3,
         pt="IDH oficial (PNUD)", en="Human Development Index (UNDP)", unit_pt="índice 0–1", unit_en="index 0–1"),
    dict(id="gdp_pc_ppp", audit="a2", layer="pros", pillar="renda", serie="PWT:rgdpe_pc", dec=0,
         pt="PIB per capita (PPC, PWT)", en="GDP per capita (PPP, PWT)",
         unit_pt="dólares de 2021 em PPC encadeada por pessoa", unit_en="2021 US$, chained PPP, per person"),
    dict(id="gni", audit="a2", layer="pros", pillar="renda", serie="HDR:gnipc", dec=0,
         pt="RNB per capita (PPC 2021, PNUD)", en="GNI per capita (2021 PPP, UNDP)",
         unit_pt="dólares internacionais de 2021 por pessoa", unit_en="2021 international dollars per person"),
    dict(id="pov_inc", audit="a2", layer="pros", pillar="pobreza", serie="PIP:hc_3_00|income|national", dec=1, scale=100,
         pt="Pobreza extrema (US$ 3,00/dia) — pesquisa de renda", en="Extreme poverty (US$3.00/day) — income survey",
         unit_pt="% da população (fonte: fração 0–1)", unit_en="% of population (source: 0–1 fraction)"),
    dict(id="pov_cons", audit="a2", layer="pros", pillar="pobreza", serie="PIP:hc_3_00|consumption|national", dec=1, scale=100,
         pt="Pobreza extrema (US$ 3,00/dia) — pesquisa de consumo", en="Extreme poverty (US$3.00/day) — consumption survey",
         unit_pt="% da população (fonte: fração 0–1)", unit_en="% of population (source: 0–1 fraction)"),
    dict(id="gini_inc", audit="a2", layer="pros", pillar="desigualdade", serie="PIP:gini|income|national", dec=1, scale=100,
         pt="Índice de Gini — renda", en="Gini index — income", unit_pt="0–100 (fonte: índice 0–1)", unit_en="0–100 (source: 0–1 index)"),
    dict(id="gini_cons", audit="a2", layer="pros", pillar="desigualdade", serie="PIP:gini|consumption|national", dec=1, scale=100,
         pt="Índice de Gini — consumo", en="Gini index — consumption", unit_pt="0–100 (fonte: índice 0–1)", unit_en="0–100 (source: 0–1 index)"),
    dict(id="median_inc", audit="a2", layer="pros", pillar="mediana", serie="PIP:median|income|national", dec=2,
         pt="Renda mediana por dia — pesquisa de renda", en="Median income per day — income survey",
         unit_pt="US$ PPC 2021 por pessoa por dia", unit_en="2021 PPP US$ per person per day"),
    dict(id="median_cons", audit="a2", layer="pros", pillar="mediana", serie="PIP:median|consumption|national", dec=2,
         pt="Consumo mediano por dia — pesquisa de consumo", en="Median consumption per day — consumption survey",
         unit_pt="US$ PPC 2021 por pessoa por dia", unit_en="2021 PPP US$ per person per day"),
    # Auditoria 3 — Economia
    dict(id="gdp_growth", audit="a3", layer="eco", pillar="atividade", serie="E05:NY.GDP.MKTP.KD.ZG", dec=1,
         pt="Crescimento do PIB real", en="Real GDP growth", unit_pt="% a.a.", unit_en="% per year"),
    dict(id="gdp_pc_growth", audit="a3", layer="eco", pillar="atividade", serie="E05:NY.GDP.PCAP.KD.ZG", dec=1,
         pt="Crescimento do PIB real per capita", en="Real GDP per capita growth", unit_pt="% a.a.", unit_en="% per year"),
    dict(id="gdp_growth_br", audit="a3", layer="eco", pillar="atividade", serie={"BRA": "E17:SCN10_PIBG10"}, dec=1,
         pt="Crescimento do PIB real — série histórica do IBGE (Brasil)", en="Real GDP growth — IBGE historical series (Brazil)",
         unit_pt="% a.a.", unit_en="% per year"),
    dict(id="inflation", audit="a3", layer="eco", pillar="precos", serie="E05:FP.CPI.TOTL.ZG", dec=1,
         pt="Inflação ao consumidor (média anual)", en="Consumer price inflation (annual average)", unit_pt="% a.a.", unit_en="% per year"),
    dict(id="ipca_br", audit="a3", layer="eco", pillar="precos", serie={"BRA": "E16:433"}, dec=1,
         pt="IPCA, dezembro a dezembro (Brasil)", en="IPCA, December to December (Brazil)", unit_pt="% no ano", unit_en="% in the year"),
    dict(id="unemp", audit="a3", layer="eco", pillar="trabalho", serie="E01:LUR", dec=1,
         pt="Taxa de desemprego (definição informada ao FMI)", en="Unemployment rate (definition reported to the IMF)",
         unit_pt="% da força de trabalho", unit_en="% of labor force"),
    dict(id="debt", audit="a3", layer="eco", pillar="fiscal", serie="E01:GGXWDG_NGDP", dec=1,
         pt="Dívida bruta do governo geral", en="General government gross debt", unit_pt="% do PIB", unit_en="% of GDP"),
    dict(id="primary", audit="a3", layer="eco", pillar="fiscal", serie="E01:GGXONLB_NGDP", dec=1,
         pt="Resultado primário do governo geral", en="General government primary balance", unit_pt="% do PIB (positivo = superávit)",
         unit_en="% of GDP (positive = surplus)"),
    dict(id="current_acc", audit="a3", layer="eco", pillar="externo", serie="E05:BN.CAB.XOKA.GD.ZS", dec=1,
         pt="Saldo em conta corrente", en="Current account balance", unit_pt="% do PIB", unit_en="% of GDP"),
    dict(id="gfcf", audit="a3", layer="eco", pillar="investimento", serie="E05:NE.GDI.FTOT.ZS", dec=1,
         pt="Investimento (formação bruta de capital fixo)", en="Investment (gross fixed capital formation)", unit_pt="% do PIB", unit_en="% of GDP"),
    dict(id="trade", audit="a3", layer="eco", pillar="externo", serie="E05:NE.TRD.GNFS.ZS", dec=1,
         pt="Comércio exterior (exportações + importações)", en="Trade (exports + imports)", unit_pt="% do PIB", unit_en="% of GDP"),
    dict(id="policy_rate", audit="a3", layer="eco", pillar="monetario", serie="E09:CBPOL", dec=2,
         pt="Taxa básica de juros (BIS)", en="Central bank policy rate (BIS)", unit_pt="% a.a. (média do ano)",
         unit_en="% per year (annual average)"),
]
# indicadores resumidos dos países fora do piloto (todos C1, mesma série para todos)
WORLD_IND = ["life_exp", "gdp_pc_ppp", "gdp_growth", "inflation"]
# nomes legíveis das fontes (só apresentação; a versão exata continua em "v")
SRC_NAME = {
    "F01": ("PNUD — Relatório de Desenvolvimento Humano", "UNDP — Human Development Report"),
    "F04": ("Penn World Table", "Penn World Table"),
    "F05": ("ONU — World Population Prospects", "UN — World Population Prospects"),
    "F06": ("Banco Mundial — WDI", "World Bank — WDI"),
    "F07": ("Banco Mundial — Plataforma de Pobreza e Desigualdade", "World Bank — Poverty and Inequality Platform"),
    "E01": ("FMI — World Economic Outlook", "IMF — World Economic Outlook"),
    "E05": ("Banco Mundial — WDI", "World Bank — WDI"),
    "E07": ("Penn World Table", "Penn World Table"),
    "E09": ("BIS — Banco de Compensações Internacionais", "BIS — Bank for International Settlements"),
    "E16": ("Banco Central do Brasil", "Central Bank of Brazil"),
    "E17": ("IPEADATA / IBGE", "IPEADATA / IBGE"),
}

TYPE = {"medido": "o", "estimado": "e", "reconstrução histórica": "r", "calculado a partir da fonte": "d", "projeção": "p"}
CAT = {"S": "P", "R": "R"}
A2_NOTE_EN = {
    "estimativa institucional, não medição direta": "institutional estimate, not a direct measurement",
    "calculado a partir de valores da mesma fonte": "computed from values of the same source",
    "proxy: não é renda disponível": "proxy: not disposable income",
    "renda e consumo não equivalentes": "income and consumption are not equivalent",
    "território atual reconstruído": "current-territory reconstruction",
    "ano da renda = ano da pesquisa − 1": "income year = survey year − 1",
    "valor de período de vários anos": "value for a multi-year period",
    "valor nominal, preços correntes": "nominal value, current prices",
}


# --------------------------------------------------------------------------- traduções do painel (A3)
def num_en(s):
    return s


TERMS_EN = [
    (r"^(\d+) dias do 1º ano da janela \((\d{4})\) sob o antecessor$", r"\1 days of the window's first year (\2) under the predecessor"),
    (r"^(\d+) dias do último ano da janela \((\d{4})\) sob o sucessor$", r"\1 days of the window's last year (\2) under the successor"),
    (r"^(\d+) dias do mandato antes da janela \(no ano (\d{4}), majoritariamente do antecessor$",
     r"\1 days of the term before the window (in \2, mostly under the predecessor"),
    (r"^ficam fora do cálculo\)$", "left out of the calculation)"),
    (r"^inclui empresas estatais no perímetro do BCB$", "includes state-owned enterprises within the central bank's perimeter"),
    (r"^mandato em curso: dados até (\d{4}) \((\d{4}) incompleto\)$", r"term in progress: data up to \1 (\2 incomplete)"),
    (r"^sinal invertido em relação à fonte \(aqui positivo = superávit\)$", "sign inverted relative to the source (here positive = surplus)"),
    (r"^valor de base ou final em ano sem PNAD \((.*)\): pode ser estimativa ou interpolação da fonte$",
     r"base or final value in a year without the PNAD survey (\1): may be an estimate or interpolation by the source"),
    (r"^(\d+)% da janela sob outro titular$", r"\1% of the window under another office-holder"),
    (r"^ano sem PNAD$", "year without the PNAD survey"),
    (r"^dias do 1º ano$", "days of the first year"),
    (r"^dias do mandato antes$", "days of the term before"),
    (r"^dias do último ano$", "days of the last year"),
    (r"^em curso$", "in progress"),
    (r"^sinal invertido$", "sign inverted"),
    (r"^série elegível, janela coberta pelo mandato, sem rupturas marcadas$", "eligible series, window covered by the term, no flagged breaks"),
    (r"^(.*) pode ser estimativa do FMI$", r"\1 may be an IMF estimate"),
    (r"^PIB real do grupo 'América Latina e Caribe' \(WEO, (G\d+), inclui o próprio país\): (-?[\d.]+)% a\.a\.$",
     r"real GDP of the 'Latin America and the Caribbean' group (WEO, \1, includes the country itself): \2% per year"),
    (r"^PIB real do grupo 'Economias avançadas' \(WEO, (G\d+), inclui o próprio país\): (-?[\d.]+)% a\.a\.$",
     r"real GDP of the 'Advanced economies' group (WEO, \1, includes the country itself): \2% per year"),
    (r"^PIB real do grupo 'Europa emergente e em desenvolvimento' \(WEO, (G\d+), inclui o próprio país\): (-?[\d.]+)% a\.a\.$",
     r"real GDP of the 'Emerging and developing Europe' group (WEO, \1, includes the country itself): \2% per year"),
    (r"^PIB real mundial \(WEO, (G\d+)\): (-?[\d.]+)% a\.a\.$", r"world real GDP (WEO, \1): \2% per year"),
    (r"^mesma janela$", "same window"),
    (r"^(\d{4})–(\d{4}): (-?[\d.]+)% a\.a\. \(composta\)$", r"\1–\2: \3% per year (compounded)"),
    (r"^(\d{4})–(\d{4}): (-?[\d.]+)% a\.a\.$", r"\1–\2: \3% per year"),
    (r"^(\d{4})–(\d{4}): ([+-][\d.]+) p\.p\.$", r"\1–\2: \3 p.p."),
    (r"^acumulada: (.*)$", r"cumulative: \1"),
    (r"^anualizada: fator\^\(1/n\) − 1 \(não é a soma das taxas\)$", "annualized: factor^(1/n) − 1 (not the sum of the rates)"),
    (r"^composição das taxas anuais (\d{4})–(\d{4}): (.*)$", r"compounding of the annual rates \1–\2: \3"),
    (r"^diferença em pontos percentuais: (.*)$", r"difference in percentage points: \1"),
    (r"^média dos anos (\d{4})–(\d{4}) \(fluxo anual\) e diferença (.*) em p\.p\.$", r"average of the years \1–\2 (annual flow) and difference \3 in p.p."),
    (r"^taxa anualizada geométrica: (.*)$", r"geometric annualized rate: \1"),
    (r"^volatilidade: desvio-padrão das taxas anuais$", "volatility: standard deviation of the annual rates"),
]


def tr_terms(txt):
    """Traduz o vocabulário fechado dos campos de texto do painel. Falha se aparecer frase nova."""
    if not txt:
        return ""
    out = []
    for part in txt.split("; "):
        for pat, rep in TERMS_EN:
            if re.match(pat, part):
                out.append(re.sub(pat, rep, part))
                break
        else:
            raise SystemExit("prepare_data: frase do painel sem tradução EN: " + part)
    return "; ".join(out)


# --------------------------------------------------------------------------- utilidades
def sha(path):
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for b in iter(lambda: f.read(1 << 20), b""):
            h.update(b)
    return h.hexdigest()


def js(path, call, obj):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w") as f:
        f.write("/* gerado por _src/oqf/prepare_data.py — não editar à mão */\n")
        f.write(call + "(" + json.dumps(obj, ensure_ascii=False, separators=(",", ":")) + ");\n")


def num(v, d):
    """Valor exatamente como publicado na camada da auditoria (sem arredondar; a exibição arredonda)."""
    return float(v)


def serie_for(ind, ent):
    s = ind["serie"]
    return s.get(ent) if isinstance(s, dict) else s


def read_a2(a2):
    cols = ["id_observacao", "entity_id", "ano", "valor", "unidade", "fonte_id", "versao_fonte", "serie_id", "rotulo_visual_pt",
            "confiabilidade", "comparabilidade", "status_territorial", "ressalvas", "elegivel_publicacao", "codigo_categoria"]
    d = pd.read_csv(os.path.join(a2, "dados", "08_publicacao.csv.gz"), dtype=str, keep_default_na=False, usecols=cols)
    d = d.rename(columns={"serie_id": "serie"})
    d["comp"] = d.comparabilidade.str[:2]
    d["apta"] = (d.comp == "C1") & d.codigo_categoria.isin(["S", "R"])
    d["ressalvas_en"] = d.ressalvas.map(lambda r: "; ".join(A2_NOTE_EN.get(x, x) for x in r.split("; ")) if r else "")
    unk = {x for r in d[d.elegivel_publicacao == "sim"].ressalvas for x in (r.split("; ") if r else []) if x not in A2_NOTE_EN}
    d["audit"] = "a2"
    return d, unk


def read_a3(a3):
    cols = ["id_observacao", "entity_id", "ano", "freq", "valor", "unidade", "fonte_id", "versao_fonte", "serie_original",
            "rotulo_visual_pt", "confiabilidade", "comparabilidade", "status_territorial", "ressalvas", "ressalvas_en",
            "elegivel_publicacao", "codigo_categoria", "apta_comparacao_internacional"]
    d = pd.read_csv(os.path.join(a3, "dados", "10_publicacao.csv.gz"), dtype=str, keep_default_na=False, usecols=cols)
    d = d[d.freq == "A"].rename(columns={"serie_original": "serie"})
    d["comp"] = d.comparabilidade.str[:2]
    d["apta"] = d.apta_comparacao_internacional == "sim"
    d["audit"] = "a3"
    return d


# --------------------------------------------------------------------------- principal
def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--a2", required=True, help="pasta da Auditoria 2 v0.2.1 (contém dados/08_publicacao.csv.gz)")
    ap.add_argument("--a3", required=True, help="pasta da Auditoria 3 v0.2 (contém dados/10_publicacao.csv.gz)")
    a = ap.parse_args()
    f2 = os.path.join(a.a2, "dados", "08_publicacao.csv.gz")
    f3 = os.path.join(a.a3, "dados", "10_publicacao.csv.gz")
    f3p = os.path.join(a.a3, "dados", "11_painel_mandatos.csv")
    for f in (f2, f3, f3p):
        if not os.path.exists(f):
            raise SystemExit("arquivo não encontrado: " + f)
    d2, unk = read_a2(a.a2)
    if unk:
        raise SystemExit("ressalvas da Auditoria 2 sem tradução EN: %s" % sorted(unk))
    d3 = read_a3(a.a3)
    allobs = pd.concat([d2, d3], ignore_index=True)
    allobs["y"] = allobs.ano.astype(int)
    pub = allobs[(allobs.elegivel_publicacao == "sim") & allobs.codigo_categoria.isin(["S", "R"])]
    proj = allobs[allobs.rotulo_visual_pt == "projeção"]
    ents_tab = pd.read_csv(os.path.join(a.a3, "dados", "entidades.csv"), dtype=str, keep_default_na=False)
    universe = set(ents_tab.entity_id)

    if os.path.isdir(os.path.join(OUT, "series")):
        shutil.rmtree(os.path.join(OUT, "series"))
    if os.path.isdir(os.path.join(OUT, "world")):
        shutil.rmtree(os.path.join(OUT, "world"))

    by_serie = {k: g for k, g in pub.groupby("serie")}
    ind_out, ent_out, report = [], {}, []
    for I in IND:
        series = set([I["serie"]] if isinstance(I["serie"], str) else I["serie"].values())
        rows = pd.concat([by_serie[s] for s in series if s in by_serie]) if any(s in by_serie for s in series) else pub.iloc[0:0]
        if rows.empty:
            raise SystemExit("série sem observação publicável: " + str(series))
        units = rows.unidade.unique().tolist()
        if len(units) != 1 and isinstance(I["serie"], str):
            raise SystemExit("série com mais de uma unidade: %s %s" % (I["serie"], units))
        vers = sorted(set(rows.fonte_id + " · " + rows.versao_fonte))
        intl = isinstance(I["serie"], str) and bool(rows.apta.all())
        ind_out.append(dict(id=I["id"], audit=I["audit"], layer=I["layer"], pillar=I["pillar"], pt=I["pt"], en=I["en"],
                            unit_pt=I["unit_pt"], unit_en=I["unit_en"], unit_src=units[0], scale=I.get("scale", 1), dec=I["dec"],
                            intl=intl, only=(list(I["serie"].keys()) if isinstance(I["serie"], dict) else None),
                            serie=(I["serie"] if isinstance(I["serie"], str) else ", ".join(sorted(series))), src=" | ".join(vers)))

    def pack(ent, ids):
        data, meta = {}, {}
        for I in IND:
            if I["id"] not in ids:
                continue
            s = serie_for(I, ent)
            if not s or s not in by_serie:
                continue
            g = by_serie[s]
            g = g[g.entity_id == ent].sort_values("y")
            if g.empty:
                continue
            assert not g.y.duplicated().any(), (ent, s)
            notes, pts = [], []
            for r in g.itertuples():
                key = (r.ressalvas, r.ressalvas_en)
                if key not in notes:
                    notes.append(key)
                pts.append([int(r.y), num(r.valor, I["dec"]), TYPE.get(r.rotulo_visual_pt, "o"), r.confiabilidade, r.comp,
                            CAT[r.codigo_categoria], notes.index(key), r.id_observacao])
            data[I["id"]] = pts
            fn = SRC_NAME.get(g.fonte_id.iloc[0], (g.fonte_id.iloc[0], g.fonte_id.iloc[0]))
            meta[I["id"]] = dict(s=s, f=g.fonte_id.iloc[0], v=g.versao_fonte.iloc[0], u=g.unidade.iloc[0], fn=fn[0], fn_en=fn[1],
                                 intl=bool(g.apta.all()), notes=[list(k) for k in notes])
        return data, meta

    def avail(ent):
        out = {}
        for layer in ("pros", "eco"):
            ids = {I["id"] for I in IND if I["layer"] == layer}
            sers = {serie_for(I, ent) for I in IND if I["id"] in ids} - {None}
            sub = pub[(pub.entity_id == ent) & pub.serie.isin(sers)]
            pj = proj[(proj.entity_id == ent) & proj.serie.isin(sers)]
            best = {}
            for y, c in zip(sub.y, sub.codigo_categoria):
                if y < Y0 or y > Y1:
                    continue
                if best.get(y) != "S":
                    best[y] = c
            s = ""
            for y in range(Y0, Y1 + 1):
                s += {"S": "P", "R": "R"}.get(best.get(y), "p" if y in set(pj.y) else "-")
            out[layer] = s
        return out

    # entidades-piloto
    for e in PILOT_ENTS:
        data, meta = pack(e, {I["id"] for I in IND})
        js(os.path.join(OUT, "series", e + ".js"), "OQF.register", {"entity": e, "mode": "real", "ind": data, "meta": meta})
        ent_out[e] = dict(file="series/%s.js" % e, avail=avail(e), n=sum(len(v) for v in data.values()), ind=sorted(data))
        report.append((e, ent_out[e]["n"], len(data)))

    # países fora do piloto: só indicadores C1 comuns, marcados como expansão automática
    world_ent = sorted(x for x in pub.entity_id.unique() if x in universe and x not in PILOT_ENTS)
    wav = {}
    for e in world_ent:
        data, meta = pack(e, set(WORLD_IND))
        if data:
            js(os.path.join(OUT, "world", e + ".js"), "OQF.register", {"entity": e, "mode": "auto", "ind": data, "meta": meta})
        av = avail(e)
        wav[e] = dict(f=("world/%s.js" % e) if data else None, pros=av["pros"], eco=av["eco"], n=sum(len(v) for v in data.values()))
    js(os.path.join(OUT, "world_avail.js"), "OQF.worldAvail", {"y0": Y0, "y1": Y1, "c": wav})

    # valores para o modo "Valores" do mapa: só indicadores C1 (mesma série para todos), só S e R,
    # só observações aptas à comparação internacional. a = 1 marca expansão automática (fora do piloto).
    for iid in WORLD_IND:
        I = next(x for x in IND if x["id"] == iid)
        g = by_serie[I["serie"]]
        g = g[g.apta & g.entity_id.isin([e for e in universe if e not in ("FRG", "GDR", "SUN", "SUN-RSFSR", "UKR-SSR", "DEU-OCUP")])]
        vals = {}
        for e, h in g.groupby("entity_id"):
            vals[e] = [[int(r.y), num(r.valor, I["dec"]), CAT[r.codigo_categoria]] for r in h.sort_values("y").itertuples()]
        js(os.path.join(OUT, "values", iid + ".js"), "OQF.values", {"id": iid, "serie": I["serie"], "pilots": PILOTS, "c": vals})

    # painel por mandato (A3, só S e R)
    pn = pd.read_csv(f3p, dtype=str, keep_default_na=False)
    pn = pn[pn.codigo_categoria.isin(["S", "R"])]
    dic = pd.read_csv(os.path.join(a.a3, "dados", "12_dicionario_indicadores.csv"), dtype=str, keep_default_na=False)
    PNAME = {
        "pib_real": ("PIB real", "Real GDP"), "pib_real_per_capita": ("PIB real per capita", "Real GDP per capita"),
        "inflacao_consumidor": ("Inflação ao consumidor", "Consumer price inflation"), "igp_di_variacao": ("IGP-DI (Brasil)", "IGP-DI (Brazil)"),
        "desemprego_weo": ("Desemprego (definição informada ao FMI)", "Unemployment (definition reported to the IMF)"),
        "desemprego_estimativa_nacional_wdi": ("Desemprego (estimativa nacional, WDI)", "Unemployment (national estimate, WDI)"),
        "divida_bruta_governo_geral_pib": ("Dívida bruta do governo geral", "General government gross debt"),
        "divida_liquida_setor_publico_pib": ("Dívida líquida do setor público (Brasil)", "Public sector net debt (Brazil)"),
        "resultado_primario_governo_geral_pib": ("Resultado primário do governo geral", "General government primary balance"),
        "resultado_primario_setor_publico_consolidado_pib": ("Resultado primário do setor público consolidado (Brasil)",
                                                             "Consolidated public sector primary balance (Brazil)"),
        "conta_corrente_pib": ("Conta corrente", "Current account"), "fbcf_pib": ("Investimento (FBCF)", "Investment (GFCF)"),
        "taxa_politica_monetaria": ("Taxa básica de juros", "Policy interest rate"),
        "produtividade_por_ocupado": ("Produtividade por ocupado", "Output per worker"),
    }
    UNIT_EN = {"índice": "index", "índice (2025 = 1)": "index (2025 = 1)", "US$ de 2021 (PPC)": "2021 US$ (PPP)", "% do PIB": "% of GDP",
               "US$ de 2015": "2015 US$", "% da força de trabalho": "% of labor force", "% a.a.": "% per year", "% ao ano": "% per year",
               "% a.a. (média do ano)": "% per year (annual average)", "dólares internacionais de 2021": "2021 international dollars", "moeda nacional": "national currency", "moeda nacional (ano-base do país)": "national currency (country base year)"}
    terms = {}

    def window_series(ent, serie, y0, y1):
        """Série original do cálculo (só S e R), da base − 5 ao final + 3 (até 2025), para o gráfico do mandato."""
        g = by_serie.get(serie)
        if g is None:
            g = by_serie.get(serie + "|sinal_invertido")
        if g is None:
            return []
        g = g[(g.entity_id == ent) & (g.y >= y0 - 5) & (g.y <= min(2025, y1 + 3))].sort_values("y")
        return [[int(x.y), float(x.valor), CAT[x.codigo_categoria]] for x in g.itertuples()]
    missing_u = set()
    for r in pn.itertuples():
        if r.indicador_id not in PNAME:
            raise SystemExit("indicador do painel sem nome: " + r.indicador_id)
        if r.unidade not in UNIT_EN:
            missing_u.add(r.unidade)
        terms.setdefault(r.entity_id, []).append(dict(
            g=r.governante_id, n=r.governante, a=r.inicio_mandato, b=r.fim_mandato, i=r.indicador_id,
            ipt=PNAME[r.indicador_id][0], ien=PNAME[r.indicador_id][1], s=r.serie, u=r.unidade, uen=UNIT_EN.get(r.unidade, r.unidade),
            t=r.tipo_calculo, y0=r.observacao_base_ano, y1=r.observacao_final_ano, v0=r.valor_base, v1=r.valor_final,
            var=r.variacao, acc=r.variacao_acumulada, avg=r.media_periodo, vol=r.volatilidade_desvio_padrao,
            cov=r.proporcao_mandato_coberta, out=r.dias_janela_fora_do_mandato,
            rule=r.regra_calculo, rule_en=tr_terms(r.regra_calculo), lim=r.limites_comparacao, lim_en=tr_terms(r.limites_comparacao),
            ad=r.adequacao_comparacao, adm=r.motivo_adequacao, adm_en=tr_terms(r.motivo_adequacao),
            pre=r.tendencia_previa, pre_en=tr_terms(r.tendencia_previa), ctx=r.contexto_mundial_e_pares, ctx_en=tr_terms(r.contexto_mundial_e_pares),
            alt=[[k, getattr(r, "janela_" + k), getattr(r, "valor_" + k)] for k in ("B", "C", "E", "M") if getattr(r, "janela_" + k)],
            w=window_series(r.entity_id, r.serie, int(r.observacao_base_ano), int(r.observacao_final_ano)),
            rob=r.robusto_entre_janelas_anuais == "sim", altdiff=r.janelas_alternativas_materialmente_diferentes,
            mdiff=r.mensal_materialmente_diferente, cat=CAT[r.codigo_categoria]))
    if missing_u:
        raise SystemExit("unidades do painel sem tradução: %s" % sorted(missing_u))
    for k in terms:
        terms[k].sort(key=lambda x: (x["a"], x["ipt"]))
    js(os.path.join(OUT, "terms.js"), "OQF.terms", {"source": "Auditoria 3 v0.2 · dados/11_painel_mandatos.csv", "rows": terms})

    def version(base, man):
        p = os.path.join(base, man)
        return os.path.basename(man).replace("MANIFESTO_", "").replace(".md", "") if os.path.exists(p) else None

    manifest = dict(
        mode="real", generated=str(date.today()), y0=Y0, y1=Y1,
        label_pt="Dados reais das Auditorias 2 (Prosperidade v0.2.1) e 3 (Economia v0.2), camadas de publicação: só observações S e R.",
        label_en="Real data from Audits 2 (Prosperity v0.2.1) and 3 (Economy v0.2), publication layers: S and R observations only.",
        a2=dict(version=version(a.a2, "MANIFESTO_v0.2.1.md") or "v0.2.1", files=["dados/08_publicacao.csv.gz"], sha256=sha(f2),
                rows=int(len(d2)), publishable=int((d2.elegivel_publicacao == "sim").sum())),
        a3=dict(version=version(a.a3, "MANIFESTO_v0.2.md") or "v0.2", files=["dados/10_publicacao.csv.gz", "dados/11_painel_mandatos.csv"],
                sha256=sha(f3), sha256_panel=sha(f3p),
                rows=int(len(pd.read_csv(f3, usecols=["id_observacao"]))), publishable=int((d3.elegivel_publicacao == "sim").sum())),
        indicators=ind_out, entities=ent_out, world_file="world_avail.js", terms_file="terms.js", world_ind=WORLD_IND,
        governments={})
    js(os.path.join(OUT, "manifest.js"), "OQF.manifest", manifest)

    # ---------------------------------------------------------------- testes
    fails = []
    # valores gravados = valores das camadas de publicação (nenhum valor alterado)
    src_val = dict(zip(pub.id_observacao, pub.valor.astype(float)))
    for folder in ("series", "world"):
        for fn in os.listdir(os.path.join(OUT, folder)):
            txt = open(os.path.join(OUT, folder, fn)).read()
            obj = json.loads(txt[txt.index("(") + 1: txt.rindex(")")])
            for k, pts in obj["ind"].items():
                for p in pts:
                    v = src_val.get(p[7])
                    if v is None or v != p[1]:
                        fails.append("valor diferente da fonte %s %s %s" % (fn, k, p[7]))
                        break
    for e in PILOT_ENTS:
        txt = open(os.path.join(OUT, "series", e + ".js")).read()
        obj = json.loads(txt[txt.index("(") + 1: txt.rindex(")")])
        for k, pts in obj["ind"].items():
            ys = [p[0] for p in pts]
            if len(ys) != len(set(ys)):
                fails.append("ano repetido %s %s" % (e, k))
            if any(p[5] not in ("P", "R") for p in pts):
                fails.append("categoria não publicável %s %s" % (e, k))
            if any(p[2] == "p" for p in pts):
                fails.append("projeção como dado %s %s" % (e, k))
            if any(p[0] > 2025 for p in pts):
                fails.append("ano 2026 como dado anual %s %s" % (e, k))
            ids = {p[7] for p in pts}
            okids = set(pub[pub.entity_id == e].id_observacao)
            if not ids <= okids:
                fails.append("id fora da camada publicável %s %s" % (e, k))
    for e, lim in (("DEU", 1989), ("RUS", 1991), ("UKR", 1991)):
        txt = open(os.path.join(OUT, "series", e + ".js")).read()
        obj = json.loads(txt[txt.index("(") + 1: txt.rindex(")")])
        if any(p[0] <= lim for pts in obj["ind"].values() for p in pts):
            fails.append("%s com dado até %d (antes da condição de Estado)" % (e, lim))
    for e in ("GDR", "SUN"):
        if ent_out[e]["n"]:
            fails.append("%s com dado publicado (não há série publicável esperada)" % e)
    for k, rows in terms.items():
        if any(r["cat"] not in ("P", "R") for r in rows):
            fails.append("painel com categoria E/N")
    for line in report:
        print("  %-4s %5d pontos em %2d indicadores" % line)
    print("  mundo: %d países com disponibilidade, %d com séries resumidas" % (len(wav), sum(1 for v in wav.values() if v["f"])))
    print("  painel: %d linhas S/R" % sum(len(v) for v in terms.values()))
    if fails:
        raise SystemExit("FALHAS:\n" + "\n".join(fails))
    print("ok: testes do adaptador passaram")


if __name__ == "__main__":
    main()
