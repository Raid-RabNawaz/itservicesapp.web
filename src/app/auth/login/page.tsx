import { Suspense } from "react";
import LoginClient from "./LoginClient";

type Sp = { next?: string };

export default async function Page({
  searchParams,
}: {
  // 👇 searchParams is now a Promise in RSC
  searchParams: Promise<Sp>;
}) {
  const { next } = await searchParams; // 👈 await before using
  return (
    <Suspense fallback={null}>
      <LoginClient nextParam={next ?? null} />
    </Suspense>
  );
}
