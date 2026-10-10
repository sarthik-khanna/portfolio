"use client";

import { motion } from "framer-motion";
import { aboutIntro, achievements, education, experience, type TimelineItem } from "@/lib/data";

function TimelineCard({ item, index }: { item: TimelineItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.07 }}
      className="card px-6 py-6 text-center transition-transform duration-300 hover:-translate-y-1"
    >
      <p className="font-display text-3xl font-bold tracking-tight md:text-[2.1rem]">
        {item.period && (
          <span className="bg-gradient-to-r from-rose to-orchid bg-clip-text text-transparent">
            {item.period}
          </span>
        )}
        {item.periodEnd && <span className="text-white">{item.periodEnd}</span>}
      </p>
      <div className="mt-3 space-y-1.5 text-xs leading-relaxed text-mist-100/85 md:text-[13px]">
        {item.lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </motion.div>
  );
}

function Column({ title, items }: { title: string; items: TimelineItem[] }) {
  return (
    <div>
      <h3 className="mb-5 font-display text-3xl font-bold tracking-tight text-peach">{title}</h3>
      <div className="flex flex-col gap-4">
        {items.map((item, i) => (
          <TimelineCard key={item.lines[0]} item={item} index={i} />
        ))}
      </div>
    </div>
  );
}

export default function Journey() {
  return (
    <section id="about" className="glow-bg py-20 md:py-24">
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto mb-12 max-w-2xl text-center text-sm leading-relaxed text-mist-300 md:text-base"
        >
          {aboutIntro}
        </motion.p>

        <div className="grid gap-10 md:grid-cols-2 md:gap-5">
          <Column title="Education" items={education} />
          <div className="flex flex-col gap-10">
            <Column title="Experience" items={experience} />
            <Column title="Achievements" items={achievements} />
          </div>
        </div>
      </div>
    </section>
  );
}
