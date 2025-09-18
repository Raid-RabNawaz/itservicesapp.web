import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid gap-6">
      <nav className="flex gap-4 text-sm">
        <Link href="/admin/dashboard">Dashboard</Link>
        <Link href="/admin/bookings">Bookings</Link>
        <Link href="/admin/services">Services</Link>
        <Link href="/admin/users/customers">Customers</Link>
        <Link href="/admin/users/technicians">Technicians</Link>
        <Link href="/admin/reports/revenue">Reports</Link>
        <Link href="/admin/settings">Settings</Link>
      </nav>
      {children}
    </div>
  );
}