/* Demo-mode fallbacks for the admin panel.
   When the app runs without a database (prisma.demoMode), these handlers
   serve realistic sample data so the admin panel remains fully usable.
   Every mutation is a no-op that returns success with a demo notice.
   Connect a PostgreSQL database (npm run setup) for real operations. */

const { success } = require("../lib/response");

const DEMO_NOTICE = "Demo mode (no database) — changes are not saved. Run `npm run setup` to enable the database.";

const dateAgo = (days) => {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString();
};

const users = [
  { id: "u1", name: "Junaid Ahmed", firstName: "Junaid", lastName: "Ahmed", email: "admin@junaiddentalcare.pk", role: "SUPER_ADMIN", status: "ACTIVE" },
  { id: "u2", name: "Ayesha Khan", firstName: "Ayesha", lastName: "Khan", email: "ayesha@junaiddentalcare.pk", role: "ADMIN", status: "ACTIVE" },
  { id: "u3", name: "Reception Staff", firstName: "Reception", lastName: "Staff", email: "reception@junaiddentalcare.pk", role: "RECEPTIONIST", status: "ACTIVE" },
];

const doctors = [
  { id: "d1", user: { name: "Dr. Junaid Ahmed", firstName: "Junaid", lastName: "Ahmed", status: "ACTIVE" }, specialization: "Principal Dentist & Implantologist", experience: 12, department: { name: "General Dentistry" }, consultationFee: 2000, bio: "Founder and principal dentist with 12+ years of experience.", image: "/images/doc-1.jpg" },
  { id: "d2", user: { name: "Dr. Ayesha Khan", firstName: "Ayesha", lastName: "Khan", status: "ACTIVE" }, specialization: "Cosmetic & Restorative Dentist", experience: 8, department: { name: "Cosmetic Dentistry" }, consultationFee: 1800, bio: "Known for stunning smile makeovers and porcelain veneers.", image: "/images/doc-2.jpg" },
  { id: "d3", user: { name: "Dr. Hassan Raza", firstName: "Hassan", lastName: "Raza", status: "ACTIVE" }, specialization: "Orthodontist", experience: 9, department: { name: "Orthodontics" }, consultationFee: 2000, bio: "Specialist in braces and clear aligner therapy.", image: "/images/doc-3.svg" },
  { id: "d4", user: { name: "Dr. Sana Malik", firstName: "Sana", lastName: "Malik", status: "ACTIVE" }, specialization: "Pediatric Dentist", experience: 6, department: { name: "Pediatric Dentistry" }, consultationFee: 1500, bio: "Loved by children and parents alike.", image: "/images/doc-4.svg" },
  { id: "d5", user: { name: "Dr. Bilal Sheikh", firstName: "Bilal", lastName: "Sheikh", status: "ACTIVE" }, specialization: "Oral Surgeon", experience: 10, department: { name: "Oral Surgery" }, consultationFee: 2500, bio: "Skilled oral and maxillofacial surgeon.", image: "/images/doc-1.jpg" },
  { id: "d6", user: { name: "Dr. Maria Aslam", firstName: "Maria", lastName: "Aslam", status: "ACTIVE" }, specialization: "Endodontist", experience: 7, department: { name: "Endodontics" }, consultationFee: 2000, bio: "Virtually painless root canal therapy.", image: "/images/doc-2.jpg" },
];

