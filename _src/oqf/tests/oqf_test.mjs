// Testes de integridade da seção O que funciona? (sem navegador).
// uso: node oqf_test.mjs <repo>
import fs from 'fs'; import vm from 'vm'; import path from 'path';
const R = path.resolve(process.argv[2] || '.');
const D = path.join(R, 'assets/data/oqf');
let fails = 0, oks = 0;
const ok = (c, m) => { if (c) oks++; else { fails++; console.log('FALHA:', m); } };
// --- carrega dados com um OQF falso
const ctx = { OQF: {}, M: null, SER: {}, TERMS: null, VALS: {}, WAV: null };
ctx.OQF = { manifest: m => ctx.M = m, register: o => ctx.SER[o.entity] = o, terms: t => ctx.TERMS = t, values: v => ctx.VALS[v.id] = v, worldAvail: w => ctx.WAV = w, leaders: l => ctx.L = l };
const run = f => vm.runInNewContext(fs.readFileSync(f, 'utf8'), { OQF: ctx.OQF, window: { OQF: ctx.OQF } });
run(path.join(D, 'manifest.js'));
const M = ctx.M;
for (const e of Object.keys(M.entities)) { const f = path.join(D, M.entities[e].file); if (fs.existsSync(f)) run(f); }
run(path.join(D, M.terms_file)); run(path.join(D, M.world_file));
for (const f of fs.readdirSync(path.join(D, 'values'))) run(path.join(D, 'values', f));
run(path.join(R, '_src/oqf/leaders.js'));
// --- textos e interface (oqf.js num contexto mínimo, só para ler grupos/perguntas/escalas)
const EB = { lang: 'pt', oqfAll: {} };
const win = { EB, addEventListener() {}, matchMedia: () => ({ matches: false }) };
const doc = { addEventListener() {}, documentElement: { clientWidth: 1200 }, querySelectorAll: () => [], getElementById: () => null };
for (const [lang, f] of [['pt', '_src/js/data/oqf_content.js'], ['en', '_src/js/data_en/oqf_content.js']]) {
  const c = { window: { EB: {} } }; c.EB = c.window.EB; vm.runInNewContext(fs.readFileSync(path.join(R, f), 'utf8'), c); EB.oqfAll[lang] = c.EB.oqfAll[lang];
}
const uictx = { window: win, document: doc, EB, history: {}, console }; uictx.window.window = uictx.window;
vm.runInNewContext(fs.readFileSync(path.join(R, '_src/js/oqf.js'), 'utf8'), uictx);
const UI = win.OQF;
const PILOT_ENTS = { BRA: ['BRA'], DEU: ['DEU', 'FRG', 'GDR'], RUS: ['RUS', 'SUN'], UKR: ['UKR'] };
const ind = id => M.indicators.find(I => I.id === id);

