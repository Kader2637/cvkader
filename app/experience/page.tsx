"use client";

import { useEffect } from "react";

type Item = {
  side: "left" | "right";
  role: string;
  company: string;
  location: string;
  period: string;
  desc: string;
  bullets: string[];
  tags: string[];
  img: { src: string; alt: string };
  dotGradient: string;
  colorClass: string;
  glowClass: string;
};

export default function Experience() {
  const items: Item[] = [
    {
      side: "left",
      role: "Founder AETHER NUSANTARA",
      company: "PT Kodingin Digital Nusantara",
      location: "Malang",
      period: "2025 — Sekarang",
      desc:
        "Memimpin arah produk & teknologi end-to-end: roadmap, arsitektur, quality gate, dan rilis. Fokus kecepatan rilis, reliability (SLO/SLI), dan efisiensi biaya.",
      bullets: [
        "Arsitektur service-oriented & full observability (traces, metrics, logs)",
        "CI/CD aman: review gate, SAST/DAST, canary & rollback",
        "Skala tim: coding guideline, code review, mentoring",
      ],
      tags: ["Laravel", "Node.js", "PHP 8", "MySQL/PostgreSQL", "Redis", "Docker/K8s"],
      img: { src: "/assets/foto/kodinusco.jpg", alt: "Kodingin Digital Nusantara" },
      dotGradient: "from-blue-500 to-purple-600",
      colorClass: "text-blue-600",
      glowClass: "glow-blue",
    },
    {
      side: "right",
      role: "Senior Developer",
      company: "PT Elshad Teknologi Indonesia",
      location: "Indonesia",
      period: "2025",
      desc:
        "Pengembangan fitur inti & optimasi performa. Refactor ke Laravel 10, implementasi caching Redis & queue worker, serta pipeline CI/CD yang cepat & aman.",
      bullets: [
        "API design & query tuning (Eloquent/SQL)",
        "Redis cache, Horizon/Queue, job retry & backoff",
        "CI/CD (GitHub Actions): testing & deploy otomatis",
      ],
      tags: ["Laravel 10", "MySQL", "Redis", "CI/CD"],
      img: {
        src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=900&h=600&fit=crop",
        alt: "Elshad Teknologi Indonesia",
      },
      dotGradient: "from-purple-500 to-pink-500",
      colorClass: "text-purple-600",
      glowClass: "glow-purple",
    },
    {
      side: "left",
      role: "HRD (Talent & Process)",
      company: "PT Kodingin Digital Nusantara",
      location: "Malang",
      period: "2025",
      desc:
        "Merancang pipeline rekrutmen end-to-end, menyelaraskan rubric interview teknis, dan mempercepat hiring untuk kebutuhan delivery & growth.",
      bullets: [
        "Hiring funnel & employer branding",
        "Technical interview rubric & pairing test",
        "Onboarding playbook & career ladder",
      ],
      tags: ["Hiring", "Mentoring", "Process"],
      img: {
        src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=900&h=600&fit=crop",
        alt: "HR & Talent",
      },
      dotGradient: "from-emerald-500 to-teal-500",
      colorClass: "text-emerald-600",
      glowClass: "glow-emerald",
    },
    {
      side: "right",
      role: "Junior Developer & Mentor",
      company: "PT Humma Teknologi Indonesia",
      location: "Indonesia",
      period: "2023 — 2024",
      desc:
        "Pengembangan aplikasi web (Laravel + React) & mentoring internal/bootcamp. Menerapkan standard coding, testing, dan versioning.",
      bullets: [
        "RESTful API, Blade/React, Authentication & Role",
        "Unit & feature testing; Git flow",
        "Review PR & knowledge sharing",
      ],
      tags: ["Laravel", "React", "MySQL", "Git"],
      img: { src: "/assets/foto/hummatech.jpg", alt: "Humma Teknologi Indonesia" },
      dotGradient: "from-indigo-500 to-violet-600",
      colorClass: "text-indigo-600",
      glowClass: "glow-cyan",
    },
  ];

  return (
    <div
      id="experience"
      className="page relative overflow-hidden py-16 sm:py-20"
    >
      <section className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header
          className="mx-auto mb-16 max-w-3xl text-center"
          data-reveal
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/80 px-3 py-1.5 text-xs font-semibold text-blue-700 backdrop-blur-sm shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Experience
            <span className="inline-flex items-center gap-1 rounded-full bg-white/80 px-2 py-0.5 text-[10px] text-slate-500 font-medium">
              <i className="fa-solid fa-route text-[9px] text-blue-500" />
              Career timeline
            </span>
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-black tracking-tight text-slate-900">
            Professional Journey
          </h2>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            Jejak karier dalam membangun produk, tim, dan proses yang{" "}
            <span className="font-semibold text-slate-900">nyata terasa</span>{" "}
            bagi bisnis dan pengguna.
          </p>
        </header>

        {/* Timeline wrapper */}
        <div className="relative">
          {/* Garis: Mobile (kiri) */}
          <div className="absolute top-0 bottom-0 left-5 w-[2px] bg-gradient-to-b from-blue-500/80 via-purple-500/80 to-cyan-500/80 md:hidden" />
          {/* Garis: Desktop (tengah) */}
          <div className="absolute inset-y-0 left-1/2 hidden w-[2px] -translate-x-1/2 bg-gradient-to-b from-blue-500/80 via-purple-500/80 to-cyan-500/80 md:block" />

          <div className="space-y-16">
            {items.map((it, idx) => {
              const isLeft = it.side === "left";
              return (
                <div
                  key={idx}
                  className="relative"
                  data-reveal
                  data-reveal-delay={`${(idx % 4) * 100}ms`}
                >
                  {/* Node */}
                  <div
                    className="
                      absolute
                      left-5 -translate-x-1/2
                      md:left-1/2 md:-translate-x-1/2
                      top-1.5 z-10
                    "
                  >
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r ${it.dotGradient} text-white shadow-[0_0_0_6px_rgba(99,102,241,0.15)]`}
                    >
                      <i className="fa-solid fa-briefcase text-sm" />
                    </div>
                  </div>

                  {/* Grid konten */}
                  <div className="md:grid md:grid-cols-2 md:gap-16">
                    {/* Kolom teks */}
                    <div
                      className={`${
                        isLeft
                          ? "md:order-1 md:pr-16 xl:pr-24"
                          : "md:order-2 md:pl-16 xl:pl-24"
                      }`}
                    >
                      {/* Mobile (card satu kolom) */}
                      <div className={`ml-12 space-y-4 rounded-2xl glass-card glass-card-hover p-5 border border-white/60 shadow-sm md:hidden ${it.glowClass}`}>
                        <div>
                          <h3 className="text-xl font-bold text-slate-900">
                            {it.role}
                          </h3>
                          <p className={`${it.colorClass} font-semibold text-sm`}>
                            {it.company} · {it.location}
                          </p>
                          <p className="mt-1 text-xs text-slate-400 font-medium">
                            {it.period}
                          </p>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          {it.desc}
                        </p>
                        <ul className="mt-2 space-y-1.5 text-sm text-slate-600 border-t border-slate-100 pt-3">
                          {it.bullets.map((b) => (
                            <li key={b} className="flex items-start gap-2">
                              <span className="text-blue-500 mt-1.5 shrink-0 size-1.5 rounded-full bg-blue-500" />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {it.tags.map((t) => (
                            <span
                              key={t}
                              className="inline-flex items-center rounded-xl bg-white border border-slate-200/80 px-2.5 py-1 text-[11px] text-slate-600 font-semibold shadow-sm"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                        <div className="mt-4">
                          <div className="rounded-2xl bg-gradient-to-tr from-blue-500/10 via-purple-500/10 to-cyan-500/10 p-[1.5px]">
                            <div className="group rounded-2xl bg-white/80 p-3 shadow-md border border-white/50">
                              <img
                                src={it.img.src}
                                className="h-48 w-full rounded-xl object-cover transition duration-500 group-hover:scale-105"
                                alt={it.img.alt}
                                loading="lazy"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Desktop (teks saja) */}
                      <div className="hidden md:block">
                        <div
                          className={`${
                            isLeft ? "text-right" : "text-left"
                          }`}
                        >
                          <h3 className="text-2xl font-bold text-slate-900 leading-tight">
                            {it.role}
                          </h3>
                          <p
                            className={`${it.colorClass} mt-1 text-sm font-semibold`}
                          >
                            {it.company} · {it.location}
                          </p>
                          <p className="mt-1 text-xs text-slate-400 font-medium">
                            {it.period}
                          </p>
                        </div>
                        <div
                          className={`mt-4 inline-block max-w-xl ${
                            isLeft ? "text-right" : "text-left"
                          }`}
                        >
                          <div className={`rounded-2xl glass-card glass-card-hover p-6 border border-white/60 shadow-sm ${it.glowClass}`}>
                            <p className="text-sm text-slate-600 leading-relaxed">
                              {it.desc}
                            </p>
                            <ul className="mt-4 space-y-2 text-sm text-slate-600 border-t border-slate-100 pt-4">
                              {it.bullets.map((b) => (
                                <li key={b} className={`flex items-start gap-2 ${isLeft ? "flex-row-reverse" : "flex-row"}`}>
                                  <span className="text-blue-500 mt-1.5 shrink-0 size-1.5 rounded-full bg-blue-500" />
                                  <span className={isLeft ? "text-right" : "text-left"}>{b}</span>
                                </li>
                              ))}
                            </ul>
                            <div
                              className={`mt-4 flex flex-wrap gap-2 ${
                                isLeft ? "justify-end" : "justify-start"
                              }`}
                            >
                              {it.tags.map((t) => (
                                <span
                                  key={t}
                                  className="inline-flex items-center rounded-xl bg-white border border-slate-200/80 px-2.5 py-1 text-[11px] text-slate-600 font-semibold shadow-sm"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Kolom gambar (desktop) */}
                    <div
                      className={`hidden md:block ${
                        isLeft ? "md:order-2 md:pl-6" : "md:order-1 md:pr-6"
                      }`}
                    >
                      <div className="rounded-2xl bg-gradient-to-tr from-blue-500/10 via-purple-500/10 to-cyan-500/10 p-[1.5px] shadow-sm">
                        <div className="group rounded-2xl bg-white/70 backdrop-blur-md p-4 shadow-md border border-white/50 transition duration-500 hover:shadow-lg">
                          <img
                            src={it.img.src}
                            className="h-56 w-full rounded-xl object-cover transition duration-700 group-hover:scale-105"
                            alt={it.img.alt}
                            loading="lazy"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
