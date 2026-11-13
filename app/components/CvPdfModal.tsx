"use client";

import { useEffect } from "react";
import { useTheme } from "./ThemeProvider";
import ClientPortal from "./ClientPortal";

export default function CvPdfModal() {
  const { cvModalOpen, closeCvModal } = useTheme();

  useEffect(() => {
    if (!cvModalOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCvModal();
    };
    window.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [cvModalOpen, closeCvModal]);

  if (!cvModalOpen) return null;

  return (
    <ClientPortal>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cv-modal-title"
        className="fixed inset-0 z-[100] w-screen h-screen bg-black/80 backdrop-blur-xl grid place-items-center p-3 sm:p-5 backdrop-fade"
        onClick={closeCvModal}
      >
        <div
          className="w-full max-w-5xl h-[92vh] rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-zinc-900 shadow-2xl flex flex-col overflow-hidden modal-pop"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3.5 border-b border-slate-200/80 dark:border-white/[0.08] bg-slate-50/80 dark:bg-zinc-950/50">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-500 flex items-center justify-center shrink-0">
                <i className="fa-solid fa-file-pdf text-sm" />
              </div>
              <div className="min-w-0">
                <h2
                  id="cv-modal-title"
                  className="font-display text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate"
                >
                  Curriculum Vitae — Abdul Kader
                </h2>
                <p className="text-[11px] font-mono text-slate-500 dark:text-zinc-400 truncate">
                  AbdulKader_CV.pdf · Full Stack Developer &amp; Founder
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {/* Open in new tab fallback */}
              <a
                href="/assets/cv/AbdulKader_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-zinc-800 text-xs font-semibold text-slate-700 dark:text-zinc-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                title="Buka PDF di tab baru"
              >
                <i className="fa-solid fa-arrow-up-right-from-square text-[10px]" />
                <span className="hidden sm:inline">Tab Baru</span>
              </a>

              {/* Direct Download */}
              <a
                href="/assets/cv/AbdulKader_CV.pdf"
                download="AbdulKader_CV.pdf"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-sm transition"
                title="Download file PDF"
              >
                <i className="fa-solid fa-download text-[11px]" />
                <span className="hidden sm:inline">Download</span>
              </a>

              {/* Close Button */}
              <button
                type="button"
                onClick={closeCvModal}
                aria-label="Tutup preview PDF"
                className="w-8 h-8 rounded-xl border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:bg-zinc-800 transition ml-1"
              >
                <i className="fa-solid fa-xmark text-sm" />
              </button>
            </div>
          </div>

          {/* Modal Body / PDF Viewer */}
          <div className="relative flex-1 w-full bg-slate-100 dark:bg-zinc-950 overflow-hidden">
            <iframe
              src="/assets/cv/AbdulKader_CV.pdf#toolbar=1&navpanes=0&view=FitH"
              title="Preview Curriculum Vitae Abdul Kader"
              className="w-full h-full border-0"
            />
          </div>
        </div>
      </div>
    </ClientPortal>
  );
}
