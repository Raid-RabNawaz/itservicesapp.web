"use client";
import { useAdminDashboard } from "@/app/hooks/useAdmin";
import { KpiCards } from "@/components/admin/KpiCards";

export default function AdminDashboardPage() {
  const { data, isLoading, isError } = useAdminDashboard();

  if (isLoading) return <div className="p-6">Loading dashboard…</div>;
  if (isError || !data) return <div className="p-6 text-destructive">Failed to load dashboard.</div>;

  return (
    <main className="p-6 grid gap-6">
      <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
      <KpiCards stats={data} />
      {/* Additional dashboard content can be added here */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-2xl border p-4">
          <div className="font-medium mb-2">System Overview</div>
          <div className="text-sm text-muted-foreground">
            <p>Total Bookings: {data.totalBookings}</p>
            <p>Upcoming Bookings: {data.upcomingBookings}</p>
            <p>Active Technicians: {data.activeTechnicians}</p>
            <p>Total Revenue: ${data.totalRevenue.toFixed(2)}</p>
          </div>
        </div>
        <div className="rounded-2xl border p-4">
          <div className="font-medium mb-2">Quick Actions</div>
          <div className="text-sm text-muted-foreground">
            <p>Manage users, view reports, and configure settings</p>
          </div>
        </div>
      </div>
    </main>
  );
}
