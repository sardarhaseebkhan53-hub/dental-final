const prisma = require("../lib/prisma");
const demo = require("../data/demo.json");
const { success, fail, asyncHandler } = require("../lib/response");

// ── Demo mode helpers ──────────────────────────────────────────────────────
// When the database isn't configured (demo mode), the public API serves the
// same sample content the frontend ships with, so pages render with zero
// errors and the UI never sees a 500.
const inDemoMode = () => prisma.demoMode === true;

const DEMO_MODE_MSG = "This is a demo (no database configured). Set up the database to enable live data.";

// GET /api/public/services
const listServices = asyncHandler(async (req, res) => {
  if (inDemoMode()) return success(res, demo.services);
  const services = await prisma.service.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
    include: { department: true },
  });
  return success(res, services);
});

// GET /api/public/services/:slug
const getService = asyncHandler(async (req, res) => {
  if (inDemoMode()) {
    const service = demo.services.find((s) => s.slug === req.params.slug);
    if (!service) return fail(res, 404, "Service not found");
    return success(res, service);
  }
  const service = await prisma.service.findFirst({
    where: { slug: req.params.slug, isActive: true },
    include: { department: true },
  });
  if (!service) return fail(res, 404, "Service not found");
  return success(res, service);
});

// GET /api/public/doctors
const listDoctors = asyncHandler(async (req, res) => {
  if (inDemoMode()) return success(res, demo.doctors);
  const doctors = await prisma.doctor.findMany({
    where: { user: { status: "ACTIVE" } },
    include: {
      user: { select: { firstName: true, lastName: true, name: true, avatar: true } },
      department: true,
    },
  });
  const mapped = doctors.map((d) => ({
    id: d.id,
    doctorNumber: d.doctorNumber,
    specialization: d.specialization,
    experience: d.experience,
    bio: d.bio,
    consultationFee: d.consultationFee,
    languages: d.languages,
    acceptingNewPatients: d.acceptingNewPatients,
    averageRating: d.averageRating,
    totalReviews: d.totalReviews,
    department: d.department?.name || null,
    avatar: d.user?.avatar,
    name: d.user?.name || `${d.user?.firstName || ""} ${d.user?.lastName || ""}`.trim(),
  }));
  return success(res, mapped);
});

// GET /api/public/testimonials
const listTestimonials = asyncHandler(async (req, res) => {
  if (inDemoMode()) return success(res, demo.testimonials);
  const testimonials = await prisma.testimonial.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });
  return success(res, testimonials);
});

// GET /api/public/faqs
const listFaqs = asyncHandler(async (req, res) => {
  if (inDemoMode()) return success(res, demo.faqs);
  const faqs = await prisma.faq.findMany({
    where: { isActive: true },
    orderBy: [{ category: "asc" }, { sortOrder: "asc" }],
  });
  return success(res, faqs);
});

// GET /api/public/gallery
const listGallery = asyncHandler(async (req, res) => {
  if (inDemoMode()) return success(res, demo.gallery);
  const items = await prisma.gallery.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });
  return success(res, items);
});

// GET /api/public/blog
const listBlog = asyncHandler(async (req, res) => {
  if (inDemoMode()) return success(res, demo.blog);
  const posts = await prisma.blogPost.findMany({
    where: { status: "PUBLISHED", publishedAt: { lte: new Date() } },
    orderBy: { publishedAt: "desc" },
    include: {
      category: true,
      author: { select: { name: true, firstName: true, lastName: true, avatar: true } },
    },
  });
  return success(res, posts);
});

// GET /api/public/blog/:slug
const getBlog = asyncHandler(async (req, res) => {
  if (inDemoMode()) {
    const post = demo.blog.find((p) => p.slug === req.params.slug);
    if (!post) return fail(res, 404, "Blog post not found");
    return success(res, post);
  }
  const post = await prisma.blogPost.findFirst({
    where: { slug: req.params.slug, status: "PUBLISHED", publishedAt: { lte: new Date() } },
    include: {
      category: true,
      author: { select: { name: true, firstName: true, lastName: true, avatar: true } },
    },
  });
  if (!post) return fail(res, 404, "Blog post not found");
  return success(res, post);
});

// POST /api/public/contact
const createContact = asyncHandler(async (req, res) => {
  if (inDemoMode()) {
    return success(res, { id: "demo" }, 201, "Message sent successfully. We'll get back to you soon.");
  }
  const { name, email, phone, subject, message } = req.body;
  const contact = await prisma.contactMessage.create({
    data: {
      name,
      email: String(email).toLowerCase().trim(),
      phone: phone || null,
      subject,
      message,
      status: "NEW",
      priority: "NORMAL",
    },
  });
  return success(res, { id: contact.id }, 201, "Message sent successfully. We'll get back to you soon.");
});

