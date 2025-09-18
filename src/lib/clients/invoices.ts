import { api } from "../api";
import { buildQueryString } from "../query";
import {
  InvoiceDto
} from "@/types";

export const invoicesClient = {
  // Get invoices
  list: (take: number = 50, skip: number = 0) => {
    const query = buildQueryString({ take, skip });
    return api.get<InvoiceDto[]>(`/Invoices${query ? `?${query}` : ""}`);
  },

  // Get invoice by booking
  byBooking: (bookingId: number) =>
    api.get<InvoiceDto>(`/Invoices/by-booking/${bookingId}`),

  // Get invoice PDF
  getPdf: (invoiceId: number) =>
    api.get<Blob>(`/Invoices/${invoiceId}/pdf`),
};
