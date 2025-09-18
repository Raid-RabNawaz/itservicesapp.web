"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { UserRole } from "@/types";

interface UserProfile {
  id: number;
  fullName?: string;
  role: UserRole | "Customer" | "Technician" | "Admin";
}

const ROLE_LABEL: Record<UserRole, "Customer" | "Technician" | "Admin"> = {
  [UserRole.Customer]: "Customer",
  [UserRole.Technician]: "Technician",
  [UserRole.Admin]: "Admin",
};

function normalizeRole(role: UserProfile["role"]): "Customer" | "Technician" | "Admin" {
  if (typeof role === "number") {
    return ROLE_LABEL[role] ?? "Customer";
  }
  return role;
}

export default function Header() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/profile");
        if (response.ok) {
          const userData = await response.json();
          setUser({
            id: userData.id,
            fullName: userData.fullName,
            role: userData.role,
          });
        }
      } catch {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

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

  const getRoleSpecificLinks = () => {
    if (!user) return null;
    const role = normalizeRole(user.role);

    switch (role) {
      case "Admin":
        return (
          <>
            <Link href="/admin/bookings" className="text-sm hover:text-blue-600">Bookings</Link>
            <Link href="/admin/users/customers" className="text-sm hover:text-blue-600">Users</Link>
            <Link href="/admin/services" className="text-sm hover:text-blue-600">Services</Link>
            <Link href="/admin/reports/revenue" className="text-sm hover:text-blue-600">Reports</Link>
          </>
        );
      case "Technician":
        return (
          <>
            <Link href="/tech/agenda" className="text-sm hover:text-blue-600">Agenda</Link>
            <Link href="/tech/availability" className="text-sm hover:text-blue-600">Availability</Link>
            <Link href="/tech/profile" className="text-sm hover:text-blue-600">Profile</Link>
          </>
        );
      case "Customer":
      default:
        return (
          <>
            <Link href="/app/bookings" className="text-sm hover:text-blue-600">My Bookings</Link>
            <Link href="/app/book/new" className="text-sm hover:text-blue-600">Book Service</Link>
            <Link href="/app/invoices" className="text-sm hover:text-blue-600">Invoices</Link>
          </>
        );
    }
  };

  const displayName = user?.fullName ? user.fullName.split(" ")[0] : "";
  const roleLabel = user ? normalizeRole(user.role) : null;

  if (isLoading) {
    return (
      <header className="border-b bg-white">
        <div className="mx-auto max-w-6xl px-4 py-3 flex gap-6 items-center">
          <Link href="/" className="font-bold">IT Services</Link>
          <nav className="ml-auto flex gap-4 text-sm">
            <Link href="/services">Services</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <div className="animate-pulse bg-gray-200 h-4 w-16 rounded"></div>
          </nav>
        </div>
      </header>
    );
  }

  return (
    <header className="border-b bg-white">
      <div className="mx-auto max-w-6xl px-4 py-3 flex gap-6 items-center">
        <Link href="/" className="font-bold">IT Services</Link>

        <nav className="ml-auto flex gap-4 text-sm items-center">
          <Link href="/services">Services</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>

          {user ? (
            <>
              {getRoleSpecificLinks()}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  {displayName || "User"} ({roleLabel})
                </span>
                <Link
                  href={getDashboardLink()!}
                  className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <Link className="font-medium" href="/auth/login">Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
}