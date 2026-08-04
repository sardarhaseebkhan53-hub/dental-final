import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-alt p-4">
      <div className="text-center max-w-md">
        <div className="relative mb-8">
          <h1 className="font-display text-[120px] lg:text-[160px] font-bold text-primary/10 leading-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="font-display text-3xl lg:text-4xl font-semibold text-neutral-dark">
              Page Not Found
            </p>
          </div>
        </div>
        <p className="text-neutral-mid text-lg mb-8">
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been
          moved. Let&apos;s get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild size="lg">
            <Link href="/">
              <Home className="h-4 w-4" /> Go Home
            </Link>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <Link href="/book-appointment">
              <Search className="h-4 w-4" /> Book Appointment
            </Link>
          </Button>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
          <Link href="/services" className="text-primary hover:underline">
            Our Services
          </Link>
          <Link href="/doctors" className="text-primary hover:underline">
            Our Doctors
          </Link>
          <Link href="/contact" className="text-primary hover:underline">
            Contact Us
          </Link>
          <Link href="/faq" className="text-primary hover:underline">
            FAQ
          </Link>
        </div>
      </div>
    </div>
  );
}
