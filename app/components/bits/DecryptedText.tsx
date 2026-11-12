"use client";

import { useEffect, useState } from "react";

/**
 * Crisp, zero-layout-shift staggered character reveal.
 * Renders every character in its final inline position from frame 0 so
 * headlines never jitter horizontally and remain compatible with bg-clip-text.
 */
export default function DecryptedText({
  text,
  className = "",
  speed = 28,
}: {
  text: string;
  className?: string;
  speed?: number;
}) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setRevealed(true);
      return;
    }

    const frame = requestAnimationFrame(() => {
      setRevealed(true);
    });
    return () => cancelAnimationFrame(frame);
  }, [text]);

  const words = text.split(" ");
  const stepMs = Math.min(speed, Math.max(14, Math.floor(480 / Math.max(text.length, 1))));
  let charIndex = 0;

  return (
    <span className={className} aria-label={text}>
      {words.map((word, wordIdx) => {
        const chars = Array.from(word);
        return (
          <span key={`${word}-${wordIdx}`} aria-hidden="true">
            {chars.map((char, cIdx) => {
              const delay = charIndex * stepMs;
              charIndex += 1;
              return (
                <span
                  key={`${wordIdx}-${cIdx}`}
                  style={{
                    opacity: revealed ? 1 : 0,
                    filter: revealed ? "blur(0px)" : "blur(6px)",
                    transition:
                      "opacity 380ms cubic-bezier(0.22, 1, 0.36, 1), filter 420ms cubic-bezier(0.22, 1, 0.36, 1)",
                    transitionDelay: `${delay}ms`,
                  }}
                >
                  {char}
                </span>
              );
            })}
            {wordIdx < words.length - 1 ? " " : null}
          </span>
        );
      })}
    </span>
  );
}
