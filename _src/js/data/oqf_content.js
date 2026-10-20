/* =========================================================
   O QUE FUNCIONA? / WHAT WORKS? — textos e estrutura (PT e EN)
   Só fatos históricos estáveis (datas de Estado, fronteiras), regras de método
   tiradas das metodologias das Auditorias 1 (v0.3) e 2 (v0.2) e textos de interface.
   Nenhum valor estatístico mora aqui: os dados vêm de assets/data/oqf/ (prepare_data.py).
   ========================================================= */
EB.oqfAll = {};


EB.oqfAll.pt = {
  nav: "O que funciona?",
  sub: { "": "Abertura", mapa: "Mapa", perfil: "Países", comparar: "Comparador", metodologia: "Metodologia" },
  title: "O que funciona?",
  subtitle: "Socialismo, capitalismo e os resultados de 80 anos de políticas econômicas.",
  question: "O que 80 anos de história revelam sobre Estado, mercado e prosperidade?",
  intro: [
    "Desde 1945, países do mundo inteiro testaram combinações muito diferentes de Estado e mercado: planejamento central, social-democracia, liberalização, estatização, privatização, reformas e contrarreformas. O debate sobre o que deu certo costuma ser travado com slogans.",
    "Esta seção propõe outro caminho: olhar país por país, ano a ano, quem governou, o que mudou na economia e o que aconteceu com a vida das pessoas — com fontes, versões e limitações à vista."
  ],
  punch: "Menos discurso. Mais história. Mais dados.",
  axes: [
    { k: "01", q: "Quem governou?", d: "Governos, mandatos e entidades de Estado, com as mudanças de fronteira e de regime.", a: "Auditoria 1", st: "ref" },
    { k: "02", q: "O que fizeram?", d: "Medidas econômicas classificadas por relevância (A–D) e por direção em dez dimensões, sem rótulo ideológico único.", a: "Auditoria 1", st: "prep" },
    { k: "03", q: "O que aconteceu?", d: "Saúde, educação, renda, pobreza, mediana e desigualdade — e, depois, os indicadores macroeconômicos.", a: "Auditorias 2 e 3", st: "demo" }
  ],
  guard: [
    ["met", "Nada aqui é ranking de governos. Antes e depois não é causa e efeito."],
    ["met", "Séries de entidades diferentes (RFA, RDA, Alemanha unificada, URSS, Rússia, Ucrânia) nunca são emendadas."],
    ["met", "Onde não há dado verificado, a página diz “Dados em preparação”."]
  ],
  strip_h: "1945 → 2026",
  strip: [
    [1945, "Fim da Segunda Guerra Mundial; Alemanha ocupada em quatro zonas."],
    [1949, "Criação da RFA (maio) e da RDA (outubro)."],
    [1961, "Construção do Muro de Berlim."],
    [1964, "Brasil: início do regime militar, que dura até 1985."],
    [1988, "Brasil: Constituição Federal de 1988."],
    [1989, "Abertura do Muro de Berlim."],
    [1990, "Reunificação alemã (3 de outubro)."],
    [1991, "Independência da Ucrânia e dissolução da URSS."],
    [1994, "Brasil: o real entra em circulação."],
    [2014, "Rússia anexa a Crimeia; a Assembleia Geral da ONU não reconhece."],
    [2022, "Invasão russa em larga escala da Ucrânia."],
    [2026, "Hoje: em 2026 só há projeções, nenhum dado observado."]
  ],
  strip_note: "Datas de referência histórica. Os documentos primários serão vinculados quando a base de entidades da Auditoria 1 for incorporada ao site.",
  cards_h: "Explore",
  cards: [
    ["mapa", "Mapa-múndi", "Escolha o ano e a camada (Política, Prosperidade, Economia). Cada país mostra que dado existe — e o que ainda não existe."],
    ["governantes", "Governantes", "Quem governou Brasil, Alemanha, Rússia e Ucrânia desde 1945, por regime e partido."],
    ["perfil", "Países-piloto", "Brasil, Alemanha, Rússia e Ucrânia: entidades, fronteiras, linha do tempo, medidas e indicadores."],
    ["comparar", "Comparador histórico", "Países, períodos e antes/depois de uma reforma, em gráfico e tabela, com unidade, fonte e limites."],
    ["metodologia", "Metodologia", "As três auditorias, confiabilidade A–D, comparabilidade C1–C4 e regras de publicação."]
  ],
  status_h: "Situação das auditorias",

  /* estados de dado (mapa, perfis, comparador) */
  states: {
    ok: ["Disponível", "Publicável sem ressalva especial (Auditoria 2, §12)."],
    res: ["Com ressalvas", "Publicável com ressalva: comparabilidade C2/C4, reconstrução documentada ou território atual reconstruído."],
    exp: ["Exploratório", "Confiabilidade C, comparabilidade C3 ou valor sinalizado: não serve para conclusão."],
    proj: ["Projeção", "Projeção (WPP 2024). Não é resultado observado e não conta como cobertura."],
    prelim: ["Preliminar", "Dado preliminar de fonte oficial. Nenhuma série preliminar foi identificada no piloto."],
    np: ["Não publicável", "Existe pesquisa, mas o critério de publicação ainda não foi atingido."],
    ref: ["Referência pública", "Lista pública conferida; a conferir com a Auditoria 1."],
    demo: ["Dados demonstrativos", "Séries sintéticas para testar a interface. Não são observações."],
    prep: ["Dados em preparação", "País fora do piloto ou sem dado revisado."],
    pend: ["Pesquisa pendente", "Auditoria 3 (Economia) ainda não começou."],
    gap: ["Sem dado no ano", "Nenhuma fonte com dado para este ano dentro da vigência da entidade."]
  },
  types: { o: "medido", e: "estimado", p: "projeção", r: "reconstrução histórica", d: "calculado a partir da fonte" },
  cats: { P: "Publicável", R: "Com ressalva", X: "Exploratório", N: "Não publicável" },
  layers: { pol: "Política", pros: "Prosperidade", eco: "Economia" },
  layer_note: {
    pol: "Classificação de governos (Auditoria 1). Nenhum perfil atingiu o critério de publicação: cobertura das reformas de nível A com mediana de 6% (faixa 0–45%), contra o gatilho de 80%.",
    pros: "Indicadores de prosperidade (Auditoria 2). Só o piloto (Brasil, Alemanha, Rússia, Ucrânia) tem camada de publicação; a expansão mundial existe sem revisão manual e não é carregada aqui.",
    eco: "Indicadores macroeconômicos (Auditoria 3). Pesquisa pendente: a interface está pronta, sem valores."
  },
  demo_banner: "Dados demonstrativos",
  demo_text: "Os números e gráficos desta seção são séries sintéticas, geradas só para testar a interface. Não são observações históricas e não devem ser citados. Os valores reais virão dos arquivos da Auditoria 2 (v0.2).",
  real_banner: "Dados da Auditoria 2",

  map_h: "Mapa-múndi",
  map_dek: "Escolha o ano e a camada. As cores mostram **que tipo de dado existe**, não resultados: nenhum país é pintado por desempenho.",
  year: "Ano", layer: "Camada", play: "Reproduzir", pause: "Pausar",
  map_aria: "Mapa-múndi: escolha um país",
  borders_note: "Fronteiras atuais (Natural Earth 1:110m, domínio público), usadas só como referência visual. A entidade que existia em cada ano aparece no painel. O site adota as fronteiras reconhecidas internacionalmente: a Crimeia é território da Ucrânia, ocupado pela Rússia desde 2014 (AGNU, Res. 68/262).",
  crimea: "Crimeia — Ucrânia, ocupada pela Rússia desde 2014",
  pick_hint: "Clique ou toque num país. Os países-piloto abrem o perfil completo.",
  panel_empty: "Nenhum país selecionado.",
  in_year: "Em {y}",
  entity_then: "Entidade no ano",
  open_profile: "Abrir perfil",
  add_cmp: "+ Comparador", in_cmp: "✓ No comparador",
  not_pilot: "Este país ainda não faz parte do piloto. Dados em preparação.",
  y2026: "2026: só existem projeções (WPP 2024). Observado: nenhuma série. Preliminar: nenhuma série identificada.",
  legend_h: "Legenda",
  sel_h: "Seleção para o comparador",
  sel_go: "Comparar seleção →",

  prof_h: "Países-piloto",
  prof_dek: "O Lote 0 das auditorias cobre quatro países escolhidos por atravessarem regimes econômicos muito diferentes desde 1945.",
  prof_sections: { hist: "História e fronteiras", ent: "Entidades de Estado", gov: "Linha do tempo de governos", pol: "Classificação política", ref: "Medidas e reformas", pros: "Prosperidade", eco: "Indicadores macroeconômicos", src: "Fontes e versões" },
  gov_pending: "Os mandatos vêm do arquivo governo_ano da Auditoria 1 (Lote 0 v0.3), que ainda não foi incorporado ao site. Nenhum governante é listado antes disso.",
  gov_rule: "Quando entrar: cada ano é ligado aos governos pelos dias no cargo; quem cruzar com indicadores escolhe e declara a convenção (governo em 31/12 ou governo com mais dias). Nenhum ano é atribuído a um governante por padrão.",
  pol_pending: "Não publicável. A Auditoria 1 descreve cada governo pelo que mudou em cada dimensão (A–J), sem rótulo ideológico único. Hoje nenhum perfil é utilizável: a cobertura das medidas de nível A fica entre 0% e 45% (mediana 6%), e o gatilho é 80% de cobertura com direção lida no texto em 80% dos efeitos.",
  dims: [["A", "Tributação"], ["B", "Gasto e orçamento"], ["C", "Propriedade estatal"], ["D", "Mercado e concorrência"], ["E", "Comércio e capitais"], ["F", "Moeda e sistema financeiro"], ["G", "Trabalho e previdência"], ["H", "Propriedade privada e terra"], ["I", "Planejamento"], ["J", "Serviços e políticas sociais"]],
  dim_cell: "sem dado publicável",
  ref_note: "Exemplo da metodologia da Auditoria 1 para ilustrar o nível A (reforma estrutural). Não é avaliação nem perfil de governo.",
  ref_more: "A lista de medidas por governo depende da revisão humana dos atos marcados como A pela triagem automática (precisão de 32% nessa classe).",
  pros_note: "Pilares separados, nunca somados num índice. Cada gráfico mostra uma entidade por linha; entidades diferentes não se emendam.",
  eco_pending: "Auditoria 3 pendente. Os indicadores macroeconômicos (incluindo inflação e juros, que a Auditoria 2 deixou de fora) aparecerão aqui.",
  no_data: "Dados em preparação",
  last_obs: "Último dado",
  open_cmp: "Abrir no comparador →",
  srcs_demo: "Modo demonstrativo: nenhuma fonte de dados está ligada. Fontes previstas para cada indicador (Auditoria 2, §4):",

  cmp_h: "Comparador histórico",
  cmp_dek: "Compare países, períodos e o antes e depois de uma data. O gráfico mostra **associação no tempo**, não causa: nenhum resultado é atribuído a um governante.",
  modes: { paises: "Países", reforma: "Antes e depois", governos: "Governos sucessivos" },
  c_countries: "Países", c_ind: "Indicador", c_from: "De", c_to: "Até", c_mark: "Marcador (ano)",
  c_mark_hint: "Escolha um ano ou um exemplo de reforma de nível A citado na metodologia.",
  c_presets: "Exemplos",
  c_table: "Tabela",
  c_unit: "Unidade", c_src: "Fonte", c_lim: "Limitações",
  c_lims: [
    "Linhas de entidades diferentes não se ligam: RFA, RDA e Alemanha unificada; URSS e Rússia; RSS da Ucrânia e Ucrânia.",
    "Valores do território atual antes da condição de Estado (ex.: Ucrânia antes de 1992) são reconstrução, com nota rebaixada e comparabilidade C3.",
    "Projeções (2024–2026) aparecem vazadas e não contam como resultado.",
    "Não compare séries de fontes, vintages ou bases de PPC diferentes."
  ],
  c_causal: "Antes e depois não é causa e efeito. Outras mudanças (preços internacionais, guerras, demografia, crises) acontecem ao mesmo tempo, e reformas têm efeitos defasados.",
  c_gov_pending: "Governos sucessivos depende da Auditoria 1 (governo_ano e ponte 09_ponte_auditoria1). Em preparação. Quando entrar, o gráfico mostrará faixas de mandato sem atribuir resultados, e mandatos com menos de 1 ano não entram em comparação.",
  c_empty: "Nenhuma série com dado para esta escolha.",
  c_marker: "Marcador escolhido pelo leitor",
  c_year: "Ano",
  presets: [
    ["BRA", 1991, "Lei 8.213/1991 — planos de benefícios da previdência"],
    ["DEU", 1994, "Pflege-Versicherungsgesetz (seguro de cuidados de longa duração), 1994"],
    ["RUS", 1990, "Lei das empresas e da atividade empresarial (RSFS da Rússia, 1990)"],
    ["UKR", 2010, "Lei dos princípios do mercado de gás (Ucrânia, 2010)"]
  ],

  meth_h: "Metodologia",
  meth_dek: "Três auditorias independentes, com regras publicadas antes dos resultados. Esta página resume o que já está decidido e o que falta.",
  audits: [
    { k: "Auditoria 1", h: "Governos e medidas econômicas", v: "Metodologia v0.3 · 19/10/2026 · corte 11/10/2026", st: "np", stl: "Em andamento · perfis não publicáveis",
      pts: ["Lote 0: Brasil, Alemanha, URSS/Rússia e Ucrânia.", "94.572 atos triados automaticamente em quatro níveis de relevância (A reforma estrutural, B setorial relevante, C alcance limitado, D sem conexão econômica).", "Relevância não é direção: o nível sai do alcance da mudança, nunca de ela ampliar ou reduzir o Estado.", "Direção por efeito, em dez dimensões (A–J); efeitos opostos de uma lei ficam separados e não se compensam.", "No teste reservado, a triagem recupera 54% dos atos A; entre os que ela prevê como A, só 32% são A. Por isso ela prioriza a revisão humana e não classifica sozinha.", "Quantidade de leis nunca mede tamanho do Estado nem qualidade de governo.", "Pendências: dupla codificação (≥200 atos, kappa), revisão de todos os A, leitura do texto para a direção, revisão por especialista de cada país."] },
    { k: "Auditoria 2", h: "Prosperidade das populações, 1945–2026", v: "Metodologia v0.2 · 20/10/2026 · corte 11/10/2026", st: "res", stl: "Base coletada · camada de publicação no piloto",
      pts: ["210 entidades (193 membros da ONU, 2 observadores, Taiwan, Kosovo e 13 entidades históricas); núcleo de 195 para a cobertura.", "19 fontes baixadas (F01–F19), cada uma com URL, data, tamanho e SHA-256 no manifesto.", "Seis pilares separados, nunca somados: saúde, educação, renda per capita, pobreza, mediana real e desigualdade.", "Nada interpolado, extrapolado ou emendado. O IDH oficial e o AHDI não foram unidos.", "17 das 19 fontes têm versão comprovadamente anterior ao corte; WID (posterior) e OCDE (sem data) ficam fora da série publicável.", "Quase nenhuma série chega a 2026: o último dado não projetado é de 2023 a 2025."] },
    { k: "Auditoria 3", h: "Economia", v: "—", st: "pend", stl: "Pesquisa pendente",
      pts: ["Indicadores macroeconômicos, incluindo inflação e juros (fora da Auditoria 2).", "A interface do mapa, dos perfis e do comparador já tem a camada Economia, sem valores."] }
  ],
  rel_h: "Confiabilidade (A–D)",
  rel: [["A", "Alta: medição direta oficial e harmonizada (registro civil, microdados completos)."], ["B", "Boa: estimativas oficiais harmonizadas ou pesquisas de padrão internacional, com incerteza conhecida."], ["C", "Limitada: muita imputação, reconstruções históricas ou compilações heterogêneas."], ["D", "Inadequada para comparação: imputação sem base primária, projeção ou registro de baixa qualidade."]],
  cmp2_h: "Comparabilidade (C1–C4)",
  cmpb: [["C1", "Comparável entre países e no tempo dentro da série."], ["C2", "Comparável no tempo para o mesmo país; entre países, com cautela."], ["C3", "Comparabilidade limitada (reconstruções, valores anteriores à condição de Estado)."], ["C4", "Não comparável (linhas nacionais de pobreza, estimativas nacionais de mortalidade materna)."]],
  elig_h: "Regras de publicação (Auditoria 2, §12)",
  elig: [["Não publicável", "Projeção; índice com dimensão política (AHDI); versão ou território não comprovados; confiabilidade D."], ["Exploratório", "Valor sinalizado até revisão; confiabilidade C; comparabilidade C3; reconstrução sem nota A/B."], ["Com ressalva", "Reconstrução documentada com nota A/B; A/B com C2 ou C4; território atual reconstruído."], ["Publicável", "A/B, C1, Estado da época, versão verificada."]],
  types_h: "Tipos de observação",
  types_d: [["medido", "Estatística oficial ou pesquisa publicada."], ["estimado", "Modelado pela instituição a partir de dados primários."], ["projeção", "Projeção. No mapa de 2026, é o único tipo disponível."], ["reconstrução histórica", "Reconstrução acadêmica, ou território atual antes da condição de Estado."], ["calculado a partir da fonte", "Conta simples sobre valores da mesma fonte."]],
  terr_h: "Fronteiras e entidades",
  terr: ["Nenhum valor é transferido entre entidades.", "Estados históricos recebem só os próprios valores, dentro da vigência.", "Rússia e Ucrânia contam como Estados a partir de 1992 (primeiro ano civil completo); antes disso, valores do território atual são reconstrução.", "Alemanha de 1949 a 1990: RFA e RDA juntas, nunca com atribuição única. Fontes que não declaram o território ficam marcadas “a verificar”.", "Mapa com fronteiras atuais e reconhecidas internacionalmente; a entidade de cada ano aparece no texto."],
  proto_h: "Como este protótipo usa os dados",
  proto: ["O site lê apenas o manifesto e as séries de cada país-piloto, sob demanda (alguns KB por país). A base mundial não é carregada no navegador.", "O adaptador _src/oqf/prepare_data.py converte o arquivo 08_publicacao_piloto.csv da Auditoria 2 (e, opcionalmente, o governo_ano da Auditoria 1).", "Sem esses arquivos, ele gera dados demonstrativos sintéticos — e o site mostra a faixa “Dados demonstrativos” em todas as telas. Os dois modos nunca convivem."],
  files_h: "Arquivos esperados",
  files: [["Auditoria 2 v0.2", "dados/08_publicacao_piloto.csv · dados/09_ponte_auditoria1.csv"], ["Auditoria 1 Lote 0 v0.3", "governo_ano · crosswalk_entidades · relatorios/v03_perfis_governo.csv"], ["Auditoria 3", "a definir"]],
  file_state: { demo: "Modo atual: demonstrativo (nenhum arquivo de auditoria carregado).", real: "Modo atual: dados da Auditoria 2." },

  /* Países-piloto: fatos históricos estáveis. Datas ISO. */
  countries: {
    BRA: {
      name: "Brasil", entities: [["BRA", "República Federativa do Brasil", 1945, 2026, "Estado durante todo o período."]],
      borders: "Fronteiras externas sem mudança no período. Mudanças internas: capital transferida para Brasília (1960); Acre vira estado (1962); estado da Guanabara (1960–1975); Mato Grosso do Sul (criado em 1977); Rondônia vira estado (1981); Tocantins é criado e Roraima e Amapá viram estados (1988).",
      events: [["1945-10-29", "Fim do Estado Novo."], ["1946-09-18", "Constituição de 1946."], ["1960-04-21", "Capital transferida para Brasília."], ["1964-04-01", "Início do regime militar (até 1985)."], ["1985-03-15", "Posse de governo civil; fim do regime militar."], ["1988-10-05", "Constituição Federal de 1988."], ["1994-07-01", "O real entra em circulação (Plano Real)."]]
    },
    DEU: {
      name: "Alemanha", entities: [["DEU-OCUP", "Alemanha ocupada (quatro zonas aliadas)", 1945, 1949, "Sem Estado alemão soberano; na Auditoria 2 tem 0 linhas: os valores de 1945–49 ficam em DEU, como anteriores à condição de Estado."], ["FRG", "República Federal da Alemanha (RFA)", 1949, 1990, "De 23/5/1949 a 3/10/1990."], ["GDR", "República Democrática Alemã (RDA)", 1949, 1990, "De 7/10/1949 a 3/10/1990."], ["DEU", "Alemanha unificada", 1990, 2026, "Desde 3/10/1990."]],
      borders: "Os territórios a leste da linha Oder–Neisse passaram à Polônia e à URSS em 1945; a fronteira foi confirmada pelo Tratado Dois Mais Quatro (1990). O Sarre foi incorporado à RFA em 1957. Berlim teve estatuto especial até 1990.",
      events: [["1945-05-08", "Rendição incondicional; ocupação aliada."], ["1949-05-23", "Lei Fundamental: criação da RFA."], ["1949-10-07", "Criação da RDA."], ["1955-05-05", "RFA recupera a soberania (Tratados de Paris)."], ["1957-01-01", "Sarre incorporado à RFA."], ["1961-08-13", "Construção do Muro de Berlim."], ["1989-11-09", "Abertura do Muro de Berlim."], ["1990-07-01", "União monetária, econômica e social RFA–RDA."], ["1990-10-03", "Reunificação: a RDA adere à RFA."]]
    },
    RUS: {
      name: "Rússia", entities: [["SUN", "União Soviética (URSS)", 1945, 1991, "Estado até 26/12/1991. A RSFS da Rússia (SUN-RSFSR) era uma das repúblicas."], ["RUS", "Federação Russa", 1992, 2026, "Estado nas séries a partir de 1992 (primeiro ano civil completo)."]],
      borders: "A Crimeia passou da RSFS da Rússia para a RSS da Ucrânia em 1954. Desde 2014 a Rússia ocupa a Crimeia e, desde 2022, partes de quatro regiões ucranianas; as anexações declaradas não são reconhecidas pela Assembleia Geral da ONU (Res. 68/262 e ES-11/4). O site usa as fronteiras reconhecidas.",
      events: [["1954-02-19", "Crimeia transferida para a RSS da Ucrânia."], ["1991-12-08", "Acordos de Belaveja."], ["1991-12-26", "Dissolução da URSS."], ["1993-12-12", "Constituição aprovada em referendo."], ["2014-03-18", "Anexação da Crimeia, não reconhecida (AGNU 68/262)."], ["2022-02-24", "Invasão em larga escala da Ucrânia."], ["2022-09-30", "Anexação declarada de quatro regiões ucranianas, não reconhecida (AGNU ES-11/4)."]]
    },
    UKR: {
      name: "Ucrânia", entities: [["UKR-SSR", "RSS da Ucrânia (república da URSS)", 1945, 1991, "Membro fundador da ONU, mas não Estado independente. Valores do território nesse período são reconstrução, sob o código UKR."], ["UKR", "Ucrânia", 1992, 2026, "Independência declarada em 24/8/1991; Estado nas séries a partir de 1992."]],
      borders: "Recebeu a Crimeia em 1954. Fronteiras reconhecidas internacionalmente incluem a Crimeia e as regiões de Donetsk, Luhansk, Zaporíjia e Kherson, ocupadas total ou parcialmente pela Rússia.",
      events: [["1945-10-24", "RSS da Ucrânia entre os membros fundadores da ONU."], ["1954-02-19", "Recebe a Crimeia."], ["1991-08-24", "Declaração de independência."], ["1991-12-01", "Referendo confirma a independência."], ["1996-06-28", "Constituição."], ["2014-03-18", "Crimeia anexada pela Rússia, não reconhecida; guerra no Donbas."], ["2022-02-24", "Invasão russa em larga escala."]]
    }
  },
  ent_names: { BRA: "Brasil", DEU: "Alemanha unificada", "DEU-OCUP": "Alemanha ocupada", FRG: "RFA", GDR: "RDA", SUN: "URSS", RUS: "Rússia", UKR: "Ucrânia", "UKR-SSR": "RSS da Ucrânia" },
  sub2: { governantes: "Governantes" },
  kpis: [["4", "Países-piloto", "de 195 no núcleo da Auditoria 2"], ["10", "Entidades de Estado", "inclui RFA, RDA, URSS e RSS da Ucrânia"], ["19", "Fontes baixadas", "Auditoria 2 · F01–F19"]],
  kpi_year: "Ano no mapa",
  tt_click: "Clique para fixar",
  panel_none_h: "Escolha um país",
  panel_none: "Passe o mouse sobre o mapa ou escolha um país-piloto:",
  close: "Fechar",
  gov_in: "Governo em {y}",
  ent_in: "Entidade em {y}",
  ind_lbl: "Indicador",
  tbl_h: "Países no mapa",
  tbl_cols: ["País", "Entidade em {y}", "Governo em {y}", "Política", "Prosperidade", "Economia"],
  tbl_rest: "Outros 191 países do núcleo",
  gov_h: "Governantes",
  gov_dek: "Quem governou cada país-piloto desde 1945, por regime e por partido. Linha do tempo de referência: não avalia governos e não atribui resultados.",
  gov_conv: "Convenção: liderança efetiva. Presidente nos sistemas presidencialistas e semipresidencialistas; chanceler na RFA e na Alemanha unificada; dirigente do partido único na URSS e na RDA.",
  gov_status: "Lista de referência pública, conferida em 20/10/2026. Será substituída pelos dados da Auditoria 1 (governo_ano) quando o arquivo chegar.",
  gov_colors: "As cores identificam o partido ou o tipo de governo. Não indicam posição ideológica.",
  gov_ev: { rup: "Ruptura institucional", chg: "Mudança de regime ou de Estado", imp: "Afastamento ou destituição" },
  gov_int: "Interino ou mandato curto",
  gov_list: "Lista completa",
  gov_cols: ["Governante", "Início", "Fim", "Partido / tipo", "Nota"],
  gov_now: "no cargo",
  gov_src: "Fonte",
  gov_sun_note: "Antes de 1991, o território fazia parte da URSS: a faixa mostra a liderança soviética.",
  modes2: { dispersao: "Dispersão animada" },
  c_x: "Eixo horizontal", c_y: "Eixo vertical",
  c_scatter_note: "Cada círculo é uma entidade num ano; o rastro mostra os anos anteriores. Pontos próximos indicam associação, não causa.",
  c_gov_note: "As faixas mostram quem governava. O gráfico não atribui resultado a nenhum governante. Mandatos com menos de 1 ano aparecem hachurados e não entram em comparação.",
  c_missing: "Sem dado nos dois eixos em {y}:",
  pre_state: "território atual, antes da condição de Estado"
};
