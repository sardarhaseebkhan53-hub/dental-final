"use client";

import React from "react";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  ArrowRight,
} from "lucide-react";
import { BrandLogo } from "@/components/brand/logo";
import { NAVIGATION, CLINIC_INFO, SOCIAL_LINKS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  return (
    <footer className="bg-neutral-dark text-white">
      {/* Emergency Banner */}
      <div className="bg-gradient-to-r from-error to-red-600">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-white">
            <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center animate-pulse">
              <Phone className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-sm">
                Dental Emergency? We&apos;re Here 24/7
              </p>
              <p className="text-xs text-white/80">
                Don&apos;t wait — call now for immediate care
              </p>
            </div>
          </div>
          <Button asChild variant="accent" size="lg">
            <a href={`tel:${CLINIC_INFO.emergencyPhone}`}>
              <Phone className="h-4 w-4" />
              {CLINIC_INFO.emergencyPhone}
            </a>
          </Button>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <BrandLogo inverse subtitle="Premium Dental Care" size="md" />
            <p className="text-sm text-white/70 leading-relaxed">
              Where beautiful smiles begin. Experience premium dental care with
              over{" "}
              {CLINIC_INFO.founded
                ? new Date().getFullYear() - CLINIC_INFO.founded
                : 25}{" "}
              years of excellence.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a
                href={`tel:${CLINIC_INFO.phone}`}
                className="flex items-center gap-3 text-sm text-white/70 hover:text-accent transition-colors"
              >
                <Phone className="h-4 w-4 text-accent" />
                {CLINIC_INFO.phone}
              </a>
              <a
                href={`mailto:${CLINIC_INFO.email}`}
                className="flex items-center gap-3 text-sm text-white/70 hover:text-accent transition-colors"
              >
                <Mail className="h-4 w-4 text-accent" />
                {CLINIC_INFO.email}
              </a>
              <div className="flex items-start gap-3 text-sm text-white/70">
                <MapPin className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                <span>
                  {CLINIC_INFO.address.street}
                  <br />
                  {CLINIC_INFO.address.city}, {CLINIC_INFO.address.state}{" "}
                  {CLINIC_INFO.address.zip}
                </span>
              </div>
              <div className="flex items-start gap-3 text-sm text-white/70">
                <Clock className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                <span>
                  Mon-Fri: {CLINIC_INFO.hours.weekday}
                  <br />
                  Sat: {CLINIC_INFO.hours.saturday}
                  <br />
                  Sun: {CLINIC_INFO.hours.sunday}
                </span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {[
                {
                  icon: Facebook,
                  href: SOCIAL_LINKS.facebook,
                  label: "Facebook",
                },
                {
                  icon: Instagram,
                  href: SOCIAL_LINKS.instagram,
                  label: "Instagram",
                },
                { icon: Twitter, href: SOCIAL_LINKS.twitter, label: "Twitter" },
                {
                  icon: Linkedin,
                  href: SOCIAL_LINKS.linkedin,
                  label: "LinkedIn",
                },
                { icon: Youtube, href: SOCIAL_LINKS.youtube, label: "YouTube" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="h-9 w-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-accent hover:text-white transition-all"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-white mb-6">
              Our Services
            </h3>
            <ul className="space-y-3">
              {NAVIGATION.footer.services.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/70 hover:text-accent transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-white mb-6">
              Company
            </h3>
            <ul className="space-y-3">
              {NAVIGATION.footer.company.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/70 hover:text-accent transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-white mt-8 mb-4">
              For Patients
            </h3>
            <ul className="space-y-3">
              {NAVIGATION.footer.patients.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/70 hover:text-accent transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-white mb-6">
              Stay Connected
            </h3>
            <p className="text-sm text-white/70 mb-4">
              Subscribe for dental tips, clinic updates, and special offers.
            </p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-accent/50"
                required
              />
              <Button variant="accent" className="w-full">
                Subscribe
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
            <p className="text-xs text-white/40 mt-3">
              We respect your privacy. Unsubscribe anytime.
            </p>

            <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/10">
              <p className="text-sm font-semibold text-accent mb-1">
                New Patient Special
              </p>
              <p className="text-xs text-white/70">
                Free consultation + 20% off your first treatment.
              </p>
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="mt-3 text-accent hover:text-white"
              >
                <Link href="/book-appointment">
                  Book Now <ArrowRight className="h-3 w-3" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} Serene Dental Clinic. All rights
            reserved.
          </p>
          <div className="flex items-center gap-6">
            {NAVIGATION.footer.legal.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs text-white/50 hover:text-white/80 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
