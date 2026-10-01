/* =========================================================
   ESTADOS / INDICAÇÕES PESSOAIS — 13-indicacoes-de-voto.md
   Indicações pessoais do autor/parceiro, fonte peterapoia.com.
   NÃO são conclusão do comparador factual.
   ========================================================= */
window.EB = window.EB || {};

EB.recsMeta = {
  source_name: "peterapoia.com",
  source_url: "https://peterapoia.com/",
  last_updated: "2026-09-30",
  photo_credit: "Fotos: TSE — Portal de Dados Abertos (Candidatos 2026)",
  status: "Indicações em atualização",
  disclaimer: "Estas escolhas são indicações pessoais do autor/parceiro. Não são recomendações produzidas por inteligência artificial e não são conclusão do comparador factual.",
  offices: [
    { id: "governor", name: "Governador", slots: 1 },
    { id: "senate", name: "Senado", slots: 2, note: "2 vagas em 2026" },
    { id: "federal_deputy", name: "Deputado federal", slots: 1 },
    { id: "state_deputy", name: "Deputado estadual / distrital", slots: 1 }
  ]
};

/* Grade do cartograma: [linha, coluna] */
EB.ufs = [
  { uf: "AC", name: "Acre", pos: [3, 1] }, { uf: "AL", name: "Alagoas", pos: [4, 7] },
  { uf: "AP", name: "Amapá", pos: [1, 5] }, { uf: "AM", name: "Amazonas", pos: [2, 2] },
  { uf: "BA", name: "Bahia", pos: [4, 6] }, { uf: "CE", name: "Ceará", pos: [2, 6] },
  { uf: "DF", name: "Distrito Federal", pos: [4, 5] }, { uf: "ES", name: "Espírito Santo", pos: [5, 6] },
  { uf: "GO", name: "Goiás", pos: [4, 4] }, { uf: "MA", name: "Maranhão", pos: [2, 5] },
  { uf: "MT", name: "Mato Grosso", pos: [3, 3] }, { uf: "MS", name: "Mato Grosso do Sul", pos: [4, 3] },
  { uf: "MG", name: "Minas Gerais", pos: [5, 5] }, { uf: "PA", name: "Pará", pos: [2, 4] },
  { uf: "PB", name: "Paraíba", pos: [3, 7] }, { uf: "PR", name: "Paraná", pos: [5, 3] },
  { uf: "PE", name: "Pernambuco", pos: [3, 6] }, { uf: "PI", name: "Piauí", pos: [3, 5] },
  { uf: "RJ", name: "Rio de Janeiro", pos: [6, 5] }, { uf: "RN", name: "Rio Grande do Norte", pos: [2, 7] },
  { uf: "RS", name: "Rio Grande do Sul", pos: [7, 3] }, { uf: "RO", name: "Rondônia", pos: [3, 2] },
  { uf: "RR", name: "Roraima", pos: [1, 3] }, { uf: "SC", name: "Santa Catarina", pos: [6, 3] },
  { uf: "SP", name: "São Paulo", pos: [5, 4] }, { uf: "SE", name: "Sergipe", pos: [5, 7] },
  { uf: "TO", name: "Tocantins", pos: [3, 4] }
];

/* Indicação para Presidência (nacional) — peterapoia.com, conferido em 30/09/2026.
   Foto: TSE — Portal de Dados Abertos, "Candidatos - 2026", recurso "BR - Fotos de candidatos". */
EB.recsPresident = { name: "Flávio Bolsonaro", party: "PL", number: "22", uf: "BR", photo: "assets/images/president/flavio-bolsonaro.jpg", source: "peterapoia.com", last_updated: "2026-09-30" };

/* Indicações por UF — seleção: peterapoia.com (conferido em 30/09/2026; apenas nome, partido e número).
   Fotos: TSE — Portal de Dados Abertos, conjunto "Candidatos - 2026", recurso "<UF> - Fotos de candidatos"
   (foto_cand2026_<UF>_div.zip). Correspondência feita por UF + cargo + número + nome de urna + partido
   no cadastro oficial consulta_cand_2026 (SQ_CANDIDATO). Procedência de cada arquivo:
   assets/images/CREDITOS-TSE.json */
