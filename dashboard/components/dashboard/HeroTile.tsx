"use client";

import { motion } from "framer-motion";
import { Flame, Clock, Calendar } from "lucide-react";
import BentoCard from "./BentoCard";

interface HeroTileProps {
  streak: number;
}

export default function HeroTile({ streak }: HeroTileProps) {
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <BentoCard glowColor="cyan" delay={0} className="h-full min-h-[200px] p-6 lg:p-8">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/5 via-transparent to-accent-violet/5 pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-accent-cyan/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-10 w-48 h-48 rounded-full bg-accent-violet/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 h-full flex flex-col justify-between gap-4">
        {/* Top row */}
        <div className="flex items-start justify-between">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-sm text-gray-500 font-mono mb-1 tracking-wider uppercase"
            >
              {greeting}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="font-display font-800 text-3xl lg:text-4xl xl:text-5xl text-white leading-tight"
            >
              Welcome back,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-violet">
                Alex
              </span>
            </motion.h1>
          </div>

          {/* Streak badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35, type: "spring", stiffness: 300, damping: 20 }}
            className="flex items-center gap-2 bg-accent-amber/10 border border-accent-amber/20 rounded-xl px-3 py-2 shrink-0"
          >
            <Flame size={18} className="text-accent-amber flame-icon" />
            <div className="text-right">
              <div className="font-display font-700 text-lg text-accent-amber leading-none">
                {streak}
              </div>
              <div className="text-[10px] text-gray-500 font-mono mt-0.5">day streak</div>
            </div>
          </motion.div>
        </div>

        {/* Bottom row - quick stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center gap-4"
        >
          <div className="flex items-center gap-1.5 text-gray-500 text-xs font-mono">
            <Calendar size={12} className="text-accent-cyan/60" />
            <span>
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
          <div className="w-px h-3 bg-bg-border" />
          <div className="flex items-center gap-1.5 text-gray-500 text-xs font-mono">
            <Clock size={12} className="text-accent-violet/60" />
            <span>12h this week</span>
          </div>
        </motion.div>
      </div>
    </BentoCard>
  );
}
