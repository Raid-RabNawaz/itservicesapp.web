export interface RevenueReportRow {
  date: string;
  serviceName: string;
  technicianName?: string;
  area?: string;
  revenue: number;
  bookings: number;
}

export interface TechnicianUtilizationRow {
  technicianName: string;
  hoursAvailable: number;
  hoursBooked: number;
  utilizationPct: number;
}
