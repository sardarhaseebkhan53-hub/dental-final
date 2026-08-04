import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "How Serene Dental uses cookies to improve your browsing experience.",
};

export default function CookiesPage() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="font-display text-4xl font-semibold text-neutral-dark mb-2">
          Cookie Policy
        </h1>
        <p className="text-sm text-neutral-light mb-8">
          Last updated: August 1, 2026
        </p>
        <div className="prose prose-neutral max-w-none space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-neutral-dark">
              What Are Cookies
            </h2>
            <p className="text-neutral-mid mt-2">
              Cookies are small text files stored on your device when you visit
              our website. They help us provide you with a better experience by
              remembering your preferences and understanding how you use our
              site.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-neutral-dark">
              Types of Cookies We Use
            </h2>
            <p className="text-neutral-mid mt-2">
              <strong>Essential Cookies:</strong> Required for the website to
              function properly (authentication, security).
            </p>
            <p className="text-neutral-mid mt-2">
              <strong>Analytics Cookies:</strong> Help us understand how
              visitors interact with our website.
            </p>
            <p className="text-neutral-mid mt-2">
              <strong>Preference Cookies:</strong> Remember your settings and
              preferences for a better experience.
            </p>
            <p className="text-neutral-mid mt-2">
              <strong>Marketing Cookies:</strong> Used to deliver relevant
              advertisements. We do not use third-party marketing cookies.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-neutral-dark">
              Managing Cookies
            </h2>
            <p className="text-neutral-mid mt-2">
              You can control cookies through your browser settings. Note that
              disabling essential cookies may affect website functionality.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
