"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Download } from "lucide-react";
import { marqueeTech, profile } from "@/lib/data";
import ScrollVelocity from "@/components/ui/scroll-velocity";

function TechMarquee() {
  const strip = marqueeTech.map((tech) => (
    <span key={tech} className="pr-10">
      {tech}
    </span>
  ));
  return (
    <div className="flex items-center gap-6 px-2 sm:px-4">
      <span className="flex-shrink-0 font-mono text-xs text-mist-300">Working with :</span>
      <div className="fade-x relative min-w-0 flex-1 overflow-hidden">
        <ScrollVelocity
          texts={[strip]}
          velocity={60}
          numCopies={4}
          className="font-display text-lg font-semibold text-mist-500"
          parallaxClassName="w-full"
          scrollerClassName="w-max"
        />
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="top" className="space-y-5">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="panel overflow-hidden"
      >
        <div className="grid md:grid-cols-[0.9fr,1.1fr]">
          <div className="relative min-h-[340px] md:min-h-[460px]">
            <Image
              src="/photo2.jpg"
              alt={profile.name}
              fill
              priority
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-cover"
              style={{ objectPosition: "50% 46%" }}
            />
            {/* Fade the photo into the panel: downward on mobile, rightward on desktop */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-transparent to-transparent md:hidden" />
            <div className="absolute inset-0 hidden bg-gradient-to-l from-ink-900 via-transparent to-transparent md:block" />
          </div>

          <div className="relative flex flex-col justify-center px-7 pb-9 pt-2 md:px-10 md:py-12">
            <p className="text-sm text-mist-300">Hey there, I&apos;m</p>
            <h1 className="mt-3 font-display text-5xl font-bold leading-[1.02] tracking-tight text-mist-100 sm:text-6xl lg:text-7xl">
              Sarthik
              <br />
              Khanna
            </h1>

            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-mist-300">
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 bg-cyan-400" />
                Full Stack Developer at Needle Ads Technology
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 bg-cyan-400" />
                Based in {profile.location}
              </span>
            </div>

            <p className="mt-6 max-w-md text-sm leading-relaxed text-mist-300 sm:text-base">
              {profile.summary}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#contact" className="btn-cyan group !pr-2">
                Hire Me Now
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-950 text-cyan-400 transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight size={16} />
                </span>
              </a>
              <a
                href={profile.resumeUrl}
                download={profile.resumeFileName}
                className="btn-outline"
              >
                <Download size={15} />
                Download Resume
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      <TechMarquee />
    </section>
  );
}
