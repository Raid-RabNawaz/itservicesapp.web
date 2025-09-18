import type { BookingAddressDto } from "@/types";

export function formatBookingAddress(address?: BookingAddressDto | null): string {
  if (!address) return "";
  const parts = [address.line1, address.line2, address.city, address.state, address.postalCode, address.country]
    .map((part) => part?.trim())
    .filter((part) => part);
  return parts.join(", ");
}
