"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  MessageCircle,
  Stethoscope,
  Sparkles,
  ThumbsUp,
} from "lucide-react";

const steps = [
  {
    icon: Calendar,
    step: "01",
    title: "Book Online",
    description:
      "Schedule your appointment in just a few clicks. Choose your preferred date, time, and doctor.",
  },
  {
    icon: MessageCircle,
    step: "02",
    title: "Consultation",
    description:
      "Meet with our specialists for a thorough examination and personalized treatment plan.",
  },
  {
    icon: Stethoscope,
    step: "03",
    title: "Treatment",
    description:
      "Receive world-class care with the latest technology in our comfortable, modern facility.",
  },
  {
    icon: Sparkles,
    step: "04",
    title: "Aftercare",
    description:
      "Enjoy comprehensive follow-up care and support to ensure your long-term dental health.",
  },
  {
    icon: ThumbsUp,
    step: "05",
    title: "Your Best Smile",
    description:
      "Confidently show off your beautiful, healthy smile to the world!",
  },
];

export function JourneySection() {
  return (
    <section className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-sm font-semibold text-accent uppercase tracking-widest mb-3 block">
            Your Journey
          </span>
          <h2 className="font-display text-3xl lg:text-5xl font-semibold text-neutral-dark mb-4">
            Your Path to a <span className="text-primary">Perfect Smile</span>
          </h2>
          <p className="text-neutral-mid text-lg">
            From your first visit to your final result, we make every step
            comfortable and seamless.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/20 via-primary to-primary/20 hidden md:block" />

          <div className="space-y-12">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center gap-8 ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"}`}
                >
                  <div
                    className={`flex-1 ${isEven ? "lg:text-right" : "lg:text-left"}`}
                  >
                    <div
                      className={`bg-white rounded-xl p-6 border border-border shadow-card hover:shadow-card-hover transition-shadow ${isEven ? "lg:mr-8" : "lg:ml-8"}`}
                    >
                      <span className="text-xs font-bold text-accent uppercase tracking-widest">
                        Step {step.step}
                      </span>
                      <h3 className="font-semibold text-lg text-neutral-dark mt-2 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm text-neutral-mid">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  {/* Center dot */}
                  <div className="hidden lg:flex h-14 w-14 rounded-full bg-primary text-white items-center justify-center shrink-0 shadow-lg shadow-primary/30">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1 hidden lg:block" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
