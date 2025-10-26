"use client";

import { usePathname } from "next/navigation";

export default function MainWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Home: dinamis; Halaman lain: tetap pt-16
  const cls = isHome ? "pt-16 sm:pt-8 md:pt-20 lg:pt-4 xl:pt-0" : "pt-16";

  return <main className={cls}>{children}</main>;
}
