(function (SD) {
  function fmtDate(d) {
    if (!d) return "";
    const dt = new Date(d);
    return isNaN(dt) ? "" : dt.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  }
  document.addEventListener("DOMContentLoaded", function () {
    const slug = window.location.pathname.replace(/^\/blog\//, "").replace(/\.html$/, "");
    function fill(post) {
      document.title = post.title + " | Serene Dental";
      document.getElementById("postTitle").textContent = post.title;
      document.getElementById("postMeta").innerHTML =
        "<span>" + (post.category ? post.category.name : "News") + "</span> &nbsp;•&nbsp; <span>" + fmtDate(post.publishedAt) + "</span> &nbsp;•&nbsp; <span>" + (post.readingTime || 4) + " min read</span>";
      const cover = post.featuredImage || "";
      if (cover) document.getElementById("postCover").innerHTML = '<img src="' + cover + '" alt="' + SD.escapeHtml(post.title) + '" class="cover">';
      document.getElementById("postBody").innerHTML = post.content || post.excerpt || "";
    }
    SD.api.blogPost(slug).then((r) => {
      if (r.ok && r.data && r.data.data) fill(r.data.data);
      else SD.data.get("blog").then((list) => {
        const p = (list || []).find((x) => x.slug === slug);
        if (p) fill(p);
        else { document.getElementById("postTitle").textContent = "Post Not Found"; document.getElementById("postBody").innerHTML = "<p>We couldn't find that article. <a href='/blog'>Browse all posts</a>.</p>"; }
      });
    }).catch(() => {
      SD.data.get("blog").then((list) => { const p = (list || []).find((x) => x.slug === slug); if (p) fill(p); });
    });
  });
})(window.SD);
