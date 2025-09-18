type HttpMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

function serverBase() {
  // When called from Server Components / Route Handlers, use absolute origin
  // Set this in .env.local (examples below)
  return process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") || "http://localhost:3000";
}

async function request<T>(method: HttpMethod, path: string, body?: unknown, init?: RequestInit): Promise<T> {
  // Ensure the backend path you pass **includes** `/api/...`
  const isServer = typeof window === "undefined";
  const origin = isServer ? serverBase() : "";
  const url = `${origin}/api/proxy${path.startsWith("/") ? path : `/${path}`}`;

  const serializedBody = body ? JSON.stringify(body) : undefined;
  const bodyPreview = serializedBody ? serializedBody.slice(0, 500) : undefined;
  console.log(`[API] ${method} ${url}${bodyPreview ? ` :: body=${bodyPreview}` : ""}`);

  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
    body: serializedBody,
    credentials: "include",
    cache: "no-store",
    ...init,
  });

  if (!res.ok) {
    let message = res.statusText;
    try { const data = await res.json(); message = (data?.message || data?.error || message) as string; } catch {}
    throw new Error(`${res.status} ${message}`);
  }

  if (res.status === 204) return undefined as T;

  const contentTypeHeader = res.headers.get("content-type");
  const contentType = contentTypeHeader?.split(";")[0]?.trim().toLowerCase() ?? "";

  if (!contentType) {
    const text = await res.text();
    if (!text) return undefined as T;
    try { return JSON.parse(text) as T; } catch { return text as unknown as T; }
  }

  if (contentType.includes("application/json")) {
    return (await res.json()) as T;
  }

  if (contentType.includes("application/pdf")) {
    return (await res.blob()) as unknown as T;
  }

  if (contentType.startsWith("text/")) {
    return (await res.text()) as unknown as T;
  }

  return (await res.arrayBuffer()) as unknown as T;
}

export const api = {
  get:  <T>(path: string, init?: RequestInit) => request<T>("GET", path, undefined, init),
  post: <T>(path: string, body?: unknown, init?: RequestInit) => request<T>("POST", path, body, init),
  patch:<T>(path: string, body?: unknown, init?: RequestInit) => request<T>("PATCH", path, body, init),
  put:  <T>(path: string, body?: unknown, init?: RequestInit) => request<T>("PUT", path, body, init),
  del:  <T>(path: string, init?: RequestInit) => request<T>("DELETE", path, undefined, init),
};
