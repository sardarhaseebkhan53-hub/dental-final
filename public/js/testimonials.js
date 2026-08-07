(function (SD) {
  function stars(n) {
    let out = "";
    for (let i = 1; i <= 5; i++) out += '<span style="opacity:' + (i <= Math.round(n) ? 1 : 0.25) + '">' + SD.icon("star", 15) + "</span>";
    return out;
  }
  document.addEventListener("DOMContentLoaded", function () {
    SD.data.get("testimonials").then((items) => {
      const wrap = document.getElementById("testimonialGrid");
      if (!wrap) return;
      wrap.innerHTML = items.map((t) => {
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
  });
})(window.SD);
