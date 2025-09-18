"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { bookingsClient } from "@/lib/clients/bookings";
import { BookingDto, BookingResponseDto, CreateBookingDto, BookingListQuery, RescheduleRequest } from "@/types";

export const useBookings = (q?: BookingListQuery) =>
  useQuery<BookingDto[]>({
    queryKey: ["bookings", q],
    queryFn: () => bookingsClient.mine(q?.take || 20, q?.skip || 0),
  });

export const useBooking = (id: number) =>
  useQuery<BookingResponseDto>({ 
    queryKey: ["booking", id], 
    queryFn: () => bookingsClient.byId(id), 
    enabled: !!id 
  });

export const useCreateBooking = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateBookingDto) => bookingsClient.create(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["bookings"] }),
  });
};

export const useCancelBooking = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => bookingsClient.cancel(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["bookings"] }),
  });
};

export const useRescheduleBooking = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, rescheduleData }: { id: number; rescheduleData: RescheduleRequest }) => 
      bookingsClient.reschedule(id, rescheduleData),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["bookings"] }),
  });
};

export const useCompleteBooking = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, actualEndUtc }: { id: number; actualEndUtc?: string }) => 
      bookingsClient.complete(id, actualEndUtc),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["bookings"] }),
  });
};

export const useUpdateBookingNotes = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, notes }: { id: number; notes: string }) => 
      bookingsClient.updateNotes(id, { notes }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["bookings"] }),
  });
};

export const useAvailableSlots = (params: {
  serviceCategoryId: number;
  serviceIssueId: number;
  dayUtc: string;
}) =>
  useQuery({
    queryKey: ["available-slots", params],
    queryFn: () => bookingsClient.availableSlots(params),
    enabled: !!(params.serviceCategoryId && params.serviceIssueId && params.dayUtc),
    retry: false,
  });

export const useTechnicianBookings = (technicianId: number, params: {
  fromUtc?: string;
  toUtc?: string;
  take?: number;
  skip?: number;
}) =>
  useQuery({
    queryKey: ["technician-bookings", technicianId, params],
    queryFn: () => bookingsClient.byTechnician(technicianId, params),
    enabled: !!technicianId,
  });

export const useTechnicianAgenda = (technicianId: number, dayUtc?: string) =>
  useQuery({
    queryKey: ["technician-agenda", technicianId, dayUtc],
    queryFn: () => bookingsClient.technicianAgenda(technicianId, dayUtc),
    enabled: !!technicianId,
  });
