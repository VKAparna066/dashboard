import CoursesGrid from "@/components/dashboard/CoursesGrid";

export default function CoursesPage() {
  return (
    <div className="p-6 md:p-8 bg-bg-main min-h-screen">
      <h1 className="text-3xl font-display font-700 text-white mb-6">My Courses</h1>
      <div className="grid gap-4">
        <div className="p-6 rounded-lg bg-bg-card border border-bg-border">
          <p className="text-gray-300 mb-4">Browse the courses you're enrolled in below.</p>
          <CoursesGrid />
        </div>
      </div>
    </div>
  );
}
