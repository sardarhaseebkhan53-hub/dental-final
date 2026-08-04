import React from "react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { requireDashboardUser } from "@/lib/session-user";

export default async function DoctorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireDashboardUser(["DOCTOR"]);

  return (
    <DashboardShell role="DOCTOR" user={user}>
      {children}
    </DashboardShell>
  );
}
