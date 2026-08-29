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
        ink: {
          950: "#07080C",
          900: "#0A0B10",
          800: "#12141C",
          700: "#1B1E2A",
        },
        mist: {
          100: "#E9EAF2",
          300: "#B7BACB",
          500: "#8B8FA3",
          700: "#5B5F72",
        },
        violet: {
          400: "#9B87FF",
          500: "#7C5CFC",
          600: "#6242E8",
        },
        cyan: {
          300: "#7CF2DA",
          400: "#38E1C6",
          500: "#1EC4AB",
        },
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-space-grotesk)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      backgroundImage: {
        "grid-lines":
          "linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)",
        "glow-violet":
          "radial-gradient(circle at 50% 0%, rgba(124,92,252,0.35), transparent 60%)",
        "glow-cyan":
          "radial-gradient(circle at 50% 100%, rgba(56,225,198,0.18), transparent 55%)",
      },
      backgroundSize: {
        grid: "44px 44px",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0,0,0,0.35)",
        "glow-sm": "0 0 24px rgba(124,92,252,0.35)",
        "glow-md": "0 0 48px rgba(124,92,252,0.28)",
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
      },
      animation: {
        blink: "blink 1s step-start infinite",
        float: "float 6s ease-in-out infinite",
        "spin-slow": "spin-slow 14s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
