export const APP_NAME = "Serene Dental";
export const APP_DESCRIPTION = "Where Beautiful Smiles Begin";
export const APP_TAGLINE = "Premium Dental Care";

export const CLINIC_INFO = {
  name: "Serene Dental Clinic",
  phone: "(555) 123-4567",
  emergencyPhone: "(555) 911-0000",
  email: "info@serenedental.com",
  address: {
    street: "123 Wellness Avenue, Suite 200",
    city: "San Francisco",
    state: "CA",
    zip: "94102",
    country: "US",
  },
  coordinates: {
    lat: 37.7749,
    lng: -122.4194,
  },
  hours: {
    weekday: "8:00 AM - 8:00 PM",
    saturday: "9:00 AM - 5:00 PM",
    sunday: "10:00 AM - 4:00 PM",
    emergency: "24/7",
  },
  founded: 1999,
} as const;

export const STATS = {
  yearsExperience: 25,
  patientsServed: 50000,
  satisfactionRate: 98,
  specialists: 15,
} as const;

export type NavigationLink = {
  readonly label: string;
  readonly href: string;
};

export type NavigationItem = NavigationLink & {
  readonly children?: readonly NavigationLink[];
};

export const NAVIGATION = {
  main: [
    { label: "Home", href: "/" },
    {
      label: "About",
      href: "/about",
      children: [
        { label: "Our Story", href: "/about" },
        { label: "Our Team", href: "/team" },
        { label: "Technology", href: "/technology" },
        { label: "Careers", href: "/careers" },
      ],
    },
    {
      label: "Services",
      href: "/services",
      children: [
        { label: "General Dentistry", href: "/services/general-dentistry" },
        { label: "Cosmetic Dentistry", href: "/services/cosmetic-dentistry" },
        { label: "Orthodontics", href: "/services/orthodontics" },
        { label: "Dental Implants", href: "/services/dental-implants" },
        { label: "Teeth Whitening", href: "/services/teeth-whitening" },
        { label: "Pediatric Dentistry", href: "/services/pediatric-dentistry" },
        { label: "Emergency Care", href: "/services/emergency-care" },
        { label: "View All Services", href: "/services" },
      ],
    },
    { label: "Doctors", href: "/doctors" },
    { label: "Gallery", href: "/gallery" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ] as readonly NavigationItem[],
  footer: {
    services: [
      { label: "General Dentistry", href: "/services/general-dentistry" },
      { label: "Cosmetic Dentistry", href: "/services/cosmetic-dentistry" },
      { label: "Orthodontics", href: "/services/orthodontics" },
      { label: "Dental Implants", href: "/services/dental-implants" },
      { label: "Teeth Whitening", href: "/services/teeth-whitening" },
      { label: "Emergency Care", href: "/services/emergency-care" },
    ],
    company: [
      { label: "About Us", href: "/about" },
      { label: "Our Team", href: "/team" },
      { label: "Technology", href: "/technology" },
      { label: "Careers", href: "/careers" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
    patients: [
      { label: "Book Appointment", href: "/book-appointment" },
      { label: "Patient Portal", href: "/patient/dashboard" },
      { label: "Insurance", href: "/insurance" },
      { label: "Pricing", href: "/pricing" },
      { label: "FAQ", href: "/faq" },
      { label: "Reviews", href: "/testimonials" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "Refund Policy", href: "/refund-policy" },
      { label: "Sitemap", href: "/sitemap" },
    ],
  },
} as const;

export const SOCIAL_LINKS = {
  facebook: "https://facebook.com/serenedental",
  instagram: "https://instagram.com/serenedental",
  twitter: "https://twitter.com/serenedental",
  linkedin: "https://linkedin.com/company/serenedental",
  youtube: "https://youtube.com/@serenedental",
  google: "https://g.page/serenedental",
} as const;

export const PAYMENT_METHODS = [
  { id: "CASH", label: "Cash", icon: "Banknote" },
  { id: "CREDIT_CARD", label: "Credit Card", icon: "CreditCard" },
  { id: "DEBIT_CARD", label: "Debit Card", icon: "CreditCard" },
  { id: "INSURANCE", label: "Insurance", icon: "Shield" },
  { id: "BANK_TRANSFER", label: "Bank Transfer", icon: "Building" },
  { id: "ONLINE", label: "Online Payment", icon: "Globe" },
  { id: "MOBILE_PAYMENT", label: "Mobile Payment", icon: "Smartphone" },
] as const;

export const APPOINTMENT_TYPES = [
  { value: "IN_PERSON", label: "In-Person Visit", icon: "MapPin" },
  { value: "TELEMEDICINE", label: "Telemedicine", icon: "Video" },
  { value: "FOLLOW_UP", label: "Follow-up", icon: "RotateCcw" },
  { value: "EMERGENCY", label: "Emergency", icon: "AlertTriangle" },
] as const;

export const SERVICE_CATEGORIES = [
  { value: "GENERAL", label: "General Dentistry" },
  { value: "COSMETIC", label: "Cosmetic Dentistry" },
  { value: "ORTHODONTICS", label: "Orthodontics" },
  { value: "PEDIATRIC", label: "Pediatric Dentistry" },
  { value: "SURGERY", label: "Oral Surgery" },
  { value: "EMERGENCY", label: "Emergency Care" },
  { value: "PREVENTIVE", label: "Preventive Care" },
  { value: "RESTORATIVE", label: "Restorative Dentistry" },
] as const;

export const BLOOD_GROUPS = [
  "A_POSITIVE",
  "A_NEGATIVE",
  "B_POSITIVE",
  "B_NEGATIVE",
  "AB_POSITIVE",
  "AB_NEGATIVE",
  "O_POSITIVE",
  "O_NEGATIVE",
] as const;

export const DAYS_OF_WEEK = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
] as const;

export const TIME_SLOTS = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
] as const;

export const FAQ_CATEGORIES = [
  { value: "GENERAL", label: "General Questions" },
  { value: "TREATMENTS", label: "Treatments" },
  { value: "BILLING", label: "Billing & Payments" },
  { value: "INSURANCE", label: "Insurance" },
  { value: "EMERGENCY", label: "Emergency" },
  { value: "FIRST_VISIT", label: "First Visit" },
  { value: "APPOINTMENTS", label: "Appointments" },
] as const;

export const PERMISSIONS = {
  // Patient permissions
  "patients.view": "View patient list",
  "patients.view_own": "View own patient record",
  "patients.create": "Create patients",
  "patients.update": "Update patient information",
  "patients.update_own": "Update own patient information",
  "patients.delete": "Delete patients",

  // Doctor permissions
  "doctors.view": "View doctor list",
  "doctors.create": "Create doctors",
  "doctors.update": "Update doctor information",
  "doctors.delete": "Delete doctors",
  "doctors.manage_schedule": "Manage doctor schedules",

  // Appointment permissions
  "appointments.view": "View all appointments",
  "appointments.view_own": "View own appointments",
  "appointments.create": "Create appointments",
  "appointments.update": "Update appointments",
  "appointments.cancel": "Cancel appointments",
  "appointments.delete": "Delete appointments",

  // Medical records
  "medical_records.view": "View all medical records",
  "medical_records.view_own": "View own medical records",
  "medical_records.create": "Create medical records",
  "medical_records.update": "Update medical records",
  "medical_records.delete": "Delete medical records",

  // Prescriptions
  "prescriptions.view": "View all prescriptions",
  "prescriptions.view_own": "View own prescriptions",
  "prescriptions.create": "Create prescriptions",
  "prescriptions.update": "Update prescriptions",

  // Payments
  "payments.view": "View all payments",
  "payments.view_own": "View own payments",
  "payments.create": "Process payments",
  "payments.refund": "Process refunds",

  // CMS
  "cms.blog.manage": "Manage blog posts",
  "cms.pages.manage": "Manage pages",
  "cms.media.manage": "Manage media library",
  "cms.faq.manage": "Manage FAQs",
  "cms.testimonials.manage": "Manage testimonials",

  // Admin
  "admin.dashboard": "View admin dashboard",
  "admin.users.manage": "Manage users",
  "admin.roles.manage": "Manage roles and permissions",
  "admin.settings.manage": "Manage system settings",
  "admin.reports.view": "View reports",
  "admin.analytics.view": "View analytics",
  "admin.audit.view": "View audit logs",
  "admin.backup.manage": "Manage backups",
} as const;
