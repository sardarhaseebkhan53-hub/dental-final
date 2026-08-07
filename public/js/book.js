(function (SD) {
  const TIME_SLOTS = ["08:00","08:30","09:00","09:30","10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30","18:00","18:30","19:00","19:30"];

  document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("bookingForm");
    if (!form) return;

    // Populate services
    SD.data.get("services").then((services) => {
      const sel = document.getElementById("bkService");
      sel.innerHTML = '<option value="">Select a service</option>' + services.map((s) => '<option value="' + s.id + '">' + SD.escapeHtml(s.name) + "</option>").join("");
    });
    // Populate doctors
    SD.data.get("doctors").then((docs) => {
      const sel = document.getElementById("bkDoctor");
      sel.innerHTML = '<option value="">Select a doctor</option>' + docs.map((d) => '<option value="' + d.id + '">' + SD.escapeHtml(d.name) + " — " + SD.escapeHtml(d.specialization) + "</option>").join("");
    });
    // Populate time slots
    document.getElementById("bkTime").innerHTML = '<option value="">Select a time</option>' + TIME_SLOTS.map((t) => '<option value="' + t + '">' + t + "</option>").join("");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const btn = document.getElementById("bkBtn");
      const fd = new FormData(form);
      const payload = Object.fromEntries(fd.entries());
      btn.disabled = true; btn.textContent = "Submitting…";
      const r = await SD.api.bookAppointment(payload).catch(() => ({ ok: false, data: { message: "Network error. Please try again." } }));
      if (r.ok) {
        SD.toast((r.data && r.data.message) || "Appointment requested successfully!", "success");
        form.reset();
      } else {
        const errors = r.data && r.data.errors;
        SD.toast((errors && errors.map((x) => x.message).join(", ")) || (r.data && r.data.message) || "Please check your details.", "error");
      }
      btn.disabled = false; btn.innerHTML = 'Confirm Appointment <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';
    });
  });
})(window.SD);
