"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  Briefcase,
  Download,
  Github,
  Home,
  Layers,
  Linkedin,
  Mail,
  Menu,
  Trophy,
  User,
  X,
  type LucideIcon,
} from "lucide-react";
import { navLinks, profile, socials, whatsappLinks } from "@/lib/data";
import { WhatsAppIcon } from "./icons/WhatsAppIcon";

const navIcons: Record<string, LucideIcon> = {
  "#top": Home,
  "#about": User,
  "#skills": Layers,
  "#projects": Briefcase,
  "#achievements": Trophy,
  "#contact": Mail,
};

const socialIcons: Record<string, LucideIcon> = {
  LinkedIn: Linkedin,
  GitHub: Github,
  Email: Mail,
};

// Space to leave above a scrolled-to section: the fixed header on mobile,
// just a small gap on desktop where the sidebar sits beside the content.
function scrollOffset() {
  return window.innerWidth >= 1024 ? 24 : 88;
}

// Ease-in-out so the scroll accelerates then settles, instead of the linear
// motion browsers use by default.
function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function animatedScrollTo(targetY: number, duration = 700) {
  const startY = window.scrollY;
  const distance = targetY - startY;
  const startTime = performance.now();

  function step(now: number) {
    const progress = Math.min((now - startTime) / duration, 1);
    window.scrollTo(0, startY + distance * easeInOutCubic(progress));
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

type NavigateHandler = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;

function NavList({ active, onNavigate }: { active: string; onNavigate: NavigateHandler }) {
  return (
    <nav className="flex flex-col gap-1" aria-label="Sections">
      {navLinks.map((link) => {
        const Icon = navIcons[link.href];
        const isActive = active === link.href;
        return (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => onNavigate(e, link.href)}
            aria-current={isActive ? "page" : undefined}
            className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm transition-colors duration-200 ${
              isActive
                ? "bg-ink-700 text-white"
                : "text-mist-300 hover:bg-white/[0.04] hover:text-white"
            }`}
          >
            {Icon && (
              <Icon size={16} className={isActive ? "text-cyan-400" : "text-cyan-400/60"} />
            )}
            {link.label}
          </a>
        );
      })}
    </nav>
  );
}

function Actions({ onNavigate }: { onNavigate: NavigateHandler }) {
  return (
    <div className="flex gap-2">
      <a
        href="#contact"
        onClick={(e) => onNavigate(e, "#contact")}
        className="btn-cyan flex-1 !px-3 !py-2 text-xs"
      >
        Hire Me Now
      </a>
      <a
        href={profile.resumeUrl}
        download={profile.resumeFileName}
        className="btn-outline flex-1 !px-3 !py-2 text-xs"
      >
        <Download size={13} />
        Resume
      </a>
    </div>
  );
}

function SocialRow() {
  const linkClass =
    "flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-mist-300 transition-all duration-300 hover:border-cyan-400/50 hover:text-cyan-400";
  return (
    <div className="flex items-center justify-center gap-2.5">
      {socials.map((s) => {
        const Icon = socialIcons[s.label];
        const external = s.href.startsWith("http");
        return (
          <a
            key={s.label}
            href={s.href}
            aria-label={s.label}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className={linkClass}
          >
            {Icon && <Icon size={15} />}
          </a>
        );
      })}
      <a
        href={whatsappLinks.nav}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className={linkClass}
      >
        <WhatsAppIcon size={15} />
      </a>
    </div>
  );
}

export default function Sidebar() {
  const [active, setActive] = useState("#top");
  const [open, setOpen] = useState(false);

  // Scroll spy: highlight the section crossing a thin band near the middle of the viewport.
  useEffect(() => {
    const els = navLinks
      .map((l) => document.getElementById(l.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleNavClick: NavigateHandler = (e, href) => {
    e.preventDefault();
    setOpen(false);
    setActive(href);

    if (href === "#top") {
      animatedScrollTo(0);
      history.pushState(null, "", "#top");
      return;
    }

    const target = document.querySelector(href);
    if (!target) return;

    const targetY = target.getBoundingClientRect().top + window.scrollY - scrollOffset();
    animatedScrollTo(Math.max(targetY, 0));
    history.pushState(null, "", href);
  };

  return (
    <>
      {/* Desktop: sticky profile sidebar */}
      <aside className="hidden lg:sticky lg:top-4 lg:block lg:h-[calc(100vh-3.75rem)] lg:self-start">
        <div className="panel flex h-full flex-col gap-5 overflow-y-auto p-5">
          <div className="flex flex-col items-center text-center">
            <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-cyan-400/40 shadow-glow-sm">
              <Image
                src="/photo1.jpg"
                alt={profile.name}
                fill
                sizes="200px"
                className="object-cover"
                style={{ objectPosition: "50% 30%", transform: "scale(1.9)", transformOrigin: "42% 32%" }}
              />
            </div>
            <p className="mt-4 text-xs text-mist-500">Full Stack Developer</p>
            <h2 className="mt-1 font-display text-xl font-semibold tracking-tight">
              {profile.name}
            </h2>
          </div>

          <SocialRow />
          <Actions onNavigate={handleNavClick} />

          <div className="rounded-2xl bg-ink-800/80 p-2">
            <NavList active={active} onNavigate={handleNavClick} />
          </div>

          <div className="mt-auto flex items-center justify-center gap-2 pt-1">
            <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-glow-sm" />
            <span className="font-mono text-[11px] text-mist-300">available for work</span>
          </div>
        </div>
      </aside>

      {/* Mobile / tablet: fixed top bar with a dropdown menu */}
      <header className="fixed inset-x-3 top-3 z-50 lg:hidden">
        <div className="panel flex items-center justify-between px-3 py-2 shadow-glass backdrop-blur-xl">
          <a
            href="#top"
            onClick={(e) => handleNavClick(e, "#top")}
            className="flex items-center gap-3"
          >
            <span className="relative h-9 w-9 overflow-hidden rounded-full border border-cyan-400/40">
              <Image
                src="/photo1.jpg"
                alt=""
                fill
                sizes="80px"
                className="object-cover"
                style={{ objectPosition: "50% 30%", transform: "scale(1.9)", transformOrigin: "42% 32%" }}
              />
            </span>
            <span className="font-display text-sm font-semibold">{profile.name}</span>
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="panel mt-2 flex flex-col gap-4 p-4 shadow-glass"
            >
              <NavList active={active} onNavigate={handleNavClick} />
              <Actions onNavigate={handleNavClick} />
              <SocialRow />
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
