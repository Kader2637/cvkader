"use client";

import { useEffect, useState, useCallback } from "react";
import type React from "react";

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

  // ====== STATE POPUP INFO (untuk "Lihat kurikulum →") ======
  const [showInfo, setShowInfo] = useState(false);

  // === DATA SERTIFIKAT ===
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
    document.documentElement.style.overflow = "hidden";
  }, []);

  const closeModal = useCallback(() => {
    setOpen(false);
    setActiveCert(null);
    document.documentElement.style.overflow = "";
  }, []);

  // Handler khusus link "Lihat kurikulum →"
  const onKurikulumClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      setShowInfo(true);
      document.documentElement.style.overflow = "hidden";
    },
    []
  );

  const closeInfo = useCallback(() => {
    setShowInfo(false);
    document.documentElement.style.overflow = "";
  }, []);

  // ESC untuk tutup modal
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (open) closeModal();
        if (showInfo) closeInfo();
      }
    };
    if (open || showInfo) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, showInfo, closeModal, closeInfo]);

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
          <ul className="mt-3 list-none space-y-1 text-sm text-gray-600">
            <li>• Business Process & System Analysis</li>
            <li>• Database Systems & Data Modelling</li>
            <li>• Web/App Development & Integrations</li>
          </ul>
          <div className="mt-4 flex flex-wrap gap-2">
            {["UML/BPMN", "SQL", "React/Next.js"].map((t) => (
              <span
                key={t}
                className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-800"
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
          <ul className="mt-3 list-none space-y-1 text-sm text-gray-600">
            <li>• Algoritma, Struktur Data, OOP</li>
            <li>• Web Programming (HTML/CSS/JS, PHP/Laravel dasar)</li>
            <li>• Database (MySQL) & Version Control (Git)</li>
          </ul>
          <div className="mt-4 flex flex-wrap gap-2">
            {["PHP/Laravel", "MySQL", "Git"].map((t) => (
              <span
                key={t}
                className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-800"
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
      links: [{ href: "https://pkl.hummatech.com/", label: "Lihat project akhir →" }],
    },
  ];

  return (
    <div
      id="education"
      className="page relative overflow-hidden bg-white py-16 sm:py-20"
    >
      {/* soft bg blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-60">
        <div className="absolute -top-24 -left-16 h-72 w-72 rounded-full bg-gradient-to-tr from-blue-200 to-purple-200 blur-3xl" />
        <div className="absolute -bottom-28 -right-20 h-80 w-80 rounded-full bg-gradient-to-tr from-cyan-200 to-indigo-200 blur-3xl" />
      </div>

      <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header
          className="mx-auto mb-14 max-w-3xl text-center"
          data-reveal
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/80 px-3 py-1 text-xs font-medium text-blue-700 backdrop-blur-sm shadow-sm shadow-blue-100/60">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />{" "}
            Pendidikan
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">
            Riwayat Akademik
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Fondasi akademik di rekayasa perangkat lunak dan sistem informasi untuk
            mendukung praktik profesional.
          </p>
        </header>

        {/* Timeline wrapper */}
        <div className="relative mx-auto mb-20 max-w-5xl">
          {/* LINE: Mobile (kiri) */}
          <div
            aria-hidden="true"
            className="absolute top-0 bottom-0 left-4 w-0.5 bg-gradient-to-b from-blue-500 via-purple-400 to-cyan-400 md:hidden"
          />
          {/* LINE: Desktop (tengah) */}
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-1/2 hidden w-0.5 -translate-x-1/2 bg-gradient-to-b from-blue-500 via-purple-400 to-cyan-400 md:block"
          />

          <div className="space-y-12 md:space-y-16">
            {timeline.map((t, idx) => {
              const isLeft = t.side === "left";
              const isKurikulum = t.links?.some((l) =>
                l.label.toLowerCase().includes("kurikulum")
              );
              return (
                <div
                  key={idx}
                  className="relative"
                  data-reveal
                  data-delay={idx * 80}
                >
                  {/* NODE */}
                  <div
                    className="
                      absolute
                      left-4 -translate-x-1/2
                      md:left-1/2 md:-translate-x-1/2
                      top-2 z-10
                    "
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-slate-300">
                      <i className="fa-solid fa-graduation-cap" />
                    </div>
                  </div>

                  {/* GRID CARD */}
                  <div className="md:grid md:grid-cols-2 md:gap-16">
                    {/* Kolom teks */}
                    <div
                      className={`${
                        isLeft
                          ? "md:order-1 md:pr-24 xl:pr-28"
                          : "md:order-2 md:pl-24 xl:pl-28"
                      }`}
                    >
                      {/* Mobile card */}
                      <div className="ml-12 md:hidden">
                        <h3 className="text-2xl font-bold text-gray-900">
                          {t.title}
                        </h3>
                        <p
                          className={`${
                            isLeft ? "text-blue-600" : "text-purple-600"
                          } font-semibold`}
                        >
                          {t.org}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">{t.status}</p>

                        <div className="mt-4 inline-block text-left">
                          <div className="rounded-2xl border border-gray-200/70 bg-white/80 p-5 shadow-sm backdrop-blur-xl">
                            <div className="text-gray-700">{t.text}</div>
                          </div>
                        </div>

                        <div className="mt-4">
                          <div className="rounded-2xl bg-gradient-to-tr from-blue-500/40 via-purple-500/40 to-cyan-500/40 p-[1.5px]">
                            <div className="rounded-2xl bg-white/90 p-5 shadow-lg backdrop-blur-xl">
                              <img
                                src={t.image.src}
                                className="h-52 w-full rounded-xl object-cover"
                                alt={t.image.alt}
                                loading="lazy"
                              />
                              <div className="mt-4 flex flex-wrap items-center gap-3">
                                <span
                                  className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs ring-1 ${t.badge.color}`}
                                >
                                  <i className="fa-solid fa-award" /> {t.badge.text}
                                </span>
                                {t.links.map((l) =>
                                  isKurikulum ? (
                                    <a
                                      key={l.label}
                                      href={l.href}
                                      data-popup="info"
                                      onClick={onKurikulumClick}
                                      className={`text-sm font-medium ${
                                        isLeft
                                          ? "text-blue-600 hover:text-blue-800"
                                          : "text-purple-600 hover:text-purple-800"
                                      }`}
                                    >
                                      {l.label}
                                    </a>
                                  ) : (
                                    <a
                                      key={l.label}
                                      href={l.href}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className={`text-sm font-medium ${
                                        isLeft
                                          ? "text-blue-600 hover:text-blue-800"
                                          : "text-purple-600 hover:text-purple-800"
                                      }`}
                                    >
                                      {l.label}
                                    </a>
                                  )
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Desktop card (teks) */}
                      <div
                        className={`hidden md:block ${
                          isLeft ? "text-right" : "text-left"
                        }`}
                      >
                        <h3 className="text-2xl font-bold text-gray-900">
                          {t.title}
                        </h3>
                        <p
                          className={`${
                            isLeft ? "text-blue-600" : "text-purple-600"
                          } mb-1 font-semibold`}
                        >
                          {t.org}
                        </p>
                        <p className="mb-3 text-sm text-gray-500">{t.status}</p>
                        <div className="mt-2 inline-block">
                          <div className="rounded-2xl border border-gray-200/70 bg-white/80 p-5 shadow-sm backdrop-blur-xl">
                            <div className="text-gray-700">{t.text}</div>
                          </div>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-3">
                          {t.links.map((l) =>
                            isKurikulum ? (
                              <a
                                key={l.label}
                                href={l.href}
                                data-popup="info"
                                onClick={onKurikulumClick}
                                className={`text-sm font-medium ${
                                  isLeft
                                    ? "text-blue-600 hover:text-blue-800"
                                    : "text-purple-600 hover:text-purple-800"
                                }`}
                              >
                                {l.label}
                              </a>
                            ) : (
                              <a
                                key={l.label}
                                href={l.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`text-sm font-medium ${
                                  isLeft
                                    ? "text-blue-600 hover:text-blue-800"
                                    : "text-purple-600 hover:text-purple-800"
                                }`}
                              >
                                {l.label}
                              </a>
                            )
                          )}
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
                        <div className="group rounded-2xl bg-white/90 p-5 shadow-lg backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-xl">
                          <img
                            src={t.image.src}
                            className="h-52 w-full rounded-xl object-cover transition group-hover:scale-[1.02]"
                            alt={t.image.alt}
                            loading="lazy"
                          />
                          <div className="mt-4 flex flex-wrap items-center gap-3">
                            <span
                              className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs ring-1 ${t.badge.color}`}
                            >
                              <i className="fa-solid fa-award" /> {t.badge.text}
                            </span>
                            {t.links.map((l) =>
                              isKurikulum ? (
                                <a
                                  key={l.label}
                                  href={l.href}
                                  data-popup="info"
                                  onClick={onKurikulumClick}
                                  className={`text-sm font-medium ${
                                    isLeft
                                      ? "text-blue-600 hover:text-blue-800"
                                      : "text-purple-600 hover:text-purple-800"
                                  }`}
                                >
                                  {l.label}
                                </a>
                              ) : (
                                <a
                                  key={l.label}
                                  href={l.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`text-sm font-medium ${
                                    isLeft
                                      ? "text-blue-600 hover:text-blue-800"
                                      : "text-purple-600 hover:text-purple-800"
                                  }`}
                                >
                                  {l.label}
                                </a>
                              )
                            )}
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

        {/* Sertifikasi */}
        <div className="mt-6" data-reveal>
          <div className="mb-6 flex items-center justify-between gap-4">
            <h3 className="text-xl font-semibold text-gray-900">
              Sertifikasi Profesional
            </h3>
            <a
              href="#"
              className="text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              Lihat semua →
            </a>
          </div>

          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
            {/* HUMMA */}
            <article className="group rounded-2xl border border-gray-200/70 bg-white/80 p-5 shadow-sm backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-start gap-4">
                <img
                  src="/assets/cert/programmer.jpg"
                  alt="Programmer — PT Humma Teknologi Indonesia"
                  className="h-12 w-12 rounded-lg bg-white object-contain ring-1 ring-gray-200"
                  loading="lazy"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Programmer (Junior Developer) — PT Humma Teknologi Indonesia
                  </h4>
                  <p className="text-xs text-gray-500">
                    Track: Laravel &amp; Web Development
                  </p>
                </div>
              </div>
              <p className="mt-3 text-sm text-gray-700">
                Junior Developer fokus Laravel: modul CRUD, REST API,
                autentikasi/otorisasi, kolaborasi fitur dasar.
              </p>
              <div className="mt-4 flex items-center justify-between gap-2">
                <div className="flex flex-wrap gap-2">
                  {["Laravel", "REST API", "MySQL", "Blade/Livewire", "Git"].map(
                    (s) => (
                      <span
                        key={s}
                        className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-800"
                      >
                        {s}
                      </span>
                    )
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => openModal(certificates[0])}
                  className="text-sm font-medium text-blue-600 hover:text-blue-800"
                >
                  Lihat sertifikat →
                </button>
              </div>
            </article>

            {/* LKS */}
            <article className="group rounded-2xl border border-gray-200/70 bg-white/80 p-5 shadow-sm backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-start gap-4">
                <img
                  src="/assets/cert/lks.png"
                  alt="LKS Probolinggo — Juara 3 IT Software"
                  className="h-12 w-12 rounded-lg bg-white object-contain ring-1 ring-gray-200"
                  loading="lazy"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    LKS Kabupaten Probolinggo — Juara 3 (IT Software)
                  </h4>
                  <p className="text-xs text-gray-500">
                    Stack: .NET (C#) &amp; SQL Server
                  </p>
                </div>
              </div>
              <p className="mt-3 text-sm text-gray-700">
                Solusi perangkat lunak end-to-end dengan .NET (C#) &amp; SQL Server:
                analisis kebutuhan, desain ERD, implementasi, presentasi.
              </p>
              <div className="mt-4 flex items-center justify-between gap-2">
                <div className="flex flex-wrap gap-2">
                  {[".NET (C#)", "SQL Server", "Entity Framework", "ERD/UML"].map(
                    (s) => (
                      <span
                        key={s}
                        className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-800"
                      >
                        {s}
                      </span>
                    )
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => openModal(certificates[1])}
                  className="text-sm font-medium text-blue-600 hover:text-blue-800"
                >
                  Lihat piagam →
                </button>
              </div>
            </article>

            {/* KODINGIN */}
            <article className="group rounded-2xl border border-gray-200/70 bg-white/80 p-5 shadow-sm backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-start gap-4">
                <img
                  src="/assets/cert/senior.png"
                  alt="Senior Developer — PT Kodingin Digital Nusantara"
                  className="h-12 w-12 rounded-lg bg-white object-contain ring-1 ring-gray-200"
                  loading="lazy"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Senior Developer (Full-Stack) — PT Kodingin Digital Nusantara
                  </h4>
                  <p className="text-xs text-gray-500">
                    Full-Stack Product Development
                  </p>
                </div>
              </div>
              <p className="mt-3 text-sm text-gray-700">
                Pengembangan end-to-end, optimasi performa, standardisasi CI/CD,
                serta code review lintas tim.
              </p>
              <div className="mt-4 flex items-center justify-between gap-2">
                <div className="flex flex-wrap gap-2">
                  {[
                    "React/Next.js",
                    "Node.js",
                    "Laravel",
                    "PostgreSQL",
                    "Redis",
                    "CI/CD",
                  ].map((s) => (
                    <span
                      key={s}
                      className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-800"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => openModal(certificates[2])}
                  className="text-sm font-medium text-blue-600 hover:text-blue-800"
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
            <div className="rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 p-[2px] shadow-2xl">
              <div className="rounded-2xl bg-white">
                <div className="flex items-start gap-5 border-b border-gray-100 p-5">
                  <div className="grid h-12 w-12 place-items-center rounded-lg bg-gray-50 ring-1 ring-gray-200">
                    <i className="fa-solid fa-award text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3
                      id="cert-title"
                      className="text-lg font-semibold text-gray-900"
                    >
                      {activeCert.title}
                    </h3>
                    <p className="text-sm text-gray-500">{activeCert.org}</p>
                    {activeCert.subtitle && (
                      <p className="mt-0.5 text-xs text-gray-500">
                        {activeCert.subtitle}
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg transition hover:bg-gray-100"
                    aria-label="Tutup"
                    title="Tutup"
                  >
                    <i className="fa-solid fa-xmark text-gray-600" />
                  </button>
                </div>

                <div className="grid gap-5 p-5 md:grid-cols-2">
                  <div className="overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
                    <img
                      src={activeCert.image}
                      alt={activeCert.title}
                      className="h-full w-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">
                      Detail Sertifikat
                    </h4>
                    {activeCert.description && (
                      <p className="mt-2 text-sm text-gray-700">
                        {activeCert.description}
                      </p>
                    )}
                    {activeCert.skills?.length ? (
                      <>
                        <h5 className="mt-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                          Skills / Scope
                        </h5>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {activeCert.skills.map((s) => (
                            <span
                              key={s}
                              className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-800"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </>
                    ) : null}
                    <div className="mt-6 flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-800 transition hover:bg-gray-50"
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

      {/* ===== MODAL INFO: khusus “Lihat kurikulum →” ===== */}
      {showInfo && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="info-title"
          className="fixed inset-0 z-[1000] flex items-center justify-center px-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeInfo();
          }}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="relative z-10 w-full max-w-md">
            <div className="rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 p-[2px] shadow-2xl">
              <div className="rounded-2xl bg-white">
                <div className="flex items-start gap-4 border-b border-gray-100 p-5">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-gray-50 ring-1 ring-gray-200">
                    <i className="fa-solid fa-circle-info text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3
                      id="info-title"
                      className="text-base font-semibold text-gray-900"
                    >
                      Data Belum Tersedia
                    </h3>
                    <p className="text-sm text-gray-600">
                      Kurikulum sedang dalam proses penyusunan. Silakan cek kembali
                      nanti.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={closeInfo}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg transition hover:bg-gray-100"
                    aria-label="Tutup"
                    title="Tutup"
                  >
                    <i className="fa-solid fa-xmark text-gray-600" />
                  </button>
                </div>
                <div className="p-5">
                  <button
                    type="button"
                    onClick={closeInfo}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
                  >
                    Mengerti
                  </button>
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
