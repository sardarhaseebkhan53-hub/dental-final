"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils";

const plans = [
  {
    name: "Essential Care",
    description: "Routine dental maintenance and preventive care",
    price: 199,
    period: "per visit",
    features: [
      "Comprehensive exam",
      "Professional cleaning",
      "Digital X-rays",
      "Oral cancer screening",
      "Treatment plan discussion",
    ],
    featured: false,
  },
  {
    name: "Premium Smile",
    description: "Advanced care for optimal dental health",
    price: 449,
    period: "per visit",
    features: [
      "Everything in Essential",
      "Teeth whitening treatment",
      "Fluoride treatment",
      "Detailed cosmetic assessment",
      "Priority scheduling",
      "Follow-up consultation",
    ],
    featured: true,
  },
  {
    name: "Family Plan",
    description: "Comprehensive coverage for the whole family",
    price: 699,
    period: "per year",
    features: [
      "2 cleanings per family member",
      "Annual exams for all",
      "Emergency coverage",
      "20% off all treatments",
      "Flexible scheduling",
      "Family priority booking",
    ],
    featured: false,
  },
];

export function PricingSection() {
  return (
    <section className="py-20 lg:py-28 bg-surface-alt" id="pricing">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-sm font-semibold text-accent uppercase tracking-widest mb-3 block">
            Pricing
          </span>
          <h2 className="font-display text-3xl lg:text-5xl font-semibold text-neutral-dark mb-4">
            Transparent <span className="text-primary">Pricing</span>
          </h2>
          <p className="text-neutral-mid text-lg">
            No surprises. Clear pricing for every service. We also accept most
            insurance plans.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "relative bg-white rounded-xl border p-6 lg:p-8 transition-all",
                plan.featured
                  ? "border-primary shadow-elevated scale-[1.02] lg:scale-105"
                  : "border-border shadow-card hover:shadow-card-hover",
              )}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-white text-xs font-semibold px-4 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <h3 className="font-display text-xl font-semibold text-neutral-dark">
                {plan.name}
              </h3>
              <p className="text-sm text-neutral-mid mt-1 mb-6">
                {plan.description}
              </p>

              <div className="mb-6">
                <span className="font-display text-4xl font-bold text-neutral-dark">
                  {formatCurrency(plan.price)}
                </span>
                <span className="text-sm text-neutral-light ml-1">
                  /{plan.period}
                </span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-success shrink-0 mt-0.5" />
                    <span className="text-neutral-mid">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                asChild
                variant={plan.featured ? "primary" : "secondary"}
                className="w-full"
                size="lg"
              >
                <Link href="/book-appointment">
                  Book Now <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-sm text-neutral-mid mb-4">
            We accept most major insurance plans. Contact us to verify your
            coverage.
          </p>
          <Button asChild variant="ghost">
            <Link href="/insurance">
              View Insurance Partners <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
