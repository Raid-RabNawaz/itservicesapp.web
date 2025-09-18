export type {
  TechnicianProfileDto,
  TechnicianSlotDto,
  CreateTechnicianSlotDto,
  UpdateTechnicianProfileDto,
  TechnicianEarningsSummaryDto,
  TechnicianPayoutDto,
} from "./api";

// Minimal shape used in some UI helpers for quick technician lookups
export interface TechnicianLite {
  id: number;
  name: string;
  rating?: number;
}