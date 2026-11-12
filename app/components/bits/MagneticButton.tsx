"use client";

import React, { useEffect, useRef } from "react";

/**
 * React Bits-inspired Magnetic wrapper for interactive buttons/links
 */
export default function MagneticButton({
  children,
  className = "",
  strength = 0.25,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;

    const clientX = e.clientX;
    const clientY = e.clientY;

    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      const x = (clientX - (rect.left + rect.width / 2)) * strength;
      const y = (clientY - (rect.top + rect.height / 2)) * strength;
      el.style.transition = "transform 110ms cubic-bezier(0.22, 1, 0.36, 1)";
      el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
    });
  };

  const onMouseLeave = () => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 500ms cubic-bezier(0.22, 1, 0.36, 1)";
    el.style.transform = "translate3d(0px, 0px, 0)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ transform: "translate3d(0px, 0px, 0)" }}
      className={`inline-block will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}
