"use client";
import { useQuery } from "@tanstack/react-query";
import { adminClient } from "@/lib/clients/admin";
import { 
  DashboardStatsDto, 
  RevenueReportDto, 
  TechnicianUtilizationDto,
  BookingResponseDto,
  UserDto
} from "@/types";

export const useAdminDashboard = () =>
  useQuery<DashboardStatsDto>({ 
    queryKey: ["admin-dashboard"], 
    queryFn: () => adminClient.dashboard() 
  });

export const useRevenueReport = (fromUtc?: string, toUtc?: string, interval: string = "Daily") =>
  useQuery<RevenueReportDto>({
    queryKey: ["revenue-report", fromUtc, toUtc, interval],
    queryFn: () => adminClient.revenue(fromUtc, toUtc, interval),
  });

export const useTechUtilization = (fromUtc?: string, toUtc?: string) =>
  useQuery<TechnicianUtilizationDto[]>({
    queryKey: ["tech-utilization", fromUtc, toUtc],
    queryFn: () => adminClient.utilization(fromUtc, toUtc),
  });

export const useAdminBookings = (params: {
  fromUtc?: string;
  toUtc?: string;
  userId?: number;
  technicianId?: number;
  take?: number;
  skip?: number;
}) =>
  useQuery<BookingResponseDto[]>({
    queryKey: ["admin-bookings", params],
    queryFn: () => adminClient.bookingsSearch(params),
  });

export const useUserBookings = (userId: number, params: {
  fromUtc?: string;
  toUtc?: string;
  take?: number;
  skip?: number;
}) =>
  useQuery<BookingResponseDto[]>({
    queryKey: ["user-bookings", userId, params],
    queryFn: () => adminClient.userBookings(userId, params),
    enabled: !!userId,
  });

export const useAdminUsers = (params: {
  q?: string;
  take?: number;
  skip?: number;
}) =>
  useQuery<UserDto[]>({
    queryKey: ["admin-users", params],
    queryFn: () => adminClient.users(params),
  });
