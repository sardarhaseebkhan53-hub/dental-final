import { Metadata } from "next";
import Link from "next/link";
import { NAVIGATION } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Sitemap",
  description: "Complete sitemap of Serene Dental Clinic website.",
};

export default function SitemapPage() {
  const allLinks = [
    ...NAVIGATION.main.flatMap((item) => [item, ...(item.children || [])]),
    ...NAVIGATION.footer.services,
    ...NAVIGATION.footer.company,
    ...NAVIGATION.footer.patients,
    ...NAVIGATION.footer.legal,
  ];
  const uniqueLinks = allLinks.filter(
    (link, index, self) =>
      index === self.findIndex((l) => l.href === link.href),
  );

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="font-display text-4xl font-semibold text-neutral-dark mb-8">
          Sitemap
        </h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {uniqueLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block p-3 rounded-lg hover:bg-surface-alt transition-colors text-sm text-neutral-mid hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
