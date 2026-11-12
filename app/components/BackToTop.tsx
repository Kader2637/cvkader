"use client";

import { useEffect, useState } from "react";

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 360);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-xl border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md text-slate-700 dark:text-zinc-200 shadow-lg hover:border-indigo-500/40 hover:text-indigo-500 dark:hover:text-indigo-400 transition-all grid place-items-center"
    >
      <i className="fa-solid fa-arrow-up text-sm" />
    </button>
  );
}
