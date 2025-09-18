import { api } from "../api";
import { buildQueryString } from "../query";
import {
  DashboardStatsDto,
  RevenueReportDto,
  TechnicianUtilizationDto,
  BookingResponseDto,
  UserDto,
  CreateUserDto,
  UpdateUserDto
} from "@/types";

export const adminClient = {
  // Dashboard
  dashboard: () => api.get<DashboardStatsDto>("/Admin/dashboard"),

  // Revenue Reports
  revenue: (fromUtc?: string, toUtc?: string, interval: string = "Daily") => {
    const query = buildQueryString({ fromUtc, toUtc, interval });
    return api.get<RevenueReportDto>(`/Admin/revenue${query ? `?${query}` : ""}`);
  },

  // Technician Utilization
  utilization: (fromUtc?: string, toUtc?: string) => {
    const query = buildQueryString({ fromUtc, toUtc });
    return api.get<TechnicianUtilizationDto[]>(`/Admin/utilization${query ? `?${query}` : ""}`);
  },

  // Bookings
  bookingsSearch: (params: {
    fromUtc?: string;
    toUtc?: string;
    userId?: number;
    technicianId?: number;
    take?: number;
    skip?: number;
  }) => {
    const query = buildQueryString(params);
    return api.get<BookingResponseDto[]>(`/Admin/bookings/search${query ? `?${query}` : ""}`);
  },

  userBookings: (userId: number, params: {
    fromUtc?: string;
    toUtc?: string;
    take?: number;
    skip?: number;
  }) => {
    const query = buildQueryString(params);
    return api.get<BookingResponseDto[]>(`/Admin/users/${userId}/bookings${query ? `?${query}` : ""}`);
  },

  // Users
  users: (params: {
    q?: string;
    take?: number;
    skip?: number;
  }) => {
    const query = buildQueryString(params);
    return api.get<UserDto[]>(`/Admin/users${query ? `?${query}` : ""}`);
  },

  createUser: (user: CreateUserDto) => api.post<UserDto>("/Admin/users", user),

  updateUser: (id: number, user: UpdateUserDto) => api.put<void>(`/Admin/users/${id}`, user),

  disableUser: (id: number) => api.post<void>(`/Admin/users/${id}/disable`),

  enableUser: (id: number) => api.post<void>(`/Admin/users/${id}/enable`),

  verifyTechnician: (userId: number) => api.post<void>(`/Admin/users/${userId}/verify-technician`),
};
