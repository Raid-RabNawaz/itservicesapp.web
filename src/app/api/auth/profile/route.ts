import { NextRequest, NextResponse } from "next/server";
import { env } from "@/lib/env";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("accessToken")?.value;
    console.log(`[PROFILE] Token present: ${!!token}`);
    
    const upstream = await fetch(`${env.NEXT_PUBLIC_API_BASE_URL}/Auth/profile`, {
      method: "GET",
      headers: { 
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    console.log(`[PROFILE] Backend response status: ${upstream.status}`);

    if (!upstream.ok) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userData = await upstream.json();
    return new NextResponse(JSON.stringify(userData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(`[PROFILE] Error:`, error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
