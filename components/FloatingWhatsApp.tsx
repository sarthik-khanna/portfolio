"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { whatsappLinks } from "@/lib/data";

export default function FloatingWhatsApp() {
  return (
    <motion.a
      href={whatsappLinks.floating}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Sarthik on WhatsApp"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 1, ease: "easeOut" }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      className="group fixed bottom-6 right-6 z-50 flex items-center gap-0 overflow-hidden rounded-full border border-cyan-400/30 bg-ink-900/90 shadow-glow-md backdrop-blur-md"
    >
      <span className="max-w-0 overflow-hidden whitespace-nowrap font-mono text-xs text-mist-200 transition-all duration-300 group-hover:max-w-[160px] group-hover:pl-4">
        Chat on WhatsApp
      </span>
      <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center text-cyan-400">
        <MessageCircle size={24} className="animate-float" />
      </span>
    </motion.a>
  );
}
