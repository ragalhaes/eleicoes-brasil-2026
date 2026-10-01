/* =========================================================
   CANDIDATOS À PRESIDÊNCIA — 09-candidatos-presidencia.md
   Status oficial deve vir do TSE e ser atualizável.
   null = não consta no conteúdo-base desta versão (não inventar).
   ========================================================= */
window.EB = window.EB || {};

EB.candidatesMeta = {
  last_updated: "2026-09-30",
  source_note: "Lista conforme página do TSE consultada durante a elaboração do projeto. Registros podem mudar — conferir status oficial no TSE.",
  order_note: "Ordem alfabética. Nenhum candidato recebe destaque visual.",
  editorial_note: "O comparador acompanha seis candidaturas selecionadas pelo projeto editorial. Os dados de pesquisas preservam todos os nomes apresentados pelos institutos.",
  photo_note: "Fotos: TSE — Portal de Dados Abertos (Candidatos 2026, recurso BR - Fotos de candidatos)."
};

/* Dimensões do comparador — sem nota, ranking ou vencedor */
EB.compareDims = [
  { id: "experiencia", name: "Experiência" },
  { id: "fiscal", name: "Fiscal" },
  { id: "impostos", name: "Impostos" },
  { id: "estatais", name: "Privatizações / estatais" },
  { id: "trabalho", name: "Trabalho" },
  { id: "jornada", name: "Jornada de trabalho" },
  { id: "seguranca", name: "Segurança" },
  { id: "drogas", name: "Drogas" },
  { id: "stf", name: "STF / instituições" },
  { id: "sociais", name: "Programas sociais" },
  { id: "saude", name: "Saúde" }
];

