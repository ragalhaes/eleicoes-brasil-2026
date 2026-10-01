# -*- coding: utf-8 -*-
"""Build final: /index.html (PT) e /en/index.html (EN), compartilhando /assets."""
import re, os, shutil, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from i18n_en import FUNCS, T, GLOBAL

SRC = os.path.dirname(os.path.abspath(__file__)) + '/'
OUT = os.path.dirname(os.path.dirname(os.path.abspath(__file__))) + '/'

# ---- Endereços públicos: troque aqui quando houver domínio próprio para o inglês ----
URLS = {'pt': 'https://alemdaurna.com/', 'en': 'https://brazilbeyondtheballot.com/'}

FLAG_BR = '<svg viewBox="0 0 20 14" aria-hidden="true" focusable="false"><rect width="20" height="14" fill="#009c3b"/><path d="M10 1.6 18.2 7 10 12.4 1.8 7z" fill="#ffdf00"/><circle cx="10" cy="7" r="3.3" fill="#002776"/><path d="M6.9 6.2c2.1-.5 4.4-.2 6.1.9" stroke="#fff" stroke-width=".6" fill="none"/></svg>'
FLAG_US = ('<svg viewBox="0 0 20 14" aria-hidden="true" focusable="false"><rect width="20" height="14" fill="#fff"/>'
           + ''.join('<rect y="%.3f" width="20" height="%.3f" fill="#b22234"/>' % (i * 14 / 13, 14 / 13) for i in range(0, 13, 2))
           + '<rect width="8.4" height="7.54" fill="#3c3b6e"/>'
           + ''.join('<circle cx="%.1f" cy="%.1f" r=".42" fill="#fff"/>' % (1.1 + c * 1.55 + (0.77 if r % 2 else 0), 1.0 + r * 1.35) for r in range(5) for c in range(5 if r % 2 == 0 else 4))
           + '</svg>')

L = {
 'pt': dict(
  html_lang='pt-BR', og_locale='pt_BR', og_alt='en_US',
  title='Além da Urna — Eleições Brasil 2026', brand='Além da Urna', footer_big_name='Além<br>da Urna',
  desc='Economia, instituições, STF, Senado e Presidência. Entenda como o Brasil chegou a 2026 e o que esta eleição pode mudar — com fatos, decisões judiciais, alegações e opinião editorial claramente identificados.',
  brand_small='ELEIÇÕES 2026 · MUITO ALÉM DAS ELEIÇÕES', nav_label='Principal',
  nav=[('historia', 'História'), ('em-jogo', 'Em jogo'), ('candidatos', 'Candidatos'), ('comparar', 'Comparar'), ('pesquisas', 'Pesquisas'), ('estados', 'Estados'), ('fontes', 'Fontes')],
  lang_group='Idioma', menu='MENU', drawer_label='Menu completo',
  footer_big='ELEIÇÕES BRASIL 2026 · MUITO ALÉM DAS ELEIÇÕES', nav_h='Navegar', transp_h='Transparência',
  foot_nav=[('historia', 'História'), ('em-jogo', 'O que está em jogo'), ('candidatos', 'Candidatos'), ('comparar', 'Comparar'), ('pesquisas', 'Pesquisas'), ('mercados', 'Mercados'), ('iris', 'Modelo ÍRIS'), ('estados', 'Estados')],
  foot_tr=[('fontes', 'Fontes e metodologia'), ('fontes#rotulos', 'Como ler os rótulos'), ('fontes#atualizacao', 'Atualização dos dados')],
  foot_line='Além da Urna é um projeto editorial independente criado e editado por Ragalhaes, em San Diego, Califórnia, Estados Unidos.',
  to_top='Voltar ao topo', asset='', datadir='data'),
 'en': dict(
  html_lang='en-US', og_locale='en_US', og_alt='pt_BR',
  title='Brazil Beyond the Ballot — Brazil Elections 2026', brand='Brazil Beyond the Ballot', footer_big_name='Brazil Beyond<br>the Ballot',
  desc="Economy, institutions, the Supreme Court, the Senate and the Presidency. How Brazil got to 2026 and what this election could change — with facts, court decisions, allegations and editorial opinion clearly labeled.",
  brand_small='BRAZIL ELECTIONS 2026', nav_label='Main',
  nav=[('history', 'History'), ('at-stake', 'At stake'), ('candidates', 'Candidates'), ('compare', 'Compare'), ('polls', 'Polls'), ('states', 'States'), ('sources', 'Sources')],
  lang_group='Language', menu='MENU', drawer_label='Full menu',
  footer_big='BRAZIL ELECTIONS 2026 · FAR BEYOND THE ELECTION', nav_h='Browse', transp_h='Transparency',
  foot_nav=[('history', 'History'), ('at-stake', 'What is at stake'), ('candidates', 'Candidates'), ('compare', 'Compare'), ('polls', 'Polls'), ('markets', 'Markets'), ('iris', 'ÍRIS model'), ('states', 'States')],
  foot_tr=[('sources', 'Sources and methodology'), ('sources#rotulos', 'How to read the labels'), ('sources#atualizacao', 'Data updates')],
  foot_line='Brazil Beyond the Ballot is an independent editorial project created and edited by Ragalhaes in San Diego, California, United States.',
  to_top='Back to top', asset='../', datadir='data_en'),
}
NAVKEY = {'history': 'historia', 'at-stake': 'em-jogo', 'candidates': 'candidatos', 'compare': 'comparar', 'polls': 'pesquisas', 'states': 'estados', 'sources': 'fontes'}
EN_SLUGS = {'historia': 'history', 'em-jogo': 'at-stake', 'candidatos': 'candidates', 'comparar': 'compare', 'pesquisas': 'polls', 'mercados': 'markets', 'estados': 'states', 'fontes': 'sources'}
ROUTE_RE = re.compile(r'#/(historia|em-jogo|candidatos|comparar|pesquisas|mercados|estados|fontes)(?=[/"\'?#\s\\]|$)')


