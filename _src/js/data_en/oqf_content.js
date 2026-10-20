/* =========================================================
   O QUE FUNCIONA? / WHAT WORKS? — textos e estrutura (PT e EN)
   Só fatos históricos estáveis (datas de Estado, fronteiras), regras de método
   tiradas das metodologias das Auditorias 1 (v0.3) e 2 (v0.2) e textos de interface.
   Nenhum valor estatístico mora aqui: os dados vêm de assets/data/oqf/ (prepare_data.py).
   ========================================================= */
EB.oqfAll = {};


EB.oqfAll.en = {
  nav: "What works?",
  sub: { "": "Opening", mapa: "Map", perfil: "Countries", comparar: "Comparator", metodologia: "Methodology" },
  title: "What works?",
  subtitle: "Socialism, capitalism and the results of 80 years of economic policy.",
  question: "What do 80 years of history reveal about the state, markets and prosperity?",
  intro: [
    "Since 1945, countries around the world have tried very different mixes of state and market: central planning, social democracy, liberalization, nationalization, privatization, reforms and counter-reforms. The debate over what worked is usually fought with slogans.",
    "This section takes another route: country by country, year by year — who governed, what changed in the economy and what happened to people's lives, with sources, versions and limitations in plain view."
  ],
  punch: "Less rhetoric. More history. More data.",
  axes: [
    { k: "01", q: "Who governed?", d: "Governments, terms and state entities, with changes of borders and regime.", a: "Audit 1", st: "ref" },
    { k: "02", q: "What did they do?", d: "Economic measures classified by relevance (A–D) and by direction across ten dimensions, with no single ideological label.", a: "Audit 1", st: "prep" },
    { k: "03", q: "What happened?", d: "Health, education, income, poverty, median and inequality — and later, macroeconomic indicators.", a: "Audits 2 and 3", st: "demo" }
  ],
  guard: [
    ["met", "Nothing here ranks governments. Before and after is not cause and effect."],
    ["met", "Series from different entities (FRG, GDR, unified Germany, USSR, Russia, Ukraine) are never spliced."],
    ["met", "Where there is no verified data, the page says “Data in preparation.”"]
  ],
  strip_h: "1945 → 2026",
  strip: [
    [1945, "End of World War II; Germany occupied in four zones."],
    [1949, "Founding of the FRG (May) and the GDR (October)."],
    [1961, "The Berlin Wall is built."],
    [1964, "Brazil: start of the military regime, which lasts until 1985."],
    [1988, "Brazil: 1988 Federal Constitution."],
    [1989, "The Berlin Wall opens."],
    [1990, "German reunification (October 3)."],
    [1991, "Ukrainian independence and dissolution of the USSR."],
    [1994, "Brazil: the real enters circulation."],
    [2014, "Russia annexes Crimea; the UN General Assembly does not recognize it."],
    [2022, "Russia's full-scale invasion of Ukraine."],
    [2026, "Today: 2026 only has projections, no observed data."]
  ],
  strip_note: "Historical reference dates. Primary documents will be linked once Audit 1's entity base is incorporated into the site.",
  cards_h: "Explore",
  cards: [
    ["mapa", "World map", "Pick the year and the layer (Politics, Prosperity, Economy). Each country shows what data exists — and what does not yet."],
    ["governantes", "Leaders", "Who governed Brazil, Germany, Russia and Ukraine since 1945, by regime and party."],
    ["perfil", "Pilot countries", "Brazil, Germany, Russia and Ukraine: entities, borders, timeline, measures and indicators."],
    ["comparar", "Historical comparator", "Countries, periods and before/after a reform, as chart and table, with unit, source and limits."],
    ["metodologia", "Methodology", "The three audits, reliability A–D, comparability C1–C4 and publication rules."]
  ],
  status_h: "Audit status",
  states: {
    ok: ["Available", "Publishable without special caveat (Audit 2, §12)."],
    res: ["With caveats", "Publishable with caveat: comparability C2/C4, documented reconstruction or reconstructed current territory."],
    exp: ["Exploratory", "Reliability C, comparability C3 or flagged value: not fit for conclusions."],
    proj: ["Projection", "Projection (WPP 2024). Not an observed result and not counted as coverage."],
    prelim: ["Preliminary", "Preliminary data from an official source. No preliminary series was identified in the pilot."],
    np: ["Not publishable", "Research exists, but the publication threshold has not been met."],
    ref: ["Public reference", "Public list checked; to be verified against Audit 1."],
    demo: ["Demonstration data", "Synthetic series to test the interface. Not observations."],
    prep: ["Data in preparation", "Country outside the pilot or without reviewed data."],
    pend: ["Research pending", "Audit 3 (Economy) has not started."],
    gap: ["No data this year", "No source has data for this year within the entity's existence."]
  },
  types: { o: "measured", e: "estimated", p: "projection", r: "historical reconstruction", d: "calculated from source" },
  cats: { P: "Publishable", R: "With caveat", X: "Exploratory", N: "Not publishable" },
  layers: { pol: "Politics", pros: "Prosperity", eco: "Economy" },
  layer_note: {
    pol: "Classification of governments (Audit 1). No profile has met the publication threshold: coverage of level-A reforms has a median of 6% (range 0–45%), against an 80% trigger.",
    pros: "Prosperity indicators (Audit 2). Only the pilot (Brazil, Germany, Russia, Ukraine) has a publication layer; the worldwide expansion exists without manual review and is not loaded here.",
    eco: "Macroeconomic indicators (Audit 3). Research pending: the interface is ready, with no values."
  },
  demo_banner: "Demonstration data",
  demo_text: "The numbers and charts in this section are synthetic series generated only to test the interface. They are not historical observations and must not be cited. Real values will come from the Audit 2 (v0.2) files.",
  real_banner: "Audit 2 data",

  map_h: "World map",
  map_dek: "Pick the year and the layer. Colors show **what kind of data exists**, not results: no country is shaded by performance.",
  year: "Year", layer: "Layer", play: "Play", pause: "Pause",
  map_aria: "World map: choose a country",
  borders_note: "Current borders (Natural Earth 1:110m, public domain), used only as a visual reference. The entity that existed in each year is shown in the panel. The site uses internationally recognized borders: Crimea is Ukrainian territory, occupied by Russia since 2014 (UNGA Res. 68/262).",
  crimea: "Crimea — Ukraine, occupied by Russia since 2014",
  pick_hint: "Click or tap a country. Pilot countries open the full profile.",
  panel_empty: "No country selected.",
  in_year: "In {y}",
  entity_then: "Entity that year",
  open_profile: "Open profile",
  add_cmp: "+ Comparator", in_cmp: "✓ In comparator",
  not_pilot: "This country is not part of the pilot yet. Data in preparation.",
  y2026: "2026: only projections exist (WPP 2024). Observed: no series. Preliminary: no series identified.",
  legend_h: "Legend",
  sel_h: "Selection for the comparator",
  sel_go: "Compare selection →",

  prof_h: "Pilot countries",
  prof_dek: "Batch 0 of the audits covers four countries chosen because they went through very different economic regimes since 1945.",
  prof_sections: { hist: "History and borders", ent: "State entities", gov: "Government timeline", pol: "Political classification", ref: "Measures and reforms", pros: "Prosperity", eco: "Macroeconomic indicators", src: "Sources and versions" },
  gov_pending: "Terms come from Audit 1's governo_ano file (Batch 0 v0.3), which has not yet been incorporated into the site. No ruler is listed before that.",
  gov_rule: "Once added: each year is linked to governments by days in office; anyone crossing it with indicators chooses and states the convention (government on Dec. 31 or government with most days). No year is attributed to a ruler by default.",
  pol_pending: "Not publishable. Audit 1 describes each government by what changed in each dimension (A–J), with no single ideological label. Today no profile is usable: coverage of level-A measures ranges from 0% to 45% (median 6%), and the trigger is 80% coverage with direction read from the text in 80% of effects.",
  dims: [["A", "Taxation"], ["B", "Spending and budget"], ["C", "State ownership"], ["D", "Markets and competition"], ["E", "Trade and capital"], ["F", "Money and finance"], ["G", "Labor and pensions"], ["H", "Private property and land"], ["I", "Planning"], ["J", "Social services and policy"]],
  dim_cell: "no publishable data",
  ref_note: "Example from Audit 1's methodology illustrating level A (structural reform). Not an assessment or a government profile.",
  ref_more: "The list of measures per government depends on human review of acts flagged as A by automatic screening (32% precision in that class).",
  pros_note: "Separate pillars, never added into an index. Each chart shows one entity per line; different entities are not spliced.",
  eco_pending: "Audit 3 pending. Macroeconomic indicators (including inflation and interest rates, left out of Audit 2) will appear here.",
  no_data: "Data in preparation",
  last_obs: "Latest data",
  open_cmp: "Open in comparator →",
  srcs_demo: "Demonstration mode: no data source is connected. Sources planned for each indicator (Audit 2, §4):",

  cmp_h: "Historical comparator",
  cmp_dek: "Compare countries, periods and before and after a date. The chart shows **association over time**, not cause: no result is attributed to a ruler.",
  modes: { paises: "Countries", reforma: "Before and after", governos: "Successive governments" },
  c_countries: "Countries", c_ind: "Indicator", c_from: "From", c_to: "To", c_mark: "Marker (year)",
  c_mark_hint: "Pick a year or an example of a level-A reform cited in the methodology.",
  c_presets: "Examples",
  c_table: "Table",
  c_unit: "Unit", c_src: "Source", c_lim: "Limitations",
  c_lims: [
    "Lines from different entities are never joined: FRG, GDR and unified Germany; USSR and Russia; Ukrainian SSR and Ukraine.",
    "Current-territory values before statehood (e.g., Ukraine before 1992) are reconstructions, with a lower grade and comparability C3.",
    "Projections (2024–2026) appear hollow and do not count as results.",
    "Do not compare series from different sources, vintages or PPP bases."
  ],
  c_causal: "Before and after is not cause and effect. Other changes (world prices, wars, demographics, crises) happen at the same time, and reforms have lagged effects.",
  c_gov_pending: "Successive governments depends on Audit 1 (governo_ano and the 09_ponte_auditoria1 bridge). In preparation. Once added, the chart will show term bands without attributing results, and terms shorter than one year will not be compared.",
  c_empty: "No series with data for this choice.",
  c_marker: "Marker chosen by the reader",
  c_year: "Year",
  presets: [
    ["BRA", 1991, "Law 8,213/1991 — pension benefit plans"],
    ["DEU", 1994, "Pflege-Versicherungsgesetz (long-term care insurance), 1994"],
    ["RUS", 1990, "Law on Enterprises and Entrepreneurial Activity (Russian SFSR, 1990)"],
    ["UKR", 2010, "Law on the Principles of the Natural Gas Market (Ukraine, 2010)"]
  ],

  meth_h: "Methodology",
  meth_dek: "Three independent audits, with rules published before the results. This page summarizes what is settled and what is missing.",
  audits: [
    { k: "Audit 1", h: "Governments and economic measures", v: "Methodology v0.3 · Oct. 19, 2026 · cutoff Oct. 11, 2026", st: "np", stl: "In progress · profiles not publishable",
      pts: ["Batch 0: Brazil, Germany, USSR/Russia and Ukraine.", "94,572 acts screened automatically into four relevance levels (A structural reform, B relevant sectoral policy, C limited scope, D no economic connection).", "Relevance is not direction: the level comes from the reach of the change, never from whether it expands or reduces the state.", "Direction per effect, across ten dimensions (A–J); opposite effects of one law are kept apart and do not offset.", "On the held-out test, screening recovers 54% of A acts; of those it predicts as A, only 32% are A. So it prioritizes human review and does not classify on its own.", "The number of laws never measures the size of the state or the quality of a government.", "Pending: double coding (≥200 acts, kappa), review of all A acts, reading the text for direction, expert review for each country."] },
    { k: "Audit 2", h: "Prosperity of populations, 1945–2026", v: "Methodology v0.2 · Oct. 20, 2026 · cutoff Oct. 11, 2026", st: "res", stl: "Base collected · publication layer for the pilot",
      pts: ["210 entities (193 UN members, 2 observers, Taiwan, Kosovo and 13 historical entities); a core of 195 for coverage.", "19 sources downloaded (F01–F19), each with URL, date, size and SHA-256 in the manifest.", "Six separate pillars, never added up: health, education, per-capita income, poverty, real median and inequality.", "Nothing interpolated, extrapolated or spliced. The official HDI and the AHDI were not merged.", "17 of 19 sources have a version proven to predate the cutoff; WID (later) and OECD (undated) are left out of the publishable series.", "Almost no series reaches 2026: the latest non-projected data is from 2023 to 2025."] },
    { k: "Audit 3", h: "Economy", v: "—", st: "pend", stl: "Research pending",
      pts: ["Macroeconomic indicators, including inflation and interest rates (outside Audit 2).", "The map, profiles and comparator already include the Economy layer, with no values."] }
  ],
  rel_h: "Reliability (A–D)",
  rel: [["A", "High: direct, official, harmonized measurement (civil registration, complete microdata)."], ["B", "Good: harmonized official estimates or international-standard surveys, with known uncertainty."], ["C", "Limited: heavy imputation, historical reconstructions or heterogeneous compilations."], ["D", "Unfit for comparison: imputation without a primary base, projection or low-quality record."]],
  cmp2_h: "Comparability (C1–C4)",
  cmpb: [["C1", "Comparable across countries and over time within the series."], ["C2", "Comparable over time for the same country; across countries, with caution."], ["C3", "Limited comparability (reconstructions, values before statehood)."], ["C4", "Not comparable (national poverty lines, national maternal mortality estimates)."]],
  elig_h: "Publication rules (Audit 2, §12)",
  elig: [["Not publishable", "Projection; index with a political dimension (AHDI); unproven version or territory; reliability D."], ["Exploratory", "Flagged value pending review; reliability C; comparability C3; reconstruction without an A/B grade."], ["With caveat", "Documented reconstruction graded A/B; A/B with C2 or C4; reconstructed current territory."], ["Publishable", "A/B, C1, state of the time, verified version."]],
  types_h: "Observation types",
  types_d: [["measured", "Official statistic or published survey."], ["estimated", "Modeled by the institution from primary data."], ["projection", "Projection. On the 2026 map, the only type available."], ["historical reconstruction", "Academic reconstruction, or current territory before statehood."], ["calculated from source", "Simple arithmetic on values from the same source."]],
  terr_h: "Borders and entities",
  terr: ["No value is transferred between entities.", "Historical states receive only their own values, within their lifespan.", "Russia and Ukraine count as states from 1992 (first full calendar year); before that, current-territory values are reconstructions.", "Germany 1949–1990: FRG and GDR together, never a single attribution. Sources that do not declare the territory are flagged “to be verified.”", "The map uses current, internationally recognized borders; each year's entity appears in the text."],
  proto_h: "How this prototype uses the data",
  proto: ["The site reads only the manifest and each pilot country's series, on demand (a few KB per country). The worldwide base is never loaded in the browser.", "The _src/oqf/prepare_data.py adapter converts Audit 2's 08_publicacao_piloto.csv file (and, optionally, Audit 1's governo_ano).", "Without those files it generates synthetic demonstration data — and the site shows the “Demonstration data” band on every screen. The two modes never coexist."],
  files_h: "Expected files",
  files: [["Audit 2 v0.2", "dados/08_publicacao_piloto.csv · dados/09_ponte_auditoria1.csv"], ["Audit 1 Batch 0 v0.3", "governo_ano · crosswalk_entidades · relatorios/v03_perfis_governo.csv"], ["Audit 3", "to be defined"]],
  file_state: { demo: "Current mode: demonstration (no audit file loaded).", real: "Current mode: Audit 2 data." },

  countries: {
    BRA: {
      name: "Brazil", entities: [["BRA", "Federative Republic of Brazil", 1945, 2026, "A state throughout the period."]],
      borders: "No change in external borders over the period. Internal changes: capital moved to Brasília (1960); Acre becomes a state (1962); Guanabara state (1960–1975); Mato Grosso do Sul (created 1977); Rondônia becomes a state (1981); Tocantins is created and Roraima and Amapá become states (1988).",
      events: [["1945-10-29", "End of the Estado Novo."], ["1946-09-18", "1946 Constitution."], ["1960-04-21", "Capital moved to Brasília."], ["1964-04-01", "Start of the military regime (until 1985)."], ["1985-03-15", "Civilian government takes office; end of the military regime."], ["1988-10-05", "1988 Federal Constitution."], ["1994-07-01", "The real enters circulation (Real Plan)."]]
    },
    DEU: {
      name: "Germany", entities: [["DEU-OCUP", "Occupied Germany (four Allied zones)", 1945, 1949, "No sovereign German state; Audit 2 has 0 rows for it: 1945–49 values stay under DEU, flagged as before statehood."], ["FRG", "Federal Republic of Germany (FRG)", 1949, 1990, "May 23, 1949 to Oct. 3, 1990."], ["GDR", "German Democratic Republic (GDR)", 1949, 1990, "Oct. 7, 1949 to Oct. 3, 1990."], ["DEU", "Unified Germany", 1990, 2026, "Since Oct. 3, 1990."]],
      borders: "Territories east of the Oder–Neisse line passed to Poland and the USSR in 1945; the border was confirmed by the Two Plus Four Treaty (1990). Saarland joined the FRG in 1957. Berlin had special status until 1990.",
      events: [["1945-05-08", "Unconditional surrender; Allied occupation."], ["1949-05-23", "Basic Law: founding of the FRG."], ["1949-10-07", "Founding of the GDR."], ["1955-05-05", "FRG regains sovereignty (Paris Agreements)."], ["1957-01-01", "Saarland joins the FRG."], ["1961-08-13", "The Berlin Wall is built."], ["1989-11-09", "The Berlin Wall opens."], ["1990-07-01", "FRG–GDR monetary, economic and social union."], ["1990-10-03", "Reunification: the GDR accedes to the FRG."]]
    },
    RUS: {
      name: "Russia", entities: [["SUN", "Soviet Union (USSR)", 1945, 1991, "A state until Dec. 26, 1991. The Russian SFSR (SUN-RSFSR) was one of its republics."], ["RUS", "Russian Federation", 1992, 2026, "A state in the series from 1992 (first full calendar year)."]],
      borders: "Crimea passed from the Russian SFSR to the Ukrainian SSR in 1954. Since 2014 Russia has occupied Crimea and, since 2022, parts of four Ukrainian regions; the declared annexations are not recognized by the UN General Assembly (Res. 68/262 and ES-11/4). The site uses recognized borders.",
      events: [["1954-02-19", "Crimea transferred to the Ukrainian SSR."], ["1991-12-08", "Belovezha Accords."], ["1991-12-26", "Dissolution of the USSR."], ["1993-12-12", "Constitution approved by referendum."], ["2014-03-18", "Annexation of Crimea, not recognized (UNGA 68/262)."], ["2022-02-24", "Full-scale invasion of Ukraine."], ["2022-09-30", "Declared annexation of four Ukrainian regions, not recognized (UNGA ES-11/4)."]]
    },
    UKR: {
      name: "Ukraine", entities: [["UKR-SSR", "Ukrainian SSR (republic of the USSR)", 1945, 1991, "A founding UN member, but not an independent state. Values for the territory in this period are reconstructions, under the UKR code."], ["UKR", "Ukraine", 1992, 2026, "Independence declared Aug. 24, 1991; a state in the series from 1992."]],
      borders: "Received Crimea in 1954. Internationally recognized borders include Crimea and the Donetsk, Luhansk, Zaporizhzhia and Kherson regions, fully or partly occupied by Russia.",
      events: [["1945-10-24", "Ukrainian SSR among the founding members of the UN."], ["1954-02-19", "Receives Crimea."], ["1991-08-24", "Declaration of independence."], ["1991-12-01", "Referendum confirms independence."], ["1996-06-28", "Constitution."], ["2014-03-18", "Crimea annexed by Russia, not recognized; war in Donbas."], ["2022-02-24", "Russia's full-scale invasion."]]
    }
  },
  ent_names: { BRA: "Brazil", DEU: "Unified Germany", "DEU-OCUP": "Occupied Germany", FRG: "FRG", GDR: "GDR", SUN: "USSR", RUS: "Russia", UKR: "Ukraine", "UKR-SSR": "Ukrainian SSR" },
  sub2: { governantes: "Leaders" },
  kpis: [["4", "Pilot countries", "of 195 in Audit 2's core"], ["10", "State entities", "includes FRG, GDR, USSR and Ukrainian SSR"], ["19", "Sources downloaded", "Audit 2 · F01–F19"]],
  kpi_year: "Map year",
  tt_click: "Click to pin",
  panel_none_h: "Choose a country",
  panel_none: "Hover over the map or pick a pilot country:",
  close: "Close",
  gov_in: "Government in {y}",
  ent_in: "Entity in {y}",
  ind_lbl: "Indicator",
  tbl_h: "Countries on the map",
  tbl_cols: ["Country", "Entity in {y}", "Government in {y}", "Politics", "Prosperity", "Economy"],
  tbl_rest: "Other 191 core countries",
  gov_h: "Leaders",
  gov_dek: "Who governed each pilot country since 1945, by regime and by party. A reference timeline: it does not assess governments or attribute results.",
  gov_conv: "Convention: effective leader. President in presidential and semi-presidential systems; chancellor in the FRG and unified Germany; single-party leader in the USSR and the GDR.",
  gov_status: "Public reference list, checked on Oct. 20, 2026. It will be replaced by Audit 1 data (governo_ano) once the file arrives.",
  gov_colors: "Colors identify the party or type of government. They do not indicate ideology.",
  gov_ev: { rup: "Institutional rupture", chg: "Change of regime or state", imp: "Suspension or removal" },
  gov_int: "Interim or short term",
  gov_list: "Full list",
  gov_cols: ["Leader", "Start", "End", "Party / type", "Note"],
  gov_now: "in office",
  gov_src: "Source",
  gov_sun_note: "Before 1991 the territory was part of the USSR: the band shows the Soviet leadership.",
  modes2: { dispersao: "Animated scatter" },
  c_x: "Horizontal axis", c_y: "Vertical axis",
  c_scatter_note: "Each circle is one entity in one year; the trail shows earlier years. Nearby points show association, not cause.",
  c_gov_note: "Bands show who governed. The chart attributes no result to any leader. Terms shorter than one year are hatched and not compared.",
  c_missing: "No data on both axes in {y}:",
  pre_state: "current territory, before statehood"
};
