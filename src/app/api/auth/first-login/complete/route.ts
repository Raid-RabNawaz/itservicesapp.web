import { NextRequest, NextResponse } from "next/server";
import { env } from "@/lib/env";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const upstream = await fetch(`${env.NEXT_PUBLIC_API_BASE_URL}/auth/first-login/complete`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!upstream.ok) {
    const text = await upstream.text().catch(() => "");
    return new NextResponse(text || "Unable to complete first login", { status: upstream.status });
  }

  return new NextResponse(null, { status: 204 });
}
