/* =========================================================
   ÍRIS / VOGA MODEL — 12-modelo-iris-voga.md
   The numbers come from VOGA Inteligência, not our own calculation.
   The base content does not yet include the values: fill them in at each capture.
   ========================================================= */
window.EB = window.EB || {};

EB.iris = {
  source: "VOGA_IRIS",
  name: "ÍRIS Model — VOGA",
  url: "https://voga-iris.com/",
  methodology_url: "https://voga-iris.com/metodologia",
  captured_at: null,       // date/time when we copied the numbers
  model_updated_at: null,  // update date reported by VOGA
  credibility: "95%",
  legend: "External statistical model. It uses election polls, the track record of polling firms and uncertainty simulations. It is not a voting-intention poll.",
  /* One object per candidate. Example of how to fill it in:
     { candidate: "lula", current_estimate: 0, first_round_projection: 0,
       projection_low: 0, projection_high: 0, second_round_probability: 0, win_probability: 0 } */
  rows: []
};

EB.irisExplainer = {
  what: [
    "ÍRIS is an election model from VOGA Inteligência.",
    "It is not an individual poll, and it is not a simple arithmetic average.",
    "The model aggregates polls, analyzes the track record of polling firms and incorporates uncertainty to produce electoral estimates and simulations."
  ],
  steps: [
    { t: "Aggregates multiple polls", d: "It combines surveys published by different polling firms to estimate the underlying preference of the electorate." },
    { t: "Uses polling firms' track records", d: "The public documentation states that it uses presidential polls from 2010 to 2022. The model analyzes average historical error and systematic biases (house effects). ÍRIS itself stresses that systematic bias does not mean intentional manipulation." },
    { t: "Estimates where the electorate stands today", d: "In the “Where the polls stand” chart, each dot represents a published poll. The central line represents the model's estimate and the band around it represents uncertainty." },
    { t: "Projects Election Day", d: "The model adds uncertainty about future shifts and runs simulations. From them it derives the probability of winning, the probability of a runoff and a projected first-round vote range. The platform describes 95% credible intervals." }
  ],
  pendulum: "The “Pendulum” visualization represents the combined probability of an outcome across the ideological camps used by ÍRIS itself. It is not voting intention.",
  known: ["uses multiple polls", "uses track record since 2010", "compares how polling firms perform", "estimates historical error", "estimates systematic biases", "quantifies current uncertainty", "projects uncertainty through Election Day", "runs simulations"],
  unknown: ["exact weight of each poll", "exact time function", "full house-effects formula", "treatment of new polling firms", "number of simulations", "full distributions and priors", "correlations between candidates"],
  unknown_note: "The public methodology does not disclose all the mathematical details needed for exact replication. That is why the site attributes the numbers to VOGA and does not present them as its own calculation."
};

/* The three layers — never merge them into a single percentage */
EB.layers = [
  { id: "pesquisas", k: "Polls", q: "What are respondents saying?", href: "#/pesquisas" },
  { id: "mercados", k: "Markets", q: "How are contracts on the outcome being traded?", href: "#/mercados" },
  { id: "iris", k: "ÍRIS / VOGA", q: "What does an external statistical model project from polls, track records and uncertainty?", href: "#/iris" }
];
