"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    category: "First Visit",
    question: "What should I expect during my first visit?",
    answer:
      "Your first visit includes a comprehensive dental examination, digital X-rays if needed, a professional cleaning, and a personalized treatment plan discussion with your dentist. We'll also review your medical history and address any concerns. Plan for about 60-90 minutes.",
  },
  {
    category: "Appointments",
    question: "How do I schedule or reschedule an appointment?",
    answer:
      "You can book appointments online through our patient portal, call us at (555) 123-4567, or use our mobile app. Rescheduling can be done up to 24 hours before your appointment without any charge.",
  },
  {
    category: "Insurance",
    question: "Do you accept dental insurance?",
    answer:
      "Yes, we accept most major dental insurance plans including Delta Dental, Cigna, MetLife, Aetna, and many more. Our team will help verify your coverage and maximize your benefits. We also offer flexible payment plans for uninsured patients.",
  },
  {
    category: "Emergency",
    question: "What constitutes a dental emergency?",
    answer:
      "Dental emergencies include severe tooth pain, knocked-out teeth, broken teeth, uncontrolled bleeding, dental abscess, or lost fillings/crowns. We offer 24/7 emergency care — call our emergency line at (555) 911-0000.",
  },
  {
    category: "Treatments",
    question: "Is teeth whitening safe?",
    answer:
      "Professional teeth whitening performed by our dental team is completely safe and effective. We use clinically proven methods that protect your enamel while delivering dramatic results. We offer both in-office and take-home whitening options.",
  },
  {
    category: "General",
    question: "How often should I visit the dentist?",
    answer:
      "We recommend dental check-ups every 6 months for most patients. However, some conditions may require more frequent visits. Your dentist will create a personalized schedule based on your oral health needs.",
  },
  {
    category: "Treatments",
    question: "How long does Invisalign treatment take?",
    answer:
      "Invisalign treatment typically takes 12-18 months, though simpler cases may be completed in as little as 6 months. During your consultation, Dr. Chen will provide a personalized timeline based on your specific alignment needs.",
  },
  {
    category: "Billing",
    question: "Do you offer payment plans?",
    answer:
      "Yes, we offer flexible financing options including interest-free payment plans through CareCredit and Lending Club. We also accept all major credit cards and can work with you to create a payment schedule that fits your budget.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <section className="py-20 lg:py-28 bg-white" id="faq">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="text-sm font-semibold text-accent uppercase tracking-widest mb-3 block">
            FAQ
          </span>
          <h2 className="font-display text-3xl lg:text-5xl font-semibold text-neutral-dark mb-4">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="text-neutral-mid text-lg">
            Find answers to common questions about our services, appointments,
            and policies.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {/* Search */}
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-light" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 rounded-xl border border-border bg-surface-alt pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
            />
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-3">
            {filteredFaqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="border border-border rounded-xl overflow-hidden"
              >
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-surface-alt transition-colors"
                  aria-expanded={openIndex === index}
                >
                  <div>
                    <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                      {faq.category}
                    </span>
                    <h3 className="text-sm font-semibold text-neutral-dark mt-0.5">
                      {faq.question}
                    </h3>
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 text-neutral-light transition-transform duration-200 shrink-0 ml-4",
                      openIndex === index && "rotate-180",
                    )}
                  />
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-4 text-sm text-neutral-mid leading-relaxed border-t border-border pt-4">
                    {faq.answer}
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {filteredFaqs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-neutral-mid">
                No questions found matching your search.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
