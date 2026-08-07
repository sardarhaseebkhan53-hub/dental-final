const prisma = require("../lib/prisma");
const bcrypt = require("bcryptjs");
const { success, fail, asyncHandler } = require("../lib/response");

// ───────────────────────────────────────────────────────────────────────────
// DASHBOARD
// ───────────────────────────────────────────────────────────────────────────
const dashboard = asyncHandler(async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [
    appointments,
    todayAppointments,
    pendingAppointments,
    patients,
    doctors,
    services,
    messages,
    unreadMessages,
    testimonials,
    gallery,
    recentAppointments,
    recentMessages,
  ] = await Promise.all([
    prisma.appointment.count(),
    prisma.appointment.count({ where: { date: today } }),
    prisma.appointment.count({ where: { status: "SCHEDULED" } }),
    prisma.patient.count(),
    prisma.doctor.count(),
    prisma.service.count(),
    prisma.contactMessage.count(),
    prisma.contactMessage.count({ where: { status: "NEW" } }),
    prisma.testimonial.count(),
    prisma.gallery.count(),
    prisma.appointment.findMany({
      orderBy: { createdAt: "desc" },
      take: 6,
      include: {
        patient: { include: { user: { select: { firstName: true, lastName: true, name: true } } } },
        doctor: { include: { user: { select: { firstName: true, lastName: true, name: true } } } },
        service: true,
      },
    }),
    prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" }, take: 6 }),
  ]);

  return success(res, {
    counts: {
      appointments,
      todayAppointments,
      pendingAppointments,
      patients,
      doctors,
      services,
      messages,
      unreadMessages,
      testimonials,
      gallery,
    },
    recentAppointments,
    recentMessages,
  });
});

// ───────────────────────────────────────────────────────────────────────────
// APPOINTMENTS
// ───────────────────────────────────────────────────────────────────────────
const listAppointments = asyncHandler(async (req, res) => {
  const { status, date } = req.query;
  const where = {};
  if (status) where.status = status;
  if (date) where.date = new Date(date);
  const items = await prisma.appointment.findMany({
    where,
    orderBy: [{ date: "desc" }, { startTime: "asc" }],
    include: {
      patient: { include: { user: { select: { firstName: true, lastName: true, name: true, email: true } } } },
      doctor: { include: { user: { select: { firstName: true, lastName: true, name: true } } } },
      service: true,
    },
  });
  return success(res, items);
});

const createAppointment = asyncHandler(async (req, res) => {
  const { patientId, doctorId, serviceId, date, startTime, endTime, type, status, reason, notes } = req.body;
  const count = await prisma.appointment.count();
  const item = await prisma.appointment.create({
    data: {
      appointmentNumber: `APT-${String(count + 1).padStart(5, "0")}`,
      patientId,
      doctorId,
      serviceId: serviceId || null,
      date: new Date(date),
      startTime,
      endTime,
      type: type || "IN_PERSON",
      status: status || "SCHEDULED",
      reason: reason || null,
      notes: notes || null,
    },
  });
  return success(res, item, 201, "Appointment created");
});

const updateAppointment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = { ...req.body };
  if (data.date) data.date = new Date(data.date);
  delete data.id;
  delete data.appointmentNumber;
  const item = await prisma.appointment.update({ where: { id }, data });
  return success(res, item, 200, "Appointment updated");
});

const deleteAppointment = asyncHandler(async (req, res) => {
  await prisma.appointment.delete({ where: { id: req.params.id } });
  return success(res, null, 200, "Appointment deleted");
});

// ───────────────────────────────────────────────────────────────────────────
// DOCTORS
// ───────────────────────────────────────────────────────────────────────────
const listDoctors = asyncHandler(async (req, res) => {
  const items = await prisma.doctor.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { id: true, firstName: true, lastName: true, name: true, email: true, avatar: true, phone: true } },
      department: true,
      schedules: true,
    },
  });
  return success(res, items);
});

