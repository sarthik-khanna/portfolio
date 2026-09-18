"use client";

import { cn } from "@/lib/utils";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useRef } from "react";

/**
 * Adapted from Aceternity UI's Noise Background
 * (https://ui.aceternity.com/registry/noise-background.json): a drifting
 * radial-gradient blob (spring-driven, random-walk motion) under a static
 * noise texture, meant to wrap a button/chip. Ported `motion/react` ->
 * `framer-motion` (already a project dependency), dropped the
 * light/dark `neutral-*` surface + the Tailwind v4 `var(--color-*)` inset
 * shadows (this site is dark-only and on Tailwind v3, where those CSS
 * vars don't exist) in favor of this site's `ink` surface + a literal
 * rgba shadow, and moved shape/padding (`rounded-2xl p-2` in the
 * original) out of the hardcoded classes into the `containerClassName`
 * default so callers can swap it for a pill button without class
 * collisions.
 */
function GradientLayer({
  springX,
  springY,
  gradientColor,
  opacity,
  multiplier,
}: {
  springX: MotionValue<number>;
  springY: MotionValue<number>;
  gradientColor: string;
  opacity: number;
  multiplier: number;
}) {
  const x = useTransform(springX, (val) => val * multiplier);
  const y = useTransform(springY, (val) => val * multiplier);
  const background = useMotionTemplate`radial-gradient(circle at ${x}px ${y}px, ${gradientColor} 0%, transparent 50%)`;

  return (
    <motion.div
      className="absolute inset-0"
      style={{
        opacity,
        background,
      }}
    />
  );
}

interface NoiseBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  gradientColors?: string[];
  noiseIntensity?: number;
  speed?: number;
  backdropBlur?: boolean;
  animating?: boolean;
}

export const NoiseBackground = ({
  children,
  className,
  containerClassName = "rounded-2xl p-2",
  gradientColors = ["#7C5CFC", "#38E1C6", "#9B87FF"],
  noiseIntensity = 0.15,
  speed = 0.1,
  backdropBlur = false,
  animating = true,
}: NoiseBackgroundProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 100, damping: 30 });
  const springY = useSpring(y, { stiffness: 100, damping: 30 });

  const topGradientX = useTransform(springX, (val) => val * 0.1 - 50);

  const velocityRef = useRef({ x: 0, y: 0 });
  const lastDirectionChangeRef = useRef(0);

  // Cached via ResizeObserver instead of read every animation frame —
  // calling getBoundingClientRect() inside useAnimationFrame forces a
  // synchronous layout on every one of the ~60 ticks/sec this runs, for
  // every NoiseBackground instance on the page. That was a real source of
  // jank once more than one of these (or a MovingBorder, see moving-border.tsx)
  // were mounted at once.
  const sizeRef = useRef({ width: 0, height: 0 });
  // Only run the drift loop while the button is actually on screen, so
  // off-screen instances (e.g. the Contact button while scrolled up near
  // the Hero) don't keep animating in the background forever.
  const inViewRef = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateSize = () => {
      const rect = el.getBoundingClientRect();
      sizeRef.current = { width: rect.width, height: rect.height };
    };

    updateSize();
    x.set(sizeRef.current.width / 2);
    y.set(sizeRef.current.height / 2);

    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(el);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    intersectionObserver.observe(el);

    return () => {
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, [x, y]);

  const generateRandomVelocityRef = useRef(() => {
    const angle = Math.random() * Math.PI * 2;
    const magnitude = speed * (0.5 + Math.random() * 0.5);
    return {
      x: Math.cos(angle) * magnitude,
      y: Math.sin(angle) * magnitude,
    };
  });

  useEffect(() => {
    generateRandomVelocityRef.current = () => {
      const angle = Math.random() * Math.PI * 2;
      const magnitude = speed * (0.5 + Math.random() * 0.5);
      return {
        x: Math.cos(angle) * magnitude,
        y: Math.sin(angle) * magnitude,
      };
    };
    velocityRef.current = generateRandomVelocityRef.current();
  }, [speed]);

  useAnimationFrame((time) => {
    if (!animating || !inViewRef.current) return;

    const maxX = sizeRef.current.width;
    const maxY = sizeRef.current.height;
    if (!maxX || !maxY) return;

    if (time - lastDirectionChangeRef.current > 1500 + Math.random() * 1500) {
      velocityRef.current = generateRandomVelocityRef.current();
      lastDirectionChangeRef.current = time;
    }

    const deltaTime = 16;
    const currentX = x.get();
    const currentY = y.get();

    let newX = currentX + velocityRef.current.x * deltaTime;
    let newY = currentY + velocityRef.current.y * deltaTime;

    const padding = 20;

    if (
      newX < padding ||
      newX > maxX - padding ||
      newY < padding ||
      newY > maxY - padding
    ) {
      const angle = Math.random() * Math.PI * 2;
      const magnitude = speed * (0.5 + Math.random() * 0.5);
      velocityRef.current = {
        x: Math.cos(angle) * magnitude,
        y: Math.sin(angle) * magnitude,
      };
      lastDirectionChangeRef.current = time;
      newX = Math.max(padding, Math.min(maxX - padding, newX));
      newY = Math.max(padding, Math.min(maxY - padding, newY));
    }

    x.set(newX);
    y.set(newY);
  });

  return (
    <div
      ref={containerRef}
      className={cn(
        "group relative overflow-hidden bg-ink-800/80 shadow-[0px_1px_0px_0px_rgba(255,255,255,0.08)_inset,0px_8px_20px_rgba(0,0,0,0.35)]",
        backdropBlur &&
          "after:absolute after:inset-0 after:h-full after:w-full after:backdrop-blur-lg after:content-['']",
        containerClassName,
      )}
      style={
        {
          "--noise-opacity": noiseIntensity,
        } as React.CSSProperties
      }
    >
      <GradientLayer
        springX={springX}
        springY={springY}
        gradientColor={gradientColors[0]}
        opacity={0.4}
        multiplier={1}
      />
      <GradientLayer
        springX={springX}
        springY={springY}
        gradientColor={gradientColors[1]}
        opacity={0.3}
        multiplier={0.7}
      />
      <GradientLayer
        springX={springX}
        springY={springY}
        gradientColor={gradientColors[2] || gradientColors[0]}
        opacity={0.25}
        multiplier={1.2}
      />

      <motion.div
        className="absolute inset-x-0 top-0 h-1 rounded-t-2xl opacity-80 blur-sm"
        style={{
          background: `linear-gradient(to right, ${gradientColors.join(", ")})`,
          x: animating ? topGradientX : 0,
        }}
      />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <img
          src="https://assets.aceternity.com/noise.webp"
          alt=""
          className="h-full w-full object-cover opacity-[var(--noise-opacity)]"
          style={{ mixBlendMode: "overlay" }}
        />
      </div>

      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
};
