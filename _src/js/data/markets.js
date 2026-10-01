/* =========================================================
   MERCADOS DE PREVISÃO — 11-mercados-polymarket-kalshi.md
   Preços mudam continuamente: sempre registrar captured_at.
   display = texto exatamente como consta no snapshot (~, <).
   value = número usado só para desenhar a barra.
   null = não informado no conteúdo-base.
   ========================================================= */
window.EB = window.EB || {};

EB.marketsMeta = {
  captured_at: "2026-09-30",
  captured_time: null,   // hora da captura — registrar na próxima atualização
  legend: "Preço de mercado, não pesquisa de intenção de voto.",
  resolution_note: "Mercados da eleição brasileira usam o resultado oficial do TSE em suas regras de resolução.",
  platforms: {
    polymarket: { name: "Polymarket", url: "https://polymarket.com/" },
    kalshi: { name: "Kalshi", url: "https://kalshi.com/" }
  }
};

EB.markets = [
  {
    id: "vencedor", title: "Vencedor final", q: "Quem vence a eleição presidencial de 2026?",
    note: null,
    platforms: [
      { platform: "polymarket", market_name: null, market_id: null, volume: "~US$ 157,4 milhões", resolution_rule: null, source_url: "https://polymarket.com/", timestamp: "2026-09-30",
        outcomes: [
          { outcome: "Flávio Bolsonaro", display: "~59,5–60%", value: 59.75 },
          { outcome: "Lula", display: "~41%", value: 41 },
          { outcome: "Renan Santos", display: "<1%", value: null },
          { outcome: "Demais nomes", display: "<1% cada", value: null }
        ] },
      { platform: "kalshi", market_name: null, market_id: null, volume: "~US$ 6,05 milhões", resolution_rule: null, source_url: "https://kalshi.com/", timestamp: "2026-09-30",
        outcomes: [
          { outcome: "Flávio Bolsonaro", display: "~61%", value: 61 },
          { outcome: "Lula", display: "~40%", value: 40 },
          { outcome: "Renan Santos", display: "~0,9%", value: 0.9 }
        ] }
    ]
  },
  {
    id: "primeiro-lugar", title: "Primeiro colocado no 1º turno", q: "Quem termina o 1º turno em primeiro lugar?",
    note: "Isso não é contraditório com o mercado de vencedor final. Os contratos respondem perguntas diferentes.",
    platforms: [
      { platform: "polymarket", market_name: null, market_id: null, volume: null, resolution_rule: null, source_url: "https://polymarket.com/", timestamp: "2026-09-30",
        outcomes: [ { outcome: "Lula", display: "~75%", value: 75 }, { outcome: "Flávio Bolsonaro", display: "~26%", value: 26 } ] },
      { platform: "kalshi", market_name: null, market_id: null, volume: null, resolution_rule: null, source_url: "https://kalshi.com/", timestamp: "2026-09-30",
        outcomes: [ { outcome: "Lula", display: "~74%", value: 74 }, { outcome: "Flávio Bolsonaro", display: "~26%", value: 26 } ] }
    ]
  },
  {
    id: "vitoria-1t", title: "Vitória já no 1º turno", q: "A eleição é decidida no 1º turno?",
    note: "Não tirar média entre as plataformas.",
    platforms: [
      { platform: "polymarket", market_name: null, market_id: null, volume: null, resolution_rule: null, source_url: "https://polymarket.com/", timestamp: "2026-09-30",
        outcomes: [ { outcome: "Sim", display: "~6%", value: 6 } ] },
      { platform: "kalshi", market_name: null, market_id: null, volume: null, resolution_rule: null, source_url: "https://kalshi.com/", timestamp: "2026-09-30",
        outcomes: [ { outcome: "Sim", display: "~12%", value: 12 } ] }
    ]
  }
];

EB.marketsExplainer = [
  { t: "O que são", p: ["Mercados de previsão não são pesquisas.", "Pesquisa mede respostas de uma amostra de eleitores. Mercado de previsão mostra preços de contratos condicionados a eventos futuros.", "Os preços podem ser interpretados como probabilidades implícitas aproximadas, mas não são intenção de voto."] },
  { t: "Comparação correta com pesquisas", p: ["Não comparar diretamente “40% na pesquisa” com “60% no mercado” como se fossem a mesma variável.", "Uma pessoa pode declarar voto em Lula e, simultaneamente, acreditar que Flávio terminará eleito — e vice-versa."] },
  { t: "Volume", p: ["Volume negociado não é número de eleitores.", "Um participante pode movimentar grandes quantias. Muitos eleitores nunca participam desses mercados."] }
];
