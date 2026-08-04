import { z } from "zod";

// ═══════════════════════════════════════════════════════════════════════
// AUTH VALIDATIONS
// ═══════════════════════════════════════════════════════════════════════

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
});

export const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "First name must be at least 2 characters")
      .max(100),
    lastName: z
      .string()
      .min(2, "Last name must be at least 2 characters")
      .max(100),
    email: z.string().email("Please enter a valid email address"),
    phone: z
      .string()
      .regex(/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number")
      .optional(),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character",
      ),
    confirmPassword: z.string(),
    dateOfBirth: z.string().min(1, "Date of birth is required"),
    gender: z.enum(["MALE", "FEMALE", "OTHER", "PREFER_NOT_TO_SAY"]),
    acceptTerms: z.literal(true, {
      errorMap: () => ({ message: "You must accept the terms and conditions" }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export const resetPasswordSchema = z
  .object({
    token: z.string().min(1, "Token is required"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain uppercase")
      .regex(/[a-z]/, "Must contain lowercase")
      .regex(/[0-9]/, "Must contain number")
      .regex(/[^A-Za-z0-9]/, "Must contain special character"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// ═══════════════════════════════════════════════════════════════════════
// APPOINTMENT VALIDATIONS
// ═══════════════════════════════════════════════════════════════════════

export const appointmentSchema = z.object({
  serviceId: z.string().uuid("Please select a service").optional(),
  doctorId: z.string().uuid("Please select a doctor"),
  date: z.string().min(1, "Please select a date"),
  startTime: z.string().min(1, "Please select a time slot"),
  type: z
    .enum(["IN_PERSON", "TELEMEDICINE", "FOLLOW_UP", "EMERGENCY", "WALK_IN"])
    .default("IN_PERSON"),
  reason: z.string().max(500).optional(),
  notes: z.string().max(1000).optional(),
});

export const appointmentRescheduleSchema = z.object({
  appointmentId: z.string().uuid(),
  newDate: z.string().min(1, "Please select a new date"),
  newStartTime: z.string().min(1, "Please select a new time"),
  reason: z.string().max(500).optional(),
});

export const appointmentCancellationSchema = z.object({
  appointmentId: z.string().uuid(),
  reason: z
    .string()
    .min(10, "Please provide a reason for cancellation")
    .max(500),
});

// ═══════════════════════════════════════════════════════════════════════
// PATIENT VALIDATIONS
// ═══════════════════════════════════════════════════════════════════════

export const patientProfileSchema = z.object({
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.enum(["MALE", "FEMALE", "OTHER", "PREFER_NOT_TO_SAY"]),
  bloodGroup: z
    .enum([
      "A_POSITIVE",
      "A_NEGATIVE",
      "B_POSITIVE",
      "B_NEGATIVE",
      "AB_POSITIVE",
      "AB_NEGATIVE",
      "O_POSITIVE",
      "O_NEGATIVE",
    ])
    .optional(),
  address: z.object({
    street: z.string().min(1, "Street address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    zip: z.string().min(1, "ZIP code is required"),
    country: z.string().default("US"),
  }),
  emergencyContact: z
    .object({
      name: z.string().min(1, "Emergency contact name is required"),
      relationship: z.string().min(1, "Relationship is required"),
      phone: z.string().min(1, "Phone number is required"),
      email: z.string().email().optional(),
    })
    .optional(),
  insuranceProvider: z.string().optional(),
  insuranceNumber: z.string().optional(),
  allergies: z.array(z.string()).optional(),
  medications: z.array(z.string()).optional(),
  medicalConditions: z.array(z.string()).optional(),
});

// ═══════════════════════════════════════════════════════════════════════
// DOCTOR VALIDATIONS
// ═══════════════════════════════════════════════════════════════════════

export const doctorProfileSchema = z.object({
  specialization: z.string().min(1, "Specialization is required"),
  qualifications: z
    .array(
      z.object({
        degree: z.string().min(1),
        institution: z.string().min(1),
        year: z.number().min(1950).max(new Date().getFullYear()),
      }),
    )
    .min(1, "At least one qualification is required"),
  licenseNumber: z.string().min(1, "License number is required"),
  licenseExpiry: z.string().min(1, "License expiry is required"),
  experience: z.number().min(0).max(70),
  bio: z.string().max(2000).optional(),
  consultationFee: z.number().min(0),
  followUpFee: z.number().min(0),
  telemedicineFee: z.number().min(0).optional(),
  languages: z.array(z.string()).min(1, "At least one language is required"),
  acceptingNewPatients: z.boolean().default(true),
});

export const doctorScheduleSchema = z.object({
  schedules: z.array(
    z.object({
      dayOfWeek: z.enum([
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
        "SATURDAY",
        "SUNDAY",
      ]),
      startTime: z.string().regex(/^\d{2}:\d{2}$/, "Invalid time format"),
      endTime: z.string().regex(/^\d{2}:\d{2}$/, "Invalid time format"),
      breakStart: z
        .string()
        .regex(/^\d{2}:\d{2}$/)
        .optional(),
      breakEnd: z
        .string()
        .regex(/^\d{2}:\d{2}$/)
        .optional(),
      slotDuration: z.number().min(10).max(120).default(30),
      isActive: z.boolean().default(true),
    }),
  ),
});

// ═══════════════════════════════════════════════════════════════════════
// MEDICAL RECORD VALIDATIONS
// ═══════════════════════════════════════════════════════════════════════

export const medicalRecordSchema = z.object({
  patientId: z.string().uuid(),
  type: z.enum([
    "CONSULTATION",
    "EXAMINATION",
    "PROCEDURE",
    "LAB_RESULT",
    "IMAGING",
    "REFERRAL",
    "DISCHARGE_SUMMARY",
    "PROGRESS_NOTE",
  ]),
  title: z.string().min(1, "Title is required").max(200),
  content: z.string().min(1, "Content is required"),
  diagnosis: z.string().optional(),
  icdCode: z.string().optional(),
  vitalSigns: z
    .object({
      bp: z.string().optional(),
      pulse: z.number().optional(),
      temperature: z.number().optional(),
      weight: z.number().optional(),
      height: z.number().optional(),
    })
    .optional(),
  isConfidential: z.boolean().default(false),
});

export const prescriptionSchema = z.object({
  patientId: z.string().uuid(),
  medications: z
    .array(
      z.object({
        name: z.string().min(1, "Medication name is required"),
        dosage: z.string().min(1, "Dosage is required"),
        frequency: z.string().min(1, "Frequency is required"),
        duration: z.string().min(1, "Duration is required"),
        instructions: z.string().optional(),
        quantity: z.number().optional(),
        refills: z.number().optional(),
      }),
    )
    .min(1, "At least one medication is required"),
  diagnosis: z.string().min(1, "Diagnosis is required"),
  notes: z.string().optional(),
  validUntil: z.string().optional(),
});

// ═══════════════════════════════════════════════════════════════════════
// TREATMENT PLAN VALIDATIONS
// ═══════════════════════════════════════════════════════════════════════

export const treatmentPlanSchema = z.object({
  patientId: z.string().uuid(),
  serviceId: z.string().uuid(),
  title: z.string().min(1, "Title is required").max(200),
  description: z.string().min(1, "Description is required"),
  diagnosis: z.string().min(1, "Diagnosis is required"),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  estimatedCost: z.number().min(0),
  sessions: z.number().min(1).default(1),
  notes: z.string().optional(),
});

// ═══════════════════════════════════════════════════════════════════════
// PAYMENT VALIDATIONS
// ═══════════════════════════════════════════════════════════════════════

export const paymentSchema = z.object({
  patientId: z.string().uuid(),
  amount: z.number().min(0.01, "Amount must be greater than 0"),
  method: z.enum([
    "CASH",
    "CREDIT_CARD",
    "DEBIT_CARD",
    "INSURANCE",
    "BANK_TRANSFER",
    "ONLINE",
    "MOBILE_PAYMENT",
  ]),
  description: z.string().optional(),
});

export const invoiceSchema = z.object({
  patientId: z.string().uuid(),
  items: z
    .array(
      z.object({
        description: z.string().min(1),
        quantity: z.number().min(1),
        unitPrice: z.number().min(0),
        tax: z.number().min(0).default(0),
      }),
    )
    .min(1, "At least one item is required"),
  discount: z.number().min(0).default(0),
  couponCode: z.string().optional(),
  dueDate: z.string().min(1, "Due date is required"),
  notes: z.string().optional(),
});

// ═══════════════════════════════════════════════════════════════════════
// CMS VALIDATIONS
// ═══════════════════════════════════════════════════════════════════════

export const blogPostSchema = z.object({
  title: z.string().min(1, "Title is required").max(300),
  slug: z.string().min(1, "Slug is required").max(300),
  excerpt: z.string().min(1, "Excerpt is required").max(500),
  content: z.string().min(1, "Content is required"),
  featuredImage: z.string().optional(),
  categoryId: z.string().uuid("Please select a category"),
  tags: z.array(z.string()).optional(),
  status: z
    .enum(["DRAFT", "PUBLISHED", "SCHEDULED", "ARCHIVED"])
    .default("DRAFT"),
  scheduledAt: z.string().optional(),
  metaTitle: z.string().max(200).optional(),
  metaDescription: z.string().max(500).optional(),
  keywords: z.array(z.string()).optional(),
  isFeatured: z.boolean().default(false),
});

export const serviceSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  slug: z.string().min(1, "Slug is required").max(200),
  description: z.string().min(1, "Description is required"),
  shortDescription: z.string().min(1, "Short description is required").max(300),
  icon: z.string().optional(),
  image: z.string().optional(),
  price: z.number().min(0),
  duration: z.number().min(5, "Minimum duration is 5 minutes"),
  departmentId: z.string().uuid().optional(),
  category: z.enum([
    "GENERAL",
    "COSMETIC",
    "ORTHODONTICS",
    "PEDIATRIC",
    "SURGERY",
    "EMERGENCY",
    "PREVENTIVE",
    "RESTORATIVE",
  ]),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  metaTitle: z.string().max(200).optional(),
  metaDescription: z.string().max(500).optional(),
  keywords: z.array(z.string()).optional(),
});

// ═══════════════════════════════════════════════════════════════════════
// CONTACT & COMMUNICATION VALIDATIONS
// ═══════════════════════════════════════════════════════════════════════

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(200),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  subject: z.string().min(1, "Subject is required").max(300),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(5000),
});

export const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  name: z.string().max(200).optional(),
});

export const reviewSchema = z.object({
  rating: z.number().min(1, "Rating is required").max(5),
  title: z.string().max(200).optional(),
  content: z
    .string()
    .min(10, "Review must be at least 10 characters")
    .max(2000),
  doctorId: z.string().uuid().optional(),
});

// ═══════════════════════════════════════════════════════════════════════
// SETTINGS VALIDATIONS
// ═══════════════════════════════════════════════════════════════════════

export const brandingSchema = z.object({
  logo: z.string().optional(),
  logoDark: z.string().optional(),
  favicon: z.string().optional(),
  primaryColor: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/)
    .default("#0D7377"),
  secondaryColor: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/)
    .default("#D4A574"),
  accentColor: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/)
    .default("#14A3A8"),
  fontFamily: z.string().default("Plus Jakarta Sans"),
  customCss: z.string().optional(),
  socialLinks: z
    .object({
      facebook: z.string().url().optional(),
      instagram: z.string().url().optional(),
      twitter: z.string().url().optional(),
      linkedin: z.string().url().optional(),
      youtube: z.string().url().optional(),
    })
    .optional(),
  contactInfo: z
    .object({
      phone: z.string().optional(),
      email: z.string().email().optional(),
      address: z.string().optional(),
      hours: z.string().optional(),
    })
    .optional(),
});

