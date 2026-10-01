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
