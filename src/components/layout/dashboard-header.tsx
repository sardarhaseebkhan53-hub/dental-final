"use client";

import React, { useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import {
  Bell,
  Search,
  Menu,
  ChevronDown,
  LogOut,
  User,
  Settings,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { AuthUser } from "@/types";

interface DashboardHeaderProps {
  user: AuthUser;
  onMenuClick?: () => void;
}

export function DashboardHeader({ user, onMenuClick }: DashboardHeaderProps) {
  const [showSearch, setShowSearch] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isPanelLocked, setIsPanelLocked] = useState(false);
  const canLockPanel = [
    "SUPER_ADMIN",
    "ADMIN",
    "STAFF",
    "RECEPTIONIST",
  ].includes(user.role);
  const accountBasePath =
    user.role === "DOCTOR"
      ? "/doctor"
      : user.role === "PATIENT"
        ? "/patient"
        : user.role === "RECEPTIONIST"
          ? "/reception"
          : "/admin";
  // Every role has a dashboard route; only /admin has a settings page today.
  const dashboardHref = `${accountBasePath}/dashboard`;
  const settingsHref =
    accountBasePath === "/admin" ? "/admin/settings" : dashboardHref;

  const initials =
    user.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "U";

  return (
    <>
      <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-border bg-white/95 backdrop-blur-md px-4 lg:px-6">
        {/* Left side */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-surface-alt transition-colors"
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Search */}
          <div
            className={cn(
              "transition-all",
              showSearch ? "w-64 md:w-80" : "w-auto",
            )}
          >
            {showSearch ? (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-light" />
                <Input
                  type="search"
                  placeholder="Search patients, appointments..."
                  className="pl-10 h-9"
                  autoFocus
                  onBlur={() => setShowSearch(false)}
                />
              </div>
            ) : (
              <button
                onClick={() => setShowSearch(true)}
                className="p-2 rounded-lg hover:bg-surface-alt transition-colors"
                aria-label="Search"
              >
                <Search className="h-5 w-5 text-neutral-mid" />
              </button>
            )}
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {canLockPanel && (
            <button
              type="button"
              onClick={() => setIsPanelLocked(true)}
              className="hidden items-center gap-2 rounded-lg border border-border bg-white px-3 py-2 text-sm font-semibold text-neutral-mid transition-colors hover:border-primary/30 hover:text-primary md:flex"
              aria-label="Lock admin panel"
            >
              <LockKeyhole className="h-4 w-4" />
              Lock Panel
            </button>
          )}

          {/* Notifications */}
          <button
            className="relative p-2 rounded-lg hover:bg-surface-alt transition-colors"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5 text-neutral-mid" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-error" />
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-surface-alt transition-colors"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.image || undefined} alt={user.name} />
                <AvatarFallback className="text-xs">{initials}</AvatarFallback>
              </Avatar>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-neutral-dark">
                  {user.name}
                </p>
                <p className="text-xs text-neutral-light capitalize">
                  {user.role.toLowerCase().replace("_", " ")}
                </p>
              </div>
              <ChevronDown className="h-4 w-4 text-neutral-light hidden md:block" />
            </button>

            {showUserMenu && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowUserMenu(false)}
                />
                <div className="absolute right-0 top-full mt-1 w-48 rounded-xl border border-border bg-white shadow-elevated py-1 z-50 animate-scale-in">
                  <div className="px-3 py-2 border-b border-border">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-neutral-light">{user.email}</p>
                  </div>
                  <Link
                    href={dashboardHref}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-neutral-mid hover:bg-surface-alt"
                  >
                    <User className="h-4 w-4" /> Dashboard
                  </Link>
                  <Link
                    href={settingsHref}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-neutral-mid hover:bg-surface-alt"
                  >
                    <Settings className="h-4 w-4" /> Settings
                  </Link>
                  <div className="border-t border-border">
                    <button
                      type="button"
                      onClick={() => void signOut({ callbackUrl: "/login" })}
                      className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-error hover:bg-error-light"
                    >
                      <LogOut className="h-4 w-4" /> Sign Out
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {isPanelLocked && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-neutral-dark/75 p-4 backdrop-blur-md">
          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white p-8 text-center shadow-2xl">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-pale text-primary">
              <ShieldCheck className="h-8 w-8" />
            </div>
            <h2 className="font-display text-2xl font-extrabold tracking-tight text-neutral-dark">
              Admin Panel Locked
            </h2>
            <p className="mt-3 text-sm leading-6 text-neutral-mid">
              Sensitive clinic data is hidden. Unlock only when you are ready to
              continue working on this device.
            </p>
            <button
              type="button"
              onClick={() => setIsPanelLocked(false)}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-colors hover:bg-primary-700"
            >
              <LockKeyhole className="h-4 w-4" />
              Unlock Panel
            </button>
          </div>
        </div>
      )}
    </>
  );
}
