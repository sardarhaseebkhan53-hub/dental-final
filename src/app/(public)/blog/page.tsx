import { Metadata } from "next";
import Link from "next/link";
import { Calendar, Clock, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Stay informed with the latest dental health tips, news, and insights from the experts at Serene Dental Clinic.",
};

const posts = [
  {
    slug: "importance-regular-dental-checkups",
    title: "The Importance of Regular Dental Checkups",
    excerpt:
      "Regular dental visits are crucial for maintaining optimal oral health. Learn why you should schedule checkups every 6 months.",
    category: "Preventive Care",
    author: "Dr. Sarah Mitchell",
    date: "Aug 1, 2026",
    readTime: "5 min",
    featured: true,
  },
  {
    slug: "teeth-whitening-guide",
    title: "Complete Guide to Professional Teeth Whitening",
    excerpt:
      "Everything you need to know about professional teeth whitening — from the process to results and aftercare tips.",
    category: "Cosmetic",
    author: "Dr. Sarah Mitchell",
    date: "Jul 25, 2026",
    readTime: "8 min",
    featured: false,
  },
  {
    slug: "invisalign-vs-braces",
    title: "Invisalign vs Traditional Braces: Which Is Right for You?",
    excerpt:
      "Compare the pros and cons of Invisalign and traditional braces to make an informed decision about your orthodontic treatment.",
    category: "Orthodontics",
    author: "Dr. James Chen",
    date: "Jul 18, 2026",
    readTime: "7 min",
    featured: false,
  },
  {
    slug: "dental-anxiety-tips",
    title: "Overcoming Dental Anxiety: Tips for a Stress-Free Visit",
    excerpt:
      "Dental anxiety affects millions of people. Discover proven strategies to make your next dental visit calm and comfortable.",
    category: "Patient Care",
    author: "Dr. Emily Rodriguez",
    date: "Jul 10, 2026",
    readTime: "6 min",
    featured: false,
  },
  {
    slug: "dental-implant-process",
    title: "What to Expect During the Dental Implant Process",
    excerpt:
      "A step-by-step guide to the dental implant process, from initial consultation to final restoration.",
    category: "Implants",
    author: "Dr. Michael Thompson",
    date: "Jul 3, 2026",
    readTime: "10 min",
    featured: false,
  },
  {
    slug: "kids-dental-health",
    title: "A Parent's Guide to Children's Dental Health",
    excerpt:
      "Essential tips for maintaining your child's dental health from infancy through the teenage years.",
    category: "Pediatric",
    author: "Dr. Emily Rodriguez",
    date: "Jun 25, 2026",
    readTime: "6 min",
    featured: false,
  },
];

export default function BlogPage() {
  const featured = posts.find((p) => p.featured);
  const regular = posts.filter((p) => !p.featured);

  return (
    <>
      <section className="bg-gradient-to-br from-primary-pale to-white py-20">
        <div className="container mx-auto px-4 text-center">
          <span className="text-sm font-semibold text-accent uppercase tracking-widest mb-3 block">
            Blog
          </span>
          <h1 className="font-display text-4xl lg:text-6xl font-semibold text-neutral-dark mb-4">
            Dental <span className="text-primary">Health</span> Insights
          </h1>
          <p className="text-neutral-mid text-lg max-w-2xl mx-auto">
            Expert tips, news, and insights to help you maintain a healthy,
            beautiful smile.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {/* Featured Post */}
          {featured && (
            <Link href={`/blog/${featured.slug}`} className="group block mb-12">
              <div className="bg-gradient-to-r from-primary to-primary-light rounded-2xl p-8 lg:p-12 text-white">
                <Badge variant="accent" className="mb-4">
                  Featured
                </Badge>
                <h2 className="font-display text-2xl lg:text-4xl font-semibold mb-4 group-hover:text-accent-light transition-colors">
                  {featured.title}
                </h2>
                <p className="text-white/80 text-lg mb-6 max-w-2xl">
                  {featured.excerpt}
                </p>
                <div className="flex items-center gap-6 text-sm text-white/70">
                  <span className="flex items-center gap-1.5">
                    <User className="h-4 w-4" />
                    {featured.author}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    {featured.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    {featured.readTime} read
                  </span>
                </div>
              </div>
            </Link>
          )}

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regular.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group"
              >
                <article className="bg-white rounded-xl border border-border overflow-hidden hover:shadow-card-hover transition-all h-full flex flex-col">
                  <div className="h-48 bg-gradient-to-br from-primary-pale to-accent-light/20" />
                  <div className="p-5 flex-1 flex flex-col">
                    <Badge variant="default" className="w-fit mb-3">
                      {post.category}
                    </Badge>
                    <h3 className="font-semibold text-neutral-dark group-hover:text-primary transition-colors mb-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-neutral-mid leading-relaxed flex-1">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border text-xs text-neutral-light">
                      <span>{post.author}</span>
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
