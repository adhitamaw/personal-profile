"use client";

import { usePathname } from "next/navigation";

export default function PublicMain({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <main className={`flex-1 ${isAdmin ? "" : ""}`}>{children}</main>
  );
}
