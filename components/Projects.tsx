"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { projects } from "@/lib/data";
import SectionHeading from "./SectionHeading";

export default function Projects() {
  return (
    <section id="projects" className="section-shell py-28">
      <SectionHeading eyebrow="03 · Projects" title="Things I've shipped" />

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {projects.map((project, i) => (
          <motion.article
            key={project.name}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: (i % 2) * 0.1, ease: "easeOut" }}
            whileHover={{ y: -6 }}
            className="glass glass-hover group flex h-full flex-col rounded-2xl p-7"
          >
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
          </motion.article>
        ))}
      </div>
    </section>
  );
}
