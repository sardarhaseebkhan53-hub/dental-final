"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Stethoscope,
  Sparkles,
  AlignCenter,
  Baby,
  Scissors,
  AlertTriangle,
  ShieldCheck,
  RefreshCw,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const services = [
  {
    icon: Stethoscope,
    title: "General Dentistry",
    description:
      "Comprehensive dental care including cleanings, fillings, and preventive treatments to maintain your oral health.",
    category: "General",
    href: "/services/general-dentistry",
    featured: true,
  },
  {
    icon: Sparkles,
    title: "Cosmetic Dentistry",
    description:
      "Transform your smile with veneers, whitening, bonding, and complete smile makeovers.",
    category: "Cosmetic",
    href: "/services/cosmetic-dentistry",
    featured: true,
  },
  {
    icon: AlignCenter,
    title: "Orthodontics",
    description:
      "Straighter teeth with Invisalign, clear aligners, and traditional braces for all ages.",
    category: "Orthodontics",
    href: "/services/orthodontics",
    featured: false,
  },
  {
    icon: Baby,
    title: "Pediatric Dentistry",
    description:
      "Gentle, child-friendly dental care in a comfortable environment designed for little ones.",
    category: "Pediatric",
    href: "/services/pediatric-dentistry",
    featured: false,
  },
  {
    icon: Scissors,
    title: "Dental Implants",
    description:
      "Permanent tooth replacement with state-of-the-art implant technology for a natural-looking smile.",
    category: "Restorative",
    href: "/services/dental-implants",
    featured: true,
  },
  {
    icon: AlertTriangle,
    title: "Emergency Care",
    description:
      "24/7 emergency dental services for urgent situations. Immediate relief when you need it most.",
    category: "Emergency",
    href: "/services/emergency-care",
    featured: false,
  },
  {
    icon: ShieldCheck,
    title: "Preventive Care",
    description:
      "Regular check-ups, professional cleanings, and personalized prevention plans.",
    category: "Preventive",
    href: "/services/preventive-care",
    featured: false,
  },
  {
    icon: RefreshCw,
    title: "Root Canal",
    description:
      "Pain-free root canal treatments using advanced technology to save your natural teeth.",
    category: "Restorative",
    href: "/services/root-canal",
    featured: false,
  },
];

export function ServicesSection() {
  return (
    <section className="py-20 lg:py-28 bg-surface-alt" id="services">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-sm font-semibold text-accent uppercase tracking-widest mb-3 block">
            Our Services
          </span>
          <h2 className="font-display text-3xl lg:text-5xl font-semibold text-neutral-dark mb-4">
            Comprehensive Dental Care for{" "}
            <span className="text-primary">Every Need</span>
          </h2>
          <p className="text-neutral-mid text-lg">
            From routine check-ups to advanced procedures, our expert team
            delivers exceptional care using the latest technology and
            techniques.
          </p>
        </motion.div>

        {/* Services Grid - Bento Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-12">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={cn(
                  "group relative bg-white rounded-xl p-6 border border-border transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1",
                  service.featured ? "md:col-span-1 lg:col-span-2" : "",
                )}
              >
                <div className="h-12 w-12 rounded-xl bg-primary-pale flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <Icon className="h-6 w-6 text-primary group-hover:text-white transition-colors" />
                </div>
                <span className="text-xs font-semibold text-accent uppercase tracking-wider mb-2 block">
                  {service.category}
                </span>
                <h3 className="font-semibold text-lg text-neutral-dark mb-2 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-neutral-mid leading-relaxed mb-4">
                  {service.description}
                </p>
                <Link
                  href={service.href}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-700 transition-colors"
                >
                  Learn more{" "}
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button asChild size="lg" variant="secondary">
            <Link href="/services">
              View All Services <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
