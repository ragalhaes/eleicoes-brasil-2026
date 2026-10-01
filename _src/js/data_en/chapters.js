/* =========================================================
   HISTORICAL CHAPTERS — content from files 02 to 08
   Editorial source: site-content-eleicoes-2026 (09/30/2026)

   Blocks:
     {p, l}        paragraph (l = optional label → becomes a labeled block)
     {ul, l, title} list
     {box:{l, title, p|ul}}  labeled highlight box
     {stats:[...]} big numbers {v,u,k,d,l,src}
     {bars:{title, l, rows:[{n,v,s}], unit, src}}
     {seq:[...] , l} narrative sequence (arrows)
     {kv:{title, l, rows:[[k,v]]}}
     {vote:{...}} judicial scoreboard
     {timeline:{l, rows:[{d,t}]}}
   src = {o: body/source, r: reference, p: period, n: note, url}
   ========================================================= */
window.EB = window.EB || {};

EB.chapters = [

/* ---------------------------------------------------- 02 */
{
  id: "antes-de-bolsonaro", num: "01", years: "1994–2018",
  kicker: "Brazil before Bolsonaro",
  title: "The 2018 rupture",
  file: "02-brasil-antes-de-bolsonaro.md",
  labels: ["fato", "dado", "ed"],
  home: [
    { p: "For two decades, the race for the presidency was dominated by the PT and the PSDB. Between 1994 and 2014, the two parties were the main poles of Brazilian presidential elections." },
    { p: "That balance began to erode in the 2010s. The 2013 protests, the 2015–2016 recession, Operation Car Wash (Operação Lava Jato), the impeachment of Dilma Rousseff and the wear and tear on the traditional parties created a political environment very different from that of previous elections." },
    { p: "It was in this setting that Jair Bolsonaro stopped being merely a congressman known for his conservative positions and became the center of a new right-wing electoral coalition." },
    { p: "In this project's editorial interpretation, 2018 represented more than a simple change of power: it marked the electoral consolidation of a right that combined social conservatism, tougher public security, gun rights, anti-PT sentiment (antipetismo) and a more liberal economic agenda.", l: "ed" }
  ],
  stats: [
    { v: "55.13", u: "%", k: "2018 runoff", d: "Bolsonaro won with 57,797,847 votes, 55.13% of valid votes.", l: "dado",
      src: { o: "TSE", r: "Official results of the 2018 elections", p: "Runoff, 2018" } },
    { v: "46.03", u: "%", k: "2018 first round", d: "With just eight seconds per block of free electoral airtime.", l: "dado",
      src: { o: "TSE", r: "Official results of the 2018 elections", p: "First round, 2018" } },
    { v: "−3.5 / −3.3", u: "%", k: "GDP 2015 / 2016", d: "The recession that preceded the impeachment.", l: "dado",
      src: { o: "IBGE", r: "GDP 2015 and 2016", p: "2015–2016" } }
  ],
  sections: [
    { h: "Two decades of PT and PSDB", b: [
      { p: "From 1994 to 2014, the PT and the PSDB were the two major poles of presidential elections. That does not mean they were the same. They had distinct electoral bases, platforms and alliances.", l: "fato" },
      { box: { l: "ed", title: "Editorial interpretation",
        p: ["The project's editorial interpretation is different: that contest did not offer equivalent presidential representation to a popular right that would bring together, in a single political identity, social conservatism, support for a smaller state, economic liberalization, tougher security policy, guns and defense of the traditional family.",
            "The right existed socially and in Congress. What was missing was a presidential candidacy capable of turning those causes into a mass electoral identity."] } }
    ]},
    { h: "2013: the first major crack", b: [
      { p: "The June 2013 protests began over increases in public transit fares and quickly became heterogeneous. Corruption, health care, education, World Cup spending and criticism of the federal government were among the demands.", l: "fato" },
      { p: "There is no single academic interpretation of their causal relationship to the later rise of the right.", l: "ctx" },
      { p: "For this project, 2013 serves as a sign that the traditional party system was losing its capacity for representation, not as an ideologically homogeneous movement.", l: "ed" }
    ]},
    { h: "Economic crisis, Lava Jato and impeachment", b: [
      { stats: [
        { v: "−3.5", u: "%", k: "GDP 2015", l: "dado", src: { o: "IBGE", r: "GDP 2015", p: "2015" } },
        { v: "−3.3", u: "%", k: "GDP 2016", l: "dado", src: { o: "IBGE", r: "GDP 2016", p: "2016" } },
        { v: "61 × 20", u: "", k: "Impeachment in the Senate", d: "Dilma Rousseff definitively removed from office on August 31, 2016.", l: "fato", src: { o: "Chamber of Deputies / Senate", r: "Impeachment proceedings against Dilma Rousseff", p: "08/31/2016" } }
      ]},
      { p: "Operation Lava Jato (Car Wash) began in March 2014 investigating corruption and money laundering and later expanded into multiple cases.", l: "fato", src: { o: "MPF (Federal Prosecution Service)", r: "History of Operation Lava Jato", p: "2014–" } },
      { seq: ["2013", "Lava Jato", "Recession", "Impeachment", "Crisis of the traditional parties"], l: "ana", title: "Narrative sequence" }
    ]},
    { h: "Bolsonaro was not a political outsider", b: [
      { p: "Bolsonaro had been a federal congressman since 1991 and had been elected seven times to the Câmara dos Deputados (Chamber of Deputies).", l: "fato", src: { o: "Chamber of Deputies", r: "Parliamentary biography of Jair Bolsonaro" } },
      { p: "He should therefore not be presented as a political outsider. The rupture lay elsewhere: he did not come from the party axis that dominated presidential elections, and he began the campaign with a small party structure.", l: "ana" },
      { p: "In the first round of 2018, his coalition had just eight seconds per block of free electoral airtime. Even so, he finished the first round with 46.03% of valid votes.", l: "dado", src: { o: "TSE", r: "Official 2018 results", p: "First round, 2018" } }
    ]},
    { h: "More than anti-PT sentiment", b: [
      { p: "Antipetismo (anti-PT sentiment) mattered, but it does not explain everything.", l: "ana" },
      { p: "Bolsonaro brought together social conservatives, supporters of tougher security policies, pro-gun voters, economic liberals, religious groups, critics of corruption and people whose main identity was rejection of the PT.", l: "ana" },
      { box: { l: "ed", title: "Editorial thesis", p: ["Bolsonaro did not create the Brazilian right; he turned already existing demands and groups into a mass presidential force."] } }
    ]},
    { h: "Defining “the system”", b: [
      { box: { l: "met", title: "How the site uses the word",
        p: ["In this project, “the system” does not mean a secret organization or a formal centralized command.",
            "It is an editorial category used to describe an informal network of traditional parties, party leaders, institutional actors, sectors of the press and highly influential figures in Brasília.",
            "These actors do not form a homogeneous bloc and often have conflicting interests."] } },
      { p: "The editorial thesis is that Bolsonaro's rise confronted the interests and consensus of parts of this traditional political structure.", l: "ed" }
    ]},
    { h: "Criticisms of Bolsonaro acknowledged by the project itself", b: [
      { p: "The project does not depend on portraying Bolsonaro as infallible. Three criticisms the author accepts:", l: "ed" },
      { ul: [
        "Accusations against electronic voting machines without sufficient evidence of fraud in the voting system.",
        "His stance toward Vladimir Putin and the war in Ukraine.",
        "Praise for Brazil's military regime."
      ], l: "ed", ol: true }
    ]}
  ],
  sources: [
    "TSE — official results of the 2018 elections.",
    "Chamber of Deputies — parliamentary biography of Jair Bolsonaro.",
    "IBGE — GDP 2015 and 2016.",
    "MPF — history of Operation Lava Jato.",
    "Chamber of Deputies / Senate — impeachment proceedings against Dilma Rousseff.",
    "SciELO academic literature on 2013, conservatism and the reorganization of the right."
  ]
},

/* ---------------------------------------------------- 03 */
{
  id: "governo-bolsonaro", num: "02", years: "2019–2022",
  kicker: "Bolsonaro in power",
  title: "Reforms, economy and results",
  file: "03-governo-bolsonaro.md",
  labels: ["fato", "dado", "met"],
  home: [
    { p: "Bolsonaro reached the presidency with an agenda that combined political conservatism with a more liberal economic orientation led by Paulo Guedes." },
    { p: "Between 2019 and 2022, significant structural changes were approved: pension reform, the Economic Freedom Law, the new sanitation framework, formal autonomy for the Banco Central (Central Bank), the new gas framework and the new railway framework. The period also saw infrastructure concessions and the privatization of Eletrobras." },
    { p: "The Central Government ended 2022 with a primary surplus of about R$54 billion, while the consolidated public sector posted a surplus of 1.28% of GDP. Gross debt ended the year at 73.5% of GDP." },
    { p: "The period, however, also saw high inflation: IPCA (consumer price index) of 10.06% in 2021 and 5.79% in 2022." }
  ],
  stats: [
    { v: "+4.8 / +3.0", u: "%", k: "GDP 2021 / 2022", d: "After a 3.3% drop in 2020, the year of the Covid-19 shock.", l: "dado", src: { o: "IBGE", r: "GDP", p: "2019–2022" } },
    { v: "9.3", u: "%", k: "Average unemployment 2022", d: "Versus 13.8% in 2020 and 13.2% in 2021.", l: "dado", src: { o: "IBGE", r: "PNAD Contínua — annual average rate", p: "2019–2022" } },
    { v: "10.06", u: "%", k: "IPCA 2021", d: "High inflation; 5.79% in 2022.", l: "dado", src: { o: "IBGE", r: "IPCA", p: "2020–2022" } }
  ],
  sections: [
    { h: "Reforms and frameworks", b: [
      { cards: [
        { t: "Pension reform", k: "Constitutional Amendment 103/2019", d: "Changed the minimum age, transition rules, benefit calculations and pension rules for civil servants and the General Regime." },
        { t: "Economic Freedom", k: "Law 13,874/2019", d: "Established principles protecting free enterprise and exemptions for low-risk activities." },
        { t: "New sanitation framework", k: "Law 14,026/2020", d: "Changed contracting and regulatory rules and opened more room for competition and private participation." },
        { t: "Central Bank autonomy", k: "Complementary Law 179/2021", d: "Created fixed, non-coinciding terms for the governor and directors and set price stability as the fundamental objective." },
        { t: "Gas and railways", k: "Laws 14,134/2021 and 14,273/2021", d: "Reorganized the rules for the natural gas and railway sectors." }
      ], l: "fato", src: { o: "Planalto", r: "Constitutional Amendment 103/2019, Laws 13,874/2019, 14,026/2020, Complementary Law 179/2021, 14,134/2021, 14,273/2021" } },
      { p: "The national average time to open a business fell to about 23 hours in 2022, versus roughly 5 days and 9 hours at the start of 2019.", l: "dado" },
      { p: "The metric does not necessarily cover all subsequent licenses.", l: "met" }
    ]},
    { h: "Concessions and privatizations", b: [
      { p: "The period saw rounds of concessions for airports, ports, highways and railways.", l: "fato", src: { o: "Ministry of Infrastructure / Federal Government", r: "Concessions 2019–2022" } },
      { p: "In 2022, Eletrobras was privatized through a capital increase that diluted the federal government's voting stake.", l: "fato" },
      { box: { l: "met", title: "Editorial caution", p: ["Investments announced or contracted for future decades should not be treated as money actually invested during the four years."] } }
    ]},
    { h: "GDP", b: [
      { bars: { l: "dado", unit: "%", signed: true, rows: [ { n: "2019", v: 1.2 }, { n: "2020", v: -3.3, s: "Covid-19" }, { n: "2021", v: 4.8 }, { n: "2022", v: 3.0 } ],
        src: { o: "IBGE", r: "Annual GDP", p: "2019–2022" } } },
      { p: "2020 should be treated separately because of the Covid-19 shock.", l: "met" }
    ]},
    { h: "Employment", b: [
      { bars: { l: "dado", unit: "%", title: "Average annual unemployment", rows: [ { n: "2019", v: 12.0 }, { n: "2020", v: 13.8 }, { n: "2021", v: 13.2 }, { n: "2022", v: 9.3 } ],
        src: { o: "IBGE", r: "PNAD Contínua", p: "2019–2022" } } },
      { p: "In 2022, the average employed population reached about 98 million people, at the time the highest figure in the series that began in 2012.", l: "dado" },
      { p: "Informality remained high.", l: "ctx" }
    ]},
    { h: "Inflation", b: [
      { bars: { l: "dado", unit: "%", title: "IPCA", rows: [ { n: "2020", v: 4.52 }, { n: "2021", v: 10.06 }, { n: "2022", v: 5.79 } ],
        src: { o: "IBGE", r: "IPCA", p: "2020–2022" } } },
      { p: "In 2021, transportation, fuel and housing weighed heavily; gasoline prices rose sharply.", l: "ctx" },
      { p: "Reading note: do not describe the economy of the period as “excellent” without qualification, nor attribute all of the inflation to domestic policy.", l: "met" }
    ]},
    { h: "Public finances", b: [
      { stats: [
        { v: "~54", u: "R$ bn", k: "Primary surplus — Central Government 2022", l: "dado", src: { o: "National Treasury", r: "Primary balance", p: "2022" } },
        { v: "1.28", u: "% GDP", k: "Surplus — consolidated public sector 2022", l: "dado", src: { o: "Central Bank", r: "Fiscal statistics", p: "2022" } },
        { v: "73.5", u: "% GDP", k: "Gross debt, end of 2022", l: "dado", src: { o: "Central Bank", r: "Fiscal statistics", p: "Dec. 2022" } }
      ]},
      { p: "Part of the improvement came from economic recovery, tax revenue, concessions, natural-resource revenue and dividends.", l: "ctx" }
    ]},
    { h: "Foreign trade", b: [
      { stats: [
        { v: "~231.9", u: "US$ bn", k: "Exports 2018", l: "dado" },
        { v: "~334.1", u: "US$ bn", k: "Exports 2022", l: "dado" },
        { v: "~61.5", u: "US$ bn", k: "Trade surplus 2022", l: "dado" }
      ]},
      { p: "These figures should be put in context with the exchange rate and international commodity prices.", l: "met" }
    ]},
    { h: "Factual conclusion", b: [
      { box: { l: "ctx", title: "Summary", p: ["The government implemented an identifiable economic and regulatory agenda, went through the world's biggest public health crisis in decades and ended 2022 with growth, falling unemployment, fiscal recovery and inflation lower than in 2021, though still high."] } }
    ]}
  ],
  sources: [
    "Planalto — Constitutional Amendment 103/2019, Laws 13,874/2019, 14,026/2020, Complementary Law 179/2021, 14,134/2021, 14,273/2021.",
    "IBGE — GDP, employment and IPCA.",
    "Central Bank — fiscal statistics.",
    "National Treasury — primary balance.",
    "Ministry of Infrastructure / Federal Government — concessions."
  ]
},

/* ---------------------------------------------------- 04 */
{
  id: "pandemia", num: "03", years: "2020–2021",
  kicker: "Pandemic",
  title: "Public health decisions and the escalation of conflict",
  file: "04-pandemia.md",
  labels: ["fato", "jud", "ana", "ed"],
  home: [
    { p: "Covid-19 completely changed the Bolsonaro government. Starting in 2020, public health questions came to involve, simultaneously, incomplete science, restrictions on rights, economic activity, education, federalism and court rulings." },
    { p: "Bolsonaro positioned himself early against widespread and prolonged restrictions, questioned school closures, publicly downplayed the risk of the disease in certain remarks, clashed with governors and with health ministers, championed hydroxychloroquine and adopted a publicly distrustful stance toward some vaccines.", l: "fato" },
    { p: "At the same time, two oversimplifications should be avoided: the Supremo Tribunal Federal (STF — Brazil's Supreme Federal Court) did not prohibit the federal government from acting; and prolonged school closures accumulated documented evidence of significant harm.", l: "ctx" }
  ],
  stats: [
    { v: "615", u: "R$ bn", k: "Fiscal impact of 2020 measures", d: "About R$321.8 billion went to the Auxílio Emergencial (emergency aid).", l: "dado", src: { o: "National Treasury", r: "Fiscal impact of the pandemic", p: "2020" } },
    { v: "279.4", u: "days", k: "Schools closed (average)", d: "Brazil was among the countries with schools closed the longest in 2020.", l: "dado", src: { o: "UNICEF", r: "School closures", p: "2020", n: "Average for the universe analyzed by UNICEF." } },
    { v: "3", u: "ministers", k: "Health in 2020", d: "Mandetta, Teich (about 28 days) and Pazuello.", l: "fato" }
  ],
  sections: [
    { h: "March 2020", b: [
      { p: "First official case in Brazil: February 26, 2020.", l: "fato" },
      { p: "On March 24, Bolsonaro criticized school closures and certain restrictions and used the expression “gripezinha ou resfriadinho” (“a little flu or a little cold”) when talking about what he believed would happen to him if he were infected.", l: "fato" },
      { p: "The phrase was said and contributed to the perception that he was downplaying the disease, but its context should be preserved.", l: "ctx" }
    ]},
    { h: "The STF and federal powers", b: [
      { p: "In ADI 6341, the STF recognized the concurrent authority of the federal government, states, the Federal District and municipalities to respond to the pandemic.", l: "jud", src: { o: "STF", r: "ADI 6341 and Covid summary", p: "2020" } },
      { p: "The federal government did not lose its power to act nationally. Nor could states and municipalities be prevented from acting within their powers.", l: "jud" },
      { myths: [
        { m: "“The STF handed the entire pandemic over to the governors.”", v: "Incorrect" },
        { m: "“Bolsonaro could simply revoke all state restrictions.”", v: "Also incorrect" }
      ] }
    ]},
    { h: "Lockdowns", b: [
      { p: "In early 2020 there was no vaccine, no proven specific treatment and no significant population immunity.", l: "ctx" },
      { p: "Packages of contact-reduction measures reduced transmission in the initial phase, according to retrospective studies.", l: "fato", src: { o: "Nature / BMJ", r: "Non-pharmaceutical interventions" } },
      { p: "But “lockdown” covers very different interventions. The effect and proportionality varied by intensity, duration and context.", l: "ctx" }
    ]},
    { h: "Schools", b: [
      { p: "The initial closure took place amid great uncertainty. Over time, evidence showed substantial educational and social harm and a greater ability to reopen schools with mitigation.", l: "fato" },
      { p: "UNICEF, UNESCO and PAHO/WHO came to advocate safe reopening as a priority.", l: "fato", src: { o: "UNICEF / UNESCO / PAHO-WHO", r: "Education and reopening" } },
      { stats: [
        { v: "279.4", u: "days", k: "Average school closure (UNICEF)", l: "dado", src: { o: "UNICEF", r: "School closures", p: "2020" } },
        { v: "5.1", u: "million", k: "Without adequate access to education (Nov. 2020)", d: "Children and adolescents.", l: "dado", src: { o: "UNICEF", r: "Education during the pandemic", p: "Nov. 2020" } }
      ]},
      { box: { l: "ed", title: "Defensible editorial conclusion", p: ["Questioning prolonged school closures later found significant support. That does not prove the initial decision of March 2020 was irrational."] } }
    ]},
    { h: "Masks", b: [
      { p: "International guidance evolved in 2020. The WHO significantly updated its public recommendation on June 5, 2020.", l: "fato", src: { o: "WHO", r: "Guidance on masks", p: "06/05/2020" } },
      { p: "Later evidence supported especially surgical and higher-quality masks in transmission settings.", l: "fato" },
      { p: "“The recommendation changed” is not proof that masks were useless.", l: "met" }
    ]},
    { h: "Hydroxychloroquine", b: [
      { p: "It was legitimate to study the drug at the start of the pandemic.", l: "ana" },
      { p: "Bolsonaro went beyond advocating research and publicly supported its use even while acknowledging the lack of scientific proof.", l: "fato" },
      { p: "Large subsequent studies did not demonstrate relevant clinical benefit for treating or preventing Covid-19.", l: "fato", src: { o: "WHO", r: "Hydroxychloroquine" } }
    ]},
    { h: "Ministry of Health", b: [
      { timeline: { l: "fato", rows: [
        { d: "Apr. 2020", t: "Luiz Henrique Mandetta leaves the post after disagreements with the president." },
        { d: "May 2020", t: "Nelson Teich leaves after about 28 days." },
        { d: "2020", t: "Eduardo Pazuello takes over on an interim basis and is later made permanent." }
      ]}},
      { p: "The rapid succession shows concrete disagreement over the federal public health strategy.", l: "ana" }
    ]},
    { h: "Vaccines", b: [
      { cards: [
        { t: "AstraZeneca / Fiocruz", k: "2020", d: "The government took part in the acquisition and technology-transfer strategy as early as 2020. It is therefore incorrect to say the federal government refused to buy any vaccine." },
        { t: "Pfizer", k: "Aug. 2020", d: "Pfizer submitted formal offers in August 2020. The government did not respond to the proposals within their validity period. Some of the contract terms faced legal obstacles that were only authorized later by Law 14,125/2021." },
        { t: "CoronaVac", k: "Oct. 2020 → Jan. 2021", d: "In October 2020, a memorandum of intent involving 46 million doses was announced. Bolsonaro publicly reacted against the purchase at that time. The vaccine ended up entering the Brazilian program and was authorized for emergency use by Anvisa (Brazil's health regulatory agency) in January 2021." }
      ], l: "fato", src: { o: "TCU (Federal Court of Accounts) / Senate", r: "Vaccine contracts and offers" } },
      { box: { l: "ed", title: "The right editorial question", p: ["Whether the government could or should have worked earlier to overcome the legal obstacles to the Pfizer offer."] } }
    ]},
    { h: "Fiscal response", b: [
      { p: "The federal response to the pandemic was enormous.", l: "ctx" },
      { stats: [
        { v: "615", u: "R$ bn", k: "Estimated fiscal impact, 2020", l: "dado", src: { o: "National Treasury", r: "Fiscal impact of Covid-19 response measures", p: "2020" } },
        { v: "321.8", u: "R$ bn", k: "Auxílio Emergencial", l: "dado", src: { o: "National Treasury", r: "Fiscal impact of Covid-19 response measures", p: "2020" } }
      ]}
    ]},
    { h: "Conclusion", b: [
      { p: "The pandemic accelerated and deepened the conflict between the federal government, governors, the STF, the press and platforms.", l: "ana" },
      { box: { l: "ed", title: "The project's position", p: ["Acknowledging Bolsonaro's mistakes on chloroquine and part of his communication about vaccines does not preclude investigating later institutional overreach."] } }
    ]}
  ],
  sources: [
    "STF — ADI 6341 and Covid summary.",
    "WHO — guidance on masks and hydroxychloroquine.",
    "Nature / BMJ — non-pharmaceutical interventions and schools.",
    "UNICEF / UNESCO / PAHO-WHO — education and reopening.",
    "TCU / Senate — vaccine contracts and offers.",
    "National Treasury — fiscal impact of the pandemic."
  ]
},

/* ---------------------------------------------------- 05 */
{
  id: "stf-tse-2022", num: "04", years: "2019–2022",
  kicker: "STF, TSE and freedom of expression",
  title: "The 2022 election",
  file: "05-stf-tse-eleicao-2022.md",
  labels: ["fato", "jud", "alg", "ed"],
  home: [
    { p: "The 2022 election did not begin in 2022. In the preceding years, the Supremo Tribunal Federal (STF — Brazil's Supreme Federal Court) expanded its role in response to threats, disinformation campaigns and attacks on institutions. A milestone was Inquiry 4,781, known as the Fake News Inquiry, opened in 2019 by the STF itself and led by Alexandre de Moraes. Its constitutionality was later upheld by the full Court, 10 votes to 1.", l: "jud" },
    { p: "In parallel, STF decisions changed Lula's legal situation. In 2021, Lula's convictions in the 13th Federal Court of Curitiba were annulled because that court lacked jurisdiction, and the STF also recognized Sergio Moro's bias in the triplex apartment case.", l: "jud" },
    { p: "In the 2022 election, the Tribunal Superior Eleitoral (TSE — Brazil's Superior Electoral Court) intervened forcefully against disinformation and political content. Resolution 23,714, approved ten days before the runoff, increased the speed and reach of content takedown orders.", l: "fato" },
    { p: "The project does not allege fraud in the voting machines or in the vote count. The question is institutional: whether the power used to control disinformation and political speech exceeded limits compatible with freedom of expression, due process and neutrality.", l: "ed" }
  ],
  stats: [
    { v: "10 × 1", u: "", k: "Inquiry 4,781 constitutional", d: "Full STF, June 2020.", l: "jud", src: { o: "STF", r: "ADPF 572 / Inquiry 4,781", p: "June 2020" } },
    { v: "8 × 3", u: "", k: "Annulment upheld", d: "Full Court confirms lack of jurisdiction of the 13th Federal Court of Curitiba. It was not an acquittal on the merits.", l: "jud", src: { o: "STF", r: "2021 decisions on Lula", p: "2021" } },
    { v: "50.90", u: "%", k: "Lula in the 2022 runoff", d: "Versus 49.10% for Bolsonaro.", l: "dado", src: { o: "TSE", r: "Official 2022 results", p: "Runoff, 2022" } }
  ],
  sections: [
    { h: "Inquiry 4,781", b: [
      { p: "Opened on March 14, 2019, by an administrative order of then-STF Chief Justice Dias Toffoli, who appointed Alexandre de Moraes as rapporteur.", l: "fato", src: { o: "STF", r: "ADPF 572 / Inquiry 4,781", p: "03/14/2019" } },
      { p: "The design was unusual because the very court that was the target of attacks opened the investigation.", l: "ana" },
      { p: "In June 2020, the full Court ruled the inquiry constitutional by 10 votes to 1. The Court also recognized limits: participation of the Public Prosecutor's Office (Ministério Público), defense access to material concerning those under investigation, and protection of press freedom.", l: "jud" },
      { p: "There were real controversies over defense access to the case files; the OAB (Brazilian Bar Association) acted to broaden that access.", l: "fato", src: { o: "OAB", r: "Defense access" } }
    ]},
    { h: "Lula returns to the electoral game", b: [
      { cards: [
        { t: "Imprisonment after second-instance conviction", k: "Nov. 2019 · 6 × 5", d: "The STF ruled that, as a rule, serving a sentence should begin only after a final, non-appealable ruling, without preventing pretrial detention where appropriate." },
        { t: "Annulment of the convictions", k: "2021 · 8 × 3 in the full Court", d: "Justice Edson Fachin annulled decisions of the 13th Federal Court of Curitiba for lack of jurisdiction. The full Court upheld the decision 8 to 3." },
        { t: "Moro's bias", k: "triplex case", d: "Separately, the STF recognized Sergio Moro's bias in the triplex case." }
      ], l: "jud", src: { o: "STF", r: "2019 and 2021 decisions on Lula" } },
      { p: "The 2019 decision was general, not created specifically for Lula, although it allowed his release from prison.", l: "ctx" },
      { p: "The annulment for lack of jurisdiction was not an acquittal on the merits of the charges. As a result, Lula regained his political rights and was able to run in 2022.", l: "ctx" }
    ]},
    { h: "Alexandre de Moraes at the TSE", b: [
      { p: "Moraes became president of the TSE on August 16, 2022. The Electoral Courts began intervening with great speed in digital content during the campaign.", l: "fato" }
    ]},
    { h: "There were decisions against both sides", b: [
      { p: "The official record does not support the simple claim that the TSE acted only against Bolsonaro. There are decisions unfavorable to Lula and his campaign, including fines, removal of campaign ads and decisions denying requests for a right of reply.", l: "fato", src: { o: "TSE", r: "2022 electoral decisions" } },
      { p: "A claim of asymmetry must demonstrate a difference in criteria, intensity or reach between comparable cases.", l: "met" }
    ]},
    { h: "Brasil Paralelo", b: [
      { p: "In October 2022, the TSE ordered, by 4 to 3, the removal of the video “Relembre os esquemas do governo Lula” (“Remember the schemes of the Lula government”). The rapporteur voted against removal, considering that the material was based on reported facts; the majority found the content to be disinformation and offensive.", l: "jud" },
      { p: "The split vote shows real legal controversy.", l: "ana" },
      { p: "The TSE also suspended until after the runoff the release of the documentary “Quem mandou matar Jair Bolsonaro?” (“Who ordered Jair Bolsonaro's killing?”) and temporarily ordered the demonetization of channels.", l: "jud" }
    ]},
    { h: "Resolution 23,714/2022", b: [
      { p: "Approved on October 20, ten days before the runoff. It allowed rapid removal of content deemed knowingly false or seriously decontextualized regarding electoral integrity, with steep hourly fines.", l: "fato", src: { o: "TSE", r: "Resolution 23,714/2022", p: "10/20/2022" } },
      { p: "The Procuradoria-Geral da República (PGR — Office of the Prosecutor General) challenged parts of the resolution at the STF, alleging a risk to freedom of expression and abuse of power.", l: "alg" },
      { p: "The STF upheld the rule.", l: "jud" }
    ]},
    { h: "“Vaza Toga”: the STF–TSE channel revealed in 2024", b: [
      { p: "A note on timing: the reporting came out in August 2024, but it concerns messages exchanged between August 2022 and May 2023 — the campaign, the runoff, the transition and the first months of the new government. During that period Alexandre de Moraes was simultaneously the rapporteur of the fake-news inquiry (Inquiry 4,781) and the digital-militias inquiry (Inquiry 4,874) at the Supremo Tribunal Federal (STF — Brazil's Supreme Federal Court) and president of the Tribunal Superior Eleitoral (TSE — Brazil's Superior Electoral Court), a post he took on August 16, 2022.", l: "ctx" },
      { p: "On August 13 and 14, 2024, Folha de S.Paulo published stories by Fabio Serapião and Glenn Greenwald based on more than 6 GB of WhatsApp messages and files exchanged by Moraes's aides. The main participants were **Airton Vieira**, an assisting judge (juiz instrutor) in Moraes's STF chambers, and **Eduardo Tagliaferro**, a forensic expert who headed the TSE's Special Unit for Countering Disinformation (AEED). **Marco Antônio Vargas**, an assisting judge in Moraes's TSE office, also appears in the conversations.", l: "fato", src: { o: "Folha de S.Paulo (Fabio Serapião and Glenn Greenwald)", r: "“Moraes usou TSE fora do rito para investigar bolsonaristas no Supremo, revelam mensagens” (Moraes used the TSE outside normal procedure to investigate Bolsonaro supporters at the Supreme Court, messages reveal)", p: "Aug. 13, 2024", n: "Link to a full republication of the Folha text (Folhapress), in Portuguese.", url: "https://www.politicalivre.com.br/2024/08/moraes-usou-tse-fora-do-rito-para-investigar-bolsonaristas-no-supremo-revelam-mensagens" } },
      { p: "“Vaza Toga” (roughly, “the robe leak”) is the nickname the leak acquired in public debate. It is not the name of any official investigation or proceeding.", l: "ctx" },
      { p: "The AEED was a formal part of the TSE's structure: Resolution 23,683 of February 22, 2022, signed by then-TSE president Edson Fachin, converted an existing advisory office in the Presidency's General Secretariat into the Special Unit for Countering Disinformation.", l: "fato", src: { o: "TSE", r: "Resolution No. 23,683 of February 22, 2022 (art. 2, I)", p: "Feb. 22, 2022", url: "https://www.tse.jus.br/legislacao/compilada/res/2022/resolucao-no-23-683-de-22-de-fevereiro-de-2022" } },
      { p: "Report requests. According to the published messages, Moraes's STF chambers asked the AEED, over WhatsApp, for reports on people and posts connected to the inquiries under way at the Supreme Court. On November 22, 2022, for example, an analysis was requested of commentator Rodrigo Constantino's posts to assess whether his accounts should be blocked and fined; commentator Paulo Figueiredo appears in the same cycle.", l: "fato", src: { o: "Folha de S.Paulo (Fabio Serapião and Glenn Greenwald)", r: "“Moraes usou TSE fora do rito para investigar bolsonaristas no Supremo, revelam mensagens” (Moraes used the TSE outside normal procedure to investigate Bolsonaro supporters at the Supreme Court, messages reveal)", p: "Aug. 13, 2024", n: "Link to a full republication of the Folha text (Folhapress), in Portuguese.", url: "https://www.politicalivre.com.br/2024/08/moraes-usou-tse-fora-do-rito-para-investigar-bolsonaristas-no-supremo-revelam-mensagens" } },
      { p: "In another December 2022 case, Airton Vieira asked for material to support demonetizing the magazine Revista Oeste. When Tagliaferro replied that he had mostly found journalistic content, the guidance he received, according to the messages, was to use his “creativity” and look for critical opinion pieces.", l: "fato", src: { o: "Folha de S.Paulo (Fabio Serapião and Glenn Greenwald)", r: "“Moraes escolhia alvos e pedia ajustes em relatórios contra bolsonaristas, mostram mensagens” (Moraes chose targets and asked for changes to reports on Bolsonaro supporters, messages show)", p: "Aug. 14, 2024", n: "Link to a full republication of the Folha text, in Portuguese.", url: "https://jornaldebrasilia.com.br/noticias/politica-e-poder/moraes-escolhia-alvos-e-pedia-ajustes-em-relatorios-contra-bolsonaristas-mostram-mensagens/" } },
      { p: "Revisions. The messages also record requests for additions and rewrites: in the Constantino case, the chambers signaled dissatisfaction with the first version and asked for more posts to be included (Dec. 28, 2022); in another episode, they asked that a report not center on attacks against the justice himself.", l: "fato", src: { o: "Folha de S.Paulo (Fabio Serapião and Glenn Greenwald)", r: "“Moraes escolhia alvos e pedia ajustes em relatórios contra bolsonaristas, mostram mensagens” (Moraes chose targets and asked for changes to reports on Bolsonaro supporters, messages show)", p: "Aug. 14, 2024", n: "Link to a full republication of the Folha text, in Portuguese.", url: "https://jornaldebrasilia.com.br/noticias/politica-e-poder/moraes-escolhia-alvos-e-pedia-ajustes-em-relatorios-contra-bolsonaristas-mostram-mensagens/" } },
      { p: "According to Folha, the reports were formalized as if they had originated in the TSE's own monitoring or in tips it had received, without recording that the request had come from the STF chambers. That is what the paper described as using the TSE “outside normal procedure” (fora do rito).", l: "alg", src: { o: "Folha de S.Paulo (Fabio Serapião and Glenn Greenwald)", r: "“Moraes usou TSE fora do rito para investigar bolsonaristas no Supremo, revelam mensagens” (Moraes used the TSE outside normal procedure to investigate Bolsonaro supporters at the Supreme Court, messages reveal)", p: "Aug. 13, 2024", n: "Link to a full republication of the Folha text (Folhapress), in Portuguese.", url: "https://www.politicalivre.com.br/2024/08/moraes-usou-tse-fora-do-rito-para-investigar-bolsonaristas-no-supremo-revelam-mensagens" } },
      { p: "Use in the inquiries. On January 3–5, 2023, decisions by Moraes in Inquiries 4,781 and 4,874 suspended Constantino's and Figueiredo's social media accounts, froze bank accounts and canceled passports. The reporting links AEED reports to the grounds for those measures; Moraes's office confirms that reports were entered into the investigation files.", l: "fato", src: { o: "Gazeta do Povo", r: "Constantino tem contas bancárias bloqueadas e passaporte cancelado (Constantino has bank accounts frozen and passport canceled)", p: "Jan. 5, 2023", url: "https://www.gazetadopovo.com.br/vida-e-cidadania/breves/constantino-tem-contas-bancarias-bloqueadas-e-passaporte-cancelado/" } },
      { p: "Because the inquiries are under seal, this site has not reconstructed the full procedural sequence of each case and does not attribute any specific measure to any specific report.", l: "met" },
      { p: "The office's defense. In a statement on August 13, 2024, Moraes's office said that requests to several agencies, including the TSE, were part of the investigations; that the TSE, exercising its electoral police power (poder de polícia), had authority to produce reports on disinformation, electoral hate speech and attempted coups; that the documents merely described posts objectively; that they were entered into the case files and sent to the Federal Police; and that all procedures were official, regular and documented, with the participation of the Office of the Prosecutor General (PGR).", l: "alg", src: { o: "STF — office of Justice Alexandre de Moraes", r: "Nota do gabinete do Ministro Alexandre de Moraes (statement from Justice Moraes’s office)", p: "Aug. 13, 2024", url: "https://noticias.stf.jus.br/postsnoticias/nota-do-gabinete-do-ministro-alexandre-de-moraes-6/" } },
      { p: "On August 14, 2024, on the STF floor, Moraes reaffirmed that his actions were lawful (“there is nothing to hide”). The court's president, Luís Roberto Barroso, called it a “fictitious storm,” said the material consisted of public posts, and explained the informality by saying that “no one sends an official request to himself” — the information, he said, was formalized once it arrived. Justice Gilmar Mendes also defended Moraes.", l: "alg", src: { o: "Agência Brasil", r: "Alexandre de Moraes reafirma legalidade de atos no TSE (Moraes reaffirms the legality of his acts at the TSE)", p: "Aug. 14, 2024", url: "https://agenciabrasil.ebc.com.br/justica/noticia/2024-08/alexandre-de-moraes-reafirma-legalidade-de-atos-no-tse" } },
      { p: "These are the institutional positions of Moraes's office and of STF justices. This site records them as a defense, not as its own conclusion.", l: "met", src: { o: "STF", r: "Ministros esclarecem que pedidos do STF ao TSE cumpriram todos os ritos legais (Justices clarify that STF requests to the TSE followed all legal procedures)", p: "Aug. 14, 2024", url: "https://noticias.stf.jus.br/postsnoticias/ministros-esclarecem-que-pedidos-do-stf-ao-tse-cumpriram-todos-os-ritos-legais/" } },
      { ul: [
        "The question is not whether the AEED legally existed: it was part of the TSE's formal structure.",
        "The debate is about **how** that structure was used: informal requests over WhatsApp, targets chosen in advance, and guidance on what the reports should contain.",
        "It is also about the flow between an electoral-court unit and criminal inquiries run at the STF by the same justice who was presiding over the TSE.",
        "And about due process, the separation between investigating, producing information and judging, and how far electoral police power extends.",
        "“Outside normal procedure” is the characterization used by Folha and by critics. As of this version, this site has not identified any court ruling declaring these procedures unlawful."
      ], l: "ctx", title: "Where the controversy lies" },
      { p: "Aftermath. In August 2025, the PGR indicted Tagliaferro for breach of official secrecy, coercion in the course of proceedings, obstruction of an investigation, and attempted violent abolition of the democratic rule of law, accusing him of leaking the messages. In November 2025, the STF's First Panel unanimously accepted the indictment, with Moraes as rapporteur. As of May 2026, appeals by the defense were under review.", l: "jud", src: { o: "GPS Brasília", r: "STF aceita denúncia e torna Tagliaferro réu por vazamento (STF accepts indictment; Tagliaferro becomes a defendant over the leak)", p: "Nov. 13, 2025", url: "https://gpsbrasilia.com.br/stf-aceita-denuncia-e-torna-tagliaferro-reu/" } },
      { status: ["denuncia", "reu"] },
      { p: "Tagliaferro denies being the source of the leak and says he is being politically persecuted. He lives in Italy.", l: "alg", src: { o: "Diário do Poder", r: "STF julga Tagliaferro por mensagens que expuseram o gabinete de Moraes", p: "May 22, 2026", url: "https://diariodopoder.com.br/brasil-e-regioes/stf-julga-tagliaferro-por-mensagens-que-expuseram-o-gabinete-de-moraes" } },
      { box: { l: "ctx", title: "What is not proven", ul: [
        "The messages do not show fraud in the voting machines.",
        "They do not show that the vote count was tampered with.",
        "They do not, by themselves, show coordination between Lula or the PT and Moraes to produce the election result.",
        "They do not show that the 2022 presidential result was altered."] } },
      { ul: [
        "Should an electoral court produce material used in criminal investigations at the STF in this way?",
        "Are informal requests by text message compatible with the transparency and oversight that due process requires?",
        "Does choosing targets first and asking for additions later create a risk of confirming a hypothesis already formed?",
        "Does concentrating roles in the same justice — rapporteur of the inquiries, president of the TSE and, later, rapporteur of the case against the alleged leaker — create institutional problems?"
      ], l: "ana", title: "Questions the episode raises" },
      { p: "For this project, the episode reinforces the chapter's thesis: the problem is not the vote count, but how tools created to fight disinformation were operated — with informality, concentrated roles and little visibility for those targeted. That deserves institutional scrutiny regardless of who won the election.", l: "ed" }
    ]},
    { h: "Carter Center", b: [
      { p: "The Carter Center mission acknowledged the real problem of disinformation, but also recorded concern that the power exercised by the TSE could overreach and affect freedom of expression.", l: "fato", src: { o: "Carter Center", r: "Observation report on the 2022 elections", p: "2022" } },
      { p: "This is an important point because the criticism was not confined to the losing campaign or to right-wing actors.", l: "ana" }
    ]},
    { h: "Radio spots", b: [
      { p: "The Bolsonaro campaign alleged failures in the broadcasting of its radio spots.", l: "alg" },
      { p: "Alexandre de Moraes rejected the request due to the insufficiency of the evidence presented and noted that the TSE does not physically distribute or monitor each individual broadcast.", l: "jud" },
      { p: "The case does not constitute proof of electoral fraud.", l: "ctx" }
    ]},
    { h: "2022 result", b: [
      { bars: { l: "dado", unit: "%", title: "First round", rows: [ { n: "Lula", v: 48.43 }, { n: "Bolsonaro", v: 43.20 } ], src: { o: "TSE", r: "Official results", p: "First round, 2022" } } },
      { bars: { l: "dado", unit: "%", title: "Runoff", rows: [ { n: "Lula", v: 50.90, s: "60,345,999 votes" }, { n: "Bolsonaro", v: 49.10, s: "58,206,354 votes" } ], src: { o: "TSE", r: "Official results", p: "Runoff, 2022" } } }
    ]},
    { h: "This chapter's editorial thesis", b: [
      { box: { l: "ed", title: "Editorial opinion", p: [
        "The project does not claim that there was fraud in the voting machines, nor that every TSE decision favored Lula.",
        "The editorial interpretation is that there was an exceptional expansion of judicial power over the political process, and that certain interventions, although justified by the STF/TSE as protecting democracy and fighting disinformation, created significant risks to freedom of expression and institutional neutrality."] } },
      { box: { l: "ctx", title: "What is not proven", p: ["Secret coordination among Moraes, Lula, justices and parties to produce the election result."] } }
    ]}
  ],
  sources: [
    "STF — ADPF 572 / Inquiry 4,781.",
    "STF — 2019 and 2021 decisions on Lula.",
    "TSE — electoral decisions, Resolution 23,714 and official results.",
    "OAB — defense access.",
    "Carter Center — observation report on the 2022 elections.",
    "Folha de S.Paulo — series by Fabio Serapião and Glenn Greenwald on messages between Moraes's STF and TSE offices (Aug. 13 and 14, 2024).",
    "STF — statement from Justice Alexandre de Moraes's office (Aug. 13, 2024) and “Justices clarify that STF requests to the TSE followed all legal procedures” (Aug. 14, 2024).",
    "TSE — Resolution 23,683/2022 (creation of the AEED).",
    "Agência Brasil — STF session of Aug. 14, 2024; Gazeta do Povo — January 2023 measures; Poder360, GPS Brasília and Diário do Poder — case against Eduardo Tagliaferro (2025–2026)."
  ]
},

/* ---------------------------------------------------- 06 */
{
  id: "processo-bolsonaro", num: "05", years: "2021–2026",
  kicker: "The case against Bolsonaro",
  title: "Coup attempt, evidence and dissent on the STF",
  file: "06-processo-bolsonaro.md",
  labels: ["jud", "alg", "fato", "met"],
  home: [
    { p: "In September 2025, the First Panel of the Supremo Tribunal Federal (STF — Brazil's Supreme Federal Court) sentenced Jair Bolsonaro to 27 years and three months in prison for armed criminal organization, attempted violent abolition of the Democratic Rule of Law, coup d'état, aggravated damage and deterioration of listed heritage property.", l: "jud" },
    { p: "Justices Alexandre de Moraes, Flávio Dino, Cármen Lúcia and Cristiano Zanin voted to convict. Luiz Fux dissented and voted to acquit Bolsonaro.", l: "jud" },
    { p: "The central legal dispute is not “there is evidence vs. there is no evidence at all.” There are documents, messages, videos, meeting records, testimony and plans. The disagreement is over what that body of evidence shows with respect to Bolsonaro individually, and when preparatory acts would have become a punishable attempt.", l: "ctx" }
  ],
  vote: {
    title: "STF First Panel · September 2025",
    score: "4 × 1",
    yes: ["Alexandre de Moraes", "Flávio Dino", "Cármen Lúcia", "Cristiano Zanin"],
    no: ["Luiz Fux"],
    yesLabel: "Conviction", noLabel: "Acquittal of Bolsonaro (dissenting vote)",
    src: { o: "STF Notícias", r: "Votes, conviction, sentencing and judgment", p: "Sept. 2025" }
  },
  stats: [
    { v: "4 × 1", u: "", k: "STF First Panel", d: "Merits decided by five justices.", l: "jud", src: { o: "STF Notícias", r: "Conviction", p: "Sept. 2025" } },
    { v: "27y 3m", u: "", k: "Total sentence", d: "The conviction became final and non-appealable and is being enforced.", l: "jud", src: { o: "STF Notícias", r: "Sentencing", p: "Sept. 2025" } },
    { v: "2026", u: "", k: "Criminal review", d: "Exceptional remedy filed by the defense.", l: "fato", src: { o: "STF", r: "2026 criminal review", p: "2026" } }
  ],
  sections: [
    { h: "Structure of the prosecution's case", b: [
      { p: "The Procuradoria-Geral da República (PGR — Office of the Prosecutor General) presented Bolsonaro as leader of the “Crucial Core” of an organization that allegedly operated from 2021 to January 2023 to prevent the transfer of power.", l: "alg" },
      { ul: [
        "attacks on the reliability of the voting machines;",
        "use of government structures to sustain that narrative;",
        "the cabinet meeting of July 5, 2022;",
        "the meeting with ambassadors on July 18;",
        "the Armed Forces report;",
        "PRF (Federal Highway Police) operations during the runoff;",
        "different versions of draft emergency decrees;",
        "Bolsonaro's meetings with military commanders;",
        "military maneuvering and aides;",
        "violent plans, including Punhal Verde e Amarelo (Green and Yellow Dagger);",
        "encampments in front of army barracks;",
        "January 8, 2023."
      ], l: "alg", title: "Episodes compiled by the prosecution" },
      { p: "The prosecution's theory is one of a progressive sequence and a division of tasks.", l: "alg" }
    ]},
    { h: "Coup documents and plans", b: [
      { p: "There were documents contemplating an institutional rupture.", l: "fato" },
      { p: "The Punhal Verde e Amarelo plan involved surveillance of officials and contemplated the killing or neutralization of Lula, Geraldo Alckmin and Alexandre de Moraes. This demonstrates the existence of violent planning within the universe under investigation.", l: "fato" },
      { p: "The separate question is Bolsonaro's level of knowledge of and participation in each specific plan.", l: "ctx" }
    ]},
    { h: "What the majority weighed against Bolsonaro", b: [
      { seq: ["Delegitimizing the election", "Mobilizing the state apparatus", "Emergency measures", "Seeking military support", "Mobilization after the defeat", "Concrete actions by the group"], l: "jud", title: "The sequence as seen by the majority" },
      { p: "The PGR and the majority considered it proven that Bolsonaro knew of and discussed draft decrees and sought the support of military commanders for measures of rupture.", l: "jud" }
    ]},
    { h: "Contemplation vs. attempt", b: [
      { p: "Thinking about or discussing a crime, on its own, is not enough for an attempt. The dispute was over the moment at which the acts would have ceased to be preparatory and become execution.", l: "ctx" },
      { versus: [
        { l: "alg", who: "Defense", t: "There was no decree, state of defense, state of siege or formal act carried out by Bolsonaro; drafts that were discussed and not signed were not enough." },
        { l: "jud", who: "First Panel majority", t: "Execution had already begun." }
      ]}
    ]},
    { h: "Luiz Fux's vote", b: [
      { p: "Fux had earlier voted to accept the indictment, recognizing sufficient evidence to open the criminal case. On the merits, after the evidentiary phase, he voted for Bolsonaro's full acquittal.", l: "jud" },
      { p: "Fux did not say the entire investigation was fabricated. He voted to convict some defendants in part, distinguishing individual responsibilities.", l: "jud" },
      { p: "His dissent regarding Bolsonaro included an insufficient link between his conduct and the crimes charged, resistance to automatically holding him responsible for the acts of January 8, and procedural objections.", l: "jud" }
    ]},
    { h: "Point by point: majority × dissent", b: [
      { matrix: [
        { t: "Punhal Verde e Amarelo", maj: "Analyzed the plan as part of the structure of the organization allegedly led by Bolsonaro.", fux: "Distinguished the participation of specific people and acquitted Bolsonaro." },
        { t: "Draft decrees", maj: "The prosecution maintains that Bolsonaro knew of and discussed this material; the majority considered this proven.", fux: "—", def: "Discussing documents that were never adopted does not constitute a sufficient act of execution." },
        { t: "Armed Forces", maj: "Saw a concrete attempt to obtain military backing.", fux: "Considered the evidence insufficient to hold several defendants responsible and gave a different legal interpretation to some of those meetings." },
        { t: "January 8", maj: "Treated January 8 as the final stage of a sequence that had begun earlier.", fux: "Rejected holding Bolsonaro responsible for that day's crimes based only on earlier political statements." },
        { t: "First Panel vs. full Court", maj: "Under the internal rules in force, the case could be tried by the First Panel.", fux: "The STF should not try the case; alternatively, the case should have gone to the full Court." },
        { t: "Right to a full defense", maj: "Rejected the preliminary objection.", fux: "Accepted the criticism and found that the defense had been curtailed.", def: "An enormous volume of material and insufficient time to analyze it." },
        { t: "Mauro Cid", maj: "The prosecution did not depend solely on Cid's word; other evidence corroborated relevant parts.", fux: "Considered the plea agreement legally valid, but reached a different conclusion about what it allowed to be attributed to Bolsonaro.", def: "Contradictions in testimony." }
      ]},
      { p: "There was not just one official, signed document called “the coup draft.” Different documents and versions proposing emergency measures were found.", l: "fato" },
      { p: "“People close to him drew up an assassination plan” is not automatically synonymous with “Bolsonaro knew of and approved that plan.”", l: "met" }
    ]},
    { h: "First Panel vs. full Court", b: [
      { p: "Objective fact: the merits were decided by five justices, with a 4–1 vote to convict Bolsonaro.", l: "fato" },
      { p: "It cannot be stated as fact that the outcome would have been different before the full Court.", l: "met" }
    ]},
    { h: "Sentence", b: [
      { kv: { l: "jud", title: "Total: 27 years and 3 months", rows: [
        ["Armed criminal organization", "7 years and 7 months"],
        ["Violent abolition of the Democratic Rule of Law", "6 years and 6 months"],
        ["Coup d'état", "8 years and 2 months"],
        ["Aggravated damage", "2 years and 6 months"],
        ["Deterioration of listed heritage property", "2 years and 6 months"]
      ], src: { o: "STF Notícias", r: "Sentencing", p: "Sept. 2025" } } }
    ]},
    { h: "Criminal review", b: [
      { p: "In 2026, the defense filed a criminal review (revisão criminal) with the STF. The original conviction became final and non-appealable and is being enforced; the review is a separate, exceptional remedy.", l: "fato", src: { o: "STF", r: "2026 criminal review", p: "2026" } },
      { status: ["definitiva", "execucao", "revisao"] }
    ]},
    { h: "Editorial rule", b: [
      { box: { l: "met", title: "Two oversimplifications avoided", ul: ["“There was no evidence at all.”", "“Since there was a conviction, any contrary interpretation is objectively wrong.”"] } },
      { box: { l: "met", title: "Correct framing", p: ["Bolsonaro was convicted 4 to 1 by the First Panel. The majority found that the body of facts demonstrated his leadership of the attempted rupture. Luiz Fux disagreed as to Bolsonaro's individual responsibility and pointed to problems of jurisdiction and defense."] } }
    ]}
  ],
  sources: [
    "STF Notícias — acceptance of the indictment, votes, conviction, sentencing and judgment.",
    "STF — 2026 criminal review."
  ]
},

/* ---------------------------------------------------- 07 */
{
  id: "governo-lula", num: "06", years: "2023–2026",
  kicker: "Lula returns to power",
  title: "A more complex picture",
  file: "07-governo-lula-2023-2026.md",
  labels: ["dado", "fato", "ctx", "ana"],
  alt: true,
  home: [
    { p: "Lula's third government produced a more complex economic picture than simple narratives of success or disaster.", l: "ana" },
    { p: "GDP grew 3.2% in 2023, 3.4% in 2024 and 2.3% in 2025. The labor market was also strong: an average annual unemployment rate of 5.6% in 2025 and 5.3% in the quarter ended July 2026." },
    { p: "At the same time, the fiscal situation worsened. The Central Government went from a surplus in 2022 to a deficit of about R$230.5 billion in 2023. Gross debt reached 82.5% of GDP in July 2026." },
    { p: "Among administrative scandals, the most significant case is the scheme of improper deductions from INSS (National Social Security Institute) benefits, which operated between 2019 and 2024 and affected millions of beneficiaries. There is no public basis for personally attributing the scheme to Lula.", l: "ctx" },
    { p: "On security, homicides kept falling, while studies document the territorial expansion of criminal factions such as the PCC and Comando Vermelho." }
  ],
  stats: [
    { v: "5.6", u: "%", k: "Average unemployment 2025", d: "Lowest in the PNAD Contínua series, which began in 2012.", l: "dado", src: { o: "IBGE", r: "PNAD Contínua", p: "2025" } },
    { v: "82.5", u: "% GDP", k: "Gross debt, Jul. 2026", d: "73.8% at the end of 2023; 76.1% at the end of 2024.", l: "dado", src: { o: "Central Bank", r: "Gross debt", p: "Jul. 2026" } },
    { v: "42,590", u: "", k: "Homicides in 2024", d: "Lowest figure in the series used by the Atlas da Violência 2026.", l: "dado", src: { o: "Ipea / FBSP", r: "Atlas da Violência 2026", p: "2024" } }
  ],
  sections: [
    { h: "GDP", b: [
      { bars: { l: "dado", unit: "%", rows: [ { n: "2023", v: 3.2 }, { n: "2024", v: 3.4 }, { n: "2025", v: 2.3 }, { n: "H1 2026", v: 1.9, s: "vs. same period of 2025" } ], src: { o: "IBGE", r: "GDP", p: "2023–H1 2026" } } },
      { p: "Do not attribute all growth exclusively to the government; harvests, commodities, credit, interest rates and the external environment also matter.", l: "met" }
    ]},
    { h: "Employment", b: [
      { stats: [
        { v: "5.6", u: "%", k: "Average annual unemployment 2025", d: "Lowest in the PNAD Contínua series, which began in 2012.", l: "dado", src: { o: "IBGE", r: "PNAD Contínua", p: "2025" } },
        { v: "5.3", u: "%", k: "Quarter through Jul. 2026", l: "dado", src: { o: "IBGE", r: "PNAD Contínua", p: "quarter ended Jul. 2026" } }
      ]},
      { p: "Informality remained high.", l: "ctx" }
    ]},
    { h: "Inflation", b: [
      { bars: { l: "dado", unit: "%", title: "IPCA", rows: [ { n: "2023", v: 4.62 }, { n: "2024", v: 4.83 }, { n: "2025", v: 4.26 } ], src: { o: "IBGE", r: "IPCA", p: "2023–2025" } } },
      { p: "In 2024, food prices rose 7.69%, contributing to an everyday perception worse than the aggregate index.", l: "dado" },
      { p: "The phrase “inflation out of control” does not technically describe the entire period.", l: "met" }
    ]},
    { h: "Fiscal", b: [
      { stats: [
        { v: "~230.5", u: "R$ bn", k: "Primary deficit — Central Government 2023", d: "2.12% of GDP.", l: "dado", src: { o: "National Treasury", r: "Primary balance", p: "2023" } }
      ]},
      { p: "A significant part had extraordinary components, including court-ordered debt payments (precatórios) and spending authorized by the Transition Constitutional Amendment (PEC da Transição). In 2024 the result improved sharply.", l: "ctx" },
      { p: "The government created a new fiscal framework through Complementary Law 200/2023.", l: "fato", src: { o: "Planalto", r: "Complementary Law 200/2023" } },
      { p: "The central factual question is whether the new regime is sufficient to stabilize the debt.", l: "ana" }
    ]},
    { h: "Debt", b: [
      { bars: { l: "dado", unit: "% GDP", title: "Gross debt", rows: [ { n: "end of 2023", v: 73.8 }, { n: "end of 2024", v: 76.1 }, { n: "Jul. 2026", v: 82.5 } ], src: { o: "Central Bank", r: "Fiscal statistics", p: "2023–Jul. 2026" } } },
      { p: "This is one of the clearest points of fiscal concern.", l: "ana" }
    ]},
    { h: "Revenue strategy", b: [
      { p: "Since 2023, the economic team has adopted several measures to raise revenue or close tax loopholes, including taxation of closed-end funds and offshore assets and new regulation of betting.", l: "fato" },
      { p: "The political interpretation may diverge between “reducing privileges” and “sustaining spending with more tax revenue.”", l: "ana" }
    ]},
    { h: "Tax reform", b: [
      { p: "The consumption tax reform advanced with Constitutional Amendment 132 and subsequent implementing regulations, creating the IBS, the CBS and the Selective Tax.", l: "fato", src: { o: "Planalto", r: "Constitutional Amendment 132 and regulations" } },
      { p: "It is an approved reform, not a future benefit already realized.", l: "ctx" }
    ]},
    { h: "State-owned companies", b: [
      { p: "A primary deficit at state-owned companies is not automatically the same as an accounting loss. Headlines that mix the two concepts confuse readers.", l: "met" }
    ]},
    { h: "INSS — Operation Sem Desconto", b: [
      { p: "In April 2025, the Polícia Federal (PF — Federal Police) and the CGU (Office of the Comptroller General) launched an operation into allegedly unauthorized association-fee deductions from retirement and survivor pensions.", l: "fato", src: { o: "AGU / PF / CGU / INSS / STF", r: "Operation Sem Desconto", p: "Apr. 2025–2026" } },
      { p: "The scheme under investigation operated between 2019 and 2024, spanning different governments. Millions of beneficiaries reported not recognizing deductions, and the government began reimbursements. A former INSS president was arrested, and new investigative measures followed in 2026.", l: "fato" },
      { status: ["investigacao", "sem_imputacao"] },
      { box: { l: "ctx", title: "Factual conclusion", p: ["A serious and prolonged failure of state controls, investigated by state bodies; no public basis for attributing personal involvement to Lula."] } }
    ]},
    { h: "Juscelino Filho", b: [
      { p: "He was indicted by the Procuradoria-Geral da República (PGR — Office of the Prosecutor General) in an investigation related to alleged diversion of congressional budget amendments (emendas parlamentares). The facts under investigation mainly concern the period when he was a federal congressman, before he became a minister.", l: "alg" },
      { status: ["denuncia"] },
      { p: "“A Lula government minister was indicted” is factual; “Lula government corruption scheme” is not an automatic description of the case.", l: "met" }
    ]},
    { h: "Banco Master", b: [
      { p: "A financial and regulatory scandal that occurred during the term, but it should not automatically be presented as corruption by Lula without a demonstrated individual criminal link.", l: "ctx" }
    ]},
    { h: "PCC and Comando Vermelho", b: [
      { p: "There is no solid basis for claiming generically that “Lula or the PT have a criminal relationship with the PCC or Comando Vermelho.” The faction problem is real and can be documented without that collective accusation.", l: "ctx" }
    ]},
    { h: "Security", b: [
      { p: "Atlas da Violência 2026: 42,590 homicides in 2024, the lowest figure in the series used by the study. 2025 data indicated a further drop in intentional violent deaths.", l: "dado", src: { o: "Ipea / FBSP", r: "Atlas da Violência 2026", p: "2024–2025" } },
      { p: "At the same time, studies by Ipea (Institute for Applied Economic Research) document the expansion of factions into medium-sized and small cities and along strategic routes.", l: "fato", src: { o: "Ipea", r: "Studies on criminal factions" } },
      { p: "Fewer homicides do not necessarily mean less power for organized crime.", l: "ana" }
    ]},
    { h: "Federal division of powers", b: [
      { p: "Security is heavily shared with the states. The Military and Civil Police are state forces. The federal government controls the PF, the PRF (Federal Highway Police), borders, intelligence, funding and national coordination.", l: "ctx" },
      { p: "Do not attribute every rise or fall in homicides directly to the president.", l: "met" }
    ]},
    { h: "Summary", b: [
      { ledger: {
        l: "ana",
        plus: ["Growth", "Strong employment", "Inflation below pandemic peaks", "Falling homicides"],
        minus: ["Rising debt", "Difficulty achieving fiscal balance", "Dependence on new revenue", "INSS scandal", "Territorial expansion of factions"],
        plusTitle: "Favorable facts", minusTitle: "Concrete problems"
      }}
    ]}
  ],
  sources: [
    "IBGE — GDP, employment and inflation.",
    "Central Bank / Treasury — debt and fiscal balance.",
    "Planalto — fiscal framework and tax reform.",
    "AGU / PF / CGU / INSS / STF — Operation Sem Desconto.",
    "Ipea / Atlas da Violência / FBSP — public security."
  ]
},

/* ---------------------------------------------------- 08 */
{
  id: "por-que-2026-importa", num: "07", years: "2026",
  kicker: "What is at stake",
  title: "Presidency, Senate and STF",
  file: "08-por-que-2026-importa.md",
  labels: ["fato", "ed"],
  isStakes: true,
  home: [
    { p: "On October 4, 2026, Brazil will not only choose its next president. Voters will elect governors, all 513 federal deputies, state and district deputies, and 54 of the 81 senators — two per state and for the Federal District. It is the renewal of two-thirds of the Senado Federal (Federal Senate).", l: "fato" },
    { p: "The president nominates Justices of the Supremo Tribunal Federal (STF — Brazil's Supreme Federal Court), but each nominee must be approved by an absolute majority of the Senate: at least 41 of the 81 senators. The Senate also has constitutional authority to try STF Justices for crimes of responsibility (impeachable offenses). A conviction requires two-thirds of the chamber: 54 votes.", l: "fato" },
    { p: "Under current rules, Luiz Fux turns 75 in April 2028, Cármen Lúcia in April 2029 and Gilmar Mendes in December 2030. That creates at least three expected vacancies during the 2027–2030 presidential term, barring a significant change in the rules.", l: "fato" }
  ],
  stats: [
    { v: "54", u: "of 81", k: "Senate seats up for election", d: "Two votes per voter. The other 27 continue until 2031.", l: "fato", src: { o: "TSE / Federal Senate", r: "2026 election calendar" } },
    { v: "41", u: "votes", k: "To confirm an STF Justice", d: "Absolute majority of the Senate.", l: "fato", src: { o: "Federal Constitution" } },
    { v: "3", u: "seats", k: "Expected STF retirements through 2030", d: "Fux, Cármen Lúcia and Gilmar Mendes.", l: "fato", src: { o: "STF", r: "Biographies and composition of the Court" } }
  ],
  sections: [
    { h: "Senate renewal", b: [
      { p: "In 2026, each voter will have two votes for the Senate. Of the 81 seats, 54 will be up for election. The other 27, elected in 2022, continue until 2031.", l: "fato", src: { o: "Federal Senate / TSE", r: "2026 election calendar" } },
      { senate: { total: 81, open: 54 } },
      { p: "This composition influences confirmation hearings, STF nominations and impeachment proceedings.", l: "ctx" }
    ]},
    { h: "The president does not control things alone", b: [
      { p: "The president runs the federal administration, appoints cabinet ministers, signs or vetoes laws and exercises other constitutional powers.", l: "fato", src: { o: "Federal Constitution" } },
      { ul: ["change the Constitution alone;", "pass laws alone;", "appoint an STF Justice without the Senate;", "remove an STF Justice merely over political disagreement."], l: "fato", title: "But cannot:" }
    ]},
    { h: "How an STF Justice is made", b: [
      { seq: ["President chooses a nominee", "Hearing before the CCJ (Constitution and Justice Committee)", "Senate floor: ≥ 41 votes"], l: "fato", title: "Procedure" }
    ]},
    { h: "Barroso's seat and the 2026 precedent", b: [
      { p: "Luís Roberto Barroso announced his retirement in 2025.", l: "fato" },
      { p: "The Senate rejected the nomination of Jorge Messias in April 2026 by 34 votes in favor, 42 against and one abstention. It was the first Senate rejection of an STF nominee since 1894.", l: "fato", src: { o: "Federal Senate", r: "Nomination of Jorge Messias", p: "Apr. 2026" } },
      { p: "This shows in practice that a presidential nomination does not mean automatic appointment.", l: "ana" }
    ]},
    { h: "Three expected retirements", b: [
      { timeline: { l: "fato", rows: [
        { d: "04/26/2028", t: "Luiz Fux turns 75" },
        { d: "Apr. 2029", t: "Cármen Lúcia turns 75" },
        { d: "12/30/2030", t: "Gilmar Mendes turns 75" }
      ], src: { o: "STF", r: "Biographies and composition of the Court" } } },
      { p: "Under current rules, all of them occur within the next presidential term. If Barroso's seat is still open at the 2027 inauguration, the next president's potential influence could reach four nominations.", l: "fato" },
      { p: "Justices are not subordinate to the president who nominated them.", l: "ctx" }
    ]},
    { h: "Impeachment of an STF Justice", b: [
      { p: "The Constitution gives the Senate exclusive authority to try STF Justices for crimes of responsibility. Any citizen may file a complaint in the cases provided by law. Conviction requires 54 votes.", l: "fato", src: { o: "Federal Constitution / Law 1,079/1950" } },
      { p: "“Majority in the Senate = removing a Justice” is not an automatic equation.", l: "met" }
    ]},
    { h: "41, 49 and 54", b: [
      { thresholds: [
        { n: "41", t: "votes in the Senate", d: "Confirm an STF nominee." },
        { n: "49 + 308", t: "senators + deputies", d: "3/5 required in each chamber to pass a constitutional amendment (PEC)." },
        { n: "54", t: "votes in the Senate", d: "Conviction in impeachment proceedings against an STF Justice." }
      ], l: "fato" }
    ]},
    { h: "Editorial thesis", b: [
      { box: { l: "ed", title: "Editorial opinion", p: ["The project interprets the recent period as a crisis of balance among the branches of government, with an expanded role for the STF/TSE in investigations, political speech and criminal cases.", "This is editorial opinion. The facts that support this reading are in the previous chapters."] } },
      { p: "The consequence for 2026 is factual: the presidency and the Senate will have a direct impact on the future composition of the Supreme Court and on constitutional oversight mechanisms.", l: "fato" }
    ]},
    { h: "From here on, the method changes", b: [
      { method: [
        { k: "The history", t: "explains what is at stake.", href: "#/historia" },
        { k: "The profiles", t: "show who is running.", href: "#/candidatos" },
        { k: "The polls", t: "show where the race stands now.", href: "#/pesquisas" }
      ]}
    ]}
  ],
  sources: [
    "Federal Constitution.",
    "Law 1,079/1950.",
    "Federal Senate — election calendar, confirmation hearings and the nomination of Jorge Messias.",
    "STF — biographies and composition of the Court.",
    "TSE — 2026 calendar."
  ]
}
];
