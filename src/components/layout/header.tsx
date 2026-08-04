"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, ChevronDown, Calendar } from "lucide-react";
import { BrandLogo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { NAVIGATION, CLINIC_INFO } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-primary text-white text-sm hidden lg:block">
        <div className="container mx-auto px-4 flex items-center justify-between h-10">
          <div className="flex items-center gap-6">
            <a
              href={`tel:${CLINIC_INFO.phone}`}
              className="flex items-center gap-1.5 hover:text-accent-light transition-colors"
            >
              <Phone className="h-3.5 w-3.5" />
              <span>{CLINIC_INFO.phone}</span>
            </a>
            <span className="text-white/40">|</span>
            <span className="text-white/80">
              Mon-Sat: {CLINIC_INFO.hours.weekday} • Emergency 24/7
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="hover:text-accent-light transition-colors"
            >
              Patient Portal
            </Link>
            <span className="text-white/40">|</span>
            <Link
              href="/book-appointment"
              className="hover:text-accent-light transition-colors"
            >
              Book Appointment
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-300",
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-glass border-b border-border/50"
            : "bg-white",
        )}
      >
        <div className="container mx-auto px-4 flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <BrandLogo subtitle="Premium Dental Care" size="md" />

          {/* Desktop Navigation */}
          <nav
            className="hidden lg:flex items-center gap-1"
            aria-label="Main navigation"
          >
            {NAVIGATION.main.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() =>
                  item.children && setOpenDropdown(item.label)
                }
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                    pathname === item.href ||
                      pathname.startsWith(item.href + "/")
                      ? "text-primary bg-primary-pale"
                      : "text-neutral-mid hover:text-primary hover:bg-primary-pale/50",
                  )}
                >
                  {item.label}
                  {item.children && <ChevronDown className="h-3.5 w-3.5" />}
                </Link>

                {/* Dropdown */}
                {item.children && openDropdown === item.label && (
                  <div className="absolute top-full left-0 pt-1">
                    <div className="bg-white rounded-xl shadow-elevated border border-border p-2 min-w-[220px] animate-fade-in">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={cn(
                            "block px-3 py-2 text-sm rounded-lg transition-colors",
                            pathname === child.href
                              ? "text-primary bg-primary-pale font-medium"
                              : "text-neutral-mid hover:text-primary hover:bg-primary-pale/50",
                          )}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button asChild className="hidden sm:inline-flex" size="sm">
              <Link href="/book-appointment">
                <Calendar className="h-4 w-4" />
                Book Appointment
              </Link>
            </Button>
            <Button
              asChild
              variant="primary"
              size="sm"
              className="hidden sm:inline-flex lg:hidden"
            >
              <a href={`tel:${CLINIC_INFO.phone}`}>
                <Phone className="h-4 w-4" />
              </a>
            </Button>

            {/* Mobile Toggle */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-surface-alt transition-colors"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label={isMobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileOpen}
            >
              {isMobileOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileOpen && (
          <div className="lg:hidden border-t border-border bg-white animate-fade-in">
            <nav
              className="container mx-auto px-4 py-4 space-y-1"
              aria-label="Mobile navigation"
            >
              {NAVIGATION.main.map((item) => (
                <div key={item.label}>
                  <Link
                    href={item.href}
                    className={cn(
                      "block px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                      pathname === item.href
                        ? "text-primary bg-primary-pale"
                        : "text-neutral-mid hover:text-primary hover:bg-surface-alt",
                    )}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="ml-4 space-y-1 mt-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-neutral-mid hover:text-primary rounded-lg transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4 space-y-2">
                <Button asChild className="w-full" size="lg">
                  <Link href="/book-appointment">
                    <Calendar className="h-4 w-4" />
                    Book Appointment
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="secondary"
                  className="w-full"
                  size="lg"
                >
                  <a href={`tel:${CLINIC_INFO.phone}`}>
                    <Phone className="h-4 w-4" />
                    {CLINIC_INFO.phone}
                  </a>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
