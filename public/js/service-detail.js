(function (SD) {
  document.addEventListener("DOMContentLoaded", function () {
    const slug = window.location.pathname.replace(/^\/services\//, "").replace(/\.html$/, "");

    // Data may be from API (returns array) or we fetch single.
    function fill(svc) {
      document.title = svc.name + " | Serene Dental";
      document.getElementById("crumbSlug").textContent = svc.name;
      document.getElementById("svcTitle").textContent = svc.name;
      document.getElementById("svcShort").textContent = svc.shortDescription || svc.description;
      document.getElementById("svcDuration").textContent = (svc.duration || 30) + " min";
      document.getElementById("svcPrice").textContent = SD.formatMoney(svc.price) || "Call for quote";
      document.getElementById("svcCategory").textContent = svc.category || "General";
      if (svc.image) {
        document.getElementById("svcImageWrap").innerHTML = '<img src="' + svc.image + '" alt="' + SD.escapeHtml(svc.name) + '" class="cover" style="border-radius:1.5rem;margin-bottom:2rem">';
      }
      document.getElementById("svcDesc").innerHTML = svc.description || svc.shortDescription || "";
    }

    // Try the single-service endpoint, fall back to the list.
    SD.api.service(slug).then((r) => {
      if (r.ok && r.data) { fill(r.data); return; }
      SD.data.get("services").then((list) => {
        const s = (list || []).find((x) => x.slug === slug);
        if (s) fill(s);
        else {
          document.getElementById("svcTitle").textContent = "Service Not Found";
          document.getElementById("svcDesc").textContent = "We couldn't find that service. Please browse all services.";
        }
      });
    }).catch(() => {
      SD.data.get("services").then((list) => {
        const s = (list || []).find((x) => x.slug === slug);
        if (s) fill(s);
      });
    });
  });
})(window.SD);
