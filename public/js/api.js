/* Serene Dental — API client helper */
window.SD = window.SD || {};

(function (SD) {
  const TOKEN_KEY = "sd_token";
  const USER_KEY = "sd_user";

  SD.getToken = () => localStorage.getItem(TOKEN_KEY);
  SD.setToken = (t) => localStorage.setItem(TOKEN_KEY, t);
  SD.clearToken = () => localStorage.removeItem(TOKEN_KEY);
  SD.getUser = () => {
    try { return JSON.parse(localStorage.getItem(USER_KEY)); } catch { return null; }
  };
  SD.setUser = (u) => localStorage.setItem(USER_KEY, JSON.stringify(u));
  SD.clearUser = () => localStorage.removeItem(USER_KEY);

  async function request(path, options = {}) {
    const opts = { method: options.method || "GET", headers: { ...(options.headers || {}) } };
    const token = SD.getToken();
    if (token) opts.headers["Authorization"] = `Bearer ${token}`;
    if (options.body !== undefined) {
      if (typeof options.body === "string") {
        opts.headers["Content-Type"] = "application/json";
        opts.body = options.body;
      } else {
        opts.body = options.body; // FormData etc.
      }
    }
    const res = await fetch(`/api${path}`, opts);
    let data = null;
    try { data = await res.json(); } catch { data = { success: false, message: "Invalid server response" }; }
    if (!res.ok && res.status === 401) {
      // Token expired — clear and let caller handle.
      if (!path.includes("/login")) { SD.clearToken(); SD.clearUser(); }
    }
    return { ok: res.ok, status: res.status, data };
  }

  SD.api = {
    get: (p) => request(p),
    post: (p, body, isForm) => request(p, { method: "POST", body: isForm ? body : JSON.stringify(body) }),
    put: (p, body) => request(p, { method: "PUT", body: JSON.stringify(body) }),
    del: (p) => request(p, { method: "DELETE" }),

    // Auth
    login: (email, password) => request("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) }),
    register: (payload) => request("/auth/register", { method: "POST", body: JSON.stringify(payload) }),
    me: () => request("/auth/me"),
    changePassword: (currentPassword, newPassword) => request("/auth/change-password", { method: "POST", body: JSON.stringify({ currentPassword, newPassword }) }),

    // Public
    services: () => request("/public/services"),
    service: (slug) => request(`/public/services/${slug}`),
    doctors: () => request("/public/doctors"),
    testimonials: () => request("/public/testimonials"),
    faqs: () => request("/public/faqs"),
    gallery: () => request("/public/gallery"),
    blog: () => request("/public/blog"),
    blogPost: (slug) => request(`/public/blog/${slug}`),
    stats: () => request("/public/stats"),
    search: (q) => request(`/public/search?q=${encodeURIComponent(q)}`),
    contact: (payload) => request("/public/contact", { method: "POST", body: JSON.stringify(payload) }),
    bookAppointment: (payload) => request("/public/book-appointment", { method: "POST", body: JSON.stringify(payload) }),
    newsletter: (payload) => request("/public/newsletter", { method: "POST", body: JSON.stringify(payload) }),

    // Upload
    upload: (formData) => request("/upload", { method: "POST", body: formData, isForm: true }),

    // Admin
    admin: {
      dashboard: () => request("/admin/dashboard"),
      appointments: (filters = "") => request(`/admin/appointments${filters}`),
      createAppointment: (p) => request("/admin/appointments", { method: "POST", body: JSON.stringify(p) }),
      updateAppointment: (id, p) => request(`/admin/appointments/${id}`, { method: "PUT", body: JSON.stringify(p) }),
      deleteAppointment: (id) => request(`/admin/appointments/${id}`, { method: "DELETE" }),

      doctors: () => request("/admin/doctors"),
      createDoctor: (p) => request("/admin/doctors", { method: "POST", body: JSON.stringify(p) }),
      updateDoctor: (id, p) => request(`/admin/doctors/${id}`, { method: "PUT", body: JSON.stringify(p) }),
      deleteDoctor: (id) => request(`/admin/doctors/${id}`, { method: "DELETE" }),

      services: () => request("/admin/services"),
      createService: (p) => request("/admin/services", { method: "POST", body: JSON.stringify(p) }),
      updateService: (id, p) => request(`/admin/services/${id}`, { method: "PUT", body: JSON.stringify(p) }),
      deleteService: (id) => request(`/admin/services/${id}`, { method: "DELETE" }),

      gallery: () => request("/admin/gallery"),
      createGallery: (p) => request("/admin/gallery", { method: "POST", body: JSON.stringify(p) }),
      updateGallery: (id, p) => request(`/admin/gallery/${id}`, { method: "PUT", body: JSON.stringify(p) }),
      deleteGallery: (id) => request(`/admin/gallery/${id}`, { method: "DELETE" }),

      testimonials: () => request("/admin/testimonials"),
      createTestimonial: (p) => request("/admin/testimonials", { method: "POST", body: JSON.stringify(p) }),
      updateTestimonial: (id, p) => request(`/admin/testimonials/${id}`, { method: "PUT", body: JSON.stringify(p) }),
      deleteTestimonial: (id) => request(`/admin/testimonials/${id}`, { method: "DELETE" }),

      faqs: () => request("/admin/faqs"),
      createFaq: (p) => request("/admin/faqs", { method: "POST", body: JSON.stringify(p) }),
      updateFaq: (id, p) => request(`/admin/faqs/${id}`, { method: "PUT", body: JSON.stringify(p) }),
      deleteFaq: (id) => request(`/admin/faqs/${id}`, { method: "DELETE" }),

      blog: () => request("/admin/blog"),
      createBlog: (p) => request("/admin/blog", { method: "POST", body: JSON.stringify(p) }),
      updateBlog: (id, p) => request(`/admin/blog/${id}`, { method: "PUT", body: JSON.stringify(p) }),
      deleteBlog: (id) => request(`/admin/blog/${id}`, { method: "DELETE" }),

      messages: () => request("/admin/contact-messages"),
      updateMessage: (id, p) => request(`/admin/contact-messages/${id}`, { method: "PUT", body: JSON.stringify(p) }),
      deleteMessage: (id) => request(`/admin/contact-messages/${id}`, { method: "DELETE" }),

      settings: () => request("/admin/settings"),
      updateSettings: (p) => request("/admin/settings", { method: "PUT", body: JSON.stringify(p) }),

      users: () => request("/admin/users"),
      updateUser: (id, p) => request(`/admin/users/${id}`, { method: "PUT", body: JSON.stringify(p) }),
      updateProfile: (p) => request("/admin/profile", { method: "PUT", body: JSON.stringify(p) }),
    },
  };
})(window.SD);
