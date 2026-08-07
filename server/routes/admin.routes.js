const router = require("express").Router();
const c = require("../controllers/admin.controller");
const { requireAuth, requireRole } = require("../middleware/auth");
const { sanitize } = require("../middleware/validate");

// Any authenticated staff member (non-patient) may use the management API.
const staff = requireRole("SUPER_ADMIN", "ADMIN", "STAFF", "RECEPTIONIST", "DOCTOR");
const adminOnly = requireRole("SUPER_ADMIN", "ADMIN");
const superAdminOnly = requireRole("SUPER_ADMIN");

router.use(requireAuth);
router.use(sanitize);

// Dashboard
router.get("/dashboard", staff, c.dashboard);

// Appointments
router.get("/appointments", staff, c.listAppointments);
router.post("/appointments", staff, c.createAppointment);
router.put("/appointments/:id", staff, c.updateAppointment);
router.delete("/appointments/:id", staff, c.deleteAppointment);

// Doctors
router.get("/doctors", staff, c.listDoctors);
router.post("/doctors", adminOnly, c.createDoctor);
router.put("/doctors/:id", adminOnly, c.updateDoctor);
router.delete("/doctors/:id", adminOnly, c.deleteDoctor);

// Services
router.get("/services", staff, c.listServices);
router.post("/services", adminOnly, c.createService);
router.put("/services/:id", adminOnly, c.updateService);
router.delete("/services/:id", adminOnly, c.deleteService);

// Gallery
router.get("/gallery", staff, c.listGallery);
router.post("/gallery", adminOnly, c.createGallery);
router.put("/gallery/:id", adminOnly, c.updateGallery);
router.delete("/gallery/:id", adminOnly, c.deleteGallery);

// Testimonials
router.get("/testimonials", staff, c.listTestimonials);
router.post("/testimonials", adminOnly, c.createTestimonial);
router.put("/testimonials/:id", adminOnly, c.updateTestimonial);
router.delete("/testimonials/:id", adminOnly, c.deleteTestimonial);

// FAQs
router.get("/faqs", staff, c.listFaqs);
router.post("/faqs", adminOnly, c.createFaq);
router.put("/faqs/:id", adminOnly, c.updateFaq);
router.delete("/faqs/:id", adminOnly, c.deleteFaq);

// Blog
router.get("/blog", staff, c.listBlog);
router.post("/blog", adminOnly, c.createBlog);
router.put("/blog/:id", adminOnly, c.updateBlog);
router.delete("/blog/:id", adminOnly, c.deleteBlog);

// Contact messages
router.get("/contact-messages", staff, c.listMessages);
router.put("/contact-messages/:id", staff, c.updateMessage);
router.delete("/contact-messages/:id", adminOnly, c.deleteMessage);

// Settings / branding
router.get("/settings", adminOnly, c.getSettings);
router.put("/settings", adminOnly, c.updateSettings);

// Users
router.get("/users", adminOnly, c.listUsers);
router.put("/users/:id", adminOnly, c.updateUser);

// Profile (own account)
router.put("/profile", requireAuth, c.updateProfile);

module.exports = router;
