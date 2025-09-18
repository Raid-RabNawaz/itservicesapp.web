"use client";
import { DateTime } from "luxon";
import { useBookingWizard } from "./useBookingWizard";

type Props = { onBack(): void; onConfirm(): void; disabled?: boolean };

export default function Review({ onBack, onConfirm, disabled }: Props) {
  const { serviceCategory, serviceIssue, address, slot } = useBookingWizard();

  const addressPreview = [address?.line1, address?.line2, address?.city, address?.state, address?.postalCode]
    .filter((part) => part && part.trim().length > 0)
    .join(", ");

  return (
    <div className="grid gap-6">
      <h2 className="text-xl font-semibold">Review & confirm</h2>

      <div className="rounded-2xl border p-4 grid gap-2 text-sm">
        <div><span className="font-medium">Service Category: </span>{serviceCategory?.name}</div>
        <div><span className="font-medium">Service Issue: </span>{serviceIssue?.name}</div>
        <div><span className="font-medium">When: </span>
          {slot
            ? `${DateTime.fromISO(slot.startUtc).toFormat("ccc dd LLL, hh:mm a")} - ${DateTime.fromISO(slot.endUtc).toFormat("hh:mm a")}`
            : "Not selected"}
        </div>
        <div><span className="font-medium">Address: </span>{addressPreview || "Not provided"}</div>
        {address?.notes && <div><span className="font-medium">Notes: </span>{address.notes}</div>}
        <div className="font-semibold mt-2">Technician ID: {slot?.technicianId ?? "TBD"}</div>
      </div>

      <div className="flex justify-between">
        <button onClick={onBack} className="px-4 py-2 rounded-xl border">Back</button>
        <button onClick={onConfirm} disabled={disabled} className="px-4 py-2 rounded-xl bg-primary text-primary-foreground disabled:opacity-50">
          Confirm Booking
        </button>
      </div>
    </div>
  );
}