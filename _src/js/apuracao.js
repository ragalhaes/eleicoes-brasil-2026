/* =========================================================
   APURAÇÃO AO VIVO — 2º turno, Presidente (25/10/2026)
   Rota: #/apuracao (PT) · #/results (EN). Feita para ficar aberta numa TV.
   Fonte única: arquivo oficial do TSE br-c0001-e006258-u.json (ele2026 / 6258 / dados / br).
   - Consulta a cada ~15 s com revalidação HTTP (cache: "no-cache" → If-None-Match /
     If-Modified-Since enviados pelo navegador; o TSE responde 304 quando nada mudou).
   - CORS conferido em 20/10/2026: o TSE devolve Access-Control-Allow-Origin para
     alemdaurna.com e brazilbeyondtheballot.com, então não é preciso Worker/proxy.
   - Falha de rede: mantém os últimos dados válidos e tenta de novo (espera crescente).
   - Sem projeção, sem estimativa de vencedor. "Eleito" só aparece se o próprio
     arquivo do TSE trouxer cand.e = "s" ou cand.st = "Eleito".
   Modos de teste (mesmo código de leitura e de tela, só a origem dos dados muda):
     #/apuracao?teste=1       simulação local, candidatos fictícios, apuração acelerada
     #/apuracao?teste=sp2024  arquivo oficial do TSE de outra eleição (2º turno SP 2024, final)
   ========================================================= */
