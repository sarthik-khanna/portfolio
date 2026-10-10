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
        // Near-black navy surfaces: 950 = page, 900 = cards, 800 = raised, 700 = hover
        ink: {
          950: "#060A13",
          900: "#0A0F1B",
          800: "#111626",
          700: "#1B1F33",
        },
        // Purple-tinted card surface used by the skill tiles
        plum: {
          900: "#140F22",
          800: "#1C1630",
          700: "#2A1F42",
        },
        mist: {
          100: "#F1EEF6",
          300: "#C3BED0",
          500: "#8E88A0",
          700: "#5E5872",
        },
        // The template's warm-to-cool gradient: peach -> rose -> orchid
        peach: "#EBC1A2",
        rose: "#D894BA",
        orchid: "#BE79CF",
      },
      fontFamily: {
        display: ["var(--font-inter)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0,0,0,0.35)",
        "glow-sm": "0 0 24px rgba(216,148,186,0.3)",
        "glow-md": "0 0 48px rgba(190,121,207,0.3)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "cell-ripple": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "cell-ripple":
          "cell-ripple var(--duration, 200ms) ease-out var(--delay, 0ms) 1",
      },
    },
  },
  plugins: [],
};

export default config;
