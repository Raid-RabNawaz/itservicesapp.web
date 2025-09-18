"use client";
import { DateTime } from "luxon";
import { useState } from "react";
import { slotsClient } from "@/lib/clients/slots";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { TechnicianSlotDto } from "@/types";

export default function AvailabilityPage() {
  const [from] = useState(DateTime.now().startOf("week").toISO()!);
  const [to] = useState(DateTime.now().endOf("week").toISO()!);

  const [technicianId, setTechnicianId] = useState<number | null>(null);
  
  // Get technician ID first
  useQuery({
    queryKey: ["technician-me"],
    queryFn: async () => {
      const me = await api.get<{ id: number }>("/Technician/me");
      setTechnicianId(me.id);
      return me;
    },
  });

  const { data, isLoading, refetch } = useQuery<TechnicianSlotDto[]>({
    queryKey: ["my-slots", technicianId, from, to],
    queryFn: () => technicianId ? slotsClient.getDaySlots(technicianId, from) : Promise.resolve([]),
    enabled: !!technicianId,
  });

  async function addSlot() {
    if (!technicianId) return;
    const start = DateTime.now().plus({ hours: 2 }).startOf("hour").toISO()!;
    const end = DateTime.now().plus({ hours: 3 }).startOf("hour").toISO()!;
    await slotsClient.createSlot({ technicianId, startUtc: start, endUtc: end });
    refetch();
  }

  async function deleteSlot(s: TechnicianSlotDto) {
    await slotsClient.deleteSlot(s.technicianId, s.startUtc);
    refetch();
  }


  return (
    <main className="p-6 grid gap-4">
      <h1 className="text-2xl font-semibold">My Availability</h1>
      <div className="flex gap-2">
        <button onClick={addSlot} className="px-4 py-2 rounded-xl border">Add 1h Slot</button>
      </div>
      {isLoading ? (
        <div>Loading…</div>
      ) : (
        <ul className="grid gap-2">
          {(data ?? []).map((s, i) => (
            <li key={i} className="flex items-center justify-between rounded-xl border px-3 py-2">
              <span>
                {DateTime.fromISO(s.startUtc).toFormat("ccc dd, hh:mm a")} – {DateTime.fromISO(s.endUtc).toFormat("hh:mm a")}
                {!s.isAvailable && <span className="ml-2 text-sm text-muted-foreground">(Booked)</span>}
              </span>
              <button onClick={() => deleteSlot(s)} className="text-red-600 text-sm">Delete</button>
            </li>
          ))}
          {(data ?? []).length === 0 && <div className="text-muted-foreground">No slots this week.</div>}
        </ul>
      )}
    </main>
  );
}
