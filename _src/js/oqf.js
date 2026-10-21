/* =========================================================
   O QUE FUNCIONA? / WHAT WORKS? — interface da seção
   Rotas: #/o-que-funciona[/mapa|/governantes|/perfil/<ISO>|/comparar|/metodologia]
          #/what-works[/map|/leaders|/profile/<ISO>|/compare|/methodology]
   Dados: carregados sob demanda de assets/data/oqf/ (manifesto, uma série por entidade,
   mapa e lista de governantes). O modo (demonstrativo ou real) vem do manifesto e nunca é misturado.
   ========================================================= */
(function () {
  "use strict";
  var EB = window.EB, LANG = EB.lang || "pt", ASSET = EB.assetBase || "";
  var T = EB.oqfAll[LANG], V = T.v2;
  var BASE = LANG === "en" ? "what-works" : "o-que-funciona";
  var SUBS = { mapa: "map", governantes: "leaders", perfil: "profile", comparar: "compare", mandatos: "terms", metodologia: "methodology" };
  var DATA = ASSET + "assets/data/oqf/";
  var PILOTS = ["BRA", "DEU", "RUS", "UKR"];
  /* Entidades que aparecem para cada país-piloto (nunca emendadas entre si). */
  var ENTS = { BRA: ["BRA"], DEU: ["DEU", "FRG", "GDR"], RUS: ["RUS", "SUN"], UKR: ["UKR"] };
  var COLOR = { BRA: "#c6f24e", DEU: "#2fb3c6", RUS: "#f0a33a", UKR: "#b48cff" };
  var DASH = { FRG: "7 4", GDR: "2 3", SUN: "7 4" };
  var Y0 = 1945, Y1 = 2026, TODAY = "2026-10-20";
  var SUBLBL = function (k) { return T.sub[k] || (T.sub2 && T.sub2[k]) || ""; };

  function esc(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function md(s) { return esc(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>"); }
  function tf(s, o) { return String(s).replace(/\{(\w+)\}/g, function (m, k) { return o[k] != null ? o[k] : m; }); }
  function fmt(v) { return v == null ? "—" : (LANG === "en" ? v.toLocaleString("en-US", { maximumFractionDigits: 1 }) : v.toLocaleString("pt-BR", { maximumFractionDigits: 1 })); }
  function dateTxt(iso) { if (!iso) return T.gov_now; var p = iso.split("-"); return LANG === "en" ? +p[1] + "/" + +p[2] + "/" + p[0] : +p[2] + "/" + +p[1] + "/" + p[0]; }
  function clampY(y, d) { y = parseInt(y, 10); return isNaN(y) ? d : Math.max(Y0, Math.min(Y1, y)); }
  function link(sub, extra, q) {
    var s = "#/" + BASE + (sub ? "/" + (LANG === "en" ? SUBS[sub] : sub) : "") + (extra ? "/" + extra : "");
    return s + (q ? "?" + q : "");
  }
  function qs(o) { return Object.keys(o).filter(function (k) { return o[k] !== "" && o[k] != null; }).map(function (k) { return k + "=" + encodeURIComponent(o[k]); }).join("&"); }
  function setHash(h) { try { history.replaceState(null, "", h); } catch (e) {} }
  function tagHtml(fam, txt) { return '<span class="tag ' + fam + '">' + esc(txt) + "</span>"; }
  var TAGTXT = LANG === "en" ? { f: "Fact", m: "Methodology", c: "Context", d: "Data" } : { f: "Fato", m: "Metodologia", c: "Contexto", d: "Dado" };
  function chip(st) { var s = T.states[st]; return s ? '<span class="oqf-st st-' + st + '" title="' + esc(s[1]) + '">' + esc(s[0]) + "</span>" : ""; }
  /* data ISO → ano fracionário */
  function yf(iso) { if (!iso) iso = TODAY; var p = iso.split("-"), y = +p[0], d0 = Date.UTC(y, 0, 1), d = Date.UTC(y, +p[1] - 1, +p[2]); return y + (d - d0) / (Date.UTC(y + 1, 0, 1) - d0); }

  /* ---------------------------------------------------------- bandeiras (atuais) */
  var FLAGS = {
    BRA: '<svg viewBox="0 0 20 14" aria-hidden="true"><rect width="20" height="14" fill="#009c3b"/><path d="M10 1.6 18.2 7 10 12.4 1.8 7z" fill="#ffdf00"/><circle cx="10" cy="7" r="3.3" fill="#002776"/></svg>',
    DEU: '<svg viewBox="0 0 20 12" aria-hidden="true"><rect width="20" height="4" fill="#000"/><rect y="4" width="20" height="4" fill="#dd0000"/><rect y="8" width="20" height="4" fill="#ffce00"/></svg>',
    RUS: '<svg viewBox="0 0 18 12" aria-hidden="true"><rect width="18" height="4" fill="#fff"/><rect y="4" width="18" height="4" fill="#0039a6"/><rect y="8" width="18" height="4" fill="#d52b1e"/></svg>',
    UKR: '<svg viewBox="0 0 18 12" aria-hidden="true"><rect width="18" height="6" fill="#0057b7"/><rect y="6" width="18" height="6" fill="#ffd700"/></svg>'
  };
  function flag(iso, cls) { return FLAGS[iso] ? '<span class="oqf-flag ' + (cls || "") + '">' + FLAGS[iso] + "</span>" : ""; }

  /* ---------------------------------------------------------- carregamento sob demanda */
  var M = null, SER = {}, loading = {}, WORLD = null, L = null, WAV = null, TERMS = null, VALS = {};
  var OQF = window.OQF = {
    values: function (d) { VALS[d.id] = d; },
    manifest: function (m) { M = m; },
    register: function (id, obj) { if (typeof id === "object") { obj = id; id = obj.entity; } SER[id] = obj; },
    leaders: function (d) { L = d; },
    worldAvail: function (d) { WAV = d; },
    terms: function (d) { TERMS = d; }
  };
  function load(file, cb) {
    var st = loading[file];
    if (st === true) return cb(true);
    if (st) { st.push(cb); return; }
    loading[file] = [cb];
    var s = document.createElement("script");
    s.src = DATA + file; s.async = true;
    s.onload = function () { var q = loading[file]; loading[file] = true; q.forEach(function (f) { f(true); }); };
    s.onerror = function () { var q = loading[file]; delete loading[file]; q.forEach(function (f) { f(false); }); };
    document.head.appendChild(s);
  }
  function loadAll(files, cb) { var n = files.length, ok = true; if (!n) return cb(true); files.forEach(function (f) { load(f, function (r) { ok = ok && r; if (--n === 0) cb(ok); }); }); }
  function withManifest(cb) { if (M) return cb(true); load("manifest.js", function (ok) { cb(ok && !!M); }); }
  function withSeries(ents, cb) {
    withManifest(function (ok) {
      if (!ok) return cb(false);
      var files = ents.filter(function (e) { return M.entities[e] && !SER[e]; }).map(function (e) { return M.entities[e].file; });
      loadAll(files, cb);
    });
  }
  function withWorld(cb) { if (WORLD) return cb(true); load("world.js", function (ok) { WORLD = window.OQF_WORLD || null; cb(ok && !!WORLD); }); }
  function withLeaders(cb) { if (L) return cb(true); load("leaders.js", function (ok) { cb(ok && !!L); }); }
  function withWorldAvail(cb) { withManifest(function (ok) { if (!ok || !M.world_file) return cb(false); if (WAV) return cb(true); load(M.world_file, function (k) { cb(k && !!WAV); }); }); }
  function withTerms(cb) { withManifest(function (ok) { if (!ok || !M.terms_file) return cb(false); if (TERMS) return cb(true); load(M.terms_file, function (k) { cb(k && !!TERMS); }); }); }
  /* séries resumidas de um país fora do piloto (expansão automática) */
  function withWorldSeries(iso, cb) { withWorldAvail(function (ok) { var w = ok && WAV.c[iso]; if (!w || !w.f) return cb(false); if (SER[iso]) return cb(true); load(w.f, function (k) { cb(k && !!SER[iso]); }); }); }
  function allPilotEnts() { var a = []; PILOTS.forEach(function (p) { a = a.concat(ENTS[p]); }); return a; }
  function isDemo() { return !M || M.mode === "demo"; }
  function ind(id) { if (!M) return null; for (var i = 0; i < M.indicators.length; i++) if (M.indicators[i].id === id) return M.indicators[i]; return null; }
  function indName(x) { return x ? (LANG === "en" ? x.en : x.pt) : ""; }
  function indUnit(x) { return isDemo() ? (LANG === "en" ? M.unit_en : M.unit_pt) : x ? (LANG === "en" ? x.unit_en : x.unit_pt) : ""; }
  function indsOf(layer) { return M ? M.indicators.filter(function (I) { return I.layer === layer; }) : []; }
  /* escala SÓ de exibição (ex.: fração 0–1 → %), declarada no manifesto */
  function dv(I, v) { return I && I.scale && I.scale !== 1 ? v * I.scale : v; }
  function fmtI(I, v) { var d = I ? I.dec : 1; return v == null ? "—" : Number(v).toLocaleString(LANG === "en" ? "en-US" : "pt-BR", { minimumFractionDigits: d, maximumFractionDigits: d }); }
  function metaOf(ent, id) { return SER[ent] && SER[ent].meta ? SER[ent].meta[id] : null; }
  function noteTxt(meta, k) { var n = meta && meta.notes[k]; return n ? (LANG === "en" ? n[1] : n[0]) : ""; }
  /* nome legível da fonte (a sigla técnica fica nos detalhes) */
  function srcName(m) { return m ? (LANG === "en" ? (m.fn_en || m.fn || m.f) : (m.fn || m.f)) : ""; }
  function auditOf(I) { return I && I.audit === "a2" ? T.audit2 : T.audit3; }
  /* largura útil: gráficos são desenhados na largura real da tela, para o texto dos eixos não encolher */
  function vw() { return document.documentElement.clientWidth || window.innerWidth || 1000; }
  function narrow() { return vw() < 700; }
  function wvalues(id, cb) { if (VALS[id]) return cb(true); load("values/" + id + ".js", function (ok) { cb(ok && !!VALS[id]); }); }
  function errBox() { return '<div class="oqf-box"><b>' + esc(T.no_data) + "</b></div>"; }

  /* ---------------------------------------------------------- governantes */
  function lname(l) { return LANG === "en" && l.en_n ? l.en_n : l.n; }
  function lnote(l) { return LANG === "en" ? l.en : l.pt; }
  function party(p) { return (L && L.parties[p]) || { c: "#8b8f98", pt: p, en: p }; }
  function pname(p) { var x = party(p); return LANG === "en" ? x.en : x.pt; }
  function leadersOf(iso) { if (!L) return []; var a = L.leaders[iso] || []; return (iso === "RUS" || iso === "UKR") ? L.leaders.SUN.concat(a) : a; }
  function lanesOf(iso) { return (L && L.lanes[iso]) || []; }
  /* governantes com mandato que toca o ano (sem atribuir o ano a ninguém) */
  function leadersIn(iso, y) { return leadersOf(iso).filter(function (l) { return yf(l.a) < y + 1 && yf(l.b) > y; }); }
  function initials(n) { var w = n.replace(/[()]/g, "").split(/\s+/).filter(function (x) { return x.length > 2 || /^[A-ZÁÉÍÓÚ]/.test(x); }); return ((w[0] || "")[0] + (w.length > 1 ? w[w.length - 1][0] : (w[0] || "")[1] || "")).toUpperCase(); }
  function light(c) { var r = parseInt(c.substr(1, 2), 16), g = parseInt(c.substr(3, 2), 16), b = parseInt(c.substr(5, 2), 16); return (r * 299 + g * 587 + b * 114) / 1000 > 150; }
  function leaderChip(l, y) {
    var c = party(l.p).c;
    return '<span class="oqf-ldr"><i style="background:' + c + ";color:" + (light(c) ? "#15171c" : "#fff") + '">' + esc(initials(lname(l))) + "</i><span><b>" + esc(lname(l)) + "</b><small>" + esc(pname(l.p)) + " · " + (l.a === "1945-01-01" ? "…" : l.a.slice(0, 4)) + "–" + (l.b ? l.b.slice(0, 4) : "") + "</small></span></span>";
  }

  /* Linha do tempo de governantes (faixas de regime × mandatos, retratos com iniciais) */
  function govChart(iso, o) {
    o = o || {};
    var lanes = lanesOf(iso), ls = leadersOf(iso), ev = (L.events && L.events[iso]) || [];
    var W = o.w || 1180, ml = 150, mr = 18, laneH = 24, laneG = 8, tierH = 52, tiers = 2;
    var X = function (t) { return ml + (t - Y0) / (Y1 + 1 - Y0) * (W - ml - mr); };
    var top = tiers * tierH + 30, lanesH = lanes.length * (laneH + laneG), H = top + lanesH + tiers * tierH + 30;
    var laneY = {}; lanes.forEach(function (ln, i) { laneY[ln.id] = top + i * (laneH + laneG); });
    var g = '<defs><pattern id="oqf-int-' + iso + '" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="5" stroke="rgba(255,255,255,.65)" stroke-width="2"/></pattern></defs>';
    /* grade de anos */
    for (var yy = 1945; yy <= 2025; yy += 5) {
      var xx = X(yy);
      g += '<line class="g-grid' + (yy % 10 ? " minor" : "") + '" x1="' + xx.toFixed(1) + '" x2="' + xx.toFixed(1) + '" y1="' + (top - 6) + '" y2="' + (top + lanesH) + '"/>';
      if (yy % 10 === 5 || yy === 1945) g += '<text class="g-yr" x="' + xx.toFixed(1) + '" y="' + (top + lanesH + 14) + '">' + (yy === 1945 ? "1945" : "’" + String(yy).slice(2)) + "</text>";
    }
    /* faixas */
    lanes.forEach(function (ln) {
      var y = laneY[ln.id];
      g += '<text class="g-lane" x="' + (ml - 10) + '" y="' + (y + laneH / 2 + 4) + '">' + esc(LANG === "en" ? ln.en : ln.pt) + "</text>";
      g += '<rect class="g-track" x="' + X(Y0).toFixed(1) + '" y="' + y + '" width="' + (X(Y1 + 1) - X(Y0)).toFixed(1) + '" height="' + laneH + '"/>';
      g += '<rect class="g-span" x="' + X(Math.max(Y0, yf(ln.a))).toFixed(1) + '" y="' + y + '" width="' + (X(Math.min(Y1 + 1, yf(ln.b))) - X(Math.max(Y0, yf(ln.a)))).toFixed(1) + '" height="' + laneH + '"/>';
    });
    /* mandatos */
    var labels = [];
    ls.forEach(function (l, i) {
      var y = laneY[l.lane]; if (y == null) return;
      var a = Math.max(Y0, yf(l.a)), b = Math.min(Y1 + 1, yf(l.b)), x1 = X(a), x2 = Math.max(X(b), x1 + 1.2), c = party(l.p).c;
      var tt = lname(l) + " · " + pname(l.p) + " · " + dateTxt(l.a) + " – " + dateTxt(l.b) + (lnote(l) ? " · " + lnote(l) : "");
      g += '<g class="g-term" data-l="' + i + '"><rect x="' + x1.toFixed(1) + '" y="' + y + '" width="' + (x2 - x1).toFixed(1) + '" height="' + laneH + '" fill="' + c + '"/>' +
        (l.k === "int" || (b - a) < 1 ? '<rect x="' + x1.toFixed(1) + '" y="' + y + '" width="' + (x2 - x1).toFixed(1) + '" height="' + laneH + '" fill="url(#oqf-int-' + iso + ')"/>' : "") +
        "<title>" + esc(tt) + "</title></g>";
      if ((b - a) >= (o.minLabel || 1.4)) labels.push({ l: l, cx: (x1 + x2) / 2, y: y, c: c, tt: tt });
    });
    /* retratos: alternam acima e abaixo, em dois níveis, sem sobrepor */
    var slots = [[-1e9, -1e9], [-1e9, -1e9]], need = 112;
    labels.forEach(function (lb, i) {
      var pref = i % 2 ? 1 : 0, side = -1, tier = 0;
      [[pref, 0], [1 - pref, 0], [pref, 1], [1 - pref, 1]].some(function (st) { if (lb.cx - slots[st[0]][st[1]] >= need) { side = st[0]; tier = st[1]; return true; } return false; });
      if (side < 0) { side = pref; tier = slots[pref][0] < slots[pref][1] ? 0 : 1; }
      slots[side][tier] = lb.cx;
      var cy = side === 0 ? top - 34 - tier * tierH : top + lanesH + 34 + tier * tierH + 6;
      var ly = side === 0 ? lb.y : lb.y + laneH, cyEdge = side === 0 ? cy + 15 : cy - 15;
      var nm = lname(lb.l), short = nm.length > 18 ? nm.split(" ").slice(-1)[0] : nm;
      g += '<g class="g-ldr"><path class="g-conn" d="M' + lb.cx.toFixed(1) + " " + ly + "V" + cyEdge + '"/>' +
        '<circle cx="' + lb.cx.toFixed(1) + '" cy="' + cy + '" r="15" fill="' + lb.c + '"/><text class="g-ini" x="' + lb.cx.toFixed(1) + '" y="' + (cy + 4) + '" fill="' + (light(lb.c) ? "#15171c" : "#fff") + '">' + esc(initials(nm)) + "</text>" +
        '<text class="g-nm" x="' + lb.cx.toFixed(1) + '" y="' + (side === 0 ? cy - 20 : cy + 27) + '">' + esc(short.toUpperCase()) + '</text><text class="g-yy" x="' + lb.cx.toFixed(1) + '" y="' + (side === 0 ? cy - 31 : cy + 38) + '">' + (lb.l.a === "1945-01-01" ? "…" : lb.l.a.slice(0, 4)) + "–" + (lb.l.b ? lb.l.b.slice(0, 4) : "") + "</text><title>" + esc(lb.tt) + "</title></g>";
    });
    /* marcos */
    ev.forEach(function (e) { var x = X(yf(e.d)); g += '<line class="g-ev g-ev-' + e.k + '" x1="' + x.toFixed(1) + '" x2="' + x.toFixed(1) + '" y1="' + (top - 4) + '" y2="' + (top + lanesH - 4) + '"><title>' + esc(dateTxt(e.d) + " · " + (LANG === "en" ? e.en : e.pt)) + "</title></line>"; });
    if (o.mark) { var mx = X(o.mark + 0.5); g += '<line class="g-mark" x1="' + mx.toFixed(1) + '" x2="' + mx.toFixed(1) + '" y1="' + (top - 10) + '" y2="' + (top + lanesH) + '"/>'; }
    return '<div class="oqf-gov-scroll"><svg class="oqf-gov" viewBox="0 0 ' + W + " " + H + '" width="' + W + '" role="img" aria-label="' + esc(T.gov_h + " — " + T.countries[iso].name) + '">' + g + "</svg></div>";
  }
  function govLegend(iso) {
    var used = {}; leadersOf(iso).forEach(function (l) { used[l.p] = 1; });
    var src = [L.sources[iso]]; if (iso === "DEU") src.push(L.sources.GDR); if (iso === "RUS" || iso === "UKR") src.unshift(L.sources.SUN);
    return '<div class="oqf-gov-leg"><div class="oqf-gov-parties">' + Object.keys(used).map(function (p) { return '<span><i style="background:' + party(p).c + '"></i>' + esc(pname(p)) + "</span>"; }).join("") +
      '<span><i class="int"></i>' + esc(T.gov_int) + "</span>" + ["rup", "chg", "imp"].filter(function (k) { return ((L.events[iso] || []).some(function (e) { return e.k === k; })); }).map(function (k) { return '<span><i class="ev ev-' + k + '"></i>' + esc(T.gov_ev[k]) + "</span>"; }).join("") + "</div>" +
      '<p class="small">' + chip("ref") + " " + esc(T.gov_status) + " " + esc(T.gov_colors) + (iso === "UKR" ? " " + esc(T.gov_sun_note) : "") + "</p>" +
      '<p class="small oqf-gov-src">' + esc(T.gov_src) + ": " + src.map(function (s) { return '<a href="' + esc(s[1]) + '" target="_blank" rel="noopener noreferrer">' + esc(s[0]) + " ↗</a>"; }).join(" · ") + "</p></div>";
  }
  function govTable(iso) {
    return '<details class="oqf-gov-list"><summary>' + esc(T.gov_list) + " (" + leadersOf(iso).length + ')</summary><div class="oqf-scroll"><table class="oqf-ltable"><thead><tr>' + T.gov_cols.map(function (c) { return "<th>" + esc(c) + "</th>"; }).join("") + "</tr></thead><tbody>" +
      leadersOf(iso).map(function (l) { return "<tr><td>" + leaderChip(l) + "</td><td>" + dateTxt(l.a) + "</td><td>" + dateTxt(l.b) + "</td><td>" + esc(pname(l.p)) + "</td><td>" + esc(lnote(l) || "") + "</td></tr>"; }).join("") + "</tbody></table></div></details>";
  }
  /* faixa compacta de mandatos alinhada ao gráfico de linhas */
  function govBand(iso, a, b, o) {
    o = o || {};
    var W = o.w || 760, ml = o.ml != null ? o.ml : 46, mr = 12, rowH = 14, lanes = lanesOf(iso).filter(function (ln) { return yf(ln.a) < b + 1 && yf(ln.b) > a; });
    var X = function (t) { return ml + (t - a) / Math.max(1, b - a) * (W - ml - mr); };
    var inl = ml < 100, rowS = rowH + (inl ? 15 : 4), H = lanes.length * rowS + 4, g = "";
    lanes.forEach(function (ln, i) {
      var y = (inl ? 13 : 2) + i * rowS;
      leadersOf(iso).filter(function (l) { return l.lane === ln.id; }).forEach(function (l) {
        var s = Math.max(a, yf(l.a)), e = Math.min(b + 1, yf(l.b)); if (e <= s) return;
        var x1 = X(s), x2 = Math.max(X(e), x1 + 1), short = (yf(l.b) - yf(l.a)) < 1;
        g += '<rect x="' + x1.toFixed(1) + '" y="' + y + '" width="' + (x2 - x1).toFixed(1) + '" height="' + rowH + '" fill="' + party(l.p).c + '"' + (short ? ' class="b-short"' : "") + "><title>" + esc(lname(l) + " · " + pname(l.p) + " · " + dateTxt(l.a) + " – " + dateTxt(l.b)) + "</title></rect>";
        if (x2 - x1 > 46) g += '<text class="b-t" x="' + (x1 + 4).toFixed(1) + '" y="' + (y + 10.5) + '" fill="' + (light(party(l.p).c) ? "#15171c" : "#fff") + '">' + esc(initials(lname(l))) + "</text>";
      });
      g += (inl ? '<text class="b-l b-l-in" x="' + ml + '" y="' + (y - 3) + '">' : '<text class="b-l" x="' + (ml - 6) + '" y="' + (y + 10.5) + '">') + esc((LANG === "en" ? ln.en : ln.pt).split(" (")[0]) + "</text>";
    });
    if (o.mark) { var mx = X(o.mark + 0.5); g += '<line class="b-mark" x1="' + mx.toFixed(1) + '" x2="' + mx.toFixed(1) + '" y1="0" y2="' + H + '"/>'; }
    return '<svg class="oqf-band" viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="' + esc(T.gov_h + " — " + T.countries[iso].name) + '">' + g + "</svg>";
  }

  /* ---------------------------------------------------------- moldura comum */
  function banner() {
    if (!M) return "";
    if (M.mode === "demo") return '<div class="oqf-demo" role="note"><b>' + esc(T.demo_banner) + "</b><p>" + esc(T.demo_text) + "</p></div>";
    return '<div class="oqf-real" role="note"><b>' + esc(T.real_banner) + "</b><p>" + esc(LANG === "en" ? M.label_en : M.label_pt) + " · " + esc(M.generated) + "</p></div>";
  }
  function subnav(active) {
    var keys = ["", "mapa", "governantes", "perfil", "comparar", "mandatos", "metodologia"];
    return '<nav class="tabs oqf-subnav" aria-label="' + esc(T.title) + '">' + keys.map(function (k) {
      return '<a class="tab" href="' + link(k) + '"' + (k === active ? ' aria-current="page" aria-selected="true"' : "") + ">" + esc(SUBLBL(k)) + "</a>";
    }).join("") + "</nav>";
  }
  function hero(o) {
    var home = LANG === "en" ? "Home" : "Início";
    return '<section class="page-hero alt"><div class="wrap"><nav class="crumbs" aria-label="' + (LANG === "en" ? "You are here" : "Você está em") + '"><a href="#/">' + home + '</a><span><a href="' + link("") + '">' + esc(T.title) + "</a></span>" +
      (o.crumb ? "<span>" + (o.crumbLink ? '<a href="' + o.crumbLink + '">' + esc(o.crumb) + "</a>" : esc(o.crumb)) + "</span>" : "") + (o.crumb2 ? "<span>" + esc(o.crumb2) + "</span>" : "") + "</nav>" +
      '<div class="page-hero-grid"><div>' + (o.kicker ? '<div class="page-kicker">' + esc(o.kicker) + "</div>" : "") + '<h1 class="page-title">' + o.title + "</h1>" +
      (o.dek ? '<p class="page-dek">' + md(o.dek) + "</p>" : "") + "</div></div>" + subnav(o.active) + "</div></section>";
  }

  /* ---------------------------------------------------------- mapa (SVG) */
  function worldSvg(opts) {
    var W = WORLD, out = "";
    Object.keys(W.countries).forEach(function (k) {
      var c = W.countries[k], pilot = PILOTS.indexOf(k) > -1, nm = LANG === "en" ? c.en : c.pt;
      out += '<path class="oqf-c' + (pilot ? " is-pilot" : "") + '" d="' + c.d + '" data-iso="' + k + '"' +
        (opts.interactive && pilot ? ' tabindex="0" role="button" aria-label="' + esc(nm) + '"' : "") + ">" + (opts.interactive ? "" : "<title>" + esc(nm) + "</title>") + "</path>";
    });
    if (W.crimea) out += '<path class="oqf-crimea" d="' + W.crimea + '" data-iso="UKR"></path>';
    return '<svg class="oqf-world" viewBox="0 0 ' + W.w + " " + W.h + '" role="' + (opts.interactive ? "group" : "img") + '" aria-label="' + esc(opts.label || T.map_aria) + '"><defs>' +
      '<pattern id="oqf-hatch" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="5" height="5" class="h-bg"/><line x1="0" y1="0" x2="0" y2="5" class="h-ln"/></pattern>' +
      '<pattern id="oqf-hatch2" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)"><rect width="3" height="3" class="h-bg2"/><line x1="0" y1="0" x2="0" y2="3" class="h-ln2"/></pattern>' +
      '<filter id="oqf-glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>' + out + "</svg>";
  }
  function stateOf(iso, year, layer) {
    var pilot = PILOTS.indexOf(iso) > -1;
    if (layer === "pol") return pilot ? "np" : "prep";
    if (!M) return "prep";
    var rank = { P: 0, R: 1, X: 2, p: 3 }, best = null;
    function take(ch) { if (ch && ch !== "-" && (best === null || rank[ch] < rank[best])) best = ch; }
    if (pilot) {
      ENTS[iso].forEach(function (e) {
        var E = M.entities[e]; if (!E) return;
        var av = typeof E.avail === "string" ? (layer === "pros" ? E.avail : "") : (E.avail[layer] || "");
        take(av.charAt(year - M.y0));
      });
    } else {
      /* expansão mundial: existe na base, mas sem revisão manual por país */
      var w = WAV && WAV.c[iso]; if (!w) return "prep";
      take((w[layer] || "").charAt(year - WAV.y0));
      if (best === null) return "gap";
      return best === "p" ? "proj" : "auto";
    }
    if (best === null) return "gap";
    if (best === "p") return "proj";
    if (isDemo()) return "demo";
    return { P: "ok", R: "res", X: "exp" }[best];
  }

  function entitiesAt(iso, year) {
    var C = T.countries[iso]; if (!C) return [];
    return C.entities.filter(function (e) { return year >= e[2] && year <= e[3]; });
  }
  function cname(iso) { return T.countries[iso] ? T.countries[iso].name : WORLD && WORLD.countries[iso] ? (LANG === "en" ? WORLD.countries[iso].en : WORLD.countries[iso].pt) : iso; }

  /* ---------------------------------------------------------- PERGUNTAS PRONTAS */
  /* Cada pergunta abre uma visualização configurada com dados reais elegíveis.
     O teste tools/oqf_test.mjs confere que todas têm dados para cada país no período e respeitam a regra de comparabilidade. */
  var QUESTIONS = [
    { id: "pov_br", m: "paises", c: ["BRA"], i: "pov_inc", a: 1990, b: 2026 },
    { id: "infl_br", m: "governos", c: ["BRA"], i: "ipca_br", a: 1980, b: 2026, log: 1 },
    { id: "gdp_de", m: "paises", c: ["DEU"], i: "gdp_pc_ppp", a: 1990, b: 2026 },
    { id: "inc_life", m: "dispersao", c: ["BRA", "DEU", "RUS", "UKR"], i: "life_exp", j: "gdp_pc_ppp", t: 2023 },
    { id: "post_sov", m: "paises", c: ["RUS", "UKR"], i: "gdp_pc_ppp", a: 1990, b: 2026 },
    { id: "growth_gov", m: "governos", c: ["BRA"], i: "gdp_growth_br", a: 1946, b: 2026 },
    { id: "terms", href: "mandatos", c: ["BRA"] }
  ];
  OQF._questions = QUESTIONS;
  function qHref(x) {
    if (x.href) return link(x.href, "", qs({ c: x.c[0] === "BRA" ? "" : x.c[0] }));
    return link("comparar", "", qs({ c: x.c.join(","), i: x.i, j: x.j || "", t: x.t || "", a: x.a || "", b: x.b || "", m: x.m === "paises" ? "" : x.m, s: x.log ? "log" : "", p: x.id }));
  }
  function questionCards() {
    return '<div class="oqf-qs">' + QUESTIONS.map(function (x, k) {
      var Q = V.questions[x.id];
      return '<a class="oqf-qc" href="' + qHref(x) + '"><span class="oqf-qc-k">' + (k < 9 ? "0" : "") + (k + 1) + "</span><b>" + esc(Q[0]) + "</b><span>" + esc(Q[1]) + '</span><span class="oqf-qc-f">' + x.c.map(function (c) { return flag(c); }).join("") + "<em>" + esc(V.q_open) + " →</em></span></a>";
    }).join("") + "</div>";
  }

  /* ---------------------------------------------------------- ABERTURA */
  var guide = null;
  function renderLanding(app) {
    var h = '<section class="hero oqf-hero"><div class="wrap"><div class="hero-meta"><span><b>' + (LANG === "en" ? "New section" : "Nova seção") + "</b></span><span>1945 → 2026</span><span>" + (LANG === "en" ? "Prototype" : "Protótipo") + "</span></div>" +
      '<div class="oqf-hero-grid"><div><h1>' + esc(T.title).replace(/ /, "<br>") + '</h1><p class="hero-sub">' + esc(T.subtitle) + '</p><div class="hero-cta"><a class="btn btn--solid" href="#oqf-guide-s" data-oqf-jump="oqf-guide-s">' + esc(V.cta_guide) + ' <span class="arr">→</span></a><a class="btn btn--ghost" href="#oqf-qs-s" data-oqf-jump="oqf-qs-s">' + esc(V.cta_qs) + "</a></div></div>" +
      '<div class="oqf-hero-map" id="oqf-hero-map" aria-hidden="true"></div></div></div></section>';
    h += '<div class="oqf-subnav-bar"><div class="wrap">' + subnav("") + "</div></div>";
    h += '<section class="sec sec--paper"><div class="wrap wrap--narrow oqf-open"><div class="eyebrow">' + esc(T.sub[""]) + '</div><h2 class="oqf-q">' + esc(T.question) + "</h2>" +
      T.intro.map(function (p) { return '<p class="oqf-lede">' + esc(p) + "</p>"; }).join("") +
      '<p class="oqf-punch">' + esc(T.punch) + "</p>" +
      '<ul class="oqf-guard">' + T.guard.map(function (g) { return "<li>" + tagHtml("m", TAGTXT.m) + "<span>" + esc(g[1]) + "</span></li>"; }).join("") + "</ul></div></section>";
    h += '<section class="sec sec--dark2"><div class="wrap"><div class="oqf-axes">' + T.axes.map(function (a) {
      return '<div class="oqf-axis"><span class="oqf-axis-k">' + a.k + "</span><h3>" + esc(a.q) + "</h3><p>" + esc(a.d) + '</p><div class="oqf-axis-f"><span class="mono small">' + esc(a.a) + "</span>" + chip(a.st) + "</div></div>";
    }).join("") + "</div></div></section>";
    /* percurso guiado: um governante por vez, nas três perguntas */
    h += '<section class="sec sec--paper oqf-guide" id="oqf-guide-s"><div class="wrap"><div class="eyebrow">' + esc(V.guide_k) + '</div><h2 class="oqf-h2">' + esc(V.guide_h) + '</h2><p class="oqf-lead">' + esc(V.guide_d) + "</p>" +
      '<div class="oqf-guide-ctl"><div class="oqf-ctabs" role="tablist" aria-label="' + esc(V.t_step1) + '">' + PILOTS.map(function (k) { return '<button class="oqf-ctab" type="button" role="tab" data-oqf-gd="' + k + '" aria-selected="' + (k === "BRA") + '">' + flag(k) + "<span>" + esc(T.countries[k].name) + "</span></button>"; }).join("") + "</div>" +
      '<div class="oqf-f"><label for="oqf-gsel">' + esc(V.pick_leader) + '</label><select id="oqf-gsel" class="uf-select"></select></div></div>' +
      '<div id="oqf-guide-out"><div class="oqf-loading"></div></div></div></section>';
    h += '<section class="sec sec--dark" id="oqf-qs-s"><div class="wrap"><div class="eyebrow">' + esc(V.qs_k) + '</div><h2 class="oqf-h2">' + esc(V.qs_h) + '</h2><p class="oqf-lead oqf-lead--d">' + esc(V.qs_d) + "</p>" + questionCards() + "</div></section>";
    h += '<section class="sec sec--dark2"><div class="wrap"><div class="eyebrow">' + esc(T.strip_h) + '</div><div class="oqf-strip" tabindex="0" role="list">' + T.strip.map(function (s) {
      return '<div class="oqf-strip-i" role="listitem"><b>' + s[0] + "</b><span>" + esc(s[1]) + "</span></div>";
    }).join("") + '</div><p class="oqf-note">' + tagHtml("c", TAGTXT.c) + " " + esc(T.strip_note) + "</p></div></section>";
    h += '<section class="sec sec--paper"><div class="wrap"><div class="eyebrow">' + esc(T.cards_h) + '</div><div class="method oqf-cards">' + T.cards.map(function (c, i) {
      return '<a href="' + link(c[0]) + '"><small class="mono">0' + (i + 1) + "</small><b>" + esc(c[1]) + "</b><span>" + esc(c[2]) + "</span></a>";
    }).join("") + "</div></div></section>";
    h += '<section class="sec sec--white sec--tight"><div class="wrap"><div class="eyebrow">' + esc(T.status_h) + '</div><div class="oqf-audit-rows">' + T.audits.map(function (a) {
      return '<a class="oqf-audit-row" href="' + link("metodologia") + '"><b>' + esc(a.k) + "</b><span>" + esc(a.h) + "</span>" + chip(a.st) + "</a>";
    }).join("") + '</div><div id="oqf-mode" class="oqf-mode"></div></div></section>';
    app.innerHTML = h;
    guide = { c: "BRA", l: null };
    withWorld(function (ok) {
      var el = document.getElementById("oqf-hero-map"); if (!el || !ok) return;
      el.innerHTML = worldSvg({ interactive: false, label: T.title });
    });
    withManifest(function (ok) { var el = document.getElementById("oqf-mode"); if (el && ok) el.innerHTML = banner(); });
    drawGuide();
  }
  function drawGuide() {
    var G = guide; if (!G) return;
    withLeaders(function (okL) { withSeries(ENTS[G.c], function (okS) { withTerms(function () {
      if (guide !== G) return;
      var out = document.getElementById("oqf-guide-out"), sel = document.getElementById("oqf-gsel"); if (!out) return;
      if (!okL || !okS) { out.innerHTML = errBox(); return; }
      var ls = leadersOf(G.c);
      if (G.l == null || !ls[G.l]) { G.l = ls.length - 1; for (var i = ls.length - 1; i >= 0; i--) { if (termGov(LANE_ENT[ls[i].lane], ls[i])) { G.l = i; break; } } }
      if (sel) sel.innerHTML = ls.map(function (l, i) { return '<option value="' + i + '"' + (i === G.l ? " selected" : "") + ">" + esc(lname(l) + " · " + (l.a === "1945-01-01" ? "…" : l.a.slice(0, 4)) + "–" + (l.b ? l.b.slice(0, 4) : "")) + "</option>"; }).join("");
      [].forEach.call(document.querySelectorAll("[data-oqf-gd]"), function (b) { b.setAttribute("aria-selected", b.getAttribute("data-oqf-gd") === G.c); });
      out.innerHTML = leaderBlock(G.c, ls[G.l], G.x || []);
    }); }); });
  }

  /* ---------------------------------------------------------- MAPA (painel) */
  var mapState = null, playTimer = null, PANEL_IND = ["life_exp", "gdp_pc_ppp", "gdp_growth", "inflation"];
  var SHORT = { life_exp: ["Saúde", "Health"], gdp_pc_ppp: ["Renda", "Income"], gdp_growth: ["PIB", "GDP"], inflation: ["Inflação", "Inflation"], gini: ["Desigualdade", "Inequality"], gdp_proxy: ["Renda", "Income"] };
  function shortName(I) { var x = SHORT[I.id]; return x ? x[LANG === "en" ? 1 : 0] : indName(I); }
  function renderMap(app, q) {
    var y = clampY(q.y, 1990), layer = { pol: 1, pros: 1, eco: 1 }[q.l] ? q.l : "pros";
    var sel = (q.c || "").split(",").filter(function (x) { return PILOTS.indexOf(x) > -1; });
    mapState = { y: y, l: layer, s: q.s || "", sel: sel, i: q.i || "life_exp", v: q.v === "val" ? "val" : "disp" };
    var h = hero({ active: "mapa", crumb: T.sub.mapa, kicker: T.title, title: esc(T.map_h), dek: T.map_dek });
    var ticks = ""; for (var t = 1950; t <= 2020; t += 10) ticks += '<span style="left:' + ((t - Y0) / (Y1 - Y0) * 100).toFixed(2) + '%">' + t + "</span>";
    h += '<section class="sec sec--dark2 sec--tight oqf-dash"><div class="wrap"><div id="oqf-banner"></div>' +
      '<div class="oqf-kpis">' + T.kpis.map(function (k) { return '<div class="oqf-kpi"><b>' + esc(k[0]) + "</b><span>" + esc(k[1]) + "</span><small>" + esc(k[2]) + "</small></div>"; }).join("") +
      '<div class="oqf-kpi oqf-kpi-y"><b id="oqf-yv">' + y + "</b><span>" + esc(T.kpi_year) + '</span><small id="oqf-ys"></small></div></div>' +
      '<div class="oqf-board"><div class="oqf-mapcard"><div class="oqf-mapbar"><div class="oqf-modes" role="tablist" aria-label="' + esc(V.map_mode) + '">' + ["disp", "val"].map(function (m) { return '<button type="button" role="tab" data-oqf-vmode="' + m + '" aria-selected="' + (m === mapState.v) + '"><b>' + esc(V.map_modes[m][0]) + "</b><small>" + esc(V.map_modes[m][1]) + "</small></button>"; }).join("") + '</div><div id="oqf-mapsub" class="oqf-mapsub"></div></div>' +
      '<p class="oqf-layer-note" id="oqf-ln"></p>' +
      '<div class="oqf-map" id="oqf-map"><div class="oqf-loading"></div></div><div class="oqf-tt" id="oqf-tt" hidden></div>' +
      '<div class="oqf-legend" id="oqf-legend"></div>' +
      '<div class="oqf-player"><button class="oqf-play" id="oqf-play" type="button" aria-pressed="false" aria-label="' + esc(T.play) + '">▶</button><div class="oqf-range"><label class="sr-only" for="oqf-y">' + esc(T.year) + '</label><input type="range" id="oqf-y" min="' + Y0 + '" max="' + Y1 + '" step="1" value="' + y + '"><div class="oqf-ticks" aria-hidden="true">' + ticks + "</div></div></div>" +
      '<p class="oqf-y26" id="oqf-y26" hidden>' + esc(T.y2026) + "</p></div>" +
      '<aside class="oqf-panel" id="oqf-panel" aria-live="polite"></aside></div>' +
      '<div class="oqf-tblcard"><h3>' + esc(T.tbl_h) + '</h3><div class="oqf-scroll"><table class="oqf-ctable" id="oqf-ctable"></table></div></div>' +
      '<p class="oqf-note">' + tagHtml("m", TAGTXT.m) + " " + esc(T.borders_note) + "</p></div></section>";
    app.innerHTML = h;
    withManifest(function () {
      var b = document.getElementById("oqf-banner"); if (b) b.innerHTML = banner();
      loadAll(["world.js", "leaders.js"].concat(M && M.world_file ? [M.world_file] : []), function () {
        WORLD = window.OQF_WORLD || null;
        withSeries(allPilotEnts(), function () {
          var m = document.getElementById("oqf-map"); if (!m) return;
          if (!WORLD) { m.innerHTML = errBox(); return; }
          var names = Object.keys(WORLD.countries).map(function (k) { return [k, LANG === "en" ? WORLD.countries[k].en : WORLD.countries[k].pt]; }).sort(function (a, b) { return a[1].localeCompare(b[1], LANG); });
          m.innerHTML = worldSvg({ interactive: true }) + '<label class="sr-only" for="oqf-sel">' + esc(T.map_aria) + '</label><select id="oqf-sel" class="oqf-sel"><option value="">' + esc(T.pick_hint) + "</option>" +
            names.map(function (n) { return '<option value="' + n[0] + '"' + (n[0] === mapState.s ? " selected" : "") + ">" + esc(n[1]) + (PILOTS.indexOf(n[0]) > -1 ? " ★" : "") + "</option>"; }).join("") + "</select>";
          paintMap();
        });
      });
    });
  }
  /* Modo "valores": só os 4 indicadores comparáveis entre países (C1 / apta), classes fixas por indicador,
     paleta neutra (sem verde × vermelho), "sem dado" explícito, expansão automática separada dos pilotos. */
  var SEQ = ["#1e3247", "#224e68", "#296a84", "#378699", "#53a1a9", "#7fbbb6", "#b5d7c7"];
  var VBINS = {
    life_exp: { b: [55, 60, 65, 70, 75, 80], pal: SEQ },
    gdp_pc_ppp: { b: [2000, 5000, 10000, 20000, 40000, 60000], pal: SEQ },
    gdp_growth: { b: [-5, 0, 2, 4, 6], pal: ["#8a5526", "#c2894a", SEQ[1], SEQ[3], SEQ[4], SEQ[6]] },
    inflation: { b: [0, 2, 5, 10, 20, 50], pal: ["#6f5f98", SEQ[1], SEQ[2], SEQ[3], SEQ[4], SEQ[5], SEQ[6]] }
  };
  OQF._vbins = VBINS;
  function vbin(id, v) { var B = VBINS[id].b, k = 0; while (k < B.length && v >= B[k]) k++; return k; }
  function vlabels(id) {
    var I = ind(id), B = VBINS[id].b, f = function (x) { return fmtAx(x); };
    return VBINS[id].pal.map(function (c, k) { return [c, k === 0 ? "< " + f(B[0]) : k === B.length ? "≥ " + f(B[k - 1]) : f(B[k - 1]) + " – " + f(B[k])]; });
  }
  function valueAt(id, iso, y) { var d = VALS[id] && VALS[id].c[iso]; if (!d) return null; for (var i = 0; i < d.length; i++) if (d[i][0] === y) return d[i]; return null; }
  function paintMapSub() {
    var S = mapState, el = document.getElementById("oqf-mapsub"); if (!el) return;
    el.innerHTML = S.v === "disp" ? '<div class="tabs" role="tablist" aria-label="' + esc(T.layer) + '">' + ["pol", "pros", "eco"].map(function (l) { return '<button class="tab" role="tab" data-oqf-layer="' + l + '" aria-selected="' + (l === S.l) + '">' + esc(T.layers[l]) + "</button>"; }).join("") + "</div>"
      : '<div class="oqf-seg oqf-seg--lg" role="tablist" aria-label="' + esc(T.ind_lbl) + '">' + PANEL_IND.map(function (i) { var J = ind(i); return J ? '<button type="button" role="tab" data-oqf-pind="' + i + '" aria-selected="' + (i === S.i) + '" title="' + esc(indName(J)) + '">' + esc(shortName(J)) + "</button>" : ""; }).join("") + "</div>";
    [].forEach.call(document.querySelectorAll("[data-oqf-vmode]"), function (b) { b.setAttribute("aria-selected", b.getAttribute("data-oqf-vmode") === S.v); });
  }
  function paintMap() {
    var S = mapState; if (!S || !WORLD) return;
    if (S.v === "val" && !VALS[S.i]) { if (PANEL_IND.indexOf(S.i) < 0) S.i = "life_exp"; return wvalues(S.i, function (ok) { if (!ok) { S.v = "disp"; } if (mapState === S) paintMap(); }); }
    paintMapSub();
    var used = {}, val = S.v === "val";
    [].forEach.call(document.querySelectorAll("#oqf-map .oqf-c"), function (el) {
      var iso = el.getAttribute("data-iso"), pilot = PILOTS.indexOf(iso) > -1, cls = "oqf-c" + (pilot ? " is-pilot" : "") + (iso === S.s ? " is-sel" : "") + (S.sel.indexOf(iso) > -1 ? " is-cmp" : "");
      if (val) {
        var p = valueAt(S.i, iso, S.y);
        if (p) { el.style.fill = VBINS[S.i].pal[vbin(S.i, p[1])]; cls += " v-on" + (p[2] === "R" ? " is-r" : "") + (pilot ? "" : " is-auto"); used.v = 1; if (p[2] === "R") used.r = 1; }
        else { el.style.fill = ""; cls += " v-nd"; used.nd = 1; }
      } else { el.style.fill = ""; var st = stateOf(iso, S.y, S.l); used[st] = 1; cls += " st-" + st; }
      el.setAttribute("class", cls);
    });
    var selEl = S.s && document.querySelector('#oqf-map .oqf-c[data-iso="' + S.s + '"]'); if (selEl) selEl.parentNode.appendChild(selEl);
    var cr = document.querySelector("#oqf-map .oqf-crimea");
    if (cr) {
      cr.parentNode.appendChild(cr); cr.style.fill = "";
      if (S.y >= 2014) cr.setAttribute("class", "oqf-crimea is-occ" + (S.s === "UKR" ? " is-sel" : ""));
      else if (val) { var src = document.querySelector('#oqf-map .oqf-c[data-iso="' + (S.y < 1954 ? "RUS" : "UKR") + '"]'); cr.style.fill = src ? src.style.fill : ""; cr.setAttribute("class", "oqf-crimea" + (cr.style.fill ? "" : " v-nd")); }
      else cr.setAttribute("class", "oqf-crimea st-" + stateOf(S.y < 1954 ? "RUS" : "UKR", S.y, S.l) + (S.s === "UKR" ? " is-sel" : ""));
    }
    var yv = document.getElementById("oqf-yv"); if (yv) yv.textContent = S.y;
    var ys = document.getElementById("oqf-ys"); if (ys) ys.textContent = S.y >= 2024 ? T.states.proj[0] : "";
    var r = document.getElementById("oqf-y"); if (r && +r.value !== S.y) r.value = S.y;
    var ln = document.getElementById("oqf-ln");
    if (ln) ln.innerHTML = val ? "<b>" + esc(indName(ind(S.i))) + ".</b> " + esc(V.val_note) : "<b>" + esc(T.layers[S.l]) + ".</b> " + esc(T.layer_note[S.l]);
    var y26 = document.getElementById("oqf-y26"); if (y26) y26.hidden = val || S.y < 2024 || S.l !== "pros";
    var lg = document.getElementById("oqf-legend");
    if (lg && val) {
      var I = ind(S.i), m = metaOf("BRA", S.i);
      lg.innerHTML = '<div class="oqf-vleg"><p class="oqf-vleg-h"><b>' + esc(indName(I)) + "</b> · " + esc(indUnit(I)) + " · " + S.y + "</p>" +
        '<div class="oqf-vleg-s">' + vlabels(S.i).map(function (x) { return '<span class="oqf-lg"><i class="sw" style="background:' + x[0] + '"></i>' + esc(x[1]) + "</span>"; }).join("") + "</div>" +
        '<div class="oqf-vleg-s"><span class="oqf-lg"><i class="sw sw-nd"></i>' + esc(V.leg_nd) + '</span><span class="oqf-lg"><i class="sw sw-pilot"></i>' + esc(V.leg_pilot) + '</span><span class="oqf-lg"><i class="sw sw-auto"></i>' + esc(V.leg_auto) + '</span><span class="oqf-lg"><i class="sw sw-r"></i>' + esc(V.leg_r) + "</span>" + (S.y >= 2014 ? '<span class="oqf-lg"><i class="sw sw-crimea"></i>' + esc(LANG === "en" ? "Crimea (occupied)" : "Crimeia (ocupada)") + "</span>" : "") + "</div>" +
        '<p class="oqf-vleg-n">' + esc(T.c_src) + ": " + esc(srcName(m)) + " · <code>" + esc(VALS[S.i].serie) + "</code> · " + esc(V.leg_hist) + "</p></div>";
    } else if (lg) {
      var order = ["ok", "res", "auto", "exp", "demo", "proj", "prelim", "np", "pend", "prep", "gap"];
      lg.innerHTML = order.filter(function (k) { return used[k] || (k === "prelim" && S.l === "pros" && S.y >= 2024); }).map(function (k) {
        return '<span class="oqf-lg"><i class="sw st-' + k + '"></i>' + esc(T.states[k][0]) + (used[k] ? "" : " (0)") + "</span>";
      }).join("") + (S.y >= 2014 ? '<span class="oqf-lg"><i class="sw sw-crimea"></i>' + esc(LANG === "en" ? "Crimea (occupied)" : "Crimeia (ocupada)") + "</span>" : "");
    }
    paintPanel(); paintTable();
    setHash(link("mapa", "", qs({ y: S.y, l: S.l === "pros" ? "" : S.l, v: val ? "val" : "", s: S.s, c: S.sel.join(","), i: S.i === "life_exp" ? "" : S.i })));
  }
  function layersDl(iso, y) { return '<dl class="oqf-panel-layers">' + ["pol", "pros", "eco"].map(function (l) { return "<dt>" + esc(T.layers[l]) + "</dt><dd>" + chip(stateOf(iso, y, l)) + "</dd>"; }).join("") + "</dl>"; }
  function paintPanel() {
    var S = mapState, el = document.getElementById("oqf-panel"); if (!el) return;
    if (!S.s || !WORLD.countries[S.s]) {
      el.innerHTML = '<div class="oqf-panel-h"><h3>' + esc(T.panel_none_h) + '</h3></div><p class="oqf-panel-n">' + esc(T.panel_none) + '</p><div class="oqf-quick">' +
        PILOTS.map(function (k) { return '<button type="button" data-oqf-pick="' + k + '">' + flag(k) + "<span>" + esc(T.countries[k].name) + "</span>" + chip(stateOf(k, S.y, S.l)) + "</button>"; }).join("") + "</div>" + selBox();
      return;
    }
    var pilot = PILOTS.indexOf(S.s) > -1;
    var h = '<div class="oqf-panel-h">' + flag(S.s) + "<h3>" + esc(cname(S.s)) + '</h3><button type="button" class="oqf-x" data-oqf-close aria-label="' + esc(T.close) + '">×</button></div>';
    if (!pilot) {
      var w = WAV && WAV.c[S.s];
      el.innerHTML = h + '<p class="mono small">' + tf(T.in_year, { y: S.y }) + "</p>" + layersDl(S.s, S.y) + '<div id="oqf-wchart" class="oqf-pchart">' + (w && w.f ? '<div class="oqf-loading"></div>' : '<p class="oqf-panel-n">' + chip("prep") + "</p>") + "</div>" +
        '<p class="oqf-panel-n">' + esc(w ? T.not_pilot_auto : T.not_pilot) + "</p>" + selBox();
      if (w && w.f) withWorldSeries(S.s, function (ok) { if (mapState && mapState.s === S.s) paintWorldChart(ok); });
      return;
    }
    var ents = entitiesAt(S.s, S.y), lds = leadersIn(S.s, S.y);
    h += '<div class="oqf-pk"><div><small>' + esc(tf(T.ent_in, { y: S.y })) + "</small>" + ents.map(function (e) { return "<b>" + esc(T.ent_names[e[0]] || e[1]) + "</b>"; }).join("") + "</div>" +
      "<div><small>" + esc(tf(T.gov_in, { y: S.y })) + "</small>" + (lds.length ? lds.map(function (l) { return leaderChip(l); }).join("") : "<b>—</b>") + "</div></div>";
    var inds = panelInds();
    var list = seriesFor(S.s, S.i, Y0, Y1), has = list.some(function (s) { return s.pts.length; });
    h += '<div class="oqf-pchart">' + panelSeg(inds) + (has ? chart(list, { a: Y0, b: Y1, mini: true, mark: S.y, dark: true, I: ind(S.i) }) + panelVal(list, ind(S.i), S.y) : '<p class="oqf-panel-n">' + chip("prep") + " " + esc(T.no_data) + "</p>") + "</div>";
    if (L) h += '<div class="oqf-pband"><small>' + esc(T.gov_h) + "</small>" + govBand(S.s, Y0, Y1, { w: 320, ml: 0, mark: S.y }) + "</div>";
    h += layersDl(S.s, S.y);
    var on = S.sel.indexOf(S.s) > -1;
    h += '<div class="oqf-panel-cta"><a class="btn btn--solid btn--sm" href="' + link("perfil", S.s, qs({ y: S.y })) + '">' + esc(T.open_profile) + ' <span class="arr">→</span></a><button type="button" class="btn btn--ghost btn--sm" data-oqf-add="' + S.s + '" aria-pressed="' + on + '">' + esc(on ? T.in_cmp : T.add_cmp) + "</button></div>";
    el.innerHTML = h + selBox();
  }
  function panelInds() {
    var inds = PANEL_IND.filter(function (i) { return ind(i); }); if (!inds.length && M) inds = M.indicators.slice(0, 3).map(function (x) { return x.id; });
    if (inds.indexOf(mapState.i) < 0) mapState.i = inds[0];
    return inds;
  }
  function panelSeg(inds) {
    var I = ind(mapState.i);
    return '<div class="oqf-pchart-h"><b>' + esc(indName(I)) + '</b><div class="oqf-seg" role="tablist" aria-label="' + esc(T.ind_lbl) + '">' + inds.map(function (i) { var J = ind(i); return '<button type="button" role="tab" data-oqf-pind="' + i + '" aria-selected="' + (i === mapState.i) + '" title="' + esc(indName(J)) + '">' + esc(shortName(J)) + "</button>"; }).join("") + "</div></div>";
  }
  /* valor no ano escolhido (ou o último antes dele), com unidade, fonte e tipo */
  function panelVal(list, I, y) {
    var best = null;
    list.forEach(function (s) { s.pts.forEach(function (p) { if (p[0] <= y && (!best || p[0] > best.p[0])) best = { p: p, s: s }; }); });
    if (!best) return '<p class="mono small">' + esc(tf(T.no_obs_until, { y: y })) + "</p>";
    var m = metaOf(best.s.ent, I.id);
    return '<p class="mono small oqf-pval"><b>' + fmtI(I, dv(I, best.p[1])) + "</b> " + esc(indUnit(I)) + " · " + best.p[0] + (best.p[0] !== y ? " (" + esc(T.last_before) + ")" : "") + " · " + esc(T.types[best.p[2]]) + " · " + esc(T.cats[best.p[5]]) +
      (m ? "<br>" + esc(T.c_src) + ": " + esc(srcName(m)) : "") + (noteTxt(m, best.p[6]) ? '<br><span class="oqf-note-i">' + esc(noteTxt(m, best.p[6])) + "</span>" : "") + "</p>";
  }
  function paintWorldChart(ok) {
    var S = mapState, box = document.getElementById("oqf-wchart"); if (!box) return;
    if (!ok) { box.innerHTML = '<p class="oqf-panel-n">' + chip("prep") + "</p>"; return; }
    var inds = panelInds(), I = ind(S.i);
    var pts = (SER[S.s].ind[S.i] || []), list = [{ ent: S.s, iso: S.s, pts: pts }];
    box.innerHTML = panelSeg(inds) + (pts.length ? chart(list, { a: Y0, b: Y1, mini: true, mark: S.y, dark: true, I: I }) + panelVal(list, I, S.y) : '<p class="oqf-panel-n">' + chip("prep") + " " + esc(T.no_data) + "</p>") +
      '<p class="small">' + chip("auto") + " " + esc(T.auto_note) + "</p>";
  }
  function paintTable() {
    var S = mapState, t = document.getElementById("oqf-ctable"); if (!t) return;
    t.innerHTML = "<thead><tr>" + T.tbl_cols.map(function (c) { return "<th>" + esc(tf(c, { y: S.y })) + "</th>"; }).join("") + "</tr></thead><tbody>" +
      PILOTS.map(function (k) {
        var lds = leadersIn(k, S.y);
        return '<tr class="' + (k === S.s ? "is-sel" : "") + '" data-oqf-pick="' + k + '" tabindex="0"><td>' + flag(k) + " <b>" + esc(T.countries[k].name) + "</b></td><td>" + entitiesAt(k, S.y).map(function (e) { return esc(T.ent_names[e[0]] || e[1]); }).join(" + ") + "</td><td>" + (lds.map(function (l) { return esc(lname(l)); }).join(", ") || "—") + "</td>" +
          ["pol", "pros", "eco"].map(function (l) { return '<td data-l="' + esc(T.layers[l]) + '">' + chip(stateOf(k, S.y, l)) + "</td>"; }).join("") + "</tr>";
      }).join("") + '<tr class="is-rest"><td>' + esc(T.tbl_rest) + "</td><td>—</td><td>—</td>" + '<td data-l="' + esc(T.layers.pol) + '">' + chip("prep") + '</td><td data-l="' + esc(T.layers.pros) + '">' + restCount("pros", S.y) + '</td><td data-l="' + esc(T.layers.eco) + '">' + restCount("eco", S.y) + "</td></tr></tbody>";
  }
  function restCount(layer, y) {
    if (!WAV) return chip("prep");
    var n = 0, t = 0; Object.keys(WAV.c).forEach(function (k) { t++; var ch = (WAV.c[k][layer] || "").charAt(y - WAV.y0); if (ch === "P" || ch === "R") n++; });
    return chip("auto") + ' <span class="mono small">' + esc(tf(T.rest_n, { n: n, t: t })) + "</span>";
  }
  function selBox() {
    var S = mapState; if (!S.sel.length) return "";
    return '<div class="oqf-selbox"><span class="mono small">' + esc(T.sel_h) + "</span><div>" + S.sel.map(function (k) { return flag(k) + esc(T.countries[k].name); }).join(" · ") + '</div><a class="btn btn--ghost btn--sm" href="' + link("comparar", "", qs({ c: S.sel.join(","), a: 1950, b: 2026 })) + '">' + esc(T.sel_go) + "</a></div>";
  }
  function tooltip(iso, ev) {
    var tt = document.getElementById("oqf-tt"), card = tt && tt.parentNode; if (!tt || !mapState) return;
    if (!iso) { tt.hidden = true; return; }
    var S = mapState, pilot = PILOTS.indexOf(iso) > -1, r = card.getBoundingClientRect();
    var h = '<div class="oqf-tt-h">' + flag(iso) + "<b>" + esc(cname(iso)) + "</b></div>";
    if (S.v === "val") { var I = ind(S.i), p = valueAt(S.i, iso, S.y); h += p ? '<p class="oqf-tt-v"><b>' + fmtI(I, dv(I, p[1])) + "</b> " + esc(indUnit(I)) + " · " + S.y + "<br>" + chip(p[2] === "P" ? "ok" : "res") + (pilot ? "" : " " + chip("auto")) + "</p>" : '<p class="oqf-tt-v">' + esc(tf(V.tt_nd, { y: S.y })) + "</p>"; }
    else h += chip(stateOf(iso, S.y, S.l));
    if (pilot) {
      var lds = leadersIn(iso, S.y);
      h += '<dl><dt>' + esc(tf(T.ent_in, { y: S.y })) + "</dt><dd>" + entitiesAt(iso, S.y).map(function (e) { return esc(T.ent_names[e[0]] || e[1]); }).join(" + ") + "</dd>" +
        (lds.length ? "<dt>" + esc(tf(T.gov_in, { y: S.y })) + "</dt><dd>" + lds.map(function (l) { return esc(lname(l)); }).join(", ") + "</dd>" : "") + '</dl><small class="oqf-tt-hint">' + esc(T.tt_click) + "</small>";
    }
    if (iso === "UKR" && S.y >= 2014) h += '<small class="oqf-tt-hint">' + esc(T.crimea) + "</small>";
    tt.innerHTML = h; tt.hidden = false;
    var x = ev.clientX - r.left + 16, y = ev.clientY - r.top + 16, w = tt.offsetWidth, hh = tt.offsetHeight;
    if (x + w > r.width - 8) x = ev.clientX - r.left - w - 16;
    if (y + hh > r.height - 8) y = ev.clientY - r.top - hh - 12;
    tt.style.left = Math.max(8, x) + "px"; tt.style.top = Math.max(8, y) + "px";
  }
  function stopPlay() { if (playTimer) { clearInterval(playTimer); playTimer = null; } var b = document.getElementById("oqf-play"); if (b) { b.setAttribute("aria-pressed", "false"); b.textContent = "▶"; b.setAttribute("aria-label", T.play); } }

  /* ---------------------------------------------------------- GOVERNANTES */
  function renderLeaders(app, q) {
    var iso = PILOTS.indexOf((q.c || "").toUpperCase()) > -1 ? q.c.toUpperCase() : "BRA";
    var h = hero({ active: "governantes", crumb: SUBLBL("governantes"), kicker: T.title, title: esc(T.gov_h), dek: T.gov_dek });
    h += '<section class="sec sec--paper sec--tight"><div class="wrap"><div class="tabs" role="tablist" aria-label="' + esc(T.gov_h) + '">' + PILOTS.map(function (k) { return '<button class="tab" role="tab" data-oqf-gc="' + k + '" aria-selected="' + (k === iso) + '">' + flag(k) + " " + esc(T.countries[k].name) + "</button>"; }).join("") + "</div>" +
      '<p class="small oqf-gov-conv">' + tagHtml("m", TAGTXT.m) + " " + esc(T.gov_conv) + '</p><div id="oqf-gov-out" class="oqf-gov-card"><div class="oqf-loading"></div></div></div></section>';
    app.innerHTML = h;
    withLeaders(function (ok) { drawLeaders(iso, ok); });
  }
  function drawLeaders(iso, ok) {
    var out = document.getElementById("oqf-gov-out"); if (!out) return;
    if (!ok) { out.innerHTML = errBox(); return; }
    out.innerHTML = '<div class="oqf-gov-head">' + flag(iso, "lg") + "<h2>" + esc(T.countries[iso].name) + '</h2><a class="small" href="' + link("perfil", iso) + '">' + esc(T.open_profile) + " →</a></div>" + govChart(iso) + govLegend(iso) + govTable(iso);
    setHash(link("governantes", "", qs({ c: iso === "BRA" ? "" : iso })));
  }

  /* ---------------------------------------------------------- PERFIS */
  /* Grupos de navegação. Só reorganizam: todo indicador do manifesto aparece em exatamente um grupo (testado). */
  var GROUPS = {
    pros: [["saude", ["life_exp", "infant"]], ["educacao", ["school"]], ["renda", ["gdp_pc_ppp", "gni", "median_inc", "median_cons"]], ["pobreza", ["pov_inc", "pov_cons"]], ["desigualdade", ["gini_inc", "gini_cons"]], ["indice", ["hdi"]]],
    eco: [["crescimento", ["gdp_growth", "gdp_pc_growth", "gdp_growth_br"]], ["precos", ["inflation", "ipca_br", "policy_rate"]], ["emprego", ["unemp"]], ["fiscal", ["debt", "primary"]], ["investimento", ["gfcf"]], ["externo", ["trade", "current_acc"]]]
  };
  OQF._groups = GROUPS;
  var LANE_ENT = { r46: "BRA", mil: "BRA", nr: "BRA", frg: "FRG", gdr: "GDR", deu: "DEU", occ: null, sun: "SUN", rus: "RUS", ukr: "UKR" };
  var KEY_IND = ["life_exp", "gdp_pc_ppp", "gdp_growth", "inflation", "unemp", "pov_inc", "pov_cons", "infant", "debt"];
  var prof = null;
  function renderProfiles(app) {
    var h = hero({ active: "perfil", crumb: T.sub.perfil, kicker: T.title, title: esc(T.prof_h), dek: T.prof_dek });
    h += '<section class="sec sec--paper"><div class="wrap"><div class="oqf-pilots">' + PILOTS.map(function (k) {
      var C = T.countries[k];
      return '<a class="oqf-pilot" href="' + link("perfil", k) + '">' + flag(k, "lg") + "<h3>" + esc(C.name) + '</h3><ul>' + C.entities.map(function (e) { return "<li><b>" + esc(T.ent_names[e[0]] || e[1]) + '</b> <span class="mono small">' + e[2] + "–" + (e[3] === Y1 ? "" : e[3]) + "</span></li>"; }).join("") + '</ul><span class="oqf-more">' + esc(T.open_profile) + " →</span></a>";
    }).join("") + "</div></div></section>";
    app.innerHTML = h;
  }
  function entTimeline(iso) {
    var C = T.countries[iso], span = Y1 - Y0 + 1;
    var ticks = [1945, 1960, 1975, 1990, 2005, 2026].map(function (y) { return '<span style="left:' + ((y - Y0) / span * 100).toFixed(2) + '%">' + y + "</span>"; }).join("");
    return '<div class="oqf-tl"><div class="oqf-tl-rows">' + C.entities.map(function (e) {
      var l = (e[2] - Y0) / span * 100, w = (e[3] - e[2] + 1) / span * 100;
      return '<div class="oqf-tl-row"><span class="oqf-tl-lbl">' + esc(T.ent_names[e[0]] || e[1]) + '</span><div class="oqf-tl-track"><i class="ent-' + e[0] + '" style="left:' + l.toFixed(2) + "%;width:" + w.toFixed(2) + '%"></i></div></div>';
    }).join("") + '</div><div class="oqf-tl-ticks">' + ticks + "</div></div>";
  }
  /* indicadores que se aplicam ao país (renda × consumo: o tipo de pesquisa que o país não usa não aparece como lacuna) */
  function hasData(iso, id) { return seriesFor(iso, id, Y0, Y1).some(function (s) { return s.pts.length; }); }
  function applies(iso, I) {
    if (I.only && I.only.indexOf(iso) < 0) return false;
    var m = /^(.*)_(inc|cons)$/.exec(I.id);
    if (m && !hasData(iso, I.id) && hasData(iso, m[1] + (m[2] === "inc" ? "_cons" : "_inc"))) return false;
    return true;
  }
  function groupInds(layer, key, iso) { var G = GROUPS[layer].filter(function (g) { return g[0] === key; })[0]; return G ? G[1].map(ind).filter(function (I) { return I && (!iso || applies(iso, I)); }) : []; }
  var PTABS = ["geral", "pros", "eco", "gov", "fontes"];
  function renderProfile(app, iso, q) {
    if (!T.countries[iso]) return renderProfiles(app);
    var C = T.countries[iso];
    prof = { iso: iso, t: PTABS.indexOf(q.t) > -1 ? q.t : "geral", g: q.g || "", l: q.l != null && q.l !== "" ? +q.l : null, x: (q.x || "").split(",").filter(Boolean), y: q.y ? clampY(q.y, null) : null };
    var h = hero({ active: "perfil", crumb: T.sub.perfil, crumbLink: link("perfil"), crumb2: C.name, kicker: (LANG === "en" ? "Pilot country · Batch 0" : "País-piloto · Lote 0"), title: flag(iso, "xl") + esc(C.name) });
    h += '<section class="sec sec--paper sec--tight oqf-prof-sec"><div class="wrap"><div id="oqf-banner"></div>' +
      '<div class="oqf-ptabs" role="tablist" aria-label="' + esc(C.name) + '">' + PTABS.map(function (k) { return '<button type="button" class="oqf-ptab" role="tab" data-oqf-ptab="' + k + '" aria-selected="' + (k === prof.t) + '">' + esc(V.ptabs[k]) + "</button>"; }).join("") + "</div>" +
      '<div id="oqf-ptab" class="oqf-ptab-body" role="tabpanel"><div class="oqf-loading"></div></div></div></section>';
    app.innerHTML = h;
    withLeaders(function () {
      withSeries(ENTS[iso], function (ok) {
        var b = document.getElementById("oqf-banner"); if (b) b.innerHTML = banner();
        prof.ok = ok; drawProfileTab();
      });
    });
  }
  function profHash() { var P = prof; setHash(link("perfil", P.iso, qs({ t: P.t === "geral" ? "" : P.t, g: (P.t === "pros" || P.t === "eco") ? P.g : "", l: P.t === "gov" && P.l != null ? P.l : "", x: P.t === "gov" ? P.x.join(",") : "", y: P.y || "" }))); }
  function drawProfileTab() {
    var P = prof, out = document.getElementById("oqf-ptab"); if (!out || !P) return;
    [].forEach.call(document.querySelectorAll("[data-oqf-ptab]"), function (b) { b.setAttribute("aria-selected", b.getAttribute("data-oqf-ptab") === P.t); });
    if (!P.ok || !M) { out.innerHTML = errBox(); return; }
    var iso = P.iso, C = T.countries[iso], h = "";
    if (P.t === "geral") h = profOverview(iso, C);
    else if (P.t === "pros" || P.t === "eco") h = profLayer(iso, P.t);
    else if (P.t === "gov") h = profGov(iso);
    else h = '<section class="oqf-sec"><h2>' + esc(V.ptabs.fontes) + '</h2><p class="small oqf-lead">' + esc(V.src_lead) + "</p>" + sourcesBlock() + "</section>";
    out.innerHTML = h;
    if (P.t === "gov") drawLeaderPanel();
    profHash();
  }
  function profOverview(iso, C) {
    var h = '<div class="oqf-ov">';
    h += '<section class="oqf-sec"><h2>' + esc(V.ov_hist) + '</h2><div class="oqf-two"><div><p class="oqf-lead">' + esc(C.borders) + '</p><p class="oqf-note small">' + esc(T.strip_note) + '</p></div><ol class="oqf-events">' +
      C.events.map(function (e) { return '<li><time datetime="' + e[0] + '">' + dateTxt(e[0]) + "</time><span>" + esc(e[1]) + "</span></li>"; }).join("") + "</ol></div></section>";
    h += '<section class="oqf-sec"><h2>' + esc(V.ov_terr) + '</h2><p class="small oqf-lead">' + esc(V.ov_terr_d) + "</p>" + entTimeline(iso) + '<details class="oqf-tech"><summary>' + esc(V.ov_ents) + '</summary><dl class="oqf-ents">' + C.entities.map(function (e) {
      return "<dt><code>" + esc(e[0]) + "</code> " + esc(e[1]) + ' <span class="mono small">' + e[2] + "–" + (e[3] === Y1 ? "" : e[3]) + "</span></dt><dd>" + esc(e[4]) + "</dd>";
    }).join("") + "</dl></details></section>";
    if (L) h += '<section class="oqf-sec"><h2>' + esc(V.ov_gov) + '</h2><div class="oqf-ovband">' + govBand(iso, Y0, Y1, { w: narrow() ? 640 : 1080, ml: 0 }) + '</div><p class="small"><button type="button" class="oqf-link" data-oqf-ptab="gov">' + esc(V.ov_gov_go) + " →</button></p></section>";
    /* resumo do que existe, por camada e grupo (sem valores agregados) */
    h += '<section class="oqf-sec"><h2>' + esc(V.ov_inds) + '</h2><p class="small oqf-lead">' + esc(V.ov_inds_d) + '</p><div class="oqf-ovgrid">' + ["pros", "eco"].map(function (layer) {
      return '<div class="oqf-ovcol"><h3>' + esc(V.ptabs[layer]) + ' <span class="mono small">' + esc(layer === "pros" ? T.audit2 : T.audit3) + "</span></h3>" + GROUPS[layer].map(function (G) {
        var xs = groupInds(layer, G[0], iso); if (!xs.length) return "";
        return '<div class="oqf-ovg"><button type="button" class="oqf-ovg-h" data-oqf-goto="' + layer + "|" + G[0] + '">' + esc(V.groups[G[0]]) + " →</button><ul>" + xs.map(function (I) {
          var d = cardData(iso, I);
          return "<li><span>" + esc(indName(I)) + '</span><span class="mono small">' + (d.has ? d.first.p[0] + "–" + d.last.p[0] : esc(V.none)) + "</span></li>";
        }).join("") + "</ul></div>";
      }).join("") + "</div>";
    }).join("") + "</div></section>";
    var qsx = QUESTIONS.filter(function (x) { return x.c && x.c.indexOf(iso) > -1; });
    h += '<section class="oqf-sec oqf-sec--last"><h2>' + esc(V.ov_go) + '</h2><div class="oqf-shortcuts">' +
      '<a class="oqf-sc" href="' + link("mandatos", "", qs({ c: iso === "BRA" ? "" : iso })) + '"><b>' + esc(SUBLBL("mandatos")) + "</b><span>" + esc(V.sc_terms) + "</span></a>" +
      '<a class="oqf-sc" href="' + link("comparar", "", qs({ c: iso })) + '"><b>' + esc(T.sub.comparar) + "</b><span>" + esc(V.sc_cmp) + "</span></a>" +
      '<a class="oqf-sc" href="' + link("mapa", "", qs({ s: iso })) + '"><b>' + esc(T.sub.mapa) + "</b><span>" + esc(V.sc_map) + "</span></a>" +
      qsx.map(function (x) { return '<a class="oqf-sc oqf-sc--q" href="' + qHref(x) + '"><b>' + esc(V.q_kicker) + "</b><span>" + esc(V.questions[x.id][0]) + "</span></a>"; }).join("") + "</div></section>";
    return h + "</div>";
  }
  function profLayer(iso, layer) {
    var P = prof, groups = GROUPS[layer].filter(function (G) { return groupInds(layer, G[0], iso).length; });
    if (!groups.some(function (G) { return G[0] === P.g; })) { var first = groups.filter(function (G) { return groupInds(layer, G[0], iso).some(function (I) { return hasData(iso, I.id); }); })[0] || groups[0]; P.g = first ? first[0] : ""; }
    var h = '<p class="small oqf-lead">' + esc(layer === "pros" ? T.pros_note : T.eco_note) + "</p>";
    h += '<div class="oqf-groups" role="tablist" aria-label="' + esc(V.ptabs[layer]) + '">' + groups.map(function (G) {
      var xs = groupInds(layer, G[0], iso), n = xs.filter(function (I) { return hasData(iso, I.id); }).length;
      return '<button type="button" role="tab" class="oqf-grp" data-oqf-pgrp="' + G[0] + '" aria-selected="' + (G[0] === P.g) + '">' + esc(V.groups[G[0]]) + ' <small>' + n + "</small></button>";
    }).join("") + "</div>";
    var xs = groupInds(layer, P.g, iso);
    h += '<div class="oqf-cards2">' + xs.map(function (I, k) { return edCard(iso, I, { big: k === 0 && xs.length > 1 }); }).join("") + "</div>";
    if (layer === "eco") h += '<p class="small oqf-more-l"><a href="' + link("mandatos", "", qs({ c: iso === "BRA" ? "" : iso })) + '">' + esc(T.terms_link) + " →</a></p>";
    return h;
  }
  /* dados de um cartão: pontos, primeiro e último, ressalvas, categorias */
  function cardData(iso, I, o) {
    o = o || {};
    var list = (o.ents ? o.ents.filter(function (e) { return SER[e] && SER[e].ind[I.id]; }).map(function (e) { return { ent: e, iso: iso, pts: SER[e].ind[I.id].filter(function (p) { return p[0] >= (o.a || Y0) && p[0] <= (o.b || Y1); }) }; }) : seriesFor(iso, I.id, o.a || Y0, o.b || Y1));
    var d = { list: list, has: false, first: null, last: null, notes: [], cats: {}, types: {}, ents: [] };
    var seen = {};
    list.forEach(function (s) {
      if (!s.pts.length) return; d.has = true; d.ents.push(s.ent);
      var mm = metaOf(s.ent, I.id);
      s.pts.forEach(function (p, i) {
        if (!d.last || p[0] > d.last.p[0]) d.last = { p: p, e: s.ent }; if (!d.first || p[0] < d.first.p[0]) d.first = { p: p, e: s.ent };
        d.cats[p[5]] = 1; d.types[p[2]] = 1;
        var t = noteTxt(mm, p[6]); if (t) t.split("; ").forEach(function (x) { if (x && !seen[x]) { seen[x] = 1; d.notes.push(x); } });
        if (i && p[0] - s.pts[i - 1][0] > 1) d.gaps = true;
      });
    });
    return d;
  }
  /* ressalvas visíveis: as críticas (território, quebra, séries incompatíveis) nunca ficam escondidas */
  var CRIT_RE = /quebra|mud(a|ou)|não equivalentes|antes de|emendar|exclu|break|chang|not equivalent|before|splice|territor/i;
  function caveats(iso, I, d) {
    var crit = [], other = [];
    if (d.ents.length > 1) crit.push(tf(V.crit_terr, { e: d.ents.map(function (e) { return T.ent_names[e] || e; }).join(" · ") }));
    d.notes.forEach(function (n) { (CRIT_RE.test(n) ? crit : other).push(n); });
    if (!I.intl && !d.notes.some(function (n) { return /entre países|across countries|between countries/i.test(n); })) other.push(I.only ? V.crit_only : V.crit_nat);
    if (d.gaps) other.push(V.note_gaps);
    return { crit: crit, other: other };
  }
  function catChips(cats) { return Object.keys(cats).sort().map(function (c) { return chip(c === "P" ? "ok" : "res"); }).join(" "); }
  /* Cartão editorial: o essencial à vista; o técnico (ids, versão, série, método, valores) recolhido. */
  function edCard(iso, I, o) {
    o = o || {};
    var d = cardData(iso, I, o), head = '<header class="oqf-ec-h"><h3>' + esc(indName(I)) + "</h3>";
    if (!d.has) return '<article class="oqf-ec is-empty">' + head + '<p class="oqf-ec-u">' + esc(indUnit(I)) + '</p></header><p class="oqf-ec-none">' + esc(o.emptyTxt || V.card_none) + "</p></article>";
    var m = metaOf(d.last.e, I.id), cv = caveats(iso, I, d), single = d.list.filter(function (s) { return s.pts.length; });
    head += '<p class="oqf-ec-sub">' + esc(T.countries[iso] ? T.countries[iso].name : cname(iso)) + " · " + d.first.p[0] + "–" + d.last.p[0] + "</p></header>";
    var big = '<div class="oqf-ec-v"><b>' + fmtI(I, dv(I, d.last.p[1])) + '</b><span>' + esc(indUnit(I)) + '</span><small>' + esc(tf(V.last_in, { y: d.last.p[0] })) + (single.length > 1 ? " · " + esc(T.ent_names[d.last.e] || d.last.e) : "") + "</small></div>";
    var leg = single.length > 1 ? '<p class="oqf-ec-leg">' + single.map(function (s) { return '<span><i class="' + (DASH[s.ent] ? "dsh" : "") + '" style="border-color:' + (COLOR[iso] || "#8fa3c9") + '"></i>' + esc(T.ent_names[s.ent] || s.ent) + "</span>"; }).join("") + "</p>" : "";
    /* no recorte de um governante não há número em destaque: o último dado da janela pode ser de outro governo */
    if (o.noBig) big = '<p class="oqf-ec-u">' + esc(indUnit(I)) + "</p>";
    var h = '<article class="oqf-ec' + (o.big ? " is-big" : "") + '">' + head + big +
      '<div class="oqf-ec-chart">' + chart(d.list, { a: o.a || Math.max(Y0, Math.floor(d.first.p[0] / 5) * 5), b: o.b || 2025, mini: !o.big, w: o.big && !narrow() ? 1000 : null, h: o.big && !narrow() ? 300 : null, I: I, shade: o.shade, band: o.band, last: !o.shade, label: indName(I) }) + "</div>" + leg +
      '<p class="oqf-ec-src">' + esc(T.c_src) + ": <b>" + esc(srcName(m)) + "</b> · " + esc(auditOf(I)) + "</p>" +
      (cv.crit.length ? '<p class="oqf-crit" role="note">' + cv.crit.map(esc).join("<br>") + "</p>" : "") +
      (cv.other.length ? '<p class="oqf-ec-note">' + esc(T.caveats) + ": " + esc(cv.other.join("; ")) + "</p>" : "");
    h += techBlock(iso, I, d, m) + (o.noCmp ? "" : '<a class="oqf-ec-go" href="' + link("comparar", "", qs({ c: iso, i: I.id, a: Math.max(Y0, Math.floor(d.first.p[0] / 5) * 5), b: Y1 })) + '">' + esc(I.intl ? V.go_cmp_intl : V.go_cmp) + " →</a>") + "</article>";
    return h;
  }
  function techBlock(iso, I, d, m) {
    var rows = [];
    d.list.forEach(function (s) {
      if (!s.pts.length) return; var mm = metaOf(s.ent, I.id);
      rows.push("<dt>" + esc(V.t_series) + (d.ents.length > 1 ? " · " + esc(T.ent_names[s.ent] || s.ent) : "") + "</dt><dd><code>" + esc(mm ? mm.s : "—") + "</code><br>" + esc(mm ? mm.f + " · " + mm.v : "") + "</dd>");
    });
    rows.push("<dt>" + esc(V.t_cat) + "</dt><dd>" + catChips(d.cats) + " " + esc(V.t_cat_d) + "</dd>");
    rows.push("<dt>" + esc(T.c_type) + "</dt><dd>" + Object.keys(d.types).map(function (t) { return esc(T.types[t]); }).join(", ") + "</dd>");
    rows.push("<dt>" + esc(T.c_cmpb) + "</dt><dd>" + esc(I.intl ? T.c_intl_yes : T.c_intl_no) + (I.only ? " · " + esc(T.only_br) : "") + "</dd>");
    rows.push("<dt>" + esc(V.t_method) + "</dt><dd>" + esc(V.t_method_d) + (I.scale && I.scale !== 1 ? " " + esc(T.scale_note) : "") + "</dd>");
    rows.push("<dt>" + esc(V.t_ids) + "</dt><dd><code>" + esc(d.first.p[7] || "—") + "</code> (" + d.first.p[0] + ")<br><code>" + esc(d.last.p[7] || "—") + "</code> (" + d.last.p[0] + ")</dd>");
    var all = [];
    d.list.forEach(function (s) { s.pts.forEach(function (p) { all.push({ p: p, e: s.ent }); }); });
    all.sort(function (x, y) { return y.p[0] - x.p[0]; });
    var tbl = '<details class="oqf-vals"><summary>' + esc(tf(V.t_values, { n: all.length })) + '</summary><div class="oqf-scroll"><table class="oqf-vtable"><thead><tr><th>' + esc(T.c_year) + "</th>" + (d.ents.length > 1 ? "<th>" + esc(V.t_entity) + "</th>" : "") + "<th>" + esc(V.t_value) + "</th><th>" + esc(T.c_type) + "</th><th>" + esc(V.t_cat) + "</th><th>" + esc(V.t_rel) + "</th><th>id_observacao</th></tr></thead><tbody>" +
      all.map(function (x) { var p = x.p; return "<tr><td>" + p[0] + "</td>" + (d.ents.length > 1 ? "<td>" + esc(T.ent_names[x.e] || x.e) + "</td>" : "") + '<td class="num">' + fmtI(I, dv(I, p[1])) + "</td><td>" + esc(T.types[p[2]]) + "</td><td>" + esc(p[5] === "P" ? "S" : p[5]) + "</td><td>" + esc(p[3] + " / " + p[4]) + "</td><td><code>" + esc(p[7] || "") + "</code></td></tr>"; }).join("") + "</tbody></table></div></details>";
    return '<details class="oqf-tech"><summary>' + esc(V.tech) + '</summary><dl class="oqf-tdl">' + rows.join("") + "</dl>" + tbl + "</details>";
  }
  /* aba Governos: linha do tempo + um governante por vez */
  function profGov(iso) {
    var h = '<section class="oqf-sec"><h2>' + esc(V.gov_h1) + '</h2><p class="small oqf-lead">' + esc(T.gov_conv) + "</p>";
    if (!L) return h + errBox() + "</section>";
    h += '<div class="oqf-gov-card">' + govChart(iso, { mark: prof.y }) + govLegend(iso) + govTable(iso) + "</div></section>";
    var ls = leadersOf(iso);
    if (prof.l == null || !ls[prof.l]) { prof.l = null; for (var i = ls.length - 1; i >= 0; i--) { var e = LANE_ENT[ls[i].lane]; if (e && SER[e]) { prof.l = i; break; } } if (prof.l == null) prof.l = ls.length - 1; }
    h += '<section class="oqf-sec oqf-sec--last" id="oqf-ldr"><h2>' + esc(V.gov_h2) + '</h2><p class="small oqf-lead">' + esc(V.gov_h2_d) + '</p><div class="oqf-f oqf-ldr-f"><label for="oqf-lsel">' + esc(V.pick_leader) + '</label><select id="oqf-lsel" class="uf-select">' +
      ls.map(function (l, i) { return '<option value="' + i + '"' + (i === prof.l ? " selected" : "") + ">" + esc(lname(l) + " · " + (l.a === "1945-01-01" ? "…" : l.a.slice(0, 4)) + "–" + (l.b ? l.b.slice(0, 4) : "")) + "</option>"; }).join("") + '</select></div><div id="oqf-ldr-out"><div class="oqf-loading"></div></div></section>';
    return h;
  }
  function drawLeaderPanel() {
    var P = prof, out = document.getElementById("oqf-ldr-out"); if (!out) return;
    var l = leadersOf(P.iso)[P.l]; if (!l) { out.innerHTML = ""; return; }
    withTerms(function () { if (prof === P) out.innerHTML = leaderBlock(P.iso, l, P.x); });
  }
  /* Quem governou → o que foi implementado → o que foi observado (sem atribuir causa) */
  var lxN = 0;
  function leaderBlock(iso, l, extra) {
    var ent = LANE_ENT[l.lane], a = yf(l.a), b = yf(l.b), wa = Math.max(Y0, Math.floor(a) - 5), wb = Math.min(2025, Math.ceil(b) + 5);
    var lane = lanesOf(iso).filter(function (x) { return x.id === l.lane; })[0];
    var h = '<ol class="oqf-steps">';
    h += '<li class="oqf-step"><span class="oqf-step-k">1</span><div><h3>' + esc(V.step1) + "</h3>" + leaderChip(l) + '<p class="small">' + dateTxt(l.a) + " – " + dateTxt(l.b) + (lane ? " · " + esc(LANG === "en" ? lane.en : lane.pt) : "") + "</p>" + (lnote(l) ? '<p class="small">' + esc(lnote(l)) + "</p>" : "") + '<p class="small oqf-muted">' + chip("ref") + " " + esc(V.step1_d) + "</p></div></li>";
    h += '<li class="oqf-step"><span class="oqf-step-k">2</span><div><h3>' + esc(V.step2) + "</h3>" + chip("np") + '<p class="small">' + esc(V.step2_d) + "</p></div></li>";
    var inds = ent && SER[ent] ? M.indicators.filter(function (I) { return SER[ent].ind[I.id] && SER[ent].ind[I.id].some(function (p) { return p[0] >= wa && p[0] <= wb; }); }) : [];
    var keys = KEY_IND.filter(function (id) { return inds.some(function (I) { return I.id === id; }); }).slice(0, 4);
    var show = keys.concat((extra || []).filter(function (id) { return keys.indexOf(id) < 0 && inds.some(function (I) { return I.id === id; }); }));
    var gov = termGov(ent, l);
    h += '<li class="oqf-step"><span class="oqf-step-k">3</span><div class="oqf-step-w"><h3>' + esc(V.step3) + "</h3>";
    if (!inds.length) h += '<p class="oqf-ec-none">' + esc(tf(V.no_ent, { e: T.ent_names[ent] || (lane ? (LANG === "en" ? lane.en : lane.pt) : "—") })) + "</p>";
    else {
      h += '<p class="small oqf-lead">' + esc(tf(V.step3_d, { a: wa, b: wb })) + "</p>" +
        '<div class="oqf-cards2 is-mini">' + show.map(function (id) { return edCard(iso, ind(id), { ents: [ent], a: wa, b: wb, shade: [a, b], noCmp: true, noBig: true }); }).join("") + "</div>";
      var rest = inds.filter(function (I) { return show.indexOf(I.id) < 0; });
      if (rest.length) h += '<div class="oqf-f oqf-addsel"><label for="oqf-lxs-' + (++lxN) + '">' + esc(V.add_ind) + '</label><select id="oqf-lxs-' + lxN + '" class="uf-select" data-oqf-lxs><option value="">' + esc(tf(V.add_n, { n: rest.length })) + "</option>" +
        ["pros", "eco"].map(function (ly) { var xs = rest.filter(function (I) { return I.layer === ly; }); return xs.length ? '<optgroup label="' + esc(V.ptabs[ly]) + '">' + xs.map(function (I) { return '<option value="' + I.id + '">' + esc(indName(I)) + "</option>"; }).join("") + "</optgroup>" : ""; }).join("") + "</select></div>";
      if (gov) h += '<p class="oqf-cta-line"><a class="btn btn--solid btn--sm" href="' + link("mandatos", "", qs({ c: iso === "BRA" ? "" : iso, g: gov })) + '">' + esc(V.open_terms) + ' <span class="arr">→</span></a></p>';
    }
    h += '<p class="oqf-causal">' + tagHtml("m", TAGTXT.m) + " " + esc(T.terms_causal) + "</p></div></li></ol>";
    return h;
  }
  /* governo do painel da Auditoria 3 que começa dentro do mandato listado */
  function termGov(ent, l) {
    if (!TERMS || !ent || !TERMS.rows[ent]) return "";
    var hit = TERMS.rows[ent].filter(function (r) { return r.a >= l.a && (!l.b || r.a < l.b); })[0];
    return hit ? hit.g : "";
  }
  function sourcesBlock() {
    if (isDemo()) return "<p>" + esc(T.srcs_demo) + '</p><ul class="src-list">' + M.indicators.map(function (I) { return "<li>" + esc(indName(I)) + " — " + esc(I.src) + " · " + esc(LANG === "en" ? I.unit_en : I.unit_pt) + "</li>"; }).join("") + "</ul>";
    var bySrc = {};
    M.indicators.forEach(function (I) {
      var m = null; allPilotEnts().some(function (e) { m = metaOf(e, I.id); return !!m; });
      var k = m ? srcName(m) : I.src; (bySrc[k] = bySrc[k] || { m: m, xs: [] }).xs.push(I);
    });
    return '<div class="oqf-srcs">' + Object.keys(bySrc).sort().map(function (k) {
      var B = bySrc[k];
      return '<div class="oqf-srcg"><h3>' + esc(k) + "</h3>" + (B.m ? '<p class="mono small">' + esc(B.m.v) + "</p>" : "") + "<ul>" + B.xs.map(function (I) { return "<li>" + esc(indName(I)) + ' <code>' + esc(I.serie) + "</code> · " + esc(auditOf(I)) + "</li>"; }).join("") + "</ul></div>";
    }).join("") + "</div>" + versionsLine();
  }

  function versionsLine() {
    if (!M || isDemo()) return "";
    return '<p class="mono small oqf-vers">' + esc(T.audit2) + " " + esc(M.a2.version) + " · " + esc(M.a2.files.join(", ")) + " · SHA-256 " + esc(M.a2.sha256.slice(0, 12)) + "…<br>" +
      esc(T.audit3) + " " + esc(M.a3.version) + " · " + esc(M.a3.files.join(", ")) + " · SHA-256 " + esc(M.a3.sha256.slice(0, 12)) + "…<br>" + esc(T.generated) + " " + esc(M.generated) + "</p>";
  }

  /* ---------------------------------------------------------- séries e gráficos */
  function seriesFor(iso, indId, a, b) {
    return ENTS[iso].filter(function (e) { return SER[e] && SER[e].ind[indId]; }).map(function (e) {
      return { ent: e, iso: iso, pts: SER[e].ind[indId].filter(function (p) { return p[0] >= a && p[0] <= b; }) };
    });
  }
  function valAt(ent, indId, y) { var s = SER[ent] && SER[ent].ind[indId]; if (!s) return null; for (var i = 0; i < s.length; i++) if (s[i][0] === y) return s[i]; return null; }
  function style(t) { return t === "r" ? "r" : t === "p" ? "p" : "o"; }
  function segments(pts) {
    var segs = [], cur = null;
    pts.forEach(function (p, i) {
      var st = style(p[2]), prev = pts[i - 1];
      if (!cur || cur.st !== st || (prev && p[0] - prev[0] > 1)) { cur = { st: st, pts: [] }; segs.push(cur); }
      cur.pts.push(p);
    });
    return segs;
  }
  function niceStep(range, n) { var raw = range / n, p = Math.pow(10, Math.floor(Math.log10(raw))), f = raw / p; return (f < 1.5 ? 1 : f < 3 ? 2 : f < 7 ? 5 : 10) * p; }
  /* Gráfico de linhas. o: {a, b, I, mini, mark, band:[a,b], shade:[a,b], log, noY, w, h, label}
     Nunca interpola: qualquer ano ausente quebra a linha. Escala log só se todos os valores forem > 0. */
  function chart(list, o) {
    var I = o.I || null, V0 = function (p) { return dv(I, p[1]); };
    var nar = narrow();
    var W = o.w || (o.mini ? 320 : nar ? Math.max(300, Math.min(760, vw() - 44)) : 760);
    var H = o.h || (o.mini ? 120 : nar ? Math.round(Math.min(300, W * 0.72)) : 340);
    var ml = o.mini || o.noY ? 8 : nar ? 40 : 52, mr = 12, mt = 12, mb = o.mini ? 18 : 30;
    var vals = []; list.forEach(function (s) { s.pts.forEach(function (p) { vals.push(V0(p)); }); });
    if (!vals.length) return '<p class="oqf-empty">' + esc(T.c_empty) + "</p>";
    var log = !!o.log && vals.every(function (v) { return v > 0; });
    var VV = log ? function (p) { return Math.log10(V0(p)); } : V0;
    var tv = vals.map(function (v) { return log ? Math.log10(v) : v; });
    var lo = Math.min.apply(null, tv), hi = Math.max.apply(null, tv), pad = (hi - lo) * 0.08 || 1; lo -= pad; hi += pad;
    var X = function (y) { return ml + (y - o.a) / Math.max(1, o.b - o.a) * (W - ml - mr); };
    var Yp = function (v) { return mt + (1 - (v - lo) / (hi - lo)) * (H - mt - mb); };
    var g = "";
    if (o.shade) g += '<rect class="shade" x="' + X(Math.max(o.a, o.shade[0])).toFixed(1) + '" y="' + mt + '" width="' + Math.max(1, X(Math.min(o.b, o.shade[1])) - X(Math.max(o.a, o.shade[0]))).toFixed(1) + '" height="' + (H - mt - mb) + '"/>';
    if (o.band) [o.band[0], o.band[1]].forEach(function (t) { if (t >= o.a && t <= o.b + 1) g += '<line class="bd" x1="' + X(t).toFixed(1) + '" x2="' + X(t).toFixed(1) + '" y1="' + mt + '" y2="' + (H - mb) + '"/>'; });
    var ticks = [];
    if (log) { for (var e = Math.floor(lo); e <= Math.ceil(hi); e++) [1, 2, 5].forEach(function (m) { var v = Math.log10(m) + e; if (v >= lo && v <= hi) ticks.push([v, m * Math.pow(10, e)]); }); if (ticks.length > 7) ticks = ticks.filter(function (t) { return Math.abs(t[0] - Math.round(t[0])) < 1e-9; }); }
    else { var step = niceStep(hi - lo, o.mini ? 2 : nar ? 4 : 5); for (var v = Math.ceil(lo / step) * step; v <= hi; v += step) ticks.push([v, +v.toFixed(6)]); }
    ticks.forEach(function (t) {
      g += '<line class="gr" x1="' + ml + '" x2="' + (W - mr) + '" y1="' + Yp(t[0]).toFixed(1) + '" y2="' + Yp(t[0]).toFixed(1) + '"/>';
      if (o.noY) return;
      if (!o.mini) g += '<text class="ax" x="' + (ml - 6) + '" y="' + (Yp(t[0]) + 4).toFixed(1) + '" text-anchor="end">' + fmtAx(t[1]) + "</text>";
      else g += '<text class="ax ax-mini" x="' + (ml + 1) + '" y="' + (Yp(t[0]) - 2).toFixed(1) + '">' + fmtAx(t[1]) + "</text>";
    });
    if (!log && lo < 0 && hi > 0) g += '<line class="gr zero" x1="' + ml + '" x2="' + (W - mr) + '" y1="' + Yp(0).toFixed(1) + '" y2="' + Yp(0).toFixed(1) + '"/>';
    var span = o.b - o.a, xstep = span > 60 ? (nar && !o.mini ? 20 : 15) : span > 30 ? (nar ? 15 : 10) : span > 12 ? 5 : span > 6 ? 2 : 1;
    for (var yy = Math.ceil(o.a / xstep) * xstep; yy <= o.b; yy += xstep) g += '<text class="ax" x="' + X(yy).toFixed(1) + '" y="' + (H - (o.mini ? 4 : 8)) + '" text-anchor="middle">' + yy + "</text>";
    if (o.mark && o.mark >= o.a && o.mark <= o.b) g += '<line class="mk" x1="' + X(o.mark).toFixed(1) + '" x2="' + X(o.mark).toFixed(1) + '" y1="' + mt + '" y2="' + (H - mb) + '"/>' + (o.mini ? "" : '<text class="mk-t" x="' + (X(o.mark) + 5).toFixed(1) + '" y="' + (mt + 12) + '">' + esc(T.c_marker) + " · " + o.mark + "</text>");
    list.forEach(function (s) {
      var col = o.color || COLOR[s.iso] || "#8fa3c9", dash = DASH[s.ent] || "";
      segments(s.pts).forEach(function (seg) {
        var d = seg.pts.map(function (p, i) { return (i ? "L" : "M") + X(p[0]).toFixed(1) + " " + Yp(VV(p)).toFixed(1); }).join("");
        var da = seg.st === "r" ? "1.5 3" : seg.st === "p" ? "" : dash;
        if (seg.st !== "p" && seg.pts.length > 1) g += '<path class="ln ln-' + seg.st + '" d="' + d + '" stroke="' + col + '"' + (da ? ' stroke-dasharray="' + da + '"' : "") + "/>";
        var showPts = seg.st === "p" || seg.pts.length < 2 || (seg.pts.length > 1 && seg.pts[1][0] - seg.pts[0][0] >= 2);
        if (showPts) seg.pts.forEach(function (p) {
          g += '<circle class="pt pt-' + seg.st + '" cx="' + X(p[0]).toFixed(1) + '" cy="' + Yp(VV(p)).toFixed(1) + '" r="' + (o.mini ? 2.2 : 3) + '" stroke="' + col + '" fill="' + (seg.st === "p" ? "none" : col) + '"><title>' + esc(T.ent_names[s.ent] || s.ent) + " · " + p[0] + " · " + fmtI(I, V0(p)) + " " + esc(I ? indUnit(I) : "") + (p[2] ? " · " + esc(T.types[p[2]]) : "") + (p[5] ? " · " + esc(T.cats[p[5]]) : "") + "</title></circle>";
        });
      });
      if (o.mark) { s.pts.forEach(function (p) { if (p[0] === o.mark) g += '<circle class="pt-mark" cx="' + X(p[0]).toFixed(1) + '" cy="' + Yp(VV(p)).toFixed(1) + '" r="' + (o.mini ? 3.5 : 5) + '" fill="' + col + '"/>'; }); }
      if (o.last) { var lp = s.pts[s.pts.length - 1]; if (lp) g += '<circle class="pt-last" cx="' + X(lp[0]).toFixed(1) + '" cy="' + Yp(VV(lp)).toFixed(1) + '" r="3.4" fill="' + col + '"/>'; }
    });
    var wm = isDemo() ? '<text class="wm" x="' + (W / 2) + '" y="' + (H / 2 + (o.mini ? 6 : 10)) + '" text-anchor="middle">' + esc(T.demo_banner.toUpperCase()) + "</text>" : "";
    return '<svg class="oqf-chart' + (o.mini ? " mini" : "") + (isDemo() ? " is-demo" : "") + '" viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="' + esc(o.label || "") + '">' + wm + g + "</svg>" + (log ? '<p class="oqf-axnote">' + esc(V.log_on) + "</p>" : o.log ? '<p class="oqf-axnote">' + esc(V.log_off) + "</p>" : "");
  }
  /* rótulos de eixo compactos (mil, mi) para não cortar números grandes */
  function fmtAx(v) {
    var a = Math.abs(v), L1 = LANG === "en";
    if (a >= 1e9) return fmt(+(v / 1e9).toFixed(1)) + (L1 ? "bn" : " bi");
    if (a >= 1e6) return fmt(+(v / 1e6).toFixed(1)) + (L1 ? "m" : " mi");
    if (a >= 1e4) return fmt(+(v / 1e3).toFixed(0)) + (L1 ? "k" : " mil");
    return fmt(+v.toFixed(a < 1 && a > 0 ? 3 : 2));
  }
  /* dispersão animada: um círculo por entidade no ano t, com rastro dos anos anteriores */
  function scatter(ents, ix, iy, t, a) {
    var DX = function (p) { return dv(ind(ix), p[1]); }, DY = function (p) { return dv(ind(iy), p[1]); };
    var nar = narrow(), W = nar ? Math.max(300, Math.min(760, vw() - 44)) : 760, H = nar ? Math.round(W * 0.9) : 440, ml = nar ? 44 : 52, mr = 18, mt = 16, mb = 46;
    var xs = [], ys = [];
    ents.forEach(function (e) { [ix, iy].forEach(function (id, k) { ((SER[e.ent] && SER[e.ent].ind[id]) || []).forEach(function (p) { if (p[0] >= a) (k ? ys : xs).push(k ? DY(p) : DX(p)); }); }); });
    if (!xs.length || !ys.length) return '<p class="oqf-empty">' + esc(T.c_empty) + "</p>";
    var x0 = Math.min.apply(null, xs), x1 = Math.max.apply(null, xs), y0 = Math.min.apply(null, ys), y1 = Math.max.apply(null, ys);
    var px = (x1 - x0) * 0.08 || 1, py = (y1 - y0) * 0.08 || 1; x0 -= px; x1 += px; y0 -= py; y1 += py;
    var X = function (v) { return ml + (v - x0) / (x1 - x0) * (W - ml - mr); }, Y = function (v) { return mt + (1 - (v - y0) / (y1 - y0)) * (H - mt - mb); };
    var g = "", sx = niceStep(x1 - x0, nar ? 4 : 6), sy = niceStep(y1 - y0, 5), v;
    for (v = Math.ceil(x0 / sx) * sx; v <= x1; v += sx) g += '<line class="gr" x1="' + X(v).toFixed(1) + '" x2="' + X(v).toFixed(1) + '" y1="' + mt + '" y2="' + (H - mb) + '"/><text class="ax" x="' + X(v).toFixed(1) + '" y="' + (H - mb + 16) + '" text-anchor="middle">' + fmt(+v.toFixed(2)) + "</text>";
    for (v = Math.ceil(y0 / sy) * sy; v <= y1; v += sy) g += '<line class="gr" x1="' + ml + '" x2="' + (W - mr) + '" y1="' + Y(v).toFixed(1) + '" y2="' + Y(v).toFixed(1) + '"/><text class="ax" x="' + (ml - 6) + '" y="' + (Y(v) + 4).toFixed(1) + '" text-anchor="end">' + fmt(+v.toFixed(2)) + "</text>";
    g += '<text class="ax-t" x="' + ((ml + W - mr) / 2) + '" y="' + (H - 8) + '" text-anchor="middle">' + esc(indName(ind(ix))) + '</text><text class="ax-t" transform="rotate(-90)" x="' + (-(mt + H - mb) / 2) + '" y="14" text-anchor="middle">' + esc(indName(ind(iy))) + "</text>";
    g += '<text class="sc-year" x="' + (W - mr - 8) + '" y="' + (H - mb - 14) + '" text-anchor="end"' + (nar ? ' style="font-size:48px"' : "") + ">" + t + "</text>";
    var missing = [];
    ents.forEach(function (e) {
      var col = COLOR[e.iso], trail = [];
      for (var y = a; y <= t; y++) { var px2 = valAt(e.ent, ix, y), py2 = valAt(e.ent, iy, y); if (px2 && py2) trail.push([y, px2, py2]); }
      if (trail.length > 1) g += '<path class="sc-trail" d="' + trail.map(function (p, i) { return (i ? "L" : "M") + X(DX(p[1])).toFixed(1) + " " + Y(DY(p[2])).toFixed(1); }).join("") + '" stroke="' + col + '"' + (DASH[e.ent] ? ' stroke-dasharray="' + DASH[e.ent] + '"' : "") + "/>";
      var cur = trail.length && trail[trail.length - 1][0] === t ? trail[trail.length - 1] : null;
      if (!cur) { missing.push(T.ent_names[e.ent]); return; }
      var proj = cur[1][2] === "p" || cur[2][2] === "p", rec = cur[1][2] === "r" || cur[2][2] === "r";
      g += '<g class="sc-pt"><circle cx="' + X(DX(cur[1])).toFixed(1) + '" cy="' + Y(DY(cur[2])).toFixed(1) + '" r="13" fill="' + (proj ? "none" : col) + '" fill-opacity="' + (rec ? ".35" : ".85") + '" stroke="' + col + '" stroke-width="2"' + (rec ? ' stroke-dasharray="2 2"' : "") + "><title>" + esc(T.ent_names[e.ent] + " · " + t + " · " + fmt(DX(cur[1])) + " × " + fmt(DY(cur[2])) + " · " + T.types[cur[1][2]] + " / " + T.types[cur[2][2]]) + '</title></circle><text class="sc-lbl" x="' + (X(DX(cur[1])) + 17).toFixed(1) + '" y="' + (Y(DY(cur[2])) + 4).toFixed(1) + '">' + esc(T.ent_names[e.ent]) + "</text></g>";
    });
    var wm = isDemo() ? '<text class="wm" x="' + (W / 2) + '" y="' + (H / 2) + '" text-anchor="middle">' + esc(T.demo_banner.toUpperCase()) + "</text>" : "";
    return '<svg class="oqf-chart oqf-scatter" viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="' + esc(indName(ind(ix)) + " × " + indName(ind(iy)) + " · " + t) + '">' + wm + g + "</svg>" +
      (missing.length ? '<p class="small oqf-missing">' + esc(tf(T.c_missing, { y: t })) + " " + esc(missing.join(", ")) + "</p>" : "");
  }

  /* ---------------------------------------------------------- COMPARADOR */
  var cmp = null, scTimer = null;
  var MODES = ["paises", "reforma", "governos", "dispersao"];
  function modeLbl(m) { return T.modes[m] || T.modes2[m]; }
  function renderCompare(app, q) {
    var c = (q.c || "BRA,DEU").split(",").filter(function (x) { return PILOTS.indexOf(x) > -1; });
    cmp = { c: c, i: q.i || "life_exp", j: q.j || "gdp_pc_ppp", t: clampY(q.t, 1990), a: clampY(q.a, 1950), b: clampY(q.b, Y1), r: q.r ? clampY(q.r, 1991) : null, m: MODES.indexOf(q.m) > -1 ? q.m : "paises", s: q.s === "log" ? "log" : "", p: q.p || "" };
    if (cmp.a > cmp.b) { var t = cmp.a; cmp.a = cmp.b; cmp.b = t; }
    if (cmp.m === "reforma" && !cmp.r) cmp.r = 1991;
    var h = hero({ active: "comparar", crumb: T.sub.comparar, kicker: T.title, title: esc(T.cmp_h), dek: T.cmp_dek });
    h += '<section class="sec sec--paper sec--tight"><div class="wrap"><div id="oqf-banner"></div><div id="oqf-qban"></div>' +
      '<div class="oqf-stepbar"><span class="oqf-stepn">1</span><b>' + esc(V.c_step1) + '</b></div><div class="oqf-modecards" role="tablist" aria-label="' + esc(T.cmp_h) + '">' +
      MODES.map(function (m) { return '<button type="button" class="oqf-modec" role="tab" data-oqf-mode="' + m + '" aria-selected="' + (m === cmp.m) + '"><b>' + esc(modeLbl(m)) + "</b><small>" + esc(V.mode_d[m]) + "</small></button>"; }).join("") + "</div>" +
      '<div class="oqf-form" id="oqf-form"></div>' +
      '<details class="oqf-qmore"><summary>' + esc(V.qs_h) + "</summary>" + questionCards() + "</details></div></section>" +
      '<section class="sec sec--dark2 sec--tight"><div class="wrap" id="oqf-cmp-out"><div class="oqf-loading"></div></div></section>';
    app.innerHTML = h;
    withLeaders(function () {
      withSeries(allPilotEnts(), function (ok) {
        var b = document.getElementById("oqf-banner"); if (b) b.innerHTML = banner();
        if (!ok || !M) { document.getElementById("oqf-cmp-out").innerHTML = errBox(); return; }
        if (!ind(cmp.i)) cmp.i = M.indicators[0].id;
        if (!ind(cmp.j)) cmp.j = (M.indicators[1] || M.indicators[0]).id;
        drawForm(); drawCompare();
      });
    });
  }
  function yearOpts(sel) { var o = ""; for (var y = Y0; y <= Y1; y++) o += '<option value="' + y + '"' + (y === sel ? " selected" : "") + ">" + y + "</option>"; return o; }
  function indOpts(sel, intlOnly) {
    var one = function (I) { return '<option value="' + esc(I.id) + '"' + (I.id === sel ? " selected" : "") + ">" + esc(indName(I)) + (I.intl ? "" : " · " + esc(I.only ? T.only_br : T.single_country)) + "</option>"; };
    if (isDemo()) return M.indicators.map(one).join("");
    return ["pros", "eco"].map(function (l) { var xs = indsOf(l).filter(function (I) { return !intlOnly || I.intl; }); return xs.length ? '<optgroup label="' + esc(T.layers[l] + " · " + (l === "pros" ? T.audit2 : T.audit3)) + '">' + xs.map(one).join("") + "</optgroup>" : ""; }).join("");
  }
  /* países efetivamente desenhados: indicador sem comparabilidade internacional → só um país (a restrição nunca é relaxada) */
  function cmpCountries(I, I2) {
    var c = cmp.c.slice(), note = "", why = "", dropped = [];
    var only = function (X) { return X && X.only; };
    [I, I2].forEach(function (X) { if (only(X)) { var keep = c.filter(function (k) { return X.only.indexOf(k) > -1; }); if (keep.length < c.length) { note = tf(T.c_only, { ind: indName(X) }); why = V.why_only; dropped = dropped.concat(c.filter(function (k) { return keep.indexOf(k) < 0; })); } c = keep; } });
    if (c.length > 1 && ((I && !I.intl) || (I2 && !I2.intl))) { var X = I && !I.intl ? I : I2; dropped = dropped.concat(c.slice(1)); c = [c[0]]; note = tf(T.c_national, { c: T.countries[c[0]].name }); why = (V.why[X.id] || V.why_nat); }
    return { c: c, note: note, why: why, dropped: dropped };
  }
  var PERIODS = [[1950, Y1], [1990, Y1], [2000, Y1]];
  function drawForm() {
    var f = document.getElementById("oqf-form"); if (!f) return;
    [].forEach.call(document.querySelectorAll("[data-oqf-mode]"), function (b) { b.setAttribute("aria-selected", b.getAttribute("data-oqf-mode") === cmp.m); });
    var h = '<fieldset class="oqf-f oqf-f-c"><legend><span class="oqf-stepn">2</span>' + esc(T.c_countries) + '</legend><div class="oqf-picks">' + PILOTS.map(function (k) {
      return '<button type="button" class="pick oqf-pick" data-oqf-c="' + k + '" aria-pressed="' + (cmp.c.indexOf(k) > -1) + '" style="--c:' + COLOR[k] + '">' + flag(k) + esc(T.countries[k].name) + "</button>";
    }).join("") + "</div></fieldset>";
    if (cmp.m === "dispersao") {
      h += '<div class="oqf-f"><label for="oqf-j"><span class="oqf-stepn">3</span>' + esc(T.c_x) + '</label><select id="oqf-j" class="uf-select">' + indOpts(cmp.j) + "</select></div>" +
        '<div class="oqf-f"><label for="oqf-i">' + esc(T.c_y) + '</label><select id="oqf-i" class="uf-select">' + indOpts(cmp.i) + "</select></div>";
    } else {
      var custom = !PERIODS.some(function (p) { return p[0] === cmp.a && p[1] === cmp.b; });
      h += '<div class="oqf-f"><label for="oqf-i"><span class="oqf-stepn">3</span>' + esc(T.c_ind) + '</label><select id="oqf-i" class="uf-select">' + indOpts(cmp.i) + "</select></div>" +
        '<fieldset class="oqf-f"><legend><span class="oqf-stepn">4</span>' + esc(V.c_period) + '</legend><div class="oqf-picks">' + PERIODS.map(function (p) { return '<button type="button" class="oqf-chipbtn" data-oqf-per="' + p[0] + "|" + p[1] + '" aria-pressed="' + (!custom && p[0] === cmp.a && p[1] === cmp.b) + '">' + p[0] + "–" + (p[1] === Y1 ? esc(V.today) : p[1]) + "</button>"; }).join("") +
        (custom ? '<span class="oqf-chipbtn" aria-pressed="true">' + cmp.a + "–" + cmp.b + "</span>" : "") + "</div></fieldset>";
    }
    if (cmp.m === "reforma") h += '<div class="oqf-f oqf-f-wide"><label for="oqf-r">' + esc(T.c_mark) + '</label><select id="oqf-r" class="uf-select oqf-sel-s">' + yearOpts(cmp.r) + '</select><p class="small oqf-f-hint">' + esc(T.c_mark_hint) + '</p><div class="oqf-presets"><span class="mono small">' + esc(T.c_presets) + "</span>" +
      T.presets.map(function (p) { return '<button type="button" class="btn btn--ghost btn--sm" data-oqf-preset="' + p[0] + "|" + p[1] + '">' + flag(p[0]) + p[1] + " · " + esc(p[2]) + "</button>"; }).join("") + "</div></div>";
    h += '<details class="oqf-adv oqf-f-wide"' + (cmp.s || (cmp.m !== "dispersao" && !PERIODS.some(function (p) { return p[0] === cmp.a && p[1] === cmp.b; })) ? " open" : "") + "><summary>" + esc(V.c_adv) + '</summary><div class="oqf-adv-b">' +
      (cmp.m === "dispersao" ? "" : '<div class="oqf-f oqf-f-yrs"><label for="oqf-a">' + esc(T.c_from) + '</label><select id="oqf-a" class="uf-select">' + yearOpts(cmp.a) + '</select><label for="oqf-b">' + esc(T.c_to) + '</label><select id="oqf-b" class="uf-select">' + yearOpts(cmp.b) + "</select></div>" +
        '<label class="oqf-check"><input type="checkbox" id="oqf-log"' + (cmp.s ? " checked" : "") + "> " + esc(V.c_log) + "</label>") +
      '<p class="small oqf-f-hint">' + esc(T.c_intl_hint) + "</p></div></details>";
    f.innerHTML = h;
  }
  function stopSc() { if (scTimer) { clearInterval(scTimer); scTimer = null; } var b = document.getElementById("oqf-scplay"); if (b) { b.textContent = "▶"; b.setAttribute("aria-pressed", "false"); } }
  /* a pergunta pronta só fica no topo enquanto a configuração for a dela */
  function qMatch() {
    var x = QUESTIONS.filter(function (z) { return z.id === cmp.p; })[0]; if (!x || x.href) return null;
    var same = x.c.join(",") === cmp.c.join(",") && x.i === cmp.i && x.m === cmp.m && (x.m === "dispersao" ? x.j === cmp.j : x.a === cmp.a && x.b === cmp.b && !!x.log === !!cmp.s);
    return same ? x : null;
  }
  function incompat(cc) {
    if (!cc.note) return "";
    return '<div class="oqf-incompat" role="note"><b>' + esc(V.inc_h) + "</b><p>" + esc(cc.why) + '</p><p class="small">' + esc(cc.note) + "</p>" +
      (cc.dropped.length ? '<div class="oqf-picks">' + cc.dropped.map(function (k) { return '<button type="button" class="oqf-chipbtn" data-oqf-solo="' + k + '">' + flag(k) + esc(tf(V.see_alone, { c: T.countries[k].name })) + "</button>"; }).join("") + "</div>" : "") + "</div>";
  }
  function drawCompare() {
    var out = document.getElementById("oqf-cmp-out"); if (!out) return;
    var qx = qMatch(); if (!qx) cmp.p = "";
    var qb = document.getElementById("oqf-qban");
    if (qb) qb.innerHTML = qx ? '<div class="oqf-qban"><span class="oqf-qban-k">' + esc(V.q_kicker) + "</span><b>" + esc(V.questions[qx.id][0]) + "</b><p>" + esc(V.questions[qx.id][2] || V.questions[qx.id][1]) + "</p></div>" : "";
    setHash(link("comparar", "", qs({ c: cmp.c.join(","), i: cmp.i, j: cmp.m === "dispersao" ? cmp.j : "", t: cmp.m === "dispersao" ? cmp.t : "", a: cmp.m === "dispersao" ? "" : cmp.a, b: cmp.m === "dispersao" ? "" : cmp.b, m: cmp.m === "paises" ? "" : cmp.m, r: cmp.m === "reforma" ? cmp.r : "", s: cmp.m !== "dispersao" ? cmp.s : "", p: cmp.p })));
    var I = ind(cmp.i), ents = [], cc = cmpCountries(I, cmp.m === "dispersao" ? ind(cmp.j) : null);
    var notice = incompat(cc);
    if (!cmp.c.length) { out.innerHTML = '<p class="oqf-empty">' + esc(V.pick_one) + "</p>"; return; }
    if (!cc.c.length) { out.innerHTML = '<div class="oqf-chart-h"><h3>' + esc(indName(I)) + "</h3></div>" + notice + '<p class="oqf-empty">' + esc(T.no_data) + "</p>"; return; }
    cc.c.forEach(function (k) { ENTS[k].forEach(function (e) { ents.push({ ent: e, iso: k }); }); });
    if (cmp.m === "dispersao") {
      var sl = ents.map(function (e) { var has = SER[e.ent] && SER[e.ent].ind[cmp.i] && SER[e.ent].ind[cmp.j]; return { ent: e.ent, iso: e.iso, pts: has ? [1] : [] }; });
      out.innerHTML = '<div class="oqf-chart-h"><h3>' + esc(indName(ind(cmp.j))) + " × " + esc(indName(I)) + "</h3></div>" + notice + legendHtml(sl) +
        '<div class="oqf-chart-box" id="oqf-sc">' + scatter(ents, cmp.j, cmp.i, cmp.t, 1950) + "</div>" +
        '<div class="oqf-player oqf-player--dark"><button class="oqf-play" id="oqf-scplay" type="button" aria-pressed="false" aria-label="' + esc(T.play) + '">▶</button><div class="oqf-range"><label class="sr-only" for="oqf-t">' + esc(T.year) + '</label><input type="range" id="oqf-t" min="1950" max="' + Y1 + '" value="' + cmp.t + '"></div><output class="oqf-tv" id="oqf-tv">' + cmp.t + "</output></div>" +
        '<p class="oqf-causal">' + esc(T.c_scatter_note) + "</p>" + srcLine([I, ind(cmp.j)], cc.c) + '<details class="oqf-tech oqf-tech--d"><summary>' + esc(V.tech_cmp) + "</summary>" + metaBlock(I, ind(cmp.j), cc.c) + "</details>";
      return;
    }
    var list = [];
    cc.c.forEach(function (k) { list = list.concat(seriesFor(k, cmp.i, cmp.a, cmp.b)); });
    var h = '<div class="oqf-chart-h"><h3>' + esc(indName(I)) + '</h3><span class="mono small">' + cmp.a + "–" + cmp.b + " · " + esc(indUnit(I)) + "</span></div>" + notice + legendHtml(list) +
      '<div class="oqf-chart-box">' + chart(list, { a: cmp.a, b: cmp.b, mark: cmp.m === "reforma" ? cmp.r : null, label: indName(I), I: I, log: !!cmp.s });
    if (cmp.m === "governos" && L) {
      h += cc.c.map(function (k) { return '<div class="oqf-bandrow"><span>' + flag(k) + esc(T.countries[k].name) + "</span>" + govBand(k, cmp.a, cmp.b, { ml: narrow() ? 40 : 52, w: narrow() ? Math.max(300, Math.min(760, vw() - 44)) : 760 }) + "</div>"; }).join("");
    }
    h += "</div>";
    if (cmp.m === "reforma") h += '<p class="oqf-causal">' + esc(T.c_causal) + "</p>";
    if (cmp.m === "governos") h += '<p class="oqf-causal">' + esc(T.c_gov_note) + " " + esc(T.gov_colors) + "</p>";
    var crit = []; list.forEach(function (s) { if (s.pts.length) { var d = cardData(s.iso, I, { ents: [s.ent], a: cmp.a, b: cmp.b }); caveats(s.iso, I, d).crit.forEach(function (x) { if (crit.indexOf(x) < 0) crit.push(x); }); } });
    var multi = {}; list.forEach(function (s) { if (s.pts.length) multi[s.iso] = (multi[s.iso] || 0) + 1; });
    Object.keys(multi).forEach(function (k) { if (multi[k] > 1) crit.push(tf(V.crit_terr, { e: list.filter(function (s) { return s.iso === k && s.pts.length; }).map(function (s) { return T.ent_names[s.ent]; }).join(" · ") })); });
    if (crit.length) h += '<p class="oqf-crit oqf-crit--d" role="note">' + crit.map(esc).join("<br>") + "</p>";
    h += srcLine([I], cc.c);
    var years = [];
    if (cmp.m === "reforma") [-10, -5, 0, 5, 10].forEach(function (d) { var y = cmp.r + d; if (y >= cmp.a && y <= cmp.b) years.push(y); });
    else { var st = cmp.b - cmp.a > 40 ? 10 : 5; for (var y = Math.ceil(cmp.a / st) * st; y <= cmp.b; y += st) years.push(y); if (years[years.length - 1] !== cmp.b) years.push(cmp.b); }
    var cols = list.filter(function (s) { return s.pts.length; });
    if (cols.length) {
      h += '<details class="oqf-tbl"><summary>' + esc(T.c_table) + '</summary><div class="ptable-wrap oqf-scroll"><table class="ptable oqf-table"><thead><tr><th>' + esc(T.c_year) + "</th>" + (cmp.m === "governos" ? cc.c.map(function (k) { return "<th>" + esc(tf(T.gov_in, { y: "" }).trim()) + " · " + esc(T.countries[k].name) + "</th>"; }).join("") : "") + cols.map(function (s) { return "<th>" + esc(T.ent_names[s.ent]) + "</th>"; }).join("") + "</tr></thead><tbody>" +
        years.map(function (y) {
          return "<tr" + (y === cmp.r && cmp.m === "reforma" ? ' class="is-mark"' : "") + "><td>" + y + "</td>" + (cmp.m === "governos" ? cc.c.map(function (k) { return '<td class="meta">' + (leadersIn(k, y).map(function (l) { return esc(lname(l)); }).join(", ") || "—") + "</td>"; }).join("") : "") + cols.map(function (s) {
            var p = null; s.pts.forEach(function (x) { if (x[0] === y) p = x; });
            return '<td class="num">' + (p ? fmtI(I, dv(I, p[1])) + ' <small class="oqf-tt-t t-' + p[2] + '" title="' + esc(T.types[p[2]] + " · " + T.cats[p[5]] + " · " + p[3] + " · " + p[4] + " · " + (p[7] || "")) + '">' + esc(T.types[p[2]].split(" ")[0]) + " · " + (p[5] === "P" ? "S" : p[5]) + "</small>" : "—") + "</td>";
          }).join("") + "</tr>";
        }).join("") + "</tbody></table></div></details>";
    }
    out.innerHTML = h + '<details class="oqf-tech oqf-tech--d"><summary>' + esc(V.tech_cmp) + "</summary>" + metaBlock(I, null, cc.c) + "</details>";
  }
  /* fonte legível sempre à vista; versão, série e notas no bloco técnico */
  function srcLine(inds, countries) {
    var names = {};
    inds.forEach(function (X) { countries.forEach(function (k) { ENTS[k].forEach(function (e) { var m = metaOf(e, X.id); if (m && SER[e].ind[X.id]) names[srcName(m)] = 1; }); }); });
    var ks = Object.keys(names); return ks.length ? '<p class="oqf-srcline">' + esc(T.c_src) + ": <b>" + esc(ks.join(" · ")) + "</b> · " + esc(inds.map(auditOf).filter(function (v, i, a) { return a.indexOf(v) === i; }).join(" · ")) + "</p>" : "";
  }
  function legendHtml(list) {
    return '<div class="oqf-cleg">' + list.map(function (s) {
      return '<span' + (s.pts.length ? "" : ' class="is-off"') + '><i style="border-color:' + (COLOR[s.iso] || "#8fa3c9") + (DASH[s.ent] ? ";border-top-style:dashed" : "") + '"></i>' + flag(s.iso) + esc(T.ent_names[s.ent]) + (s.pts.length ? "" : " — " + esc(V.none_short)) + "</span>";
    }).join("") + missingEnts(list) + (isDemo() ? '<span><i class="lg-r"></i>' + esc(T.types.r) + '</span><span><i class="lg-p"></i>' + esc(T.types.p) + "</span>" : "") + "</div>";
  }
  /* entidades-piloto sem série para o indicador: dizê-lo em vez de omitir */
  function missingEnts(list) {
    if (isDemo() || !cmp) return "";
    var have = {}; list.forEach(function (s) { have[s.ent] = 1; });
    var miss = []; cmpCountries(ind(cmp.i), cmp.m === "dispersao" ? ind(cmp.j) : null).c.forEach(function (k) { ENTS[k].forEach(function (e) { if (!have[e]) miss.push(T.ent_names[e] || e); }); });
    return miss.length ? '<span class="oqf-cleg-miss">' + esc(miss.join(", ")) + ": " + esc(V.none_short) + "</span>" : "";
  }
  function metaBlock(I, I2, countries) {
    if (isDemo()) {
      var unit = function (x) { return esc(indUnit(x)) + " · " + esc(LANG === "en" ? "planned: " : "prevista: ") + esc(LANG === "en" ? x.unit_en : x.unit_pt); };
      var src = function (x) { return esc(LANG === "en" ? "None — synthetic series (prepare_data.py --demo, seed " : "Nenhuma — série sintética (prepare_data.py --demo, semente ") + M.seed + "). " + esc(LANG === "en" ? "Planned source: " : "Fonte prevista: ") + esc(x.src); };
      return '<dl class="oqf-meta"><dt>' + esc(T.c_unit) + "</dt><dd>" + (I2 ? esc(indName(I2)) + ": " + unit(I2) + "<br>" + esc(indName(I)) + ": " : "") + unit(I) + "</dd><dt>" + esc(T.c_src) + "</dt><dd>" + (I2 ? esc(indName(I2)) + ": " + src(I2) + "<br>" + esc(indName(I)) + ": " : "") + src(I) + "</dd>" +
        "<dt>" + esc(T.c_lim) + "</dt><dd><ul>" + T.c_lims.map(function (l) { return "<li>" + esc(l) + "</li>"; }).join("") + "</ul></dd></dl>";
    }
    function one(X) {
      var srcs = [], notes = {}, types = {}, cats = {};
      (countries || cmp.c).forEach(function (k) {
        ENTS[k].forEach(function (e) {
          var m = metaOf(e, X.id), pts = SER[e] && SER[e].ind[X.id]; if (!m || !pts) return;
          srcs.push((T.ent_names[e] || e) + ": " + m.f + " · " + m.v + " · " + m.s);
          pts.forEach(function (p) { types[p[2]] = 1; cats[p[5]] = 1; var t = noteTxt(m, p[6]); if (t) t.split("; ").forEach(function (x) { notes[x] = 1; }); });
        });
      });
      return "<dt>" + esc(indName(X)) + "</dt><dd>" +
        "<b>" + esc(T.c_unit) + ":</b> " + esc(indUnit(X)) + (X.scale && X.scale !== 1 ? " · " + esc(T.scale_note) : "") + "<br>" +
        "<b>" + esc(T.c_src) + ":</b> " + (srcs.length ? srcs.map(esc).join("<br>") : "—") + "<br>" +
        "<b>" + esc(T.c_type) + ":</b> " + Object.keys(types).map(function (t) { return esc(T.types[t]); }).join(", ") + " · " + Object.keys(cats).map(function (c) { return chip(c === "P" ? "ok" : "res"); }).join(" ") + "<br>" +
        "<b>" + esc(T.c_cmpb) + ":</b> " + esc(X.intl ? T.c_intl_yes : T.c_intl_no) +
        (Object.keys(notes).length ? "<br><b>" + esc(T.caveats) + ":</b> " + esc(Object.keys(notes).join("; ")) : "") + "</dd>";
    }
    return '<dl class="oqf-meta">' + (I2 ? one(I2) : "") + one(I) +
      "<dt>" + esc(T.c_lim) + "</dt><dd><ul>" + T.c_lims.map(function (l) { return "<li>" + esc(l) + "</li>"; }).join("") + "</ul></dd></dl>" + versionsLine();
  }
  function redrawScatter() {
    var box = document.getElementById("oqf-sc"); if (!box) return;
    var ents = []; cmpCountries(ind(cmp.i), ind(cmp.j)).c.forEach(function (k) { ENTS[k].forEach(function (e) { ents.push({ ent: e, iso: k }); }); });
    box.innerHTML = scatter(ents, cmp.j, cmp.i, cmp.t, 1950);
    var tv = document.getElementById("oqf-tv"); if (tv) tv.textContent = cmp.t;
    var r = document.getElementById("oqf-t"); if (r && +r.value !== cmp.t) r.value = cmp.t;
  }

  /* ---------------------------------------------------------- MANDATOS (painel da Auditoria 3) */
  /* Fluxo: país → governo → indicadores principais → mais indicadores → detalhes técnicos.
     Sem nota, ranking ou cor de julgamento; ordem dos governos é cronológica. */
  var termsState = null;
  var TFAM = [["growth", ["pib_real_per_capita", "pib_real"]], ["prices", ["inflacao_consumidor", "igp_di_variacao"]], ["labor", ["desemprego_weo", "desemprego_estimativa_nacional_wdi"]],
    ["fiscal", ["divida_bruta_governo_geral_pib", "divida_liquida_setor_publico_pib", "resultado_primario_governo_geral_pib", "resultado_primario_setor_publico_consolidado_pib"]],
    ["invest", ["fbcf_pib"]], ["external", ["conta_corrente_pib"]], ["prod", ["produtividade_por_ocupado"]], ["monetary", ["taxa_politica_monetaria"]]];
  function tOrder(id) { for (var f = 0; f < TFAM.length; f++) { var k = TFAM[f][1].indexOf(id); if (k > -1) return f * 10 + k; } return 999; }
  function tFam(id) { for (var f = 0; f < TFAM.length; f++) if (TFAM[f][1].indexOf(id) > -1) return TFAM[f][0]; return ""; }
  function sgn(v, d) { var x = +v; return (x > 0 ? "+" : x < 0 ? "−" : "") + Math.abs(x).toLocaleString(LANG === "en" ? "en-US" : "pt-BR", { minimumFractionDigits: d, maximumFractionDigits: d }); }
  function nfmt(v, d) { return (+v).toLocaleString(LANG === "en" ? "en-US" : "pt-BR", { minimumFractionDigits: d, maximumFractionDigits: d }); }
  /* só formata o que a Auditoria 3 calculou (var, acc, avg, v0, v1); nada é recalculado aqui */
  function termHead(r) {
    var u = LANG === "en" ? r.uen : r.u;
    if (r.t === "nivel") return { n: sgn(r["var"], 1) + "%", u: T.t_py, d: V.d_nivel, s: r.acc ? T.t_acc + ": " + sgn(r.acc, 1) + "%" : "" };
    if (r.t === "taxa_composta") return { n: nfmt(r["var"], 1) + "%", u: T.t_py, d: V.d_taxa, s: r.acc ? T.t_acc + ": " + nfmt(r.acc, 1) + "%" : "" };
    if (r.t === "media") return { n: nfmt(r.avg, 1), u: u, d: V.d_media, s: T.t_diff + ": " + sgn(r["var"], 1) + " p.p." };
    return { n: sgn(r["var"], 1), u: "p.p.", d: V.d_dif, s: nfmt(r.v0, 1) + " → " + nfmt(r.v1, 1) + " · " + u };
  }
  function termResult(r) { var x = termHead(r); return "<b>" + esc(x.n) + "</b> " + esc(x.u) + (x.s ? ' <span class="small">(' + esc(x.s) + ")</span>" : ""); }
  function altVal(r, v) { return r.t === "nivel" || r.t === "taxa_composta" ? nfmt(v, 1) + "% " + T.t_py : sgn(v, 1) + " p.p."; }
  function winTxt(y0, y1) { return (+y0 + 1 === +y1 ? y1 : (+y0 + 1) + "–" + y1) + " (" + T.t_base + " " + y0 + ")"; }
  function altWinTxt(w) { var m = /^(\d{4})–(\d{4})$/.exec(w); return m ? winTxt(m[1], m[2]) : w; }
  function govEnd(G) { return /^\d{4}-\d{2}-\d{2}$/.test(G.b) ? dateTxt(G.b) : V.in_office; }
  function isSens(r) { return !r.rob || r.mdiff === "sim"; }
  function renderTerms(app, q) {
    var iso = PILOTS.indexOf((q.c || "").toUpperCase()) > -1 ? q.c.toUpperCase() : "BRA";
    termsState = { c: iso, g: q.g || "", x: (q.x || q.i || "").split(",").filter(Boolean) };
    var h = hero({ active: "mandatos", crumb: SUBLBL("mandatos"), kicker: T.title, title: esc(T.terms_h), dek: T.terms_dek });
    h += '<section class="sec sec--paper sec--tight"><div class="wrap"><div id="oqf-banner"></div>' +
      '<div class="oqf-stepbar"><span class="oqf-stepn">1</span><b>' + esc(V.t_step1) + '</b></div><div class="oqf-ctabs" role="tablist" aria-label="' + esc(V.t_step1) + '">' + PILOTS.map(function (k) { return '<button class="oqf-ctab" type="button" role="tab" data-oqf-tc="' + k + '" aria-selected="' + (k === iso) + '">' + flag(k) + "<span>" + esc(T.countries[k].name) + "</span></button>"; }).join("") + "</div>" +
      '<div class="oqf-stepbar"><span class="oqf-stepn">2</span><b>' + esc(V.t_step2) + '</b></div><div id="oqf-tgov" class="oqf-tgov"><div class="oqf-loading oqf-loading--s"></div></div>' +
      '<details class="oqf-tech oqf-howto"><summary>' + esc(V.t_howto) + '</summary><ul class="oqf-list">' + T.terms_rules.map(function (g) { return "<li>" + esc(g) + "</li>"; }).join("") + "</ul></details></div></section>" +
      '<section class="sec sec--dark2 sec--tight"><div class="wrap" id="oqf-terms-out"><div class="oqf-loading"></div></div></section>';
    app.innerHTML = h;
    withManifest(function () { var b = document.getElementById("oqf-banner"); if (b) b.innerHTML = banner(); });
    withLeaders(function () { withTerms(function (ok) { drawTerms(ok); }); });
  }
  function termGroups(iso) {
    var rows = [], groups = [], idx = {};
    ENTS[iso].forEach(function (e) { (TERMS.rows[e] || []).forEach(function (r) { r._e = e; rows.push(r); }); });
    rows.forEach(function (r) { if (idx[r.g] == null) { idx[r.g] = groups.length; groups.push({ g: r.g, n: r.n, a: r.a, b: r.b, e: r._e, rows: [] }); } groups[idx[r.g]].rows.push(r); });
    groups.sort(function (x, y) { return x.a < y.a ? -1 : x.a > y.a ? 1 : 0; });
    groups.forEach(function (G) { G.rows.sort(function (x, y) { return tOrder(x.i) - tOrder(y.i) || (x.i < y.i ? -1 : 1); }); });
    return groups;
  }
  function drawTerms(ok) {
    var out = document.getElementById("oqf-terms-out"), gsel = document.getElementById("oqf-tgov"); if (!out) return;
    if (!ok) { out.innerHTML = errBox(); if (gsel) gsel.innerHTML = ""; return; }
    var S = termsState, groups = termGroups(S.c);
    [].forEach.call(document.querySelectorAll("[data-oqf-tc]"), function (b) { b.setAttribute("aria-selected", b.getAttribute("data-oqf-tc") === S.c); });
    if (!groups.length) { gsel.innerHTML = ""; out.innerHTML = '<p class="oqf-empty">' + esc(T.no_data) + "</p>"; return; }
    var gi = -1; groups.forEach(function (G, i) { if (G.g === S.g) gi = i; });
    if (gi < 0) { gi = groups.length - 1; S.g = groups[gi].g; S.x = S.x.filter(function (id) { return groups[gi].rows.some(function (r) { return r.i === id; }); }); }
    var G = groups[gi];
    gsel.innerHTML = '<div class="oqf-govs" role="listbox" aria-label="' + esc(V.t_step2) + '">' + groups.map(function (X, i) {
      return '<button type="button" role="option" class="oqf-gov-b" data-oqf-tg="' + esc(X.g) + '" aria-selected="' + (i === gi) + '"><b>' + esc(shortLeader(X, S.c)) + "</b><small>" + X.a.slice(0, 4) + "–" + (/^\d{4}/.test(X.b) ? X.b.slice(0, 4) : "") + "</small></button>";
    }).join("") + '</div><label class="sr-only" for="oqf-tgsel">' + esc(V.t_step2) + '</label><select id="oqf-tgsel" class="uf-select oqf-tgsel">' + groups.map(function (X, i) { return '<option value="' + esc(X.g) + '"' + (i === gi ? " selected" : "") + ">" + esc(X.n + " · " + X.a.slice(0, 4) + "–" + (/^\d{4}/.test(X.b) ? X.b.slice(0, 4) : "")) + "</option>"; }).join("") + "</select>";
    /* indicadores principais: um por família (crescimento, preços, emprego, contas públicas), depois os demais */
    var main = [], famUsed = {};
    G.rows.forEach(function (r) { var f = tFam(r.i); if (main.length < 4 && ["growth", "prices", "labor", "fiscal"].indexOf(f) > -1 && !famUsed[f]) { famUsed[f] = 1; main.push(r); } });
    G.rows.forEach(function (r) { if (main.length < 4 && main.indexOf(r) < 0) main.push(r); });
    var rest = G.rows.filter(function (r) { return main.indexOf(r) < 0; });
    var extra = rest.filter(function (r) { return S.x.indexOf(r.i) > -1; });
    var wins = {}; G.rows.forEach(function (r) { var k = winTxt(r.y0, r.y1); wins[k] = (wins[k] || 0) + 1; });
    var mainWin = Object.keys(wins).sort(function (a, b) { return wins[b] - wins[a]; })[0];
    var nsens = G.rows.filter(isSens).length;
    /* limite comum a todas as linhas (ex.: mandato em curso) aparece uma vez, no cabeçalho */
    var lim0 = G.rows[0].lim, comLim = lim0 && G.rows.every(function (r) { return r.lim === lim0; }) ? (LANG === "en" ? G.rows[0].lim_en : lim0) : "";
    G.comLim = !!comLim;
    var h = '<div class="oqf-stepbar oqf-stepbar--d"><span class="oqf-stepn">3</span><b>' + esc(V.t_step3) + "</b></div>";
    h += '<header class="oqf-tg-h"><div class="oqf-tg-nav">' + (gi > 0 ? '<button type="button" class="oqf-navb" data-oqf-tg="' + esc(groups[gi - 1].g) + '" aria-label="' + esc(V.prev_gov) + '">←</button>' : '<span></span>') +
      '<div><h2>' + esc(G.n) + '</h2><p class="oqf-tg-meta"><span>' + esc(V.t_term) + " <b>" + dateTxt(G.a) + " – " + esc(govEnd(G)) + "</b></span><span>" + esc(V.t_window) + " <b>" + esc(mainWin) + "</b></span><span>" + esc(tf(V.t_count, { n: G.rows.length, s: nsens })) + "</span></p>" + (comLim ? '<p class="oqf-tg-lim">' + esc(T.t_lim) + ": " + esc(comLim) + "</p>" : "") + "</div>" +
      (gi < groups.length - 1 ? '<button type="button" class="oqf-navb" data-oqf-tg="' + esc(groups[gi + 1].g) + '" aria-label="' + esc(V.next_gov) + '">→</button>' : "<span></span>") + "</div>" +
      '<p class="oqf-causal oqf-causal--lead">' + esc(T.terms_causal) + "</p></header>";
    h += '<div class="oqf-tiles">' + main.concat(extra).map(function (r) { return termTile(r, G); }).join("") + "</div>";
    if (rest.length) h += '<div class="oqf-stepbar oqf-stepbar--d"><span class="oqf-stepn">4</span><b>' + esc(V.t_step4) + '</b></div><div class="oqf-addind oqf-addind--d">' + rest.map(function (r) {
      var on = S.x.indexOf(r.i) > -1;
      return '<button type="button" class="oqf-chipbtn" data-oqf-tx="' + esc(r.i) + '" aria-pressed="' + on + '">' + (on ? "✓ " : "+ ") + esc(LANG === "en" ? r.ien : r.ipt) + "</button>";
    }).join("") + (rest.length > 1 ? '<button type="button" class="oqf-chipbtn oqf-chipbtn--all" data-oqf-tx="*">' + esc(extra.length === rest.length ? V.hide_all : V.show_all) + "</button>" : "") + "</div>";
    h += '<p class="small oqf-foot">' + esc(V.t_foot) + ' <a href="' + link("perfil", S.c, qs({ t: "gov" })) + '">' + esc(V.t_foot_l) + " →</a></p>";
    out.innerHTML = h;
    setHash(link("mandatos", "", qs({ c: S.c === "BRA" ? "" : S.c, g: S.g, x: S.x.join(",") })));
  }
  /* nome usual do governante (lista de governantes); o nome completo da Auditoria 3 fica no título */
  function shortLeader(G, iso) {
    if (L) { var t = yf(G.a) + 0.01, hit = leadersOf(iso).filter(function (l) { return LANE_ENT[l.lane] === G.e && yf(l.a) <= t && t < yf(l.b); })[0]; if (hit) return lname(hit); }
    var w = G.n.split(" "); return w.length <= 2 ? G.n : w[0] + " " + w[w.length - 1];
  }
  function termTile(r, G) {
    var x = termHead(r), sens = isSens(r), lvl = r.t === "nivel";
    var pts = (r.w || []).map(function (p) { return [p[0], p[1], "", "", "", p[2]]; });
    var a = pts.length ? pts[0][0] : +r.y0, b = pts.length ? pts[pts.length - 1][0] : +r.y1;
    var h = '<article class="oqf-tile"><header><h3>' + esc(LANG === "en" ? r.ien : r.ipt) + '</h3><p class="mono small">' + esc(winTxt(r.y0, r.y1)) + "</p></header>" +
      '<div class="oqf-tile-v"><b>' + esc(x.n) + "</b><span>" + esc(x.u) + "</span></div>" +
      '<p class="oqf-tile-d">' + esc(x.d) + (x.s ? ' <span class="oqf-muted">· ' + esc(x.s) + "</span>" : "") + "</p>" +
      (pts.length > 1 ? '<div class="oqf-tile-c">' + chart([{ ent: r._e, iso: G.e === "FRG" ? "DEU" : G.e, pts: pts }], { a: a, b: b, mini: true, shade: [+r.y0, +r.y1], band: [yf(G.a), /^\d{4}-/.test(G.b) ? yf(G.b) : 9999], noY: lvl, color: "#eceae4", label: LANG === "en" ? r.ien : r.ipt }) +
        '<p class="oqf-tile-cap">' + esc(lvl ? V.cap_level : tf(V.cap_val, { u: String(LANG === "en" ? r.uen : r.u).replace(/\.$/, "") })) + "</p></div>" : "") +
      '<p class="oqf-tile-f">' + chip(r.cat === "P" ? "ok" : "res") + "</p>";
    if (sens) h += '<p class="oqf-crit" role="note">' + chip("sens") + " " + esc(r.mdiff === "sim" ? V.sens_m : V.sens_w) + "</p>";
    if (r.lim && !G.comLim) h += '<p class="oqf-ec-note">' + esc(T.t_lim) + ": " + esc(LANG === "en" ? r.lim_en : r.lim) + "</p>";
    h += '<details class="oqf-tech"><summary>' + esc(V.tech) + '</summary><dl class="oqf-tdl">' +
      "<dt>" + esc(T.t_rule) + "</dt><dd>" + esc(LANG === "en" ? r.rule_en : r.rule) + "</dd>" +
      "<dt>" + esc(T.t_adeq) + "</dt><dd>" + esc(T.adeq[r.ad] || r.ad) + " · " + esc(LANG === "en" ? r.adm_en : r.adm) + "</dd>" +
      (r.pre ? "<dt>" + esc(T.t_pre) + "</dt><dd>" + esc(LANG === "en" ? r.pre_en : r.pre) + "</dd>" : "") +
      (r.ctx ? "<dt>" + esc(T.t_ctx) + "</dt><dd>" + esc(LANG === "en" ? r.ctx_en : r.ctx) + "</dd>" : "") +
      "<dt>" + esc(T.t_alt) + "</dt><dd>" + (r.alt.length ? '<ul class="oqf-alt">' + r.alt.map(function (x) { return "<li><b>" + esc(T.win[x[0]] || x[0]) + "</b> · " + esc(x[0] === "M" ? x[1] : altWinTxt(x[1])) + ": " + esc(altVal(r, x[2])) + "</li>"; }).join("") + "</ul>" : "—") + "</dd>" +
      "<dt>" + esc(V.t_series) + "</dt><dd><code>" + esc(r.s) + "</code> · " + esc(TERMS.source) + "</dd>" +
      "<dt>" + esc(V.t_cov) + "</dt><dd>" + esc(r.cov ? nfmt(+r.cov * 100, 0) + "%" : "—") + "</dd>" +
      "<dt>" + esc(V.t_gid) + "</dt><dd><code>" + esc(r.g) + "</code></dd></dl>" +
      (pts.length ? '<details class="oqf-vals"><summary>' + esc(tf(V.t_values, { n: pts.length })) + '</summary><div class="oqf-scroll"><table class="oqf-vtable"><thead><tr><th>' + esc(T.c_year) + "</th><th>" + esc(V.t_value) + "</th><th>" + esc(V.t_cat) + "</th></tr></thead><tbody>" +
        pts.map(function (p) { return "<tr" + (p[0] >= +r.y0 && p[0] <= +r.y1 ? ' class="is-win"' : "") + "><td>" + p[0] + '</td><td class="num">' + esc(rawNum(p[1])) + "</td><td>" + esc(p[5] === "P" ? "S" : p[5]) + "</td></tr>"; }).join("") + "</tbody></table></div></details>" : "") + "</details></article>";
    return h;
  }
  /* valor bruto legível (índices muito pequenos ou muito grandes em notação científica) */
  function rawNum(v) { var a = Math.abs(v); return a !== 0 && (a < 1e-3 || a >= 1e9) ? Number(v).toExponential(4) : nfmt(v, a < 10 ? 3 : 1); }

  /* ---------------------------------------------------------- METODOLOGIA */
  function renderMethod(app) {
    var h = hero({ active: "metodologia", crumb: T.sub.metodologia, kicker: T.title, title: esc(T.meth_h), dek: T.meth_dek });
    h += '<section class="sec sec--paper"><div class="wrap"><div id="oqf-banner"></div><div class="oqf-audits">' + T.audits.map(function (a) {
      return '<article class="oqf-audit"><div class="oqf-audit-top"><span class="mono small">' + esc(a.k) + "</span>" + chip(a.st) + "</div><h3>" + esc(a.h) + '</h3><p class="mono small">' + esc(a.v) + '</p><p class="small"><b>' + esc(a.stl) + "</b></p><ul>" + a.pts.map(function (p) { return "<li>" + esc(p) + "</li>"; }).join("") + "</ul></article>";
    }).join("") + "</div></div></section>";
    function grid(title, rows, cls) { return '<div class="oqf-mgrid ' + (cls || "") + '"><h3>' + esc(title) + "</h3><dl>" + rows.map(function (r) { return "<dt>" + esc(r[0]) + "</dt><dd>" + esc(r[1]) + "</dd>"; }).join("") + "</dl></div>"; }
    h += '<section class="sec sec--white"><div class="wrap"><div class="oqf-mgrids">' + grid(T.rel_h, T.rel) + grid(T.cmp2_h, T.cmpb) + grid(T.elig_h, T.elig, "elig") + grid(T.types_h, T.types_d) + "</div>" +
      '<div class="oqf-mgrid"><h3>' + esc(T.terr_h) + '</h3><ul class="oqf-list">' + T.terr.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul></div>" +
      '<div class="oqf-mgrid"><h3>' + esc(T.gov_h) + '</h3><ul class="oqf-list"><li>' + esc(T.gov_conv) + "</li><li>" + esc(T.gov_status) + "</li><li>" + esc(T.gov_colors) + "</li><li>" + esc(T.gov_rule) + "</li></ul></div></div></section>";
    h += '<section class="sec sec--dark2"><div class="wrap"><div class="oqf-mgrids"><div class="oqf-mgrid"><h3>' + esc(T.proto_h) + '</h3><ul class="oqf-list">' + T.proto.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + '</ul><p class="mono small" id="oqf-fstate"></p></div>' + grid(T.files_h, T.files) + "</div></div></section>";
    app.innerHTML = h;
    withManifest(function (ok) {
      var b = document.getElementById("oqf-banner"); if (b && ok) b.innerHTML = banner();
      var s = document.getElementById("oqf-fstate"); if (s && ok) s.textContent = T.file_state[M.mode] + " · " + M.generated;
    });
  }

  /* ---------------------------------------------------------- eventos */
  function selectCountry(iso) { mapState.s = iso; var sl = document.getElementById("oqf-sel"); if (sl) sl.value = iso; paintMap(); }
  document.addEventListener("click", function (e) {
    var t = e.target.closest ? e.target : null; if (!t) return;
    var el;
    if ((el = t.closest("[data-oqf-layer]")) && mapState) { mapState.l = el.getAttribute("data-oqf-layer"); [].forEach.call(document.querySelectorAll("[data-oqf-layer]"), function (b) { b.setAttribute("aria-selected", b === el); }); paintMap(); return; }
    if ((el = t.closest("#oqf-map .oqf-c, #oqf-map .oqf-crimea")) && mapState) {
      selectCountry(el.getAttribute("data-iso"));
      if (window.matchMedia("(max-width: 999px)").matches) { var p = document.getElementById("oqf-panel"); if (p) p.scrollIntoView({ behavior: "smooth", block: "nearest" }); }
      return;
    }
    if ((el = t.closest("[data-oqf-pick]")) && mapState) { selectCountry(el.getAttribute("data-oqf-pick")); return; }
    if (t.closest("[data-oqf-close]") && mapState) { selectCountry(""); return; }
    if ((el = t.closest("[data-oqf-pind]")) && mapState) { mapState.i = el.getAttribute("data-oqf-pind"); paintMap(); return; }
    if ((el = t.closest("[data-oqf-add]")) && mapState) { var k = el.getAttribute("data-oqf-add"), i = mapState.sel.indexOf(k); if (i > -1) mapState.sel.splice(i, 1); else mapState.sel.push(k); paintMap(); return; }
    if ((el = t.closest("#oqf-play")) && mapState) {
      if (playTimer) { stopPlay(); return; }
      if (mapState.y >= Y1) mapState.y = Y0;
      el.setAttribute("aria-pressed", "true"); el.textContent = "❚❚"; el.setAttribute("aria-label", T.pause);
      playTimer = setInterval(function () { if (!document.getElementById("oqf-map")) return stopPlay(); mapState.y++; paintMap(); if (mapState.y >= Y1) stopPlay(); }, 260);
      return;
    }
    if ((el = t.closest("#oqf-scplay")) && cmp) {
      if (scTimer) { stopSc(); return; }
      if (cmp.t >= Y1) cmp.t = 1950;
      el.textContent = "❚❚"; el.setAttribute("aria-pressed", "true");
      scTimer = setInterval(function () { if (!document.getElementById("oqf-sc")) return stopSc(); cmp.t++; redrawScatter(); if (cmp.t >= Y1) { stopSc(); drawCompareHashOnly(); } }, 220);
      return;
    }
    if ((el = t.closest("[data-oqf-tc]")) && termsState) { termsState.c = el.getAttribute("data-oqf-tc"); termsState.g = ""; termsState.x = []; drawTerms(true); return; }
    if ((el = t.closest("[data-oqf-tg]")) && termsState) { termsState.g = el.getAttribute("data-oqf-tg"); termsState.x = []; drawTerms(true); var o = document.getElementById("oqf-terms-out"); if (o && el.classList.contains("oqf-navb")) o.scrollIntoView({ behavior: "smooth", block: "start" }); return; }
    if ((el = t.closest("[data-oqf-tx]")) && termsState) {
      var tx = el.getAttribute("data-oqf-tx"), S2 = termsState;
      if (tx === "*") { var G2 = termGroups(S2.c).filter(function (G) { return G.g === S2.g; })[0], allIds = G2 ? G2.rows.map(function (r) { return r.i; }) : []; var on2 = [].some.call(document.querySelectorAll("[data-oqf-tx]"), function (b) { return b.getAttribute("aria-pressed") === "false"; }); S2.x = on2 ? allIds : []; }
      else { var ix = S2.x.indexOf(tx); if (ix > -1) S2.x.splice(ix, 1); else S2.x.push(tx); }
      drawTerms(true); return;
    }
    if ((el = t.closest("[data-oqf-ptab]")) && prof) { prof.t = el.getAttribute("data-oqf-ptab"); drawProfileTab(); if (el.classList.contains("oqf-link")) { var pt = document.querySelector(".oqf-ptabs"); if (pt) pt.scrollIntoView({ behavior: "smooth" }); } return; }
    if ((el = t.closest("[data-oqf-pgrp]")) && prof) { prof.g = el.getAttribute("data-oqf-pgrp"); drawProfileTab(); return; }
    if ((el = t.closest("[data-oqf-goto]")) && prof) { var gg = el.getAttribute("data-oqf-goto").split("|"); prof.t = gg[0]; prof.g = gg[1]; drawProfileTab(); var pt2 = document.querySelector(".oqf-ptabs"); if (pt2) pt2.scrollIntoView({ behavior: "smooth" }); return; }
    if ((el = t.closest("[data-oqf-lx]"))) {
      var lx = el.getAttribute("data-oqf-lx");
      if (el.closest("#oqf-guide-out") && guide) { guide.x = (guide.x || []).concat([lx]); drawGuide(); }
      else if (prof) { prof.x.push(lx); drawLeaderPanel(); profHash(); }
      return;
    }
    if ((el = t.closest("[data-oqf-gd]")) && guide) { guide.c = el.getAttribute("data-oqf-gd"); guide.l = null; guide.x = []; drawGuide(); return; }
    if ((el = t.closest("[data-oqf-vmode]")) && mapState) { stopPlay(); mapState.v = el.getAttribute("data-oqf-vmode"); if (mapState.v === "val" && PANEL_IND.indexOf(mapState.i) < 0) mapState.i = "life_exp"; paintMap(); return; }
    if ((el = t.closest("[data-oqf-per]")) && cmp) { var pr = el.getAttribute("data-oqf-per").split("|"); cmp.a = +pr[0]; cmp.b = +pr[1]; drawForm(); drawCompare(); return; }
    if ((el = t.closest("[data-oqf-solo]")) && cmp) { cmp.c = [el.getAttribute("data-oqf-solo")]; drawForm(); drawCompare(); return; }
    if ((el = t.closest("[data-oqf-gc]"))) { [].forEach.call(document.querySelectorAll("[data-oqf-gc]"), function (b) { b.setAttribute("aria-selected", b === el); }); withLeaders(function (ok) { drawLeaders(el.getAttribute("data-oqf-gc"), ok); }); return; }
    if ((el = t.closest("[data-oqf-mode]")) && cmp) { stopSc(); cmp.m = el.getAttribute("data-oqf-mode"); if (cmp.m === "reforma" && !cmp.r) cmp.r = 1991; drawForm(); drawCompare(); return; }
    if ((el = t.closest("[data-oqf-c]")) && cmp) { var c = el.getAttribute("data-oqf-c"), j = cmp.c.indexOf(c); if (j > -1) cmp.c.splice(j, 1); else cmp.c.push(c); cmp.c.sort(function (a, b) { return PILOTS.indexOf(a) - PILOTS.indexOf(b); }); el.setAttribute("aria-pressed", j < 0); drawCompare(); return; }
    if ((el = t.closest("[data-oqf-preset]")) && cmp) {
      var pp = el.getAttribute("data-oqf-preset").split("|"); cmp.r = +pp[1]; cmp.a = Math.max(Y0, cmp.r - 15); cmp.b = Math.min(Y1, cmp.r + 15);
      if (cmp.c.indexOf(pp[0]) < 0) cmp.c = [pp[0]];
      drawForm(); drawCompare(); return;
    }
    if ((el = t.closest("[data-oqf-jump]"))) { e.preventDefault(); var tg = document.getElementById(el.getAttribute("data-oqf-jump")); if (tg) tg.scrollIntoView({ behavior: "smooth" }); return; }
  });
  function drawCompareHashOnly() { if (cmp) setHash(link("comparar", "", qs({ c: cmp.c.join(","), i: cmp.i, j: cmp.j, t: cmp.t, m: "dispersao" }))); }
  document.addEventListener("mousemove", function (e) {
    if (!mapState) return;
    var t = e.target, el = t && t.closest ? t.closest("#oqf-map .oqf-c, #oqf-map .oqf-crimea") : null;
    tooltip(el ? el.getAttribute("data-iso") : null, e);
  });
  document.addEventListener("input", function (e) {
    if (e.target && e.target.id === "oqf-y" && mapState) { stopPlay(); mapState.y = +e.target.value; paintMap(); }
    if (e.target && e.target.id === "oqf-t" && cmp) { stopSc(); cmp.t = +e.target.value; redrawScatter(); drawCompareHashOnly(); }
  });
  document.addEventListener("change", function (e) {
    var id = e.target && e.target.id;
    if (id === "oqf-sel" && mapState) { selectCountry(e.target.value); return; }
    if (id === "oqf-tgsel" && termsState) { termsState.g = e.target.value; termsState.x = []; drawTerms(true); return; }
    if (id === "oqf-lsel" && prof) { prof.l = +e.target.value; prof.x = []; drawLeaderPanel(); profHash(); return; }
    if (e.target.hasAttribute && e.target.hasAttribute("data-oqf-lxs") && e.target.value) {
      var lv = e.target.value;
      if (e.target.closest("#oqf-guide-out") && guide) { guide.x = (guide.x || []).concat([lv]); drawGuide(); }
      else if (prof) { prof.x.push(lv); drawLeaderPanel(); profHash(); }
      return;
    }
    if (id === "oqf-gsel" && guide) { guide.l = +e.target.value; guide.x = []; drawGuide(); return; }
    if (!cmp) return;
    if (id === "oqf-i") { cmp.i = e.target.value; drawCompare(); }
    else if (id === "oqf-j") { cmp.j = e.target.value; drawCompare(); }
    else if (id === "oqf-a" || id === "oqf-b") { cmp[id.slice(-1)] = +e.target.value; if (cmp.a > cmp.b) { var t = cmp.a; cmp.a = cmp.b; cmp.b = t; } drawForm(); drawCompare(); }
    else if (id === "oqf-r") { cmp.r = +e.target.value; drawCompare(); }
    else if (id === "oqf-log") { cmp.s = e.target.checked ? "log" : ""; drawCompare(); }
  });
  document.addEventListener("keydown", function (e) {
    var t = e.target;
    if ((e.key === "Enter" || e.key === " ") && t && t.getAttribute && mapState && (t.classList.contains("oqf-c") || t.hasAttribute("data-oqf-pick"))) { e.preventDefault(); selectCountry(t.getAttribute("data-iso") || t.getAttribute("data-oqf-pick")); }
  });

  /* ---------------------------------------------------------- ponto de entrada (chamado pelo roteador) */
  /* ao cruzar a fronteira celular/desktop (girar o aparelho), redesenha os gráficos na largura nova */
  var wasNarrow = null, rsT = null;
  window.addEventListener("resize", function () {
    clearTimeout(rsT); rsT = setTimeout(function () {
      var n = narrow(); if (wasNarrow === null) { wasNarrow = n; return; } if (n === wasNarrow) return; wasNarrow = n;
      if (cmp && document.getElementById("oqf-cmp-out")) drawCompare();
      else if (termsState && document.getElementById("oqf-terms-out")) drawTerms(true);
      else if (prof && document.getElementById("oqf-ptab")) drawProfileTab();
      else if (mapState && document.getElementById("oqf-map")) paintMap();
      else if (guide && document.getElementById("oqf-guide-out")) drawGuide();
    }, 200);
  });
  OQF.render = function (app, parts, q) {
    stopPlay(); stopSc(); mapState = null; cmp = null; termsState = null; prof = null; guide = null; wasNarrow = narrow();
    var sub = parts[1] || "", arg = parts[2];
    if (sub === "mapa") renderMap(app, q);
    else if (sub === "governantes") renderLeaders(app, q);
    else if (sub === "perfil" && arg) renderProfile(app, arg.toUpperCase(), q);
    else if (sub === "perfil") renderProfiles(app);
    else if (sub === "comparar") renderCompare(app, q);
    else if (sub === "mandatos") renderTerms(app, q);
    else if (sub === "metodologia") renderMethod(app);
    else renderLanding(app);
    /* no celular, a aba ativa da subnavegação fica visível (a barra rola na horizontal) */
    var cur = app.querySelector(".oqf-subnav [aria-current]"); if (cur && cur.parentNode.scrollWidth > cur.parentNode.clientWidth) cur.parentNode.scrollLeft = Math.max(0, cur.offsetLeft - cur.parentNode.offsetLeft - 24);
  };
  OQF.label = T.nav;
})();
