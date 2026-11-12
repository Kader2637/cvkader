"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Handles smooth scroll-driven zoom-in / zoom-out (--scroll-scale)
 * on cards & sections across all routes, plus reduced-motion fallback.
 */
export default function UseRevealOnScroll() {
  const pathname = usePathname();

  useEffect(() => {
    let rafId: number | null = null;

    const updateScrollZoom = () => {
      rafId = null;
      const vh = window.innerHeight || 800;
      const center = vh * 0.5;
      const targets = document.querySelectorAll<HTMLElement>(
        "[data-scroll-zoom], .bento-card"
      );

      targets.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.bottom < -60 || rect.top > vh + 60) {
          el.style.setProperty("--scroll-scale", "0.94");
          return;
        }
        const elCenter = rect.top + rect.height * 0.5;
        const dist = Math.min(1, Math.abs(elCenter - center) / (vh * 0.7));
        // Zoom in (1.0) near viewport center, gently zoom out (0.945) near edges
        const scale = 1 - dist * 0.055;
        el.style.setProperty("--scroll-scale", scale.toFixed(4));
      });
    };

    const onScroll = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(updateScrollZoom);
    };

    updateScrollZoom();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  return null;
}
