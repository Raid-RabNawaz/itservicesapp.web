"use client";
import { useBookings } from "@/app/hooks/useBookings";
import { BookingDto, BookingStatus } from "@/types";

const STATUS_LABELS: Record<BookingStatus, string> = {
  [BookingStatus.PendingCustomerConfirmation]: "Awaiting your confirmation",
  [BookingStatus.PendingTechnicianConfirmation]: "Awaiting technician",
  [BookingStatus.Confirmed]: "Confirmed",
  [BookingStatus.OnTheWay]: "On the way",
  [BookingStatus.InProgress]: "In progress",
  [BookingStatus.Completed]: "Completed",
  [BookingStatus.Cancelled]: "Cancelled",
};

export default function AppDashboard() {
  const { data: upcoming, isLoading, isError } = useBookings({ take: 5, skip: 0 });

  if (isLoading) {
    return (
      <section className="grid gap-4">
        <h2 className="text-xl font-semibold">Upcoming Appointments</h2>
        <div className="grid gap-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white border rounded p-3 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-32 mb-1"></div>
              <div className="h-3 bg-gray-200 rounded w-20"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="grid gap-4">
        <h2 className="text-xl font-semibold">Upcoming Appointments</h2>
        <div className="bg-red-50 border border-red-200 rounded p-4 text-red-700">
          Failed to load bookings. Please try again.
        </div>
      </section>
    );
  }

  return (
    <section className="grid gap-4">
      <h2 className="text-xl font-semibold">Upcoming Appointments</h2>
      <ul className="grid gap-2">
        {upcoming && upcoming.length > 0 ? (
          upcoming.map((b: BookingDto) => {
            const scheduled = new Date(b.scheduledStartUtc).toLocaleString();
            const statusLabel = STATUS_LABELS[b.status] ?? `Status ${b.status}`;
            const primaryItem = b.items.length > 0 ? b.items[0] : undefined;

            return (
              <li key={b.id} className="bg-white border rounded p-3">
                <div className="font-medium">Booking #{b.id}</div>
                <div className="text-sm text-gray-600">{scheduled}</div>
                <div className="text-xs text-gray-500">Status: {statusLabel}</div>
                {primaryItem && (
                  <div className="text-xs text-gray-500 mt-1">Service: {primaryItem.serviceName}</div>
                )}
              </li>
            );
          })
        ) : (
          <li className="bg-white border rounded p-3 text-gray-500 text-center">
            No upcoming appointments
          </li>
        )}
      </ul>
    </section>
  );
}
