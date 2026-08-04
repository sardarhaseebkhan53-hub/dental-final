"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CLINIC_INFO } from "@/lib/constants";

export function ContactSection() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <section className="py-20 lg:py-28 bg-surface-alt" id="contact">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-sm font-semibold text-accent uppercase tracking-widest mb-3 block">
            Contact Us
          </span>
          <h2 className="font-display text-3xl lg:text-5xl font-semibold text-neutral-dark mb-4">
            Get in <span className="text-primary">Touch</span>
          </h2>
          <p className="text-neutral-mid text-lg">
            Have questions or ready to book? We&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            {[
              {
                icon: Phone,
                label: "Phone",
                value: CLINIC_INFO.phone,
                href: `tel:${CLINIC_INFO.phone}`,
              },
              {
                icon: Mail,
                label: "Email",
                value: CLINIC_INFO.email,
                href: `mailto:${CLINIC_INFO.email}`,
              },
              {
                icon: MapPin,
                label: "Address",
                value: `${CLINIC_INFO.address.street}, ${CLINIC_INFO.address.city}, ${CLINIC_INFO.address.state} ${CLINIC_INFO.address.zip}`,
              },
              {
                icon: Clock,
                label: "Hours",
                value: `Mon-Fri: ${CLINIC_INFO.hours.weekday}\nSat: ${CLINIC_INFO.hours.saturday}\nSun: ${CLINIC_INFO.hours.sunday}`,
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-primary-pale flex items-center justify-center shrink-0">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-neutral-dark mb-0.5">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-sm text-neutral-mid hover:text-primary transition-colors whitespace-pre-line"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm text-neutral-mid whitespace-pre-line">
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl border border-border p-6 lg:p-8 shadow-card">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="h-16 w-16 rounded-full bg-success-light flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-success" />
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-dark mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-neutral-mid">
                    Thank you for reaching out. We&apos;ll get back to you
                    within 24 hours.
                  </p>
                  <Button
                    variant="ghost"
                    className="mt-4"
                    onClick={() => setIsSubmitted(false)}
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input label="Full Name" placeholder="John Doe" required />
                    <Input
                      label="Email"
                      type="email"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input
                      label="Phone"
                      type="tel"
                      placeholder="(555) 000-0000"
                    />
                    <Input
                      label="Subject"
                      placeholder="How can we help?"
                      required
                    />
                  </div>
                  <Textarea
                    label="Message"
                    placeholder="Tell us about your dental needs..."
                    rows={5}
                    required
                  />
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-neutral-light">
                      <span className="text-error">*</span> Required fields
                    </p>
                    <Button type="submit" loading={loading} size="lg">
                      <Send className="h-4 w-4" />
                      Send Message
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
