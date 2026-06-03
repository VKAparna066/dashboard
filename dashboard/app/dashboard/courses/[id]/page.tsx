import Link from "next/link";
import { notFound } from "next/navigation";
import ProgressBar from "@/components/ui/ProgressBar";
import DynamicIcon from "@/components/ui/DynamicIcon";
import type { Course } from "@/types";
import CertificateDownload from "@/components/dashboard/CertificateDownload";

const FALLBACK_COURSES: Course[] = [
  { id: "1", title: "Advanced React Patterns", progress: 75, icon_name: "Code2", created_at: new Date().toISOString() },
  { id: "2", title: "Database Architecture & SQL", progress: 42, icon_name: "Database", created_at: new Date().toISOString() },
  { id: "3", title: "Machine Learning Fundamentals", progress: 88, icon_name: "Brain", created_at: new Date().toISOString() },
  { id: "4", title: "Cloud-Native Development", progress: 31, icon_name: "Globe", created_at: new Date().toISOString() },
  { id: "5", title: "Design Systems with Tailwind", progress: 59, icon_name: "LayoutDashboard", created_at: new Date().toISOString() },
  {
    id: "6",
    title: "Secure API Design",
    progress: 22,
    icon_name: "ShieldCheck",
    created_at: new Date().toISOString(),
    subtopics: ["Authentication", "Rate limiting", "Data validation"],
  },
];

export async function generateStaticParams() {
  return FALLBACK_COURSES.map((course) => ({ id: course.id }));
}

type CourseDetailPageProps = {
  params?: Promise<{ id: string }>;
};

export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
  const resolvedParams = await params;
  const courseId = resolvedParams?.id;
  const course = FALLBACK_COURSES.find((entry) => entry.id === courseId);

  if (!course) {
    notFound();
  }

  return (
    <div className="p-6 md:p-8 bg-bg-main min-h-screen">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-mono text-gray-500 uppercase tracking-[0.35em]">Course Detail</p>
          <h1 className="mt-2 text-3xl font-display font-700 text-white">{course.title}</h1>
        </div>
        <Link
          href="/dashboard/courses"
          className="rounded-full border border-bg-border bg-bg-card px-4 py-2 text-sm text-gray-300 transition hover:border-accent-cyan hover:text-white"
        >
          Back to courses
        </Link>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <section className="rounded-3xl bg-bg-card border border-bg-border p-6 shadow-[0_25px_60px_-40px_rgba(0,0,0,0.8)]">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-accent-cyan/10 text-accent-cyan">
              <DynamicIcon name={course.icon_name} size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-400">Progress</p>
              <p className="text-2xl font-display font-700 text-white">{course.progress}% completed</p>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">Overview</h2>
              <p className="mt-3 text-sm leading-7 text-gray-300">
                This course helps you master the fundamentals and practical applications of {course.title.toLowerCase()}. Keep progressing through lessons, quizzes, and projects to finish the course.
              </p>
            </div>

            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">What you’ll learn</h2>
              <ul className="mt-3 space-y-2 text-sm text-gray-300">
                <li>• Core concepts and best practices</li>
                <li>• Hands-on exercises and examples</li>
                <li>• Real-world implementation guidance</li>
              </ul>
            </div>

            {course.subtopics?.length ? (
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">Subtopics</h2>
                <ul className="mt-3 space-y-2 text-sm text-gray-300">
                  {course.subtopics.map((topic) => (
                    <li key={topic}>• {topic}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </section>

        <aside className="rounded-3xl bg-bg-card border border-bg-border p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">Course progress</p>
          <div className="mt-4">
            <ProgressBar value={course.progress} color="cyan" delay={0.05} />
          </div>
          <div className="mt-5 rounded-3xl bg-bg-main p-4">
            <p className="text-sm text-gray-400">Started on</p>
            <p className="mt-2 text-base font-medium text-white">{new Date(course.created_at).toLocaleDateString()}</p>
          </div>

          {course.progress >= 100 ? (
            <CertificateDownload courseId={course.id} courseTitle={course.title} />
          ) : course.progress >= 50 ? (
            <div className="mt-6 rounded-2xl border border-cyan-500/30 bg-cyan-500/5 p-4">
              <p className="text-sm font-semibold text-cyan-300">⏳ In Progress</p>
              <p className="mt-2 text-xs text-cyan-200">{100 - course.progress}% remaining to unlock certificate</p>
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-gray-700 bg-gray-900 p-4">
              <p className="text-sm font-semibold text-gray-300">🔒 Locked</p>
              <p className="mt-2 text-xs text-gray-400">Complete {50 - Math.floor(course.progress / 2)}% more to start earning</p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
