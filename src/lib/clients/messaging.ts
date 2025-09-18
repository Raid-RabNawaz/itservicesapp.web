import { api } from "../api";
import { buildQueryString } from "../query";
import {
  MessageThreadDto,
  MessageDto,
  SendMessageDto
} from "@/types";

export const messagingClient = {
  // Create thread by booking
  createThreadByBooking: (bookingId: number) =>
    api.post<MessageThreadDto>(`/Messaging/threads/by-booking/${bookingId}`),

  // Get messages in thread
  getMessages: (threadId: number, take: number = 50, skip: number = 0) => {
    const query = buildQueryString({ take, skip });
    return api.get<MessageDto[]>(`/Messaging/threads/${threadId}/messages${query ? `?${query}` : ""}`);
  },

  // Send message
  sendMessage: (message: SendMessageDto) =>
    api.post<MessageDto>("/Messaging/messages", message),

  // Mark thread as read
  markAsRead: (threadId: number) =>
    api.post<void>(`/Messaging/threads/${threadId}/read`),
};
