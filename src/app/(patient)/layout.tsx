import React from "react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { requireDashboardUser } from "@/lib/session-user";

export default async function PatientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireDashboardUser(["PATIENT"]);

  return (
    <DashboardShell role="PATIENT" user={user}>
      {children}
    </DashboardShell>
  );
}