(function () {
  "use strict";
  var EB = window.EB, LANG = EB.lang || "pt";
  var TSE = "https://resultados.tse.jus.br/oficial/";
  var SOURCES = {
    oficial: { url: TSE + "ele2026/6258/dados/br/br-c0001-e006258-u.json", fotos: TSE + "ele2026/6258/fotos/br/", file: "br-c0001-e006258-u.json" },
    sp2024: { url: TSE + "ele2024/620/dados/sp/sp71072-c0011-e000620-u.json", fotos: TSE + "ele2024/620/fotos/sp/", file: "sp71072-c0011-e000620-u.json", test: "sp2024" }
  };
  var INTERVAL = 15000, MAX_BACKOFF = 60000;

  var TX = {
    pt: {
      title: "Apuração ao vivo", sub: "Presidente da República · 2º turno · 25/10/2026", brand: "Além da Urna",
      st_wait: "Aguardando início da apuração", st_wait_d: "O TSE ainda não divulgou seções totalizadas. A tela se atualiza sozinha.",
      st_live: "Apuração em andamento", st_done: "Totalização concluída pelo TSE", st_load: "Conectando ao TSE…",
      elected: "Eleito · TSE", not_elected: "Não eleito · TSE", vice: "Vice", votes: "votos", valid_pct: "dos votos válidos",
      sections: "seções totalizadas", of: "de", sec_total: "seções",
      valid: "Votos válidos", blank: "Brancos", null_: "Nulos", total: "Total de votos computados", electorate: "Eleitorado",
      diff: "Diferença", diff_votes: "votos", diff_pp: "pontos percentuais", ahead: "à frente", tie: "Empate", diff_note: "Calculada pelo site a partir dos números do TSE.",
      updated: "Atualizado pelo TSE", brt: "horário de Brasília", at: "às",
      last_check: "Última consulta", ok: "Conectado", stale: "Sem conexão: mostrando os últimos dados válidos", retry: "nova tentativa em",
      source: "Fonte: Tribunal Superior Eleitoral (TSE) · resultados.tse.jus.br", file: "Arquivo",
      rule: "Sem projeções e sem estimativa de vencedor. Resultado definitivo só quando o TSE indicar.",
      fullscreen: "Tela cheia", now: "Agora em Brasília",
      test_sim: "MODO TESTE · SIMULAÇÃO · candidatos e números fictícios · não são dados do TSE",
      test_sp: "MODO TESTE · arquivo oficial do TSE de OUTRA eleição (2º turno de São Paulo, 2024) · não é a eleição de 2026",
      nodata: "Ainda sem resposta do TSE. Tentando de novo…", s: "s",
      hb_k: "Ao vivo · 25 de outubro", hb_t: "Apuração do 2º turno para Presidente", hb_d: "Resultados oficiais do TSE em tempo real, atualizados a cada 15 segundos.", hb_cta: "Acompanhar a apuração", hb_href: "#/apuracao"
    },
    en: {
      title: "Live count", sub: "President of Brazil · Runoff · Oct. 25, 2026", brand: "Brazil Beyond the Ballot",
      st_wait: "Waiting for the count to start", st_wait_d: "The TSE has not released any tallied polling sections yet. This screen updates on its own.",
      st_live: "Count in progress", st_done: "Tally completed by the TSE", st_load: "Connecting to the TSE…",
      elected: "Elected · TSE", not_elected: "Not elected · TSE", vice: "Running mate", votes: "votes", valid_pct: "of valid votes",
      sections: "polling sections tallied", of: "of", sec_total: "sections",
      valid: "Valid votes", blank: "Blank", null_: "Null", total: "Total votes counted", electorate: "Registered voters",
      diff: "Gap", diff_votes: "votes", diff_pp: "percentage points", ahead: "ahead", tie: "Tie", diff_note: "Calculated by the site from TSE figures.",
      updated: "Updated by the TSE", brt: "Brasília time", at: "at",
      last_check: "Last check", ok: "Connected", stale: "Offline: showing the last valid data", retry: "retrying in",
      source: "Source: Superior Electoral Court (TSE) · resultados.tse.jus.br", file: "File",
      rule: "No projections and no winner estimate. A final result appears only when the TSE flags it.",
      fullscreen: "Full screen", now: "Now in Brasília",
      test_sim: "TEST MODE · SIMULATION · fictitious candidates and numbers · not TSE data",
      test_sp: "TEST MODE · official TSE file from ANOTHER election (São Paulo mayoral runoff, 2024) · not the 2026 election",
      nodata: "No response from the TSE yet. Retrying…", s: "s",
      hb_k: "Live · October 25", hb_t: "Presidential runoff count", hb_d: "Official TSE results in real time, updated every 15 seconds.", hb_cta: "Follow the count", hb_href: "#/results"
    }
  }[LANG];

  function esc(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function int(x) { var n = parseInt(String(x == null ? "" : x).replace(/\D/g, ""), 10); return isNaN(n) ? 0 : n; }
  function dec(x) { var n = parseFloat(String(x == null ? "" : x).replace(",", ".")); return isNaN(n) ? 0 : n; }
  function nf(n) { return n.toLocaleString(LANG === "en" ? "en-US" : "pt-BR"); }
  function pf(n, d) { return n.toLocaleString(LANG === "en" ? "en-US" : "pt-BR", { minimumFractionDigits: d, maximumFractionDigits: d }); }
  function initials(n) { var w = n.split(/\s+/).filter(Boolean); return ((w[0] || "?")[0] + (w.length > 1 ? w[w.length - 1][0] : "")).toUpperCase(); }

  /* ---------------------------------------------------------- leitura do arquivo do TSE */
  function parse(doc) {
    var carg = (doc.carg || [])[0] || {}, cands = [];
    (carg.agr || []).forEach(function (a) {
      (a.par || []).forEach(function (p) {
        (p.cand || []).forEach(function (c) {
          var vice = (c.vs || []).filter(function (v) { return v.tp === "v"; })[0];
          cands.push({ n: c.n, sq: c.sqcand, nm: c.nm, nmu: c.nmu || c.nm, seq: int(c.seq), party: p.sg, coal: a.tp === "c" ? a.nm : "",
            vice: vice ? vice.nmu || vice.nm : "", viceParty: vice ? vice.sgp : "",
            vap: int(c.vap), pvap: c.pvap || "0,00", pvapn: dec(c.pvapn || c.pvap), e: c.e, st: c.st || "" });
        });
      });
    });
    cands.sort(function (a, b) { return a.seq - b.seq || a.n - b.n; });
    var s = doc.s || {}, v = doc.v || {}, e = doc.e || {};
    return {
      cargo: carg.nmn || "", cands: cands,
      ts: int(s.ts), st: int(s.st), pst: s.pst || "0,00", pstn: dec(s.pstn || s.pst),
      vv: int(v.vv), vb: int(v.vb), vn: int(v.vn), tv: int(v.tv), te: int(e.te),
      dg: doc.dg || "", hg: doc.hg || "", tf: doc.tf, and: doc.and, idg: doc.idg || ""
    };
  }
  function isElected(c) { return c.e === "s" || /^eleito/i.test(c.st); }
  function isNotElected(c) { return /n[ãa]o eleito/i.test(c.st); }

  /* ---------------------------------------------------------- origens de dados */
  function officialSource(cfg) {
    var lastMod = null;
    return {
      cfg: cfg,
      get: function () {
        /* "no-cache": o navegador revalida com o TSE (If-None-Match/If-Modified-Since) e
           reaproveita o corpo em cache quando a resposta é 304. */
        return fetch(cfg.url, { cache: "no-cache", credentials: "omit", mode: "cors" }).then(function (r) {
          if (!r.ok) throw new Error("HTTP " + r.status);
          var lm = r.headers.get("Last-Modified");
          if (lm && lm === lastMod && state.data) return { same: true };
          lastMod = lm;
          return r.json().then(function (doc) { return { doc: doc }; });
        });
      }
    };
  }
  /* Simulação: gera documentos no MESMO formato do TSE, com candidatos fictícios. */
  function simSource() {
    var t0 = Date.now(), DUR = 150000, TS = 499248, TE = 158745502, step = 0;
    return {
      cfg: { fotos: "", file: "simulacao (" + (LANG === "en" ? "local" : "local") + ")", test: "sim" },
      get: function () {
        step++;
        return new Promise(function (res, rej) {
          setTimeout(function () {
            if (step % 9 === 0) return rej(new Error("falha simulada"));        /* testa a reconexão */
            var el = Date.now() - t0, k = el < 15000 ? 0 : Math.min(1, (el - 15000) / DUR);
            if (step % 5 === 0 && k > 0 && k < 1) return res({ same: true });   /* testa "arquivo sem mudança" */
            var st = Math.round(TS * k), tv = Math.round(TE * 0.79 * k), vb = Math.round(tv * 0.016), vn = Math.round(tv * 0.033), vv = tv - vb - vn;
            var shareA = 0.5 + 0.035 * Math.sin(k * 5.2) - 0.012 * k, a = Math.round(vv * shareA), b = vv - a;
            var pA = vv ? a / vv * 100 : 0, pB = vv ? b / vv * 100 : 0, done = k >= 1;
            var p2 = function (x) { return x.toFixed(2).replace(".", ","); };
            var d = new Date(), hh = d.toLocaleTimeString("pt-BR", { timeZone: "America/Sao_Paulo", hour12: false });
            res({ doc: {
              ele: "0000", t: "2", dg: d.toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo" }), hg: hh, idg: String(step), tf: done ? "s" : "n", and: done ? "f" : "p",
              carg: [{ cd: "1", nmn: "Presidente", agr: [
                { tp: "i", nm: "TESTE A", par: [{ sg: "TSTA", cand: [{ n: "91", sqcand: "0", nm: "CANDIDATO TESTE A", nmu: "CANDIDATO TESTE A", seq: "1", e: done ? (a >= b ? "s" : "n") : "n", st: done ? (a >= b ? "Eleito" : "Não eleito") : "", vap: String(a), pvap: p2(pA), pvapn: String(pA), vs: [{ tp: "v", nmu: "VICE TESTE A", sgp: "TSTA" }] }] }] },
                { tp: "i", nm: "TESTE B", par: [{ sg: "TSTB", cand: [{ n: "92", sqcand: "0", nm: "CANDIDATA TESTE B", nmu: "CANDIDATA TESTE B", seq: "2", e: done ? (b > a ? "s" : "n") : "n", st: done ? (b > a ? "Eleito" : "Não eleito") : "", vap: String(b), pvap: p2(pB), pvapn: String(pB), vs: [{ tp: "v", nmu: "VICE TESTE B", sgp: "TSTB" }] }] }] }
              ] }],
              s: { ts: String(TS), st: String(st), pst: p2(st / TS * 100), pstn: String(st / TS * 100) },
              v: { tv: String(tv), vv: String(vv), vb: String(vb), vn: String(vn) },
              e: { te: String(TE) }
            } });
          }, 350);
        });
      }
    };
  }

  /* ---------------------------------------------------------- estado e laço de atualização */
  var state = { data: null, src: null, timer: null, clock: null, fails: 0, lastOk: null, lastTry: null, nextIn: 0, alive: false };
  function schedule(ms) { clearTimeout(state.timer); state.nextIn = Date.now() + ms; state.timer = setTimeout(tick, ms); }
  function tick() {
    if (!state.alive) return;
    state.lastTry = new Date();
    state.src.get().then(function (r) {
      state.fails = 0; state.lastOk = new Date();
      if (r.doc) { var d = parse(r.doc); if (d.cands.length) { var prev = state.data; state.data = d; paint(prev); } }
      paintStatus();
      schedule(state.src.cfg.test === "sim" ? 3000 : INTERVAL + Math.round(Math.random() * 1500));
    }).catch(function () {
      state.fails++;
      paintStatus();
      schedule(Math.min(MAX_BACKOFF, (state.src.cfg.test === "sim" ? 3000 : INTERVAL) * Math.pow(2, Math.min(state.fails - 1, 2))));
    });
  }

  /* ---------------------------------------------------------- tela */
  var root = null;
  function render(app, q) {
    stop();
    var mode = q.teste === "1" || q.test === "1" ? "sim" : (q.teste === "sp2024" || q.test === "sp2024") ? "sp2024" : "oficial";
    state = { data: null, src: mode === "sim" ? simSource() : officialSource(SOURCES[mode]), timer: null, clock: null, fails: 0, lastOk: null, lastTry: null, nextIn: 0, alive: true };
    document.body.classList.add("apu-tv");
    var testBar = mode === "sim" ? TX.test_sim : mode === "sp2024" ? TX.test_sp : "";
    app.innerHTML = '<div class="apu' + (testBar ? " is-test" : "") + '" id="apu" data-state="load">' +
      (testBar ? '<div class="apu-testbar" role="note">' + esc(testBar) + "</div>" : "") +
      '<header class="apu-top"><div class="apu-brand"><a href="#/">' + esc(TX.brand) + '</a><span>' + esc(TX.title) + '</span></div>' +
      '<div class="apu-head"><h1>' + esc(mode === "sp2024" ? (LANG === "en" ? "Mayor of São Paulo · Runoff · 2024 (test)" : "Prefeito de São Paulo · 2º turno · 2024 (teste)") : TX.sub) + '</h1><p class="apu-status" id="apu-status"><i></i><span>' + esc(TX.st_load) + "</span></p></div>" +
      '<div class="apu-clock"><small>' + esc(TX.now) + '</small><b id="apu-clock">--:--:--</b><button type="button" class="apu-fs" id="apu-fs">' + esc(TX.fullscreen) + "</button></div></header>" +
      '<p class="apu-wait" id="apu-wait" hidden>' + esc(TX.st_wait_d) + "</p>" +
      '<section class="apu-cands" id="apu-cands"><div class="apu-empty">' + esc(TX.st_load) + "</div></section>" +
      '<div class="apu-bar" id="apu-bar" aria-hidden="true"><i class="a"></i><i class="b"></i><span class="mid"></span></div>' +
      '<section class="apu-mid"><div class="apu-diff" id="apu-diff"></div><div class="apu-sec" id="apu-sec"></div></section>' +
      '<section class="apu-stats" id="apu-stats"></section>' +
      '<footer class="apu-foot"><span id="apu-upd"></span><span id="apu-conn"></span><span>' + esc(TX.source) + " · " + esc(TX.file) + ": " + esc(state.src.cfg.file || "") + '</span><span class="apu-rule">' + esc(TX.rule) + "</span></footer>" +
      (testBar ? '<div class="apu-wm" aria-hidden="true">' + (LANG === "en" ? "TEST" : "TESTE") + "</div>" : "") + "</div>";
    root = document.getElementById("apu");
    paintStats(null);
    clockTick(); state.clock = setInterval(clockTick, 1000);
    try { if (navigator.wakeLock) navigator.wakeLock.request("screen").catch(function () {}); } catch (e) {}
    tick();
  }
  function stop() {
    if (state.timer) clearTimeout(state.timer);
    if (state.clock) clearInterval(state.clock);
    state.alive = false;
    document.body.classList.remove("apu-tv");
  }
  function clockTick() {
    var el = document.getElementById("apu-clock"); if (!el) return stop();
    try { el.textContent = new Date().toLocaleTimeString("pt-BR", { timeZone: "America/Sao_Paulo", hour12: false }); } catch (e) { el.textContent = new Date().toLocaleTimeString(); }
    if (state.fails && state.nextIn) paintStatus();
  }
  function stageOf(d) {
    if (!d) return "load";
    if (d.tf === "s" || d.and === "f") return "done";
    if (d.st === 0 && d.tv === 0) return "wait";
    return "live";
  }
  function paint(prev) {
    var d = state.data; if (!d || !root) return;
    var stage = stageOf(d), total = 0;
    root.setAttribute("data-state", stage);
    d.cands.forEach(function (c) { total += c.vap; });
    var lead = d.cands.length === 2 && d.cands[0].vap !== d.cands[1].vap ? (d.cands[0].vap > d.cands[1].vap ? 0 : 1) : -1;
    /* candidatos */
    var box = document.getElementById("apu-cands");
    box.innerHTML = d.cands.map(function (c, i) {
      var foto = state.src.cfg.fotos && c.sq && c.sq !== "0" ? state.src.cfg.fotos + c.sq + ".jpeg" : "";
      var badge = isElected(c) ? '<span class="apu-badge win">' + esc(TX.elected) + "</span>" : isNotElected(c) && stage === "done" ? '<span class="apu-badge">' + esc(TX.not_elected) + "</span>" : "";
      return '<article class="apu-cand c' + i + (lead === i && stage !== "wait" ? " is-lead" : "") + (isElected(c) ? " is-elected" : "") + '">' +
        '<div class="apu-photo">' + (foto ? '<img src="' + esc(foto) + '" alt="" referrerpolicy="no-referrer" onerror="this.remove()">' : "") + "<span>" + esc(initials(c.nmu)) + "</span></div>" +
        '<div class="apu-cinfo"><div class="apu-num">' + esc(c.n) + "</div><h2>" + esc(c.nmu) + '</h2><p class="apu-party">' + esc(c.party) + (c.vice ? " · " + esc(TX.vice) + ": " + esc(c.vice) + (c.viceParty ? " (" + esc(c.viceParty) + ")" : "") : "") + "</p>" + badge + "</div>" +
        '<div class="apu-pct"><b data-num="' + c.pvapn + '">' + esc(LANG === "en" ? c.pvap.replace(",", ".") : c.pvap) + "<small>%</small></b><span>" + esc(TX.valid_pct) + "</span></div>" +
        '<div class="apu-votes"><b>' + nf(c.vap) + "</b> " + esc(TX.votes) + "</div></article>";
    }).join("");
    /* barra de votos válidos */
    var bar = document.getElementById("apu-bar");
    if (d.cands.length === 2) {
      var pa = total ? d.cands[0].vap / total * 100 : 50;
      bar.querySelector(".a").style.width = pa + "%"; bar.querySelector(".b").style.width = (100 - pa) + "%";
      bar.classList.toggle("is-zero", !total);
    }
    /* diferença */
    var diff = document.getElementById("apu-diff");
    if (d.cands.length === 2 && stage !== "wait") {
      var dv = Math.abs(d.cands[0].vap - d.cands[1].vap), dp = Math.abs(d.cands[0].pvapn - d.cands[1].pvapn);
      diff.innerHTML = "<small>" + esc(TX.diff) + "</small><b>" + nf(dv) + " <em>" + esc(TX.diff_votes) + "</em></b><b>" + pf(dp, 2) + " <em>" + esc(TX.diff_pp) + "</em></b><span>" +
        (lead > -1 ? esc(d.cands[lead].nmu) + " " + esc(TX.ahead) : esc(TX.tie)) + " · " + esc(TX.diff_note) + "</span>";
    } else diff.innerHTML = "<small>" + esc(TX.diff) + "</small><b>—</b>";
    /* seções */
    document.getElementById("apu-sec").innerHTML = "<small>" + esc(TX.sections) + '</small><b>' + esc(LANG === "en" ? d.pst.replace(",", ".") : d.pst) + '<em>%</em></b><div class="apu-prog"><i style="width:' + Math.min(100, d.pstn) + '%"></i></div><span>' + nf(d.st) + " " + esc(TX.of) + " " + nf(d.ts) + " " + esc(TX.sec_total) + "</span>";
    paintStats(d);
    document.getElementById("apu-wait").hidden = stage !== "wait";
    fit(); setTimeout(fit, 700);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
    if (prev && prev.idg !== d.idg) { root.classList.remove("flash"); void root.offsetWidth; root.classList.add("flash"); }
  }
  /* Encaixa tudo numa tela só (TV): se o conteúdo passar da altura, reduz a escala por igual. */
  function fit() {
    if (!root || window.innerWidth <= 760) { if (root) root.style.zoom = ""; return; }
    var have = window.innerHeight, z = 1;
    root.style.minHeight = ""; root.classList.add("is-measure");
    for (; z > 0.6; z -= 0.02) { root.style.zoom = z === 1 ? "" : z.toFixed(2); if (root.getBoundingClientRect().height <= have - 14) break; }
    root.classList.remove("is-measure");
    if (z < 1) root.style.minHeight = Math.floor(have / z) + "px"; else root.style.zoom = "";
    while (document.documentElement.scrollHeight > have + 1 && z > 0.6) { z -= 0.02; root.style.zoom = z.toFixed(2); root.style.minHeight = Math.floor(have / z) + "px"; }
  }
  window.addEventListener("resize", function () { if (state.alive) fit(); });
  function paintStats(d) {
    var el = document.getElementById("apu-stats"); if (!el) return;
    var rows = [[TX.valid, d && d.vv], [TX.blank, d && d.vb], [TX.null_, d && d.vn], [TX.total, d && d.tv], [TX.electorate, d && d.te]];
    el.innerHTML = rows.map(function (r) { return "<div><small>" + esc(r[0]) + "</small><b>" + (d ? nf(r[1] || 0) : "—") + "</b></div>"; }).join("");
  }
  function paintStatus() {
    var d = state.data, stage = stageOf(d);
    var st = document.getElementById("apu-status"); if (!st) return;
    var txt = stage === "wait" ? TX.st_wait : stage === "live" ? TX.st_live : stage === "done" ? TX.st_done : (state.fails ? TX.nodata : TX.st_load);
    st.className = "apu-status s-" + stage;
    st.querySelector("span").textContent = txt;
    var up = document.getElementById("apu-upd");
    if (up) up.textContent = d && d.dg ? TX.updated + ": " + d.dg + " " + TX.at + " " + d.hg + " (" + TX.brt + ")" : "";
    var cn = document.getElementById("apu-conn");
    if (cn) {
      var lt = "—"; if (state.lastOk) { try { lt = state.lastOk.toLocaleTimeString("pt-BR", { timeZone: "America/Sao_Paulo", hour12: false }); } catch (x) { lt = state.lastOk.toLocaleTimeString(); } }
      if (state.fails) {
        var secs = Math.max(0, Math.round((state.nextIn - Date.now()) / 1000));
        cn.className = "is-bad"; cn.textContent = TX.stale + " · " + TX.last_check + ": " + lt + " · " + TX.retry + " " + secs + TX.s;
      } else { cn.className = "is-ok"; cn.textContent = TX.ok + " · " + TX.last_check + ": " + lt; }
    }
  }
  document.addEventListener("click", function (e) {
    var b = e.target && e.target.closest && e.target.closest("#apu-fs"); if (!b) return;
    var el = document.documentElement;
    try { if (document.fullscreenElement) document.exitFullscreen(); else if (el.requestFullscreen) el.requestFullscreen().catch(function () {}); } catch (x) {}
  });
  /* esconde o cursor depois de alguns segundos parado (tela de TV) */
  var curT = null;
  document.addEventListener("mousemove", function () {
    if (!state.alive) return;
    document.body.classList.remove("apu-nocursor"); clearTimeout(curT);
    curT = setTimeout(function () { if (state.alive) document.body.classList.add("apu-nocursor"); }, 4000);
  });

  /* Faixa de acesso na página inicial (até o fim do dia seguinte ao 2º turno, em Brasília). */
  function homeBanner() {
    if (Date.now() > Date.UTC(2026, 9, 27, 3, 0, 0)) return "";
    return '<a class="apu-hb" href="' + TX.hb_href + '"><span class="apu-hb-k"><i></i>' + esc(TX.hb_k) + '</span><span class="apu-hb-t"><b>' + esc(TX.hb_t) + "</b><small>" + esc(TX.hb_d) + '</small></span><span class="apu-hb-cta">' + esc(TX.hb_cta) + " →</span></a>";
  }
  window.APURACAO = { render: render, stop: stop, label: TX.title, homeBanner: homeBanner, _parse: parse };
})();
