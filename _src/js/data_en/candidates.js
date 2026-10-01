/* =========================================================
   PRESIDENTIAL CANDIDATES — 09-candidatos-presidencia.md
   Official status must come from the TSE and be updatable.
   null = not included in the base content of this version (do not invent).
   ========================================================= */
window.EB = window.EB || {};

EB.candidatesMeta = {
  last_updated: "2026-09-30",
  source_note: "List based on the TSE (Tribunal Superior Eleitoral — Brazil's Superior Electoral Court) page consulted while the project was being prepared. Registrations may change — check official status with the TSE.",
  order_note: "Alphabetical order. No candidate receives visual prominence.",
  editorial_note: "The comparison tool follows six candidacies selected by the editorial project. Polling data preserves every name presented by the polling firms.",
  photo_note: "Photos: TSE — Open Data Portal (Candidates 2026, resource “BR - Fotos de candidatos”)."
};

/* Comparison dimensions — no scores, rankings or winners */
EB.compareDims = [
  { id: "experiencia", name: "Experience" },
  { id: "fiscal", name: "Fiscal policy" },
  { id: "impostos", name: "Taxes" },
  { id: "estatais", name: "Privatization / state-owned companies" },
  { id: "trabalho", name: "Labor" },
  { id: "jornada", name: "Working hours" },
  { id: "seguranca", name: "Public security" },
  { id: "drogas", name: "Drugs" },
  { id: "stf", name: "STF / institutions" },
  { id: "sociais", name: "Social programs" },
  { id: "saude", name: "Health" }
];

