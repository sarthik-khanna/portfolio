"use client";

import { motion } from "framer-motion";
import { Trophy, Award, Medal, BadgeCheck } from "lucide-react";
import { achievements } from "@/lib/data";
import SectionHeading from "./SectionHeading";

const icons = [Trophy, Medal, BadgeCheck, Award];

export default function Achievements() {
  return (
    <section id="achievements" className="section-shell py-28">
      <SectionHeading eyebrow="04 · Achievements" title="Wins along the way" />

      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        {achievements.map((item, i) => {
          const Icon = icons[i % icons.length];
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.08, ease: "easeOut" }}
              whileHover={{ y: -4 }}
              className="glass glass-hover flex items-start gap-4 rounded-2xl p-6"
            >
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-white/10 bg-cyan-400/10 text-cyan-400">
                <Icon size={19} />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="font-display text-base font-semibold text-mist-100">
                    {item.title}
                  </h3>
                  <span className="font-mono text-[11px] text-mist-700">
                    {item.year}
                  </span>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-mist-300">
                  {item.detail}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
