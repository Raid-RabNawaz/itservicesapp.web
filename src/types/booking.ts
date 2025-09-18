import type { ServiceCategoryDto, ServiceIssueDto, BookingStatus, TechnicianSlotDto, BookingAddressDto, PaymentSummaryDto } from "./api";
import type { TechnicianLite } from "./technician";

export { BookingStatus } from "./api";
export type {
  BookingDto,
  BookingResponseDto,
  CreateBookingDto,
  RescheduleRequest,
  UpdateNotesRequest,
} from "./api";

// Additional booking helper types used purely on the frontend
export interface BookingSummary {
  id: number;
  serviceCategoryId: number;
  serviceCategoryName?: string;
  serviceIssueId: number;
  serviceIssueName?: string;
  scheduledAtUtc: string;
  status: BookingStatus;
  totalAmount?: number;
  technicianName?: string;
  userFullName?: string;
  address?: BookingAddressDto;
}


export interface BookingDetail extends BookingSummary {
  notes?: string;
  technician?: TechnicianLite | null;
  createdAtUtc: string;
  payment?: PaymentSummaryDto;
}


export interface CreateBookingRequest {
  serviceCategoryId: number;
  serviceIssueId: number;
  scheduledAtUtc: string;
  address: BookingAddressDto;
  notes?: string;
  technicianId: number;
  start: string;
  end: string;
}


export interface BookingListQuery {
  status?: BookingStatus;
  fromUtc?: string;
  toUtc?: string;
  search?: string;
  userId?: number;
  technicianId?: number;
  take?: number;
  skip?: number;
}

export interface BookingWizardState {
  serviceCategory?: ServiceCategoryDto;
  serviceIssue?: ServiceIssueDto;
  address?: { line1: string; line2?: string; city: string; state: string; postalCode: string; notes?: string };
  slot?: TechnicianSlotDto | null;
  payment?: { method: "card" | "cash"; tokenId?: string };
}