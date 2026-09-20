"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Download, MapPin } from "lucide-react";
import { profile, whatsappLinks } from "@/lib/data";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { FlipWords } from "@/components/ui/flip-words";
import { NoiseBackground } from "@/components/ui/noise-background";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

const stackWords = profile.stack.split(", ");

const codeLines = [
  { indent: 0, text: "const developer = {" },
  { indent: 1, text: `name: "Sarthik Khanna",` },
  { indent: 1, text: `role: "Full Stack Developer",` },
  { indent: 1, text: `stack: ["React", "Next.js", "Node.js", "TS"],` },
  { indent: 1, text: `base: "Chandigarh, India",` },
  { indent: 1, text: `shipping: true,` },
  { indent: 0, text: "};" },
];

function TypedCode() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    if (visibleLines >= codeLines.length) return;
    const currentLine = codeLines[visibleLines].text;
    if (charCount < currentLine.length) {
      const t = setTimeout(() => setCharCount((c) => c + 1), 18);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setVisibleLines((l) => l + 1);
      setCharCount(0);
    }, 220);
    return () => clearTimeout(t);
  }, [charCount, visibleLines]);

  return (
    <div className="glass w-full max-w-md rounded-2xl p-5 font-mono text-sm leading-relaxed">
      <div className="mb-3 flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
        <span className="ml-2 text-xs text-mist-700">profile.ts</span>
      </div>
      <div>
        {codeLines.map((line, i) => {
          if (i > visibleLines) return null;
          const text = i === visibleLines ? line.text.slice(0, charCount) : line.text;
          return (
            <div key={i} style={{ paddingLeft: `${line.indent * 16}px` }}>
              <span className="text-mist-300">{text}</span>
              {i === visibleLines && (
                <span className="ml-0.5 inline-block h-4 w-[7px] translate-y-0.5 animate-blink bg-cyan-400 align-middle" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const glowVioletY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const glowCyanY = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden pt-32 pb-20"
    >
      <motion.div style={{ y: glowVioletY }} className="absolute inset-0 -z-10 bg-glow-violet" />
      <motion.div style={{ y: glowCyanY }} className="absolute inset-0 -z-10 bg-glow-cyan" />
      <BackgroundRippleEffect className="-z-10" cellSize={64} />

      <motion.div
        style={{ opacity: contentOpacity }}
        className="section-shell grid items-center gap-14 lg:grid-cols-[1.1fr,0.9fr]"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5">
            <MapPin size={13} className="text-cyan-400" />
            <span className="font-mono text-xs text-mist-300">
              {profile.location}
            </span>
          </div>

          <h1 className="font-display text-4xl font-bold leading-[1.08] tracking-tight text-mist-100 sm:text-5xl lg:text-6xl">
            {profile.name}
          </h1>

          <p className="mt-4 font-mono text-sm text-violet-400 sm:text-base">
            <span className="font-bold">{profile.title}</span>{" "}
            <span className="text-mist-700">·</span>{" "}
            <FlipWords
              words={stackWords}
              duration={2200}
              className="font-bold text-cyan-400"
            />
          </p>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-mist-300 sm:text-lg">
            {profile.summary}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <NoiseBackground
              containerClassName="rounded-full p-0"
              gradientColors={["#7C5CFC", "#38E1C6", "#9B87FF"]}
              noiseIntensity={0.12}
              speed={0.15}
            >
              <a
                href="#projects"
                className="flex items-center gap-2 rounded-full px-6 py-3 font-mono text-sm font-medium text-white transition-transform duration-300 active:scale-[0.97]"
              >
                View Projects
                <ArrowRight size={16} />
              </a>
            </NoiseBackground>
            <NoiseBackground
              containerClassName="rounded-full p-0"
              gradientColors={["#38E1C6", "#7C5CFC", "#9B87FF"]}
              noiseIntensity={0.12}
              speed={0.12}
            >
              <a
                href="#contact"
                className="flex items-center gap-2 rounded-full px-6 py-3 font-mono text-sm font-medium text-mist-100 transition-transform duration-300 active:scale-[0.97]"
              >
                Contact Me
              </a>
            </NoiseBackground>
            <a
              href={profile.resumeUrl}
              download={profile.resumeFileName}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 font-mono text-sm font-medium text-mist-100 transition-all duration-300 hover:border-cyan-400/40 hover:text-cyan-400 hover:shadow-glow-sm active:scale-[0.97]"
            >
              <Download size={16} />
              Download Resume
            </a>
            <a
              href={whatsappLinks.hero}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-sm text-mist-300 transition-colors hover:text-cyan-400"
            >
              <WhatsAppIcon size={16} />
              WhatsApp Chat
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          className="flex flex-col items-center gap-8"
        >
          {/* Photo Slot #1 — Primary profile image with glowing ring */}
          <div className="relative flex h-56 w-56 items-center justify-center sm:h-64 sm:w-64">
            <div className="absolute inset-0 animate-spin-slow rounded-full bg-[conic-gradient(from_0deg,#7C5CFC,#38E1C6,#7C5CFC)] opacity-70 blur-md" />
            <div className="absolute inset-[6px] rounded-full bg-ink-950" />
            <div className="relative flex h-[calc(100%-18px)] w-[calc(100%-18px)] items-center justify-center overflow-hidden rounded-full border border-white/10 bg-ink-800">
              { <Image src="/photo1.jpg" 
              alt={profile.name}
               fill className="object-cover" />
                }
              <span className="font-mono text-xs text-mist-700">
                profile photo 
                <br />
                400×400
              </span>
            </div>
            <div className="absolute -bottom-2 right-2 flex items-center gap-1.5 rounded-full border border-white/10 bg-ink-900/90 px-3 py-1.5 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-glow-sm" />
              <span className="font-mono text-[11px] text-mist-300">
                available for work
              </span>
            </div>
          </div>

          <TypedCode />
        </motion.div>
      </motion.div>
    </section>
  );
}
