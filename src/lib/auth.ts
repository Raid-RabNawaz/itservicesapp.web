// src/lib/auth.ts
// No "use server" / "use client" pragma here on purpose.

function base64UrlDecode(segment: string): string {
  const s = segment.replace(/-/g, "+").replace(/_/g, "/") + "==".slice(0, (4 - (segment.length % 4)) % 4);
  if (typeof atob === "function") {
    try {
      return decodeURIComponent(
        atob(s)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
    } catch {
      return "";
    }
  }
  // Node/Edge
  try {
    return Buffer.from(s, "base64").toString("utf8");
  } catch {
    return "";
  }
}

export const decodeJwt = (token?: string): Record<string, unknown> | null => {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const json = base64UrlDecode(parts[1]);
  try {
    return JSON.parse(json) as Record<string, unknown>;
  } catch {
    return null;
  }
};
