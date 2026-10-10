"use client";

import { motion } from "framer-motion";
import { otherSkills, tools } from "@/lib/data";
import SectionHeading from "./SectionHeading";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const tile = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

export default function Skills() {
  return (
    <section id="skills" className="bg-ink-950 py-20 md:py-24">
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <SectionHeading
          title="My Skills"
          subtitle="Equipped with a modern toolkit including React, Next.js, Node.js and TypeScript, I build products that are fast, reliable and easy to use."
        />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={container}
          className="mt-10 grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6"
        >
          {tools.map((tool) => (
            <motion.div
              key={tool.name}
              variants={tile}
              whileHover={{ y: -4 }}
              className="flex aspect-square flex-col items-center justify-center gap-3 rounded-xl bg-plum-900 transition-colors duration-300 hover:bg-plum-800"
            >
              <span
                className="flex h-12 w-12 items-center justify-center rounded-[10px] font-display text-xl font-semibold tracking-tight"
                style={{
                  color: tool.fg,
                  background: tool.bg,
                  boxShadow: `inset 0 0 0 1.5px ${tool.fg}55`,
                }}
                aria-hidden="true"
              >
                {tool.mark}
              </span>
              <span className="text-gradient text-sm font-semibold">{tool.name}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mt-8 flex flex-wrap items-center justify-center gap-2"
        >
          <span className="mr-1 text-xs text-mist-500">Also working with</span>
          {otherSkills.map((skill) => (
            <span key={skill} className="chip">
              {skill}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
