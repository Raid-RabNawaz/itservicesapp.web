import Link from 'next/link';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid gap-6">
      <nav className="flex gap-4 text-sm">
        <Link href="/app/dashboard">Dashboard</Link>
        <Link href="/app/book/new">Book</Link>
        <Link href="/app/bookings">Bookings</Link>
        <Link href="/app/invoices">Invoices</Link>
        <Link href="/app/notifications">Notifications</Link>
        <Link href="/app/profile">Profile</Link>
      </nav>
      {children}
    </div>
  );
}