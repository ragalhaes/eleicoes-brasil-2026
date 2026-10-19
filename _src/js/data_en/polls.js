/* =========================================================
   ELECTION POLLS — 10-pesquisas-base-metodologia.md
   Snapshot: latest valid national poll from each polling firm.
   New poll from the same firm: mark the previous one latest:false
   and add the new one with latest:true (history preserved).
   null = field not yet filled in the base content.
   ========================================================= */
window.EB = window.EB || {};

EB.pollsMeta = {
  last_updated: "2026-09-30",
  year: 2026,
  candidates_1t: ["lula", "flavio-bolsonaro", "augusto-cury", "ronaldo-caiado", "renan-santos", "romeu-zema"],
  short: { "lula": "Lula", "flavio-bolsonaro": "Flávio", "augusto-cury": "Cury", "ronaldo-caiado": "Caiado", "renan-santos": "Renan", "romeu-zema": "Zema" },
  legend_avg: "Simple average of the most recent poll from each polling firm. It is not an election forecast.",
  history_note: "CNT/MDA stays in the history: its Sept. 9–13, 2026 round used a different candidate list from the one in the most recent rounds (it included Pablo Marçal for the PRTB, which is now represented by Leonardo Avalanche). Meio/Ideia joined the snapshot with its Sept. 25–28, 2026 round. Earlier rounds from each polling firm will be added to the time series.",
  history_excluded: ["CNT/MDA"],
  rules: [
    "A new poll from the same firm replaces the previous one in the snapshot; the old one stays in the history.",
    "Do not weight by publication frequency.",
    "Do not automatically weight by sample size in the descriptive average.",
    "Do not mix valid votes with raw voting intention.",
    "Do not mix the first round and the runoff.",
    "Do not mix polls with prediction markets.",
    "Do not call it a “statistical tie” based on our own calculation: use the polling firm's classification or show the percentages + margin.",
    "Rejection figures are shown per polling firm, with no overall average, because the questions vary between firms.",
    "The descriptive average is not given its own margin of error without a specific statistical model."
  ]
};

