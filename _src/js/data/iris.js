/* =========================================================
   MODELO ÍRIS / VOGA — 12-modelo-iris-voga.md
   Números são da VOGA Inteligência, não cálculo próprio.
   O conteúdo-base ainda não traz os valores: preencher a cada captura.
   ========================================================= */
window.EB = window.EB || {};

EB.iris = {
  source: "VOGA_IRIS",
  name: "Modelo ÍRIS — VOGA",
  url: "https://voga-iris.com/",
  methodology_url: "https://voga-iris.com/metodologia",
  captured_at: null,       // data/hora em que copiamos os números
  model_updated_at: null,  // data de atualização informada pela VOGA
  credibility: "95%",
  legend: "Modelo estatístico externo. Utiliza pesquisas eleitorais, histórico dos institutos e simulações de incerteza. Não é pesquisa de intenção de voto.",
  /* Um objeto por candidato. Exemplo de preenchimento:
     { candidate: "lula", current_estimate: 0, first_round_projection: 0,
       projection_low: 0, projection_high: 0, second_round_probability: 0, win_probability: 0 } */
  rows: []
};

EB.irisExplainer = {
  what: [
    "A ÍRIS é um modelo eleitoral da VOGA Inteligência.",
    "Não é pesquisa individual e não é simples média aritmética.",
    "O modelo reúne pesquisas, analisa histórico dos institutos e incorpora incerteza para produzir estimativas e simulações eleitorais."
  ],
  steps: [
    { t: "Reúne múltiplas pesquisas", d: "Combina levantamentos publicados por diferentes institutos para estimar a preferência subjacente do eleitorado." },
    { t: "Usa histórico dos institutos", d: "A documentação pública informa uso de pesquisas presidenciais de 2010 a 2022. O modelo analisa erro médio histórico e distorções sistemáticas (house effects). A própria ÍRIS ressalta que distorção sistemática não significa manipulação intencional." },
    { t: "Estima onde o eleitorado está hoje", d: "No gráfico “Onde as pesquisas estão”, cada ponto representa pesquisa publicada. A linha central representa estimativa do modelo e a faixa ao redor representa incerteza." },
    { t: "Projeta o dia da eleição", d: "O modelo acrescenta incerteza sobre mudanças futuras e executa simulações. Delas derivam probabilidade de vitória, probabilidade de segundo turno e intervalo projetado de votação no primeiro turno. A plataforma descreve intervalos de credibilidade de 95%." }
  ],
  pendulum: "A visualização “Pêndulo” representa probabilidade combinada de resultado entre campos ideológicos usados pela própria ÍRIS. Não é intenção de voto.",
  known: ["usa múltiplas pesquisas", "usa histórico desde 2010", "compara comportamento de institutos", "estima erro histórico", "estima distorções sistemáticas", "quantifica incerteza atual", "projeta incerteza até a votação", "roda simulações"],
  unknown: ["pesos exatos de cada pesquisa", "função temporal exata", "fórmula completa de house effects", "tratamento de institutos novos", "número de simulações", "distribuições e priors completos", "correlações entre candidatos"],
  unknown_note: "A metodologia pública não expõe todos os detalhes matemáticos necessários para reprodução exata. Por isso o site atribui os números à VOGA e não os apresenta como cálculo próprio."
};

/* As três camadas — nunca fundir numa única porcentagem */
EB.layers = [
  { id: "pesquisas", k: "Pesquisas", q: "O que os entrevistados estão dizendo?", href: "#/pesquisas" },
  { id: "mercados", k: "Mercados", q: "Como contratos sobre o resultado estão sendo negociados?", href: "#/mercados" },
  { id: "iris", k: "ÍRIS / VOGA", q: "O que um modelo estatístico externo projeta a partir de pesquisas, histórico e incerteza?", href: "#/iris" }
];
