"use client";

import React, { useState } from "react";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { DashboardSidebar } from "@/components/layout/sidebar";
import { cn } from "@/lib/utils";
import type { UserRole } from "@/types/prisma-enums";
import type { AuthUser } from "@/types";

interface DashboardShellProps {
  role: UserRole;
  user: AuthUser;
  children: React.ReactNode;
}

export function DashboardShell({ role, user, children }: DashboardShellProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-surface-alt">
      <DashboardSidebar
        role={role}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <div
        className={cn(
          "flex-1 transition-all duration-300",
          sidebarCollapsed ? "ml-[68px]" : "ml-[260px]",
        )}
      >
        <DashboardHeader
          user={user}
          onMenuClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        <main id="main-content" className="p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
