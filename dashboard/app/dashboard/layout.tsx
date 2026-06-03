import Sidebar from "@/components/dashboard/Sidebar";
import MobileNav from "@/components/dashboard/MobileNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-bg-base bg-mesh-dark">
      {/* Desktop/Tablet Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 min-w-0 pb-20 lg:pb-0">
        {children}
      </main>

      {/* Mobile bottom navigation */}
      <MobileNav />
    </div>
  );
}
