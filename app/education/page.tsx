"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import BackToTop from "../components/BackToTop";
import SpotlightCard from "../components/bits/SpotlightCard";
import TiltedCard from "../components/bits/TiltedCard";
import DecryptedText from "../components/bits/DecryptedText";
import ClientPortal from "../components/ClientPortal";

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
  const [open, setOpen] = useState(false);
  const [activeCert, setActiveCert] = useState<Certificate | null>(null);
  const [showInfo, setShowInfo] = useState(false);

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

  const closeInfo = useCallback(() => {
    setShowInfo(false);
    document.documentElement.style.overflow = "";
  }, []);

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

  return (
    <div id="education" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 pb-8">
      <header className="space-y-3 border-b border-slate-200/80 dark:border-white/[0.08] pb-6">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[11px] font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-semibold">
          Academic Background
        </span>
        <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
          <DecryptedText text="Education & Core Certs" speed={26} />
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 max-w-2xl">
          Fondasi akademik di bidang Rekayasa Perangkat Lunak dan Sistem Informasi untuk mendukung praktik rekayasa sistem modern.
        </p>
      </header>

      {/* Academic Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {/* Unmer Malang */}
        <TiltedCard maxTilt={6} className="h-full">
          <SpotlightCard className="p-6 h-full">
            <div className="h-full flex flex-col justify-between gap-5">
              <div className="space-y-4">
                <div className="aspect-[16/9] rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-zinc-950">
                  <img
                    src="/assets/foto/unmer.jpg"
                    alt="Universitas Merdeka Malang"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[11px] font-mono font-semibold">
                        Ongoing
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/25 text-[11px] font-mono font-bold shadow-sm">
                        <i className="fa-solid fa-trophy text-[10px]" />
                        Mahasiswa Berprestasi 2026
                      </span>
                    </div>
                    <span className="text-xs font-mono text-slate-400 dark:text-zinc-500">
                      Bachelor&apos;s Degree
                    </span>
                  </div>
                  <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                    Sarjana Sistem Informasi
                  </h2>
                  <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                    Universitas Merdeka Malang
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
                    Fokus pada analisis bisnis, arsitektur sistem, manajemen data &amp; integrasi aplikasi enterprise.
                  </p>
                  <ul className="space-y-1 text-xs text-slate-600 dark:text-zinc-300">
                    <li className="font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                      <i className="fa-solid fa-award text-[11px]" />
                      Mahasiswa Berprestasi (Mawapres) Universitas Merdeka Malang 2026
                    </li>
                    <li>• Business Process &amp; System Analysis</li>
                    <li>• Database Systems &amp; Data Modelling</li>
                    <li>• Web/App Development &amp; Integrations</li>
                  </ul>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200/70 dark:border-white/[0.08]">
                <div className="flex flex-wrap gap-1.5">
                  {["UML/BPMN", "SQL", "React/Next.js"].map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-zinc-950/60 border border-slate-200 dark:border-white/10 text-[10px] font-mono text-slate-600 dark:text-zinc-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => {
                    setShowInfo(true);
                    document.documentElement.style.overflow = "hidden";
                  }}
                  className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline shrink-0"
                >
                  Lihat kurikulum →
                </button>
              </div>
            </div>
          </SpotlightCard>
        </TiltedCard>

        {/* SMKN 1 Kraksaan */}
        <TiltedCard maxTilt={6} className="h-full">
          <SpotlightCard className="p-6 h-full">
            <div className="h-full flex flex-col justify-between gap-5">
              <div className="space-y-4">
                <div className="aspect-[16/9] rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-zinc-950">
                  <img
                    src="/assets/foto/smkn1.jpg"
                    alt="SMKN 1 Kraksaan RPL"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 text-[11px] font-mono font-semibold">
                      Project-Based Learning
                    </span>
                    <span className="text-xs font-mono text-slate-400 dark:text-zinc-500">
                      Vocational High School
                    </span>
                  </div>
                  <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                    Rekayasa Perangkat Lunak (RPL)
                  </h2>
                  <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                    SMKN 1 Kraksaan
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
                    Fondasi kuat pada algoritma, OOP, web development, dan basis data relasional.
                  </p>
                  <ul className="space-y-1 text-xs text-slate-600 dark:text-zinc-300">
                    <li>• Algoritma, Struktur Data, OOP</li>
                    <li>• Web Programming (HTML/CSS/JS, PHP/Laravel)</li>
                    <li>• Database (MySQL) &amp; Version Control (Git)</li>
                  </ul>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200/70 dark:border-white/[0.08]">
                <div className="flex flex-wrap gap-1.5">
                  {["PHP/Laravel", "MySQL", "Git"].map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-zinc-950/60 border border-slate-200 dark:border-white/10 text-[10px] font-mono text-slate-600 dark:text-zinc-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <a
                  href="https://pkl.hummatech.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline shrink-0"
                >
                  Lihat project akhir →
                </a>
              </div>
            </div>
          </SpotlightCard>
        </TiltedCard>
      </div>

      {/* Core Certifications */}
      <section className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-semibold">
              Verified Credentials
            </span>
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mt-0.5">
              <DecryptedText text="Core Certifications & Awards" speed={28} />
            </h2>
          </div>
          <Link
            href="/certificates"
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline self-start sm:self-auto"
          >
            Lihat Semua (38+) →
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
          {certificates.map((cert) => (
            <TiltedCard key={cert.key} maxTilt={8} className="h-full">
              <SpotlightCard className="p-4 h-full">
                <button
                  onClick={() => openModal(cert)}
                  className="w-full h-full flex flex-col justify-between text-left gap-3 group"
                >
                  <div className="w-full aspect-[16/10] rounded-xl overflow-hidden bg-slate-100 dark:bg-zinc-950 border border-slate-200 dark:border-white/10">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>
                  <div className="w-full">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      {cert.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                      {cert.org}
                    </p>
                  </div>
                </button>
              </SpotlightCard>
            </TiltedCard>
          ))}
        </div>
      </section>

      {/* Modal Sertifikat */}
      {open && activeCert && (
        <ClientPortal>
          <div
            className="fixed inset-0 z-[100] w-screen h-screen bg-black/80 backdrop-blur-xl grid place-items-center p-4 backdrop-fade"
            onClick={closeModal}
          >
            <div
              className="w-full max-w-2xl bento-card p-6 space-y-4 modal-pop bg-white dark:bg-zinc-900 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                    {activeCert.title}
                  </h3>
                  <p className="text-xs text-indigo-600 dark:text-indigo-400">
                    {activeCert.org} · {activeCert.subtitle}
                  </p>
                </div>
                <button
                  onClick={closeModal}
                  aria-label="Close modal"
                  className="w-8 h-8 rounded-lg border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white shrink-0"
                >
                  <i className="fa-solid fa-xmark" />
                </button>
              </div>
              <img
                src={activeCert.image}
                alt={activeCert.title}
                className="w-full max-h-[55vh] object-contain rounded-xl bg-slate-100 dark:bg-zinc-950"
              />
              {activeCert.description && (
                <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 leading-relaxed">
                  {activeCert.description}
                </p>
              )}
              {activeCert.skills && (
                <div className="flex flex-wrap gap-1.5">
                  {activeCert.skills.map((s) => (
                    <span
                      key={s}
                      className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-zinc-800 text-[10px] font-mono text-slate-600 dark:text-zinc-300"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </ClientPortal>
      )}

      {/* Modal Kurikulum */}
      {showInfo && (
        <ClientPortal>
          <div
            className="fixed inset-0 z-[100] w-screen h-screen bg-black/80 backdrop-blur-xl grid place-items-center p-4 backdrop-fade"
            onClick={closeInfo}
          >
            <div
              className="w-full max-w-md bento-card p-6 space-y-4 modal-pop bg-white dark:bg-zinc-900"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
                  Informasi Kurikulum
                </h3>
                <button
                  onClick={closeInfo}
                  className="w-8 h-8 rounded-lg border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-500"
                >
                  <i className="fa-solid fa-xmark" />
                </button>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 leading-relaxed">
                Detail kurikulum S1 Sistem Informasi Universitas Merdeka Malang mencakup Pemodelan Proses Bisnis (BPMN), Analisis &amp; Perancangan Sistem (UML), Basis Data Terdistribusi, serta Tata Kelola TI.
              </p>
              <button
                onClick={closeInfo}
                className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition"
              >
                Tutup
              </button>
            </div>
          </div>
        </ClientPortal>
      )}

      <BackToTop />
    </div>
  );
}
