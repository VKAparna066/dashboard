"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Course } from "@/types";
import ProgressBar from "@/components/ui/ProgressBar";
import DynamicIcon from "@/components/ui/DynamicIcon";

const cardColors: Array<"cyan" | "violet" | "emerald" | "amber"> = [
  "cyan",
  "violet",
  "emerald",
  "amber",
];

const gradientMap = {
  cyan: "from-accent-cyan/10 to-transparent",
  violet: "from-accent-violet/10 to-transparent",
  emerald: "from-accent-emerald/10 to-transparent",
  amber: "from-accent-amber/10 to-transparent",
};

const iconColorMap = {
  cyan: "text-accent-cyan bg-accent-cyan/15",
  violet: "text-accent-violet bg-accent-violet/15",
  emerald: "text-accent-emerald bg-accent-emerald/15",
  amber: "text-accent-amber bg-accent-amber/15",
};

interface CourseCardProps {
  course: Course;
  index: number;
}

export default function CourseCard({ course, index }: CourseCardProps) {
  const color = cardColors[index % cardColors.length];

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 24,
        delay: 0.25 + index * 0.08,
      }}
      whileHover={{
        scale: 1.018,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      className="relative overflow-hidden rounded-xl bg-bg-card border border-bg-border p-4 
        hover:border-opacity-50 transition-[border-color,box-shadow] duration-300
        hover:shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_4px_20px_rgba(0,0,0,0.4)]"
    >
      {/* Subtle gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradientMap[color]} opacity-60 pointer-events-none`} />

      {/* Grain texture */}
      <div className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.15'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10">
        {/* Icon + title */}
        <div className="flex items-start gap-3 mb-4">
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${iconColorMap[color]}`}>
            <DynamicIcon name={course.icon_name} size={16} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-display font-600 text-sm text-white leading-tight line-clamp-2">
              {course.title}
            </h3>
            {course.subtopics?.length ? (
              <p className="mt-1 text-[11px] text-gray-400">
                {course.subtopics.length} subtopics
              </p>
            ) : null}
          </div>
        </div>

        {/* Progress */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-gray-600 font-mono uppercase tracking-wider">
              Progress
            </span>
            <span className="text-[11px] font-mono font-500 text-gray-400">
              {course.progress}%
            </span>
          </div>
          <ProgressBar value={course.progress} color={color} delay={0.1 + index * 0.08} />
        </div>
      </div>
      <Link href={`/dashboard/courses/${course.id}`} className="absolute inset-0 z-20">
        <span className="sr-only">Open course {course.title}</span>
      </Link>
    </motion.article>
  );
}
