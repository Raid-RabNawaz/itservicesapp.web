"use client";
import { DashboardStatsDto } from "@/types";

export function KpiCards({ stats }: { stats: DashboardStatsDto }) {
  const items = [
    { label: "Total Bookings", value: stats.totalBookings },
    { label: "Upcoming Bookings", value: stats.upcomingBookings },
    { label: "Active Technicians", value: stats.activeTechnicians },
    { label: "Total Revenue", value: `$${stats.totalRevenue.toFixed(2)}` },
  ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {items.map((it) => (
        <div key={it.label} className="rounded-2xl border p-4">
          <div className="text-xs text-muted-foreground">{it.label}</div>
          <div className="text-xl font-semibold">{it.value}</div>
        </div>
      ))}
    </div>
  );
}
