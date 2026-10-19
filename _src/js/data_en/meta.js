/* =========================================================
   META — editorial labels, case statuses, datasets
   Edit the definition texts here. Do not change the keys.
   ========================================================= */
window.EB = window.EB || {};

EB.site = {
  name: "Brazil Beyond the Ballot",
  domain: "https://brazilbeyondtheballot.com",
  tagline: "Far beyond the election",
  concept: "Brazil Elections 2026",
  subtitle: "The economy, institutions, the STF (Brazil's Supreme Federal Court), the Senate and the Presidency. Understand how Brazil got to 2026 and what this election could change.",
  author: "Rafael Magalhães",
  version: "V4.1",
  content_package: "site-content-eleicoes-2026",
  last_updated: "2026-10-19",
  first_round_date: "2026-10-04",
  election_date: "2026-10-25",
  round: 2
};

/* Runoff texts (V4.0). The interface reads from here — same keys in PT and EN. */
EB.ui2t = {
  hero_date: "Runoff · October 25, 2026",
  day: "day", days: "days", countdown: "to the runoff",
  home_h: "Where the race stands now", home_res_h: "Official result · First round", home_res_upd: "TSE · Oct. 4, 2026 · valid votes",
  home_avg_h: "Descriptive average · Runoff", home_avg_upd: "{n} pollsters · valid votes · {d}",
  home_more: "Runoff polls →", home_res_more: "Full result →",
  tabs: [["segundo", "Runoff"], ["resultado", "First-round result"], ["media", "First round · final average"], ["individuais", "First round · polls"], ["rejeicao", "Rejection"], ["evolucao", "Trend"], ["metodologia", "Methodology"]],
  closed_note: "Snapshot closed on Sept. 30, 2026, before the first round. It stays as a record and for comparison with the official result. The runoff simulations on this tab were conducted before Oct. 4.",
  r2_h: "Lula × Flávio · Runoff", r2_upd: "{n} pollsters · fieldwork after Oct. 4 · {d}",
  r2_avg: "Descriptive average", r2_avg_sub: "valid votes",
  r2_note: "Bar = valid votes published by each firm. Descriptive gap in the average: {x} points.",
  r2_table_h: "Runoff polls", r2_cols: ["Pollster", "Fieldwork", "Sample", "Method", "Margin", "Lula (valid)", "Flávio (valid)", "Lula (total)", "Flávio (total)"],
  r2_check: "Automatic check of the recalculated average:", ok: "✓ matches", bad: "⚠ mismatch — review",
  res_h: "Official first-round result · President", res_cols: ["Candidate", "Party", "Votes", "% valid"],
  res_runoff: "advances to the runoff", res_others: "Other voting data",
  rej2_h: "Rejection · Runoff", rej1_h: "Rejection · First round (before Oct. 4)",
  meth2_h: "Runoff rules",
  cand_r1: "First round: {p}% of valid votes", cand_in: "In the Oct. 25 runoff", cand_out: "Did not advance to the runoff",
  colinha_closed: "The voting reference built for the first round has been closed. In the runoff (Oct. 25) you vote for president and, in states with a runoff, for governor.",
  pending: "Being updated"
};


/* Labels. fam = visual family (CSS class). */
EB.labels = {
  fato: { name: "Fact", fam: "f", desc: "Information verifiable in a primary source or a reliable journalistic source." },
  dado: { name: "Data", fam: "f", desc: "A number or statistic with an identified official or primary source." },
  jud:  { name: "Judicial decision", fam: "j", desc: "What the case or court actually decided. It is a legal fact — but its legal reasoning can be criticized." },
  alg:  { name: "Allegation", fam: "i", desc: "A claim attributed to an identifiable party (prosecution, defense, campaign). It is not equivalent to a proven fact." },
  inf:  { name: "Inference", fam: "n", desc: "A plausible connection between facts, but not direct proof." },
  ctx:  { name: "Context", fam: "c", desc: "Background information needed to read a fact correctly." },
  ana:  { name: "Analysis", fam: "a", desc: "An interpretation that follows from the facts presented, but involves judgment." },
  ed:   { name: "Editorial opinion", fam: "e", desc: "An interpretation openly held by the site's author. It is not objective data." },
  prop: { name: "Campaign proposal", fam: "p", desc: "A commitment registered by the candidacy (a government plan filed with the TSE, Brazil's Superior Electoral Court, or a public statement). It is not an outcome or an accomplished fact." },
  met:  { name: "Methodology", fam: "m", desc: "A reading rule, methodological caveat or criterion used by the site." },
  ver:  { name: "Needs verification", fam: "v", desc: "An item that should not be read as fact before it is checked." }
};

