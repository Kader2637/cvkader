"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * TopPageProgressBar:
 * Intercepts internal link clicks and route changes to show a smooth,
 * luminous progress bar at the very top of the screen (above navbar)
 * so navigation feels instantaneous and responsive without perceived lag.
 */
export default function TopPageProgressBar() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const prevPathRef = useRef(pathname);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const finishTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearAllTimers = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (finishTimeoutRef.current) {
      clearTimeout(finishTimeoutRef.current);
      finishTimeoutRef.current = null;
    }
  }, []);

  const startProgress = useCallback(() => {
    clearAllTimers();
    setVisible(true);
    setProgress(18);

    // Incrementally crawl forward while route is preparing
    timerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 88) return prev;
        const inc = Math.max(1, (90 - prev) * 0.18);
        return Math.min(88, prev + inc);
      });
    }, 120);
  }, [clearAllTimers]);

  const completeProgress = useCallback(() => {
    clearAllTimers();
    setProgress(100);
    finishTimeoutRef.current = setTimeout(() => {
      setVisible(false);
      setProgress(0);
    }, 280);
  }, [clearAllTimers]);

  // Intercept click on <a> tags that lead to internal navigation
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      // Ignore modified clicks (cmd/ctrl/shift/alt) or non-left clicks
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;

      const target = (e.target as HTMLElement)?.closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href) return;

      // Ignore hash links, mailto, tel, javascript, downloads, target="_blank"
      if (
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("javascript:") ||
        target.target === "_blank" ||
        target.hasAttribute("download")
      ) {
        return;
      }

      // Check if it's internal
      const currentOrigin = window.location.origin;
      try {
        const url = new URL(href, currentOrigin);
        if (url.origin !== currentOrigin) return;

        // If clicking current page with same pathname, ignore
        if (url.pathname === window.location.pathname && url.search === window.location.search) {
          return;
        }

        startProgress();
      } catch {
        // invalid URL, ignore
      }
    };

    document.addEventListener("click", handleDocumentClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleDocumentClick, { capture: true });
    };
  }, [startProgress]);

  // When pathname changes, complete progress bar
  useEffect(() => {
    if (pathname !== prevPathRef.current) {
      prevPathRef.current = pathname;
      completeProgress();
    }
  }, [pathname, completeProgress]);

  if (!visible && progress === 0) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 inset-x-0 z-[9999] h-[3px] bg-transparent"
    >
      {/* Glow Aura */}
      <div
        style={{
          width: `${progress}%`,
          opacity: visible ? 1 : 0,
          transition: "width 220ms ease-out, opacity 250ms ease",
        }}
        className="h-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-indigo-500 shadow-[0_0_12px_2px_rgba(99,102,241,0.65),0_0_4px_1px_rgba(6,182,212,0.8)] relative"
      >
        {/* Trailing bright flare at the head */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-2.5 rounded-full bg-cyan-300 blur-[2px] opacity-90" />
      </div>
    </div>
  );
}
