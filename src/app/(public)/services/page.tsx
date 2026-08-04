import { Metadata } from "next";
import Link from "next/link";
import {
  Stethoscope,
  Sparkles,
  AlignCenter,
  Baby,
  Scissors,
  AlertTriangle,
  ShieldCheck,
  RefreshCw,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Comprehensive dental services at Serene Dental — from general dentistry and cosmetic procedures to orthodontics, implants, and emergency care.",
};

const services = [
  {
    icon: Stethoscope,
    title: "General Dentistry",
    desc: "Comprehensive dental care including cleanings, fillings, and preventive treatments to maintain your oral health.",
    href: "/services/general-dentistry",
    category: "General",
    price: "From $150",
  },
  {
    icon: Sparkles,
    title: "Cosmetic Dentistry",
    desc: "Transform your smile with veneers, whitening, bonding, and complete smile makeovers.",
    href: "/services/cosmetic-dentistry",
    category: "Cosmetic",
    price: "From $350",
  },
  {
    icon: AlignCenter,
    title: "Orthodontics",
    desc: "Straighter teeth with Invisalign, clear aligners, and traditional braces for all ages.",
    href: "/services/orthodontics",
    category: "Orthodontics",
    price: "From $3,500",
  },
  {
    icon: Baby,
    title: "Pediatric Dentistry",
    desc: "Gentle, child-friendly dental care in a comfortable environment designed for little ones.",
    href: "/services/pediatric-dentistry",
    category: "Pediatric",
    price: "From $120",
  },
  {
    icon: Scissors,
    title: "Dental Implants",
    desc: "Permanent tooth replacement with state-of-the-art implant technology for a natural-looking smile.",
    href: "/services/dental-implants",
    category: "Restorative",
    price: "From $3,000",
  },
  {
    icon: AlertTriangle,
    title: "Emergency Care",
    desc: "24/7 emergency dental services for urgent situations. Immediate relief when you need it most.",
    href: "/services/emergency-care",
    category: "Emergency",
    price: "From $200",
  },
  {
    icon: ShieldCheck,
    title: "Preventive Care",
    desc: "Regular check-ups, professional cleanings, and personalized prevention plans.",
    href: "/services/preventive-care",
    category: "Preventive",
    price: "From $120",
  },
  {
    icon: RefreshCw,
    title: "Root Canal",
    desc: "Pain-free root canal treatments using advanced technology to save your natural teeth.",
    href: "/services/root-canal",
    category: "Endodontics",
    price: "From $800",
  },
  {
    icon: Sparkles,
    title: "Teeth Whitening",
    desc: "Professional in-office and take-home whitening options for a brighter, whiter smile.",
    href: "/services/teeth-whitening",
    category: "Cosmetic",
    price: "From $350",
  },
  {
    icon: Stethoscope,
    title: "Gum Treatment",
    desc: "Advanced periodontal therapy to treat gum disease and restore gum health.",
    href: "/services/gum-treatment",
    category: "Periodontics",
    price: "From $500",
  },
  {
    icon: Scissors,
    title: "Oral Surgery",
    desc: "Expert surgical procedures including extractions, wisdom teeth removal, and jaw surgery.",
    href: "/services/oral-surgery",
    category: "Surgery",
    price: "From $400",
  },
  {
    icon: Sparkles,
    title: "Dental Crowns",
    desc: "Custom-made crowns and bridges to restore damaged or missing teeth.",
    href: "/services/crowns",
    category: "Restorative",
    price: "From $1,200",
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary-pale to-white py-20">
        <div className="container mx-auto px-4 text-center">
          <span className="text-sm font-semibold text-accent uppercase tracking-widest mb-3 block">
            Our Services
          </span>
          <h1 className="font-display text-4xl lg:text-6xl font-semibold text-neutral-dark mb-4">
            Complete <span className="text-primary">Dental</span> Services
          </h1>
          <p className="text-neutral-mid text-lg max-w-2xl mx-auto">
            From routine care to advanced procedures, we offer a full range of
            dental services to keep your smile healthy and beautiful.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Link key={service.title} href={service.href} className="group">
                  <div className="bg-white rounded-xl border border-border p-6 transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 h-full">
                    <div className="h-12 w-12 rounded-xl bg-primary-pale flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                      <Icon className="h-6 w-6 text-primary group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                      {service.category}
                    </span>
                    <h3 className="text-lg font-semibold text-neutral-dark mt-1 mb-2 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-neutral-mid leading-relaxed mb-4">
                      {service.desc}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-primary">
                        {service.price}
                      </span>
                      <ArrowRight className="h-4 w-4 text-neutral-light group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-2xl lg:text-3xl font-semibold text-white mb-4">
            Ready to Start Your Dental Journey?
          </h2>
          <p className="text-white/80 mb-8 max-w-lg mx-auto">
            Book your appointment today and experience the Serene Dental
            difference.
          </p>
          <Button asChild size="xl" variant="accent">
            <Link href="/book-appointment">
              Book Your Appointment <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
