import { Metadata } from "next";
import Link from "next/link";
import { Shield, CheckCircle, ArrowRight, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Insurance & Financing",
  description:
    "We accept most major dental insurance plans. Learn about accepted insurance providers and flexible financing options at Serene Dental.",
};

const insuranceProviders = [
  "Delta Dental",
  "Cigna",
  "MetLife",
  "Aetna",
  "United Healthcare",
  "Guardian",
  "Blue Cross Blue Shield",
  "Humana",
  "Principal",
  "Ameritas",
  "DentaQuest",
  "Liberty Dental",
];

export default function InsurancePage() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary-pale to-white py-20">
        <div className="container mx-auto px-4 text-center">
          <span className="text-sm font-semibold text-accent uppercase tracking-widest mb-3 block">
            Insurance & Financing
          </span>
          <h1 className="font-display text-4xl lg:text-6xl font-semibold text-neutral-dark mb-4">
            Insurance & <span className="text-primary">Financing</span>
          </h1>
          <p className="text-neutral-mid text-lg max-w-2xl mx-auto">
            We believe everyone deserves great dental care. We accept most
            insurance plans and offer flexible financing options.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {/* Insurance Providers */}
          <h2 className="font-display text-2xl font-semibold text-neutral-dark mb-8 text-center">
            Accepted Insurance Providers
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16">
            {insuranceProviders.map((provider) => (
              <div
                key={provider}
                className="flex items-center gap-2 p-4 rounded-lg border border-border hover:border-primary/30 hover:bg-primary-pale/30 transition-colors"
              >
                <Shield className="h-5 w-5 text-primary shrink-0" />
                <span className="text-sm font-medium text-neutral-dark">
                  {provider}
                </span>
              </div>
            ))}
          </div>

          {/* Financing Options */}
          <h2 className="font-display text-2xl font-semibold text-neutral-dark mb-8 text-center">
            Financing Options
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
            {[
              {
                title: "CareCredit",
                desc: "Interest-free financing for 6-12 months on qualifying treatments. Quick approval process.",
                features: [
                  "No interest if paid in full",
                  "Monthly payment plans",
                  "Instant approval",
                ],
              },
              {
                title: "Lending Club",
                desc: "Flexible payment plans with low monthly payments. Multiple term options available.",
                features: [
                  "Low fixed rates",
                  "No upfront costs",
                  "Extended terms",
                ],
              },
              {
                title: "In-House Plans",
                desc: "Our own payment plans for uninsured patients. Customized to fit your budget.",
                features: [
                  "No credit check",
                  "Flexible terms",
                  "Direct billing",
                ],
              },
            ].map((option) => (
              <div
                key={option.title}
                className="bg-surface-alt rounded-xl p-6 border border-border"
              >
                <h3 className="font-semibold text-lg text-neutral-dark mb-2">
                  {option.title}
                </h3>
                <p className="text-sm text-neutral-mid mb-4">{option.desc}</p>
                <ul className="space-y-2">
                  {option.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-sm text-neutral-mid"
                    >
                      <CheckCircle className="h-4 w-4 text-success shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center bg-primary-pale rounded-2xl p-8 lg:p-12 max-w-3xl mx-auto">
            <HelpCircle className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-display text-2xl font-semibold text-neutral-dark mb-3">
              Not Sure About Coverage?
            </h3>
            <p className="text-neutral-mid mb-6">
              Our team will verify your insurance benefits and help maximize
              your coverage before your visit.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg">
                <Link href="/contact">
                  Contact Us <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <a href="tel:(555)1234567">Call (555) 123-4567</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
