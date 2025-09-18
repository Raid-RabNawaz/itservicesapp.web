"use client";
import { DateTime } from "luxon";
import { useMemo, useState } from "react";
import { useAvailableSlots } from "@/app/hooks/useSlots";
import { TechnicianSlotDto } from "@/types";

type Props = {
  serviceCategoryId: number;
  serviceIssueId: number;
  onSelect(slot: TechnicianSlotDto): void;
  days?: number; // default 14
};

export default function SlotPicker({ serviceCategoryId, serviceIssueId, onSelect, days = 14 }: Props) {
  const from = DateTime.now().startOf("day");
  const [selectedDate, setSelectedDate] = useState<string>(from.toISODate()!);

  const slotParams = {
    serviceCategoryId,
    serviceIssueId,
    // Backend `/Booking/available-slots` expects a YYYY-MM-DD string
    dayUtc: selectedDate,
  };

  console.log("SlotPicker params:", slotParams);

  const { data, isLoading, isError } = useAvailableSlots(slotParams);

  const dayMap = useMemo<Record<string, TechnicianSlotDto[]>>(() => {
    const map: Record<string, TechnicianSlotDto[]> = {};
    (data ?? []).forEach((slot) => {
      const date = DateTime.fromISO(slot.startUtc).toISODate()!;
      if (!map[date]) map[date] = [];
      map[date].push(slot);
    });
    return map;
  }, [data]);

  if (isLoading) return <div className="p-4 text-sm text-muted-foreground">Loading slots...</div>;
  if (isError) return <div className="p-4 text-sm text-destructive">Failed to load availability.</div>;

  const daysList = Array.from({ length: days }, (_, i) => from.plus({ days: i }).toISODate()!);
  const slots = dayMap[selectedDate] ?? [];

  return (
    <div className="grid gap-4">
      {/* Day selector */}
      <div className="flex gap-2 overflow-x-auto">
        {daysList.map((d) => {
          const dt = DateTime.fromISO(d);
          const active = d === selectedDate;
          const count = dayMap[d]?.length ?? 0;
          return (
            <button
              key={d}
              onClick={() => setSelectedDate(d)}
              className={`px-3 py-2 rounded-xl border ${active ? "bg-primary text-primary-foreground" : "bg-background"} min-w-[88px]`}
              title={`${count} slots`}
            >
              <div className="text-xs">{dt.toFormat("ccc dd")}</div>
              <div className="text-[10px] opacity-70">{count} slots</div>
            </button>
          );
        })}
      </div>

      {/* Time slots */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {slots.length === 0 && (
          <div className="col-span-full text-sm text-muted-foreground">No slots this day.</div>
        )}
        {slots.map((s, idx) => {
          const start = DateTime.fromISO(s.startUtc).toFormat("hh:mm a");
          const end = DateTime.fromISO(s.endUtc).toFormat("hh:mm a");
          return (
            <button
              key={idx}
              onClick={() => onSelect(s)}
              className="h-10 rounded-xl border hover:bg-accent"
            >
              <span className="text-sm">{start} - {end}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
