"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { BrandLogo } from "@/components/brand/logo";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Calendar,
  Stethoscope,
  ClipboardList,
  FileText,
  CreditCard,
  Settings,
  Activity,
  MessageSquare,
  Image,
  Newspaper,
  HelpCircle,
  Star,
  Shield,
  Database,
  Bell,
  BarChart3,
  LogOut,
  ChevronLeft,
  ChevronRight,
  UserCheck,
  Clock,
  Receipt,
  BookOpen,
  TrendingUp,
  PieChart,
  UserPlus,
  FileCheck,
  Pill,
  FolderOpen,
  Palette,
  Globe,
  Key,
  Heart,
} from "lucide-react";
import type { UserRole } from "@/types/prisma-enums";

interface SidebarProps {
  role: UserRole;
  collapsed?: boolean;
  onToggle?: () => void;
}

const sidebarMenus: Record<
  UserRole,
  {
    label: string;
    items: { label: string; href: string; icon: React.ElementType }[];
  }[]
> = {
  SUPER_ADMIN: [
    {
      label: "Overview",
      items: [
        { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
        { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
      ],
    },
    {
      label: "Management",
      items: [
        { label: "Users", href: "/admin/users", icon: Users },
        { label: "Doctors", href: "/admin/doctors", icon: Stethoscope },
        { label: "Patients", href: "/admin/patients", icon: Heart },
        { label: "Staff", href: "/admin/staff", icon: UserCheck },
        { label: "Departments", href: "/admin/departments", icon: Building },
      ],
    },
    {
      label: "Operations",
      items: [
        { label: "Appointments", href: "/admin/appointments", icon: Calendar },
        {
          label: "Medical Records",
          href: "/admin/medical-records",
          icon: ClipboardList,
        },
        { label: "Prescriptions", href: "/admin/prescriptions", icon: Pill },
        { label: "Services", href: "/admin/services", icon: Activity },
      ],
    },
    {
      label: "Finance",
      items: [
        { label: "Payments", href: "/admin/payments", icon: CreditCard },
        { label: "Invoices", href: "/admin/invoices", icon: Receipt },
        { label: "Reports", href: "/admin/reports", icon: PieChart },
      ],
    },
    {
      label: "Content",
      items: [
        { label: "Blog", href: "/admin/blog", icon: Newspaper },
        { label: "Pages", href: "/admin/pages", icon: FileText },
        { label: "Media Library", href: "/admin/media", icon: Image },
        { label: "Gallery", href: "/admin/gallery", icon: FolderOpen },
        { label: "Testimonials", href: "/admin/testimonials", icon: Star },
        { label: "FAQs", href: "/admin/faqs", icon: HelpCircle },
      ],
    },
    {
      label: "Communication",
      items: [
        { label: "Messages", href: "/admin/messages", icon: MessageSquare },
        { label: "Notifications", href: "/admin/notifications", icon: Bell },
        { label: "Newsletter", href: "/admin/newsletter", icon: BookOpen },
      ],
    },
    {
      label: "System",
      items: [
        { label: "Roles & Permissions", href: "/admin/roles", icon: Shield },
        { label: "Audit Logs", href: "/admin/audit-logs", icon: FileCheck },
        { label: "Security", href: "/admin/security", icon: Key },
        { label: "Integrations", href: "/admin/integrations", icon: Globe },
        { label: "Backup", href: "/admin/backup", icon: Database },
        { label: "SEO", href: "/admin/seo", icon: TrendingUp },
        { label: "Branding", href: "/admin/branding", icon: Palette },
        { label: "Settings", href: "/admin/settings", icon: Settings },
      ],
    },
  ],
  ADMIN: [
    {
      label: "Overview",
      items: [
        { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
        { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
      ],
    },
    {
      label: "Management",
      items: [
        { label: "Users", href: "/admin/users", icon: Users },
        { label: "Doctors", href: "/admin/doctors", icon: Stethoscope },
        { label: "Patients", href: "/admin/patients", icon: Heart },
        { label: "Staff", href: "/admin/staff", icon: UserCheck },
        { label: "Departments", href: "/admin/departments", icon: Building },
      ],
    },
    {
      label: "Operations",
      items: [
        { label: "Appointments", href: "/admin/appointments", icon: Calendar },
        { label: "Services", href: "/admin/services", icon: Activity },
        { label: "Payments", href: "/admin/payments", icon: CreditCard },
        { label: "Reports", href: "/admin/reports", icon: PieChart },
      ],
    },
    {
      label: "Content",
      items: [
        { label: "Blog", href: "/admin/blog", icon: Newspaper },
        { label: "Media", href: "/admin/media", icon: Image },
        { label: "FAQs", href: "/admin/faqs", icon: HelpCircle },
      ],
    },
    {
      label: "System",
      items: [
        { label: "Settings", href: "/admin/settings", icon: Settings },
        { label: "Branding", href: "/admin/branding", icon: Palette },
      ],
    },
  ],
  DOCTOR: [
    {
      label: "Overview",
      items: [
        {
          label: "Dashboard",
          href: "/doctor/dashboard",
          icon: LayoutDashboard,
        },
        { label: "My Schedule", href: "/doctor/schedule", icon: Calendar },
      ],
    },
    {
      label: "Clinical",
      items: [
        { label: "Patients", href: "/doctor/patients", icon: Heart },
        { label: "Appointments", href: "/doctor/appointments", icon: Clock },
        {
          label: "Medical Records",
          href: "/doctor/medical-records",
          icon: ClipboardList,
        },
        { label: "Prescriptions", href: "/doctor/prescriptions", icon: Pill },
        {
          label: "Treatment Plans",
          href: "/doctor/treatments",
          icon: Activity,
        },
      ],
    },
    {
      label: "Communication",
      items: [
        { label: "Messages", href: "/doctor/messages", icon: MessageSquare },
        { label: "Notifications", href: "/doctor/notifications", icon: Bell },
      ],
    },
    {
      label: "Account",
      items: [
        { label: "Profile", href: "/doctor/profile", icon: UserPlus },
        { label: "Reviews", href: "/doctor/reviews", icon: Star },
        { label: "Settings", href: "/doctor/settings", icon: Settings },
      ],
    },
  ],
  STAFF: [
    {
      label: "Overview",
      items: [
        { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
      ],
    },
    {
      label: "Tasks",
      items: [
        { label: "Appointments", href: "/admin/appointments", icon: Calendar },
        { label: "Patients", href: "/admin/patients", icon: Heart },
      ],
    },
  ],
  RECEPTIONIST: [
    {
      label: "Overview",
      items: [
        {
          label: "Dashboard",
          href: "/reception/dashboard",
          icon: LayoutDashboard,
        },
      ],
    },
    {
      label: "Front Desk",
      items: [
        { label: "Queue", href: "/reception/queue", icon: Clock },
        {
          label: "Appointments",
          href: "/reception/appointments",
          icon: Calendar,
        },
        { label: "Walk-ins", href: "/reception/walk-ins", icon: UserPlus },
        { label: "Check-in/out", href: "/reception/check-in", icon: UserCheck },
        { label: "Billing", href: "/reception/billing", icon: CreditCard },
      ],
    },
    {
      label: "Patients",
      items: [
        { label: "Patient List", href: "/reception/patients", icon: Heart },
        { label: "Registration", href: "/reception/register", icon: FileText },
      ],
    },
  ],
  PATIENT: [
    {
      label: "Overview",
      items: [
        {
          label: "Dashboard",
          href: "/patient/dashboard",
          icon: LayoutDashboard,
        },
      ],
    },
    {
      label: "Health",
      items: [
        {
          label: "Appointments",
          href: "/patient/appointments",
          icon: Calendar,
        },
        {
          label: "Medical Records",
          href: "/patient/medical-records",
          icon: ClipboardList,
        },
        { label: "Prescriptions", href: "/patient/prescriptions", icon: Pill },
        {
          label: "Treatment Plans",
          href: "/patient/treatments",
          icon: Activity,
        },
      ],
    },
    {
      label: "Billing",
      items: [
        { label: "Payments", href: "/patient/payments", icon: CreditCard },
        { label: "Invoices", href: "/patient/invoices", icon: Receipt },
      ],
    },
    {
      label: "Account",
      items: [
        { label: "Profile", href: "/patient/profile", icon: UserPlus },
        { label: "Documents", href: "/patient/documents", icon: FolderOpen },
        { label: "Notifications", href: "/patient/notifications", icon: Bell },
        { label: "Settings", href: "/patient/settings", icon: Settings },
      ],
    },
  ],
};

// Placeholder component for missing Building icon
function Building(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  );
}

// Only render sidebar links for routes that actually exist in the app.
// Add new pages to this set as they are built to re-enable their menu items.
const EXISTING_ROUTES = new Set([
  "/admin/dashboard",
  "/admin/analytics",
  "/admin/appointments",
  "/admin/blog",
  "/admin/branding",
  "/admin/doctors",
  "/admin/patients",
  "/admin/settings",
  "/admin/users",
  "/doctor/dashboard",
  "/patient/dashboard",
  "/reception/dashboard",
]);

export function DashboardSidebar({ role, collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const sections = (sidebarMenus[role] || sidebarMenus.PATIENT)
    .map((section) => ({
      ...section,
      items: section.items.filter((item) => EXISTING_ROUTES.has(item.href)),
    }))
    .filter((section) => section.items.length > 0);

  const roleLabel: Record<UserRole, string> = {
    SUPER_ADMIN: "Super Admin",
    ADMIN: "Admin",
    DOCTOR: "Doctor",
    STAFF: "Staff",
    RECEPTIONIST: "Receptionist",
    PATIENT: "Patient",
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-30 flex h-screen flex-col border-r border-border bg-white transition-all duration-300",
        collapsed ? "w-[68px]" : "w-[260px]",
      )}
    >
      {/* Header */}
      <div className="flex h-16 items-center justify-between border-b border-border px-4">
        {!collapsed && <BrandLogo subtitle={roleLabel[role]} size="sm" />}
        <button
          onClick={onToggle}
          className="h-7 w-7 rounded-md flex items-center justify-center hover:bg-surface-alt transition-colors"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav
        className="flex-1 overflow-y-auto py-4 px-3 space-y-6"
        aria-label="Dashboard navigation"
      >
        {sections.map((section) => (
          <div key={section.label}>
            {!collapsed && (
              <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-neutral-light">
                {section.label}
              </p>
            )}
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href ||
                  pathname.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                      collapsed ? "justify-center" : "",
                      isActive
                        ? "bg-primary-pale text-primary"
                        : "text-neutral-mid hover:bg-surface-alt hover:text-neutral-dark",
                    )}
                    title={collapsed ? item.label : undefined}
                  >
                    <Icon className="h-4.5 w-4.5 shrink-0" />
                    {!collapsed && <span>{item.label}</span>}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-border p-3">
        <button
          type="button"
          onClick={() => void signOut({ callbackUrl: "/login" })}
          className={cn(
            "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-error hover:bg-error-light transition-colors",
            collapsed && "justify-center",
          )}
        >
          <LogOut className="h-4.5 w-4.5" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}
