export default function CoursesGridSkeleton() {
  return (
    <section className="h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="h-5 w-32 skeleton" />
        <div className="h-4 w-16 skeleton" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl h-28 skeleton"
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>
    </section>
  );
}
