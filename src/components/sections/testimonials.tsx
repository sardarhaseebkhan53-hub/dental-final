"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Sarah Johnson",
    initials: "SJ",
    rating: 5,
    content:
      "Serene Dental completely transformed my smile. Dr. Mitchell and her team made me feel so comfortable throughout the entire process. The results exceeded my expectations!",
    treatment: "Smile Makeover",
  },
  {
    name: "Michael Chen",
    initials: "MC",
    rating: 5,
    content:
      "I was terrified of dentists until I found Serene Dental. The calming environment and gentle approach put me at ease immediately. Best dental experience ever.",
    treatment: "General Dentistry",
  },
  {
    name: "Emily Rodriguez",
    initials: "ER",
    rating: 5,
    content:
      "My kids love coming here! Dr. Rodriguez is amazing with children. The office is beautiful and the staff is incredibly friendly. Highly recommend for families.",
    treatment: "Pediatric Dentistry",
  },
  {
    name: "David Kim",
    initials: "DK",
    rating: 5,
    content:
      "Got my Invisalign treatment here and the results are incredible. The team was professional, attentive, and always available for questions. Worth every penny.",
    treatment: "Invisalign",
  },
];

export function TestimonialsSection() {
  return (
    <section
      className="py-20 lg:py-28 bg-gradient-to-br from-primary-pale via-white to-accent-light/20"
      id="testimonials"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-sm font-semibold text-accent uppercase tracking-widest mb-3 block">
            Testimonials
          </span>
          <h2 className="font-display text-3xl lg:text-5xl font-semibold text-neutral-dark mb-4">
            What Our <span className="text-primary">Patients</span> Say
          </h2>
          <p className="text-neutral-mid text-lg">
            Join thousands of happy patients who have transformed their smiles
            with Serene Dental.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 border border-border shadow-card hover:shadow-card-hover transition-all"
            >
              <Quote className="h-8 w-8 text-primary/20 mb-4" />
              <p className="text-sm text-neutral-mid leading-relaxed mb-6">
                &ldquo;{testimonial.content}&rdquo;
              </p>
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-accent fill-accent" />
                ))}
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary-pale text-primary text-sm font-semibold">
                    {testimonial.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold text-neutral-dark">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-neutral-light">
                    {testimonial.treatment}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-wrap items-center justify-center gap-8"
        >
          {[
            { label: "Google Reviews", rating: "4.9", count: "500+" },
            { label: "Yelp", rating: "4.8", count: "200+" },
            { label: "Facebook", rating: "4.9", count: "300+" },
          ].map((platform) => (
            <div
              key={platform.label}
              className="flex items-center gap-3 bg-white rounded-lg px-4 py-2 border border-border"
            >
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-accent fill-accent" />
                <span className="font-semibold text-sm">{platform.rating}</span>
              </div>
              <div>
                <p className="text-xs text-neutral-light">{platform.label}</p>
                <p className="text-xs font-medium text-neutral-mid">
                  {platform.count} reviews
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
