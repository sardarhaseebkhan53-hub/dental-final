(function (SD) {
  document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
      loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const btn = document.getElementById("loginBtn");
        const fd = new FormData(loginForm);
        btn.disabled = true; btn.textContent = "Logging in…";
        const r = await SD.api.login(fd.get("email"), fd.get("password")).catch(() => ({ ok: false, data: { message: "Network error." } }));
        if (r.ok && r.data && r.data.data && r.data.data.token) {
          SD.setToken(r.data.data.token);
          SD.setUser(r.data.data.user);
          SD.toast("Welcome back!", "success");
          const role = r.data.data.user.role;
          const staffRoles = ["SUPER_ADMIN", "ADMIN", "STAFF", "RECEPTIONIST", "DOCTOR"];
          setTimeout(() => { window.location.href = staffRoles.includes(role) ? "/admin" : "/"; }, 700);
        } else {
          SD.toast((r.data && r.data.message) || "Login failed.", "error");
          btn.disabled = false; btn.textContent = "Log In";
        }
      });
    }

    const regForm = document.getElementById("registerForm");
    if (regForm) {
      regForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const btn = document.getElementById("regBtn");
        const fd = new FormData(regForm);
        const payload = Object.fromEntries(fd.entries());
        btn.disabled = true; btn.textContent = "Creating account…";
        const r = await SD.api.register(payload).catch(() => ({ ok: false, data: { message: "Network error." } }));
        if (r.ok && r.data && r.data.data && r.data.data.token) {
          SD.setToken(r.data.data.token);
          SD.setUser(r.data.data.user);
          SD.toast("Account created!", "success");
          setTimeout(() => { window.location.href = "/"; }, 700);
        } else {
          const errors = r.data && r.data.errors;
          SD.toast((errors && errors.map((x) => x.message).join(", ")) || (r.data && r.data.message) || "Registration failed.", "error");
          btn.disabled = false; btn.textContent = "Create Account";
        }
      });
    }

    const resetForm = document.getElementById("resetForm");
    if (resetForm) {
      resetForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const btn = document.getElementById("rpBtn");
        const token = new URLSearchParams(window.location.search).get("token") || "";
        const fd = new FormData(resetForm);
        btn.disabled = true; btn.textContent = "Resetting…";
        const r = await SD.api.post("/auth/reset-password", { token, password: fd.get("password") }).catch(() => ({ ok: false, data: { message: "Network error." } }));
        if (r.ok) {
          SD.toast("Password reset successful. Please log in.", "success");
          setTimeout(() => { window.location.href = "/login"; }, 900);
        } else {
          SD.toast((r.data && r.data.message) || "Reset failed.", "error");
          btn.disabled = false; btn.textContent = "Reset Password";
        }
      });
    }

    const forgotForm = document.getElementById("forgotForm");
    if (forgotForm) {
      forgotForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const btn = document.getElementById("fpBtn");
        const fd = new FormData(forgotForm);
        btn.disabled = true; btn.textContent = "Sending…";
        const r = await SD.api.post("/auth/forgot-password", { email: fd.get("email") }).catch(() => ({ ok: false }));
        SD.toast("If that email exists, a reset link has been sent.", "info");
        btn.disabled = false; btn.textContent = "Send Reset Link";
      });
    }
  });
})(window.SD);
