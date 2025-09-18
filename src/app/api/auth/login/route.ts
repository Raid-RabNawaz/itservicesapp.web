import { NextRequest, NextResponse } from "next/server";
import { env } from "@/lib/env";
import { decodeJwt } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const upstream = await fetch(`${env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!upstream.ok) {
    const text = await upstream.text().catch(() => "");
    return new NextResponse(text || "Login failed", { status: upstream.status });
  }

  let payload: { token: string; mustChangePassword: boolean; user?: unknown } | null = null;
  try {
    payload = await upstream.json();
  } catch (err) {
    console.error("[LOGIN] Failed to parse JSON from backend", err);
    return new NextResponse("Unexpected login response", { status: 502 });
  }

  if (!payload || typeof payload.token !== "string") {
    return new NextResponse("Invalid login response", { status: 502 });
  }

  const accessToken = payload.token;
  const headers = new Headers();
  const decoded = decodeJwt(accessToken);
  const maxAge =
    decoded && typeof decoded.exp === "number"
      ? Math.max(0, decoded.exp - Math.floor(Date.now() / 1000))
      : 60 * 60;
  const cookieValue = `accessToken=${accessToken}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}`;
  headers.append("Set-Cookie", cookieValue);

  let role: string | undefined;
  if (decoded) {
    role =
      (decoded.role as string | undefined) ??
      (decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] as string | undefined);
  }

  const bodyResponse = {
    ok: true,
    role,
    mustChangePassword: Boolean(payload.mustChangePassword),
    user: payload.user ?? null,
  };

  return new NextResponse(JSON.stringify(bodyResponse), {
    status: 200,
    headers,
  });
}
