// KOLO AUDIO – Links und Texte an einer Stelle (Arbeitsstand 228). Nur Englisch. Platzhalter sind GROSS geschrieben.
// Texte: aus 133 übernommen, neue Texte (228) nur aus Plugin und Handbuch – Kim prüft alle Texte.
window.KOLO = {
  links: {
    checkoutGrit: "CHECKOUT_KOLOGRIT",           // KOLO GRIT: Ablauf (E-Mail -> Download) folgt
    checkoutKolorit: "MOONBASE_BUY_KOLORIT",     // KOLORIT: Moonbase-Kauf-Link
    trialKolorit: "MOONBASE_TRIAL_KOLORIT",      // KOLORIT: Moonbase-Testversion
    newsletter: "NEWSLETTER_ENDPOINT",           // noch kein Dienst angebunden
    contact: "hello@koloaudio.com",
    // 228 /creators (versteckt): Downloads 1.0.4 / 1.0.12 – Ablageort klärt Kim (siehe Bericht 228)
    dlKoloritMac: "DL_KOLORIT_104_MAC", dlKoloritWin: "DL_KOLORIT_104_WIN", dlGritMac: "DL_KOLOGRIT_1012_MAC", dlGritWin: "DL_KOLOGRIT_1012_WIN"
  },
  release: "2026-12-15",                          // bis dahin: Kauf/Test/GRIT-Download ausgegraut
  soundsReady: false,                             // 228: Hörbeispiele liegen unter audio/<name>_original.mp3 und audio/<name>_kolorit.mp3 – auf true, sobald da
  price: { intro: 49, regular: 99, introUntil: "12.01.2027", currency: "€" },   // aus der älteren Fassung – vor Veröffentlichung bestätigen
  text: {
    en: {
      menu_kolorit: "KOLORIT", menu_freebies: "Freebies", menu_manuals: "Manuals", menu_support: "Support", menu_about: "About", menu_close: "Close menu",
      g_name: "KOLO GRIT", g_cat: "A free one-knob multiband compressor",
      g_1: "Tuned on the inside so it always sounds musical.",
      g_2: "On top, there's GRIT mode for when you want to push it all the way.",
      g_mail_ph: "Your email", g_get: "Get KOLO GRIT free",
      g_free: "Free · 15.12.2026", g_date: "15.12.2026", free: "Free", g_more: "More about KOLO GRIT", freebies: "Freebies",
      t_ph: "Your email", t_btn: "Get notified at launch", t_note: "One email at launch. No spam, unsubscribe anytime.",
      k_name: "KOLORIT", k_cat: "Harmonic Color Processor", k_claim: "The easy way to color your sound.",
      k_discover: "Discover KOLORIT",
      priceLine: (p) => `${p.intro} ${p.currency} instead of ${p.regular} ${p.currency} · from 15.12.2026`,
      priceUntil: (p) => `Introductory price until ${p.introUntil}`,
      hero_sub: "Tape colour that pulls the dynamics forward: thick, dense and still mono-compatible.",
      buy: "Buy", trial: "Free trial", available: "Available 15.12.2026",
      m_head: "Modules",
      m_sat: "Adds harmonics and density in three types: SOFT, TAPE and HARD. LOW sets how strongly the low end is saturated.",
      m_dyn: "The signal is split into three pre-tuned bands. In each band, quiet passages are lifted and loud peaks are held back.",
      m_noise: "White, tape or vinyl texture that follows the input signal. It falls quiet in the gaps, so it never turns into a constant hiss.",
      m_tilt: "One straight slope across the whole range, rotating around 800 Hz. It changes the balance without adding its own color.",
      m_out: "VU and stereo meter, MIX and GAIN. Auto Gain matches the output to the input loudness, so you judge tone, not volume.",
      k_more: "How it works",
      k_head: "One chain, not a stack.",
      k_1: "First, tape colour. TAPE works mainly with the third harmonic and a head bump at 50 Hz. ANALOG adds wow, flutter and tape grain.",
      k_2: "Then the dynamics pull exactly those harmonics forward, in three bands.",
      k_3: "NOISE runs in parallel from the original signal and follows the attack, so it never turns into a constant hiss.",
      k_4: "TILT balances the result. MIX blends it back in without comb filtering.",
      k_5: "Auto Gain sits at the end, so you hear what KOLORIT does, not just that it got louder. An internal clipper keeps it musical when you push it.",
      s_head: "Sound examples", s_orig: "Original", s_kol: "With KOLORIT",
      p_head: "Presets", p_count: "83 factory presets in 17 categories, plus Init.",
      p_names: "Bassline Drive · Drum Smash · Vocal Air · Pad Breath · Master Sheen · Lo-Fi Vinyl",
      read_manual: "Read the manual",
      gm_depth: "One knob for upward and downward compression in three fixed bands. At 0 % it is neutral.",
      gm_grit: "Faster peak detection, higher ratios and more upward compression. Tails and room come forward, and the lettering lights up.",
      gm_io: "Input and output level, left and right, from −24 to +6 dB.",
      gm_vu: "Show the gain change in the LOW, MID and HIGH bands.",
      man_head: "Manual",
      c_head: "Creators", c_code: "Your personal tester code is in our email.",
      a_head: "About KOLO AUDIO",
      a_1: "KOLO AUDIO is an independent plugin studio from the north of Germany, founded by Kim Joschua Arnold.",
      a_sig: "Kim Joschua Arnold, sound, design and concept",
      f_head: "Formats", f_1: "VST3", f_2: "AU", f_3: "macOS", f_4: "Windows", f_5: "AAX coming soon", f_6: "Tested in Ableton Live, Logic Pro and FL Studio",
      fs_products: "Products", fs_resources: "Resources", fs_support: "Support", fs_company: "Company",
      fs_downloads: "Downloads", fs_manual_k: "KOLORIT manual", fs_manual_g: "KOLO GRIT manual", fs_press: "Press", fs_faq: "FAQ", fs_license: "License", fs_terms: "Terms",
      legal_imprint: "Legal notice", legal_privacy: "Privacy", legal_contact: "Contact",
      mb_note: "Our online reseller Moonbase is the merchant of record for all orders.",
      copyright: "© 2026 KOLO AUDIO. All rights reserved.",
      soon: "Coming soon"
    }
  }
};

// 243: deutsche Texte (Claude, sinngemäß; Kim liest gegen)
window.KOLO.text.de = Object.assign({}, window.KOLO.text.en, {
  a_head: "Über KOLO AUDIO",
  a_1: "KOLO AUDIO ist ein unabhängiges Plugin-Studio aus dem Norden Deutschlands, gegründet von Kim Joschua Arnold.",
  a_sig: "Kim Joschua Arnold, Sound, Design und Konzept",
  copyright: "© 2026 KOLO AUDIO. Alle Rechte vorbehalten.",
  legal_contact: "Kontakt", legal_imprint: "Impressum", legal_privacy: "Datenschutz",
  mb_note: "Unser Online-Wiederverkäufer Moonbase ist Verkäufer (Merchant of Record) für alle Bestellungen.",
  menu_about: "Über uns", menu_manuals: "Manuals"
});
