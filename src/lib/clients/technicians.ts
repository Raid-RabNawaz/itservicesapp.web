import { api } from "../api";
import { buildQueryString } from "../query";
import {
  TechnicianProfileDto,
  UpdateTechnicianProfileDto,
  TechnicianSlotDto,
  CreateTechnicianSlotDto,
  TechnicianEarningsSummaryDto,
  TechnicianPayoutDto,
} from "@/types";

export const techniciansClient = {
  // Technician Profile
  profile: (id: number) => api.get<TechnicianProfileDto>(`/Technician/${id}`),

  myProfile: () => api.get<TechnicianProfileDto>("/Technician/me"),

  updateProfile: (profile: UpdateTechnicianProfileDto) =>
    api.put<void>("/Technician/me", profile),

  // Calendar
  calendar: (id: number, dayUtc?: string) => {
    const query = buildQueryString({ dayUtc });
    return api.get<TechnicianSlotDto[]>(`/Technician/${id}/calendar${query ? `?${query}` : ""}`);
  },

  // Slots
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

  // Earnings
  earningsSummary: (technicianId: number, fromUtc?: string, toUtc?: string) => {
    const query = buildQueryString({ fromUtc, toUtc });
    return api.get<TechnicianEarningsSummaryDto>(`/technicians/${technicianId}/earnings/summary${query ? `?${query}` : ""}`);
  },

  payouts: (technicianId: number, take: number = 50, skip: number = 0) => {
    const query = buildQueryString({ take, skip });
    return api.get<TechnicianPayoutDto[]>(`/technicians/${technicianId}/earnings/payouts${query ? `?${query}` : ""}`);
  },
};
