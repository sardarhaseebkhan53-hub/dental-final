import { Metadata } from "next";
import { Phone, Clock, MapPin, AlertTriangle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CLINIC_INFO } from "@/lib/constants";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Emergency Dental Care",
  description:
    "24/7 emergency dental care at Serene Dental Clinic. Get immediate help for dental emergencies including severe pain, knocked-out teeth, and more.",
};

export default function EmergencyPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-error-light to-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-error/10 text-error rounded-full px-4 py-2 mb-6 animate-pulse">
            <AlertTriangle className="h-4 w-4" />
            <span className="text-sm font-semibold">Dental Emergency</span>
          </div>
          <h1 className="font-display text-4xl lg:text-6xl font-semibold text-neutral-dark mb-4">
            Emergency <span className="text-error">Dental Care</span>
          </h1>
          <p className="text-neutral-mid text-lg max-w-2xl mx-auto mb-8">
            Don&apos;t wait in pain. Our emergency team is available 24/7 to
            provide immediate relief and expert care.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="xl" variant="destructive">
              <a href={`tel:${CLINIC_INFO.emergencyPhone}`}>
                <Phone className="h-5 w-5" />
                Call Now: {CLINIC_INFO.emergencyPhone}
              </a>
            </Button>
            <Button asChild size="xl" variant="accent">
              <Link href="/book-appointment">
                Book Emergency Visit <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-2xl font-semibold text-neutral-dark mb-8 text-center">
            Common Dental Emergencies
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                title: "Severe Toothache",
                desc: "Persistent or intense tooth pain that doesn't respond to over-the-counter medication.",
                action:
                  "Rinse with warm salt water, take ibuprofen, and call us immediately.",
              },
              {
                title: "Knocked-Out Tooth",
                desc: "A tooth that has been completely knocked out due to trauma.",
                action:
                  "Place the tooth in milk, handle by the crown only, and see us within 30 minutes.",
              },
              {
                title: "Broken Tooth",
                desc: "A cracked, chipped, or fractured tooth.",
                action:
                  "Rinse with warm water, apply a cold compress, and save any broken pieces.",
              },
              {
                title: "Lost Filling or Crown",
                desc: "A filling or crown that has fallen out.",
                action:
                  "Keep the area clean, avoid chewing on that side, and schedule an urgent visit.",
              },
              {
                title: "Dental Abscess",
                desc: "A painful infection that can cause swelling, fever, and sensitivity.",
                action:
                  "Rinse with salt water, don't pop the abscess, and seek immediate care.",
              },
              {
                title: "Uncontrolled Bleeding",
                desc: "Bleeding from the mouth that won't stop after 15 minutes.",
                action:
                  "Apply gentle pressure with gauze, and come to our clinic immediately.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-surface-alt rounded-xl p-6 border border-border"
              >
                <h3 className="font-semibold text-neutral-dark mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-neutral-mid mb-3">{item.desc}</p>
                <div className="bg-white rounded-lg p-3 border border-border">
                  <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">
                    What to do
                  </p>
                  <p className="text-xs text-neutral-mid">{item.action}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-primary">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6 text-white">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              <span className="font-semibold">
                {CLINIC_INFO.emergencyPhone}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span>24/7 Emergency Line</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              <span>{CLINIC_INFO.address.street}</span>
            </div>
          </div>
          <Button asChild size="lg" variant="accent">
            <a href={`tel:${CLINIC_INFO.emergencyPhone}`}>Call Now</a>
          </Button>
        </div>
      </section>
    </>
  );
}
