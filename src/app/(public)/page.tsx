import { Metadata } from "next";
import { HeroSection } from "@/components/sections/hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { ServicesSection } from "@/components/sections/services";
import { AboutSection } from "@/components/sections/about";
import { DoctorsSection } from "@/components/sections/doctors";
import { JourneySection } from "@/components/sections/journey";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { FAQSection } from "@/components/sections/faq";
import { ContactSection } from "@/components/sections/contact";
import { PricingSection } from "@/components/sections/pricing";
import { GallerySection } from "@/components/sections/gallery";

export const metadata: Metadata = {
  title: "Serene Dental — Where Beautiful Smiles Begin",
  description:
    "Experience premium dental care at Serene Dental Clinic. Expert dentists, modern technology, and a relaxing environment for your perfect smile.",
  alternates: { canonical: "/" },
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: "Serene Dental Clinic",
  image: "/images/clinic.jpg",
  url: process.env.NEXT_PUBLIC_APP_URL,
  telephone: "+15551234567",
  address: {
    "@type": "PostalAddress",
    streetAddress: "123 Wellness Avenue, Suite 200",
    addressLocality: "San Francisco",
    addressRegion: "CA",
    postalCode: "94102",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 37.7749,
    longitude: -122.4194,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "20:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "17:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "10:00",
      closes: "16:00",
    },
  ],
  priceRange: "$$",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "500",
    bestRating: "5",
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />
      <TrustBar />
      <ServicesSection />
      <AboutSection />
      <DoctorsSection />
      <JourneySection />
      <GallerySection />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <ContactSection />
    </>
  );
}
