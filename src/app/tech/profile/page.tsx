"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";

type TechnicianProfileDto = {
  id: number; userId: number;
  userFullName: string; userEmail: string;
  serviceCategoryId: number;
  serviceCategoryName: string;
  bio?: string; hourlyRate?: number; isActive: boolean;
  averageRating: number; reviewsCount: number;
};

export default function TechProfile() {
  const [profile, setProfile] = useState<TechnicianProfileDto | null>(null);
  const [bio, setBio] = useState("");
  const [rate, setRate] = useState<string>("");

  useEffect(() => {
    (async () => {
      const me = await api.get<TechnicianProfileDto>(`/Technician/me`);
      setProfile(me);
      setBio(me.bio ?? "");
      setRate(me.hourlyRate != null ? String(me.hourlyRate) : "");
    })();
  }, []);

  async function save() {
    if (!profile) return;

    await api.put(`/Technician/me`, {
      serviceCategoryId: profile.serviceCategoryId,
      bio,
      hourlyRate: rate ? Number(rate) : undefined,
      isActive: profile.isActive,
    });

    setProfile(await api.get<TechnicianProfileDto>(`/Technician/me`));
  }

  if (!profile) return null;
  return (
    <div className="grid gap-3 max-w-lg">
      <h2 className="text-xl font-semibold">My Profile</h2>
      <div className="text-sm text-gray-600">{profile.userFullName} - {profile.userEmail}</div>
      <label className="grid gap-1">
        <span className="text-sm">Bio</span>
        <textarea className="border rounded p-2" value={bio} onChange={(e) => setBio(e.target.value)} />
      </label>
      <label className="grid gap-1">
        <span className="text-sm">Hourly Rate</span>
        <input
          className="border rounded p-2"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          inputMode="decimal"
        />
      </label>
      <button onClick={save} className="px-3 py-2 rounded bg-black text-white w-fit">Save</button>
    </div>
  );
}