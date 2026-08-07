/* eslint-disable no-console */
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

const img = (name) => `/images/${name}`;

async function main() {
  console.log("🌱 Seeding Junaid Dental Care database...");

  // ── Admin user ───────────────────────────────────────────────────────────
  const adminPassword = await bcrypt.hash("Admin@123", 12);
  await prisma.user.upsert({
    where: { email: "admin@junaiddentalcare.pk" },
    update: {},
    create: {
      email: "admin@junaiddentalcare.pk",
      hashedPassword: adminPassword,
      firstName: "Junaid",
      lastName: "Ahmed",
      phone: "+923125028812",
      role: "SUPER_ADMIN",
      status: "ACTIVE",
      emailVerified: new Date(),
    },
  });
  console.log("✅ Admin user (admin@junaiddentalcare.pk / Admin@123)");

  // ── Departments ──────────────────────────────────────────────────────────
  const deptData = [
    { name: "General Dentistry", slug: "general-dentistry", description: "Comprehensive dental care for the whole family." },
    { name: "Cosmetic Dentistry", slug: "cosmetic-dentistry", description: "Smile enhancement and aesthetic procedures." },
    { name: "Orthodontics", slug: "orthodontics", description: "Teeth alignment and bite correction." },
    { name: "Pediatric Dentistry", slug: "pediatric-dentistry", description: "Specialized dental care for children." },
    { name: "Oral Surgery", slug: "oral-surgery", description: "Surgical procedures and extractions." },
    { name: "Periodontics", slug: "periodontics", description: "Gum disease treatment and prevention." },
    { name: "Endodontics", slug: "endodontics", description: "Root canal therapy and pulp treatment." },
    { name: "Restorative Dentistry", slug: "restorative-dentistry", description: "Crowns, bridges, and restorative work." },
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
      shortDescription: "Comprehensive check-ups, cleanings, and preventive care for the whole family.",
      description: "From routine check-ups and professional cleanings to detailed examinations, our general dentistry keeps your whole family's oral health on track. We use modern diagnostic tools and gentle techniques to detect issues early and keep your smile healthy for life.",
      price: 1500, duration: 30, category: "GENERAL", icon: "stethoscope",
      departmentId: depts["general-dentistry"]?.id, isFeatured: true, sortOrder: 1,
    },
    {
      name: "Cosmetic Dentistry", slug: "cosmetic-dentistry",
      shortDescription: "Veneers, bonding, and complete smile makeovers.",
      description: "Transform your smile with porcelain veneers, tooth bonding, and complete smile makeovers tailored to your facial features. We craft natural-looking results that boost your confidence and last for years.",
      price: 8500, duration: 60, category: "COSMETIC", icon: "sparkles",
      departmentId: depts["cosmetic-dentistry"]?.id, isFeatured: true, sortOrder: 2,
    },
    {
      name: "Orthodontics & Braces", slug: "orthodontics",
      shortDescription: "Traditional braces and clear aligners for a straighter smile.",
      description: "We offer modern orthodontic solutions including traditional metal braces, ceramic braces, and clear aligners to correct alignment and bite issues for teenagers and adults. Free orthodontic consultation included.",
      price: 45000, duration: 45, category: "ORTHODONTICS", icon: "align-center",
      departmentId: depts["orthodontics"]?.id, isFeatured: true, sortOrder: 3,
    },
    {
      name: "Dental Implants", slug: "dental-implants",
      shortDescription: "Permanent, natural-looking tooth replacement.",
      description: "Restore missing teeth with premium titanium implants that look, feel, and function like natural teeth. Our implant specialists use guided surgery for precise, comfortable placement and beautiful long-lasting results.",
      price: 85000, duration: 90, category: "SURGERY", icon: "anchor",
      departmentId: depts["oral-surgery"]?.id, isFeatured: true, sortOrder: 4,
    },
    {
      name: "Teeth Whitening", slug: "teeth-whitening",
      shortDescription: "Brighten your smile by several shades in a single visit.",
      description: "Professional in-office whitening that lifts years of stains safely and effectively in about an hour. We also offer take-home kits for maintenance.",
      price: 6500, duration: 60, category: "COSMETIC", icon: "sun",
      departmentId: depts["cosmetic-dentistry"]?.id, isFeatured: true, sortOrder: 5,
    },
    {
      name: "Pediatric Dentistry", slug: "pediatric-dentistry",
      shortDescription: "Gentle, fun dental care for children of all ages.",
      description: "A friendly, fear-free environment that helps children build healthy habits for life. Our pediatric team is trained to make every visit calm, educational, and even fun.",
      price: 1200, duration: 30, category: "PEDIATRIC", icon: "baby",
      departmentId: depts["pediatric-dentistry"]?.id, isFeatured: true, sortOrder: 6,
    },
    {
      name: "Emergency Care", slug: "emergency-care",
      shortDescription: "Same-day relief for dental emergencies — call us anytime.",
      description: "Toothaches, broken teeth, knocked-out teeth, and urgent dental issues handled fast. We keep same-day emergency slots open and provide immediate care for acute pain and trauma.",
      price: 2500, duration: 30, category: "EMERGENCY", icon: "siren",
      departmentId: depts["general-dentistry"]?.id, isFeatured: true, sortOrder: 7,
    },
    {
      name: "Root Canal Therapy", slug: "root-canal-therapy",
      shortDescription: "Save damaged teeth with modern, gentle endodontics.",
      description: "Comfortable root canal treatment using rotary endodontic technology to relieve pain and preserve your natural tooth. Most treatments completed in a single visit.",
      price: 12000, duration: 90, category: "RESTORATIVE", icon: "activity",
      departmentId: depts["endodontics"]?.id, isFeatured: false, sortOrder: 8,
    },
    {
      name: "Periodontal Treatment", slug: "periodontal-treatment",
      shortDescription: "Expert care for healthy gums and prevention of gum disease.",
      description: "Scaling, root planing, and gum therapy to treat and prevent periodontal (gum) disease. Healthy gums are the foundation of a beautiful smile.",
      price: 4500, duration: 60, category: "PREVENTIVE", icon: "shield",
      departmentId: depts["periodontics"]?.id, isFeatured: false, sortOrder: 9,
    },
    {
      name: "Wisdom Tooth Extraction", slug: "wisdom-tooth-extraction",
      shortDescription: "Safe and gentle removal of impacted wisdom teeth.",
      description: "Specialist surgical extraction of impacted or problematic wisdom teeth using modern sedation techniques. Minimal discomfort, fast recovery.",
      price: 8000, duration: 60, category: "SURGERY", icon: "anchor",
      departmentId: depts["oral-surgery"]?.id, isFeatured: false, sortOrder: 10,
    },
    {
      name: "Dental Crowns & Bridges", slug: "dental-crowns-bridges",
      shortDescription: "Custom-made crowns and bridges to restore damaged or missing teeth.",
      description: "Premium zirconia and porcelain crowns and bridges hand-crafted for a perfect fit and natural appearance. Restores strength, function, and beauty.",
      price: 15000, duration: 60, category: "RESTORATIVE", icon: "shield",
      departmentId: depts["restorative-dentistry"]?.id, isFeatured: false, sortOrder: 11,
    },
    {
      name: "Dental Fillings", slug: "dental-fillings",
      shortDescription: "Tooth-colored composite fillings for cavities and minor repairs.",
      description: "Natural-looking composite fillings that match your tooth shade perfectly. Stop decay and restore your tooth's function in a single visit.",
      price: 2000, duration: 30, category: "RESTORATIVE", icon: "activity",
      departmentId: depts["general-dentistry"]?.id, isFeatured: false, sortOrder: 12,
    },
  ];
  for (const s of serviceData) {
    await prisma.service.upsert({ where: { slug: s.slug }, update: {}, create: s });
  }
  console.log(`✅ Services (${serviceData.length})`);

  // ── Doctors ──────────────────────────────────────────────────────────────
  const doctorSeeds = [
    { email: "junaid@junaiddentalcare.pk", firstName: "Junaid", lastName: "Ahmed", specialization: "Principal Dentist & Implantologist", experience: 12, dept: "general-dentistry", fee: 2000, bio: "Dr. Junaid Ahmed is the founder and principal dentist at Junaid Dental Care. With over 12 years of experience, he specializes in dental implants, full-mouth rehabilitation, and complex restorative cases. He completed his BDS from a leading Pakistani dental college and continues advanced training internationally.", languages: ["Urdu", "English", "Punjabi"] },
    { email: "ayesha@junaiddentalcare.pk", firstName: "Ayesha", lastName: "Khan", specialization: "Cosmetic & Restorative Dentist", experience: 8, dept: "cosmetic-dentistry", fee: 1800, bio: "Dr. Ayesha Khan brings an artistic eye and gentle touch to cosmetic dentistry. She is known for stunning smile makeovers, porcelain veneers, and natural-looking restorations that patients love.", languages: ["Urdu", "English"] },
    { email: "hassan@junaiddentalcare.pk", firstName: "Hassan", lastName: "Raza", specialization: "Orthodontist", experience: 9, dept: "orthodontics", fee: 2000, bio: "Dr. Hassan Raza is our specialist orthodontist, expert in traditional braces, ceramic braces, and clear aligner therapy. He creates personalised treatment plans for patients of all ages.", languages: ["Urdu", "English", "Punjabi"] },
    { email: "sana@junaiddentalcare.pk", firstName: "Sana", lastName: "Malik", specialization: "Pediatric Dentist", experience: 6, dept: "pediatric-dentistry", fee: 1500, bio: "Dr. Sana Malik is loved by children and parents alike. She creates a warm, fun atmosphere that makes every child's dental visit a positive experience, building healthy habits for life.", languages: ["Urdu", "English"] },
    { email: "bilal@junaiddentalcare.pk", firstName: "Bilal", lastName: "Sheikh", specialization: "Oral Surgeon", experience: 10, dept: "oral-surgery", fee: 2500, bio: "Dr. Bilal Sheikh is a skilled oral and maxillofacial surgeon specializing in complex extractions, wisdom tooth surgery, and dental implant placement.", languages: ["Urdu", "English"] },
    { email: "maria@junaiddentalcare.pk", firstName: "Maria", lastName: "Aslam", specialization: "Endodontist", experience: 7, dept: "endodontics", fee: 2000, bio: "Dr. Maria Aslam specializes in root canal therapy and endodontic microsurgery, using the latest rotary technology to provide virtually painless treatments.", languages: ["Urdu", "English", "Pashto"] },
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
          phone: "+923125028812",
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
          languages: d.languages,
          acceptingNewPatients: true,
          qualifications: [{ degree: "BDS", institution: "Pakistan", year: 2012 }],
          licenseNumber: `PMDC-${Date.now()}-${docCount}`,
          licenseExpiry: new Date("2030-01-01"),
          departmentId: depts[d.dept]?.id,
        },
      });
    }
  }
  console.log(`✅ Doctors (${doctorSeeds.length})`);

  // ── Testimonials ─────────────────────────────────────────────────────────
  const testimonialData = [
    { patientName: "Ahmed Raza", content: "I had my dental implants done at Junaid Dental Care and the experience was outstanding. Dr. Junaid was patient, professional, and the results are amazing. Highly recommended for anyone in Ali Pur area!", rating: 5, sortOrder: 1, isFeatured: true },
    { patientName: "Fatima Shah", content: "My kids used to be scared of dentists. Dr. Sana made them so comfortable — now they actually look forward to their check-ups. The clinic is clean, modern, and the staff is wonderful.", rating: 5, sortOrder: 2, isFeatured: true },
    { patientName: "Muhammad Imran", content: "Got my braces done here last year. Dr. Hassan and his team were fantastic. My teeth are perfectly aligned now. Very reasonable pricing compared to other clinics in Islamabad.", rating: 5, sortOrder: 3, isFeatured: true },
    { patientName: "Saima Akhtar", content: "Emergency toothache on a Friday night — they took my call and saw me first thing Saturday morning. True professionals. Forever grateful to Dr. Ayesha for the painless root canal.", rating: 5, sortOrder: 4 },
    { patientName: "Tariq Mehmood", content: "Best dental clinic in the area. I came in for a cleaning and ended up getting my whole family's dental care here. Transparent pricing, no hidden fees, and the WhatsApp booking is super convenient.", rating: 5, sortOrder: 5 },
    { patientName: "Nida Yasir", content: "My smile makeover with veneers exceeded my expectations. Dr. Ayesha truly has an artist's eye. I smile with confidence now — thank you Junaid Dental Care!", rating: 5, sortOrder: 6 },
    { patientName: "Zubair Ali", content: "Wisdom tooth extraction was something I was dreading, but Dr. Bilal made it completely painless. The clinic is spotless, equipment is modern, and the staff is caring. 5 stars!", rating: 5, sortOrder: 7 },
    { patientName: "Rabia Khan", content: "Affordable, professional, and trustworthy. The clinic is conveniently located near Old Bank Stop in Ali Pur. Easy to find, easy parking, easy appointments via WhatsApp.", rating: 4, sortOrder: 8 },
  ];
  for (const t of testimonialData) {
    await prisma.testimonial.create({ data: t });
  }
  console.log(`✅ Testimonials (${testimonialData.length})`);

  // ── FAQs ─────────────────────────────────────────────────────────────────
  const faqData = [
    { question: "How often should I visit the dentist?", answer: "For most patients, we recommend a check-up and professional cleaning every six months. Regular visits help us detect issues early, before they become painful or expensive to treat.", category: "FIRST_VISIT", sortOrder: 1 },
    { question: "Do you offer payment plans or installment options?", answer: "Yes! We understand dental treatments can be a significant investment. We offer flexible installment plans for major treatments like implants, braces, and full-mouth rehabilitation. Ask our front desk for details.", category: "BILLING", sortOrder: 2 },
    { question: "What should I do in a dental emergency?", answer: "Call us immediately at +92 312 5028812 or message us on WhatsApp. We keep same-day emergency slots open and provide immediate care for severe toothache, broken teeth, knocked-out teeth, and other urgent dental issues.", category: "EMERGENCY", sortOrder: 3 },
    { question: "Are the treatments painful?", answer: "We use modern local anesthesia and gentle techniques so most treatments are virtually pain-free. For anxious patients, we also offer sedation options. Our team is trained to make every visit as comfortable as possible.", category: "TREATMENTS", sortOrder: 4 },
    { question: "How much does a first consultation cost?", answer: "Your first comprehensive consultation is just PKR 1,500 and includes a full oral examination, treatment plan, and X-rays if needed. New patients also receive 15% off their first treatment.", category: "BILLING", sortOrder: 5 },
    { question: "How do I book an appointment?", answer: "You can book in three easy ways: (1) Online through our website, (2) Call us at +92 312 5028812, or (3) Send us a message on WhatsApp. We confirm every booking within 1 hour during clinic hours.", category: "APPOINTMENTS", sortOrder: 6 },
    { question: "Do you treat children?", answer: "Absolutely. Dr. Sana Malik is our dedicated pediatric dentist with years of experience making children feel comfortable and safe. We welcome patients of all ages, from toddlers to grandparents.", category: "GENERAL", sortOrder: 7 },
    { question: "What insurance plans do you accept?", answer: "We accept most major insurance plans in Pakistan. We also provide all necessary documentation for reimbursement. Contact us with your policy details and we'll verify your coverage before your visit.", category: "INSURANCE", sortOrder: 8 },
    { question: "Where is Junaid Dental Care located?", answer: "We're located on Lehtrar Road, near Old Bank Stop in Ali Pur, just 15 minutes from Islamabad. Easy to find on Google Maps and there's plenty of parking available outside the clinic.", category: "FIRST_VISIT", sortOrder: 9 },
    { question: "How long do dental implants last?", answer: "With proper care, dental implants can last a lifetime. We use premium titanium implants from internationally certified manufacturers and provide detailed aftercare instructions to maximise longevity.", category: "TREATMENTS", sortOrder: 10 },
  ];
  for (const f of faqData) {
    await prisma.faq.create({ data: f });
  }
  console.log(`✅ FAQs (${faqData.length})`);

  // ── Gallery ──────────────────────────────────────────────────────────────
  const galleryData = [
    { title: "Welcome to Junaid Dental Care", description: "Our modern reception area in Ali Pur", category: "CLINIC", image: img("gallery-reception.jpg"), sortOrder: 1 },
    { title: "State-of-the-Art Treatment Suite", description: "Premium equipment for comfortable care", category: "CLINIC", image: img("gallery-treatment.jpg"), sortOrder: 2 },
    { title: "Digital X-Ray & 3D Imaging", description: "Modern diagnostic technology", category: "TECHNOLOGY", image: img("gallery-tech.jpg"), sortOrder: 3 },
    { title: "Smile Makeover Result", description: "Cosmetic dentistry transformation", category: "BEFORE_AFTER", image: img("gallery-smile.jpg"), sortOrder: 4 },
    { title: "Our Caring Team", description: "The Junaid Dental Care family", category: "TEAM", image: img("gallery-team.jpg"), sortOrder: 5 },
    { title: "Gentle, Personalised Care", description: "Every patient is family", category: "TREATMENTS", image: img("gallery-care.jpg"), sortOrder: 6 },
  ];
  for (const g of galleryData) {
    await prisma.gallery.create({ data: g });
  }
  console.log(`✅ Gallery (${galleryData.length})`);

  // ── Blog ─────────────────────────────────────────────────────────────────
  const blogCats = [
    { name: "Dental Care", slug: "dental-care", description: "Tips and news for a healthy smile." },
    { name: "Orthodontics", slug: "orthodontics", description: "Braces, aligners, and teeth alignment." },
    { name: "Cosmetic Dentistry", slug: "cosmetic-dentistry", description: "Smile makeovers and aesthetic dentistry." },
    { name: "Pediatric Dentistry", slug: "pediatric-dentistry", description: "Caring for children's teeth." },
  ];
  const blogCatMap = {};
  for (const c of blogCats) {
    blogCatMap[c.slug] = await prisma.blogCategory.upsert({
      where: { slug: c.slug },
      update: {},
      create: c,
    });
  }

  const author = await prisma.user.findUnique({ where: { email: "admin@junaiddentalcare.pk" } });
  const blogData = [
    {
      title: "10 Everyday Habits That Keep Your Teeth Healthy",
      slug: "10-everyday-habits-healthy-teeth",
      excerpt: "Simple, science-backed habits that protect your smile between visits — straight from the Junaid Dental Care team.",
      content: "<p>Great oral health starts at home. Here are ten simple habits our dentists recommend to keep your teeth and gums in top shape between visits.</p><h3>1. Brush Twice a Day</h3><p>Use fluoride toothpaste and brush for at least two minutes, morning and night. Replace your toothbrush every 3 months.</p><h3>2. Floss Daily</h3><p>Flossing removes plaque from between your teeth where your brush can't reach. Just once a day makes a huge difference.</p><h3>3. Limit Sugary Snacks</h3><p>Bacteria in your mouth feed on sugar and produce acid that erodes enamel. Choose fruits, nuts, and cheese for healthier snacks.</p><h3>4. Drink More Water</h3><p>Water rinses away food particles and keeps your mouth hydrated. Pakistani cities can be hot — keep a water bottle handy.</p><h3>5. Don't Skip Your Check-ups</h3><p>Visit Junaid Dental Care every six months. Early detection saves you pain, time, and money.</p>",
      readingTime: 4, status: "PUBLISHED", categorySlug: "dental-care", days: 5,
    },
    {
      title: "What to Expect During Your First Visit to Junaid Dental Care",
      slug: "first-visit-junaid-dental-care",
      excerpt: "A complete walkthrough of your first appointment at our Ali Pur clinic — from check-in to your personalised care plan.",
      content: "<p>Walking into a dental clinic for the first time can feel daunting. At Junaid Dental Care, we go out of our way to make your first visit welcoming, comfortable, and informative. Here's what to expect.</p><h3>1. Warm Welcome</h3><p>Our front desk team will greet you, confirm your details, and help with any paperwork. Tea or water is always offered.</p><h3>2. Comprehensive Examination</h3><p>Dr. Junaid or one of our specialists will perform a thorough examination of your teeth, gums, and bite. Digital X-rays may be taken if needed.</p><h3>3. Personalised Treatment Plan</h3><p>You'll receive a clear, written treatment plan with transparent pricing. No pressure, no surprises.</p><h3>4. Same-Day Treatment (Optional)</h3><p>If you're comfortable and time allows, we can often start simple treatments (like cleaning) on your very first visit.</p>",
      readingTime: 3, status: "PUBLISHED", categorySlug: "dental-care", days: 20,
    },
    {
      title: "Braces vs Clear Aligners: Which Is Right for You?",
      slug: "braces-vs-clear-aligners",
      excerpt: "Our orthodontist explains the differences between traditional braces and clear aligners to help you make the right choice.",
      content: "<p>One of the most common questions we get at Junaid Dental Care is: <em>should I get braces or clear aligners?</em> The answer depends on your case, lifestyle, and budget. Here's an honest comparison.</p><h3>Traditional Metal Braces</h3><p><strong>Best for:</strong> Complex alignment issues, severe crowding, bite correction, younger patients.<br><strong>Pros:</strong> Most affordable, highly effective, work for all cases.<br><strong>Cons:</strong> Visible, dietary restrictions, more frequent visits.</p><h3>Clear Aligners (Invisalign-style)</h3><p><strong>Best for:</strong> Mild to moderate alignment, adults who want discretion.<br><strong>Pros:</strong> Nearly invisible, removable for eating, fewer clinic visits.<br><strong>Cons:</strong> Higher cost, requires discipline (22 hrs/day), not for complex cases.</p><h3>What We Recommend</h3><p>Book a free orthodontic consultation with Dr. Hassan Raza. He'll examine your teeth, show you a 3D simulation of your potential results, and recommend the option that fits your case and budget.</p>",
      readingTime: 5, status: "PUBLISHED", categorySlug: "orthodontics", days: 40,
    },
  ];
  for (const b of blogData) {
    const existing = await prisma.blogPost.findUnique({ where: { slug: b.slug } });
    if (!existing) {
      const d = new Date();
      d.setDate(d.getDate() - b.days);
      await prisma.blogPost.create({
        data: {
          title: b.title,
          slug: b.slug,
          excerpt: b.excerpt,
          content: b.content,
          featuredImage: img("blog-1.svg"),
          authorId: author.id,
          categoryId: blogCatMap[b.categorySlug]?.id,
          status: "PUBLISHED",
          publishedAt: d,
          readingTime: b.readingTime,
          isFeatured: b.days === 5,
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
        logo: "/images/logo.svg",
        favicon: "/favicon.svg",
        primaryColor: "#0F766E",
        secondaryColor: "#C8874A",
        accentColor: "#14B8A6",
        fontFamily: "Plus Jakarta Sans",
        contactInfo: {
          phone: "+92 312 5028812",
          email: "info@junaiddentalcare.pk",
          address: "J5WM+643, Lehtrar Road, near Old Bank Stop, Ali Pur, Islamabad Capital Territory 45600, Pakistan",
          hours: "Mon-Sat 8:00 AM - 9:00 PM",
          whatsapp: "923125028812",
          emergencyPhone: "+92 312 5028812",
          googleMaps: "https://maps.app.goo.gl/sim1qA4wDdpcMovK7",
        },
        socialLinks: {
          facebook: "https://facebook.com/junaiddentalcare",
          instagram: "https://instagram.com/junaiddentalcare",
          youtube: "https://youtube.com/@junaiddentalcare",
          tiktok: "https://tiktok.com/@junaiddentalcare",
          whatsapp: "https://wa.me/923125028812",
        },
      },
    });
  }
  console.log("✅ Branding settings");

  // ── SEO defaults ───────────────────────────────────────────────────────
  const seoDefaults = [
    { pagePath: "/", title: "Junaid Dental Care — Premium Dental Clinic in Ali Pur, Pakistan", description: "Junaid Dental Care offers premium dental treatments in Ali Pur, Pakistan. Dental implants, braces, cosmetic dentistry, root canals & emergency care. Call +92 312 5028812 to book.", keywords: ["dentist Ali Pur", "dental clinic Lehtrar Road", "dental implants Pakistan", "braces Islamabad"] },
    { pagePath: "/about", title: "About Junaid Dental Care | Our Story", description: "Learn about Junaid Dental Care — Ali Pur's trusted family dental clinic since 2015. Meet our team and discover our approach to gentle, modern dental care.", keywords: ["about Junaid Dental", "Ali Pur dentist", "dental clinic story"] },
    { pagePath: "/services", title: "Dental Services | Junaid Dental Care Ali Pur", description: "Explore our full range of dental services: general, cosmetic, orthodontics, implants, root canal, paediatric and emergency dentistry in Ali Pur.", keywords: ["dental services", "cosmetic dentistry", "dental implants"] },
    { pagePath: "/doctors", title: "Our Doctors | Junaid Dental Care", description: "Meet our six specialist dentists at Junaid Dental Care — experts in cosmetic dentistry, orthodontics, implants, paediatric care, and oral surgery.", keywords: ["dentists Ali Pur", "dental specialists"] },
    { pagePath: "/contact", title: "Contact Junaid Dental Care | Ali Pur, Pakistan", description: "Visit us at Lehtrar Road, near Old Bank Stop, Ali Pur. Call +92 312 5028812, WhatsApp us, or book online for premium dental care.", keywords: ["contact dentist Ali Pur", "dental clinic location"] },
    { pagePath: "/book-appointment", title: "Book Your Appointment | Junaid Dental Care", description: "Book your dental appointment online at Junaid Dental Care. Choose your doctor, treatment, date and time in seconds.", keywords: ["book dentist", "online appointment"] },
  ];
  for (const s of seoDefaults) {
    await prisma.sEOSettings.upsert({
      where: { pagePath: s.pagePath },
      update: {},
      create: s,
    });
  }
  console.log("✅ SEO defaults");

  console.log("\n🎉 Seeding complete!");
  console.log("   Admin login: admin@junaiddentalcare.pk / Admin@123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
