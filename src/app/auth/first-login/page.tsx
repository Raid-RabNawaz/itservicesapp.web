"use client";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function FirstLoginForm() {
  const router = useRouter();
  const params = useSearchParams();

  const [email, setEmail] = useState(() => params.get("email") ?? "");
  const [token, setToken] = useState(() => params.get("token") ?? "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/auth/first-login/complete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, token, newPassword: password }),
    });

    setLoading(false);

    if (!res.ok) {
      const text = await res.text();
      setError(text || "Unable to complete first login.");
      return;
    }

    setSuccess("Password set. Redirecting you to sign in...");
    setTimeout(() => {
      router.replace("/auth/login?message=Password%20updated");
    }, 1500);
  }

  return (
    <div className="max-w-md mx-auto py-12">
      <h1 className="text-2xl font-semibold mb-4">Set Your Password</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Use the one-time code from your email to complete your first login and set a password.
      </p>

      <form onSubmit={onSubmit} className="grid gap-4">
        {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
        {success && <p className="text-sm text-green-600">{success}</p>}

        <label className="grid gap-1">
          <span className="text-sm font-medium">Email</span>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded px-3 py-2"
          />
        </label>

        <label className="grid gap-1">
          <span className="text-sm font-medium">One-time code</span>
          <input
            required
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="border rounded px-3 py-2"
            placeholder="Paste the code from your email"
          />
        </label>

        <label className="grid gap-1">
          <span className="text-sm font-medium">New password</span>
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded px-3 py-2"
          />
        </label>

        <label className="grid gap-1">
          <span className="text-sm font-medium">Confirm password</span>
          <input
            required
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border rounded px-3 py-2"
          />
        </label>

        <button
          type="submit"
          className="px-4 py-2 rounded bg-black text-white disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Save password"}
        </button>
      </form>
    </div>
  );
}

export default function FirstLoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FirstLoginForm />
    </Suspense>
  );
}
