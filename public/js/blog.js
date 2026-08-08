(function (SD) {
  function fmtDate(d) {
    if (!d) return "";
    const dt = new Date(d);
    if (isNaN(dt)) return "";
    return dt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  }
  function card(b) {
    const thumb = b.featuredImage || "/images/blog-1.jpg";
    return '<article class="card card-hover blog-card reveal">' +
      '<a class="thumb" href="/blog/' + b.slug + '"><img src="' + thumb + '" alt="' + SD.escapeHtml(b.title) + '" loading="lazy" onerror="this.onerror=null;this.src=\'/images/blog-1.jpg\'"></a>' +
      '<div class="body">' +
        '<div class="meta"><span>' + (b.category ? b.category.name : "News") + "</span><span>•</span><span>" + fmtDate(b.publishedAt) + "</span><span>•</span><span>" + (b.readingTime || 4) + " min read</span></div>" +
        '<h3><a href="/blog/' + b.slug + '">' + SD.escapeHtml(b.title) + "</a></h3>" +
        "<p>" + SD.escapeHtml(b.excerpt) + "</p>" +
        '<a class="svc-link" style="color:var(--primary);font-weight:600;font-size:.9rem" href="/blog/' + b.slug + '">Read more <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>' +
      "</div></article>";
  }
  document.addEventListener("DOMContentLoaded", function () {
    SD.data.get("blog").then((posts) => {
      const wrap = document.getElementById("blogList");
      if (!wrap) return;
      wrap.innerHTML = posts.map(card).join("");
      SD.initReveal();
    });
  });
})(window.SD);
