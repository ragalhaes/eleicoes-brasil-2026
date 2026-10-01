# Fonte do site e rotina de atualização das pesquisas

`_src/` é a fonte. `index.html` e `en/index.html` (na raiz) são GERADOS. Nunca edite os HTML gerados à mão.
`_src/` não é publicado (está no `.assetsignore`).

## Gerar o site
    python3 _src/build.py      # regrava index.html e en/index.html na raiz (só Python 3, sem dependências)

## Onde ficam os dados de pesquisa
- PT: `_src/js/data/polls.js` · EN: `_src/js/data_en/polls.js` (mesma estrutura; textos em inglês, números com ponto).
- Cada pesquisa é um `P({...})` em `EB.polls`. Campos: poll_id, instituto, contratante, registro_tse, data_publicacao,
  campo_inicio, campo_fim, amostra, metodo, margem_erro, nivel_confianca, cenario, r1 (6 candidatos do comparador),
  outros (texto com os demais nomes e %), branco_nulo, indeciso, r2 {a:"lula", b:"flavio-bolsonaro", a_pct, b_pct},
  rej (ou null), source_primary, source_secondary, latest.

## Regras editoriais (não mudar)
1. Só pesquisas NACIONAIS de 1º turno para presidente, com registro no TSE, intenção de voto estimulada e bruta (não votos válidos).
2. Nova rodada do mesmo instituto: a anterior recebe `latest: false` (fica no histórico) e a nova entra com `latest: true`.
3. Preservar todos os nomes que o instituto apresentou (os seis em `r1`, os demais em `outros`).
4. Rodadas com lista de candidatos desatualizada ficam fora do snapshot (ex.: CNT/MDA 9–13/09/2026 com Pablo Marçal pelo PRTB).
5. Não inventar: campo sem fonte = null. Nunca usar mercado de previsão como pesquisa.
6. Depois de alterar, recalcular a média simples (latest:true) e atualizar `EB.pollsPublishedAvg` (2 casas) nos DOIS arquivos;
   atualizar `pollsMeta.last_updated` e o comentário da média. O site confere a média sozinho ("✓ confere").
