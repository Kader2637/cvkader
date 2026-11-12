"use client";

import React, { useEffect, useRef } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
};

/**
 * React Bits-inspired 3D Perspective Tilted Card with rAF-smoothed tilt and specular glare
 */
export default function TiltedCard({
  children,
  className = "",
  maxTilt = 10,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const glareRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const onMouseEnter = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 180ms cubic-bezier(0.22, 1, 0.36, 1)";
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;

    const clientX = e.clientX;
    const clientY = e.clientY;

    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const px = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
      const py = Math.min(1, Math.max(0, (clientY - rect.top) / rect.height));

      const rotateY = (px - 0.5) * maxTilt * 2;
      const rotateX = (0.5 - py) * maxTilt * 2;

      el.style.transition = "transform 110ms cubic-bezier(0.22, 1, 0.36, 1)";
      el.style.transform = `perspective(1200px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.01, 1.01, 1.01)`;

      if (glareRef.current) {
        glareRef.current.style.opacity = "1";
        glareRef.current.style.background = `radial-gradient(circle at ${(px * 100).toFixed(1)}% ${(py * 100).toFixed(1)}%, rgba(255,255,255,0.14), transparent 58%)`;
      }
    });
  };

  const onMouseLeave = () => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    const el = ref.current;
    if (el) {
      el.style.transition = "transform 600ms cubic-bezier(0.22, 1, 0.36, 1)";
      el.style.transform =
        "perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    }
    if (glareRef.current) {
      glareRef.current.style.opacity = "0";
    }
  };

  return (
    <div
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        transform:
          "perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      }}
      className={`relative h-full will-change-transform ${className}`}
    >
      {children}
      {/* Dynamic 3D Specular Glare */}
      <div
        ref={glareRef}
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 ease-out"
      />
    </div>
  );
}
