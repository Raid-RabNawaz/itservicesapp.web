"use client";
import { createContext, useContext, useMemo, useState, type ReactNode, type Dispatch, type SetStateAction } from "react";
import type { ServiceCategoryDto, ServiceIssueDto, TechnicianSlotDto } from "@/types";

type Address = { line1: string; line2?: string; city: string; state: string; postalCode: string; notes?: string; };

export type WizardState = {
  serviceCategory?: ServiceCategoryDto;
  serviceIssue?: ServiceIssueDto;
  address?: Address;
  slot: TechnicianSlotDto | null;

  // Use React dispatcher types so both values and updater functions are accepted
  setServiceCategory: Dispatch<SetStateAction<ServiceCategoryDto | undefined>>;
  setServiceIssue: Dispatch<SetStateAction<ServiceIssueDto | undefined>>;
  setAddress: Dispatch<SetStateAction<Address | undefined>>;
  setSlot: Dispatch<SetStateAction<TechnicianSlotDto | null>>;

  // Optional helper to reset the flow
  clear: () => void;
};

const Ctx = createContext<WizardState | null>(null);

export function BookingWizardProvider({ children }: { children: ReactNode }) {
  const [serviceCategory, setServiceCategory] = useState<ServiceCategoryDto | undefined>();
  const [serviceIssue, setServiceIssue] = useState<ServiceIssueDto | undefined>();
  const [address, setAddress] = useState<Address | undefined>();
  const [slot, setSlot] = useState<TechnicianSlotDto | null>(null);

  const clear = () => {
    setServiceCategory(undefined);
    setServiceIssue(undefined);
    setAddress(undefined);
    setSlot(null);
  };

  const value: WizardState = useMemo(
    () => {
      console.log("Wizard state updated:", { serviceCategory, serviceIssue, address, slot });
      return { 
        serviceCategory, 
        serviceIssue, 
        address, 
        slot, 
        setServiceCategory, 
        setServiceIssue, 
        setAddress, 
        setSlot, 
        clear 
      };
    },
    [serviceCategory, serviceIssue, address, slot]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useBookingWizard() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useBookingWizard must be used inside BookingWizardProvider");
  return ctx;
}

