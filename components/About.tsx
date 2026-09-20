"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, type LucideIcon } from "lucide-react";
import { aboutParagraphs, education, experience } from "@/lib/data";
import SectionHeading from "./SectionHeading";
import { HoverGlow, HoverGlowGroup, useHoverGlow } from "./ui/card-hover-effect";

function InfoCard({
  index,
  Icon,
  title,
  subtitle,
  meta,
}: {
  index: number;
  Icon: LucideIcon;
  title: string;
  subtitle: string;
  meta: React.ReactNode;
}) {
  const glow = useHoverGlow(index);
  return (
    <div
      onMouseEnter={glow.onMouseEnter}
      onMouseLeave={glow.onMouseLeave}
      className="tile overflow-hidden p-6"
    >
      <HoverGlow isHovered={glow.isHovered} layoutId={glow.layoutId} />
      <div className="relative z-10 flex items-start gap-4">
        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-white/10 bg-cyan-400/10 text-cyan-400">
          <Icon size={20} />
        </div>
        <div>
          <p className="font-medium text-mist-100">{title}</p>
          <p className="mt-1 text-sm text-mist-300">{subtitle}</p>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 font-mono text-xs text-mist-500">
            {meta}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function About() {
  const [statement, ...rest] = aboutParagraphs;

  return (
    <section id="about" className="panel p-6 md:p-8">
      <SectionHeading pill="Biography" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mt-8 md:ml-auto md:max-w-[75%]"
      >
        <p className="font-display text-xl font-medium leading-snug text-mist-100 md:text-2xl">
          {statement}
        </p>
        <div className="mt-5 space-y-4 text-sm leading-relaxed text-mist-300 md:text-base">
          {rest.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        className="mt-10 grid gap-4 md:grid-cols-2"
      >
        <HoverGlowGroup>
          <InfoCard
            index={0}
            Icon={Briefcase}
            title={experience.role}
            subtitle={experience.company}
            meta={<span>{experience.period}</span>}
          />
          <InfoCard
            index={1}
            Icon={GraduationCap}
            title={education.degree}
            subtitle={education.school}
            meta={
              <>
                <span>{education.period}</span>
                <span className="text-cyan-400">CGPA {education.cgpa}</span>
              </>
            }
          />
        </HoverGlowGroup>
      </motion.div>
    </section>
  );
}
