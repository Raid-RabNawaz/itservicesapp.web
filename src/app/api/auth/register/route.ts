import { NextRequest, NextResponse } from "next/server";
import { env } from "@/lib/env";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const upstream = await fetch(`${env.NEXT_PUBLIC_API_BASE_URL}/Auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!upstream.ok) {
    // Try to pass through backend error
    const text = await upstream.text().catch(() => "");
    return new NextResponse(text || "Registration failed", { status: upstream.status });
  }

  const userData = await upstream.json();

  return new NextResponse(JSON.stringify({ 
    ok: true, 
    message: "Registration successful",
    user: userData 
  }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
