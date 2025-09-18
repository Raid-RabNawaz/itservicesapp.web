"use client";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAdminUsers } from "@/app/hooks/useAdmin";
import { adminClient } from "@/lib/clients/admin";
import { UserDto, UserRole } from "@/types";

const ROLE_LABEL: Record<UserRole, string> = {
  [UserRole.Customer]: "Customer",
  [UserRole.Technician]: "Technician",
  [UserRole.Admin]: "Admin",
};

export default function AdminTechniciansPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const qc = useQueryClient();
  const { data: users, isLoading } = useAdminUsers({ q: searchQuery });

  const technicians = (users ?? []).filter((user) => user.role === UserRole.Technician);

  const disable = useMutation({
    mutationFn: (id: number) => adminClient.disableUser(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-users"] }),
  });

  const enable = useMutation({
    mutationFn: (id: number) => adminClient.enableUser(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-users"] }),
  });

  const verify = useMutation({
    mutationFn: (id: number) => adminClient.verifyTechnician(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-users"] }),
  });

  if (isLoading) return <div className="p-6">Loading technicians...</div>;

  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Technician Management</h1>
        <input
          type="text"
          placeholder="Search technicians..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-3 py-2 border rounded-lg w-64"
        />
      </div>

      <div className="bg-white rounded-lg border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {technicians.map((technician: UserDto) => (
              <tr key={technician.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{technician.fullName ?? "Unnamed"}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{technician.email ?? "-"}</div>
                </td>
                <td className="px-6 py-4 text-gray-700">{ROLE_LABEL[technician.role]}</td>
                <td className="px-6 py-4 text-sm font-medium">
                  <div className="flex gap-2">
                    <button
                      onClick={() => verify.mutate(technician.id)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Verify
                    </button>
                    <button
                      onClick={() => disable.mutate(technician.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Disable
                    </button>
                    <button
                      onClick={() => enable.mutate(technician.id)}
                      className="text-green-600 hover:text-green-900"
                    >
                      Enable
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {technicians.length === 0 && (
          <div className="text-center py-8 text-gray-500">No technicians found</div>
        )}
      </div>
    </main>
  );
}