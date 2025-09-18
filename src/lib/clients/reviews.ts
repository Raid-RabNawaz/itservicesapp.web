import { api } from "../api";
import { buildQueryString } from "../query";
import {
  TechnicianReviewDto,
  CreateReviewDto
} from "@/types";

export const reviewsClient = {
  // Create review
  create: (review: CreateReviewDto, userId?: number) => {
    const query = buildQueryString({ userId });
    const suffix = query ? `?${query}` : "";
    return api.post<TechnicianReviewDto>(`/Reviews${suffix}`, review);
  },

  // Get reviews by technician
  byTechnician: (technicianId: number, take: number = 20, skip: number = 0) => {
    const query = buildQueryString({ take, skip });
    return api.get<TechnicianReviewDto[]>(`/Reviews/technician/${technicianId}${query ? `?${query}` : ""}`);
  },

  // Get average rating
  averageRating: (technicianId: number) =>
    api.get<number>(`/Reviews/technician/${technicianId}/avg`),
};
