import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Serene Dental Clinic privacy policy — how we collect, use, and protect your personal and medical information.",
};

export default function PrivacyPage() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="font-display text-4xl font-semibold text-neutral-dark mb-2">
          Privacy Policy
        </h1>
        <p className="text-sm text-neutral-light mb-8">
          Last updated: August 1, 2026
        </p>

        <div className="prose prose-neutral max-w-none space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-neutral-dark">
              1. Information We Collect
            </h2>
            <p className="text-neutral-mid mt-2">
              We collect information you provide directly, including personal
              details (name, email, phone), medical history, dental records,
              insurance information, and payment details. We also collect usage
              data through cookies and analytics.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-neutral-dark">
              2. How We Use Your Information
            </h2>
            <p className="text-neutral-mid mt-2">
              We use your information to provide dental care services, schedule
              appointments, process payments, send reminders, improve our
              services, and comply with legal obligations. We never sell your
              personal data.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-neutral-dark">
              3. HIPAA Compliance
            </h2>
            <p className="text-neutral-mid mt-2">
              As a healthcare provider, we comply with the Health Insurance
              Portability and Accountability Act (HIPAA). Your Protected Health
              Information (PHI) is safeguarded according to federal regulations.
              We maintain physical, electronic, and procedural safeguards to
              protect your health information.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-neutral-dark">
              4. Data Security
            </h2>
            <p className="text-neutral-mid mt-2">
              We implement industry-standard security measures including
              encryption, secure servers, access controls, and regular security
              audits. All data transmission is encrypted using TLS 1.3.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-neutral-dark">
              5. Your Rights
            </h2>
            <p className="text-neutral-mid mt-2">
              You have the right to access, correct, delete, and port your
              personal data. You can opt out of marketing communications at any
              time. To exercise these rights, contact our privacy officer at
              privacy@serenedental.com.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-neutral-dark">
              6. Contact Us
            </h2>
            <p className="text-neutral-mid mt-2">
              For privacy-related questions, contact us at
              privacy@serenedental.com or (555) 123-4567.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
