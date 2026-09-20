"use client";

import { motion } from "framer-motion";
import { Trophy, Award, Medal, BadgeCheck, type LucideIcon } from "lucide-react";
import { achievements, type Achievement } from "@/lib/data";
import SectionHeading from "./SectionHeading";
import { HoverGlow, HoverGlowGroup, useHoverGlow } from "./ui/card-hover-effect";

const icons = [Trophy, Medal, BadgeCheck, Award];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const card = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

function AchievementCard({
  item,
  index,
  Icon,
}: {
  item: Achievement;
  index: number;
  Icon: LucideIcon;
}) {
  const glow = useHoverGlow(index);

  return (
    <motion.div
      variants={card}
      onMouseEnter={glow.onMouseEnter}
      onMouseLeave={glow.onMouseLeave}
      className="tile flex items-start gap-4 overflow-hidden p-5"
    >
      <HoverGlow isHovered={glow.isHovered} layoutId={glow.layoutId} />
      <div className="relative z-10 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-white/10 bg-cyan-400/10 text-cyan-400">
        <Icon size={19} />
      </div>
      <div className="relative z-10">
        <div className="flex flex-wrap items-center gap-x-3">
          <h3 className="font-display text-base font-semibold text-mist-100">{item.title}</h3>
          <span className="font-mono text-[11px] text-mist-700">{item.year}</span>
        </div>
        <p className="mt-1.5 text-sm leading-relaxed text-mist-300">{item.detail}</p>
      </div>
    </motion.div>
  );
}

export default function Achievements() {
  return (
    <section id="achievements" className="panel p-6 md:p-8">
      <SectionHeading pill="Milestones" title="Wins Along the Way" />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={container}
        className="mt-8 grid gap-4 sm:grid-cols-2"
      >
        <HoverGlowGroup>
          {achievements.map((item, i) => (
            <AchievementCard
              key={item.title}
              item={item}
              index={i}
              Icon={icons[i % icons.length]}
            />
          ))}
        </HoverGlowGroup>
      </motion.div>
    </section>
  );
}
