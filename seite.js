// KOLO AUDIO – Menü, Texte aus config.js, Formulare („Coming soon“, bis Shop/Download angebunden sind), Affiliate-Weitergabe für KOLO GRIT.
// 228: Datumssperre bis zum Erscheinen (ausgegraut), Wortmarke einfarbig/farbig (?wortmarke=farbig), Hörbeispiele, Platzhalter-Links.
(function () {
  const K = window.KOLO, $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const q = new URLSearchParams(location.search);
  document.documentElement.dataset.schrift = /^[abc]$/.test(q.get("schrift")) ? q.get("schrift") : "a";
  document.documentElement.dataset.datum = "a1";
  document.documentElement.dataset.wortmarke = q.get("wortmarke") === "farbig" ? "farbig" : "einfarbig";   // 228: Kim entscheidet
  const istPlatzhalter = (v) => !v || /^[A-Z0-9_]+$/.test(v);
  const t = K.text[document.documentElement.lang] || K.text.en;
  $$("[data-t]").forEach((el) => { const v = t[el.dataset.t]; if (typeof v === "string") el.textContent = v; });
  $$("[data-t-ph]").forEach((el) => { const v = t[el.dataset.tPh]; if (v) el.placeholder = v; });
  $$("[data-preiszeile]").forEach((el) => { el.textContent = t.priceLine(K.price); });
  // € steht in der Titelschrift (Michroma) nicht zur Verfügung -> eigene Spanne in der Fließtextschrift
  const betrag = (el, n) => { el.textContent = `${n}`; const w = document.createElement("span"); w.className = "waehrung"; w.textContent = ` ${K.price.currency}`; el.appendChild(w); };
  $$("[data-preis-intro]").forEach((el) => betrag(el, K.price.intro));
  $$("[data-preis-regular]").forEach((el) => betrag(el, K.price.regular));
  $$("[data-preis-bis]").forEach((el) => { el.textContent = t.priceUntil(K.price); });

  // Wortmarke KOLO GRIT (133): Rahmen genau um Pfad + Schrift legen, sobald Michroma geladen ist
  const passe = () => $$("[data-wortmarke]").forEach((s) => { const b = s.getBBox(), r = 1.6; s.setAttribute("viewBox", `${b.x - r} ${b.y - r} ${b.width + 2 * r} ${b.height + 2 * r}`); });
  (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(passe);

  // 228: bis zum Erscheinen ausgegraut (Kauf, Testversion, GRIT-Download); Hinweis „Available …“ nur bis dahin
  const heute = q.get("heute") || new Date().toISOString().slice(0, 10);   // ?heute=2026-12-15 zum Prüfen
  $$("[data-ab]").forEach((el) => { if (heute < el.dataset.ab) { el.classList.add("gesperrt"); el.setAttribute("aria-disabled", "true"); if (el.tagName === "BUTTON") el.disabled = true; } });
  $$("[data-ab-hinweis]").forEach((el) => { el.hidden = heute >= el.dataset.abHinweis; });
  const gesperrt = (el) => el.classList.contains("gesperrt");

  const mk = $(".kopf-menu"), menu = $("#menu");
  const menuZu = () => { mk.setAttribute("aria-expanded", "false"); menu.hidden = true; };
  mk.addEventListener("click", () => { const auf = mk.getAttribute("aria-expanded") !== "true"; mk.setAttribute("aria-expanded", String(auf)); menu.hidden = !auf; if (auf) $("a", menu).focus(); });
  $$("a", menu).forEach((a) => a.addEventListener("click", menuZu));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !menu.hidden) { menuZu(); mk.focus(); } });

  const toast = $(".toast"); let tz;
  const zeige = (msg) => { toast.textContent = msg; toast.hidden = false; clearTimeout(tz); tz = setTimeout(() => (toast.hidden = true), 4200); };
  const affiliate = q.get("aff") || "";

  $$("[data-grit-form]").forEach((gf) => gf.addEventListener("submit", (e) => {
    e.preventDefault();
    if (gesperrt($("button", gf)) || istPlatzhalter(K.links.checkoutGrit)) { zeige(t.soon); return; }
    const u = new URL(K.links.checkoutGrit); u.searchParams.set("checkout[email]", $("input", gf).value); if (affiliate) u.searchParams.set("aff", affiliate);
    location.href = u.toString();
  }));
  const link = (sel, key) => $$(sel).forEach((a) => a.addEventListener("click", (e) => {
    const ziel = K.links[typeof key === "function" ? key(a) : key];
    if (gesperrt(a) || istPlatzhalter(ziel)) { e.preventDefault(); zeige(t.soon); } else a.href = ziel;
  }));
  link("[data-kauf]", "checkoutKolorit"); link("[data-test]", "trialKolorit"); link("[data-dl]", (a) => a.dataset.dl);
  $$("[data-soon]").forEach((a) => a.addEventListener("click", (e) => { e.preventDefault(); zeige(t.soon); }));

  // 228: Hörbeispiele – zwei gleich große Knöpfe, Wechsel spielt an derselben Stelle weiter (audio/<name>_original.mp3, audio/<name>_kolorit.mp3)
  const hinweis = $("[data-klang-hinweis]"); if (hinweis) hinweis.hidden = !!K.soundsReady;
  let aktiv = null;
  $$("[data-spieler]").forEach((sp) => {
    const name = sp.dataset.spieler, quellen = {};
    $$("[data-quelle]", sp).forEach((b) => {
      if (!K.soundsReady) { b.disabled = true; b.classList.add("gesperrt"); return; }
      quellen[b.dataset.quelle] = new Audio(`audio/${name}_${b.dataset.quelle}.mp3`); quellen[b.dataset.quelle].preload = "none"; quellen[b.dataset.quelle].loop = true;
      b.addEventListener("click", () => {
        const neu = quellen[b.dataset.quelle], alt = aktiv && aktiv.audio;
        const pos = alt && aktiv.spieler === sp ? alt.currentTime : 0;
        if (alt) alt.pause();
        if (aktiv && aktiv.knopf === b) { aktiv.knopf.setAttribute("aria-pressed", "false"); aktiv = null; return; }
        $$("[data-quelle]").forEach((x) => x.setAttribute("aria-pressed", "false"));
        neu.currentTime = pos; neu.play(); b.setAttribute("aria-pressed", "true"); aktiv = { spieler: sp, audio: neu, knopf: b };
      });
    });
  });
})();
// 228: Nachmessen (nur mit ?messen=1): Kanten der wichtigen Blöcke als Text
(function () {
  if (new URLSearchParams(location.search).get("messen") !== "1") return;
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => setTimeout(() => {
    const z = [".plugin-kolorit", ".plugin-kolorit img", ".plugin-kolorit .banderole", ".plugin-kolorit .banderole span"].flatMap((s) => [...document.querySelectorAll(s)].map((e) => {
      const b = e.getBoundingClientRect(); return `${s}: l ${b.left.toFixed(1)} r ${b.right.toFixed(1)} o ${(b.top + scrollY).toFixed(1)} u ${(b.bottom + scrollY).toFixed(1)}`; }));
    const p = document.createElement("pre"); p.id = "mess"; p.textContent = "BREITE " + innerWidth + "\n" + z.join("\n"); document.body.appendChild(p);
  }, 300));
})();
// 235b (9): vor/ab Launch steuert das Kopf-Skript über <html class="ab"> (CSS .nur-vor / .nur-ab), kein Hinweisfenster mehr.
// 235 (4, 5): Textspalten neben den Modulbildern eng um den Text legen (wie im Pult)
(function () {
  const eng = () => document.querySelectorAll(".ptext .pseite .pl,.ptext .pseite .pr").forEach((p) => {
    p.style.width = ""; if (getComputedStyle(p).justifySelf === "stretch") return;
    const r = document.createRange(); r.selectNodeContents(p); let l = 1e9, rr = -1e9;
    for (const q of r.getClientRects()) { l = Math.min(l, q.left); rr = Math.max(rr, q.right); }
    if (rr > l) p.style.width = Math.ceil(rr - l + 1) + "px";
  });
  if (!document.querySelector(".ptext")) return;
  addEventListener("resize", () => requestAnimationFrame(eng));
  (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(eng); setTimeout(eng, 300);
})();

/* 238 Startseite (ab 601 px): 8 GRIT-Abteil so hoch wie das KOLORIT-Abteil (--khoehe für stil.css);
   9 sichtbarer Abstand GRIT-Plugin ↔ Text = 2,45 % der GRIT-Bühnenbreite (2,45 cqw), Plugin + Text zusammen waagerecht mittig – wie Kims Pult */
(function () {
  var k = document.querySelector(".held-start-k"), g = document.querySelector(".held-ohnekopf");
  if (!k || !g) return;
  function hoehe() { document.documentElement.style.setProperty("--khoehe", k.offsetHeight + "px"); }
  function paar() {
    var p = g.querySelector(".h-plug"), t = g.querySelector(".h-text"), r = g.querySelector(".held-rahmen");
    if (!p || !t || !r) return;
    p.style.transform = ""; t.style.transform = "";
    if (innerWidth < 601) return;
    var pr = p.getBoundingClientRect();
    var ks = [].slice.call(t.children).map(function (e) { return e.getBoundingClientRect(); }).filter(function (b) { return b.width > 0; });
    if (!ks.length) return;
    var cl = Math.min.apply(null, ks.map(function (b) { return b.left; })), cr = Math.max.apply(null, ks.map(function (b) { return b.right; }));
    var d = .0245 * r.clientWidth, dx = -(cl - pr.right - d), sh = g.clientWidth / 2 - (pr.left + cr + dx) / 2;
    p.style.transform = "translateX(" + sh + "px)"; t.style.transform = "translateX(" + (dx + sh) + "px)";
  }
  function alles() { hoehe(); paar(); }
  if (window.ResizeObserver) new ResizeObserver(alles).observe(k);
  addEventListener("resize", alles); addEventListener("load", alles);
  (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(alles);
  alles();
})();
// 240: Hörbeispiele (Liste .hl auf der KOLORIT-Seite). Je Zeile laufen ohne/mit gleichzeitig und sample-genau (Web Audio, gleiche Startzeit);
// Dry/KOLORIT blendet nur die Lautstärke um (20 ms, kein Neustart). Laden erst beim ersten Play. Immer nur eine Zeile spielt.
// 249: Ruhe = KOLORIT gewählt, LED nur wenn die Zeile spielt UND KOLORIT gewählt ist; Play behält die gewählte Seite; dunkle Markierung gleitet (.hl-schieber).
(function () {
  var liste = document.querySelector(".hl-liste"), AC = window.AudioContext || window.webkitAudioContext;
  if (!liste || !AC) return;
  var NAMEN = ["drums", "kick-bass", "synth", "musik"], BLENDE = 0.02, ctx = null, aktiv = null;
  function fmt(s) { s = Math.round(s); return Math.floor(s / 60) + ":" + ("0" + (s % 60)).slice(-2); }
  function dekodiere(b) { return new Promise(function (ok, fehler) { ctx.decodeAudioData(b, ok, fehler); }); }
  var zeilen = [].slice.call(liste.querySelectorAll(".hl-zeile")).map(function (z, i) {
    var ab = z.querySelectorAll(".hl-ab button"), gr = z.querySelector(".hl-ab"), sch = document.createElement("span");
    sch.className = "hl-schieber"; sch.setAttribute("aria-hidden", "true"); gr.insertBefore(sch, gr.firstChild); gr.classList.add("mit-schieber");
    return { z: z, gr: gr, sch: sch, name: NAMEN[i], play: z.querySelector(".hl-play"), balken: z.querySelector(".hl-zeit span"), dauer: z.querySelector(".hl-dauer"),
      dry: ab[0], kol: ab[1], led: z.querySelector(".hl-led"), titel: z.querySelector(".hl-name").textContent,
      mit: false, laden: null, puffer: null, quellen: null, g: null, t0: 0, pos: 0, laenge: 0 };
  }).filter(function (Z) { return Z.name; });

  function schieber(Z, sofort) {   // 249: Markierung unter die gewählte Seite legen (sofort = ohne Gleiten)
    var b = Z.mit ? Z.kol : Z.dry, rb = b.getBoundingClientRect(), rg = Z.gr.getBoundingClientRect();
    if (sofort) Z.sch.style.transition = "none";
    Z.sch.style.width = rb.width + "px"; Z.sch.style.height = rb.height + "px";
    Z.sch.style.transform = "translate(" + (rb.left - rg.left - Z.gr.clientLeft) + "px," + (rb.top - rg.top - Z.gr.clientTop) + "px)";
    if (sofort) { void Z.sch.offsetWidth; Z.sch.style.transition = ""; }
  }
  function schalter(Z, mit, sofort) {
    Z.mit = mit;
    Z.dry.classList.toggle("aktiv", !mit); Z.kol.classList.toggle("aktiv", mit); Z.led.classList.toggle("an", mit && Z.z.classList.contains("spielt"));
    schieber(Z, sofort);
    Z.dry.setAttribute("aria-pressed", String(!mit)); Z.kol.setAttribute("aria-pressed", String(mit));
    if (Z.g) {
      var n = ctx.currentTime;
      [[Z.g[0], mit ? 0 : 1], [Z.g[1], mit ? 1 : 0]].forEach(function (p) {
        p[0].gain.cancelScheduledValues(n); p[0].gain.setValueAtTime(p[0].gain.value, n); p[0].gain.linearRampToValueAtTime(p[1], n + BLENDE);
      });
    }
  }
  function zeigeSpielt(Z, an) {
    Z.z.classList.toggle("spielt", an); Z.led.classList.toggle("an", an && Z.mit);
    Z.play.innerHTML = an ? '<span class="hl-pause"></span>' : '<span class="hl-dreieck"></span>';
    Z.play.setAttribute("aria-label", (an ? "Pause " : "Play ") + Z.titel);
  }
  function lade(Z) {
    if (!Z.laden) Z.laden = Promise.all(["ohne", "mit"].map(function (v) {
      return fetch((document.documentElement.lang === "de" ? "../" : "") + "audio/kolorit_" + Z.name + "_" + v + ".mp3?v=251").then(function (r) { return r.arrayBuffer(); }).then(dekodiere);
    })).then(function (p) { Z.puffer = p; Z.laenge = Math.min(p[0].duration, p[1].duration); Z.dauer.textContent = fmt(Z.laenge); return p; });
    return Z.laden;
  }
  function anhalten(Z, zuruecksetzen) {
    if (Z.quellen) {
      if (!zuruecksetzen) Z.pos = Math.max(0, ctx.currentTime - Z.t0) % Z.laenge;
      Z.quellen.forEach(function (q) { try { q.stop(); } catch (e) {} q.disconnect(); });
      Z.g.forEach(function (g) { g.disconnect(); });
      Z.quellen = null; Z.g = null;
    }
    if (zuruecksetzen) { Z.pos = 0; Z.balken.style.width = "0%"; }
    zeigeSpielt(Z, false);
    if (aktiv === Z) aktiv = null;
  }
  function starte(Z) {
    if (navigator.audioSession) navigator.audioSession.type = 'playback';   // 242: iPhone spielt auch im Lautlos-Modus
    if (!ctx) ctx = new AC();
    if (ctx.state === "suspended") ctx.resume();
    if (aktiv && aktiv !== Z) anhalten(aktiv, true);
    aktiv = Z; zeigeSpielt(Z, true);
    lade(Z).then(function (p) {
      if (aktiv !== Z || Z.quellen) return;
      var t = ctx.currentTime + 0.05;
      Z.g = [ctx.createGain(), ctx.createGain()];
      Z.g[0].gain.setValueAtTime(Z.mit ? 0 : 1, 0); Z.g[1].gain.setValueAtTime(Z.mit ? 1 : 0, 0);
      Z.quellen = p.map(function (b, i) {
        var q = ctx.createBufferSource(); q.buffer = b; q.loop = true; q.loopStart = 0; q.loopEnd = Z.laenge;
        q.connect(Z.g[i]); Z.g[i].connect(ctx.destination); q.start(t, Z.pos); return q;
      });
      Z.t0 = t - Z.pos;
      requestAnimationFrame(lauf);
    }, function () { anhalten(Z, true); });
  }
  function lauf() {
    var Z = aktiv; if (!Z || !Z.quellen) return;
    Z.balken.style.width = (Math.max(0, ctx.currentTime - Z.t0) % Z.laenge) / Z.laenge * 100 + "%";
    requestAnimationFrame(lauf);
  }
  zeilen.forEach(function (Z) {
    anhalten(Z, true); schalter(Z, true, true);
    Z.play.addEventListener("click", function () { if (aktiv === Z) anhalten(Z, false); else starte(Z); });
    Z.dry.addEventListener("click", function () { schalter(Z, false); });
    Z.kol.addEventListener("click", function () { schalter(Z, true); });
  });
  // 249: Markierung neu vermessen, wenn sich die Schalterbreite ändert (Schrift geladen, Fenster)
  function messen() { zeilen.forEach(function (Z) { schieber(Z, true); }); }
  if (window.ResizeObserver) { var ro = new ResizeObserver(messen); zeilen.forEach(function (Z) { ro.observe(Z.gr); }); }
  else window.addEventListener("resize", messen);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(messen);
})();

// 257: Handbuch-Knopf (/manual/): Haupt-Knopf öffnet das PDF in der Browsersprache (erste passende aus en/de/fr/es/ja/pt/it, sonst Seitensprache);
// der Pfeil klappt die Sprachliste auf (Klick daneben oder Esc schließt; Pfeiltasten, Pos1/Ende, Tab).
(function () {
  var ks = [].slice.call(document.querySelectorAll(".hb-knopf"));
  if (!ks.length) return;
  var CODES = ["en", "de", "fr", "es", "ja", "pt", "it"], wahl = null;
  var sprachen = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ""];
  for (var i = 0; i < sprachen.length && !wahl; i++) { var c = String(sprachen[i]).toLowerCase().split("-")[0]; if (CODES.indexOf(c) >= 0) wahl = c; }
  if (!wahl) wahl = document.documentElement.lang === "de" ? "de" : "en";
  ks.forEach(function (k) {
    var haupt = k.querySelector(".hb-knopf-haupt"), pfeil = k.querySelector(".hb-knopf-pfeil"), liste = k.querySelector(".hb-liste"), links = [].slice.call(liste.querySelectorAll("a"));
    links.forEach(function (a) { if ((a.getAttribute("lang") || "").split("-")[0] === wahl) { haupt.setAttribute("href", a.getAttribute("href")); haupt.setAttribute("hreflang", wahl); } });
    function auf(fokus) { ks.forEach(function (x) { if (x !== k) x.zu(false); }); liste.hidden = false; liste.classList.remove("nach-oben"); var sec = k.closest(".handbuch248"), lb = liste.getBoundingClientRect(); if (sec && lb.bottom > sec.getBoundingClientRect().bottom - 8) liste.classList.add("nach-oben");   /* Abschnitt schneidet ab (clip-path) -> nach oben */
      pfeil.setAttribute("aria-expanded", "true"); if (fokus) links[0].focus(); }
    k.zu = function (fokus) { if (liste.hidden) return; liste.hidden = true; pfeil.setAttribute("aria-expanded", "false"); if (fokus) pfeil.focus(); };
    pfeil.addEventListener("click", function (e) { if (liste.hidden) auf(e.detail === 0); else k.zu(false); });   // detail 0 = per Tastatur ausgelöst
    pfeil.addEventListener("keydown", function (e) { if (e.key === "ArrowDown") { e.preventDefault(); auf(true); } });
    liste.addEventListener("keydown", function (e) {
      var n = links.indexOf(document.activeElement), m = links.length;
      if (e.key === "ArrowDown") { e.preventDefault(); links[(n + 1) % m].focus(); }
      else if (e.key === "ArrowUp") { e.preventDefault(); links[(n - 1 + m) % m].focus(); }
      else if (e.key === "Home") { e.preventDefault(); links[0].focus(); }
      else if (e.key === "End") { e.preventDefault(); links[m - 1].focus(); }
      else if (e.key === "Tab") k.zu(false);
    });
    links.forEach(function (a) { a.addEventListener("click", function () { k.zu(false); }); });
  });
  document.addEventListener("click", function (e) { ks.forEach(function (k) { if (!k.contains(e.target)) k.zu(false); }); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") ks.forEach(function (k) { k.zu(k.contains(document.activeElement)); }); });
})();
