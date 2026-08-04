import type {
  UserRole,
  AppointmentStatus,
  AppointmentType,
  PaymentStatus,
  PaymentMethod,
  TreatmentStatus,
  PostStatus,
  ReviewStatus,
  InvoiceStatus,
} from "@/types/prisma-enums";

// ═══════════════════════════════════════════════════════════════════════
// USER TYPES
// ═══════════════════════════════════════════════════════════════════════

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  image?: string | null;
}

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string | null;
  avatar?: string | null;
  role: UserRole;
  status: string;
  createdAt: Date;
}

// ═══════════════════════════════════════════════════════════════════════
// APPOINTMENT TYPES
// ═══════════════════════════════════════════════════════════════════════

export interface AppointmentWithDetails {
  id: string;
  appointmentNumber: string;
  date: Date;
  startTime: string;
  endTime: string;
  type: AppointmentType;
  status: AppointmentStatus;
  reason?: string | null;
  notes?: string | null;
  patient: {
    id: string;
    user: {
      firstName: string;
      lastName: string;
      email: string;
      phone?: string | null;
      avatar?: string | null;
    };
    patientNumber: string;
  };
  doctor: {
    id: string;
    user: { firstName: string; lastName: string; avatar?: string | null };
    specialization: string;
    doctorNumber: string;
  };
  service?: {
    id: string;
    name: string;
    duration: number;
    price: number;
  } | null;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  status: AppointmentStatus;
  patientName: string;
  doctorName: string;
  serviceName?: string;
  type: AppointmentType;
}

// ═══════════════════════════════════════════════════════════════════════
// PATIENT TYPES
// ═══════════════════════════════════════════════════════════════════════

export interface PatientWithDetails {
  id: string;
  patientNumber: string;
  user: UserProfile;
  dateOfBirth: Date;
  gender: string;
  bloodGroup?: string | null;
  address: Address;
  emergencyContact?: EmergencyContact | null;
  insuranceProvider?: string | null;
  insuranceNumber?: string | null;
  allergies: string[];
  medications: string[];
  medicalConditions: string[];
  createdAt: Date;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  email?: string;
}

// ═══════════════════════════════════════════════════════════════════════
// DOCTOR TYPES
// ═══════════════════════════════════════════════════════════════════════

export interface DoctorWithDetails {
  id: string;
  doctorNumber: string;
  user: UserProfile;
  specialization: string;
  qualifications: { degree: string; institution: string; year: number }[];
  licenseNumber: string;
  experience: number;
  bio?: string | null;
  consultationFee: number;
  followUpFee: number;
  languages: string[];
  acceptingNewPatients: boolean;
  averageRating: number;
  totalReviews: number;
  department?: { id: string; name: string } | null;
  schedules: DoctorScheduleDay[];
}

export interface DoctorScheduleDay {
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  breakStart?: string | null;
  breakEnd?: string | null;
  slotDuration: number;
  isActive: boolean;
}

export interface TimeSlot {
  time: string;
  available: boolean;
  label: string;
}

// ═══════════════════════════════════════════════════════════════════════
// TREATMENT TYPES
// ═══════════════════════════════════════════════════════════════════════

export interface TreatmentPlanWithDetails {
  id: string;
  title: string;
  description: string;
  diagnosis: string;
  status: TreatmentStatus;
  startDate?: Date | null;
  endDate?: Date | null;
  estimatedCost: number;
  actualCost?: number | null;
  sessions: number;
  completedSessions: number;
  notes?: string | null;
  patient: { id: string; user: { firstName: string; lastName: string } };
  doctor: {
    id: string;
    user: { firstName: string; lastName: string };
    specialization: string;
  };
  service: { id: string; name: string };
  procedures: ProcedureDetails[];
}

export interface ProcedureDetails {
  id: string;
  name: string;
  description?: string | null;
  toothNumber?: string | null;
  status: string;
  scheduledDate?: Date | null;
  completedDate?: Date | null;
  cost?: number | null;
}

