// Testes funcionais no navegador (Playwright) da prévia gerada por build.py --preview.
// uso: node oqf_ui_test.mjs <dir-da-previa>
import { chromium } from 'playwright'; import http from 'http'; import fs from 'fs'; import path from 'path'; import vm from 'vm';
const dir = process.argv[2];
const srv = http.createServer((q, r) => { let p = decodeURIComponent(q.url.split('?')[0]); if (p.endsWith('/')) p += 'index.html'; const f = path.join(dir, p); fs.readFile(f, (e, b) => { if (e) { r.writeHead(404); r.end(); return; } const t = { '.html': 'text/html', '.js': 'text/javascript' }[path.extname(f)] || 'application/octet-stream'; r.writeHead(200, { 'content-type': t }); r.end(b); }); }).listen(8768);
const U = 'http://localhost:8768/';
let fails = 0, oks = 0; const ok = (c, m) => { if (c) { oks++; } else { fails++; console.log('FALHA:', m); } };
// dados de referência lidos direto dos arquivos publicados
const D = path.join(dir, 'assets/data/oqf'), ctx = { SER: {} };
const O = { manifest: m => ctx.M = m, register: o => ctx.SER[o.entity] = o, terms: t => ctx.T = t, values: v => (ctx.V = ctx.V || {})[v.id] = v };
const run = f => vm.runInNewContext(fs.readFileSync(f, 'utf8'), { OQF: O });
run(path.join(D, 'manifest.js')); ['BRA', 'DEU', 'FRG', 'RUS', 'UKR'].forEach(e => run(path.join(D, 'series', e + '.js'))); run(path.join(D, 'terms.js')); run(path.join(D, 'values/life_exp.js'));
const fmtPT = (v, d) => Number(v).toLocaleString('pt-BR', { minimumFractionDigits: d, maximumFractionDigits: d });
const b = await chromium.launch({ executablePath: process.env.CHROME });
for (const vp of [{ w: 1366, h: 900, n: 'desktop' }, { w: 390, h: 844, n: 'celular' }]) {
  const pg = await (await b.newContext({ viewport: { width: vp.w, height: vp.h } })).newPage();
  const errs = []; pg.on('pageerror', e => errs.push(e.message)); pg.on('console', m => { if (m.type() === 'error' && !/404/.test(m.text())) errs.push(m.text()); });
  const go = async h => { await pg.goto(U + h, { waitUntil: 'networkidle' }); await pg.waitForTimeout(300); };
  const noOverflow = async (what) => ok(await pg.evaluate(() => document.documentElement.scrollWidth - window.innerWidth) <= 2, `${vp.n}: rolagem horizontal em ${what}`);
  // A) comparador: indicador sem comparabilidade internacional → só um país, com explicação
  await go('index.html#/o-que-funciona/comparar?c=BRA,DEU&i=unemp');
  ok(await pg.locator('.oqf-incompat').count() === 1, `${vp.n}: aviso de incompatibilidade ausente (unemp)`);
  ok(await pg.locator('#oqf-cmp-out path.ln[stroke="#2fb3c6"]').count() === 0, `${vp.n}: Alemanha desenhada com desemprego (não comparável)`);
  ok(await pg.locator('#oqf-cmp-out path.ln[stroke="#c6f24e"]').count() > 0, `${vp.n}: Brasil não desenhado`);
  await pg.click('[data-oqf-solo="DEU"]'); await pg.waitForTimeout(200);
  ok(await pg.locator('#oqf-cmp-out path.ln[stroke="#2fb3c6"]').count() > 0 && await pg.locator('#oqf-cmp-out path.ln[stroke="#c6f24e"]').count() === 0, `${vp.n}: "Ver Alemanha" não trocou o país`);
  await go('index.html#/o-que-funciona/comparar?c=BRA,DEU&i=ipca_br');
  ok(await pg.locator('#oqf-cmp-out path.ln[stroke="#2fb3c6"]').count() === 0, `${vp.n}: série só do Brasil desenhada para a Alemanha`);
  await go('index.html#/o-que-funciona/comparar?c=BRA,DEU,RUS,UKR&i=life_exp');
  ok(await pg.locator('.oqf-incompat').count() === 0, `${vp.n}: aviso indevido em indicador comparável`);
  for (const c of ['#c6f24e', '#2fb3c6', '#f0a33a', '#b48cff']) ok(await pg.locator(`#oqf-cmp-out path.ln[stroke="${c}"]`).count() > 0, `${vp.n}: país ausente (${c}) em life_exp`);
  await noOverflow('comparador');
  // B) perfil: valor em destaque = último valor publicado; tabela técnica só com S/R e ids
  await go('index.html#/o-que-funciona/perfil/BRA?t=pros&g=saude');
  const le = ctx.SER.BRA.ind.life_exp, last = le[le.length - 1];
  const big = (await pg.locator('.oqf-ec').first().locator('.oqf-ec-v b').textContent()).trim();
  ok(big === fmtPT(last[1], 1), `${vp.n}: destaque ${big} ≠ dado ${fmtPT(last[1], 1)}`);
  await pg.locator('.oqf-ec').first().locator('.oqf-tech > summary').click(); await pg.locator('.oqf-ec').first().locator('.oqf-vals > summary').click();
  const cats = await pg.locator('.oqf-ec').first().locator('.oqf-vtable tbody tr td:nth-child(4)').allTextContents();
  ok(cats.length === le.length && cats.every(c => c === 'S' || c === 'R'), `${vp.n}: tabela técnica com ${cats.length} linhas / categorias ${[...new Set(cats)]}`);
  const ids = await pg.locator('.oqf-ec').first().locator('.oqf-vtable tbody tr td:nth-child(6)').allTextContents();
  ok(ids.includes(last[7]), `${vp.n}: id_observacao do último ponto não aparece`);
  // todos os grupos: nº de cartões = indicadores do grupo que se aplicam
  for (const [t, gs] of [['pros', ['saude', 'educacao', 'renda', 'pobreza', 'desigualdade', 'indice']], ['eco', ['crescimento', 'precos', 'emprego', 'fiscal', 'investimento', 'externo']]]) {
    await go(`index.html#/o-que-funciona/perfil/BRA?t=${t}`);
    for (const g of gs) { await pg.click(`[data-oqf-pgrp="${g}"]`); await pg.waitForTimeout(80); ok(await pg.locator('#oqf-ptab .oqf-ec').count() >= 1, `${vp.n}: grupo ${g} vazio`); }
  }
  await go('index.html#/o-que-funciona/perfil/RUS?t=pros&g=pobreza');
  ok(await pg.locator('.oqf-crit').count() >= 1, `${vp.n}: aviso crítico (renda × consumo / território) escondido`);
  await noOverflow('perfil');
  await go('index.html#/o-que-funciona/perfil/DEU?t=gov');
  ok(await pg.locator('.oqf-steps .oqf-step').count() === 3, `${vp.n}: três passos do governante`);
  ok((await pg.locator('.oqf-steps').textContent()).includes('Pesquisa em andamento'), `${vp.n}: passo 2 sem "pesquisa em andamento"`);
  await noOverflow('governos do perfil');
  // C) mandatos: governos em ordem cronológica, destaque = número da Auditoria 3
  await go('index.html#/o-que-funciona/mandatos?c=DEU');
  const gds = new Set([...ctx.T.rows.DEU, ...ctx.T.rows.FRG].map(r => r.g));
  ok(await pg.locator('#oqf-tgsel option').count() === gds.size, `${vp.n}: governos da Alemanha ${await pg.locator('#oqf-tgsel option').count()} ≠ ${gds.size}`);
  const sel = await pg.locator('#oqf-tgsel').inputValue();
  const row = ctx.T.rows.DEU.concat(ctx.T.rows.FRG).find(r => r.g === sel && r.i === 'pib_real_per_capita');
  if (row) { const n = (await pg.locator('.oqf-tile').first().locator('.oqf-tile-v b').textContent()).trim(); const x = +row.var; ok(n === (x > 0 ? '+' : x < 0 ? '−' : '') + fmtPT(Math.abs(x), 1) + '%', `${vp.n}: mandato destaque ${n} ≠ ${row.var}`); }
  ok(await pg.locator('.oqf-causal--lead').count() === 1, `${vp.n}: aviso de causalidade ausente no mandato`);
  ok((await pg.locator('#oqf-terms-out').innerHTML()).match(/rank|nota |score/i) === null, `${vp.n}: termo de ranking/nota no painel`);
  if (vp.n === 'celular') await pg.selectOption('#oqf-tgsel', [...gds][0]); else await pg.click(`.oqf-govs [data-oqf-tg="${[...gds][0]}"]`); await pg.waitForTimeout(150);
  ok(await pg.locator('#oqf-tgsel').inputValue() === [...gds][0], `${vp.n}: governo não trocou`);
  ok(await pg.locator('.oqf-tile').count() >= 1, `${vp.n}: troca de governo sem cartões`);
  const nx = await pg.locator('[data-oqf-tx]').count(); if (nx) { await pg.locator('[data-oqf-tx]').first().click(); await pg.waitForTimeout(150); }
  await noOverflow('mandatos');
  // D) mapa de valores: só dados publicados; sem dado = cinza explícito
  await go('index.html#/o-que-funciona/mapa?v=val&y=2015');
  const nOn = await pg.locator('#oqf-map .oqf-c.v-on').count(), nNd = await pg.locator('#oqf-map .oqf-c.v-nd').count();
  const isoMap = await pg.locator('#oqf-map .oqf-c').evaluateAll(els => els.map(e => e.getAttribute('data-iso')));
  const expected = isoMap.filter(i => (ctx.V.life_exp.c[i] || []).some(p => p[0] === 2015)).length;
  ok(nOn === expected && nOn + nNd === isoMap.length, `${vp.n}: mapa de valores ${nOn} pintados (esperado ${expected}), ${nNd} sem dado`);
  ok(await pg.locator('.oqf-vleg').count() === 1, `${vp.n}: legenda do modo valores ausente`);
  await pg.click('[data-oqf-vmode="disp"]'); await pg.waitForTimeout(150);
  ok(await pg.locator('#oqf-map .oqf-c.v-on').count() === 0, `${vp.n}: voltar à disponibilidade não limpou as cores de valor`);
  await noOverflow('mapa');
  // E) perguntas prontas: cada uma abre gráfico com dado e mostra a pergunta
  await go('index.html#/o-que-funciona');
  const hrefs = await pg.locator('.oqf-qc').evaluateAll(as => as.map(a => a.getAttribute('href')));
  ok(hrefs.length === 7, `${vp.n}: ${hrefs.length} perguntas`);
  for (const h of hrefs) {
    await go('index.html' + h);
    const has = await pg.locator('#oqf-cmp-out path.ln, #oqf-sc .sc-pt, .oqf-tile').count();
    ok(has > 0, `${vp.n}: pergunta sem gráfico ${h}`);
    if (h.includes('comparar')) ok(await pg.locator('.oqf-qban').count() === 1, `${vp.n}: faixa da pergunta ausente ${h}`);
  }
  await noOverflow('abertura');
  // F) EN
  await go('en/index.html#/what-works/terms');
  ok((await pg.locator('.oqf-causal--lead').textContent()).length > 40 && !/Os números/.test(await pg.locator('main').textContent()), `${vp.n}: EN com texto em português no painel`);
  await go('en/index.html#/what-works/profile/BRA?t=eco');
  ok(!/Ressalvas|Fonte:|último dado/.test(await pg.locator('#oqf-ptab').textContent()), `${vp.n}: EN com rótulos em português no perfil`);
  ok(errs.length === 0, `${vp.n}: erros de console: ${errs.slice(0, 3).join(' | ')}`);
}
await b.close(); srv.close();
console.log(fails ? `${fails} falha(s), ${oks} verificações ok` : `ok: ${oks} verificações de interface`);
process.exit(fails ? 1 : 0);
