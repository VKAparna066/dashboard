"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  Trophy,
  Settings,
  ChevronLeft,
  ChevronRight,
  Zap,
} from "lucide-react";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { id: "courses", label: "Courses", icon: BookOpen, href: "/dashboard/courses" },
  { id: "achievements", label: "Achievements", icon: Trophy, href: "/dashboard/achievements" },
  { id: "settings", label: "Settings", icon: Settings, href: "/dashboard/settings" },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname() || "/dashboard";

  return (
    <motion.nav
      initial={false}
      animate={{ width: collapsed ? 72 : 220 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="hidden md:flex flex-col h-screen sticky top-0 bg-bg-card border-r border-bg-border shrink-0 z-40 overflow-hidden"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-bg-border">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-cyan/30 to-accent-violet/30 border border-accent-cyan/20 flex items-center justify-center shrink-0">
          <Zap size={14} className="text-accent-cyan" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.15 }}
              className="font-display font-700 text-lg text-white whitespace-nowrap tracking-tight"
            >
              Nexus
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation items */}
      <nav className="flex flex-col gap-1 p-3 flex-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/") || (item.href === "/dashboard" && pathname === "/");
          return (
            <Link
              key={item.id}
              href={item.href}
              className="relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-left w-full group"
            >
              {/* Active background with layoutId */}
              {isActive && (
                <motion.div
                  layoutId="sidebar-active-bg"
                  className="absolute inset-0 rounded-lg bg-accent-cyan/10 border border-accent-cyan/20"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}

              {/* Hover background */}
              {!isActive && (
                <motion.div
                  className="absolute inset-0 rounded-lg bg-bg-hover opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                />
              )}

              <div className="relative z-10 shrink-0">
                <Icon
                  size={18}
                  className={isActive ? "text-accent-cyan" : "text-gray-500 group-hover:text-gray-300 transition-colors"}
                />
              </div>

              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.15 }}
                    className={`relative z-10 font-body text-sm whitespace-nowrap ${
                      isActive ? "text-white font-medium" : "text-gray-500 group-hover:text-gray-300"
                    }`}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center justify-center p-3 m-3 rounded-lg border border-bg-border text-gray-600 hover:text-gray-300 hover:bg-bg-hover transition-all duration-150"
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>
    </motion.nav>
  );
}
