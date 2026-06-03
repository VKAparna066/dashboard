import type { ActivityDay } from "@/types";

export function generateActivityData(): ActivityDay[] {
  const days: ActivityDay[] = [];
  const now = new Date();
  for (let i = 111; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const count = Math.random() < 0.6 ? Math.floor(Math.random() * 5) : 0;
    days.push({ date: d.toISOString().split("T")[0], count });
  }
  return days;
}

export function getStreakCount(activity: ActivityDay[]): number {
  let streak = 0;
  const today = new Date().toISOString().split("T")[0];
  const sorted = [...activity].reverse();
  for (const day of sorted) {
    if (day.date > today) continue;
    if (day.count > 0) streak++;
    else break;
  }
  return streak;
}
