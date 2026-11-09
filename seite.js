// KOLO AUDIO – Vorab-Seite: Menü, Texte aus config.js, Formulare („Coming soon“, bis Lemon Squeezy angebunden ist), Affiliate-Weitergabe für KOLO GRIT.
(function () {
  const K = window.KOLO, $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const istPlatzhalter = (v) => !v || /^[A-Z0-9_]+$/.test(v);
  const t = K.text.en;   // nur Englisch, bis alle deutschen Texte stehen
  $$("[data-t]").forEach((el) => { const v = t[el.dataset.t]; if (typeof v === "string") el.textContent = v; });
  $$("[data-t-ph]").forEach((el) => { const v = t[el.dataset.tPh]; if (v) el.placeholder = v; });

  const mk = $(".kopf-menu"), menu = $("#menu");
  const menuZu = () => { mk.setAttribute("aria-expanded", "false"); menu.hidden = true; };
  mk.addEventListener("click", () => { const auf = mk.getAttribute("aria-expanded") !== "true"; mk.setAttribute("aria-expanded", String(auf)); menu.hidden = !auf; if (auf) $("a", menu).focus(); });
  $$("a", menu).forEach((a) => a.addEventListener("click", menuZu));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !menu.hidden) { menuZu(); mk.focus(); } });

  const toast = $(".toast"); let tz;
  const zeige = (msg) => { toast.textContent = msg; toast.hidden = false; clearTimeout(tz); tz = setTimeout(() => (toast.hidden = true), 4200); };
  const affiliate = new URLSearchParams(location.search).get("aff") || "";

  const gf = $("[data-grit-form]");
  gf.addEventListener("submit", (e) => {
    e.preventDefault();
    if (istPlatzhalter(K.links.checkoutGrit)) { zeige(t.soon); return; }
    const u = new URL(K.links.checkoutGrit); u.searchParams.set("checkout[email]", $("input", gf).value); if (affiliate) u.searchParams.set("aff", affiliate);
    location.href = u.toString();
  });
  $("[data-news-form]").addEventListener("submit", (e) => { e.preventDefault(); zeige(t.soon); });
})();
