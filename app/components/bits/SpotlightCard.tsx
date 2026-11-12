"use client";

import React, { useEffect, useRef } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
};

/**
 * React Bits-inspired Spotlight Card with cursor-following radial light
 */
export default function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(99, 102, 241, 0.16)",
}: Props) {
  const divRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = divRef.current;
    const overlay = overlayRef.current;
    if (!el || !overlay) return;

    const clientX = e.clientX;
    const clientY = e.clientY;

    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      overlay.style.background = `radial-gradient(420px circle at ${x.toFixed(1)}px ${y.toFixed(1)}px, ${spotlightColor}, transparent 62%)`;
    });
  };

  const handleMouseEnter = () => {
    if (overlayRef.current) overlayRef.current.style.opacity = "1";
  };

  const handleMouseLeave = () => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (overlayRef.current) overlayRef.current.style.opacity = "0";
  };

  return (
    <div
      ref={divRef}
      data-reveal=""
      data-scroll-zoom=""
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-2xl border border-slate-200/85 dark:border-white/[0.08] bg-white/85 dark:bg-zinc-900/65 backdrop-blur-md shadow-sm dark:shadow-[0_1px_0_0_rgba(255,255,255,0.03)_inset,0_8px_24px_rgba(0,0,0,0.22)] hover:border-slate-300/90 dark:hover:border-white/[0.15] transition-[border-color,box-shadow,background-color] duration-300 ${className}`}
    >
      <div
        ref={overlayRef}
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 ease-out"
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
