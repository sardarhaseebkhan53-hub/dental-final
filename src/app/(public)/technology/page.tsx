import { Metadata } from "next";
import { Cpu, Scan, Camera, Monitor, Zap, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Technology",
  description:
    "State-of-the-art dental technology at Serene Dental — digital X-rays, 3D imaging, laser dentistry, and more for precise, comfortable care.",
};

const technologies = [
  {
    icon: Scan,
    title: "Digital X-Rays",
    desc: "Low-radiation digital imaging for instant, high-quality diagnostic images with 90% less radiation than traditional X-rays.",
  },
  {
    icon: Camera,
    title: "Intraoral Cameras",
    desc: "Tiny HD cameras that give you a real-time view inside your mouth, helping you understand your treatment needs.",
  },
  {
    icon: Cpu,
    title: "3D CBCT Scanning",
    desc: "Cone Beam CT technology provides detailed 3D images for precise implant planning, orthodontic assessment, and complex diagnostics.",
  },
  {
    icon: Zap,
    title: "Laser Dentistry",
    desc: "Advanced dental lasers for minimally invasive soft tissue procedures, faster healing, and reduced discomfort.",
  },
  {
    icon: Monitor,
    title: "CAD/CAM Technology",
    desc: "Same-day crowns and restorations using computer-aided design and manufacturing for perfect fits in a single visit.",
  },
  {
    icon: Shield,
    title: "Sterilization Center",
    desc: "Hospital-grade sterilization protocols with biological monitoring to ensure the highest safety standards.",
  },
];

export default function TechnologyPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary-pale to-white py-20">
        <div className="container mx-auto px-4 text-center">
          <span className="text-sm font-semibold text-accent uppercase tracking-widest mb-3 block">
            Technology
          </span>
          <h1 className="font-display text-4xl lg:text-6xl font-semibold text-neutral-dark mb-4">
            Advanced <span className="text-primary">Technology</span>
          </h1>
          <p className="text-neutral-mid text-lg max-w-2xl mx-auto">
            We invest in the latest dental technology to deliver precise
            diagnoses, comfortable treatments, and outstanding results.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {technologies.map((tech) => {
              const Icon = tech.icon;
              return (
                <div key={tech.title} className="text-center">
                  <div className="h-16 w-16 rounded-2xl bg-primary-pale flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-dark mb-2">
                    {tech.title}
                  </h3>
                  <p className="text-sm text-neutral-mid leading-relaxed">
                    {tech.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
