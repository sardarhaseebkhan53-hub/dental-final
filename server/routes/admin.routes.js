const router = require("express").Router();
const c = require("../controllers/admin.controller");
const demo = require("../controllers/admin.demo.controller");
const prisma = require("../lib/prisma");
const { requireAuth, requireRole } = require("../middleware/auth");
const { sanitize } = require("../middleware/validate");

// Any authenticated staff member (non-patient) may use the management API.
const staff = requireRole("SUPER_ADMIN", "ADMIN", "STAFF", "RECEPTIONIST", "DOCTOR");
const adminOnly = requireRole("SUPER_ADMIN", "ADMIN");
const superAdminOnly = requireRole("SUPER_ADMIN");

router.use(requireAuth);
router.use(sanitize);

// When no database is configured, serve demo data so the admin panel stays usable.
const d = (real, demoFn) => (req, res) => (prisma.demoMode ? demoFn(req, res) : real(req, res));

// Dashboard
router.get("/dashboard", staff, d(c.dashboard, demo.dashboard));

// Appointments
router.get("/appointments", staff, d(c.listAppointments, demo.listAppointments));
router.post("/appointments", staff, d(c.createAppointment, demo.createAppointment));
router.put("/appointments/:id", staff, d(c.updateAppointment, demo.updateAppointment));
router.delete("/appointments/:id", staff, d(c.deleteAppointment, demo.deleteAppointment));

// Doctors
router.get("/doctors", staff, d(c.listDoctors, demo.listDoctors));
router.post("/doctors", adminOnly, d(c.createDoctor, demo.createDoctor));
router.put("/doctors/:id", adminOnly, d(c.updateDoctor, demo.updateDoctor));
router.delete("/doctors/:id", adminOnly, d(c.deleteDoctor, demo.deleteDoctor));

// Services
router.get("/services", staff, d(c.listServices, demo.listServices));
router.post("/services", adminOnly, d(c.createService, demo.createService));
router.put("/services/:id", adminOnly, d(c.updateService, demo.updateService));
router.delete("/services/:id", adminOnly, d(c.deleteService, demo.deleteService));

// Gallery
router.get("/gallery", staff, d(c.listGallery, demo.listGallery));
router.post("/gallery", adminOnly, d(c.createGallery, demo.createGallery));
router.put("/gallery/:id", adminOnly, d(c.updateGallery, demo.updateGallery));
router.delete("/gallery/:id", adminOnly, d(c.deleteGallery, demo.deleteGallery));

// Testimonials
router.get("/testimonials", staff, d(c.listTestimonials, demo.listTestimonials));
router.post("/testimonials", adminOnly, d(c.createTestimonial, demo.createTestimonial));
router.put("/testimonials/:id", adminOnly, d(c.updateTestimonial, demo.updateTestimonial));
router.delete("/testimonials/:id", adminOnly, d(c.deleteTestimonial, demo.deleteTestimonial));

// FAQs
router.get("/faqs", staff, d(c.listFaqs, demo.listFaqs));
router.post("/faqs", adminOnly, d(c.createFaq, demo.createFaq));
router.put("/faqs/:id", adminOnly, d(c.updateFaq, demo.updateFaq));
router.delete("/faqs/:id", adminOnly, d(c.deleteFaq, demo.deleteFaq));

// Blog
router.get("/blog", staff, d(c.listBlog, demo.listBlog));
router.post("/blog", adminOnly, d(c.createBlog, demo.createBlog));
router.put("/blog/:id", adminOnly, d(c.updateBlog, demo.updateBlog));
router.delete("/blog/:id", adminOnly, d(c.deleteBlog, demo.deleteBlog));

// Contact messages
router.get("/contact-messages", staff, d(c.listMessages, demo.listMessages));
router.put("/contact-messages/:id", staff, d(c.updateMessage, demo.updateMessage));
router.delete("/contact-messages/:id", adminOnly, d(c.deleteMessage, demo.deleteMessage));

// Settings / branding
router.get("/settings", adminOnly, d(c.getSettings, demo.getSettings));
router.put("/settings", adminOnly, d(c.updateSettings, demo.updateSettings));

// Users
router.get("/users", adminOnly, d(c.listUsers, demo.listUsers));
router.put("/users/:id", adminOnly, d(c.updateUser, demo.updateUser));

// Profile (own account)
router.put("/profile", requireAuth, d(c.updateProfile, demo.updateProfile));

// SEO settings
router.get("/seo", adminOnly, d(c.listSEO, demo.listSEO));
router.get("/seo/:pagePath", staff, d(c.getSEO, demo.getSEO));
router.post("/seo", adminOnly, d(c.createSEO, demo.createSEO));
router.put("/seo/:id", adminOnly, d(c.updateSEO, demo.updateSEO));
router.delete("/seo/:id", adminOnly, d(c.deleteSEO, demo.deleteSEO));

// SMTP settings
router.get("/smtp", adminOnly, d(c.getSMTP, demo.getSMTP));
router.put("/smtp", adminOnly, d(c.updateSMTP, demo.updateSMTP));
router.post("/smtp/test", adminOnly, d(c.testSMTP, demo.testSMTP));

// Analytics
router.get("/analytics", adminOnly, d(c.getAnalytics, demo.getAnalytics));

// Backup & restore
router.post("/backup", adminOnly, d(c.createBackup, demo.createBackup));
router.post("/restore", adminOnly, d(c.restoreBackup, demo.restoreBackup));

module.exports = router;
