"use client";

import { useEffect } from "react";

export default function UseRevealOnScroll() {
  useEffect(() => {
    // Ambil semua elemen yang ingin direveal
    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal], .reveal")
    );

    if (!els.length) return;

    // Set keadaan awal (disembunyikan halus)
    els.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(12px) scale(0.98)";
      el.style.filter = "blur(4px)";
    });

    // Buat observer
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement; // ✅ penting agar bukan 'never'

          if (!entry.isIntersecting) return;

          // Delay animasi kalau ada atribut data-reveal-delay
          const delay = el.getAttribute("data-reveal-delay") || "0s";
          el.style.transition = `
            opacity .7s ease ${delay},
            transform .7s ease ${delay},
            filter .7s ease ${delay}
          `;

          // Jalankan animasi masuk
          requestAnimationFrame(() => {
            el.style.opacity = "1";
            el.style.transform = "translateY(0) scale(1)";
            el.style.filter = "blur(0)";
          });

          io.unobserve(el);
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    // Observe semua elemen
    els.forEach((el) => io.observe(el));

    // Cleanup observer ketika komponen unmount
    return () => io.disconnect();
  }, []);

  return null;
}
