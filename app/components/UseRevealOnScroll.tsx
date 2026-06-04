"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function UseRevealOnScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const observedElements = new Set<HTMLElement>();

    const setupElement = (el: HTMLElement) => {
      if (observedElements.has(el)) return;
      observedElements.add(el);

      if (!el.classList.contains("revealed")) {
        el.style.opacity = "0";
        el.style.transform = "translateY(24px) scale(0.985)";
        el.style.filter = "blur(4px)";
      }
      el.style.transition = "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), filter 0.8s cubic-bezier(0.16, 1, 0.3, 1)";
      io.observe(el);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;

          if (entry.isIntersecting) {
            const delay = el.getAttribute("data-reveal-delay") || "0ms";
            el.style.transitionDelay = delay;
            requestAnimationFrame(() => {
              el.style.opacity = "1";
              el.style.transform = "translateY(0) scale(1)";
              el.style.filter = "blur(0)";
              el.classList.add("revealed");
            });
          } else {
            // Scroll exit animation
            el.style.transitionDelay = "0ms";
            requestAnimationFrame(() => {
              el.style.opacity = "0";
              el.style.transform = "translateY(24px) scale(0.985)";
              el.style.filter = "blur(4px)";
              el.classList.remove("revealed");
            });
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px -5% 0px",
      }
    );

    // Initial setup for existing elements
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal], .reveal"));
    els.forEach(setupElement);

    // MutationObserver to catch dynamically added elements (like after filters/pagination)
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const el = node as HTMLElement;
            if (el.matches("[data-reveal], .reveal")) {
              setupElement(el);
            }
            const children = Array.from(el.querySelectorAll<HTMLElement>("[data-reveal], .reveal"));
            children.forEach(setupElement);
          }
        });
      });
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      io.disconnect();
      mutationObserver.disconnect();
    };
  }, [pathname]);

  return null;
}
