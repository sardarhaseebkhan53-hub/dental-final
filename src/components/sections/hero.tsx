"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calendar,
  ArrowRight,
  Phone,
  Shield,
  Award,
  Clock,
  Star,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { BrandLogo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { CLINIC_INFO, STATS } from "@/lib/constants";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=1400&q=85";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export function HeroSection() {
  return (
    <section className="relative flex min-h-[88vh] items-center overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(15,118,110,0.14),transparent_32%),linear-gradient(135deg,#f8fffd_0%,#ffffff_45%,#fff7ed_100%)]">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-44 -top-44 h-[34rem] w-[34rem] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-24 left-10 h-[24rem] w-[24rem] rounded-full bg-accent/15 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute left-[8%] top-[18%] h-2 w-2 rounded-full bg-accent/50 animate-float" />
        <div
          className="absolute right-[12%] top-[22%] h-3 w-3 rounded-full bg-primary/25 animate-float"
          style={{ animationDelay: "0.8s" }}
        />
        <div
          className="absolute bottom-[18%] left-[45%] h-2 w-2 rounded-full bg-accent/40 animate-float"
          style={{ animationDelay: "1.6s" }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 py-16 lg:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
          {/* Content */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-center lg:text-left"
          >
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.12, duration: 0.6 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white/75 px-4 py-2 shadow-card backdrop-blur"
            >
              <Star className="h-4 w-4 fill-accent text-accent" />
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-primary-700">
                Rated #1 premium dental experience
              </span>
            </motion.div>

            <h1 className="mx-auto mb-6 max-w-3xl font-display text-5xl font-black leading-[0.98] tracking-[-0.055em] text-neutral-dark sm:text-6xl lg:mx-0 lg:text-7xl xl:text-[5.6rem]">
              Where <span className="gradient-text">Beautiful</span>
              <br />
              Smiles <span className="text-accent-600">Begin</span>
            </h1>

            <p className="mx-auto mb-8 max-w-2xl text-base leading-8 text-neutral-mid sm:text-lg lg:mx-0 lg:text-xl">
              Spa-like comfort, digital dentistry, and a caring expert team —
              designed to make every visit calm, clear, and confidence-building.
            </p>

            <div className="mb-10 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
              <Button
                asChild
                size="xl"
                variant="accent"
                className="shadow-lg shadow-accent/25"
              >
                <Link href="/book-appointment">
                  <Calendar className="h-5 w-5" />
                  Book Your Appointment
                </Link>
              </Button>
              <Button
                asChild
                size="xl"
                variant="secondary"
                className="bg-white/80 backdrop-blur"
              >
                <Link href="/services">
                  Explore Services
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>

            <div className="grid gap-3 text-left sm:grid-cols-3">
              {[
                "Same-day emergency slots",
                "Digital smile planning",
                "Transparent treatment fees",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 rounded-2xl border border-border/70 bg-white/70 p-3 text-sm font-medium text-neutral-mid shadow-card backdrop-blur"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-neutral-mid lg:justify-start">
              <a
                href={`tel:${CLINIC_INFO.phone}`}
                className="flex items-center gap-2 transition-colors hover:text-primary"
              >
                <Phone className="h-4 w-4 text-primary" />
                {CLINIC_INFO.phone}
              </a>
              <span className="hidden h-4 w-px bg-border sm:block" />
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                Same-day appointments available
              </span>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto w-full max-w-2xl lg:max-w-none"
          >
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-primary/20 via-transparent to-accent/25 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white shadow-2xl shadow-primary/10">
              <div className="relative aspect-[4/3] lg:aspect-[5/4]">
                <Image
                  src={HERO_IMAGE}
                  alt="Dentist providing comfortable premium dental care"
                  fill
                  priority
                  sizes="(min-width: 1024px) 52vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/65 via-primary-900/10 to-transparent" />
                <div className="absolute left-6 top-6 rounded-2xl bg-white/90 p-3 shadow-elevated backdrop-blur">
                  <BrandLogo compact size="sm" />
                </div>
                <div className="absolute bottom-6 left-6 right-6 rounded-3xl border border-white/25 bg-white/15 p-5 text-white shadow-glass backdrop-blur-md">
                  <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-accent-light">
                    <Sparkles className="h-4 w-4" />
                    Premium Dental Care
                  </div>
                  <p className="max-w-md text-2xl font-black leading-tight tracking-tight">
                    A calmer, brighter dental experience for your whole family.
                  </p>
                </div>
              </div>
            </div>

            {/* Floating Stats Cards */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.85 }}
              className="absolute -left-2 top-8 hidden rounded-2xl bg-white/95 p-4 shadow-elevated backdrop-blur sm:block lg:-left-8"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-success-light">
                  <Shield className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="text-xl font-black text-neutral-dark">
                    {STATS.satisfactionRate}%
                  </p>
                  <p className="text-xs font-medium text-neutral-light">
                    Satisfaction Rate
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
              className="absolute -right-2 bottom-12 hidden rounded-2xl bg-white/95 p-4 shadow-elevated backdrop-blur sm:block lg:-right-8"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-light">
                  <Award className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-xl font-black text-neutral-dark">
                    {STATS.specialists}+
                  </p>
                  <p className="text-xs font-medium text-neutral-light">
                    Expert Specialists
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-neutral-light lg:flex"
      >
        <span className="text-xs uppercase tracking-[0.22em]">Scroll</span>
        <div className="flex h-8 w-5 justify-center rounded-full border-2 border-neutral-light/40 pt-1">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="h-1.5 w-1.5 rounded-full bg-primary"
          />
        </div>
      </motion.div>
    </section>
  );
}
