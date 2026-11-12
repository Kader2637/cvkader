"use client";

import { useEffect, useRef } from "react";

type Variant = "hero-bg" | "orbital";

/**
 * Interactive 3D Canvas:
 * - "hero-bg": Full-screen 3D starfield / depth particles reacting to mouse parallax
 * - "orbital": 3D rotating orbital rings & particle halo encircling a target card
 */
export default function Scene3D({
  className = "",
  variant = "orbital",
}: {
  className?: string;
  variant?: Variant;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      mouse.tx = (e.clientX / Math.max(1, window.innerWidth) - 0.5) * 2;
      mouse.ty = (e.clientY / Math.max(1, window.innerHeight) - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // Helper 3D rotation + perspective projection
    const project = (
      x: number,
      y: number,
      z: number,
      radius: number,
      cx: number,
      cy: number,
      ax: number,
      ay: number
    ) => {
      const cosY = Math.cos(ay);
      const sinY = Math.sin(ay);
      const x1 = x * cosY - z * sinY;
      const z1 = z * cosY + x * sinY;

      const cosX = Math.cos(ax);
      const sinX = Math.sin(ax);
      const y2 = y * cosX - z1 * sinX;
      const z2 = z1 * cosX + y * sinX;

      const fov = 3.4;
      const scale = fov / (fov + z2 + 1.2);
      return {
        sx: cx + x1 * radius * scale,
        sy: cy + y2 * radius * scale,
        scale,
        z: z2,
      };
    };

    // Data for "hero-bg"
    const bgStars = Array.from({ length: 85 }, (_, i) => ({
      x: ((i * 73) % 200) / 100 - 1,
      y: ((i * 137) % 200) / 100 - 1,
      z: ((i * 43) % 200) / 100 - 1,
      size: i % 4 === 0 ? 2 : 1.2,
    }));

    // Data for "orbital": 3 tilted space-style 3D rings + sphere star halo
    const RING_SEGMENTS = 72;
    const rings = [
      { tiltX: 0.95, tiltZ: 0.35, speed: 0.008, color: "indigo", r: 1.02 },
      { tiltX: -0.88, tiltZ: -0.45, speed: -0.006, color: "cyan", r: 1.1 },
      { tiltX: 0.35, tiltZ: 1.05, speed: 0.005, color: "violet", r: 0.96 },
    ];

    const haloPoints: Array<{ x: number; y: number; z: number; size: number }> = [];
    const phi = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < 64; i++) {
      const y = 1 - (i / 63) * 2;
      const ry = Math.sqrt(1 - y * y);
      const theta = phi * i;
      haloPoints.push({
        x: Math.cos(theta) * ry,
        y,
        z: Math.sin(theta) * ry,
        size: i % 3 === 0 ? 2.4 : 1.5,
      });
    }

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const isDark = document.documentElement.classList.contains("dark");

      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      time += 1;

      const cx = width * 0.5;
      const cy = height * 0.5;

      if (variant === "hero-bg") {
        const radius = Math.max(width, height) * 0.55;
        const ax = mouse.y * 0.25 + time * 0.0007;
        const ay = mouse.x * 0.35 + time * 0.0012;

        for (const s of bgStars) {
          const p = project(s.x, s.y, s.z, radius, cx, cy, ax, ay);
          const alpha = Math.max(0.08, Math.min(0.65, 0.45 - p.z * 0.3));
          ctx.fillStyle = isDark
            ? `rgba(165, 180, 252, ${alpha})`
            : `rgba(79, 70, 229, ${alpha * 0.7})`;
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, s.size * p.scale, 0, Math.PI * 2);
          ctx.fill();
        }
      } else {
        // "orbital": Space-style 3D orbital rings + satellites + star halo
        const baseRadius = Math.min(width, height) * 0.43;
        const camAx = mouse.y * 0.35;
        const camAy = mouse.x * 0.45;

        // 1. Halo sphere particles
        for (const pt of haloPoints) {
          const p = project(
            pt.x,
            pt.y,
            pt.z,
            baseRadius * 0.98,
            cx,
            cy,
            camAx + time * 0.002,
            camAy + time * 0.004
          );
          const alpha = Math.max(0.1, Math.min(0.85, 0.55 - p.z * 0.4));
          ctx.fillStyle = isDark
            ? `rgba(165, 180, 252, ${alpha})`
            : `rgba(79, 70, 229, ${alpha * 0.85})`;
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, pt.size * p.scale, 0, Math.PI * 2);
          ctx.fill();
        }

        // 2. Rotating 3D orbital rings + glowing satellites
        for (const ring of rings) {
          const spin = time * ring.speed;
          const pts: Array<{ sx: number; sy: number; z: number; scale: number }> = [];

          for (let i = 0; i <= RING_SEGMENTS; i++) {
            const a = (i / RING_SEGMENTS) * Math.PI * 2 + spin;
            const x0 = Math.cos(a) * ring.r;
            const y0 = Math.sin(a) * ring.r;
            const z0 = 0;

            // Tilt around X
            const y1 = y0 * Math.cos(ring.tiltX) - z0 * Math.sin(ring.tiltX);
            const z1 = y0 * Math.sin(ring.tiltX) + z0 * Math.cos(ring.tiltX);

            // Tilt around Z
            const x2 = x0 * Math.cos(ring.tiltZ) - y1 * Math.sin(ring.tiltZ);
            const y2 = x0 * Math.sin(ring.tiltZ) + y1 * Math.cos(ring.tiltZ);

            pts.push(project(x2, y2, z1, baseRadius, cx, cy, camAx, camAy));
          }

          ctx.lineWidth = 1.35;
          for (let i = 0; i < RING_SEGMENTS; i++) {
            const a = pts[i];
            const b = pts[i + 1];
            const alpha = Math.max(0.12, Math.min(0.75, 0.5 - (a.z + b.z) * 0.25));
            if (ring.color === "cyan") {
              ctx.strokeStyle = isDark
                ? `rgba(34, 211, 238, ${alpha})`
                : `rgba(14, 165, 233, ${alpha})`;
            } else if (ring.color === "violet") {
              ctx.strokeStyle = isDark
                ? `rgba(167, 139, 250, ${alpha})`
                : `rgba(124, 58, 237, ${alpha})`;
            } else {
              ctx.strokeStyle = isDark
                ? `rgba(99, 102, 241, ${alpha})`
                : `rgba(79, 70, 229, ${alpha})`;
            }
            ctx.beginPath();
            ctx.moveTo(a.sx, a.sy);
            ctx.lineTo(b.sx, b.sy);
            ctx.stroke();
          }

          // Glowing orbiting satellite dot on each ring
          const sat = pts[0];
          ctx.fillStyle = isDark ? "rgba(224, 231, 255, 0.95)" : "rgba(79, 70, 229, 0.95)";
          ctx.beginPath();
          ctx.arc(sat.sx, sat.sy, 3.6 * sat.scale, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [variant]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
}
