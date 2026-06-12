/* ============================================================
   DIAMOND SOLAR — Shared Layout (topbar, header, footer, WA float)
   Har page me same header/footer automatic aata hai.
   ============================================================ */
(function () {
  const C = SITE_CONFIG;
  const page = document.body.dataset.page || "";

  const navLinks = [
    ["index.html", "home", "Home"],
    ["parts.html", "parts", "Solar Parts & Prices"],
    ["videos.html", "videos", "Projects & Gallery"],
    ["testimonials.html", "testimonials", "Testimonials & News"],
    ["contact.html", "contact", "Contact Us"]
  ];

  const navHTML = navLinks.map(([href, key, label]) =>
    `<li><a href="${href}" class="${page === key ? "active" : ""}">${label}</a></li>`).join("");

  document.getElementById("site-top").innerHTML = `
  <div class="topbar">
    <div class="container topbar-content">
      <div><a href="tel:${C.PHONE.replace(/\s/g, "")}"><i class="fa-solid fa-phone"></i> ${C.PHONE}</a></div>
      <div><i class="fa-solid fa-location-dot"></i> G.S. Road, Bikaner, Rajasthan 334001</div>
    </div>
  </div>
  <header>
    <div class="container navbar">
      <a class="logo" href="index.html">
        <div class="logo-box"><img src="LOGO.jpeg" alt="${C.FIRM_NAME} Logo" onerror="this.parentElement.innerHTML='<i class=\\'fa-solid fa-solar-panel\\' style=\\'font-size:26px;color:var(--primary);display:flex;height:100%;align-items:center;justify-content:center\\'></i>'"></div>
        <div class="logo-text"><h1>${C.FIRM_NAME}</h1><p>Premium Solar Solutions</p></div>
      </a>
      <nav><button class="nav-close" aria-label="Close menu"><i class="fa-solid fa-xmark"></i></button><ul>${navHTML}</ul></nav>
      <div class="header-actions">
        <a class="btn-wa" href="https://wa.me/${C.WHATSAPP}" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp"></i> Contact Now</a>
        <button class="menu-toggle" aria-label="Open menu"><i class="fa-solid fa-bars"></i></button>
      </div>
    </div>
  </header>
  <div class="nav-overlay"></div>`;

  document.getElementById("site-footer").innerHTML = `
  <footer>
    <div class="container footer-grid">
      <div class="footer-col">
        <h4>${C.FIRM_NAME}</h4>
        <p style="margin-top:10px; font-size:14px; line-height:1.7;">Rooftop solar installations and wholesale solar hardware supply across Bikaner division. PM Surya Ghar Yojana registered vendor.</p>
      </div>
      <div class="footer-col">
        <h4>Quick Links</h4>
        <ul>${navLinks.map(([h, , l]) => `<li><a href="${h}">${l}</a></li>`).join("")}</ul>
      </div>
      <div class="footer-col">
        <h4>We Supply</h4>
        <p style="font-size:14px; line-height:1.7;">Mounting Structures, Mid &amp; End Clamps, ACDB / DCDB Panels, Earthing Kits, DC Cables, Lightning Arresters.</p>
      </div>
      <div class="footer-col">
        <h4>Reach Us</h4>
        <p style="font-size:14px; margin-bottom:10px; line-height:1.6;">${C.ADDRESS}</p>
        <a href="tel:${C.PHONE.replace(/\s/g, "")}" style="color:#fff; font-weight:700; text-decoration:none; display:block; margin-bottom:8px;"><i class="fa-solid fa-phone"></i> ${C.PHONE}</a>
        <a href="mailto:${C.EMAIL}" style="color:#94a3b8; text-decoration:none;"><i class="fa-solid fa-envelope"></i> ${C.EMAIL}</a>
      </div>
    </div>
    <div class="container copyright">© <span data-year></span> ${C.FIRM_NAME}, Bikaner. All rights reserved.</div>
  </footer>
  <a class="wa-float" href="https://wa.me/${C.WHATSAPP}" target="_blank" rel="noopener" aria-label="WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>`;
})();
