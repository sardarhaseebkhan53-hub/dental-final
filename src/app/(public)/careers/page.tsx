import { Metadata } from "next";
import { MapPin, Clock, Briefcase, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join the Serene Dental team. Explore career opportunities in a premium dental clinic that values excellence, innovation, and compassion.",
};

const positions = [
  {
    title: "Dental Hygienist",
    department: "Clinical",
    type: "Full-time",
    location: "San Francisco, CA",
    description:
      "Join our clinical team to provide exceptional preventive dental care and patient education.",
  },
  {
    title: "Front Desk Coordinator",
    department: "Administration",
    type: "Full-time",
    location: "San Francisco, CA",
    description:
      "Be the first point of contact for our patients. Manage scheduling, check-ins, and patient communications.",
  },
  {
    title: "Dental Assistant",
    department: "Clinical",
    type: "Full-time",
    location: "San Francisco, CA",
    description:
      "Assist our dentists during procedures, prepare treatment rooms, and ensure patient comfort.",
  },
  {
    title: "Marketing Coordinator",
    department: "Marketing",
    type: "Part-time",
    location: "San Francisco, CA / Remote",
    description:
      "Help grow our brand presence through digital marketing, social media, and community outreach.",
  },
];

export default function CareersPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary-pale to-white py-20">
        <div className="container mx-auto px-4 text-center">
          <span className="text-sm font-semibold text-accent uppercase tracking-widest mb-3 block">
            Careers
          </span>
          <h1 className="font-display text-4xl lg:text-6xl font-semibold text-neutral-dark mb-4">
            Join Our <span className="text-primary">Team</span>
          </h1>
          <p className="text-neutral-mid text-lg max-w-2xl mx-auto">
            Be part of a team that&apos;s transforming dental care. We offer
            competitive benefits, a positive work environment, and opportunities
            for growth.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-display text-2xl font-semibold text-neutral-dark mb-8">
            Open Positions
          </h2>
          <div className="space-y-4">
            {positions.map((pos) => (
              <div
                key={pos.title}
                className="bg-white rounded-xl border border-border p-6 hover:shadow-card-hover transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-dark">
                      {pos.title}
                    </h3>
                    <p className="text-sm text-neutral-mid mt-1 mb-3">
                      {pos.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-neutral-light">
                      <span className="flex items-center gap-1">
                        <Briefcase className="h-3.5 w-3.5" />
                        {pos.department}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {pos.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {pos.location}
                      </span>
                    </div>
                  </div>
                  <Button size="sm">
                    Apply <ArrowRight className="h-3 w-3" />
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
