import { Metadata } from "next";
import Link from "next/link";
import { Star, Globe, GraduationCap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const metadata: Metadata = {
  title: "Our Doctors",
  description:
    "Meet our team of board-certified dental specialists at Serene Dental Clinic. Expert dentists with decades of combined experience.",
};

const doctors = [
  {
    name: "Dr. Sarah Mitchell",
    title: "Lead Dentist & Founder",
    specialization: "Cosmetic & Implant Specialist",
    experience: "20+ years",
    rating: 4.9,
    reviews: 180,
    languages: ["English", "Spanish"],
    education: "Harvard School of Dental Medicine",
    initials: "SM",
    bio: "Dr. Mitchell is a renowned cosmetic dentist with over 20 years of experience. She specializes in dental implants, veneers, and complete smile makeovers.",
  },
  {
    name: "Dr. James Chen",
    title: "Orthodontist",
    specialization: "Invisalign Gold Provider",
    experience: "15+ years",
    rating: 4.8,
    reviews: 145,
    languages: ["English", "Mandarin"],
    education: "UCSF School of Dentistry",
    initials: "JC",
    bio: "Dr. Chen is an Invisalign Gold Provider with expertise in orthodontics for adults and teens. He uses the latest digital planning technology.",
  },
  {
    name: "Dr. Emily Rodriguez",
    title: "Pediatric Dentist",
    specialization: "Child-Friendly Specialist",
    experience: "10+ years",
    rating: 4.9,
    reviews: 120,
    languages: ["English", "Spanish", "Portuguese"],
    education: "Columbia University",
    initials: "ER",
    bio: "Dr. Rodriguez creates a warm, fun environment for children. She specializes in preventive care, early orthodontic intervention, and pediatric sedation.",
  },
  {
    name: "Dr. Michael Thompson",
    title: "Oral Surgeon",
    specialization: "Complex Procedures",
    experience: "18+ years",
    rating: 4.9,
    reviews: 160,
    languages: ["English"],
    education: "Johns Hopkins School of Medicine",
    initials: "MT",
    bio: "Dr. Thompson is a board-certified oral surgeon specializing in wisdom teeth extraction, dental implants, and corrective jaw surgery.",
  },
  {
    name: "Dr. Priya Sharma",
    title: "Periodontist",
    specialization: "Gum Disease Specialist",
    experience: "12+ years",
    rating: 4.8,
    reviews: 95,
    languages: ["English", "Hindi"],
    education: "NYU College of Dentistry",
    initials: "PS",
    bio: "Dr. Sharma specializes in treating gum disease, performing gum grafts, and placing dental implants with a focus on minimally invasive techniques.",
  },
  {
    name: "Dr. David Park",
    title: "Endodontist",
    specialization: "Root Canal Specialist",
    experience: "14+ years",
    rating: 4.9,
    reviews: 110,
    languages: ["English", "Korean"],
    education: "University of Pennsylvania",
    initials: "DP",
    bio: "Dr. Park uses the latest microscopic techniques to perform virtually painless root canal treatments and save natural teeth.",
  },
];

export default function DoctorsPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary-pale to-white py-20">
        <div className="container mx-auto px-4 text-center">
          <span className="text-sm font-semibold text-accent uppercase tracking-widest mb-3 block">
            Our Team
          </span>
          <h1 className="font-display text-4xl lg:text-6xl font-semibold text-neutral-dark mb-4">
            Meet Our <span className="text-primary">Expert</span> Team
          </h1>
          <p className="text-neutral-mid text-lg max-w-2xl mx-auto">
            Our team of board-certified specialists brings decades of combined
            experience to deliver exceptional care in every aspect of dentistry.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors.map((doctor) => (
              <div
                key={doctor.name}
                id={doctor.name
                  .toLowerCase()
                  .replace(/[^a-z]/g, "-")
                  .replace(/-+/g, "-")}
                className="group bg-white rounded-xl border border-border overflow-hidden hover:shadow-card-hover transition-all"
              >
                <div className="h-48 bg-gradient-to-br from-primary-pale to-accent-light/20 flex items-center justify-center">
                  <Avatar className="h-24 w-24">
                    <AvatarFallback className="text-2xl bg-primary text-white font-display">
                      {doctor.initials}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-neutral-dark group-hover:text-primary transition-colors">
                      {doctor.name}
                    </h3>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-accent fill-accent" />
                      <span className="text-sm font-semibold">
                        {doctor.rating}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-primary font-medium">
                    {doctor.title}
                  </p>
                  <p className="text-xs text-neutral-light mt-1">
                    {doctor.specialization} • {doctor.experience}
                  </p>
                  <p className="text-sm text-neutral-mid mt-3 leading-relaxed">
                    {doctor.bio}
                  </p>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-neutral-mid">
                      <GraduationCap className="h-3.5 w-3.5 text-primary" />
                      {doctor.education}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-neutral-mid">
                      <Globe className="h-3.5 w-3.5 text-primary" />
                      {doctor.languages.join(", ")}
                    </div>
                  </div>
                  <Button asChild className="w-full mt-4" variant="secondary">
                    <Link href="/book-appointment">
                      Book with {doctor.name.split(" ")[1]}{" "}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
