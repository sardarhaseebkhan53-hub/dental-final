import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, User, ArrowLeft, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface BlogPostDetail {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  content: { heading: string; paragraphs: string[] }[];
}

const postCatalog: BlogPostDetail[] = [
  {
    slug: "importance-regular-dental-checkups",
    title: "The Importance of Regular Dental Checkups",
    excerpt:
      "Regular dental visits are crucial for maintaining optimal oral health. Learn why you should schedule checkups every 6 months.",
    category: "Preventive Care",
    author: "Dr. Sarah Mitchell",
    date: "Aug 1, 2026",
    readTime: "5 min",
    content: [
      {
        heading: "Why Twice a Year?",
        paragraphs: [
          "Most dental problems — cavities, gum disease, enamel wear — develop silently over months. By the time you feel pain, the issue is often advanced and treatment is more involved (and expensive). Regular six-month checkups let your dentist catch these problems while they're still small, simple, and inexpensive to treat.",
        ],
      },
      {
        heading: "More Than Just Cleaning",
        paragraphs: [
          "A professional cleaning removes plaque and tartar that brushing and flossing can't reach. But your checkup goes further: your dentist also screens for oral cancer, checks your bite, examines existing fillings, and reviews X-rays for issues below the gumline.",
        ],
      },
      {
        heading: "Your Smile, Your Health",
        paragraphs: [
          "Oral health is closely linked to overall health — gum disease has been associated with heart disease, diabetes, and other systemic conditions. Regular checkups are one of the simplest things you can do for both your smile and your body.",
        ],
      },
    ],
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
    content: [
      {
        heading: "What Is Professional Whitening?",
        paragraphs: [
          "Professional whitening uses higher-concentration whitening agents than anything available over the counter — applied safely by a dental professional who protects your gums and monitors sensitivity. The result is typically several shades brighter in a single visit.",
        ],
      },
      {
        heading: "In-Office vs. Take-Home",
        paragraphs: [
          "In-office power whitening delivers immediate, dramatic results in about an hour. Custom take-home trays offer flexibility and gradual, controlled whitening over one to two weeks. Many patients combine both for the best of each.",
        ],
      },
      {
        heading: "Aftercare for a Lasting Smile",
        paragraphs: [
          "To keep your results bright: avoid staining foods and drinks (coffee, red wine, berries) for the first 48 hours, maintain excellent brushing and flossing habits, and touch up with your take-home kit as needed. Whitening results typically last 6 to 24 months depending on your habits.",
        ],
      },
    ],
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
    content: [
      {
        heading: "Appearance and Comfort",
        paragraphs: [
          "Invisalign's clear aligners are nearly invisible and removable, making them popular with adults and teens. Traditional braces are more visible but highly effective for even the most complex cases, with modern low-profile options available.",
        ],
      },
      {
        heading: "Treatment Complexity",
        paragraphs: [
          "Both systems straighten teeth, but severe rotations, large bite corrections, or significant vertical movements may respond better to traditional braces. Your orthodontist will recommend the system that achieves your goals most predictably.",
        ],
      },
      {
        heading: "Lifestyle and Compliance",
        paragraphs: [
          "Invisalign requires discipline — aligners should be worn 20–22 hours per day. Braces work around the clock with no compliance burden. If you're confident you'll wear your aligners diligently, Invisalign is a fantastic option; otherwise braces may be the safer choice.",
        ],
      },
    ],
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
    content: [
      {
        heading: "You're Not Alone",
        paragraphs: [
          "Dental anxiety affects a large portion of the population. The first step is letting your dental team know — we're trained to help anxious patients feel safe, and we can adjust our approach accordingly.",
        ],
      },
      {
        heading: "Techniques That Help",
        paragraphs: [
          "Simple strategies make a big difference: schedule morning appointments when you're freshest, agree on a stop signal before treatment begins, bring headphones, and practice slow breathing. Many patients also benefit from nitrous oxide (laughing gas) or other relaxation options.",
        ],
      },
      {
        heading: "Build a Positive Routine",
        paragraphs: [
          "Short, gentle visits can help you rebuild trust in the dental chair. Ask for a walk-through of what will happen at each step — knowing what to expect removes most of the fear of the unknown.",
        ],
      },
    ],
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
    content: [
      {
        heading: "Step 1: Consultation and Planning",
        paragraphs: [
          "Your implant journey begins with a comprehensive exam and 3D imaging. We evaluate your bone structure, plan the ideal implant position, and give you a clear timeline and cost estimate before anything begins.",
        ],
      },
      {
        heading: "Step 2: Placement",
        paragraphs: [
          "The implant — a small titanium post — is placed into the jawbone under local anesthesia. The procedure is usually no more involved than a tooth extraction, and most patients return to normal activities within a day or two.",
        ],
      },
      {
        heading: "Step 3: Healing and Restoration",
        paragraphs: [
          "Over the next few months, the implant fuses with your bone (osseointegration). Once healed, we attach a custom crown that matches your natural teeth. The result is a permanent tooth replacement that looks, feels, and functions like the real thing.",
        ],
      },
    ],
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
    content: [
      {
        heading: "Start Early",
        paragraphs: [
          "Oral care begins before the first tooth appears — gently wipe your baby's gums after feedings. Once teeth erupt, brush twice daily with a rice-sized smear of fluoride toothpaste, and schedule their first dental visit by their first birthday.",
        ],
      },
      {
        heading: "Make It a Habit",
        paragraphs: [
          "Children thrive on routine. Brush together, use a fun timer, and let them pick their own toothbrush. Supervise brushing until about age 8 to make sure every surface is truly clean.",
        ],
      },
      {
        heading: "Protect and Prevent",
        paragraphs: [
          "Dental sealants and fluoride treatments provide powerful protection against cavities. Limit sugary snacks and drinks, avoid putting babies to bed with bottles, and keep regular six-month checkups — they set the foundation for a lifetime of healthy smiles.",
        ],
      },
    ],
  },
];

