"use client";
import { useQuery } from "@tanstack/react-query";
import { techniciansClient } from "@/lib/clients/technicians";
import { TechnicianProfileDto, TechnicianSlotDto, TechnicianEarningsSummaryDto, TechnicianPayoutDto } from "@/types";

export const useTechProfile = (id?: number) =>
  useQuery<TechnicianProfileDto>({ 
    queryKey: ["tech-profile", id], 
    queryFn: () => id ? techniciansClient.profile(id) : techniciansClient.myProfile(),
    enabled: !!id || true, // If no ID provided, get current user's profile
  });

export const useMyTechProfile = () =>
  useQuery<TechnicianProfileDto>({ 
    queryKey: ["tech-me"], 
    queryFn: () => techniciansClient.myProfile() 
  });

export const useTechCalendar = (id: number, dayUtc?: string) =>
  useQuery<TechnicianSlotDto[]>({
    queryKey: ["tech-calendar", id, dayUtc],
    queryFn: () => techniciansClient.calendar(id, dayUtc),
    enabled: !!id,
  });

export const useTechEarnings = (technicianId: number, fromUtc?: string, toUtc?: string) =>
  useQuery<TechnicianEarningsSummaryDto>({
    queryKey: ["tech-earnings", technicianId, fromUtc, toUtc],
    queryFn: () => techniciansClient.earningsSummary(technicianId, fromUtc, toUtc),
    enabled: !!technicianId,
  });

export const useTechPayouts = (technicianId: number, take: number = 50, skip: number = 0) =>
  useQuery<TechnicianPayoutDto[]>({
    queryKey: ["tech-payouts", technicianId, take, skip],
    queryFn: () => techniciansClient.payouts(technicianId, take, skip),
    enabled: !!technicianId,
  });