const services = [
  { id: "s1", name: "General Dentistry", price: 1500, duration: 30, category: "GENERAL", isFeatured: true, image: "/images/service-general.svg", description: "Check-ups, cleanings and preventive care for the whole family." },
  { id: "s2", name: "Cosmetic Dentistry", price: 8500, duration: 60, category: "COSMETIC", isFeatured: true, image: "/images/service-cosmetic.svg", description: "Veneers, bonding and complete smile makeovers." },
  { id: "s3", name: "Orthodontics & Braces", price: 45000, duration: 45, category: "ORTHODONTICS", isFeatured: true, image: "/images/service-ortho.svg", description: "Traditional braces and clear aligners." },
  { id: "s4", name: "Dental Implants", price: 85000, duration: 90, category: "SURGERY", isFeatured: true, image: "/images/service-implant.svg", description: "Permanent, natural-looking tooth replacement." },
  { id: "s5", name: "Teeth Whitening", price: 6500, duration: 60, category: "COSMETIC", isFeatured: true, image: "/images/service-whitening.svg", description: "Brighten your smile by several shades in one visit." },
  { id: "s6", name: "Pediatric Dentistry", price: 1200, duration: 30, category: "PEDIATRIC", isFeatured: true, image: "/images/service-pediatric.svg", description: "Gentle, fun dental care for children." },
  { id: "s7", name: "Emergency Care", price: 2500, duration: 30, category: "EMERGENCY", isFeatured: true, image: "/images/service-emergency.svg", description: "Same-day relief for dental emergencies." },
  { id: "s8", name: "Root Canal Therapy", price: 12000, duration: 90, category: "RESTORATIVE", isFeatured: false, image: "/images/service-rootcanal.svg", description: "Modern, gentle endodontics." },
  { id: "s9", name: "Periodontal Treatment", price: 4500, duration: 60, category: "PREVENTIVE", isFeatured: false, image: "/images/service-periodontal.svg", description: "Expert care for healthy gums." },
  { id: "s10", name: "Wisdom Tooth Extraction", price: 8000, duration: 60, category: "SURGERY", isFeatured: false, image: "/images/service-emergency.svg", description: "Safe removal of impacted wisdom teeth." },
  { id: "s11", name: "Dental Crowns & Bridges", price: 15000, duration: 60, category: "RESTORATIVE", isFeatured: false, image: "/images/service-cosmetic.svg", description: "Zirconia and PFM crowns and bridges." },
  { id: "s12", name: "Dental Fillings", price: 2000, duration: 30, category: "RESTORATIVE", isFeatured: false, image: "/images/service-general.svg", description: "Tooth-colored composite fillings." },
];

const appointments = [
  { id: "a1", appointmentNumber: "APT-1042", date: dateAgo(0).slice(0, 10), startTime: "10:00", status: "SCHEDULED", patient: { user: { name: "Ahmed Raza" } }, doctor: { user: { name: "Dr. Junaid Ahmed" } }, service: { name: "Dental Implants" } },
  { id: "a2", appointmentNumber: "APT-1041", date: dateAgo(0).slice(0, 10), startTime: "11:30", status: "CONFIRMED", patient: { user: { name: "Fatima Shah" } }, doctor: { user: { name: "Dr. Sana Malik" } }, service: { name: "Pediatric Dentistry" } },
  { id: "a3", appointmentNumber: "APT-1040", date: dateAgo(1).slice(0, 10), startTime: "09:00", status: "COMPLETED", patient: { user: { name: "Muhammad Imran" } }, doctor: { user: { name: "Dr. Hassan Raza" } }, service: { name: "Orthodontics & Braces" } },
  { id: "a4", appointmentNumber: "APT-1039", date: dateAgo(1).slice(0, 10), startTime: "14:00", status: "COMPLETED", patient: { user: { name: "Saima Akhtar" } }, doctor: { user: { name: "Dr. Ayesha Khan" } }, service: { name: "Root Canal Therapy" } },
  { id: "a5", appointmentNumber: "APT-1038", date: dateAgo(2).slice(0, 10), startTime: "12:00", status: "CANCELLED", patient: { user: { name: "Tariq Mehmood" } }, doctor: { user: { name: "Dr. Bilal Sheikh" } }, service: { name: "Wisdom Tooth Extraction" } },
  { id: "a6", appointmentNumber: "APT-1037", date: dateAgo(3).slice(0, 10), startTime: "16:30", status: "COMPLETED", patient: { user: { name: "Nida Yasir" } }, doctor: { user: { name: "Dr. Ayesha Khan" } }, service: { name: "Teeth Whitening" } },
  { id: "a7", appointmentNumber: "APT-1036", date: dateAgo(4).slice(0, 10), startTime: "10:30", status: "NO_SHOW", patient: { user: { name: "Zubair Ali" } }, doctor: { user: { name: "Dr. Bilal Sheikh" } }, service: { name: "Dental Fillings" } },
  { id: "a8", appointmentNumber: "APT-1035", date: dateAgo(5).slice(0, 10), startTime: "13:00", status: "COMPLETED", patient: { user: { name: "Rabia Khan" } }, doctor: { user: { name: "Dr. Maria Aslam" } }, service: { name: "Root Canal Therapy" } },
];

