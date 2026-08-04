import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Stethoscope,
  Sparkles,
  AlignCenter,
  Baby,
  Scissors,
  AlertTriangle,
  ShieldCheck,
  RefreshCw,
  Clock,
  DollarSign,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ServiceDetail {
  slug: string;
  icon: typeof Stethoscope;
  title: string;
  category: string;
  price: string;
  duration: string;
  description: string;
  overview: string[];
  benefits: string[];
  process: { title: string; description: string }[];
}

const serviceCatalog: ServiceDetail[] = [
  {
    slug: "general-dentistry",
    icon: Stethoscope,
    title: "General Dentistry",
    category: "General",
    price: "From $150",
    duration: "30–60 min",
    description:
      "Comprehensive dental care including cleanings, fillings, and preventive treatments to maintain your oral health.",
    overview: [
      "Our general dentistry services form the foundation of lifelong oral health. From routine examinations and professional cleanings to tooth-colored fillings and gum care, we combine clinical excellence with a calm, judgment-free environment.",
      "Every general visit starts with a thorough assessment, digital X-rays when needed, and a personalized prevention plan so small issues never become major problems.",
    ],
    benefits: [
      "Comprehensive oral examinations with digital diagnostics",
      "Professional cleanings and fluoride treatments",
      "Tooth-colored composite fillings",
      "Personalized preventive care plans",
    ],
    process: [
      {
        title: "Examination",
        description:
          "A detailed assessment of your teeth, gums, and bite, with digital X-rays if required.",
      },
      {
        title: "Cleaning & Prevention",
        description:
          "Gentle plaque and tartar removal, polishing, and a tailored home-care routine.",
      },
      {
        title: "Treatment Plan",
        description:
          "If treatment is needed, we explain every option and cost upfront — no surprises.",
      },
    ],
  },
  {
    slug: "cosmetic-dentistry",
    icon: Sparkles,
    title: "Cosmetic Dentistry",
    category: "Cosmetic",
    price: "From $350",
    duration: "60–120 min",
    description:
      "Transform your smile with veneers, whitening, bonding, and complete smile makeovers.",
    overview: [
      "A beautiful smile is one of the most powerful confidence tools you can own. Our cosmetic dentistry services combine artistry with advanced materials to create natural-looking, lasting results.",
      "From subtle enhancements to full smile makeovers, every treatment is planned digitally so you can preview your new smile before we begin.",
    ],
    benefits: [
      "Porcelain veneers and smile makeovers",
      "Professional in-office teeth whitening",
      "Cosmetic bonding and contouring",
      "Digital smile design previews",
    ],
    process: [
      {
        title: "Smile Consultation",
        description:
          "We listen to your goals, analyze your facial proportions, and design your ideal smile digitally.",
      },
      {
        title: "Preparation",
        description:
          "Minimally invasive preparation ensures a natural look while preserving your natural tooth structure.",
      },
      {
        title: "Placement & Polish",
        description:
          "Your new smile is crafted, fitted, and perfected with meticulous attention to detail.",
      },
    ],
  },
  {
    slug: "orthodontics",
    icon: AlignCenter,
    title: "Orthodontics",
    category: "Orthodontics",
    price: "From $3,500",
    duration: "30 min consult",
    description:
      "Straighter teeth with Invisalign, clear aligners, and traditional braces for all ages.",
    overview: [
      "Whether you prefer discreet clear aligners or traditional braces, our orthodontic program is designed around your lifestyle and goals.",
      "Using 3D digital scanning and treatment simulation, we map every movement of your teeth so you know exactly what to expect — and how long it will take.",
    ],
    benefits: [
      "Invisalign and clear aligner therapy",
      "Traditional and ceramic braces",
      "3D digital treatment simulation",
      "Teen and adult orthodontic programs",
    ],
    process: [
      {
        title: "Digital Scan",
        description:
          "A comfortable 3D scan replaces messy impressions and shows your predicted results instantly.",
      },
      {
        title: "Treatment Plan",
        description:
          "We map the full movement sequence and provide a clear timeline and cost estimate.",
      },
      {
        title: "Active Treatment",
        description:
          "Regular short visits keep treatment on track while you go about your daily life.",
      },
    ],
  },
  {
    slug: "dental-implants",
    icon: Scissors,
    title: "Dental Implants",
    category: "Restorative",
    price: "From $3,000",
    duration: "60–120 min",
    description:
      "Permanent tooth replacement with state-of-the-art implant technology for a natural-looking smile.",
    overview: [
      "Dental implants are the gold standard for replacing missing teeth — a permanent solution that looks, feels, and functions like a natural tooth.",
      "Using 3D-guided placement and premium implant systems, we restore single teeth, multiple teeth, or full arches with predictable, long-lasting results.",
    ],
    benefits: [
      "3D-guided, precision implant placement",
      "Single, multiple, and full-arch restorations",
      "Bone grafting when additional support is needed",
      "Lifetime-focused, durable materials",
    ],
    process: [
      {
        title: "Consultation & 3D Scan",
        description:
          "We assess bone structure digitally to plan the ideal implant position.",
      },
      {
        title: "Implant Placement",
        description:
          "The titanium implant is placed gently under local anesthesia.",
      },
      {
        title: "Final Restoration",
        description:
          "After healing, a custom crown is attached for a seamless, natural result.",
      },
    ],
  },
  {
    slug: "teeth-whitening",
    icon: Sparkles,
    title: "Teeth Whitening",
    category: "Cosmetic",
    price: "From $350",
    duration: "60 min",
    description:
      "Professional in-office and take-home whitening options for a brighter, whiter smile.",
    overview: [
      "Professional whitening delivers dramatically brighter results than over-the-counter products — safely, comfortably, and in a single visit.",
      "We offer both in-office power whitening and custom take-home kits, so you can choose the option that fits your schedule and sensitivity level.",
    ],
    benefits: [
      "In-office power whitening in about one hour",
      "Custom-fitted take-home trays",
      "Sensitivity-minimizing protocols",
      "Longer-lasting results than OTC strips",
    ],
    process: [
      {
        title: "Shade Assessment",
        description:
          "We record your starting shade and discuss your target brightness.",
      },
      {
        title: "Whitening Session",
        description:
          "A professional-grade gel is applied with light activation for maximum effect.",
      },
      {
        title: "Aftercare",
        description:
          "We provide simple guidelines to keep your smile bright for years.",
      },
    ],
  },
  {
    slug: "pediatric-dentistry",
    icon: Baby,
    title: "Pediatric Dentistry",
    category: "Pediatric",
    price: "From $120",
    duration: "30 min",
    description:
      "Gentle, child-friendly dental care in a comfortable environment designed for little ones.",
    overview: [
      "We make dental visits fun, friendly, and fear-free for children. Our team specializes in helping kids build healthy habits that last a lifetime.",
      "From first teeth to teenage years, we provide gentle checkups, protective sealants, fluoride treatments, and early orthodontic guidance.",
    ],
    benefits: [
      "Gentle, child-centered examinations",
      "Dental sealants and fluoride treatments",
      "Early cavity detection and treatment",
      "Positive, educational first visits",
    ],
    process: [
      {
        title: "First Visit",
        description:
          "A fun, short introduction to the dental chair with a gentle exam and cleaning.",
      },
      {
        title: "Prevention",
        description:
          "Sealants and fluoride help protect developing teeth from decay.",
      },
      {
        title: "Growth Monitoring",
        description:
          "We track jaw and teeth development to time any orthodontic care perfectly.",
      },
    ],
  },
  {
    slug: "emergency-care",
    icon: AlertTriangle,
    title: "Emergency Care",
    category: "Emergency",
    price: "From $200",
    duration: "45 min",
    description:
      "24/7 emergency dental services for toothaches, trauma, infections, and urgent dental needs.",
    overview: [
      "Dental emergencies don't wait — and neither do we. Our team is available around the clock for severe pain, trauma, swelling, and broken teeth.",
      "Call us immediately for guidance; in many cases we can relieve your pain the same day and protect the tooth from permanent damage.",
    ],
    benefits: [
      "24/7 emergency phone triage",
      "Same-day appointments for urgent cases",
      "Treatment for pain, trauma, and infections",
      "Emergency tooth preservation techniques",
    ],
    process: [
      {
        title: "Call Us",
        description:
          "Describe your symptoms and we'll tell you exactly what to do next.",
      },
      {
        title: "Same-Day Care",
        description:
          "We see urgent cases promptly to relieve pain and stabilize the situation.",
      },
      {
        title: "Follow-Up Plan",
        description:
          "Restorative treatment is scheduled once the emergency is under control.",
      },
    ],
  },
  {
    slug: "preventive-care",
    icon: ShieldCheck,
    title: "Preventive Care",
    category: "Preventive",
    price: "From $120",
    duration: "30–45 min",
    description:
      "Regular check-ups, professional cleanings, and personalized prevention plans.",
    overview: [
      "Prevention is always better — and cheaper — than treatment. Our preventive program is built around six-month checkups, professional cleanings, and education tailored to your unique risks.",
      "Early detection of decay, gum disease, and oral cancer means simpler, less invasive treatment and better long-term outcomes.",
    ],
    benefits: [
      "Comprehensive six-month examinations",
      "Ultrasonic professional cleanings",
      "Oral cancer screenings",
      "Personalized home-care coaching",
    ],
    process: [
      {
        title: "Check-Up",
        description:
          "We examine every tooth, your gums, and soft tissues for early warning signs.",
      },
      {
        title: "Professional Cleaning",
        description:
          "Tartar and stain removal leaves your mouth fresh and your gums healthy.",
      },
      {
        title: "Prevention Plan",
        description:
          "You leave with a clear, practical routine for the next six months.",
      },
    ],
  },
  {
    slug: "root-canal",
    icon: RefreshCw,
    title: "Root Canal Therapy",
    category: "Endodontics",
    price: "From $800",
    duration: "90 min",
    description:
      "Pain-free root canal treatments using advanced technology to save your natural teeth.",
    overview: [
      "Modern root canal therapy is virtually painless — and it saves teeth that would otherwise be lost. Using rotary instruments and digital imaging, we remove infection with precision and comfort.",
      "After treatment, your tooth is restored with a crown so it remains strong and functional for decades.",
    ],
    benefits: [
      "Pain-free, single-visit treatment options",
      "Digital imaging for precise canal mapping",
      "Preserves your natural tooth",
      "Gentle, anxiety-reducing techniques",
    ],
    process: [
      {
        title: "Diagnosis",
        description:
          "Digital X-rays and sensitivity tests identify the source of the problem.",
      },
      {
        title: "Treatment",
        description:
          "Infected tissue is removed, canals are disinfected, and the tooth is sealed.",
      },
      {
        title: "Restoration",
        description:
          "A crown protects the treated tooth and restores full chewing function.",
      },
    ],
  },
  {
    slug: "gum-treatment",
    icon: ShieldCheck,
    title: "Gum Treatment",
    category: "Periodontics",
    price: "From $500",
    duration: "60 min",
    description:
      "Advanced periodontal therapy to treat gum disease and restore gum health.",
    overview: [
      "Gum disease is the leading cause of adult tooth loss — yet it's highly treatable when caught early. Our periodontal therapy ranges from deep cleanings to laser-assisted treatment.",
      "Healthy gums are the foundation of a healthy smile. We'll help you stop bleeding gums, recession, and bad breath at the source.",
    ],
    benefits: [
      "Scaling and root planing (deep cleaning)",
      "Laser-assisted gum therapy",
      "Gum disease monitoring programs",
      "Bad-breath and recession treatment",
    ],
    process: [
      {
        title: "Gum Assessment",
        description:
          "Periodontal probing and digital records map the health of your gums.",
      },
      {
        title: "Deep Cleaning",
        description:
          "Tartar below the gumline is removed and root surfaces are smoothed.",
      },
      {
        title: "Maintenance",
        description:
          "Regular supportive care keeps gum disease from returning.",
      },
    ],
  },
  {
    slug: "oral-surgery",
    icon: Scissors,
    title: "Oral Surgery",
    category: "Surgery",
    price: "From $400",
    duration: "45–120 min",
    description:
      "Expert surgical procedures including extractions, wisdom teeth removal, and jaw surgery.",
    overview: [
      "Our surgical team performs everything from simple extractions to complex wisdom tooth removal — with comfort, precision, and clear communication at every step.",
      "Advanced anesthesia options and minimally invasive techniques keep recovery as smooth as possible.",
    ],
    benefits: [
      "Wisdom tooth removal",
      "Complex and surgical extractions",
      "Bone grafting and ridge preservation",
      "Comfortable sedation options",
    ],
    process: [
      {
        title: "Consultation & Imaging",
        description:
          "A 3D assessment ensures safe, predictable surgical planning.",
      },
      {
        title: "Procedure",
        description:
          "The surgery is performed comfortably with local anesthesia or sedation.",
      },
      {
        title: "Recovery",
        description:
          "Clear aftercare instructions minimize downtime and speed healing.",
      },
    ],
  },
  {
    slug: "crowns",
    icon: RefreshCw,
    title: "Dental Crowns",
    category: "Restorative",
    price: "From $1,200",
    duration: "60 min",
    description:
      "Custom-made crowns and bridges to restore damaged or missing teeth.",
    overview: [
      "Crowns restore teeth that are cracked, heavily filled, or weakened — protecting them and bringing back natural function and appearance.",
      "With same-day CAD/CAM technology, many crowns are designed, milled, and placed in a single visit.",
    ],
    benefits: [
      "Same-day CAD/CAM crowns",
      "Natural ceramic and zirconia materials",
      "Crowns and tooth-colored bridges",
      "Long-lasting, stain-resistant restorations",
    ],
    process: [
      {
        title: "Tooth Preparation",
        description:
          "The tooth is shaped precisely to receive the crown.",
      },
      {
        title: "Digital Design",
        description:
          "A 3D scan designs your restoration to match your natural bite and shade.",
      },
      {
        title: "Placement",
        description:
          "Your crown is fitted, adjusted, and cemented in the same visit.",
      },
    ],
  },
];

