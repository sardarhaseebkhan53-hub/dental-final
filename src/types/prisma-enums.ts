/**
 * Shared Prisma enum values used by the application before and after
 * Prisma Client generation. Keep this file in sync with prisma/schema.prisma.
 */

export const UserRole = {
  SUPER_ADMIN: "SUPER_ADMIN",
  ADMIN: "ADMIN",
  DOCTOR: "DOCTOR",
  STAFF: "STAFF",
  RECEPTIONIST: "RECEPTIONIST",
  PATIENT: "PATIENT",
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export const UserStatus = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  SUSPENDED: "SUSPENDED",
  PENDING_VERIFICATION: "PENDING_VERIFICATION",
} as const;

export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];

export const Gender = {
  MALE: "MALE",
  FEMALE: "FEMALE",
  OTHER: "OTHER",
  PREFER_NOT_TO_SAY: "PREFER_NOT_TO_SAY",
} as const;

export type Gender = (typeof Gender)[keyof typeof Gender];

export const BloodGroup = {
  A_POSITIVE: "A_POSITIVE",
  A_NEGATIVE: "A_NEGATIVE",
  B_POSITIVE: "B_POSITIVE",
  B_NEGATIVE: "B_NEGATIVE",
  AB_POSITIVE: "AB_POSITIVE",
  AB_NEGATIVE: "AB_NEGATIVE",
  O_POSITIVE: "O_POSITIVE",
  O_NEGATIVE: "O_NEGATIVE",
} as const;

export type BloodGroup = (typeof BloodGroup)[keyof typeof BloodGroup];

export const DayOfWeek = {
  MONDAY: "MONDAY",
  TUESDAY: "TUESDAY",
  WEDNESDAY: "WEDNESDAY",
  THURSDAY: "THURSDAY",
  FRIDAY: "FRIDAY",
  SATURDAY: "SATURDAY",
  SUNDAY: "SUNDAY",
} as const;

export type DayOfWeek = (typeof DayOfWeek)[keyof typeof DayOfWeek];

export const ServiceCategory = {
  GENERAL: "GENERAL",
  COSMETIC: "COSMETIC",
  ORTHODONTICS: "ORTHODONTICS",
  PEDIATRIC: "PEDIATRIC",
  SURGERY: "SURGERY",
  EMERGENCY: "EMERGENCY",
  PREVENTIVE: "PREVENTIVE",
  RESTORATIVE: "RESTORATIVE",
} as const;

export type ServiceCategory =
  (typeof ServiceCategory)[keyof typeof ServiceCategory];

export const TreatmentStatus = {
  PLANNED: "PLANNED",
  IN_PROGRESS: "IN_PROGRESS",
  ON_HOLD: "ON_HOLD",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
} as const;

export type TreatmentStatus =
  (typeof TreatmentStatus)[keyof typeof TreatmentStatus];

export const ProcedureStatus = {
  PENDING: "PENDING",
  IN_PROGRESS: "IN_PROGRESS",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
} as const;

export type ProcedureStatus =
  (typeof ProcedureStatus)[keyof typeof ProcedureStatus];

export const AppointmentType = {
  IN_PERSON: "IN_PERSON",
  TELEMEDICINE: "TELEMEDICINE",
  FOLLOW_UP: "FOLLOW_UP",
  EMERGENCY: "EMERGENCY",
  WALK_IN: "WALK_IN",
} as const;

export type AppointmentType =
  (typeof AppointmentType)[keyof typeof AppointmentType];

export const AppointmentStatus = {
  SCHEDULED: "SCHEDULED",
  CONFIRMED: "CONFIRMED",
  CHECKED_IN: "CHECKED_IN",
  IN_PROGRESS: "IN_PROGRESS",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
  NO_SHOW: "NO_SHOW",
  RESCHEDULED: "RESCHEDULED",
} as const;

export type AppointmentStatus =
  (typeof AppointmentStatus)[keyof typeof AppointmentStatus];

