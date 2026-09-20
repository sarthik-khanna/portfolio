"use client";

import { motion } from "framer-motion";

/**
 * Small pill label on the left, big title on the right, like the reference
 * layout's "● Biography ........ My Core Services" rows.
 */
export default function SectionHeading({
  pill,
  title,
}: {
  pill: string;
  title?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex items-start justify-between gap-6"
    >
      <span className="pill">
        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
        {pill}
      </span>
      {title && (
        <h2 className="text-right font-display text-3xl font-medium tracking-tight text-mist-100 md:text-4xl">
          {title}
        </h2>
      )}
    </motion.div>
  );
}