export function generateStaticParams() {
  return postCatalog.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = postCatalog.find((p) => p.slug === slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = postCatalog.find((p) => p.slug === slug);

  if (!post) notFound();

  const index = postCatalog.findIndex((p) => p.slug === slug);
  const nextPost = postCatalog[(index + 1) % postCatalog.length];

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-pale to-white py-16 lg:py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-700 mb-6"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>
          <Badge variant="primary" className="mb-4">
            {post.category}
          </Badge>
          <h1 className="font-display text-3xl lg:text-5xl font-semibold text-neutral-dark leading-tight mb-6">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-5 text-sm text-neutral-light">
            <span className="flex items-center gap-2">
              <User className="h-4 w-4" /> {post.author}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4" /> {post.date}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4" /> {post.readTime} read
            </span>
          </div>
        </div>
      </section>

      {/* Body */}
      <article className="py-14 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <p className="text-lg text-neutral-mid leading-relaxed mb-10 border-l-4 border-primary pl-5">
            {post.excerpt}
          </p>
          {post.content.map((section) => (
            <div key={section.heading} className="mb-10">
              <h2 className="font-display text-2xl font-semibold text-neutral-dark mb-4">
                {section.heading}
              </h2>
              {section.paragraphs.map((paragraph, i) => (
                <p key={i} className="text-neutral-mid leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          ))}

          <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-sm text-neutral-light mb-1">Next article</p>
              <p className="font-semibold text-neutral-dark">
                {nextPost.title}
              </p>
            </div>
            <Button asChild variant="secondary">
              <Link href={`/blog/${nextPost.slug}`}>
                Read Next <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </article>

      {/* CTA */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-2xl lg:text-3xl font-semibold text-white mb-3">
            Ready to Prioritize Your Smile?
          </h2>
          <p className="text-white/80 mb-8 max-w-lg mx-auto">
            Book an appointment with our expert team today.
          </p>
          <Button asChild size="lg" variant="accent">
            <Link href="/book-appointment">
              Book Appointment <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