// ═══════════════════════════════════════════════════════════════════════
// PAYMENT TYPES
// ═══════════════════════════════════════════════════════════════════════

export interface PaymentWithDetails {
  id: string;
  paymentNumber: string;
  amount: number;
  currency: string;
  method: PaymentMethod;
  status: PaymentStatus;
  description?: string | null;
  paidAt?: Date | null;
  patient: { id: string; user: { firstName: string; lastName: string } };
  createdAt: Date;
}

export interface InvoiceWithDetails {
  id: string;
  invoiceNumber: string;
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  status: InvoiceStatus;
  dueDate: Date;
  items: InvoiceItem[];
  notes?: string | null;
  patient: {
    id: string;
    user: { firstName: string; lastName: string; email: string };
  };
  createdAt: Date;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
  tax: number;
}

// ═══════════════════════════════════════════════════════════════════════
// CMS TYPES
// ═══════════════════════════════════════════════════════════════════════

export interface BlogPostWithDetails {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string | null;
  status: PostStatus;
  publishedAt?: Date | null;
  viewCount: number;
  readingTime: number;
  isFeatured: boolean;
  author: {
    id: string;
    firstName: string;
    lastName: string;
    avatar?: string | null;
  };
  category: { id: string; name: string; slug: string };
  tags: { tag: { id: string; name: string; slug: string } }[];
  createdAt: Date;
}

// ═══════════════════════════════════════════════════════════════════════
// REVIEW TYPES
// ═══════════════════════════════════════════════════════════════════════

export interface ReviewWithDetails {
  id: string;
  rating: number;
  title?: string | null;
  content: string;
  source: string;
  status: ReviewStatus;
  isVerified: boolean;
  isFeatured: boolean;
  response?: string | null;
  respondedAt?: Date | null;
  user: { firstName: string; lastName: string; avatar?: string | null };
  doctor?: { user: { firstName: string; lastName: string } } | null;
  createdAt: Date;
}

// ═══════════════════════════════════════════════════════════════════════
// DASHBOARD TYPES
// ═══════════════════════════════════════════════════════════════════════

export interface DashboardStats {
  totalPatients: number;
  totalDoctors: number;
  totalAppointments: number;
  totalRevenue: number;
  todayAppointments: number;
  pendingAppointments: number;
  completedAppointments: number;
  cancelledAppointments: number;
  newPatientsThisMonth: number;
  revenueThisMonth: number;
  averageRating: number;
  occupancyRate: number;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  label?: string;
  color?: string;
}

export interface RevenueData {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
}

export interface AppointmentAnalytics {
  byStatus: ChartDataPoint[];
  byType: ChartDataPoint[];
  byService: ChartDataPoint[];
  byDoctor: ChartDataPoint[];
  trend: { date: string; count: number }[];
}

export interface PatientDemographics {
  byAge: ChartDataPoint[];
  byGender: ChartDataPoint[];
  byInsurance: ChartDataPoint[];
}

// ═══════════════════════════════════════════════════════════════════════
// API TYPES
// ═══════════════════════════════════════════════════════════════════════

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  meta?: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface SearchParams {
  query?: string;
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  [key: string]: string | number | boolean | undefined;
}

// ═══════════════════════════════════════════════════════════════════════
// NOTIFICATION TYPES
// ═══════════════════════════════════════════════════════════════════════

export interface NotificationItem {
  id: string;
  type: string;
  title: string;
  message: string;
  link?: string | null;
  isRead: boolean;
  createdAt: Date;
}

// ═══════════════════════════════════════════════════════════════════════
// FORM TYPES
// ═══════════════════════════════════════════════════════════════════════

export interface FormState {
  errors?: Record<string, string[]>;
  message?: string;
  success?: boolean;
}

// ═══════════════════════════════════════════════════════════════════════
// STORE TYPES
// ═══════════════════════════════════════════════════════════════════════

export interface CartItem {
  serviceId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface AppStore {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
}
