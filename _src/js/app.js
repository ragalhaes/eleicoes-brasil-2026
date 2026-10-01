/* =========================================================
   ALÉM DA URNA — V3 · interface
   Roteamento por hash (funciona abrindo o arquivo direto no navegador).
   Todo conteúdo vem dos objetos EB.* incorporados neste mesmo arquivo.
   ========================================================= */
(function () {
  "use strict";
  var EB = window.EB;
  /* Base dos arquivos em /assets: "" na versão PT (/), "../" na versão EN (/en/). */
  var ASSET = EB.assetBase || "";
  var LANG = EB.lang || "pt";
  var app = document.getElementById("app");

  /* ---------------------------------------------------------- utilidades */
  function esc(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function md(s) { return esc(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>"); }
  function num(n) { return n == null ? "—" : String(n).replace(".", ","); }
  function fix(n, d) { return n == null ? "—" : n.toLocaleString("pt-BR", { minimumFractionDigits: d, maximumFractionDigits: d }); }
  function thousands(n) { return n == null ? "—" : n.toLocaleString("pt-BR"); }
  var MONTHS = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
  function dmy(iso) { if (!iso) return null; var p = iso.split("-"); return p[2] + "/" + p[1] + "/" + p[0]; }
  function field(a, b) { var A = a.split("-"), B = b.split("-"); var m = MONTHS[+B[1] - 1]; return (A[1] === B[1] ? +A[2] + "–" + +B[2] : +A[2] + " " + MONTHS[+A[1] - 1] + "–" + +B[2]) + " " + m; }
  function avatar(c, cls) {
    var ini = initials(c.name);
    if (!c.photo) return '<div class="mono-av' + (cls ? " " + cls : "") + '" aria-hidden="true">' + ini + "</div>";
    return '<div class="mono-av has-photo' + (cls ? " " + cls : "") + '" data-ini="' + esc(ini) + '"><img src="' + esc(ASSET + c.photo) + '" alt="Foto oficial de ' + esc(c.name) + ' (TSE)" width="161" height="225" loading="' + (cls === "av-rec" ? "lazy" : "eager") + '" decoding="async" onerror="this.parentNode.classList.remove(\'has-photo\');this.parentNode.textContent=this.parentNode.getAttribute(\'data-ini\')"></div>';
  }
  function initials(name) { var p = name.split(" "); return (p[0][0] + (p[1] ? p[p.length - 1][0] : p[0][1] || "")).toUpperCase(); }
  function byId(list, id) { for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i]; return null; }
  function cand(id) { return byId(EB.candidates, id); }
  function pend(t) { return '<span class="pend">' + esc(t || "Em atualização") + "</span>"; }
  var EMPTY = "Em atualização";

  /* ---------------------------------------------------------- componentes */
  function tag(key) {
    var L = EB.labels[key]; if (!L) return "";
    return '<span class="tag ' + L.fam + '" title="' + esc(L.desc) + '">' + esc(L.name) + "</span>";
  }
  function tags(keys) { return '<div class="tags">' + (keys || []).map(tag).join("") + "</div>"; }
  function statusRow(keys, legend) {
    return '<div class="status-row">' + (legend === false ? "" : '<span class="status-legend">Situação</span>') +
      keys.map(function (k) { var s = EB.status[k]; return s ? '<span class="status ' + s.tone + '">' + esc(s.name) + "</span>" : ""; }).join("") + "</div>";
  }
  function src(s) {
    if (!s) return "";
    var rows = [["Fonte", s.o], ["Referência", s.r], ["Período", s.p], ["Nota", s.n]].filter(function (x) { return x[1]; });
    return '<details class="src"><summary>Ver fonte</summary><dl>' +
      rows.map(function (x) { return "<dt>" + x[0] + "</dt><dd>" + esc(x[1]) + "</dd>"; }).join("") +
      (s.url ? '<dt>Link</dt><dd><a href="' + esc(s.url) + '" target="_blank" rel="noopener noreferrer">' + esc(s.url.replace(/^https?:\/\//, "")) + " ↗</a></dd>" : "") +
      "</dl></details>";
  }
  function statCard(s, file) {
    return '<div class="stat"><div class="stat-top"><span class="stat-k">' + esc(s.k) + "</span>" + (s.l ? tag(s.l) : "") + "</div>" +
      '<div class="stat-v">' + esc(s.v) + (s.u ? "<small>" + esc(s.u) + "</small>" : "") + "</div>" +
      (s.d ? '<div class="stat-d">' + md(s.d) + "</div>" : "") + src(s.src, file) + "</div>";
  }
  function stats(list, file, cls) { return '<div class="stats ' + (cls || (list.length >= 3 ? "stats--3" : "")) + '">' + list.map(function (s) { return statCard(s, file); }).join("") + "</div>"; }

  function barsBlock(b, file) {
    var max = 0; b.rows.forEach(function (r) { max = Math.max(max, Math.abs(r.v)); });
    var html = '<div class="bars grow reveal">' + '<div class="bars-title"><span>' + esc(b.title || "") + " " + (b.unit ? "(" + esc(b.unit) + ")" : "") + "</span>" + (b.l ? tag(b.l) : "") + "</div>";
    b.rows.forEach(function (r) {
      var w, cls = "";
      if (b.signed) { w = (Math.abs(r.v) / max * 50) + "%"; cls = r.v < 0 ? "neg" : ""; }
      else w = (r.v / (max * 1.08) * 100) + "%";
      html += '<div class="bar-row"><span class="n">' + esc(r.n) + (r.s ? "<small>" + esc(r.s) + "</small>" : "") + "</span>" +
        '<span class="track' + (b.signed ? " signed" : "") + '"><i class="' + cls + '" style="--w:' + w + '"></i></span>' +
        '<span class="v">' + (b.signed && r.v > 0 ? "+" : "") + num(r.v) + "</span></div>";
    });
    return html + src(b.src, file) + "</div>";
  }

  function block(b, file) {
    if (b.p != null) {
      if (!b.l) return "<p>" + md(b.p) + "</p>" + src(b.src, file);
      var L = EB.labels[b.l];
      return '<div class="lp ' + L.fam + '">' + tag(b.l) + '<div class="lp-t"><p>' + md(b.p) + "</p>" + src(b.src, file) + "</div></div>";
    }
    if (b.ul) {
      var fam = b.l ? EB.labels[b.l].fam : "c";
      var tagn = b.ol ? "ol" : "ul";
      return '<div class="blk ' + fam + '">' + (b.l ? tag(b.l) : "") + (b.title ? '<h4 class="blk-title">' + esc(b.title) + "</h4>" : "") +
        "<" + tagn + ">" + b.ul.map(function (x) { return "<li>" + md(x) + "</li>"; }).join("") + "</" + tagn + ">" + src(b.src, file) + "</div>";
    }
    if (b.box) {
      var x = b.box, f = EB.labels[x.l].fam;
      return '<div class="blk ' + f + '">' + tag(x.l) + (x.title ? '<h4 class="blk-title">' + esc(x.title) + "</h4>" : "") +
        (x.p ? x.p.map(function (t) { return "<p>" + md(t) + "</p>"; }).join("") : "") +
        (x.ul ? "<ul>" + x.ul.map(function (t) { return "<li>" + md(t) + "</li>"; }).join("") + "</ul>" : "") + "</div>";
    }
    if (b.stats) return stats(b.stats, file);
    if (b.bars) return barsBlock(b.bars, file);
    if (b.seq) return '<div class="blk ' + EB.labels[b.l].fam + '">' + tag(b.l) + (b.title ? '<h4 class="blk-title">' + esc(b.title) + "</h4>" : "") +
      '<div class="seq">' + b.seq.map(function (s) { return "<span>" + esc(s) + "</span>"; }).join("<b>→</b>") + "</div></div>";
    if (b.cards) return '<div class="bars-title" style="margin-top:18px"><span></span>' + tag(b.l) + '</div><div class="cards">' + b.cards.map(function (c) {
      return '<div class="card"><h4>' + esc(c.t) + '</h4><span class="k">' + esc(c.k) + "</span><p>" + md(c.d) + "</p></div>"; }).join("") + "</div>" + src(b.src, file);
    if (b.myths) return '<div class="myths">' + b.myths.map(function (m) { return '<div class="myth"><q>' + esc(m.m) + "</q><b>" + esc(m.v) + "</b></div>"; }).join("") + "</div>";
    if (b.timeline) { var t = b.timeline; return '<div class="bars-title" style="margin-top:18px"><span></span>' + tag(t.l) + '</div><ol class="tl">' + t.rows.map(function (r) { return "<li><time>" + esc(r.d) + "</time>" + md(r.t) + "</li>"; }).join("") + "</ol>" + src(t.src, file); }
    if (b.versus) return '<div class="versus">' + b.versus.map(function (v) { return '<div class="blk ' + EB.labels[v.l].fam + '">' + tag(v.l) + '<h4 class="blk-title">' + esc(v.who) + "</h4><p>" + md(v.t) + "</p></div>"; }).join("") + "</div>";
    if (b.matrix) return '<div class="matrix">' + b.matrix.map(function (m) {
      var cols = [['jud', "Maioria", m.maj], ['jud', "Luiz Fux (divergência)", m.fux]];
      if (m.def) cols.unshift(['alg', "Defesa", m.def]);
      return '<div class="mx"><h4>' + esc(m.t) + '</h4><div class="mx-cols" style="--cols:' + cols.length + '">' + cols.map(function (c) {
        return "<div>" + tag(c[0]) + '<div class="mono small" style="opacity:.7;margin-bottom:4px">' + esc(c[1]) + "</div>" + (c[2] === "—" ? '<span class="empty">' + EMPTY + "</span>" : md(c[2])) + "</div>"; }).join("") + "</div></div>"; }).join("") + "</div>";
    if (b.kv) { var k = b.kv; return '<div class="kv"><h4>' + esc(k.title) + "</h4>" + k.rows.map(function (r) { return "<div><span>" + esc(r[0]) + "</span><b>" + esc(r[1]) + "</b></div>"; }).join("") + '</div><div class="tags">' + tag(k.l) + "</div>" + src(k.src, file); }
    if (b.status) return statusRow(b.status);
    if (b.ledger) { var g = b.ledger; return '<div class="bars-title" style="margin-top:18px"><span></span>' + tag(g.l) + '</div><div class="ledger"><div class="plus"><h4>' + esc(g.plusTitle) + "</h4><ul>" + g.plus.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + '</ul></div><div class="minus"><h4>' + esc(g.minusTitle) + "</h4><ul>" + g.minus.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul></div></div>"; }
    if (b.senate) { var s = "", i; for (i = 0; i < b.senate.total; i++) s += "<i" + (i >= b.senate.open ? ' class="keep"' : "") + "></i>"; return '<div class="senate" aria-label="54 de 81 cadeiras em disputa">' + s + '</div><div class="senate-leg"><span><i></i>54 em disputa em 2026</span><span><i class="keep"></i>27 eleitas em 2022 (até 2031)</span></div>'; }
    if (b.thresholds) return '<div class="thresh">' + b.thresholds.map(function (t) { return "<div><b>" + esc(t.n) + "</b><span>" + esc(t.t) + "</span><p>" + esc(t.d) + "</p></div>"; }).join("") + '</div><div class="tags">' + tag(b.l) + "</div>";
    if (b.method) return '<div class="method">' + b.method.map(function (m) { return '<a href="' + m.href + '"><b>' + esc(m.k) + "</b>" + esc(m.t) + "</a>"; }).join("") + "</div>";
    return "";
  }
  function blocks(list, file) { return (list || []).map(function (b) { return block(b, file); }).join(""); }

  function verdict(v) {
    var seats = v.yes.map(function () { return "<span></span>"; }).join("") + v.no.map(function () { return '<span class="no"></span>'; }).join("");
    return '<div class="verdict"><div><div class="score">' + esc(v.score) + '</div><div class="seats" aria-hidden="true">' + seats + '</div><div class="mono small" style="color:var(--t-light-2)">' + esc(v.title) + '</div></div>' +
      '<div><div class="tags" style="margin-bottom:12px">' + tag("jud") + '</div><div class="verdict-names"><b>' + esc(v.yesLabel) + "</b>" + esc(v.yes.join(" · ")) + "<b style=\"margin-top:10px\">" + esc(v.noLabel) + "</b>" + esc(v.no.join(" · ")) + "</div>" + src(v.src) + "</div></div>";
  }

  function layersNav(active) {
    return '<div class="layers">' + EB.layers.map(function (l, i) {
      return '<a href="' + l.href + '" class="' + (l.id === active ? "on" : "") + '"><small>Camada ' + (i + 1) + "</small><b>" + esc(l.k) + "</b><span>" + esc(l.q) + "</span></a>"; }).join("") + "</div>";
  }

  function pageHero(o) {
    return '<section class="page-hero' + (o.alt ? " alt" : "") + '"><div class="wrap">' +
      '<nav class="crumbs" aria-label="Você está em"><a href="#/">Início</a>' + (o.crumbs || []).map(function (c) { return "<span>" + (c[1] ? '<a href="' + c[1] + '">' + esc(c[0]) + "</a>" : esc(c[0])) + "</span>"; }).join("") + "</nav>" +
      '<div class="page-hero-grid">' + (o.num ? '<div class="big-num">' + esc(o.num) + "</div>" : "") +
      "<div>" + (o.kicker ? '<div class="page-kicker">' + esc(o.kicker) + "</div>" : "") + '<h1 class="page-title">' + o.title + "</h1>" +
      (o.dek ? '<p class="page-dek">' + md(o.dek) + "</p>" : "") + (o.after || "") + "</div></div>" + (o.below || "") + "</div></section>";
  }

  /* ---------------------------------------------------------- HOME */
  function daysTo(iso) { var d = new Date(iso + "T12:00:00-03:00") - new Date(); return Math.ceil(d / 86400000); }

  function homeChapter(ch, i) {
    var dark = i % 2 === 1;
    var body = ch.home.map(function (b) { return block(b, ch.file); }).join("");
    var side = stats(ch.stats, ch.file, "x");
    if (ch.vote) side = verdict(ch.vote) + side;
    return '<section class="sec ' + (dark ? "sec--dark2" : "sec--paper") + (ch.alt ? " alt-band" : "") + '" id="h-' + ch.id + '"><div class="wrap"><div class="chap">' +
      '<div class="reveal"><div class="chap-head"><div class="chap-num"><b>' + ch.num + "</b><span>" + esc(ch.years) + '</span></div><div class="chap-kicker">' + esc(ch.kicker) + "</div><h2>" + esc(ch.title) + '</h2><div class="chap-labels">' + tags(ch.labels) + "</div></div>" +
      '<div class="chap-body">' + body + '</div><a class="btn-more" href="#/historia/' + ch.id + '"><i>+</i>Entenda</a></div>' +
      '<aside class="chap-side reveal">' + side + "</aside></div></div></section>";
  }

  function avg(key, pick) {
    var list = EB.polls.filter(function (p) { return p.latest && pick(p) != null; });
    var sum = 0; list.forEach(function (p) { sum += pick(p); });
    return list.length ? sum / list.length : null;
  }
  function avg1(cid) { return avg(cid, function (p) { return p.r1 ? p.r1[cid] : null; }); }

  function renderHome() {
    var chs = EB.chapters.filter(function (c) { return !c.isStakes; });
    var stakes = byId(EB.chapters, "por-que-2026-importa");
    var d = daysTo(EB.site.election_date);
    var M = EB.pollsMeta;
    var avgRows = M.candidates_1t.map(function (c) { return { c: c, v: avg1(c) }; }).sort(function (a, b) { return b.v - a.v; });
    var maxA = avgRows[0].v;
    var mk = EB.markets[0];

    var h = "";
    /* 1. Hero */
    h += '<section class="hero"><div class="wrap">' +
      '<div class="hero-meta"><span><b>●</b> Reportagem especial</span><span>Muito além das eleições</span><span>Atualizado em ' + dmy(EB.site.last_updated) + "</span><span>Eleição · 4 de outubro de 2026</span></div>" +
      '<div class="hero-grid"><div><h1>Além da<br><span class="y">Urna</span></h1>' +
      '<p class="hero-sub">' + esc(EB.site.subtitle) + "</p>" +
      (d > 0 ? '<div class="hero-date"><b>' + d + "</b> " + (d === 1 ? "dia" : "dias") + " para o 1º turno</div>" : "") +
      '<div class="hero-cta"><a href="#h-' + chs[0].id + '" class="btn btn--solid" data-scroll>Como o Brasil chegou aqui <span class="arr">↓</span></a>' +
      '<a href="#/candidatos" class="btn btn--ghost">Candidatos</a><a href="#/pesquisas" class="btn btn--ghost">Pesquisas</a><a href="#/estados" class="btn btn--ghost">Estados</a></div></div>' +
      '<nav class="hero-index" aria-label="Índice da Home">' +
      chs.map(function (c) { return '<a href="#h-' + c.id + '" data-scroll><span>' + c.num + "</span><b>" + esc(c.kicker) + "</b><span>" + esc(c.years) + "</span></a>"; }).join("") +
      '<a href="#h-em-jogo" data-scroll><span>07</span><b>Por que 2026 importa</b><span>STF</span></a>' +
      '<a href="#h-candidatos" data-scroll><span>08</span><b>Candidatos</b><span>' + EB.candidates.length + "</span></a>" +
      '<a href="#h-pesquisas" data-scroll><span>09</span><b>Pesquisas, mercados e ÍRIS</b><span>3 camadas</span></a>' +
      '<a href="#h-estados" data-scroll><span>10</span><b>Estados</b><span>27</span></a></nav></div>' +
      '<div class="legend"><span class="legend-label">Como ler este site</span>' + ["fato", "dado", "jud", "alg", "ctx", "ana", "ed", "met"].map(tag).join("") + '<a href="#/fontes#rotulos">Entenda os rótulos →</a></div>' +
      "</div></section>";

    /* 2–7. Capítulos históricos */
    chs.forEach(function (c, i) { h += homeChapter(c, i); });

    /* 8. Por que 2026 importa */
    h += '<section class="sec sec--paper" id="h-em-jogo"><div class="wrap"><div class="sec-head reveal"><div class="chap-num"><b>' + stakes.num + "</b><span>2026</span></div>" +
      '<div class="chap-kicker">' + esc(stakes.kicker) + '</div><h2 class="h-sec">' + esc(stakes.title) + '</h2><div class="chap-labels">' + tags(stakes.labels) + "</div></div>" +
      '<div class="stakes-nums reveal">' + stakes.stats.map(function (s) { return "<div><b>" + esc(s.v) + "<small>" + esc(s.u) + "</small></b><span>" + esc(s.k) + "</span><p>" + esc(s.d) + "</p>" + src(s.src, stakes.file) + "</div>"; }).join("") + "</div>" +
      '<div class="chap-body reveal" style="max-width:760px;margin-top:32px">' + stakes.home.map(function (b) { return block(b, stakes.file); }).join("") + '</div><a class="btn-more" href="#/em-jogo"><i>+</i>Entenda</a></div></section>';

    /* 9. Candidatos */
    h += '<section class="sec sec--dark" id="h-candidatos"><div class="wrap"><div class="sec-head reveal"><div class="eyebrow">08 · Candidatos à Presidência</div><h2 class="h-sec">Quem está disputando</h2>' +
      '<p class="dek">A mesma régua factual para todos: formação, experiência, economia, segurança, instituições, controvérsias e propostas. Sem notas, ranking ou vencedor.</p></div>' +
      '<div class="home-cands reveal">' + EB.candidates.map(function (c) { return '<a href="#/candidatos/' + c.id + '">' + esc(c.name) + " <small>" + esc(c.party) + " " + esc(c.number) + "</small></a>"; }).join("") + "</div>" +
      '<p class="meta-note">' + esc(EB.candidatesMeta.order_note) + " " + esc(EB.candidatesMeta.source_note) + "</p>" +
      '<div class="hero-cta" style="margin-top:28px"><a class="btn btn--solid" href="#/candidatos">Ver perfis <span class="arr">→</span></a><a class="btn btn--ghost" href="#/comparar">Comparar 2 a 4 candidatos</a></div></div></section>';

    /* 10–11. Pesquisas, mercados, ÍRIS */
    h += '<section class="sec sec--dark2" id="h-pesquisas"><div class="wrap"><div class="sec-head reveal"><div class="eyebrow">09 · Pesquisas, mercados e modelo</div><h2 class="h-sec">Como a disputa está agora</h2>' +
      '<p class="dek">Três grandezas diferentes, que nunca se fundem numa única porcentagem.</p>' + layersNav("") + "</div>" +
      '<div class="split"><div class="panel reveal grow"><div class="panel-top"><h3>Média descritiva · 1º turno</h3><span class="upd">' + EB.polls.filter(function (p) { return p.latest; }).length + " institutos · " + dmy(M.last_updated) + "</span></div>" +
      avgRows.map(function (r) { return '<div class="avg-row"><span class="nm">' + esc(cand(r.c).name) + '</span><span class="pc">' + fix(r.v, 2) + '%</span><span class="track"><i style="--w:' + (r.v / maxA * 100) + '%"></i></span></div>'; }).join("") +
      '<div class="mandatory">' + esc(M.legend_avg) + '</div><a class="btn btn--ghost btn--sm" href="#/pesquisas">Todas as pesquisas →</a></div>' +
      '<div class="reveal"><div class="mkt" style="margin-bottom:16px"><div class="mkt-flag">Mercado de previsão · ' + dmy(EB.marketsMeta.captured_at) + "</div><h3>" + esc(mk.title) + "</h3>" +
      '<p class="q">' + esc(EB.marketsMeta.legend) + "</p>" + mk.platforms.map(platBlock).join("") + '<a class="btn btn--ghost btn--sm" href="#/mercados" style="margin-top:12px;color:var(--t-light)">Mercados →</a></div>' +
      '<div class="iris-card"><div class="iris-head"><b>' + esc(EB.iris.name) + '</b><span class="upd">' + (EB.iris.model_updated_at ? "Atualizado em " + dmy(EB.iris.model_updated_at) : "Em atualização") + '</span></div><div style="padding:16px 20px"><p class="small" style="color:var(--t-light-2)">' + esc(EB.iris.legend) + '</p><a class="btn btn--ghost btn--sm" href="#/iris" style="margin-top:12px;color:var(--t-light)">Modelo ÍRIS →</a></div></div></div></div></div></section>';

    /* 12. Estados */
    h += '<section class="sec sec--paper" id="h-estados"><div class="wrap"><div class="split"><div class="reveal"><div class="eyebrow">10 · Estados</div><h2 class="h-sec">Indicações por estado</h2>' +
      '<p class="dek">Governador, duas vagas ao Senado, deputados federais e estaduais. Área separada do comparador factual.</p>' +
      '<div class="recs-banner" style="margin-top:24px"><b>Indicação pessoal</b><p>' + esc(EB.recsMeta.disclaimer) + "</p></div>" +
      '<a class="btn btn--solid" href="#/estados" style="color:var(--ink)">Escolha seu estado <span class="arr">→</span></a></div>' +
      '<div class="reveal">' + brMap(null, true) + "</div></div></div></section>";

    app.innerHTML = h;
  }

  function platBlock(pl) {
    var P = EB.marketsMeta.platforms[pl.platform];
    return '<div class="plat"><div class="plat-head"><b>' + esc(P.name) + '</b><a href="' + esc(pl.source_url) + '" target="_blank" rel="noopener noreferrer">' + esc(P.url.replace("https://", "").replace(/\/$/, "")) + " ↗</a></div>" +
      '<div class="grow">' + pl.outcomes.map(function (o) {
        return '<div class="bar-row"><span class="n">' + esc(o.outcome) + '</span><span class="track"><i class="' + (o.value == null ? "tiny" : "") + '" style="--w:' + (o.value == null ? 0 : o.value) + '%"></i></span><span class="v">' + esc(o.display) + "</span></div>"; }).join("") + "</div>" +
      '<div class="plat-meta">Captura: ' + dmy(pl.timestamp) + (EB.marketsMeta.captured_time ? " " + esc(EB.marketsMeta.captured_time) : "") + (pl.volume ? " · Volume: " + esc(pl.volume) : "") + "</div></div>";
  }

  /* ---------------------------------------------------------- HISTÓRIA */
  function renderHistoryIndex() {
    var h = pageHero({ crumbs: [["História"]], kicker: "Como o Brasil chegou a 2026", title: "História",
      dek: "Brasil pré-Bolsonaro → ruptura eleitoral de 2018 → governo Bolsonaro → pandemia → STF/TSE e 2022 → processo criminal → retorno de Lula → eleição de 2026." });
    h += '<section class="sec sec--paper sec--tight"><div class="wrap"><div class="chap-index">' + EB.chapters.map(function (c) {
      return '<a href="' + (c.isStakes ? "#/em-jogo" : "#/historia/" + c.id) + '"><span class="n">' + c.num + "</span><div><small>" + esc(c.kicker) + " · " + esc(c.years) + "</small><h3>" + esc(c.title) + '</h3></div><span class="go">Ler →</span></a>'; }).join("") + "</div></div></section>";
    app.innerHTML = h;
  }

  function renderChapter(id) {
    var ch = byId(EB.chapters, id); if (!ch) return render404();
    var idx = EB.chapters.indexOf(ch), prev = EB.chapters[idx - 1], next = EB.chapters[idx + 1];
    var link = function (c) { return c.isStakes ? "#/em-jogo" : "#/historia/" + c.id; };
    var h = pageHero({ alt: ch.alt, crumbs: ch.isStakes ? [["Em jogo"]] : [["História", "#/historia"], [ch.kicker]], num: ch.num, kicker: ch.kicker + " · " + ch.years, title: esc(ch.title),
      after: '<div style="margin-top:20px">' + tags(ch.labels) + "</div>" });
    var toc = ch.sections.map(function (s, i) { return '<li><a href="#/' + currentPath() + "#s-" + i + '" data-toc="s-' + i + '">' + esc(s.h) + "</a></li>"; }).join("");
    h += '<div class="reader sheet"><div class="wrap"><div class="reader-grid">' +
      '<aside class="toc"><details><summary>Neste capítulo</summary><ol>' + toc + '</ol></details><div class="toc-labels"><div class="eyebrow">Rótulos</div>' + tags(Object.keys(EB.labels)) + '<p class="small" style="margin-top:10px"><a href="#/fontes#rotulos">O que significa cada um →</a></p></div></aside>' +
      '<article class="article">' +
      '<div class="summary-box"><div class="eyebrow">Resumo</div><div class="article-summary">' + blocks(ch.home, ch.file) + "</div></div>" +
      (ch.vote ? verdict(ch.vote) : "") + stats(ch.stats, ch.file) +
      ch.sections.map(function (s, i) { return '<section class="article-sec" id="s-' + i + '"><h2>' + esc(s.h) + "</h2>" + blocks(s.b, ch.file) + "</section>"; }).join("") +
      '<section class="article-sec" id="fontes-cap"><h2>Fontes principais</h2><ul class="src-list">' + ch.sources.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + '</ul></section>' +
      '<nav class="chapter-nav">' + (prev ? '<a href="' + link(prev) + '"><small>← Anterior · ' + prev.num + "</small><b>" + esc(prev.kicker) + "</b></a>" : "<span></span>") +
      (next ? '<a class="next" href="' + link(next) + '"><small>Próximo · ' + next.num + " →</small><b>" + esc(next.kicker) + "</b></a>" : '<a class="next" href="#/candidatos"><small>Próximo →</small><b>Candidatos</b></a>') + "</nav>" +
      "</article></div></div></div>";
    app.innerHTML = h;
  }

  /* ---------------------------------------------------------- CANDIDATOS */
  var selected = [];
  function renderCandidates() {
    var h = pageHero({ crumbs: [["Candidatos"]], kicker: "Presidência · 2026", title: "Candidatos",
      dek: "Cards resumidos e perfil completo, com a mesma régua para todos. Controvérsia não é condenação: cada caso mostra a situação atual com o mesmo destaque da acusação original." });
    h += '<section class="sec sec--dark sec--tight"><div class="wrap"><div class="cands">' + EB.candidates.map(function (c) {
      var on = selected.indexOf(c.id) > -1;
      return '<article class="cand reveal"><div class="cand-top">' + avatar(c) + "<div><h3>" + esc(c.name) + '</h3><div class="party">' + esc(c.party) + '</div></div><div class="num">' + esc(c.number) + "</div></div>" +
        '<div class="cand-body"><span class="k">' + (c.trajetoria ? "Trajetória" : "Propostas") + "</span>" + md(c.trajetoria || c.summary) + "</div>" +
        '<div class="cand-actions"><a class="btn btn--ghost" href="#/candidatos/' + c.id + '">Perfil</a><button class="btn btn--ghost' + (on ? " on" : "") + '" data-toggle-cmp="' + c.id + '" aria-pressed="' + on + '">' + (on ? "✓ No comparador" : "+ Comparar") + "</button></div></article>"; }).join("") + "</div>" +
      '<p class="meta-note">' + esc(EB.candidatesMeta.order_note) + "<br>" + esc(EB.candidatesMeta.source_note) + " Última atualização: " + dmy(EB.candidatesMeta.last_updated) + ".<br>" + esc(EB.candidatesMeta.editorial_note) + "<br>" + esc(EB.candidatesMeta.photo_note) + "</p>" +
      '<div id="cmp-bar"></div></div></section>';
    h += '<section class="sec sec--paper sec--tight"><div class="wrap wrap--narrow"><div class="eyebrow">Controvérsia não é condenação</div><h2 class="h-sub" style="margin-bottom:16px">Como lemos a situação jurídica</h2>' +
      "<p>O site diferencia visualmente cada etapa. O desfecho recebe o mesmo destaque que a acusação original.</p>" +
      statusRow(["investigacao", "denuncia", "reu", "condenacao", "definitiva"], false) + statusRow(["arquivado", "anulado", "absolvido"], false) + statusRow(["civel", "sem_imputacao", "reportagem", "sem_decisao"], false) + statusRow(["liminar", "acao", "multa", "transitado"], false) + "</div></section>";
    app.innerHTML = h; updateCmpBar();
  }
  function updateCmpBar() {
    var el = document.getElementById("cmp-bar"); if (!el) return;
    el.innerHTML = selected.length ? '<div class="hero-cta" style="margin-top:22px"><a class="btn btn--solid" href="#/comparar?c=' + selected.join(",") + '">Comparar ' + selected.length + " selecionado" + (selected.length > 1 ? "s" : "") + ' <span class="arr">→</span></a></div>' : "";
  }

  function pfRow(title, content) { return '<div class="pf-row"><h3>' + esc(title) + "</h3><div>" + content + "</div></div>"; }
  function pfText(t) {
    if (!t || (Array.isArray(t) && !t.length)) return '<p class="empty">' + EMPTY + "</p>";
    if (!Array.isArray(t)) return "<p>" + md(t) + "</p>";
    return '<div class="pf-items">' + t.map(function (x) { return '<div class="pf-item">' + tag(x.l) + "<p>" + md(x.t) + "</p></div>"; }).join("") + "</div>";
  }
  function pfSources(c) {
    var list = c.sources || [];
    var items = list.map(function (s) { return "<li>" + (s.url ? '<a href="' + esc(s.url) + '" target="_blank" rel="noopener noreferrer">' + esc(s.t) + " ↗</a>" : esc(s.t)) + "</li>"; }).join("");
    return '<ul class="src-list">' + items + '</ul><p class="meta-note">Atualizado em ' + dmy(c.last_updated) + ".</p>";
  }

  function renderProfile(id) {
    var c = cand(id); if (!c) return render404();
    var P = c.profile || {}, i = EB.candidates.indexOf(c), prev = EB.candidates[i - 1], next = EB.candidates[i + 1];
    var h = pageHero({ crumbs: [["Candidatos", "#/candidatos"], [c.name]], title: "",
      below: "" });
    h = h.replace('<h1 class="page-title"></h1>', "");
    h = h.replace('<div class="page-hero-grid"><div></div></div>', '<div class="profile-hero">' + avatar(c) + '<div><div class="page-kicker">' + esc(c.party) + " · " + esc(c.number) + '</div><h1 class="page-title">' + esc(c.name) + '</h1></div><div class="ballot" aria-hidden="true">' + esc(c.number) + "</div></div>");
    var controv = c.controversias.length ? c.controversias.map(function (x) {
      return '<div class="case">' + tag(x.l) + "<h4>" + esc(x.t) + "</h4><p>" + md(x.d) + "</p>" + statusRow(x.status) + (x.note ? '<p class="note">' + esc(x.note) + "</p>" : "") + src(x.src) + (x.chapter ? '<a class="more" href="#/historia/' + x.chapter + '">Contexto no capítulo →</a>' : "") + "</div>"; }).join("")
      : '<p class="empty">Em atualização</p>';
    var body = [
      pfRow("Trajetória", pfText(c.trajetoria)),
      pfRow("Formação", pfText(P.formacao)),
      pfRow("Experiência privada", pfText(P.privada)),
      pfRow("Experiência pública", pfText(P.publica)),
      pfRow("Resultados", pfText(P.resultados) + (P.resultadosLink ? '<a class="btn btn--ghost btn--sm" href="' + P.resultadosLink + '">Resultados 2023–2026 →</a>' : "")),
      pfRow("Economia", pfText(P.economia)),
      pfRow("Segurança", pfText(P.seguranca)),
      pfRow("Instituições e STF", pfText(P.instituicoes)),
      pfRow("Agenda social", pfText(P.social)),
      pfRow("Saúde", pfText(P.saude)),
      pfRow("Controvérsias e situação jurídica", controv),
      pfRow("Propostas-chave", c.propostas && c.propostas.length ? '<div class="chips">' + c.propostas.map(function (p) { return '<span class="chip">' + esc(p) + "</span>"; }).join("") + "</div>" : '<p class="empty">' + EMPTY + "</p>"),
      c.observar ? pfRow("O que observar", '<div class="blk m">' + tag("met") + "<p>" + esc(c.observar) + "</p></div>") : "",
      pfRow("Fontes", pfSources(c))
    ].join("");
    h += '<div class="reader sheet"><div class="wrap wrap--narrow" style="padding-top:36px;padding-bottom:72px">' +
      '<div class="profile-legend">Perfil com a mesma régua aplicada a todos os candidatos. Cada item indica se é fato, dado, proposta de campanha ou nota metodológica; “Não se aplica” explica por que um campo não tem conteúdo. ' + esc(EB.candidatesMeta.source_note) + "</div>" +
      '<div class="pf-grid">' + body + "</div>" +
      '<div class="hero-cta" style="margin-top:32px"><a class="btn btn--solid" href="#/comparar?c=' + c.id + '" style="color:var(--ink)">Comparar com outros <span class="arr">→</span></a><a class="btn btn--ghost" href="#/candidatos">Todos os candidatos</a></div>' +
      '<nav class="chapter-nav">' + (prev ? '<a href="#/candidatos/' + prev.id + '"><small>← Anterior</small><b>' + esc(prev.name) + "</b></a>" : "<span></span>") + (next ? '<a class="next" href="#/candidatos/' + next.id + '"><small>Próximo →</small><b>' + esc(next.name) + "</b></a>" : "") + "</nav>" +
      "</div></div>";
    app.innerHTML = h;
  }

  /* ---------------------------------------------------------- COMPARAR */
  var cmpDim = "todas";
  function renderCompare(q) {
    if (q.c != null) selected = q.c.split(",").filter(function (x) { return cand(x); }).slice(0, 4);
    if (q.d) cmpDim = q.d;
    var h = pageHero({ crumbs: [["Comparar"]], kicker: "Comparador factual", title: "Comparar",
      dek: "Escolha de 2 a 4 candidatos. Comparação por decisões concretas, lado a lado — sem nota, ranking ou vencedor." });
    h += '<section class="sec sec--paper sec--tight"><div class="wrap">' +
      '<div class="eyebrow">1 · Escolha os candidatos</div><div class="picker" id="picker"></div><div class="picker-status" id="picker-status"></div>' +
      '<div class="tabs" role="tablist" aria-label="Dimensões" id="dim-tabs"></div><div id="cmp-out"></div>' +
      '<div class="cmp-rules"><span>Sem notas</span><span>Sem ranking</span><span>Sem vencedor</span><span>Nenhum candidato com destaque visual</span></div>' +
      '<p class="meta-note">Cada célula reproduz o conteúdo editorial do projeto. “Sem proposta explícita” significa que o tema não aparece no material analisado. ' + esc(EB.candidatesMeta.editorial_note) + '</p></div></section>';
    h += '<section class="sec sec--white sec--tight"><div class="wrap"><div class="eyebrow">2 · Divergências concretas</div><h2 class="h-sub" style="margin-bottom:10px">Quem propõe o quê</h2>' +
      '<p class="dek" style="margin-bottom:28px">Posições explícitas no material analisado, agrupadas por tema. Candidatos ausentes de uma linha não têm proposta explícita sobre ela.</p><div class="issues">' +
      EB.issues.map(function (is) {
        return '<div class="issue"><small>' + esc(is.group) + "</small><h4>" + esc(is.q) + "</h4><ul>" + is.positions.map(function (p) {
          return "<li><span>" + esc(p.p) + '</span><div class="who">' + (p.c.length ? p.c.map(function (id) { var c = cand(id); return '<a href="#/candidatos/' + id + '">' + esc(c.name) + "</a>"; }).join("") : "<em>nenhum candidato no material</em>") + "</div></li>"; }).join("") + "</ul></div>"; }).join("") +
      "</div></div></section>";
    app.innerHTML = h;
    drawCompare();
  }
  function drawCompare() {
    var pk = document.getElementById("picker"); if (!pk) return;
    pk.innerHTML = EB.candidates.map(function (c) {
      var on = selected.indexOf(c.id) > -1, dis = !on && selected.length >= 4;
      return '<button class="pick" data-pick="' + c.id + '" aria-pressed="' + on + '"' + (dis ? " disabled" : "") + ">" + esc(c.name) + " <small>" + esc(c.number) + "</small></button>"; }).join("");
    document.getElementById("picker-status").innerHTML = "<span>" + selected.length + " de 4 selecionados" + (selected.length < 2 ? " · escolha pelo menos 2" : "") + "</span>" + (selected.length ? '<button class="linkish" data-clear>Limpar</button>' : "");
    var dims = [{ id: "todas", name: "Todas" }].concat(EB.compareDims);
    document.getElementById("dim-tabs").innerHTML = dims.map(function (d) { return '<button class="tab" role="tab" data-dim="' + d.id + '" aria-selected="' + (d.id === cmpDim) + '">' + esc(d.name) + "</button>"; }).join("");
    var out = document.getElementById("cmp-out");
    if (selected.length < 2) {
      out.innerHTML = '<div class="empty-state"><b>Escolha de 2 a 4 candidatos</b>A comparação aparece aqui, dimensão por dimensão.</div>';
    } else {
      var show = cmpDim === "todas" ? EB.compareDims : EB.compareDims.filter(function (d) { return d.id === cmpDim; });
      out.innerHTML = show.map(function (d) {
        return '<div class="cmp-dim"><h3>' + esc(d.name) + "<small>" + selected.length + " candidatos</small></h3>" + '<p class="cmp-hint">Deslize para o lado →</p><div class="cmp-row" style="--n:' + selected.length + '">' +
          selected.map(function (id) { var c = cand(id), v = c.compare[d.id];
            return '<div class="cmp-cell' + (v ? "" : " none") + '"><h4>' + avatar(c, "av-xs") + "<b>" + esc(c.name) + "</b><span>" + esc(c.party) + " " + esc(c.number) + "</span></h4><p>" + (v ? md(v) : "Sem proposta explícita no material analisado.") + "</p></div>"; }).join("") + "</div></div>"; }).join("");
    }
    var qs = "c=" + selected.join(",") + (cmpDim !== "todas" ? "&d=" + cmpDim : "");
    try { history.replaceState(null, "", "#/comparar?" + qs); } catch (e) {}
  }

  /* ---------------------------------------------------------- PESQUISAS */
  var pollTab = "media";
  var PALETTE = ["#e6e2d6", "#e0b25a", "#b48cff", "#5fbf8f", "#2fb3c6", "#ff8a65"];
  function renderPolls(q) {
    if (q.v) pollTab = q.v;
    var M = EB.pollsMeta;
    var h = pageHero({ crumbs: [["Pesquisas"]], kicker: "Camada 1 · Pesquisas de intenção de voto", title: "Pesquisas",
      dek: "Última pesquisa nacional válida de cada instituto. Pesquisas anteriores permanecem no histórico. Pesquisa não é previsão.", below: layersNav("pesquisas") });
    var tabs = [["media", "Média descritiva"], ["individuais", "Pesquisas individuais"], ["segundo", "2º turno"], ["rejeicao", "Rejeição"], ["evolucao", "Evolução"], ["metodologia", "Metodologia"]];
    h += '<section class="sec sec--dark2 sec--tight"><div class="wrap"><div class="tabs" role="tablist" aria-label="Seções de pesquisas">' + tabs.map(function (t) { return '<button class="tab" role="tab" data-ptab="' + t[0] + '" aria-selected="' + (t[0] === pollTab) + '">' + t[1] + "</button>"; }).join("") + '</div><div id="poll-out"></div></div></section>';
    app.innerHTML = h; drawPolls();
  }
  function latest() { return EB.polls.filter(function (p) { return p.latest; }); }
  function drawPolls() {
    var out = document.getElementById("poll-out"); if (!out) return;
    var M = EB.pollsMeta, L = latest(), S = M.short, h = "";
    if (pollTab === "media") {
      var rows = M.candidates_1t.map(function (c) { var vals = L.map(function (p) { return p.r1[c]; }); return { c: c, v: avg1(c), min: Math.min.apply(null, vals), max: Math.max.apply(null, vals) }; }).sort(function (a, b) { return b.v - a.v; });
      var mx = rows[0].v, ok = true;
      rows.forEach(function (r) { if (Math.abs(fix(r.v, 2).replace(",", ".") - EB.pollsPublishedAvg.r1[r.c]) > 0.005) ok = false; });
      var a2 = avg(null, function (p) { return p.r2 ? p.r2.a_pct : null; }), b2 = avg(null, function (p) { return p.r2 ? p.r2.b_pct : null; });
      h += '<div class="split"><div class="panel grow"><div class="panel-top"><h3>1º turno</h3><span class="upd">' + L.length + " institutos · snapshot " + dmy(M.last_updated) + "</span></div>" +
        rows.map(function (r) { return '<div class="avg-row"><span class="nm">' + esc(cand(r.c).name) + '</span><span class="pc">' + fix(r.v, 2) + '%</span><span class="track"><i style="--w:' + (r.v / mx * 100) + '%"></i></span><span class="mono small" style="grid-column:1/-1;color:var(--t-light-2)">entre institutos: ' + num(r.min) + "% a " + num(r.max) + "%</span></div>"; }).join("") +
        '<div class="mandatory">' + esc(M.legend_avg) + '</div><p class="avg-note">Um único peso por instituto. Sem ponderação por frequência ou tamanho de amostra. A média não recebe margem de erro própria.</p>' +
        '<div class="check">Conferência automática da média recalculada: <b class="' + (ok ? "" : "bad") + '">' + (ok ? "✓ confere" : "⚠ divergência — revisar") + "</b></div></div>" +
        '<div><div class="panel"><div class="panel-top"><h3>2º turno · Lula × Flávio</h3><span class="upd">mesmas ' + L.length + " rodadas</span></div>" +
        duelBar("Média descritiva", null, a2, b2, true) +
        '<p class="avg-note">Diferença descritiva: ' + fix(Math.abs(b2 - a2), 2) + " ponto. Não transformar isso em probabilidade de vitória.</p>" +
        '<div class="mandatory">' + esc(M.legend_avg) + '</div><button class="btn btn--ghost btn--sm" data-ptab="segundo" style="color:var(--t-light)">Cenários por instituto →</button></div>' +
        '<div class="panel" style="margin-top:16px"><div class="panel-top"><h3>Não confundir</h3></div><p class="small" style="color:var(--t-light-2)">Pesquisa mede respostas de uma amostra de eleitores. Mercados mostram preços de contratos. O modelo ÍRIS é uma projeção estatística externa. As três camadas ficam em páginas separadas.</p><div class="hero-cta" style="margin-top:12px"><a class="btn btn--ghost btn--sm" href="#/mercados" style="color:var(--t-light)">Mercados</a><a class="btn btn--ghost btn--sm" href="#/iris" style="color:var(--t-light)">ÍRIS / VOGA</a></div></div></div></div>';
    }
    if (pollTab === "individuais") {
      h += '<div class="panel-top"><h3 style="font-family:var(--f-display);font-size:28px">Snapshot · 1º turno</h3><span class="upd">Toque no instituto para ver a ficha completa</span></div>' +
        '<table class="ptable"><thead><tr><th>Instituto</th><th>Campo</th><th>Amostra</th><th>Método</th><th>Margem</th>' + M.candidates_1t.map(function (c) { return "<th>" + esc(S[c]) + "</th>"; }).join("") + "</tr></thead><tbody>" +
        L.map(function (p, i) { return '<tr><td><button data-pdetail="' + i + '">' + esc(p.instituto) + '</button></td><td class="meta">' + field(p.campo_inicio, p.campo_fim) + '</td><td class="num">' + thousands(p.amostra) + '</td><td class="meta">' + (p.metodo ? esc(p.metodo) : "—") + '</td><td class="num">±' + num(p.margem_erro) + "</td>" +
          M.candidates_1t.map(function (c) { return '<td class="num">' + num(p.r1[c]) + "</td>"; }).join("") + '</tr><tr class="pdetail" id="pd-' + i + '" hidden><td colspan="' + (5 + M.candidates_1t.length) + '">' + pollFicha(p) + "</td></tr>"; }).join("") +
        '</tbody><tfoot><tr><td colspan="5">Média descritiva simples (' + L.length + ")</td>" + M.candidates_1t.map(function (c) { return '<td class="num">' + fix(avg1(c), 2) + "</td>"; }).join("") + "</tr></tfoot></table>" +
        '<div class="pcards">' + L.map(function (p) { return '<div class="pcard"><h4>' + esc(p.instituto) + '</h4><div class="meta">' + field(p.campo_inicio, p.campo_fim) + " · " + thousands(p.amostra) + " entrevistas · " + (p.metodo ? esc(p.metodo) : "método não informado") + " · ±" + num(p.margem_erro) + ' p.p.</div><div class="res">' +
          M.candidates_1t.map(function (c) { return "<div><small>" + esc(S[c]) + "</small><b>" + num(p.r1[c]) + "</b></div>"; }).join("") + '</div><details class="src"><summary>Ficha completa</summary>' + pollFicha(p) + "</details></div>"; }).join("") + "</div>" +
        '<div class="mandatory" style="margin-top:22px">Percentuais de intenção de voto bruta, como publicados. Sem classificação própria de “empate técnico”: compare percentuais e margem de cada instituto.</div>';
    }
    if (pollTab === "segundo") {
      var a2b = avg(null, function (p) { return p.r2 ? p.r2.a_pct : null; }), b2b = avg(null, function (p) { return p.r2 ? p.r2.b_pct : null; });
      h += '<div class="panel"><div class="panel-top"><h3>Lula × Flávio · 2º turno</h3><span class="upd">' + L.length + " institutos · " + dmy(M.last_updated) + "</span></div>" +
        '<div class="duel-legend"><span><i style="background:#d7d4cc"></i>Lula</span><span>Flávio Bolsonaro<i style="background:#5c6470;margin:0 0 0 6px"></i></span></div><div class="duel">' +
        duelBar("Média descritiva", "média simples", a2b, b2b, true) +
        L.map(function (p) { return duelBar(p.instituto, field(p.campo_inicio, p.campo_fim) + " · ±" + num(p.margem_erro), p.r2.a_pct, p.r2.b_pct); }).join("") + "</div>" +
        '<p class="avg-note">Barra = percentuais publicados. O espaço restante corresponde a brancos, nulos e indecisos (não detalhados aqui). Diferença descritiva da média: ' + fix(Math.abs(b2b - a2b), 2) + ' ponto.</p><div class="mandatory">' + esc(M.legend_avg) + " A média de 2º turno não é probabilidade de vitória.</div></div>";
    }
    if (pollTab === "rejeicao") {
      var withR = L.filter(function (p) { return p.rej; }), without = L.filter(function (p) { return !p.rej; });
      h += '<div class="mandatory">Rejeição fica por instituto, sem média global: as perguntas variam entre institutos.</div><div class="rej">' +
        withR.map(function (p) { return '<div class="rej-card"><h4>' + esc(p.instituto) + '</h4>' + (p.rejeicao_pergunta ? '<div class="q">Pergunta exata: “' + esc(p.rejeicao_pergunta) + "”</div>" : "") +
          '<div class="grow">' + ["lula", "flavio-bolsonaro"].map(function (c) { return '<div class="bar-row"><span class="n">' + esc(S[c]) + '</span><span class="track"><i style="--w:' + p.rej[c] + '%"></i></span><span class="v">' + num(p.rej[c]) + "</span></div>"; }).join("") + "</div></div>"; }).join("") + "</div>" +
        '<p class="avg-note">Sem dado de rejeição no snapshot: ' + without.map(function (p) { return esc(p.instituto); }).join(", ") + ". Valores em %.</p>";
    }
    if (pollTab === "evolucao") h += evolution();
    if (pollTab === "metodologia") {
      h += '<div class="split"><div><h3 class="h-sub" style="margin-bottom:14px">Regras do consolidado</h3><ol class="hier">' + M.rules.map(function (r) { return "<li>" + esc(r) + "</li>"; }).join("") + "</ol></div>" +
        '<div><h3 class="h-sub" style="margin-bottom:14px">Institutos no snapshot</h3><div class="chips">' + L.map(function (p) { return '<span class="chip">' + esc(p.instituto) + "</span>"; }).join("") + "</div>" +
        '<div class="blk m" style="margin-top:20px">' + tag("met") + "<p>" + esc(M.history_note) + "</p></div>" +
        '<h3 class="h-sub" style="margin:28px 0 12px">Ficha de cada pesquisa</h3><p class="small" style="color:var(--t-light-2)">instituto · contratante · registro TSE · data de publicação · campo · amostra · método · margem de erro · nível de confiança · cenário · pergunta exata · candidato · percentual · branco/nulo · indeciso · fonte primária · fonte secundária · qualidade do dado · latest</p>' +
        '<h3 class="h-sub" style="margin:28px 0 12px">Fontes</h3><ul class="src-list"><li>Relatórios integrais dos institutos.</li><li>TSE / PesqEle para registros.</li><li>Páginas dos institutos e contratantes.</li></ul></div></div>';
    }
    out.innerHTML = h; observe(out);
  }
  function pollFicha(p) {
    var f = [["Contratante", p.contratante], ["Registro TSE", p.registro_tse], ["Publicação", dmy(p.data_publicacao)], ["Campo", dmy(p.campo_inicio) + " a " + dmy(p.campo_fim)], ["Amostra", thousands(p.amostra)], ["Método", p.metodo], ["Margem de erro", "±" + num(p.margem_erro) + " p.p."], ["Nível de confiança", p.nivel_confianca], ["Cenário", p.cenario], ["Pergunta exata", p.pergunta_exata], ["Branco / nulo", p.branco_nulo], ["Indecisos", p.indeciso], ["Fonte primária", p.source_primary], ["Atualizado", dmy(p.last_updated)]];
    if (p.outros) f.splice(10, 0, [LANG === "en" ? "Other candidates" : "Outros candidatos", p.outros]);
    return '<dl style="display:grid;grid-template-columns:max-content 1fr;gap:6px 14px;margin:8px 0;font-size:13px">' + f.filter(function (x) { return x[1] != null && x[1] !== "" && String(x[1]).indexOf("null") < 0; }).map(function (x) { return '<dt class="mono" style="font-size:10.5px;letter-spacing:.1em;text-transform:uppercase;opacity:.6">' + x[0] + "</dt><dd style=\"margin:0\">" + (x[1] != null && x[1] !== "" ? esc(x[1]) : pend()) + "</dd>"; }).join("") + "</dl>";
  }
  function duelBar(name, sub, a, b, strong) {
    var rest = Math.max(0, 100 - a - b);
    return '<div class="duel-row"' + (strong ? ' style="border-bottom:2px solid var(--t-light)"' : "") + '><span class="inst">' + esc(name) + (sub ? "<small>" + esc(sub) + "</small>" : "") + '</span><div class="duel-bar"><span class="a" style="width:' + a + '%">' + fix(a, a % 1 ? (strong ? 2 : 1) : 0) + '</span><span class="x"></span><span class="b" style="width:' + b + '%">' + fix(b, b % 1 ? (strong ? 2 : 1) : 0) + "</span></div></div>";
  }
  function evolution() {
    var M = EB.pollsMeta, all = EB.polls, W = 760, H = 360, pl = 48, pr = 20, pt = 20, pb = 40;
    var dates = all.map(function (p) { return +new Date(p.campo_fim); });
    var d0 = Math.min.apply(null, dates) - 2 * 864e5, d1 = Math.max.apply(null, dates) + 2 * 864e5;
    var yMax = 50;
    var X = function (t) { return pl + (t - d0) / (d1 - d0) * (W - pl - pr); }, Y = function (v) { return pt + (1 - v / yMax) * (H - pt - pb); };
    var g = "";
    for (var v = 0; v <= yMax; v += 10) g += '<line class="ax" x1="' + pl + '" x2="' + (W - pr) + '" y1="' + Y(v) + '" y2="' + Y(v) + '"/><text x="' + (pl - 8) + '" y="' + (Y(v) + 4) + '" text-anchor="end">' + v + "%</text>";
    for (var t = d0 + 2 * 864e5; t <= d1; t += 3 * 864e5) { var dd = new Date(t); g += '<text x="' + X(t) + '" y="' + (H - 14) + '" text-anchor="middle">' + dd.getUTCDate() + " " + MONTHS[dd.getUTCMonth()] + "</text>"; }
    M.candidates_1t.forEach(function (c, ci) {
      var byInst = {};
      all.forEach(function (p) { if (p.r1 && p.r1[c] != null) (byInst[p.instituto] = byInst[p.instituto] || []).push(p); });
      Object.keys(byInst).forEach(function (k) {
        var s = byInst[k].sort(function (a, b) { return a.campo_fim < b.campo_fim ? -1 : 1; });
        if (s.length > 1) g += '<polyline fill="none" stroke="' + PALETTE[ci] + '" stroke-opacity=".5" stroke-width="1.5" points="' + s.map(function (p) { return X(+new Date(p.campo_fim)) + "," + Y(p.r1[c]); }).join(" ") + '"/>';
        s.forEach(function (p) { g += '<circle cx="' + X(+new Date(p.campo_fim)) + '" cy="' + Y(p.r1[c]) + '" r="4.5" fill="' + PALETTE[ci] + '" fill-opacity=".85"><title>' + esc(p.instituto) + " · " + esc(M.short[c]) + ": " + num(p.r1[c]) + "% (campo até " + dmy(p.campo_fim) + ")</title></circle>"; });
      });
    });
    return '<div class="panel"><div class="panel-top"><h3>Série temporal · 1º turno</h3><span class="upd">cada ponto = uma rodada, na data de fim do campo</span></div>' +
      '<div class="chart"><svg viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="Pontos de cada pesquisa por data de campo">' + g + "</svg></div>" +
      '<div class="chart-legend">' + M.candidates_1t.map(function (c, i) { return '<span><i style="background:' + PALETTE[i] + '"></i>' + esc(M.short[c]) + "</span>"; }).join("") + "</div>" +
      '<div class="blk m" style="margin-top:18px">' + tag("met") + "<p>Cada ponto é uma rodada de pesquisa, na data de fim do campo. Quando houver mais de uma rodada do mesmo instituto, os pontos são ligados por uma linha. CNT/MDA e Meio/Ideia ficam no histórico quando a rodada usou composição de candidatos já desatualizada.</p></div>" +
      '<p class="avg-note">Cores neutras, sem associação partidária. Passe o cursor sobre um ponto para ver instituto e valor.</p></div>';
  }

  /* ---------------------------------------------------------- MERCADOS */
  function renderMarkets() {
    var MM = EB.marketsMeta;
    var h = pageHero({ crumbs: [["Pesquisas", "#/pesquisas"], ["Mercados"]], kicker: "Camada 2 · Mercados de previsão", title: "Mercados",
      dek: "Polymarket e Kalshi. Preços de contratos sobre eventos futuros — probabilidades implícitas aproximadas, não intenção de voto.", below: layersNav("mercados") });
    h += '<section class="sec sec--dark2 sec--tight"><div class="wrap"><div class="mandatory">' + esc(MM.legend) + "</div>" +
      '<p class="upd" style="margin-bottom:20px">Snapshot: ' + dmy(MM.captured_at) + (MM.captured_time ? " " + esc(MM.captured_time) : "") + " · preços mudam continuamente</p>" +
      '<div class="mkts">' + EB.markets.map(function (m) { return '<div class="mkt"><div class="mkt-flag">Preço de mercado</div><h3>' + esc(m.title) + '</h3><p class="q">' + esc(m.q) + "</p>" + m.platforms.map(platBlock).join("") + (m.note ? '<p class="mkt-note">' + esc(m.note) + "</p>" : "") + "</div>"; }).join("") + "</div>" +
      '<p class="avg-note">Valores exatamente como capturados (≈ aproximações, &lt; menor que). Não tiramos média entre plataformas. ' + esc(MM.resolution_note) + "</p></div></section>";
    var a1 = avg1("lula"), f1 = avg1("flavio-bolsonaro");
    var a2 = avg(null, function (p) { return p.r2 ? p.r2.a_pct : null; }), b2 = avg(null, function (p) { return p.r2 ? p.r2.b_pct : null; });
    h += '<section class="sec sec--dark sec--tight"><div class="wrap"><div class="split"><div>' +
      EB.marketsExplainer.map(function (e) { return '<h3 class="h-sub" style="margin:0 0 12px">' + esc(e.t) + "</h3>" + e.p.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") + '<div style="height:24px"></div>'; }).join("") + "</div>" +
      '<div><div class="panel"><div class="panel-top"><h3>Grandezas diferentes</h3></div><p class="small" style="color:var(--t-light-2);margin-bottom:16px">A mesma data, duas perguntas distintas. Os números abaixo não são comparáveis diretamente.</p><div class="cmp-poll">' +
      '<div class="rej-card"><h4>Média de pesquisas</h4><div class="q">Intenção de voto declarada</div><p class="mono small">1º turno: Lula ' + fix(a1, 2) + "% · Flávio " + fix(f1, 2) + "%</p><p class=\"mono small\">2º turno: Lula " + fix(a2, 2) + "% · Flávio " + fix(b2, 2) + '%</p><a class="mono small" href="#/pesquisas">Pesquisas →</a></div>' +
      '<div class="mkt" style="padding:16px"><h4 style="font-family:var(--f-display);font-size:19px">Mercado · vencedor final</h4><div class="q">Preço de contrato</div><p class="mono small">Polymarket: Flávio ~59,5–60% · Lula ~41%</p><p class="mono small">Kalshi: Flávio ~61% · Lula ~40%</p></div></div>' +
      '<p class="avg-note">Uma pessoa pode declarar voto em Lula e, simultaneamente, acreditar que Flávio terminará eleito — e vice-versa.</p></div>' +
      '<div class="panel" style="margin-top:16px"><div class="panel-top"><h3>O que registramos em cada captura</h3></div><div class="chips">' + ["título exato do mercado", "plataforma", "preço", "volume", "data/hora da captura", "regra de resolução", "fonte oficial de resolução"].map(function (x) { return '<span class="chip" style="border-color:var(--line-d)">' + x + "</span>"; }).join("") + '</div></div></div></div></div></section>';
    app.innerHTML = h;
  }

  /* ---------------------------------------------------------- ÍRIS */
  function renderIris() {
    var I = EB.iris, X = EB.irisExplainer;
    var h = pageHero({ crumbs: [["Pesquisas", "#/pesquisas"], ["Modelo ÍRIS"]], kicker: "Camada 3 · Modelo estatístico externo", title: "ÍRIS / VOGA",
      dek: "Um modelo da VOGA Inteligência. Os números pertencem à VOGA — o site não os apresenta como cálculo próprio.", below: layersNav("iris") });
    var fields = [["Estimativa atual", "current_estimate"], ["Projeção de 1º turno", "first_round_projection"], ["Intervalo de credibilidade (" + I.credibility + ")", "range"], ["Chance de 2º turno", "second_round_probability"], ["Chance de vitória", "win_probability"], ["Atualizado em", "upd"]];
    var body;
    if (!I.rows.length) {
      body = '<div class="iris-fields">' + fields.map(function (f) { return "<div><small>" + esc(f[0]) + '</small><span class="wait">Em atualização</span></div>'; }).join("") + "</div>";
    } else {
      body = '<div class="table-scroll"><table class="ptable" style="display:table"><thead><tr><th>Candidato</th><th>Estimativa atual</th><th>Projeção 1º turno</th><th>Intervalo</th><th>Chance 2º turno</th><th>Chance de vitória</th></tr></thead><tbody>' +
        I.rows.map(function (r) { var c = cand(r.candidate); return "<tr><td>" + esc(c ? c.name : r.candidate) + '</td><td class="num">' + num(r.current_estimate) + '%</td><td class="num">' + num(r.first_round_projection) + '%</td><td class="num">' + num(r.projection_low) + "–" + num(r.projection_high) + '%</td><td class="num">' + num(r.second_round_probability) + '%</td><td class="num">' + num(r.win_probability) + "%</td></tr>"; }).join("") + "</tbody></table></div>";
    }
    h += '<section class="sec sec--dark2 sec--tight"><div class="wrap"><div class="iris-card"><div class="iris-head"><b>' + esc(I.name) + '</b><span class="upd">' + (I.model_updated_at ? "Atualizado em " + dmy(I.model_updated_at) : "Em atualização") + "</span></div>" + body +
      '<div class="iris-foot"><p class="small" style="max-width:640px;color:var(--t-light-2)">' + esc(I.legend) + '</p><a class="btn btn--solid btn--sm" href="' + esc(I.methodology_url) + '" target="_blank" rel="noopener noreferrer">Ver metodologia original ↗</a></div></div>' +
      '</div></section>';
    h += '<section class="sec sec--dark sec--tight"><div class="wrap"><div class="sec-head"><div class="eyebrow">Como funciona conceitualmente</div><h2 class="h-sub">' + esc(X.what[0]) + '</h2><p class="dek">' + esc(X.what[1]) + " " + esc(X.what[2]) + '</p></div><div class="steps">' +
      X.steps.map(function (s) { return '<div class="step"><h3>' + esc(s.t) + "</h3><p>" + esc(s.d) + "</p></div>"; }).join("") + "</div>" +
      '<div class="blk c" style="margin-top:24px">' + tag("ctx") + '<h4 class="blk-title">O Pêndulo</h4><p>' + esc(X.pendulum) + "</p></div>" +
      '<div class="kn" style="margin-top:24px"><div class="yes"><h4>O que a documentação pública permite afirmar</h4><ul>' + X.known.map(function (k) { return "<li>" + esc(k) + "</li>"; }).join("") + '</ul></div><div class="no"><h4>O que não sabemos pela documentação pública</h4><ul>' + X.unknown.map(function (k) { return "<li>" + esc(k) + "</li>"; }).join("") + "</ul></div></div>" +
      '<div class="blk m" style="margin-top:16px">' + tag("met") + "<p>" + esc(X.unknown_note) + "</p></div>" +
      '<p class="meta-note">Fonte: <a href="' + esc(I.url) + '" target="_blank" rel="noopener noreferrer">voga-iris.com</a> · metodologia: <a href="' + esc(I.methodology_url) + '" target="_blank" rel="noopener noreferrer">voga-iris.com/metodologia</a></p></div></section>';
    app.innerHTML = h;
  }

  /* ---------------------------------------------------------- ESTADOS */
  /* Mapa real do Brasil (SVG inline, geometria IBGE). Cada UF é focável e clicável. */
  var SMALL_LABELS = { RN: [4020, 1060, 3790, 1105], PB: [4020, 1200, 3770, 1232], PE: [4020, 1340, 3700, 1360], AL: [4020, 1480, 3760, 1475], SE: [3980, 1640, 3670, 1585], ES: [3560, 2530, 3370, 2485], RJ: [3330, 2950, 3160, 2760], DF: [2880, 1990, 2635, 2095] };
  function brMap(active, links) {
    var M = EB.brMap, names = {};
    EB.ufs.forEach(function (u) { names[u.uf] = u.name; });
    var shapes = "", labels = "";
    Object.keys(M.paths).sort().forEach(function (uf) {
      var has = !!EB.recs[uf], sel = uf === active;
      var lbl = names[uf] + (has ? " — indicações disponíveis" : " — em atualização");
      shapes += '<path class="uf-shape' + (has ? " has" : "") + (sel ? " is-sel" : "") + '" d="' + M.paths[uf] + '" data-uf="' + uf + '" tabindex="0" role="' + (links ? "link" : "button") + '" aria-label="' + esc(lbl) + '"' + (links ? "" : ' aria-pressed="' + sel + '"') + "><title>" + esc(names[uf]) + "</title></path>";
      var sm = SMALL_LABELS[uf], c = M.labels[uf];
      if (sm) labels += '<line class="uf-lead" x1="' + sm[2] + '" y1="' + sm[3] + '" x2="' + (sm[0] - 60) + '" y2="' + (sm[1] - 22) + '"/><text class="uf-lbl uf-lbl--out' + (sel ? " is-sel" : "") + '" x="' + sm[0] + '" y="' + sm[1] + '">' + uf + "</text>";
      else labels += '<text class="uf-lbl' + (sel ? " is-sel" : "") + '" x="' + c[0] + '" y="' + (c[1] + 30) + '">' + uf + "</text>";
    });
    /* alvo ampliado para o DF (área muito pequena) */
    var df = M.labels.DF;
    shapes += '<circle class="uf-hit" cx="' + df[0] + '" cy="' + df[1] + '" r="70" data-uf="DF" aria-hidden="true"></circle>';
    return '<div class="brmap"><svg viewBox="-20 -20 ' + (M.w + 300) + " " + (M.h + 40) + '" role="group" aria-label="Mapa do Brasil — escolha uma unidade da federação" preserveAspectRatio="xMidYMid meet">' +
      '<g class="uf-shapes">' + shapes + '</g><g class="uf-labels" aria-hidden="true">' + labels + "</g></svg></div>";
  }
  function person(p) {
    if (!p || !p.name) return null;
    return avatar(p, "av-rec") + '<div class="slot-t"><b>' + esc(p.name) + "</b>" + esc([p.party, p.number].filter(Boolean).join(" · ")) + "</div>";
  }
  function renderStates(uf) {
    var R = EB.recsMeta; uf = uf ? uf.toUpperCase() : null;
    var U = uf ? EB.ufs.filter(function (x) { return x.uf === uf; })[0] : null;
    var h = pageHero({ crumbs: uf && U ? [["Estados", "#/estados"], [U.name]] : [["Estados"]], kicker: "Indicações pessoais por estado", title: "Estados",
      dek: "Governador, duas vagas ao Senado, deputados federais e estaduais/distritais nas 27 unidades da federação." });
    var pres = EB.recsPresident;
    h += '<section class="sec sec--paper sec--tight"><div class="wrap">' +
      '<div class="recs-banner"><b>Indicação pessoal · não é o comparador factual</b><p>' + esc(R.disclaimer) + ' Fonte: <a href="' + esc(R.source_url) + '" target="_blank" rel="noopener noreferrer">' + esc(R.source_name) + "</a>.</p></div>" +
      '<div class="pres-rec"><div class="pres-rec-main">' + (pres ? avatar(pres, "av-rec") : "") + '<div><div class="eyebrow">Presidência</div><h3>' + (pres ? esc(pres.name) : "Indicações em atualização") + "</h3>" + (pres ? '<p class="mono small">' + esc(pres.party) + " · " + esc(pres.number) + "</p>" : "") + '</div></div><a class="btn btn--ghost btn--sm" href="#/comparar">Ver comparador factual</a></div>' +
      '<div class="states-wrap"><div class="states-map"><div class="eyebrow">Escolha seu estado</div>' + brMap(uf, false) +
      '<label class="sr-only" for="uf-select">Estado</label><select class="uf-select" id="uf-select"><option value="">Selecione uma UF…</option>' + EB.ufs.slice().sort(function (a, b) { return a.name.localeCompare(b.name); }).map(function (u) { return '<option value="' + u.uf + '"' + (u.uf === uf ? " selected" : "") + ">" + esc(u.name) + " (" + u.uf + ")</option>"; }).join("") + "</select>" +
      '<div class="map-legend"><span><i></i>Indicações disponíveis</span><span>Malha: IBGE</span></div></div>' +
      '<div class="state-panel" id="state-panel">' + statePanel(U) + "</div></div></div></section>";
    app.innerHTML = h;
  }
  /* Troca de UF sem recarregar a página: mantém rolagem e foco no mapa. */
  function updateStates(uf) {
    uf = uf ? uf.toUpperCase() : null;
    var U = uf ? EB.ufs.filter(function (x) { return x.uf === uf; })[0] : null;
    [].forEach.call(document.querySelectorAll(".brmap .uf-shape"), function (el) { var on = el.getAttribute("data-uf") === uf; el.classList.toggle("is-sel", on); el.setAttribute("aria-pressed", on); });
    [].forEach.call(document.querySelectorAll(".brmap .uf-lbl"), function (el) { el.classList.toggle("is-sel", el.textContent === uf); });
    var sel = document.getElementById("uf-select"); if (sel) sel.value = uf || "";
    var panel = document.getElementById("state-panel"); panel.innerHTML = statePanel(U);
    var cr = document.querySelector(".crumbs"); if (cr) cr.innerHTML = '<a href="#/">Início</a><span>' + (U ? '<a href="#/estados">Estados</a></span><span>' + esc(U.name) : "Estados") + "</span>";
    document.title = (U ? U.name + " — " : "") + "Estados — Além da Urna";
    if (U && window.matchMedia("(max-width: 999px)").matches) panel.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  function statePanel(U) {
    var R = EB.recsMeta;
    if (!U) return '<div class="state-head"><div><div class="eyebrow" style="margin-bottom:8px">Nenhum estado selecionado</div><h3>Escolha uma UF</h3></div></div><div class="state-foot"><span>Toque em um estado no mapa ou use a lista.</span></div>';
    var rec = EB.recs[U.uf] || {};
    return '<div class="state-head"><div><div class="eyebrow" style="margin-bottom:8px">Estado selecionado</div><h3>' + esc(U.name) + '</h3></div><span class="uf-big">' + U.uf + "</span></div>" +
      '<div class="offices">' + R.offices.map(function (o) {
        var val = rec[o.id], list = Array.isArray(val) ? val : (val ? [val] : []);
        var slots = "";
        for (var i = 0; i < o.slots; i++) { var p = person(list[i]); slots += '<div class="slot' + (p ? " has-p" : " pending") + '">' + (o.slots > 1 ? '<small class="slot-k">' + (i + 1) + "ª indicação</small>" : "") + (p || esc(R.status)) + "</div>"; }
        if (list.length > o.slots) for (var j = o.slots; j < list.length; j++) slots += '<div class="slot has-p">' + person(list[j]) + "</div>";
        return '<div class="office"><h4>' + esc(o.name) + (o.note ? "<small>" + esc(o.note) + "</small>" : "") + '</h4><div class="slots">' + slots + "</div></div>"; }).join("") + "</div>" +
      (rec.notes ? '<div class="office" style="border-right:0">' + tag("ed") + "<p>" + esc(rec.notes) + "</p></div>" : "") +
      colinhaCta(U) +
      '<div class="state-foot"><span>Fonte: <a href="' + esc(R.source_url) + '" target="_blank" rel="noopener noreferrer">' + esc(R.source_name) + "</a> · " + (rec.last_updated ? "atualizado em " + dmy(rec.last_updated) : "indicações em atualização") + (R.photo_credit ? " · " + esc(R.photo_credit) : "") + '</span><span class="tag e">Indicação pessoal</span></div>';
  }

  /* ---------------------------------------------------------- COLINHA ELEITORAL (impressão) */
  /* Ordem oficial de votação — Eleições 2026 (TSE, Res. 23.751/2026, art. 142).
     Tudo acontece no navegador: nada é salvo nem enviado. */
  var CL = LANG === "en" ? {
    btn: "Print my voting reference", cta: "Your picks, in the order of Brazil's electronic voting machine, ready to print.",
    title: "My voting reference", sub: "Brazilian Elections 2026", state: "State",
    fed: "Federal Deputy", st: "State Deputy", dist: "District Deputy", s1: "Senator — First Seat", s2: "Senator — Second Seat", gov: "Governor", pres: "President",
    digits: " digits", name: "Name", number: "Number", clear: "Clear", check: "Check this number",
    pick: "This page lists {n} recommendations for this office. Tap one to fill in, or type another name:",
    prefill: "Initial entries are based on the recommendations shown on this page (source of the recommendations: peterapoia.com). Edit, delete or leave any line blank — this card is yours. Nothing is sent or saved: everything stays in your browser.",
    senate: "Check your Senate votes: in 2026 there are two separate choices.",
    preview: "Print preview", print: "Print", close: "Back",
    review: "Review names and numbers before printing, and check the information shown on the voting machine before confirming each vote.",
    order: "Voting order per Brazil's Superior Electoral Court (TSE) — 2026 Elections.",
    orderSrc: "Order set by TSE Resolution 23.751/2026, art. 142. The TSE allows voters to bring a printed or handwritten note; phones cannot be used in the voting booth.",
    foot: "Initial entries: recommendations shown on brazilbeyondtheballot.com (source: peterapoia.com).",
    dialog: "My voting reference", blank: "blank"
  } : {
    btn: "Montar minha colinha", cta: "Seus votos na ordem da urna, prontos para imprimir.",
    title: "Minha colinha", sub: "Eleições 2026", state: "Estado",
    fed: "Deputado federal", st: "Deputado estadual", dist: "Deputado distrital", s1: "Senador — 1ª vaga", s2: "Senador — 2ª vaga", gov: "Governador", pres: "Presidente",
    digits: " dígitos", name: "Nome", number: "Número", clear: "Apagar", check: "Confira este número",
    pick: "Esta página traz {n} indicações para este cargo. Toque em uma para preencher ou digite outro nome:",
    prefill: "Preenchimento inicial baseado nas indicações exibidas nesta página (fonte das indicações: peterapoia.com). Edite, apague ou deixe qualquer linha em branco — a colinha é sua. Nada é enviado nem salvo: tudo fica no seu navegador.",
    senate: "Confira os votos para o Senado: em 2026 são duas escolhas distintas.",
    preview: "Prévia da impressão", print: "Imprimir", close: "Voltar",
    review: "Revise nomes e números antes de imprimir e confira as informações exibidas na urna antes de confirmar o voto.",
    order: "Ordem de votação conforme o TSE — Eleições 2026.",
    orderSrc: "Ordem definida pela Resolução TSE nº 23.751/2026, art. 142. O TSE permite levar anotação impressa ou escrita à mão; o celular não pode ser usado na cabine.",
    foot: "Preenchimento inicial: indicações exibidas em alemdaurna.com (fonte: peterapoia.com).",
    dialog: "Minha colinha", blank: "em branco"
  };
  var COL_ROWS = [["federal_deputy", 4], ["state_deputy", 5], ["senate1", 3], ["senate2", 3], ["governor", 2], ["president", 2]];
  var col = null, colOpener = null;
  function colLabel(id, uf) { return { federal_deputy: CL.fed, state_deputy: uf === "DF" ? CL.dist : CL.st, senate1: CL.s1, senate2: CL.s2, governor: CL.gov, president: CL.pres }[id]; }
  function colPerson(p) { return p && p.name ? { name: p.name, number: String(p.number || ""), party: p.party || "" } : { name: "", number: "", party: "" }; }
  function colOptions(id, rec) { return id === "federal_deputy" ? (rec.federal_deputy || []) : id === "state_deputy" ? (rec.state_deputy || []) : []; }
  function colinhaCta(U) {
    return '<div class="colinha-cta"><button type="button" class="btn btn--ghost btn--sm" data-colinha="' + U.uf + '">🖨 ' + esc(CL.btn) + '</button><span>' + esc(CL.cta) + "</span></div>";
  }
  function openColinha(uf) {
    var U = EB.ufs.filter(function (x) { return x.uf === uf; })[0]; if (!U) return;
    var rec = EB.recs[uf] || {}, sen = rec.senate || [];
    var rows = {};
    rows.federal_deputy = colPerson((rec.federal_deputy || []).length === 1 ? rec.federal_deputy[0] : null);
    rows.state_deputy = colPerson((rec.state_deputy || []).length === 1 ? rec.state_deputy[0] : null);
    rows.senate1 = colPerson(sen[0]); rows.senate2 = colPerson(sen[1]);
    rows.governor = colPerson(rec.governor); rows.president = colPerson(EB.recsPresident);
    col = { uf: uf, U: U, rec: rec, rows: rows };
    var el = document.getElementById("colinha");
    if (!el) { el = document.createElement("div"); el.id = "colinha"; el.className = "colinha"; el.setAttribute("role", "dialog"); el.setAttribute("aria-modal", "true"); el.setAttribute("aria-labelledby", "colinha-title"); document.body.appendChild(el); }
    el.innerHTML = '<div class="colinha-box paper">' +
      '<div class="colinha-head"><div><h2 id="colinha-title">' + esc(CL.title) + '</h2><p class="colinha-meta">' + esc(CL.sub) + " · " + esc(CL.state) + ": " + esc(U.name) + " (" + U.uf + ')</p></div><button type="button" class="colinha-x" data-colinha-close aria-label="' + esc(CL.close) + '">×</button></div>' +
      '<p class="colinha-note">' + esc(CL.prefill) + "</p>" +
      '<div class="colinha-grid"><div class="colinha-form">' + COL_ROWS.map(function (r, i) {
        var id = r[0], d = r[1], v = rows[id], opts = colOptions(id, rec);
        return '<fieldset class="colinha-row" data-row="' + id + '"><legend><b>' + (i + 1) + "</b> " + esc(colLabel(id, uf)) + " <small>" + d + esc(CL.digits) + "</small></legend>" +
          (opts.length > 1 ? '<div class="colinha-pick"><span>' + esc(CL.pick.replace("{n}", opts.length)) + "</span>" + opts.map(function (p, k) { return '<button type="button" class="chip" data-colpick="' + id + '" data-k="' + k + '">' + esc(p.name) + " · " + esc(p.number) + "</button>"; }).join("") + "</div>" : "") +
          '<div class="colinha-fields"><label><span>' + esc(CL.name) + '</span><input type="text" autocomplete="off" data-f="name" value="' + esc(v.name) + '"></label>' +
          '<label class="num"><span>' + esc(CL.number) + '</span><input type="text" inputmode="numeric" autocomplete="off" maxlength="' + (d + 1) + '" data-f="number" data-d="' + d + '" value="' + esc(v.number) + '"></label>' +
          '<button type="button" class="linkish" data-colclear="' + id + '">' + esc(CL.clear) + '</button></div><p class="colinha-hint" hidden>' + esc(CL.check) + "</p></fieldset>";
      }).join("") + '</div><div class="colinha-preview"><div class="eyebrow">' + esc(CL.preview) + '</div><div class="colinha-sheet" id="colinha-sheet"></div></div></div>' +
      '<p class="colinha-warn" id="colinha-senate" hidden>' + esc(CL.senate) + "</p>" +
      '<div class="colinha-actions"><button type="button" class="btn btn--solid" data-colinha-print>🖨 ' + esc(CL.print) + '</button><button type="button" class="btn btn--ghost" data-colinha-close>' + esc(CL.close) + "</button></div>" +
      '<p class="colinha-legal">' + esc(CL.review) + " " + esc(CL.orderSrc) + ' <a href="https://www.tse.jus.br/comunicacao/noticias/2026/Marco/eleicoes-2026-conheca-a-ordem-de-votacao-na-urna-eletronica" target="_blank" rel="noopener noreferrer">TSE ↗</a></p>' +
      "</div>";
    colOpener = document.activeElement;
    document.documentElement.classList.add("colinha-open");
    colUpdate();
    var ttl = document.getElementById("colinha-title"); ttl.setAttribute("tabindex", "-1"); try { ttl.focus({ preventScroll: true }); } catch (e) { ttl.focus(); }
    el.scrollTop = 0;
  }
  function closeColinha() {
    var el = document.getElementById("colinha"); if (!el || !document.documentElement.classList.contains("colinha-open")) return;
    document.documentElement.classList.remove("colinha-open"); el.innerHTML = ""; col = null;
    if (colOpener && document.body.contains(colOpener)) try { colOpener.focus({ preventScroll: true }); } catch (e) {}
  }
  function colUpdate() {
    if (!col) return;
    var dup = false;
    [].forEach.call(document.querySelectorAll("#colinha .colinha-row"), function (fs) {
      var id = fs.getAttribute("data-row"), inp = fs.querySelector("[data-f=number]"), d = +inp.getAttribute("data-d"), n = inp.value;
      var bad = n !== "" && n.length !== d; fs.querySelector(".colinha-hint").hidden = !bad; fs.classList.toggle("is-bad", bad);
    });
    var r = col.rows;
    dup = r.senate1.number !== "" && r.senate1.number === r.senate2.number;
    document.getElementById("colinha-senate").hidden = !dup;
    document.getElementById("colinha-sheet").innerHTML =
      '<div class="cs-head"><b>' + esc(CL.title) + "</b><span>" + esc(CL.sub) + " · " + esc(col.U.name) + " (" + col.uf + ")</span></div>" +
      COL_ROWS.map(function (row, i) {
        var id = row[0], d = row[1], v = r[id];
        return '<div class="cs-row"><div class="cs-l"><small>' + (i + 1) + " · " + esc(colLabel(id, col.uf)) + "</small><span>" + (v.name ? esc(v.name) + (v.party ? ' <i>' + esc(v.party) + "</i>" : "") : "&nbsp;") + '</span></div><div class="cs-n">' +
          (v.number ? esc(v.number) : '<span class="cs-box" aria-label="' + esc(CL.blank) + '">' + new Array(d + 1).join("<i></i>") + "</span>") + "</div></div>";
      }).join("") +
      '<div class="cs-foot">' + esc(CL.order) + " " + esc(CL.review) + "<br>" + esc(CL.foot) + "</div>";
  }
  document.addEventListener("input", function (e) {
    var t = e.target; if (!col || !t.closest || !t.closest("#colinha")) return;
    var fs = t.closest(".colinha-row"); if (!fs) return;
    var id = fs.getAttribute("data-row"), f = t.getAttribute("data-f");
    if (f === "number") { var clean = t.value.replace(/\D/g, ""); if (clean !== t.value) t.value = clean; }
    col.rows[id][f] = t.value; col.rows[id].party = "";
    colUpdate();
  });
  function colSet(id, p) {
    col.rows[id] = colPerson(p);
    var fs = document.querySelector('#colinha .colinha-row[data-row="' + id + '"]');
    fs.querySelector("[data-f=name]").value = col.rows[id].name; fs.querySelector("[data-f=number]").value = col.rows[id].number;
    colUpdate();
  }
  document.addEventListener("click", function (e) {
    var t = e.target.closest ? e.target : null; if (!t) return; var el;
    if ((el = t.closest("[data-colinha]"))) { openColinha(el.getAttribute("data-colinha")); return; }
    if (!col) return;
    if (t.closest("[data-colinha-close]")) { closeColinha(); return; }
    if (t.closest("[data-colinha-print]")) { colUpdate(); window.print(); return; }
    if ((el = t.closest("[data-colpick]"))) { var id = el.getAttribute("data-colpick"); colSet(id, colOptions(id, col.rec)[+el.getAttribute("data-k")]); return; }
    if ((el = t.closest("[data-colclear]"))) { colSet(el.getAttribute("data-colclear"), null); return; }
    if (t.id === "colinha") closeColinha();
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && col) closeColinha(); });
  window.addEventListener("hashchange", closeColinha);

  /* ---------------------------------------------------------- FONTES */
  function renderSources() {
    var h = pageHero({ crumbs: [["Fontes"]], kicker: "Transparência", title: "Fontes e metodologia",
      dek: "Como separamos fato, decisão judicial, alegação, análise e opinião; de onde vêm os dados; e quando foram atualizados." });
    var datasets = [
      ["Capítulos históricos", EB.site.last_updated],
      ["Candidatos", EB.candidatesMeta.last_updated],
      ["Pesquisas", EB.pollsMeta.last_updated],
      ["Mercados", EB.marketsMeta.captured_at],
      ["ÍRIS / VOGA", EB.iris.captured_at],
      ["Indicações por estado", EB.recsMeta.last_updated]
    ];

    h += '<section class="sec sec--paper sec--tight" id="rotulos"><div class="wrap"><div class="eyebrow">01 · Rótulos</div><h2 class="h-sub" style="margin-bottom:20px">Como ler cada bloco</h2><div class="glossary">' +
      Object.keys(EB.labels).map(function (k) { var L = EB.labels[k]; return '<div class="gl">' + tag(k) + "<p>" + esc(L.desc) + "</p></div>"; }).join("") + "</div>" +
      '<h3 class="h-sub" style="margin:40px 0 12px">Situação jurídica</h3><p style="max-width:720px">Nunca converter acusação em fato. O desfecho recebe o mesmo destaque que a acusação original.</p>' +
      statusRow(["investigacao", "denuncia", "reu", "condenacao", "definitiva"], false) + statusRow(["arquivado", "anulado", "absolvido"], false) + statusRow(["civel", "sem_imputacao", "reportagem", "sem_decisao"], false) + statusRow(["liminar", "acao", "multa", "transitado"], false) + "</div></section>";
    h += '<section class="sec sec--white sec--tight" id="hierarquia"><div class="wrap"><div class="split"><div><div class="eyebrow">02 · Hierarquia de fontes</div><h2 class="h-sub" style="margin-bottom:16px">Preferimos, nesta ordem</h2><ol class="hier">' + EB.sourceHierarchy.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ol></div>" +
      '<div id="regras"><div class="eyebrow">03 · Regras editoriais</div><h2 class="h-sub" style="margin-bottom:16px">O que o site se compromete a fazer</h2><div class="rules">' + EB.rules.map(function (r) { return "<div><h4>" + esc(r.t) + "</h4><p>" + esc(r.d) + "</p></div>"; }).join("") + "</div></div></div></div></section>";
    h += '<section class="sec sec--paper sec--tight" id="fontes-capitulo"><div class="wrap"><div class="eyebrow">04 · Fontes por seção</div><h2 class="h-sub" style="margin-bottom:20px">De onde vem cada parte</h2><div class="src-groups">' +
      EB.chapters.map(function (c) { return '<div class="src-group"><a class="h" href="' + (c.isStakes ? "#/em-jogo" : "#/historia/" + c.id) + '"><small>Capítulo ' + c.num + "</small><h4>" + esc(c.kicker) + '</h4></a><ul class="src-list">' + c.sources.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ul></div>"; }).join("") +
      '<div class="src-group"><h4>Candidatos</h4><ul class="src-list"><li><a href="https://divulgacandcontas.tse.jus.br/divulga/#/home" target="_blank" rel="noopener noreferrer">TSE — DivulgaCandContas</a> e <a href="https://dadosabertos.tse.jus.br/pt_BR/dataset/candidatos-2026" target="_blank" rel="noopener noreferrer">Dados Abertos · Candidatos 2026</a> (registros e planos de governo).</li><li>Senado, Câmara, governos estaduais e Presidência — biografias e experiência.</li><li>Fontes judiciais e jornalísticas listadas em cada perfil.</li>' + EB.candidates.map(function (c) { return '<li><a href="#/candidatos/' + c.id + '">' + esc(c.name) + "</a> — " + (c.sources || []).length + " fontes no perfil</li>"; }).join("") + "</ul></div>" +
      '<div class="src-group"><h4>Pesquisas</h4><ul class="src-list"><li>Relatórios integrais dos institutos.</li><li>TSE / PesqEle para registros.</li><li>Páginas dos institutos e contratantes.</li></ul></div>' +
      '<div class="src-group"><h4>Mercados</h4><ul class="src-list"><li><a href="https://polymarket.com/" target="_blank" rel="noopener noreferrer">polymarket.com</a></li><li><a href="https://kalshi.com/" target="_blank" rel="noopener noreferrer">kalshi.com</a></li></ul></div>' +
      '<div class="src-group"><h4>ÍRIS / VOGA</h4><ul class="src-list"><li><a href="https://voga-iris.com/" target="_blank" rel="noopener noreferrer">voga-iris.com</a></li><li><a href="https://voga-iris.com/metodologia" target="_blank" rel="noopener noreferrer">voga-iris.com/metodologia</a></li></ul></div>' +
      '<div class="src-group"><h4>Indicações pessoais</h4><ul class="src-list"><li><a href="https://peterapoia.com/" target="_blank" rel="noopener noreferrer">peterapoia.com</a></li></ul></div>' +
      '<div class="src-group"><h4>Fotos oficiais</h4><ul class="src-list"><li><a href="https://dadosabertos.tse.jus.br/pt_BR/dataset/candidatos-2026" target="_blank" rel="noopener noreferrer">TSE — Portal de Dados Abertos · Candidatos 2026</a> (recursos “BR - Fotos de candidatos” e “UF - Fotos de candidatos”).</li><li>Correspondência pelo cadastro oficial do TSE: UF, cargo, número, nome de urna e partido.</li></ul></div>' +
      '<div class="src-group"><h4>Mapa</h4><ul class="src-list"><li><a href="https://servicodados.ibge.gov.br/api/docs/malhas?versao=3" target="_blank" rel="noopener noreferrer">IBGE — API de Malhas Territoriais</a> (divisão por UF).</li></ul></div>' +
      "</div></div></section>";
    h += '<section class="sec sec--white sec--tight" id="atualizacao"><div class="wrap"><div class="split"><div><div class="eyebrow">05 · Atualização dos dados</div><h2 class="h-sub" style="margin-bottom:16px">Quando cada base foi atualizada</h2><div class="table-scroll"><table class="fresh"><thead><tr><th>Base</th><th>Última atualização</th></tr></thead><tbody>' +
      datasets.map(function (d) { return "<tr><td>" + esc(d[0]) + '</td><td class="mono">' + (d[1] ? dmy(d[1]) : pend()) + "</td></tr>"; }).join("") + "</tbody></table></div></div>" +
      '<div id="correcoes">' +
      '<div class="blk c" style="margin-top:24px">' + tag("ctx") + '<h4 class="blk-title">Registro de correções</h4><p>Nenhuma correção registrada nesta versão.</p></div></div></div></div></section>';
    app.innerHTML = h;
  }

  function render404() {
    app.innerHTML = pageHero({ title: "Página não encontrada", dek: "O endereço pode ter mudado.", after: '<div class="hero-cta"><a class="btn btn--solid" href="#/">Voltar ao início</a></div>' });
  }

  /* ---------------------------------------------------------- ROTEADOR */
  function parse() {
    var raw = location.hash.replace(/^#/, "");
    if (raw && raw[0] !== "/") return { anchorOnly: raw };
    var anchor = null, i = raw.indexOf("#", 1);
    if (i > -1) { anchor = raw.slice(i + 1); raw = raw.slice(0, i); }
    var q = {}, qi = raw.indexOf("?");
    if (qi > -1) { raw.slice(qi + 1).split("&").forEach(function (kv) { var p = kv.split("="); if (p[0]) q[decodeURIComponent(p[0])] = decodeURIComponent(p[1] || ""); }); raw = raw.slice(0, qi); }
    var parts = raw.split("/").filter(Boolean);
    return { parts: parts, q: q, anchor: anchor };
  }
  function currentPath() { return parse().parts ? parse().parts.join("/") : ""; }
  var lastKey = null, lastSec = null;
  /* Slugs de rota por idioma. Chaves internas = slugs em português. */
  var SLUGS = { historia: "history", "em-jogo": "at-stake", candidatos: "candidates", comparar: "compare", pesquisas: "polls", mercados: "markets", iris: "iris", estados: "states", fontes: "sources" };
  var SLUG_IN = {}; Object.keys(SLUGS).forEach(function (k) { SLUG_IN[SLUGS[k]] = k; });

  /* Seletor de idioma: mantém a página equivalente (#/candidatos/lula ↔ #/candidates/lula). */
  /* Endereços relativos só em teste local (arquivo aberto direto ou localhost); publicado, usa os domínios de EB.site.urls. */
  function isLocal() { return location.protocol === "file:" || /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname); }
  function langHref(to) {
    var raw = location.hash.replace(/^#/, "");
    if (raw && raw[0] === "/") {
      var m = raw.match(/^\/([^/?#]*)(.*)$/), seg = m[1], rest = m[2];
      var key = SLUG_IN[seg] || seg;
      seg = to === "en" ? (SLUGS[key] || key) : key;
      raw = "/" + seg + rest;
    }
    var hash = raw ? "#" + raw : "";
    if (to === LANG) return hash || "#/";
    var base;
    if (!isLocal()) base = EB.site.urls[to];
    else if (location.protocol === "file:") base = to === "en" ? "en/index.html" : "../index.html";
    else base = to === "en" ? "en/" : "../";
    return base + hash;
  }
  function updateLangLinks() { [].forEach.call(document.querySelectorAll("[data-lang]"), function (a) { a.setAttribute("href", langHref(a.getAttribute("data-lang"))); }); }

  function route() {
    var r = parse();
    if (r.anchorOnly) { var el = document.getElementById(r.anchorOnly); if (el) el.scrollIntoView(); return; }
    var p = r.parts; if (p[0] && SLUG_IN[p[0]]) p[0] = SLUG_IN[p[0]];
    var sec = p[0] || "", navKey = sec;
    var key = p.join("/") + "?" + JSON.stringify(r.q);
    var same = key === lastKey, prevSec = lastSec; lastKey = key; lastSec = sec;
    if (!same && sec === "estados" && prevSec === "estados" && document.getElementById("state-panel")) {
      updateStates(p[1]); updateLangLinks(); return;
    }
    if (!same) {
      if (!sec) renderHome();
      else if (sec === "historia" && !p[1]) renderHistoryIndex();
      else if (sec === "historia") renderChapter(p[1]);
      else if (sec === "em-jogo") renderChapter("por-que-2026-importa");
      else if (sec === "candidatos" && !p[1]) renderCandidates();
      else if (sec === "candidatos") { renderProfile(p[1]); }
      else if (sec === "comparar") renderCompare(r.q);
      else if (sec === "pesquisas") renderPolls(r.q);
      else if (sec === "mercados") { renderMarkets(); navKey = "pesquisas"; }
      else if (sec === "iris") { renderIris(); navKey = "pesquisas"; }
      else if (sec === "estados") renderStates(p[1]);
      else if (sec === "fontes") renderSources();
      else render404();
      if (sec === "mercados" || sec === "iris") navKey = "pesquisas";
      setNav(navKey);
      setTitle(sec, p);
      updateLangLinks();
      closeMenu();
      afterRender();
    }
    if (r.anchor) { var a = document.getElementById(r.anchor); if (a) { setTimeout(function () { a.scrollIntoView(); }, same ? 0 : 30); } }
    else if (!same) window.scrollTo(0, 0);
  }

  function setTitle(sec, p) {
    var map = { "": "", historia: "História", "em-jogo": "O que está em jogo", candidatos: "Candidatos", comparar: "Comparar", pesquisas: "Pesquisas", mercados: "Mercados de previsão", iris: "Modelo ÍRIS / VOGA", estados: "Estados", fontes: "Fontes e metodologia" };
    var t = map[sec] || "";
    if (sec === "historia" && p[1]) { var c = byId(EB.chapters, p[1]); if (c) t = c.kicker; }
    if (sec === "candidatos" && p[1]) { var k = cand(p[1]); if (k) t = k.name; }
    document.title = t ? t + " — Além da Urna" : "Além da Urna — Eleições Brasil 2026";
  }
  function setNav(key) {
    [].forEach.call(document.querySelectorAll("#nav a"), function (a) { a.classList.toggle("is-active", a.getAttribute("data-nav") === key); });
    [].forEach.call(document.querySelectorAll("#drawer a"), function (a) { a.classList.toggle("is-active", a.getAttribute("data-nav") === key); });
  }

  /* ---------------------------------------------------------- COMPORTAMENTOS */
  var io = "IntersectionObserver" in window ? new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } }); }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }) : null;
  if (!io) document.documentElement.classList.add("no-io");
  function observe(root) { if (!io) return; [].forEach.call((root || document).querySelectorAll(".reveal, .grow"), function (el) { io.observe(el); }); }

  var tocIO = null;
  function afterRender() {
    observe(app);
    var td = app.querySelector(".toc details"); if (td && window.matchMedia("(min-width: 1040px)").matches) td.open = true;
    if (tocIO) { tocIO.disconnect(); tocIO = null; }
    var secs = app.querySelectorAll(".article-sec[id^='s-']");
    if (secs.length && "IntersectionObserver" in window) {
      tocIO = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { [].forEach.call(app.querySelectorAll("[data-toc]"), function (a) { a.classList.toggle("is-active", a.getAttribute("data-toc") === e.target.id); }); } }); }, { rootMargin: "-30% 0px -60% 0px" });
      [].forEach.call(secs, function (s) { tocIO.observe(s); });
    }
    try { app.focus({ preventScroll: true }); } catch (e) {}
  }

  document.addEventListener("click", function (e) {
    var t = e.target.closest ? e.target : null; if (!t) return;
    var el;
    if ((el = t.closest("[data-lang]"))) { var to = el.getAttribute("data-lang"); if (to === LANG) { e.preventDefault(); return; } el.setAttribute("href", langHref(to)); return; }
    if ((el = t.closest("[data-scroll]"))) { e.preventDefault(); var id = el.getAttribute("href").slice(1); var target = document.getElementById(id); if (target) target.scrollIntoView({ behavior: "smooth" }); return; }
    if ((el = t.closest("[data-toggle-cmp]"))) {
      var id2 = el.getAttribute("data-toggle-cmp"), i = selected.indexOf(id2);
      if (i > -1) selected.splice(i, 1); else if (selected.length < 4) selected.push(id2);
      var on = selected.indexOf(id2) > -1; el.classList.toggle("on", on); el.setAttribute("aria-pressed", on); el.textContent = on ? "✓ No comparador" : "+ Comparar";
      updateCmpBar(); return;
    }
    if ((el = t.closest("[data-pick]"))) { var pid = el.getAttribute("data-pick"), k = selected.indexOf(pid); if (k > -1) selected.splice(k, 1); else if (selected.length < 4) selected.push(pid); drawCompare(); return; }
    if (t.closest("[data-clear]")) { selected = []; drawCompare(); return; }
    if ((el = t.closest("[data-dim]"))) { cmpDim = el.getAttribute("data-dim"); drawCompare(); return; }
    if ((el = t.closest("[data-ptab]"))) { pollTab = el.getAttribute("data-ptab"); [].forEach.call(document.querySelectorAll("[role=tab][data-ptab]"), function (b) { b.setAttribute("aria-selected", b.getAttribute("data-ptab") === pollTab); }); try { history.replaceState(null, "", "#/pesquisas?v=" + pollTab); } catch (x) {} drawPolls(); return; }
    if ((el = t.closest("[data-pdetail]"))) { var row = document.getElementById("pd-" + el.getAttribute("data-pdetail")); if (row) row.hidden = !row.hidden; return; }
    if ((el = t.closest("[data-uf]"))) { location.hash = "#/estados/" + el.getAttribute("data-uf"); return; }
  });
  document.addEventListener("change", function (e) { if (e.target && e.target.id === "uf-select" && e.target.value) location.hash = "#/estados/" + e.target.value; });

  /* Menu mobile */
  var burger = document.getElementById("burger"), drawer = document.getElementById("drawer");
  drawer.innerHTML = '<a href="#/" data-nav="">Início <span>00</span></a><a href="#/historia" data-nav="historia">História <span>01–06</span></a>' +
    EB.chapters.filter(function (c) { return !c.isStakes; }).map(function (c) { return '<a class="sub" href="#/historia/' + c.id + '">' + esc(c.kicker) + " <span>" + c.num + "</span></a>"; }).join("") +
    '<a href="#/em-jogo" data-nav="em-jogo">Em jogo <span>07</span></a><a href="#/candidatos" data-nav="candidatos">Candidatos <span>' + EB.candidates.length + '</span></a><a href="#/comparar" data-nav="comparar">Comparar <span>2–4</span></a>' +
    '<a href="#/pesquisas" data-nav="pesquisas">Pesquisas <span>1</span></a><a class="sub" href="#/mercados">Mercados de previsão <span>2</span></a><a class="sub" href="#/iris">Modelo ÍRIS / VOGA <span>3</span></a>' +
    '<a href="#/estados" data-nav="estados">Estados <span>27</span></a><a href="#/fontes" data-nav="fontes">Fontes <span>↗</span></a>';
  var hdrLang = document.querySelector(".site-header .lang");
  if (hdrLang) { var dl = hdrLang.cloneNode(true); dl.removeAttribute("id"); drawer.appendChild(dl); }
  function closeMenu() { document.body.classList.remove("menu-open"); burger.setAttribute("aria-expanded", "false"); }
  burger.addEventListener("click", function () { var open = document.body.classList.toggle("menu-open"); burger.setAttribute("aria-expanded", open); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMenu();
    var t = e.target;
    if ((e.key === "Enter" || e.key === " ") && t && t.getAttribute && t.getAttribute("data-uf") && t.classList.contains("uf-shape")) { e.preventDefault(); location.hash = "#/estados/" + t.getAttribute("data-uf"); }
  });

  /* Progresso e voltar ao topo */
  var bar = document.getElementById("progress"), top = document.getElementById("to-top"), ticking = false;
  function onScroll() { var h = document.documentElement, max = h.scrollHeight - h.clientHeight, y = h.scrollTop || document.body.scrollTop; bar.style.transform = "scaleX(" + (max > 0 ? y / max : 0) + ")"; top.classList.toggle("show", y > 900); ticking = false; }
  window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  top.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });

  document.getElementById("footer-upd").textContent = "Atualizado em " + dmy(EB.site.last_updated);
  window.addEventListener("hashchange", route);
  route();
})();
