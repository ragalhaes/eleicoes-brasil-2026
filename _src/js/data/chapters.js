/* =========================================================
   CAPÍTULOS HISTÓRICOS — conteúdo dos arquivos 02 a 08
   Fonte editorial: site-content-eleicoes-2026 (30/09/2026)

   Blocos:
     {p, l}        parágrafo (l = rótulo opcional → vira bloco marcado)
     {ul, l, title} lista
     {box:{l, title, p|ul}}  caixa de destaque rotulada
     {stats:[...]} números grandes {v,u,k,d,l,src}
     {bars:{title, l, rows:[{n,v,s}], unit, src}}
     {seq:[...] , l} sequência narrativa (setas)
     {kv:{title, l, rows:[[k,v]]}}
     {vote:{...}} placar judicial
     {timeline:{l, rows:[{d,t}]}}
   src = {o: órgão/fonte, r: referência, p: período, n: nota, url}
   ========================================================= */
window.EB = window.EB || {};

EB.chapters = [

/* ---------------------------------------------------- 02 */
{
  id: "antes-de-bolsonaro", num: "01", years: "1994–2018",
  kicker: "O Brasil antes de Bolsonaro",
  title: "A ruptura de 2018",
  file: "02-brasil-antes-de-bolsonaro.md",
  labels: ["fato", "dado", "ed"],
  home: [
    { p: "Durante duas décadas, a disputa pela Presidência da República foi dominada por PT e PSDB. Entre 1994 e 2014, os dois partidos constituíram os principais polos das eleições presidenciais brasileiras." },
    { p: "Esse equilíbrio começou a se deteriorar na década de 2010. As manifestações de 2013, a recessão de 2015 e 2016, a Operação Lava Jato, o impeachment de Dilma Rousseff e o desgaste dos partidos tradicionais criaram um ambiente político muito diferente daquele das eleições anteriores." },
    { p: "Foi nesse cenário que Jair Bolsonaro deixou de ser apenas um deputado conhecido por suas posições conservadoras e se tornou o centro de uma nova coalizão eleitoral de direita." },
    { p: "Na interpretação editorial deste projeto, 2018 representou mais do que uma simples alternância de poder: marcou a consolidação eleitoral de uma direita que combinava conservadorismo nos costumes, segurança pública mais rígida, defesa das armas, antipetismo e uma agenda econômica mais liberal.", l: "ed" }
  ],
  stats: [
    { v: "55,13", u: "%", k: "2º turno de 2018", d: "Bolsonaro venceu com 57.797.847 votos, 55,13% dos votos válidos.", l: "dado",
      src: { o: "TSE", r: "Resultados oficiais das eleições de 2018", p: "2º turno, 2018" } },
    { v: "46,03", u: "%", k: "1º turno de 2018", d: "Com apenas oito segundos por bloco de propaganda eleitoral gratuita.", l: "dado",
      src: { o: "TSE", r: "Resultados oficiais das eleições de 2018", p: "1º turno, 2018" } },
    { v: "−3,5 / −3,3", u: "%", k: "PIB 2015 / 2016", d: "A recessão que antecedeu o impeachment.", l: "dado",
      src: { o: "IBGE", r: "PIB 2015 e 2016", p: "2015–2016" } }
  ],
  sections: [
    { h: "Duas décadas de PT e PSDB", b: [
      { p: "De 1994 a 2014, PT e PSDB foram os dois grandes polos das eleições presidenciais. Isso não significa que fossem iguais. Tinham bases eleitorais, programas e alianças distintas.", l: "fato" },
      { box: { l: "ed", title: "Interpretação editorial",
        p: ["A interpretação editorial do projeto é outra: aquela disputa não oferecia representação presidencial equivalente para uma direita popular que reunisse, numa mesma identidade política, conservadorismo nos costumes, defesa de Estado menor, liberalização econômica, política de segurança mais dura, armas e defesa da família tradicional.",
            "A direita existia socialmente e no Congresso. O que faltava era uma candidatura presidencial capaz de transformar essas pautas em identidade eleitoral de massa."] } }
    ]},
    { h: "2013: a primeira grande rachadura", b: [
      { p: "As manifestações de junho de 2013 começaram em torno do aumento de tarifas de transporte e rapidamente se tornaram heterogêneas. Corrupção, saúde, educação, gastos da Copa e críticas ao governo federal apareceram entre as demandas.", l: "fato" },
      { p: "Não existe interpretação acadêmica única sobre sua relação causal com a ascensão posterior da direita.", l: "ctx" },
      { p: "Para este projeto, 2013 funciona como sinal de perda de capacidade de representação do sistema partidário tradicional, não como um movimento ideologicamente homogêneo.", l: "ed" }
    ]},
    { h: "Crise econômica, Lava Jato e impeachment", b: [
      { stats: [
        { v: "−3,5", u: "%", k: "PIB 2015", l: "dado", src: { o: "IBGE", r: "PIB 2015", p: "2015" } },
        { v: "−3,3", u: "%", k: "PIB 2016", l: "dado", src: { o: "IBGE", r: "PIB 2016", p: "2016" } },
        { v: "61 × 20", u: "", k: "Impeachment no Senado", d: "Dilma Rousseff definitivamente afastada em 31 de agosto de 2016.", l: "fato", src: { o: "Câmara / Senado", r: "Processo de impeachment de Dilma Rousseff", p: "31/08/2016" } }
      ]},
      { p: "A Operação Lava Jato começou em março de 2014 investigando corrupção e lavagem de dinheiro e depois se expandiu para múltiplos casos.", l: "fato", src: { o: "MPF", r: "Histórico da Operação Lava Jato", p: "2014–" } },
      { seq: ["2013", "Lava Jato", "Recessão", "Impeachment", "Crise dos partidos tradicionais"], l: "ana", title: "Sequência narrativa" }
    ]},
    { h: "Bolsonaro não era um outsider político", b: [
      { p: "Bolsonaro era deputado federal desde 1991 e havia sido eleito sete vezes para a Câmara.", l: "fato", src: { o: "Câmara dos Deputados", r: "Biografia parlamentar de Jair Bolsonaro" } },
      { p: "Portanto, não deve ser apresentado como outsider da política. A ruptura estava em outro lugar: ele não vinha do eixo partidário que dominava as eleições presidenciais e começou a campanha com estrutura partidária pequena.", l: "ana" },
      { p: "No primeiro turno de 2018, sua coligação tinha apenas oito segundos por bloco de propaganda eleitoral gratuita. Mesmo assim, terminou o primeiro turno com 46,03% dos votos válidos.", l: "dado", src: { o: "TSE", r: "Resultados oficiais 2018", p: "1º turno, 2018" } }
    ]},
    { h: "Mais do que antipetismo", b: [
      { p: "O antipetismo foi importante, mas não explica tudo.", l: "ana" },
      { p: "Bolsonaro reuniu conservadores nos costumes, defensores de políticas mais duras de segurança, eleitores favoráveis às armas, liberais na economia, grupos religiosos, críticos da corrupção e pessoas cuja principal identidade era a rejeição ao PT.", l: "ana" },
      { box: { l: "ed", title: "Tese editorial", p: ["Bolsonaro não criou a direita brasileira; transformou demandas e grupos já existentes em uma força presidencial de massa."] } }
    ]},
    { h: "Definição de “sistema”", b: [
      { box: { l: "met", title: "Como o site usa a palavra",
        p: ["No projeto, “sistema” não significa organização secreta ou comando formal centralizado.",
            "É uma categoria editorial para descrever uma rede informal de partidos tradicionais, lideranças partidárias, atores institucionais, setores da imprensa e figuras de grande influência em Brasília.",
            "Esses atores não formam bloco homogêneo e frequentemente têm interesses conflitantes."] } },
      { p: "A tese editorial é que a ascensão de Bolsonaro confrontou interesses e consensos de partes dessa estrutura política tradicional.", l: "ed" }
    ]},
    { h: "Críticas a Bolsonaro reconhecidas pelo próprio projeto", b: [
      { p: "O projeto não depende de retratar Bolsonaro como infalível. Três críticas assumidas pelo autor:", l: "ed" },
      { ul: [
        "Acusações contra urnas eletrônicas sem evidência suficiente de fraude no sistema de votação.",
        "Postura diante de Vladimir Putin e da guerra da Ucrânia.",
        "Elogios ao regime militar brasileiro."
      ], l: "ed", ol: true }
    ]}
  ],
  sources: [
    "TSE — resultados oficiais das eleições de 2018.",
    "Câmara dos Deputados — biografia parlamentar de Jair Bolsonaro.",
    "IBGE — PIB 2015 e 2016.",
    "MPF — histórico da Operação Lava Jato.",
    "Câmara / Senado — processo de impeachment de Dilma Rousseff.",
    "Literatura acadêmica SciELO sobre 2013, conservadorismo e reorganização da direita."
  ]
},

/* ---------------------------------------------------- 03 */
{
  id: "governo-bolsonaro", num: "02", years: "2019–2022",
  kicker: "Bolsonaro no poder",
  title: "Reformas, economia e resultados",
  file: "03-governo-bolsonaro.md",
  labels: ["fato", "dado", "met"],
  home: [
    { p: "Bolsonaro chegou à Presidência com uma agenda que combinava conservadorismo político e orientação econômica mais liberal conduzida por Paulo Guedes." },
    { p: "Entre 2019 e 2022 foram aprovadas mudanças estruturais relevantes: reforma da Previdência, Lei da Liberdade Econômica, novo marco do saneamento, autonomia formal do Banco Central, novo marco do gás e novo marco ferroviário. O período também teve concessões de infraestrutura e a privatização da Eletrobras." },
    { p: "O Governo Central terminou 2022 com superávit primário de cerca de R$ 54 bilhões, enquanto o setor público consolidado registrou superávit de 1,28% do PIB. A dívida bruta encerrou o ano em 73,5% do PIB." },
    { p: "O período, porém, também teve inflação elevada: IPCA de 10,06% em 2021 e 5,79% em 2022." }
  ],
  stats: [
    { v: "+4,8 / +3,0", u: "%", k: "PIB 2021 / 2022", d: "Depois da queda de 3,3% em 2020, ano do choque da Covid-19.", l: "dado", src: { o: "IBGE", r: "PIB", p: "2019–2022" } },
    { v: "9,3", u: "%", k: "Desemprego médio 2022", d: "Contra 13,8% em 2020 e 13,2% em 2021.", l: "dado", src: { o: "IBGE", r: "PNAD Contínua — taxa média anual", p: "2019–2022" } },
    { v: "10,06", u: "%", k: "IPCA 2021", d: "Inflação elevada; 5,79% em 2022.", l: "dado", src: { o: "IBGE", r: "IPCA", p: "2020–2022" } }
  ],
  sections: [
    { h: "Reformas e marcos", b: [
      { cards: [
        { t: "Reforma da Previdência", k: "EC 103/2019", d: "Mudou idade mínima, regras de transição, cálculo de benefícios e regras previdenciárias de servidores e Regime Geral." },
        { t: "Liberdade Econômica", k: "Lei 13.874/2019", d: "Estabeleceu princípios de proteção à livre iniciativa e dispensas para atividades de baixo risco." },
        { t: "Novo marco do saneamento", k: "Lei 14.026/2020", d: "Alterou regras de contratação e regulação e abriu maior espaço para competição e participação privada." },
        { t: "Autonomia do Banco Central", k: "LC 179/2021", d: "Criou mandatos fixos e não coincidentes para presidente e diretores e definiu estabilidade de preços como objetivo fundamental." },
        { t: "Gás e ferrovias", k: "Leis 14.134/2021 e 14.273/2021", d: "Reorganizaram regras dos setores de gás natural e ferrovias." }
      ], l: "fato", src: { o: "Planalto", r: "EC 103/2019, Leis 13.874/2019, 14.026/2020, LC 179/2021, 14.134/2021, 14.273/2021" } },
      { p: "O tempo médio nacional de abertura de empresa caiu para cerca de 23 horas em 2022, contra aproximadamente 5 dias e 9 horas no início de 2019.", l: "dado" },
      { p: "A métrica não cobre necessariamente todas as licenças posteriores.", l: "met" }
    ]},
    { h: "Concessões e privatizações", b: [
      { p: "O período teve rodadas de concessões de aeroportos, portos, rodovias e ferrovias.", l: "fato", src: { o: "Ministério da Infraestrutura / Governo Federal", r: "Concessões 2019–2022" } },
      { p: "Em 2022 ocorreu a desestatização da Eletrobras por capitalização e diluição da participação votante da União.", l: "fato" },
      { box: { l: "met", title: "Cuidado editorial", p: ["Investimentos anunciados/contratados para décadas futuras não devem ser tratados como dinheiro efetivamente investido durante os quatro anos."] } }
    ]},
    { h: "PIB", b: [
      { bars: { l: "dado", unit: "%", signed: true, rows: [ { n: "2019", v: 1.2 }, { n: "2020", v: -3.3, s: "Covid-19" }, { n: "2021", v: 4.8 }, { n: "2022", v: 3.0 } ],
        src: { o: "IBGE", r: "PIB anual", p: "2019–2022" } } },
      { p: "2020 deve ser tratado separadamente por causa do choque da Covid-19.", l: "met" }
    ]},
    { h: "Emprego", b: [
      { bars: { l: "dado", unit: "%", title: "Desemprego médio anual", rows: [ { n: "2019", v: 12.0 }, { n: "2020", v: 13.8 }, { n: "2021", v: 13.2 }, { n: "2022", v: 9.3 } ],
        src: { o: "IBGE", r: "PNAD Contínua", p: "2019–2022" } } },
      { p: "Em 2022, a população ocupada média chegou a cerca de 98 milhões de pessoas, então o maior resultado da série iniciada em 2012.", l: "dado" },
      { p: "A informalidade permaneceu elevada.", l: "ctx" }
    ]},
    { h: "Inflação", b: [
      { bars: { l: "dado", unit: "%", title: "IPCA", rows: [ { n: "2020", v: 4.52 }, { n: "2021", v: 10.06 }, { n: "2022", v: 5.79 } ],
        src: { o: "IBGE", r: "IPCA", p: "2020–2022" } } },
      { p: "Em 2021, transportes, combustíveis e habitação tiveram peso relevante; a gasolina subiu fortemente.", l: "ctx" },
      { p: "Nota de leitura: não descrever a economia do período como “excelente” sem qualificação, nem atribuir toda a inflação a política doméstica.", l: "met" }
    ]},
    { h: "Contas públicas", b: [
      { stats: [
        { v: "~54", u: "R$ bi", k: "Superávit primário — Governo Central 2022", l: "dado", src: { o: "Tesouro Nacional", r: "Resultado primário", p: "2022" } },
        { v: "1,28", u: "% PIB", k: "Superávit — setor público consolidado 2022", l: "dado", src: { o: "Banco Central", r: "Estatísticas fiscais", p: "2022" } },
        { v: "73,5", u: "% PIB", k: "Dívida bruta, fim de 2022", l: "dado", src: { o: "Banco Central", r: "Estatísticas fiscais", p: "dez/2022" } }
      ]},
      { p: "Parte da melhora veio de recuperação econômica, arrecadação, concessões, receitas de recursos naturais e dividendos.", l: "ctx" }
    ]},
    { h: "Comércio exterior", b: [
      { stats: [
        { v: "~231,9", u: "US$ bi", k: "Exportações 2018", l: "dado" },
        { v: "~334,1", u: "US$ bi", k: "Exportações 2022", l: "dado" },
        { v: "~61,5", u: "US$ bi", k: "Superávit comercial 2022", l: "dado" }
      ]},
      { p: "Esses valores devem ser contextualizados com câmbio e preços internacionais de commodities.", l: "met" }
    ]},
    { h: "Conclusão factual", b: [
      { box: { l: "ctx", title: "Síntese", p: ["O governo implementou agenda econômica e regulatória identificável, atravessou a maior crise sanitária mundial em décadas e terminou 2022 com crescimento, desemprego em queda, recuperação fiscal e inflação menor do que em 2021, embora ainda elevada."] } }
    ]}
  ],
  sources: [
    "Planalto — EC 103/2019, Leis 13.874/2019, 14.026/2020, LC 179/2021, 14.134/2021, 14.273/2021.",
    "IBGE — PIB, emprego e IPCA.",
    "Banco Central — estatísticas fiscais.",
    "Tesouro Nacional — resultado primário.",
    "Ministério da Infraestrutura / Governo Federal — concessões."
  ]
},

/* ---------------------------------------------------- 04 */
{
  id: "pandemia", num: "03", years: "2020–2021",
  kicker: "Pandemia",
  title: "Decisões sanitárias e escalada do conflito",
  file: "04-pandemia.md",
  labels: ["fato", "jud", "ana", "ed"],
  home: [
    { p: "A Covid-19 mudou completamente o governo Bolsonaro. A partir de 2020, questões de saúde pública passaram a envolver simultaneamente ciência incompleta, restrições de direitos, atividade econômica, educação, federalismo e decisões judiciais." },
    { p: "Bolsonaro se posicionou cedo contra restrições generalizadas e prolongadas, questionou fechamento de escolas, minimizou publicamente o risco da doença em determinadas falas, entrou em conflito com governadores e com ministros da Saúde, defendeu hidroxicloroquina e adotou postura pública de desconfiança em relação a algumas vacinas.", l: "fato" },
    { p: "Ao mesmo tempo, duas simplificações devem ser evitadas: o STF não proibiu o governo federal de agir; e o fechamento prolongado das escolas acumulou evidência documentada de danos relevantes.", l: "ctx" }
  ],
  stats: [
    { v: "615", u: "R$ bi", k: "Impacto fiscal das medidas em 2020", d: "Cerca de R$ 321,8 bilhões corresponderam ao Auxílio Emergencial.", l: "dado", src: { o: "Tesouro Nacional", r: "Impacto fiscal da pandemia", p: "2020" } },
    { v: "279,4", u: "dias", k: "Escolas fechadas (média)", d: "O Brasil esteve entre os países com escolas fechadas por mais tempo em 2020.", l: "dado", src: { o: "UNICEF", r: "Fechamento de escolas", p: "2020", n: "Média para o universo analisado pelo UNICEF." } },
    { v: "3", u: "ministros", k: "Saúde em 2020", d: "Mandetta, Teich (cerca de 28 dias) e Pazuello.", l: "fato" }
  ],
  sections: [
    { h: "Março de 2020", b: [
      { p: "Primeiro caso oficial no Brasil: 26 de fevereiro de 2020.", l: "fato" },
      { p: "Em 24 de março, Bolsonaro criticou fechamento de escolas e determinadas restrições e usou a expressão “gripezinha ou resfriadinho” ao falar sobre o que acreditava que aconteceria com ele próprio caso fosse infectado.", l: "fato" },
      { p: "A frase existiu e contribuiu para a percepção de minimização da doença, mas o contexto deve ser preservado.", l: "ctx" }
    ]},
    { h: "STF e competências federativas", b: [
      { p: "Na ADI 6341, o STF reconheceu competência concorrente de União, estados, Distrito Federal e municípios para o enfrentamento da pandemia.", l: "jud", src: { o: "STF", r: "ADI 6341 e resumo Covid", p: "2020" } },
      { p: "A União não perdeu poder de agir nacionalmente. Estados e municípios também não podiam ser impedidos de agir dentro de suas competências.", l: "jud" },
      { myths: [
        { m: "“O STF entregou toda a pandemia aos governadores.”", v: "Incorreto" },
        { m: "“Bolsonaro poderia simplesmente revogar todas as restrições estaduais.”", v: "Também incorreto" }
      ] }
    ]},
    { h: "Lockdowns", b: [
      { p: "No início de 2020 não havia vacina, tratamento específico comprovado ou imunidade populacional relevante.", l: "ctx" },
      { p: "Pacotes de medidas de redução de contato reduziram transmissão na fase inicial segundo estudos retrospectivos.", l: "fato", src: { o: "Nature / BMJ", r: "Intervenções não farmacológicas" } },
      { p: "Mas “lockdown” cobre intervenções muito diferentes. O efeito e a proporcionalidade variaram por intensidade, duração e contexto.", l: "ctx" }
    ]},
    { h: "Escolas", b: [
      { p: "O fechamento inicial ocorreu em contexto de grande incerteza. Com o tempo, evidências mostraram danos educacionais e sociais expressivos e maior capacidade de reabrir escolas com mitigação.", l: "fato" },
      { p: "UNICEF, UNESCO e OPAS/OMS passaram a defender reabertura segura como prioridade.", l: "fato", src: { o: "UNICEF / UNESCO / OPAS-OMS", r: "Educação e reabertura" } },
      { stats: [
        { v: "279,4", u: "dias", k: "Média de escolas fechadas (UNICEF)", l: "dado", src: { o: "UNICEF", r: "Fechamento de escolas", p: "2020" } },
        { v: "5,1", u: "milhões", k: "Sem acesso adequado à educação (nov/2020)", d: "Crianças e adolescentes.", l: "dado", src: { o: "UNICEF", r: "Educação na pandemia", p: "nov/2020" } }
      ]},
      { box: { l: "ed", title: "Conclusão editorial defensável", p: ["Questionar fechamentos escolares prolongados encontrou respaldo posterior importante. Isso não prova que a decisão inicial de março de 2020 fosse irracional."] } }
    ]},
    { h: "Máscaras", b: [
      { p: "A orientação internacional evoluiu em 2020. A OMS atualizou significativamente sua recomendação pública em 5 de junho de 2020.", l: "fato", src: { o: "OMS", r: "Orientação sobre máscaras", p: "05/06/2020" } },
      { p: "Evidência posterior deu suporte especialmente a máscaras cirúrgicas e de melhor qualidade em situações de transmissão.", l: "fato" },
      { p: "“A recomendação mudou” não é prova de que máscaras eram inúteis.", l: "met" }
    ]},
    { h: "Hidroxicloroquina", b: [
      { p: "Era legítimo estudar o medicamento no começo da pandemia.", l: "ana" },
      { p: "Bolsonaro foi além de defender pesquisa e apoiou publicamente o uso mesmo reconhecendo ausência de comprovação científica.", l: "fato" },
      { p: "Grandes estudos posteriores não demonstraram benefício clínico relevante para tratamento ou prevenção da Covid-19.", l: "fato", src: { o: "OMS", r: "Hidroxicloroquina" } }
    ]},
    { h: "Ministério da Saúde", b: [
      { timeline: { l: "fato", rows: [
        { d: "abr/2020", t: "Luiz Henrique Mandetta deixa o cargo após divergências com o presidente." },
        { d: "mai/2020", t: "Nelson Teich sai após cerca de 28 dias." },
        { d: "2020", t: "Eduardo Pazuello assume interinamente e depois é efetivado." }
      ]}},
      { p: "A sucessão rápida mostra divergência concreta sobre a estratégia sanitária federal.", l: "ana" }
    ]},
    { h: "Vacinas", b: [
      { cards: [
        { t: "AstraZeneca / Fiocruz", k: "2020", d: "O governo participou da estratégia de aquisição e transferência de tecnologia ainda em 2020. Portanto, é incorreto dizer que o governo federal se recusou a comprar qualquer vacina." },
        { t: "Pfizer", k: "ago/2020", d: "A Pfizer apresentou ofertas formais em agosto de 2020. O governo não respondeu às propostas dentro do prazo de validade. Parte das condições contratuais enfrentava obstáculos jurídicos que só foram autorizados posteriormente pela Lei 14.125/2021." },
        { t: "CoronaVac", k: "out/2020 → jan/2021", d: "Em outubro de 2020 houve anúncio de protocolo de intenção envolvendo 46 milhões de doses. Bolsonaro reagiu publicamente contra a compra naquele momento. A vacina acabou entrando no programa brasileiro e foi autorizada para uso emergencial pela Anvisa em janeiro de 2021." }
      ], l: "fato", src: { o: "TCU / Senado", r: "Contratos e ofertas de vacinas" } },
      { box: { l: "ed", title: "A pergunta editorial correta", p: ["Se o governo poderia ou deveria ter trabalhado mais cedo para superar os obstáculos jurídicos da oferta da Pfizer."] } }
    ]},
    { h: "Resposta fiscal", b: [
      { p: "A resposta federal à pandemia foi enorme.", l: "ctx" },
      { stats: [
        { v: "615", u: "R$ bi", k: "Impacto fiscal estimado, 2020", l: "dado", src: { o: "Tesouro Nacional", r: "Impacto fiscal das medidas de combate à Covid-19", p: "2020" } },
        { v: "321,8", u: "R$ bi", k: "Auxílio Emergencial", l: "dado", src: { o: "Tesouro Nacional", r: "Impacto fiscal das medidas de combate à Covid-19", p: "2020" } }
      ]}
    ]},
    { h: "Conclusão", b: [
      { p: "A pandemia acelerou e aprofundou o conflito entre governo federal, governadores, STF, imprensa e plataformas.", l: "ana" },
      { box: { l: "ed", title: "Posição do projeto", p: ["Reconhecer erros de Bolsonaro em cloroquina e parte da comunicação sobre vacinas não impede investigar excessos institucionais posteriores."] } }
    ]}
  ],
  sources: [
    "STF — ADI 6341 e resumo Covid.",
    "OMS — orientação sobre máscaras e hidroxicloroquina.",
    "Nature / BMJ — intervenções não farmacológicas e escolas.",
    "UNICEF / UNESCO / OPAS-OMS — educação e reabertura.",
    "TCU / Senado — contratos e ofertas de vacinas.",
    "Tesouro Nacional — impacto fiscal da pandemia."
  ]
},

/* ---------------------------------------------------- 05 */
{
  id: "stf-tse-2022", num: "04", years: "2019–2022",
  kicker: "STF, TSE e liberdade de expressão",
  title: "A eleição de 2022",
  file: "05-stf-tse-eleicao-2022.md",
  labels: ["fato", "jud", "alg", "ed"],
  home: [
    { p: "A eleição de 2022 não começou em 2022. Nos anos anteriores, o STF ampliou sua atuação diante de ameaças, campanhas de desinformação e ataques às instituições. Um marco foi o Inquérito 4.781, conhecido como Inquérito das Fake News, aberto em 2019 pelo próprio STF e conduzido por Alexandre de Moraes. Sua constitucionalidade foi posteriormente confirmada pelo Plenário por 10 votos a 1.", l: "jud" },
    { p: "Em paralelo, decisões do STF mudaram a situação jurídica de Lula. Em 2021, as condenações de Lula na 13ª Vara Federal de Curitiba foram anuladas por incompetência daquele juízo, e o STF também reconheceu a suspeição de Sergio Moro no processo do tríplex.", l: "jud" },
    { p: "Na eleição de 2022, o TSE exerceu forte intervenção contra desinformação e conteúdo político. A Resolução 23.714, aprovada dez dias antes do segundo turno, aumentou velocidade e alcance das ordens de retirada de conteúdo.", l: "fato" },
    { p: "O projeto não alega fraude nas urnas ou na contagem dos votos. A questão é institucional: se o poder utilizado para controlar desinformação e discurso político ultrapassou limites compatíveis com liberdade de expressão, devido processo e neutralidade.", l: "ed" }
  ],
  stats: [
    { v: "10 × 1", u: "", k: "Inquérito 4.781 constitucional", d: "Plenário do STF, junho de 2020.", l: "jud", src: { o: "STF", r: "ADPF 572 / Inquérito 4.781", p: "jun/2020" } },
    { v: "8 × 3", u: "", k: "Anulação confirmada", d: "Plenário confirma incompetência da 13ª Vara de Curitiba. Não foi absolvição de mérito.", l: "jud", src: { o: "STF", r: "Decisões de 2021 sobre Lula", p: "2021" } },
    { v: "50,90", u: "%", k: "Lula no 2º turno de 2022", d: "Contra 49,10% de Bolsonaro.", l: "dado", src: { o: "TSE", r: "Resultados oficiais 2022", p: "2º turno, 2022" } }
  ],
  sections: [
    { h: "Inquérito 4.781", b: [
      { p: "Aberto em 14 de março de 2019 por portaria do então presidente do STF, Dias Toffoli, que designou Alexandre de Moraes como relator.", l: "fato", src: { o: "STF", r: "ADPF 572 / Inquérito 4.781", p: "14/03/2019" } },
      { p: "O desenho era incomum porque o próprio tribunal alvo de ataques instaurou a investigação.", l: "ana" },
      { p: "Em junho de 2020, o Plenário julgou o inquérito constitucional por 10 votos a 1. A Corte também reconheceu limites: participação do Ministério Público, acesso da defesa aos elementos relativos aos investigados e proteção à liberdade de imprensa.", l: "jud" },
      { p: "Houve controvérsias reais sobre acesso da defesa aos autos; a OAB atuou para ampliar esse acesso.", l: "fato", src: { o: "OAB", r: "Acesso da defesa" } }
    ]},
    { h: "Lula volta ao jogo eleitoral", b: [
      { cards: [
        { t: "Prisão após segunda instância", k: "nov/2019 · 6 × 5", d: "O STF decidiu que, como regra, o cumprimento da pena deveria começar após o trânsito em julgado, sem impedir prisão preventiva quando cabível." },
        { t: "Anulação das condenações", k: "2021 · 8 × 3 no Plenário", d: "Edson Fachin anulou decisões da 13ª Vara Federal de Curitiba por incompetência do juízo. O Plenário confirmou a decisão por 8 a 3." },
        { t: "Suspeição de Moro", k: "caso tríplex", d: "Separadamente, o STF reconheceu a suspeição de Sergio Moro no caso do tríplex." }
      ], l: "jud", src: { o: "STF", r: "Decisões de 2019 e 2021 sobre Lula" } },
      { p: "A decisão de 2019 foi geral, não criada especificamente para Lula, embora tenha permitido sua saída da prisão.", l: "ctx" },
      { p: "A anulação por incompetência não foi absolvição sobre o mérito das acusações. Com isso, Lula recuperou direitos políticos e pôde concorrer em 2022.", l: "ctx" }
    ]},
    { h: "Alexandre de Moraes no TSE", b: [
      { p: "Moraes assumiu a presidência do TSE em 16 de agosto de 2022. A Justiça Eleitoral passou a intervir com grande velocidade em conteúdos digitais durante a campanha.", l: "fato" }
    ]},
    { h: "Houve decisões contra os dois lados", b: [
      { p: "O registro oficial não sustenta a afirmação simples de que o TSE só atuou contra Bolsonaro. Existem decisões desfavoráveis a Lula e sua campanha, incluindo multas, retirada de propaganda e decisões negando pedidos de resposta.", l: "fato", src: { o: "TSE", r: "Decisões eleitorais 2022" } },
      { p: "Uma alegação de assimetria precisa demonstrar diferença de critério, intensidade ou alcance entre casos comparáveis.", l: "met" }
    ]},
    { h: "Brasil Paralelo", b: [
      { p: "Em outubro de 2022, o TSE determinou por 4 a 3 a remoção do vídeo “Relembre os esquemas do governo Lula”. O relator votou contra a retirada, considerando que o material estava baseado em fatos noticiados; a maioria entendeu que o conteúdo era desinformativo e ofensivo.", l: "jud" },
      { p: "O placar dividido mostra controvérsia jurídica real.", l: "ana" },
      { p: "O TSE também suspendeu até depois do segundo turno a exibição do documentário “Quem mandou matar Jair Bolsonaro?” e determinou temporariamente a desmonetização de canais.", l: "jud" }
    ]},
    { h: "Resolução 23.714/2022", b: [
      { p: "Aprovada em 20 de outubro, dez dias antes do segundo turno. Permitiu remoção rápida de conteúdo considerado sabidamente inverídico ou gravemente descontextualizado sobre integridade eleitoral, com multas horárias elevadas.", l: "fato", src: { o: "TSE", r: "Resolução 23.714/2022", p: "20/10/2022" } },
      { p: "A PGR questionou partes da resolução no STF, alegando risco à liberdade de expressão e excesso de poder.", l: "alg" },
      { p: "O STF manteve a norma.", l: "jud" }
    ]},
    { h: "Vaza Toga: o fluxo entre STF e TSE revelado em 2024", b: [
      { p: "Atenção à cronologia: as reportagens são de agosto de 2024, mas tratam de mensagens trocadas entre agosto de 2022 e maio de 2023 — campanha, segundo turno, transição e início do novo governo. Nesse período, Alexandre de Moraes acumulava a relatoria dos inquéritos das fake news (Inq. 4.781) e das milícias digitais (Inq. 4.874) no STF com a presidência do TSE, assumida em 16 de agosto de 2022.", l: "ctx" },
      { p: "Em 13 e 14 de agosto de 2024, a Folha de S.Paulo publicou reportagens de Fabio Serapião e Glenn Greenwald baseadas em mais de 6 GB de mensagens de WhatsApp e arquivos trocados por auxiliares de Moraes. Os principais interlocutores eram **Airton Vieira**, juiz instrutor do gabinete de Moraes no STF, e **Eduardo Tagliaferro**, perito criminal que chefiava a Assessoria Especial de Enfrentamento à Desinformação (AEED) do TSE. **Marco Antônio Vargas**, juiz instrutor do gabinete de Moraes no TSE, também aparece nas conversas.", l: "fato", src: { o: "Folha de S.Paulo (Fabio Serapião e Glenn Greenwald)", r: "Moraes usou TSE fora do rito para investigar bolsonaristas no Supremo, revelam mensagens", p: "13/08/2024", n: "Link para republicação integral do texto da Folha (Folhapress).", url: "https://www.politicalivre.com.br/2024/08/moraes-usou-tse-fora-do-rito-para-investigar-bolsonaristas-no-supremo-revelam-mensagens" } },
      { p: "“Vaza Toga” é o apelido pelo qual o vazamento ficou conhecido no debate público. Não é nome de investigação ou procedimento oficial.", l: "ctx" },
      { p: "A AEED fazia parte formalmente da estrutura do TSE: a Resolução 23.683, de 22 de fevereiro de 2022, assinada pelo então presidente Edson Fachin, transformou uma assessoria já existente da Secretaria-Geral da Presidência em Assessoria Especial de Enfrentamento à Desinformação.", l: "fato", src: { o: "TSE", r: "Resolução nº 23.683, de 22 de fevereiro de 2022 (art. 2º, I)", p: "22/02/2022", url: "https://www.tse.jus.br/legislacao/compilada/res/2022/resolucao-no-23-683-de-22-de-fevereiro-de-2022" } },
      { p: "Pedidos de relatórios. Segundo as mensagens publicadas, o gabinete de Moraes no STF pedia à AEED, por WhatsApp, relatórios sobre pessoas e publicações ligadas aos inquéritos em curso no Supremo. Em 22 de novembro de 2022, por exemplo, foi pedida uma análise das postagens do comentarista Rodrigo Constantino para avaliar bloqueio de perfis e multa; no mesmo ciclo aparece o comentarista Paulo Figueiredo.", l: "fato", src: { o: "Folha de S.Paulo (Fabio Serapião e Glenn Greenwald)", r: "Moraes usou TSE fora do rito para investigar bolsonaristas no Supremo, revelam mensagens", p: "13/08/2024", n: "Link para republicação integral do texto da Folha (Folhapress).", url: "https://www.politicalivre.com.br/2024/08/moraes-usou-tse-fora-do-rito-para-investigar-bolsonaristas-no-supremo-revelam-mensagens" } },
      { p: "Em outro caso de dezembro de 2022, Airton Vieira pediu material que sustentasse a desmonetização da Revista Oeste. Quando Tagliaferro respondeu ter encontrado sobretudo publicações jornalísticas, a orientação recebida, segundo as mensagens, foi usar a “criatividade” e procurar opiniões críticas.", l: "fato", src: { o: "Folha de S.Paulo (Fabio Serapião e Glenn Greenwald)", r: "Moraes escolhia alvos e pedia ajustes em relatórios contra bolsonaristas, mostram mensagens", p: "14/08/2024", n: "Link para republicação integral do texto da Folha.", url: "https://jornaldebrasilia.com.br/noticias/politica-e-poder/moraes-escolhia-alvos-e-pedia-ajustes-em-relatorios-contra-bolsonaristas-mostram-mensagens/" } },
      { p: "Ajustes. As mensagens também registram pedidos de complementação e reformulação: no caso Constantino, o gabinete indicou insatisfação com a primeira versão e pediu a inclusão de outras postagens (28/12/2022); em outro episódio, pediu que o texto de um relatório não se concentrasse em ataques ao próprio ministro.", l: "fato", src: { o: "Folha de S.Paulo (Fabio Serapião e Glenn Greenwald)", r: "Moraes escolhia alvos e pedia ajustes em relatórios contra bolsonaristas, mostram mensagens", p: "14/08/2024", n: "Link para republicação integral do texto da Folha.", url: "https://jornaldebrasilia.com.br/noticias/politica-e-poder/moraes-escolhia-alvos-e-pedia-ajustes-em-relatorios-contra-bolsonaristas-mostram-mensagens/" } },
      { p: "Segundo a Folha, os relatórios eram formalizados como se tivessem origem no monitoramento do próprio TSE ou em denúncias recebidas, sem registrar que o pedido partira do gabinete no STF. É isso que o jornal chamou de uso do TSE “fora do rito”.", l: "alg", src: { o: "Folha de S.Paulo (Fabio Serapião e Glenn Greenwald)", r: "Moraes usou TSE fora do rito para investigar bolsonaristas no Supremo, revelam mensagens", p: "13/08/2024", n: "Link para republicação integral do texto da Folha (Folhapress).", url: "https://www.politicalivre.com.br/2024/08/moraes-usou-tse-fora-do-rito-para-investigar-bolsonaristas-no-supremo-revelam-mensagens" } },
      { p: "Uso nos inquéritos. Nos dias 3 a 5 de janeiro de 2023, decisões de Moraes nos inquéritos 4.781 e 4.874 suspenderam perfis de Constantino e Figueiredo em redes sociais, bloquearam contas bancárias e cancelaram passaportes. A reportagem relaciona relatórios da AEED à fundamentação dessas medidas; o gabinete confirma que relatórios foram juntados às investigações.", l: "fato", src: { o: "Gazeta do Povo", r: "Constantino tem contas bancárias bloqueadas e passaporte cancelado", p: "05/01/2023", url: "https://www.gazetadopovo.com.br/vida-e-cidadania/breves/constantino-tem-contas-bancarias-bloqueadas-e-passaporte-cancelado/" } },
      { p: "Como os inquéritos tramitam sob sigilo, o site não reconstituiu, peça por peça, a sequência processual de cada caso e não atribui a um relatório específico a causa de uma medida específica.", l: "met" },
      { p: "A defesa do gabinete. Em nota de 13 de agosto de 2024, o gabinete de Moraes afirmou que pedidos a diversos órgãos, inclusive o TSE, faziam parte das investigações; que o TSE, no exercício do poder de polícia eleitoral, tinha competência para produzir relatórios sobre desinformação, discurso de ódio eleitoral e tentativa de golpe; que os documentos apenas descreviam objetivamente postagens; que foram juntados aos autos e enviados à Polícia Federal; e que todos os procedimentos foram oficiais, regulares e documentados, com participação da PGR.", l: "alg", src: { o: "STF — gabinete do ministro Alexandre de Moraes", r: "Nota do gabinete do Ministro Alexandre de Moraes", p: "13/08/2024", url: "https://noticias.stf.jus.br/postsnoticias/nota-do-gabinete-do-ministro-alexandre-de-moraes-6/" } },
      { p: "Em 14 de agosto de 2024, no plenário do STF, Moraes reafirmou a legalidade dos atos (“não há nada a esconder”). O presidente do tribunal, Luís Roberto Barroso, falou em “tempestade fictícia”, disse que se tratava de postagens públicas e explicou a informalidade dizendo que “ninguém oficia para si próprio” — as informações seriam formalizadas quando chegavam. Gilmar Mendes também defendeu Moraes.", l: "alg", src: { o: "Agência Brasil", r: "Alexandre de Moraes reafirma legalidade de atos no TSE", p: "14/08/2024", url: "https://agenciabrasil.ebc.com.br/justica/noticia/2024-08/alexandre-de-moraes-reafirma-legalidade-de-atos-no-tse" } },
      { p: "Essas são as posições institucionais do gabinete e de ministros do STF. O site as registra como defesa, não como conclusão própria.", l: "met", src: { o: "STF", r: "Ministros esclarecem que pedidos do STF ao TSE cumpriram todos os ritos legais", p: "14/08/2024", url: "https://noticias.stf.jus.br/postsnoticias/ministros-esclarecem-que-pedidos-do-stf-ao-tse-cumpriram-todos-os-ritos-legais/" } },
      { ul: [
        "A questão não é se a AEED existia legalmente: ela fazia parte da estrutura formal do TSE.",
        "O debate é sobre **como** essa estrutura foi usada: pedidos informais por WhatsApp, escolha prévia de alvos e orientação sobre o conteúdo dos relatórios.",
        "Também sobre a circulação entre um órgão da Justiça Eleitoral e inquéritos conduzidos no STF pelo mesmo ministro que presidia o TSE.",
        "E sobre devido processo, separação entre investigar, produzir informação e julgar, e a extensão do poder de polícia eleitoral.",
        "“Fora do rito” é a caracterização da Folha e de críticos. Até a data desta versão, o site não identificou decisão judicial que tenha declarado esses procedimentos ilegais."
      ], l: "ctx", title: "Onde está a controvérsia" },
      { p: "Desdobramento. Em agosto de 2025, a PGR denunciou Tagliaferro por violação de sigilo funcional, coação no curso do processo, obstrução de investigação e tentativa de abolição violenta do Estado Democrático de Direito, acusando-o de vazar as mensagens. Em novembro de 2025, a Primeira Turma do STF recebeu a denúncia por unanimidade, com Moraes como relator. Em maio de 2026, recursos da defesa estavam em análise.", l: "jud", src: { o: "GPS Brasília", r: "STF aceita denúncia e torna Tagliaferro réu por vazamento", p: "13/11/2025", url: "https://gpsbrasilia.com.br/stf-aceita-denuncia-e-torna-tagliaferro-reu/" } },
      { status: ["denuncia", "reu"] },
      { p: "Tagliaferro nega ser a fonte do vazamento e diz ser perseguido político. Ele vive na Itália.", l: "alg", src: { o: "Diário do Poder", r: "STF julga Tagliaferro por mensagens que expuseram o gabinete de Moraes", p: "22/05/2026", url: "https://diariodopoder.com.br/brasil-e-regioes/stf-julga-tagliaferro-por-mensagens-que-expuseram-o-gabinete-de-moraes" } },
      { box: { l: "ctx", title: "O que não está provado", ul: [
        "As mensagens não demonstram fraude nas urnas.",
        "Não demonstram adulteração da contagem de votos.",
        "Não demonstram, por si só, coordenação entre Lula ou o PT e Moraes para produzir o resultado eleitoral.",
        "Não demonstram que o resultado presidencial de 2022 tenha sido alterado."] } },
      { ul: [
        "Um tribunal eleitoral deveria produzir, dessa forma, material usado em investigações criminais conduzidas no STF?",
        "Pedidos informais por mensagem são compatíveis com a transparência e o controle exigidos pelo devido processo?",
        "Escolher alvos antes e pedir complementações depois cria risco de confirmar uma hipótese já formada?",
        "A concentração de funções em torno do mesmo ministro — relator dos inquéritos, presidente do TSE e, depois, relator da ação contra o suposto autor do vazamento — gera problemas institucionais?"
      ], l: "ana", title: "Perguntas que o episódio levanta" },
      { p: "Para este projeto, o episódio reforça a tese do capítulo: o problema não é a apuração dos votos, mas a forma como instrumentos criados para combater desinformação foram operados — com informalidade, concentração de papéis e pouca visibilidade para quem era alvo. Isso merece escrutínio institucional independentemente de quem venceu a eleição.", l: "ed" }
    ]},
    { h: "Carter Center", b: [
      { p: "A missão do Carter Center reconheceu o problema real da desinformação, mas também registrou preocupação de que o poder exercido pelo TSE pudesse extrapolar e atingir a liberdade de expressão.", l: "fato", src: { o: "Carter Center", r: "Relatório de observação das eleições de 2022", p: "2022" } },
      { p: "Esse é um ponto importante porque a crítica não ficou restrita à campanha derrotada ou a atores de direita.", l: "ana" }
    ]},
    { h: "Inserções de rádio", b: [
      { p: "A campanha de Bolsonaro alegou falhas na veiculação de inserções em rádios.", l: "alg" },
      { p: "Alexandre de Moraes rejeitou o pedido por insuficiência da demonstração apresentada e destacou que o TSE não distribui fisicamente nem fiscaliza cada veiculação individual.", l: "jud" },
      { p: "O caso não constitui prova de fraude eleitoral.", l: "ctx" }
    ]},
    { h: "Resultado de 2022", b: [
      { bars: { l: "dado", unit: "%", title: "1º turno", rows: [ { n: "Lula", v: 48.43 }, { n: "Bolsonaro", v: 43.20 } ], src: { o: "TSE", r: "Resultados oficiais", p: "1º turno, 2022" } } },
      { bars: { l: "dado", unit: "%", title: "2º turno", rows: [ { n: "Lula", v: 50.90, s: "60.345.999 votos" }, { n: "Bolsonaro", v: 49.10, s: "58.206.354 votos" } ], src: { o: "TSE", r: "Resultados oficiais", p: "2º turno, 2022" } } }
    ]},
    { h: "Tese editorial deste capítulo", b: [
      { box: { l: "ed", title: "Opinião editorial", p: [
        "O projeto não afirma que houve fraude nas urnas nem que toda decisão do TSE favoreceu Lula.",
        "A interpretação editorial é que houve expansão excepcional do poder judicial sobre o processo político e que determinadas intervenções, embora justificadas pelo STF/TSE como proteção da democracia e combate à desinformação, geraram riscos relevantes à liberdade de expressão e à neutralidade institucional."] } },
      { box: { l: "ctx", title: "O que não está provado", p: ["Coordenação secreta entre Moraes, Lula, ministros e partidos para produzir o resultado eleitoral."] } }
    ]}
  ],
  sources: [
    "STF — ADPF 572 / Inquérito 4.781.",
    "STF — decisões de 2019 e 2021 sobre Lula.",
    "TSE — decisões eleitorais, Resolução 23.714 e resultados oficiais.",
    "OAB — acesso da defesa.",
    "Carter Center — relatório de observação das eleições de 2022.",
    "Folha de S.Paulo — série de Fabio Serapião e Glenn Greenwald sobre mensagens entre os gabinetes de Moraes no STF e no TSE (13 e 14/08/2024).",
    "STF — Nota do gabinete do Ministro Alexandre de Moraes (13/08/2024) e “Ministros esclarecem que pedidos do STF ao TSE cumpriram todos os ritos legais” (14/08/2024).",
    "TSE — Resolução 23.683/2022 (criação da AEED).",
    "Agência Brasil — sessão do STF de 14/08/2024; Gazeta do Povo — medidas de janeiro de 2023; Poder360, GPS Brasília e Diário do Poder — ação contra Eduardo Tagliaferro (2025–2026)."
  ]
},

/* ---------------------------------------------------- 06 */
{
  id: "processo-bolsonaro", num: "05", years: "2021–2026",
  kicker: "O processo contra Bolsonaro",
  title: "Tentativa de golpe, provas e divergência no STF",
  file: "06-processo-bolsonaro.md",
  labels: ["jud", "alg", "fato", "met"],
  home: [
    { p: "Em setembro de 2025, a Primeira Turma do STF condenou Jair Bolsonaro a 27 anos e três meses de prisão por organização criminosa armada, tentativa de abolição violenta do Estado Democrático de Direito, golpe de Estado, dano qualificado e deterioração de patrimônio tombado.", l: "jud" },
    { p: "Alexandre de Moraes, Flávio Dino, Cármen Lúcia e Cristiano Zanin votaram pela condenação. Luiz Fux divergiu e votou pela absolvição de Bolsonaro.", l: "jud" },
    { p: "A disputa jurídica central não é “existem provas vs. não existe prova nenhuma”. Há documentos, mensagens, vídeos, registros de reuniões, depoimentos e planos. O desacordo é sobre o que esse conjunto demonstra em relação a Bolsonaro individualmente e quando atos preparatórios teriam passado a constituir tentativa punível.", l: "ctx" }
  ],
  vote: {
    title: "Primeira Turma do STF · setembro de 2025",
    score: "4 × 1",
    yes: ["Alexandre de Moraes", "Flávio Dino", "Cármen Lúcia", "Cristiano Zanin"],
    no: ["Luiz Fux"],
    yesLabel: "Condenação", noLabel: "Absolvição de Bolsonaro (voto vencido)",
    src: { o: "STF Notícias", r: "Votos, condenação, dosimetria e acórdão", p: "set/2025" }
  },
  stats: [
    { v: "4 × 1", u: "", k: "Primeira Turma do STF", d: "Mérito decidido por cinco ministros.", l: "jud", src: { o: "STF Notícias", r: "Condenação", p: "set/2025" } },
    { v: "27a 3m", u: "", k: "Pena total", d: "Condenação transitou em julgado e está em execução.", l: "jud", src: { o: "STF Notícias", r: "Dosimetria", p: "set/2025" } },
    { v: "2026", u: "", k: "Revisão criminal", d: "Instrumento excepcional apresentado pela defesa.", l: "fato", src: { o: "STF", r: "Revisão criminal de 2026", p: "2026" } }
  ],
  sections: [
    { h: "Estrutura da acusação", b: [
      { p: "A PGR apresentou Bolsonaro como líder do “Núcleo Crucial” de uma organização que teria atuado de 2021 a janeiro de 2023 para impedir a alternância de poder.", l: "alg" },
      { ul: [
        "ataques à confiabilidade das urnas;",
        "uso de estruturas do governo para sustentar essa narrativa;",
        "reunião ministerial de 5 de julho de 2022;",
        "reunião com embaixadores em 18 de julho;",
        "relatório das Forças Armadas;",
        "operações da PRF no segundo turno;",
        "diferentes versões de minutas de medidas de exceção;",
        "reuniões de Bolsonaro com comandantes militares;",
        "articulações militares e assessores;",
        "planos violentos, incluindo Punhal Verde e Amarelo;",
        "acampamentos diante de quartéis;",
        "8 de janeiro de 2023."
      ], l: "alg", title: "Episódios reunidos pela acusação" },
      { p: "A tese da acusação é de uma sequência progressiva e de divisão de tarefas.", l: "alg" }
    ]},
    { h: "Documentos e planos golpistas", b: [
      { p: "Existiram documentos prevendo ruptura institucional.", l: "fato" },
      { p: "O plano Punhal Verde e Amarelo envolvia monitoramento de autoridades e previa morte ou neutralização de Lula, Geraldo Alckmin e Alexandre de Moraes. Isso demonstra existência de planejamento violento dentro do universo investigado.", l: "fato" },
      { p: "A questão distinta é o nível de conhecimento e participação de Bolsonaro em cada plano específico.", l: "ctx" }
    ]},
    { h: "O que a maioria considerou contra Bolsonaro", b: [
      { seq: ["Deslegitimação eleitoral", "Mobilização do aparato estatal", "Medidas de exceção", "Busca de apoio militar", "Mobilização após a derrota", "Ações concretas do grupo"], l: "jud", title: "A sequência vista pela maioria" },
      { p: "A PGR e a maioria consideraram comprovado que Bolsonaro conheceu e discutiu minutas e buscou apoio de comandantes militares para medidas de ruptura.", l: "jud" }
    ]},
    { h: "Cogitação vs. tentativa", b: [
      { p: "Pensar ou discutir um crime, isoladamente, não é suficiente para tentativa. A disputa foi sobre o momento em que os atos teriam deixado de ser preparatórios e passado a constituir execução.", l: "ctx" },
      { versus: [
        { l: "alg", who: "Defesa", t: "Não houve decreto, estado de defesa, estado de sítio ou ato formal executado por Bolsonaro; minutas discutidas e não assinadas não bastavam." },
        { l: "jud", who: "Maioria da Primeira Turma", t: "A execução já havia começado." }
      ]}
    ]},
    { h: "Voto de Luiz Fux", b: [
      { p: "Fux havia votado anteriormente pelo recebimento da denúncia, reconhecendo indícios suficientes para abrir a ação penal. No mérito, depois da instrução, votou pela absolvição integral de Bolsonaro.", l: "jud" },
      { p: "Fux não disse que toda a investigação era inventada. Votou pela condenação de alguns réus em parte, distinguindo responsabilidades individuais.", l: "jud" },
      { p: "Sua divergência em relação a Bolsonaro incluiu insuficiência de ligação entre sua conduta e os crimes imputados, resistência a responsabilizá-lo automaticamente pelos atos de 8 de janeiro e objeções processuais.", l: "jud" }
    ]},
    { h: "Ponto a ponto: maioria × divergência", b: [
      { matrix: [
        { t: "Punhal Verde e Amarelo", maj: "Analisou o plano como parte da estrutura da organização supostamente liderada por Bolsonaro.", fux: "Distinguiu a participação de pessoas específicas e absolveu Bolsonaro." },
        { t: "Minutas", maj: "A acusação sustenta que Bolsonaro conheceu e discutiu esse material; a maioria considerou isso comprovado.", fux: "—", def: "Discutir documentos não adotados não constitui ato executório suficiente." },
        { t: "Forças Armadas", maj: "Viu tentativa concreta de obter adesão militar.", fux: "Considerou insuficiente a prova para responsabilizar vários acusados e deu interpretação jurídica diferente a parte dessas reuniões." },
        { t: "8 de janeiro", maj: "Tratou 8 de janeiro como estágio final de uma sequência iniciada anteriormente.", fux: "Rejeitou a responsabilização de Bolsonaro pelos crimes daquele dia a partir apenas de manifestações políticas anteriores." },
        { t: "Primeira Turma vs. Plenário", maj: "Pelas regras regimentais vigentes, o caso podia ser julgado pela Primeira Turma.", fux: "O STF não deveria julgar o caso; subsidiariamente, o processo deveria ter ido ao Plenário." },
        { t: "Ampla defesa", maj: "Rejeitou a preliminar.", fux: "Acolheu a crítica e considerou haver cerceamento de defesa.", def: "Volume gigantesco de material e prazo insuficiente para análise." },
        { t: "Mauro Cid", maj: "A acusação não dependia apenas da palavra de Cid; outros elementos corroboravam partes relevantes.", fux: "Considerou a colaboração juridicamente válida, mas chegou a conclusão diferente sobre o que ela permitia imputar a Bolsonaro.", def: "Contradições em depoimentos." }
      ]},
      { p: "Não existiu apenas um documento oficial e assinado chamado “a minuta do golpe”. Foram encontrados diferentes documentos e versões propondo medidas excepcionais.", l: "fato" },
      { p: "“Pessoas próximas elaboraram um plano de assassinato” não é sinônimo automático de “Bolsonaro conhecia e aprovava esse plano”.", l: "met" }
    ]},
    { h: "Primeira Turma vs. Plenário", b: [
      { p: "Fato objetivo: o mérito foi decidido por cinco ministros, com placar 4 a 1 para condenar Bolsonaro.", l: "fato" },
      { p: "Não se pode afirmar como fato que o resultado seria diferente no Plenário.", l: "met" }
    ]},
    { h: "Pena", b: [
      { kv: { l: "jud", title: "Total: 27 anos e 3 meses", rows: [
        ["Organização criminosa armada", "7 anos e 7 meses"],
        ["Abolição violenta do Estado Democrático de Direito", "6 anos e 6 meses"],
        ["Golpe de Estado", "8 anos e 2 meses"],
        ["Dano qualificado", "2 anos e 6 meses"],
        ["Deterioração de patrimônio tombado", "2 anos e 6 meses"]
      ], src: { o: "STF Notícias", r: "Dosimetria", p: "set/2025" } } }
    ]},
    { h: "Revisão criminal", b: [
      { p: "Em 2026, a defesa apresentou revisão criminal no STF. A condenação original transitou em julgado e está em execução; a revisão é instrumento excepcional separado.", l: "fato", src: { o: "STF", r: "Revisão criminal de 2026", p: "2026" } },
      { status: ["definitiva", "execucao", "revisao"] }
    ]},
    { h: "Regra editorial", b: [
      { box: { l: "met", title: "Duas simplificações evitadas", ul: ["“Não existia nenhuma prova.”", "“Como houve condenação, qualquer interpretação contrária está objetivamente errada.”"] } },
      { box: { l: "met", title: "Forma correta", p: ["Bolsonaro foi condenado por 4 a 1 na Primeira Turma. A maioria entendeu que o conjunto de fatos demonstrava sua liderança na tentativa de ruptura. Luiz Fux discordou quanto à responsabilidade individual de Bolsonaro e apontou problemas de competência e defesa."] } }
    ]}
  ],
  sources: [
    "STF Notícias — recebimento da denúncia, votos, condenação, dosimetria e acórdão.",
    "STF — revisão criminal de 2026."
  ]
},

/* ---------------------------------------------------- 07 */
{
  id: "governo-lula", num: "06", years: "2023–2026",
  kicker: "Lula retorna ao poder",
  title: "Um quadro mais complexo",
  file: "07-governo-lula-2023-2026.md",
  labels: ["dado", "fato", "ctx", "ana"],
  alt: true,
  home: [
    { p: "O terceiro governo Lula produziu quadro econômico mais complexo do que narrativas simples de sucesso ou desastre.", l: "ana" },
    { p: "O PIB cresceu 3,2% em 2023, 3,4% em 2024 e 2,3% em 2025. O mercado de trabalho também foi forte: taxa média anual de desemprego de 5,6% em 2025 e 5,3% no trimestre encerrado em julho de 2026." },
    { p: "Ao mesmo tempo, a situação fiscal piorou. O Governo Central saiu de superávit em 2022 para déficit de cerca de R$ 230,5 bilhões em 2023. A dívida bruta chegou a 82,5% do PIB em julho de 2026." },
    { p: "Nos escândalos administrativos, o caso mais relevante é o esquema de descontos indevidos do INSS, que operou entre 2019 e 2024 e atingiu milhões de beneficiários. Não há base pública para imputar pessoalmente o esquema a Lula.", l: "ctx" },
    { p: "Na segurança, homicídios continuaram caindo, enquanto estudos documentam expansão territorial de facções como PCC e Comando Vermelho." }
  ],
  stats: [
    { v: "5,6", u: "%", k: "Desemprego médio 2025", d: "Menor da série da PNAD Contínua, iniciada em 2012.", l: "dado", src: { o: "IBGE", r: "PNAD Contínua", p: "2025" } },
    { v: "82,5", u: "% PIB", k: "Dívida bruta, jul/2026", d: "73,8% no fim de 2023; 76,1% no fim de 2024.", l: "dado", src: { o: "Banco Central", r: "Dívida bruta", p: "jul/2026" } },
    { v: "42.590", u: "", k: "Homicídios em 2024", d: "Menor resultado da série usada pelo Atlas da Violência 2026.", l: "dado", src: { o: "Ipea / FBSP", r: "Atlas da Violência 2026", p: "2024" } }
  ],
  sections: [
    { h: "PIB", b: [
      { bars: { l: "dado", unit: "%", rows: [ { n: "2023", v: 3.2 }, { n: "2024", v: 3.4 }, { n: "2025", v: 2.3 }, { n: "1º sem. 2026", v: 1.9, s: "vs. mesmo período de 2025" } ], src: { o: "IBGE", r: "PIB", p: "2023–1º sem. 2026" } } },
      { p: "Não atribuir todo crescimento exclusivamente ao governo; safra, commodities, crédito, juros e ambiente externo também importam.", l: "met" }
    ]},
    { h: "Emprego", b: [
      { stats: [
        { v: "5,6", u: "%", k: "Desemprego médio anual 2025", d: "Menor da série da PNAD Contínua iniciada em 2012.", l: "dado", src: { o: "IBGE", r: "PNAD Contínua", p: "2025" } },
        { v: "5,3", u: "%", k: "Trimestre até jul/2026", l: "dado", src: { o: "IBGE", r: "PNAD Contínua", p: "trimestre encerrado em jul/2026" } }
      ]},
      { p: "A informalidade permaneceu elevada.", l: "ctx" }
    ]},
    { h: "Inflação", b: [
      { bars: { l: "dado", unit: "%", title: "IPCA", rows: [ { n: "2023", v: 4.62 }, { n: "2024", v: 4.83 }, { n: "2025", v: 4.26 } ], src: { o: "IBGE", r: "IPCA", p: "2023–2025" } } },
      { p: "Em 2024, alimentação subiu 7,69%, contribuindo para percepção cotidiana pior do que o índice agregado.", l: "dado" },
      { p: "A expressão “inflação fora de controle” não descreve tecnicamente todo o período.", l: "met" }
    ]},
    { h: "Fiscal", b: [
      { stats: [
        { v: "~230,5", u: "R$ bi", k: "Déficit primário — Governo Central 2023", d: "2,12% do PIB.", l: "dado", src: { o: "Tesouro Nacional", r: "Resultado primário", p: "2023" } }
      ]},
      { p: "Parte relevante teve componentes extraordinários, incluindo precatórios e gastos autorizados pela PEC da Transição. Em 2024 houve forte melhora do resultado.", l: "ctx" },
      { p: "O governo criou novo arcabouço fiscal pela LC 200/2023.", l: "fato", src: { o: "Planalto", r: "LC 200/2023" } },
      { p: "A discussão factual central é se o novo regime é suficiente para estabilizar a dívida.", l: "ana" }
    ]},
    { h: "Dívida", b: [
      { bars: { l: "dado", unit: "% PIB", title: "Dívida bruta", rows: [ { n: "fim de 2023", v: 73.8 }, { n: "fim de 2024", v: 76.1 }, { n: "jul/2026", v: 82.5 } ], src: { o: "Banco Central", r: "Estatísticas fiscais", p: "2023–jul/2026" } } },
      { p: "Esse é um dos pontos mais claros de preocupação fiscal.", l: "ana" }
    ]},
    { h: "Estratégia de arrecadação", b: [
      { p: "Desde 2023, a equipe econômica adotou várias medidas de aumento de receita ou fechamento de brechas tributárias, incluindo tributação de fundos fechados e ativos no exterior e nova regulamentação das apostas.", l: "fato" },
      { p: "A interpretação política pode divergir entre “redução de privilégios” e “sustentar gasto com mais arrecadação”.", l: "ana" }
    ]},
    { h: "Reforma tributária", b: [
      { p: "A reforma do consumo avançou com a EC 132 e regulamentação posterior, criando IBS, CBS e Imposto Seletivo.", l: "fato", src: { o: "Planalto", r: "EC 132 e regulamentação" } },
      { p: "É reforma aprovada, não benefício futuro já realizado.", l: "ctx" }
    ]},
    { h: "Estatais", b: [
      { p: "Déficit primário de estatais não é sinônimo automático de prejuízo contábil. Manchetes que misturam os dois conceitos confundem o leitor.", l: "met" }
    ]},
    { h: "INSS — Operação Sem Desconto", b: [
      { p: "Em abril de 2025, PF e CGU deflagraram operação sobre descontos associativos supostamente não autorizados em aposentadorias e pensões.", l: "fato", src: { o: "AGU / PF / CGU / INSS / STF", r: "Operação Sem Desconto", p: "abr/2025–2026" } },
      { p: "O esquema investigado operou entre 2019 e 2024, atravessando governos diferentes. Milhões de beneficiários informaram não reconhecer descontos e o governo iniciou ressarcimentos. Houve prisão de ex-presidente do INSS e novas medidas investigativas em 2026.", l: "fato" },
      { status: ["investigacao", "sem_imputacao"] },
      { box: { l: "ctx", title: "Conclusão factual", p: ["Falha grave e prolongada de controles do Estado, investigada por órgãos estatais; sem base pública para atribuir participação pessoal a Lula."] } }
    ]},
    { h: "Juscelino Filho", b: [
      { p: "Foi denunciado pela PGR em investigação relacionada a supostos desvios de emendas parlamentares. Os fatos investigados dizem respeito principalmente ao período em que era deputado federal, antes de assumir o ministério.", l: "alg" },
      { status: ["denuncia"] },
      { p: "“Ministro do governo Lula foi denunciado” é factual; “esquema de corrupção do governo Lula” não é descrição automática do caso.", l: "met" }
    ]},
    { h: "Banco Master", b: [
      { p: "Escândalo financeiro e regulatório ocorrido durante o mandato, mas não deve ser apresentado automaticamente como corrupção de Lula sem ligação criminal individual demonstrada.", l: "ctx" }
    ]},
    { h: "PCC e Comando Vermelho", b: [
      { p: "Não há base sólida para afirmar genericamente que “Lula ou o PT têm relação criminosa com PCC ou Comando Vermelho”. O problema das facções é real e pode ser documentado sem essa imputação coletiva.", l: "ctx" }
    ]},
    { h: "Segurança", b: [
      { p: "Atlas da Violência 2026: 42.590 homicídios em 2024, menor resultado da série usada pelo estudo. Dados de 2025 indicaram nova queda nas mortes violentas intencionais.", l: "dado", src: { o: "Ipea / FBSP", r: "Atlas da Violência 2026", p: "2024–2025" } },
      { p: "Ao mesmo tempo, estudos do Ipea documentam expansão das facções para cidades médias e pequenas e rotas estratégicas.", l: "fato", src: { o: "Ipea", r: "Estudos sobre facções" } },
      { p: "Menos homicídios não significa necessariamente menor poder do crime organizado.", l: "ana" }
    ]},
    { h: "Regra federativa", b: [
      { p: "Segurança é fortemente compartilhada com estados. Polícias Militar e Civil são estaduais. O governo federal controla PF, PRF, fronteiras, inteligência, financiamento e coordenação nacional.", l: "ctx" },
      { p: "Não atribuir cada alta ou queda de homicídios diretamente ao presidente.", l: "met" }
    ]},
    { h: "Síntese", b: [
      { ledger: {
        l: "ana",
        plus: ["Crescimento", "Emprego forte", "Inflação abaixo dos picos da pandemia", "Queda de homicídios"],
        minus: ["Dívida crescente", "Dificuldade de equilíbrio fiscal", "Dependência de novas receitas", "Escândalo do INSS", "Expansão territorial de facções"],
        plusTitle: "Fatos favoráveis", minusTitle: "Problemas concretos"
      }}
    ]}
  ],
  sources: [
    "IBGE — PIB, emprego e inflação.",
    "Banco Central / Tesouro — dívida e resultado fiscal.",
    "Planalto — arcabouço e reforma tributária.",
    "AGU / PF / CGU / INSS / STF — Operação Sem Desconto.",
    "Ipea / Atlas da Violência / FBSP — segurança pública."
  ]
},

/* ---------------------------------------------------- 08 */
{
  id: "por-que-2026-importa", num: "07", years: "2026",
  kicker: "O que está em jogo",
  title: "Presidência, Senado e STF",
  file: "08-por-que-2026-importa.md",
  labels: ["fato", "ed"],
  isStakes: true,
  home: [
    { p: "Em 4 de outubro de 2026, o Brasil não escolherá apenas o próximo presidente. Serão eleitos governadores, todos os 513 deputados federais, deputados estaduais e distritais e 54 dos 81 senadores — dois por estado e pelo Distrito Federal. É a renovação de dois terços do Senado.", l: "fato" },
    { p: "O presidente indica ministros do STF, mas cada nome precisa ser aprovado por maioria absoluta do Senado: pelo menos 41 dos 81 senadores. O Senado também possui competência constitucional para processar e julgar ministros do STF por crimes de responsabilidade. Uma condenação exige dois terços da Casa: 54 votos.", l: "fato" },
    { p: "Pelas regras atuais, Luiz Fux completa 75 anos em abril de 2028, Cármen Lúcia em abril de 2029 e Gilmar Mendes em dezembro de 2030. Isso cria pelo menos três vagas previstas durante o mandato presidencial 2027–2030, salvo mudança normativa relevante.", l: "fato" }
  ],
  stats: [
    { v: "54", u: "de 81", k: "Cadeiras do Senado em disputa", d: "Dois votos por eleitor. As outras 27 seguem até 2031.", l: "fato", src: { o: "TSE / Senado Federal", r: "Calendário eleitoral 2026" } },
    { v: "41", u: "votos", k: "Para aprovar ministro do STF", d: "Maioria absoluta do Senado.", l: "fato", src: { o: "Constituição Federal" } },
    { v: "3", u: "vagas", k: "Aposentadorias previstas no STF até 2030", d: "Fux, Cármen Lúcia e Gilmar Mendes.", l: "fato", src: { o: "STF", r: "Biografias e composição da Corte" } }
  ],
  sections: [
    { h: "Renovação do Senado", b: [
      { p: "Em 2026, cada eleitor terá dois votos para o Senado. Das 81 cadeiras, 54 estarão em disputa. As outras 27, eleitas em 2022, continuam até 2031.", l: "fato", src: { o: "Senado Federal / TSE", r: "Calendário eleitoral 2026" } },
      { senate: { total: 81, open: 54 } },
      { p: "Essa composição influencia sabatinas, indicações ao STF e processos de responsabilidade.", l: "ctx" }
    ]},
    { h: "O presidente não controla sozinho", b: [
      { p: "O presidente dirige a administração federal, nomeia ministros de Estado, sanciona ou veta leis e exerce outras competências constitucionais.", l: "fato", src: { o: "Constituição Federal" } },
      { ul: ["mudar a Constituição sozinho;", "aprovar leis sozinho;", "nomear ministro do STF sem Senado;", "remover ministro do STF apenas por discordância política."], l: "fato", title: "Mas não pode:" }
    ]},
    { h: "Como nasce um ministro do STF", b: [
      { seq: ["Presidente escolhe um nome", "Sabatina na CCJ", "Plenário do Senado: ≥ 41 votos"], l: "fato", title: "Rito" }
    ]},
    { h: "A vaga de Barroso e o precedente de 2026", b: [
      { p: "Luís Roberto Barroso anunciou aposentadoria em 2025.", l: "fato" },
      { p: "O Senado rejeitou a indicação de Jorge Messias em abril de 2026 por 34 votos favoráveis, 42 contrários e uma abstenção. Foi a primeira rejeição de um indicado ao STF pelo Senado desde 1894.", l: "fato", src: { o: "Senado Federal", r: "Indicação de Jorge Messias", p: "abr/2026" } },
      { p: "Isso demonstra na prática que indicação presidencial não significa nomeação automática.", l: "ana" }
    ]},
    { h: "Três aposentadorias previstas", b: [
      { timeline: { l: "fato", rows: [
        { d: "26/04/2028", t: "Luiz Fux completa 75 anos" },
        { d: "abr/2029", t: "Cármen Lúcia completa 75 anos" },
        { d: "30/12/2030", t: "Gilmar Mendes completa 75 anos" }
      ], src: { o: "STF", r: "Biografias e composição da Corte" } } },
      { p: "Com as regras atuais, todas ocorrem dentro do próximo mandato presidencial. Se a vaga de Barroso ainda estiver aberta na posse de 2027, a influência potencial do próximo presidente pode chegar a quatro indicações.", l: "fato" },
      { p: "Ministros não são subordinados ao presidente que os indicou.", l: "ctx" }
    ]},
    { h: "Impeachment de ministro do STF", b: [
      { p: "A Constituição atribui ao Senado competência privativa para processar e julgar ministros do STF por crimes de responsabilidade. Qualquer cidadão pode apresentar denúncia nas hipóteses legais. Condenação exige 54 votos.", l: "fato", src: { o: "Constituição Federal / Lei 1.079/1950" } },
      { p: "“Maioria no Senado = tirar ministro” não é uma equação automática.", l: "met" }
    ]},
    { h: "41, 49 e 54", b: [
      { thresholds: [
        { n: "41", t: "votos no Senado", d: "Aprovar indicado ao STF." },
        { n: "49 + 308", t: "senadores + deputados", d: "3/5 necessários em cada Casa para aprovar PEC." },
        { n: "54", t: "votos no Senado", d: "Condenação em processo de responsabilidade contra ministro do STF." }
      ], l: "fato" }
    ]},
    { h: "Tese editorial", b: [
      { box: { l: "ed", title: "Opinião editorial", p: ["O projeto interpreta o período recente como crise de equilíbrio entre os Poderes, com expansão do papel de STF/TSE em investigação, discurso político e processos criminais.", "Essa é opinião editorial. Os fatos que sustentam a leitura estão nos capítulos anteriores."] } },
      { p: "A consequência para 2026 é factual: Presidência e Senado terão impacto direto sobre a composição futura do Supremo e sobre mecanismos constitucionais de controle.", l: "fato" }
    ]},
    { h: "Daqui em diante o método muda", b: [
      { method: [
        { k: "A história", t: "explica o que está em jogo.", href: "#/historia" },
        { k: "Os perfis", t: "mostram quem está disputando.", href: "#/candidatos" },
        { k: "As pesquisas", t: "mostram como a disputa está agora.", href: "#/pesquisas" }
      ]}
    ]}
  ],
  sources: [
    "Constituição Federal.",
    "Lei 1.079/1950.",
    "Senado Federal — calendário eleitoral, sabatinas e indicação de Jorge Messias.",
    "STF — biografias e composição da Corte.",
    "TSE — calendário 2026."
  ]
}
];
