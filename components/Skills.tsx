"use client";

import { motion } from "framer-motion";
import {
  Braces,
  Layers,
  Server,
  Database,
  Cloud,
  Sparkles,
} from "lucide-react";
import { skillGroups } from "@/lib/data";
import SectionHeading from "./SectionHeading";

const icons = [Braces, Layers, Server, Database, Cloud, Sparkles];

export default function Skills() {
  return (
    <section id="skills" className="section-shell py-28">
      <SectionHeading eyebrow="02 · Skills" title="Tools of the trade" />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => {
          const Icon = icons[i % icons.length];
          return (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease: "easeOut" }}
              whileHover={{ y: -6 }}
              className="glass glass-hover group rounded-2xl p-6"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-cyan-400 transition-colors duration-300 group-hover:border-cyan-400/40 group-hover:text-cyan-300">
                <Icon size={18} />
              </div>
              <h3 className="mt-4 font-display text-base font-semibold text-mist-100">
                {group.label}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/[0.08] bg-white/[0.02] px-3 py-1 font-mono text-[11px] text-mist-300 transition-colors duration-300 group-hover:border-white/[0.15]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
