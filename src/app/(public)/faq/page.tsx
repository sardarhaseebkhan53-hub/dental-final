import { Metadata } from "next";
import { FAQSection } from "@/components/sections/faq";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Find answers to common questions about dental treatments, appointments, insurance, billing, and more at Serene Dental Clinic.",
};

export default function FAQPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary-pale to-white py-20">
        <div className="container mx-auto px-4 text-center">
          <span className="text-sm font-semibold text-accent uppercase tracking-widest mb-3 block">
            FAQ
          </span>
          <h1 className="font-display text-4xl lg:text-6xl font-semibold text-neutral-dark mb-4">
            Frequently Asked <span className="text-primary">Questions</span>
          </h1>
          <p className="text-neutral-mid text-lg max-w-2xl mx-auto">
            Everything you need to know about our services, appointments, and
            policies.
          </p>
        </div>
      </section>
      <FAQSection />
    </>
  );
}
