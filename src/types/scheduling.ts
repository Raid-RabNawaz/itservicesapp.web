// Legacy compatibility types - these are now handled by the API types
export interface Slot {
  start: string; // ISO
  end: string;   // ISO
  technicianId?: number | null;
}

export interface AvailabilityDay {
  date: string; // YYYY-MM-DD
  slots: Slot[];
  capacity?: number; // optional for density views
}

export interface CreateSlotRequest {
  start: string;
  end: string;
  isRecurring?: boolean;
  daysOfWeek?: number[]; // 1..7
}

export interface TimeOffRequest {
  start: string;
  end: string;
  reason?: string;
}
