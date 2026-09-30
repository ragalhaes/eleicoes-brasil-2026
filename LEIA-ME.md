# Além da Urna / Brazil Beyond the Ballot — V3.2

Site 100% estático: português em alemdaurna.com e inglês em brazilbeyondtheballot.com. Sem React/Next, sem backend, sem banco, sem CMS, sem build. Publicação: GitHub + Cloudflare Workers Static Assets.

## Estrutura

```
index.html                       versão em português — Além da Urna (alemdaurna.com)
en/index.html                    versão em inglês — Brazil Beyond the Ballot (brazilbeyondtheballot.com)
assets/images/president/*.jpg    fotos oficiais dos 6 presidenciáveis (JPEG original do TSE)
assets/images/states/<uf>/*.webp fotos oficiais das indicações de cada UF
assets/images/CREDITOS-TSE.json  procedência de cada foto
_redirects                       redireciona alemdaurna.com/en/ → brazilbeyondtheballot.com
wrangler.jsonc                   deploy do site português (Cloudflare Workers Static Assets)
wrangler.en.jsonc                deploy do site inglês (usa en/index.html + assets/)
.assetsignore                    arquivos que não são publicados
LEIA-ME.md                       este arquivo
```

As duas versões usam a mesma pasta `assets/` do repositório. A versão inglesa aponta para `../assets/`, que funciona tanto em `/en/` (teste local) quanto na raiz de brazilbeyondtheballot.com.

## Publicar — um repositório, dois Workers

Envie **todo o conteúdo desta pasta** para um repositório GitHub, mantendo a estrutura. Prefira `git push` ou GitHub Desktop (o upload pelo navegador aceita no máximo 100 arquivos por vez e o projeto tem mais de 260 imagens).

**1. Português — alemdaurna.com**
- Cloudflare → Workers & Pages → Create → Import a repository → este repositório.
- Build command: *(vazio)* · Deploy command: `npx wrangler deploy`
- Settings → Domains & Routes: `alemdaurna.com`.

**2. Inglês — brazilbeyondtheballot.com**
- Crie um segundo Worker a partir do **mesmo** repositório.
- Build command: `mkdir -p dist-en && cp en/index.html dist-en/index.html && cp -R assets dist-en/`
- Deploy command: `npx wrangler deploy -c wrangler.en.jsonc`
- Settings → Domains & Routes: `brazilbeyondtheballot.com`.

Cada push na branch principal atualiza os dois sites. (Nada roda em Node no site: `wrangler` só faz o upload dos arquivos estáticos.)

Observações:
- Nomes de arquivo são sensíveis a maiúsculas/minúsculas no servidor. Não renomeie arquivos em `assets/`.
- O roteamento é por hash (`/#/candidatos/lula`, `/#/candidates/lula`); não é preciso regra de rewrite.
- `alemdaurna.com/en/` não é URL pública: o `_redirects` envia para brazilbeyondtheballot.com (o navegador preserva o `#/rota`).

## Idiomas e domínios

- Português: **Além da Urna** — `https://alemdaurna.com/`
- Inglês: **Brazil Beyond the Ballot** — `https://brazilbeyondtheballot.com/`
- Os dois `<head>` têm canonical próprio e `hreflang` pt-BR / en-US / x-default (x-default = português).
- O seletor 🇧🇷/🇺🇸 (header e menu mobile) troca de domínio preservando a página equivalente:
  `https://alemdaurna.com/#/candidatos/lula` ↔ `https://brazilbeyondtheballot.com/#/candidates/lula`,
  `https://alemdaurna.com/#/estados/SP` ↔ `https://brazilbeyondtheballot.com/#/states/SP`.
  Em teste local (arquivo aberto direto ou localhost) usa caminhos relativos (`en/` ↔ `../`).
- Os endereços ficam em `EB.site.urls` (bloco de configuração antes do script da interface) e nas tags do `<head>` das duas páginas.

## Colinha eleitoral (V3.2)

Na página de cada estado, o botão "Montar minha colinha" (EN: "Print my voting reference") abre uma prévia editável na ordem oficial da urna (Res. TSE 23.751/2026, art. 142) e imprime só a colinha via `window.print()`. Tudo roda no navegador; nada é salvo nem enviado.

## Procedência

- **Fotos:** TSE — Portal de Dados Abertos, conjunto “Candidatos - 2026”, recursos “BR - Fotos de candidatos” e “<UF> - Fotos de candidatos”. Vínculo pelo cadastro oficial `consulta_cand_2026` (UF + cargo + número + nome de urna + partido → SQ_CANDIDATO), nunca por semelhança visual. Presidenciáveis: JPEG original, sem recompressão. Indicações estaduais: WebP (qualidade 82), sem recorte.
- **Perfis dos candidatos:** registros e planos de governo do TSE; Senado, Câmara, governos estaduais; decisões judiciais e jornalismo como complemento. Fontes com links em cada perfil.
- **Indicações pessoais:** peterapoia.com (nome, partido e número apenas).
- **Mapa:** IBGE — API de Malhas Territoriais v3, divisão por UF, incorporada como SVG (27 caminhos validados: fechados, área positiva, rótulo dentro da UF; subcaminhos degenerados do PR removidos).

## Atualizar dados

Os dados ficam em objetos `EB.*` dentro de cada `index.html` (`EB.candidates`, `EB.polls`, `EB.markets`, `EB.iris`, `EB.recs`…). Ao alterar um dado, altere nas duas versões.
