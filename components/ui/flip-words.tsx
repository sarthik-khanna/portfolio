"use client";

import React, { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Recreates Aceternity's "Flipping Words" text animation
 * (https://ui.aceternity.com/blocks/text-animations/text-animation-flipping-words) —
 * that specific block is gated behind Aceternity's paid tier (its registry
 * endpoint 401s), so this is a from-scratch rebuild matching their own
 * documented behavior: each character rotates in on the Y-axis while
 * fading in from a blur, staggered letter by letter. The word-cycling
 * scaffold (interval, exit-then-enter via AnimatePresence) follows the
 * pattern of their free sibling "Flip Words" component, ported to
 * `framer-motion` (already a project dependency) and made inline (`span`)
 * so it composes inside a `<p>`. Colors are controlled via `className`
 * since this site is dark-only.
 */
export const FlipWords = ({
  words,
  duration = 2500,
  className,
}: {
  words: string[];
  duration?: number;
  className?: string;
}) => {
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [isAnimating, setIsAnimating] = useState(false);

  const startAnimation = useCallback(() => {
    const word = words[words.indexOf(currentWord) + 1] || words[0];
    setCurrentWord(word);
    setIsAnimating(true);
  }, [currentWord, words]);

  useEffect(() => {
    if (!isAnimating) {
      const timeout = setTimeout(startAnimation, duration);
      return () => clearTimeout(timeout);
    }
  }, [isAnimating, duration, startAnimation]);

  return (
    <AnimatePresence onExitComplete={() => setIsAnimating(false)}>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{
          opacity: 0,
          filter: "blur(8px)",
          scale: 1.25,
          position: "absolute",
        }}
        transition={{ duration: 0.3 }}
        className={cn("relative inline-block text-left [perspective:600px]", className)}
        key={currentWord}
      >
        {currentWord.split(" ").map((word, wordIndex) => (
          <span key={word + wordIndex} className="inline-block whitespace-nowrap">
            {word.split("").map((letter, letterIndex) => (
              <motion.span
                key={word + letterIndex}
                initial={{ rotateY: -90, opacity: 0, filter: "blur(6px)" }}
                animate={{ rotateY: 0, opacity: 1, filter: "blur(0px)" }}
                transition={{
                  delay: wordIndex * 0.3 + letterIndex * 0.045,
                  duration: 0.4,
                  ease: "easeOut",
                }}
                style={{ display: "inline-block", transformOrigin: "50% 50%" }}
              >
                {letter}
              </motion.span>
            ))}
            <span className="inline-block">&nbsp;</span>
          </span>
        ))}
      </motion.span>
    </AnimatePresence>
  );
};
