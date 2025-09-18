"use client";
import { useState } from "react";
import { useCreateBooking } from "@/app/hooks/useBookings";
import Step1 from "@/components/booking/Wizard/Step1";
import Step2 from "@/components/booking/Wizard/Step2";
import Step3 from "@/components/booking/Wizard/Step3";
import Review from "@/components/booking/Wizard/Review";
import { BookingWizardProvider, useBookingWizard } from "@/components/booking/Wizard/useBookingWizard";
import { PaymentMethod } from "@/types";

function Inner() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const { serviceCategory, serviceIssue, address, slot } = useBookingWizard();
  const { mutateAsync, isPending } = useCreateBooking();

  async function confirm() {
    if (!serviceCategory || !serviceIssue || !address || !slot || !slot.technicianId) return;

    await mutateAsync({
      technicianId: slot.technicianId,
      serviceCategoryId: serviceCategory.id,
      serviceIssueId: serviceIssue.id,
      start: slot.startUtc,
      end: slot.endUtc,
      address: {
        line1: address.line1,
        line2: address.line2,
        city: address.city,
        state: address.state,
        postalCode: address.postalCode,
      },
      notes: address.notes,
      preferredPaymentMethod: PaymentMethod.Cash,
      items: [
        {
          serviceIssueId: serviceIssue.id,
          quantity: 1,
        },
      ],
    });

    window.location.href = "/app/bookings";
  }

  return (
    <main className="p-6 grid gap-6">
      <h1 className="text-2xl font-semibold">Book Service</h1>
      {step === 1 && <Step1 onNext={() => setStep(2)} />}
      {step === 2 && <Step2 onBack={() => setStep(1)} onNext={() => setStep(3)} />}
      {step === 3 && serviceCategory && serviceIssue && (
        <Step3
          serviceCategoryId={serviceCategory.id}
          serviceIssueId={serviceIssue.id}
          onBack={() => setStep(2)}
          onNext={() => setStep(4)}
        />
      )}
      {step === 4 && <Review onBack={() => setStep(3)} onConfirm={confirm} disabled={isPending} />}
    </main>
  );
}

export default function NewBookingPage() {
  return (
    <BookingWizardProvider>
      <Inner />
    </BookingWizardProvider>
  );
}
