"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { UserRole } from "@/types";

interface User {
  id: number;
  fullName?: string;
  role: UserRole | "Customer" | "Technician" | "Admin";
}

const ROLE_LABEL: Record<UserRole, "Customer" | "Technician" | "Admin"> = {
  [UserRole.Customer]: "Customer",
  [UserRole.Technician]: "Technician",
  [UserRole.Admin]: "Admin",
};

function normalizeRole(role: User["role"]): "Customer" | "Technician" | "Admin" {
  if (typeof role === "number") return ROLE_LABEL[role] ?? "Customer";
  return role;
}

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/profile");
        if (response.ok) {
          const userData = await response.json();
          setUser({ id: userData.id, fullName: userData.fullName, role: userData.role });
        }
      } catch {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const getDashboardLink = () => {
    if (!user) return null;
    const role = normalizeRole(user.role);

    switch (role) {
      case "Admin":
        return "/admin/dashboard";
      case "Technician":
        return "/tech/dashboard";
      case "Customer":
      default:
        return "/app/dashboard";
    }
  };

  const greetingName = user?.fullName ? user.fullName.split(" ")[0] : "";

  if (isLoading) {
    return (
      <section className="grid gap-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
          <div className="flex gap-3">
            <div className="h-10 bg-gray-200 rounded w-32"></div>
            <div className="h-10 bg-gray-200 rounded w-24"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="grid gap-6">
      <h1 className="text-3xl font-bold">On-demand IT Support for Home & Business</h1>
      <p>Book certified technicians for repairs, setup, and troubleshooting.</p>

      {user ? (
        <div className="flex gap-3">
          <Link href="/services" className="px-4 py-2 rounded bg-black text-white">Explore Services</Link>
          <Link
            href={getDashboardLink()!}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Go to Dashboard
          </Link>
          <p className="text-sm text-gray-600 flex items-center">
            Welcome back, {greetingName || "there"}!
          </p>
        </div>
      ) : (
        <div className="flex gap-3">
          <Link href="/services" className="px-4 py-2 rounded bg-black text-white">Explore Services</Link>
          <Link href="/auth/register" className="px-4 py-2 rounded border">Get Started</Link>
        </div>
      )}
    </section>
  );
}