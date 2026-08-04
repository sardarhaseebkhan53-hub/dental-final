"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Award,
  Heart,
  Shield,
  Microscope,
  Users,
} from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Patient-Centered",
    desc: "Your comfort and wellbeing are our top priority",
  },
  {
    icon: Award,
    title: "Excellence",
    desc: "Highest standards of clinical care and professionalism",
  },
  {
    icon: Shield,
    title: "Trust & Safety",
    desc: "Rigorous sterilization and safety protocols",
  },
  {
    icon: Microscope,
    title: "Innovation",
    desc: "Cutting-edge technology and modern techniques",
  },
  {
    icon: Users,
    title: "Compassion",
    desc: "Empathetic care for patients of all ages",
  },
];

export function AboutSection() {
  return (
    <section className="py-20 lg:py-28 bg-white" id="about">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-primary-pale to-accent-light/30 aspect-[4/3]">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="h-20 w-20 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Heart className="h-10 w-10 text-primary" />
                  </div>
                  <p className="text-xl font-display font-semibold text-primary">
                    Est. 1999
                  </p>
                  <p className="text-neutral-mid mt-1">
                    Over 25 years of dental excellence
                  </p>
                </div>
              </div>
            </div>
            {/* Decorative accent */}
            <div className="absolute -bottom-4 -right-4 h-32 w-32 rounded-2xl border-2 border-accent/20 -z-10" />
            <div className="absolute -top-4 -left-4 h-20 w-20 rounded-xl bg-accent/10 -z-10" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-semibold text-accent uppercase tracking-widest mb-3 block">
              About Serene Dental
            </span>
            <h2 className="font-display text-3xl lg:text-5xl font-semibold text-neutral-dark mb-6">
              A Legacy of <span className="text-primary">Exceptional</span>{" "}
              Dental Care
            </h2>
            <p className="text-neutral-mid text-lg leading-relaxed mb-6">
              Founded in 1999, Serene Dental has been at the forefront of modern
              dentistry, combining clinical expertise with a warm,
              patient-centered approach. Our team of specialists brings decades
              of combined experience to deliver transformative dental care.
            </p>
            <p className="text-neutral-mid leading-relaxed mb-8">
              We believe that dental care should feel like self-care.
              That&apos;s why we&apos;ve created an environment where anxiety
              dissolves and trust is instantly built — from our spa-like waiting
              rooms to our gentle, attentive approach to every procedure.
            </p>

            {/* Values */}
            <div className="space-y-4">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="h-10 w-10 rounded-lg bg-primary-pale flex items-center justify-center shrink-0">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-dark">
                        {value.title}
                      </h4>
                      <p className="text-sm text-neutral-mid">{value.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Certifications */}
            <div className="mt-8 flex items-center gap-6 flex-wrap">
              {["ADA Certified", "HIPAA Compliant", "ISO 9001"].map((cert) => (
                <div
                  key={cert}
                  className="flex items-center gap-2 text-sm text-neutral-mid"
                >
                  <CheckCircle className="h-4 w-4 text-success" />
                  {cert}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