/* Fields follow the structure suggested in file 10. */
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
      campo_inicio: "2026-09-25", campo_fim: "2026-09-28", amostra: 2000, metodo: "phone", margem_erro: 2.2, nivel_confianca: "95%", cenario: "Prompted, first round",
      r1: { "lula": 39.4, "flavio-bolsonaro": 38.4, "augusto-cury": 6.7, "ronaldo-caiado": 4.4, "renan-santos": 4.5, "romeu-zema": 3.5 },
      outros: "Samara Martins (UP) 0.4%; Clariana Barão (DC) 0.3%; Hertz Dias (PSTU) 0.3%; Wilson Grassi (Democrata), Leonardo Avalanche (PRTB), Rui Costa Pimenta (PCO) and Edmilson Costa (PCB) 0.1% each",
      branco_nulo: "0.7%", indeciso: "1.5%",
      r2: { a: "lula", b: "flavio-bolsonaro", a_pct: 48.5, b_pct: 48 },
      rej: null,
      source_primary: "Ideia / Canal Meio — release of Sept. 30, 2026 (TSE registration BR-08706/2026)",
      source_secondary: "Gazeta do Povo; Bahia Econômica; Agora RN (Sept. 30, 2026)" }),
  P({ poll_id: "gerp-2026-09-28", instituto: "Gerp", campo_inicio: "2026-09-24", campo_fim: "2026-09-28", amostra: 2400, metodo: "phone", margem_erro: 2.0,
      r1: { "lula": 40, "flavio-bolsonaro": 42, "augusto-cury": 5, "ronaldo-caiado": 3, "renan-santos": 3, "romeu-zema": 1 },
      r2: { a: "lula", b: "flavio-bolsonaro", a_pct: 43, b_pct: 50 },
      rej: { "lula": 50, "flavio-bolsonaro": 42 } }),
  P({ poll_id: "futura-2026-09-23", instituto: "Futura / 100% Cidades", campo_inicio: "2026-09-19", campo_fim: "2026-09-23", amostra: 2000, metodo: "phone", margem_erro: 2.2,
      r1: { "lula": 38.4, "flavio-bolsonaro": 40.4, "augusto-cury": 5.6, "ronaldo-caiado": 5.7, "renan-santos": 2.4, "romeu-zema": 0.9 },
      r2: { a: "lula", b: "flavio-bolsonaro", a_pct: 43.7, b_pct: 49.4 },
      rej: { "lula": 50.3, "flavio-bolsonaro": 44.6 } }),
  P({ poll_id: "poderdata-2026-09-23", instituto: "PoderData / Aya", campo_inicio: "2026-09-20", campo_fim: "2026-09-23", amostra: 3000, metodo: "phone", margem_erro: 1.8,
      r1: { "lula": 41, "flavio-bolsonaro": 39, "augusto-cury": 6, "ronaldo-caiado": 2, "renan-santos": 3, "romeu-zema": 1 },
      r2: { a: "lula", b: "flavio-bolsonaro", a_pct: 45, b_pct: 46 },
      rej: null }),
  P({ poll_id: "quaest-2026-09-27", instituto: "Quaest", campo_inicio: "2026-09-24", campo_fim: "2026-09-27", amostra: 2004, metodo: "in-person", margem_erro: 2.0,
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
  P({ poll_id: "nexus-btg-2026-09-27", instituto: "Nexus / BTG", campo_inicio: "2026-09-25", campo_fim: "2026-09-27", amostra: 2000, metodo: "phone/CATI", margem_erro: 2.0,
      r1: { "lula": 42, "flavio-bolsonaro": 37, "augusto-cury": 5, "ronaldo-caiado": 5, "renan-santos": 4, "romeu-zema": 1 },
      r2: { a: "lula", b: "flavio-bolsonaro", a_pct: 46, b_pct: 44 },
      rej: { "lula": 48, "flavio-bolsonaro": 51 } }),
  P({ poll_id: "datafolha-2026-09-23", instituto: "Datafolha", campo_inicio: "2026-09-22", campo_fim: "2026-09-23", amostra: 2002, metodo: "in-person", margem_erro: 2.0,
      r1: { "lula": 40, "flavio-bolsonaro": 36, "augusto-cury": 5, "ronaldo-caiado": 4, "renan-santos": 3, "romeu-zema": 1 },
      r2: { a: "lula", b: "flavio-bolsonaro", a_pct: 47, b_pct: 45 },
      rej: { "lula": 45, "flavio-bolsonaro": 45 } }),
  P({ poll_id: "realtime-2026-09-23", instituto: "Real Time Big Data", campo_inicio: "2026-09-19", campo_fim: "2026-09-23", amostra: 2000, metodo: "phone + digital", margem_erro: 2.0,
      r1: { "lula": 41, "flavio-bolsonaro": 37, "augusto-cury": 6, "ronaldo-caiado": 2, "renan-santos": 6, "romeu-zema": 1 },
      r2: { a: "lula", b: "flavio-bolsonaro", a_pct: 44, b_pct: 45 },
      rej: { "lula": 50, "flavio-bolsonaro": 49 } }),
  P({ poll_id: "vox-2026-09-28", instituto: "Vox Brasil", campo_inicio: "2026-09-26", campo_fim: "2026-09-28", amostra: 2100, metodo: "in-person, at home", margem_erro: 2.15,
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

/* Reference average updated Sept. 30, 2026 (13 pollsters) — the site recalculates and checks it. */
EB.pollsPublishedAvg = {
  r1: { "lula": 40.71, "flavio-bolsonaro": 38.06, "augusto-cury": 4.58, "renan-santos": 3.98, "ronaldo-caiado": 3.52, "romeu-zema": 1.24 },
  r2: { "lula": 44.81, "flavio-bolsonaro": 45.79 }
};

/* =========================================================
   RUNOFF (Oct. 25, 2026) — added Oct. 12, 2026
   Official first-round result + national runoff polls conducted
   AFTER Oct. 4. Average = valid votes (the only figure every firm
   released); total votes are shown in each poll's details.
   ========================================================= */
EB.result1t = {
  date: "2026-10-04",
  status: "100% of polling stations counted",
  source: "TSE (Superior Electoral Court) — count with 100% of polling stations, as reported by DGABC/Folha de Pernambuco and CartaCapital (Oct. 5, 2026).",
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
    ["Valid votes", "119,300,788"],
    ["Blank", "2,300,798 (1.84% of those who voted)"],
    ["Null", "3,674,249 (2.93% of those who voted)"],
    ["Turnout", "125,275,835 of 158,745,502 eligible voters"],
    ["Abstention", "33,469,244 (21.08%) — the highest since 1998, according to the reported count"]
  ]
};

EB.polls2tMeta = {
  last_updated: "2026-10-19",
  runoff_date: "2026-10-25",
  a: "lula", b: "flavio-bolsonaro",
  legend_avg: "Simple average, in valid votes, of the most recent national poll from each firm conducted after the first round. It is not a forecast or a probability of winning.",
  rules: [
    "Only national runoff polls registered with the TSE whose fieldwork started after the first round (Oct. 4, 2026).",
    "The average uses valid votes (excluding blank, null and undecided), because it is the only figure every firm released. Total votes appear in each poll's details when published.",
    "Runoff simulations conducted before Oct. 4 stay in the first-round snapshot, as a record.",
    "A new round from the same firm replaces the previous one in the average; the old one stays in the history.",
    "No “statistical tie” label of our own: compare the percentages with each firm's margin."
  ]
};

/* va/vb = valid votes (Lula / Flávio). ta/tb = total votes, when released. */
EB.polls2t = [
  P({ poll_id: "poderdata-2026-10-18", instituto: "PoderData / Aya", contratante: "the firm itself", registro_tse: "BR-02586/2026", data_publicacao: "2026-10-19",
      campo_inicio: "2026-10-16", campo_fim: "2026-10-18", amostra: 3000, metodo: "phone (IVR)", margem_erro: 1.8, nivel_confianca: "95%", cenario: "Prompted, runoff",
      va: 48, vb: 52, ta: null, tb: null, branco_nulo: null, indeciso: null, rej: null, data_quality_flag: null,
      source_primary: "PoderData / Aya, registration BR-02586/2026", source_secondary: "Gazeta do Povo; Poder360 (Oct. 19, 2026)", last_updated: "2026-10-19" }),
  P({ poll_id: "nexus-btg-2026-10-18", instituto: "Nexus / BTG", contratante: null, registro_tse: "BR-04499/2026", data_publicacao: "2026-10-19",
      campo_inicio: "2026-10-16", campo_fim: "2026-10-18", amostra: 2002, metodo: "phone", margem_erro: 2.0, nivel_confianca: "95%", cenario: "Prompted, runoff",
      va: 49.7, vb: 50.3, ta: null, tb: null, branco_nulo: null, indeciso: null, rej: null, data_quality_flag: null,
      source_primary: "Nexus / BTG, registration BR-04499/2026", source_secondary: "Poder360; Congresso em Foco (Oct. 19, 2026)", last_updated: "2026-10-19" }),
  P({ poll_id: "atlasintel-2026-10-18", instituto: "AtlasIntel / Bloomberg", contratante: null, registro_tse: "BR-02418/2026", data_publicacao: "2026-10-19",
      campo_inicio: "2026-10-13", campo_fim: "2026-10-18", amostra: 4998, metodo: "online", margem_erro: 1.0, nivel_confianca: "95%", cenario: "Prompted, runoff",
      va: 48.9, vb: 51.1, ta: null, tb: null, branco_nulo: null, indeciso: null, rej: null, data_quality_flag: null,
      source_primary: "AtlasIntel / Bloomberg, registration BR-02418/2026", source_secondary: "Poder360; Congresso em Foco (Oct. 19, 2026)", last_updated: "2026-10-19" }),
  P({ poll_id: "vox-2026-10-17", instituto: "Vox Brasil", contratante: null, registro_tse: "BR-04332/2026", data_publicacao: "2026-10-18",
      campo_inicio: "2026-10-15", campo_fim: "2026-10-17", amostra: 2100, metodo: "in person", margem_erro: 2.15, nivel_confianca: "95%", cenario: "Prompted, runoff",
      va: 51, vb: 49, ta: null, tb: null, branco_nulo: null, indeciso: null, rej: null, data_quality_flag: null,
      source_primary: "Vox Brasil, registration BR-04332/2026", source_secondary: "Poder360; Congresso em Foco (Oct. 19, 2026)", last_updated: "2026-10-19" }),
  P({ poll_id: "futura-2026-10-17", instituto: "Futura", contratante: null, registro_tse: "BR-06715/2026", data_publicacao: null,
      campo_inicio: "2026-10-16", campo_fim: "2026-10-17", amostra: 2000, metodo: "phone", margem_erro: 2.2, nivel_confianca: "95%", cenario: "Prompted, runoff",
      va: 49.6, vb: 50.4, ta: 47.5, tb: 48.3, branco_nulo: null, indeciso: null, rej: null, data_quality_flag: null,
      source_primary: "Futura, registration BR-06715/2026", source_secondary: "Poder360 (Oct. 19, 2026)", last_updated: "2026-10-19" }),
  P({ poll_id: "ipespe-2026-10-15", instituto: "Ipespe", contratante: "Abrapel", registro_tse: "BR-00223/2026", data_publicacao: "2026-10-17",
      campo_inicio: "2026-10-13", campo_fim: "2026-10-15", amostra: 1500, metodo: null, margem_erro: 2.6, nivel_confianca: "95%", cenario: "Prompted, runoff",
      va: 48.8, vb: 51.2, ta: null, tb: null, branco_nulo: null, indeciso: null, rej: null, data_quality_flag: null,
      source_primary: "Ipespe, registration BR-00223/2026", source_secondary: "Poder360; Congresso em Foco (Oct. 19, 2026)", last_updated: "2026-10-19" }),
  P({ poll_id: "gerp-2026-10-16", instituto: "Gerp", contratante: null, registro_tse: "BR-05187/2026", data_publicacao: null,
      campo_inicio: "2026-10-14", campo_fim: "2026-10-16", amostra: 2400, metodo: null, margem_erro: 2.0, nivel_confianca: "95%", cenario: "Prompted, runoff",
      va: 48, vb: 52, ta: null, tb: null, branco_nulo: null, indeciso: null, rej: null, data_quality_flag: null,
      source_primary: "Gerp, registration BR-05187/2026", source_secondary: "Poder360 (Oct. 19, 2026)", last_updated: "2026-10-19" }),
  P({ poll_id: "cnt-mda-2026-10-15", instituto: "CNT/MDA", contratante: null, registro_tse: "BR-00652/2026", data_publicacao: "2026-10-16",
      campo_inicio: "2026-10-13", campo_fim: "2026-10-15", amostra: 2014, metodo: null, margem_erro: 2.2, nivel_confianca: "95%", cenario: "Prompted, runoff",
      va: 49.5, vb: 50.5, ta: null, tb: null, branco_nulo: null, indeciso: null, rej: null, data_quality_flag: null,
      source_primary: "CNT/MDA, registration BR-00652/2026", source_secondary: "Poder360 (Oct. 19, 2026)", last_updated: "2026-10-19" }),
  P({ poll_id: "datafolha-2026-10-15", instituto: "Datafolha", contratante: "Folha de S.Paulo", registro_tse: "BR-00466/2026", data_publicacao: "2026-10-15",
      campo_inicio: "2026-10-13", campo_fim: "2026-10-15", amostra: 2520, metodo: "in person", margem_erro: 2.0, nivel_confianca: "95%", cenario: "Prompted, runoff",
      va: 49, vb: 51, ta: 45, tb: 47, branco_nulo: "6%", indeciso: "2%", rej: null, data_quality_flag: null,
      source_primary: "Datafolha, registration BR-00466/2026", source_secondary: "SBT News; Poder360 (Oct. 15 and 19, 2026)", last_updated: "2026-10-19" }),
  P({ poll_id: "indexa-2026-10-14", instituto: "Indexa / Broadcast", contratante: null, registro_tse: "BR-04629/2026", data_publicacao: null,
      campo_inicio: "2026-10-13", campo_fim: "2026-10-14", amostra: 2000, metodo: null, margem_erro: 2.2, nivel_confianca: "95%", cenario: "Prompted, runoff",
      va: 49, vb: 51, ta: null, tb: null, branco_nulo: null, indeciso: null, rej: null, data_quality_flag: null,
      source_primary: "Indexa / Broadcast, registration BR-04629/2026", source_secondary: "Poder360 (Oct. 19, 2026)", last_updated: "2026-10-19" }),
  P({ poll_id: "quaest-2026-10-13", instituto: "Quaest", contratante: "TV Globo", registro_tse: "BR-08729/2026", data_publicacao: "2026-10-14",
      campo_inicio: "2026-10-10", campo_fim: "2026-10-13", amostra: 2154, metodo: "in person", margem_erro: 2.0, nivel_confianca: "95%", cenario: "Prompted, runoff",
      va: 48.9, vb: 51.1, ta: 44, tb: 46, branco_nulo: null, indeciso: null, rej: null, data_quality_flag: "Valid votes calculated by Poder360 from the rounded total-vote figures.",
      source_primary: "Quaest, registration BR-08729/2026", source_secondary: "DGABC; Poder360 (Oct. 14 and 19, 2026)", last_updated: "2026-10-19" }),
  P({ poll_id: "palver-2026-10-13", instituto: "Palver", contratante: null, registro_tse: "BR-08028/2026", data_publicacao: null,
      campo_inicio: "2026-10-10", campo_fim: "2026-10-13", amostra: 5000, metodo: "online", margem_erro: 2.3, nivel_confianca: "95%", cenario: "Prompted, runoff",
      va: 49.49, vb: 50.51, ta: null, tb: null, branco_nulo: null, indeciso: null, rej: null, data_quality_flag: "Valid votes recalculated by Poder360, excluding blank, null and undecided.",
      source_primary: "Palver, registration BR-08028/2026", source_secondary: "Poder360 (Oct. 19, 2026)", last_updated: "2026-10-19" }),
  P({ poll_id: "datatrends-2026-10-09", instituto: "DataTrends", registro_tse: "BR-03576/2026", data_publicacao: "2026-10-11",
      campo_inicio: "2026-10-07", campo_fim: "2026-10-09", amostra: 2000, metodo: "phone", margem_erro: 2.19, nivel_confianca: "95%", cenario: "Prompted, runoff",
      va: 46.9, vb: 53.1, ta: 44, tb: 50, branco_nulo: "5%", indeciso: "1%", rej: null,
      source_primary: "DataTrends (self-funded), registration BR-03576/2026", source_secondary: "Poder360; Revista Oeste (Oct. 11, 2026)", last_updated: "2026-10-12" }),
  P({ poll_id: "ipespe-2026-10-08", latest: false, instituto: "Ipespe", contratante: "the firm itself", registro_tse: "BR-00933/2026", data_publicacao: "2026-10-10",
      campo_inicio: "2026-10-06", campo_fim: "2026-10-08", amostra: 1500, metodo: "random digital recruitment", margem_erro: 2.6, nivel_confianca: "95.45%", cenario: "Prompted, runoff",
      va: 47.3, vb: 52.7, ta: null, tb: null, rej: null,
      source_primary: "Ipespe, registration BR-00933/2026", source_secondary: "CNN Brasil (Oct. 10, 2026)", last_updated: "2026-10-12" }),
  P({ poll_id: "atlasintel-2026-10-08", latest: false, instituto: "AtlasIntel / Bloomberg", registro_tse: "BR-03663/2026", data_publicacao: "2026-10-09",
      campo_inicio: "2026-10-03", campo_fim: "2026-10-08", amostra: 5026, metodo: "online", margem_erro: 1.0, nivel_confianca: "95%", cenario: "Prompted, runoff",
      va: 47.2, vb: 52.8, ta: 45.7, tb: 51.1, branco_nulo: "3.2% (blank, null and don't know)", rej: null,
      source_primary: "AtlasIntel, registration BR-03663/2026", source_secondary: "Gazeta do Povo; Forbes Brasil (Oct. 9, 2026)",
      data_quality_flag: "Fieldwork began Oct. 3, one day before the first round, and ended Oct. 8.", last_updated: "2026-10-12" }),
  P({ poll_id: "vox-2026-10-07", latest: false, instituto: "Vox Brasil", registro_tse: "BR-09623/2026", data_publicacao: "2026-10-09",
      campo_inicio: "2026-10-05", campo_fim: "2026-10-07", amostra: 2100, metodo: "in person", margem_erro: 2.15, nivel_confianca: "95%", cenario: "Prompted, runoff",
      va: 50.86, vb: 49.14, ta: 44.2, tb: 42.7, branco_nulo: "3.4%", indeciso: "9.7%", rej: null,
      source_primary: "Vox Brasil, registration BR-09623/2026", source_secondary: "CartaCapital; Metrópoles (Oct. 9, 2026)", last_updated: "2026-10-12" }),
  P({ poll_id: "datafolha-2026-10-08", latest: false, instituto: "Datafolha", contratante: "Folha de S.Paulo and Grupo Globo", registro_tse: "BR-02949/2026", data_publicacao: "2026-10-08",
      campo_inicio: "2026-10-06", campo_fim: "2026-10-08", amostra: 2520, metodo: "in person", margem_erro: 2.0, nivel_confianca: "95%", cenario: "Prompted, runoff",
      va: 48, vb: 52, ta: 45, tb: 49, branco_nulo: "5%", indeciso: "1%", rej: { "lula": 46, "flavio-bolsonaro": 43 },
      rejeicao_pergunta: "Would not vote for under any circumstances",
      source_primary: "Datafolha, registration BR-02949/2026", source_secondary: "Gazeta do Povo; Brasil de Fato (Oct. 8, 2026)", last_updated: "2026-10-12" }),
  P({ poll_id: "poderdata-2026-10-07", latest: false, instituto: "PoderData / Aya", contratante: "the firm itself", registro_tse: "BR-08134/2026", data_publicacao: "2026-10-08",
      campo_inicio: "2026-10-05", campo_fim: "2026-10-07", amostra: 3000, metodo: "phone (IVR)", margem_erro: 1.8, nivel_confianca: "95%", cenario: "Prompted, runoff",
      va: 47, vb: 53, ta: null, tb: null, rej: { "lula": 46, "flavio-bolsonaro": 43 },
      rejeicao_pergunta: "Would not vote for under any circumstances",
      source_primary: "PoderData/Aya, registration BR-08134/2026", source_secondary: "Poder360; Gazeta do Povo (Oct. 8, 2026)", last_updated: "2026-10-12" })
];

/* Reference average (valid votes) on Oct. 19, 2026 — 13 firms. The site recalculates and checks it. */
EB.polls2tPublishedAvg = { "lula": 48.98, "flavio-bolsonaro": 51.02 };