def en_routes(s):
    return ROUTE_RE.sub(lambda m: '#/' + EN_SLUGS[m.group(1)], s)


def translate_app(s):
    for a, b in FUNCS + T:
        n = s.count(a)
        if n == 0:
            raise SystemExit('NOT FOUND: ' + a[:90])
        s = s.replace(a, b)
    for a, b in GLOBAL:
        s = s.replace(a, b)
    return en_routes(s)


def shell(lang):
    c = L[lang]
    other = 'en' if lang == 'pt' else 'pt'
    esc = lambda x: x.replace('&', '&amp;').replace('"', '&quot;')
    lang_sw = ('<div class="lang" role="group" aria-label="%s">' % c['lang_group']
               + '<a href="%s" data-lang="pt" hreflang="pt-BR" lang="pt-BR" aria-label="Português"%s>%s<span>PT</span></a>' % ('#/' if lang == 'pt' else URLS['pt'], ' class="is-on" aria-current="true"' if lang == 'pt' else '', FLAG_BR)
               + '<a href="%s" data-lang="en" hreflang="en-US" lang="en-US" aria-label="English"%s>%s<span>EN</span></a>' % (URLS['en'] if lang == 'pt' else '#/', ' class="is-on" aria-current="true"' if lang == 'en' else '', FLAG_US)
               + '</div>')
    nav = '\n'.join('      <a href="#/%s" data-nav="%s">%s</a>' % (slug, NAVKEY.get(slug, slug), label) for slug, label in c['nav'])
    fnav = '\n'.join('          <li><a href="#/%s">%s</a></li>' % (s_, l_) for s_, l_ in c['foot_nav'])
    ftr = '\n'.join('          <li><a href="#/%s">%s</a></li>' % (s_, l_) for s_, l_ in c['foot_tr'])
    head = f'''<!DOCTYPE html>
<html lang="{c['html_lang']}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{c['title']}</title>
<meta name="description" content="{esc(c['desc'])}">
<meta name="author" content="Ragalhaes">
<link rel="canonical" href="{URLS[lang]}">
<link rel="alternate" hreflang="pt-BR" href="{URLS['pt']}">
<link rel="alternate" hreflang="en-US" href="{URLS['en']}">
<link rel="alternate" hreflang="x-default" href="{URLS['pt']}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="{c['brand']}">
<meta property="og:locale" content="{c['og_locale']}">
<meta property="og:locale:alternate" content="{c['og_alt']}">
<meta property="og:title" content="{c['title']}">
<meta property="og:description" content="{esc(c['desc'])}">
<meta property="og:url" content="{URLS[lang]}">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="{c['title']}">
<meta name="twitter:description" content="{esc(c['desc'])}">
<meta name="theme-color" content="#0b0c0f">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,400&family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<style>
{open(SRC + 'css/styles.css').read()}
</style>
</head>
<body>

<div class="progress" aria-hidden="true"><span id="progress"></span></div>

<header class="site-header" id="top">
  <div class="wrap">
    <a href="#/" class="brand"><b>{c['brand']}</b><small>{c['brand_small']}</small></a>
    <nav class="nav" id="nav" aria-label="{c['nav_label']}">
{nav}
    </nav>
    <div class="hdr-r">
      {lang_sw}
      <button class="burger" id="burger" aria-expanded="false" aria-controls="drawer"><i></i>{c['menu']}</button>
    </div>
  </div>
</header>

<nav class="drawer" id="drawer" aria-label="{c['drawer_label']}"></nav>

<main id="app" tabindex="-1" aria-live="polite"></main>

<footer class="footer">
  <div class="wrap">
    <div class="footer-grid">
      <div class="big">{c['footer_big_name']}<span>{c['footer_big']}</span></div>
      <div>
        <h4>{c['nav_h']}</h4>
        <ul>
{fnav}
        </ul>
      </div>
      <div>
        <h4>{c['transp_h']}</h4>
        <ul>
{ftr}
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span class="footer-author">{c['foot_line']}</span>
      <span>© 2026 Ragalhaes · <span id="footer-upd"></span></span>
    </div>
  </div>
</footer>

<button class="to-top" id="to-top" aria-label="{c['to_top']}">↑</button>
'''
    return head


