"use client";

import { useEffect } from "react";

export default function UseRevealOnScroll() {
  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal], .reveal")
    );

    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            // dukung stagger: data-reveal-delay="0.1s" / "120ms"
            const delay = el.getAttribute("data-reveal-delay") || "0ms";
            el.style.transitionDelay = delay;
            el.classList.add("reveal-show");
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