EB.candidates = [
{
  id: "augusto-cury", photo: "assets/images/president/augusto-cury.jpg", name: "Augusto Cury", party: "Avante", number: "70", depth: "full",
  last_updated: "2026-09-30",
  trajetoria: "Médico, psiquiatra e escritor. Estreia eleitoral em 2026 e não possui experiência anterior em governo.",
  profile: {
    formacao: [
      { l: "fato", t: "Grau de instrução declarado ao TSE: superior completo. Ocupação declarada: escritor e crítico." },
      { l: "fato", t: "Formação em Medicina, com atuação em psiquiatria. Segundo o Currículo Lattes citado pela imprensa, possui um Doctor of Business Administration (DBA) pela Florida Christian University (2013)." }
    ],
    privada: [
      { l: "fato", t: "Escritor de livros de grande circulação e autor da “Teoria da Inteligência Multifocal”. Idealizador da Escola da Inteligência, programa de educação socioemocional, conforme a biografia anexada ao plano de governo registrado no TSE." },
      { l: "fato", t: "Declarou ao TSE patrimônio de R$ 242,3 milhões em 2026." }
    ],
    publica: [ { l: "fato", t: "Estreia eleitoral em 2026. Não exerceu mandato eletivo nem cargo de direção em governo." } ],
    resultados: [ { l: "met", t: "Não se aplica: o candidato não exerceu cargo executivo público, por isso não há resultados administrativos a medir. Sua trajetória é na medicina, na literatura e na educação privada." } ],
    economia: "Déficit próximo de zero, redução gradual da dívida, simplificação tributária, crédito produtivo e empreendedorismo.",
    seguranca: [ { l: "prop", t: "Projeto “FATO – Força Alerta Total”: integração permanente de Polícia Federal, polícias Militar e Civil e de uma nova Força de Combate Municipal (FOCO); centro nacional integrado de inteligência; uso de tecnologia como reconhecimento facial “conforme a legislação vigente”, leitura de placas e drones." } ],
    instituicoes: "Semipresidencialismo, STF com nove ministros e mandatos de oito anos — mudanças dependentes de alteração constitucional.",
    social: [
      { l: "prop", t: "Projeto “Mulheres Vivas”: política nacional integrada de prevenção ao feminicídio, igualdade salarial e autonomia econômica das mulheres." },
      { l: "prop", t: "Projetos “Brasil Neuroinclusivo”, “Comunidades Empreendedoras” e “Brasil Oásis” (semiárido)." }
    ],
    saude: [
      { l: "prop", t: "Forte ênfase em saúde mental, prevenção, telemedicina e modernização do SUS." },
      { l: "prop", t: "“Tele Saúde Brasil” para ampliar a telemedicina e desafogar o SUS, e programa de prevenção e detecção precoce do câncer." }
    ]
  },
  propostas: ["Déficit próximo de zero", "Redução gradual da dívida", "Simplificação tributária", "Projeto FATO (segurança integrada)", "Mulheres Vivas", "Tele Saúde Brasil", "Semipresidencialismo", "STF com 9 ministros e mandatos de 8 anos"],
  controversias: [
    { t: "Doutorado citado no plano de governo", l: "fato",
      d: "O plano registrado no TSE afirma um “doutorado internacional em Psicologia Multifocal” pela Florida Christian University. O Currículo Lattes do candidato registra um DBA (administração de empresas) pela mesma instituição, em 2013. Em julho de 2026, Cury havia declarado que não apresentava o título como doutorado acadêmico em Psicologia.",
      status: ["reportagem"], src: { o: "A Tarde", r: "Augusto Cury diz ter doutorado não feito em plano de governo", p: "01/09/2026", url: "https://atarde.com.br/eleicoes/augusto-cury-diz-ter-doutorado-nao-feito-em-plano-de-governo-1400487" } },
    { t: "Empresas fora da declaração de bens", l: "fato",
      d: "Reportagem identificou cinco empresas (três nos EUA, duas no Brasil) que não constavam da declaração de bens entregue ao TSE. A campanha disse que são inativas ou sem receita, “inexpressivas” diante do patrimônio, e que as inconsistências seriam corrigidas.",
      status: ["reportagem", "sem_decisao"], src: { o: "Poder360", r: "Empresas não declaradas ao TSE são inexpressivas, diz campanha de Cury", p: "06/09/2026", url: "https://www.poder360.com.br/poder-eleicoes-2026/empresas-nao-declaradas-ao-tse-sao-inexpressivas-diz-campanha-de-cury/" } },
    { t: "Contratos de empresa da filha com prefeituras", l: "fato",
      d: "Levantamento da Folha de S.Paulo no Portal Nacional de Contratações Públicas apontou 28 contratos, somando R$ 19,9 milhões (2023–2026), firmados sem licitação por prefeituras com a Multifocal RP, que tem Camila Cury como sócia. Cury afirma que os contratos são regulares e que, se eleito, evitará contratos federais com essas empresas.",
      status: ["reportagem", "sem_decisao"], note: "Não há decisão judicial ou apuração oficial citada.", src: { o: "BNews (com Folha de S.Paulo)", r: "Empresa da filha de Augusto Cury fecha R$ 19,9 milhões em contratos com prefeituras", p: "set/2026", url: "https://www.bnews.com.br/noticias/politica/empresa-da-filha-de-augusto-cury-fecha-r-199-milhoes-em-contratos-com-prefeituras.html" } },
    { t: "Rede de anúncios pró-Cury", l: "alg",
      d: "A Agência Lupa identificou uma rede de 68 páginas que gastou ao menos US$ 106 mil em anúncios na Meta (ago–set/2026), com 122 anúncios favoráveis a Cury e centenas contra adversários. A campanha nega qualquer relação com as páginas.",
      status: ["reportagem", "sem_decisao"], src: { o: "Agência Lupa", r: "Rede gasta US$ 106 mil na Meta para promover Cury e criticar opositores", p: "21/09/2026", url: "https://www.agencialupa.org/jornalismo/2026/09/21/rede-gasta-us-106-mil-na-meta-para-promover-cury-e-criticar-opositores-parte-dos-posts-tem-anunciante-identificado-nos-eua/" } }
  ],
  sources: [
    { t: "TSE — Portal de Dados Abertos, Candidatos 2026 (grau de instrução, ocupação, registro)", url: "https://dadosabertos.tse.jus.br/pt_BR/dataset/candidatos-2026" },
    { t: "TSE — plano de governo registrado (pacote “BR - Proposta de governo”)", url: "https://cdn.tse.jus.br/estatistica/sead/odsele/proposta_governo/proposta_governo_2026_BR.zip" },
    { t: "Poder360 — declaração de bens e empresas não declaradas (06/09/2026)", url: "https://www.poder360.com.br/poder-eleicoes-2026/empresas-nao-declaradas-ao-tse-sao-inexpressivas-diz-campanha-de-cury/" },
    { t: "A Tarde — doutorado citado no plano (01/09/2026)", url: "https://atarde.com.br/eleicoes/augusto-cury-diz-ter-doutorado-nao-feito-em-plano-de-governo-1400487" },
    { t: "BNews / Folha de S.Paulo — contratos da Multifocal RP (set/2026)", url: "https://www.bnews.com.br/noticias/politica/empresa-da-filha-de-augusto-cury-fecha-r-199-milhoes-em-contratos-com-prefeituras.html" },
    { t: "Agência Lupa — rede de anúncios na Meta (21/09/2026)", url: "https://www.agencialupa.org/jornalismo/2026/09/21/rede-gasta-us-106-mil-na-meta-para-promover-cury-e-criticar-opositores-parte-dos-posts-tem-anunciante-identificado-nos-eua/" }
  ],
  compare: {
    experiencia: "Médico, psiquiatra e escritor. Estreia eleitoral em 2026; sem experiência anterior em governo.",
    fiscal: "Déficit próximo de zero e redução gradual da dívida.",
    impostos: "Simplificação tributária.",
    seguranca: "Projeto FATO: integração de PF, polícias estaduais e nova força municipal (FOCO), centro integrado de inteligência e tecnologia.",
    stf: "Semipresidencialismo; STF com nove ministros e mandatos de oito anos (exige alteração constitucional).",
    sociais: "Mulheres Vivas (prevenção ao feminicídio e autonomia econômica), Brasil Neuroinclusivo e programas de empreendedorismo.",
    saude: "Saúde mental, prevenção, telemedicina (Tele Saúde Brasil) e modernização do SUS."
  }
},
{
  id: "flavio-bolsonaro", photo: "assets/images/president/flavio-bolsonaro.jpg", name: "Flávio Bolsonaro", party: "PL", number: "22", depth: "full",
  last_updated: "2026-09-30",
  trajetoria: "Formado em Direito. Quatro mandatos de deputado estadual no Rio de Janeiro e senador desde 2019. Currículo predominantemente legislativo; não exerceu governo estadual ou Presidência.",
  profile: {
    formacao: [
      { l: "fato", t: "Bacharel em Direito, com pós-graduação em ciência política, segundo a Agência Senado (2018). Grau de instrução declarado ao TSE: superior completo." }
    ],
    privada: [ { l: "fato", t: "Descrito como empresário pela Agência Senado em 2018. Ocupação declarada ao TSE em 2026: senador." } ],
    publica: [
      { l: "fato", t: "Quatro mandatos de deputado estadual no Rio de Janeiro (Alerj). Senador pelo Rio de Janeiro desde 2019: eleito em 2018 com 4,37 milhões de votos (31,3% dos válidos), o mais votado do estado para o Senado." },
      { l: "fato", t: "Eleito presidente da Comissão de Segurança Pública (CSP) do Senado em fevereiro de 2025." },
      { l: "ctx", t: "Currículo predominantemente legislativo; não exerceu governo estadual ou Presidência." }
    ],
    resultados: [ { l: "met", t: "Não se aplica no sentido de gestão executiva: a trajetória do candidato é legislativa (Alerj e Senado), sem chefia de governo. A atuação parlamentar está descrita em “Experiência pública”." } ],
    economia: "Redução de impostos, reformulação das regras fiscais, redução de custo do trabalho, abertura comercial, reforma administrativa, desestatizações e redução de ministérios.",
    seguranca: "Maioridade penal, endurecimento de progressão para crimes hediondos, presídios de segurança elevada, fronteiras, combate a facções, reconhecimento facial e castração química para estupradores.",
    instituicoes: [
      { l: "prop", t: "Reforma do Judiciário, fim de decisões monocráticas e mudanças políticas mais amplas." },
      { l: "prop", t: "No plano registrado no TSE: fim das competências criminais originárias do STF, limitação das decisões monocráticas, revisão do escopo das ADPFs e quarentena de um ano para ministros de Estado serem indicados ao STF." }
    ],
    social: [ { l: "prop", t: "Manter os programas sociais existentes, com revisão de gestão e combate a distorções; dar prioridade a beneficiários em programas de primeiro emprego e qualificação; garantir retorno imediato ao benefício após o seguro-desemprego." } ],
    saude: [ { l: "prop", t: "Correção da tabela SUS, programa “Brasil sem Fila”, telessaúde, entrega de remédios em domicílio para idosos e doentes crônicos e uso de inteligência artificial na prevenção." } ]
  },
  propostas: ["Redução de impostos", "Reformulação das regras fiscais", "Reforma administrativa", "Desestatizações", "Redução de ministérios", "Maioridade penal", "Fim de decisões monocráticas", "Brasil sem Fila (saúde)"],
  controversias: [
    { t: "Caso “rachadinha”", l: "alg",
      d: "Em 2020, o MP-RJ denunciou Flávio Bolsonaro e outras 16 pessoas por suposto desvio de salários do gabinete na Alerj. Em novembro de 2021, a 2ª Turma do STF anulou relatórios do Coaf usados no caso. Em fevereiro de 2024, o ministro Gilmar Mendes negou recurso do MP-RJ para retomar a investigação. Em 29/09/2026, o Grupo Prerrogativas e o deputado Rui Falcão (PT-SP) pediram ao MP-RJ a reabertura, citando fatos novos.",
      status: ["anulado", "arquivado", "reabertura"], note: "Não é condenação.",
      src: { o: "CartaCapital; Correio Braziliense", r: "Linha do tempo do caso; pedido de reabertura", p: "2020–2026", url: "https://www.correiobraziliense.com.br/politica/2026/09/7510721-prerrogativas-pede-ao-mp-rj-a-reabertura-do-caso-das-rachadinhas-envolvendo-flavio.html" } },
    { t: "Filme “Dark Horse” e Banco Master", l: "alg",
      d: "Reportagem do Intercept Brasil (mai/2026) afirmou que o senador negociou com Daniel Vorcaro, ex-controlador do Banco Master, o financiamento de um filme sobre Jair Bolsonaro. Flávio reconheceu ter buscado patrocínio privado de Vorcaro e diz que não houve dinheiro público. Parlamentares de oposição pediram investigação à PGR e à PF.",
      status: ["reportagem", "sem_decisao"], note: "Não há denúncia apresentada no material consultado.",
      src: { o: "Agência Pública", r: "Flávio Bolsonaro, Vorcaro, Master: o escândalo do filme Dark Horse", p: "mai/2026", url: "https://apublica.org/2026/05/flavio-bolsonaro-vorcaro-master-escandalo-filme-dark-horse-azarao/" } }
  ],
  sources: [
    { t: "Senado Federal — perfil do senador", url: "https://www25.senado.leg.br/web/senadores/senador/-/perfil/5894" },
    { t: "Agência Senado — eleição de 2018 e biografia (07/10/2018)", url: "https://www12.senado.leg.br/noticias/materias/2018/10/07/flavio-bolsonaro-e-arolde-de-oliveira-sao-eleitos-pelo-rio-de-janeiro" },
    { t: "Agência Senado — eleito presidente da CSP (19/02/2025)", url: "https://www12.senado.leg.br/noticias/materias/2025/02/19/flavio-bolsonaro-e-eleito-presidente-da-csp" },
    { t: "TSE — Portal de Dados Abertos, Candidatos 2026", url: "https://dadosabertos.tse.jus.br/pt_BR/dataset/candidatos-2026" },
    { t: "TSE — plano de governo registrado (pacote “BR - Proposta de governo”)", url: "https://cdn.tse.jus.br/estatistica/sead/odsele/proposta_governo/proposta_governo_2026_BR.zip" },
    { t: "CartaCapital — linha do tempo do caso “rachadinha”", url: "https://www.cartacapital.com.br/politica/o-que-aconteceu-com-o-caso-da-rachadinha-de-flavio-bolsonaro-suposto-candidato-em-2026/" },
    { t: "Correio Braziliense — pedido de reabertura (29/09/2026)", url: "https://www.correiobraziliense.com.br/politica/2026/09/7510721-prerrogativas-pede-ao-mp-rj-a-reabertura-do-caso-das-rachadinhas-envolvendo-flavio.html" },
    { t: "Agência Pública — filme “Dark Horse” e Banco Master", url: "https://apublica.org/2026/05/flavio-bolsonaro-vorcaro-master-escandalo-filme-dark-horse-azarao/" }
  ],
  compare: {
    experiencia: "Direito. Quatro mandatos de deputado estadual (RJ) e senador desde 2019; não exerceu governo estadual ou Presidência.",
    fiscal: "Reformulação das regras fiscais, reforma administrativa e redução de ministérios.",
    impostos: "Redução de impostos.",
    estatais: "Desestatizações.",
    trabalho: "Redução de custo do trabalho.",
    seguranca: "Maioridade penal, progressão mais dura para hediondos, presídios de segurança elevada, fronteiras, facções, reconhecimento facial e castração química para estupradores.",
    stf: "Reforma do Judiciário, fim de decisões monocráticas e fim das competências criminais originárias do STF.",
    sociais: "Manter os programas sociais existentes, com prioridade dos beneficiários em emprego e qualificação.",
    saude: "Correção da tabela SUS, Brasil sem Fila, telessaúde e remédio em domicílio."
  }
},
{
  id: "lula", photo: "assets/images/president/lula.jpg", name: "Lula", party: "PT", number: "13", depth: "full",
  last_updated: "2026-09-30",
  trajetoria: "Ex-presidente 2003–2010 e presidente desde 2023. Trajetória sindical no ABC paulista.",
  profile: {
    formacao: [ { l: "fato", t: "Formou-se torneiro mecânico pelo Senai. Grau de instrução declarado ao TSE: ensino fundamental completo; ocupação declarada: torneiro mecânico." } ],
    privada: [ { l: "fato", t: "Metalúrgico no ABC paulista. Presidente do Sindicato dos Metalúrgicos de São Bernardo do Campo e Diadema a partir de 1975, foi reeleito em 1978." } ],
    publica: [
      { l: "fato", t: "Cofundador do PT em 1980. Deputado federal constituinte eleito em 1986, o mais votado do país." },
      { l: "fato", t: "Presidente da República de 2003 a 2010 e desde 2023." }
    ],
    resultados: "Os dados do terceiro mandato (2023–2026) estão no capítulo “Lula retorna ao poder”.",
    resultadosLink: "#/historia/governo-lula",
    economia: "Continuidade e aprofundamento do governo atual: arcabouço fiscal, reforma tributária, Novo PAC, Nova Indústria Brasil, crédito e Plano de Transformação Ecológica. Também defende fim da escala 6x1 e redução de jornada para 40 horas.",
    seguranca: [
      { l: "prop", t: "Plano registrado no TSE: aprovação da PEC que revê as atribuições dos entes na segurança pública, ampliação do Programa Brasil Contra o Crime Organizado, asfixia financeira de facções, fortalecimento do sistema penitenciário federal e manutenção da política de controle de armas." },
      { l: "ctx", t: "O plano cita a Lei Antifacção, sancionada em 2026, como base para a próxima gestão." }
    ],
    instituicoes: [
      { l: "prop", t: "Programa defende participação social, mecanismos de controle, transparência e regulamentação de redes e plataformas." },
      { l: "prop", t: "O plano propõe debater com a sociedade o sistema de emendas parlamentares (R$ 50 bilhões em 2026, segundo o documento) e manter diálogo com o Judiciário, “respeitada a autonomia dos Poderes”." }
    ],
    social: "Fim da escala 6x1 e redução de jornada para 40 horas.",
    saude: [ { l: "prop", t: "Expansão da atenção básica e do programa Agora Tem Especialistas, prontuário único via Rede Nacional de Dados em Saúde, telessaúde e uso de inteligência artificial na triagem." } ]
  },
  observar: "Como candidato à reeleição, deve ser comparado com resultados reais 2023–2026, não apenas promessas.",
  propostas: ["Arcabouço fiscal", "Reforma tributária", "Novo PAC", "Nova Indústria Brasil", "Plano de Transformação Ecológica", "Fim da escala 6x1", "Jornada de 40 horas", "PEC da Segurança Pública", "Regulamentação de redes e plataformas"],
  controversias: [
    { t: "Condenações da Lava Jato (13ª Vara de Curitiba)", l: "jud",
      d: "Em 2021, Edson Fachin anulou decisões da 13ª Vara Federal de Curitiba por incompetência do juízo; o Plenário confirmou por 8 a 3. Separadamente, o STF reconheceu a suspeição de Sergio Moro no caso do tríplex. A anulação por incompetência não foi absolvição sobre o mérito das acusações.",
      status: ["anulado"], src: { o: "STF", r: "Decisões de 2021 sobre Lula", p: "2021" }, chapter: "stf-tse-2022" },
    { t: "INSS — Operação Sem Desconto (no governo)", l: "fato",
      d: "Esquema de descontos associativos investigado operou entre 2019 e 2024, atravessando governos diferentes. Sem base pública para atribuir participação pessoal a Lula.",
      status: ["investigacao", "sem_imputacao"], src: { o: "AGU / PF / CGU / INSS / STF", r: "Operação Sem Desconto", p: "2025–2026" }, chapter: "governo-lula" },
    { t: "Juscelino Filho (ministro)", l: "alg",
      d: "Denunciado pela PGR em investigação sobre supostos desvios de emendas, referente principalmente ao período em que era deputado federal. “Ministro do governo Lula foi denunciado” é factual; “esquema de corrupção do governo Lula” não é descrição automática do caso.",
      status: ["denuncia"], chapter: "governo-lula" },
    { t: "Banco Master (no mandato)", l: "ctx",
      d: "Escândalo financeiro e regulatório ocorrido durante o mandato; não deve ser apresentado automaticamente como corrupção de Lula sem ligação criminal individual demonstrada.",
      status: ["sem_imputacao"], chapter: "governo-lula" }
  ],
  sources: [
    { t: "Câmara dos Deputados — trajetória política de Lula", url: "https://www.camara.leg.br/noticias/93745-presidente-reeleito-tem-trajetoria-politica-singular/" },
    { t: "TSE — Portal de Dados Abertos, Candidatos 2026", url: "https://dadosabertos.tse.jus.br/pt_BR/dataset/candidatos-2026" },
    { t: "TSE — plano de governo registrado (pacote “BR - Proposta de governo”)", url: "https://cdn.tse.jus.br/estatistica/sead/odsele/proposta_governo/proposta_governo_2026_BR.zip" },
    { t: "Capítulo “Lula retorna ao poder” — IBGE, Banco Central, Tesouro, Ipea (fontes do capítulo)" },
    { t: "Capítulo “A eleição de 2022” — decisões do STF de 2021" }
  ],
  compare: {
    experiencia: "Presidente 2003–2010 e desde 2023. Trajetória sindical no ABC paulista.",
    fiscal: "Continuidade do arcabouço fiscal.",
    impostos: "Continuidade da reforma tributária.",
    trabalho: "Fim da escala 6x1.",
    jornada: "40 horas (fim da escala 6x1).",
    seguranca: "PEC da Segurança Pública, Programa Brasil Contra o Crime Organizado, asfixia financeira de facções e controle de armas.",
    stf: "Participação social, mecanismos de controle, transparência e regulamentação de redes e plataformas.",
    sociais: "Continuidade e ampliação dos programas sociais do governo atual.",
    saude: "Atenção básica, Agora Tem Especialistas, prontuário único e telessaúde."
  }
},
{
  id: "renan-santos", photo: "assets/images/president/renan-santos.jpg", name: "Renan Santos", party: "Missão", number: "14", depth: "full",
  last_updated: "2026-09-30",
  trajetoria: "Empresário, fundador do MBL e do Partido Missão. Começou Direito na USP, mas não concluiu. Não possui experiência anterior como governador, prefeito, ministro, deputado ou senador.",
  profile: {
    formacao: [ { l: "fato", t: "Começou Direito na USP, mas não concluiu. Grau de instrução declarado ao TSE: superior incompleto." } ],
    privada: [ { l: "fato", t: "Empresário (ocupação declarada ao TSE). Fundador do MBL e do Partido Missão. Foi sócio e diretor da Martin Artefatos de Metal S.A., da qual foi afastado judicialmente em maio de 2022, segundo a defesa citada pela Justiça Federal." } ],
    publica: [ { l: "fato", t: "Não possui experiência anterior como governador, prefeito, ministro, deputado ou senador. 2026 é sua primeira candidatura." } ],
    resultados: [ { l: "met", t: "Não se aplica: o candidato não exerceu cargo público, por isso não há resultados administrativos a medir. Sua atuação é empresarial e de liderança de movimento e partido." } ],
    economia: "Ajuste fiscal imediato, desindexação de despesas, reforma do funcionalismo, revisão de renúncias e desvinculação de pisos de saúde e educação.",
    seguranca: "“Direito Penal do Inimigo”, superpresídios inspirados em El Salvador, confisco de patrimônio e ampliação de vigilância.",
    instituicoes: [
      { l: "prop", t: "“Grande Consolidação Municipal”: fusão de municípios considerados fiscalmente inviáveis, com referência a um estudo que admite reduzir o número de municípios em até 70%." },
      { l: "prop", t: "“Lei de Responsabilidade Gerencial”: vincular gestores públicos a metas objetivas de desempenho." }
    ],
    social: "Propõe substituir progressivamente Bolsa Família por “Frentes Cidadãs”.",
    saude: [ { l: "prop", t: "“SUS Fila Zero”: fila organizada por grau de risco (Escala Nacional de Estratificação de Risco), prontuário eletrônico nacional interoperável, sistema digital inspirado no DoctorSV de El Salvador e fundo com repasses a municípios condicionados a desempenho." } ]
  },
  propostas: ["Ajuste fiscal imediato", "Desindexação de despesas", "Reforma do funcionalismo", "Desvinculação de pisos de saúde e educação", "“Frentes Cidadãs” no lugar do Bolsa Família", "Superpresídios", "Confisco de patrimônio", "SUS Fila Zero", "Consolidação de municípios"],
  controversias: [
    { t: "Débitos tributários de empresa", l: "jud",
      d: "A Justiça Federal em São Paulo (decisão publicada em 09/09/2026) rejeitou pedidos de Renan para reconhecer prescrição e sair da cobrança de cerca de R$ 1,17 milhão em tributos devidos pela Martin Artefatos de Metal S.A. A defesa sustenta que ele não responde por passivos anteriores e que deixou a empresa em 2022.",
      status: ["civel"], note: "Dívida tributária não é condenação criminal.",
      src: { o: "Jornal de Brasília", r: "Justiça confirma dívidas de Renan Santos", p: "set/2026", url: "https://jornaldebrasilia.com.br/noticias/politica-e-poder/justica-confirma-dividas-de-renan-santos-e-frustra-tentativa-de-sigilo-sobre-cobrancas-de-impostos/" } },
    { t: "Ação do MPF por discurso contra indígenas", l: "jud",
      d: "O MPF processou Renan Santos e o MBL por publicações contra 14 etnias indígenas do Baixo Tapajós (PA) e pede R$ 500 mil por danos morais coletivos. Em 24/08/2026, a Justiça Federal em Santarém determinou, em caráter de urgência, a remoção dos vídeos.",
      status: ["liminar", "acao"], src: { o: "MPF (Procuradoria da República no Pará)", r: "Decisão liminar", p: "24/08/2026", url: "https://www.mpf.mp.br/o-mpf/unidades/pr-pa/noticias/decisao-renan-santos-mbl-discurso-odio-indigenas" } },
    { t: "Acusação de 2021", l: "jud",
      d: "Renan Santos foi absolvido, por insuficiência de provas, em processo aberto a partir de acusação feita em 2021. Segundo o MP-SP, a decisão transitou em julgado.",
      status: ["absolvido", "transitado"], note: "Não é crime comprovado.",
      src: { o: "Rádio Liberdade (com G1)", r: "MP confirma absolvição", p: "04/08/2026", url: "https://www.rdliberdade.com.br/eleicoes-2026-candidato-a-presidencia-da-republica-renan-santos-foi-absolvido-em-processo-por-acusacao-de-estupro-diz-ministerio-publico/" } }
  ],
  sources: [
    { t: "TSE — Portal de Dados Abertos, Candidatos 2026", url: "https://dadosabertos.tse.jus.br/pt_BR/dataset/candidatos-2026" },
    { t: "TSE — plano de governo registrado (“Livro Amarelo”, pacote “BR - Proposta de governo”)", url: "https://cdn.tse.jus.br/estatistica/sead/odsele/proposta_governo/proposta_governo_2026_BR.zip" },
    { t: "MPF — decisão sobre publicações contra indígenas (24/08/2026)", url: "https://www.mpf.mp.br/o-mpf/unidades/pr-pa/noticias/decisao-renan-santos-mbl-discurso-odio-indigenas" },
    { t: "Jornal de Brasília — decisão da Justiça Federal sobre débitos (set/2026)", url: "https://jornaldebrasilia.com.br/noticias/politica-e-poder/justica-confirma-dividas-de-renan-santos-e-frustra-tentativa-de-sigilo-sobre-cobrancas-de-impostos/" },
    { t: "Rádio Liberdade / G1 — absolvição confirmada pelo MP-SP (04/08/2026)", url: "https://www.rdliberdade.com.br/eleicoes-2026-candidato-a-presidencia-da-republica-renan-santos-foi-absolvido-em-processo-por-acusacao-de-estupro-diz-ministerio-publico/" }
  ],
  compare: {
    experiencia: "Empresário, fundador do MBL e do Missão. Direito na USP não concluído. Sem experiência anterior em cargo eletivo ou de governo.",
    fiscal: "Ajuste fiscal imediato, desindexação de despesas, reforma do funcionalismo, revisão de renúncias e desvinculação de pisos de saúde e educação.",
    seguranca: "“Direito Penal do Inimigo”, superpresídios inspirados em El Salvador, confisco de patrimônio e ampliação de vigilância.",
    stf: "Consolidação de municípios inviáveis e Lei de Responsabilidade Gerencial.",
    sociais: "Substituir progressivamente o Bolsa Família por “Frentes Cidadãs”.",
    saude: "SUS Fila Zero (fila por risco, prontuário nacional) e desvinculação do piso de saúde."
  }
},
{
  id: "romeu-zema", photo: "assets/images/president/romeu-zema.jpg", name: "Romeu Zema", party: "Novo", number: "30", depth: "full",
  last_updated: "2026-09-30",
  trajetoria: "Administrador formado pela FGV, empresário antes da política. Governador de Minas Gerais eleito em 2018 e reeleito em 2022; deixou o cargo em 2026 para disputar a Presidência.",
  profile: {
    formacao: [ { l: "fato", t: "Administrador formado pela FGV. Grau de instrução declarado ao TSE: superior completo." } ],
    privada: [ { l: "fato", t: "Empresário antes da política (ocupação declarada ao TSE). Na carta do plano de governo, relata ter começado a trabalhar na oficina do pai e expandido uma rede de lojas pelo interior." } ],
    publica: [ { l: "fato", t: "Governador de Minas Gerais eleito em 2018 e reeleito em 2022 no primeiro turno; deixou o cargo em 2026 para disputar a Presidência." } ],
    resultados: [
      { l: "dado", t: "Emprego: Minas registrou saldo de 1.024.785 empregos formais de janeiro de 2019 a meados de 2025, segundo o Novo Caged divulgado pelo governo estadual." },
      { l: "dado", t: "Contas: o governo informou superávit orçamentário de R$ 1,1 bilhão em 2025, o quinto ano consecutivo de equilíbrio. O Relatório de Gestão Fiscal do mesmo ano registrou insuficiência de R$ 11,3 bilhões em recursos não vinculados e dívida líquida de R$ 187,1 bilhões." },
      { l: "ctx", t: "Parte do alívio fiscal veio da renegociação da dívida com a União (adesão ao Propag). O governo atribui o saldo negativo de caixa a passivos herdados." }
    ],
    economia: "Choque fiscal, privatização ampla, redução gradual de IRPJ, reforma administrativa, nova reforma previdenciária e alternativa trabalhista mais flexível à CLT.",
    seguranca: "Classificar facções como organizações terroristas, presídios de segurança máxima, redução da maioridade penal e endurecimento da prisão preventiva para reincidentes.",
    instituicoes: [
      { l: "prop", t: "Fim do sigilo de 100 anos, extinção dos fundos partidário e eleitoral, sistema distrital misto, fim da reeleição e requisitos mais rígidos para ministros do STF." },
      { l: "prop", t: "No plano registrado no TSE: levar injúria e difamação para a esfera cível e vedar a remoção de perfis por plataformas, inclusive por determinação judicial." }
    ],
    social: [ { l: "prop", t: "“Casas da Cidadania” com plano familiar de saída da pobreza; permanência de adultos aptos no Bolsa Família condicionada a trabalho, estudo ou qualificação; prêmio de R$ 5 mil para famílias que deixarem o programa por aumento de renda." } ],
    saude: [ { l: "prop", t: "Registro nacional de saúde unificado (prontuário eletrônico), integração de dados público-privados, ampliação da Estratégia de Saúde da Família e uso da capacidade ociosa do setor privado para reduzir filas." } ]
  },
  propostas: ["Choque fiscal", "Privatização ampla", "Redução gradual de IRPJ", "Nova reforma previdenciária", "Alternativa trabalhista à CLT", "Facções como organizações terroristas", "Fim da reeleição", "Casas da Cidadania", "Prontuário nacional unificado"],
  controversias: [
    { t: "Multa do TSE por publicidade institucional (2022)", l: "jud",
      d: "Em 14/05/2024, o TSE rejeitou por unanimidade as acusações de abuso de poder e o pedido de cassação, mas multou Zema em 5 mil Ufirs por manter links de publicidade institucional acessíveis no período vedado da campanha de 2022.",
      status: ["multa"], src: { o: "Consultor Jurídico", r: "TSE afasta abuso de poder, mas multa Zema", p: "14/05/2024", url: "https://conjur.com.br/2024-mai-14/tse-afasta-abuso-de-poder-mas-multa-zema-por-publicidade-institucional/" } },
    { t: "Denúncia por calúnia contra Gilmar Mendes", l: "alg",
      d: "Em 15/05/2026, a PGR denunciou Zema ao STJ por calúnia contra o ministro Gilmar Mendes, por vídeos satíricos (“Os intocáveis”) que associavam ministros ao caso Banco Master. Zema afirmou que não recuará.",
      status: ["denuncia"], src: { o: "Agência Brasil", r: "PGR denuncia Zema por calúnia contra Gilmar Mendes", p: "15/05/2026", url: "https://agenciabrasil.ebc.com.br/justica/noticia/2026-05/pgr-denuncia-zema-por-calunia-contra-gilmar-mendes" } },
    { t: "Reajuste do salário de governador", l: "fato",
      d: "Zema sancionou a Lei 24.314/2023, que elevou em etapas o subsídio de governador, vice e secretários; o do governador chegou a R$ 41.845,49 em fevereiro de 2025.",
      status: ["sem_imputacao"], src: { o: "Assembleia Legislativa de Minas Gerais", r: "Lei 24.314/2023", p: "03/05/2023", url: "https://www.almg.gov.br/comunicacao/noticias/arquivos/Sancionado-reajuste-para-governador-vice-e-secretarios/" } }
  ],
  sources: [
    { t: "TSE — Portal de Dados Abertos, Candidatos 2026", url: "https://dadosabertos.tse.jus.br/pt_BR/dataset/candidatos-2026" },
    { t: "TSE — plano de governo registrado (“Plano Implacável”, pacote “BR - Proposta de governo”)", url: "https://cdn.tse.jus.br/estatistica/sead/odsele/proposta_governo/proposta_governo_2026_BR.zip" },
    { t: "Revista Viver Brasil — Novo Caged, 1 milhão de empregos (ago/2025)", url: "https://revistaviverbrasil.com.br/minas-gerais-atinge-marca-de-1-milhao-de-empregos-formais-criados-desde-2019/" },
    { t: "O Tempo — Relatório de Gestão Fiscal de 2025 (20/02/2026)", url: "https://www.otempo.com.br/politica/2026/2/20/minas-tem-rombo-de-r-11-3-bilhoes-no-caixa-no-ultimo-ano-do-governo-de-romeu-zema" },
    { t: "ALMG — Lei 24.314/2023 (reajuste de subsídios)", url: "https://www.almg.gov.br/comunicacao/noticias/arquivos/Sancionado-reajuste-para-governador-vice-e-secretarios/" },
    { t: "Consultor Jurídico — julgamento do TSE (14/05/2024)", url: "https://conjur.com.br/2024-mai-14/tse-afasta-abuso-de-poder-mas-multa-zema-por-publicidade-institucional/" },
    { t: "Agência Brasil — denúncia da PGR (15/05/2026)", url: "https://agenciabrasil.ebc.com.br/justica/noticia/2026-05/pgr-denuncia-zema-por-calunia-contra-gilmar-mendes" }
  ],
  compare: {
    experiencia: "Administrador (FGV), empresário. Governador de Minas Gerais eleito em 2018 e reeleito em 2022; deixou o cargo em 2026.",
    fiscal: "Choque fiscal, reforma administrativa e nova reforma previdenciária.",
    impostos: "Redução gradual de IRPJ.",
    estatais: "Privatização ampla.",
    trabalho: "Alternativa trabalhista mais flexível à CLT.",
    seguranca: "Facções como organizações terroristas, presídios de segurança máxima, redução da maioridade penal e preventiva mais dura para reincidentes.",
    stf: "Requisitos mais rígidos para ministros do STF; fim do sigilo de 100 anos, fim dos fundos partidário e eleitoral, distrital misto e fim da reeleição.",
    sociais: "Casas da Cidadania; Bolsa Família condicionado a trabalho ou estudo para adultos aptos; prêmio de saída.",
    saude: "Prontuário nacional unificado, integração público-privada e ampliação da Saúde da Família."
  }
},
{
  id: "ronaldo-caiado", photo: "assets/images/president/ronaldo-caiado.jpg", name: "Ronaldo Caiado", party: "PSD", number: "55", depth: "full",
  last_updated: "2026-09-30",
  trajetoria: "Médico, professor e produtor rural. Deputado federal em cinco legislaturas, senador e governador de Goiás de 2019 a 2026.",
  profile: {
    formacao: [ { l: "fato", t: "Médico (ocupação declarada ao TSE; grau de instrução: superior completo), com formação em ortopedia." } ],
    privada: [ { l: "fato", t: "Médico, professor e produtor rural. Presidiu a União Democrática Ruralista (UDR) de 1986 a 1989." } ],
    publica: [
      { l: "fato", t: "Deputado federal em cinco legislaturas (1991–1995 e 1999–2015) e senador por Goiás (2015–2019)." },
      { l: "fato", t: "Governador de Goiás eleito em 2018 e reeleito em 2022; deixou o cargo em 31/03/2026. Foi candidato a presidente em 1989." }
    ],
    resultados: [
      { l: "dado", t: "Educação: a rede estadual de Goiás teve a maior nota do país no Ideb 2023 do ensino médio (4,8), segundo o Inep." },
      { l: "dado", t: "Segurança: queda de 43% na taxa de homicídios entre 2019 e 2024, a terceira maior entre as UFs, segundo o Atlas da Violência 2026 (Ipea/FBSP)." },
      { l: "ctx", t: "Contas: Goiás aderiu ao Regime de Recuperação Fiscal em dezembro de 2021, o que suspendeu por 18 meses o pagamento da dívida com a União." }
    ],
    economia: "Estabilização fiscal, controle de despesas obrigatórias, revisão de subsídios, produtividade, infraestrutura e combinação de investimento público e privado.",
    seguranca: "Ministério da Segurança Pública, inteligência criminal, fronteiras, sistema penitenciário, redução da maioridade penal e nova legislação contra organizações criminosas.",
    instituicoes: [ { l: "prop", t: "Adoção do sistema distrital misto, financiamento político integralmente rastreável, painel público de emendas parlamentares e padrões de integridade (verificação prévia, quarentena, agenda pública) para altas autoridades." } ],
    social: [ { l: "prop", t: "Preservar os programas de transferência de renda com regra de transição para quem entra no trabalho formal; Sistema Nacional de Gestão Social Integrada e Plano Nacional de Emancipação Social." } ],
    saude: [ { l: "prop", t: "Preservar os princípios do SUS com cuidado preventivo, prontuário interoperável, fila transparente, especialista no tempo certo, hospitais remunerados por qualidade e resultado e redes regionais de especialidades." } ]
  },
  observar: "Comparar propostas com indicadores reais de Goiás em segurança, educação, fiscal e saúde.",
  propostas: ["Estabilização fiscal", "Controle de despesas obrigatórias", "Revisão de subsídios", "Ministério da Segurança Pública", "Redução da maioridade penal", "Nova lei contra organizações criminosas", "Sistema distrital misto", "Fila transparente no SUS"],
  controversias: [
    { t: "Conduta vedada nas eleições municipais de 2024", l: "jud",
      d: "Em dezembro de 2024, a primeira instância declarou Caiado inelegível por oito anos pelo uso do Palácio das Esmeraldas em jantares políticos na campanha de Goiânia. Em 08/04/2025, o TRE-GO afastou a inelegibilidade por unanimidade e manteve multa de R$ 60 mil por conduta vedada. A decisão ainda cabia recurso ao TSE.",
      status: ["multa", "anulado"], note: "Inelegibilidade revertida; multa mantida.",
      src: { o: "InfoMoney", r: "TRE-GO reverte inelegibilidade de Ronaldo Caiado", p: "08/04/2025", url: "https://www.infomoney.com.br/politica/tre-go-reverte-inelegibilidade-de-ronaldo-caiado-por-abuso-de-poder-politico/" } },
    { t: "Escolta de policiais militares após deixar o governo", l: "jud",
      d: "O MP-GO ajuizou ação de improbidade contra o uso de 51 policiais militares na segurança de Caiado e familiares. Em 06/07/2026, a Justiça determinou em liminar a redução para quatro agentes. Caiado afirma que a proteção decorre de ameaças de facções.",
      status: ["liminar", "acao"], src: { o: "Metrópoles", r: "Justiça determina que Caiado reduza segurança pessoal de 51 para 4 PMs", p: "06/07/2026", url: "https://www.metropoles.com/brasil/justica-determina-que-caiado-reduza-seguranca-pessoal-de-51-para-4-pms" } },
    { t: "Fintech investigada em programas sociais do estado", l: "fato",
      d: "Segundo a Folha de S.Paulo, o governo de Goiás movimentou R$ 1,36 bilhão de programas de transferência de renda (out/2021–ago/2025) pelo BK Bank, investigado na Operação Carbono Oculto por suspeita de ligação com o PCC. O governo diz que o credenciamento foi regular e anterior às investigações.",
      status: ["sem_imputacao"], note: "Não há indicação de investigação pessoal de Caiado no material consultado.",
      src: { o: "O Hoje (com Folha de S.Paulo)", r: "Governo Caiado usou fintech investigada", p: "26/05/2026", url: "https://ohoje.com/2026/05/26/governo-caiado-usou-fintech-investigada-por-ligacao-com-pcc-para-movimentar-r-136-bilhao-diz-folha/" } }
  ],
  sources: [
    { t: "TSE — Portal de Dados Abertos, Candidatos 2026", url: "https://dadosabertos.tse.jus.br/pt_BR/dataset/candidatos-2026" },
    { t: "TSE — plano de governo registrado (pacote “BR - Proposta de governo”)", url: "https://cdn.tse.jus.br/estatistica/sead/odsele/proposta_governo/proposta_governo_2026_BR.zip" },
    { t: "Wikipedia (inglês) — mandatos e datas", url: "https://en.wikipedia.org/wiki/Ronaldo_Caiado" },
    { t: "Sagres / Inep — Ideb 2023 do ensino médio (ago/2024)", url: "https://sagresonline.com.br/goias-tem-maior-nota-do-ensino-medio-no-ideb-2023-veja-ranking-dos-estados/" },
    { t: "Serra Dourada News / Atlas da Violência 2026 (Ipea/FBSP)", url: "https://sdnews.com.br/noticia/15959/goias-registra-queda-de-58-4-nos-homicidios-aponta-atlas-da-violencia-2026.html" },
    { t: "Poder360 — adesão ao Regime de Recuperação Fiscal (24/12/2021)", url: "https://www.poder360.com.br/brasil/bolsonaro-inclui-goias-no-regime-de-recuperacao-fiscal/" },
    { t: "InfoMoney — decisão do TRE-GO (08/04/2025)", url: "https://www.infomoney.com.br/politica/tre-go-reverte-inelegibilidade-de-ronaldo-caiado-por-abuso-de-poder-politico/" },
    { t: "Metrópoles — liminar sobre a escolta (06/07/2026)", url: "https://www.metropoles.com/brasil/justica-determina-que-caiado-reduza-seguranca-pessoal-de-51-para-4-pms" },
    { t: "O Hoje / Folha — BK Bank e programas sociais (26/05/2026)", url: "https://ohoje.com/2026/05/26/governo-caiado-usou-fintech-investigada-por-ligacao-com-pcc-para-movimentar-r-136-bilhao-diz-folha/" }
  ],
  compare: {
    experiencia: "Médico, professor e produtor rural. Deputado federal (5 legislaturas), senador e governador de Goiás 2019–2026.",
    fiscal: "Estabilização fiscal, controle de despesas obrigatórias e revisão de subsídios.",
    estatais: "Combinação de investimento público e privado.",
    seguranca: "Ministério da Segurança Pública, inteligência criminal, fronteiras, sistema penitenciário, redução da maioridade penal e nova lei contra organizações criminosas.",
    stf: "Sistema distrital misto, financiamento político rastreável, transparência de emendas e integridade de altas autoridades.",
    sociais: "Transferência de renda preservada com porta de saída gradual e Plano Nacional de Emancipação Social.",
    saude: "Fila transparente, prontuário interoperável, especialista no tempo certo e redes regionais."
  }
}
];

