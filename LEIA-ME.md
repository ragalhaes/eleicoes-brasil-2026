# Além da Urna — alemdaurna.com

Site 100% estático. Para publicar: suba esta pasta inteira (`index.html` + `assets/`) num repositório GitHub e conecte ao Cloudflare Pages (sem comando de build, diretório de saída `/`).

## Estrutura

```
index.html                  site completo (HTML + CSS + JS + dados incorporados)
assets/images/president/    fotos oficiais dos 6 presidenciáveis acompanhados
assets/images/states/<uf>/  fotos oficiais das indicações de cada UF
assets/images/CREDITOS-TSE.json  procedência de cada foto
```

## Procedência

- **Fotos:** TSE — Portal de Dados Abertos, conjunto “Candidatos - 2026” (https://dadosabertos.tse.jus.br/pt_BR/dataset/candidatos-2026), recursos “BR - Fotos de candidatos” e “<UF> - Fotos de candidatos”. Cada foto foi vinculada pelo cadastro oficial `consulta_cand_2026` (UF + cargo + número + nome de urna + partido → SQ_CANDIDATO). Convertidas para WebP (qualidade 82), sem recorte.
- **Indicações pessoais:** seleção publicada em https://peterapoia.com/ (conferida em 30/09/2026). Apenas nome, partido e número.
- **Mapa:** IBGE — API de Malhas Territoriais v3, divisão por UF (qualidade mínima), incorporada como SVG.

## Atualizar dados

Os dados ficam em objetos `EB.*` dentro do `index.html` (procure por `EB.recs`, `EB.polls`, `EB.markets`, `EB.iris`).
