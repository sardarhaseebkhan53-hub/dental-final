import { Metadata } from "next";
import { ContactSection } from "@/components/sections/contact";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Serene Dental Clinic. Schedule an appointment, ask questions, or visit us at our San Francisco location.",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary-pale to-white py-20">
        <div className="container mx-auto px-4 text-center">
          <span className="text-sm font-semibold text-accent uppercase tracking-widest mb-3 block">
            Contact
          </span>
          <h1 className="font-display text-4xl lg:text-6xl font-semibold text-neutral-dark mb-4">
            Get in <span className="text-primary">Touch</span>
          </h1>
          <p className="text-neutral-mid text-lg max-w-2xl mx-auto">
            We&apos;re here to help. Reach out with any questions or to schedule
            your visit.
          </p>
        </div>
      </section>
      <ContactSection />
    </>
  );
}
