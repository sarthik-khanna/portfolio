"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Menu, X } from "lucide-react";
import { navLinks, whatsappLinks } from "@/lib/data";

// Height reserved for the fixed navbar so scrolled-to sections aren't
// tucked underneath it. Matches the navbar's own rendered height + margin.
const SCROLL_OFFSET = 96;

// Simple ease-in-out curve so the scroll accelerates then settles,
// instead of the linear motion browsers use by default.
function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function animatedScrollTo(targetY: number, duration = 700) {
  const startY = window.scrollY;
  const distance = targetY - startY;
  const startTime = performance.now();

  function step(now: number) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeInOutCubic(progress);
    window.scrollTo(0, startY + distance * eased);
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault();
    setOpen(false);

    if (href === "#top") {
      animatedScrollTo(0);
      history.pushState(null, "", "#top");
      return;
    }

    const target = document.querySelector(href);
    if (!target) return;

    const targetY =
      target.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
    animatedScrollTo(Math.max(targetY, 0));
    history.pushState(null, "", href);
  }

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={`section-shell flex items-center justify-between py-3 transition-all duration-300 ${
          scrolled ? "mt-3" : "mt-0"
        }`}
      >
        <div
          className={`glass flex w-full items-center justify-between rounded-full px-5 py-3 transition-all duration-300 ${
            scrolled ? "shadow-glow-sm" : ""
          }`}
        >
          <a
            href="#top"
            onClick={(e) => handleNavClick(e, "#top")}
            className="font-mono text-sm font-medium text-mist-100"
          >
            <span className="text-violet-400">&lt;</span>
            Sarthik
            <span className="text-cyan-400">/&gt;</span>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm text-mist-300 transition-colors hover:text-mist-100"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={whatsappLinks.nav}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-cyan-400 transition-all duration-300 hover:border-cyan-400/40 hover:shadow-glow-sm"
            >
              <MessageCircle size={16} />
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={open}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-mist-100 md:hidden"
            >
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="section-shell mt-2 md:hidden"
        >
          <div className="glass flex flex-col gap-1 rounded-2xl p-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="rounded-xl px-4 py-3 text-sm text-mist-300 transition-colors hover:bg-white/[0.05] hover:text-mist-100"
              >
                {link.label}
              </a>
            ))}
          </div>
        </motion.nav>
      )}
    </motion.header>
  );
}
