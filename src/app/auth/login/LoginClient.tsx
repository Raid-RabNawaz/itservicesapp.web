"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { UserRole } from "@/types";

const ROLE_LABEL: Record<UserRole, "Customer" | "Technician" | "Admin"> = {
  [UserRole.Customer]: "Customer",
  [UserRole.Technician]: "Technician",
  [UserRole.Admin]: "Admin",
};

export default function LoginClient({ nextParam }: { nextParam: string | null }) {
  const r = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState(params.get("email") ?? "");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const payload = await res.json().catch(() => null);
    setLoading(false);

    if (!res.ok) {
      setError(payload?.message ?? "Login failed");
      return;
    }

    if (payload?.mustChangePassword) {
      setError("Please follow the email link to set your password before signing in.");
      const target = `/auth/first-login?email=${email}`;
      r.replace(target);
      return;
    }

    const role: UserRole | "Customer" | "Technician" | "Admin" | undefined = payload?.role;
    const normalizedRole = typeof role === "number" ? ROLE_LABEL[role] : role;

    if (nextParam) {
      r.replace(nextParam);
      return;
    }

    if (normalizedRole === "Admin") r.replace("/admin/dashboard");
    else if (normalizedRole === "Technician") r.replace("/tech/dashboard");
    else r.replace("/app/dashboard");
  }

  return (
    <form onSubmit={onSubmit} className="max-w-sm mx-auto grid gap-4">
      <h2 className="text-2xl font-semibold">Login</h2>
      {error && <p className="text-red-600 text-sm" role="alert">{error}</p>}
      <input
        className="border rounded px-3 py-2"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        className="border rounded px-3 py-2"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button className="px-4 py-2 rounded bg-black text-white disabled:opacity-60" disabled={loading}>
        {loading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
