"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: "cyan" | "violet" | "emerald" | "amber";
  delay?: number;
}

const glowMap = {
  cyan: "hover:shadow-[0_0_0_1px_rgba(0,217,255,0.25),0_0_30px_rgba(0,217,255,0.08)] hover:border-accent-cyan/20",
  violet: "hover:shadow-[0_0_0_1px_rgba(139,92,246,0.25),0_0_30px_rgba(139,92,246,0.08)] hover:border-accent-violet/20",
  emerald: "hover:shadow-[0_0_0_1px_rgba(16,245,168,0.25),0_0_30px_rgba(16,245,168,0.08)] hover:border-accent-emerald/20",
  amber: "hover:shadow-[0_0_0_1px_rgba(255,170,0,0.25),0_0_30px_rgba(255,170,0,0.08)] hover:border-accent-amber/20",
};

export default function BentoCard({
  children,
  className = "",
  glowColor = "cyan",
  delay = 0,
}: BentoCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 24,
        delay,
      }}
      whileHover={{
        scale: 1.015,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      className={`
        relative overflow-hidden rounded-2xl
        bg-bg-card border border-bg-border
        transition-[border-color,box-shadow] duration-300
        ${glowMap[glowColor]}
        ${className}
      `}
    >
      {children}
    </motion.article>
  );
}
