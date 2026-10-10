"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Download, Github, Linkedin, Mail, Trophy, type LucideIcon } from "lucide-react";
import { heroStats, profile, socials, whatsappLinks } from "@/lib/data";
import { WhatsAppIcon } from "./icons/WhatsAppIcon";

const socialIcons: Record<string, LucideIcon> = {
  LinkedIn: Linkedin,
  GitHub: Github,
  Email: Mail,
};

function SocialSquares() {
  return (
    <div className="flex items-center gap-2.5">
      {socials.map((s) => {
        const Icon = socialIcons[s.label];
        const external = s.href.startsWith("http");
        return (
          <a
            key={s.label}
            href={s.href}
            aria-label={s.label}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="icon-square"
          >
            {Icon && <Icon size={15} />}
          </a>
        );
      })}
      <a
        href={whatsappLinks.hero}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="icon-square"
      >
        <WhatsAppIcon size={15} />
      </a>
    </div>
  );
}

function StatsStrip() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.35 }}
      className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-8 md:mt-20 md:justify-between"
    >
      <div className="border-gradient rounded-xl px-7 py-3 text-center">
        <p className="text-xl font-semibold text-white">SIH 2025</p>
        <p className="mt-1 inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide text-mist-300">
          Runner-up
          <Trophy size={12} className="text-[#F5B544]" />
        </p>
      </div>

      {heroStats.map((stat) => (
        <div key={stat.label.join(" ")} className="flex items-center gap-3">
          <span className="font-display text-4xl font-semibold tracking-tight text-white md:text-5xl">
            {stat.value}
            {stat.suffix}
          </span>
          <span className="text-sm font-medium leading-tight text-mist-100">
            {stat.label[0]}
            <br />
            {stat.label[1]}
          </span>
        </div>
      ))}
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section id="top" className="glow-bg relative overflow-hidden pb-16 pt-28 md:pb-20 md:pt-36">
      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        {/* Outlined backdrop word, like the template's "Hello" */}
        <span
          aria-hidden="true"
          className="text-outline pointer-events-none absolute left-1/2 top-[-2.5rem] -translate-x-1/2 select-none font-display text-[7rem] font-extrabold leading-none tracking-tight sm:text-[10rem] md:left-[52%] md:top-[-3.5rem] md:text-[13rem]"
        >
          Hello
        </span>

        <div className="relative grid items-center gap-12 md:grid-cols-[1.25fr,0.75fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="text-xl font-semibold text-white md:text-2xl">
              I am {profile.firstName}
            </p>
            <h1 className="text-gradient mt-3 pb-1 font-display text-4xl font-bold leading-[1.15] tracking-tight sm:text-5xl lg:text-6xl">
              Passionate Full Stack
              <br />
              Developer
            </h1>

            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-mist-100/90 md:text-base">
              {profile.summary} Based in {profile.location}.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-6">
              <a
                href={profile.resumeUrl}
                download={profile.resumeFileName}
                className="btn-outline"
              >
                Download CV
                <Download size={15} />
              </a>
              <SocialSquares />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            className="mx-auto w-full max-w-[320px] md:ml-auto md:mr-0"
          >
            <div
              className="rounded-[26px] rounded-tr-lg p-[2px] shadow-glow-md"
              style={{ backgroundImage: "linear-gradient(160deg, #EBC1A2, #BE79CF 70%, #8E4FB0)" }}
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] rounded-tr-md bg-ink-900">
                <Image
                  src="/photo2.jpg"
                  alt={profile.name}
                  fill
                  priority
                  sizes="(min-width: 768px) 320px, 80vw"
                  className="object-cover"
                  // Zoom in on the subject; the original shot is wide with lots of background
                  style={{ objectPosition: "55% 45%", transform: "scale(1.5)", transformOrigin: "56% 64%" }}
                />
              </div>
            </div>
          </motion.div>
        </div>

        <StatsStrip />
      </div>
    </section>
  );
}
