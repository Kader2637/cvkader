"use client";

export default function MainWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="pt-24 pb-12 min-h-[calc(100vh-140px)]">{children}</main>;
}
