(function (SD) {
  document.addEventListener("DOMContentLoaded", function () {
    SD.data.get("gallery").then((all) => {
      const grid = document.getElementById("galleryGrid");
      const filters = document.getElementById("galFilters");
      if (!grid) return;

      const cats = ["All", ...new Set(all.map((g) => g.category))];
      filters.innerHTML = cats.map((c, i) =>
        '<button class="filter-pill' + (i === 0 ? " active" : "") + '" data-cat="' + c + '">' +
        (c === "All" ? "All" : c.replace(/_/g, " ")) + "</button>").join("");

      const render = (cat) => {
        const list = cat === "All" ? all : all.filter((g) => g.category === cat);
        grid.innerHTML = list.map((g) =>
          '<div class="gallery-item reveal" data-full="' + g.image + '">' +
            '<img src="' + g.image + '" alt="' + SD.escapeHtml(g.title) + '" loading="lazy">' +
            '<div class="cap"><h3>' + SD.escapeHtml(g.title) + "</h3><span>" + SD.escapeHtml(g.description || "") + "</span></div>" +
          "</div>").join("");
        grid.querySelectorAll(".gallery-item").forEach((el) => el.addEventListener("click", () => lightbox(el.dataset.full, el.querySelector("img").alt)));
        SD.initReveal();
      };
      render("All");

      filters.querySelectorAll(".filter-pill").forEach((btn) => btn.addEventListener("click", () => {
        filters.querySelectorAll(".filter-pill").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        render(btn.dataset.cat);
      }));
    });
  });

  function lightbox(src, alt) {
    let ov = document.querySelector(".modal-overlay[data-lightbox]");
    if (!ov) {
      ov = document.createElement("div");
      ov.className = "modal-overlay"; ov.dataset.lightbox = "1";
      ov.innerHTML = '<div class="modal" style="max-width:56rem;padding:0;overflow:hidden"><button class="m-close btn btn-sm" style="position:absolute;top:1rem;right:1rem;background:#fff;border-radius:50%;z-index:5">✕</button><img id="lbImg" style="width:100%;max-height:80vh;object-fit:contain" alt=""></div>';
      document.body.appendChild(ov);
      ov.addEventListener("click", (e) => { if (e.target === ov) ov.classList.remove("open"); });
      ov.querySelector(".m-close").addEventListener("click", () => ov.classList.remove("open"));
    }
    ov.querySelector("#lbImg").src = src; ov.querySelector("#lbImg").alt = alt;
    ov.classList.add("open");
  }
})(window.SD);
