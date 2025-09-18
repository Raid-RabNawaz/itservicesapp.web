// src/app/providers.tsx
"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useMemo, useEffect } from "react";
import { Toaster } from "sonner"; // remove this import if you don't want to install sonner
import { createHub } from "@/lib/signalr";

export default function Providers({ children }: { children: ReactNode }) {
  const client = useMemo(() => new QueryClient(), []);

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_SIGNALR_URL?.trim();
    if (!url) return; // ← do nothing if no URL configured

    const hub = createHub(url, async () => {
      // if you keep your JWT in an HttpOnly cookie, you might *not* need a tokenFactory
      // otherwise return a token string here
      return undefined;
    });

    hub.start().catch((err) => {
      console.warn("SignalR connect failed:", err);
    });

    return () => {
      try { hub.stop(); } catch {}
    };
  }, []);

  return (
    <QueryClientProvider client={client}>
      {children}
      <Toaster richColors closeButton /> {/* remove if you drop sonner */}
    </QueryClientProvider>
  );
}
