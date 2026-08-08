/* Homepage dynamic sections */
(function (SD) {
  const money = (n) => SD.formatMoney(n);

  function serviceIcon(name) {
    return SD.icon(name || "stethoscope", 26);
  }

  document.addEventListener("DOMContentLoaded", function () {
    // Services
    SD.data.get("services").then((services) => {
      const wrap = document.getElementById("homeServices");
      if (!wrap) return;
      const featured = services.filter((s) => s.isFeatured !== false).slice(0, 6);
      wrap.innerHTML = featured.map((s) =>
        '<a href="/services/' + s.slug + '" class="card card-hover service-card reveal">' +
          '<div class="svc-ico">' + serviceIcon(s.icon) + "</div>" +
          '<span class="svc-price">' + money(s.price) + "</span>" +
          "<h3>" + SD.escapeHtml(s.name) + "</h3>" +
          "<p>" + SD.escapeHtml(s.shortDescription) + "</p>" +
          '<span class="svc-link">Learn more <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span>' +
        "</a>").join("");
      SD.initReveal();
    });

    // Doctors
    SD.data.get("doctors").then((docs) => {
      const wrap = document.getElementById("homeDoctors");
      if (!wrap) return;
      wrap.innerHTML = docs.slice(0, 4).map((d) => {
        const initials = (d.name || "Dr").split(" ").map((x) => x[0]).join("").slice(0, 2).toUpperCase();
        return '<div class="card doctor-card reveal">' +
          '<div class="photo">' + (d.avatar
            ? '<img src="' + d.avatar + '" alt="' + SD.escapeHtml(d.name) + '">'
            : '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:2rem;color:#0f766e;background:var(--primary-50)">' + initials + "</div>") + "</div>" +
          '<div class="info"><h3>' + SD.escapeHtml(d.name) + "</h3>" +
          '<div class="role">' + SD.escapeHtml(d.specialization) + "</div>" +
          '<div class="rating">' + stars(d.averageRating || 5) + "</div>" +
          "</div></div>";
      }).join("");
      SD.initReveal();
    });

    // Gallery
    SD.data.get("gallery").then((items) => {
      const wrap = document.getElementById("homeGallery");
      if (!wrap) return;
      wrap.innerHTML = items.map((g) =>
        '<div class="gallery-item reveal" data-full="' + g.image + '">' +
          '<img src="' + g.image + '" alt="' + SD.escapeHtml(g.title) + '" loading="lazy" data-p="' + (g.p || "") + '" data-fb="' + (g.fb || "") + '" data-fb2="' + (g.fb2 || g.fallback || "") + '" onerror="SD.imgFallback(this)">' +
          '<div class="cap"><h3>' + SD.escapeHtml(g.title) + "</h3><span>" + SD.escapeHtml(g.description || g.category) + "</span></div>" +
        "</div>").join("");
      SD.initReveal();
      bindLightbox(wrap);
    });

    // Testimonials
    SD.data.get("testimonials").then((items) => {
      const wrap = document.getElementById("homeTestimonials");
      if (!wrap) return;
      wrap.innerHTML = items.slice(0, 3).map((t) => {
        const initials = (t.patientName || "P").split(" ").map((x) => x[0]).join("").slice(0, 2).toUpperCase();
        return '<div class="card testimonial-card reveal">' +
          '<div class="qmark">"</div>' +
          '<div class="stars">' + stars(t.rating || 5) + "</div>" +
          '<p class="quote">' + SD.escapeHtml(t.content) + "</p>" +
          '<div class="who"><div class="av">' + (t.image ? '<img src="' + t.image + '" style="width:100%;height:100%;object-fit:cover;border-radius:50%">' : initials) + "</div>" +
          "<div><h4>" + SD.escapeHtml(t.patientName) + "</h4><span>Verified Patient</span></div></div>" +
        "</div>";
      }).join("");
      SD.initReveal();
    });

    // FAQs
    SD.data.get("faqs").then((faqs) => {
      const wrap = document.getElementById("homeFaqs");
      if (!wrap) return;
      wrap.innerHTML = faqs.slice(0, 6).map((f) =>
        '<div class="faq-item"><button class="faq-q" type="button">' + SD.escapeHtml(f.question) +
          '<span class="chev"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg></span></button>' +
          '<div class="faq-a"><p>' + SD.escapeHtml(f.answer) + "</p></div></div>").join("");
      // wire max-height
      wrap.querySelectorAll(".faq-item .faq-q").forEach((q) => q.addEventListener("click", () => {
        const item = q.closest(".faq-item");
        const answer = item.querySelector(".faq-a");
        const open = item.classList.toggle("open");
        answer.style.maxHeight = open ? answer.scrollHeight + "px" : "0px";
        wrap.querySelectorAll(".faq-item.open").forEach((o) => {
          if (o !== item) { o.classList.remove("open"); o.querySelector(".faq-a").style.maxHeight = "0px"; }
        });
      }));
    });

    // Blog
    SD.data.get("blog").then((posts) => {
      const wrap = document.getElementById("homeBlog");
      if (!wrap) return;
      const fmt = (d) => d ? new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "";
      wrap.innerHTML = posts.slice(0, 3).map((p) =>
        '<article class="blog-card reveal">' +
          '<div class="thumb"><a href="/blog/' + p.slug + '"><img src="' + (p.featuredImage || "/images/blog-1.svg") + '" alt="' + SD.escapeHtml(p.title) + '" loading="lazy"></a></div>' +
          '<div class="body">' +
            '<div class="meta"><span>' + fmt(p.publishedAt) + '</span><span>•</span><span>' + (p.readingTime || 5) + ' min read</span></div>' +
            '<h3><a href="/blog/' + p.slug + '">' + SD.escapeHtml(p.title) + '</a></h3>' +
            '<p>' + SD.escapeHtml(p.excerpt || "") + '</p>' +
            '<a class="blog-link" href="/blog/' + p.slug + '">Read article →</a>' +
          "</div>" +
        "</article>").join("");
      SD.initReveal();
    });
  });

  function stars(n) {
    let out = "";
    for (let i = 1; i <= 5; i++) out += '<span style="opacity:' + (i <= Math.round(n) ? 1 : 0.25) + '">' + SD.icon("star", 15) + "</span>";
    return out;
  }

  function bindLightbox(root) {
    root.querySelectorAll(".gallery-item").forEach((el) => {
      el.addEventListener("click", () => {
        openLightbox(el.dataset.full, el.querySelector("img").alt);
      });
    });
  }

  function openLightbox(src, alt) {
    let ov = document.querySelector(".modal-overlay[data-lightbox]");
    if (!ov) {
      ov = document.createElement("div");
      ov.className = "modal-overlay";
      ov.dataset.lightbox = "1";
      ov.innerHTML = '<div class="modal" style="max-width:56rem;padding:0;overflow:hidden;text-align:center"><button class="m-close btn btn-sm" style="position:absolute;top:1rem;right:1rem;background:#fff;border-radius:50%;z-index:5">✕</button><img id="lbImg" style="width:100%;max-height:80vh;object-fit:contain" alt=""></div>';
      document.body.appendChild(ov);
      ov.addEventListener("click", (e) => { if (e.target === ov) ov.classList.remove("open"); });
      ov.querySelector(".m-close").addEventListener("click", () => ov.classList.remove("open"));
    }
    ov.querySelector("#lbImg").src = src;
    ov.querySelector("#lbImg").alt = alt;
    ov.classList.add("open");
  }
})(window.SD);
