import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep navy surfaces: 950 = frame, 900 = panels, 800 = tiles, 700 = active/hover
        ink: {
          950: "#050A14",
          900: "#08111F",
          800: "#0D1A2E",
          700: "#15263F",
        },
        mist: {
          100: "#EAF1FB",
          300: "#B4C2D6",
          500: "#8092AB",
          700: "#55657D",
        },
        cyan: {
          300: "#8CEBFF",
          400: "#3BD8F7",
          500: "#1FB6D6",
        },
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-space-grotesk)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0,0,0,0.35)",
        "glow-sm": "0 0 24px rgba(59,216,247,0.3)",
        "glow-md": "0 0 48px rgba(59,216,247,0.25)",
      },
      keyframes: {
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "cell-ripple": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        blink: "blink 1s step-start infinite",
        float: "float 6s ease-in-out infinite",
        "spin-slow": "spin-slow 14s linear infinite",
        "cell-ripple":
          "cell-ripple var(--duration, 200ms) ease-out var(--delay, 0ms) 1",
        marquee: "marquee 32s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
