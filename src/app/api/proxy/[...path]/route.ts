// src/app/api/proxy/[...path]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { env } from "@/lib/env";

async function handle(
  req: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path } = await context.params; // await the params promise
  const base = env.NEXT_PUBLIC_API_BASE_URL.replace(/\/$/, "");
  const target = `${base}/${path.join("/")}`;

  // Manually rebuild/flatten the query string to preserve all params
  const flattenedParams = new URLSearchParams();
  req.nextUrl.searchParams.forEach((value, key) => {
    if (value !== undefined && value !== null) {
      flattenedParams.append(key, value);
    }
  });
  const queryString = flattenedParams.toString();
  const url = queryString ? `${target}?${queryString}` : target;

  const token = req.cookies.get("accessToken")?.value;

  // Debug logging
  console.log(`[PROXY] ${req.method} ${url}`);
  console.log(`[PROXY] Query string: ${queryString}`);
  console.log(`[PROXY] Individual params:`, {
    serviceCategoryId: flattenedParams.get("serviceCategoryId"),
    serviceIssueId: flattenedParams.get("serviceIssueId"),
    dayUtc: flattenedParams.get("dayUtc"),
  });
  console.log(
    `[PROXY] All cookies:`,
    req.cookies.getAll().map((c) => `${c.name}=${c.value.substring(0, 20)}...`)
  );
  console.log(`[PROXY] Token present: ${!!token}`);
  if (token) {
    console.log(`[PROXY] Token preview: ${token.substring(0, 20)}...`);
  }

  const init: RequestInit = {
    method: req.method,
    headers: {
      // keep user-sent content-type if present
      "Content-Type": req.headers.get("content-type") ?? "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: ["GET", "HEAD"].includes(req.method) ? undefined : await req.text(),
    redirect: "manual",
  };

  const upstream = await fetch(url, init);

  // Debug logging for response
  console.log(`[PROXY] Response status: ${upstream.status}`);

  // pass through body & headers (strip hop-by-hop)
  const headers = new Headers(upstream.headers);
  headers.delete("transfer-encoding");
  headers.delete("content-encoding");

  return new NextResponse(upstream.body, {
    status: upstream.status,
    headers,
  });
}

export const GET = handle;
export const POST = handle;
export const PUT = handle;
export const PATCH = handle;
export const DELETE = handle;
