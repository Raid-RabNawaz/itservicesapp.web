"use client";
import { DateTime } from "luxon";
import { useMyTechProfile, useTechCalendar } from "@/app/hooks/useTechnician";
import { TechnicianSlotDto } from "@/types";

export default function TechAgendaPage() {
  const today = DateTime.now().toISO();
  const { data: profile } = useMyTechProfile();
  const { data, isLoading, isError } = useTechCalendar(profile?.id || 0, today);

  if (isLoading) return <div className="p-6">Loading agenda…</div>;
  if (isError) return <div className="p-6 text-destructive">Failed to load agenda.</div>;

  const slots = (data ?? []).sort(
    (a, b) => new Date(a.startUtc).getTime() - new Date(b.startUtc).getTime()
  );

  return (
    <main className="p-6 grid gap-4">
      <h1 className="text-2xl font-semibold">Today&apos;s Agenda</h1>
      <ul className="grid gap-3">
        {slots.map((slot: TechnicianSlotDto) => (
          <li key={slot.id} className="rounded-2xl border p-4">
            <div className="flex items-center justify-between">
              <div className="font-medium">Slot #{slot.id}</div>
              <span className="text-xs rounded-full px-2 py-1 border">
                {slot.isAvailable ? "Available" : "Booked"}
              </span>
            </div>
            <div className="text-sm mt-1">
              {DateTime.fromISO(slot.startUtc).toFormat("hh:mm a")} – {DateTime.fromISO(slot.endUtc).toFormat("hh:mm a")}
            </div>
            <div className="text-sm text-muted-foreground">
              Technician ID: {slot.technicianId}
            </div>
          </li>
        ))}
        {slots.length === 0 && <div className="text-muted-foreground">No slots today.</div>}
      </ul>
    </main>
  );
}
