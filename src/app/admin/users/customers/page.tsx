// src/app/admin/users/customers/page.tsx  (similar for technicians page)
"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";

type UserDto = { id: number; email: string; fullName: string; role: number | string; mustChangePassword: boolean };

async function searchUsers(q: string, take = 50, skip = 0) {
  const qs = new URLSearchParams({ q, take: String(take), skip: String(skip) }).toString();
  return api.get<UserDto[]>(`/Admin/users?${qs}`);
}

export default function AdminUsers() {
  const qc = useQueryClient();
  const { data } = useQuery({ queryKey: ["admin/users", ""], queryFn: () => searchUsers("") });

  const disable = useMutation({
    mutationFn: (id: number) => api.post(`/Admin/users/${id}/disable`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin/users"] }),
  });
  const enable = useMutation({
    mutationFn: (id: number) => api.post(`/Admin/users/${id}/enable`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin/users"] }),
  });

  return (
    <div className="grid gap-4">
      <h2 className="text-xl font-semibold">Users</h2>
      <table className="min-w-full text-sm">
        <thead><tr><th className="text-left">Name</th><th className="text-left">Email</th><th>Role</th><th>Actions</th></tr></thead>
        <tbody>
          {(data ?? []).map(u => (
            <tr key={u.id} className="border-t">
              <td>{u.fullName}</td>
              <td>{u.email}</td>
              <td className="text-center">{String(u.role)}</td>
              <td className="text-center">
                <button className="mr-2 underline" onClick={() => disable.mutate(u.id)}>Disable</button>
                <button className="underline" onClick={() => enable.mutate(u.id)}>Enable</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}