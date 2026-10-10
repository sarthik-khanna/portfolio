"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { projectFilters, projects, type Project } from "@/lib/data";
import { cn } from "@/lib/utils";
import SectionHeading from "./SectionHeading";

/**
 * Accent-tinted backdrop with a browser window on it. The window shows the
 * project screenshot when there is one, otherwise a placeholder UI.
 */
function CoverArt({ project }: { project: Project }) {
  const { accent } = project;
  const isDesktop = project.categories.includes("Desktop");

  return (
    <div
      className="absolute inset-0"
      style={{
        background: `radial-gradient(circle at 50% 0%, ${accent}80, transparent 70%), linear-gradient(160deg, ${accent}40, #0D0F1C 75%)`,
      }}
    >
      <div
        className={cn(
          "absolute overflow-hidden rounded-xl border border-white/10 bg-[#0B0E1A] shadow-[0_20px_60px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:-translate-y-1.5",
          // Screenshots keep their own ~2:1 shape; placeholders fill the card
          project.image ? "inset-x-[7%] top-[13%]" : "inset-x-[10%] top-[14%] bottom-[14%]",
        )}
      >
        <div className="flex items-center gap-1.5 border-b border-white/[0.06] px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-[#FF5F57]" />
          <span className="h-2 w-2 rounded-full bg-[#FEBC2E]" />
          <span className="h-2 w-2 rounded-full bg-[#28C840]" />
          <span className="ml-3 h-3 flex-1 rounded bg-white/[0.05] px-2 text-[8px] leading-3 text-mist-700">
            {project.liveUrl ? project.liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "") : project.name}
          </span>
        </div>

        {project.image ? (
          <div className="relative aspect-[2.12/1]">
            <Image
              src={project.image}
              alt={`${project.name} screenshot`}
              fill
              sizes="(min-width: 768px) 400px, 90vw"
              className="object-cover object-top"
            />
          </div>
        ) : isDesktop ? (
          <div className="p-4">
            <p className="text-sm font-semibold" style={{ color: accent }}>
              {project.name}
            </p>
            <div className="mt-3 flex gap-2">
              <span className="h-5 flex-1 rounded bg-white/[0.06]" />
              <span className="h-5 w-14 rounded" style={{ background: accent }} />
            </div>
            <div className="mt-3 space-y-1.5">
              {[0, 1, 2, 3, 4, 5, 6].map((row) => (
                <div key={row} className="flex gap-2">
                  <span className="h-2.5 w-1/4 rounded-sm bg-white/[0.08]" />
                  <span className="h-2.5 w-1/3 rounded-sm bg-white/[0.05]" />
                  <span
                    className="h-2.5 flex-1 rounded-sm"
                    style={{ background: row === 1 ? `${accent}80` : "rgba(255,255,255,0.04)" }}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-4 text-center">
            <p className="font-display text-lg font-bold tracking-tight text-white sm:text-xl">
              {project.name}
            </p>
            <p className="mt-1 text-[10px] text-mist-500">{project.tagline}</p>
            <div className="mt-3 flex justify-center gap-2">
              <span className="h-4 w-14 rounded" style={{ background: accent }} />
              <span className="h-4 w-14 rounded border border-white/15" />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {[0, 1, 2].map((c) => (
                <span
                  key={c}
                  className="h-12 rounded-md border border-white/[0.06]"
                  style={{ background: c === 1 ? `${accent}30` : "rgba(255,255,255,0.03)" }}
                />
              ))}
            </div>
            <div className="mt-3 space-y-1.5">
              <span className="mx-auto block h-2 w-3/4 rounded-sm bg-white/[0.06]" />
              <span className="mx-auto block h-2 w-1/2 rounded-sm bg-white/[0.04]" />
            </div>
          </div>
        )}
      </div>

      {project.image && (
        <div className="absolute inset-x-[7%] bottom-[9%] text-center transition-opacity duration-300 [@media(hover:hover)]:group-hover:opacity-0">
          <p className="font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
            {project.name}
          </p>
          <p className="mt-1 text-xs text-mist-300">{project.tagline}</p>
        </div>
      )}
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const link = project.liveUrl ?? project.codeUrl;

  const card = (
    <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/[0.06] bg-ink-900">
      <CoverArt project={project} />

      {/* Gradient caption: always shown on touch screens, slides in on hover elsewhere */}
      <div
        className="absolute inset-x-4 bottom-4 rounded-lg p-4 text-white shadow-glass transition-all duration-300 [@media(hover:hover)]:translate-y-3 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-focus-visible:translate-y-0 [@media(hover:hover)]:group-focus-visible:opacity-100"
        style={{ backgroundImage: "linear-gradient(100deg, rgba(227,163,182,0.95), rgba(190,121,207,0.95))" }}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-display text-lg font-bold leading-tight">{project.name}</h3>
            <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-white/90">
              {project.description}
            </p>
            <p className="mt-2 truncate text-[10px] font-medium uppercase tracking-wide text-white/75">
              {project.tech.join(" · ")}
            </p>
          </div>
          {link && (
            <span className="flex-shrink-0">
              {project.liveUrl ? <ArrowUpRight size={26} /> : <Github size={22} />}
            </span>
          )}
        </div>
      </div>
    </div>
  );

  return link ? (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${project.name}`}
      className="group block rounded-2xl"
    >
      {card}
    </a>
  ) : (
    <div tabIndex={0} className="group rounded-2xl">
      {card}
    </div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState<(typeof projectFilters)[number]>("All");
  const visible =
    filter === "All" ? projects : projects.filter((p) => p.categories.includes(filter));

  return (
    <section id="projects" className="glow-bg py-20 md:py-24">
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <SectionHeading
          title="My Projects"
          subtitle="A selection of things I've designed, built and shipped"
        />

        <div className="mt-8 flex flex-wrap justify-center gap-3" role="tablist" aria-label="Filter projects">
          {projectFilters.map((f) => (
            <button
              key={f}
              role="tab"
              aria-selected={filter === f}
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-md px-4 py-1 text-xs transition-all duration-200",
                filter === f
                  ? "btn-gradient !rounded-md !px-4 !py-1 !text-xs"
                  : "border border-white/30 text-mist-300 hover:border-white/60 hover:text-white",
              )}
            >
              {f}
            </button>
          ))}
        </div>

        <motion.div layout className="mt-8 grid gap-5 sm:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {visible.map((project) => (
              <motion.div
                key={project.name}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
