"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { formatBookingAddress } from "@/lib/format";
import { BookingResponseDto, BookingStatus } from "@/types";

const STATUS_LABELS: Record<BookingStatus, string> = {
  [BookingStatus.PendingCustomerConfirmation]: "Awaiting customer",
  [BookingStatus.PendingTechnicianConfirmation]: "Awaiting me",
  [BookingStatus.Confirmed]: "Confirmed",
  [BookingStatus.OnTheWay]: "On the way",
  [BookingStatus.InProgress]: "In progress",
  [BookingStatus.Completed]: "Completed",
  [BookingStatus.Cancelled]: "Cancelled",
};

export default function TechJobDetail() {
  const { id } = useParams<{ id: string }>();
  const r = useRouter();
  const [booking, setBooking] = useState<BookingResponseDto | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    (async () => {
      if (!id) return;
      const data = await api.get<BookingResponseDto>(`/Booking/${id}`);
      setBooking(data);
    })();
  }, [id]);

  async function complete() {
    if (!id) return;
    setBusy(true);
    try {
      await api.post(`/Booking/${id}/complete`);
      r.replace("/tech/dashboard");
    } finally {
      setBusy(false);
    }
  }

  if (!booking) return null;

  const schedule = `${new Date(booking.scheduledStartUtc).toLocaleString()} - ${new Date(booking.scheduledEndUtc).toLocaleString()}`;
  const statusLabel = STATUS_LABELS[booking.status] ?? `Status ${booking.status}`;
  const addressText = formatBookingAddress(booking.address);
  const primaryItem = booking.items.length > 0 ? booking.items[0] : undefined;

  return (
    <section className="grid gap-3">
      <h2 className="text-xl font-semibold">Job #{booking.id}</h2>
      <div>{schedule}</div>
      <div className="text-sm text-gray-600">Status: {statusLabel}</div>
      {addressText && <div className="text-sm text-gray-600">{addressText}</div>}
      {primaryItem && (
        <div className="text-sm text-gray-700">
          Service: {primaryItem.serviceName} (x{primaryItem.quantity})
        </div>
      )}
      {booking.notes && <div className="text-sm text-gray-600">Notes: {booking.notes}</div>}
      <button disabled={busy} onClick={complete} className="px-3 py-2 rounded bg-black text-white w-fit">
        {busy ? "Completing..." : "Mark Complete"}
      </button>
    </section>
  );
}