EB.recs = {};
EB.recs.AC = {
  uf: "AC", source: "peterapoia.com", last_updated: "2026-09-30",
  governor: { name: "Alan Rick", party: "Republicanos", number: "10", photo: "assets/images/states/ac/alan-rick-10.webp" },
  senate: [
    { name: "Márcio Bittar", party: "PL", number: "222", photo: "assets/images/states/ac/marcio-bittar-222.webp" },
    { name: "Mara Rocha", party: "Republicanos", number: "100", photo: "assets/images/states/ac/mara-rocha-100.webp" }
  ],
  federal_deputy: [
    { name: "João Bittar", party: "PL", number: "2222", photo: "assets/images/states/ac/joao-bittar-2222.webp" },
    { name: "Manelzinho", party: "Novo", number: "3022", photo: "assets/images/states/ac/manelzinho-3022.webp" },
    { name: "Pedro Pascoal", party: "PSDB", number: "4500", photo: "assets/images/states/ac/pedro-pascoal-4500.webp" }
  ],
  state_deputy: [
    { name: "Emerson Jarude", party: "Novo", number: "30000", photo: "assets/images/states/ac/emerson-jarude-30000.webp" },
    { name: "Charlene Lima", party: "PL", number: "22222", photo: "assets/images/states/ac/charlene-lima-22222.webp" },
    { name: "Professor Paulo Henrique", party: "Novo", number: "30333", photo: "assets/images/states/ac/professor-paulo-henrique-30333.webp" }
  ]
};
EB.recs.AL = {
  uf: "AL", source: "peterapoia.com", last_updated: "2026-09-30",
  governor: { name: "JHC", party: "PSDB", number: "45", photo: "assets/images/states/al/jhc-45.webp" },
  senate: [
    { name: "Marina JHC", party: "PSDB", number: "456", photo: "assets/images/states/al/marina-jhc-456.webp" },
    { name: "Arthur Lira", party: "PP", number: "111", photo: "assets/images/states/al/arthur-lira-111.webp" }
  ],
  federal_deputy: [
    { name: "Guido Santos", party: "Novo", number: "3030", photo: "assets/images/states/al/guido-santos-3030.webp" },
    { name: "Henrique Costa", party: "PL", number: "2222", photo: "assets/images/states/al/henrique-costa-2222.webp" },
    { name: "Delegado Fabio Costa", party: "PP", number: "1190", photo: "assets/images/states/al/delegado-fabio-costa-1190.webp" }
  ],
  state_deputy: [
    { name: "Leonardo Dias", party: "PL", number: "22123", photo: "assets/images/states/al/leonardo-dias-22123.webp" },
    { name: "Cabo Bebeto", party: "PL", number: "22222", photo: "assets/images/states/al/cabo-bebeto-22222.webp" },
    { name: "Coronel Rocha Lima", party: "PL", number: "22190", photo: "assets/images/states/al/coronel-rocha-lima-22190.webp" }
  ]
};
EB.recs.AM = {
  uf: "AM", source: "peterapoia.com", last_updated: "2026-09-30",
  governor: { name: "Professora Maria do Carmo", party: "PL", number: "22", photo: "assets/images/states/am/professora-maria-do-carmo-22.webp" },
  senate: [
    { name: "Capitão Alberto Neto", party: "PL", number: "222", photo: "assets/images/states/am/capitao-alberto-neto-222.webp" },
    { name: "Plinio Valério", party: "PSDB", number: "455", photo: "assets/images/states/am/plinio-valerio-455.webp" }
  ],
  federal_deputy: [
    { name: "Sargento Salazar", party: "PL", number: "2211", photo: "assets/images/states/am/sargento-salazar-2211.webp" },
    { name: "Layon Nunes", party: "Novo", number: "3030", photo: "assets/images/states/am/layon-nunes-3030.webp" },
    { name: "Jean Batista", party: "PL", number: "2210", photo: "assets/images/states/am/jean-batista-2210.webp" }
  ],
  state_deputy: [
    { name: "Kidson Maia", party: "PL", number: "22111", photo: "assets/images/states/am/kidson-maia-22111.webp" },
    { name: "Mônica Alves de Souza Mota", party: "Novo", number: "30000", photo: "assets/images/states/am/monica-alves-de-souza-mota-30000.webp" },
    { name: "Cabo Maciel", party: "PL", number: "22333", photo: "assets/images/states/am/cabo-maciel-22333.webp" },
    { name: "Delegado Péricles", party: "PL", number: "22222", photo: "assets/images/states/am/delegado-pericles-22222.webp" },
    { name: "Rodrigo Guedes", party: "Republicanos", number: "10007", photo: "assets/images/states/am/rodrigo-guedes-10007.webp" }
  ]
};
EB.recs.AP = {
  uf: "AP", source: "peterapoia.com", last_updated: "2026-09-30",
  governor: { name: "Dr. Furlan", party: "PSD", number: "55", photo: "assets/images/states/ap/dr-furlan-55.webp" },
  senate: [
    { name: "Rayssa Furlan", party: "Podemos", number: "200", photo: "assets/images/states/ap/rayssa-furlan-200.webp" },
    { name: "Lucas Barreto", party: "PSD", number: "555", photo: "assets/images/states/ap/lucas-barreto-555.webp" }
  ],
  federal_deputy: [
    { name: "Vinicius Gurgel", party: "PL", number: "2222", photo: "assets/images/states/ap/vinicius-gurgel-2222.webp" },
    { name: "Iranei Lopes", party: "Novo", number: "3030", photo: "assets/images/states/ap/iranei-lopes-3030.webp" },
    { name: "Gesiel Oliveira", party: "PL", number: "2277", photo: "assets/images/states/ap/gesiel-oliveira-2277.webp" }
  ],
  state_deputy: [
    { name: "Madson Millor", party: "PL", number: "22222", photo: "assets/images/states/ap/madson-millor-22222.webp" },
    { name: "Marcelo Oliveira", party: "Novo", number: "30000", photo: "assets/images/states/ap/marcelo-oliveira-30000.webp" },
    { name: "Aparecida Salomão", party: "União Brasil", number: "44700", photo: "assets/images/states/ap/aparecida-salomao-44700.webp" }
  ]
};
EB.recs.BA = {
  uf: "BA", source: "peterapoia.com", last_updated: "2026-09-30",
  governor: { name: "ACM Neto", party: "União Brasil", number: "44", photo: "assets/images/states/ba/acm-neto-44.webp" },
  senate: [
    { name: "João Roma", party: "PL", number: "222", photo: "assets/images/states/ba/joao-roma-222.webp" },
    { name: "Angelo Coronel", party: "Republicanos", number: "100", photo: "assets/images/states/ba/angelo-coronel-100.webp" }
  ],
  federal_deputy: [
    { name: "Leandro de Jesus", party: "PL", number: "2233", photo: "assets/images/states/ba/leandro-de-jesus-2233.webp" },
    { name: "Doutora Raissa Soares", party: "PL", number: "2299", photo: "assets/images/states/ba/doutora-raissa-soares-2299.webp" },
    { name: "Giu Argolo", party: "PL", number: "2226", photo: "assets/images/states/ba/giu-argolo-2226.webp" }
  ],
  state_deputy: [
    { name: "Rebeca Martins", party: "PL", number: "22122", photo: "assets/images/states/ba/rebeca-martins-22122.webp" },
    { name: "Jarbas Lemoss", party: "PL", number: "22822", photo: "assets/images/states/ba/jarbas-lemoss-22822.webp" },
    { name: "Tenóbio", party: "PL", number: "22007", photo: "assets/images/states/ba/tenobio-22007.webp" }
  ]
};
EB.recs.CE = {
  uf: "CE", source: "peterapoia.com", last_updated: "2026-09-30",
  governor: { name: "Ciro Gomes", party: "PSDB", number: "45", photo: "assets/images/states/ce/ciro-gomes-45.webp" },
  senate: [
    { name: "Alcides Fernandes", party: "PL", number: "222", photo: "assets/images/states/ce/alcides-fernandes-222.webp" },
    { name: "Capitão Wagner", party: "União Brasil", number: "445", photo: "assets/images/states/ce/capitao-wagner-445.webp" }
  ],
  federal_deputy: [
    { name: "André Fernandes", party: "PL", number: "2222", photo: "assets/images/states/ce/andre-fernandes-2222.webp" },
    { name: "Priscila Costa", party: "PL", number: "2288", photo: "assets/images/states/ce/priscila-costa-2288.webp" },
    { name: "Carmelo Neto", party: "PL", number: "2200", photo: "assets/images/states/ce/carmelo-neto-2200.webp" }
  ],
  state_deputy: [
    { name: "Jeovane Barros", party: "Novo", number: "30000", photo: "assets/images/states/ce/jeovane-barros-30000.webp" },
    { name: "Bella Carmelo", party: "PL", number: "22022", photo: "assets/images/states/ce/bella-carmelo-22022.webp" },
    { name: "Dra Mayra Pinheiro", party: "PL", number: "22000", photo: "assets/images/states/ce/dra-mayra-pinheiro-22000.webp" }
  ]
};
EB.recs.DF = {
  uf: "DF", source: "peterapoia.com", last_updated: "2026-09-30",
  governor: { name: "Celina Leão", party: "PP", number: "11", photo: "assets/images/states/df/celina-leao-11.webp" },
  senate: [
    { name: "Michelle Bolsonaro", party: "PL", number: "222", photo: "assets/images/states/df/michelle-bolsonaro-222.webp" },
    { name: "Bia Kicis", party: "PL", number: "223", photo: "assets/images/states/df/bia-kicis-223.webp" }
  ],
  federal_deputy: [
    { name: "Mariana Naime", party: "PL", number: "2201", photo: "assets/images/states/df/mariana-naime-2201.webp" },
    { name: "Wilker Sá", party: "Novo", number: "3000", photo: "assets/images/states/df/wilker-sa-3000.webp" },
    { name: "Thiago Manzoni", party: "PL", number: "2233", photo: "assets/images/states/df/thiago-manzoni-2233.webp" }
  ],
  state_deputy: [
    { name: "Luíza do Clezão", party: "PL", number: "22822", photo: "assets/images/states/df/luiza-do-clezao-22822.webp" },
    { name: "Julia Lucy", party: "PL", number: "22190", photo: "assets/images/states/df/julia-lucy-22190.webp" },
    { name: "Carol Kalil", party: "PL", number: "22122", photo: "assets/images/states/df/carol-kalil-22122.webp" }
  ]
};
EB.recs.ES = {
  uf: "ES", source: "peterapoia.com", last_updated: "2026-09-30",
  governor: { name: "Lorenzo Pazolini", party: "Republicanos", number: "10", photo: "assets/images/states/es/lorenzo-pazolini-10.webp" },
  senate: [
    { name: "Maguinha Malta", party: "PL", number: "222", photo: "assets/images/states/es/maguinha-malta-222.webp" },
    { name: "Evair de Melo", party: "Republicanos", number: "100", photo: "assets/images/states/es/evair-de-melo-100.webp" }
  ],
  federal_deputy: [
    { name: "Gilvan o Federal da Direita", party: "PL", number: "2222", photo: "assets/images/states/es/gilvan-o-federal-da-direita-2222.webp" },
    { name: "Lucas Polese", party: "PL", number: "2212", photo: "assets/images/states/es/lucas-polese-2212.webp" },
    { name: "Lazaro", party: "PL", number: "2233", photo: "assets/images/states/es/lazaro-2233.webp" }
  ],
  state_deputy: [
    { name: "Elber Fidelis", party: "Novo", number: "30762", photo: "assets/images/states/es/elber-fidelis-30762.webp" },
    { name: "Darcio Bracarense", party: "PL", number: "22322", photo: "assets/images/states/es/darcio-bracarense-22322.webp" },
    { name: "Capitão Assumção", party: "PL", number: "22190", photo: "assets/images/states/es/capitao-assumcao-22190.webp" }
  ]
};
EB.recs.GO = {
  uf: "GO", source: "peterapoia.com", last_updated: "2026-09-30",
  governor: { name: "Wilder Morais", party: "PL", number: "22", photo: "assets/images/states/go/wilder-morais-22.webp" },
  senate: [
    { name: "Gustavo Gayer", party: "PL", number: "222", photo: "assets/images/states/go/gustavo-gayer-222.webp" },
    { name: "Oséias Varão", party: "PL", number: "227", photo: "assets/images/states/go/oseias-varao-227.webp" }
  ],
  federal_deputy: [
    { name: "Adília Roriz", party: "PL", number: "2280", photo: "assets/images/states/go/adilia-roriz-2280.webp" },
    { name: "Fred Rodrigues", party: "PL", number: "2220", photo: "assets/images/states/go/fred-rodrigues-2220.webp" },
    { name: "Delegado Humberto Teófilo", party: "Novo", number: "3011", photo: "assets/images/states/go/delegado-humberto-teofilo-3011.webp" }
  ],
  state_deputy: [
    { name: "Felipe Galdino", party: "PL", number: "22133", photo: "assets/images/states/go/felipe-galdino-22133.webp" },
    { name: "Julio Cunha (Pró-Armas)", party: "PL", number: "22223", photo: "assets/images/states/go/julio-cunha-proarmas-22223.webp" },
    { name: "Marquinho", party: "PL", number: "22221", photo: "assets/images/states/go/marquinho-22221.webp" },
    { name: "Dr. Amarildo", party: "Novo", number: "30111", photo: "assets/images/states/go/dr-amarildo-30111.webp" }
  ]
};
EB.recs.MA = {
  uf: "MA", source: "peterapoia.com", last_updated: "2026-09-30",
  governor: { name: "Eduardo Braide", party: "PSD", number: "55", photo: "assets/images/states/ma/eduardo-braide-55.webp" },
  senate: [
    { name: "Cidônio Gonçalves", party: "PL", number: "222", photo: "assets/images/states/ma/cidonio-goncalves-222.webp" },
    { name: "Lahesio Bonfim", party: "Novo", number: "300", photo: "assets/images/states/ma/lahesio-bonfim-300.webp" }
  ],
  federal_deputy: [
    { name: "Flavia Berthier", party: "PL", number: "2201", photo: "assets/images/states/ma/flavia-berthier-2201.webp" },
    { name: "Dr. Yglésio", party: "PRD", number: "2501", photo: "assets/images/states/ma/dr-yglesio-2501.webp" },
    { name: "Mariana Carvalho", party: "PL", number: "2210", photo: "assets/images/states/ma/mariana-carvalho-2210.webp" }
  ],
  state_deputy: [
    { name: "Filipe Arnon", party: "PL", number: "22022", photo: "assets/images/states/ma/filipe-arnon-22022.webp" },
    { name: "Wellington do Curso", party: "PSD", number: "55111", photo: "assets/images/states/ma/wellington-do-curso-55111.webp" },
    { name: "Douglas Pinto", party: "PSD", number: "55555", photo: "assets/images/states/ma/douglas-pinto-55555.webp" }
  ]
};
EB.recs.MG = {
  uf: "MG", source: "peterapoia.com", last_updated: "2026-09-30",
  governor: { name: "Flávio Roscoe", party: "PL", number: "22", photo: "assets/images/states/mg/flavio-roscoe-22.webp" },
  senate: [
    { name: "Domingos Sávio", party: "PL", number: "222", photo: "assets/images/states/mg/domingos-savio-222.webp" },
    { name: "Carlos Viana", party: "PSD", number: "555", photo: "assets/images/states/mg/carlos-viana-555.webp" }
  ],
  federal_deputy: [
    { name: "Altivo Duarte", party: "Novo", number: "3037", photo: "assets/images/states/mg/altivo-duarte-3037.webp" },
    { name: "Nikolas Ferreira", party: "PL", number: "2222", photo: "assets/images/states/mg/nikolas-ferreira-2222.webp" },
    { name: "Warley Mól", party: "Novo", number: "3033", photo: "assets/images/states/mg/warley-mol-3033.webp" }
  ],
  state_deputy: [
    { name: "Rian Pereira", party: "Novo", number: "30000", photo: "assets/images/states/mg/rian-pereira-30000.webp" },
    { name: "Bruno Engler", party: "PL", number: "22222", photo: "assets/images/states/mg/bruno-engler-22222.webp" },
    { name: "Fernanda Pereira Altoé", party: "Novo", number: "30007", photo: "assets/images/states/mg/fernanda-pereira-altoe-30007.webp" },
    { name: "Saori Volkov", party: "Novo", number: "30004", photo: "assets/images/states/mg/saori-volkov-30004.webp" }
  ]
};
EB.recs.MS = {
  uf: "MS", source: "peterapoia.com", last_updated: "2026-09-30",
  governor: { name: "Eduardo Riedel", party: "PP", number: "11", photo: "assets/images/states/ms/eduardo-riedel-11.webp" },
  senate: [
    { name: "Reinaldo Azambuja", party: "PL", number: "222", photo: "assets/images/states/ms/reinaldo-azambuja-222.webp" },
    { name: "Capitão Contar", party: "PL", number: "221", photo: "assets/images/states/ms/capitao-contar-221.webp" }
  ],
  federal_deputy: [
    { name: "Marcos Pollon", party: "PL", number: "2222", photo: "assets/images/states/ms/marcos-pollon-2222.webp" },
    { name: "Rodolfo Nogueira", party: "PL", number: "2211", photo: "assets/images/states/ms/rodolfo-nogueira-2211.webp" },
    { name: "Cassy Monteiro", party: "PL", number: "2267", photo: "assets/images/states/ms/cassy-monteiro-2267.webp" }
  ],
  state_deputy: [
    { name: "Wagner Higa", party: "PL", number: "22357", photo: "assets/images/states/ms/wagner-higa-22357.webp" },
    { name: "Coronel David", party: "PL", number: "22800", photo: "assets/images/states/ms/coronel-david-22800.webp" },
    { name: "Sargento Betânia", party: "PL", number: "22190", photo: "assets/images/states/ms/sargento-betania-22190.webp" }
  ]
};
EB.recs.MT = {
  uf: "MT", source: "peterapoia.com", last_updated: "2026-09-30",
  governor: { name: "Wellington Fagundes", party: "PL", number: "22", photo: "assets/images/states/mt/wellington-fagundes-22.webp" },
  senate: [
    { name: "Zé Medeiros", party: "PL", number: "222", photo: "assets/images/states/mt/ze-medeiros-222.webp" },
    { name: "Mauro Mendes", party: "União Brasil", number: "444", photo: "assets/images/states/mt/mauro-mendes-444.webp" }
  ],
  federal_deputy: [
    { name: "Thiago Boava Hey Roy", party: "PL", number: "2202", photo: "assets/images/states/mt/thiago-boava-hey-roy-2202.webp" },
    { name: "Coronel Assis", party: "PL", number: "2244", photo: "assets/images/states/mt/coronel-assis-2244.webp" },
    { name: "Coronel Fernanda", party: "PL", number: "2222", photo: "assets/images/states/mt/coronel-fernanda-2222.webp" }
  ],
  state_deputy: [
    { name: "Gilberto Cattani", party: "PL", number: "22222", photo: "assets/images/states/mt/gilberto-cattani-22222.webp" },
    { name: "Otávio Xerife", party: "PL", number: "22007", photo: "assets/images/states/mt/otavio-xerife-22007.webp" },
    { name: "Abmael Borges", party: "PL", number: "22022", photo: "assets/images/states/mt/abmael-borges-22022.webp" }
  ]
};
EB.recs.PA = {
  uf: "PA", source: "peterapoia.com", last_updated: "2026-09-30",
  governor: { name: "Dr. Daniel", party: "Podemos", number: "20", photo: "assets/images/states/pa/dr-daniel-20.webp" },
  senate: [
    { name: "Delegado Éder Mauro", party: "PL", number: "222", photo: "assets/images/states/pa/delegado-eder-mauro-222.webp" },
    { name: "Zequinha Marinho", party: "Podemos", number: "200", photo: "assets/images/states/pa/zequinha-marinho-200.webp" }
  ],
  federal_deputy: [
    { name: "Allen pelo Pará", party: "Novo", number: "3022", photo: "assets/images/states/pa/allen-pelo-para-3022.webp" },
    { name: "Rogerio Barra", party: "PL", number: "2255", photo: "assets/images/states/pa/rogerio-barra-2255.webp" },
    { name: "Joaquim Passarinho", party: "PL", number: "2222", photo: "assets/images/states/pa/joaquim-passarinho-2222.webp" }
  ],
  state_deputy: [
    { name: "Richard Malheiros", party: "Novo", number: "30022", photo: "assets/images/states/pa/richard-malheiros-30022.webp" },
    { name: "JK do Povão", party: "PL", number: "22777", photo: "assets/images/states/pa/jk-do-povao-22777.webp" },
    { name: "Lanuzia Cunha", party: "PL", number: "22022", photo: "assets/images/states/pa/lanuzia-cunha-22022.webp" }
  ]
};
EB.recs.PB = {
  uf: "PB", source: "peterapoia.com", last_updated: "2026-09-30",
  governor: { name: "Efraim Filho", party: "PL", number: "22", photo: "assets/images/states/pb/efraim-filho-22.webp" },
  senate: [
    { name: "Dr. Marcelo Queiroga", party: "PL", number: "222", photo: "assets/images/states/pb/dr-marcelo-queiroga-222.webp" },
    { name: "Major Fábio", party: "Novo", number: "300", photo: "assets/images/states/pb/major-fabio-300.webp" }
  ],
  federal_deputy: [
    { name: "Cabo Gilberto Silva", party: "PL", number: "2222", photo: "assets/images/states/pb/cabo-gilberto-silva-2222.webp" },
    { name: "Krisna Gopal", party: "DC", number: "2767", photo: "assets/images/states/pb/krisna-gopal-2767.webp" },
    { name: "Cantora Munique Marinho", party: "PL", number: "2223", photo: "assets/images/states/pb/cantora-munique-marinho-2223.webp" }
  ],
  state_deputy: [
    { name: "Fábio Lopes", party: "PL", number: "22000", photo: "assets/images/states/pb/fabio-lopes-22000.webp" },
    { name: "Nilvan Ferreira", party: "PL", number: "22222", photo: "assets/images/states/pb/nilvan-ferreira-22222.webp" },
    { name: "Sargento Neto", party: "PL", number: "22999", photo: "assets/images/states/pb/sargento-neto-22999.webp" }
  ]
};
EB.recs.PE = {
  uf: "PE", source: "peterapoia.com", last_updated: "2026-09-30",
  governor: { name: "Raquel Lyra", party: "PSD", number: "55", photo: "assets/images/states/pe/raquel-lyra-55.webp" },
  senate: [
    { name: "Mendonça Filho", party: "PL", number: "222", photo: "assets/images/states/pe/mendonca-filho-222.webp" },
    { name: "Carlos Sant'Anna", party: "Novo", number: "300", photo: "assets/images/states/pe/carlos-santanna-300.webp" }
  ],
  federal_deputy: [
    { name: "Thiago Medina", party: "PL", number: "2288", photo: "assets/images/states/pe/thiago-medina-2288.webp" },
    { name: "Eduardo Moura", party: "Novo", number: "3030", photo: "assets/images/states/pe/eduardo-moura-3030.webp" },
    { name: "Clarissa Tércio", party: "PP", number: "1122", photo: "assets/images/states/pe/clarissa-tercio-1122.webp" },
    { name: "João Pedro Cavalcanti", party: "Novo", number: "3090", photo: "assets/images/states/pe/joao-pedro-cavalcanti-3090.webp" },
    { name: "Coronel Meira", party: "PL", number: "2201", photo: "assets/images/states/pe/coronel-meira-2201.webp" }
  ],
  state_deputy: [
    { name: "Rodolfo Silva", party: "Novo", number: "30123", photo: "assets/images/states/pe/rodolfo-silva-30123.webp" },
    { name: "Lara Cavalcanti", party: "PL", number: "22123", photo: "assets/images/states/pe/lara-cavalcanti-22123.webp" },
    { name: "Tecio Teles", party: "Novo", number: "30000", photo: "assets/images/states/pe/tecio-teles-30000.webp" },
    { name: "Coronel Tibério", party: "Novo", number: "30321", photo: "assets/images/states/pe/coronel-tiberio-30321.webp" }
  ]
};
EB.recs.PI = {
  uf: "PI", source: "peterapoia.com", last_updated: "2026-09-30",
  governor: { name: "Elizeu Aguiar", party: "Novo", number: "30", photo: "assets/images/states/pi/elizeu-aguiar-30.webp" },
  senate: [
    { name: "Tiago Junqueira", party: "PL", number: "222", photo: "assets/images/states/pi/tiago-junqueira-222.webp" },
    { name: "Antônio Barros", party: "Novo", number: "300", photo: "assets/images/states/pi/antonio-barros-300.webp" }
  ],
  federal_deputy: [
    { name: "Liamara Alencar", party: "PL", number: "2211", photo: "assets/images/states/pi/liamara-alencar-2211.webp" },
    { name: "Samantha Cavalca", party: "PP", number: "1122", photo: "assets/images/states/pi/samantha-cavalca-1122.webp" },
    { name: "Dr. Maurício Soares", party: "PL", number: "2200", photo: "assets/images/states/pi/dr-mauricio-soares-2200.webp" }
  ],
  state_deputy: [
    { name: "Glória Borges", party: "PL", number: "22000", photo: "assets/images/states/pi/gloria-borges-22000.webp" },
    { name: "Petrus Evelyn (o Piauiense)", party: "PP", number: "11000", photo: "assets/images/states/pi/petrus-evelyn-o-piauiense-11000.webp" },
    { name: "Lytson Breno", party: "PP", number: "11122", photo: "assets/images/states/pi/lytson-breno-11122.webp" }
  ]
};
EB.recs.PR = {
  uf: "PR", source: "peterapoia.com", last_updated: "2026-09-30",
  governor: { name: "Sergio Moro", party: "PL", number: "22", photo: "assets/images/states/pr/sergio-moro-22.webp" },
  senate: [
    { name: "Deltan Dallagnol", party: "Novo", number: "300", photo: "assets/images/states/pr/deltan-dallagnol-300.webp" },
    { name: "Filipe Barros", party: "PL", number: "222", photo: "assets/images/states/pr/filipe-barros-222.webp" }
  ],
  federal_deputy: [
    { name: "Guilherme Livoti", party: "Novo", number: "3043", photo: "assets/images/states/pr/guilherme-livoti-3043.webp" },
    { name: "Jeffrey Chiquini", party: "Novo", number: "3000", photo: "assets/images/states/pr/jeffrey-chiquini-3000.webp" },
    { name: "Paulo Martins", party: "Novo", number: "3020", photo: "assets/images/states/pr/paulo-martins-3020.webp" }
  ],
  state_deputy: [
    { name: "Dr. Cesar Mello", party: "PL", number: "22357", photo: "assets/images/states/pr/dr-cesar-mello-22357.webp" },
    { name: "Rodrigo Marcial", party: "Novo", number: "30456", photo: "assets/images/states/pr/rodrigo-marcial-30456.webp" },
    { name: "Jessicão", party: "PL", number: "22500", photo: "assets/images/states/pr/jessicao-22500.webp" }
  ]
};
EB.recs.RJ = {
  uf: "RJ", source: "peterapoia.com", last_updated: "2026-09-30",
  governor: { name: "Douglas Ruas", party: "PL", number: "22", photo: "assets/images/states/rj/douglas-ruas-22.webp" },
  senate: [
    { name: "Carlos Portinho", party: "PL", number: "222", photo: "assets/images/states/rj/carlos-portinho-222.webp" },
    { name: "Carlos Jordy", party: "PL", number: "221", photo: "assets/images/states/rj/carlos-jordy-221.webp" }
  ],
  federal_deputy: [
    { name: "Sóstenes Cavalcante", party: "PL", number: "2277", photo: "assets/images/states/rj/sostenes-cavalcante-2277.webp" },
    { name: "Rebeca Ramagem", party: "PL", number: "2217", photo: "assets/images/states/rj/rebeca-ramagem-2217.webp" },
    { name: "Luiz Lima", party: "Novo", number: "3030", photo: "assets/images/states/rj/luiz-lima-3030.webp" },
    { name: "Ed Raposo", party: "PL", number: "2207", photo: "assets/images/states/rj/ed-raposo-2207.webp" }
  ],
  state_deputy: [
    { name: "Alexandre Freitas", party: "Novo", number: "30007", photo: "assets/images/states/rj/alexandre-freitas-30007.webp" },
    { name: "Felipe Tropa", party: "PL", number: "22200", photo: "assets/images/states/rj/felipe-tropa-22200.webp" },
    { name: "Alan Lopes", party: "PL", number: "22377", photo: "assets/images/states/rj/alan-lopes-22377.webp" }
  ]
};
EB.recs.RN = {
  uf: "RN", source: "peterapoia.com", last_updated: "2026-09-30",
  governor: { name: "Álvaro Dias", party: "PL", number: "22", photo: "assets/images/states/rn/alvaro-dias-22.webp" },
  senate: [
    { name: "Styvenson Valentim", party: "Podemos", number: "200", photo: "assets/images/states/rn/styvenson-valentim-200.webp" },
    { name: "Coronel Hélio", party: "PL", number: "222", photo: "assets/images/states/rn/coronel-helio-222.webp" }
  ],
  federal_deputy: [
    { name: "Raphael Ferreira", party: "Novo", number: "3000", photo: "assets/images/states/rn/raphael-ferreira-3000.webp" },
    { name: "General Girão", party: "PL", number: "2210", photo: "assets/images/states/rn/general-girao-2210.webp" },
    { name: "Carla Dickson", party: "PL", number: "2211", photo: "assets/images/states/rn/carla-dickson-2211.webp" }
  ],
  state_deputy: [
    { name: "Coronel Azevedo", party: "PL", number: "22222", photo: "assets/images/states/rn/coronel-azevedo-22222.webp" },
    { name: "Gabriel César", party: "PL", number: "22444", photo: "assets/images/states/rn/gabriel-cesar-22444.webp" },
    { name: "Josemar Varela", party: "PL", number: "22022", photo: "assets/images/states/rn/josemar-varela-22022.webp" }
  ]
};
EB.recs.RO = {
  uf: "RO", source: "peterapoia.com", last_updated: "2026-09-30",
  governor: { name: "Marcos Rogério", party: "PL", number: "22", photo: "assets/images/states/ro/marcos-rogerio-22.webp" },
  senate: [
    { name: "Dr. Fernando Máximo", party: "PL", number: "221", photo: "assets/images/states/ro/dr-fernando-maximo-221.webp" },
    { name: "Bruno Bolsonaro Scheid", party: "PL", number: "222", photo: "assets/images/states/ro/bruno-bolsonaro-scheid-222.webp" }
  ],
  federal_deputy: [
    { name: "Coronel Chrisóstomo", party: "PL", number: "2210", photo: "assets/images/states/ro/coronel-chrisostomo-2210.webp" },
    { name: "Lucio Mosquini", party: "PL", number: "2222", photo: "assets/images/states/ro/lucio-mosquini-2222.webp" },
    { name: "Sofia Andrade", party: "PL", number: "2233", photo: "assets/images/states/ro/sofia-andrade-2233.webp" }
  ],
  state_deputy: [
    { name: "Jean Mendonça", party: "PL", number: "22222", photo: "assets/images/states/ro/jean-mendonca-22222.webp" },
    { name: "Patrick Faelbi", party: "PL", number: "22200", photo: "assets/images/states/ro/patrick-faelbi-22200.webp" },
    { name: "Dra. Taíssa Sousa", party: "PL", number: "22220", photo: "assets/images/states/ro/dra-taissa-sousa-22220.webp" }
  ]
};
EB.recs.RR = {
  uf: "RR", source: "peterapoia.com", last_updated: "2026-09-30",
  governor: { name: "Arthur Henrique", party: "PL", number: "22", photo: "assets/images/states/rr/arthur-henrique-22.webp" },
  senate: [
    { name: "Hélio Bolsonaro", party: "PL", number: "222", photo: "assets/images/states/rr/helio-bolsonaro-222.webp" },
    { name: "Nicoletti", party: "PL", number: "227", photo: "assets/images/states/rr/nicoletti-227.webp" }
  ],
  federal_deputy: [
    { name: "Major Emmanuel", party: "PL", number: "2255", photo: "assets/images/states/rr/major-emmanuel-2255.webp" },
    { name: "Wellington Brasil", party: "Novo", number: "3030", photo: "assets/images/states/rr/wellington-brasil-3030.webp" },
    { name: "Major Adriane", party: "Podemos", number: "2022", photo: "assets/images/states/rr/major-adriane-2022.webp" }
  ],
  state_deputy: [
    { name: "Sargento Priscilla", party: "PL", number: "22522", photo: "assets/images/states/rr/sargento-priscilla-22522.webp" },
    { name: "Ely de Roraima", party: "Novo", number: "30000", photo: "assets/images/states/rr/ely-de-roraima-30000.webp" },
    { name: "Marcinho Belota", party: "PL", number: "22222", photo: "assets/images/states/rr/marcinho-belota-22222.webp" }
  ]
};
EB.recs.RS = {
  uf: "RS", source: "peterapoia.com", last_updated: "2026-09-30",
  governor: { name: "Zucco", party: "PL", number: "22", photo: "assets/images/states/rs/zucco-22.webp" },
  senate: [
    { name: "Sanderson", party: "PL", number: "222", photo: "assets/images/states/rs/sanderson-222.webp" },
    { name: "Marcel van Hattem", party: "Novo", number: "300", photo: "assets/images/states/rs/marcel-van-hattem-300.webp" }
  ],
  federal_deputy: [
    { name: "Jessé Sangalli", party: "PL", number: "2230", photo: "assets/images/states/rs/jesse-sangalli-2230.webp" },
    { name: "Felipe Camozzato", party: "Novo", number: "3030", photo: "assets/images/states/rs/felipe-camozzato-3030.webp" },
    { name: "Fabio Ostermann", party: "Novo", number: "3003", photo: "assets/images/states/rs/fabio-ostermann-3003.webp" }
  ],
  state_deputy: [
    { name: "Alexis Grego", party: "Podemos", number: "20010", photo: "assets/images/states/rs/alexis-grego-20010.webp" },
    { name: "Matheus Schilling", party: "Novo", number: "30123", photo: "assets/images/states/rs/matheus-schilling-30123.webp" },
    { name: "Rodrigo Cassol Lima", party: "PL", number: "22321", photo: "assets/images/states/rs/rodrigo-cassol-lima-22321.webp" }
  ]
};
EB.recs.SC = {
  uf: "SC", source: "peterapoia.com", last_updated: "2026-09-30",
  governor: { name: "Jorginho Mello", party: "PL", number: "22", photo: "assets/images/states/sc/jorginho-mello-22.webp" },
  senate: [
    { name: "Carlos Bolsonaro", party: "PL", number: "222", photo: "assets/images/states/sc/carlos-bolsonaro-222.webp" },
    { name: "Carol de Toni", party: "PL", number: "221", photo: "assets/images/states/sc/carol-de-toni-221.webp" }
  ],
  federal_deputy: [
    { name: "Gilson Marques", party: "Novo", number: "3050", photo: "assets/images/states/sc/gilson-marques-3050.webp" },
    { name: "Jair Bolsonaro", party: "PL", number: "2222", photo: "assets/images/states/sc/jair-bolsonaro-2222.webp" },
    { name: "Julia Zanatta", party: "PL", number: "2233", photo: "assets/images/states/sc/julia-zanatta-2233.webp" },
    { name: "Rodrigo Livramento", party: "Novo", number: "3030", photo: "assets/images/states/sc/rodrigo-livramento-3030.webp" }
  ],
  state_deputy: [
    { name: "Matheus Cadorin", party: "Novo", number: "30000", photo: "assets/images/states/sc/matheus-cadorin-30000.webp" },
    { name: "Bruno Souza", party: "PL", number: "22722", photo: "assets/images/states/sc/bruno-souza-22722.webp" },
    { name: "Delegado Ulisses Gabriel", party: "PL", number: "22111", photo: "assets/images/states/sc/delegado-ulisses-gabriel-22111.webp" },
    { name: "Jessé Lopes", party: "PL", number: "22022", photo: "assets/images/states/sc/jesse-lopes-22022.webp" }
  ]
};
EB.recs.SE = {
  uf: "SE", source: "peterapoia.com", last_updated: "2026-09-30",
  governor: { name: "Ricardo Marques", party: "PL", number: "22", photo: "assets/images/states/se/ricardo-marques-22.webp" },
  senate: [
    { name: "Rodrigo Valadares", party: "PL", number: "222", photo: "assets/images/states/se/rodrigo-valadares-222.webp" },
    { name: "Coronel Rocha", party: "PL", number: "221", photo: "assets/images/states/se/coronel-rocha-221.webp" }
  ],
  federal_deputy: [
    { name: "Moana Valadares", party: "PL", number: "2222", photo: "assets/images/states/se/moana-valadares-2222.webp" },
    { name: "Mendonça Prado", party: "PL", number: "2210", photo: "assets/images/states/se/mendonca-prado-2210.webp" },
    { name: "Sargento Vieira", party: "PL", number: "2233", photo: "assets/images/states/se/sargento-vieira-2233.webp" }
  ],
  state_deputy: [
    { name: "Flávio da Direita Sergipana", party: "PL", number: "22100", photo: "assets/images/states/se/flavio-da-direita-sergipana-22100.webp" },
    { name: "Bolsonaro Sergipano", party: "PL", number: "22322", photo: "assets/images/states/se/bolsonaro-sergipano-22322.webp" },
    { name: "GG Leandro", party: "PL", number: "22345", photo: "assets/images/states/se/gg-leandro-22345.webp" }
  ]
};
EB.recs.SP = {
  uf: "SP", source: "peterapoia.com", last_updated: "2026-09-30",
  governor: { name: "Tarcísio", party: "Republicanos", number: "10", photo: "assets/images/states/sp/tarcisio-10.webp" },
  senate: [
    { name: "André do Prado", party: "PL", number: "222", photo: "assets/images/states/sp/andre-do-prado-222.webp" },
    { name: "Guilherme Derrite", party: "PP", number: "111", photo: "assets/images/states/sp/guilherme-derrite-111.webp" }
  ],
  federal_deputy: [
    { name: "Marina Helena", party: "Novo", number: "3007", photo: "assets/images/states/sp/marina-helena-3007.webp" },
    { name: "Delegado Paulo Bilynskyj", party: "PL", number: "2247", photo: "assets/images/states/sp/delegado-paulo-bilynskyj-2247.webp" },
    { name: "Dra. Nise Yamaguchi", party: "PL", number: "2221", photo: "assets/images/states/sp/dra-nise-yamaguchi-2221.webp" },
    { name: "Lucas Pavanato", party: "PL", number: "2211", photo: "assets/images/states/sp/lucas-pavanato-2211.webp" }
  ],
  state_deputy: [
    { name: "Eng. Catharina Donato", party: "Novo", number: "30777", photo: "assets/images/states/sp/eng-catharina-donato-30777.webp" },
    { name: "Paulo Kogos", party: "PL", number: "22038", photo: "assets/images/states/sp/paulo-kogos-22038.webp" },
    { name: "Eduarda Campopiano", party: "PL", number: "22011", photo: "assets/images/states/sp/eduarda-campopiano-22011.webp" },
    { name: "Carlo Cauti", party: "Novo", number: "30007", photo: "assets/images/states/sp/carlo-cauti-30007.webp" },
    { name: "Leticia Aguiar", party: "PL", number: "22522", photo: "assets/images/states/sp/leticia-aguiar-22522.webp" }
  ]
};
EB.recs.TO = {
  uf: "TO", source: "peterapoia.com", last_updated: "2026-09-30",
  governor: { name: "Professora Dorinha", party: "União Brasil", number: "44", photo: "assets/images/states/to/professora-dorinha-44.webp" },
  senate: [
    { name: "Eduardo Gomes", party: "PL", number: "222", photo: "assets/images/states/to/eduardo-gomes-222.webp" },
    { name: "Carlos Gaguim", party: "União Brasil", number: "444", photo: "assets/images/states/to/carlos-gaguim-444.webp" }
  ],
  federal_deputy: [
    { name: "Mauricio Buffon", party: "PL", number: "2288", photo: "assets/images/states/to/mauricio-buffon-2288.webp" },
    { name: "Dr. Adelson Mota", party: "Novo", number: "3030", photo: "assets/images/states/to/dr-adelson-mota-3030.webp" },
    { name: "Filipe Martins", party: "PL", number: "2222", photo: "assets/images/states/to/filipe-martins-2222.webp" }
  ],
  state_deputy: [
    { name: "Dari Fronza", party: "PL", number: "22888", photo: "assets/images/states/to/dari-fronza-22888.webp" },
    { name: "Antonio Pereira da Silva", party: "Novo", number: "30300", photo: "assets/images/states/to/antonio-pereira-da-silva-30300.webp" },
    { name: "Debora Guedes", party: "PL", number: "22222", photo: "assets/images/states/to/debora-guedes-22222.webp" }
  ]
};
