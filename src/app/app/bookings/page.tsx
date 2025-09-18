import { api } from "@/lib/api";
import { formatBookingAddress } from "@/lib/format";
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

export default async function BookingsPage() {
  const items = await api.get<BookingDto[]>(`/Booking/me?take=20&skip=0`);

  return (
    <div className="grid gap-4">
      <h2 className="text-xl font-semibold">My Bookings</h2>
      <ul className="grid gap-2">
        {items.map((b) => {
          const scheduled = new Date(b.scheduledStartUtc).toLocaleString();
          const statusLabel = STATUS_LABELS[b.status] ?? `Status ${b.status}`;
          const addressText = formatBookingAddress(b.address);
          const primaryItem = b.items.length > 0 ? b.items[0] : undefined;
          const serviceSummary = primaryItem?.serviceName ?? `Issue #${b.serviceIssueId}`;

          return (
            <li key={b.id} className="bg-white border rounded p-4 grid gap-2">
              <div className="flex items-center justify-between gap-2">
                <div className="font-medium">Booking #{b.id}</div>
                <div className="text-xs text-gray-500">{scheduled}</div>
              </div>
              <div className="text-sm text-gray-700">{serviceSummary}</div>
              <div className="text-xs text-gray-500">Status: {statusLabel}</div>
              {addressText && <div className="text-sm text-gray-500">{addressText}</div>}
              {typeof b.estimatedTotal === "number" && b.estimatedTotal > 0 && (
                <div className="text-sm text-gray-700">
                  Estimated total: {b.estimatedTotal.toFixed(2)}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