// POST /api/public/newsletter
const subscribeNewsletter = asyncHandler(async (req, res) => {
  if (inDemoMode()) {
    return success(res, null, 201, "Subscribed successfully!");
  }
  const { email, name } = req.body;
  const normalized = String(email).toLowerCase().trim();
  const existing = await prisma.newsletter.findUnique({ where: { email: normalized } });
  if (existing) {
    return success(res, null, 200, "You're already subscribed. Thank you!");
  }
  await prisma.newsletter.create({
    data: { email: normalized, name: name || null, status: "ACTIVE", confirmedAt: new Date() },
  });
  return success(res, null, 201, "Subscribed successfully!");
});

// GET /api/public/search
const search = asyncHandler(async (req, res) => {
  const q = String(req.query.q || "").trim().toLowerCase();
  if (!q) return success(res, { services: [], doctors: [], posts: [] });

  if (inDemoMode()) {
    const match = (s) => String(s || "").toLowerCase().includes(q);
    return success(res, {
      services: demo.services.filter((s) => match(s.name) || match(s.description) || match(s.shortDescription)).slice(0, 8),
      doctors: demo.doctors.filter((d) => match(d.name) || match(d.specialization) || match(d.bio)).slice(0, 8),
      posts: demo.blog.filter((p) => match(p.title) || match(p.excerpt) || match(p.content)).slice(0, 8),
    });
  }

  const where = { OR: [{ name: { contains: q, mode: "insensitive" } }, { description: { contains: q, mode: "insensitive" } }] };
  const [services, doctors, posts] = await Promise.all([
    prisma.service.findMany({ where: { ...where, isActive: true }, take: 8 }),
    prisma.doctor.findMany({
      where: { OR: [{ specialization: { contains: q, mode: "insensitive" } }, { bio: { contains: q, mode: "insensitive" } }] },
      include: { user: { select: { name: true, firstName: true, lastName: true, avatar: true } } },
      take: 8,
    }),
    prisma.blogPost.findMany({
      where: { status: "PUBLISHED", OR: [{ title: { contains: q, mode: "insensitive" } }, { excerpt: { contains: q, mode: "insensitive" } }] },
      take: 8,
    }),
  ]);
  return success(res, { services, doctors, posts });
});

// POST /api/public/book-appointment
const bookAppointment = asyncHandler(async (req, res) => {
  if (inDemoMode()) {
    return success(
      res,
      { appointmentNumber: "APT-DEMO-00001" },
      201,
      "Appointment requested successfully. We'll confirm shortly."
    );
  }
  const { name, email, phone, dateOfBirth, gender, serviceId, doctorId, date, time, notes } = req.body;
  const normalized = String(email || "").toLowerCase().trim();

  // Create (or find) the patient record on the fly so real appointments appear in admin.
  let user = await prisma.user.findUnique({ where: { email: normalized } });
  if (!user) {
    const parts = String(name || "").split(" ");
    user = await prisma.user.create({
      data: {
        email: normalized,
        firstName: parts[0] || null,
        lastName: parts.slice(1).join(" ") || null,
        phone: phone || null,
        role: "PATIENT",
        status: "ACTIVE",
      },
    });
  }

  let patient = await prisma.patient.findUnique({ where: { userId: user.id } });
  if (!patient) {
    const count = await prisma.patient.count();
    patient = await prisma.patient.create({
      data: {
        userId: user.id,
        patientNumber: `PAT-${String(count + 1).padStart(5, "0")}`,
        dateOfBirth: new Date(dateOfBirth || Date.now()),
        gender: gender || "PREFER_NOT_TO_SAY",
        address: {},
      },
    });
  }

  const count = await prisma.appointment.count();
  const appointment = await prisma.appointment.create({
    data: {
      appointmentNumber: `APT-${String(count + 1).padStart(5, "0")}`,
      patientId: patient.id,
      doctorId,
      serviceId: serviceId || null,
      date: new Date(date),
      startTime: time,
      endTime: time, // will be finalized by admin
      type: "IN_PERSON",
      status: "SCHEDULED",
      reason: notes || null,
    },
  });

  return success(res, { appointmentNumber: appointment.appointmentNumber }, 201, "Appointment requested successfully. We'll confirm shortly.");
});

// GET /api/public/stats
const stats = asyncHandler(async (req, res) => {
  if (inDemoMode()) return success(res, demo.stats);
  const [doctors, reviews, services, patients] = await Promise.all([
    prisma.doctor.count(),
    prisma.review.count(),
    prisma.service.count({ where: { isActive: true } }),
    prisma.patient.count(),
  ]);
  return success(res, {
    yearsExperience: 25,
    patientsServed: 50000,
    satisfactionRate: 98,
    specialists: doctors || 15,
    totalReviews: reviews,
    services: services,
    patients: patients,
  });
});

module.exports = {
  listServices,
  getService,
  listDoctors,
  listTestimonials,
  listFaqs,
  listGallery,
  listBlog,
  getBlog,
  createContact,
  subscribeNewsletter,
  search,
  stats,
  bookAppointment,
};