const messages = [
  { id: "m1", name: "Ali Hassan", email: "ali@example.com", subject: "Implant price enquiry", message: "Assalam o Alaikum, please share implant pricing.", priority: "HIGH", status: "NEW", createdAt: dateAgo(0) },
  { id: "m2", name: "Sara Khan", email: "sara@example.com", subject: "Braces for my daughter", message: "My daughter is 13 and needs braces. What options do you have?", priority: "MEDIUM", status: "READ", createdAt: dateAgo(1) },
  { id: "m3", name: "Usman Tariq", email: "usman@example.com", subject: "Emergency toothache", message: "Severe pain in my back tooth since last night. Can you see me today?", priority: "HIGH", status: "IN_PROGRESS", createdAt: dateAgo(1) },
  { id: "m4", name: "Hina Rauf", email: "hina@example.com", subject: "Whitening offer", message: "Is the teeth whitening offer still available?", priority: "LOW", status: "RESOLVED", createdAt: dateAgo(3) },
];

const testimonials = [
  { id: "t1", patientName: "Ahmed Raza", rating: 5, content: "Outstanding experience. Dr. Junaid was patient and professional.", isActive: true },
  { id: "t2", patientName: "Fatima Shah", rating: 5, content: "My kids used to fear dentists — now they look forward to visits.", isActive: true },
  { id: "t3", patientName: "Muhammad Imran", rating: 5, content: "Teeth perfectly aligned. Very reasonable pricing.", isActive: true },
  { id: "t4", patientName: "Saima Akhtar", rating: 5, content: "Painless root canal — forever grateful to Dr. Ayesha.", isActive: true },
];

const faqs = [
  { id: "f1", question: "How often should I visit the dentist?", answer: "Every six months for a check-up and cleaning.", category: "FIRST_VISIT", isActive: true },
  { id: "f2", question: "Do you offer installment plans?", answer: "Yes, flexible plans for implants, braces and full-mouth work.", category: "BILLING", isActive: true },
  { id: "f3", question: "What should I do in a dental emergency?", answer: "Call +92 312 5028812 — same-day emergency slots are kept open.", category: "EMERGENCY", isActive: true },
  { id: "f4", question: "Are the treatments painful?", answer: "Modern anesthesia and gentle techniques make most treatments pain-free.", category: "TREATMENTS", isActive: true },
];

const blog = [
  { id: "b1", title: "Full Arch Rehabilitation: A Real Case From Our Clinic", slug: "full-arch-rehabilitation-real-case", excerpt: "Our team rebuilt a 65-year-old patient's smile with full arch rehabilitation.", status: "PUBLISHED", readingTime: 4, publishedAt: dateAgo(3), featuredImage: "/images/blog-1.jpg", category: { name: "Dental Care" }, author: { name: "JDC – Junaid Dental Care" } },
  { id: "b2", title: "Severe Tooth Wear (Attrition)? PFM Bridges Still Create Beautiful Smiles", slug: "severe-tooth-wear-attrition-pfm-bridges", excerpt: "How PFM bridgework restored a 59-year-old patient's smile.", status: "PUBLISHED", readingTime: 4, publishedAt: dateAgo(10), featuredImage: "/images/blog-2.jpg", category: { name: "Restorative Dentistry" }, author: { name: "JDC – Junaid Dental Care" } },
  { id: "b3", title: "16+ Years of Dental Excellence: The JDC Story", slug: "jdc-16-years-dental-excellence", excerpt: "Established in 2006, JDC has grown into one of Islamabad's most trusted clinics.", status: "PUBLISHED", readingTime: 3, publishedAt: dateAgo(20), featuredImage: "/images/blog-3.jpg", category: { name: "Dental Care" }, author: { name: "JDC – Junaid Dental Care" } },
  { id: "b4", title: "10 Dental Treatments Under One Roof at JDC", slug: "10-dental-treatments-under-one-roof", excerpt: "From endodontics to zirconia CAD/CAM bridges.", status: "DRAFT", readingTime: 3, publishedAt: null, featuredImage: "/images/blog-1.jpg", category: { name: "Dental Care" }, author: { name: "JDC – Junaid Dental Care" } },
];

