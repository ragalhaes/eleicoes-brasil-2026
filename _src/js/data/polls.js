/* =========================================================
   PESQUISAS ELEITORAIS — 10-pesquisas-base-metodologia.md
   Snapshot: última pesquisa nacional válida de cada instituto.
   Nova pesquisa do mesmo instituto: marque a anterior latest:false
   e adicione a nova com latest:true (histórico preservado).
   null = campo ainda não preenchido no conteúdo-base.
   ========================================================= */
window.EB = window.EB || {};

EB.pollsMeta = {
  last_updated: "2026-09-30",
  year: 2026,
  candidates_1t: ["lula", "flavio-bolsonaro", "augusto-cury", "ronaldo-caiado", "renan-santos", "romeu-zema"],
  short: { "lula": "Lula", "flavio-bolsonaro": "Flávio", "augusto-cury": "Cury", "ronaldo-caiado": "Caiado", "renan-santos": "Renan", "romeu-zema": "Zema" },
  legend_avg: "Média simples da pesquisa mais recente de cada instituto. Não é previsão eleitoral.",
  history_note: "CNT/MDA fica no histórico: a rodada de 9 a 13/09/2026 usou uma lista de candidatos diferente da registrada nas rodadas mais recentes (incluía Pablo Marçal pelo PRTB, hoje representado por Leonardo Avalanche). Meio/Ideia passou a integrar o snapshot com a rodada de 25 a 28/09/2026. Rodadas anteriores de cada instituto serão adicionadas à série temporal.",
  history_excluded: ["CNT/MDA"],
  rules: [
    "Nova pesquisa do mesmo instituto substitui a anterior no snapshot; a antiga continua no histórico.",
    "Não ponderar por frequência de publicação.",
    "Não ponderar automaticamente por tamanho de amostra na média descritiva.",
    "Não misturar votos válidos com intenção de voto bruta.",
    "Não misturar primeiro e segundo turno.",
    "Não misturar pesquisa com mercado de previsão.",
    "Não chamar de “empate técnico” por cálculo próprio: usar a classificação do instituto ou exibir percentuais + margem.",
    "Rejeição fica por instituto, sem média global, porque as perguntas variam entre institutos.",
    "A média descritiva não recebe margem de erro própria sem modelo estatístico específico."
  ]
};

/* Campos seguem a estrutura sugerida no arquivo 10. */
function P(o) {
  return Object.assign({
    contratante: null, registro_tse: null, data_publicacao: null, nivel_confianca: null,
    cenario: null, pergunta_exata: null, branco_nulo: null, indeciso: null,
    source_primary: null, source_secondary: null, data_quality_flag: null, latest: true,
    rejeicao_pergunta: null, last_updated: "2026-09-30"
  }, o);
}

