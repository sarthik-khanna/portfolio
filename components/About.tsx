"use client";
import Image from "next/image";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import { aboutParagraphs, education, experience, profile } from "@/lib/data";
import SectionHeading from "./SectionHeading";
import { HoverGlow, HoverGlowGroup, useHoverGlow } from "./ui/card-hover-effect";

function ExperienceCard() {
  const glow = useHoverGlow(0);
  return (
    <div
      onMouseEnter={glow.onMouseEnter}
      onMouseLeave={glow.onMouseLeave}
      className="glass glass-hover relative mt-8 overflow-hidden rounded-2xl p-6"
    >
      <HoverGlow isHovered={glow.isHovered} layoutId={glow.layoutId} />
      <div className="relative z-10 flex items-start gap-4">
        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-white/10 bg-cyan-400/10 text-cyan-400">
          <Briefcase size={20} />
        </div>
        <div>
          <p className="font-medium text-mist-100">{experience.role}</p>
          <p className="mt-1 text-sm text-mist-300">{experience.company}</p>
          <div className="mt-3 font-mono text-xs text-mist-500">
            {experience.period}
          </div>
        </div>
      </div>
    </div>
  );
}

function EducationCard() {
  const glow = useHoverGlow(1);
  return (
    <div
      onMouseEnter={glow.onMouseEnter}
      onMouseLeave={glow.onMouseLeave}
      className="glass glass-hover relative mt-5 overflow-hidden rounded-2xl p-6"
    >
      <HoverGlow isHovered={glow.isHovered} layoutId={glow.layoutId} />
      <div className="relative z-10 flex items-start gap-4">
        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-white/10 bg-violet-500/10 text-violet-400">
          <GraduationCap size={20} />
        </div>
        <div>
          <p className="font-medium text-mist-100">{education.degree}</p>
          <p className="mt-1 text-sm text-mist-300">{education.school}</p>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 font-mono text-xs text-mist-500">
            <span>{education.period}</span>
            <span className="text-cyan-400">CGPA {education.cgpa}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="section-shell py-28">
      <SectionHeading eyebrow="01 · About" title="Who's building this?" />

      <div className="mt-12 grid gap-12 lg:grid-cols-[0.85fr,1.15fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative"
        >
          {/* Photo Slot #2 — About / work environment image */}
          <div className="glass glass-hover group relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl">
            <div className="flex h-full w-full items-center justify-center">
              { <Image src="/photo2.jpg" alt="Sarthik at work" fill className="object-cover" /> }
              <span className="font-mono text-xs text-mist-700">
                workspace photo
                <br />
                800×1000
              </span>
            </div>
            <div className="absolute inset-x-4 bottom-4 rounded-xl border border-white/10 bg-ink-950/70 px-4 py-3 backdrop-blur-md">
              <p className="font-mono text-[11px] text-mist-300">
                shipping features late into the night, one commit at a time
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          <div className="space-y-4 text-base leading-relaxed text-mist-300 sm:text-lg">
            {aboutParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <HoverGlowGroup>
            <ExperienceCard />
            <EducationCard />
          </HoverGlowGroup>

          <p className="mt-6 font-mono text-xs text-mist-700">
            {profile.name} — {profile.location}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
