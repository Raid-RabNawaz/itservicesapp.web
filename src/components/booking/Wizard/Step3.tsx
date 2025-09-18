"use client";
import { useState } from "react";
import SlotPicker from "@/components/scheduling/SlotPicker";
import { useBookingWizard } from "./useBookingWizard";
import type { TechnicianSlotDto } from "@/types";

type Props = {
  serviceCategoryId: number;
  serviceIssueId: number;
  onNext(): void;
  onBack(): void;
};

export default function Step3({ serviceCategoryId, serviceIssueId, onNext, onBack }: Props) {
  const { setSlot } = useBookingWizard();
  const [picked, setPicked] = useState<TechnicianSlotDto | null>(null);

  return (
    <div className="grid gap-6">
      <h2 className="text-xl font-semibold">Pick a time</h2>
      <SlotPicker
        serviceCategoryId={serviceCategoryId}
        serviceIssueId={serviceIssueId}
        onSelect={(slot) => {
          setPicked(slot);
          setSlot(slot); // store in provider for Review/submit
        }}
      />
      <div className="flex gap-2 justify-end">
        <button onClick={onBack} className="px-4 py-2 rounded-xl border">Back</button>
        <button
          onClick={onNext}
          disabled={!picked}
          className="px-4 py-2 rounded-xl bg-primary text-primary-foreground disabled:opacity-50"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
