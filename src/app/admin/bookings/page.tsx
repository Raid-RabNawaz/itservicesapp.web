"use client";
import { useState } from "react";
import { useBookings, useCancelBooking } from "@/app/hooks/useBookings";
import type { BookingListQuery } from "@/types";
import { BookingStatus } from "@/types";

const STATUS_LABELS: Record<BookingStatus, string> = {
  [BookingStatus.PendingCustomerConfirmation]: "Pending Customer Confirmation",
  [BookingStatus.PendingTechnicianConfirmation]: "Pending Technician Confirmation",
  [BookingStatus.Confirmed]: "Confirmed",
  [BookingStatus.OnTheWay]: "On The Way",
  [BookingStatus.InProgress]: "In Progress",
  [BookingStatus.Completed]: "Completed",
  [BookingStatus.Cancelled]: "Cancelled",
};

export default function AdminBookingsPage() {
  const [q] = useState<BookingListQuery>({});
  const { data, isLoading, isError, refetch } = useBookings(q);
  const cancel = useCancelBooking();

  if (isLoading) return <div className="p-6">Loading�</div>;
  if (isError) return <div className="p-6 text-destructive">Failed to load.</div>;

  return (
    <main className="p-6 grid gap-4">
      <h1 className="text-2xl font-semibold">Bookings</h1>
      <div className="overflow-x-auto">
        <table className="min-w-[860px] w-full text-sm border rounded-2xl overflow-hidden">
          <thead className="bg-muted/30">
            <tr>
              <th className="text-left p-2">Code</th>
              <th className="text-left p-2">Service</th>
              <th className="text-left p-2">When</th>
              <th className="text-left p-2">Status</th>
              <th className="text-right p-2">Total</th>
              <th className="text-right p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {(data ?? []).map((b) => (
              <tr key={b.id} className="border-t">
                <td className="p-2">#{b.id}</td>
                <td className="p-2">Service #{b.serviceCategoryId}</td>
                <td className="p-2">{new Date(b.scheduledStartUtc).toLocaleString()}</td>
                <td className="p-2">{STATUS_LABELS[b.status] ?? `Status ${b.status}`}</td>
                <td className="p-2 text-right">-</td>
                <td className="p-2 text-right">
                  <button
                    className="text-red-600"
                    onClick={async () => { await cancel.mutateAsync(b.id); refetch(); }}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
            {(data ?? []).length === 0 && (
              <tr><td className="p-4 text-muted-foreground" colSpan={6}>No bookings found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}