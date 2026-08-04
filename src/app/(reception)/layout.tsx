import React from "react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { requireDashboardUser } from "@/lib/session-user";

export default async function ReceptionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireDashboardUser([
    "RECEPTIONIST",
    "ADMIN",
    "SUPER_ADMIN",
  ]);

  return (
    <DashboardShell role={user.role} user={user}>
      {children}
    </DashboardShell>
  );
}
