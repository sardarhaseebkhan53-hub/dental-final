import React from "react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { requireDashboardUser } from "@/lib/session-user";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireDashboardUser(["SUPER_ADMIN", "ADMIN"]);

  return (
    <DashboardShell role={user.role} user={user}>
      {children}
    </DashboardShell>
  );
}
