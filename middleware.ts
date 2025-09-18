// middleware.ts
import { NextRequest, NextResponse } from "next/server";

const ADMIN_PREFIX = "/admin";
const TECH_PREFIX = "/tech";
const APP_PREFIX = "/app";

function parseRoleFromJwt(token?: string): string | undefined {
  if (!token) return undefined;
  const parts = token.split(".");
  if (parts.length !== 3) return undefined;
  try {
    const payloadJson = JSON.parse(
      Buffer.from(parts[1].replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf8")
    ) as Record<string, unknown>;
    return (
      (payloadJson.role as string | undefined) ||
      (payloadJson["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] as string | undefined)
    );
  } catch {
    return undefined;
  }
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // public routes
  if (
    pathname === "/" ||
    pathname.startsWith("/services") ||
    pathname.startsWith("/auth") ||
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static")
  ) {
    return NextResponse.next();
  }

  const token = req.cookies.get("accessToken")?.value;
  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = "/auth/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  const role = parseRoleFromJwt(token);

  if (pathname.startsWith(ADMIN_PREFIX) && role !== "Admin") {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
  if (pathname.startsWith(TECH_PREFIX) && role !== "Technician") {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
  if (pathname.startsWith(APP_PREFIX) && !["Customer", "Admin", "Technician"].includes(role ?? "")) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|static|public).*)"],
};
