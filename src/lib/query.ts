export function buildQueryString(params: Record<string, unknown>): string {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    const stringValue = typeof value === "string" ? value : value.toString();
    if (stringValue.length === 0) return;
    search.append(key, stringValue);
  });
  return search.toString();
}
