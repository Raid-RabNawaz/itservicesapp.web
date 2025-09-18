// API Types matching .NET backend DTOs

// Enums
export enum BookingStatus {
  PendingCustomerConfirmation = 0,
  PendingTechnicianConfirmation = 1,
  Confirmed = 2,
  OnTheWay = 3,
  InProgress = 4,
  Completed = 5,
  Cancelled = 6
}

export enum UserRole {
  Customer = 0,
  Technician = 1,
  Admin = 2
}

export enum PaymentMethod {
  Cash = 1,
  Card = 2
}

// Address DTOs
export interface AddressDto {
  id: number;
  userId: number;
  label: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
  createdAtUtc: string;
}

export interface CreateAddressDto {
  label: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

export type UpdateAddressDto = CreateAddressDto;

// User DTOs
export interface UserDto {
  id: number;
  email?: string;
  fullName?: string;
  role: UserRole;
  mustChangePassword: boolean;
  createdAtUtc: string;
  modifiedAtUtc?: string;
}

export interface CreateUserDto {
  email?: string;
  fullName?: string;
  tempPassword?: string;
  role: UserRole;
}

export interface UpdateUserDto {
  fullName?: string;
  role: UserRole;
}

// Auth DTOs

export interface AuthTokenResponseDto {
  token: string;
  mustChangePassword: boolean;
  user: UserDto;
}

export interface LoginDto {
  email?: string;
  password?: string;
}

export interface RegisterDto {
  email?: string;
  fullName?: string;
  password?: string;
}

export interface ChangePasswordDto {
  currentPassword?: string;
  newPassword?: string;
}

export interface RequestPasswordResetDto {
  email?: string;
}

export interface ConfirmPasswordResetDto {
  email?: string;
  token?: string;
  newPassword?: string;
}

export interface FirstLoginPasswordSetupDto {
  email?: string;
  token?: string;
  newPassword?: string;
}

export interface SocialLoginDto {
  provider?: string;
  idToken?: string;
}

// Service DTOs
export interface ServiceCategoryDto {
  id: number;
  name?: string;
  description?: string;
}

export interface CreateServiceCategoryDto {
  name?: string;
  description?: string;
}

export interface UpdateServiceCategoryDto {
  name?: string;
  description?: string;
}

export interface ServiceIssueDto {
  id: number;
  serviceCategoryId: number;
  name?: string;
  description?: string;
  estimatedDurationMinutes?: number;
}

export interface CreateServiceIssueDto {
  serviceCategoryId: number;
  name?: string;
  description?: string;
  estimatedDurationMinutes?: number;
}

// Booking DTOs
export interface BookingAddressDto {
  addressId?: number;
  line1?: string;
  line2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}

export interface BookingItemDto {
  id: number;
  serviceIssueId: number;
  serviceName: string;
  serviceDescription?: string;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
  notes?: string;
}

export interface BookingDto {
  id: number;
  userId: number;
  technicianId: number;
  serviceCategoryId: number;
  serviceIssueId: number;
  scheduledStartUtc: string;
  scheduledEndUtc: string;
  status: BookingStatus;
  notes?: string;
  createdAtUtc: string;
  customerFullName: string;
  customerEmail: string;
  customerPhone?: string;
  address: BookingAddressDto;
  preferredPaymentMethod: PaymentMethod;
  estimatedTotal: number;
  finalTotal?: number;
  items: BookingItemDto[];
}

export interface BookingResponseDto extends BookingDto {
  technicianName?: string;
  userFullName?: string;
  payment?: PaymentSummaryDto;
}

export interface CreateBookingItemDto {
  serviceIssueId: number;
  quantity: number;
  unitPrice?: number;
  notes?: string;
}

export interface CreateBookingDto {
  userId?: number;
  technicianId: number;
  serviceCategoryId?: number;
  serviceIssueId?: number;
  start: string;
  end: string;
  address?: BookingAddressDto;
  notes?: string;
  preferredPaymentMethod?: PaymentMethod;
  guestFullName?: string;
  guestEmail?: string;
  guestPhone?: string;
  items: CreateBookingItemDto[];
  clientRequestId?: string;
}

export interface GuestBookingRequestDto {
  fullName: string;
  email: string;
  phone?: string;
  address: BookingAddressDto;
  technicianId: number;
  serviceCategoryId?: number;
  serviceIssueId?: number;
  start: string;
  end: string;
  preferredPaymentMethod?: PaymentMethod;
  notes?: string;
  items: CreateBookingItemDto[];
  clientRequestId?: string;
}

export interface GuestBookingResponseDto {
  requiresLogin: boolean;
  existingUserId?: number;
  booking?: BookingResponseDto;
}

export interface RescheduleRequest {
  newStartUtc: string;
  newEndUtc: string;
  newTechnicianId?: number;
}

export interface UpdateNotesRequest {
  notes?: string;
}

// Technician DTOs
export interface TechnicianProfileDto {
  id: number;
  userId: number;
  userFullName?: string;
  userEmail?: string;
  serviceCategoryId: number;
  serviceCategoryName?: string;
  bio?: string;
  hourlyRate?: number;
  isActive: boolean;
  averageRating: number;
  reviewsCount: number;
}

export interface UpdateTechnicianProfileDto {
  serviceCategoryId: number;
  bio?: string;
  hourlyRate?: number;
  isActive: boolean;
}

export interface TechnicianSlotDto {
  id: number;
  technicianId: number;
  startUtc: string;
  endUtc: string;
  start?: string;
  end?: string;
  durationMinutes?: number;
  isAvailable?: boolean;
}

export interface CreateTechnicianSlotDto {
  technicianId: number;
  startUtc: string;
  endUtc: string;
}

// Payment DTOs
export interface PaymentDto {
  id: number;
  bookingId: number;
  method: PaymentMethod;
  status?: string;
  amount: number;
  currency?: string;
  providerPaymentId?: string;
  providerChargeId?: string;
}

export interface CreatePaymentDto {
  bookingId: number;
  method: PaymentMethod;
  amount: number;
  currency?: string;
}

export interface PaymentSummaryDto {
  status: string;
  amount: number;
  currency?: string;
  providerPaymentId?: string;
}

// Dashboard DTOs
export interface DashboardStatsDto {
  totalBookings: number;
  upcomingBookings: number;
  activeTechnicians: number;
  totalRevenue: number;
}

export interface RevenueBucketDto {
  periodStartUtc: string;
  amount: number;
  currency?: string;
}

export interface RevenueReportDto {
  total: number;
  currency?: string;
  buckets?: RevenueBucketDto[];
}

export interface TechnicianUtilizationDto {
  technicianId: number;
  technicianName?: string;
  availableHours: number;
  bookedHours: number;
  utilizationPercent: number;
}

// Review DTOs
export interface TechnicianReviewDto {
  id: number;
  bookingId: number;
  technicianId: number;
  userId: number;
  rating: number;
  comment?: string;
  submittedAtUtc: string;
}

export interface CreateReviewDto {
  bookingId: number;
  technicianId: number;
  rating: number;
  comment?: string;
}

// Notification DTOs
export interface NotificationDto {
  id: number;
  userId: number;
  title?: string;
  message?: string;
  isRead: boolean;
  readAtUtc?: string;
  createdAtUtc: string;
}

export interface NotificationTemplateDto {
  id: number;
  key?: string;
  channel?: string;
  subject?: string;
  body?: string;
  isActive: boolean;
}

// Messaging DTOs
export interface MessageThreadDto {
  id: number;
  bookingId: number;
  customerId: number;
  technicianId: number;
  createdAtUtc: string;
  unreadForuserId?: number;
}

export interface MessageDto {
  id: number;
  threadId: number;
  senderuserId?: number;
  body?: string;
  sentAtUtc: string;
  isRead: boolean;
}

export interface SendMessageDto {
  threadId: number;
  body?: string;
}

// Invoice DTOs
export interface InvoiceDto {
  id: number;
  bookingId: number;
  number?: string;
  issuedAtUtc: string;
  subtotal: number;
  tax: number;
  total: number;
  currency?: string;
  status?: string;
}

// Service Report DTOs
export interface ServiceReportDto {
  bookingId: number;
  problemsDiagnosed?: string;
  actionsTaken?: string;
  partsUsed?: string[];
  timeSpentMinutes?: number;
  submittedAtUtc: string;
}

// Settings DTOs
export interface PlatformSettingsDto {
  technicianCommissionRate: number;
  cancellationPolicyHours: number;
  currency?: string;
}

export interface UpdatePlatformSettingsDto {
  technicianCommissionRate: number;
  cancellationPolicyHours: number;
  currency?: string;
}

// Technician Earnings DTOs
export interface TechnicianEarningsSummaryDto {
  technicianId: number;
  fromUtc: string;
  toUtc: string;
  gross: number;
  commissionFees: number;
  net: number;
}

export interface TechnicianPayoutDto {
  id: number;
  technicianId: number;
  amount: number;
  currency?: string;
  status?: string;
  createdAtUtc: string;
  paidAtUtc?: string;
}

// Legacy compatibility types
export type TechnicianSlotApi = TechnicianSlotDto;
export type Slot = TechnicianSlotDto;












