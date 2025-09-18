"use client";
import { DateTime } from "luxon";
import { useMemo } from "react";
import { useRevenueReport } from "@/app/hooks/useAdmin";
import { RevenueBucketDto } from "@/types";

export default function RevenueReportPage() {
  const { from, to } = useMemo(() => ({
    from: DateTime.now().minus({ days: 30 }).toISO()!,
    to: DateTime.now().toISO()!,
  }), []);
  
  const { data, isLoading, isError } = useRevenueReport(from, to);

  if (isLoading) return <div className="p-6">Loading…</div>;
  if (isError) return <div className="p-6 text-destructive">Failed to load.</div>;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Revenue (Last 30 Days)</h1>
      <div className="overflow-x-auto">
        <table className="min-w-[680px] w-full text-sm border rounded-2xl overflow-hidden">
          <thead className="bg-muted/30">
            <tr>
              <th className="text-left p-2">Date</th>
              <th className="text-left p-2">Service</th>
              <th className="text-left p-2">Technician</th>
              <th className="text-right p-2">Bookings</th>
              <th className="text-right p-2">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {data?.buckets?.map((r: RevenueBucketDto, i: number) => (
              <tr key={i} className="border-t">
                <td className="p-2">{new Date(r.periodStartUtc).toLocaleDateString()}</td>
                <td className="p-2">-</td>
                <td className="p-2">-</td>
                <td className="p-2 text-right">-</td>
                <td className="p-2 text-right">${r.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
