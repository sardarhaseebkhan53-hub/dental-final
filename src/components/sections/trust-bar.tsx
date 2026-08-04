"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Award, Heart, Star } from "lucide-react";
import { STATS } from "@/lib/constants";

function AnimatedCounter({
  end,
  suffix = "",
  duration = 2,
}: {
  end: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const increment = end / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

const stats = [
  {
    icon: Award,
    value: STATS.yearsExperience,
    suffix: "+",
    label: "Years of Excellence",
    color: "text-primary",
    bg: "bg-primary-pale",
  },
  {
    icon: Users,
    value: STATS.patientsServed,
    suffix: "+",
    label: "Patients Served",
    color: "text-accent-700",
    bg: "bg-accent-light",
  },
  {
    icon: Heart,
    value: STATS.satisfactionRate,
    suffix: "%",
    label: "Patient Satisfaction",
    color: "text-success",
    bg: "bg-success-light",
  },
  {
    icon: Star,
    value: STATS.specialists,
    suffix: "+",
    label: "Expert Specialists",
    color: "text-warning",
    bg: "bg-warning-light",
  },
];

export function TrustBar() {
  return (
    <section className="py-16 lg:py-20 bg-white border-y border-border/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div
                  className={`h-14 w-14 rounded-xl ${stat.bg} flex items-center justify-center mx-auto mb-4`}
                >
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <p className="font-display text-3xl lg:text-4xl font-semibold text-neutral-dark mb-1">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-sm text-neutral-mid">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
