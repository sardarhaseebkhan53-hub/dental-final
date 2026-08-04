"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const galleryItems = [
  {
    title: "Modern Reception",
    category: "Clinic",
    image:
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Treatment Suite",
    category: "Clinic",
    image:
      "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Smile Transformation",
    category: "Results",
    image:
      "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Advanced Technology",
    category: "Technology",
    image:
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Patient Lounge",
    category: "Clinic",
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Our Expert Team",
    category: "Team",
    image:
      "https://images.unsplash.com/photo-1550831107-1553da8c8464?auto=format&fit=crop&w=900&q=80",
  },
];

export function GallerySection() {
  return (
    <section className="bg-white py-20 lg:py-28" id="gallery">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <span className="mb-3 block text-sm font-semibold uppercase tracking-widest text-accent">
            Gallery
          </span>
          <h2 className="mb-4 font-display text-3xl font-extrabold tracking-tight text-neutral-dark lg:text-5xl">
            Our <span className="text-primary">State-of-the-Art</span> Facility
          </h2>
          <p className="text-lg text-neutral-mid">
            A warmer look at the rooms, tools, and people that make every visit
            feel comfortable and premium.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-6 lg:gap-6">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className={`group relative overflow-hidden rounded-3xl bg-primary-900 shadow-card ${
                index === 0 || index === 5
                  ? "col-span-2 row-span-2 aspect-[4/5] lg:col-span-2"
                  : "col-span-2 aspect-[4/3] lg:col-span-2"
              }`}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(min-width: 1024px) 33vw, 50vw"
                className="object-cover transition duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 via-primary-900/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 lg:p-6">
                <div className="text-white">
                  <span className="text-xs font-semibold uppercase tracking-wider text-accent-light">
                    {item.category}
                  </span>
                  <h3 className="mt-1 text-base font-bold lg:text-lg">
                    {item.title}
                  </h3>
                </div>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur transition-all group-hover:translate-x-0 group-hover:opacity-100">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