const gallery = [
  { id: "g1", title: "JDC – Junaid Dental Care", description: "Photos from our Facebook page", category: "CLINIC", image: "/images/gallery-reception.jpg" },
  { id: "g2", title: "JDC – Junaid Dental Care", description: "Follow us on Facebook", category: "CLINIC", image: "/images/gallery-treatment.jpg" },
  { id: "g3", title: "JDC – Junaid Dental Care", description: "Real moments from our clinic", category: "CLINIC", image: "/images/gallery-tech.jpg" },
  { id: "g4", title: "JDC – Junaid Dental Care", description: "16+ years of smiles", category: "CLINIC", image: "/images/gallery-smile.jpg" },
  { id: "g5", title: "JDC – Junaid Dental Care", description: "Our caring team", category: "CLINIC", image: "/images/gallery-team.jpg" },
  { id: "g6", title: "JDC – Junaid Dental Care", description: "Gentle, personalised care", category: "CLINIC", image: "/images/gallery-care.jpg" },
];

const seo = [
  { id: "seo1", pagePath: "/", title: "JDC – Junaid Dental Care — Premium Dental Clinic in Islamabad", description: "Premium dental treatments at Alipur U turn, Islamabad. Established 2006.", keywords: ["dentist islamabad", "dental clinic", "junaid dental care"] },
  { id: "seo2", pagePath: "/about", title: "About JDC – Junaid Dental Care | Our Story", description: "Learn about JDC – Junaid Dental Care since 2006.", keywords: ["about", "dental clinic islamabad"] },
  { id: "seo3", pagePath: "/services", title: "Dental Services | JDC – Junaid Dental Care", description: "All dental treatments under one roof.", keywords: ["dental services", "implants", "braces"] },
  { id: "seo4", pagePath: "/contact", title: "Contact JDC – Junaid Dental Care", description: "Main Lehtrar Road, Alipur U turn, Islamabad.", keywords: ["contact dentist", "alipur"] },
];

const branding = {
  logo: "/images/logo.png",
  favicon: "/favicon.svg",
  primaryColor: "#0F766E",
  secondaryColor: "#C8874A",
  accentColor: "#14B8A6",
  fontFamily: "Plus Jakarta Sans",
  contactInfo: {
    phone: "+92 312 5028812",
    secondaryPhone: "+92 314 8290684",
    email: "junaiddental22@gmail.com",
    address: "JDC – Junaid Dental Care, Main Lehtrar Road, Alipur U turn, near Old Bank Stop, Islamabad, Pakistan",
    hours: "Mon-Sat 8:00 AM - 9:00 PM",
    whatsapp: "923125028812",
    emergencyPhone: "+92 312 5028812",
    googleMaps: "https://maps.app.goo.gl/sim1qA4wDdpcMovK7",
  },
  socialLinks: {
    facebook: "https://www.facebook.com/profile.php?id=100083737489911",
    instagram: "https://instagram.com/junaiddentalcare",
    youtube: "https://youtube.com/@junaiddentalcare",
    whatsapp: "https://wa.me/923125028812",
  },
};

const smtp = {
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  user: "junaiddental22@gmail.com",
  fromEmail: "junaiddental22@gmail.com",
  fromName: "JDC – Junaid Dental Care",
};

const analytics = {
  pageViews: 24800,
  uniqueVisitors: 6420,
  appointments: 312,
  conversionRate: 5.7,
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
  ],
};

// ── Handlers (all return success(...) with the shapes admin.js expects) ──
const dashboard = (req, res) => success(res, {
  counts: {
    appointments: appointments.length,
    todayAppointments: appointments.filter((a) => a.date === new Date().toISOString().slice(0, 10)).length,
    patients: 1284,
    doctors: doctors.length,
    services: services.length,
    unreadMessages: messages.filter((m) => m.status === "NEW").length,
  },
  recentAppointments: appointments.slice(0, 5),
  recentMessages: messages.slice(0, 4),
  demoNotice: DEMO_NOTICE,
});

const listAppointments = (req, res) => success(res, appointments);
const createAppointment = (req, res) => success(res, { id: "a-demo", ...req.body }, 201, DEMO_NOTICE);
const updateAppointment = (req, res) => success(res, { id: req.params.id, ...req.body }, 200, DEMO_NOTICE);
const deleteAppointment = (req, res) => success(res, null, 200, DEMO_NOTICE);

const listDoctors = (req, res) => success(res, doctors);
const createDoctor = (req, res) => success(res, { id: "d-demo", ...req.body }, 201, DEMO_NOTICE);
const updateDoctor = (req, res) => success(res, { id: req.params.id, ...req.body }, 200, DEMO_NOTICE);
const deleteDoctor = (req, res) => success(res, null, 200, DEMO_NOTICE);

