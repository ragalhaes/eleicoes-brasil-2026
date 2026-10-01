/* =========================================================
   META — rótulos editoriais, status processuais, datasets
   Edite aqui os textos de definição. Não altere as chaves.
   ========================================================= */
window.EB = window.EB || {};

EB.site = {
  name: "Além da Urna",
  domain: "https://alemdaurna.com",
  tagline: "Muito além das eleições",
  concept: "Eleições Brasil 2026",
  subtitle: "Economia, instituições, STF, Senado e Presidência. Entenda como o Brasil chegou a 2026 e o que esta eleição pode mudar.",
  author: "Rafael Magalhães",
  version: "V3.2",
  content_package: "site-content-eleicoes-2026",
  last_updated: "2026-09-30",
  election_date: "2026-10-04"
};

/* Rótulos. fam = família visual (classe CSS). */
EB.labels = {
  fato: { name: "Fato", fam: "f", desc: "Informação verificável em fonte primária ou jornalística confiável." },
  dado: { name: "Dado", fam: "f", desc: "Número ou estatística com fonte oficial ou primária identificada." },
  jud:  { name: "Decisão judicial", fam: "j", desc: "O que o processo ou tribunal efetivamente decidiu. É fato jurídico — mas sua fundamentação pode ser criticada." },
  alg:  { name: "Alegação", fam: "i", desc: "Afirmação atribuída a parte identificável (acusação, defesa, campanha). Não equivale a fato comprovado." },
  inf:  { name: "Inferência", fam: "n", desc: "Conexão plausível entre fatos, mas não prova direta." },
  ctx:  { name: "Contexto", fam: "c", desc: "Informação de fundo necessária para ler corretamente um fato." },
  ana:  { name: "Análise", fam: "a", desc: "Interpretação que decorre dos fatos apresentados, mas envolve julgamento." },
  ed:   { name: "Opinião editorial", fam: "e", desc: "Interpretação assumida do autor do site. Não é dado objetivo." },
  prop: { name: "Proposta de campanha", fam: "p", desc: "Compromisso registrado pela candidatura (plano de governo protocolado no TSE ou declaração pública). Não é resultado nem fato consumado." },
  met:  { name: "Metodologia", fam: "m", desc: "Regra de leitura, cuidado metodológico ou critério usado pelo site." },
  ver:  { name: "Precisa verificar", fam: "v", desc: "Item que não deve ser lido como fato antes de checagem." }
};

/* Situação processual — sempre com o mesmo destaque da acusação original. */
EB.status = {
  investigacao: { name: "Investigação", tone: "i" },
  denuncia:     { name: "Denúncia", tone: "i" },
  reu:          { name: "Réu", tone: "i" },
  condenacao:   { name: "Condenação", tone: "j" },
  definitiva:   { name: "Condenação definitiva", tone: "j" },
  execucao:     { name: "Em execução", tone: "j" },
  revisao:      { name: "Revisão criminal pedida", tone: "i" },
  arquivado:    { name: "Arquivado", tone: "f" },
  anulado:      { name: "Anulado", tone: "f" },
  absolvido:    { name: "Absolvido", tone: "f" },
  reabertura:   { name: "Pedido de reabertura", tone: "i" },
  civel:        { name: "Cível / tributário — não criminal", tone: "c" },
  sem_imputacao:{ name: "Sem imputação pessoal", tone: "c" },
  reportagem:   { name: "Apuração jornalística", tone: "c" },
  sem_decisao:  { name: "Sem decisão judicial", tone: "c" },
  liminar:      { name: "Decisão liminar", tone: "j" },
  acao:         { name: "Ação em andamento", tone: "i" },
  transitado:   { name: "Trânsito em julgado", tone: "f" },
  multa:        { name: "Multa aplicada", tone: "j" }
};

/* Hierarquia de fontes (14-fontes-e-regras-editoriais.md) */
EB.sourceHierarchy = [
  "Constituição, leis e atos normativos oficiais.",
  "STF, TSE, Senado, Câmara e demais órgãos públicos.",
  "IBGE, Banco Central, Tesouro, Ipea e órgãos estatísticos.",
  "Relatórios originais de institutos de pesquisa.",
  "Organizações internacionais e centros reconhecidos.",
  "Veículos jornalísticos para fatos contemporâneos, controvérsias e declarações.",
  "Opinião e análise sempre identificadas como tal."
];

EB.rules = [
  { t: "Fato vs. opinião", d: "Toda conclusão política do autor deve estar marcada como interpretação editorial." },
  { t: "Acusações", d: "Nunca converter acusação em fato. Mostrar a situação atual: investigação, denúncia, réu, condenação, condenação definitiva, arquivamento, absolvição ou anulação." },
  { t: "Justiça", d: "Uma decisão judicial é um fato jurídico, mas isso não significa que sua fundamentação seja imune a crítica. Divergências relevantes aparecem de forma explícita." },
  { t: "Eleição de 2022", d: "O projeto não sustenta fraude nas urnas nem na apuração. A crítica editorial é sobre assimetria institucional, controle de discurso, devido processo e concentração de poder." },
  { t: "Pesquisas", d: "Não misturar pesquisas com mercados ou modelos. Sempre mostrar data, campo, amostra, método, margem e fonte." },
  { t: "Mercados", d: "Mostrar data e hora da captura. Nunca chamar preço de mercado de intenção de voto." },
  { t: "ÍRIS / VOGA", d: "Tratar como modelo externo. Não apresentar o resultado como cálculo próprio." },
  { t: "Candidatos", d: "Usar a mesma régua factual para todos. Não criar ranking, score ou vencedor no comparador." },
  { t: "Indicações pessoais", d: "A lista estadual derivada de peterapoia.com fica visualmente separada do comparador factual e identificada como indicação pessoal do autor/parceiro." },
  { t: "Atualização", d: "Todo dado eleitoral tem last_updated. Candidaturas, pesquisas, mercados e registros podem mudar rapidamente." }
];