export function generateStaticParams() {
  return serviceCatalog.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceCatalog.find((s) => s.slug === slug);
  if (!service) return { title: "Service Not Found" };
  return {
    title: service.title,
    description: service.description,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = serviceCatalog.find((s) => s.slug === slug);

  if (!service) notFound();

  const Icon = service.icon;

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-pale to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <Badge variant="primary" className="mb-4">
              {service.category}
            </Badge>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-14 w-14 rounded-2xl bg-primary flex items-center justify-center">
                <Icon className="h-7 w-7 text-white" />
              </div>
              <h1 className="font-display text-4xl lg:text-5xl font-semibold text-neutral-dark">
                {service.title}
              </h1>
            </div>
            <p className="text-lg text-neutral-mid leading-relaxed">
              {service.description}
            </p>
            <div className="flex flex-wrap gap-4 mt-6">
              <Badge variant="muted" className="px-3 py-1.5">
                <Clock className="h-3.5 w-3.5 mr-1.5" /> {service.duration}
              </Badge>
              <Badge variant="muted" className="px-3 py-1.5">
                <DollarSign className="h-3.5 w-3.5 mr-1.5" /> {service.price}
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-6">
              <h2 className="font-display text-2xl font-semibold text-neutral-dark">
                Overview
              </h2>
              {service.overview.map((paragraph, index) => (
                <p key={index} className="text-neutral-mid leading-relaxed">
                  {paragraph}
                </p>
              ))}

              <h2 className="font-display text-2xl font-semibold text-neutral-dark pt-4">
                What&apos;s Included
              </h2>
              <ul className="grid sm:grid-cols-2 gap-3">
                {service.benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-start gap-2 text-sm text-neutral-mid"
                  >
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              <div className="bg-surface-alt rounded-2xl border border-border p-6">
                <h3 className="font-semibold text-neutral-dark mb-4">
                  What to Expect
                </h3>
                <ol className="space-y-4">
                  {service.process.map((step, index) => (
                    <li key={step.title} className="flex gap-3">
                      <span className="h-7 w-7 rounded-full bg-primary-pale text-primary text-xs font-bold flex items-center justify-center shrink-0">
                        {index + 1}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-neutral-dark">
                          {step.title}
                        </p>
                        <p className="text-xs text-neutral-mid leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="bg-primary rounded-2xl p-6 text-center">
                <h3 className="text-white font-semibold mb-2">
                  Ready to book?
                </h3>
                <p className="text-white/80 text-sm mb-5">
                  Schedule your {service.title.toLowerCase()} appointment
                  today.
                </p>
                <Button asChild variant="accent" className="w-full">
                  <Link href="/book-appointment">
                    Book Appointment <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Other services CTA */}
      <section className="py-16 bg-primary-pale/40">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-2xl lg:text-3xl font-semibold text-neutral-dark mb-3">
            Explore More Services
          </h2>
          <p className="text-neutral-mid mb-8 max-w-lg mx-auto">
            From routine checkups to complete smile transformations, we&apos;ve
            got you covered.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link href="/services">
              View All Services <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