const createDoctor = asyncHandler(async (req, res) => {
  const { email, password, firstName, lastName, phone, specialization, bio, experience, consultationFee, languages, departmentId, acceptingNewPatients } = req.body;

  const count = await prisma.user.count();
  const hashedPassword = await bcrypt.hash(password || "Doctor@123", 12);
  const user = await prisma.user.create({
    data: {
      email: String(email).toLowerCase().trim(),
      hashedPassword,
      firstName,
      lastName,
      phone: phone || null,
      role: "DOCTOR",
      status: "ACTIVE",
    },
  });
  const doctor = await prisma.doctor.create({
    data: {
      userId: user.id,
      doctorNumber: `DOC-${String(count + 1).padStart(4, "0")}`,
      specialization,
      bio: bio || null,
      experience: parseInt(experience || 0, 10),
      consultationFee: parseFloat(consultationFee || 0),
      followUpFee: parseFloat(req.body.followUpFee || 0),
      languages: languages || [],
      departmentId: departmentId || null,
      acceptingNewPatients: acceptingNewPatients !== false,
      qualifications: [],
      licenseNumber: req.body.licenseNumber || `LIC-${Date.now()}`,
      licenseExpiry: new Date(req.body.licenseExpiry || Date.now() + 3.156e10),
    },
  });
  return success(res, doctor, 201, "Doctor created");
});

const updateDoctor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = { ...req.body };
  delete data.id;
  delete data.userId;
  delete data.user;
  if (data.consultationFee) data.consultationFee = parseFloat(data.consultationFee);
  if (data.followUpFee) data.followUpFee = parseFloat(data.followUpFee);
  if (data.experience) data.experience = parseInt(data.experience, 10);
  if (data.licenseExpiry) data.licenseExpiry = new Date(data.licenseExpiry);
  const doctor = await prisma.doctor.update({ where: { id }, data });
  return success(res, doctor, 200, "Doctor updated");
});

const deleteDoctor = asyncHandler(async (req, res) => {
  const doctor = await prisma.doctor.findUnique({ where: { id: req.params.id } });
  if (!doctor) return fail(res, 404, "Doctor not found");
  await prisma.user.delete({ where: { id: doctor.userId } });
  return success(res, null, 200, "Doctor deleted");
});

// ───────────────────────────────────────────────────────────────────────────
// SERVICES
// ───────────────────────────────────────────────────────────────────────────
const listServices = asyncHandler(async (req, res) => {
  const items = await prisma.service.findMany({ orderBy: { sortOrder: "asc" }, include: { department: true } });
  return success(res, items);
});

const createService = asyncHandler(async (req, res) => {
  const { name, slug, shortDescription, description, price, duration, category, icon, image, departmentId, isFeatured, isActive } = req.body;
  const item = await prisma.service.create({
    data: {
      name,
      slug: slug || name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
      shortDescription: shortDescription || "",
      description: description || "",
      price: parseFloat(price || 0),
      duration: parseInt(duration || 30, 10),
      category: category || "GENERAL",
      icon: icon || null,
      image: image || null,
      departmentId: departmentId || null,
      isFeatured: isFeatured !== false,
      isActive: isActive !== false,
      sortOrder: 0,
    },
  });
  return success(res, item, 201, "Service created");
});

const updateService = asyncHandler(async (req, res) => {
  const data = { ...req.body };
  delete data.id;
  if (data.price) data.price = parseFloat(data.price);
  if (data.duration) data.duration = parseInt(data.duration, 10);
  const item = await prisma.service.update({ where: { id: req.params.id }, data });
  return success(res, item, 200, "Service updated");
});

const deleteService = asyncHandler(async (req, res) => {
  await prisma.service.delete({ where: { id: req.params.id } });
  return success(res, null, 200, "Service deleted");
});

// ───────────────────────────────────────────────────────────────────────────
// GALLERY
// ───────────────────────────────────────────────────────────────────────────
const listGallery = asyncHandler(async (req, res) => {
  const items = await prisma.gallery.findMany({ orderBy: { sortOrder: "asc" } });
  return success(res, items);
});