EB.polls = [
  P({ poll_id: "meio-ideia-2026-09-28", instituto: "Meio/Ideia", contratante: "Canal Meio", registro_tse: "BR-08706/2026", data_publicacao: "2026-09-30",
      campo_inicio: "2026-09-25", campo_fim: "2026-09-28", amostra: 2000, metodo: "telefone", margem_erro: 2.2, nivel_confianca: "95%", cenario: "Estimulado, 1º turno",
      r1: { "lula": 39.4, "flavio-bolsonaro": 38.4, "augusto-cury": 6.7, "ronaldo-caiado": 4.4, "renan-santos": 4.5, "romeu-zema": 3.5 },
      outros: "Samara Martins (UP) 0,4%; Clariana Barão (DC) 0,3%; Hertz Dias (PSTU) 0,3%; Wilson Grassi (Democrata), Leonardo Avalanche (PRTB), Rui Costa Pimenta (PCO) e Edmilson Costa (PCB) 0,1% cada",
      branco_nulo: "0,7%", indeciso: "1,5%",
      r2: { a: "lula", b: "flavio-bolsonaro", a_pct: 48.5, b_pct: 48 },
      rej: null,
      source_primary: "Ideia / Canal Meio — divulgação de 30/09/2026 (registro TSE BR-08706/2026)",
      source_secondary: "Gazeta do Povo; Bahia Econômica; Agora RN (30/09/2026)" }),
  P({ poll_id: "gerp-2026-09-28", instituto: "Gerp", campo_inicio: "2026-09-24", campo_fim: "2026-09-28", amostra: 2400, metodo: "telefone", margem_erro: 2.0,
      r1: { "lula": 40, "flavio-bolsonaro": 42, "augusto-cury": 5, "ronaldo-caiado": 3, "renan-santos": 3, "romeu-zema": 1 },
      r2: { a: "lula", b: "flavio-bolsonaro", a_pct: 43, b_pct: 50 },
      rej: { "lula": 50, "flavio-bolsonaro": 42 } }),
  P({ poll_id: "futura-2026-09-23", instituto: "Futura / 100% Cidades", campo_inicio: "2026-09-19", campo_fim: "2026-09-23", amostra: 2000, metodo: "telefone", margem_erro: 2.2,
      r1: { "lula": 38.4, "flavio-bolsonaro": 40.4, "augusto-cury": 5.6, "ronaldo-caiado": 5.7, "renan-santos": 2.4, "romeu-zema": 0.9 },
      r2: { a: "lula", b: "flavio-bolsonaro", a_pct: 43.7, b_pct: 49.4 },
      rej: { "lula": 50.3, "flavio-bolsonaro": 44.6 } }),
  P({ poll_id: "poderdata-2026-09-23", instituto: "PoderData / Aya", campo_inicio: "2026-09-20", campo_fim: "2026-09-23", amostra: 3000, metodo: "telefone", margem_erro: 1.8,
      r1: { "lula": 41, "flavio-bolsonaro": 39, "augusto-cury": 6, "ronaldo-caiado": 2, "renan-santos": 3, "romeu-zema": 1 },
      r2: { a: "lula", b: "flavio-bolsonaro", a_pct: 45, b_pct: 46 },
      rej: null }),
  P({ poll_id: "quaest-2026-09-27", instituto: "Quaest", campo_inicio: "2026-09-24", campo_fim: "2026-09-27", amostra: 2004, metodo: "presencial", margem_erro: 2.0,
      r1: { "lula": 39, "flavio-bolsonaro": 34, "augusto-cury": 4, "ronaldo-caiado": 4, "renan-santos": 3, "romeu-zema": 1 },
      r2: { a: "lula", b: "flavio-bolsonaro", a_pct: 42, b_pct: 42 },
      rej: { "lula": 55, "flavio-bolsonaro": 56 } }),
  P({ poll_id: "american-analytics-2026-09-20", instituto: "American Analytics / Times Brasil-CNBC", campo_inicio: "2026-09-15", campo_fim: "2026-09-20", amostra: 2000, metodo: null, margem_erro: 2.5,
      r1: { "lula": 38, "flavio-bolsonaro": 34, "augusto-cury": 5, "ronaldo-caiado": 4, "renan-santos": 4, "romeu-zema": 1 },
      r2: { a: "lula", b: "flavio-bolsonaro", a_pct: 43, b_pct: 43 },
      rej: { "lula": 51, "flavio-bolsonaro": 50 } }),
  P({ poll_id: "atlasintel-2026-09-28", instituto: "AtlasIntel / Bloomberg", campo_inicio: "2026-09-23", campo_fim: "2026-09-28", amostra: 5005, metodo: "digital", margem_erro: 1.0,
      r1: { "lula": 45.3, "flavio-bolsonaro": 42.2, "augusto-cury": 2.0, "ronaldo-caiado": 1.8, "renan-santos": 5.2, "romeu-zema": 0.9 },
      r2: { a: "lula", b: "flavio-bolsonaro", a_pct: 47.6, b_pct: 47.7 },
      rej: null }),
  P({ poll_id: "nexus-btg-2026-09-27", instituto: "Nexus / BTG", campo_inicio: "2026-09-25", campo_fim: "2026-09-27", amostra: 2000, metodo: "telefone/CATI", margem_erro: 2.0,
      r1: { "lula": 42, "flavio-bolsonaro": 37, "augusto-cury": 5, "ronaldo-caiado": 5, "renan-santos": 4, "romeu-zema": 1 },
      r2: { a: "lula", b: "flavio-bolsonaro", a_pct: 46, b_pct: 44 },
      rej: { "lula": 48, "flavio-bolsonaro": 51 } }),
  P({ poll_id: "datafolha-2026-09-23", instituto: "Datafolha", campo_inicio: "2026-09-22", campo_fim: "2026-09-23", amostra: 2002, metodo: "presencial", margem_erro: 2.0,
      r1: { "lula": 40, "flavio-bolsonaro": 36, "augusto-cury": 5, "ronaldo-caiado": 4, "renan-santos": 3, "romeu-zema": 1 },
      r2: { a: "lula", b: "flavio-bolsonaro", a_pct: 47, b_pct: 45 },
      rej: { "lula": 45, "flavio-bolsonaro": 45 } }),
  P({ poll_id: "realtime-2026-09-23", instituto: "Real Time Big Data", campo_inicio: "2026-09-19", campo_fim: "2026-09-23", amostra: 2000, metodo: "telefone + digital", margem_erro: 2.0,
      r1: { "lula": 41, "flavio-bolsonaro": 37, "augusto-cury": 6, "ronaldo-caiado": 2, "renan-santos": 6, "romeu-zema": 1 },
      r2: { a: "lula", b: "flavio-bolsonaro", a_pct: 44, b_pct: 45 },
      rej: { "lula": 50, "flavio-bolsonaro": 49 } }),
  P({ poll_id: "vox-2026-09-28", instituto: "Vox Brasil", campo_inicio: "2026-09-26", campo_fim: "2026-09-28", amostra: 2100, metodo: "presencial domiciliar", margem_erro: 2.15,
      r1: { "lula": 41.1, "flavio-bolsonaro": 37.8, "augusto-cury": 2.2, "ronaldo-caiado": 3.8, "renan-santos": 2.7, "romeu-zema": 1.8 },
      r2: { a: "lula", b: "flavio-bolsonaro", a_pct: 44.7, b_pct: 45.2 },
      rej: { "lula": 51.5, "flavio-bolsonaro": 53.1 } }),
  P({ poll_id: "palver-2026-09-27", instituto: "Palver", campo_inicio: "2026-09-24", campo_fim: "2026-09-27", amostra: 5000, metodo: "online", margem_erro: 2.4,
      r1: { "lula": 44, "flavio-bolsonaro": 44, "augusto-cury": 1, "ronaldo-caiado": 1, "renan-santos": 8, "romeu-zema": 1 },
      r2: { a: "lula", b: "flavio-bolsonaro", a_pct: 45, b_pct: 47 },
      rej: { "lula": 51, "flavio-bolsonaro": 48 } }),
  P({ poll_id: "alfa-2026-09-23", instituto: "Alfa Inteligência", campo_inicio: "2026-09-18", campo_fim: "2026-09-23", amostra: 2700, metodo: null, margem_erro: 1.8,
      r1: { "lula": 40, "flavio-bolsonaro": 33, "augusto-cury": 6, "ronaldo-caiado": 5, "renan-santos": 3, "romeu-zema": 1 },
      r2: { a: "lula", b: "flavio-bolsonaro", a_pct: 43, b_pct: 43 },
      rej: null })
];

