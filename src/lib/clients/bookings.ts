import { api } from "../api";
import { buildQueryString } from "../query";
import {
  BookingDto,
  BookingResponseDto,
  CreateBookingDto,
  RescheduleRequest,
  UpdateNotesRequest,
  TechnicianSlotDto,
} from "@/types";

export const bookingsClient = {
  // Get booking by ID
  byId: (id: number) => api.get<BookingResponseDto>(`/Booking/${id}`),

  // Get authenticated user bookings
  mine: (take: number = 20, skip: number = 0) => {
    const query = buildQueryString({ take, skip });
    return api.get<BookingDto[]>(`/Booking/me${query ? `?${query}` : ""}`);
  },

  // Create booking
  create: (payload: CreateBookingDto) => api.post<BookingResponseDto>("/Booking", payload),

  // Cancel booking
  cancel: (id: number) => api.post<BookingDto>(`/Booking/${id}/cancel`),

  // Reschedule booking
  reschedule: (id: number, rescheduleData: RescheduleRequest) =>
    api.post<BookingDto>(`/Booking/${id}/reschedule`, rescheduleData),

  // Complete booking
  complete: (id: number, actualEndUtc?: string) => {
    const query = buildQueryString({ actualEndUtc });
    return api.post<BookingDto>(`/Booking/${id}/complete${query ? `?${query}` : ""}`);
  },

  // Update booking notes
  updateNotes: (id: number, notes: UpdateNotesRequest) =>
    api.patch<BookingDto>(`/Booking/${id}/notes`, notes),

  // Get available slots
  availableSlots: (params: {
    serviceCategoryId: number;
    serviceIssueId: number;
    dayUtc: string;
    durationMinutes?: number;
  }) => {
    if (!params.dayUtc) {
      throw new Error("dayUtc is required when requesting available slots");
    }
    const query = buildQueryString({
      serviceCategoryId: params.serviceCategoryId,
      serviceIssueId: params.serviceIssueId,
      dayUtc: params.dayUtc,
      durationMinutes: params.durationMinutes,
    });
    return api.get<TechnicianSlotDto[]>(`/Booking/available-slots?${query}`);
  },

  // Get bookings by technician
  byTechnician: (
    technicianId: number,
    params: {
      fromUtc?: string;
      toUtc?: string;
      take?: number;
      skip?: number;
    },
  ) => {
    const query = buildQueryString(params);
    return api.get<BookingDto[]>(`/Booking/by-technician/${technicianId}${query ? `?${query}` : ""}`);
  },

  // Get technician agenda
  technicianAgenda: (technicianId: number, dayUtc?: string) => {
    const query = buildQueryString({ dayUtc });
    return api.get<TechnicianSlotDto[]>(`/Booking/technician/${technicianId}/agenda${query ? `?${query}` : ""}`);
  },
};