const listServices = (req, res) => success(res, services);
const createService = (req, res) => success(res, { id: "s-demo", ...req.body }, 201, DEMO_NOTICE);
const updateService = (req, res) => success(res, { id: req.params.id, ...req.body }, 200, DEMO_NOTICE);
const deleteService = (req, res) => success(res, null, 200, DEMO_NOTICE);

const listGallery = (req, res) => success(res, gallery);
const createGallery = (req, res) => success(res, { id: "g-demo", ...req.body }, 201, DEMO_NOTICE);
const updateGallery = (req, res) => success(res, { id: req.params.id, ...req.body }, 200, DEMO_NOTICE);
const deleteGallery = (req, res) => success(res, null, 200, DEMO_NOTICE);

const listTestimonials = (req, res) => success(res, testimonials);
const createTestimonial = (req, res) => success(res, { id: "t-demo", ...req.body }, 201, DEMO_NOTICE);
const updateTestimonial = (req, res) => success(res, { id: req.params.id, ...req.body }, 200, DEMO_NOTICE);
const deleteTestimonial = (req, res) => success(res, null, 200, DEMO_NOTICE);

const listFaqs = (req, res) => success(res, faqs);
const createFaq = (req, res) => success(res, { id: "f-demo", ...req.body }, 201, DEMO_NOTICE);
const updateFaq = (req, res) => success(res, { id: req.params.id, ...req.body }, 200, DEMO_NOTICE);
const deleteFaq = (req, res) => success(res, null, 200, DEMO_NOTICE);

const listBlog = (req, res) => success(res, blog);
const createBlog = (req, res) => success(res, { id: "b-demo", ...req.body }, 201, DEMO_NOTICE);
const updateBlog = (req, res) => success(res, { id: req.params.id, ...req.body }, 200, DEMO_NOTICE);
const deleteBlog = (req, res) => success(res, null, 200, DEMO_NOTICE);

const listMessages = (req, res) => success(res, messages);
const updateMessage = (req, res) => success(res, { id: req.params.id, ...req.body }, 200, DEMO_NOTICE);
const deleteMessage = (req, res) => success(res, null, 200, DEMO_NOTICE);

const getSettings = (req, res) => success(res, { branding });
const updateSettings = (req, res) => success(res, { branding: req.body.branding || branding }, 200, DEMO_NOTICE);

const listUsers = (req, res) => success(res, users);
const updateUser = (req, res) => success(res, { id: req.params.id, ...req.body }, 200, DEMO_NOTICE);
const updateProfile = (req, res) => success(res, req.body, 200, DEMO_NOTICE);

const listSEO = (req, res) => success(res, seo);
const getSEO = (req, res) => success(res, seo.find((s) => s.pagePath === req.params.pagePath) || seo[0]);
const createSEO = (req, res) => success(res, { id: "seo-demo", ...req.body }, 201, DEMO_NOTICE);
const updateSEO = (req, res) => success(res, { id: req.params.id, ...req.body }, 200, DEMO_NOTICE);
const deleteSEO = (req, res) => success(res, null, 200, DEMO_NOTICE);

const getSMTP = (req, res) => success(res, smtp);
const updateSMTP = (req, res) => success(res, { ...smtp, ...req.body }, 200, DEMO_NOTICE);
const testSMTP = (req, res) => success(res, { ok: true, message: "SMTP test skipped (demo mode)" }, 200, DEMO_NOTICE);

const getAnalytics = (req, res) => success(res, analytics);

const createBackup = (req, res) => success(res, { file: `demo-backup-${new Date().toISOString().slice(0, 10)}.json` }, 201, DEMO_NOTICE);
const restoreBackup = (req, res) => success(res, null, 200, DEMO_NOTICE);

module.exports = {
  dashboard,
  listAppointments, createAppointment, updateAppointment, deleteAppointment,
  listDoctors, createDoctor, updateDoctor, deleteDoctor,
  listServices, createService, updateService, deleteService,
  listGallery, createGallery, updateGallery, deleteGallery,
  listTestimonials, createTestimonial, updateTestimonial, deleteTestimonial,
  listFaqs, createFaq, updateFaq, deleteFaq,
  listBlog, createBlog, updateBlog, deleteBlog,
  listMessages, updateMessage, deleteMessage,
  getSettings, updateSettings,
  listUsers, updateUser, updateProfile,
  listSEO, getSEO, createSEO, updateSEO, deleteSEO,
  getSMTP, updateSMTP, testSMTP,
  getAnalytics,
  createBackup, restoreBackup,
};
