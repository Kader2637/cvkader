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
};

export default function Experience() {
  // reveal animation on scroll (with small stagger)
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(
      "#experience [data-reveal]"
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          el.classList.add("animate-fadeUp");
          observer.unobserve(el);
        });
      },
      { threshold: 0.2 }
    );

    elements.forEach((el, idx) => {
      el.style.setProperty("--reveal-delay", `${idx * 80}ms`);
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const items: Item[] = [
    {
      side: "left",
      role: "Co-Founder & CTO",
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
    },
  ];

  return (
    <div
      id="experience"
      className="page relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 py-16 sm:py-20"
    >
      {/* soft gradient blobs */}
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute -top-24 left-0 h-72 w-72 rounded-full bg-gradient-to-br from-blue-200 to-purple-200 blur-3xl" />
        <div className="absolute -bottom-16 right-0 h-80 w-80 rounded-full bg-gradient-to-tr from-cyan-200 to-indigo-200 blur-3xl" />
      </div>

      <section className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header
          className="mx-auto mb-16 max-w-3xl text-center"
          data-reveal
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/80 px-3 py-1 text-xs font-medium text-blue-700 backdrop-blur-sm shadow-sm shadow-blue-100/60">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(34,197,94,0.35)]" />
            Experience
            <span className="inline-flex items-center gap-1 rounded-full bg-white/80 px-2 py-0.5 text-[10px] text-slate-500">
              <i className="fa-solid fa-route text-[9px]" />
              Career timeline
            </span>
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight text-slate-900">
            Professional Journey
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Jejak karier dalam membangun produk, tim, dan proses yang{" "}
            <span className="font-medium text-slate-900">nyata terasa</span>{" "}
            bagi bisnis dan pengguna.
          </p>
        </header>

        {/* Timeline wrapper */}
        <div className="relative">
          {/* Garis: Mobile (kiri) */}
          <div className="absolute top-0 bottom-0 left-5 w-[2px] bg-gradient-to-b from-blue-500 via-purple-400 to-cyan-400 md:hidden" />
          {/* Garis: Desktop (tengah) */}
          <div className="absolute inset-y-0 left-1/2 hidden w-[2px] -translate-x-1/2 bg-gradient-to-b from-blue-500 via-purple-400 to-cyan-400 md:block" />

          <div className="space-y-16">
            {items.map((it, idx) => {
              const isLeft = it.side === "left";
              return (
                <div
                  key={idx}
                  className="relative"
                  data-reveal
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
                      className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r ${it.dotGradient} text-white shadow-lg shadow-slate-300`}
                    >
                      <i className="fa-solid fa-briefcase" />
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
                      <div className="ml-12 space-y-4 rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm shadow-slate-200/70 backdrop-blur transition hover:-translate-y-1 hover:shadow-lg md:hidden">
                        <div>
                          <h3 className="text-xl font-bold text-slate-900">
                            {it.role}
                          </h3>
                          <p className={`${it.colorClass} font-semibold`}>
                            {it.company} · {it.location}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            {it.period}
                          </p>
                        </div>
                        <p className="text-sm text-slate-700 leading-relaxed">
                          {it.desc}
                        </p>
                        <ul className="mt-2 space-y-1 text-sm text-slate-600">
                          {it.bullets.map((b) => (
                            <li key={b}>• {b}</li>
                          ))}
                        </ul>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {it.tags.map((t) => (
                            <span
                              key={t}
                              className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-[11px] text-slate-700"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                        <div className="mt-4">
                          <div className="rounded-2xl bg-gradient-to-tr from-blue-500/40 via-purple-500/40 to-cyan-500/40 p-[1.5px]">
                            <div className="group rounded-2xl bg-white/90 p-4 shadow-md transition hover:-translate-y-0.5 hover:shadow-lg">
                              <img
                                src={it.img.src}
                                className="h-48 w-full rounded-xl object-cover transition group-hover:scale-[1.02]"
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
                          <h3 className="text-2xl font-bold text-slate-900">
                            {it.role}
                          </h3>
                          <p
                            className={`${it.colorClass} mt-0.5 text-sm font-semibold`}
                          >
                            {it.company} · {it.location}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            {it.period}
                          </p>
                        </div>
                        <div
                          className={`mt-4 inline-block max-w-xl ${
                            isLeft ? "text-right" : "text-left"
                          }`}
                        >
                          <div className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm shadow-slate-200/60 backdrop-blur transition hover:-translate-y-1 hover:shadow-lg">
                            <p className="text-sm text-slate-700 leading-relaxed">
                              {it.desc}
                            </p>
                            <ul className="mt-3 space-y-1 text-sm text-slate-600">
                              {it.bullets.map((b) => (
                                <li key={b}>• {b}</li>
                              ))}
                            </ul>
                            <div
                              className={`mt-3 flex flex-wrap gap-2 ${
                                isLeft ? "justify-end" : "justify-start"
                              }`}
                            >
                              {it.tags.map((t) => (
                                <span
                                  key={t}
                                  className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-[11px] text-slate-700 ring-1 ring-slate-200"
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
                      <div className="rounded-2xl bg-gradient-to-tr from-blue-500/40 via-purple-500/40 to-cyan-500/40 p-[1.5px]">
                        <div className="group rounded-2xl bg-white/90 p-4 shadow-md shadow-slate-200/80 backdrop-blur transition hover:-translate-y-1 hover:shadow-xl">
                          <img
                            src={it.img.src}
                            className="h-56 w-full rounded-xl object-cover transition group-hover:scale-[1.03]"
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

      {/* keyframes fadeUp */}
      <style jsx>{`
        @keyframes fadeUp {
          0% {
            opacity: 0;
            transform: translateY(26px) scale(0.98);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-fadeUp {
          animation: fadeUp 0.8s cubic-bezier(0.22, 0.61, 0.36, 1) forwards;
          animation-delay: var(--reveal-delay, 0ms);
        }
      `}</style>
    </div>
  );
}
