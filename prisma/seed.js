/* eslint-disable no-console */
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

const img = (name) => `/images/${name}`;

async function main() {
  console.log("🌱 Seeding database...");

  // ── Admin user ───────────────────────────────────────────────────────────
  const adminPassword = await bcrypt.hash("Admin@123", 12);
  await prisma.user.upsert({
    where: { email: "admin@serenedental.com" },
    update: {},
    create: {
      email: "admin@serenedental.com",
      hashedPassword: adminPassword,
      firstName: "Admin",
      lastName: "User",
      phone: "(555) 000-0001",
      role: "SUPER_ADMIN",
      status: "ACTIVE",
      emailVerified: new Date(),
    },
  });
  console.log("✅ Admin user (admin@serenedental.com / Admin@123)");

  // ── Departments ──────────────────────────────────────────────────────────
  const deptData = [
    { name: "General Dentistry", slug: "general-dentistry", description: "Comprehensive dental care for the whole family." },
    { name: "Cosmetic Dentistry", slug: "cosmetic-dentistry", description: "Smile enhancement and aesthetic procedures." },
    { name: "Orthodontics", slug: "orthodontics", description: "Teeth alignment and bite correction." },
    { name: "Pediatric Dentistry", slug: "pediatric-dentistry", description: "Specialized dental care for children." },
    { name: "Oral Surgery", slug: "oral-surgery", description: "Surgical procedures and extractions." },
    { name: "Periodontics", slug: "periodontics", description: "Gum disease treatment and prevention." },
    { name: "Endodontics", slug: "endodontics", description: "Root canal therapy and pulp treatment." },
  ];
  const depts = {};
  for (const d of deptData) {
    depts[d.slug] = await prisma.department.upsert({
      where: { slug: d.slug },
      update: {},
      create: d,
    });
  }
  console.log(`✅ Departments (${deptData.length})`);

  // ── Services ─────────────────────────────────────────────────────────────
  const serviceData = [
    {
      name: "General Dentistry", slug: "general-dentistry",
      shortDescription: "Comprehensive check-ups, cleanings, and preventive care.",
      description: "From routine check-ups and professional cleanings to detailed examinations, our general dentistry keeps your whole family's oral health on track.",
      price: 120, duration: 30, category: "GENERAL", icon: "stethoscope",
      departmentId: depts["general-dentistry"]?.id, isFeatured: true, sortOrder: 1,
    },
    {
      name: "Cosmetic Dentistry", slug: "cosmetic-dentistry",
      shortDescription: "Veneers, bonding, and smile makeovers.",
      description: "Transform your smile with veneers, tooth bonding, and complete smile makeovers tailored to your facial features.",
      price: 450, duration: 60, category: "COSMETIC", icon: "sparkles",
      departmentId: depts["cosmetic-dentistry"]?.id, isFeatured: true, sortOrder: 2,
    },
    {
      name: "Orthodontics", slug: "orthodontics",
      shortDescription: "Braces and clear aligners for a straighter smile.",
      description: "Traditional braces and clear aligners (Invisalign) to correct alignment and bite issues at any age.",
      price: 300, duration: 45, category: "ORTHODONTICS", icon: "align-center",
      departmentId: depts["orthodontics"]?.id, isFeatured: true, sortOrder: 3,
    },
    {
      name: "Dental Implants", slug: "dental-implants",
      shortDescription: "Permanent, natural-looking tooth replacement.",
      description: "Restore missing teeth with titanium implants that look, feel, and function like natural teeth.",
      price: 1500, duration: 90, category: "SURGERY", icon: "anchor",
      departmentId: depts["oral-surgery"]?.id, isFeatured: true, sortOrder: 4,
    },
    {
      name: "Teeth Whitening", slug: "teeth-whitening",
      shortDescription: "Brighten your smile in a single visit.",
      description: "Professional in-office whitening that lifts years of stains in about an hour.",
      price: 350, duration: 60, category: "COSMETIC", icon: "sun",
      departmentId: depts["cosmetic-dentistry"]?.id, isFeatured: true, sortOrder: 5,
    },
    {
      name: "Pediatric Dentistry", slug: "pediatric-dentistry",
      shortDescription: "Gentle, fun dental care for children.",
      description: "A friendly, fear-free environment that helps kids build healthy habits for life.",
      price: 90, duration: 30, category: "PEDIATRIC", icon: "baby",
      departmentId: depts["pediatric-dentistry"]?.id, isFeatured: true, sortOrder: 6,
    },
    {
      name: "Emergency Care", slug: "emergency-care",
      shortDescription: "Same-day relief for dental emergencies.",
      description: "Toothaches, broken teeth, and urgent dental issues handled fast — 24/7.",
      price: 200, duration: 30, category: "EMERGENCY", icon: "siren",
      departmentId: depts["general-dentistry"]?.id, isFeatured: true, sortOrder: 7,
    },
    {
      name: "Root Canal Therapy", slug: "root-canal-therapy",
      shortDescription: "Save damaged teeth with modern, gentle endodontics.",
      description: "Comfortable root canal treatment using rotary technology to relieve pain and preserve your natural tooth.",
      price: 700, duration: 90, category: "RESTORATIVE", icon: "activity",
      departmentId: depts["endodontics"]?.id, isFeatured: false, sortOrder: 8,
    },
    {
      name: "Periodontal Treatment", slug: "periodontal-treatment",
      shortDescription: "Expert care for healthy gums.",
      description: "Scaling, root planing, and gum therapy to treat and prevent periodontal disease.",
      price: 250, duration: 60, category: "PREVENTIVE", icon: "shield",
      departmentId: depts["periodontics"]?.id, isFeatured: false, sortOrder: 9,
    },
  ];
  for (const s of serviceData) {
    await prisma.service.upsert({ where: { slug: s.slug }, update: {}, create: s });
  }
  console.log(`✅ Services (${serviceData.length})`);

  // ── Doctors ──────────────────────────────────────────────────────────────
  const doctorSeeds = [
    { email: "e.carter@serenedental.com", firstName: "Emily", lastName: "Carter", specialization: "General Dentistry", experience: 12, dept: "general-dentistry", fee: 150, bio: "Dr. Carter leads our general dentistry practice with a gentle, patient-first approach." },
    { email: "j.reyes@serenedental.com", firstName: "James", lastName: "Reyes", specialization: "Orthodontics", experience: 10, dept: "orthodontics", fee: 180, bio: "Board-certified orthodontist specializing in clear aligner therapy for teens and adults." },
    { email: "s.okafor@serenedental.com", firstName: "Sarah", lastName: "Okafor", specialization: "Cosmetic Dentistry", experience: 9, dept: "cosmetic-dentistry", fee: 200, bio: "Award-winning cosmetic dentist crafting natural-looking smile makeovers." },
    { email: "m.tanaka@serenedental.com", firstName: "Michael", lastName: "Tanaka", specialization: "Oral Surgery", experience: 15, dept: "oral-surgery", fee: 250, bio: "Experienced oral surgeon focused on comfortable implant placement and extractions." },
  ];
  let docCount = 0;
  for (const d of doctorSeeds) {
    const existingUser = await prisma.user.findUnique({ where: { email: d.email } });
    let userId = existingUser?.id;
    if (!userId) {
      const user = await prisma.user.create({
        data: {
          email: d.email,
          hashedPassword: await bcrypt.hash("Doctor@123", 12),
          firstName: d.firstName,
          lastName: d.lastName,
          phone: "(555) 100-0000",
          role: "DOCTOR",
          status: "ACTIVE",
        },
      });
      userId = user.id;
    }
    const doctor = await prisma.doctor.findUnique({ where: { userId } });
    if (!doctor) {
      await prisma.doctor.create({
        data: {
          userId,
          doctorNumber: `DOC-${String(++docCount).padStart(4, "0")}`,
          specialization: d.specialization,
          experience: d.experience,
          bio: d.bio,
          consultationFee: d.fee,
          followUpFee: d.fee / 2,
          languages: ["English", "Spanish"],
          acceptingNewPatients: true,
          qualifications: [{ degree: "DDS", institution: "University of California", year: 2012 }],
          licenseNumber: `LIC-${Date.now()}-${docCount}`,
          licenseExpiry: new Date("2030-01-01"),
          departmentId: depts[d.dept]?.id,
        },
      });
    }
  }
  console.log(`✅ Doctors (${doctorSeeds.length})`);

  // ── Testimonials ─────────────────────────────────────────────────────────
  const testimonialData = [
    { patientName: "Sarah Mitchell", content: "The entire team made me feel at ease from the moment I walked in. My smile has never looked better!", rating: 5, sortOrder: 1, isFeatured: true },
    { patientName: "David Chen", content: "I used to dread the dentist. Serene Dental completely changed that — every visit is calm and painless.", rating: 5, sortOrder: 2, isFeatured: true },
    { patientName: "Amanda Rodriguez", content: "The clear aligners process was smooth and the results are incredible. Highly recommend the orthodontics team!", rating: 5, sortOrder: 3, isFeatured: true },
    { patientName: "John Miller", content: "Emergency toothache at 8pm — they saw me right away and fixed me up. True lifesavers.", rating: 5, sortOrder: 4 },
    { patientName: "Priya Patel", content: "Beautiful clinic, friendly staff, and transparent pricing. Exactly what you want in a dental office.", rating: 4, sortOrder: 5 },
    { patientName: "Robert Thompson", content: "My kids actually look forward to their dental visits now. That says everything.", rating: 5, sortOrder: 6 },
  ];
  for (const t of testimonialData) {
    await prisma.testimonial.create({ data: t });
  }
  console.log(`✅ Testimonials (${testimonialData.length})`);

  // ── FAQs ─────────────────────────────────────────────────────────────────
  const faqData = [
    { question: "How often should I visit the dentist?", answer: "For most patients, every six months is recommended for a check-up and professional cleaning.", category: "FIRST_VISIT", sortOrder: 1 },
    { question: "Do you accept dental insurance?", answer: "Yes, we work with most major insurance providers and our front desk will help verify your benefits.", category: "INSURANCE", sortOrder: 2 },
    { question: "What should I do in a dental emergency?", answer: "Call us immediately. We keep same-day emergency slots open and provide 24/7 support.", category: "EMERGENCY", sortOrder: 3 },
    { question: "Are the treatments painful?", answer: "We use modern anesthesia and gentle techniques so most treatments are virtually pain-free.", category: "TREATMENTS", sortOrder: 4 },
    { question: "How much does a first visit cost?", answer: "New patients enjoy a free consultation plus 20% off their first treatment.", category: "BILLING", sortOrder: 5 },
    { question: "How do I book an appointment?", answer: "You can book online through this website, call us, or visit the clinic in person.", category: "APPOINTMENTS", sortOrder: 6 },
    { question: "Do you treat children?", answer: "Absolutely. Our pediatric dentistry team creates a fun, fear-free environment for kids.", category: "GENERAL", sortOrder: 7 },
  ];
  for (const f of faqData) {
    await prisma.faq.create({ data: f });
  }
  console.log(`✅ FAQs (${faqData.length})`);

  // ── Gallery ──────────────────────────────────────────────────────────────
  const galleryData = [
    { title: "Our Reception Area", description: "A calm, spa-like welcome space.", category: "CLINIC", image: img("gallery-reception.jpg"), sortOrder: 1 },
    { title: "Modern Treatment Suite", description: "Digital dentistry in comfort.", category: "CLINIC", image: img("gallery-treatment.jpg"), sortOrder: 2 },
    { title: "Imaging Technology", description: "3D digital imaging for precise care.", category: "TECHNOLOGY", image: img("gallery-tech.jpg"), sortOrder: 3 },
    { title: "Smile Makeover Result", description: "A happy patient after cosmetic care.", category: "BEFORE_AFTER", image: img("gallery-smile.jpg"), sortOrder: 4 },
    { title: "Our Care Team", description: "Friendly experts who put you first.", category: "TEAM", image: img("gallery-team.jpg"), sortOrder: 5 },
    { title: "Relaxed Dental Care", description: "Gentle treatments, stress-free visits.", category: "TREATMENTS", image: img("gallery-care.jpg"), sortOrder: 6 },
  ];
  for (const g of galleryData) {
    await prisma.gallery.create({ data: g });
  }
  console.log(`✅ Gallery (${galleryData.length})`);

  // ── Blog ─────────────────────────────────────────────────────────────────
  const blogCat = await prisma.blogCategory.upsert({
    where: { slug: "dental-care" },
    update: {},
    create: { name: "Dental Care", slug: "dental-care", description: "Tips and news for a healthy smile." },
  });
  const author = await prisma.user.findUnique({ where: { email: "admin@serenedental.com" } });
  const blogData = [
    {
      title: "10 Everyday Habits That Keep Your Teeth Healthy", slug: "10-everyday-habits-healthy-teeth",
      excerpt: "Simple, science-backed habits that protect your smile between visits.",
      content: "<p>Great oral health starts at home. Here are ten simple habits that keep your teeth and gums in top shape between dental visits.</p><p>Brush twice a day with fluoride toothpaste, floss daily, stay hydrated, limit sugary snacks, and don't skip your six-month check-ups.</p>",
      readingTime: 4, status: "PUBLISHED",
    },
    {
      title: "What to Expect During Your First Dental Visit", slug: "first-dental-visit-expectations",
      excerpt: "A walkthrough of your first appointment at Serene Dental — from check-in to check-up.",
      content: "<p>Your first visit is all about understanding your oral health and getting comfortable. Here's what to expect: a warm welcome, digital imaging, a gentle exam, and a personalized care plan.</p>",
      readingTime: 3, status: "PUBLISHED",
    },
    {
      title: "Invisalign vs. Traditional Braces: Which Is Right for You?", slug: "invisalign-vs-braces",
      excerpt: "We break down the differences to help you choose the best orthodontic treatment.",
      content: "<p>Both Invisalign and traditional braces straighten teeth effectively, but they suit different lifestyles and cases. Learn the trade-offs and talk to our orthodontists about which fits you.</p>",
      readingTime: 5, status: "PUBLISHED",
    },
  ];
  const publishedDays = [5, 20, 40];
  for (let i = 0; i < blogData.length; i++) {
    const b = blogData[i];
    const existing = await prisma.blogPost.findUnique({ where: { slug: b.slug } });
    if (!existing) {
      const d = new Date();
      d.setDate(d.getDate() - publishedDays[i]);
      await prisma.blogPost.create({
        data: {
          title: b.title,
          slug: b.slug,
          excerpt: b.excerpt,
          content: b.content,
          featuredImage: img(`blog-${i + 1}.jpg`),
          authorId: author.id,
          categoryId: blogCat.id,
          status: "PUBLISHED",
          publishedAt: d,
          readingTime: b.readingTime,
          isFeatured: i === 0,
        },
      });
    }
  }
  console.log(`✅ Blog posts (${blogData.length})`);

  // ── Settings / branding ──────────────────────────────────────────────────
  const existingBranding = await prisma.branding.findFirst();
  if (!existingBranding) {
    await prisma.branding.create({
      data: {
        primaryColor: "#0F766E",
        secondaryColor: "#C8874A",
        accentColor: "#14B8A6",
        fontFamily: "Plus Jakarta Sans",
        contactInfo: {
          phone: "(555) 123-4567",
          email: "info@serenedental.com",
          address: "123 Wellness Avenue, Suite 200, San Francisco, CA 94102",
          hours: "Mon-Fri 8:00 AM - 8:00 PM",
        },
        socialLinks: {
          facebook: "https://facebook.com/serenedental",
          instagram: "https://instagram.com/serenedental",
          twitter: "https://twitter.com/serenedental",
          linkedin: "https://linkedin.com/company/serenedental",
          youtube: "https://youtube.com/@serenedental",
        },
      },
    });
  }
  console.log("✅ Branding settings");

  console.log("\n🎉 Seeding complete!");
  console.log("   Admin login: admin@serenedental.com / Admin@123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
