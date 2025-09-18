import './globals.css';
import Providers from './providers';
import Header from '@/components/Header';
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(APP_URL), 
  icons: { icon: "/favicon.ico" },
  title: 'IT Services App',
  description: 'Book and manage IT services',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <Header />
        <Providers>
          <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
        </Providers>
      </body>
    </html>
  );
}