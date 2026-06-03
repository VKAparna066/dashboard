export default function DashboardLoading() {
  return (
    <section className="p-4 lg:p-6 xl:p-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4">
        {/* Hero skeleton */}
        <div className="col-span-1 md:col-span-2 lg:col-span-8 h-56 skeleton" />
        {/* Stats skeleton */}
        <div className="col-span-1 lg:col-span-4 h-56 skeleton" />
        {/* Courses skeleton */}
        <div className="col-span-1 md:col-span-2 lg:col-span-7 h-72 skeleton" />
        {/* Activity skeleton */}
        <div className="col-span-1 lg:col-span-5 h-72 skeleton" />
      </div>
    </section>
  );
}
