import { api } from "../api";
import { buildQueryString } from "../query";
import {
  NotificationDto
} from "@/types";

export const notificationsClient = {
  // Get notifications
  list: (take: number = 20, skip: number = 0) => {
    const query = buildQueryString({ take, skip });
    return api.get<NotificationDto[]>(`/Notification${query ? `?${query}` : ""}`);
  },

  // Get unread count
  unreadCount: () => api.get<number>("/Notification/unread/count"),

  // Mark as read
  markAsRead: (id: number) => api.post<void>(`/Notification/${id}/read`),

  // Mark all as read
  markAllAsRead: () => api.post<void>("/Notification/read-all"),
};