/* Case status — always given the same prominence as the original accusation. */
EB.status = {
  investigacao: { name: "Investigation", tone: "i" },
  denuncia:     { name: "Indictment", tone: "i" },
  reu:          { name: "Defendant", tone: "i" },
  condenacao:   { name: "Conviction", tone: "j" },
  definitiva:   { name: "Final conviction", tone: "j" },
  execucao:     { name: "Sentence being served", tone: "j" },
  revisao:      { name: "Criminal review requested", tone: "i" },
  arquivado:    { name: "Dismissed", tone: "f" },
  anulado:      { name: "Annulled", tone: "f" },
  absolvido:    { name: "Acquitted", tone: "f" },
  reabertura:   { name: "Reopening requested", tone: "i" },
  civel:        { name: "Civil / tax — not criminal", tone: "c" },
  sem_imputacao:{ name: "No personal charge", tone: "c" },
  reportagem:   { name: "Journalistic reporting", tone: "c" },
  sem_decisao:  { name: "No court ruling", tone: "c" },
  liminar:      { name: "Preliminary injunction", tone: "j" },
  acao:         { name: "Lawsuit pending", tone: "i" },
  transitado:   { name: "Final, non-appealable ruling", tone: "f" },
  multa:        { name: "Fine imposed", tone: "j" }
};

/* Source hierarchy (14-fontes-e-regras-editoriais.md) */
EB.sourceHierarchy = [
  "The Constitution, laws and official regulatory acts.",
  "The STF (Supreme Federal Court), the TSE (Superior Electoral Court), the Senate, the Chamber of Deputies and other public bodies.",
  "IBGE (the national statistics bureau), the Central Bank, the National Treasury, Ipea (the Institute for Applied Economic Research) and other statistical agencies.",
  "Original reports from polling firms.",
  "International organizations and recognized research centers.",
  "News outlets for current facts, controversies and statements.",
  "Opinion and analysis, always identified as such."
];

EB.rules = [
  { t: "Fact vs. opinion", d: "Every political conclusion by the author must be marked as editorial interpretation." },
  { t: "Accusations", d: "Never turn an accusation into a fact. Show the current status: investigation, indictment, defendant, conviction, final conviction, dismissal, acquittal or annulment." },
  { t: "The courts", d: "A judicial decision is a legal fact, but that does not mean its legal reasoning is immune to criticism. Relevant disagreements are shown explicitly." },
  { t: "The 2022 election", d: "The project does not claim fraud in the voting machines or in the vote count. The editorial criticism concerns institutional asymmetry, control of speech, due process and concentration of power." },
  { t: "Polls", d: "Do not mix polls with markets or models. Always show the date, fieldwork period, sample, method, margin of error and source." },
  { t: "Markets", d: "Show the date and time of capture. Never call a market price voting intention." },
  { t: "ÍRIS / VOGA", d: "Treat it as an external model. Do not present its results as our own calculation." },
  { t: "Candidates", d: "Apply the same factual yardstick to everyone. Do not create a ranking, score or winner in the comparison tool." },
  { t: "Personal recommendations", d: "The state-by-state list drawn from peterapoia.com is kept visually separate from the factual comparison tool and identified as a personal recommendation from the author/partner." },
  { t: "Updates", d: "Every piece of electoral data has a last_updated date. Candidacies, polls, markets and registrations can change quickly." }
];
