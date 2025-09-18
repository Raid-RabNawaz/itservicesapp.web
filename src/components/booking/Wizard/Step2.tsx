"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBookingWizard } from "./useBookingWizard";

const Schema = z.object({
  line1: z.string().min(5, "Please enter a street and number"),
  line2: z.string().max(200).optional(),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State or region is required"),
  postalCode: z.string().min(3, "Postal code is required"),
  notes: z.string().max(500).optional(),
});
type FormValues = z.infer<typeof Schema>;

type Props = {
  onBack(): void;
  onNext(): void;
};

export default function Step2({ onBack, onNext }: Props) {
  const { address, setAddress } = useBookingWizard();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(Schema),
    defaultValues: {
      line1: address?.line1 ?? "",
      line2: address?.line2 ?? "",
      city: address?.city ?? "",
      state: address?.state ?? "",
      postalCode: address?.postalCode ?? "",
      notes: address?.notes ?? "",
    },
  });

  function submit(values: FormValues) {
    setAddress(values);
    onNext();
  }

  return (
    <form onSubmit={handleSubmit(submit)} className="grid gap-6">
      <h2 className="text-xl font-semibold">Where should we come?</h2>

      <div className="grid gap-2">
        <label className="text-sm font-medium">Street Address</label>
        <input
          {...register("line1")}
          placeholder="House #, Street"
          className="h-10 px-3 rounded-xl border"
        />
        {errors.line1 && <p className="text-xs text-destructive">{errors.line1.message}</p>}
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-medium">Apartment / Suite (optional)</label>
        <input
          {...register("line2")}
          placeholder="Apartment, suite, etc"
          className="h-10 px-3 rounded-xl border"
        />
        {errors.line2 && <p className="text-xs text-destructive">{errors.line2.message}</p>}
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="grid gap-2">
          <label className="text-sm font-medium">City</label>
          <input
            {...register("city")}
            placeholder="City"
            className="h-10 px-3 rounded-xl border"
          />
          {errors.city && <p className="text-xs text-destructive">{errors.city.message}</p>}
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium">State / Region</label>
          <input
            {...register("state")}
            placeholder="State"
            className="h-10 px-3 rounded-xl border"
          />
          {errors.state && <p className="text-xs text-destructive">{errors.state.message}</p>}
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium">Postal Code</label>
          <input
            {...register("postalCode")}
            placeholder="ZIP / Postal Code"
            className="h-10 px-3 rounded-xl border"
          />
          {errors.postalCode && <p className="text-xs text-destructive">{errors.postalCode.message}</p>}
        </div>
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-medium">Notes (optional)</label>
        <textarea
          {...register("notes")}
          placeholder="Any parking notes, gate codes, pet info..."
          className="min-h-[80px] px-3 py-2 rounded-xl border"
        />
        {errors.notes && <p className="text-xs text-destructive">{errors.notes.message}</p>}
      </div>

      <div className="flex justify-between">
        <button type="button" onClick={onBack} className="px-4 py-2 rounded-xl border">
          Back
        </button>
        <button type="submit" disabled={isSubmitting} className="px-4 py-2 rounded-xl bg-primary text-primary-foreground disabled:opacity-50">
          Continue
        </button>
      </div>
    </form>
  );
}
