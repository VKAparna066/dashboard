import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          base: "#080B10",
          card: "#0D1117",
          hover: "#111820",
          border: "#1C2333",
        },
        accent: {
          cyan: "#00D9FF",
          violet: "#8B5CF6",
          emerald: "#10F5A8",
          amber: "#FFAA00",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "glow-cyan": "radial-gradient(ellipse at center, rgba(0,217,255,0.15) 0%, transparent 70%)",
        "glow-violet": "radial-gradient(ellipse at center, rgba(139,92,246,0.15) 0%, transparent 70%)",
        "glow-emerald": "radial-gradient(ellipse at center, rgba(16,245,168,0.15) 0%, transparent 70%)",
        "mesh-dark": "radial-gradient(at 40% 20%, rgba(139,92,246,0.08) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(0,217,255,0.06) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(16,245,168,0.05) 0px, transparent 50%)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "shimmer": "shimmer 2s linear infinite",
        "streak": "streak 1.5s ease-in-out infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        streak: {
          "0%, 100%": { opacity: "0.4", transform: "scaleX(0.8)" },
          "50%": { opacity: "1", transform: "scaleX(1)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
