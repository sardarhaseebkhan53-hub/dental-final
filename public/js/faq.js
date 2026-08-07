(function (SD) {
  const CATS = {
    GENERAL: "General", TREATMENTS: "Treatments", BILLING: "Billing", INSURANCE: "Insurance",
    EMERGENCY: "Emergency", FIRST_VISIT: "First Visit", APPOINTMENTS: "Appointments",
  };
  document.addEventListener("DOMContentLoaded", function () {
    SD.data.get("faqs").then((all) => {
      const list = document.getElementById("faqList");
      const filters = document.getElementById("faqFilters");
      if (!list) return;

      const cats = ["All", ...new Set(all.map((f) => f.category))];
      filters.innerHTML = cats.map((c, i) =>
        '<button class="filter-pill' + (i === 0 ? " active" : "") + '" data-cat="' + c + '">' +
        (c === "All" ? "All" : CATS[c] || c.replace(/_/g, " ")) + "</button>").join("");

      const render = (cat) => {
        const items = cat === "All" ? all : all.filter((f) => f.category === cat);
        list.innerHTML = items.map((f) =>
          '<div class="faq-item"><button class="faq-q" type="button">' + SD.escapeHtml(f.question) +
            '<span class="chev"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg></span></button>' +
            '<div class="faq-a"><p>' + SD.escapeHtml(f.answer) + "</p></div></div>").join("");
        list.querySelectorAll(".faq-q").forEach((q) => q.addEventListener("click", () => {
          const item = q.closest(".faq-item");
          const answer = item.querySelector(".faq-a");
          const open = item.classList.toggle("open");
          answer.style.maxHeight = open ? answer.scrollHeight + "px" : "0px";
          list.querySelectorAll(".faq-item.open").forEach((o) => {
            if (o !== item) { o.classList.remove("open"); o.querySelector(".faq-a").style.maxHeight = "0px"; }
          });
        }));
      };
      render("All");

      filters.querySelectorAll(".filter-pill").forEach((btn) => btn.addEventListener("click", () => {
        filters.querySelectorAll(".filter-pill").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        render(btn.dataset.cat);
      }));
    });
  });
})(window.SD);