const createGallery = asyncHandler(async (req, res) => {
  const { title, description, category, image, thumbnail, alt, isActive } = req.body;
  const item = await prisma.gallery.create({
    data: {
      title,
      description: description || null,
      category: category || "CLINIC",
      image,
      thumbnail: thumbnail || image,
      alt: alt || title,
      isActive: isActive !== false,
      sortOrder: 0,
    },
  });
  return success(res, item, 201, "Gallery item added");
});

const updateGallery = asyncHandler(async (req, res) => {
  const data = { ...req.body };
  delete data.id;
  const item = await prisma.gallery.update({ where: { id: req.params.id }, data });
  return success(res, item, 200, "Gallery item updated");
});

const deleteGallery = asyncHandler(async (req, res) => {
  await prisma.gallery.delete({ where: { id: req.params.id } });
  return success(res, null, 200, "Gallery item deleted");
});

// ───────────────────────────────────────────────────────────────────────────
// TESTIMONIALS
// ───────────────────────────────────────────────────────────────────────────
const listTestimonials = asyncHandler(async (req, res) => {
  const items = await prisma.testimonial.findMany({ orderBy: { sortOrder: "asc" } });
  return success(res, items);
});

const createTestimonial = asyncHandler(async (req, res) => {
  const { patientName, content, rating, image, isActive, isFeatured } = req.body;
  const item = await prisma.testimonial.create({
    data: {
      patientName,
      content,
      rating: parseInt(rating || 5, 10),
      image: image || null,
      isActive: isActive !== false,
      isFeatured: isFeatured === true,
      sortOrder: 0,
    },
  });
  return success(res, item, 201, "Testimonial added");
});

const updateTestimonial = asyncHandler(async (req, res) => {
  const data = { ...req.body };
  delete data.id;
  if (data.rating) data.rating = parseInt(data.rating, 10);
  const item = await prisma.testimonial.update({ where: { id: req.params.id }, data });
  return success(res, item, 200, "Testimonial updated");
});

const deleteTestimonial = asyncHandler(async (req, res) => {
  await prisma.testimonial.delete({ where: { id: req.params.id } });
  return success(res, null, 200, "Testimonial deleted");
});

// ───────────────────────────────────────────────────────────────────────────
// FAQs
// ───────────────────────────────────────────────────────────────────────────
const listFaqs = asyncHandler(async (req, res) => {
  const items = await prisma.faq.findMany({ orderBy: [{ category: "asc" }, { sortOrder: "asc" }] });
  return success(res, items);
});

const createFaq = asyncHandler(async (req, res) => {
  const { question, answer, category, isActive } = req.body;
  const item = await prisma.faq.create({
    data: { question, answer, category: category || "GENERAL", isActive: isActive !== false, sortOrder: 0 },
  });
  return success(res, item, 201, "FAQ added");
});

const updateFaq = asyncHandler(async (req, res) => {
  const data = { ...req.body };
  delete data.id;
  const item = await prisma.faq.update({ where: { id: req.params.id }, data });
  return success(res, item, 200, "FAQ updated");
});

const deleteFaq = asyncHandler(async (req, res) => {
  await prisma.faq.delete({ where: { id: req.params.id } });
  return success(res, null, 200, "FAQ deleted");
});

// ───────────────────────────────────────────────────────────────────────────
// BLOG
// ───────────────────────────────────────────────────────────────────────────
const listBlog = asyncHandler(async (req, res) => {
  const items = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
    include: { category: true, author: { select: { name: true, firstName: true, lastName: true } } },
  });
  return success(res, items);
});

const createBlog = asyncHandler(async (req, res) => {
  const { title, slug, excerpt, content, featuredImage, categoryId, status, readingTime } = req.body;
  const count = await prisma.blogCategory.count();
  let catId = categoryId;
  if (!catId) {
    const cat = await prisma.blogCategory.upsert({
      where: { slug: "general" },
      update: {},
      create: { name: "General", slug: "general" },
    });
    catId = cat.id;
  }
  const item = await prisma.blogPost.create({
    data: {
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
      excerpt: excerpt || "",
      content: content || "",
      featuredImage: featuredImage || null,
      authorId: req.user.id,
      categoryId: catId,
      status: status || "PUBLISHED",
      publishedAt: new Date(),
      readingTime: parseInt(readingTime || 5, 10),
    },
  });
  return success(res, item, 201, "Blog post created");
});

