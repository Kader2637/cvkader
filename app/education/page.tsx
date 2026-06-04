"use client";

import { useEffect, useState, useCallback } from "react";
import type React from "react";
import Link from "next/link";

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
          <span className="font-semibold text-slate-900">
            analisis bisnis, arsitektur sistem, data & integrasi
          </span>
          .
          <ul className="mt-3 list-none space-y-1.5 text-xs text-slate-600">
            <li>• Business Process & System Analysis</li>
            <li>• Database Systems & Data Modelling</li>
            <li>• Web/App Development & Integrations</li>
          </ul>
          <div className="mt-4 flex flex-wrap gap-2">
            {["UML/BPMN", "SQL", "React/Next.js"].map((t) => (
              <span
                key={t}
                className="rounded-xl bg-slate-50 border border-slate-200/80 px-2.5 py-1 text-xs text-slate-600 font-semibold"
              >
                {t}
              </span>
            ))}
          </div>
        </>
      ),
      badge: { text: "Ongoing", color: "bg-blue-50/80 text-blue-700 border-blue-100/60" },
      image: { src: "/assets/foto/unmer.jpg", alt: "Universitas Merdeka Malang" },
      links: [{ href: "#", label: "Lihat kurikulum →" }],
      glowClass: "glow-blue",
    },
    {
      side: "right" as const,
      title: "Rekayasa Perangkat Lunak (RPL)",
      org: "SMKN 1 Kraksaan",
      status: "Lulusan",
      text: (
        <>
          Fondasi kuat pada{" "}
          <span className="font-semibold text-slate-900">
            pemrograman, OOP, web development, dan basis data
          </span>
          .
          <ul className="mt-3 list-none space-y-1.5 text-xs text-slate-600">
            <li>• Algoritma, Struktur Data, OOP</li>
            <li>• Web Programming (HTML/CSS/JS, PHP/Laravel dasar)</li>
            <li>• Database (MySQL) & Version Control (Git)</li>
          </ul>
          <div className="mt-4 flex flex-wrap gap-2">
            {["PHP/Laravel", "MySQL", "Git"].map((t) => (
              <span
                key={t}
                className="rounded-xl bg-slate-50 border border-slate-200/80 px-2.5 py-1 text-xs text-slate-600 font-semibold"
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
            <i className="fa-solid fa-trophy text-amber-500 mr-1" /> Project-Based Learning
          </>
        ),
        color: "bg-slate-50/80 text-slate-800 border-slate-200/60",
      },
      image: { src: "/assets/foto/smkn1.jpg", alt: "SMKN 1 Kraksaan RPL" },
      links: [{ href: "https://pkl.hummatech.com/", label: "Lihat project akhir →" }],
      glowClass: "glow-purple",
    },
  ];

  return (
    <div
      id="education"
      className="page relative overflow-hidden pt-12 pb-16 sm:pt-16 sm:pb-24"
    >
      {/* soft bg blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-60">
        <div className="absolute -top-24 -left-16 h-72 w-72 rounded-full bg-gradient-to-tr from-blue-200 to-purple-200 blur-3xl animate-pulse-slow" />
        <div className="absolute -bottom-28 -right-20 h-80 w-80 rounded-full bg-gradient-to-tr from-cyan-200 to-indigo-200 blur-3xl animate-pulse-slow" style={{ animationDelay: "-3s" }} />
      </div>

      <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <header
          className="mx-auto mb-16 max-w-3xl text-center"
          data-reveal
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/80 px-3.5 py-1.5 text-xs font-semibold text-blue-700 backdrop-blur-sm shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />{" "}
            Pendidikan
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
            Academic Background
          </h2>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            Fondasi akademik di rekayasa perangkat lunak dan sistem informasi untuk mendukung praktik profesional.
          </p>
        </header>

        {/* Timeline wrapper */}
        <div className="relative mx-auto mb-20 max-w-5xl">
          {/* LINE: Mobile (kiri) */}
          <div
            aria-hidden="true"
            className="absolute top-0 bottom-0 left-4 w-[2px] bg-slate-200 md:hidden"
          />
          {/* LINE: Desktop (tengah) */}
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-1/2 hidden w-[2px] -translate-x-1/2 bg-slate-200 md:block"
          />

          <div className="space-y-16">
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
                  data-reveal-delay={`${idx * 150}ms`}
                >
                  {/* NODE */}
                  <div
                    className="
                      absolute
                      left-4 -translate-x-1/2
                      md:left-1/2 md:-translate-x-1/2
                      top-2.5 z-10
                    "
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white border border-slate-200/80 text-slate-500 shadow-sm z-10">
                      <i className="fa-solid fa-graduation-cap text-xs" />
                    </div>
                  </div>

                  {/* GRID CARD */}
                  <div className="md:grid md:grid-cols-2 md:gap-12 items-center">
                    {/* Kolom teks */}
                    <div
                      className={`${
                        isLeft
                          ? "md:order-1 md:pr-12 xl:pr-16"
                          : "md:order-2 md:pl-12 xl:pl-16"
                      }`}
                    >
                      {/* Mobile card */}
                      <div className="ml-12 md:hidden">
                        <h3 className="text-2xl font-bold text-slate-900 leading-tight">
                          {t.title}
                        </h3>
                        <p
                          className={`${
                            isLeft ? "text-blue-600" : "text-purple-600"
                          } font-semibold`}
                        >
                          {t.org}
                        </p>
                        <p className="mt-1 text-sm text-slate-400 font-medium">{t.status}</p>

                        <div className="mt-4 inline-block text-left">
                          <div className={`rounded-2xl border border-slate-200/60 bg-white/70 backdrop-blur-md p-5 shadow-sm ${t.glowClass}`}>
                            <div className="text-slate-700 leading-relaxed text-sm">{t.text}</div>
                          </div>
                        </div>

                        <div className="mt-4">
                          <div className="rounded-2xl bg-white/70 border border-slate-200/60 p-4 shadow-sm">
                            <img
                              src={t.image.src}
                              className="h-52 w-full rounded-xl object-cover"
                              alt={t.image.alt}
                              loading="lazy"
                            />
                            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3">
                              <span
                                className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1 text-xs border border-slate-200/60 bg-white font-semibold text-slate-700 shadow-sm`}
                              >
                                {t.badge.text}
                              </span>
                              {t.links.map((l) =>
                                isKurikulum ? (
                                  <a
                                    key={l.label}
                                    href={l.href}
                                    data-popup="info"
                                    onClick={onKurikulumClick}
                                    className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
                                  >
                                    {l.label}
                                  </a>
                                ) : (
                                  <a
                                    key={l.label}
                                    href={l.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
                                  >
                                    {l.label}
                                  </a>
                                )
                              )}
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
                        <h3 className="text-2xl font-bold text-slate-900 leading-tight">
                          {t.title}
                        </h3>
                        <p
                          className={`${
                            isLeft ? "text-blue-600" : "text-purple-600"
                          } mb-1 font-semibold`}
                        >
                          {t.org}
                        </p>
                        <p className="mb-3 text-sm text-slate-400 font-medium">{t.status}</p>
                        <div className="mt-2 inline-block">
                          <div className={`rounded-2xl border border-slate-200/60 bg-white/70 backdrop-blur-md p-5 shadow-sm text-left ${t.glowClass}`}>
                            <div className="text-slate-600 leading-relaxed text-sm sm:text-base">{t.text}</div>
                          </div>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-3 justify-end lg:justify-start">
                          {t.links.map((l) =>
                            isKurikulum ? (
                              <a
                                key={l.label}
                                href={l.href}
                                data-popup="info"
                                onClick={onKurikulumClick}
                                className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
                              >
                                {l.label}
                              </a>
                            ) : (
                              <a
                                key={l.label}
                                href={l.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
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
                        isLeft ? "md:order-2 md:pl-12 xl:pl-16" : "md:order-1 md:pr-12 xl:pr-16"
                      }`}
                    >
                      <div className="rounded-2xl bg-white/70 border border-slate-200/60 p-4 shadow-sm hover:shadow-md transition-all duration-300">
                        <img
                          src={t.image.src}
                          className="h-56 w-full rounded-xl object-cover transition duration-700 group-hover:scale-105"
                          alt={t.image.alt}
                          loading="lazy"
                        />
                        <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-100 pt-3">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1 text-xs border border-slate-200/60 bg-white font-semibold text-slate-700 shadow-sm`}
                          >
                            {t.badge.text}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Certifications Section */}
        <div className="mt-16" data-reveal data-reveal-delay="200ms">
          <div className="mb-8 flex items-center justify-between gap-4">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Sertifikasi Profesional
            </h3>
            <Link
              href="/certificates"
              className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition"
            >
              Lihat semua <i className="fa-solid fa-arrow-right text-[10px]" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {certificates.map((cert, idx) => (
              <article
                key={cert.key}
                className="group rounded-2xl border border-slate-200/60 bg-white/70 backdrop-blur-md p-5 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-slate-300 transition-all duration-300 glow-blue"
              >
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="h-12 w-12 rounded-lg bg-white object-contain ring-1 ring-slate-100 shrink-0"
                      loading="lazy"
                    />
                    <div className="min-w-0">
                      <h4 className="font-bold text-slate-900 text-sm leading-snug line-clamp-2">
                        {cert.title}
                      </h4>
                      <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-wider">
                        {cert.org}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                    {cert.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-1">
                    {cert.skills?.slice(0, 3).map((s) => (
                      <span
                        key={s}
                        className="rounded bg-slate-50 px-1.5 py-0.5 text-[9px] font-semibold text-slate-500 border border-slate-200/80"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => openModal(cert)}
                    className="text-[11px] font-bold text-blue-600 hover:text-blue-800 shrink-0"
                  >
                    Lihat sertifikat →
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>

      </section>

      {/* ===== MODAL SERTIFIKAT ===== */}
      {open && activeCert && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cert-title"
          className="fixed inset-0 z-[999] flex items-center justify-center px-4 backdrop-fade"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="absolute inset-0 bg-black/55 backdrop-blur-sm" />

          <div className="relative z-10 w-full max-w-3xl modal-pop">
            <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 p-[2px] shadow-2xl">
              <div className="rounded-3xl bg-white">
                <div className="flex items-start gap-5 border-b border-slate-100 p-5">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-slate-50 ring-1 ring-slate-150 shadow-sm shrink-0">
                    <i className="fa-solid fa-award text-blue-600 text-lg" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3
                      id="cert-title"
                      className="text-base font-bold text-slate-900 leading-snug truncate"
                    >
                      {activeCert.title}
                    </h3>
                    <p className="text-xs text-slate-400 font-semibold mt-0.5">{activeCert.org}</p>
                    {activeCert.subtitle && (
                      <p className="mt-0.5 text-[10px] text-slate-400 font-medium">
                        {activeCert.subtitle}
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:text-red-500 hover:bg-red-50 hover:border-red-100 flex items-center justify-center transition active:scale-90"
                    aria-label="Tutup"
                    title="Tutup"
                  >
                    <i className="fa-solid fa-xmark text-sm" />
                  </button>
                </div>

                <div className="grid gap-5 p-5 md:grid-cols-2">
                  <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center aspect-[4/3] max-h-[45vh]">
                    <img
                      src={activeCert.image}
                      alt={activeCert.title}
                      className="h-full w-full object-contain shadow-inner"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-col justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">
                        Detail Sertifikat
                      </h4>
                      {activeCert.description && (
                        <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {activeCert.description}
                        </p>
                      )}
                      {activeCert.skills?.length ? (
                        <>
                          <h5 className="mt-4 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            Skills / Scope
                          </h5>
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {activeCert.skills.map((s) => (
                              <span
                                key={s}
                                className="px-2 py-0.5 rounded-lg text-[10px] font-semibold bg-slate-50 text-slate-500 border border-slate-200"
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                        </>
                      ) : null}
                    </div>
                    <div className="mt-6 flex justify-end">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 text-xs font-semibold hover:bg-slate-50 transition active:scale-95 shadow-sm"
                      >
                        <i className="fa-solid fa-check text-xs" /> Selesai
                      </button>
                    </div>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-2 border-t border-slate-100/50">
                  <p className="text-[10px] text-slate-400 font-medium">
                    * Tekan <span className="font-bold">Esc</span> atau klik di luar untuk menutup.
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
          className="fixed inset-0 z-[1000] flex items-center justify-center px-4 backdrop-fade"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeInfo();
          }}
        >
          <div className="absolute inset-0 bg-black/55 backdrop-blur-sm" />
          <div className="relative z-10 w-full max-w-md modal-pop">
            <div className="rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 p-[2px] shadow-2xl">
              <div className="rounded-2xl bg-white">
                <div className="flex items-start gap-4 border-b border-slate-100 p-5">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-slate-50 ring-1 ring-slate-200 shadow-sm shrink-0">
                    <i className="fa-solid fa-circle-info text-blue-600 text-base" />
                  </div>
                  <div className="flex-1">
                    <h3
                      id="info-title"
                      className="text-base font-bold text-slate-900"
                    >
                      Data Belum Tersedia
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Kurikulum sedang dalam proses penyusunan. Silakan cek kembali
                      nanti.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={closeInfo}
                    className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:text-red-500 hover:bg-red-50 hover:border-red-100 flex items-center justify-center transition active:scale-90"
                    aria-label="Tutup"
                    title="Tutup"
                  >
                    <i className="fa-solid fa-xmark text-sm" />
                  </button>
                </div>
                <div className="p-5">
                  <button
                    type="button"
                    onClick={closeInfo}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-black active:scale-95 shadow-sm"
                  >
                    Mengerti
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
