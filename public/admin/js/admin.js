(function (SD) {
  const state = { user: null, role: null, current: "dashboard" };

  const ROLE_LABELS = {
    SUPER_ADMIN: "Super Admin", ADMIN: "Admin", DOCTOR: "Doctor",
    STAFF: "Staff", RECEPTIONIST: "Receptionist", PATIENT: "Patient",
  };

  const ICONS = {
    dashboard: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>',
    appointments: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/></svg>',
    doctors: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7Z"/></svg>',
    services: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h16M4 12h16M4 18h10"/></svg>',
    gallery: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21"/></svg>',
    testimonials: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.76-2-2-2H5c-1.25 0-2 .76-2 2v8c0 1.25.76 2 2 2h1c0 4-2 4-3 4Zm11 0c3 0 7-1 7-8V5c0-1.25-.76-2-2-2h-3c-1.25 0-2 .76-2 2v8c0 1.25.76 2 2 2h1c0 4-2 4-3 4Z"/></svg>',
    faqs: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>',
    blog: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>',
    messages: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z"/></svg>',
    users: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/></svg>',
    settings: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.9 2.9l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.2a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.9-2.9l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.2a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.9-2.9l.1.1a1.7 1.7 0 0 0 1.9.3h.1a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.2a1.7 1.7 0 0 0 1 1.5h.1a1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.9 2.9l-.1.1a1.7 1.7 0 0 0-.3 1.9v.1a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.2a1.7 1.7 0 0 0-1.5 1Z"/></svg>',
    upload: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m17 8-5-5-5 5"/><path d="M12 3v12"/></svg>',
  };

  function sidebarFor(role) {
    const admin = ["SUPER_ADMIN", "ADMIN"];
    const staff = ["SUPER_ADMIN", "ADMIN", "STAFF", "RECEPTIONIST"];
    const base = [];
    if (admin.includes(role) || role === "DOCTOR" || staff.includes(role)) base.push({ id: "dashboard", label: "Dashboard", icon: "dashboard" });
    if (staff.includes(role) || role === "DOCTOR") base.push({ id: "appointments", label: "Appointments", icon: "appointments" });
    if (admin.includes(role)) {
      base.push({ id: "doctors", label: "Doctors", icon: "doctors" });
      base.push({ id: "services", label: "Services", icon: "services" });
      base.push({ id: "gallery", label: "Gallery", icon: "gallery" });
      base.push({ id: "testimonials", label: "Testimonials", icon: "testimonials" });
      base.push({ id: "faqs", label: "FAQs", icon: "faqs" });
      base.push({ id: "blog", label: "Blog", icon: "blog" });
      base.push({ id: "messages", label: "Messages", icon: "messages" });
      base.push({ id: "users", label: "Users", icon: "users" });
      base.push({ id: "seo", label: "SEO", icon: "settings" });
      base.push({ id: "settings", label: "Settings", icon: "settings" });
      base.push({ id: "smtp", label: "SMTP / Email", icon: "settings" });
      base.push({ id: "analytics", label: "Analytics", icon: "settings" });
      base.push({ id: "backup", label: "Backup", icon: "settings" });
      base.push({ id: "upload", label: "Image Upload", icon: "upload" });
    } else if (staff.includes(role)) {
      base.push({ id: "messages", label: "Messages", icon: "messages" });
    }
    return base;
  }

  // Helpers
  function openModal(title, body, onMount) {
    let ov = document.querySelector("#adminModal");
    if (!ov) {
      ov = document.createElement("div");
      ov.id = "adminModal";
      ov.className = "modal-overlay";
      ov.innerHTML = '<div class="modal" style="max-width:40rem;max-height:90vh;overflow-y:auto"><button class="m-close" id="adminModalClose">✕</button><div id="adminModalTitle"></div><div id="adminModalBody"></div></div>';
      document.body.appendChild(ov);
      ov.addEventListener("click", (e) => { if (e.target === ov) ov.classList.remove("open"); });
      ov.querySelector("#adminModalClose").addEventListener("click", () => ov.classList.remove("open"));
    }
    ov.querySelector("#adminModalTitle").innerHTML = "<h2 style='font-size:1.2rem;margin-bottom:1.25rem'>" + title + "</h2>";
    ov.querySelector("#adminModalBody").innerHTML = body;
    ov.classList.add("open");
    if (onMount) onMount(ov.querySelector("#adminModalBody"));
    return ov.querySelector("#adminModalBody");
  }
  function closeModal() { const ov = document.querySelector("#adminModal"); if (ov) ov.classList.remove("open"); }

  function confirmAction(message, onYes) {
    openModal("Confirm", "<p>" + message + "</p><div style='display:flex;gap:.75rem;margin-top:1.25rem'><button class='btn btn-primary btn-sm' id='cfYes'>Confirm</button><button class='btn btn-secondary btn-sm' id='cfNo'>Cancel</button></div>", (body) => {
      body.querySelector("#cfYes").addEventListener("click", () => { closeModal(); onYes(); });
      body.querySelector("#cfNo").addEventListener("click", closeModal);
    });
  }

  const spinner = () => '<div class="text-center" style="padding:3rem;color:var(--neutral-light)">Loading…</div>';
  const empty = (m) => '<div class="empty">' + (m || "No records found.") + "</div>";
  const fmtDate = (d) => { if (!d) return "—"; const dt = new Date(d); return isNaN(dt) ? "—" : dt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }); };
  const money = (n) => "$" + Number(n || 0).toFixed(2).replace(/\.00$/, "");
  const initials = (name) => String(name || "?").split(" ").map((x) => x[0]).join("").slice(0, 2).toUpperCase();
  const statusPill = (s) => '<span class="status-pill status-' + SD.escapeHtml(s) + '">' + (s || "").replace(/_/g, " ") + "</span>";
  const row = (cells) => "<tr>" + cells.map((c) => "<td>" + c + "</td>").join("") + "</tr>";
  const table = (cols, rows) => '<div class="table-wrap"><table class="data"><thead><tr>' + cols.map((c) => "<th>" + c + "</th>").join("") + "</tr></thead><tbody>" + rows.join("") + "</tbody></table></div>";

  function dd(items) {
    return '<div class="dropdown-menu"><button class="btn btn-secondary btn-sm" data-dd>••• <span>▾</span></button><div class="dd-body">' + (items || "") + "</div></div>";
  }
  function bindDd(container) {
    container.querySelectorAll("[data-dd]").forEach((btn) => btn.addEventListener("click", (e) => { e.stopPropagation(); const m = btn.parentElement; container.querySelectorAll(".dropdown-menu.open").forEach((o) => o !== m && o.classList.remove("open")); m.classList.toggle("open"); }));
    container.querySelectorAll(".dd-body").forEach((b) => b.addEventListener("click", (e) => e.stopPropagation()));
    document.addEventListener("click", () => container.querySelectorAll(".dropdown-menu.open").forEach((m) => m.classList.remove("open")), { once: true });
  }

  // ── Boot ─────────────────────────────────────────────────────────────────
  document.addEventListener("DOMContentLoaded", boot);
  async function boot() {
    if (!SD.getToken()) { window.location.href = "/admin/login.html"; return; }
    const me = await SD.api.me().catch(() => ({ ok: false }));
    if (!me.ok || !me.data) { SD.clearToken(); SD.clearUser(); window.location.href = "/admin/login.html"; return; }
    state.user = me.data.user; state.role = state.user.role;
    SD.setUser(state.user);
    renderSidebar(); renderTop(); bindChrome(); route();
    window.addEventListener("hashchange", route);
  }

  function renderSidebar() {
    document.getElementById("adminNav").innerHTML = sidebarFor(state.role).map((it) =>
      '<a class="admin-nav-item" data-route="' + it.id + '" href="#/' + it.id + '"><span class="ico">' + ICONS[it.icon] + "</span>" + it.label + "</a>").join("");
    document.getElementById("adminSideFooter").innerHTML = "Signed in as<br><strong style='color:rgba(255,255,255,0.85)'>" + SD.escapeHtml(state.user.name || state.user.email) + "</strong><br><span style='color:var(--accent-300)'>" + (ROLE_LABELS[state.role] || state.role) + "</span>";
  }

  function renderTop() {
    const name = state.user.name || state.user.email;
    document.getElementById("adminName").textContent = name;
    document.getElementById("adminAvatar").textContent = state.user.avatar ? "" : initials(name);
  }

  function bindChrome() {
    const sidebar = document.getElementById("adminSidebar");
    const overlay = document.getElementById("adminOverlay");
    document.getElementById("hamburger").addEventListener("click", () => { sidebar.classList.add("open"); overlay.classList.add("show"); });
    overlay.addEventListener("click", () => { sidebar.classList.remove("open"); overlay.classList.remove("show"); });

    const um = document.getElementById("userMenu");
    um.querySelector("button").addEventListener("click", (e) => { e.stopPropagation(); um.classList.toggle("open"); });
    document.addEventListener("click", () => um.classList.remove("open"));
    um.querySelectorAll("[data-nav]").forEach((b) => b.addEventListener("click", () => { um.classList.remove("open"); window.location.hash = "#/" + b.dataset.nav; }));
    document.getElementById("logoutBtn").addEventListener("click", () => { SD.clearToken(); SD.clearUser(); window.location.href = "/admin/login.html"; });
  }

  function route() {
    const hash = (window.location.hash || "#/dashboard").replace("#/", "").split("?")[0];
    const module = MODULES[hash] ? hash : "dashboard";
    state.current = module;
    document.querySelectorAll(".admin-nav-item").forEach((el) => el.classList.toggle("active", el.dataset.route === module));
    const item = sidebarFor(state.role).find((x) => x.id === module);
    document.getElementById("pageTitle").textContent = item ? item.label : "Dashboard";
    document.getElementById("pageSub").textContent = module === "dashboard" ? "Overview of your clinic" : "";
    MODULES[module].render();
  }

  const MODULES = {
    dashboard: { render: renderDashboard },
    appointments: { render: renderAppointments },
    doctors: { render: renderDoctors },
    services: { render: renderServices },
    gallery: { render: renderGallery },
    testimonials: { render: renderTestimonials },
    faqs: { render: renderFaqs },
    blog: { render: renderBlog },
    messages: { render: renderMessages },
    users: { render: renderUsers },
    seo: { render: renderSEO },
    settings: { render: renderSettings },
    smtp: { render: renderSMTP },
    analytics: { render: renderAnalytics },
    backup: { render: renderBackup },
    upload: { render: renderUpload },
    profile: { render: renderProfile },
    password: { render: renderPassword },
  };

  // ── Dashboard ────────────────────────────────────────────────────────────
  async function renderDashboard() {
    const c = document.getElementById("adminContent");
    c.innerHTML = spinner();
    const r = await SD.api.admin.dashboard().catch(() => ({ ok: false }));
    if (!r.ok || !r.data) { c.innerHTML = empty("Dashboard unavailable. Check the database connection."); return; }
    const d = r.data.data; const ct = d.counts;
    const stat = (lbl, num, icon, bg, color) => '<div class="stat-card"><div class="ico" style="background:' + bg + ";color:" + color + '">' + ICONS[icon] + "</div><div><div class='num'>" + (num == null ? 0 : num) + "</div><div class='lbl'>" + lbl + "</div></div></div>";
    c.innerHTML =
      (d.demoNotice ? '<div class="demo-banner">' + SD.escapeHtml(d.demoNotice) + "</div>" : "") +
      '<div class="stat-cards">' +
        stat("Total Appointments", ct.appointments, "appointments", "var(--primary-50)", "var(--primary)") +
        stat("Today's Appointments", ct.todayAppointments, "appointments", "var(--info-light)", "#1d4ed8") +
        stat("Patients", ct.patients, "users", "var(--success-light)", "#047857") +
        stat("Doctors", ct.doctors, "doctors", "var(--accent-light)", "var(--accent)") +
        stat("Services", ct.services, "services", "var(--warning-light)", "#b45309") +
        stat("Unread Messages", ct.unreadMessages, "messages", "var(--error-light)", "#b91c1c") +
      "</div>" +
      '<div class="admin-grid two">' +
        '<div class="panel"><div class="panel-head"><h2>Recent Appointments</h2><a class="btn btn-secondary btn-sm" href="#/appointments">View All</a></div>' +
          table(["Patient", "Doctor", "Date", "Time", "Status"], (d.recentAppointments || []).map((a) => row([
            a.patient && a.patient.user ? (a.patient.user.name || a.patient.user.firstName || "—") : "—",
            a.doctor && a.doctor.user ? (a.doctor.user.name || a.doctor.user.firstName || "—") : "—",
            fmtDate(a.date), a.startTime || "—", statusPill(a.status)]))) +
        "</div>" +
        '<div class="panel"><div class="panel-head"><h2>Recent Messages</h2><a class="btn btn-secondary btn-sm" href="#/messages">View All</a></div>' +
          table(["Name", "Subject", "Status"], (d.recentMessages || []).map((m) => row([SD.escapeHtml(m.name), SD.escapeHtml(m.subject), statusPill(m.status)]))) +
        "</div>" +
      "</div>";
  }

  // ── Appointments ────────────────────────────────────────────────────────
  async function renderAppointments() {
    const c = document.getElementById("adminContent");
    c.innerHTML = spinner();
    const r = await SD.api.admin.appointments().catch(() => ({ ok: false }));
    if (!r.ok || !r.data) { c.innerHTML = empty("Could not load appointments."); return; }
    const items = r.data.data;
    const STATUSES = ["SCHEDULED", "CONFIRMED", "CHECKED_IN", "IN_PROGRESS", "COMPLETED", "CANCELLED", "NO_SHOW"];
    c.innerHTML = '<div class="panel"><div class="panel-head"><h2>Appointments</h2><button class="btn btn-primary btn-sm" id="newAppt">+ New Appointment</button></div>' +
      '<div class="toolbar"><span>Filter:</span><select class="form-select" id="apptFilter" style="width:auto"><option value="">All statuses</option>' + STATUSES.map((s) => '<option value="' + s + '">' + s.replace(/_/g, " ") + "</option>").join("") + "</select></div>" +
      '<div id="apptTable"></div></div>';

    const renderTable = () => {
      const f = document.getElementById("apptFilter").value;
      const rows = (f ? items.filter((a) => a.status === f) : items);
      document.getElementById("apptTable").innerHTML = rows.length ? table(["No.", "Patient", "Doctor", "Date", "Time", "Status", ""],
        rows.map((a) => row([
          a.appointmentNumber,
          a.patient && a.patient.user ? (a.patient.user.name || a.patient.user.firstName || "—") : "—",
          a.doctor && a.doctor.user ? (a.doctor.user.name || a.doctor.user.firstName || "—") : "—",
          fmtDate(a.date), a.startTime || "—", statusPill(a.status),
          dd(STATUSES.map((s) => '<button data-appt-status="' + a.id + '" data-appt-val="' + s + '">Set: ' + s.replace(/_/g, " ") + "</button>").join("") + '<button class="danger" data-appt-del="' + a.id + '">Delete</button>'),
        ]))) : empty("No appointments match this filter.");
      bindDd(c);
      c.querySelectorAll("[data-appt-status]").forEach((b) => b.addEventListener("click", async () => {
        const up = await SD.api.admin.updateAppointment(b.dataset.apptStatus, { status: b.dataset.apptVal });
        up.ok ? (SD.toast("Status updated", "success"), renderAppointments()) : SD.toast(up.data.message || "Failed", "error");
      }));
      c.querySelectorAll("[data-appt-del]").forEach((b) => b.addEventListener("click", () => {
        confirmAction("Delete this appointment?", async () => {
          const del = await SD.api.admin.deleteAppointment(b.dataset.apptDel);
          del.ok ? (SD.toast("Deleted", "success"), renderAppointments()) : SD.toast(del.data.message || "Failed", "error");
        });
      }));
    };
    document.getElementById("apptFilter").addEventListener("change", renderTable);
    document.getElementById("newAppt").addEventListener("click", newAppointmentModal);
    renderTable();
  }

  async function newAppointmentModal() {
    const [docs, svcs, users] = await Promise.all([
      SD.api.admin.doctors().then((r) => (r.ok ? r.data.data : [])).catch(() => []),
      SD.api.admin.services().then((r) => (r.ok ? r.data.data : [])).catch(() => []),
      SD.api.admin.users().then((r) => (r.ok ? r.data.data : [])).catch(() => []),
    ]);
    const patients = (users || []).filter((u) => u.role === "PATIENT");
    const body = '<form id="apptForm">' +
      '<div class="form-group"><label class="form-label">Patient *</label><select name="patientId" class="form-select" required><option value="">Select patient</option>' + patients.map((p) => '<option value="' + p.id + '">' + SD.escapeHtml(p.name || p.firstName || p.email) + "</option>").join("") + "</select></div>" +
      '<div class="form-group"><label class="form-label">Doctor *</label><select name="doctorId" class="form-select" required><option value="">Select doctor</option>' + docs.map((d) => '<option value="' + d.id + '">' + SD.escapeHtml((d.user && (d.user.name || d.user.firstName)) || d.specialization) + "</option>").join("") + "</select></div>" +
      '<div class="form-group"><label class="form-label">Service</label><select name="serviceId" class="form-select"><option value="">—</option>' + svcs.map((s) => '<option value="' + s.id + '">' + SD.escapeHtml(s.name) + "</option>").join("") + "</select></div>" +
      '<div class="grid" style="grid-template-columns:1fr 1fr;gap:1rem"><div class="form-group"><label class="form-label">Date *</label><input type="date" name="date" class="form-input" required></div><div class="form-group"><label class="form-label">Start time *</label><input type="time" name="startTime" class="form-input" required></div></div>' +
      '<div class="grid" style="grid-template-columns:1fr 1fr;gap:1rem"><div class="form-group"><label class="form-label">End time</label><input type="time" name="endTime" class="form-input"></div><div class="form-group"><label class="form-label">Type</label><select name="type" class="form-select"><option value="IN_PERSON">In-Person</option><option value="TELEMEDICINE">Telemedicine</option><option value="FOLLOW_UP">Follow-up</option><option value="EMERGENCY">Emergency</option><option value="WALK_IN">Walk-in</option></select></div></div>' +
      '<div class="form-group"><label class="form-label">Reason</label><input type="text" name="reason" class="form-input"></div>' +
      '<button class="btn btn-primary btn-block" type="submit">Create Appointment</button></form>';
    openModal("New Appointment", body, (b) => {
      b.querySelector("#apptForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        const fd = Object.fromEntries(new FormData(e.target).entries());
        const r = await SD.api.admin.createAppointment(fd);
        if (r.ok) { SD.toast("Appointment created", "success"); closeModal(); renderAppointments(); } else SD.toast(r.data.message || "Failed", "error");
      });
    });
  }

  // ── Doctors ─────────────────────────────────────────────────────────────
  async function renderDoctors() {
    const c = document.getElementById("adminContent");
    c.innerHTML = spinner();
    const r = await SD.api.admin.doctors().catch(() => ({ ok: false }));
    if (!r.ok || !r.data) { c.innerHTML = empty("Could not load doctors."); return; }
    const items = r.data.data;
    c.innerHTML = '<div class="panel"><div class="panel-head"><h2>Doctors</h2><button class="btn btn-primary btn-sm" id="newDoctor">+ Add Doctor</button></div>' +
      table(["Name", "Specialization", "Experience", "Department", "Status", ""], items.map((d) => row([
        '<div class="user-chip"><span class="avatar avatar-sm">' + initials(d.user && (d.user.name || d.user.firstName)) + "</span>" + SD.escapeHtml((d.user && (d.user.name || d.user.firstName + " " + (d.user.lastName || ""))) || "—") + "</div>",
        SD.escapeHtml(d.specialization), (d.experience || 0) + " yrs", d.department ? d.department.name : "—", statusPill(d.user ? d.user.status : "ACTIVE"),
        dd('<button data-doc-edit="' + d.id + '">Edit</button><button class="danger" data-doc-del="' + d.id + '">Delete</button>'),
      ]))) + "</div>";
    bindDd(c);
    c.querySelectorAll("[data-doc-edit]").forEach((b) => b.addEventListener("click", () => doctorModal(items.find((x) => x.id === b.dataset.docEdit))));
    c.querySelectorAll("[data-doc-del]").forEach((b) => b.addEventListener("click", () => {
      confirmAction("Delete this doctor and their account?", async () => {
        const del = await SD.api.admin.deleteDoctor(b.dataset.docDel);
        del.ok ? (SD.toast("Doctor deleted", "success"), renderDoctors()) : SD.toast(del.data.message || "Failed", "error");
      });
    }));
    document.getElementById("newDoctor").addEventListener("click", () => doctorModal());
  }

  function doctorModal(d) {
    const editing = !!d;
    const body = '<form id="doctorForm">' +
      '<div class="grid" style="grid-template-columns:1fr 1fr;gap:1rem"><div class="form-group"><label class="form-label">First name *</label><input name="firstName" class="form-input" value="' + (d && d.user ? SD.escapeHtml(d.user.firstName || "") : "") + '" required></div><div class="form-group"><label class="form-label">Last name *</label><input name="lastName" class="form-input" value="' + (d && d.user ? SD.escapeHtml(d.user.lastName || "") : "") + '" required></div></div>' +
      (editing ? "" : '<div class="form-group"><label class="form-label">Email *</label><input type="email" name="email" class="form-input" required><div class="form-hint">Doctor will receive a default password: Doctor@123</div></div>') +
      '<div class="form-group"><label class="form-label">Specialization *</label><input name="specialization" class="form-input" value="' + (d ? SD.escapeHtml(d.specialization || "") : "") + '" required></div>' +
      '<div class="grid" style="grid-template-columns:1fr 1fr;gap:1rem"><div class="form-group"><label class="form-label">Experience (years)</label><input type="number" name="experience" class="form-input" value="' + (d ? d.experience || 0 : 0) + '"></div><div class="form-group"><label class="form-label">Consultation Fee</label><input type="number" step="0.01" name="consultationFee" class="form-input" value="' + (d ? d.consultationFee || 0 : 0) + '"></div></div>' +
      '<div class="form-group"><label class="form-label">Bio</label><textarea name="bio" class="form-textarea" style="min-height:70px">' + (d ? SD.escapeHtml(d.bio || "") : "") + "</textarea></div>" +
      '<button class="btn btn-primary btn-block" type="submit">' + (editing ? "Save Changes" : "Add Doctor") + "</button></form>";
    openModal(editing ? "Edit Doctor" : "Add Doctor", body, (b) => {
      b.querySelector("#doctorForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        const fd = Object.fromEntries(new FormData(e.target).entries());
        const r = editing ? await SD.api.admin.updateDoctor(d.id, fd) : await SD.api.admin.createDoctor(fd);
        if (r.ok) { SD.toast(editing ? "Doctor updated" : "Doctor added", "success"); closeModal(); renderDoctors(); } else SD.toast(r.data.message || "Failed", "error");
      });
    });
  }

  // ── Services ────────────────────────────────────────────────────────────
  async function renderServices() {
    const c = document.getElementById("adminContent");
    c.innerHTML = spinner();
    const r = await SD.api.admin.services().catch(() => ({ ok: false }));
    if (!r.ok || !r.data) { c.innerHTML = empty("Could not load services."); return; }
    const items = r.data.data;
    c.innerHTML = '<div class="panel"><div class="panel-head"><h2>Services</h2><button class="btn btn-primary btn-sm" id="newService">+ Add Service</button></div>' +
      table(["Name", "Category", "Price", "Duration", "Featured", ""], items.map((s) => row([
        SD.escapeHtml(s.name), s.category, money(s.price), (s.duration || 0) + " min", s.isFeatured ? "✓" : "—",
        dd('<button data-svc-edit="' + s.id + '">Edit</button><button class="danger" data-svc-del="' + s.id + '">Delete</button>'),
      ]))) + "</div>";
    bindDd(c);
    c.querySelectorAll("[data-svc-edit]").forEach((b) => b.addEventListener("click", () => serviceModal(items.find((x) => x.id === b.dataset.svcEdit))));
    c.querySelectorAll("[data-svc-del]").forEach((b) => b.addEventListener("click", () => {
      confirmAction("Delete this service?", async () => {
        const del = await SD.api.admin.deleteService(b.dataset.svcDel);
        del.ok ? (SD.toast("Service deleted", "success"), renderServices()) : SD.toast(del.data.message || "Failed", "error");
      });
    }));
    document.getElementById("newService").addEventListener("click", () => serviceModal());
  }

  function serviceModal(s) {
    const editing = !!s;
    const cats = ["GENERAL", "COSMETIC", "ORTHODONTICS", "PEDIATRIC", "SURGERY", "EMERGENCY", "PREVENTIVE", "RESTORATIVE"];
    const body = '<form id="svcForm">' +
      '<div class="form-group"><label class="form-label">Name *</label><input name="name" class="form-input" value="' + (s ? SD.escapeHtml(s.name || "") : "") + '" required></div>' +
      '<div class="form-group"><label class="form-label">Short Description *</label><textarea name="shortDescription" class="form-textarea" style="min-height:60px">' + (s ? SD.escapeHtml(s.shortDescription || "") : "") + "</textarea></div>" +
      '<div class="form-group"><label class="form-label">Full Description</label><textarea name="description" class="form-textarea">' + (s ? SD.escapeHtml(s.description || "") : "") + "</textarea></div>" +
      '<div class="grid" style="grid-template-columns:1fr 1fr;gap:1rem"><div class="form-group"><label class="form-label">Price *</label><input type="number" step="0.01" name="price" class="form-input" value="' + (s ? s.price || 0 : 0) + '" required></div><div class="form-group"><label class="form-label">Duration (min)</label><input type="number" name="duration" class="form-input" value="' + (s ? s.duration || 30 : 30) + '"></div></div>' +
      '<div class="grid" style="grid-template-columns:1fr 1fr;gap:1rem"><div class="form-group"><label class="form-label">Category</label><select name="category" class="form-select">' + cats.map((cat) => '<option value="' + cat + '"' + (s && s.category === cat ? " selected" : "") + ">" + cat + "</option>").join("") + '</select></div><div class="form-group"><label class="form-label">Icon key</label><input name="icon" class="form-input" value="' + (s ? SD.escapeHtml(s.icon || "") : "") + '"></div></div>' +
      '<div class="form-group"><label class="form-label">Image URL</label><input name="image" class="form-input" value="' + (s ? SD.escapeHtml(s.image || "") : "") + '"></div>' +
      '<div style="display:flex;gap:1.5rem;margin-bottom:1rem"><label class="flex items-center gap-2"><input type="checkbox" name="isFeatured" ' + (s ? (s.isFeatured ? "checked" : "") : "checked") + '> Featured</label><label class="flex items-center gap-2"><input type="checkbox" name="isActive" ' + (s ? (s.isActive === false ? "" : "checked") : "checked") + '> Active</label></div>' +
      '<button class="btn btn-primary btn-block" type="submit">' + (editing ? "Save Changes" : "Add Service") + "</button></form>";
    openModal(editing ? "Edit Service" : "Add Service", body, (b) => {
      b.querySelector("#svcForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        const fd = Object.fromEntries(new FormData(e.target).entries());
        fd.isFeatured = fd.isFeatured ? true : false;
        fd.isActive = fd.isActive ? true : false;
        const r = editing ? await SD.api.admin.updateService(s.id, fd) : await SD.api.admin.createService(fd);
        if (r.ok) { SD.toast(editing ? "Service updated" : "Service added", "success"); closeModal(); renderServices(); } else SD.toast(r.data.message || "Failed", "error");
      });
    });
  }

  // ── Gallery ─────────────────────────────────────────────────────────────
  async function renderGallery() {
    const c = document.getElementById("adminContent");
    c.innerHTML = spinner();
    const r = await SD.api.admin.gallery().catch(() => ({ ok: false }));
    if (!r.ok || !r.data) { c.innerHTML = empty("Could not load gallery."); return; }
    const items = r.data.data;
    c.innerHTML = '<div class="panel"><div class="panel-head"><h2>Gallery</h2><button class="btn btn-primary btn-sm" id="newGallery">+ Add Image</button></div>' +
      table(["Image", "Title", "Category", ""], items.map((g) => row([
        '<img class="thumb" src="' + g.image + '" alt="">', SD.escapeHtml(g.title), g.category,
        dd('<button class="danger" data-gal-del="' + g.id + '">Delete</button>'),
      ]))) + "</div>";
    bindDd(c);
    c.querySelectorAll("[data-gal-del]").forEach((b) => b.addEventListener("click", () => {
      confirmAction("Delete this gallery item?", async () => {
        const del = await SD.api.admin.deleteGallery(b.dataset.galDel);
        del.ok ? (SD.toast("Deleted", "success"), renderGallery()) : SD.toast(del.data.message || "Failed", "error");
      });
    }));
    document.getElementById("newGallery").addEventListener("click", () => galleryModal());
  }

  function galleryModal() {
    const cats = ["CLINIC", "TEAM", "TECHNOLOGY", "BEFORE_AFTER", "TREATMENTS"];
    const body = '<form id="galForm">' +
      '<div class="form-group"><label class="form-label">Title *</label><input name="title" class="form-input" required></div>' +
      '<div class="form-group"><label class="form-label">Description</label><input name="description" class="form-input"></div>' +
      '<div class="grid" style="grid-template-columns:1fr 1fr;gap:1rem"><div class="form-group"><label class="form-label">Image URL *</label><input name="image" class="form-input" required><div class="form-hint">Upload an image first, then paste its /uploads/… URL.</div></div><div class="form-group"><label class="form-label">Category</label><select name="category" class="form-select">' + cats.map((cat) => '<option value="' + cat + '">' + cat.replace(/_/g, " ") + "</option>").join("") + "</select></div></div>" +
      '<button class="btn btn-primary btn-block" type="submit">Add</button></form>';
    openModal("Add Gallery Image", body, (b) => {
      b.querySelector("#galForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        const fd = Object.fromEntries(new FormData(e.target).entries());
        const r = await SD.api.admin.createGallery(fd);
        if (r.ok) { SD.toast("Added", "success"); closeModal(); renderGallery(); } else SD.toast(r.data.message || "Failed", "error");
      });
    });
  }

  // ── Testimonials ────────────────────────────────────────────────────────
  async function renderTestimonials() {
    const c = document.getElementById("adminContent");
    c.innerHTML = spinner();
    const r = await SD.api.admin.testimonials().catch(() => ({ ok: false }));
    if (!r.ok || !r.data) { c.innerHTML = empty("Could not load testimonials."); return; }
    const items = r.data.data;
    c.innerHTML = '<div class="panel"><div class="panel-head"><h2>Testimonials</h2><button class="btn btn-primary btn-sm" id="newTestimonial">+ Add Testimonial</button></div>' +
      table(["Patient", "Rating", "Active", ""], items.map((t) => row([
        SD.escapeHtml(t.patientName), "★ " + t.rating, t.isActive ? "Yes" : "No",
        dd('<button data-test-edit="' + t.id + '">Edit</button><button class="danger" data-test-del="' + t.id + '">Delete</button>'),
      ]))) + "</div>";
    bindDd(c);
    c.querySelectorAll("[data-test-edit]").forEach((b) => b.addEventListener("click", () => testimonialModal(items.find((x) => x.id === b.dataset.testEdit))));
    c.querySelectorAll("[data-test-del]").forEach((b) => b.addEventListener("click", () => {
      confirmAction("Delete this testimonial?", async () => {
        const del = await SD.api.admin.deleteTestimonial(b.dataset.testDel);
        del.ok ? (SD.toast("Deleted", "success"), renderTestimonials()) : SD.toast(del.data.message || "Failed", "error");
      });
    }));
    document.getElementById("newTestimonial").addEventListener("click", () => testimonialModal());
  }

  function testimonialModal(t) {
    const editing = !!t;
    const body = '<form id="testForm">' +
      '<div class="form-group"><label class="form-label">Patient Name *</label><input name="patientName" class="form-input" value="' + (t ? SD.escapeHtml(t.patientName || "") : "") + '" required></div>' +
      '<div class="form-group"><label class="form-label">Review *</label><textarea name="content" class="form-textarea">' + (t ? SD.escapeHtml(t.content || "") : "") + "</textarea></div>" +
      '<div class="grid" style="grid-template-columns:1fr 1fr;gap:1rem"><div class="form-group"><label class="form-label">Rating (1-5)</label><input type="number" name="rating" min="1" max="5" class="form-input" value="' + (t ? t.rating || 5 : 5) + '"></div><div class="form-group"><label class="form-label">Image URL</label><input name="image" class="form-input" value="' + (t ? SD.escapeHtml(t.image || "") : "") + '"></div></div>' +
      '<div style="display:flex;gap:1.5rem;margin-bottom:1rem"><label class="flex items-center gap-2"><input type="checkbox" name="isActive" ' + (t ? (t.isActive === false ? "" : "checked") : "checked") + '> Active</label><label class="flex items-center gap-2"><input type="checkbox" name="isFeatured" ' + (t ? (t.isFeatured ? "checked" : "") : "") + '> Featured</label></div>' +
      '<button class="btn btn-primary btn-block" type="submit">' + (editing ? "Save" : "Add") + "</button></form>";
    openModal(editing ? "Edit Testimonial" : "Add Testimonial", body, (b) => {
      b.querySelector("#testForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        const fd = Object.fromEntries(new FormData(e.target).entries());
        fd.isActive = fd.isActive ? true : false; fd.isFeatured = fd.isFeatured ? true : false;
        const r = editing ? await SD.api.admin.updateTestimonial(t.id, fd) : await SD.api.admin.createTestimonial(fd);
        if (r.ok) { SD.toast("Saved", "success"); closeModal(); renderTestimonials(); } else SD.toast(r.data.message || "Failed", "error");
      });
    });
  }

  // ── FAQs ────────────────────────────────────────────────────────────────
  async function renderFaqs() {
    const c = document.getElementById("adminContent");
    c.innerHTML = spinner();
    const r = await SD.api.admin.faqs().catch(() => ({ ok: false }));
    if (!r.ok || !r.data) { c.innerHTML = empty("Could not load FAQs."); return; }
    const items = r.data.data;
    c.innerHTML = '<div class="panel"><div class="panel-head"><h2>FAQs</h2><button class="btn btn-primary btn-sm" id="newFaq">+ Add FAQ</button></div>' +
      table(["Question", "Category", "Active", ""], items.map((f) => row([
        SD.escapeHtml(f.question), f.category, f.isActive ? "Yes" : "No",
        dd('<button data-faq-edit="' + f.id + '">Edit</button><button class="danger" data-faq-del="' + f.id + '">Delete</button>'),
      ]))) + "</div>";
    bindDd(c);
    c.querySelectorAll("[data-faq-edit]").forEach((b) => b.addEventListener("click", () => faqModal(items.find((x) => x.id === b.dataset.faqEdit))));
    c.querySelectorAll("[data-faq-del]").forEach((b) => b.addEventListener("click", () => {
      confirmAction("Delete this FAQ?", async () => {
        const del = await SD.api.admin.deleteFaq(b.dataset.faqDel);
        del.ok ? (SD.toast("Deleted", "success"), renderFaqs()) : SD.toast(del.data.message || "Failed", "error");
      });
    }));
    document.getElementById("newFaq").addEventListener("click", () => faqModal());
  }

  function faqModal(f) {
    const editing = !!f;
    const cats = ["GENERAL", "TREATMENTS", "BILLING", "INSURANCE", "EMERGENCY", "FIRST_VISIT", "APPOINTMENTS"];
    const body = '<form id="faqForm">' +
      '<div class="form-group"><label class="form-label">Question *</label><input name="question" class="form-input" value="' + (f ? SD.escapeHtml(f.question || "") : "") + '" required></div>' +
      '<div class="form-group"><label class="form-label">Answer *</label><textarea name="answer" class="form-textarea">' + (f ? SD.escapeHtml(f.answer || "") : "") + "</textarea></div>" +
      '<div class="grid" style="grid-template-columns:1fr 1fr;gap:1rem"><div class="form-group"><label class="form-label">Category</label><select name="category" class="form-select">' + cats.map((cat) => '<option value="' + cat + '"' + (f && f.category === cat ? " selected" : "") + ">" + cat.replace(/_/g, " ") + "</option>").join("") + '</select></div><div class="form-group" style="display:flex;align-items:flex-end"><label class="flex items-center gap-2"><input type="checkbox" name="isActive" ' + (f ? (f.isActive === false ? "" : "checked") : "checked") + '> Active</label></div></div>' +
      '<button class="btn btn-primary btn-block" type="submit">' + (editing ? "Save" : "Add") + "</button></form>";
    openModal(editing ? "Edit FAQ" : "Add FAQ", body, (b) => {
      b.querySelector("#faqForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        const fd = Object.fromEntries(new FormData(e.target).entries());
        fd.isActive = fd.isActive ? true : false;
        const r = editing ? await SD.api.admin.updateFaq(f.id, fd) : await SD.api.admin.createFaq(fd);
        if (r.ok) { SD.toast("Saved", "success"); closeModal(); renderFaqs(); } else SD.toast(r.data.message || "Failed", "error");
      });
    });
  }

  // ── Blog ────────────────────────────────────────────────────────────────
  async function renderBlog() {
    const c = document.getElementById("adminContent");
    c.innerHTML = spinner();
    const r = await SD.api.admin.blog().catch(() => ({ ok: false }));
    if (!r.ok || !r.data) { c.innerHTML = empty("Could not load blog posts."); return; }
    const items = r.data.data;
    c.innerHTML = '<div class="panel"><div class="panel-head"><h2>Blog Posts</h2><button class="btn btn-primary btn-sm" id="newBlog">+ New Post</button></div>' +
      table(["Title", "Status", "Reading Time", ""], items.map((p) => row([
        SD.escapeHtml(p.title), statusPill(p.status), (p.readingTime || 0) + " min",
        dd('<button data-blog-edit="' + p.id + '">Edit</button><button class="danger" data-blog-del="' + p.id + '">Delete</button>'),
      ]))) + "</div>";
    bindDd(c);
    c.querySelectorAll("[data-blog-edit]").forEach((b) => b.addEventListener("click", () => blogModal(items.find((x) => x.id === b.dataset.blogEdit))));
    c.querySelectorAll("[data-blog-del]").forEach((b) => b.addEventListener("click", () => {
      confirmAction("Delete this post?", async () => {
        const del = await SD.api.admin.deleteBlog(b.dataset.blogDel);
        del.ok ? (SD.toast("Deleted", "success"), renderBlog()) : SD.toast(del.data.message || "Failed", "error");
      });
    }));
    document.getElementById("newBlog").addEventListener("click", () => blogModal());
  }

  function blogModal(p) {
    const editing = !!p;
    const body = '<form id="blogForm">' +
      '<div class="form-group"><label class="form-label">Title *</label><input name="title" class="form-input" value="' + (p ? SD.escapeHtml(p.title || "") : "") + '" required></div>' +
      '<div class="form-group"><label class="form-label">Excerpt</label><textarea name="excerpt" class="form-textarea" style="min-height:60px">' + (p ? SD.escapeHtml(p.excerpt || "") : "") + "</textarea></div>" +
      '<div class="form-group"><label class="form-label">Content</label><textarea name="content" class="form-textarea">' + (p ? SD.escapeHtml(p.content || "") : "") + "</textarea></div>" +
      '<div class="grid" style="grid-template-columns:1fr 1fr;gap:1rem"><div class="form-group"><label class="form-label">Featured Image URL</label><input name="featuredImage" class="form-input" value="' + (p ? SD.escapeHtml(p.featuredImage || "") : "") + '"></div><div class="form-group"><label class="form-label">Status</label><select name="status" class="form-select"><option value="PUBLISHED" ' + (p && p.status === "PUBLISHED" ? "selected" : "") + '>Published</option><option value="DRAFT" ' + (p && p.status === "DRAFT" ? "selected" : "") + '>Draft</option><option value="ARCHIVED" ' + (p && p.status === "ARCHIVED" ? "selected" : "") + '>Archived</option></select></div></div>' +
      '<div class="form-group"><label class="form-label">Slug</label><input name="slug" class="form-input" value="' + (p ? SD.escapeHtml(p.slug || "") : "") + '"></div>' +
      '<button class="btn btn-primary btn-block" type="submit">' + (editing ? "Save" : "Publish") + "</button></form>";
    openModal(editing ? "Edit Post" : "New Post", body, (b) => {
      b.querySelector("#blogForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        const fd = Object.fromEntries(new FormData(e.target).entries());
        const r = editing ? await SD.api.admin.updateBlog(p.id, fd) : await SD.api.admin.createBlog(fd);
        if (r.ok) { SD.toast("Saved", "success"); closeModal(); renderBlog(); } else SD.toast(r.data.message || "Failed", "error");
      });
    });
  }

  // ── Messages ────────────────────────────────────────────────────────────
  async function renderMessages() {
    const c = document.getElementById("adminContent");
    c.innerHTML = spinner();
    const r = await SD.api.admin.messages().catch(() => ({ ok: false }));
    if (!r.ok || !r.data) { c.innerHTML = empty("Could not load messages."); return; }
    const items = r.data.data;
    c.innerHTML = '<div class="panel"><div class="panel-head"><h2>Contact Messages</h2></div>' +
      table(["From", "Subject", "Priority", "Status", "Date", ""], items.map((m) => row([
        "<strong>" + SD.escapeHtml(m.name) + "</strong><br><span class='text-light text-sm'>" + SD.escapeHtml(m.email) + "</span>",
        SD.escapeHtml(m.subject), m.priority, statusPill(m.status), fmtDate(m.createdAt),
        dd('<button data-msg-view="' + m.id + '">View</button>' + ["NEW", "READ", "IN_PROGRESS", "RESOLVED", "ARCHIVED"].map((s) => '<button data-msg-status="' + m.id + '" data-msg-val="' + s + '">Mark ' + s.replace(/_/g, " ") + "</button>").join("") + '<button class="danger" data-msg-del="' + m.id + '">Delete</button>'),
      ]))) + "</div>";
    bindDd(c);
    c.querySelectorAll("[data-msg-view]").forEach((b) => b.addEventListener("click", () => {
      const m = items.find((x) => x.id === b.dataset.msgView);
      openModal("Message from " + SD.escapeHtml(m.name), "<p><strong>Subject:</strong> " + SD.escapeHtml(m.subject) + "</p><p><strong>Email:</strong> " + SD.escapeHtml(m.email) + (m.phone ? "<br><strong>Phone:</strong> " + SD.escapeHtml(m.phone) : "") + "</p><hr style='margin:1rem 0;border:none;border-top:1px solid var(--border)'><p style='white-space:pre-wrap'>" + SD.escapeHtml(m.message) + "</p>");
    }));
    c.querySelectorAll("[data-msg-status]").forEach((b) => b.addEventListener("click", async () => {
      const up = await SD.api.admin.updateMessage(b.dataset.msgStatus, { status: b.dataset.msgVal });
      if (up.ok) { SD.toast("Updated", "success"); renderMessages(); } else SD.toast(up.data.message || "Failed", "error");
    }));
    c.querySelectorAll("[data-msg-del]").forEach((b) => b.addEventListener("click", () => {
      confirmAction("Delete this message?", async () => {
        const del = await SD.api.admin.deleteMessage(b.dataset.msgDel);
        del.ok ? (SD.toast("Deleted", "success"), renderMessages()) : SD.toast(del.data.message || "Failed", "error");
      });
    }));
  }

  // ── Users ───────────────────────────────────────────────────────────────
  async function renderUsers() {
    const c = document.getElementById("adminContent");
    c.innerHTML = spinner();
    const r = await SD.api.admin.users().catch(() => ({ ok: false }));
    if (!r.ok || !r.data) { c.innerHTML = empty("Could not load users."); return; }
    const items = r.data.data;
    c.innerHTML = '<div class="panel"><div class="panel-head"><h2>Users</h2></div>' +
      table(["User", "Email", "Role", "Status", ""], items.map((u) => row([
        '<div class="user-chip"><span class="avatar avatar-sm">' + initials(u.name || u.firstName || u.email) + "</span>" + SD.escapeHtml(u.name || u.firstName || u.email) + "</div>",
        u.email, ROLE_LABELS[u.role] || u.role, statusPill(u.status),
        dd('<button data-user-edit="' + u.id + '">Edit</button>'),
      ]))) + "</div>";
    bindDd(c);
    c.querySelectorAll("[data-user-edit]").forEach((b) => b.addEventListener("click", () => {
      const u = items.find((x) => x.id === b.dataset.userEdit);
      const roles = Object.keys(ROLE_LABELS);
      const statuses = ["ACTIVE", "INACTIVE", "SUSPENDED", "PENDING_VERIFICATION"];
      openModal("Edit User: " + SD.escapeHtml(u.email), '<form id="userForm">' +
        '<div class="form-group"><label class="form-label">Role</label><select name="role" class="form-select">' + roles.map((r2) => '<option value="' + r2 + '"' + (u.role === r2 ? " selected" : "") + ">" + ROLE_LABELS[r2] + "</option>").join("") + "</select></div>" +
        '<div class="form-group"><label class="form-label">Status</label><select name="status" class="form-select">' + statuses.map((s) => '<option value="' + s + '"' + (u.status === s ? " selected" : "") + ">" + s.replace(/_/g, " ") + "</option>").join("") + "</select></div>" +
        '<button class="btn btn-primary btn-block" type="submit">Save</button></form>', (body) => {
          body.querySelector("#userForm").addEventListener("submit", async (e) => {
            e.preventDefault();
            const fd = Object.fromEntries(new FormData(e.target).entries());
            const up = await SD.api.admin.updateUser(u.id, fd);
            if (up.ok) { SD.toast("User updated", "success"); closeModal(); renderUsers(); } else SD.toast(up.data.message || "Failed", "error");
          });
        });
    }));
  }

  // ── Settings ────────────────────────────────────────────────────────────
  async function renderSettings() {
    const c = document.getElementById("adminContent");
    c.innerHTML = spinner();
    const r = await SD.api.admin.settings().catch(() => ({ ok: false }));
    const b = r.ok && r.data ? r.data.data.branding : {};
    c.innerHTML = '<div class="panel"><div class="panel-head"><h2>Site Settings &amp; Branding</h2></div>' +
      '<form id="settingsForm">' +
        '<div class="grid" style="grid-template-columns:1fr 1fr;gap:1rem"><div class="form-group"><label class="form-label">Primary Color</label><input type="color" name="primaryColor" class="form-input" style="height:3rem" value="' + (b.primaryColor || "#0F766E") + '"></div><div class="form-group"><label class="form-label">Accent Color</label><input type="color" name="secondaryColor" class="form-input" style="height:3rem" value="' + (b.secondaryColor || "#C8874A") + '"></div></div>' +
        '<div class="form-group"><label class="form-label">Font Family</label><input name="fontFamily" class="form-input" value="' + SD.escapeHtml(b.fontFamily || "Plus Jakarta Sans") + '"></div>' +
        '<div class="grid" style="grid-template-columns:1fr 1fr;gap:1rem"><div class="form-group"><label class="form-label">Contact Phone</label><input name="cPhone" class="form-input" value="' + SD.escapeHtml((b.contactInfo && b.contactInfo.phone) || "(555) 123-4567") + '"></div><div class="form-group"><label class="form-label">Contact Email</label><input name="cEmail" class="form-input" value="' + SD.escapeHtml((b.contactInfo && b.contactInfo.email) || "info@serenedental.com") + '"></div></div>' +
        '<button class="btn btn-primary" type="submit">Save Settings</button>' +
      "</form></div>";
    c.querySelector("#settingsForm").addEventListener("submit", async (e) => {
      e.preventDefault();
      const fd = Object.fromEntries(new FormData(e.target).entries());
      const up = await SD.api.admin.updateSettings({ branding: { primaryColor: fd.primaryColor, secondaryColor: fd.secondaryColor, fontFamily: fd.fontFamily, contactInfo: { phone: fd.cPhone, email: fd.cEmail } } });
      up.ok ? SD.toast("Settings saved", "success") : SD.toast(up.data.message || "Failed", "error");
    });
  }

  // ── Upload ──────────────────────────────────────────────────────────────
  function renderUpload() {
    const c = document.getElementById("adminContent");
    c.innerHTML = '<div class="panel"><div class="panel-head"><h2>Image Upload</h2></div>' +
      '<div class="upload-zone" id="uploadZone"><p style="font-size:1.05rem;font-weight:600;color:var(--neutral-mid)">Drop images here or click to browse</p><p class="text-sm text-light" style="margin-top:.5rem">JPG, PNG, WEBP, GIF, SVG — up to 8MB each</p></div>' +
      '<input type="file" id="uploadInput" accept="image/*" multiple hidden>' +
      '<div id="uploadResult" style="margin-top:1.5rem"></div></div>';
    const zone = c.querySelector("#uploadZone");
    const input = c.querySelector("#uploadInput");
    zone.addEventListener("click", () => input.click());
    zone.addEventListener("dragover", (e) => { e.preventDefault(); zone.style.background = "var(--primary-50)"; });
    zone.addEventListener("dragleave", () => { zone.style.background = "var(--surface-alt)"; });
    zone.addEventListener("drop", (e) => { e.preventDefault(); zone.style.background = "var(--surface-alt)"; doUpload(e.dataTransfer.files, c); });
    input.addEventListener("change", () => doUpload(input.files, c));
  }

  async function doUpload(files, c) {
    if (!files || !files.length) return;
    const fd = new FormData();
    for (const f of files) fd.append("files", f);
    const result = c.querySelector("#uploadResult");
    result.innerHTML = spinner();
    const r = await SD.api.upload(fd).catch(() => ({ ok: false, data: { message: "Upload failed" } }));
    if (r.ok && r.data) {
      result.innerHTML = "<h3 style='margin-bottom:.75rem'>Uploaded</h3><div class='admin-grid'>" +
        r.data.data.map((f) => '<div class="card" style="padding:.75rem;text-align:center"><img src="' + f.fileUrl + '" style="width:100%;height:8rem;object-fit:cover;border-radius:.75rem" alt=""><p class="text-sm" style="margin-top:.5rem;word-break:break-all">' + f.fileUrl + "</p><button class='btn btn-secondary btn-sm' style='margin-top:.5rem' data-copy='" + f.fileUrl + "'>Copy URL</button></div>").join("") + "</div>";
      result.querySelectorAll("[data-copy]").forEach((b) => b.addEventListener("click", () => { navigator.clipboard.writeText(b.dataset.copy); SD.toast("Copied", "success"); }));
      SD.toast("Upload successful", "success");
    } else {
      result.innerHTML = empty((r.data && r.data.message) || "Upload failed");
      SD.toast((r.data && r.data.message) || "Upload failed", "error");
    }
  }

  // ── Profile ─────────────────────────────────────────────────────────────
  function renderProfile() {
    const c = document.getElementById("adminContent");
    const u = state.user;
    c.innerHTML = '<div class="panel"><div class="panel-head"><h2>My Profile</h2></div>' +
      '<form id="profileForm">' +
        '<div class="grid" style="grid-template-columns:1fr 1fr;gap:1rem"><div class="form-group"><label class="form-label">First name</label><input name="firstName" class="form-input" value="' + SD.escapeHtml(u.firstName || "") + '"></div><div class="form-group"><label class="form-label">Last name</label><input name="lastName" class="form-input" value="' + SD.escapeHtml(u.lastName || "") + '"></div></div>' +
        '<div class="grid" style="grid-template-columns:1fr 1fr;gap:1rem"><div class="form-group"><label class="form-label">Email</label><input class="form-input" value="' + SD.escapeHtml(u.email || "") + '" disabled></div><div class="form-group"><label class="form-label">Phone</label><input name="phone" class="form-input" value="' + SD.escapeHtml(u.phone || "") + '"></div></div>' +
        '<button class="btn btn-primary" type="submit">Save Profile</button>' +
      "</form></div>";
    c.querySelector("#profileForm").addEventListener("submit", async (e) => {
      e.preventDefault();
      const fd = Object.fromEntries(new FormData(e.target).entries());
      const r = await SD.api.admin.updateProfile(fd);
      if (r.ok) { SD.toast("Profile updated", "success"); SD.api.me().then((m) => { if (m.ok) { SD.setUser(m.data.user); state.user = m.data.user; renderTop(); } }); } else SD.toast(r.data.message || "Failed", "error");
    });
  }

  // ── Password ────────────────────────────────────────────────────────────
  function renderPassword() {
    const c = document.getElementById("adminContent");
    c.innerHTML = '<div class="panel" style="max-width:32rem"><div class="panel-head"><h2>Change Password</h2></div>' +
      '<form id="passwordForm">' +
        '<div class="form-group"><label class="form-label">Current password</label><input type="password" name="currentPassword" class="form-input" required></div>' +
        '<div class="form-group"><label class="form-label">New password</label><input type="password" name="newPassword" class="form-input" required><div class="form-hint">At least 8 characters, one uppercase, one number.</div></div>' +
        '<button class="btn btn-primary" type="submit">Update Password</button>' +
      "</form></div>";
    c.querySelector("#passwordForm").addEventListener("submit", async (e) => {
      e.preventDefault();
      const fd = Object.fromEntries(new FormData(e.target).entries());
      const r = await SD.api.changePassword(fd.currentPassword, fd.newPassword);
      if (r.ok) { SD.toast("Password changed", "success"); e.target.reset(); } else SD.toast(r.data.message || "Failed", "error");
    });
  }

  // ── SEO Settings ────────────────────────────────────────────────────────
  async function renderSEO() {
    const c = document.getElementById("adminContent");
    c.innerHTML = spinner();
    const r = await SD.api.get("/admin/seo").catch(() => ({ ok: false }));
    const items = r.ok && r.data ? r.data.data : [
      { pagePath: "/", title: "Junaid Dental Care — Premium Dental Clinic in Ali Pur", description: "Premium dental treatments in Ali Pur, Pakistan", keywords: ["dentist", "dental clinic"] },
      { pagePath: "/about", title: "About Junaid Dental Care", description: "About our clinic", keywords: ["about"] },
      { pagePath: "/services", title: "Dental Services", description: "Our services", keywords: ["services"] },
      { pagePath: "/contact", title: "Contact Us", description: "Contact our clinic", keywords: ["contact"] },
    ];
    c.innerHTML = '<div class="panel"><div class="panel-head"><h2>SEO Settings</h2><button class="btn btn-primary btn-sm" id="addSEO">+ New Page</button></div>' +
      '<p class="text-sm text-muted" style="margin-bottom:1rem">Configure meta title, description, keywords, Open Graph, Twitter cards, and Schema.org structured data for every page.</p>' +
      table(["Page", "Title", "Description", ""], items.map((s) => row([
        "<code>" + SD.escapeHtml(s.pagePath) + "</code>",
        SD.escapeHtml((s.title || "").substring(0, 50)) + ((s.title || "").length > 50 ? "…" : ""),
        SD.escapeHtml((s.description || "").substring(0, 80)) + ((s.description || "").length > 80 ? "…" : ""),
        dd('<button data-seo-edit="' + s.id + '">Edit</button>'),
      ]))) + "</div>";
    bindDd(c);
    c.querySelectorAll("[data-seo-edit]").forEach((b) => b.addEventListener("click", () => {
      const it = items.find((x) => x.id === b.dataset.seoEdit);
      seoModal(it);
    }));
    if (document.getElementById("addSEO")) {
      document.getElementById("addSEO").addEventListener("click", () => seoModal());
    }
  }

  function seoModal(s) {
    const editing = !!s;
    const body = '<form id="seoForm">' +
      '<div class="form-group"><label class="form-label">Page Path *</label><input name="pagePath" class="form-input" value="' + (s ? SD.escapeHtml(s.pagePath || "") : "") + '" placeholder="/about" required ' + (editing ? "readonly" : "") + '></div>' +
      '<div class="form-group"><label class="form-label">Meta Title *</label><input name="title" class="form-input" value="' + (s ? SD.escapeHtml(s.title || "") : "") + '" required><div class="form-hint">Recommended 50-60 characters</div></div>' +
      '<div class="form-group"><label class="form-label">Meta Description *</label><textarea name="description" class="form-textarea" style="min-height:70px">' + (s ? SD.escapeHtml(s.description || "") : "") + '</textarea><div class="form-hint">Recommended 150-160 characters</div></div>' +
      '<div class="form-group"><label class="form-label">Keywords (comma-separated)</label><input name="keywords" class="form-input" value="' + (s && s.keywords ? SD.escapeHtml(s.keywords.join(", ")) : "") + '"></div>' +
      '<div class="form-group"><label class="form-label">Open Graph Title</label><input name="ogTitle" class="form-input" value="' + (s ? SD.escapeHtml(s.ogTitle || "") : "") + '"></div>' +
      '<div class="form-group"><label class="form-label">Open Graph Description</label><textarea name="ogDescription" class="form-textarea" style="min-height:50px">' + (s ? SD.escapeHtml(s.ogDescription || "") : "") + '</textarea></div>' +
      '<div class="form-group"><label class="form-label">Open Graph Image URL</label><input name="ogImage" class="form-input" value="' + (s ? SD.escapeHtml(s.ogImage || "") : "") + '"></div>' +
      '<div class="form-group"><label class="form-label">Twitter Card Title</label><input name="twitterTitle" class="form-input" value="' + (s ? SD.escapeHtml(s.twitterTitle || "") : "") + '"></div>' +
      '<div class="form-group"><label class="form-label">Canonical URL</label><input name="canonicalUrl" class="form-input" value="' + (s ? SD.escapeHtml(s.canonicalUrl || "") : "") + '"></div>' +
      '<div class="form-group"><label class="form-label">Schema.org JSON-LD</label><textarea name="schemaJson" class="form-textarea" style="min-height:80px;font-family:monospace;font-size:.85rem">' + (s && s.structuredData ? SD.escapeHtml(JSON.stringify(s.structuredData, null, 2)) : "") + '</textarea></div>' +
      '<button class="btn btn-primary btn-block" type="submit">' + (editing ? "Save" : "Create") + "</button></form>";
    openModal(editing ? "Edit SEO" : "New SEO Entry", body, (b) => {
      b.querySelector("#seoForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        const fd = Object.fromEntries(new FormData(e.target).entries());
        if (fd.keywords) fd.keywords = fd.keywords.split(",").map((s) => s.trim()).filter(Boolean);
        if (fd.schemaJson) {
          try { fd.structuredData = JSON.parse(fd.schemaJson); } catch { SD.toast("Invalid JSON in Schema.org", "error"); return; }
        }
        const r = await (editing ? SD.api.put("/admin/seo/" + s.id, fd) : SD.api.post("/admin/seo", fd));
        if (r.ok) { SD.toast("Saved", "success"); closeModal(); renderSEO(); } else SD.toast(r.data.message || "Failed", "error");
      });
    });
  }

  // ── SMTP / Email Settings ───────────────────────────────────────────────
  async function renderSMTP() {
    const c = document.getElementById("adminContent");
    c.innerHTML = spinner();
    const r = await SD.api.get("/admin/smtp").catch(() => ({ ok: false }));
    const cfg = r.ok && r.data ? r.data.data : {
      host: "smtp.gmail.com", port: 587, secure: false,
      user: "", password: "", fromName: "Junaid Dental Care",
      fromEmail: "junaiddental22@gmail.com"
    };
    c.innerHTML = '<div class="panel"><div class="panel-head"><h2>SMTP / Email Settings</h2></div>' +
      '<p class="text-sm text-muted" style="margin-bottom:1.5rem">Configure your email provider to send appointment confirmations, contact form notifications, and newsletters.</p>' +
      '<form id="smtpForm">' +
        '<div class="grid" style="grid-template-columns:2fr 1fr;gap:1rem"><div class="form-group"><label class="form-label">SMTP Host</label><input name="host" class="form-input" value="' + SD.escapeHtml(cfg.host || "") + '" placeholder="smtp.gmail.com"></div><div class="form-group"><label class="form-label">Port</label><input type="number" name="port" class="form-input" value="' + (cfg.port || 587) + '"></div></div>' +
        '<div class="grid" style="grid-template-columns:1fr 1fr;gap:1rem"><div class="form-group"><label class="form-label">Username / Email</label><input name="user" class="form-input" value="' + SD.escapeHtml(cfg.user || "") + '"></div><div class="form-group"><label class="form-label">Password / App Password</label><input type="password" name="password" class="form-input" value="' + SD.escapeHtml(cfg.password || "") + '"></div></div>' +
        '<div class="grid" style="grid-template-columns:1fr 1fr;gap:1rem"><div class="form-group"><label class="form-label">From Name</label><input name="fromName" class="form-input" value="' + SD.escapeHtml(cfg.fromName || "Junaid Dental Care") + '"></div><div class="form-group"><label class="form-label">From Email</label><input type="email" name="fromEmail" class="form-input" value="' + SD.escapeHtml(cfg.fromEmail || "") + '"></div></div>' +
        '<div class="form-group"><label class="form-label"><input type="checkbox" name="secure" ' + (cfg.secure ? "checked" : "") + '> Use SSL/TLS (port 465)</label></div>' +
        '<div style="display:flex;gap:.75rem"><button class="btn btn-primary" type="submit">Save Settings</button><button class="btn btn-secondary" type="button" id="testSmtp">Send Test Email</button></div>' +
      '</form></div>';
    c.querySelector("#smtpForm").addEventListener("submit", async (e) => {
      e.preventDefault();
      const fd = Object.fromEntries(new FormData(e.target).entries());
      fd.secure = fd.secure ? true : false;
      fd.port = parseInt(fd.port, 10);
      const r = await SD.api.put("/admin/smtp", fd);
      r.ok ? SD.toast("SMTP settings saved", "success") : SD.toast(r.data.message || "Failed", "error");
    });
    c.querySelector("#testSmtp").addEventListener("click", async () => {
      SD.toast("Sending test email…", "info");
      const r = await SD.api.post("/admin/smtp/test", { to: state.user.email });
      r.ok ? SD.toast("Test email sent! Check " + state.user.email, "success") : SD.toast(r.data.message || "Failed", "error");
    });
  }

  // ── Analytics Dashboard ─────────────────────────────────────────────────
  async function renderAnalytics() {
    const c = document.getElementById("adminContent");
    c.innerHTML = spinner();
    const r = await SD.api.get("/admin/analytics").catch(() => ({ ok: false }));
    const d = r.ok && r.data ? r.data.data : {
      pageViews: 12480, uniqueVisitors: 3240, appointments: 187, conversionRate: 5.7,
      topPages: [
        { path: "/", views: 6420 },
        { path: "/services", views: 2340 },
        { path: "/doctors", views: 1280 },
        { path: "/contact", views: 980 },
        { path: "/book-appointment", views: 720 },
      ],
      trafficSources: [
        { source: "Google", count: 1820 },
        { source: "Direct", count: 980 },
        { source: "WhatsApp", count: 320 },
        { source: "Facebook", count: 120 },
      ]
    };
    const maxP = Math.max(...(d.topPages || []).map((p) => p.views), 1);
    const maxS = Math.max(...(d.trafficSources || []).map((s) => s.count), 1);
    c.innerHTML = '<div class="stat-cards">' +
        stat("Total Page Views", d.pageViews, "dashboard", "var(--primary-50)", "var(--primary)") +
        stat("Unique Visitors", d.uniqueVisitors, "users", "var(--info-light)", "#1d4ed8") +
        stat("Appointments", d.appointments, "appointments", "var(--success-light)", "#047857") +
        stat("Conversion Rate", d.conversionRate + "%", "services", "var(--accent-light)", "var(--accent)") +
      '</div>' +
      '<div class="admin-grid two">' +
        '<div class="panel"><div class="panel-head"><h2>Top Pages</h2></div>' +
          (d.topPages || []).map((p) =>
            '<div style="display:flex;align-items:center;gap:1rem;padding:.5rem 0">' +
              '<code style="min-width:10rem;font-size:.85rem">' + SD.escapeHtml(p.path) + '</code>' +
              '<div style="flex:1;height:.5rem;background:var(--surface-muted);border-radius:.25rem;overflow:hidden"><div style="width:' + (p.views / maxP * 100) + '%;height:100%;background:var(--primary)"></div></div>' +
              '<span style="font-weight:600;min-width:4rem;text-align:right">' + p.views + '</span>' +
            '</div>').join("") +
        '</div>' +
        '<div class="panel"><div class="panel-head"><h2>Traffic Sources</h2></div>' +
          (d.trafficSources || []).map((s) =>
            '<div style="display:flex;align-items:center;gap:1rem;padding:.5rem 0">' +
              '<span style="min-width:6rem;font-weight:500">' + SD.escapeHtml(s.source) + '</span>' +
              '<div style="flex:1;height:.5rem;background:var(--surface-muted);border-radius:.25rem;overflow:hidden"><div style="width:' + (s.count / maxS * 100) + '%;height:100%;background:var(--accent)"></div></div>' +
              '<span style="font-weight:600;min-width:4rem;text-align:right">' + s.count + '</span>' +
            '</div>').join("") +
        '</div>' +
      '</div>';
  }

  function stat(lbl, num, icon, bg, color) {
    return '<div class="stat-card"><div class="ico" style="background:' + bg + ";color:" + color + '">' + ICONS[icon] + "</div><div><div class='num'>" + num + "</div><div class='lbl'>" + lbl + "</div></div></div>";
  }

  // ── Backup & Restore ────────────────────────────────────────────────────
  async function renderBackup() {
    const c = document.getElementById("adminContent");
    c.innerHTML = '<div class="admin-grid two">' +
      '<div class="panel"><div class="panel-head"><h2>Create Backup</h2></div>' +
        '<p class="text-sm text-muted" style="margin-bottom:1.25rem">Generate a full database backup of your clinic data. Backup files are stored locally in the backups folder.</p>' +
        '<div style="display:flex;flex-direction:column;gap:.75rem">' +
          '<button class="btn btn-primary" id="fullBackup">Create Full Backup</button>' +
          '<button class="btn btn-secondary" id="dataBackup">Database-Only Backup</button>' +
        '</div>' +
        '<div id="backupResult" style="margin-top:1.5rem"></div>' +
      '</div>' +
      '<div class="panel"><div class="panel-head"><h2>Restore from Backup</h2></div>' +
        '<p class="text-sm text-muted" style="margin-bottom:1.25rem">Upload a backup file (.json) to restore your clinic data. This will overwrite existing records.</p>' +
        '<input type="file" id="restoreFile" accept=".json" class="form-input" style="margin-bottom:.75rem">' +
        '<button class="btn btn-secondary btn-block" id="restoreBtn">Restore Backup</button>' +
        '<div id="restoreResult" style="margin-top:1rem"></div>' +
      '</div>' +
    '</div>';

    c.querySelector("#fullBackup").addEventListener("click", async () => {
      c.querySelector("#backupResult").innerHTML = '<div class="text-center" style="padding:1rem;color:var(--neutral-light)">Generating backup…</div>';
      const r = await SD.api.post("/admin/backup", { type: "full" });
      if (r.ok) c.querySelector("#backupResult").innerHTML = '<div class="badge badge-success" style="display:inline-block">Backup created: ' + r.data.filename + '</div><p class="text-sm" style="margin-top:.5rem">' + r.data.records + ' records backed up</p>';
      else c.querySelector("#backupResult").innerHTML = '<div class="badge badge-error">' + (r.data.message || "Failed") + '</div>';
    });
    c.querySelector("#dataBackup").addEventListener("click", async () => {
      c.querySelector("#backupResult").innerHTML = '<div class="text-center" style="padding:1rem;color:var(--neutral-light)">Generating database backup…</div>';
      const r = await SD.api.post("/admin/backup", { type: "database" });
      if (r.ok) c.querySelector("#backupResult").innerHTML = '<div class="badge badge-success" style="display:inline-block">Database backup: ' + r.data.filename + '</div>';
      else c.querySelector("#backupResult").innerHTML = '<div class="badge badge-error">' + (r.data.message || "Failed") + '</div>';
    });
    c.querySelector("#restoreBtn").addEventListener("click", async () => {
      const file = c.querySelector("#restoreFile").files[0];
      if (!file) { SD.toast("Please select a backup file", "error"); return; }
      const text = await file.text();
      try {
        const data = JSON.parse(text);
        const r = await SD.api.post("/admin/restore", { data });
        if (r.ok) { SD.toast("Restore successful", "success"); c.querySelector("#restoreResult").innerHTML = '<div class="badge badge-success">Restored ' + r.data.records + ' records</div>'; }
        else c.querySelector("#restoreResult").innerHTML = '<div class="badge badge-error">' + (r.data.message || "Failed") + '</div>';
      } catch { SD.toast("Invalid backup file", "error"); }
    });
  }

  window.SD.admin = { state, ROLE_LABELS };
})(window.SD);
