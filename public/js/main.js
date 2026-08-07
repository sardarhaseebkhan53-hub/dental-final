/* Serene Dental — shared site behaviour */
window.SD = window.SD || {};
(function (SD) {
  /* ── Static site data (mirrors server constants) ───────────────────────── */
  SD.CLINIC = {
    name: "Serene Dental Clinic",
    phone: "(555) 123-4567",
    emergencyPhone: "(555) 911-0000",
    email: "info@serenedental.com",
    address: { street: "123 Wellness Avenue, Suite 200", city: "San Francisco", state: "CA", zip: "94102" },
    hours: { weekday: "8:00 AM - 8:00 PM", saturday: "9:00 AM - 5:00 PM", sunday: "10:00 AM - 4:00 PM" },
    founded: 1999,
  };

  const NAV = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about", children: [
      { label: "Our Story", href: "/about" },
      { label: "Our Team", href: "/team" },
      { label: "Technology", href: "/technology" },
      { label: "Careers", href: "/careers" },
    ]},
    { label: "Services", href: "/services", children: [
      { label: "General Dentistry", href: "/services/general-dentistry" },
      { label: "Cosmetic Dentistry", href: "/services/cosmetic-dentistry" },
      { label: "Orthodontics", href: "/services/orthodontics" },
      { label: "Dental Implants", href: "/services/dental-implants" },
      { label: "Teeth Whitening", href: "/services/teeth-whitening" },
      { label: "Pediatric Dentistry", href: "/services/pediatric-dentistry" },
      { label: "Emergency Care", href: "/services/emergency-care" },
      { label: "View All Services", href: "/services" },
    ]},
    { label: "Doctors", href: "/doctors" },
    { label: "Gallery", href: "/gallery" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ];

  const SOCIAL = [
    { label: "Facebook", href: "https://facebook.com/serenedental", path: "M14 13.5h2.5l.5-2.5H14V9c0-.7.3-1.5 1.5-1.5h1.5V5.2s-1.2-.2-2.4-.2c-2.4 0-4 1.5-4 4V11H8v2.5h2.5V21h3.5v-7.5Z" },
    { label: "Instagram", href: "https://instagram.com/serenedental", path: "M12 2c2.7 0 3 0 4 .1 1 .1 1.6.2 2.1.4.6.2 1 .5 1.5 1 .4.4.8.9 1 1.5.2.5.4 1.1.4 2.1.1 1 .1 1.3.1 4s0 3-.1 4c-.1 1-.2 1.6-.4 2.1-.2.6-.5 1-1 1.5-.4.4-.9.8-1.5 1-.5.2-1.1.4-2.1.4-1 .1-1.3.1-4 .1s-3 0-4-.1c-1-.1-1.6-.2-2.1-.4-.6-.2-1-.5-1.5-1-.4-.4-.8-.9-1-1.5-.2-.5-.4-1.1-.4-2.1C2 15 2 14.7 2 12s0-3 .1-4c.1-1 .2-1.6.4-2.1.2-.6.5-1 1-1.5.4-.4.9-.8 1.5-1C5.5 3.2 6.1 3 7.1 2.9 8.1 2.8 8.3 2.8 11.1 2.8L12 2Zm0 2.4c-2.7 0-3 0-4 .1-.9.1-1.4.2-1.7.3-.4.2-.7.3-1 .7-.3.3-.5.6-.7 1-.1.3-.2.8-.3 1.7-.1 1-.1 1.3-.1 4s0 3 .1 4c.1.9.2 1.4.3 1.7.2.4.3.7.7 1 .3.3.6.5 1 .7.3.1.8.2 1.7.3 1 .1 1.3.1 4 .1s3 0 4-.1c.9-.1 1.4-.2 1.7-.3.4-.2.7-.3 1-.7.3-.3.5-.6.7-1 .1-.3.2-.8.3-1.7.1-1 .1-1.3.1-4s0-3-.1-4c-.1-.9-.2-1.4-.3-1.7-.2-.4-.3-.7-.7-1-.3-.3-.6-.5-1-.7-.3-.1-.8-.2-1.7-.3-1-.1-1.3-.1-4-.1Zm0 4.1a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7Zm0 2.4a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2Zm3.6-2.9a.8.8 0 1 1 0 1.6.8.8 0 0 1 0-1.6Z" },
    { label: "Twitter", href: "https://twitter.com/serenedental", path: "M22 5.8c-.7.3-1.5.6-2.3.7a4 4 0 0 0 1.8-2.2 8 8 0 0 1-2.5 1 4 4 0 0 0-6.8 3.6A11.4 11.4 0 0 1 3.9 4.5a4 4 0 0 0 1.2 5.3c-.6 0-1.2-.2-1.8-.5a4 4 0 0 0 3.2 4 4 4 0 0 1-1.8.1 4 4 0 0 0 3.7 2.8A8 8 0 0 1 2 18.3a11.3 11.3 0 0 0 6.1 1.8c7.3 0 11.3-6.1 11.3-11.4v-.5c.8-.6 1.5-1.3 2-2Z" },
    { label: "LinkedIn", href: "https://linkedin.com/company/serenedental", path: "M4.98 3.5A2 2 0 1 1 3 5.5a2 2 0 0 1 1.98-2ZM3 8.5h4V21H3V8.5Zm6.5 0h3.8v1.7h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.7 4.8 6.1V21h-4v-5.9c0-1.4 0-3.2-2-3.2s-2.3 1.5-2.3 3V21h-4V8.5Z" },
    { label: "YouTube", href: "https://youtube.com/@serenedental", path: "M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8c1.6.4 7.8.4 7.8.4s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15.2V8.8l5.2 3.2L10 15.2Z" },
  ];

  /* ── Icon helpers (inline SVG, mimics lucide-react) ────────────────────── */
  SD.icon = function (name, size) {
    const s = size || 18;
    const icons = {
      phone: '<svg width="' + s + '" height="' + s + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/></svg>',
      mail: '<svg width="' + s + '" height="' + s + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',
      mapPin: '<svg width="' + s + '" height="' + s + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
      clock: '<svg width="' + s + '" height="' + s + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
      calendar: '<svg width="' + s + '" height="' + s + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>',
      chevronDown: '<svg width="' + s + '" height="' + s + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>',
      arrowRight: '<svg width="' + s + '" height="' + s + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>',
      check: '<svg width="' + s + '" height="' + s + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
      checkCircle: '<svg width="' + s + '" height="' + s + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.1V12a10 10 0 1 1-5.9-9.1"/><path d="m9 11 3 3L22 4"/></svg>',
      shield: '<svg width="' + s + '" height="' + s + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.7 9a.6.6 0 0 1-.6 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.2-2.7a1.2 1.2 0 0 1 1.6 0C14.5 3.8 17 5 19 5a1 1 0 0 1 1 1Z"/><path d="m9 12 2 2 4-4"/></svg>',
      award: '<svg width="' + s + '" height="' + s + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.5 13 17 22l-5-3-5 3 1.5-9"/></svg>',
      star: '<svg width="' + s + '" height="' + s + '" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1"><path d="M11.5 3l2.6 5.3 5.9.9-4.2 4.1 1 5.8-5.3-2.8-5.3 2.8 1-5.8L3 9.2l5.9-.9L11.5 3Z"/></svg>',
      sparkles: '<svg width="' + s + '" height="' + s + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4"/></svg>',
      menu: '<svg width="' + s + '" height="' + s + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="7" y2="7"/><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="17" y2="17"/></svg>',
      x: '<svg width="' + s + '" height="' + s + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>',
      heartPulse: '<svg width="' + s + '" height="' + s + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7Z"/><path d="M3.2 12h4l2-3 3 4 2-3h4.6"/></svg>',
      stethoscope: '<svg width="' + s + '" height="' + s + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6 6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6 6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/></svg>',
      sun: '<svg width="' + s + '" height="' + s + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
      baby: '<svg width="' + s + '" height="' + s + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12h.01M15 12h.01"/><path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5"/><path d="M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1"/></svg>',
      siren: '<svg width="' + s + '" height="' + s + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 18v-6a5 5 0 0 1 10 0v6"/><path d="M5 21a1 1 0 0 1-1-1v-1a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1Z"/><path d="M21 12h1M3 12H2M5 4.5 4 3.5M19 4.5l1-1M9 2h6"/></svg>',
      activity: '<svg width="' + s + '" height="' + s + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>',
      anchor: '<svg width="' + s + '" height="' + s + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="3"/><path d="M12 8v13M5 12H2a10 10 0 0 0 20 0h-3M12 8a8 8 0 0 0 8 8"/></svg>',
      "align-center": '<svg width="' + s + '" height="' + s + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 12H7M19 18H5M21 6H3"/></svg>',
      quote: '<svg width="' + s + '" height="' + s + '" viewBox="0 0 24 24" fill="currentColor"><path d="M6.5 10c-.8 0-1.5.3-2.1.8C4.9 8.6 6.7 7 9 7v2.4c-1 0-1.9.4-2.5 1.2V11H9v5H4v-4.4C4 9.2 5 7 6.5 10Zm10 0c-.8 0-1.5.3-2.1.8C14.9 8.6 16.7 7 19 7v2.4c-1 0-1.9.4-2.5 1.2V11H19v5h-5v-4.4C14 9.2 15 7 16.5 10Z"/></svg>',
    };
    return icons[name] || "";
  };

  /* ── Toast ─────────────────────────────────────────────────────────────── */
  SD.toast = function (message, type) {
    let wrap = document.querySelector(".toast-wrap");
    if (!wrap) { wrap = document.createElement("div"); wrap.className = "toast-wrap"; document.body.appendChild(wrap); }
    const el = document.createElement("div");
    el.className = "toast " + (type || "info");
    const colors = { success: "#10b981", error: "#ef4444", info: "#3b82f6" };
    el.innerHTML =
      '<span class="t-icon" style="color:' + (colors[type] || colors.info) + '">' +
      SD.icon(type === "success" ? "checkCircle" : "checkCircle") + "</span>" +
      "<p>" + message + "</p>";
    wrap.appendChild(el);
    setTimeout(() => { el.style.opacity = "0"; el.style.transition = "opacity .3s"; setTimeout(() => el.remove(), 300); }, 3800);
  };

  SD.escapeHtml = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  };

  SD.formatMoney = function (n) {
    const v = Number(n || 0);
    return v >= 1000 ? "$" + (v / 1000).toFixed(v % 1000 === 0 ? 0 : 1) + "k" : "$" + v.toFixed(2).replace(/\.00$/, "");
  };

  SD.initHeaderFooter = function () {
    document.querySelectorAll("[data-header]").forEach((slot) => {
      slot.innerHTML = renderHeader();
    });
    document.querySelectorAll("[data-footer]").forEach((slot) => {
      slot.innerHTML = renderFooter();
    });
    bindHeaderBehaviour();
    bindFooterBehaviour();
  };

  function isActive(href) {
    const p = window.location.pathname;
    if (href === "/") return p === "/" || p === "/index.html";
    return p === href || p.startsWith(href + "/");
  }

  function renderHeader() {
    const current = new Date().getFullYear() - SD.CLINIC.founded + " ";
    let topbar = "";
    let navItems = NAV.map((item) => {
      const active = isActive(item.href);
      const chev = item.children ? SD.icon("chevronDown", 14) : "";
      if (item.children) {
        const kids = item.children.map((c) =>
          '<a href="' + c.href + '" class="' + (isActive(c.href) ? "active" : "") + '">' + c.label + "</a>"
        ).join("");
        return '<div class="nav-item"><a href="' + item.href + '" class="nav-link' + (active ? " active" : "") + '">' + item.label + " " + chev + '</a><div class="dropdown"><div class="dropdown-panel">' + kids + "</div></div></div>";
      }
      return '<a href="' + item.href + '" class="nav-link' + (active ? " active" : "") + '">' + item.label + (chev ? " " + chev : "") + "</a>";
    }).join("");

    let mobileItems = NAV.map((item) => {
      let kids = "";
      if (item.children) {
        kids = '<div class="mobile-sub">' + item.children.map((c) =>
          '<a href="' + c.href + '" class="mobile-link">' + c.label + "</a>").join("") + "</div>";
      }
      return '<a href="' + item.href + '" class="mobile-link' + (isActive(item.href) ? " active" : "") + '">' + item.label + "</a>" + kids;
    }).join("");

    return (
      '<div class="topbar"><div class="container">' +
        '<div class="flex items-center gap-6">' +
          '<a href="tel:' + SD.CLINIC.phone + '">' + SD.icon("phone", 14) + "<span>" + SD.CLINIC.phone + "</span></a>" +
          '<span class="divider">|</span>' +
          '<span class="muted">Mon-Sat: ' + SD.CLINIC.hours.weekday + " • Emergency 24/7</span>" +
        "</div>" +
        '<div class="flex items-center gap-4">' +
          '<a href="/login">Patient Portal</a><span class="divider">|</span><a href="/book-appointment">Book Appointment</a>' +
        "</div>" +
      "</div></div>" +
      '<header class="site-header"><div class="container">' +
        '<a class="logo" href="/">' +
          '<span class="logo-icon">' + toothSVG() + "</span>" +
          '<span class="logo-text"><span class="brand">Serene <span>Dental</span></span><span class="tag">Premium Dental Care</span></span>' +
        "</a>" +
        '<nav class="nav" aria-label="Main navigation">' + navItems + "</nav>" +
        '<div class="header-actions">' +
          '<a class="btn btn-primary btn-sm hide-sm" href="/book-appointment">' + SD.icon("calendar", 16) + " Book Appointment</a>" +
          '<a class="btn btn-primary btn-sm hide-sm" href="tel:' + SD.CLINIC.phone + '" style="display:none">' + SD.icon("phone", 16) + "</a>" +
          '<button class="nav-toggle" id="navToggle" aria-label="Open menu">' + SD.icon("menu", 24) + "</button>" +
        "</div>" +
      "</div>" +
      '<div class="mobile-menu" id="mobileMenu"><div class="container">' +
        mobileItems +
        '<div class="mobile-cta">' +
          '<a class="btn btn-primary btn-block" href="/book-appointment">' + SD.icon("calendar", 18) + " Book Appointment</a>" +
          '<a class="btn btn-secondary btn-block" href="tel:' + SD.CLINIC.phone + '">' + SD.icon("phone", 18) + " " + SD.CLINIC.phone + "</a>" +
        "</div>" +
      "</div></div>" +
      "</header>"
    );
  }

  function toothSVG() {
    return '<svg viewBox="0 0 32 32" width="24" height="24" fill="none" aria-hidden="true"><path d="M16 3.25c-4.84 0-8.75 3.72-8.75 8.32 0 2.52.85 4.43 1.92 6.13.63 1 1.03 2.12 1.2 3.3l.37 2.65c.38 2.74 2.61 5.1 5.26 5.1 1.15 0 1.77-.63 2.26-1.62l1.17-2.38c.23-.47.9-.47 1.13 0l1.17 2.38c.49.99 1.11 1.62 2.26 1.62 2.65 0 4.88-2.36 5.26-5.1l.37-2.65c.17-1.18.57-2.3 1.2-3.3 1.07-1.7 1.92-3.61 1.92-6.13 0-4.6-3.91-8.32-8.75-8.32-1.64 0-3.15.44-4.44 1.22A8.55 8.55 0 0 0 16 3.25Z" class="fill-current"/><path d="M12.3 10.35c1.23-1.13 2.75-1.7 4.56-1.7M21.25 13.4c.77.55 1.67.82 2.7.82" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" opacity="0.7"/></svg>';
  }
  SD.toothSVG = toothSVG;

  function renderFooter() {
    const year = new Date().getFullYear();
    return (
      '<footer class="site-footer">' +
        '<div class="emergency-banner"><div class="container">' +
          '<div class="left"><div class="ico">' + SD.icon("phone", 20) + "</div>" +
            "<div><strong>Dental Emergency? We're Here 24/7</strong><span>Don't wait — call now for immediate care</span></div>" +
          "</div>" +
          '<a class="btn btn-accent btn-lg" href="tel:' + SD.CLINIC.emergencyPhone + '">' + SD.icon("phone", 16) + " " + SD.CLINIC.emergencyPhone + "</a>" +
        "</div></div>" +
        '<div class="footer-main"><div class="container"><div class="footer-grid">' +
          /* Brand column */
          '<div class="footer-col">' +
            '<a class="logo" href="/" style="margin-bottom:1.5rem;display:inline-flex">' +
              '<span class="logo-icon">' + toothSVG() + "</span>" +
              '<span class="logo-text"><span class="brand" style="color:#fff">Serene <span style="color:var(--accent)">Dental</span></span><span class="tag" style="color:rgba(255,255,255,0.7)">Premium Dental Care</span></span>' +
            "</a>" +
            "<p style='font-size:.9rem;color:rgba(255,255,255,0.7);line-height:1.7'>Where beautiful smiles begin. Experience premium dental care with over " + (year - SD.CLINIC.founded) + " years of excellence.</p>" +
            '<div class="footer-contact" style="margin-top:1.5rem">' +
              '<a href="tel:' + SD.CLINIC.phone + '"><span class="ico">' + SD.icon("phone", 16) + "</span>" + SD.CLINIC.phone + "</a>" +
              '<a href="mailto:' + SD.CLINIC.email + '"><span class="ico">' + SD.icon("mail", 16) + "</span>" + SD.CLINIC.email + "</a>" +
              '<div class="line"><span class="ico">' + SD.icon("mapPin", 16) + "</span><span>" + SD.CLINIC.address.street + "<br>" + SD.CLINIC.address.city + ", " + SD.CLINIC.address.state + " " + SD.CLINIC.address.zip + "</span></div>" +
              '<div class="line"><span class="ico">' + SD.icon("clock", 16) + "</span><span>Mon-Fri: " + SD.CLINIC.hours.weekday + "<br>Sat: " + SD.CLINIC.hours.saturday + "<br>Sun: " + SD.CLINIC.hours.sunday + "</span></div>" +
            "</div>" +
            '<div class="socials">' + SOCIAL.map((s) => '<a href="' + s.href + '" target="_blank" rel="noopener noreferrer" aria-label="' + s.label + '"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="' + s.path + '"/></svg></a>').join("") + "</div>" +
          "</div>" +
          /* Services */
          '<div class="footer-col"><h3>Our Services</h3><ul>' +
            ["General Dentistry","Cosmetic Dentistry","Orthodontics","Dental Implants","Teeth Whitening","Emergency Care"].map((s) =>
              '<li><a href="/services/' + s.toLowerCase().replace(/ /g, "-") + '">' + s + "</a></li>").join("") +
          "</ul></div>" +
          /* Company + patients */
          '<div class="footer-col"><h3>Company</h3><ul>' +
            ["About Us","Our Team","Technology","Careers","Blog","Contact"].map((s) => {
              const href = { "About Us": "/about", "Our Team": "/team", "Technology": "/technology", "Careers": "/careers", "Blog": "/blog", "Contact": "/contact" }[s];
              return '<li><a href="' + href + '">' + s + "</a></li>";
            }).join("") +
          "</ul><h3 style='margin-top:2rem'>For Patients</h3><ul>" +
            [{l:"Book Appointment",h:"/book-appointment"},{l:"Patient Portal",h:"/login"},{l:"Insurance",h:"/insurance"},{l:"Pricing",h:"/pricing"},{l:"FAQ",h:"/faq"},{l:"Reviews",h:"/testimonials"}].map((s) => '<li><a href="' + s.h + '">' + s.l + "</a></li>").join("") +
          "</ul></div>" +
          /* Newsletter */
          '<div class="footer-col"><h3>Stay Connected</h3>' +
            "<p style='font-size:.9rem;color:rgba(255,255,255,0.7);margin-bottom:1rem'>Subscribe for dental tips, clinic updates, and special offers.</p>" +
            '<form class="newsletter-form" data-newsletter>' +
              '<div class="form-group"><input type="email" class="form-input" placeholder="Your email address" required></div>' +
              '<button class="btn btn-accent btn-block" type="submit">Subscribe ' + SD.icon("arrowRight", 16) + "</button>" +
            "</form>" +
            "<p style='font-size:.75rem;color:rgba(255,255,255,0.4);margin-top:.75rem'>We respect your privacy. Unsubscribe anytime.</p>" +
            '<div class="new-patient-card"><h4>New Patient Special</h4><p>Free consultation + 20% off your first treatment.</p>' +
              '<a class="btn btn-ghost btn-sm" href="/book-appointment" style="margin-top:.75rem;color:var(--accent)">Book Now ' + SD.icon("arrowRight", 12) + "</a>" +
            "</div>" +
          "</div>" +
        "</div></div></div>" +
        '<div class="footer-bottom"><div class="container">' +
          "<p>© " + year + " Serene Dental Clinic. All rights reserved.</p>" +
          '<div class="legal">' +
            [{l:"Privacy Policy",h:"/privacy"},{l:"Terms of Service",h:"/terms"},{l:"Cookie Policy",h:"/cookies"},{l:"Refund Policy",h:"/refund-policy"},{l:"Sitemap",h:"/sitemap"}].map((s) => '<a href="' + s.h + '">' + s.l + "</a>").join("") +
          "</div>" +
        "</div></div>" +
      "</footer>"
    );
  }

  function bindHeaderBehaviour() {
    const header = document.querySelector(".site-header");
    if (!header) return;
    const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const toggle = document.getElementById("navToggle");
    const menu = document.getElementById("mobileMenu");
    if (toggle && menu) {
      toggle.addEventListener("click", () => {
        const open = menu.classList.toggle("open");
        toggle.innerHTML = SD.icon(open ? "x" : "menu", 24);
        toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      });
    }

    // Desktop dropdowns on hover
    header.querySelectorAll(".nav-item").forEach((item) => {
      item.addEventListener("mouseenter", () => item.classList.add("hover"));
      item.addEventListener("mouseleave", () => item.classList.remove("hover"));
    });
    // Show dropdown on hover via CSS (simple approach)
  }

  function bindFooterBehaviour() {
    document.querySelectorAll("form[data-newsletter]").forEach((form) => {
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = form.querySelector("input").value;
        const r = await SD.api.newsletter({ email }).catch(() => ({ data: { success: false } }));
        SD.toast(r.ok ? (r.data && r.data.message) || "Subscribed!" : "Subscription submitted.", r.ok ? "success" : "info");
        form.reset();
      });
    });
  }

  /* ── Scroll reveal ─────────────────────────────────────────────────────── */
  SD.initReveal = function () {
    const els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) { els.forEach((el) => el.classList.add("visible")); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    els.forEach((el) => io.observe(el));
  };

  /* ── FAQ accordion ─────────────────────────────────────────────────────── */
  SD.initFaqs = function (root) {
    (root || document).querySelectorAll(".faq-item").forEach((item) => {
      const q = item.querySelector(".faq-q");
      if (q && !q.dataset.bound) {
        q.dataset.bound = "1";
        q.addEventListener("click", () => {
          const isOpen = item.classList.contains("open");
          // close others in same list
          (item.parentElement.querySelectorAll(".faq-item.open")).forEach((o) => { if (o !== item) o.classList.remove("open"); });
          item.classList.toggle("open", !isOpen);
        });
      }
    });
  };

  /* ── Count-up animation for stats ──────────────────────────────────────── */
  SD.countUp = function (el) {
    const target = parseFloat(el.dataset.count || el.textContent.replace(/[^0-9.]/g, "")) || 0;
    const suffix = el.dataset.suffix || "";
    const dur = 1200; const start = performance.now();
    function tick(now) {
      const p = Math.min((now - start) / dur, 1);
      const val = Math.floor(target * (1 - Math.pow(1 - p, 3)));
      el.textContent = val + suffix;
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = target + suffix;
    }
    requestAnimationFrame(tick);
  };

  SD.initCounters = function () {
    const els = document.querySelectorAll("[data-count]");
    if (!("IntersectionObserver" in window)) { els.forEach((el) => SD.countUp(el)); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { SD.countUp(e.target); io.unobserve(e.target); } });
    }, { threshold: 0.4 });
    els.forEach((el) => io.observe(el));
  };

  /* ── Run on load ───────────────────────────────────────────────────────── */
  document.addEventListener("DOMContentLoaded", function () {
    SD.initHeaderFooter();
    SD.initReveal();
    SD.initFaqs();
    SD.initCounters();
  });
})(window.SD);
