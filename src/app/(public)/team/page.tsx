import { Metadata } from "next";
import { DoctorsSection } from "@/components/sections/doctors";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the dedicated team at Serene Dental Clinic — experienced dentists, hygienists, and support staff committed to your care.",
};

export default function TeamPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary-pale to-white py-20">
        <div className="container mx-auto px-4 text-center">
          <span className="text-sm font-semibold text-accent uppercase tracking-widest mb-3 block">
            Our Team
          </span>
          <h1 className="font-display text-4xl lg:text-6xl font-semibold text-neutral-dark mb-4">
            Our <span className="text-primary">Team</span>
          </h1>
          <p className="text-neutral-mid text-lg max-w-2xl mx-auto">
            A team of passionate professionals dedicated to delivering the
            highest standard of dental care.
          </p>
        </div>
      </section>
      <DoctorsSection />
    </>
  );
}
