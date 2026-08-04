import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms and conditions for using Serene Dental Clinic services and website.",
};

export default function TermsPage() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="font-display text-4xl font-semibold text-neutral-dark mb-2">
          Terms of Service
        </h1>
        <p className="text-sm text-neutral-light mb-8">
          Last updated: August 1, 2026
        </p>

        <div className="prose prose-neutral max-w-none space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-neutral-dark">
              1. Acceptance of Terms
            </h2>
            <p className="text-neutral-mid mt-2">
              By accessing and using Serene Dental Clinic&apos;s website and
              services, you agree to be bound by these Terms of Service. If you
              disagree with any part, please do not use our services.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-neutral-dark">
              2. Services
            </h2>
            <p className="text-neutral-mid mt-2">
              We provide dental care services including but not limited to
              general dentistry, cosmetic procedures, orthodontics, and
              emergency care. All services are subject to availability and
              professional assessment.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-neutral-dark">
              3. Appointments
            </h2>
            <p className="text-neutral-mid mt-2">
              Appointments must be cancelled or rescheduled at least 24 hours in
              advance. Late cancellations or no-shows may incur a fee. We
              reserve the right to reschedule appointments due to emergencies.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-neutral-dark">
              4. Payment
            </h2>
            <p className="text-neutral-mid mt-2">
              Payment is due at the time of service unless prior arrangements
              have been made. We accept cash, credit/debit cards, insurance, and
              approved payment plans. All prices are subject to change.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-neutral-dark">
              5. Limitation of Liability
            </h2>
            <p className="text-neutral-mid mt-2">
              While we strive for the best outcomes, dental treatments carry
              inherent risks. We are not liable for outcomes resulting from
              patient non-compliance with aftercare instructions or failure to
              attend follow-up appointments.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
