import { Metadata } from "next";
import { AboutSection } from "@/components/sections/about";
import { TrustBar } from "@/components/sections/trust-bar";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Serene Dental Clinic — over 25 years of delivering premium dental care with compassion, innovation, and clinical excellence.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-pale to-white py-20">
        <div className="container mx-auto px-4 text-center">
          <span className="text-sm font-semibold text-accent uppercase tracking-widest mb-3 block">
            About Us
          </span>
          <h1 className="font-display text-4xl lg:text-6xl font-semibold text-neutral-dark mb-4">
            Our <span className="text-primary">Story</span>
          </h1>
          <p className="text-neutral-mid text-lg max-w-2xl mx-auto">
            Since 1999, we&apos;ve been transforming lives through exceptional
            dental care, combining clinical expertise with a warm,
            patient-centered approach.
          </p>
        </div>
      </section>
      <AboutSection />
      <TrustBar />
      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="bg-primary-pale rounded-2xl p-8 lg:p-10">
              <h2 className="font-display text-2xl font-semibold text-neutral-dark mb-4">
                Our Mission
              </h2>
              <p className="text-neutral-mid leading-relaxed">
                To provide exceptional, compassionate dental care that
                transforms lives. We are committed to clinical excellence,
                patient comfort, and innovative solutions that make premium
                dentistry accessible to everyone.
              </p>
            </div>
            <div className="bg-accent-light rounded-2xl p-8 lg:p-10">
              <h2 className="font-display text-2xl font-semibold text-neutral-dark mb-4">
                Our Vision
              </h2>
              <p className="text-neutral-mid leading-relaxed">
                To be the most trusted and innovative dental clinic in the
                region, setting new standards for patient experience, clinical
                outcomes, and community impact. We envision a world where dental
                anxiety is a thing of the past.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
