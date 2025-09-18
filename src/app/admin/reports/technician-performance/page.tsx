"use client";
import { DateTime } from "luxon";
import { useMemo } from "react";
import { useTechUtilization } from "@/app/hooks/useAdmin";

export default function TechPerformancePage() {
  const { from, to } = useMemo(() => ({
    from: DateTime.now().minus({ days: 30 }).toISO()!,
    to: DateTime.now().toISO()!,
  }), []);
  
  const { data, isLoading, isError } = useTechUtilization(from, to);

  if (isLoading) return <div className="p-6">Loading…</div>;
  if (isError) return <div className="p-6 text-destructive">Failed to load.</div>;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Technician Utilization</h1>
      <div className="overflow-x-auto">
        <table className="min-w-[680px] w-full text-sm border rounded-2xl overflow-hidden">
          <thead className="bg-muted/30">
            <tr>
              <th className="text-left p-2">Technician</th>
              <th className="text-right p-2">Hours Available</th>
              <th className="text-right p-2">Hours Booked</th>
              <th className="text-right p-2">Utilization %</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((r, i) => (
              <tr key={i} className="border-t">
                <td className="p-2">{r.technicianName || `Technician ${r.technicianId}`}</td>
                <td className="p-2 text-right">{r.availableHours}</td>
                <td className="p-2 text-right">{r.bookedHours}</td>
                <td className="p-2 text-right">{r.utilizationPercent.toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
