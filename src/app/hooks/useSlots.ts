"use client";
import { useQuery } from "@tanstack/react-query";
import { slotsClient } from "@/lib/clients/slots";
import { TechnicianSlotDto } from "@/types";

export const useAvailableSlots = (params: {
  serviceCategoryId: number;
  serviceIssueId: number;
  dayUtc: string;
}) =>
  useQuery<TechnicianSlotDto[]>({
    queryKey: ["available-slots", params],
    queryFn: () => slotsClient.available(params),
    enabled: !!(params.serviceCategoryId && params.serviceIssueId && params.dayUtc),
  });

export const useTechnicianAgenda = (technicianId: number, dayUtc?: string) =>
  useQuery<TechnicianSlotDto[]>({
    queryKey: ["technician-agenda", technicianId, dayUtc],
    queryFn: () => slotsClient.technicianAgenda(technicianId, dayUtc),
    enabled: !!technicianId,
  });

export const useTechnicianSlots = (technicianId: number, dayUtc?: string) =>
  useQuery<TechnicianSlotDto[]>({
    queryKey: ["technician-slots", technicianId, dayUtc],
    queryFn: () => slotsClient.getDaySlots(technicianId, dayUtc),
    enabled: !!technicianId,
  });