EB.candidates = [
{
  id: "augusto-cury", photo: "assets/images/president/augusto-cury.jpg", name: "Augusto Cury", party: "Avante", number: "70", depth: "full",
  last_updated: "2026-09-30",
  trajetoria: "Physician, psychiatrist and author. Making his electoral debut in 2026, with no prior experience in government.",
  profile: {
    formacao: [
      { l: "fato", t: "Education level declared to the Tribunal Superior Eleitoral (TSE — Brazil's Superior Electoral Court): completed higher education. Declared occupation: writer and critic." },
      { l: "fato", t: "Trained in medicine, practicing in psychiatry. According to his Currículo Lattes (Brazil's national academic CV registry) as cited by the press, he holds a Doctor of Business Administration (DBA) from Florida Christian University (2013)." }
    ],
    privada: [
      { l: "fato", t: "Author of widely circulated books and of the “Theory of Multifocal Intelligence.” Creator of Escola da Inteligência, a social-emotional education program, according to the biography attached to the government plan filed with the TSE." },
      { l: "fato", t: "Declared assets of R$242.3 million to the TSE in 2026." }
    ],
    publica: [ { l: "fato", t: "Electoral debut in 2026. Has never held elected office or a leadership post in government." } ],
    resultados: [ { l: "met", t: "Not applicable: the candidate has never held public executive office, so there are no administrative results to measure. His career has been in medicine, writing and private education." } ],
    economia: "Deficit close to zero, gradual debt reduction, tax simplification, productive credit and entrepreneurship.",
    seguranca: [ { l: "prop", t: "“FATO – Força Alerta Total” (Total Alert Force) project: permanent integration of the Polícia Federal (PF — Federal Police), the state Military and Civil police forces and a new Municipal Combat Force (FOCO); a national integrated intelligence center; use of technology such as facial recognition “in accordance with current legislation,” license-plate readers and drones." } ],
    instituicoes: "Semi-presidential system; a Supremo Tribunal Federal (STF — Brazil's Supreme Federal Court) with nine justices serving eight-year terms — changes that depend on constitutional amendment.",
    social: [
      { l: "prop", t: "“Mulheres Vivas” (Women Alive) project: an integrated national policy to prevent femicide, plus equal pay and economic autonomy for women." },
      { l: "prop", t: "“Brasil Neuroinclusivo” (Neuroinclusive Brazil), “Comunidades Empreendedoras” (Entrepreneurial Communities) and “Brasil Oásis” (Oasis Brazil, for the semi-arid region) projects." }
    ],
    saude: [
      { l: "prop", t: "Strong emphasis on mental health, prevention, telemedicine and modernization of the SUS (Brazil's public health system)." },
      { l: "prop", t: "“Tele Saúde Brasil” to expand telemedicine and relieve pressure on the SUS, and a cancer prevention and early-detection program." }
    ]
  },
  propostas: ["Deficit close to zero", "Gradual debt reduction", "Tax simplification", "FATO project (integrated security)", "Mulheres Vivas (Women Alive)", "Tele Saúde Brasil", "Semi-presidential system", "STF with 9 justices and 8-year terms"],
  controversias: [
    { t: "Doctorate cited in the government plan", l: "fato",
      d: "The plan filed with the TSE claims an “international doctorate in Multifocal Psychology” from Florida Christian University. The candidate's Currículo Lattes lists a DBA (business administration) from the same institution, in 2013. In July 2026, Cury had stated that he did not present the title as an academic doctorate in Psychology.",
      status: ["reportagem"], src: { o: "A Tarde", r: "Augusto Cury claims a doctorate he did not earn in government plan", p: "Sept. 1, 2026", url: "https://atarde.com.br/eleicoes/augusto-cury-diz-ter-doutorado-nao-feito-em-plano-de-governo-1400487" } },
    { t: "Companies left out of the asset declaration", l: "fato",
      d: "A news report identified five companies (three in the U.S., two in Brazil) that were not listed in the asset declaration submitted to the TSE. The campaign said they are inactive or have no revenue, are “insignificant” relative to his assets, and that the inconsistencies would be corrected.",
      status: ["reportagem", "sem_decisao"], src: { o: "Poder360", r: "Companies not declared to the TSE are insignificant, says Cury campaign", p: "Sept. 6, 2026", url: "https://www.poder360.com.br/poder-eleicoes-2026/empresas-nao-declaradas-ao-tse-sao-inexpressivas-diz-campanha-de-cury/" } },
    { t: "Daughter's company's contracts with city governments", l: "fato",
      d: "A Folha de S.Paulo review of the National Public Procurement Portal found 28 contracts, totaling R$19.9 million (2023–2026), signed without competitive bidding by city governments with Multifocal RP, in which Camila Cury is a partner. Cury says the contracts are lawful and that, if elected, he will avoid federal contracts with these companies.",
      status: ["reportagem", "sem_decisao"], note: "No court decision or official investigation is cited.", src: { o: "BNews (via Folha de S.Paulo)", r: "Augusto Cury's daughter's company lands R$19.9 million in contracts with city governments", p: "Sept. 2026", url: "https://www.bnews.com.br/noticias/politica/empresa-da-filha-de-augusto-cury-fecha-r-199-milhoes-em-contratos-com-prefeituras.html" } },
    { t: "Pro-Cury ad network", l: "alg",
      d: "Agência Lupa identified a network of 68 pages that spent at least US$106,000 on Meta ads (Aug.–Sept. 2026), with 122 ads favorable to Cury and hundreds against opponents. The campaign denies any connection to the pages.",
      status: ["reportagem", "sem_decisao"], src: { o: "Agência Lupa", r: "Network spends US$106,000 on Meta to promote Cury and attack opponents", p: "Sept. 21, 2026", url: "https://www.agencialupa.org/jornalismo/2026/09/21/rede-gasta-us-106-mil-na-meta-para-promover-cury-e-criticar-opositores-parte-dos-posts-tem-anunciante-identificado-nos-eua/" } }
  ],
  sources: [
    { t: "TSE — Open Data Portal, Candidates 2026 (education level, occupation, registration)", url: "https://dadosabertos.tse.jus.br/pt_BR/dataset/candidatos-2026" },
    { t: "TSE — government plan filed with the TSE (“BR - Proposta de governo” package)", url: "https://cdn.tse.jus.br/estatistica/sead/odsele/proposta_governo/proposta_governo_2026_BR.zip" },
    { t: "Poder360 — asset declaration and undeclared companies (Sept. 6, 2026)", url: "https://www.poder360.com.br/poder-eleicoes-2026/empresas-nao-declaradas-ao-tse-sao-inexpressivas-diz-campanha-de-cury/" },
    { t: "A Tarde — doctorate cited in the plan (Sept. 1, 2026)", url: "https://atarde.com.br/eleicoes/augusto-cury-diz-ter-doutorado-nao-feito-em-plano-de-governo-1400487" },
    { t: "BNews / Folha de S.Paulo — Multifocal RP contracts (Sept. 2026)", url: "https://www.bnews.com.br/noticias/politica/empresa-da-filha-de-augusto-cury-fecha-r-199-milhoes-em-contratos-com-prefeituras.html" },
    { t: "Agência Lupa — Meta ad network (Sept. 21, 2026)", url: "https://www.agencialupa.org/jornalismo/2026/09/21/rede-gasta-us-106-mil-na-meta-para-promover-cury-e-criticar-opositores-parte-dos-posts-tem-anunciante-identificado-nos-eua/" }
  ],
  compare: {
    experiencia: "Physician, psychiatrist and author. Electoral debut in 2026; no prior experience in government.",
    fiscal: "Deficit close to zero and gradual debt reduction.",
    impostos: "Tax simplification.",
    seguranca: "FATO project: integration of the Federal Police, state police forces and a new municipal force (FOCO), an integrated intelligence center and technology.",
    stf: "Semi-presidential system; STF with nine justices serving eight-year terms (requires constitutional amendment).",
    sociais: "Mulheres Vivas (femicide prevention and economic autonomy), Brasil Neuroinclusivo and entrepreneurship programs.",
    saude: "Mental health, prevention, telemedicine (Tele Saúde Brasil) and modernization of the SUS."
  }
},
{
  id: "flavio-bolsonaro", photo: "assets/images/president/flavio-bolsonaro.jpg", name: "Flávio Bolsonaro", party: "PL", number: "22", depth: "full",
  last_updated: "2026-09-30",
  trajetoria: "Law graduate. Four terms as a state representative in Rio de Janeiro and a senator since 2019. A predominantly legislative career; has never led a state government or held the presidency.",
  profile: {
    formacao: [
      { l: "fato", t: "Bachelor of Laws, with a graduate degree in political science, according to Agência Senado (2018). Education level declared to the Tribunal Superior Eleitoral (TSE — Brazil's Superior Electoral Court): completed higher education." }
    ],
    privada: [ { l: "fato", t: "Described as a businessman by Agência Senado in 2018. Occupation declared to the TSE in 2026: senator." } ],
    publica: [
      { l: "fato", t: "Four terms as a state representative in Rio de Janeiro (Alerj, the state legislature). Senator for Rio de Janeiro since 2019: elected in 2018 with 4.37 million votes (31.3% of valid votes), the most-voted Senate candidate in the state." },
      { l: "fato", t: "Elected chair of the Senate Public Security Committee (CSP) in February 2025." },
      { l: "ctx", t: "A predominantly legislative career; has never led a state government or held the presidency." }
    ],
    resultados: [ { l: "met", t: "Not applicable in the sense of executive management: the candidate's career is legislative (Alerj and the Senate), with no experience heading a government. His parliamentary record is described under “Public experience.”" } ],
    economia: "Tax cuts, overhaul of fiscal rules, lower labor costs, trade liberalization, administrative reform, privatizations and fewer ministries.",
    seguranca: "Age of criminal responsibility, tougher sentence-progression rules for heinous crimes, high-security prisons, border control, fighting criminal factions, facial recognition and chemical castration for rapists.",
    instituicoes: [
      { l: "prop", t: "Judicial reform, an end to monocratic (single-justice) decisions and broader political changes." },
      { l: "prop", t: "In the plan filed with the TSE: ending the original criminal jurisdiction of the Supremo Tribunal Federal (STF — Brazil's Supreme Federal Court), limiting monocratic decisions, revising the scope of ADPFs (constitutional-violation complaints) and a one-year cooling-off period before cabinet ministers can be nominated to the STF." }
    ],
    social: [ { l: "prop", t: "Keep existing social programs, with management review and a crackdown on distortions; give beneficiaries priority in first-job and job-training programs; guarantee immediate return to the benefit after unemployment insurance ends." } ],
    saude: [ { l: "prop", t: "Updating the SUS (Brazil's public health system) reimbursement table, a “Brasil sem Fila” (Brazil Without Lines) program, telehealth, home delivery of medicine for the elderly and chronically ill, and use of artificial intelligence in prevention." } ]
  },
  propostas: ["Tax cuts", "Overhaul of fiscal rules", "Administrative reform", "Privatizations", "Fewer ministries", "Age of criminal responsibility", "End to monocratic decisions", "Brasil sem Fila (health)"],
  controversias: [
    { t: "The “rachadinha” case", l: "alg",
      d: "In 2020, the Rio de Janeiro Ministério Público (MP-RJ — state public prosecutors) indicted Flávio Bolsonaro and 16 other people over the alleged diversion of staff salaries from his office at Alerj (a “rachadinha,” or salary kickback scheme). In November 2021, the STF's Second Panel annulled reports from Coaf (Brazil's financial-intelligence unit) used in the case. In February 2024, Justice Gilmar Mendes denied an MP-RJ appeal to resume the investigation. On Sept. 29, 2026, the Grupo Prerrogativas and Rep. Rui Falcão (PT-SP) asked the MP-RJ to reopen the case, citing new facts.",
      status: ["anulado", "arquivado", "reabertura"], note: "This is not a conviction.",
      src: { o: "CartaCapital; Correio Braziliense", r: "Case timeline; request to reopen", p: "2020–2026", url: "https://www.correiobraziliense.com.br/politica/2026/09/7510721-prerrogativas-pede-ao-mp-rj-a-reabertura-do-caso-das-rachadinhas-envolvendo-flavio.html" } },
    { t: "“Dark Horse” film and Banco Master", l: "alg",
      d: "A report by Intercept Brasil (May 2026) stated that the senator negotiated with Daniel Vorcaro, former controlling shareholder of Banco Master, over financing a film about Jair Bolsonaro. Flávio acknowledged seeking private sponsorship from Vorcaro and says no public money was involved. Opposition lawmakers asked the Procuradoria-Geral da República (PGR — Office of the Prosecutor General) and the Polícia Federal (PF — Federal Police) to investigate.",
      status: ["reportagem", "sem_decisao"], note: "No formal charges had been filed according to the material consulted.",
      src: { o: "Agência Pública", r: "Flávio Bolsonaro, Vorcaro, Master: the “Dark Horse” film scandal", p: "May 2026", url: "https://apublica.org/2026/05/flavio-bolsonaro-vorcaro-master-escandalo-filme-dark-horse-azarao/" } }
  ],
  sources: [
    { t: "Federal Senate — senator's profile", url: "https://www25.senado.leg.br/web/senadores/senador/-/perfil/5894" },
    { t: "Agência Senado — 2018 election and biography (Oct. 7, 2018)", url: "https://www12.senado.leg.br/noticias/materias/2018/10/07/flavio-bolsonaro-e-arolde-de-oliveira-sao-eleitos-pelo-rio-de-janeiro" },
    { t: "Agência Senado — elected chair of the CSP (Feb. 19, 2025)", url: "https://www12.senado.leg.br/noticias/materias/2025/02/19/flavio-bolsonaro-e-eleito-presidente-da-csp" },
    { t: "TSE — Open Data Portal, Candidates 2026", url: "https://dadosabertos.tse.jus.br/pt_BR/dataset/candidatos-2026" },
    { t: "TSE — government plan filed with the TSE (“BR - Proposta de governo” package)", url: "https://cdn.tse.jus.br/estatistica/sead/odsele/proposta_governo/proposta_governo_2026_BR.zip" },
    { t: "CartaCapital — timeline of the “rachadinha” case", url: "https://www.cartacapital.com.br/politica/o-que-aconteceu-com-o-caso-da-rachadinha-de-flavio-bolsonaro-suposto-candidato-em-2026/" },
    { t: "Correio Braziliense — request to reopen (Sept. 29, 2026)", url: "https://www.correiobraziliense.com.br/politica/2026/09/7510721-prerrogativas-pede-ao-mp-rj-a-reabertura-do-caso-das-rachadinhas-envolvendo-flavio.html" },
    { t: "Agência Pública — “Dark Horse” film and Banco Master", url: "https://apublica.org/2026/05/flavio-bolsonaro-vorcaro-master-escandalo-filme-dark-horse-azarao/" }
  ],
  compare: {
    experiencia: "Law. Four terms as a state representative (RJ) and senator since 2019; has never led a state government or held the presidency.",
    fiscal: "Overhaul of fiscal rules, administrative reform and fewer ministries.",
    impostos: "Tax cuts.",
    estatais: "Privatizations.",
    trabalho: "Lower labor costs.",
    seguranca: "Age of criminal responsibility, tougher sentence progression for heinous crimes, high-security prisons, border control, criminal factions, facial recognition and chemical castration for rapists.",
    stf: "Judicial reform, an end to monocratic decisions and an end to the STF's original criminal jurisdiction.",
    sociais: "Keep existing social programs, with priority for beneficiaries in employment and job training.",
    saude: "Updating the SUS reimbursement table, Brasil sem Fila, telehealth and home delivery of medicine."
  }
},
{
  id: "lula", photo: "assets/images/president/lula.jpg", name: "Lula", party: "PT", number: "13", depth: "full",
  last_updated: "2026-09-30",
  trajetoria: "Former president (2003–2010) and president since 2023. Background as a union leader in São Paulo's ABC industrial region.",
  profile: {
    formacao: [ { l: "fato", t: "Trained as a lathe operator at Senai (national industrial training service). Education level declared to the Tribunal Superior Eleitoral (TSE — Brazil's Superior Electoral Court): completed elementary education; declared occupation: lathe operator." } ],
    privada: [ { l: "fato", t: "Metalworker in São Paulo's ABC region. President of the Metalworkers' Union of São Bernardo do Campo and Diadema from 1975, he was reelected in 1978." } ],
    publica: [
      { l: "fato", t: "Co-founder of the PT in 1980. Elected federal representative to the Constituent Assembly in 1986, the most-voted in the country." },
      { l: "fato", t: "President of the Republic from 2003 to 2010 and since 2023." }
    ],
    resultados: "Data on the third term (2023–2026) are in the chapter “Lula returns to power.”",
    resultadosLink: "#/historia/governo-lula",
    economia: "Continuity and deepening of the current government's agenda: the fiscal framework, tax reform, the New PAC (Growth Acceleration Program), Nova Indústria Brasil (New Industry Brazil), credit and the Ecological Transformation Plan. Also supports ending the 6x1 schedule (six days of work, one day off) and cutting the workweek to 40 hours.",
    seguranca: [
      { l: "prop", t: "Plan filed with the TSE: passage of the constitutional amendment (PEC) that revises the responsibilities of federal, state and municipal governments in public security, expansion of the Brasil Contra o Crime Organizado (Brazil Against Organized Crime) Program, financial strangulation of criminal factions, strengthening of the federal prison system and maintenance of gun-control policy." },
      { l: "ctx", t: "The plan cites the Anti-Faction Law, signed in 2026, as a foundation for the next administration." }
    ],
    instituicoes: [
      { l: "prop", t: "Program supports social participation, oversight mechanisms, transparency and regulation of social networks and platforms." },
      { l: "prop", t: "The plan proposes debating the system of parliamentary budget amendments (R$50 billion in 2026, according to the document) with society and maintaining dialogue with the Judiciary, “with due respect for the autonomy of the branches of government.”" }
    ],
    social: "End of the 6x1 schedule and a 40-hour workweek.",
    saude: [ { l: "prop", t: "Expansion of primary care and of the Agora Tem Especialistas (Now There Are Specialists) program, a single medical record through the National Health Data Network, telehealth and use of artificial intelligence in triage." } ]
  },
  observar: "As a candidate for reelection, he should be compared against actual 2023–2026 results, not just promises.",
  propostas: ["Fiscal framework", "Tax reform", "New PAC", "Nova Indústria Brasil", "Ecological Transformation Plan", "End of the 6x1 schedule", "40-hour workweek", "Public Security PEC (constitutional amendment)", "Regulation of social networks and platforms"],
  controversias: [
    { t: "Lava Jato convictions (13th Federal Court of Curitiba)", l: "jud",
      d: "In 2021, Justice Edson Fachin annulled rulings by the 13th Federal Court of Curitiba for lack of jurisdiction; the full Supremo Tribunal Federal (STF — Brazil's Supreme Federal Court) upheld this 8–3. Separately, the STF found that Sergio Moro was biased in the triplex apartment case. The annulment for lack of jurisdiction was not an acquittal on the merits of the charges.",
      status: ["anulado"], src: { o: "STF", r: "2021 rulings on Lula", p: "2021" }, chapter: "stf-tse-2022" },
    { t: "INSS — Operation Sem Desconto (during his government)", l: "fato",
      d: "The investigated scheme of association-fee deductions from INSS (social security) benefits operated between 2019 and 2024, spanning different governments. There is no public basis for attributing personal involvement to Lula.",
      status: ["investigacao", "sem_imputacao"], src: { o: "AGU / PF / CGU / INSS / STF", r: "Operation Sem Desconto", p: "2025–2026" }, chapter: "governo-lula" },
    { t: "Juscelino Filho (minister)", l: "alg",
      d: "Indicted by the Procuradoria-Geral da República (PGR — Office of the Prosecutor General) in an investigation into the alleged diversion of budget amendments, relating mainly to the period when he was a federal representative. “A minister in the Lula government was indicted” is factual; “a Lula government corruption scheme” is not an automatic description of the case.",
      status: ["denuncia"], chapter: "governo-lula" },
    { t: "Banco Master (during his term)", l: "ctx",
      d: "A financial and regulatory scandal that occurred during his term; it should not automatically be presented as corruption by Lula without a demonstrated individual criminal link.",
      status: ["sem_imputacao"], chapter: "governo-lula" }
  ],
  sources: [
    { t: "Chamber of Deputies — Lula's political career", url: "https://www.camara.leg.br/noticias/93745-presidente-reeleito-tem-trajetoria-politica-singular/" },
    { t: "TSE — Open Data Portal, Candidates 2026", url: "https://dadosabertos.tse.jus.br/pt_BR/dataset/candidatos-2026" },
    { t: "TSE — government plan filed with the TSE (“BR - Proposta de governo” package)", url: "https://cdn.tse.jus.br/estatistica/sead/odsele/proposta_governo/proposta_governo_2026_BR.zip" },
    { t: "Chapter “Lula returns to power” — IBGE, Central Bank, National Treasury, Ipea (chapter sources)" },
    { t: "Chapter “The 2022 election” — 2021 STF rulings" }
  ],
  compare: {
    experiencia: "President 2003–2010 and since 2023. Background as a union leader in São Paulo's ABC region.",
    fiscal: "Continuity of the fiscal framework.",
    impostos: "Continuity of tax reform.",
    trabalho: "End of the 6x1 schedule.",
    jornada: "40 hours (end of the 6x1 schedule).",
    seguranca: "Public Security PEC, Brasil Contra o Crime Organizado Program, financial strangulation of criminal factions and gun control.",
    stf: "Social participation, oversight mechanisms, transparency and regulation of social networks and platforms.",
    sociais: "Continuity and expansion of the current government's social programs.",
    saude: "Primary care, Agora Tem Especialistas, single medical record and telehealth."
  }
},
{
  id: "renan-santos", photo: "assets/images/president/renan-santos.jpg", name: "Renan Santos", party: "Missão", number: "14", depth: "full",
  last_updated: "2026-09-30",
  trajetoria: "Businessman, founder of MBL (Movimento Brasil Livre) and of the Missão party. Started law school at USP (University of São Paulo) but did not finish. No prior experience as governor, mayor, minister, representative or senator.",
  profile: {
    formacao: [ { l: "fato", t: "Started law school at USP but did not finish. Education level declared to the Tribunal Superior Eleitoral (TSE — Brazil's Superior Electoral Court): incomplete higher education." } ],
    privada: [ { l: "fato", t: "Businessman (occupation declared to the TSE). Founder of MBL and of the Missão party. Was a partner and director of Martin Artefatos de Metal S.A., from which he was removed by court order in May 2022, according to his defense as cited by the Federal Court." } ],
    publica: [ { l: "fato", t: "No prior experience as governor, mayor, minister, representative or senator. 2026 is his first candidacy." } ],
    resultados: [ { l: "met", t: "Not applicable: the candidate has never held public office, so there are no administrative results to measure. His activity has been in business and in leading a movement and a party." } ],
    economia: "Immediate fiscal adjustment, de-indexation of spending, civil-service reform, review of tax breaks and removal of the constitutionally mandated minimum spending floors for health and education.",
    seguranca: "“Enemy Criminal Law,” El Salvador–inspired mega-prisons, asset confiscation and expanded surveillance.",
    instituicoes: [
      { l: "prop", t: "“Great Municipal Consolidation”: merging municipalities deemed fiscally unviable, citing a study that allows for reducing the number of municipalities by up to 70%." },
      { l: "prop", t: "“Managerial Responsibility Law”: tying public managers to objective performance targets." }
    ],
    social: "Proposes gradually replacing Bolsa Família (cash-transfer program) with “Frentes Cidadãs” (Citizen Work Fronts).",
    saude: [ { l: "prop", t: "“SUS Fila Zero” (Zero Line in the SUS, Brazil's public health system): queues organized by risk level (National Risk Stratification Scale), an interoperable national electronic medical record, a digital system inspired by El Salvador's DoctorSV and a fund with transfers to municipalities conditioned on performance." } ]
  },
  propostas: ["Immediate fiscal adjustment", "De-indexation of spending", "Civil-service reform", "Removal of health and education spending floors", "“Frentes Cidadãs” in place of Bolsa Família", "Mega-prisons", "Asset confiscation", "SUS Fila Zero", "Consolidation of municipalities"],
  controversias: [
    { t: "A company's tax debts", l: "jud",
      d: "The Federal Court in São Paulo (decision published Sept. 9, 2026) rejected Renan's requests to recognize the statute of limitations and be removed from the collection of about R$1.17 million in taxes owed by Martin Artefatos de Metal S.A. His defense argues that he is not liable for earlier debts and that he left the company in 2022.",
      status: ["civel"], note: "A tax debt is not a criminal conviction.",
      src: { o: "Jornal de Brasília", r: "Court confirms Renan Santos's debts", p: "Sept. 2026", url: "https://jornaldebrasilia.com.br/noticias/politica-e-poder/justica-confirma-dividas-de-renan-santos-e-frustra-tentativa-de-sigilo-sobre-cobrancas-de-impostos/" } },
    { t: "Federal prosecutors' lawsuit over speech against Indigenous peoples", l: "jud",
      d: "The MPF (Ministério Público Federal — federal public prosecutors) sued Renan Santos and MBL over posts targeting 14 Indigenous peoples of the Lower Tapajós region (Pará) and is seeking R$500,000 in collective moral damages. On Aug. 24, 2026, the Federal Court in Santarém ordered, on an urgent basis, that the videos be removed.",
      status: ["liminar", "acao"], src: { o: "MPF (Procuradoria da República no Pará)", r: "Preliminary injunction", p: "Aug. 24, 2026", url: "https://www.mpf.mp.br/o-mpf/unidades/pr-pa/noticias/decisao-renan-santos-mbl-discurso-odio-indigenas" } },
    { t: "2021 accusation", l: "jud",
      d: "Renan Santos was acquitted, for insufficient evidence, in a case opened based on an accusation made in 2021. According to the São Paulo Ministério Público (MP-SP — state public prosecutors), the decision is final and non-appealable.",
      status: ["absolvido", "transitado"], note: "This is not a proven crime.",
      src: { o: "Rádio Liberdade (via G1)", r: "Prosecutors confirm acquittal", p: "Aug. 4, 2026", url: "https://www.rdliberdade.com.br/eleicoes-2026-candidato-a-presidencia-da-republica-renan-santos-foi-absolvido-em-processo-por-acusacao-de-estupro-diz-ministerio-publico/" } }
  ],
  sources: [
    { t: "TSE — Open Data Portal, Candidates 2026", url: "https://dadosabertos.tse.jus.br/pt_BR/dataset/candidatos-2026" },
    { t: "TSE — government plan filed with the TSE (“Livro Amarelo,” “BR - Proposta de governo” package)", url: "https://cdn.tse.jus.br/estatistica/sead/odsele/proposta_governo/proposta_governo_2026_BR.zip" },
    { t: "MPF — decision on posts targeting Indigenous peoples (Aug. 24, 2026)", url: "https://www.mpf.mp.br/o-mpf/unidades/pr-pa/noticias/decisao-renan-santos-mbl-discurso-odio-indigenas" },
    { t: "Jornal de Brasília — Federal Court decision on the debts (Sept. 2026)", url: "https://jornaldebrasilia.com.br/noticias/politica-e-poder/justica-confirma-dividas-de-renan-santos-e-frustra-tentativa-de-sigilo-sobre-cobrancas-de-impostos/" },
    { t: "Rádio Liberdade / G1 — acquittal confirmed by the MP-SP (Aug. 4, 2026)", url: "https://www.rdliberdade.com.br/eleicoes-2026-candidato-a-presidencia-da-republica-renan-santos-foi-absolvido-em-processo-por-acusacao-de-estupro-diz-ministerio-publico/" }
  ],
  compare: {
    experiencia: "Businessman, founder of MBL and Missão. Did not finish law school at USP. No prior experience in elected or government office.",
    fiscal: "Immediate fiscal adjustment, de-indexation of spending, civil-service reform, review of tax breaks and removal of health and education spending floors.",
    seguranca: "“Enemy Criminal Law,” El Salvador–inspired mega-prisons, asset confiscation and expanded surveillance.",
    stf: "Consolidation of unviable municipalities and a Managerial Responsibility Law.",
    sociais: "Gradually replace Bolsa Família with “Frentes Cidadãs.”",
    saude: "SUS Fila Zero (risk-based queues, national medical record) and removal of the health spending floor."
  }
},
{
  id: "romeu-zema", photo: "assets/images/president/romeu-zema.jpg", name: "Romeu Zema", party: "Novo", number: "30", depth: "full",
  last_updated: "2026-09-30",
  trajetoria: "Business administration graduate of FGV (Fundação Getulio Vargas) and a businessman before entering politics. Elected governor of Minas Gerais in 2018 and reelected in 2022; left office in 2026 to run for president.",
  profile: {
    formacao: [ { l: "fato", t: "Business administration graduate of FGV. Education level declared to the Tribunal Superior Eleitoral (TSE — Brazil's Superior Electoral Court): completed higher education." } ],
    privada: [ { l: "fato", t: "Businessman before entering politics (occupation declared to the TSE). In the letter accompanying his government plan, he says he started working in his father's workshop and expanded a chain of stores across the interior of the state." } ],
    publica: [ { l: "fato", t: "Elected governor of Minas Gerais in 2018 and reelected in 2022 in the first round; left office in 2026 to run for president." } ],
    resultados: [
      { l: "dado", t: "Employment: Minas Gerais recorded a net gain of 1,024,785 formal jobs from January 2019 to mid-2025, according to Novo Caged (formal-employment registry) data released by the state government." },
      { l: "dado", t: "Public accounts: the government reported a budget surplus of R$1.1 billion in 2025, its fifth consecutive year of balance. The Fiscal Management Report for the same year recorded a shortfall of R$11.3 billion in unearmarked funds and net debt of R$187.1 billion." },
      { l: "ctx", t: "Part of the fiscal relief came from renegotiating the state's debt with the federal government (joining Propag, the state-debt renegotiation program). The government attributes the negative cash balance to inherited liabilities." }
    ],
    economia: "Fiscal shock, broad privatization, gradual reduction of the corporate income tax (IRPJ), administrative reform, a new pension reform and a more flexible labor alternative to the CLT (Consolidated Labor Laws).",
    seguranca: "Classify criminal factions as terrorist organizations, maximum-security prisons, lowering the age of criminal responsibility and tougher pretrial detention for repeat offenders.",
    instituicoes: [
      { l: "prop", t: "End of 100-year secrecy orders, abolition of the party and electoral funds, a mixed district-member electoral system, an end to reelection and stricter requirements for Supremo Tribunal Federal (STF — Brazil's Supreme Federal Court) justices." },
      { l: "prop", t: "In the plan filed with the TSE: move insult and defamation to the civil sphere and bar platforms from removing profiles, including by court order." }
    ],
    social: [ { l: "prop", t: "“Casas da Cidadania” (Citizenship Houses) with a family plan for exiting poverty; continued eligibility of able-bodied adults for Bolsa Família (cash-transfer program) conditioned on work, study or job training; a R$5,000 bonus for families that leave the program due to increased income." } ],
    saude: [ { l: "prop", t: "A unified national health record (electronic medical record), public-private data integration, expansion of the Family Health Strategy and use of idle private-sector capacity to reduce waiting lines." } ]
  },
  propostas: ["Fiscal shock", "Broad privatization", "Gradual corporate income tax (IRPJ) cut", "New pension reform", "Labor alternative to the CLT", "Criminal factions as terrorist organizations", "End to reelection", "Casas da Cidadania", "Unified national medical record"],
  controversias: [
    { t: "TSE fine for institutional advertising (2022)", l: "jud",
      d: "On May 14, 2024, the TSE unanimously rejected the accusations of abuse of power and the request to remove him from office, but fined Zema 5,000 Ufirs (a fiscal reference unit) for keeping institutional advertising links accessible during the restricted period of the 2022 campaign.",
      status: ["multa"], src: { o: "Consultor Jurídico", r: "TSE rejects abuse of power but fines Zema", p: "May 14, 2024", url: "https://conjur.com.br/2024-mai-14/tse-afasta-abuso-de-poder-mas-multa-zema-por-publicidade-institucional/" } },
    { t: "Indictment for slander of Gilmar Mendes", l: "alg",
      d: "On May 15, 2026, the Procuradoria-Geral da República (PGR — Office of the Prosecutor General) indicted Zema before the Superior Tribunal de Justiça (STJ — Superior Court of Justice) for slander of Justice Gilmar Mendes, over satirical videos (“Os intocáveis” — “The Untouchables”) that linked justices to the Banco Master case. Zema said he will not back down.",
      status: ["denuncia"], src: { o: "Agência Brasil", r: "PGR indicts Zema for slander of Gilmar Mendes", p: "May 15, 2026", url: "https://agenciabrasil.ebc.com.br/justica/noticia/2026-05/pgr-denuncia-zema-por-calunia-contra-gilmar-mendes" } },
    { t: "Governor's salary increase", l: "fato",
      d: "Zema signed Law 24,314/2023, which raised in stages the salaries of the governor, lieutenant governor and state secretaries; the governor's salary reached R$41,845.49 in February 2025.",
      status: ["sem_imputacao"], src: { o: "Assembleia Legislativa de Minas Gerais", r: "Law 24,314/2023", p: "May 3, 2023", url: "https://www.almg.gov.br/comunicacao/noticias/arquivos/Sancionado-reajuste-para-governador-vice-e-secretarios/" } }
  ],
  sources: [
    { t: "TSE — Open Data Portal, Candidates 2026", url: "https://dadosabertos.tse.jus.br/pt_BR/dataset/candidatos-2026" },
    { t: "TSE — government plan filed with the TSE (“Plano Implacável,” “BR - Proposta de governo” package)", url: "https://cdn.tse.jus.br/estatistica/sead/odsele/proposta_governo/proposta_governo_2026_BR.zip" },
    { t: "Revista Viver Brasil — Novo Caged, 1 million jobs (Aug. 2025)", url: "https://revistaviverbrasil.com.br/minas-gerais-atinge-marca-de-1-milhao-de-empregos-formais-criados-desde-2019/" },
    { t: "O Tempo — 2025 Fiscal Management Report (Feb. 20, 2026)", url: "https://www.otempo.com.br/politica/2026/2/20/minas-tem-rombo-de-r-11-3-bilhoes-no-caixa-no-ultimo-ano-do-governo-de-romeu-zema" },
    { t: "ALMG — Law 24,314/2023 (salary increase)", url: "https://www.almg.gov.br/comunicacao/noticias/arquivos/Sancionado-reajuste-para-governador-vice-e-secretarios/" },
    { t: "Consultor Jurídico — TSE ruling (May 14, 2024)", url: "https://conjur.com.br/2024-mai-14/tse-afasta-abuso-de-poder-mas-multa-zema-por-publicidade-institucional/" },
    { t: "Agência Brasil — PGR indictment (May 15, 2026)", url: "https://agenciabrasil.ebc.com.br/justica/noticia/2026-05/pgr-denuncia-zema-por-calunia-contra-gilmar-mendes" }
  ],
  compare: {
    experiencia: "Business administration (FGV), businessman. Elected governor of Minas Gerais in 2018 and reelected in 2022; left office in 2026.",
    fiscal: "Fiscal shock, administrative reform and a new pension reform.",
    impostos: "Gradual corporate income tax (IRPJ) cut.",
    estatais: "Broad privatization.",
    trabalho: "A more flexible labor alternative to the CLT.",
    seguranca: "Criminal factions as terrorist organizations, maximum-security prisons, lowering the age of criminal responsibility and tougher pretrial detention for repeat offenders.",
    stf: "Stricter requirements for STF justices; end of 100-year secrecy orders, end of the party and electoral funds, mixed district-member system and an end to reelection.",
    sociais: "Casas da Cidadania; Bolsa Família conditioned on work or study for able-bodied adults; exit bonus.",
    saude: "Unified national medical record, public-private integration and expansion of Family Health."
  }
},
{
  id: "ronaldo-caiado", photo: "assets/images/president/ronaldo-caiado.jpg", name: "Ronaldo Caiado", party: "PSD", number: "55", depth: "full",
  last_updated: "2026-09-30",
  trajetoria: "Physician, professor and farmer. Federal representative for five legislative terms, senator and governor of Goiás from 2019 to 2026.",
  profile: {
    formacao: [ { l: "fato", t: "Physician (occupation declared to the Tribunal Superior Eleitoral — TSE, Brazil's Superior Electoral Court; education level: completed higher education), trained in orthopedics." } ],
    privada: [ { l: "fato", t: "Physician, professor and farmer. Chaired the União Democrática Ruralista (UDR, a landowners' association) from 1986 to 1989." } ],
    publica: [
      { l: "fato", t: "Federal representative for five legislative terms (1991–1995 and 1999–2015) and senator for Goiás (2015–2019)." },
      { l: "fato", t: "Elected governor of Goiás in 2018 and reelected in 2022; left office on March 31, 2026. Was a presidential candidate in 1989." }
    ],
    resultados: [
      { l: "dado", t: "Education: Goiás's state school system had the highest high-school score in the country on the 2023 Ideb (basic-education quality index), at 4.8, according to Inep." },
      { l: "dado", t: "Public security: a 43% drop in the homicide rate between 2019 and 2024, the third-largest among the states, according to the 2026 Atlas of Violence (Ipea/FBSP)." },
      { l: "ctx", t: "Public accounts: Goiás joined the Regime de Recuperação Fiscal (RRF — federal fiscal-recovery program for indebted states) in December 2021, which suspended payments on its debt to the federal government for 18 months." }
    ],
    economia: "Fiscal stabilization, control of mandatory spending, review of subsidies, productivity, infrastructure and a combination of public and private investment.",
    seguranca: "A Ministry of Public Security, criminal intelligence, border control, the prison system, lowering the age of criminal responsibility and new legislation against criminal organizations.",
    instituicoes: [ { l: "prop", t: "Adoption of a mixed district-member electoral system, fully traceable political financing, a public dashboard of parliamentary budget amendments and integrity standards (prior vetting, cooling-off periods, public schedules) for senior officials." } ],
    social: [ { l: "prop", t: "Preserve cash-transfer programs with a transition rule for those entering formal employment; a National Integrated Social Management System and a National Social Emancipation Plan." } ],
    saude: [ { l: "prop", t: "Preserve the principles of the SUS (Brazil's public health system) with preventive care, interoperable medical records, transparent waiting lines, specialist care at the right time, hospitals paid for quality and results, and regional specialty networks." } ]
  },
  observar: "Compare proposals with actual Goiás indicators in public security, education, fiscal policy and health.",
  propostas: ["Fiscal stabilization", "Control of mandatory spending", "Review of subsidies", "Ministry of Public Security", "Lowering the age of criminal responsibility", "New law against criminal organizations", "Mixed district-member system", "Transparent waiting lines in the SUS"],
  controversias: [
    { t: "Prohibited conduct in the 2024 municipal elections", l: "jud",
      d: "In December 2024, a trial court declared Caiado ineligible for eight years over the use of the Palácio das Esmeraldas (the governor's official residence) for political dinners during the Goiânia campaign. On April 8, 2025, the TRE-GO (Goiás Regional Electoral Court) unanimously overturned the ineligibility and upheld a R$60,000 fine for prohibited conduct. The decision could still be appealed to the TSE.",
      status: ["multa", "anulado"], note: "Ineligibility reversed; fine upheld.",
      src: { o: "InfoMoney", r: "TRE-GO reverses Ronaldo Caiado's ineligibility", p: "April 8, 2025", url: "https://www.infomoney.com.br/politica/tre-go-reverte-inelegibilidade-de-ronaldo-caiado-por-abuso-de-poder-politico/" } },
    { t: "Military police security detail after leaving office", l: "jud",
      d: "The Goiás Ministério Público (MP-GO — state public prosecutors) filed an administrative-misconduct (improbity) lawsuit over the use of 51 military police officers for the security of Caiado and his family. On July 6, 2026, the court issued a preliminary injunction ordering a reduction to four officers. Caiado says the protection stems from threats by criminal factions.",
      status: ["liminar", "acao"], src: { o: "Metrópoles", r: "Court orders Caiado to cut personal security from 51 to 4 military police officers", p: "July 6, 2026", url: "https://www.metropoles.com/brasil/justica-determina-que-caiado-reduza-seguranca-pessoal-de-51-para-4-pms" } },
    { t: "Fintech under investigation used in state social programs", l: "fato",
      d: "According to Folha de S.Paulo, the Goiás government moved R$1.36 billion from cash-transfer programs (Oct. 2021–Aug. 2025) through BK Bank, which is under investigation in Operation Carbono Oculto over suspected links to the PCC (a criminal organization). The government says the accreditation was lawful and predated the investigations.",
      status: ["sem_imputacao"], note: "There is no indication of a personal investigation of Caiado in the material consulted.",
      src: { o: "O Hoje (via Folha de S.Paulo)", r: "Caiado government used fintech under investigation", p: "May 26, 2026", url: "https://ohoje.com/2026/05/26/governo-caiado-usou-fintech-investigada-por-ligacao-com-pcc-para-movimentar-r-136-bilhao-diz-folha/" } }
  ],
  sources: [
    { t: "TSE — Open Data Portal, Candidates 2026", url: "https://dadosabertos.tse.jus.br/pt_BR/dataset/candidatos-2026" },
    { t: "TSE — government plan filed with the TSE (“BR - Proposta de governo” package)", url: "https://cdn.tse.jus.br/estatistica/sead/odsele/proposta_governo/proposta_governo_2026_BR.zip" },
    { t: "Wikipedia (English) — terms and dates", url: "https://en.wikipedia.org/wiki/Ronaldo_Caiado" },
    { t: "Sagres / Inep — 2023 high-school Ideb (Aug. 2024)", url: "https://sagresonline.com.br/goias-tem-maior-nota-do-ensino-medio-no-ideb-2023-veja-ranking-dos-estados/" },
    { t: "Serra Dourada News / 2026 Atlas of Violence (Ipea/FBSP)", url: "https://sdnews.com.br/noticia/15959/goias-registra-queda-de-58-4-nos-homicidios-aponta-atlas-da-violencia-2026.html" },
    { t: "Poder360 — joining the Regime de Recuperação Fiscal (Dec. 24, 2021)", url: "https://www.poder360.com.br/brasil/bolsonaro-inclui-goias-no-regime-de-recuperacao-fiscal/" },
    { t: "InfoMoney — TRE-GO decision (April 8, 2025)", url: "https://www.infomoney.com.br/politica/tre-go-reverte-inelegibilidade-de-ronaldo-caiado-por-abuso-de-poder-politico/" },
    { t: "Metrópoles — preliminary injunction on the security detail (July 6, 2026)", url: "https://www.metropoles.com/brasil/justica-determina-que-caiado-reduza-seguranca-pessoal-de-51-para-4-pms" },
    { t: "O Hoje / Folha — BK Bank and social programs (May 26, 2026)", url: "https://ohoje.com/2026/05/26/governo-caiado-usou-fintech-investigada-por-ligacao-com-pcc-para-movimentar-r-136-bilhao-diz-folha/" }
  ],
  compare: {
    experiencia: "Physician, professor and farmer. Federal representative (5 legislative terms), senator and governor of Goiás 2019–2026.",
    fiscal: "Fiscal stabilization, control of mandatory spending and review of subsidies.",
    estatais: "Combination of public and private investment.",
    seguranca: "Ministry of Public Security, criminal intelligence, border control, the prison system, lowering the age of criminal responsibility and a new law against criminal organizations.",
    stf: "Mixed district-member system, traceable political financing, transparency of budget amendments and integrity of senior officials.",
    sociais: "Cash transfers preserved with a gradual exit path and a National Social Emancipation Plan.",
    saude: "Transparent waiting lines, interoperable medical records, specialist care at the right time and regional networks."
  }
}
];

