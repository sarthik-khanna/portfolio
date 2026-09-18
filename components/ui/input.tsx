"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useMotionTemplate, useMotionValue, motion } from "framer-motion";

/**
 * Adapted from Aceternity UI's Input (https://ui.aceternity.com/registry/input.json):
 * a radial gradient follows the cursor around a 2px padding "border" on
 * hover, done via framer-motion motion values so it doesn't trigger React
 * re-renders per mouse move. Ported `motion/react` -> `framer-motion`,
 * dropped the light/dark `neutral`/`zinc`/`gray` palette and the
 * `shadow-input` utility (not defined in this project's Tailwind v3
 * config — Aceternity's own site defines it separately) for this site's
 * ink surface + violet glow, and added a matching `Textarea` for the
 * Contact form's message field, which the original doesn't cover.
 */
const GLOW_COLOR = "#7C5CFC";
const RADIUS = 100;

function useGlowHandlers() {
  const [visible, setVisible] = React.useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return {
    mouseX,
    mouseY,
    visible,
    handleMouseMove,
    onMouseEnter: () => setVisible(true),
    onMouseLeave: () => setVisible(false),
  };
}

const fieldClassName =
  "flex w-full rounded-[10px] border border-white/[0.08] bg-ink-900/80 px-4 py-2 text-sm text-mist-100 outline-none transition duration-300 placeholder:text-mist-700 group-hover/input:border-transparent focus-visible:ring-2 focus-visible:ring-violet-400/50 disabled:cursor-not-allowed disabled:opacity-50";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  const { mouseX, mouseY, visible, handleMouseMove, onMouseEnter, onMouseLeave } = useGlowHandlers();

  return (
    <motion.div
      style={{
        background: useMotionTemplate`radial-gradient(${
          visible ? `${RADIUS}px` : "0px"
        } circle at ${mouseX}px ${mouseY}px, ${GLOW_COLOR}, transparent 80%)`,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="group/input rounded-xl p-[2px] transition duration-300"
    >
      <input type={type} className={cn(fieldClassName, "h-11", className)} ref={ref} {...props} />
    </motion.div>
  );
});
Input.displayName = "Input";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  const { mouseX, mouseY, visible, handleMouseMove, onMouseEnter, onMouseLeave } = useGlowHandlers();

  return (
    <motion.div
      style={{
        background: useMotionTemplate`radial-gradient(${
          visible ? `${RADIUS}px` : "0px"
        } circle at ${mouseX}px ${mouseY}px, ${GLOW_COLOR}, transparent 80%)`,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="group/input rounded-xl p-[2px] transition duration-300"
    >
      <textarea className={cn(fieldClassName, "resize-none py-3", className)} ref={ref} {...props} />
    </motion.div>
  );
});
Textarea.displayName = "Textarea";

export { Input, Textarea };