/* Média de referência atualizada em 30/09/2026 (13 institutos) — o site recalcula e confere. */
EB.pollsPublishedAvg = {
  r1: { "lula": 40.71, "flavio-bolsonaro": 38.06, "augusto-cury": 4.58, "renan-santos": 3.98, "ronaldo-caiado": 3.52, "romeu-zema": 1.24 },
  r2: { "lula": 44.81, "flavio-bolsonaro": 45.79 }
};

/* =========================================================
   2º TURNO (25/10/2026) — adicionado em 12/10/2026
   Resultado oficial do 1º turno + pesquisas nacionais de 2º turno
   feitas DEPOIS de 4/10. Média = votos válidos (único número que
   todos os institutos divulgaram); votos totais ficam na ficha.
   ========================================================= */
EB.result1t = {
  date: "2026-10-04",
  status: "100% das seções totalizadas",
  source: "TSE — totalização com 100% das seções, conforme divulgado por DGABC/Folha de Pernambuco e CartaCapital (05/10/2026).",
  runoff: ["flavio-bolsonaro", "lula"],
  rows: [
    { id: "flavio-bolsonaro", name: "Flávio Bolsonaro", party: "PL", votes: 56104503, pct: 47.03 },
    { id: "lula", name: "Lula", party: "PT", votes: 53879538, pct: 45.16 },
    { id: "augusto-cury", name: "Augusto Cury", party: "Avante", votes: 3448569, pct: 2.89 },
    { id: "renan-santos", name: "Renan Santos", party: "Missão", votes: 2675887, pct: 2.24 },
    { id: "ronaldo-caiado", name: "Ronaldo Caiado", party: "PSD", votes: 2605148, pct: 2.18 },
    { id: "romeu-zema", name: "Romeu Zema", party: "Novo", votes: 326488, pct: 0.27 },
    { id: null, name: "Samara Martins", party: "UP", votes: 122911, pct: 0.10 },
    { id: null, name: "Hertz Dias", party: "PSTU", votes: 43103, pct: 0.04 },
    { id: null, name: "Clariana Barão", party: "DC", votes: 40043, pct: 0.03 },
    { id: null, name: "Edmilson Costa", party: "PCB", votes: 22693, pct: 0.02 },
    { id: null, name: "Wilson Grassi", party: "Democrata", votes: 16881, pct: 0.01 },
    { id: null, name: "Rui Costa Pimenta", party: "PCO", votes: 15024, pct: 0.01 }
  ],
  totals: [
    ["Votos válidos", "119.300.788"],
    ["Brancos", "2.300.798 (1,84% dos que compareceram)"],
    ["Nulos", "3.674.249 (2,93% dos que compareceram)"],
    ["Comparecimento", "125.275.835 de 158.745.502 eleitores aptos"],
    ["Abstenção", "33.469.244 (21,08%) — a maior desde 1998, segundo a apuração divulgada"]
  ]
};