export const RecordType = {
  CONSULTATION: "CONSULTATION",
  EXAMINATION: "EXAMINATION",
  PROCEDURE: "PROCEDURE",
  LAB_RESULT: "LAB_RESULT",
  IMAGING: "IMAGING",
  REFERRAL: "REFERRAL",
  DISCHARGE_SUMMARY: "DISCHARGE_SUMMARY",
  PROGRESS_NOTE: "PROGRESS_NOTE",
} as const;

export type RecordType = (typeof RecordType)[keyof typeof RecordType];

export const PrescriptionStatus = {
  ACTIVE: "ACTIVE",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
  EXPIRED: "EXPIRED",
} as const;

export type PrescriptionStatus =
  (typeof PrescriptionStatus)[keyof typeof PrescriptionStatus];

export const PaymentMethod = {
  CASH: "CASH",
  CREDIT_CARD: "CREDIT_CARD",
  DEBIT_CARD: "DEBIT_CARD",
  INSURANCE: "INSURANCE",
  BANK_TRANSFER: "BANK_TRANSFER",
  ONLINE: "ONLINE",
  MOBILE_PAYMENT: "MOBILE_PAYMENT",
} as const;

export type PaymentMethod = (typeof PaymentMethod)[keyof typeof PaymentMethod];

export const PaymentStatus = {
  PENDING: "PENDING",
  PROCESSING: "PROCESSING",
  COMPLETED: "COMPLETED",
  FAILED: "FAILED",
  REFUNDED: "REFUNDED",
  PARTIALLY_REFUNDED: "PARTIALLY_REFUNDED",
  CANCELLED: "CANCELLED",
} as const;

export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];

export const InvoiceStatus = {
  DRAFT: "DRAFT",
  SENT: "SENT",
  PAID: "PAID",
  OVERDUE: "OVERDUE",
  CANCELLED: "CANCELLED",
  REFUNDED: "REFUNDED",
} as const;

export type InvoiceStatus = (typeof InvoiceStatus)[keyof typeof InvoiceStatus];

export const DiscountType = {
  PERCENTAGE: "PERCENTAGE",
  FIXED_AMOUNT: "FIXED_AMOUNT",
} as const;

export type DiscountType = (typeof DiscountType)[keyof typeof DiscountType];

export const PostStatus = {
  DRAFT: "DRAFT",
  PUBLISHED: "PUBLISHED",
  SCHEDULED: "SCHEDULED",
  ARCHIVED: "ARCHIVED",
} as const;

export type PostStatus = (typeof PostStatus)[keyof typeof PostStatus];

export const PageStatus = {
  DRAFT: "DRAFT",
  PUBLISHED: "PUBLISHED",
  ARCHIVED: "ARCHIVED",
} as const;

export type PageStatus = (typeof PageStatus)[keyof typeof PageStatus];

export const GalleryCategory = {
  CLINIC: "CLINIC",
  TEAM: "TEAM",
  TECHNOLOGY: "TECHNOLOGY",
  BEFORE_AFTER: "BEFORE_AFTER",
  TREATMENTS: "TREATMENTS",
} as const;

export type GalleryCategory =
  (typeof GalleryCategory)[keyof typeof GalleryCategory];

export const ReviewSource = {
  DIRECT: "DIRECT",
  GOOGLE: "GOOGLE",
  YELP: "YELP",
  FACEBOOK: "FACEBOOK",
} as const;

export type ReviewSource = (typeof ReviewSource)[keyof typeof ReviewSource];

export const ReviewStatus = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
} as const;

export type ReviewStatus = (typeof ReviewStatus)[keyof typeof ReviewStatus];

export const FAQCategory = {
  GENERAL: "GENERAL",
  TREATMENTS: "TREATMENTS",
  BILLING: "BILLING",
  INSURANCE: "INSURANCE",
  EMERGENCY: "EMERGENCY",
  FIRST_VISIT: "FIRST_VISIT",
  APPOINTMENTS: "APPOINTMENTS",
} as const;

