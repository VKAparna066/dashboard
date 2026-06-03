"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  value: number;
  color?: "cyan" | "violet" | "emerald" | "amber";
  delay?: number;
}

const colorMap = {
  cyan: "bg-accent-cyan",
  violet: "bg-accent-violet",
  emerald: "bg-accent-emerald",
  amber: "bg-accent-amber",
};

const glowMap = {
  cyan: "shadow-[0_0_8px_rgba(0,217,255,0.5)]",
  violet: "shadow-[0_0_8px_rgba(139,92,246,0.5)]",
  emerald: "shadow-[0_0_8px_rgba(16,245,168,0.5)]",
  amber: "shadow-[0_0_8px_rgba(255,170,0,0.5)]",
};

export default function ProgressBar({
  value,
  color = "cyan",
  delay = 0,
}: ProgressBarProps) {
  return (
    <div className="relative h-1.5 bg-bg-border rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{
          delay: delay + 0.3,
          duration: 0.9,
          ease: [0.4, 0, 0.2, 1],
        }}
        className={`h-full rounded-full ${colorMap[color]} ${glowMap[color]}`}
      />
    </div>
  );
}
