"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/lib/data";
import { cn } from "@/lib/utils";
import SectionHeading from "./SectionHeading";
import { scrollToHash } from "./Navbar";

export default function Services() {
  // The highlighted card follows the pointer and stays on the last one hovered.
  const [active, setActive] = useState(0);

  return (
    <section id="services" className="bg-ink-950 py-20 md:py-24">
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <SectionHeading
          title="My Services"
          subtitle="Bringing your ideas to life with fast, reliable, user-centric web products"
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {services.map((service, i) => {
            const isActive = active === i;
            return (
              <motion.a
                key={service.title}
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToHash("#contact");
                }}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, ease: "easeOut", delay: i * 0.06 }}
                className={cn(
                  "group relative block overflow-hidden rounded-xl border p-6 transition-colors duration-300",
                  isActive ? "border-transparent" : "border-white/25",
                )}
              >
                {/* Gradient fill fades in on the active card */}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-0 transition-opacity duration-300",
                    isActive ? "opacity-100" : "opacity-0",
                  )}
                  style={{
                    backgroundImage:
                      "linear-gradient(110deg, #B48E83 0%, #9E6A93 50%, #7B4A86 100%)",
                  }}
                />
                <div className="relative">
                  <div className="flex items-start justify-between gap-4">
                    <h3
                      className={cn(
                        "font-display text-xl font-semibold transition-colors duration-300",
                        isActive ? "text-white" : "text-mist-500",
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}. {service.title}
                    </h3>
                    <ArrowUpRight
                      size={22}
                      className={cn(
                        "flex-shrink-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
                        isActive ? "text-white" : "text-mist-500",
                      )}
                    />
                  </div>
                  <p
                    className={cn(
                      "mt-4 text-[13px] leading-relaxed transition-colors duration-300",
                      isActive ? "text-white/90" : "text-mist-500",
                    )}
                  >
                    {service.description}
                  </p>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
