"use client";

import { useEffect, useState, useCallback } from "react";

type Certificate = {
  key: string;
  title: string;
  org: string;
  subtitle?: string;
  description?: string;
  skills?: string[];
  image: string;
};

export default function Education() {
  // ====== STATE MODAL SERTIFIKAT ======
  const [open, setOpen] = useState(false);
  const [activeCert, setActiveCert] = useState<Certificate | null>(null);

  // === DATA SERTIFIKAT (disesuaikan) ===
  const certificates: Certificate[] = [
    {
      key: "humma",
      title: "Programmer (Junior Developer)",
      org: "PT Humma Teknologi Indonesia",
      subtitle: "Track: Laravel & Web Development",
      description:
        "Peran sebagai Junior Developer berfokus pada Laravel: membangun modul CRUD, REST API, autentikasi/otorisasi, dan kolaborasi fitur dasar bersama tim.",
      skills: ["Laravel", "REST API", "MySQL", "Blade/Livewire", "Git"],
      image: "/assets/cert/programmer.jpg",
    },
    {
      key: "lks",
      title: "LKS Kabupaten Probolinggo — Juara 3",
      org: "IT Software Solutions for Business",
      subtitle: ".NET (C#) & SQL Server",
      description:
        "Merancang solusi perangkat lunak end-to-end menggunakan .NET (C#) dan SQL Server: analisis kebutuhan, desain ERD, implementasi, serta presentasi solusi.",
      skills: [".NET (C#)", "SQL Server", "Entity Framework", "ERD/UML"],
      image: "/assets/cert/lks.png",
    },
    {
      key: "kodingin",
      title: "Senior Developer (Full-Stack)",
      org: "PT Kodingin Digital Nusantara",
      subtitle: "Full-Stack Product Development",
      description:
        "Peran sebagai Senior Full-Stack: pengembangan fitur end-to-end (React/Next.js, Node.js, Laravel), optimasi performa, standardisasi CI/CD, dan review kode.",
      skills: ["React/Next.js", "Node.js", "Laravel", "PostgreSQL", "Redis", "CI/CD"],
      image: "/assets/cert/senior.png",
    },
  ];

  const openModal = useCallback((cert: Certificate) => {
    setActiveCert(cert);
    setOpen(true);
    // lock scroll
    document.documentElement.style.overflow = "hidden";
  }, []);

  const closeModal = useCallback(() => {
    setOpen(false);
    setActiveCert(null);
    document.documentElement.style.overflow = "";
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeModal]);

  // ====== REVEAL ON SCROLL ======
  useEffect(() => {
    const nodes: HTMLElement[] = Array.from(
      document.querySelectorAll<HTMLElement>("#education [data-reveal]")
    );
    if (!nodes.length) return;

    nodes.forEach((el: HTMLElement) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(24px)";
      el.style.willChange = "opacity, transform";
    });

    const io = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const delay = Number(el.dataset.delay || 0);
          const reduced =
            typeof window !== "undefined" &&
            "matchMedia" in window &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;

          if (reduced) {
            el.style.opacity = "1";
            el.style.transform = "none";
          } else if ((el as any).animate && typeof (el as any).animate === "function") {
            (el as any).animate(
              [
                { opacity: 0, transform: "translateY(24px)" },
                { opacity: 1, transform: "translateY(0px)" },
              ],
              {
                duration: 650,
                easing: "cubic-bezier(.22,1,.36,1)",
                delay,
                fill: "forwards",
              }
            );
          } else {
            el.style.transition = "opacity .65s ease, transform .65s ease";
            window.setTimeout(() => {
              el.style.opacity = "1";
              el.style.transform = "translateY(0)";
            }, delay);
          }
          io.unobserve(el);
        });
      },
      { threshold: 0.18 }
    );

    nodes.forEach((n: HTMLElement) => io.observe(n));
    return () => io.disconnect();
  }, []);

  // ==== DATA TIMELINE ====
  const timeline = [
    {
      side: "left" as const,
      title: "Sarjana Sistem Informasi (Bachelor of Information Systems)",
      org: "Universitas Merdeka Malang",
      status: "Mahasiswa aktif",
      text: (
        <>
          Fokus pada{" "}
          <span className="font-medium text-gray-900">
            analisis bisnis, arsitektur sistem, data & integrasi
          </span>
          .
          <ul className="mt-3 text-sm text-gray-600 space-y-1 list-none">
            <li>• Business Process & System Analysis</li>
            <li>• Database Systems & Data Modelling</li>
            <li>• Web/App Development & Integrations</li>
          </ul>
          <div className="mt-4 flex flex-wrap gap-2">
            {["UML/BPMN", "SQL", "React/Next.js"].map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 bg-gray-100 text-gray-800 text-xs rounded-full"
              >
                {t}
              </span>
            ))}
          </div>
        </>
      ),
      badge: { text: "Ongoing", color: "bg-blue-50 text-blue-700 ring-blue-100" },
      image: { src: "/assets/foto/unmer.jpg", alt: "Universitas Merdeka Malang" },
      links: [{ href: "#", label: "Lihat kurikulum →" }],
    },
    {
      side: "right" as const,
      title: "Rekayasa Perangkat Lunak (RPL)",
      org: "SMKN 1 Kraksaan",
      status: "Lulusan",
      text: (
        <>
          Fondasi kuat pada{" "}
          <span className="font-medium text-gray-900">
            pemrograman, OOP, web development, dan basis data
          </span>
          .
          <ul className="mt-3 text-sm text-gray-600 space-y-1 list-none">
            <li>• Algoritma, Struktur Data, OOP</li>
            <li>• Web Programming (HTML/CSS/JS, PHP/Laravel dasar)</li>
            <li>• Database (MySQL) & Version Control (Git)</li>
          </ul>
          <div className="mt-4 flex flex-wrap gap-2">
            {["PHP/Laravel", "MySQL", "Git"].map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 bg-gray-100 text-gray-800 text-xs rounded-full"
              >
                {t}
              </span>
            ))}
          </div>
        </>
      ),
      badge: {
        text: (
          <>
            <i className="fa-solid fa-trophy text-amber-500" /> Project-Based Learning
          </>
        ),
        color: "bg-gray-100 text-gray-800",
      },
      image: { src: "/assets/foto/smkn1.jpg", alt: "SMKN 1 Kraksaan RPL" },
      links: [{ href: "#", label: "Lihat project akhir →" }],
    },
  ];

  return (
    <div id="education" className="page relative overflow-hidden bg-white py-10">
      {/* soft bg blobs */}
      <div className="pointer-events-none absolute inset-0 opacity-60 -z-10">
        <div className="absolute -top-24 -left-16 w-72 h-72 rounded-full bg-gradient-to-tr from-blue-200 to-purple-200 blur-3xl" />
        <div className="absolute -bottom-28 -right-20 w-80 h-80 rounded-full bg-gradient-to-tr from-cyan-200 to-indigo-200 blur-3xl" />
      </div>

      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="text-center max-w-3xl mx-auto mb-14" data-reveal>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 ring-1 ring-blue-100">
            <span className="size-2 rounded-full bg-blue-500 animate-pulse" /> Pendidikan
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">
            Riwayat Akademik
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Fondasi akademik di rekayasa perangkat lunak dan sistem informasi untuk mendukung praktik profesional.
          </p>
        </header>

        {/* Timeline wrapper */}
        <div className="relative max-w-5xl mx-auto mb-20">
          {/* LINE: Mobile (kiri) */}
          <div
            aria-hidden="true"
            className="absolute top-0 bottom-0 left-4 w-0.5 bg-gradient-to-b from-blue-500 via-purple-400 to-cyan-400 md:hidden"
          />
          {/* LINE: Desktop (tengah) */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute inset-y-0 left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-blue-500 via-purple-400 to-cyan-400"
          />

          <div className="space-y-12 md:space-y-16">
            {timeline.map((t, idx) => {
              const isLeft = t.side === "left";
              return (
                <div key={idx} className="relative" data-reveal data-delay={idx * 80}>
                  {/* NODE */}
                  <div
                    className="
                      absolute
                      left-4 -translate-x-1/2
                      md:left-1/2 md:-translate-x-1/2
                      top-2 z-10
                    "
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg">
                      <i className="fa-solid fa-graduation-cap" />
                    </div>
                  </div>

                  {/* GRID CARD (dengan gutter lebih lebar di desktop) */}
                  <div className="md:grid md:grid-cols-2 md:gap-16">
                    {/* Kolom teks */}
                    <div
                      className={`${
                        isLeft ? "md:order-1 md:pr-24 xl:pr-28" : "md:order-2 md:pl-24 xl:pl-28"
                      }`}
                    >
                      {/* Mobile card */}
                      <div className="md:hidden ml-12">
                        <h3 className="text-2xl font-bold text-gray-900">{t.title}</h3>
                        <p className={`${isLeft ? "text-blue-600" : "text-purple-600"} font-semibold`}>
                          {t.org}
                        </p>
                        <p className="text-gray-500 text-sm mt-1">{t.status}</p>

                        <div className="inline-block mt-4 text-left">
                          <div className="rounded-2xl border border-gray-200/70 bg-white/70 backdrop-blur-xl p-5 shadow-sm">
                            <div className="text-gray-700">{t.text}</div>
                          </div>
                        </div>

                        <div className="mt-4">
                          <div className="p-[1.5px] rounded-2xl bg-gradient-to-tr from-blue-500/50 via-purple-500/50 to-cyan-500/50">
                            <div className="rounded-2xl bg-white/80 backdrop-blur-xl p-5 shadow-lg">
                              <img
                                src={t.image.src}
                                className="rounded-xl w-full h-52 object-cover"
                                alt={t.image.alt}
                                loading="lazy"
                              />
                              <div className="mt-4 flex flex-wrap items-center gap-3">
                                <span
                                  className={`inline-flex items-center gap-2 px-3 py-1 text-xs rounded-full ring-1 ${t.badge.color}`}
                                >
                                  <i className="fa-solid fa-award" /> {t.badge.text}
                                </span>
                                {t.links.map((l) => (
                                  <a
                                    key={l.label}
                                    href={l.href}
                                    className={`text-sm ${
                                      isLeft
                                        ? "text-blue-600 hover:text-blue-800"
                                        : "text-purple-600 hover:text-purple-800"
                                    } font-medium`}
                                  >
                                    {l.label}
                                  </a>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Desktop card (teks) */}
                      <div className={`hidden md:block ${isLeft ? "text-right" : "text-left"}`}>
                        <h3 className="text-2xl font-bold text-gray-900">{t.title}</h3>
                        <p className={`${isLeft ? "text-blue-600" : "text-purple-600"} font-semibold mb-1`}>
                          {t.org}
                        </p>
                        <p className="text-gray-500 text-sm mb-3">{t.status}</p>
                        <div className="inline-block mt-2">
                          <div className="rounded-2xl border border-gray-200/70 bg-white/70 backdrop-blur-xl p-5 shadow-sm">
                            <div className="text-gray-700">{t.text}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Kolom gambar (desktop) */}
                    <div
                      className={`hidden md:block ${isLeft ? "md:order-2 md:pl-6" : "md:order-1 md:pr-6"}`}
                    >
                      <div className="p-[1.5px] rounded-2xl bg-gradient-to-tr from-blue-500/50 via-purple-500/50 to-cyan-500/50">
                        <div className="rounded-2xl bg-white/80 backdrop-blur-xl p-5 shadow-lg hover:-translate-y-1 transition">
                          <img
                            src={t.image.src}
                            className="rounded-xl w-full h-52 object-cover"
                            alt={t.image.alt}
                            loading="lazy"
                          />
                          <div className="mt-4 flex flex-wrap items-center gap-3">
                            <span
                              className={`inline-flex items-center gap-2 px-3 py-1 text-xs rounded-full ring-1 ${t.badge.color}`}
                            >
                              <i className="fa-solid fa-award" /> {t.badge.text}
                            </span>
                            {t.links.map((l) => (
                              <a
                                key={l.label}
                                href={l.href}
                                className={`text-sm ${
                                  isLeft
                                    ? "text-blue-600 hover:text-blue-800"
                                    : "text-purple-600 hover:text-purple-800"
                                } font-medium`}
                              >
                                {l.label}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sertifikasi (dengan gambar + modal) */}
        <div className="mt-6" data-reveal>
          <div className="flex items-center justify-between gap-4 mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Sertifikasi Profesional</h3>
            <a href="#" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
              Lihat semua →
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* HUMMA */}
            <article className="group rounded-2xl border border-gray-200/70 bg-white/70 backdrop-blur-xl p-5 shadow-sm hover:-translate-y-1 hover:shadow-lg transition">
              <div className="flex items-start gap-4">
                <img
                  src="/assets/cert/programmer.jpg"
                  alt="Programmer — PT Humma Teknologi Indonesia"
                  className="w-12 h-12 rounded-lg object-contain ring-1 ring-gray-200 bg-white"
                  loading="lazy"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Programmer (Junior Developer) — PT Humma Teknologi Indonesia
                  </h4>
                  <p className="text-xs text-gray-500">Track: Laravel & Web Development</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-gray-700">
                Junior Developer fokus Laravel: modul CRUD, REST API, autentikasi/otorisasi, kolaborasi fitur dasar.
              </p>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {["Laravel", "REST API", "MySQL", "Blade/Livewire", "Git"].map((s) => (
                    <span key={s} className="px-2 py-0.5 bg-gray-100 text-gray-800 text-xs rounded">
                      {s}
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => openModal(certificates[0])}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Lihat sertifikat →
                </button>
              </div>
            </article>

            {/* LKS */}
            <article className="group rounded-2xl border border-gray-200/70 bg-white/70 backdrop-blur-xl p-5 shadow-sm hover:-translate-y-1 hover:shadow-lg transition">
              <div className="flex items-start gap-4">
                <img
                  src="/assets/cert/lks.png"
                  alt="LKS Probolinggo — Juara 3 IT Software"
                  className="w-12 h-12 rounded-lg object-contain ring-1 ring-gray-200 bg-white"
                  loading="lazy"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    LKS Kabupaten Probolinggo — Juara 3 (IT Software)
                  </h4>
                  <p className="text-xs text-gray-500">Stack: .NET (C#) & SQL Server</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-gray-700">
                Solusi perangkat lunak end-to-end dengan .NET (C#) & SQL Server: analisis kebutuhan, desain ERD, implementasi, presentasi.
              </p>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {[".NET (C#)", "SQL Server", "Entity Framework", "ERD/UML"].map((s) => (
                    <span key={s} className="px-2 py-0.5 bg-gray-100 text-gray-800 text-xs rounded">
                      {s}
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => openModal(certificates[1])}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Lihat piagam →
                </button>
              </div>
            </article>

            {/* KODINGIN */}
            <article className="group rounded-2xl border border-gray-200/70 bg-white/70 backdrop-blur-xl p-5 shadow-sm hover:-translate-y-1 hover:shadow-lg transition">
              <div className="flex items-start gap-4">
                <img
                  src="/assets/cert/senior.png"
                  alt="Senior Developer — PT Kodingin Digital Nusantara"
                  className="w-12 h-12 rounded-lg object-contain ring-1 ring-gray-200 bg-white"
                  loading="lazy"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Senior Developer (Full-Stack) — PT Kodingin Digital Nusantara
                  </h4>
                  <p className="text-xs text-gray-500">Full-Stack Product Development</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-gray-700">
                Pengembangan end-to-end, optimasi performa, standardisasi CI/CD, serta code review lintas tim.
              </p>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {["React/Next.js", "Node.js", "Laravel", "PostgreSQL", "Redis", "CI/CD"].map((s) => (
                    <span key={s} className="px-2 py-0.5 bg-gray-100 text-gray-800 text-xs rounded">
                      {s}
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => openModal(certificates[2])}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Lihat sertifikat →
                </button>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ===== MODAL SERTIFIKAT ===== */}
      {open && activeCert && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cert-title"
          className="fixed inset-0 z-[999] flex items-center justify-center px-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          <div className="relative z-10 w-full max-w-3xl">
            <div className="p-[2px] rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 shadow-2xl">
              <div className="rounded-2xl bg-white">
                <div className="flex items-start gap-5 p-5 border-b border-gray-100">
                  <div className="w-12 h-12 rounded-lg bg-gray-50 grid place-items-center ring-1 ring-gray-200">
                    <i className="fa-solid fa-award text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 id="cert-title" className="text-lg font-semibold text-gray-900">
                      {activeCert.title}
                    </h3>
                    <p className="text-sm text-gray-500">{activeCert.org}</p>
                    {activeCert.subtitle && (
                      <p className="text-xs text-gray-500 mt-0.5">{activeCert.subtitle}</p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="inline-flex items-center justify-center w-9 h-9 rounded-lg hover:bg-gray-100 transition"
                    aria-label="Tutup"
                    title="Tutup"
                  >
                    <i className="fa-solid fa-xmark text-gray-600" />
                  </button>
                </div>

                <div className="p-5 grid md:grid-cols-2 gap-5">
                  <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                    <img
                      src={activeCert.image}
                      alt={activeCert.title}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">Detail Sertifikat</h4>
                    {activeCert.description && (
                      <p className="mt-2 text-sm text-gray-700">{activeCert.description}</p>
                    )}
                    {activeCert.skills?.length ? (
                      <>
                        <h5 className="mt-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Skills/Scope
                        </h5>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {activeCert.skills.map((s) => (
                            <span
                              key={s}
                              className="px-2.5 py-1 rounded-full text-xs bg-gray-100 text-gray-800"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </>
                    ) : null}
                    <div className="mt-6 flex flex-wrap gap-3">
                      {/* <a
                        href={activeCert.image}
                        download
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
                      >
                        <i className="fa-solid fa-download" /> Unduh Sertifikat
                      </a> */}
                      <button
                        type="button"
                        onClick={closeModal}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-800 text-sm hover:bg-gray-50 transition"
                      >
                        <i className="fa-solid fa-check" /> Tutup
                      </button>
                    </div>
                  </div>
                </div>

                <div className="px-5 pb-5">
                  <p className="text-xs text-gray-500">
                    Tekan <span className="font-semibold">Esc</span> untuk menutup.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* pastikan blob di bawah modal */}
      <style jsx>{`
        :global(#education .pointer-events-none) {
          z-index: 0;
        }
      `}</style>
    </div>
  );
}
