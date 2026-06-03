import { Suspense } from "react";
import HeroTile from "@/components/dashboard/HeroTile";
import CoursesGrid from "@/components/dashboard/CoursesGrid";
import ActivityTile from "@/components/dashboard/ActivityTile";
import StatsTile from "@/components/dashboard/StatsTile";
import CoursesGridSkeleton from "@/components/dashboard/CoursesGridSkeleton";
import { generateActivityData, getStreakCount } from "@/lib/activity";

export default async function DashboardPage() {
  const activity = generateActivityData();
  const streak = getStreakCount(activity);

  return (
    <section className="p-4 lg:p-6 xl:p-8 max-w-7xl mx-auto">
      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 auto-rows-auto">
        {/* Hero tile - spans full width on mobile, 8 cols on desktop */}
        <div className="col-span-1 md:col-span-2 lg:col-span-8">
          <HeroTile streak={streak} />
        </div>

        {/* Stats tile - spans 1 col on md, 4 cols on desktop */}
        <div className="col-span-1 lg:col-span-4">
          <StatsTile streak={streak} totalCourses={4} hoursThisWeek={12} />
        </div>

        {/* Course tiles - full width with internal grid */}
        <div className="col-span-1 md:col-span-2 lg:col-span-7">
          <Suspense fallback={<CoursesGridSkeleton />}>
            <CoursesGrid />
          </Suspense>
        </div>

        {/* Activity tile */}
        <div className="col-span-1 lg:col-span-5">
          <ActivityTile activity={activity} />
        </div>
      </div>
    </section>
  );
}
