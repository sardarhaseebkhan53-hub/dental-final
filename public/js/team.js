(function (SD) {
  document.addEventListener("DOMContentLoaded", function () {
    SD.data.get("doctors").then((docs) => {
      const wrap = document.getElementById("teamDoctors");
      if (!wrap) return;
      wrap.innerHTML = docs.map((d) => {
        const initials = (d.name || "Dr").split(" ").map((x) => x[0]).join("").slice(0, 2).toUpperCase();
        return '<div class="card doctor-card reveal">' +
          '<div class="photo">' + (d.avatar
            ? '<img src="' + d.avatar + '" alt="' + SD.escapeHtml(d.name) + '">'
            : '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:2rem;color:#0f766e;background:var(--primary-50)">' + initials + "</div>") + "</div>" +
          '<div class="info"><h3>' + SD.escapeHtml(d.name) + "</h3>" +
          '<div class="role">' + SD.escapeHtml(d.specialization) + "</div>" +
          '<p class="text-sm text-muted" style="font-size:.82rem">' + (d.experience || 0) + "+ years experience</p>" +
          "</div></div>";
      }).join("");
      SD.initReveal();
    });
  });
})(window.SD);
