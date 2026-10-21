# O que funciona? / What works? — dados da seção

A seção lê arquivos pequenos em `assets/data/oqf/`, carregados sob demanda pelo navegador. Esses arquivos são **gerados** a partir das camadas de publicação das auditorias. Não edite à mão.

| Arquivo | Origem | Conteúdo |
|---|---|---|
| `manifest.js` | `prepare_data.py` | versões e SHA-256 das bases, lista de indicadores, disponibilidade por entidade e por ano |
| `series/<ENT>.js` | `prepare_data.py` | séries das entidades-piloto (BRA, DEU, FRG, GDR, SUN, RUS, UKR) |
| `world/<ISO>.js` | `prepare_data.py` | 4 indicadores comparáveis (C1) dos demais países — expansão automática, sem revisão manual |
| `world_avail.js` | `prepare_data.py` | que tipo de dado existe por país × ano × camada (modo "Disponibilidade" do mapa) |
| `values/<indicador>.js` | `prepare_data.py` | valores S/R dos 4 indicadores comparáveis entre países (modo "Valores" do mapa); sem RFA, RDA e URSS |
| `terms.js` | `prepare_data.py` | painel por mandato da Auditoria 3 (só S e R), com textos PT e EN e a série anual de cada janela (`w`) |
| `leaders.js` | `_src/oqf/leaders.js` (copiado pelo `build.py`) | lista de referência pública de governantes (a Auditoria 1 ainda está em validação) |
| `world.js` | gerado antes (Natural Earth 1:110m, Equal Earth) | geometria do mapa; fronteiras atuais, só referência visual |

## Versões integradas

- **Auditoria 2 — Prosperidade v0.2.1:** `dados/08_publicacao.csv.gz` (516.933 observações; 204.898 com `elegivel_publicacao == "sim"`).
- **Auditoria 3 — Economia v0.2:** `dados/10_publicacao.csv.gz` (781.284; 512.532 publicáveis) e `dados/11_painel_mandatos.csv`. Também `dados/entidades.csv` e `dados/12_dicionario_indicadores.csv`.

Os SHA-256 dos arquivos lidos ficam gravados no `manifest.js` e aparecem na página Metodologia.

## Regras aplicadas pelo adaptador

- Só entram observações com `elegivel_publicacao == "sim"` (categorias S e R). E e N nunca chegam ao navegador.
- Uma série original por indicador (lista `IND` no topo de `prepare_data.py`). Nada é emendado, interpolado ou recalculado.
  - A única transformação é de exibição: frações 0–1 da Auditoria 2 (pobreza, Gini) são mostradas × 100, com a unidade dizendo isso.
- Pobreza, mediana e Gini aparecem como indicadores separados para pesquisa de **renda** e de **consumo** (não são comparáveis).
- Comparação entre países só para indicadores com a mesma série para todos e `apta_comparacao_internacional == "sim"` (A3) ou comparabilidade C1 (A2). Os demais ("só no tempo") aparecem um país por vez.
- O `id_observacao` de cada ponto é preservado (8º campo de cada ponto nas séries).
- Anos com só projeção ficam marcados como `p` na disponibilidade, sem valor.
- O adaptador falha (e não grava nada inválido) se:
  - aparecer ressalva, unidade ou frase do painel sem tradução EN;
  - uma série tiver duas unidades;
  - um ponto não publicável, projetado ou de 2026 entrar numa série anual;
  - DEU antes de 1990 ou RUS/UKR antes de 1992 tiverem dado.

## Atualizar para uma versão auditada nova

1. Descompactar a nova versão de cada auditoria numa pasta (a estrutura `dados/` tem de ser a mesma).
2. Rodar o adaptador:
   ```bash
   python3 _src/oqf/prepare_data.py --a2 <pasta da Auditoria 2> --a3 <pasta da Auditoria 3>
   ```
   No fim ele imprime as contagens e `ok: testes do adaptador passaram`.
3. Se a versão mudar de nome, atualizar os textos de versão em `_src/js/data/oqf_content.js` e `_src/js/data_en/oqf_content.js` (chaves `audits`, `files`, `kpis`).
4. Se a auditoria renomear um `indicador_id` ou uma série, ajustar a lista `IND` em `prepare_data.py`. O registro de alterações de cada auditoria diz o que mudou.
5. Gerar e conferir:
   ```bash
   python3 _src/build.py --preview /tmp/previa   # cópia isolada
   python3 _src/build.py                         # produção (index.html e en/index.html)
   ```

Os componentes visuais (`_src/js/oqf.js`) não precisam mudar: eles leem tudo do manifesto.

## Testes

```bash
node _src/oqf/tests/oqf_test.mjs .                 # filtros de publicação, grupos, perguntas prontas, escalas do mapa, chaves PT/EN
python3 _src/build.py --preview /tmp/previa
node _src/oqf/tests/oqf_ui_test.mjs /tmp/previa         # interface (Playwright): comparabilidade, valores exibidos = dados, mandatos, mapa, perguntas, EN
```

O teste de interface precisa do Playwright com Chromium (`npm i playwright`).

## Onde cada coisa é organizada (Versão 2 de UX)

- Grupos dos perfis (Saúde, Educação…; Crescimento, Inflação…): `GROUPS` em `oqf.js`. Todo indicador do manifesto precisa estar em exatamente um grupo (o teste confere).
- Perguntas prontas: `QUESTIONS` em `oqf.js`; textos em `v2.questions` dos arquivos de conteúdo. O teste recusa pergunta sem dado suficiente ou que compare países num indicador sem comparabilidade internacional.
- Classes de cor do mapa de valores: `VBINS` em `oqf.js` (paleta neutra; sem verde × vermelho).
- Textos novos: bloco `v2` em `_src/js/data/oqf_content.js` e `_src/js/data_en/oqf_content.js`.

## Ponto de restauração

- `oqf-prototipo-demo`: protótipo com dados demonstrativos.
- `oqf-dados-reais-v1`: integração das Auditorias 2 e 3 (antes do refinamento de UX).
- `oqf-ux-v1-antes-redesenho`: mesmo ponto, marcado como restauração antes da Versão 2 de UX.
