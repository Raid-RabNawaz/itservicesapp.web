import { api } from "../api";
import { buildQueryString } from "../query";
import {
  AddressDto,
  CreateAddressDto,
  UpdateAddressDto
} from "@/types";

export const addressesClient = {
  // Get addresses
  list: (take: number = 50, skip: number = 0) => {
    const query = buildQueryString({ take, skip });
    return api.get<AddressDto[]>(`/Address${query ? `?${query}` : ""}`);
  },

  // Create address
  create: (address: CreateAddressDto) =>
    api.post<AddressDto>("/Address", address),

  // Update address
  update: (id: number, address: UpdateAddressDto) =>
    api.put<void>(`/Address/${id}`, address),

  // Delete address
  delete: (id: number) => api.del<void>(`/Address/${id}`),

  // Set default address
  setDefault: (id: number) => api.post<void>(`/Address/${id}/default`),
};
