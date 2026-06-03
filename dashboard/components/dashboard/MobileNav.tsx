"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { LayoutDashboard, BookOpen, Trophy, Settings } from "lucide-react";

const NAV_ITEMS = [
  { id: "dashboard", label: "Home", icon: LayoutDashboard, href: "/dashboard" },
  { id: "courses", label: "Courses", icon: BookOpen, href: "/dashboard/courses" },
  { id: "achievements", label: "Wins", icon: Trophy, href: "/dashboard/achievements" },
  { id: "settings", label: "Settings", icon: Settings, href: "/dashboard/settings" },
];

export default function MobileNav() {
  const pathname = usePathname() || "/dashboard";

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-bg-card/90 backdrop-blur-xl border-t border-bg-border px-2 pb-safe">
      <div className="flex items-center justify-around py-2">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/") || (item.href === "/dashboard" && pathname === "/");
          return (
            <Link
              key={item.id}
              href={item.href}
              className="relative flex flex-col items-center gap-1 p-2 rounded-xl min-w-[60px]"
            >
              {isActive && (
                <motion.div
                  layoutId="mobile-active-bg"
                  className="absolute inset-0 rounded-xl bg-accent-cyan/10"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Icon
                size={20}
                className={`relative z-10 ${isActive ? "text-accent-cyan" : "text-gray-600"}`}
              />
              <span
                className={`relative z-10 text-[10px] font-medium ${
                  isActive ? "text-accent-cyan" : "text-gray-600"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
