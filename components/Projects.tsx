"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { projects, type Project } from "@/lib/data";
import SectionHeading from "./SectionHeading";
import { HoverGlow, HoverGlowGroup, useHoverGlow } from "./ui/card-hover-effect";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const rowVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const glow = useHoverGlow(index);

  return (
    <motion.article
      variants={rowVariants}
      onMouseEnter={glow.onMouseEnter}
      onMouseLeave={glow.onMouseLeave}
      className="tile overflow-hidden p-5 md:p-6"
    >
      <HoverGlow isHovered={glow.isHovered} layoutId={glow.layoutId} />
      <div className="relative z-10 flex items-start gap-4 md:gap-6">
        <span className="hidden w-12 flex-shrink-0 pt-1.5 font-mono text-xs text-mist-700 sm:block">
          [{project.index.padStart(3, "0")}]
        </span>

        <div className="min-w-0 flex-1">
          <h3 className="font-display text-xl font-semibold tracking-tight text-mist-100 md:text-2xl">
            {project.name}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-mist-300">{project.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
          </div>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs text-cyan-400 transition-colors hover:text-cyan-300"
            >
              {project.liveUrl.replace(/^https?:\/\//, "")}
              <ArrowUpRight size={13} />
            </a>
          )}
        </div>

        {(project.liveUrl || project.codeUrl) && (
          <div className="flex flex-shrink-0 flex-col gap-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open live demo of ${project.name}`}
                className="icon-btn"
              >
                <ArrowUpRight size={18} />
              </a>
            )}
            {project.codeUrl && (
              <a
                href={project.codeUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View source code of ${project.name}`}
                className="icon-btn"
              >
                <Github size={17} />
              </a>
            )}
          </div>
        )}
      </div>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="panel p-6 md:p-8">
      <SectionHeading pill="Selected Work" title="My Projects" />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={container}
        className="mt-8 flex flex-col gap-4"
      >
        <HoverGlowGroup>
          {projects.map((project, i) => (
            <ProjectRow key={project.name} project={project} index={i} />
          ))}
        </HoverGlowGroup>
      </motion.div>
    </section>
  );
}
