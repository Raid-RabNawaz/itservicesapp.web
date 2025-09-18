import { api } from "../api";
import { 
  PaymentDto, 
  CreatePaymentDto
} from "@/types";

export const paymentsClient = {
  // Create payments
  createCashPayment: (payment: CreatePaymentDto) =>
    api.post<PaymentDto>("/Payments/cash", payment),
  
  createOnlinePayment: (payment: CreatePaymentDto) =>
    api.post<PaymentDto>("/Payments/online", payment),
  
  // Get payment by booking
  getByBooking: (bookingId: number) =>
    api.get<PaymentDto>(`/Payments/${bookingId}`),
};
