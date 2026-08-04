import { Metadata } from "next";
import { TestimonialsSection } from "@/components/sections/testimonials";

export const metadata: Metadata = {
  title: "Patient Testimonials",
  description:
    "Read what our patients say about their experience at Serene Dental Clinic. Real stories from real patients.",
};

export default function TestimonialsPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary-pale to-white py-20">
        <div className="container mx-auto px-4 text-center">
          <span className="text-sm font-semibold text-accent uppercase tracking-widest mb-3 block">
            Testimonials
          </span>
          <h1 className="font-display text-4xl lg:text-6xl font-semibold text-neutral-dark mb-4">
            Patient <span className="text-primary">Stories</span>
          </h1>
          <p className="text-neutral-mid text-lg max-w-2xl mx-auto">
            Hear from the thousands of patients who have transformed their
            smiles with Serene Dental.
          </p>
        </div>
      </section>
      <TestimonialsSection />
    </>
  );
}
