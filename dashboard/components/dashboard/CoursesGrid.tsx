import { fetchCourses } from "@/lib/supabase";
import CourseCard from "./CourseCard";
import type { Course } from "@/types";

// Fallback courses in case Supabase is not configured
const FALLBACK_COURSES: Course[] = [
  {
    id: "1",
    title: "Advanced React Patterns",
    progress: 75,
    icon_name: "Code2",
    created_at: new Date().toISOString(),
    subtopics: ["Hooks & composables", "State management", "Performance patterns"],
  },
  {
    id: "2",
    title: "Database Architecture & SQL",
    progress: 42,
    icon_name: "Database",
    created_at: new Date().toISOString(),
    subtopics: ["Schema design", "Joins & queries", "Indexing"],
  },
  {
    id: "3",
    title: "Machine Learning Fundamentals",
    progress: 88,
    icon_name: "Brain",
    created_at: new Date().toISOString(),
    subtopics: ["Regression", "Classification", "Model evaluation"],
  },
  {
    id: "4",
    title: "Cloud-Native Development",
    progress: 31,
    icon_name: "Globe",
    created_at: new Date().toISOString(),
    subtopics: ["Containers", "Kubernetes", "Serverless"],
  },
  {
    id: "5",
    title: "Design Systems with Tailwind",
    progress: 59,
    icon_name: "LayoutDashboard",
    created_at: new Date().toISOString(),
    subtopics: ["Component tokens", "Responsive layouts", "Theming"],
  },
  {
    id: "6",
    title: "Secure API Design",
    progress: 22,
    icon_name: "ShieldCheck",
    created_at: new Date().toISOString(),
    subtopics: ["Authentication", "Rate limiting", "Data validation"],
  },
];

export default async function CoursesGrid() {
  let courses: Course[] | null = null;

  try {
    courses = await fetchCourses();
  } catch (err) {
    console.error("Failed to fetch courses:", err);
  }

  // Graceful fallback when DB isn't configured
  const displayCourses = courses && courses.length > 0 ? courses : FALLBACK_COURSES;
  const isUsingFallback = !courses || courses.length === 0;

  return (
    <section className="h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="font-display font-600 text-base text-white">Active Courses</h2>
          {isUsingFallback && (
            <span className="text-[10px] font-mono text-gray-600 bg-bg-border px-2 py-0.5 rounded-full">
              demo data
            </span>
          )}
        </div>
        <span className="font-mono text-[11px] text-gray-600">
          {displayCourses.length} enrolled
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {displayCourses.map((course, index) => (
          <CourseCard key={course.id} course={course} index={index} />
        ))}
      </div>
    </section>
  );
}
