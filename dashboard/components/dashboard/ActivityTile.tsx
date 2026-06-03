"use client";

import { motion } from "framer-motion";
import type { ActivityDay } from "@/types";
import BentoCard from "./BentoCard";

interface ActivityTileProps {
  activity: ActivityDay[];
}

const intensityColor = (count: number) => {
  if (count === 0) return "bg-bg-border";
  if (count === 1) return "bg-accent-emerald/20";
  if (count === 2) return "bg-accent-emerald/40";
  if (count === 3) return "bg-accent-emerald/60";
  return "bg-accent-emerald/90";
};

export default function ActivityTile({ activity }: ActivityTileProps) {
  const weeks: ActivityDay[][] = [];
  for (let i = 0; i < activity.length; i += 7) {
    weeks.push(activity.slice(i, i + 7));
  }

  const totalContributions = activity.reduce((sum, d) => sum + d.count, 0);

  return (
    <BentoCard glowColor="emerald" delay={0.2} className="p-5 h-full">
      <div className="absolute inset-0 bg-gradient-to-br from-accent-emerald/5 to-transparent pointer-events-none" />

      <div className="relative z-10 h-full flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-600 text-base text-white">Activity</h2>
          <span className="font-mono text-[11px] text-gray-600">
            {totalContributions} sessions
          </span>
        </div>

        {/* Contribution grid */}
        <div className="flex gap-1 overflow-hidden">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-1">
              {week.map((day, di) => (
                <motion.div
                  key={day.date}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: 0.3 + (wi * 7 + di) * 0.003,
                    type: "spring",
                    stiffness: 400,
                    damping: 20,
                  }}
                  title={`${day.date}: ${day.count} sessions`}
                  className={`w-3 h-3 rounded-sm ${intensityColor(day.count)} transition-colors duration-150 hover:ring-1 hover:ring-accent-emerald/50 cursor-pointer`}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-2 mt-auto">
          <span className="font-mono text-[10px] text-gray-600">Less</span>
          {[0, 1, 2, 3, 4].map((n) => (
            <div key={n} className={`w-3 h-3 rounded-sm ${intensityColor(n)}`} />
          ))}
          <span className="font-mono text-[10px] text-gray-600">More</span>
        </div>
      </div>
    </BentoCard>
  );
}
