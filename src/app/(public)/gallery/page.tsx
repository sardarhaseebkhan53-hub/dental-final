import { Metadata } from "next";
import { GallerySection } from "@/components/sections/gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Take a virtual tour of Serene Dental Clinic — our modern facility, advanced technology, and welcoming environment.",
};

export default function GalleryPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary-pale to-white py-20">
        <div className="container mx-auto px-4 text-center">
          <span className="text-sm font-semibold text-accent uppercase tracking-widest mb-3 block">
            Gallery
          </span>
          <h1 className="font-display text-4xl lg:text-6xl font-semibold text-neutral-dark mb-4">
            Our <span className="text-primary">Gallery</span>
          </h1>
          <p className="text-neutral-mid text-lg max-w-2xl mx-auto">
            Explore our state-of-the-art facility and see the results of our
            exceptional dental care.
          </p>
        </div>
      </section>
      <GallerySection />
    </>
  );
}
