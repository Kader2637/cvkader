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
  // reveal animation on scroll
  useEffect(() => {
    const elements = document.querySelectorAll("#experience [data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("animate-fadeUp"));
      },
      { threshold: 0.2 }
    );
    elements.forEach((el) => observer.observe(el));
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
      className="page relative overflow-hidden bg-gradient-to-br from-gray-50 to-white py-10"
    >
      {/* soft gradient blobs */}
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -top-24 left-0 w-72 h-72 rounded-full bg-gradient-to-br from-blue-200 to-purple-200 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-gradient-to-tr from-cyan-200 to-indigo-200 blur-3xl"></div>
      </div>

      <section className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="max-w-3xl mx-auto text-center mb-20" data-reveal>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 ring-1 ring-blue-100">
            <span className="size-2 rounded-full bg-blue-500 animate-pulse"></span>{" "}
            Experience
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">
            Professional Journey
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Jejak karier saya membangun produk, tim, dan proses yang berdampak nyata untuk bisnis dan pengguna.
          </p>
        </header>

        {/* Timeline wrapper */}
        <div className="relative" data-reveal>
          {/* Garis: Mobile (kiri) */}
          <div className="absolute top-0 bottom-0 left-4 w-0.5 bg-gradient-to-b from-blue-500 via-purple-400 to-cyan-400 md:hidden" />
          {/* Garis: Desktop (tengah) */}
          <div className="hidden md:block absolute inset-y-0 left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-blue-500 via-purple-400 to-cyan-400" />

          <div className="space-y-16">
            {items.map((it, idx) => {
              const isLeft = it.side === "left";
              return (
                <div key={idx} className="relative" data-reveal>
                  {/* Node */}
                  <div
                    className="
                      absolute
                      left-4 -translate-x-1/2
                      md:left-1/2 md:-translate-x-1/2
                      top-2 z-10
                    "
                  >
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r ${it.dotGradient} text-white shadow-lg`}
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
                          ? "md:order-1 md:pr-24 xl:pr-28" // JARAK dari garis tengah
                          : "md:order-2 md:pl-24 xl:pl-28" // JARAK dari garis tengah
                      }`}
                    >
                      {/* Mobile (card penuh) */}
                      <div className="md:hidden ml-12">
                        <h3 className="text-2xl font-bold text-gray-900">{it.role}</h3>
                        <p className={`${it.colorClass} font-semibold mb-1`}>
                          {it.company} · {it.location}
                        </p>
                        <p className="text-gray-500 text-sm mb-3">{it.period}</p>
                        <p className="text-gray-700 leading-relaxed">{it.desc}</p>
                        <ul className="mt-3 text-sm text-gray-600 space-y-1">
                          {it.bullets.map((b) => (
                            <li key={b}>• {b}</li>
                          ))}
                        </ul>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {it.tags.map((t) => (
                            <span key={t} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                              {t}
                            </span>
                          ))}
                        </div>

                        <div className="mt-4">
                          <div className="p-[1.5px] rounded-2xl bg-gradient-to-tr from-blue-500/50 via-purple-500/50 to-cyan-500/50">
                            <div className="rounded-2xl bg-white/80 backdrop-blur-xl p-5 shadow-lg hover:-translate-y-1 transition">
                              <img
                                src={it.img.src}
                                className="rounded-xl w-full h-56 object-cover"
                                alt={it.img.alt}
                                loading="lazy"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Desktop (teks) */}
                      <div className="hidden md:block">
                        <div className={`${isLeft ? "text-right" : "text-left"}`}>
                          <h3 className="text-2xl font-bold text-gray-900">{it.role}</h3>
                          <p className={`${it.colorClass} font-semibold mb-1`}>
                            {it.company} · {it.location}
                          </p>
                          <p className="text-gray-500 text-sm mb-3">{it.period}</p>
                        </div>
                        <div className="inline-block mt-2">
                          <div className="rounded-2xl border border-gray-200/70 bg-white/70 backdrop-blur-xl p-5 shadow-sm">
                            <p className="text-gray-700 leading-relaxed">{it.desc}</p>
                            <ul className="mt-3 text-sm text-gray-600 space-y-1">
                              {it.bullets.map((b) => (
                                <li key={b}>• {b}</li>
                              ))}
                            </ul>
                            <div className="mt-3 flex flex-wrap gap-2">
                              {it.tags.map((t) => (
                                <span key={t} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
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
                      }`} // tambahkan padding menjauh dari garis
                    >
                      <div className="p-[1.5px] rounded-2xl bg-gradient-to-tr from-blue-500/50 via-purple-500/50 to-cyan-500/50">
                        <div className="rounded-2xl bg-white/80 backdrop-blur-xl p-5 shadow-lg hover:-translate-y-1 transition">
                          <img
                            src={it.img.src}
                            className="rounded-xl w-full h-56 object-cover"
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
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeUp {
          animation: fadeUp 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
