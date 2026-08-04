"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, ArrowRight, Globe, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

const doctors = [
  {
    name: "Dr. Sarah Mitchell",
    title: "Lead Dentist & Founder",
    specialization: "Cosmetic & Implant Specialist",
    experience: "20+ years",
    rating: 4.9,
    reviews: 180,
    languages: ["English", "Spanish"],
    education: "Harvard School of Dental Medicine",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Dr. James Chen",
    title: "Orthodontist",
    specialization: "Invisalign Gold Provider",
    experience: "15+ years",
    rating: 4.8,
    reviews: 145,
    languages: ["English", "Mandarin"],
    education: "UCSF School of Dentistry",
    image:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Dr. Emily Rodriguez",
    title: "Pediatric Dentist",
    specialization: "Child-Friendly Specialist",
    experience: "10+ years",
    rating: 4.9,
    reviews: 120,
    languages: ["English", "Spanish", "Portuguese"],
    education: "Columbia University",
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Dr. Michael Thompson",
    title: "Oral Surgeon",
    specialization: "Complex Procedures",
    experience: "18+ years",
    rating: 4.9,
    reviews: 160,
    languages: ["English"],
    education: "Johns Hopkins School of Medicine",
    image:
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=700&q=80",
  },
];

export function DoctorsSection() {
  return (
    <section className="bg-surface-alt py-20 lg:py-28" id="doctors">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <span className="mb-3 block text-sm font-semibold uppercase tracking-widest text-accent">
            Our Team
          </span>
          <h2 className="mb-4 font-display text-3xl font-extrabold tracking-tight text-neutral-dark lg:text-5xl">
            Meet Our <span className="text-primary">Expert</span> Dentists
          </h2>
          <p className="text-lg text-neutral-mid">
            Board-certified specialists, digital treatment planning, and a
            friendly chairside approach for every patient.
          </p>
        </motion.div>

        <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {doctors.map((doctor, index) => (
            <motion.div
              key={doctor.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group overflow-hidden rounded-3xl border border-border bg-white shadow-card transition-all duration-300 hover:-translate-y-2 hover:shadow-card-hover"
            >
              <div className="relative h-56 overflow-hidden bg-gradient-to-br from-primary-pale to-accent-light/20">
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/50 to-transparent" />
                <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/95 px-2 py-1 shadow-card backdrop-blur-sm">
                  <Star className="h-3 w-3 fill-accent text-accent" />
                  <span className="text-xs font-bold">{doctor.rating}</span>
                </div>
                <div className="absolute bottom-4 left-4 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-primary shadow-card">
                  {doctor.experience}
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-bold text-neutral-dark transition-colors group-hover:text-primary">
                  {doctor.name}
                </h3>
                <p className="text-sm font-semibold text-primary">
                  {doctor.title}
                </p>
                <p className="mt-1 text-sm text-neutral-mid">
                  {doctor.specialization}
                </p>

                <div className="mt-4 space-y-2 border-t border-border pt-4">
                  <div className="flex items-start gap-2 text-xs text-neutral-mid">
                    <GraduationCap className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                    <span>{doctor.education}</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs text-neutral-mid">
                    <Globe className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                    <span>{doctor.languages.join(", ")}</span>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-neutral-light">
                    {doctor.reviews} reviews
                  </span>
                  <Link
                    href="/doctors"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-700"
                  >
                    Profile <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Button asChild size="lg" variant="secondary">
            <Link href="/doctors">
              Meet All Doctors <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