const updateBlog = asyncHandler(async (req, res) => {
  const data = { ...req.body };
  delete data.id;
  delete data.authorId;
  const item = await prisma.blogPost.update({ where: { id: req.params.id }, data });
  return success(res, item, 200, "Blog post updated");
});

const deleteBlog = asyncHandler(async (req, res) => {
  await prisma.blogPost.delete({ where: { id: req.params.id } });
  return success(res, null, 200, "Blog post deleted");
});

// ───────────────────────────────────────────────────────────────────────────
// CONTACT MESSAGES
// ───────────────────────────────────────────────────────────────────────────
const listMessages = asyncHandler(async (req, res) => {
  const items = await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } });
  return success(res, items);
});

const updateMessage = asyncHandler(async (req, res) => {
  const { status, priority } = req.body;
  const item = await prisma.contactMessage.update({
    where: { id: req.params.id },
    data: { status: status || undefined, priority: priority || undefined, repliedAt: status === "RESOLVED" ? new Date() : undefined },
  });
  return success(res, item, 200, "Message updated");
});

const deleteMessage = asyncHandler(async (req, res) => {
  await prisma.contactMessage.delete({ where: { id: req.params.id } });
  return success(res, null, 200, "Message deleted");
});

// ───────────────────────────────────────────────────────────────────────────
// SETTINGS / BRANDING
// ───────────────────────────────────────────────────────────────────────────
const getSettings = asyncHandler(async (req, res) => {
  const branding = await prisma.branding.findFirst();
  const settings = await prisma.setting.findMany();
  return success(res, { branding: branding || {}, settings });
});

const updateSettings = asyncHandler(async (req, res) => {
  const { branding, settings } = req.body;
  let saved = null;
  if (branding) {
    const existing = await prisma.branding.findFirst();
    saved = existing
      ? await prisma.branding.update({ where: { id: existing.id }, data: branding })
      : await prisma.branding.create({ data: branding });
  }
  if (Array.isArray(settings)) {
    for (const s of settings) {
      await prisma.setting.upsert({
        where: { key: s.key },
        update: { value: s.value },
        create: { key: s.key, value: s.value, category: s.category || "general" },
      });
    }
  }
  return success(res, { branding: saved }, 200, "Settings saved");
});

// ───────────────────────────────────────────────────────────────────────────
// USERS
// ───────────────────────────────────────────────────────────────────────────
const listUsers = asyncHandler(async (req, res) => {
  const items = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      name: true,
      avatar: true,
      role: true,
      status: true,
      createdAt: true,
      lastLoginAt: true,
    },
  });
  return success(res, items);
});

const updateUser = asyncHandler(async (req, res) => {
  const { role, status, firstName, lastName, phone } = req.body;
  const data = {};
  if (role) data.role = role;
  if (status) data.status = status;
  if (firstName !== undefined) data.firstName = firstName;
  if (lastName !== undefined) data.lastName = lastName;
  if (phone !== undefined) data.phone = phone;
  const item = await prisma.user.update({ where: { id: req.params.id }, data });
  return success(res, item, 200, "User updated");
});

// Profile update (own account)
const updateProfile = asyncHandler(async (req, res) => {
  const { firstName, lastName, phone, avatar } = req.body;
  const data = { firstName, lastName, phone, avatar };
  Object.keys(data).forEach((k) => data[k] === undefined && delete data[k]);
  const item = await prisma.user.update({ where: { id: req.user.id }, data });
  return success(res, item, 200, "Profile updated");
});

module.exports = {
  dashboard,
  listAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  listDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
  listServices,
  createService,
  updateService,
  deleteService,
  listGallery,
  createGallery,
  updateGallery,
  deleteGallery,
  listTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  listFaqs,
  createFaq,
  updateFaq,
  deleteFaq,
  listBlog,
  createBlog,
  updateBlog,
  deleteBlog,
  listMessages,
  updateMessage,
  deleteMessage,
  getSettings,
  updateSettings,
  listUsers,
  updateUser,
  updateProfile,
};
