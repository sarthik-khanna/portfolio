"use client";

import { motion } from "framer-motion";

/** Centered gradient title with a one-line subtitle, as in "My Services". */
export default function SectionHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mx-auto max-w-2xl text-center"
    >
      <h2 className="text-gradient inline-block font-display text-3xl font-bold tracking-tight md:text-[2.5rem] md:leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-sm leading-relaxed text-mist-100/90 md:text-base">{subtitle}</p>
      )}
    </motion.div>
  );
}
