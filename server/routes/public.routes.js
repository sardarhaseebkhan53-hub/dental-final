const router = require("express").Router();
const { body } = require("express-validator");
const c = require("../controllers/public.controller");
const { validate, sanitize } = require("../middleware/validate");
const { formLimiter } = require("../middleware/rateLimiter");

router.get("/services", c.listServices);
router.get("/services/:slug", c.getService);
router.get("/doctors", c.listDoctors);
router.get("/testimonials", c.listTestimonials);
router.get("/faqs", c.listFaqs);
router.get("/gallery", c.listGallery);
router.get("/blog", c.listBlog);
router.get("/blog/:slug", c.getBlog);
router.get("/stats", c.stats);
router.get("/search", c.search);

router.post(
  "/contact",
  formLimiter,
  sanitize,
  [
    body("name").isString().trim().isLength({ min: 2, max: 200 }).withMessage("Enter your full name"),
    body("email").isEmail().withMessage("Enter a valid email"),
    body("phone").optional().isLength({ max: 20 }),
    body("subject").isString().trim().isLength({ min: 2, max: 300 }).withMessage("Enter a subject"),
    body("message").isString().trim().isLength({ min: 10, max: 5000 }).withMessage("Message must be at least 10 characters"),
  ],
  validate,
  c.createContact
);

router.post(
  "/book-appointment",
  formLimiter,
  sanitize,
  [
    body("name").isString().trim().isLength({ min: 2, max: 200 }).withMessage("Enter your full name"),
    body("email").isEmail().withMessage("Enter a valid email"),
    body("doctorId").isString().notEmpty().withMessage("Select a doctor"),
    body("date").isString().notEmpty().withMessage("Select a date"),
    body("time").isString().notEmpty().withMessage("Select a time"),
    body("phone").optional().isLength({ max: 20 }),
    body("gender").optional().isIn(["MALE", "FEMALE", "OTHER", "PREFER_NOT_TO_SAY"]),
  ],
  validate,
  c.bookAppointment
);

router.post(
  "/newsletter",
  formLimiter,
  sanitize,
  [body("email").isEmail().withMessage("Enter a valid email"), body("name").optional().isLength({ max: 200 })],
  validate,
  c.subscribeNewsletter
);

module.exports = router;
