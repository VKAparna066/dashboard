"use client";

import { motion } from "framer-motion";
import { TrendingUp, BookMarked, Timer } from "lucide-react";
import BentoCard from "./BentoCard";

interface StatsTileProps {
  streak: number;
  totalCourses: number;
  hoursThisWeek: number;
}

const stats = [
  {
    label: "Active Courses",
    value: "4",
    icon: BookMarked,
    color: "text-accent-cyan",
    bg: "bg-accent-cyan/10",
  },
  {
    label: "Hours / Week",
    value: "12",
    icon: Timer,
    color: "text-accent-violet",
    bg: "bg-accent-violet/10",
  },
  {
    label: "Completion",
    value: "68%",
    icon: TrendingUp,
    color: "text-accent-emerald",
    bg: "bg-accent-emerald/10",
  },
];

export default function StatsTile({ streak, totalCourses, hoursThisWeek }: StatsTileProps) {
  return (
    <BentoCard glowColor="violet" delay={0.08} className="p-5 h-full min-h-[200px]">
      <div className="absolute inset-0 bg-gradient-to-br from-accent-violet/5 to-transparent pointer-events-none" />

      <div className="relative z-10 h-full flex flex-col gap-3">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-mono text-[10px] uppercase tracking-widest text-gray-600">
            Overview
          </span>
        </div>

        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.07, type: "spring", stiffness: 300 }}
              className="flex items-center gap-3"
            >
              <div className={`w-8 h-8 rounded-lg ${stat.bg} flex items-center justify-center shrink-0`}>
                <Icon size={14} className={stat.color} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[11px] text-gray-600 font-mono">{stat.label}</div>
              </div>
              <div className={`font-display font-700 text-lg ${stat.color}`}>
                {stat.value}
              </div>
            </motion.div>
          );
        })}
      </div>
    </BentoCard>
  );
}
