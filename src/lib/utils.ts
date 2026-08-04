import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(
  amount: number | string,
  currency = "USD",
): string {
  const num = typeof amount === "string" ? parseFloat(amount) : amount;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(num);
}

export function formatDate(
  date: Date | string,
  format: "short" | "long" | "full" = "short",
): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const options: Record<string, Intl.DateTimeFormatOptions> = {
    short: { month: "short", day: "numeric", year: "numeric" },
    long: { month: "long", day: "numeric", year: "numeric" },
    full: {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    },
  };
  return d.toLocaleDateString("en-US", options[format]);
}

export function formatTime(time: string): string {
  const [hours, minutes] = time.split(":").map(Number);
  const ampm = hours >= 12 ? "PM" : "AM";
  const h = hours % 12 || 12;
  return `${h}:${minutes.toString().padStart(2, "0")} ${ampm}`;
}

export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  return phone;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function generatePatientNumber(): string {
  const prefix = "SDP";
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}${random}`;
}

export function generateAppointmentNumber(): string {
  const prefix = "APT";
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}${random}`;
}

export function generateInvoiceNumber(): string {
  const prefix = "INV";
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}${random}`;
}

export function generatePrescriptionNumber(): string {
  const prefix = "RX";
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}${random}`;
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength).trimEnd() + "...";
}

export function calculateAge(birthDate: Date | string): number {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

export function getStatusColor(status: string): string {
  const statusColors: Record<string, string> = {
    ACTIVE: "text-success",
    COMPLETED: "text-success",
    PAID: "text-success",
    PUBLISHED: "text-success",
    APPROVED: "text-success",
    CONFIRMED: "text-success",
    SCHEDULED: "text-info",
    IN_PROGRESS: "text-info",
    CHECKED_IN: "text-info",
    PENDING: "text-warning",
    PENDING_VERIFICATION: "text-warning",
    PROCESSING: "text-warning",
    CANCELLED: "text-error",
    FAILED: "text-error",
    REJECTED: "text-error",
    NO_SHOW: "text-error",
    SUSPENDED: "text-error",
    OVERDUE: "text-error",
    EXPIRED: "text-neutral-light",
    INACTIVE: "text-neutral-light",
    DRAFT: "text-neutral-light",
    ARCHIVED: "text-neutral-light",
  };
  return statusColors[status] || "text-neutral-mid";
}

export function getStatusBgColor(status: string): string {
  const statusBg: Record<string, string> = {
    ACTIVE: "bg-success-light text-success",
    COMPLETED: "bg-success-light text-success",
    PAID: "bg-success-light text-success",
    PUBLISHED: "bg-success-light text-success",
    APPROVED: "bg-success-light text-success",
    CONFIRMED: "bg-success-light text-success",
    SCHEDULED: "bg-info-light text-info",
    IN_PROGRESS: "bg-info-light text-info",
    CHECKED_IN: "bg-info-light text-info",
    PENDING: "bg-warning-light text-warning",
    PROCESSING: "bg-warning-light text-warning",
    CANCELLED: "bg-error-light text-error",
    FAILED: "bg-error-light text-error",
    REJECTED: "bg-error-light text-error",
    NO_SHOW: "bg-error-light text-error",
    SUSPENDED: "bg-error-light text-error",
    OVERDUE: "bg-error-light text-error",
    EXPIRED: "bg-neutral-100 text-neutral-light",
    INACTIVE: "bg-neutral-100 text-neutral-light",
    DRAFT: "bg-neutral-100 text-neutral-light",
  };
  return statusBg[status] || "bg-neutral-100 text-neutral-mid";
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function getGoogleMapsUrl(address: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

export function getWhatsAppUrl(phone: string, message = ""): string {
  const cleaned = phone.replace(/\D/g, "");
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${cleaned}${message ? `?text=${encoded}` : ""}`;
}
