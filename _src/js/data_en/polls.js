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