EB.issues = [
  { id: "jornada", group: "Labor", q: "Working hours",
    positions: [
      { p: "Current workweek", c: [] },
      { p: "40 hours / end of the 6x1 schedule", c: ["lula"] },
    ] },
  { id: "maioridade", group: "Public security", q: "Age of criminal responsibility",
    positions: [
      { p: "Lower the age of criminal responsibility", c: ["ronaldo-caiado", "romeu-zema"] },
      { p: "“Age of criminal responsibility” cited as a proposal (no details in the material)", c: ["flavio-bolsonaro"] }
    ] },
  { id: "terrorismo", group: "Public security", q: "Classify criminal factions as terrorism",
    positions: [ { p: "Proposes", c: ["romeu-zema"] } ] },
  { id: "presidios", group: "Public security", q: "Expand prisons",
    positions: [
      { p: "High- / maximum-security prisons", c: ["flavio-bolsonaro", "romeu-zema"] },
      { p: "El Salvador–inspired mega-prisons", c: ["renan-santos"] },
      { p: "Prison system (priority)", c: ["ronaldo-caiado"] }
    ] },
  { id: "confisco", group: "Public security", q: "Expand confiscation and surveillance",
    positions: [
      { p: "Asset confiscation and expanded surveillance", c: ["renan-santos"] },
      { p: "Facial recognition", c: ["flavio-bolsonaro"] },
    ] },
  { id: "estatais", group: "State-owned companies", q: "Privatize, keep or nationalize",
    positions: [
      { p: "Broad privatization", c: ["romeu-zema"] },
      { p: "Privatizations", c: ["flavio-bolsonaro"] },
    ] },
  { id: "arcabouco", group: "State and economy", q: "Fiscal framework",
    positions: [
      { p: "Keep / deepen", c: ["lula"] },
      { p: "Overhaul fiscal rules", c: ["flavio-bolsonaro"] },
    ] },
  { id: "previdencia", group: "State and economy", q: "Pensions",
    positions: [
      { p: "New pension reform", c: ["romeu-zema"] },
    ] },
  { id: "clt", group: "State and economy", q: "Labor law",
    positions: [
      { p: "More flexible alternative to the CLT", c: ["romeu-zema"] },
      { p: "Lower labor costs", c: ["flavio-bolsonaro"] },
    ] },
  { id: "divida", group: "State and economy", q: "How to handle the debt",
    positions: [
      { p: "Gradual reduction / deficit close to zero", c: ["augusto-cury"] },
      { p: "Immediate fiscal adjustment / de-indexation", c: ["renan-santos"] },
      { p: "Fiscal shock", c: ["romeu-zema"] },
      { p: "Fiscal stabilization", c: ["ronaldo-caiado"] },
    ] },
  { id: "stf", group: "STF and institutions", q: "Changes to the STF",
    positions: [
      { p: "Nine justices, 8-year terms", c: ["augusto-cury"] },
      { p: "End to monocratic decisions / judicial reform", c: ["flavio-bolsonaro"] },
      { p: "Stricter requirements for justices", c: ["romeu-zema"] }
    ] },
  { id: "redes", group: "STF and institutions", q: "Digital platforms",
    positions: [ { p: "Regulation of social networks and platforms", c: ["lula"] } ] }
];
