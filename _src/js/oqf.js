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
  var T = EB.oqfAll[LANG];
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
  var M = null, SER = {}, loading = {}, WORLD = null, L = null, WAV = null, TERMS = null;
  var OQF = window.OQF = {
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
      g += inl ? '<text class="b-l b-l-in" x="' + ml + '" y="' + (y - 3) + '">' : '<text class="b-l" x="' + (ml - 6) + '" y="' + (y + 10.5) + '">' + esc((LANG === "en" ? ln.en : ln.pt).split(" (")[0]) + "</text>";
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

  /* ---------------------------------------------------------- ABERTURA */
  function renderLanding(app) {
    var h = '<section class="hero oqf-hero"><div class="wrap"><div class="hero-meta"><span><b>' + (LANG === "en" ? "New section" : "Nova seção") + "</b></span><span>1945 → 2026</span><span>" + (LANG === "en" ? "Prototype" : "Protótipo") + "</span></div>" +
      '<div class="oqf-hero-grid"><div><h1>' + esc(T.title).replace(/ /, "<br>") + '</h1><p class="hero-sub">' + esc(T.subtitle) + '</p><div class="hero-cta"><a class="btn btn--solid" href="' + link("mapa") + '">' + esc(T.sub.mapa) + ' <span class="arr">→</span></a><a class="btn btn--ghost" href="' + link("governantes") + '">' + esc(SUBLBL("governantes")) + "</a></div></div>" +
      '<div class="oqf-hero-map" id="oqf-hero-map" aria-hidden="true"></div></div></div></section>';
    h += '<div class="oqf-subnav-bar"><div class="wrap">' + subnav("") + "</div></div>";
    h += '<section class="sec sec--paper"><div class="wrap wrap--narrow oqf-open"><div class="eyebrow">' + esc(T.sub[""]) + '</div><h2 class="oqf-q">' + esc(T.question) + "</h2>" +
      T.intro.map(function (p) { return '<p class="oqf-lede">' + esc(p) + "</p>"; }).join("") +
      '<p class="oqf-punch">' + esc(T.punch) + "</p>" +
      '<ul class="oqf-guard">' + T.guard.map(function (g) { return "<li>" + tagHtml("m", TAGTXT.m) + "<span>" + esc(g[1]) + "</span></li>"; }).join("") + "</ul></div></section>";
    h += '<section class="sec sec--dark2"><div class="wrap"><div class="oqf-axes">' + T.axes.map(function (a) {
      return '<div class="oqf-axis"><span class="oqf-axis-k">' + a.k + "</span><h3>" + esc(a.q) + "</h3><p>" + esc(a.d) + '</p><div class="oqf-axis-f"><span class="mono small">' + esc(a.a) + "</span>" + chip(a.st) + "</div></div>";
    }).join("") + "</div></div></section>";
    h += '<section class="sec sec--dark"><div class="wrap"><div class="eyebrow">' + esc(T.strip_h) + '</div><div class="oqf-strip" tabindex="0" role="list">' + T.strip.map(function (s) {
      return '<div class="oqf-strip-i" role="listitem"><b>' + s[0] + "</b><span>" + esc(s[1]) + "</span></div>";
    }).join("") + '</div><p class="oqf-note">' + tagHtml("c", TAGTXT.c) + " " + esc(T.strip_note) + "</p></div></section>";
    h += '<section class="sec sec--paper"><div class="wrap"><div class="eyebrow">' + esc(T.cards_h) + '</div><div class="method oqf-cards">' + T.cards.map(function (c, i) {
      return '<a href="' + link(c[0]) + '"><small class="mono">0' + (i + 1) + "</small><b>" + esc(c[1]) + "</b><span>" + esc(c[2]) + "</span></a>";
    }).join("") + "</div></div></section>";
    h += '<section class="sec sec--white sec--tight"><div class="wrap"><div class="eyebrow">' + esc(T.status_h) + '</div><div class="oqf-audit-rows">' + T.audits.map(function (a) {
      return '<a class="oqf-audit-row" href="' + link("metodologia") + '"><b>' + esc(a.k) + "</b><span>" + esc(a.h) + "</span>" + chip(a.st) + "</a>";
    }).join("") + '</div><div id="oqf-mode" class="oqf-mode"></div></div></section>';
    app.innerHTML = h;
    withWorld(function (ok) {
      var el = document.getElementById("oqf-hero-map"); if (!el || !ok) return;
      el.innerHTML = worldSvg({ interactive: false, label: T.title });
    });
    withManifest(function (ok) { var el = document.getElementById("oqf-mode"); if (el && ok) el.innerHTML = banner(); });
  }

  /* ---------------------------------------------------------- MAPA (painel) */
  var mapState = null, playTimer = null, PANEL_IND = ["life_exp", "gdp_pc_ppp", "gdp_growth", "inflation"];
  var SHORT = { life_exp: ["Saúde", "Health"], gdp_pc_ppp: ["Renda", "Income"], gdp_growth: ["PIB", "GDP"], inflation: ["Inflação", "Inflation"], gini: ["Desigualdade", "Inequality"], gdp_proxy: ["Renda", "Income"] };
  function shortName(I) { var x = SHORT[I.id]; return x ? x[LANG === "en" ? 1 : 0] : indName(I); }
  function renderMap(app, q) {
    var y = clampY(q.y, 1990), layer = { pol: 1, pros: 1, eco: 1 }[q.l] ? q.l : "pros";
    var sel = (q.c || "").split(",").filter(function (x) { return PILOTS.indexOf(x) > -1; });
    mapState = { y: y, l: layer, s: q.s || "", sel: sel, i: q.i || "life_exp" };
    var h = hero({ active: "mapa", crumb: T.sub.mapa, kicker: T.title, title: esc(T.map_h), dek: T.map_dek });
    var ticks = ""; for (var t = 1950; t <= 2020; t += 10) ticks += '<span style="left:' + ((t - Y0) / (Y1 - Y0) * 100).toFixed(2) + '%">' + t + "</span>";
    h += '<section class="sec sec--dark2 sec--tight oqf-dash"><div class="wrap"><div id="oqf-banner"></div>' +
      '<div class="oqf-kpis">' + T.kpis.map(function (k) { return '<div class="oqf-kpi"><b>' + esc(k[0]) + "</b><span>" + esc(k[1]) + "</span><small>" + esc(k[2]) + "</small></div>"; }).join("") +
      '<div class="oqf-kpi oqf-kpi-y"><b id="oqf-yv">' + y + "</b><span>" + esc(T.kpi_year) + '</span><small id="oqf-ys"></small></div></div>' +
      '<div class="oqf-board"><div class="oqf-mapcard"><div class="oqf-mapbar"><div class="tabs" role="tablist" aria-label="' + esc(T.layer) + '">' + ["pol", "pros", "eco"].map(function (l) { return '<button class="tab" role="tab" data-oqf-layer="' + l + '" aria-selected="' + (l === layer) + '">' + esc(T.layers[l]) + "</button>"; }).join("") + "</div></div>" +
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
  function paintMap() {
    var S = mapState; if (!S || !WORLD) return;
    var used = {};
    [].forEach.call(document.querySelectorAll("#oqf-map .oqf-c"), function (el) {
      var iso = el.getAttribute("data-iso"), st = stateOf(iso, S.y, S.l);
      used[st] = 1;
      el.setAttribute("class", "oqf-c st-" + st + (PILOTS.indexOf(iso) > -1 ? " is-pilot" : "") + (iso === S.s ? " is-sel" : "") + (S.sel.indexOf(iso) > -1 ? " is-cmp" : ""));
    });
    /* seleção desenhada por último, para o brilho ficar por cima */
    var selEl = S.s && document.querySelector('#oqf-map .oqf-c[data-iso="' + S.s + '"]'); if (selEl) selEl.parentNode.appendChild(selEl);
    var cr = document.querySelector("#oqf-map .oqf-crimea");
    if (cr) { cr.parentNode.appendChild(cr); cr.setAttribute("class", "oqf-crimea" + (S.y >= 2014 ? " is-occ" : " st-" + stateOf(S.y < 1954 ? "RUS" : "UKR", S.y, S.l)) + (S.s === "UKR" ? " is-sel" : "")); }
    var yv = document.getElementById("oqf-yv"); if (yv) yv.textContent = S.y;
    var ys = document.getElementById("oqf-ys"); if (ys) ys.textContent = S.y >= 2024 ? T.states.proj[0] : "";
    var r = document.getElementById("oqf-y"); if (r && +r.value !== S.y) r.value = S.y;
    var ln = document.getElementById("oqf-ln"); if (ln) ln.innerHTML = "<b>" + esc(T.layers[S.l]) + ".</b> " + esc(T.layer_note[S.l]);
    var y26 = document.getElementById("oqf-y26"); if (y26) y26.hidden = S.y < 2024 || S.l !== "pros";
    var order = ["ok", "res", "auto", "exp", "demo", "proj", "prelim", "np", "pend", "prep", "gap"];
    var lg = document.getElementById("oqf-legend");
    if (lg) lg.innerHTML = order.filter(function (k) { return used[k] || (k === "prelim" && S.l === "pros" && S.y >= 2024); }).map(function (k) {
      return '<span class="oqf-lg"><i class="sw st-' + k + '"></i>' + esc(T.states[k][0]) + (used[k] ? "" : " (0)") + "</span>";
    }).join("") + (S.y >= 2014 ? '<span class="oqf-lg"><i class="sw sw-crimea"></i>' + esc(LANG === "en" ? "Crimea (occupied)" : "Crimeia (ocupada)") + "</span>" : "");
    paintPanel(); paintTable();
    setHash(link("mapa", "", qs({ y: S.y, l: S.l, s: S.s, c: S.sel.join(","), i: S.i === "life_exp" ? "" : S.i })));
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
      (m ? "<br>" + esc(m.f + " · " + m.v) : "") + (noteTxt(m, best.p[6]) ? '<br><span class="oqf-note-i">' + esc(noteTxt(m, best.p[6])) + "</span>" : "") + "</p>";
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
          ["pol", "pros", "eco"].map(function (l) { return "<td>" + chip(stateOf(k, S.y, l)) + "</td>"; }).join("") + "</tr>";
      }).join("") + '<tr class="is-rest"><td>' + esc(T.tbl_rest) + "</td><td>—</td><td>—</td><td>" + chip("prep") + "</td><td>" + restCount("pros", S.y) + "</td><td>" + restCount("eco", S.y) + "</td></tr></tbody>";
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
    var h = '<div class="oqf-tt-h">' + flag(iso) + "<b>" + esc(cname(iso)) + "</b></div>" + chip(stateOf(iso, S.y, S.l));
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
  function renderProfile(app, iso, q) {
    if (!T.countries[iso]) return renderProfiles(app);
    var C = T.countries[iso];
    var h = hero({ active: "perfil", crumb: T.sub.perfil, crumbLink: link("perfil"), crumb2: C.name, kicker: (LANG === "en" ? "Pilot country · Batch 0" : "País-piloto · Lote 0"), title: flag(iso, "xl") + esc(C.name) });
    var S = T.prof_sections;
    h += '<section class="sec sec--paper sec--tight"><div class="wrap"><div id="oqf-banner"></div>' +
      '<nav class="oqf-jump" aria-label="' + esc(C.name) + '">' + ["hist", "ent", "gov", "pol", "ref", "pros", "eco", "src"].map(function (k) { return '<a href="#oqf-' + k + '" data-oqf-jump="oqf-' + k + '">' + esc(S[k]) + "</a>"; }).join("") + "</nav><div class=\"oqf-prof\">";
    h += '<section class="oqf-sec" id="oqf-hist"><h2>' + esc(S.hist) + '</h2><div class="oqf-two"><div><p>' + tagHtml("f", TAGTXT.f) + "</p><p>" + esc(C.borders) + '</p></div><ol class="oqf-events">' +
      C.events.map(function (e) { return '<li><time datetime="' + e[0] + '">' + dateTxt(e[0]) + "</time><span>" + esc(e[1]) + "</span></li>"; }).join("") + '</ol></div><p class="oqf-note small">' + esc(T.strip_note) + "</p></section>";
    h += '<section class="oqf-sec" id="oqf-ent"><h2>' + esc(S.ent) + "</h2>" + entTimeline(iso) + '<dl class="oqf-ents">' + C.entities.map(function (e) {
      return "<dt><code>" + esc(e[0]) + "</code> " + esc(e[1]) + ' <span class="mono small">' + e[2] + "–" + (e[3] === Y1 ? "" : e[3]) + "</span></dt><dd>" + esc(e[4]) + "</dd>";
    }).join("") + "</dl></section>";
    h += '<section class="oqf-sec" id="oqf-gov"><h2>' + esc(S.gov) + '</h2><p class="small">' + tagHtml("m", TAGTXT.m) + " " + esc(T.gov_conv) + '</p><div id="oqf-govdata" class="oqf-gov-card"><div class="oqf-loading"></div></div><p class="small">' + esc(T.gov_rule) + "</p></section>";
    h += '<section class="oqf-sec" id="oqf-pol"><h2>' + esc(S.pol) + "</h2>" + chip("np") + "<p>" + esc(T.pol_pending) + '</p><div class="oqf-dims">' + T.dims.map(function (d) { return "<div><b>" + d[0] + "</b><span>" + esc(d[1]) + "</span><small>" + esc(T.dim_cell) + "</small></div>"; }).join("") + "</div></section>";
    var pr = T.presets.filter(function (p) { return p[0] === iso; })[0];
    h += '<section class="oqf-sec" id="oqf-ref"><h2>' + esc(S.ref) + "</h2>" + (pr ? '<div class="oqf-ref"><span class="oqf-ref-y">' + pr[1] + "</span><div><b>" + esc(pr[2]) + '</b><p class="small">' + tagHtml("m", TAGTXT.m) + " " + esc(T.ref_note) + '</p><a class="small" href="' + link("comparar", "", qs({ c: iso, m: "reforma", r: pr[1], a: pr[1] - 15, b: Math.min(Y1, pr[1] + 15) })) + '">' + esc(T.open_cmp) + "</a></div></div>" : "") + '<p class="small">' + esc(T.ref_more) + "</p></section>";
    h += '<section class="oqf-sec" id="oqf-pros"><h2>' + esc(S.pros) + '</h2><p class="small">' + tagHtml("m", TAGTXT.m) + " " + esc(T.pros_note) + '</p><div id="oqf-pros-out" class="oqf-minis"><div class="oqf-loading"></div></div></section>';
    h += '<section class="oqf-sec" id="oqf-eco"><h2>' + esc(S.eco) + '</h2><p class="small">' + tagHtml("m", TAGTXT.m) + " " + esc(T.eco_note) + '</p><div id="oqf-eco-out" class="oqf-minis"><div class="oqf-loading"></div></div><p class="small"><a href="' + link("mandatos", "", qs({ c: iso === "BRA" ? "" : iso })) + '">' + esc(T.terms_link) + " →</a></p></section>";
    h += '<section class="oqf-sec" id="oqf-src"><h2>' + esc(S.src) + '</h2><div id="oqf-src-out"></div></section>';
    h += "</div></div></section>";
    app.innerHTML = h;
    withLeaders(function (ok) {
      var gd = document.getElementById("oqf-govdata"); if (!gd) return;
      gd.innerHTML = ok ? govChart(iso, { mark: q && q.y ? clampY(q.y, null) : null }) + govLegend(iso) + govTable(iso) : errBox();
    });
    withSeries(ENTS[iso], function (ok) {
      var b = document.getElementById("oqf-banner"); if (b) b.innerHTML = banner();
      ["pros", "eco"].forEach(function (layer) {
        var out = document.getElementById("oqf-" + layer + "-out"); if (!out) return;
        if (!ok || !M) { out.innerHTML = errBox(); return; }
        if (isDemo() && layer === "eco") { out.innerHTML = chip("pend"); return; }
        var hasData = function (id) { return seriesFor(iso, id, Y0, Y1).some(function (s) { return s.pts.length; }); };
        out.innerHTML = indsOf(layer).filter(function (I) {
          if (I.only && I.only.indexOf(iso) < 0) return false;
          /* renda × consumo: o país usa um tipo de pesquisa; o outro não se aplica e não é mostrado como lacuna */
          var m = /^(.*)_(inc|cons)$/.exec(I.id); if (m && !hasData(I.id) && hasData(m[1] + (m[2] === "inc" ? "_cons" : "_inc"))) return false;
          return true;
        }).map(function (I) { return miniCard(iso, I); }).join("");
      });
      var so = document.getElementById("oqf-src-out"); if (so) so.innerHTML = sourcesBlock();
    });
  }
  function miniCard(iso, I) {
    var list = seriesFor(iso, I.id, Y0, Y1), has = list.some(function (s) { return s.pts.length; }), head = "<h3>" + esc(indName(I)) + '</h3><p class="mono small oqf-unit">' + esc(indUnit(I)) + "</p>";
    if (!has) return '<div class="oqf-mini is-empty">' + head + chip("prep") + ' <span class="small">' + esc(T.no_data) + "</span></div>";
    var last = null, first = null; list.forEach(function (s) { s.pts.forEach(function (p) { if (!last || p[0] > last.p[0]) last = { p: p, e: s.ent }; if (!first || p[0] < first.p[0]) first = { p: p, e: s.ent }; }); });
    var m = metaOf(last.e, I.id), notes = {};
    list.forEach(function (s) { var mm = metaOf(s.ent, I.id); s.pts.forEach(function (p) { var t = noteTxt(mm, p[6]); if (t) t.split("; ").forEach(function (x) { notes[x] = 1; }); }); });
    var cats = {}; list.forEach(function (s) { s.pts.forEach(function (p) { cats[p[5]] = 1; }); });
    var withPts = list.filter(function (s) { return s.pts.length; });
    var leg = withPts.length > 1 ? '<p class="mono small oqf-mini-leg">' + withPts.map(function (s) { return (DASH[s.ent] ? "╌ " : "— ") + esc(T.ent_names[s.ent] || s.ent); }).join(" · ") + "</p>" : "";
    return '<div class="oqf-mini">' + head + chart(list, { a: Y0, b: Y1, mini: true, I: I }) + leg +
      '<p class="mono small">' + esc(T.last_obs) + ": <b>" + fmtI(I, dv(I, last.p[1])) + "</b> · " + last.p[0] + " · " + esc(T.ent_names[last.e] || last.e) + " · " + esc(T.types[last.p[2]]) + "</p>" +
      '<p class="mono small">' + esc(first.p[0] + "–" + last.p[0]) + " · " + Object.keys(cats).map(function (c) { return chip(c === "P" ? "ok" : "res"); }).join(" ") + (I.intl ? "" : " " + chip("nat")) + "</p>" +
      (m ? '<p class="small oqf-src-l">' + esc(T.c_src) + ": " + esc(m.f + " · " + m.v + " · " + m.s) + "</p>" : "") +
      (Object.keys(notes).length ? '<p class="small oqf-notes">' + esc(T.caveats) + ": " + esc(Object.keys(notes).join("; ")) + "</p>" : "") +
      '<a class="small" href="' + link("comparar", "", qs({ c: iso, i: I.id, a: Math.max(Y0, Math.floor(first.p[0] / 5) * 5), b: Y1 })) + '">' + esc(T.open_cmp) + "</a></div>";
  }
  function sourcesBlock() {
    if (isDemo()) return "<p>" + esc(T.srcs_demo) + '</p><ul class="src-list">' + M.indicators.map(function (I) { return "<li>" + esc(indName(I)) + " — " + esc(I.src) + " · " + esc(LANG === "en" ? I.unit_en : I.unit_pt) + "</li>"; }).join("") + "</ul>";
    return '<ul class="src-list">' + M.indicators.map(function (I) { return "<li><b>" + esc(indName(I)) + "</b> — " + esc(I.src) + " · <code>" + esc(I.serie) + "</code> · " + esc(I.audit === "a2" ? T.audit2 : T.audit3) + "</li>"; }).join("") + "</ul>" + versionsLine();
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
  function chart(list, o) {
    var I = o.I || null, V = function (p) { return dv(I, p[1]); };
    var W = o.mini ? 320 : 760, H = o.mini ? 120 : 340, ml = o.mini ? 8 : 46, mr = 12, mt = 12, mb = o.mini ? 18 : 30;
    var vals = []; list.forEach(function (s) { s.pts.forEach(function (p) { vals.push(V(p)); }); });
    if (!vals.length) return '<p class="oqf-empty">' + esc(T.c_empty) + "</p>";
    var lo = Math.min.apply(null, vals), hi = Math.max.apply(null, vals), pad = (hi - lo) * 0.08 || 1; lo -= pad; hi += pad;
    var X = function (y) { return ml + (y - o.a) / Math.max(1, o.b - o.a) * (W - ml - mr); };
    var Yp = function (v) { return mt + (1 - (v - lo) / (hi - lo)) * (H - mt - mb); };
    var g = "", step = niceStep(hi - lo, o.mini ? 2 : 5);
    for (var v = Math.ceil(lo / step) * step; v <= hi; v += step) {
      g += '<line class="gr" x1="' + ml + '" x2="' + (W - mr) + '" y1="' + Yp(v).toFixed(1) + '" y2="' + Yp(v).toFixed(1) + '"/>';
      if (!o.mini) g += '<text class="ax" x="' + (ml - 6) + '" y="' + (Yp(v) + 4).toFixed(1) + '" text-anchor="end">' + fmt(+v.toFixed(2)) + "</text>";
      else g += '<text class="ax ax-mini" x="' + (ml + 1) + '" y="' + (Yp(v) - 2).toFixed(1) + '">' + fmt(+v.toFixed(2)) + "</text>";
    }
    if (lo < 0 && hi > 0) g += '<line class="gr zero" x1="' + ml + '" x2="' + (W - mr) + '" y1="' + Yp(0).toFixed(1) + '" y2="' + Yp(0).toFixed(1) + '"/>';
    var span = o.b - o.a, xstep = span > 60 ? 15 : span > 30 ? 10 : 5;
    for (var yy = Math.ceil(o.a / xstep) * xstep; yy <= o.b; yy += xstep) g += '<text class="ax" x="' + X(yy).toFixed(1) + '" y="' + (H - (o.mini ? 4 : 8)) + '" text-anchor="middle">' + yy + "</text>";
    if (o.mark && o.mark >= o.a && o.mark <= o.b) g += '<line class="mk" x1="' + X(o.mark).toFixed(1) + '" x2="' + X(o.mark).toFixed(1) + '" y1="' + mt + '" y2="' + (H - mb) + '"/>' + (o.mini ? "" : '<text class="mk-t" x="' + (X(o.mark) + 5).toFixed(1) + '" y="' + (mt + 12) + '">' + esc(T.c_marker) + " · " + o.mark + "</text>");
    list.forEach(function (s) {
      var col = COLOR[s.iso] || "#8fa3c9", dash = DASH[s.ent] || "";
      segments(s.pts).forEach(function (seg) {
        var d = seg.pts.map(function (p, i) { return (i ? "L" : "M") + X(p[0]).toFixed(1) + " " + Yp(V(p)).toFixed(1); }).join("");
        var da = seg.st === "r" ? "1.5 3" : seg.st === "p" ? "" : dash;
        if (seg.st !== "p" && seg.pts.length > 1) g += '<path class="ln ln-' + seg.st + '" d="' + d + '" stroke="' + col + '"' + (da ? ' stroke-dasharray="' + da + '"' : "") + "/>";
        var showPts = seg.st === "p" || seg.pts.length < 2 || (seg.pts.length > 1 && seg.pts[1][0] - seg.pts[0][0] >= 2);
        if (showPts) seg.pts.forEach(function (p) {
          g += '<circle class="pt pt-' + seg.st + '" cx="' + X(p[0]).toFixed(1) + '" cy="' + Yp(V(p)).toFixed(1) + '" r="' + (o.mini ? 1.8 : 2.8) + '" stroke="' + col + '" fill="' + (seg.st === "p" ? "none" : col) + '"><title>' + esc(T.ent_names[s.ent]) + " · " + p[0] + " · " + fmtI(I, V(p)) + " " + esc(I ? indUnit(I) : "") + " · " + esc(T.types[p[2]]) + (p[5] ? " · " + esc(T.cats[p[5]]) : "") + "</title></circle>";
        });
      });
      if (o.mark) { s.pts.forEach(function (p) { if (p[0] === o.mark) g += '<circle class="pt-mark" cx="' + X(p[0]).toFixed(1) + '" cy="' + Yp(V(p)).toFixed(1) + '" r="' + (o.mini ? 3.5 : 5) + '" fill="' + col + '"/>'; }); }
    });
    var wm = isDemo() ? '<text class="wm" x="' + (W / 2) + '" y="' + (H / 2 + (o.mini ? 6 : 10)) + '" text-anchor="middle">' + esc(T.demo_banner.toUpperCase()) + "</text>" : "";
    return '<svg class="oqf-chart' + (o.mini ? " mini" : "") + (isDemo() ? " is-demo" : "") + '" viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="' + esc(o.label || "") + '">' + wm + g + "</svg>";
  }
  /* dispersão animada: um círculo por entidade no ano t, com rastro dos anos anteriores */
  function scatter(ents, ix, iy, t, a) {
    var DX = function (p) { return dv(ind(ix), p[1]); }, DY = function (p) { return dv(ind(iy), p[1]); };
    var W = 760, H = 440, ml = 52, mr = 18, mt = 16, mb = 46;
    var xs = [], ys = [];
    ents.forEach(function (e) { [ix, iy].forEach(function (id, k) { ((SER[e.ent] && SER[e.ent].ind[id]) || []).forEach(function (p) { if (p[0] >= a) (k ? ys : xs).push(k ? DY(p) : DX(p)); }); }); });
    if (!xs.length || !ys.length) return '<p class="oqf-empty">' + esc(T.c_empty) + "</p>";
    var x0 = Math.min.apply(null, xs), x1 = Math.max.apply(null, xs), y0 = Math.min.apply(null, ys), y1 = Math.max.apply(null, ys);
    var px = (x1 - x0) * 0.08 || 1, py = (y1 - y0) * 0.08 || 1; x0 -= px; x1 += px; y0 -= py; y1 += py;
    var X = function (v) { return ml + (v - x0) / (x1 - x0) * (W - ml - mr); }, Y = function (v) { return mt + (1 - (v - y0) / (y1 - y0)) * (H - mt - mb); };
    var g = "", sx = niceStep(x1 - x0, 6), sy = niceStep(y1 - y0, 5), v;
    for (v = Math.ceil(x0 / sx) * sx; v <= x1; v += sx) g += '<line class="gr" x1="' + X(v).toFixed(1) + '" x2="' + X(v).toFixed(1) + '" y1="' + mt + '" y2="' + (H - mb) + '"/><text class="ax" x="' + X(v).toFixed(1) + '" y="' + (H - mb + 16) + '" text-anchor="middle">' + fmt(+v.toFixed(2)) + "</text>";
    for (v = Math.ceil(y0 / sy) * sy; v <= y1; v += sy) g += '<line class="gr" x1="' + ml + '" x2="' + (W - mr) + '" y1="' + Y(v).toFixed(1) + '" y2="' + Y(v).toFixed(1) + '"/><text class="ax" x="' + (ml - 6) + '" y="' + (Y(v) + 4).toFixed(1) + '" text-anchor="end">' + fmt(+v.toFixed(2)) + "</text>";
    g += '<text class="ax-t" x="' + ((ml + W - mr) / 2) + '" y="' + (H - 8) + '" text-anchor="middle">' + esc(indName(ind(ix))) + '</text><text class="ax-t" transform="rotate(-90)" x="' + (-(mt + H - mb) / 2) + '" y="14" text-anchor="middle">' + esc(indName(ind(iy))) + "</text>";
    g += '<text class="sc-year" x="' + (W - mr - 8) + '" y="' + (H - mb - 14) + '" text-anchor="end">' + t + "</text>";
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
    cmp = { c: c, i: q.i || "life_exp", j: q.j || "gdp_pc_ppp", t: clampY(q.t, 1990), a: clampY(q.a, 1950), b: clampY(q.b, Y1), r: q.r ? clampY(q.r, 1991) : null, m: MODES.indexOf(q.m) > -1 ? q.m : "paises" };
    if (cmp.a > cmp.b) { var t = cmp.a; cmp.a = cmp.b; cmp.b = t; }
    if (cmp.m === "reforma" && !cmp.r) cmp.r = 1991;
    var h = hero({ active: "comparar", crumb: T.sub.comparar, kicker: T.title, title: esc(T.cmp_h), dek: T.cmp_dek });
    h += '<section class="sec sec--paper sec--tight"><div class="wrap"><div id="oqf-banner"></div><div class="tabs" role="tablist" aria-label="' + esc(T.cmp_h) + '">' +
      MODES.map(function (m) { return '<button class="tab" role="tab" data-oqf-mode="' + m + '" aria-selected="' + (m === cmp.m) + '">' + esc(modeLbl(m)) + "</button>"; }).join("") + "</div>" +
      '<div class="oqf-form" id="oqf-form"></div></div></section>' +
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
  /* países efetivamente desenhados: indicador sem comparabilidade internacional → só um país */
  function cmpCountries(I, I2) {
    var c = cmp.c.slice(), note = "";
    var only = function (X) { return X && X.only; };
    [I, I2].forEach(function (X) { if (only(X)) { var keep = c.filter(function (k) { return X.only.indexOf(k) > -1; }); if (keep.length < c.length) note = tf(T.c_only, { ind: indName(X) }); c = keep; } });
    if (c.length > 1 && ((I && !I.intl) || (I2 && !I2.intl))) { c = [c[0]]; note = tf(T.c_national, { c: T.countries[c[0]].name }); }
    return { c: c, note: note };
  }
  function drawForm() {
    var f = document.getElementById("oqf-form"); if (!f) return;
    var h = '<fieldset class="oqf-f"><legend>' + esc(T.c_countries) + '</legend><div class="oqf-picks">' + PILOTS.map(function (k) {
      return '<button type="button" class="pick oqf-pick" data-oqf-c="' + k + '" aria-pressed="' + (cmp.c.indexOf(k) > -1) + '" style="--c:' + COLOR[k] + '">' + flag(k) + esc(T.countries[k].name) + "</button>";
    }).join("") + "</div></fieldset>";
    if (cmp.m === "dispersao") {
      h += '<div class="oqf-f"><label for="oqf-j">' + esc(T.c_x) + '</label><select id="oqf-j" class="uf-select">' + indOpts(cmp.j) + "</select></div>" +
        '<div class="oqf-f"><label for="oqf-i">' + esc(T.c_y) + '</label><select id="oqf-i" class="uf-select">' + indOpts(cmp.i) + "</select></div>" +
        '<p class="small oqf-f-hint">' + esc(T.c_intl_hint) + "</p>";
    } else {
      h += '<div class="oqf-f"><label for="oqf-i">' + esc(T.c_ind) + '</label><select id="oqf-i" class="uf-select">' + indOpts(cmp.i) + '</select><p class="small oqf-f-hint">' + esc(T.c_intl_hint) + "</p></div>" +
        '<div class="oqf-f oqf-f-yrs"><label for="oqf-a">' + esc(T.c_from) + '</label><select id="oqf-a" class="uf-select">' + yearOpts(cmp.a) + '</select><label for="oqf-b">' + esc(T.c_to) + '</label><select id="oqf-b" class="uf-select">' + yearOpts(cmp.b) + "</select></div>";
    }
    if (cmp.m === "reforma") h += '<div class="oqf-f"><label for="oqf-r">' + esc(T.c_mark) + '</label><select id="oqf-r" class="uf-select">' + yearOpts(cmp.r) + '</select><p class="small">' + esc(T.c_mark_hint) + '</p><div class="oqf-presets"><span class="mono small">' + esc(T.c_presets) + "</span>" +
      T.presets.map(function (p) { return '<button type="button" class="btn btn--ghost btn--sm" data-oqf-preset="' + p[0] + "|" + p[1] + '">' + flag(p[0]) + p[1] + " · " + esc(p[2]) + "</button>"; }).join("") + "</div></div>";
    f.innerHTML = h;
  }
  function stopSc() { if (scTimer) { clearInterval(scTimer); scTimer = null; } var b = document.getElementById("oqf-scplay"); if (b) { b.textContent = "▶"; b.setAttribute("aria-pressed", "false"); } }
  function drawCompare() {
    var out = document.getElementById("oqf-cmp-out"); if (!out) return;
    setHash(link("comparar", "", qs({ c: cmp.c.join(","), i: cmp.i, j: cmp.m === "dispersao" ? cmp.j : "", t: cmp.m === "dispersao" ? cmp.t : "", a: cmp.m === "dispersao" ? "" : cmp.a, b: cmp.m === "dispersao" ? "" : cmp.b, m: cmp.m === "paises" ? "" : cmp.m, r: cmp.m === "reforma" ? cmp.r : "" })));
    var I = ind(cmp.i), ents = [], cc = cmpCountries(I, cmp.m === "dispersao" ? ind(cmp.j) : null);
    var notice = cc.note ? '<p class="oqf-notice" role="note">' + chip("nat") + " " + esc(cc.note) + "</p>" : "";
    if (!cc.c.length) { out.innerHTML = '<div class="oqf-chart-h"><h3>' + esc(indName(I)) + "</h3></div>" + notice + '<p class="oqf-empty">' + chip("prep") + " " + esc(T.no_data) + "</p>"; return; }
    cc.c.forEach(function (k) { ENTS[k].forEach(function (e) { ents.push({ ent: e, iso: k }); }); });
    if (cmp.m === "dispersao") {
      out.innerHTML = '<div class="oqf-chart-h"><h3>' + esc(indName(ind(cmp.j))) + " × " + esc(indName(I)) + "</h3></div>" + notice + legendHtml(ents.map(function (e) { return { ent: e.ent, iso: e.iso, pts: [1] }; })) +
        '<div class="oqf-chart-box" id="oqf-sc">' + scatter(ents, cmp.j, cmp.i, cmp.t, 1950) + "</div>" +
        '<div class="oqf-player oqf-player--dark"><button class="oqf-play" id="oqf-scplay" type="button" aria-pressed="false" aria-label="' + esc(T.play) + '">▶</button><div class="oqf-range"><label class="sr-only" for="oqf-t">' + esc(T.year) + '</label><input type="range" id="oqf-t" min="1950" max="' + Y1 + '" value="' + cmp.t + '"></div><output class="oqf-tv" id="oqf-tv">' + cmp.t + "</output></div>" +
        '<p class="oqf-causal">' + tagHtml("m", TAGTXT.m) + " " + esc(T.c_scatter_note) + "</p>" + metaBlock(I, ind(cmp.j), cc.c);
      return;
    }
    var list = [];
    cc.c.forEach(function (k) { list = list.concat(seriesFor(k, cmp.i, cmp.a, cmp.b)); });
    var h = '<div class="oqf-chart-h"><h3>' + esc(indName(I)) + '</h3><span class="mono small">' + cmp.a + "–" + cmp.b + " · " + esc(indUnit(I)) + "</span></div>" + notice + legendHtml(list) +
      '<div class="oqf-chart-box">' + chart(list, { a: cmp.a, b: cmp.b, mark: cmp.m === "reforma" ? cmp.r : null, label: indName(I), I: I });
    if (cmp.m === "governos" && L) {
      h += cc.c.map(function (k) { return '<div class="oqf-bandrow"><span>' + flag(k) + esc(T.countries[k].name) + "</span>" + govBand(k, cmp.a, cmp.b, { ml: 46 }) + "</div>"; }).join("");
    }
    h += "</div>";
    if (cmp.m === "reforma") h += '<p class="oqf-causal">' + tagHtml("m", TAGTXT.m) + " " + esc(T.c_causal) + "</p>";
    if (cmp.m === "governos") h += '<p class="oqf-causal">' + tagHtml("m", TAGTXT.m) + " " + esc(T.c_gov_note) + " " + esc(T.gov_colors) + "</p>";
    var years = [];
    if (cmp.m === "reforma") [-10, -5, 0, 5, 10].forEach(function (d) { var y = cmp.r + d; if (y >= cmp.a && y <= cmp.b) years.push(y); });
    else { var st = cmp.b - cmp.a > 40 ? 10 : 5; for (var y = Math.ceil(cmp.a / st) * st; y <= cmp.b; y += st) years.push(y); if (years[years.length - 1] !== cmp.b) years.push(cmp.b); }
    var cols = list.filter(function (s) { return s.pts.length; });
    if (cols.length) {
      h += '<details class="oqf-tbl" open><summary>' + esc(T.c_table) + '</summary><div class="ptable-wrap oqf-scroll"><table class="ptable oqf-table"><thead><tr><th>' + esc(T.c_year) + "</th>" + (cmp.m === "governos" ? cc.c.map(function (k) { return "<th>" + esc(tf(T.gov_in, { y: "" }).trim()) + " · " + esc(T.countries[k].name) + "</th>"; }).join("") : "") + cols.map(function (s) { return "<th>" + esc(T.ent_names[s.ent]) + "</th>"; }).join("") + "</tr></thead><tbody>" +
        years.map(function (y) {
          return "<tr" + (y === cmp.r && cmp.m === "reforma" ? ' class="is-mark"' : "") + "><td>" + y + "</td>" + (cmp.m === "governos" ? cc.c.map(function (k) { return '<td class="meta">' + (leadersIn(k, y).map(function (l) { return esc(lname(l)); }).join(", ") || "—") + "</td>"; }).join("") : "") + cols.map(function (s) {
            var p = null; s.pts.forEach(function (x) { if (x[0] === y) p = x; });
            return '<td class="num">' + (p ? fmtI(I, dv(I, p[1])) + ' <small class="oqf-tt-t t-' + p[2] + '" title="' + esc(T.types[p[2]] + " · " + T.cats[p[5]] + " · " + p[3] + " · " + p[4]) + '">' + esc(T.types[p[2]].split(" ")[0]) + " · " + p[3] + "/" + p[4] + "</small>" : "—") + "</td>";
          }).join("") + "</tr>";
        }).join("") + "</tbody></table></div></details>";
    }
    out.innerHTML = h + metaBlock(I, null, cc.c);
  }
  function legendHtml(list) {
    return '<div class="oqf-cleg">' + list.map(function (s) {
      return '<span><i style="border-color:' + COLOR[s.iso] + (DASH[s.ent] ? ";border-top-style:dashed" : "") + '"></i>' + esc(T.ent_names[s.ent]) + (s.pts.length ? "" : " — " + esc(T.no_data)) + "</span>";
    }).join("") + missingEnts(list) + (isDemo() ? '<span><i class="lg-r"></i>' + esc(T.types.r) + '</span><span><i class="lg-p"></i>' + esc(T.types.p) + "</span>" : "") + "</div>";
  }
  /* entidades-piloto sem série para o indicador: dizê-lo em vez de omitir */
  function missingEnts(list) {
    if (isDemo() || !cmp) return "";
    var have = {}; list.forEach(function (s) { have[s.ent] = 1; });
    var miss = []; cmpCountries(ind(cmp.i), cmp.m === "dispersao" ? ind(cmp.j) : null).c.forEach(function (k) { ENTS[k].forEach(function (e) { if (!have[e]) miss.push(T.ent_names[e] || e); }); });
    return miss.length ? '<span class="oqf-cleg-miss">' + esc(miss.join(", ")) + ": " + esc(T.no_data) + "</span>" : "";
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
  var termsState = null;
  function sgn(v, d) { var x = +v; return (x > 0 ? "+" : x < 0 ? "−" : "") + Math.abs(x).toLocaleString(LANG === "en" ? "en-US" : "pt-BR", { minimumFractionDigits: d, maximumFractionDigits: d }); }
  function nfmt(v, d) { return (+v).toLocaleString(LANG === "en" ? "en-US" : "pt-BR", { minimumFractionDigits: d, maximumFractionDigits: d }); }
  function termResult(r) {
    var u = LANG === "en" ? r.uen : r.u, d = 1;
    if (r.t === "nivel") return "<b>" + sgn(r["var"], d) + "% " + esc(T.t_py) + "</b>" + (r.acc ? ' <span class="small">(' + esc(T.t_acc) + " " + sgn(r.acc, d) + "%)</span>" : "");
    if (r.t === "taxa_composta") return "<b>" + nfmt(r["var"], d) + "% " + esc(T.t_py) + "</b>" + (r.acc ? ' <span class="small">(' + esc(T.t_acc) + " " + nfmt(r.acc, d) + "%)</span>" : "");
    if (r.t === "media") return "<b>" + nfmt(r.avg, d) + "</b> " + esc(u) + ' <span class="small">(' + esc(T.t_avg) + "; " + esc(T.t_diff) + " " + sgn(r["var"], d) + " p.p.)</span>";
    return "<b>" + sgn(r["var"], d) + " p.p.</b>" + ' <span class="small">(' + nfmt(r.v0, d) + " → " + nfmt(r.v1, d) + " " + esc(u) + ")</span>";
  }
  function altVal(r, v) { return r.t === "nivel" || r.t === "taxa_composta" ? nfmt(v, 1) + "% " + T.t_py : r.t === "media" ? sgn(v, 1) + " p.p." : sgn(v, 1) + " p.p."; }
  function winTxt(y0, y1) { return (+y0 + 1 === +y1 ? y1 : (+y0 + 1) + "–" + y1) + " (" + T.t_base + " " + y0 + ")"; }
  function altWinTxt(w) { var m = /^(\d{4})–(\d{4})$/.exec(w); return m ? winTxt(m[1], m[2]) : w; }
  function renderTerms(app, q) {
    var iso = PILOTS.indexOf((q.c || "").toUpperCase()) > -1 ? q.c.toUpperCase() : "BRA";
    termsState = { c: iso, i: q.i || "" };
    var h = hero({ active: "mandatos", crumb: SUBLBL("mandatos"), kicker: T.title, title: esc(T.terms_h), dek: T.terms_dek });
    h += '<section class="sec sec--paper sec--tight"><div class="wrap"><div id="oqf-banner"></div><div class="tabs" role="tablist" aria-label="' + esc(T.terms_h) + '">' + PILOTS.map(function (k) { return '<button class="tab" role="tab" data-oqf-tc="' + k + '" aria-selected="' + (k === iso) + '">' + flag(k) + " " + esc(T.countries[k].name) + "</button>"; }).join("") + "</div>" +
      '<ul class="oqf-guard oqf-terms-guard">' + T.terms_rules.map(function (g) { return "<li>" + tagHtml("m", TAGTXT.m) + "<span>" + esc(g) + "</span></li>"; }).join("") + "</ul>" +
      '<div class="oqf-f oqf-terms-f"><label for="oqf-ti">' + esc(T.c_ind) + '</label><select id="oqf-ti" class="uf-select"></select></div></div></section>' +
      '<section class="sec sec--dark2 sec--tight"><div class="wrap" id="oqf-terms-out"><div class="oqf-loading"></div></div></section>';
    app.innerHTML = h;
    withManifest(function () { var b = document.getElementById("oqf-banner"); if (b) b.innerHTML = banner(); });
    withTerms(function (ok) { drawTerms(ok); });
  }
  function drawTerms(ok) {
    var out = document.getElementById("oqf-terms-out"); if (!out) return;
    if (!ok) { out.innerHTML = errBox(); return; }
    var S = termsState, rows = [];
    ENTS[S.c].forEach(function (e) { rows = rows.concat(TERMS.rows[e] || []); });
    var inds = {}; rows.forEach(function (r) { inds[r.i] = LANG === "en" ? r.ien : r.ipt; });
    var sel = document.getElementById("oqf-ti");
    if (sel) sel.innerHTML = '<option value="">' + esc(T.terms_all) + "</option>" + Object.keys(inds).sort(function (a, b) { return inds[a].localeCompare(inds[b], LANG); }).map(function (k) { return '<option value="' + esc(k) + '"' + (k === S.i ? " selected" : "") + ">" + esc(inds[k]) + "</option>"; }).join("");
    if (S.i && !inds[S.i]) S.i = "";
    if (S.i) rows = rows.filter(function (r) { return r.i === S.i; });
    setHash(link("mandatos", "", qs({ c: S.c === "BRA" ? "" : S.c, i: S.i })));
    if (!rows.length) { out.innerHTML = '<p class="oqf-empty">' + chip("prep") + " " + esc(T.no_data) + "</p>"; return; }
    var groups = [], idx = {};
    rows.forEach(function (r) { if (idx[r.g] == null) { idx[r.g] = groups.length; groups.push({ g: r.g, n: r.n, a: r.a, b: r.b, rows: [] }); } groups[idx[r.g]].rows.push(r); });
    groups.sort(function (x, y) { return x.a < y.a ? -1 : x.a > y.a ? 1 : 0; });
    var nsens = rows.filter(function (r) { return !r.rob || r.mdiff === "sim"; }).length;
    var h = '<p class="mono small oqf-terms-sum">' + esc(tf(T.terms_sum, { n: rows.length, g: groups.length, s: nsens })) + "</p>";
    h += groups.map(function (G) {
      var b = /^\d{4}-\d{2}-\d{2}$/.test(G.b) ? dateTxt(G.b) : (LANG === "en" ? "in office (cut-off Oct. 12, 2026)" : "no cargo (corte 12/10/2026)");
      return '<article class="oqf-term"><header class="oqf-term-h"><h3>' + esc(G.n) + '</h3><span class="mono small">' + dateTxt(G.a) + " – " + esc(b) + ' · <code>' + esc(G.g) + "</code></span></header>" +
        '<div class="oqf-scroll"><table class="oqf-ttable"><thead><tr>' + T.terms_cols.map(function (c) { return "<th>" + esc(c) + "</th>"; }).join("") + "</tr></thead><tbody>" +
        G.rows.map(function (r) {
          var sens = !r.rob || r.mdiff === "sim";
          var det = '<details class="oqf-term-d"><summary>' + esc(T.terms_details) + "</summary><dl>" +
            "<dt>" + esc(T.t_rule) + "</dt><dd>" + esc(LANG === "en" ? r.rule_en : r.rule) + "</dd>" +
            (r.lim ? "<dt>" + esc(T.t_lim) + "</dt><dd>" + esc(LANG === "en" ? r.lim_en : r.lim) + "</dd>" : "") +
            "<dt>" + esc(T.t_adeq) + "</dt><dd>" + esc(T.adeq[r.ad] || r.ad) + " · " + esc(LANG === "en" ? r.adm_en : r.adm) + "</dd>" +
            (r.pre ? "<dt>" + esc(T.t_pre) + "</dt><dd>" + esc(LANG === "en" ? r.pre_en : r.pre) + "</dd>" : "") +
            (r.ctx ? "<dt>" + esc(T.t_ctx) + "</dt><dd>" + esc(LANG === "en" ? r.ctx_en : r.ctx) + "</dd>" : "") +
            "<dt>" + esc(T.t_alt) + "</dt><dd>" + (r.alt.length ? '<ul class="oqf-alt">' + r.alt.map(function (x) { return "<li><b>" + esc(T.win[x[0]] || x[0]) + "</b> · " + esc(x[0] === "M" ? x[1] : altWinTxt(x[1])) + ": " + esc(altVal(r, x[2])) + "</li>"; }).join("") + "</ul>" : "—") + "</dd>" +
            "<dt>" + esc(T.c_src) + "</dt><dd><code>" + esc(r.s) + "</code> · " + esc(TERMS.source) + "</dd></dl></details>";
          return "<tr><td><b>" + esc(LANG === "en" ? r.ien : r.ipt) + "</b></td><td class=\"mono small\">" + esc(winTxt(r.y0, r.y1)) + "</td><td>" + termResult(r) + "</td><td>" + chip(r.cat === "P" ? "ok" : "res") + (sens ? " " + chip("sens") : "") + "</td><td>" + det + "</td></tr>";
        }).join("") + "</tbody></table></div></article>";
    }).join("");
    h += '<p class="oqf-causal">' + tagHtml("m", TAGTXT.m) + " " + esc(T.terms_causal) + "</p>";
    out.innerHTML = h;
  }

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
    if ((el = t.closest("[data-oqf-tc]")) && termsState) { termsState.c = el.getAttribute("data-oqf-tc"); termsState.i = ""; [].forEach.call(document.querySelectorAll("[data-oqf-tc]"), function (b) { b.setAttribute("aria-selected", b === el); }); drawTerms(true); return; }
    if ((el = t.closest("[data-oqf-gc]"))) { [].forEach.call(document.querySelectorAll("[data-oqf-gc]"), function (b) { b.setAttribute("aria-selected", b === el); }); withLeaders(function (ok) { drawLeaders(el.getAttribute("data-oqf-gc"), ok); }); return; }
    if ((el = t.closest("[data-oqf-mode]")) && cmp) { stopSc(); cmp.m = el.getAttribute("data-oqf-mode"); if (cmp.m === "reforma" && !cmp.r) cmp.r = 1991; [].forEach.call(document.querySelectorAll("[data-oqf-mode]"), function (b) { b.setAttribute("aria-selected", b === el); }); drawForm(); drawCompare(); return; }
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
    if (id === "oqf-ti" && termsState) { termsState.i = e.target.value; drawTerms(true); return; }
    if (!cmp) return;
    if (id === "oqf-i") { cmp.i = e.target.value; drawCompare(); }
    else if (id === "oqf-j") { cmp.j = e.target.value; drawCompare(); }
    else if (id === "oqf-a" || id === "oqf-b") { cmp[id.slice(-1)] = +e.target.value; if (cmp.a > cmp.b) { var t = cmp.a; cmp.a = cmp.b; cmp.b = t; drawForm(); } drawCompare(); }
    else if (id === "oqf-r") { cmp.r = +e.target.value; drawCompare(); }
  });
  document.addEventListener("keydown", function (e) {
    var t = e.target;
    if ((e.key === "Enter" || e.key === " ") && t && t.getAttribute && mapState && (t.classList.contains("oqf-c") || t.hasAttribute("data-oqf-pick"))) { e.preventDefault(); selectCountry(t.getAttribute("data-iso") || t.getAttribute("data-oqf-pick")); }
  });

  /* ---------------------------------------------------------- ponto de entrada (chamado pelo roteador) */
  OQF.render = function (app, parts, q) {
    stopPlay(); stopSc(); mapState = null; cmp = null; termsState = null;
    var sub = parts[1] || "", arg = parts[2];
    if (sub === "mapa") renderMap(app, q);
    else if (sub === "governantes") renderLeaders(app, q);
    else if (sub === "perfil" && arg) renderProfile(app, arg.toUpperCase(), q);
    else if (sub === "perfil") renderProfiles(app);
    else if (sub === "comparar") renderCompare(app, q);
    else if (sub === "mandatos") renderTerms(app, q);
    else if (sub === "metodologia") renderMethod(app);
    else renderLanding(app);
  };
  OQF.label = T.nav;
})();
