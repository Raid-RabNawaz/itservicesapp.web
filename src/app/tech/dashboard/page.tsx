"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { TechnicianSlotDto } from "@/types";

export default function TechDashboard() {
  const [items, setItems] = useState<TechnicianSlotDto[]>([]);

  useEffect(() => {
    (async () => {
      const me = await api.get<{ id: number }>(`/Technician/me`);
      const dayUtc = new Date().toISOString();
      const agenda = await api.get<TechnicianSlotDto[]>(
        `/Booking/technician/${me.id}/agenda?dayUtc=${encodeURIComponent(dayUtc)}`
      );
      setItems(agenda ?? []);
    })();
  }, []);

  return (
    <section className="grid gap-4">
      <h2 className="text-xl font-semibold">Today&apos;s Jobs</h2>
      <ul className="grid gap-2">
        {items.map((slot) => {
          const key = slot.id ?? `${slot.technicianId}-${slot.startUtc}`;
          const start = slot.startUtc ?? slot.start ?? "";
          const end = slot.endUtc ?? slot.end ?? "";

          return (
            <li key={key} className="bg-white border rounded p-3">
              {start && end ? (
                <div className="font-medium">
                  {new Date(start).toLocaleTimeString()} - {new Date(end).toLocaleTimeString()}
                </div>
              ) : (
                <div className="font-medium">Slot {key}</div>
              )}
              <div className="text-sm text-gray-600">Technician #{slot.technicianId}</div>
              {slot.isAvailable !== undefined && (
                <div className="text-xs text-gray-500">
                  {slot.isAvailable ? "Available" : "Booked"}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}