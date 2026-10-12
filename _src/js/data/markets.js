/* =========================================================
   MERCADOS DE PREVISÃO — 11-mercados-polymarket-kalshi.md
   Preços mudam continuamente: sempre registrar captured_at.
   display = texto exatamente como consta no snapshot (~, <).
   value = número usado só para desenhar a barra.
   null = não informado no conteúdo-base.
   ========================================================= */
window.EB = window.EB || {};

EB.marketsMeta = {
  captured_at: "2026-10-12",
  captured_time: "8h20 (horário de Nova York), conforme The Rio Times",
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
    note: "Valores depois do 1º turno, relatados pelo The Rio Times em 12/10/2026, 8h20 (horário de Nova York). Captura direta nas plataformas: em atualização.",
    platforms: [
      { platform: "polymarket", market_name: null, market_id: null, volume: null, resolution_rule: null, source_url: "https://polymarket.com/", timestamp: "2026-10-12",
        outcomes: [
          { outcome: "Flávio Bolsonaro", display: "~86,9%", value: 86.9 },
          { outcome: "Lula", display: "~12,5%", value: 12.5 }
        ] },
      { platform: "kalshi", market_name: null, market_id: null, volume: null, resolution_rule: null, source_url: "https://kalshi.com/", timestamp: "2026-10-12",
        outcomes: [
          { outcome: "Flávio Bolsonaro", display: "~87%", value: 87 },
          { outcome: "Lula", display: "~13%", value: 13 }
        ] }
    ]
  },
  {
    id: "primeiro-lugar", title: "Primeiro colocado no 1º turno", q: "Quem termina o 1º turno em primeiro lugar?",
    note: "Resolvido: Flávio Bolsonaro terminou o 1º turno em primeiro (47,03% dos votos válidos). Preços abaixo são de 30/09, antes da votação — ficam como registro.",
    platforms: [
      { platform: "polymarket", market_name: null, market_id: null, volume: null, resolution_rule: null, source_url: "https://polymarket.com/", timestamp: "2026-09-30",
        outcomes: [ { outcome: "Lula", display: "~75%", value: 75 }, { outcome: "Flávio Bolsonaro", display: "~26%", value: 26 } ] },
      { platform: "kalshi", market_name: null, market_id: null, volume: null, resolution_rule: null, source_url: "https://kalshi.com/", timestamp: "2026-09-30",
        outcomes: [ { outcome: "Lula", display: "~74%", value: 74 }, { outcome: "Flávio Bolsonaro", display: "~26%", value: 26 } ] }
    ]
  },
  {
    id: "vitoria-1t", title: "Vitória já no 1º turno", q: "A eleição é decidida no 1º turno?",
    note: "Resolvido: não houve vitória no 1º turno; a eleição vai ao 2º turno em 25/10. Preços abaixo são de 30/09, antes da votação — ficam como registro.",
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
