import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "Serene Dental Clinic refund and cancellation policy.",
};

export default function RefundPolicyPage() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="font-display text-4xl font-semibold text-neutral-dark mb-2">
          Refund Policy
        </h1>
        <p className="text-sm text-neutral-light mb-8">
          Last updated: August 1, 2026
        </p>
        <div className="prose prose-neutral max-w-none space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-neutral-dark">
              Appointment Cancellations
            </h2>
            <p className="text-neutral-mid mt-2">
              Cancellations made at least 24 hours before the scheduled
              appointment will receive a full refund of any prepaid amounts.
              Cancellations within 24 hours may be subject to a cancellation
              fee.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-neutral-dark">
              Treatment Refunds
            </h2>
            <p className="text-neutral-mid mt-2">
              Refunds for treatments already rendered are evaluated on a
              case-by-case basis. If you are unsatisfied with your treatment,
              please contact us within 30 days to discuss your concerns.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-neutral-dark">
              Insurance Claims
            </h2>
            <p className="text-neutral-mid mt-2">
              For insurance-covered treatments, refunds are processed according
              to your insurance provider&apos;s policies. We will assist you in
              filing claims and addressing any disputes.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-neutral-dark">
              Processing Time
            </h2>
            <p className="text-neutral-mid mt-2">
              Approved refunds are processed within 5-10 business days. The
              refund will be issued to the original payment method.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
