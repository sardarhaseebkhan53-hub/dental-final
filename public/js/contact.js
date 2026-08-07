(function (SD) {
  document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    if (!form) return;
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const btn = document.getElementById("contactBtn");
      const fd = new FormData(form);
      const payload = Object.fromEntries(fd.entries());
      btn.disabled = true; btn.textContent = "Sending…";
      const r = await SD.api.contact(payload).catch(() => ({ ok: false, data: { message: "Network error. Please try again." } }));
      if (r.ok) {
        SD.toast((r.data && r.data.message) || "Message sent! We'll get back to you soon.", "success");
        form.reset();
      } else {
        const msg = (r.data && r.data.message) || "Please fix the highlighted fields.";
        SD.toast(msg, "error");
      }
      btn.disabled = false; btn.innerHTML = 'Send Message <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>';
    });
  });
})(window.SD);
