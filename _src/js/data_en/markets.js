/* =========================================================
   PREDICTION MARKETS — 11-mercados-polymarket-kalshi.md
   Prices change continuously: always record captured_at.
   display = text exactly as it appears in the snapshot (~, <).
   value = number used only to draw the bar.
   null = not provided in the base content.
   ========================================================= */
window.EB = window.EB || {};

EB.marketsMeta = {
  captured_at: "2026-09-30",
  captured_time: null,   // time of capture — record it at the next update
  legend: "Market price, not a voting-intention poll.",
  resolution_note: "Markets on the Brazilian election use the official result from the TSE (Brazil's Superior Electoral Court) in their resolution rules.",
  platforms: {
    polymarket: { name: "Polymarket", url: "https://polymarket.com/" },
    kalshi: { name: "Kalshi", url: "https://kalshi.com/" }
  }
};

EB.markets = [
  {
    id: "vencedor", title: "Overall winner", q: "Who wins the 2026 presidential election?",
    note: null,
    platforms: [
      { platform: "polymarket", market_name: null, market_id: null, volume: "~US$157.4 million", resolution_rule: null, source_url: "https://polymarket.com/", timestamp: "2026-09-30",
        outcomes: [
          { outcome: "Flávio Bolsonaro", display: "~59.5–60%", value: 59.75 },
          { outcome: "Lula", display: "~41%", value: 41 },
          { outcome: "Renan Santos", display: "<1%", value: null },
          { outcome: "All others", display: "<1% each", value: null }
        ] },
      { platform: "kalshi", market_name: null, market_id: null, volume: "~US$6.05 million", resolution_rule: null, source_url: "https://kalshi.com/", timestamp: "2026-09-30",
        outcomes: [
          { outcome: "Flávio Bolsonaro", display: "~61%", value: 61 },
          { outcome: "Lula", display: "~40%", value: 40 },
          { outcome: "Renan Santos", display: "~0.9%", value: 0.9 }
        ] }
    ]
  },
  {
    id: "primeiro-lugar", title: "First place in the first round", q: "Who finishes first in the first round?",
    note: "This does not contradict the overall-winner market. The contracts answer different questions.",
    platforms: [
      { platform: "polymarket", market_name: null, market_id: null, volume: null, resolution_rule: null, source_url: "https://polymarket.com/", timestamp: "2026-09-30",
        outcomes: [ { outcome: "Lula", display: "~75%", value: 75 }, { outcome: "Flávio Bolsonaro", display: "~26%", value: 26 } ] },
      { platform: "kalshi", market_name: null, market_id: null, volume: null, resolution_rule: null, source_url: "https://kalshi.com/", timestamp: "2026-09-30",
        outcomes: [ { outcome: "Lula", display: "~74%", value: 74 }, { outcome: "Flávio Bolsonaro", display: "~26%", value: 26 } ] }
    ]
  },
  {
    id: "vitoria-1t", title: "Outright win in the first round", q: "Is the election decided in the first round?",
    note: "Do not average across platforms.",
    platforms: [
      { platform: "polymarket", market_name: null, market_id: null, volume: null, resolution_rule: null, source_url: "https://polymarket.com/", timestamp: "2026-09-30",
        outcomes: [ { outcome: "Yes", display: "~6%", value: 6 } ] },
      { platform: "kalshi", market_name: null, market_id: null, volume: null, resolution_rule: null, source_url: "https://kalshi.com/", timestamp: "2026-09-30",
        outcomes: [ { outcome: "Yes", display: "~12%", value: 12 } ] }
    ]
  }
];

EB.marketsExplainer = [
  { t: "What they are", p: ["Prediction markets are not polls.", "A poll measures the answers of a sample of voters. A prediction market shows the prices of contracts tied to future events.", "Prices can be read as approximate implied probabilities, but they are not voting intention."] },
  { t: "Comparing correctly with polls", p: ["Do not directly compare “40% in the poll” with “60% in the market” as if they were the same variable.", "A person can say they will vote for Lula and, at the same time, believe Flávio will end up elected — and vice versa."] },
  { t: "Volume", p: ["Trading volume is not a number of voters.", "A single participant can move large sums. Many voters never take part in these markets."] }
];