// 1) filtros de publicação nos dados que o navegador recebe
let npts = 0;
for (const [e, S] of Object.entries(ctx.SER)) {
  for (const [id, pts] of Object.entries(S.ind)) {
    const ids = new Set();
    pts.forEach(p => {
      npts++;
      ok(p[5] === 'P' || p[5] === 'R', `${e}/${id}/${p[0]} categoria ${p[5]}`);
      ok(p[2] !== 'p', `${e}/${id}/${p[0]} projeção`);
      ok(p[0] <= 2025, `${e}/${id}/${p[0]} ano > 2025`);
      ok(p[7] && !ids.has(p[7]), `${e}/${id}/${p[0]} id_observacao ausente ou repetido`); ids.add(p[7]);
      if (e === 'DEU') ok(p[0] >= 1990, `DEU antes de 1990: ${id} ${p[0]}`);
      if (e === 'RUS' || e === 'UKR') ok(p[0] >= 1992, `${e} antes de 1992: ${id} ${p[0]}`);
      if (e === 'GDR' || e === 'SUN') ok(false, `${e} tem dado: ${id}`);
    });
  }
}
let nterms = 0;
for (const [e, rows] of Object.entries(ctx.TERMS.rows)) rows.forEach(r => { nterms++; ok(r.cat === 'P' || r.cat === 'R', `painel ${e}/${r.g}/${r.i} categoria ${r.cat}`); (r.w || []).forEach(p => ok(p[2] === 'P' || p[2] === 'R', `janela ${e}/${r.g}/${r.i}/${p[0]} categoria ${p[2]}`)); });
let nvals = 0;
for (const [id, V] of Object.entries(ctx.VALS)) {
  ok(ind(id) && ind(id).intl, `mapa de valores com indicador não comparável: ${id}`);
  ok(UI._vbins[id] && UI._vbins[id].pal.length === UI._vbins[id].b.length + 1, `escala do mapa ausente/errada: ${id}`);
  ok(UI._vbins[id].b.every((x, i, a) => !i || x > a[i - 1]), `classes fora de ordem: ${id}`);
  for (const [iso, pts] of Object.entries(V.c)) {
    ok(!['FRG', 'GDR', 'SUN'].includes(iso), `entidade histórica no mapa de valores: ${iso}`);
    pts.forEach(p => { nvals++; ok(p[2] === 'P' || p[2] === 'R', `valor ${id}/${iso}/${p[0]} categoria ${p[2]}`); ok(p[0] <= 2025, `valor ${id}/${iso} ano ${p[0]}`); });
    if (ctx.SER[iso]) pts.forEach(p => { const s = (ctx.SER[iso].ind[id] || []).find(q => q[0] === p[0]); ok(s && s[1] === p[1], `mapa ≠ série do piloto: ${id}/${iso}/${p[0]}`); });
  }
}
// 2) reorganização sem perder indicador
const inGroups = {}; for (const l of ['pros', 'eco']) UI._groups[l].forEach(g => g[1].forEach(id => { inGroups[id] = (inGroups[id] || 0) + 1; ok(ind(id) && ind(id).layer === l, `grupo ${g[0]}: ${id} não é da camada ${l}`); }));
M.indicators.forEach(I => ok(inGroups[I.id] === 1, `indicador ${I.id} aparece ${inGroups[I.id] || 0} vezes nos grupos`));
for (const lang of ['pt', 'en']) { const V2 = EB.oqfAll[lang].v2; for (const l of ['pros', 'eco']) UI._groups[l].forEach(g => ok(V2.groups[g[0]], `${lang}: grupo sem rótulo ${g[0]}`)); }
// 3) perguntas prontas: só as que os dados respondem, sem quebrar a regra de comparabilidade
for (const q of UI._questions) {
  for (const lang of ['pt', 'en']) ok(EB.oqfAll[lang].v2.questions[q.id], `${lang}: pergunta sem texto ${q.id}`);
  if (q.href) { ok(q.c.every(c => ctx.TERMS.rows[c] && ctx.TERMS.rows[c].length), `pergunta ${q.id} sem linhas no painel`); continue; }
  for (const id of [q.i, q.j].filter(Boolean)) {
    const I = ind(id); ok(I, `pergunta ${q.id}: indicador inexistente ${id}`); if (!I) continue;
    if (q.c.length > 1) ok(I.intl, `pergunta ${q.id}: ${id} sem comparabilidade internacional com ${q.c.length} países`);
    if (I.only) ok(q.c.every(c => I.only.includes(c)), `pergunta ${q.id}: ${id} restrito a ${I.only}`);
    for (const c of q.c) {
      const pts = PILOT_ENTS[c].flatMap(e => (ctx.SER[e] && ctx.SER[e].ind[id]) || []).filter(p => q.m === 'dispersao' || (p[0] >= q.a && p[0] <= q.b));
      ok(pts.length >= 5, `pergunta ${q.id}: ${c}/${id} só tem ${pts.length} pontos`);
      if (q.log) ok(pts.every(p => p[1] > 0), `pergunta ${q.id}: escala log com valor ≤ 0`);
      if (q.m === 'dispersao') ok(pts.some(p => p[0] === q.t), `pergunta ${q.id}: ${c}/${id} sem dado em ${q.t}`);
    }
  }
}
// 4) textos PT/EN com as mesmas chaves
const keys = (o, p = '') => Object.entries(o).flatMap(([k, v]) => v && typeof v === 'object' && !Array.isArray(v) ? [p + k, ...keys(v, p + k + '.')] : [p + k]);
const kp = new Set(keys(EB.oqfAll.pt)), ke = new Set(keys(EB.oqfAll.en));
[...kp].filter(k => !ke.has(k)).forEach(k => ok(false, 'EN sem a chave ' + k)); [...ke].filter(k => !kp.has(k)).forEach(k => ok(false, 'PT sem a chave ' + k));
// 5) painel: toda linha tem janela e regra traduzida
for (const rows of Object.values(ctx.TERMS.rows)) rows.forEach(r => { ok(r.rule && r.rule_en, `painel ${r.g}/${r.i} sem regra PT/EN`); ok(r.ien && r.uen, `painel ${r.g}/${r.i} sem nome/unidade EN`); });
console.log(`pontos ${npts} · linhas do painel ${nterms} · valores do mapa ${nvals} · perguntas ${UI._questions.length}`);
console.log(fails ? `${fails} falha(s), ${oks} verificações ok` : `ok: ${oks} verificações`);
process.exit(fails ? 1 : 0);
