import Link from 'next/link';

export default function TechLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid gap-6">
      <nav className="flex gap-4 text-sm">
        <Link href="/tech/dashboard">Dashboard</Link>
        <Link href="/tech/agenda">Agenda</Link>
        <Link href="/tech/profile">Profile</Link>
        <Link href="/tech/availability">Availability</Link>
      </nav>
      {children}
    </div>
  );
}