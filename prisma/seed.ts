import { PrismaClient } from "@prisma/client";
import {
  UserRole,
  ServiceCategory,
  FAQCategory,
  DayOfWeek,
} from "../src/types/prisma-enums";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create admin user
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
      role: UserRole.SUPER_ADMIN,
      status: "ACTIVE",
      emailVerified: new Date(),
    },
  });
  console.log("✅ Admin user created");

  // Create departments
  const departments = await Promise.all(
    [
      {
        name: "General Dentistry",
        slug: "general-dentistry",
        description: "Comprehensive dental care for the whole family",
      },
      {
        name: "Cosmetic Dentistry",
        slug: "cosmetic-dentistry",
        description: "Smile enhancement and aesthetic procedures",
      },
      {
        name: "Orthodontics",
        slug: "orthodontics",
        description: "Teeth alignment and bite correction",
      },
      {
        name: "Pediatric Dentistry",
        slug: "pediatric-dentistry",
        description: "Specialized dental care for children",
      },
      {
        name: "Oral Surgery",
        slug: "oral-surgery",
        description: "Surgical procedures and extractions",
      },
      {
        name: "Periodontics",
        slug: "periodontics",
        description: "Gum disease treatment and prevention",
      },
      {
        name: "Endodontics",
        slug: "endodontics",
        description: "Root canal therapy and pulp treatment",
      },
    ].map((dept) =>
      prisma.department.upsert({
        where: { slug: dept.slug },
        update: {},
        create: dept,
      }),
    ),
  );
  console.log("✅ Departments created");

  // Create services
  const services = [
    {
      name: "General Checkup",
      slug: "general-checkup",
      description:
        "Comprehensive dental examination with digital X-rays, oral cancer screening, and personalized treatment plan.",
      shortDescription:
        "Complete dental health assessment with advanced diagnostics.",
      price: 150,
      duration: 30,
      category: ServiceCategory.GENERAL,
      departmentId: departments[0].id,
    },
    {
      name: "Teeth Cleaning",
      slug: "teeth-cleaning",
      description:
        "Professional dental cleaning to remove plaque, tartar, and stains. Includes polishing and fluoride treatment.",
      shortDescription: "Professional cleaning for a fresh, healthy smile.",
      price: 120,
      duration: 45,
      category: ServiceCategory.PREVENTIVE,
      departmentId: departments[0].id,
    },
    {
      name: "Teeth Whitening",
      slug: "teeth-whitening",
      description:
        "In-office professional whitening treatment for dramatically brighter teeth in a single visit.",
      shortDescription: "Professional whitening for a radiant smile.",
      price: 350,
      duration: 60,
      category: ServiceCategory.COSMETIC,
      departmentId: departments[1].id,
    },
    {
      name: "Dental Veneers",
      slug: "dental-veneers",
      description:
        "Custom porcelain veneers to transform your smile. Perfect for correcting chips, gaps, and discoloration.",
      shortDescription: "Porcelain veneers for a perfect smile.",
      price: 1500,
      duration: 120,
      category: ServiceCategory.COSMETIC,
      departmentId: departments[1].id,
    },
    {
      name: "Invisalign",
      slug: "invisalign",
      description:
        "Clear aligner treatment for straighter teeth without traditional braces. Discreet and comfortable.",
      shortDescription: "Invisible braces for a straighter smile.",
      price: 4500,
      duration: 30,
      category: ServiceCategory.ORTHODONTICS,
      departmentId: departments[2].id,
    },
    {
      name: "Dental Implants",
      slug: "dental-implants",
      description:
        "Permanent tooth replacement using titanium implants. Natural-looking and fully functional.",
      shortDescription: "Permanent replacement for missing teeth.",
      price: 3000,
      duration: 120,
      category: ServiceCategory.RESTORATIVE,
      departmentId: departments[4].id,
    },
    {
      name: "Root Canal",
      slug: "root-canal",
      description:
        "Pain-free root canal therapy to save infected teeth using advanced technology.",
      shortDescription: "Gentle root canal to save your natural tooth.",
      price: 800,
      duration: 90,
      category: ServiceCategory.RESTORATIVE,
      departmentId: departments[6].id,
    },
    {
      name: "Dental Crown",
      slug: "dental-crown",
      description:
        "Custom-made crowns to restore damaged teeth. Same-day CAD/CAM technology available.",
      shortDescription: "Custom crowns for damaged teeth.",
      price: 1200,
      duration: 60,
      category: ServiceCategory.RESTORATIVE,
      departmentId: departments[0].id,
    },
    {
      name: "Emergency Care",
      slug: "emergency-care",
      description:
        "24/7 emergency dental services for toothaches, trauma, infections, and urgent dental needs.",
      shortDescription: "Immediate care for dental emergencies.",
      price: 200,
      duration: 45,
      category: ServiceCategory.EMERGENCY,
      departmentId: departments[0].id,
    },
    {
      name: "Pediatric Checkup",
      slug: "pediatric-checkup",
      description:
        "Gentle dental examination for children with a focus on prevention and education.",
      shortDescription: "Fun, friendly dental care for kids.",
      price: 100,
      duration: 30,
      category: ServiceCategory.PEDIATRIC,
      departmentId: departments[3].id,
    },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: {},
      create: { ...service, isActive: true },
    });
  }
  console.log("✅ Services created");

  // Create sample doctors
  const doctorPassword = await bcrypt.hash("Doctor@123", 12);
  const doctorUsers = [
    {
      email: "dr.mitchell@serenedental.com",
      firstName: "Sarah",
      lastName: "Mitchell",
    },
    { email: "dr.chen@serenedental.com", firstName: "James", lastName: "Chen" },
    {
      email: "dr.rodriguez@serenedental.com",
      firstName: "Emily",
      lastName: "Rodriguez",
    },
    {
      email: "dr.thompson@serenedental.com",
      firstName: "Michael",
      lastName: "Thompson",
    },
  ];

  const specializations = [
    "General & Cosmetic Dentistry",
    "Orthodontics",
    "Pediatric Dentistry",
    "Oral Surgery",
  ];
  const experiences = [20, 15, 10, 18];

  for (let i = 0; i < doctorUsers.length; i++) {
    const user = await prisma.user.upsert({
      where: { email: doctorUsers[i].email },
      update: {},
      create: {
        ...doctorUsers[i],
        hashedPassword: doctorPassword,
        role: UserRole.DOCTOR,
        status: "ACTIVE",
        emailVerified: new Date(),
      },
    });

    await prisma.doctor.upsert({
      where: { userId: user.id },
      update: {},
      create: {
        userId: user.id,
        doctorNumber: `SDR-${String(i + 1).padStart(4, "0")}`,
        specialization: specializations[i],
        qualifications: [
          { degree: "DDS", institution: "Top University", year: 2000 + i },
        ],
        licenseNumber: `LIC-${String(i + 1).padStart(6, "0")}`,
        licenseExpiry: new Date("2028-12-31"),
        experience: experiences[i],
        bio: `Experienced ${specializations[i]} specialist with over ${experiences[i]} years of practice.`,
        consultationFee: 150 + i * 25,
        followUpFee: 100 + i * 15,
        languages: ["English"],
        averageRating: 4.8 + i * 0.05,
        totalReviews: 100 + i * 20,
        departmentId: departments[i].id,
      },
    });

    // Create schedules
    for (const day of [
      DayOfWeek.MONDAY,
      DayOfWeek.TUESDAY,
      DayOfWeek.WEDNESDAY,
      DayOfWeek.THURSDAY,
      DayOfWeek.FRIDAY,
    ]) {
      await prisma.doctorSchedule.upsert({
        where: {
          doctorId_dayOfWeek: {
            doctorId: (await prisma.doctor.findUnique({
              where: { userId: user.id },
            }))!.id,
            dayOfWeek: day,
          },
        },
        update: {},
        create: {
          doctorId: (await prisma.doctor.findUnique({
            where: { userId: user.id },
          }))!.id,
          dayOfWeek: day,
          startTime: "09:00",
          endTime: "17:00",
          breakStart: "12:00",
          breakEnd: "13:00",
          slotDuration: 30,
        },
      });
    }
  }
  console.log("✅ Doctors created");

  // Create FAQs (skip duplicates so the seed can be re-run safely)
  const faqs = [
    {
      question: "What should I expect during my first visit?",
      answer:
        "Your first visit includes a comprehensive dental examination, digital X-rays if needed, a professional cleaning, and a personalized treatment plan discussion with your dentist.",
      category: FAQCategory.FIRST_VISIT,
    },
    {
      question: "How do I schedule or reschedule an appointment?",
      answer:
        "You can book appointments online through our patient portal, call us, or use our mobile app. Rescheduling can be done up to 24 hours before your appointment.",
      category: FAQCategory.APPOINTMENTS,
    },
    {
      question: "Do you accept dental insurance?",
      answer:
        "Yes, we accept most major dental insurance plans including Delta Dental, Cigna, MetLife, and Aetna. Our team will help verify your coverage.",
      category: FAQCategory.INSURANCE,
    },
    {
      question: "What constitutes a dental emergency?",
      answer:
        "Dental emergencies include severe tooth pain, knocked-out teeth, broken teeth, uncontrolled bleeding, and dental abscess. We offer 24/7 emergency care.",
      category: FAQCategory.EMERGENCY,
    },
    {
      question: "Is teeth whitening safe?",
      answer:
        "Professional teeth whitening performed by our dental team is completely safe and effective. We use clinically proven methods.",
      category: FAQCategory.TREATMENTS,
    },
    {
      question: "How often should I visit the dentist?",
      answer:
        "We recommend dental check-ups every 6 months for most patients. Your dentist will create a personalized schedule based on your needs.",
      category: FAQCategory.GENERAL,
    },
    {
      question: "Do you offer payment plans?",
      answer:
        "Yes, we offer flexible financing options including CareCredit, Lending Club, and in-house payment plans.",
      category: FAQCategory.BILLING,
    },
    {
      question: "How long does Invisalign treatment take?",
      answer:
        "Invisalign treatment typically takes 12-18 months. During your consultation, we will provide a personalized timeline.",
      category: FAQCategory.TREATMENTS,
    },
  ];

  for (let i = 0; i < faqs.length; i++) {
    const existingFaq = await prisma.fAQ.findFirst({
      where: { question: faqs[i].question },
    });
    if (existingFaq) continue;
    await prisma.fAQ.create({
      data: { ...faqs[i], sortOrder: i, isActive: true },
    });
  }
  console.log("✅ FAQs created");

  // Create testimonials
  const testimonials = [
    {
      patientName: "Sarah Johnson",
      content:
        "Serene Dental completely transformed my smile. The team made me feel so comfortable throughout the entire process. Results exceeded my expectations!",
      rating: 5,
    },
    {
      patientName: "Michael Chen",
      content:
        "I was terrified of dentists until I found Serene Dental. The calming environment and gentle approach put me at ease immediately.",
      rating: 5,
    },
    {
      patientName: "Emily Rodriguez",
      content:
        "My kids love coming here! The office is beautiful and the staff is incredibly friendly. Highly recommend for families.",
      rating: 5,
    },
    {
      patientName: "David Kim",
      content:
        "Got my Invisalign treatment here and the results are incredible. Professional, attentive team. Worth every penny.",
      rating: 5,
    },
  ];

  for (const testimonial of testimonials) {
    const existing = await prisma.testimonial.findFirst({
      where: { patientName: testimonial.patientName },
    });
    if (existing) continue;
    await prisma.testimonial.create({
      data: { ...testimonial, isActive: true, isFeatured: true },
    });
  }
  console.log("✅ Testimonials created");

  // Create blog categories
  await Promise.all(
    [
      "Preventive Care",
      "Cosmetic Dentistry",
      "Orthodontics",
      "Patient Care",
      "Dental Technology",
      "Oral Health Tips",
    ].map((name) =>
      prisma.blogCategory.upsert({
        where: { slug: name.toLowerCase().replace(/\s+/g, "-") },
        update: {},
        create: { name, slug: name.toLowerCase().replace(/\s+/g, "-") },
      }),
    ),
  );
  console.log("✅ Blog categories created");

  // Create branding (id is a generated UUID, so check by existence instead of
  // upserting on a fixed id — a non-UUID id like "default" would fail on Postgres)
  const existingBranding = await prisma.branding.findFirst();
  if (!existingBranding) {
    await prisma.branding.create({
      data: {
        primaryColor: "#0D7377",
        secondaryColor: "#D4A574",
        accentColor: "#14A3A8",
        fontFamily: "Plus Jakarta Sans",
        socialLinks: {
          facebook: "https://facebook.com/serenedental",
          instagram: "https://instagram.com/serenedental",
          twitter: "https://twitter.com/serenedental",
        },
        contactInfo: {
          phone: "(555) 123-4567",
          email: "info@serenedental.com",
          address: "123 Wellness Avenue, Suite 200, San Francisco, CA 94102",
        },
      },
    });
  }
  console.log("✅ Branding created");

  // Create email templates
  const emailTemplates = [
    {
      name: "appointment_confirmation",
      subject: "Appointment Confirmed - {{date}} at {{time}}",
      body: "<p>Dear {{patientName}}, your appointment on {{date}} at {{time}} with {{doctorName}} has been confirmed.</p>",
      variables: ["patientName", "date", "time", "doctorName", "serviceName"],
    },
    {
      name: "appointment_reminder",
      subject: "Reminder: Your appointment on {{date}}",
      body: "<p>Dear {{patientName}}, this is a reminder about your upcoming appointment on {{date}} at {{time}}.</p>",
      variables: ["patientName", "date", "time"],
    },
    {
      name: "welcome",
      subject: "Welcome to Serene Dental!",
      body: "<p>Dear {{firstName}}, welcome to the Serene Dental family!</p>",
      variables: ["firstName"],
    },
    {
      name: "password_reset",
      subject: "Reset Your Password",
      body: "<p>Click the link below to reset your password: {{resetUrl}}</p>",
      variables: ["firstName", "resetUrl"],
    },
  ];

  for (const template of emailTemplates) {
    await prisma.emailTemplate.upsert({
      where: { name: template.name },
      update: {},
      create: template,
    });
  }
  console.log("✅ Email templates created");

  // Create settings
  const settings = [
    {
      key: "clinic.name",
      value: "Serene Dental Clinic",
      category: "general",
      isPublic: true,
    },
    {
      key: "clinic.phone",
      value: "(555) 123-4567",
      category: "general",
      isPublic: true,
    },
    {
      key: "clinic.email",
      value: "info@serenedental.com",
      category: "general",
      isPublic: true,
    },
    {
      key: "clinic.address",
      value: "123 Wellness Avenue, Suite 200, San Francisco, CA 94102",
      category: "general",
      isPublic: true,
    },
    {
      key: "appointment.cancellation_hours",
      value: 24,
      category: "appointments",
      isPublic: false,
    },
    {
      key: "appointment.slot_duration",
      value: 30,
      category: "appointments",
      isPublic: false,
    },
    {
      key: "payment.currency",
      value: "USD",
      category: "payments",
      isPublic: true,
    },
    {
      key: "notifications.reminder_hours",
      value: 24,
      category: "notifications",
      isPublic: false,
    },
    {
      key: "notifications.sms_enabled",
      value: false,
      category: "notifications",
      isPublic: false,
    },
  ];

  for (const setting of settings) {
    await prisma.setting.upsert({
      where: { key: setting.key },
      update: {},
      create: { ...setting, value: JSON.stringify(setting.value) },
    });
  }
  console.log("✅ Settings created");

  // Create pages
  const pages = [
    {
      title: "Privacy Policy",
      slug: "privacy-policy",
      template: "legal",
      isSystem: true,
    },
    {
      title: "Terms of Service",
      slug: "terms-of-service",
      template: "legal",
      isSystem: true,
    },
    {
      title: "Cookie Policy",
      slug: "cookie-policy",
      template: "legal",
      isSystem: true,
    },
    {
      title: "Refund Policy",
      slug: "refund-policy",
      template: "legal",
      isSystem: true,
    },
  ];

  for (const page of pages) {
    await prisma.page.upsert({
      where: { slug: page.slug },
      update: {},
      create: { ...page, status: "PUBLISHED", content: "" },
    });
  }
  console.log("✅ Pages created");

  console.log("🎉 Database seeding completed!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