EB.polls2tMeta = {
  last_updated: "2026-10-19",
  runoff_date: "2026-10-25",
  a: "lula", b: "flavio-bolsonaro",
  legend_avg: "Média simples, em votos válidos, da pesquisa nacional mais recente de cada instituto feita depois do 1º turno. Não é previsão nem probabilidade de vitória.",
  rules: [
    "Só pesquisas nacionais de 2º turno com registro no TSE e campo iniciado depois do 1º turno (4/10/2026).",
    "A média usa votos válidos (sem brancos, nulos e indecisos), porque é o único número que todos os institutos divulgaram. Votos totais aparecem na ficha quando publicados.",
    "Simulações de 2º turno feitas antes de 4/10 ficam no snapshot do 1º turno, como registro.",
    "Nova rodada do mesmo instituto substitui a anterior na média; a antiga fica no histórico.",
    "Sem classificação própria de “empate técnico”: compare os percentuais com a margem de cada instituto."
  ]
};

/* va/vb = votos válidos (Lula / Flávio). ta/tb = votos totais, quando divulgados. */
EB.polls2t = [
  P({ poll_id: "poderdata-2026-10-18", instituto: "PoderData / Aya", contratante: "o próprio instituto", registro_tse: "BR-02586/2026", data_publicacao: "2026-10-19",
      campo_inicio: "2026-10-16", campo_fim: "2026-10-18", amostra: 3000, metodo: "telefone (URA)", margem_erro: 1.8, nivel_confianca: "95%", cenario: "Estimulado, 2º turno",
      va: 48, vb: 52, ta: null, tb: null, branco_nulo: null, indeciso: null, rej: null, data_quality_flag: null,
      source_primary: "PoderData / Aya, registro BR-02586/2026", source_secondary: "Gazeta do Povo; Poder360 (19/10/2026)", last_updated: "2026-10-19" }),
  P({ poll_id: "nexus-btg-2026-10-18", instituto: "Nexus / BTG", contratante: null, registro_tse: "BR-04499/2026", data_publicacao: "2026-10-19",
      campo_inicio: "2026-10-16", campo_fim: "2026-10-18", amostra: 2002, metodo: "telefone", margem_erro: 2.0, nivel_confianca: "95%", cenario: "Estimulado, 2º turno",
      va: 49.7, vb: 50.3, ta: null, tb: null, branco_nulo: null, indeciso: null, rej: null, data_quality_flag: null,
      source_primary: "Nexus / BTG, registro BR-04499/2026", source_secondary: "Poder360; Congresso em Foco (19/10/2026)", last_updated: "2026-10-19" }),
  P({ poll_id: "atlasintel-2026-10-18", instituto: "AtlasIntel / Bloomberg", contratante: null, registro_tse: "BR-02418/2026", data_publicacao: "2026-10-19",
      campo_inicio: "2026-10-13", campo_fim: "2026-10-18", amostra: 4998, metodo: "digital", margem_erro: 1.0, nivel_confianca: "95%", cenario: "Estimulado, 2º turno",
      va: 48.9, vb: 51.1, ta: null, tb: null, branco_nulo: null, indeciso: null, rej: null, data_quality_flag: null,
      source_primary: "AtlasIntel / Bloomberg, registro BR-02418/2026", source_secondary: "Poder360; Congresso em Foco (19/10/2026)", last_updated: "2026-10-19" }),
  P({ poll_id: "vox-2026-10-17", instituto: "Vox Brasil", contratante: null, registro_tse: "BR-04332/2026", data_publicacao: "2026-10-18",
      campo_inicio: "2026-10-15", campo_fim: "2026-10-17", amostra: 2100, metodo: "presencial", margem_erro: 2.15, nivel_confianca: "95%", cenario: "Estimulado, 2º turno",
      va: 51, vb: 49, ta: null, tb: null, branco_nulo: null, indeciso: null, rej: null, data_quality_flag: null,
      source_primary: "Vox Brasil, registro BR-04332/2026", source_secondary: "Poder360; Congresso em Foco (19/10/2026)", last_updated: "2026-10-19" }),
  P({ poll_id: "futura-2026-10-17", instituto: "Futura", contratante: null, registro_tse: "BR-06715/2026", data_publicacao: null,
      campo_inicio: "2026-10-16", campo_fim: "2026-10-17", amostra: 2000, metodo: "telefone", margem_erro: 2.2, nivel_confianca: "95%", cenario: "Estimulado, 2º turno",
      va: 49.6, vb: 50.4, ta: 47.5, tb: 48.3, branco_nulo: null, indeciso: null, rej: null, data_quality_flag: null,
      source_primary: "Futura, registro BR-06715/2026", source_secondary: "Poder360 (19/10/2026)", last_updated: "2026-10-19" }),
  P({ poll_id: "ipespe-2026-10-15", instituto: "Ipespe", contratante: "Abrapel", registro_tse: "BR-00223/2026", data_publicacao: "2026-10-17",
      campo_inicio: "2026-10-13", campo_fim: "2026-10-15", amostra: 1500, metodo: null, margem_erro: 2.6, nivel_confianca: "95%", cenario: "Estimulado, 2º turno",
      va: 48.8, vb: 51.2, ta: null, tb: null, branco_nulo: null, indeciso: null, rej: null, data_quality_flag: null,
      source_primary: "Ipespe, registro BR-00223/2026", source_secondary: "Poder360; Congresso em Foco (19/10/2026)", last_updated: "2026-10-19" }),
  P({ poll_id: "gerp-2026-10-16", instituto: "Gerp", contratante: null, registro_tse: "BR-05187/2026", data_publicacao: null,
      campo_inicio: "2026-10-14", campo_fim: "2026-10-16", amostra: 2400, metodo: null, margem_erro: 2.0, nivel_confianca: "95%", cenario: "Estimulado, 2º turno",
      va: 48, vb: 52, ta: null, tb: null, branco_nulo: null, indeciso: null, rej: null, data_quality_flag: null,
      source_primary: "Gerp, registro BR-05187/2026", source_secondary: "Poder360 (19/10/2026)", last_updated: "2026-10-19" }),
  P({ poll_id: "cnt-mda-2026-10-15", instituto: "CNT/MDA", contratante: null, registro_tse: "BR-00652/2026", data_publicacao: "2026-10-16",
      campo_inicio: "2026-10-13", campo_fim: "2026-10-15", amostra: 2014, metodo: null, margem_erro: 2.2, nivel_confianca: "95%", cenario: "Estimulado, 2º turno",
      va: 49.5, vb: 50.5, ta: null, tb: null, branco_nulo: null, indeciso: null, rej: null, data_quality_flag: null,
      source_primary: "CNT/MDA, registro BR-00652/2026", source_secondary: "Poder360 (19/10/2026)", last_updated: "2026-10-19" }),
  P({ poll_id: "datafolha-2026-10-15", instituto: "Datafolha", contratante: "Folha de S.Paulo", registro_tse: "BR-00466/2026", data_publicacao: "2026-10-15",
      campo_inicio: "2026-10-13", campo_fim: "2026-10-15", amostra: 2520, metodo: "presencial", margem_erro: 2.0, nivel_confianca: "95%", cenario: "Estimulado, 2º turno",
      va: 49, vb: 51, ta: 45, tb: 47, branco_nulo: "6%", indeciso: "2%", rej: null, data_quality_flag: null,
      source_primary: "Datafolha, registro BR-00466/2026", source_secondary: "SBT News; Poder360 (15 e 19/10/2026)", last_updated: "2026-10-19" }),
  P({ poll_id: "indexa-2026-10-14", instituto: "Indexa / Broadcast", contratante: null, registro_tse: "BR-04629/2026", data_publicacao: null,
      campo_inicio: "2026-10-13", campo_fim: "2026-10-14", amostra: 2000, metodo: null, margem_erro: 2.2, nivel_confianca: "95%", cenario: "Estimulado, 2º turno",
      va: 49, vb: 51, ta: null, tb: null, branco_nulo: null, indeciso: null, rej: null, data_quality_flag: null,
      source_primary: "Indexa / Broadcast, registro BR-04629/2026", source_secondary: "Poder360 (19/10/2026)", last_updated: "2026-10-19" }),
  P({ poll_id: "quaest-2026-10-13", instituto: "Quaest", contratante: "TV Globo", registro_tse: "BR-08729/2026", data_publicacao: "2026-10-14",
      campo_inicio: "2026-10-10", campo_fim: "2026-10-13", amostra: 2154, metodo: "presencial", margem_erro: 2.0, nivel_confianca: "95%", cenario: "Estimulado, 2º turno",
      va: 48.9, vb: 51.1, ta: 44, tb: 46, branco_nulo: null, indeciso: null, rej: null, data_quality_flag: "Votos válidos calculados pelo Poder360 a partir dos votos totais arredondados.",
      source_primary: "Quaest, registro BR-08729/2026", source_secondary: "DGABC; Poder360 (14 e 19/10/2026)", last_updated: "2026-10-19" }),
  P({ poll_id: "palver-2026-10-13", instituto: "Palver", contratante: null, registro_tse: "BR-08028/2026", data_publicacao: null,
      campo_inicio: "2026-10-10", campo_fim: "2026-10-13", amostra: 5000, metodo: "online", margem_erro: 2.3, nivel_confianca: "95%", cenario: "Estimulado, 2º turno",
      va: 49.49, vb: 50.51, ta: null, tb: null, branco_nulo: null, indeciso: null, rej: null, data_quality_flag: "Votos válidos recalculados pelo Poder360, excluindo brancos, nulos e indecisos.",
      source_primary: "Palver, registro BR-08028/2026", source_secondary: "Poder360 (19/10/2026)", last_updated: "2026-10-19" }),
  P({ poll_id: "datatrends-2026-10-09", instituto: "DataTrends", registro_tse: "BR-03576/2026", data_publicacao: "2026-10-11",
      campo_inicio: "2026-10-07", campo_fim: "2026-10-09", amostra: 2000, metodo: "telefone", margem_erro: 2.19, nivel_confianca: "95%", cenario: "Estimulado, 2º turno",
      va: 46.9, vb: 53.1, ta: 44, tb: 50, branco_nulo: "5%", indeciso: "1%", rej: null,
      source_primary: "DataTrends (recursos próprios), registro BR-03576/2026", source_secondary: "Poder360; Revista Oeste (11/10/2026)", last_updated: "2026-10-12" }),
  P({ poll_id: "ipespe-2026-10-08", latest: false, instituto: "Ipespe", contratante: "o próprio instituto", registro_tse: "BR-00933/2026", data_publicacao: "2026-10-10",
      campo_inicio: "2026-10-06", campo_fim: "2026-10-08", amostra: 1500, metodo: "recrutamento digital aleatório", margem_erro: 2.6, nivel_confianca: "95,45%", cenario: "Estimulado, 2º turno",
      va: 47.3, vb: 52.7, ta: null, tb: null, rej: null,
      source_primary: "Ipespe, registro BR-00933/2026", source_secondary: "CNN Brasil (10/10/2026)", last_updated: "2026-10-12" }),
  P({ poll_id: "atlasintel-2026-10-08", latest: false, instituto: "AtlasIntel / Bloomberg", registro_tse: "BR-03663/2026", data_publicacao: "2026-10-09",
      campo_inicio: "2026-10-03", campo_fim: "2026-10-08", amostra: 5026, metodo: "digital", margem_erro: 1.0, nivel_confianca: "95%", cenario: "Estimulado, 2º turno",
      va: 47.2, vb: 52.8, ta: 45.7, tb: 51.1, branco_nulo: "3,2% (branco, nulo e não sabe)", rej: null,
      source_primary: "AtlasIntel, registro BR-03663/2026", source_secondary: "Gazeta do Povo; Forbes Brasil (09/10/2026)",
      data_quality_flag: "Campo começou em 3/10, um dia antes do 1º turno, e terminou em 8/10.", last_updated: "2026-10-12" }),
  P({ poll_id: "vox-2026-10-07", latest: false, instituto: "Vox Brasil", registro_tse: "BR-09623/2026", data_publicacao: "2026-10-09",
      campo_inicio: "2026-10-05", campo_fim: "2026-10-07", amostra: 2100, metodo: "presencial", margem_erro: 2.15, nivel_confianca: "95%", cenario: "Estimulado, 2º turno",
      va: 50.86, vb: 49.14, ta: 44.2, tb: 42.7, branco_nulo: "3,4%", indeciso: "9,7%", rej: null,
      source_primary: "Vox Brasil, registro BR-09623/2026", source_secondary: "CartaCapital; Metrópoles (09/10/2026)", last_updated: "2026-10-12" }),
  P({ poll_id: "datafolha-2026-10-08", latest: false, instituto: "Datafolha", contratante: "Folha de S.Paulo e Grupo Globo", registro_tse: "BR-02949/2026", data_publicacao: "2026-10-08",
      campo_inicio: "2026-10-06", campo_fim: "2026-10-08", amostra: 2520, metodo: "presencial", margem_erro: 2.0, nivel_confianca: "95%", cenario: "Estimulado, 2º turno",
      va: 48, vb: 52, ta: 45, tb: 49, branco_nulo: "5%", indeciso: "1%", rej: { "lula": 46, "flavio-bolsonaro": 43 },
      rejeicao_pergunta: "Em quem não votaria de jeito nenhum",
      source_primary: "Datafolha, registro BR-02949/2026", source_secondary: "Gazeta do Povo; Brasil de Fato (08/10/2026)", last_updated: "2026-10-12" }),
  P({ poll_id: "poderdata-2026-10-07", latest: false, instituto: "PoderData / Aya", contratante: "o próprio instituto", registro_tse: "BR-08134/2026", data_publicacao: "2026-10-08",
      campo_inicio: "2026-10-05", campo_fim: "2026-10-07", amostra: 3000, metodo: "telefone (URA)", margem_erro: 1.8, nivel_confianca: "95%", cenario: "Estimulado, 2º turno",
      va: 47, vb: 53, ta: null, tb: null, rej: { "lula": 46, "flavio-bolsonaro": 43 },
      rejeicao_pergunta: "Em quem não votaria de jeito nenhum",
      source_primary: "PoderData/Aya, registro BR-08134/2026", source_secondary: "Poder360; Gazeta do Povo (08/10/2026)", last_updated: "2026-10-12" })
];

/* Média de referência (votos válidos) em 19/10/2026 — 13 institutos. O site recalcula e confere. */
EB.polls2tPublishedAvg = { "lula": 48.98, "flavio-bolsonaro": 51.02 };
