"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { projects, type Project } from "@/lib/data";
import SectionHeading from "./SectionHeading";
import { HoverGlow, HoverGlowGroup, useHoverGlow } from "./ui/card-hover-effect";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

function TiltCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [7, -7]), {
    stiffness: 300,
    damping: 25,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-7, 7]), {
    stiffness: 300,
    damping: 25,
  });
  const glow = useHoverGlow(index);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
    glow.onMouseLeave();
  }

  return (
    <motion.article
      ref={ref}
      variants={cardVariants}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={glow.onMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -6 }}
      className="glass glass-hover group relative flex h-full flex-col overflow-hidden rounded-2xl p-7"
    >
            <HoverGlow isHovered={glow.isHovered} layoutId={glow.layoutId} />
      <div className="relative z-10 flex flex-1 flex-col">
        <div className="flex items-start justify-between">
          <span className="font-mono text-xs text-mist-700">
            {project.index}
          </span>
          <div className="flex gap-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open live demo of ${project.name}`}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-mist-300 transition-all duration-300 hover:border-cyan-400/40 hover:text-cyan-400"
              >
                <ArrowUpRight size={15} />
              </a>
            )}
            {project.codeUrl && (
              <a
                href={project.codeUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View source code of ${project.name}`}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-mist-300 transition-all duration-300 hover:border-violet-400/40 hover:text-violet-400"
              >
                <Github size={15} />
              </a>
            )}
          </div>
        </div>

        <h3 className="mt-5 font-display text-xl font-semibold text-mist-100">
          {project.name}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-mist-300">
          {project.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/[0.08] bg-white/[0.02] px-3 py-1 font-mono text-[11px] text-mist-500"
            >
              {t}
            </span>
          ))}
        </div>

        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-1.5 font-mono text-xs text-cyan-400 transition-colors hover:text-cyan-300"
          >
            {project.liveUrl.replace(/^https?:\/\//, "")}
            <ArrowUpRight size={13} />
          </a>
        )}
      </div>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section-shell py-28">
      <SectionHeading eyebrow="03 · Projects" title="Things I've shipped" />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={container}
        className="mt-12 grid gap-6 md:grid-cols-2"
      >
        <HoverGlowGroup>
          {projects.map((project, i) => (
            <TiltCard key={project.name} project={project} index={i} />
          ))}
        </HoverGlowGroup>
      </motion.div>
    </section>
  );
}
