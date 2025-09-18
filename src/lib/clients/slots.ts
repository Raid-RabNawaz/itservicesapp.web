import { api } from "../api";
import { buildQueryString } from "../query";
import { TechnicianSlotDto, CreateTechnicianSlotDto } from "@/types";

export const slotsClient = {
  // Get available slots for booking
  available: (params: {
    serviceCategoryId?: number;
    serviceIssueId?: number;
    dayUtc?: string;
  }) => {
    if (!params.dayUtc) {
      throw new Error("dayUtc is required when requesting available slots");
    }
    const query = buildQueryString(params);
    return api.get<TechnicianSlotDto[]>(`/Booking/available-slots?${query}`);
  },

  // Get technician agenda
  technicianAgenda: (technicianId: number, dayUtc?: string) => {
    const query = buildQueryString({ dayUtc });
    return api.get<TechnicianSlotDto[]>(`/Booking/technician/${technicianId}/agenda${query ? `?${query}` : ""}`);
  },

  // Technician slot management
  createSlot: (slot: CreateTechnicianSlotDto) =>
    api.post<TechnicianSlotDto>("/technician-slots", slot),

  deleteSlot: (technicianId: number, startUtc: string) => {
    const query = buildQueryString({ startUtc });
    return api.del<void>(`/technician-slots/${technicianId}${query ? `?${query}` : ""}`);
  },

  getDaySlots: (technicianId: number, dayUtc?: string) => {
    const query = buildQueryString({ dayUtc });
    return api.get<TechnicianSlotDto[]>(`/technician-slots/${technicianId}/day${query ? `?${query}` : ""}`);
  },

  // The backend API currently has no endpoints for technician self-service listings or time-off.
  // Leaving calls commented to avoid accidental use until the server supports them.
  // mySlots: (fromUtc: string, toUtc: string) => {
  //   const query = buildQueryString({ fromUtc, toUtc });
  //   return api.get<TechnicianSlotDto[]>(`/technician-slots/me?${query}`);
  // },
  // addTimeOff: (timeOff: { start: string; end: string; reason: string }) =>
  //   api.post<void>("/technician-slots/time-off", timeOff),
};
