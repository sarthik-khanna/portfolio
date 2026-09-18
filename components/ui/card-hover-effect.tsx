"use client";

import { AnimatePresence, motion } from "framer-motion";
import { createContext, useContext, useId, useState, type ReactNode } from "react";

/**
 * Adapted from Aceternity UI's Card Hover Effect
 * (https://ui.aceternity.com/components/card-hover-effect): a translucent
 * glow slides between cards in a group as the pointer moves, using a shared
 * framer-motion layoutId. The original renders fixed title/description/link
 * cards — this version splits the mechanism into a context provider + hook
 * + glow overlay so it can wrap this site's existing (richer) card markup
 * instead of replacing it.
 */

type HoverGlowContextValue = {
  hoveredIndex: number | null;
  setHoveredIndex: (index: number | null) => void;
  layoutId: string;
};

const HoverGlowContext = createContext<HoverGlowContextValue | null>(null);

export function HoverGlowGroup({ children }: { children: ReactNode }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const layoutId = useId();

  return (
    <HoverGlowContext.Provider value={{ hoveredIndex, setHoveredIndex, layoutId }}>
      {children}
    </HoverGlowContext.Provider>
  );
}

export function useHoverGlow(index: number) {
  const ctx = useContext(HoverGlowContext);
  if (!ctx) {
    throw new Error("useHoverGlow must be used within a HoverGlowGroup");
  }
  const { hoveredIndex, setHoveredIndex, layoutId } = ctx;

  return {
    isHovered: hoveredIndex === index,
    layoutId,
    onMouseEnter: () => setHoveredIndex(index),
    onMouseLeave: () => setHoveredIndex(null),
  };
}

export function HoverGlow({
  isHovered,
  layoutId,
}: {
  isHovered: boolean;
  layoutId: string;
}) {
  return (
    <AnimatePresence>
      {isHovered && (
        <motion.span
          layoutId={`hover-glow-${layoutId}`}
          className="absolute inset-0 z-0 block rounded-[inherit] bg-gradient-to-br from-violet-500/25 via-violet-500/[0.06] to-cyan-400/20 shadow-glow-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.15 } }}
          exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.1 } }}
        />
      )}
    </AnimatePresence>
  );
}