export type FAQCategory = (typeof FAQCategory)[keyof typeof FAQCategory];

export const MessageStatus = {
  NEW: "NEW",
  READ: "READ",
  IN_PROGRESS: "IN_PROGRESS",
  RESOLVED: "RESOLVED",
  ARCHIVED: "ARCHIVED",
} as const;

export type MessageStatus = (typeof MessageStatus)[keyof typeof MessageStatus];

export const Priority = {
  LOW: "LOW",
  NORMAL: "NORMAL",
  HIGH: "HIGH",
  URGENT: "URGENT",
} as const;

export type Priority = (typeof Priority)[keyof typeof Priority];

export const CommunicationType = {
  APPOINTMENT_REMINDER: "APPOINTMENT_REMINDER",
  FOLLOW_UP: "FOLLOW_UP",
  MARKETING: "MARKETING",
  TRANSACTIONAL: "TRANSACTIONAL",
  NEWSLETTER: "NEWSLETTER",
  EMERGENCY: "EMERGENCY",
} as const;

export type CommunicationType =
  (typeof CommunicationType)[keyof typeof CommunicationType];

export const CommunicationChannel = {
  EMAIL: "EMAIL",
  SMS: "SMS",
  PUSH: "PUSH",
  IN_APP: "IN_APP",
  WHATSAPP: "WHATSAPP",
} as const;

export type CommunicationChannel =
  (typeof CommunicationChannel)[keyof typeof CommunicationChannel];

export const CommunicationStatus = {
  QUEUED: "QUEUED",
  SENT: "SENT",
  DELIVERED: "DELIVERED",
  READ: "READ",
  FAILED: "FAILED",
  CANCELLED: "CANCELLED",
} as const;

export type CommunicationStatus =
  (typeof CommunicationStatus)[keyof typeof CommunicationStatus];

export const NotificationType = {
  APPOINTMENT: "APPOINTMENT",
  PAYMENT: "PAYMENT",
  PRESCRIPTION: "PRESCRIPTION",
  SYSTEM: "SYSTEM",
  REMINDER: "REMINDER",
  ALERT: "ALERT",
  MESSAGE: "MESSAGE",
} as const;

export type NotificationType =
  (typeof NotificationType)[keyof typeof NotificationType];

export const DocumentCategory = {
  MEDICAL_RECORD: "MEDICAL_RECORD",
  INSURANCE: "INSURANCE",
  CONSENT_FORM: "CONSENT_FORM",
  IDENTITY: "IDENTITY",
  PRESCRIPTION: "PRESCRIPTION",
  LAB_RESULT: "LAB_RESULT",
  IMAGING: "IMAGING",
  INVOICE: "INVOICE",
  RECEIPT: "RECEIPT",
  OTHER: "OTHER",
} as const;

export type DocumentCategory =
  (typeof DocumentCategory)[keyof typeof DocumentCategory];

export const SecuritySeverity = {
  INFO: "INFO",
  WARNING: "WARNING",
  DANGER: "DANGER",
  CRITICAL: "CRITICAL",
} as const;

export type SecuritySeverity =
  (typeof SecuritySeverity)[keyof typeof SecuritySeverity];

export const NewsletterStatus = {
  PENDING: "PENDING",
  ACTIVE: "ACTIVE",
  UNSUBSCRIBED: "UNSUBSCRIBED",
} as const;

export type NewsletterStatus =
  (typeof NewsletterStatus)[keyof typeof NewsletterStatus];

export const BackupType = {
  FULL: "FULL",
  INCREMENTAL: "INCREMENTAL",
  DATABASE: "DATABASE",
  FILES: "FILES",
} as const;

export type BackupType = (typeof BackupType)[keyof typeof BackupType];

export const BackupStatus = {
  IN_PROGRESS: "IN_PROGRESS",
  COMPLETED: "COMPLETED",
  FAILED: "FAILED",
} as const;

export type BackupStatus = (typeof BackupStatus)[keyof typeof BackupStatus];
