import { NextResponse } from "next/server";

export async function POST() {
  const headers = new Headers();
  headers.append("Set-Cookie", "accessToken=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0");
  headers.append("Set-Cookie", "refreshToken=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0");
  return new NextResponse(JSON.stringify({ ok: true }), { status: 200, headers });
}
