"use client";

import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06 },
  },
};

const word = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function SectionHeading({
  eyebrow,
  title,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  align?: "left" | "center";
}) {
  const words = title.split(" ");

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={container}
      className={align === "center" ? "text-center" : "text-left"}
    >
      <motion.span variants={word} className="eyebrow inline-block">
        {eyebrow}
      </motion.span>
      <h2 className="mt-3 flex flex-wrap gap-x-3 font-display text-3xl font-semibold tracking-tight text-mist-100 md:text-4xl">
        {words.map((w, i) => (
          <motion.span key={i} variants={word} className="inline-block">
            {w}
          </motion.span>
        ))}
      </h2>
      <motion.div
        variants={word}
        className={`mt-4 h-[3px] w-16 rounded-full bg-[linear-gradient(90deg,#7C5CFC,#38E1C6)] ${
          align === "center" ? "mx-auto" : ""
        }`}
      />
    </motion.div>
  );
}