export const seoSettingsSchema = z.object({
  pagePath: z.string().min(1),
  title: z.string().max(200).optional(),
  description: z.string().max(500).optional(),
  keywords: z.array(z.string()).optional(),
  ogImage: z.string().optional(),
  ogTitle: z.string().max(200).optional(),
  ogDescription: z.string().max(500).optional(),
  canonicalUrl: z.string().url().optional(),
  robots: z.string().optional(),
});

export const faqSchema = z.object({
  question: z.string().min(1, "Question is required").max(500),
  answer: z.string().min(1, "Answer is required"),
  category: z.enum([
    "GENERAL",
    "TREATMENTS",
    "BILLING",
    "INSURANCE",
    "EMERGENCY",
    "FIRST_VISIT",
    "APPOINTMENTS",
  ]),
  sortOrder: z.number().default(0),
  isActive: z.boolean().default(true),
});

export const testimonialSchema = z.object({
  patientName: z.string().min(1, "Patient name is required").max(200),
  content: z
    .string()
    .min(10, "Testimonial must be at least 10 characters")
    .max(2000),
  rating: z.number().min(1).max(5).default(5),
  image: z.string().optional(),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
});

export const couponSchema = z.object({
  code: z.string().min(3).max(50).toUpperCase(),
  description: z.string().optional(),
  discountType: z.enum(["PERCENTAGE", "FIXED_AMOUNT"]),
  discountValue: z.number().min(0),
  minAmount: z.number().min(0).optional(),
  maxDiscount: z.number().min(0).optional(),
  usageLimit: z.number().min(1).optional(),
  validFrom: z.string().min(1, "Start date is required"),
  validUntil: z.string().min(1, "End date is required"),
  isActive: z.boolean().default(true),
});

// ═══════════════════════════════════════════════════════════════════════
// TYPE EXPORTS
// ═══════════════════════════════════════════════════════════════════════

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type AppointmentInput = z.infer<typeof appointmentSchema>;
export type PatientProfileInput = z.infer<typeof patientProfileSchema>;
export type DoctorProfileInput = z.infer<typeof doctorProfileSchema>;
export type MedicalRecordInput = z.infer<typeof medicalRecordSchema>;
export type PrescriptionInput = z.infer<typeof prescriptionSchema>;
export type TreatmentPlanInput = z.infer<typeof treatmentPlanSchema>;
export type PaymentInput = z.infer<typeof paymentSchema>;
export type InvoiceInput = z.infer<typeof invoiceSchema>;
export type BlogPostInput = z.infer<typeof blogPostSchema>;
export type ServiceInput = z.infer<typeof serviceSchema>;
export type ContactFormInput = z.infer<typeof contactFormSchema>;
export type ReviewInput = z.infer<typeof reviewSchema>;
