"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  /** dipanggil saat intro selesai (video ended / timeout) */
  onFinish?: () => void;
  /** fallback auto-close (ms) kalau video lama / gagal load */
  timeoutMs?: number;
};

/**
 * Fullscreen intro video overlay. Mengunci scroll saat tampil,
 * lalu mengembalikan scroll begitu ditutup.
 */
export default function VideoIntro({ onFinish, timeoutMs = 6000 }: Props) {
  const [visible, setVisible] = useState(true);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // kunci scroll saat mount
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    // fallback auto-hide
    hideTimer.current = setTimeout(() => handleHide(), timeoutMs);

    return () => {
      // pastikan dibalikin kalau unmount
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // kalau visibility berubah ke false, langsung pulihkan scroll
  useEffect(() => {
    if (!visible) {
      const html = document.documentElement;
      const body = document.body;
      html.style.overflow = "";
      body.style.overflow = "";
      onFinish?.();
    }
  }, [visible, onFinish]);

  const handleHide = () => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black">
      {/* Video full-bleed */}
      <video
        src="/assets/video.mp4" // pastikan file ada di /public/assets/video.mp4
        autoPlay
        muted
        playsInline
        className="w-full h-full object-cover"
        onEnded={handleHide}
        onError={handleHide}
      />

      {/* lapisan gelap tipis */}
      <div className="pointer-events-none absolute inset-0 bg-black/35" />

      {/* (opsional) klik untuk skip */}
      {/* <button
        onClick={handleHide}
        className="absolute bottom-6 right-6 rounded-full bg-white/10 text-white backdrop-blur px-4 py-2 text-sm hover:bg-white/20"
      >
        Skip
      </button> */}
    </div>
  );
}