EB.issues = [
  { id: "jornada", group: "Trabalho", q: "Jornada de trabalho",
    positions: [
      { p: "Jornada atual", c: [] },
      { p: "40 horas / fim da 6x1", c: ["lula"] },
    ] },
  { id: "maioridade", group: "Segurança", q: "Maioridade penal",
    positions: [
      { p: "Redução da maioridade penal", c: ["ronaldo-caiado", "romeu-zema"] },
      { p: "“Maioridade penal” citada como proposta (sem detalhe no material)", c: ["flavio-bolsonaro"] }
    ] },
  { id: "terrorismo", group: "Segurança", q: "Classificar facções como terrorismo",
    positions: [ { p: "Propõe", c: ["romeu-zema"] } ] },
  { id: "presidios", group: "Segurança", q: "Ampliar presídios",
    positions: [
      { p: "Presídios de segurança elevada / máxima", c: ["flavio-bolsonaro", "romeu-zema"] },
      { p: "Superpresídios inspirados em El Salvador", c: ["renan-santos"] },
      { p: "Sistema penitenciário (prioridade)", c: ["ronaldo-caiado"] }
    ] },
  { id: "confisco", group: "Segurança", q: "Ampliar confisco e vigilância",
    positions: [
      { p: "Confisco de patrimônio e ampliação de vigilância", c: ["renan-santos"] },
      { p: "Reconhecimento facial", c: ["flavio-bolsonaro"] },
    ] },
  { id: "estatais", group: "Empresas públicas", q: "Privatizar, manter ou estatizar",
    positions: [
      { p: "Privatização ampla", c: ["romeu-zema"] },
      { p: "Desestatizações", c: ["flavio-bolsonaro"] },
    ] },
  { id: "arcabouco", group: "Estado e economia", q: "Arcabouço fiscal",
    positions: [
      { p: "Manter / aprofundar", c: ["lula"] },
      { p: "Reformular regras fiscais", c: ["flavio-bolsonaro"] },
    ] },
  { id: "previdencia", group: "Estado e economia", q: "Previdência",
    positions: [
      { p: "Nova reforma previdenciária", c: ["romeu-zema"] },
    ] },
  { id: "clt", group: "Estado e economia", q: "Legislação trabalhista",
    positions: [
      { p: "Alternativa mais flexível à CLT", c: ["romeu-zema"] },
      { p: "Reduzir custo do trabalho", c: ["flavio-bolsonaro"] },
    ] },
  { id: "divida", group: "Estado e economia", q: "Como tratar a dívida",
    positions: [
      { p: "Redução gradual / déficit próximo de zero", c: ["augusto-cury"] },
      { p: "Ajuste fiscal imediato / desindexação", c: ["renan-santos"] },
      { p: "Choque fiscal", c: ["romeu-zema"] },
      { p: "Estabilização fiscal", c: ["ronaldo-caiado"] },
    ] },
  { id: "stf", group: "STF e instituições", q: "Mudanças no STF",
    positions: [
      { p: "Nove ministros, mandatos de 8 anos", c: ["augusto-cury"] },
      { p: "Fim de decisões monocráticas / reforma do Judiciário", c: ["flavio-bolsonaro"] },
      { p: "Requisitos mais rígidos para ministros", c: ["romeu-zema"] }
    ] },
  { id: "redes", group: "STF e instituições", q: "Plataformas digitais",
    positions: [ { p: "Regulamentação de redes e plataformas", c: ["lula"] } ] }
];
