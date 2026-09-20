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
  show: { transition: { staggerChildren: 0.08 } },
};

const card = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
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
      onMouseEnter={glow.onMouseEnter}
      onMouseLeave={glow.onMouseLeave}
      className="tile group overflow-hidden p-5"
    >
      <HoverGlow isHovered={glow.isHovered} layoutId={glow.layoutId} />
      <div className="relative z-10">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-cyan-400/10 text-cyan-400">
            <Icon size={18} />
          </div>
          <h3 className="font-display text-lg font-medium text-mist-100">{group.label}</h3>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {group.items.map((item) => (
            <span key={item} className="chip">
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
    <section id="skills" className="panel p-6 md:p-8">
      <SectionHeading pill="Dev Tools" title="My Toolkit" />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={container}
        className="mt-8 grid gap-4 sm:grid-cols-2"
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
