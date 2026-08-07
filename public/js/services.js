(function (SD) {
  const CATS = {
    GENERAL: "General", COSMETIC: "Cosmetic", ORTHODONTICS: "Orthodontics", PEDIATRIC: "Pediatric",
    SURGERY: "Surgery", EMERGENCY: "Emergency", PREVENTIVE: "Preventive", RESTORATIVE: "Restorative",
  };

  function card(s) {
    return '<a href="/services/' + s.slug + '" class="card card-hover service-card reveal">' +
      '<div class="svc-ico">' + SD.icon(s.icon || "stethoscope", 26) + "</div>" +
      '<span class="svc-price">' + SD.formatMoney(s.price) + "</span>" +
      "<h3>" + SD.escapeHtml(s.name) + "</h3>" +
      "<p>" + SD.escapeHtml(s.shortDescription) + "</p>" +
      '<span class="svc-link">Learn more <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span>' +
    "</a>";
  }

  document.addEventListener("DOMContentLoaded", function () {
    SD.data.get("services").then((all) => {
      const listWrap = document.getElementById("servicesList");
      const filterWrap = document.getElementById("svcFilters");
      if (!listWrap) return;

      // Filters
      const cats = ["All", ...new Set(all.map((s) => s.category))];
      filterWrap.innerHTML = cats.map((c, i) =>
        '<button class="filter-pill' + (i === 0 ? " active" : "") + '" data-cat="' + c + '">' +
        (c === "All" ? "All Services" : CATS[c] || c) + "</button>").join("");

      const render = (cat) => {
        const list = cat === "All" ? all : all.filter((s) => s.category === cat);
        listWrap.innerHTML = list.map(card).join("");
        SD.initReveal();
      };
      render("All");

      filterWrap.querySelectorAll(".filter-pill").forEach((btn) => {
        btn.addEventListener("click", () => {
          filterWrap.querySelectorAll(".filter-pill").forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          render(btn.dataset.cat);
        });
      });
    });
  });
})(window.SD);
