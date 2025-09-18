export const env = {
  NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL ?? "",
};

if (!env.NEXT_PUBLIC_API_BASE_URL) {
  console.warn("NEXT_PUBLIC_API_BASE_URL is not set. API calls will fail.");
}