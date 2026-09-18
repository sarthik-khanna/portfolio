"use client";

import { motion } from "framer-motion";
import {
  Braces,
  Layers,
  Server,
  Database,
  Cloud,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { skillGroups, type SkillGroup } from "@/lib/data";
import SectionHeading from "./SectionHeading";
import { HoverGlow, HoverGlowGroup, useHoverGlow } from "./ui/card-hover-effect";

const icons = [Braces, Layers, Server, Database, Cloud, Sparkles];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const card = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

function SkillCard({
  group,
  index,
  Icon,
}: {
  group: SkillGroup;
  index: number;
  Icon: LucideIcon;
}) {
  const glow = useHoverGlow(index);

  return (
    <motion.div
      variants={card}
      whileHover={{ y: -8, transition: { duration: 0.25, ease: "easeOut" } }}
      onMouseEnter={glow.onMouseEnter}
      onMouseLeave={glow.onMouseLeave}
      className="glass glass-hover group relative overflow-hidden rounded-2xl p-6"
    >
      <HoverGlow isHovered={glow.isHovered} layoutId={glow.layoutId} />
      <div className="relative z-10">
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
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="section-shell py-28">
      <SectionHeading eyebrow="02 · Skills" title="Tools of the trade" />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={container}
        className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        <HoverGlowGroup>
          {skillGroups.map((group, i) => (
            <SkillCard key={group.label} group={group} index={i} Icon={icons[i % icons.length]} />
          ))}
        </HoverGlowGroup>
      </motion.div>
    </section>
  );
}
