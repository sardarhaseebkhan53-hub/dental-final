import { Metadata } from "next";
import { PricingSection } from "@/components/sections/pricing";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent pricing for all dental services at Serene Dental Clinic. View our competitive rates and financing options.",
};

export default function PricingPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary-pale to-white py-20">
        <div className="container mx-auto px-4 text-center">
          <span className="text-sm font-semibold text-accent uppercase tracking-widest mb-3 block">
            Pricing
          </span>
          <h1 className="font-display text-4xl lg:text-6xl font-semibold text-neutral-dark mb-4">
            Transparent <span className="text-primary">Pricing</span>
          </h1>
          <p className="text-neutral-mid text-lg max-w-2xl mx-auto">
            No hidden fees. Clear, upfront pricing for every service. We also
            work with most insurance plans.
          </p>
        </div>
      </section>
      <PricingSection />
    </>
  );
}
