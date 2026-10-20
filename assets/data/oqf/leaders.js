/* =========================================================
   O que funciona? — governantes dos países-piloto (lista de referência)
   Convenção: liderança efetiva. Presidente em sistemas presidencialistas e
   semipresidencialistas; chanceler na RFA e na Alemanha unificada; dirigente
   do partido único (secretário-geral / primeiro-secretário) na URSS e na RDA.
   Fonte pública conferida em 20/10/2026 (ver "sources"). Situação: A CONFERIR
   com a Auditoria 1 (governo_ano, crosswalk_entidades). Quando a Auditoria 1
   chegar, este arquivo é substituído por ela.
   Cores identificam o partido ou o tipo de governo. Não indicam posição ideológica.
   Copiado para assets/data/oqf/leaders.js por _src/build.py.
   ========================================================= */
OQF.leaders({
  status: "referencia",
  checked: "2026-10-20",
  sources: {
    BRA: ["Biblioteca da Presidência da República — galeria dos ex-presidentes", "https://www.gov.br/secretariageral/pt-br/centrais-de-conteudo/biblioteca-da-pr/galeria-dos-ex-presidentes"],
    DEU: ["Bundeskanzleramt — lista dos chanceleres federais", "https://www.bundeskanzler.de/resource/blob/1905334/1844926/508b0fb252d0eb4095b7d0a2dff3e10e/kanzler-pdf-data.pdf?download=1"],
    GDR: ["Lists of political office-holders in East Germany (Wikipedia, en)", "https://en.wikipedia.org/wiki/Lists_of_political_office-holders_in_East_Germany"],
    SUN: ["List of leaders of the Soviet Union (Wikipedia, en)", "https://en.wikipedia.org/wiki/List_of_leaders_of_the_Soviet_Union"],
    RUS: ["List of presidents of Russia (Wikipedia, en)", "https://en.wikipedia.org/wiki/List_of_presidents_of_Russia"],
    UKR: ["List of presidents of Ukraine (Wikipedia, en)", "https://en.wikipedia.org/wiki/List_of_presidents_of_Ukraine"]
  },
  /* partido ou tipo de governo → cor e rótulo */
  parties: {
    none:   { c: "#8b8f98", pt: "Sem partido / interino", en: "No party / interim" },
    mil:    { c: "#6f7d3c", pt: "Militar", en: "Military" },
    occ:    { c: "#a3a7ae", pt: "Ocupação aliada", en: "Allied occupation" },
    coll:   { c: "#b98e8e", pt: "Liderança coletiva", en: "Collective leadership" },
    PSD:    { c: "#3a78c9", pt: "PSD", en: "PSD" },
    PTB:    { c: "#e07b39", pt: "PTB", en: "PTB" },
    PSP:    { c: "#8e63c9", pt: "PSP", en: "PSP" },
    PTN:    { c: "#c9a23a", pt: "PTN", en: "PTN" },
    PMDB:   { c: "#2e9a52", pt: "PMDB / MDB", en: "PMDB / MDB" },
    PRN:    { c: "#c2508a", pt: "PRN", en: "PRN" },
    PSDB:   { c: "#1f5fa8", pt: "PSDB", en: "PSDB" },
    PT:     { c: "#c8333a", pt: "PT", en: "PT" },
    PSLPL:  { c: "#1d7f8c", pt: "PSL → sem partido → PL", en: "PSL → no party → PL" },
    CDU:    { c: "#2b2d33", pt: "CDU", en: "CDU" },
    SPD:    { c: "#d8202b", pt: "SPD", en: "SPD" },
    FDP:    { c: "#e9b800", pt: "FDP", en: "FDP" },
    SED:    { c: "#7b2a2a", pt: "SED (partido único)", en: "SED (single party)" },
    PCUS:   { c: "#9c3b2e", pt: "PCUS (partido único)", en: "CPSU (single party)" },
    OU:     { c: "#ef8a17", pt: "Nossa Ucrânia", en: "Our Ukraine" },
    PR:     { c: "#3159b8", pt: "Partido das Regiões", en: "Party of Regions" },
    BAT:    { c: "#b5272d", pt: "Batkivshchyna (Pátria)", en: "Batkivshchyna (Fatherland)" },
    BPP:    { c: "#9b3d6f", pt: "Bloco Petro Poroshenko", en: "Petro Poroshenko Bloc" },
    SP:     { c: "#2f9a6a", pt: "Servo do Povo (indicação)", en: "Servant of the People (nominee)" }
  },
  /* faixas de regime / entidade (as linhas do gráfico) */
  lanes: {
    BRA: [
      { id: "r46", pt: "República de 1946", en: "1946 Republic", a: "1945-10-29", b: "1964-04-02" },
      { id: "mil", pt: "Regime militar", en: "Military regime", a: "1964-04-02", b: "1985-03-15" },
      { id: "nr", pt: "Nova República", en: "New Republic", a: "1985-03-15", b: null }
    ],
    DEU: [
      { id: "occ", pt: "Alemanha ocupada", en: "Occupied Germany", a: "1945-05-08", b: "1949-09-15" },
      { id: "frg", pt: "RFA", en: "FRG", a: "1949-09-15", b: "1990-10-03" },
      { id: "gdr", pt: "RDA", en: "GDR", a: "1949-10-07", b: "1990-10-03" },
      { id: "deu", pt: "Alemanha unificada", en: "Unified Germany", a: "1990-10-03", b: null }
    ],
    RUS: [
      { id: "sun", pt: "URSS", en: "USSR", a: "1945-01-01", b: "1991-12-25" },
      { id: "rus", pt: "Federação Russa", en: "Russian Federation", a: "1991-07-10", b: null }
    ],
    UKR: [
      { id: "sun", pt: "RSS da Ucrânia (URSS)", en: "Ukrainian SSR (USSR)", a: "1945-01-01", b: "1991-08-24" },
      { id: "ukr", pt: "Ucrânia independente", en: "Independent Ukraine", a: "1991-08-24", b: null }
    ]
  },
  /* governantes; "lane" aponta para a faixa; datas ISO; b null = no cargo */
  leaders: {
    BRA: [
      { n: "José Linhares", a: "1945-10-29", b: "1946-01-31", p: "none", lane: "r46", k: "int", pt: "Presidente do STF, interino.", en: "Supreme Court president, interim." },
      { n: "Eurico Gaspar Dutra", a: "1946-01-31", b: "1951-01-31", p: "PSD", lane: "r46" },
      { n: "Getúlio Vargas", a: "1951-01-31", b: "1954-08-24", p: "PTB", lane: "r46", pt: "Morreu no cargo.", en: "Died in office." },
      { n: "Café Filho", a: "1954-08-24", b: "1955-11-08", p: "PSP", lane: "r46", pt: "Afastado por motivo de saúde em 3/11/1955.", en: "On medical leave from Nov. 3, 1955." },
      { n: "Carlos Luz", a: "1955-11-08", b: "1955-11-11", p: "PSD", lane: "r46", k: "int" },
      { n: "Nereu Ramos", a: "1955-11-11", b: "1956-01-31", p: "PSD", lane: "r46", k: "int" },
      { n: "Juscelino Kubitschek", a: "1956-01-31", b: "1961-01-31", p: "PSD", lane: "r46" },
      { n: "Jânio Quadros", a: "1961-01-31", b: "1961-08-25", p: "PTN", lane: "r46", pt: "Renunciou.", en: "Resigned." },
      { n: "Ranieri Mazzilli", a: "1961-08-25", b: "1961-09-07", p: "PSD", lane: "r46", k: "int" },
      { n: "João Goulart", a: "1961-09-07", b: "1964-04-02", p: "PTB", lane: "r46", pt: "Deposto; vacância declarada na madrugada de 1º para 2/4/1964.", en: "Deposed; vacancy declared overnight Apr. 1–2, 1964." },
      { n: "Ranieri Mazzilli", a: "1964-04-02", b: "1964-04-15", p: "PSD", lane: "mil", k: "int" },
      { n: "Castelo Branco", a: "1964-04-15", b: "1967-03-15", p: "mil", lane: "mil" },
      { n: "Costa e Silva", a: "1967-03-15", b: "1969-08-31", p: "mil", lane: "mil", pt: "Afastado por doença.", en: "Incapacitated by illness." },
      { n: "Junta Militar", a: "1969-08-31", b: "1969-10-30", p: "mil", lane: "mil", k: "int", pt: "Três ministros militares.", en: "Three military ministers." },
      { n: "Emílio Médici", a: "1969-10-30", b: "1974-03-15", p: "mil", lane: "mil" },
      { n: "Ernesto Geisel", a: "1974-03-15", b: "1979-03-15", p: "mil", lane: "mil" },
      { n: "João Figueiredo", a: "1979-03-15", b: "1985-03-15", p: "mil", lane: "mil" },
      { n: "José Sarney", a: "1985-03-15", b: "1990-03-15", p: "PMDB", lane: "nr" },
      { n: "Fernando Collor", a: "1990-03-15", b: "1992-10-02", p: "PRN", lane: "nr", pt: "Afastado em 2/10/1992; renunciou em 29/12/1992, durante o impeachment.", en: "Suspended Oct. 2, 1992; resigned Dec. 29, 1992, during impeachment." },
      { n: "Itamar Franco", a: "1992-10-02", b: "1995-01-01", p: "none", lane: "nr", pt: "Interino desde 2/10/1992, presidente desde 29/12/1992. Sem partido no cargo (deixou o PRN em 5/5/1992; filiação a conferir).", en: "Acting from Oct. 2, 1992, president from Dec. 29, 1992. No party in office (left PRN May 5, 1992; affiliation to be verified)." },
      { n: "Fernando Henrique Cardoso", a: "1995-01-01", b: "2003-01-01", p: "PSDB", lane: "nr" },
      { n: "Lula", a: "2003-01-01", b: "2011-01-01", p: "PT", lane: "nr" },
      { n: "Dilma Rousseff", a: "2011-01-01", b: "2016-05-12", p: "PT", lane: "nr", pt: "Afastada em 12/5/2016; impeachment concluído em 31/8/2016.", en: "Suspended May 12, 2016; impeachment concluded Aug. 31, 2016." },
      { n: "Michel Temer", a: "2016-05-12", b: "2019-01-01", p: "PMDB", lane: "nr", pt: "Interino desde 12/5/2016, presidente desde 31/8/2016.", en: "Acting from May 12, 2016, president from Aug. 31, 2016." },
      { n: "Jair Bolsonaro", a: "2019-01-01", b: "2023-01-01", p: "PSLPL", lane: "nr", pt: "PSL; sem partido a partir de 19/11/2019; PL a partir de 30/11/2021.", en: "PSL; no party from Nov. 19, 2019; PL from Nov. 30, 2021." },
      { n: "Lula", a: "2023-01-01", b: null, p: "PT", lane: "nr" }
    ],
    DEU: [
      { n: "Conselho de Controle Aliado", en_n: "Allied Control Council", a: "1945-06-05", b: "1949-09-15", p: "occ", lane: "occ", pt: "Quatro potências ocupantes; sem governo alemão soberano.", en: "Four occupying powers; no sovereign German government." },
      { n: "Konrad Adenauer", a: "1949-09-15", b: "1963-10-16", p: "CDU", lane: "frg" },
      { n: "Ludwig Erhard", a: "1963-10-16", b: "1966-12-01", p: "CDU", lane: "frg" },
      { n: "Kurt Georg Kiesinger", a: "1966-12-01", b: "1969-10-21", p: "CDU", lane: "frg" },
      { n: "Willy Brandt", a: "1969-10-21", b: "1974-05-07", p: "SPD", lane: "frg", pt: "Renunciou.", en: "Resigned." },
      { n: "Walter Scheel", a: "1974-05-07", b: "1974-05-16", p: "FDP", lane: "frg", k: "int" },
      { n: "Helmut Schmidt", a: "1974-05-16", b: "1982-10-01", p: "SPD", lane: "frg" },
      { n: "Helmut Kohl", a: "1982-10-01", b: "1990-10-03", p: "CDU", lane: "frg", pt: "Continua como chanceler da Alemanha unificada.", en: "Continues as chancellor of unified Germany." },
      { n: "Pieck e Grotewohl", en_n: "Pieck and Grotewohl", a: "1949-10-07", b: "1950-07-25", p: "SED", lane: "gdr", pt: "Copresidentes do SED desde 22/4/1946.", en: "SED co-chairmen since Apr. 22, 1946." },
      { n: "Walter Ulbricht", a: "1950-07-25", b: "1971-05-03", p: "SED", lane: "gdr" },
      { n: "Erich Honecker", a: "1971-05-03", b: "1989-10-18", p: "SED", lane: "gdr" },
      { n: "Egon Krenz", a: "1989-10-18", b: "1989-12-03", p: "SED", lane: "gdr" },
      { n: "Hans Modrow", a: "1989-12-03", b: "1990-04-12", p: "SED", lane: "gdr", pt: "Chefe de governo desde 13/11/1989; liderança efetiva depois da saída de Krenz (a data varia entre 1º e 3/12/1989 conforme a fonte).", en: "Head of government from Nov. 13, 1989; effective leader after Krenz left (sources vary between Dec. 1 and 3, 1989)." },
      { n: "Lothar de Maizière", a: "1990-04-12", b: "1990-10-03", p: "CDU", lane: "gdr", pt: "Primeiro chefe de governo eleito livremente da RDA.", en: "First freely elected GDR head of government." },
      { n: "Helmut Kohl", a: "1990-10-03", b: "1998-10-27", p: "CDU", lane: "deu" },
      { n: "Gerhard Schröder", a: "1998-10-27", b: "2005-11-22", p: "SPD", lane: "deu" },
      { n: "Angela Merkel", a: "2005-11-22", b: "2021-12-08", p: "CDU", lane: "deu" },
      { n: "Olaf Scholz", a: "2021-12-08", b: "2025-05-06", p: "SPD", lane: "deu" },
      { n: "Friedrich Merz", a: "2025-05-06", b: null, p: "CDU", lane: "deu" }
    ],
    SUN: [
      { n: "Josef Stálin", en_n: "Joseph Stalin", a: "1945-01-01", b: "1953-03-05", p: "PCUS", lane: "sun", pt: "No cargo desde antes de 1945. Morreu no cargo.", en: "In office since before 1945. Died in office." },
      { n: "Gueorgui Malenkov", en_n: "Georgy Malenkov", a: "1953-03-05", b: "1953-03-14", p: "PCUS", lane: "sun", pt: "Chefe de governo até 8/2/1955.", en: "Head of government until Feb. 8, 1955." },
      { n: "Liderança coletiva", en_n: "Collective leadership", a: "1953-03-14", b: "1953-09-07", p: "coll", lane: "sun", k: "int", pt: "Sem primeiro-secretário.", en: "No First Secretary." },
      { n: "Nikita Khruschov", en_n: "Nikita Khrushchev", a: "1953-09-07", b: "1964-10-14", p: "PCUS", lane: "sun" },
      { n: "Leonid Brejnev", en_n: "Leonid Brezhnev", a: "1964-10-14", b: "1982-11-10", p: "PCUS", lane: "sun", pt: "Morreu no cargo.", en: "Died in office." },
      { n: "Iúri Andropov", en_n: "Yuri Andropov", a: "1982-11-12", b: "1984-02-09", p: "PCUS", lane: "sun", pt: "Morreu no cargo.", en: "Died in office." },
      { n: "Konstantin Tchernenko", en_n: "Konstantin Chernenko", a: "1984-02-13", b: "1985-03-10", p: "PCUS", lane: "sun", pt: "Morreu no cargo.", en: "Died in office." },
      { n: "Mikhail Gorbatchov", en_n: "Mikhail Gorbachev", a: "1985-03-11", b: "1991-12-25", p: "PCUS", lane: "sun", pt: "Secretário-geral até 24/8/1991; presidente da URSS de 15/3/1990 a 25/12/1991.", en: "General Secretary until Aug. 24, 1991; President of the USSR Mar. 15, 1990 – Dec. 25, 1991." }
    ],
    RUS: [
      { n: "Boris Iéltsin", en_n: "Boris Yeltsin", a: "1991-07-10", b: "1999-12-31", p: "none", lane: "rus", pt: "Presidente da RSFS da Rússia até 25/12/1991. Renunciou.", en: "President of the Russian SFSR until Dec. 25, 1991. Resigned." },
      { n: "Vladimir Putin", a: "1999-12-31", b: "2008-05-07", p: "none", lane: "rus", pt: "Interino até 7/5/2000.", en: "Acting until May 7, 2000." },
      { n: "Dmitri Medvedev", en_n: "Dmitry Medvedev", a: "2008-05-07", b: "2012-05-07", p: "none", lane: "rus" },
      { n: "Vladimir Putin", a: "2012-05-07", b: null, p: "none", lane: "rus" }
    ],
    UKR: [
      { n: "Leonid Kravtchuk", en_n: "Leonid Kravchuk", a: "1991-08-24", b: "1994-07-19", p: "none", lane: "ukr", pt: "Chefe de Estado como presidente da Rada desde a independência; presidente a partir de 5/12/1991.", en: "Head of state as Rada chairman from independence; president from Dec. 5, 1991." },
      { n: "Leonid Kutchma", en_n: "Leonid Kuchma", a: "1994-07-19", b: "2005-01-23", p: "none", lane: "ukr" },
      { n: "Viktor Iuschenko", en_n: "Viktor Yushchenko", a: "2005-01-23", b: "2010-02-25", p: "OU", lane: "ukr" },
      { n: "Viktor Ianukovitch", en_n: "Viktor Yanukovych", a: "2010-02-25", b: "2014-02-22", p: "PR", lane: "ukr", pt: "Destituído pela Rada em 22/2/2014.", en: "Removed by the Rada on Feb. 22, 2014." },
      { n: "Oleksandr Turtchinov", en_n: "Oleksandr Turchynov", a: "2014-02-23", b: "2014-06-07", p: "BAT", lane: "ukr", k: "int" },
      { n: "Petro Poroshenko", a: "2014-06-07", b: "2019-05-20", p: "BPP", lane: "ukr" },
      { n: "Volodimir Zelenski", en_n: "Volodymyr Zelensky", a: "2019-05-20", b: null, p: "SP", lane: "ukr", pt: "Mandato prorrogado pela lei marcial desde 2024.", en: "Term extended under martial law since 2024." }
    ]
  },
  /* marcos: ruptura (mudança fora das regras), mudança de Estado, saída antecipada */
  events: {
    BRA: [{ d: "1964-04-02", k: "rup", pt: "Deposição de João Goulart", en: "João Goulart deposed" }, { d: "1985-03-15", k: "chg", pt: "Fim do regime militar", en: "End of military regime" }, { d: "1992-10-02", k: "imp", pt: "Afastamento de Collor", en: "Collor suspended" }, { d: "2016-05-12", k: "imp", pt: "Afastamento de Dilma", en: "Rousseff suspended" }],
    DEU: [{ d: "1949-05-23", k: "chg", pt: "Lei Fundamental (RFA)", en: "Basic Law (FRG)" }, { d: "1990-10-03", k: "chg", pt: "Reunificação", en: "Reunification" }],
    RUS: [{ d: "1991-12-26", k: "chg", pt: "Dissolução da URSS", en: "USSR dissolved" }],
    UKR: [{ d: "1991-08-24", k: "chg", pt: "Independência", en: "Independence" }, { d: "2014-02-22", k: "imp", pt: "Destituição de Ianukovitch", en: "Yanukovych removed" }]
  }
});