def build(lang):
    c = L[lang]
    d = SRC + 'js/' + c['datadir'] + '/'
    files = ['meta.js', 'chapters.js', 'candidates.js', 'polls.js', 'markets.js', 'iris.js', 'states.js']
    parts = []
    for f in files:
        s = open(d + f).read()
        if lang == 'en':
            s = en_routes(s)
        parts.append(s)
    parts.append(open(SRC + 'js/data/brmap.js').read())
    cfg = ('/* Configuração de idioma e endereços públicos (PT: alemdaurna.com · EN: brazilbeyondtheballot.com).\n'
           '   Os mesmos endereços aparecem no <head> (canonical, hreflang, og:url) das duas páginas. */\n'
           'EB.lang = "%s";\nEB.assetBase = "%s";\nEB.site.urls = { pt: "%s", en: "%s" };' % (lang, c['asset'], URLS['pt'], URLS['en']))
    app = open(SRC + 'js/app.js').read()
    if lang == 'en':
        app = translate_app(app)
    h = shell(lang)
    h += '\n<!-- Dados editoriais incorporados (EB.*), separados da interface -->\n'
    for p in parts:
        h += '<script>\n' + p.strip() + '\n</script>\n'
    h += '<script>\n' + cfg + '\n</script>\n<!-- Interface (hash routing) -->\n<script>\n' + app.strip() + '\n</script>\n</body>\n</html>\n'
    return h


if __name__ == '__main__':
    os.makedirs(OUT + 'en', exist_ok=True)
    for lang, path in (('pt', OUT + 'index.html'), ('en', OUT + 'en/index.html')):
        h = build(lang)
        open(path, 'w').write(h)
        print(lang, path, len(h))
