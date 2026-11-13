"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import BackToTop from "./components/BackToTop";
import Scene3D from "./components/bits/Scene3D";
import TiltedCard from "./components/bits/TiltedCard";
import SpotlightCard from "./components/bits/SpotlightCard";
import DecryptedText from "./components/bits/DecryptedText";
import MagneticButton from "./components/bits/MagneticButton";
import { useTheme } from "./components/ThemeProvider";
import ClientPortal from "./components/ClientPortal";

const MARQUEE_TECH = [
  { name: "Laravel", icon: "devicon-laravel-plain colored" },
  { name: "Next.js", icon: "devicon-nextjs-plain" },
  { name: "React", icon: "devicon-react-original colored" },
  { name: "TypeScript", icon: "devicon-typescript-plain colored" },
  { name: "Node.js", icon: "devicon-nodejs-plain colored" },
  { name: "Go", icon: "devicon-go-plain colored" },
  { name: ".NET C#", icon: "devicon-dotnetcore-plain colored" },
  { name: "PostgreSQL", icon: "devicon-postgresql-plain colored" },
  { name: "Redis", icon: "devicon-redis-plain colored" },
  { name: "Docker", icon: "devicon-docker-plain colored" },
  { name: "AWS", icon: "devicon-amazonwebservices-plain-wordmark colored" },
  { name: "Figma", icon: "devicon-figma-plain colored" },
];

type FeaturedProject = {
  title: string;
  category: string;
  badge?: string;
  img: string;
  desc: string;
  tags: string[];
  url?: string;
  featuredStat?: { label: string; val: string };
};

const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    title: "e-Mawaris — Pembagian Hak Waris 3 Hukum",
    category: "LegalTech & Riset Dosen",
    badge: "🏆 HKI Certified",
    img: "/assets/portfolio/e-mawarist.png",
    desc: "Platform pembagian hak waris interaktif yang mengkalkulasi warisan berdasarkan 3 dasar hukum sekaligus: Islam, Perdata Barat, dan Adat Jawa, serta dilengkapi konversi aset harta riil. Karya penelitian dosen kampus bersertifikasi resmi HKI (Hak Kekayaan Intelektual) dengan saya sebagai salah satu anggota tim penciptanya.",
    tags: ["3 Dasar Hukum", "Konversi Harta", "Sertifikasi HKI", "Riset Dosen", "Next.js"],
    url: "https://www.mawarist.web.id",
    featuredStat: { label: "Hak Cipta", val: "Resmi HKI Kemenkumham" },
  },
  {
    title: "Smart Desa — Ekosistem E-Government & UMKM",
    category: "GovTech & Community",
    badge: "🏛️ E-Gov Terpadu",
    img: "/assets/portfolio/smart-desa.png",
    desc: "Sistem pemerintahan desa digital terpadu: melayani administrasi kependudukan digital nirsentuh, katalog dan transaksi digital bagi pelaku UMKM desa, serta portal transparansi anggaran & laporan realisasi desa.",
    tags: ["E-Government", "Katalog UMKM", "Laporan Transparan", "Layanan Digital"],
    featuredStat: { label: "Fokus Layanan", val: "UMKM & Warga Digital" },
  },
  {
    title: "SIPJAKI — Sistem Jasa Konstruksi Pasuruan",
    category: "Enterprise GovTech",
    badge: "🏗️ Layanan Konstruksi",
    img: "/assets/portfolio/sipjaki.png",
    desc: "Aplikasi tata kelola perizinan jasa konstruksi Kabupaten Pasuruan: verifikasi berkas penyedia jasa, monitoring rantai pasok material konstruksi, hingga pelaporan berkala kegiatan pengawasan proyek daerah.",
    tags: ["Laravel", "REST API", "PostgreSQL", "Arsitektur Enterprise"],
    featuredStat: { label: "Pengguna", val: "Dinas & Asosiasi Jasa" },
  },
  {
    title: "KR_Money — Aplikasi Analitik Keuangan Cerdas",
    category: "Fintech Mobile",
    badge: "📱 Mobile App",
    img: "/assets/portfolio/krmoney.jpg",
    desc: "Aplikasi mobile pengelola keuangan mandiri: pencatatan cash flow harian offline-first, visualisasi analitik rasio pengeluaran per kategori, serta budgeting reminder cerdas berbasis limit bulanan.",
    tags: ["React Native", "Offline First", "SQLite", "Analytics"],
    featuredStat: { label: "Storage", val: "Local Encryption" },
  },
];

export default function Page() {
  const { openCvModal } = useTheme();
  const [previewProj, setPreviewProj] = useState<FeaturedProject | null>(null);
  const doubleMarquee = [...MARQUEE_TECH, ...MARQUEE_TECH];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPreviewProj(null);
    };
    if (previewProj) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [previewProj]);

  return (
    <div className="space-y-20 sm:space-y-24 pb-16 sm:pb-20">
      {/* ================= HERO SECTION FULL SCREEN + 3D ORBITAL + BOTTOM CAROUSEL ================= */}
      <section className="relative -mt-24 pt-24 min-h-screen flex flex-col justify-between overflow-x-clip">
        {/* Full-Screen 3D Depth Particle Background + Ambient Radial Aura */}
        <div className="pointer-events-none absolute inset-0 opacity-80 dark:opacity-95 z-0">
          <Scene3D variant="hero-bg" />
        </div>
        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_20%_25%,rgba(99,102,241,0.14),transparent_50%),radial-gradient(ellipse_at_80%_65%,rgba(6,182,212,0.12),transparent_50%)]" />

        <div className="relative z-10 flex-1 flex items-center w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center w-full">
            {/* Left: Editorial Hero Typography & Magnetic CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-md text-emerald-600 dark:text-emerald-400 text-[11px] font-mono font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Available for Projects
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200/80 dark:border-white/10 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md text-slate-600 dark:text-zinc-400 text-[11px] font-mono">
                  <i className="fa-solid fa-code text-indigo-500 text-[10px]" />
                  FULL STACK · AI &amp; IOT
                </span>
              </div>

              <div className="space-y-3">
                <div className="text-xs font-mono uppercase tracking-[0.22em] text-indigo-600 dark:text-indigo-400 font-semibold">
                  Software Engineer &amp; Product Builder
                </div>
                <h1 className="font-display text-4xl sm:text-5xl lg:text-[4.25rem] xl:text-[4.6rem] font-bold tracking-tight leading-[1.05] text-slate-900 dark:text-white">
                  Hi, I&apos;m{" "}
                  <span className="bg-gradient-to-r from-indigo-600 via-blue-500 to-cyan-500 dark:from-indigo-400 dark:via-cyan-300 dark:to-emerald-300 bg-clip-text text-transparent">
                    <DecryptedText text="Abdul Kader" speed={35} />
                  </span>
                </h1>
                <p className="font-display text-lg sm:text-2xl font-medium text-slate-600 dark:text-zinc-300 leading-snug flex flex-wrap items-center justify-center lg:justify-start gap-2">
                  <span>Founder at</span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-300 font-semibold text-base sm:text-lg">
                    AETHER NUSANTARA
                  </span>
                </p>
              </div>

              <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Merancang aplikasi web, mobile, arsitektur cloud, hingga integrasi{" "}
                <span className="text-slate-900 dark:text-zinc-200 font-medium">IoT &amp; AI</span>{" "}
                selama <strong>4+ tahun</strong> dengan fokus pada kecepatan rilis, keamanan, dan UI interaktif.
              </p>

              {/* Magnetic Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1">
                <MagneticButton>
                  <Link
                    href="/portfolio"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-indigo-500/25 transition"
                  >
                    <i className="fa-solid fa-layer-group text-xs" />
                    Lihat Portfolio
                  </Link>
                </MagneticButton>

                <MagneticButton>
                  <button
                    type="button"
                    onClick={openCvModal}
                    className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl border border-slate-200 dark:border-white/15 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md text-slate-800 dark:text-zinc-100 text-xs sm:text-sm font-semibold hover:border-indigo-500/40 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                  >
                    <i className="fa-solid fa-file-pdf text-rose-500 text-xs" />
                    Preview CV PDF
                  </button>
                </MagneticButton>

                <MagneticButton>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm text-slate-700 dark:text-zinc-300 text-xs sm:text-sm font-semibold hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-500/30 transition"
                  >
                    Hubungi Saya
                    <i className="fa-solid fa-arrow-right text-[11px]" />
                  </Link>
                </MagneticButton>
              </div>

              {/* Glass Metric Pills */}
              <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto lg:mx-0 pt-2">
                <div className="rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/65 dark:bg-zinc-900/55 backdrop-blur-md px-3.5 py-3 text-left">
                  <div className="font-display text-xl sm:text-2xl font-bold tabular-nums text-slate-900 dark:text-white">
                    4+
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-zinc-400">
                    Years Exp
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/65 dark:bg-zinc-900/55 backdrop-blur-md px-3.5 py-3 text-left">
                  <div className="font-display text-xl sm:text-2xl font-bold tabular-nums text-slate-900 dark:text-white">
                    25+
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-zinc-400">
                    Projects
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/65 dark:bg-zinc-900/55 backdrop-blur-md px-3.5 py-3 text-left">
                  <div className="font-display text-xl sm:text-2xl font-bold tabular-nums text-indigo-600 dark:text-indigo-400">
                    40+
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-zinc-400">
                    Certificates
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Floating Glass 3D Portrait with 3D Orbital Rings Encircling It */}
            <div className="lg:col-span-5 flex justify-center items-center">
              <div className="relative flex items-center justify-center w-full max-w-[460px] py-12 sm:py-16">
                {/* 3D Space Orbital Rings & Satellites Encircling the Card */}
                <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] sm:w-[760px] sm:h-[760px] lg:w-[920px] lg:h-[920px] z-0">
                  <Scene3D variant="orbital" />
                </div>

                <TiltedCard maxTilt={11} className="relative z-10 w-[270px] sm:w-[300px] shrink-0">
                  {/* Gradient Ring Portrait Frame */}
                  <div className="p-[1.5px] rounded-[28px] bg-gradient-to-br from-indigo-500/60 via-cyan-400/40 to-violet-500/60 shadow-2xl shadow-indigo-500/20">
                    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[26.5px] bg-slate-100 dark:bg-zinc-950">
                      <img
                        src="/assets/foto/im.png"
                        alt="Abdul Kader"
                        className="w-full h-full object-cover object-top"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent" />

                      {/* Sleek Glass HUD inside bottom of Portrait */}
                      <div className="absolute bottom-3.5 inset-x-3.5 p-3 rounded-2xl bg-zinc-950/60 backdrop-blur-md border border-white/15 flex items-center justify-between gap-2 text-white">
                        <div>
                          <div className="text-[10px] font-mono uppercase tracking-wider text-cyan-300">
                            Malang, Indonesia
                          </div>
                          <div className="font-display font-bold text-sm sm:text-base leading-tight">
                            Abdul Kader
                          </div>
                        </div>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-[10px] font-mono text-emerald-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          Online
                        </span>
                      </div>
                    </div>
                  </div>
                </TiltedCard>
              </div>
            </div>
          </div>
        </div>

        {/* ================= BOTTOM HERO TECH CAROUSEL ================= */}
        <div className="relative z-10 mt-auto border-y border-slate-200/80 dark:border-white/[0.08] bg-white/55 dark:bg-zinc-900/45 backdrop-blur-md py-4 sm:py-5 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-24 bg-gradient-to-r from-slate-50 dark:from-zinc-950 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-24 bg-gradient-to-l from-slate-50 dark:from-zinc-950 to-transparent z-10" />

          <div className="animate-marquee flex items-center gap-10 sm:gap-14">
            {doubleMarquee.map((t, i) => (
              <div
                key={`${t.name}-${i}`}
                className="flex items-center gap-3 text-xs sm:text-sm font-mono font-semibold text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white transition shrink-0"
              >
                <i className={`${t.icon} text-xl sm:text-2xl`} />
                <span>{t.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CAPABILITIES (SPOTLIGHT CARDS) ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-semibold">
              Capabilities
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              <DecryptedText text="Apa yang Saya Bangun" speed={28} />
            </h2>
          </div>
          <Link
            href="/skills"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline shrink-0"
          >
            Eksplorasi 27+ Tech Stack →
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
          {[
            {
              icon: "fa-solid fa-code",
              title: "Web Engineering",
              desc: "Aplikasi web modern yang cepat, scalable, dan SEO-friendly dengan Next.js, React, dan Laravel.",
              color: "text-blue-500",
            },
            {
              icon: "fa-solid fa-mobile-screen-button",
              title: "Mobile Development",
              desc: "Aplikasi mobile iOS & Android responsif skala produksi menggunakan React Native & Flutter.",
              color: "text-indigo-500",
            },
            {
              icon: "fa-solid fa-cloud-arrow-up",
              title: "Cloud & DevOps",
              desc: "Arsitektur server di AWS/GCP, containerisasi Docker/K8s, serta pipeline CI/CD otomatis.",
              color: "text-emerald-500",
            },
            {
              icon: "fa-solid fa-microchip",
              title: "IoT & Edge AI",
              desc: "Integrasi sensor ESP32/MQTT, dasbor GIS real-time, serta Computer Vision (OpenCV).",
              color: "text-amber-500",
            },
          ].map((c) => (
            <SpotlightCard key={c.title} className="p-6 h-full">
              <div className="h-full flex flex-col space-y-4">
                <div className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-zinc-950 border border-slate-200 dark:border-white/10 flex items-center justify-center shrink-0">
                  <i className={`${c.icon} ${c.color} text-lg`} />
                </div>
                <div className="space-y-2 flex-1">
                  <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
                    {c.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                    {c.desc}
                  </p>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* ================= SELECTED WORK (3D TILTED CARDS) ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-semibold">
              Selected Work
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              <DecryptedText text="Karya Pilihan Terbaik" speed={28} />
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline shrink-0"
          >
            Lihat Semua 22 Proyek →
          </Link>
        </div>

        {/* Bento Grid: Asymmetric Architectural Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          {/* Card 1: Main Highlight (e-Mawaris) - Big 7 columns */}
          <div className="lg:col-span-7 flex">
            <TiltedCard maxTilt={5} className="w-full h-full">
              <SpotlightCard className="overflow-hidden h-full group flex flex-col justify-between border-indigo-500/30 dark:border-indigo-400/20 shadow-xl shadow-indigo-500/5">
                <div className="relative aspect-[16/9] sm:aspect-[16/8.5] w-full bg-slate-100 dark:bg-zinc-950 overflow-hidden shrink-0">
                  <img
                    src={FEATURED_PROJECTS[0].img}
                    alt={FEATURED_PROJECTS[0].title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full bg-indigo-600/90 backdrop-blur-md text-white text-[10px] font-mono font-bold tracking-wider uppercase shadow-md">
                      {FEATURED_PROJECTS[0].badge}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-zinc-300 text-[10px] font-mono border border-white/10">
                      {FEATURED_PROJECTS[0].category}
                    </span>
                  </div>
                  {FEATURED_PROJECTS[0].featuredStat && (
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                      <div className="text-xs font-mono">
                        <span className="opacity-70">{FEATURED_PROJECTS[0].featuredStat.label}:</span>{" "}
                        <span className="font-bold text-cyan-300">{FEATURED_PROJECTS[0].featuredStat.val}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-6 sm:p-7 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2.5">
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-tight">
                      {FEATURED_PROJECTS[0].title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 leading-relaxed">
                      {FEATURED_PROJECTS[0].desc}
                    </p>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-slate-200/70 dark:border-white/[0.08]">
                    <div className="flex flex-wrap gap-1.5">
                      {FEATURED_PROJECTS[0].tags.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-zinc-800/80 border border-slate-200/80 dark:border-white/10 text-[11px] font-mono text-slate-700 dark:text-zinc-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setPreviewProj(FEATURED_PROJECTS[0])}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-zinc-200 hover:border-indigo-500/40 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                      >
                        <i className="fa-solid fa-magnifying-glass text-[11px]" />
                        Detail &amp; Preview
                      </button>
                      {FEATURED_PROJECTS[0].url && (
                        <a
                          href={FEATURED_PROJECTS[0].url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-500/20 transition"
                        >
                          <span>Kunjungi Web</span>
                          <i className="fa-solid fa-arrow-up-right-from-square text-[11px]" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </TiltedCard>
          </div>

          {/* Card 2: Smart Desa - 5 columns */}
          <div className="lg:col-span-5 flex">
            <TiltedCard maxTilt={5} className="w-full h-full">
              <SpotlightCard className="overflow-hidden h-full group flex flex-col justify-between">
                <div className="relative aspect-[16/10] w-full bg-slate-100 dark:bg-zinc-950 overflow-hidden shrink-0">
                  <img
                    src={FEATURED_PROJECTS[1].img}
                    alt={FEATURED_PROJECTS[1].title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full bg-emerald-600/90 backdrop-blur-md text-white text-[10px] font-mono font-bold tracking-wider uppercase">
                      {FEATURED_PROJECTS[1].badge}
                    </span>
                  </div>
                  {FEATURED_PROJECTS[1].featuredStat && (
                    <div className="absolute bottom-3 left-4 text-xs font-mono text-emerald-300">
                      {FEATURED_PROJECTS[1].featuredStat.val}
                    </div>
                  )}
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug">
                      {FEATURED_PROJECTS[1].title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
                      {FEATURED_PROJECTS[1].desc}
                    </p>
                  </div>

                  <div className="space-y-4 pt-3 border-t border-slate-200/70 dark:border-white/[0.08]">
                    <div className="flex flex-wrap gap-1.5">
                      {FEATURED_PROJECTS[1].tags.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-zinc-950/70 border border-slate-200 dark:border-white/10 text-[10px] font-mono text-slate-600 dark:text-zinc-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => setPreviewProj(FEATURED_PROJECTS[1])}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-zinc-200 hover:border-indigo-500/40 transition"
                    >
                      <i className="fa-solid fa-magnifying-glass text-[10px]" />
                      Lihat Detail
                    </button>
                  </div>
                </div>
              </SpotlightCard>
            </TiltedCard>
          </div>

          {/* Card 3: SIPJAKI Pasuruan - 5 columns */}
          <div className="lg:col-span-5 flex">
            <TiltedCard maxTilt={5} className="w-full h-full">
              <SpotlightCard className="overflow-hidden h-full group flex flex-col justify-between">
                <div className="relative aspect-[16/10] w-full bg-slate-100 dark:bg-zinc-950 overflow-hidden shrink-0">
                  <img
                    src={FEATURED_PROJECTS[2].img}
                    alt={FEATURED_PROJECTS[2].title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full bg-blue-600/90 backdrop-blur-md text-white text-[10px] font-mono font-bold tracking-wider uppercase">
                      {FEATURED_PROJECTS[2].badge}
                    </span>
                  </div>
                  {FEATURED_PROJECTS[2].featuredStat && (
                    <div className="absolute bottom-3 left-4 text-xs font-mono text-cyan-300">
                      {FEATURED_PROJECTS[2].featuredStat.val}
                    </div>
                  )}
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug">
                      {FEATURED_PROJECTS[2].title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
                      {FEATURED_PROJECTS[2].desc}
                    </p>
                  </div>

                  <div className="space-y-4 pt-3 border-t border-slate-200/70 dark:border-white/[0.08]">
                    <div className="flex flex-wrap gap-1.5">
                      {FEATURED_PROJECTS[2].tags.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-zinc-950/70 border border-slate-200 dark:border-white/10 text-[10px] font-mono text-slate-600 dark:text-zinc-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => setPreviewProj(FEATURED_PROJECTS[2])}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-zinc-200 hover:border-indigo-500/40 transition"
                    >
                      <i className="fa-solid fa-magnifying-glass text-[10px]" />
                      Lihat Detail
                    </button>
                  </div>
                </div>
              </SpotlightCard>
            </TiltedCard>
          </div>

          {/* Card 4: KR_Money Mobile App - 7 columns */}
          <div className="lg:col-span-7 flex">
            <TiltedCard maxTilt={5} className="w-full h-full">
              <SpotlightCard className="overflow-hidden h-full group flex flex-col justify-between">
                <div className="relative aspect-[16/9] sm:aspect-[16/8.5] w-full bg-slate-100 dark:bg-zinc-950 overflow-hidden shrink-0">
                  <img
                    src={FEATURED_PROJECTS[3].img}
                    alt={FEATURED_PROJECTS[3].title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full bg-violet-600/90 backdrop-blur-md text-white text-[10px] font-mono font-bold tracking-wider uppercase">
                      {FEATURED_PROJECTS[3].badge}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-zinc-300 text-[10px] font-mono border border-white/10">
                      {FEATURED_PROJECTS[3].category}
                    </span>
                  </div>
                  {FEATURED_PROJECTS[3].featuredStat && (
                    <div className="absolute bottom-3 left-4 text-xs font-mono text-violet-300">
                      {FEATURED_PROJECTS[3].featuredStat.val}
                    </div>
                  )}
                </div>

                <div className="p-6 sm:p-7 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2.5">
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-tight">
                      {FEATURED_PROJECTS[3].title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
                      {FEATURED_PROJECTS[3].desc}
                    </p>
                  </div>

                  <div className="space-y-4 pt-3 border-t border-slate-200/70 dark:border-white/[0.08]">
                    <div className="flex flex-wrap gap-1.5">
                      {FEATURED_PROJECTS[3].tags.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-zinc-950/70 border border-slate-200 dark:border-white/10 text-[10px] font-mono text-slate-600 dark:text-zinc-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => setPreviewProj(FEATURED_PROJECTS[3])}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-zinc-200 hover:border-indigo-500/40 transition self-start"
                    >
                      <i className="fa-solid fa-magnifying-glass text-[11px]" />
                      Detail &amp; Preview
                    </button>
                  </div>
                </div>
              </SpotlightCard>
            </TiltedCard>
          </div>
        </div>
      </section>

      {/* ================= EXPERIENCE & AWARDS SNAPSHOT ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-6 items-stretch">
        <SpotlightCard className="p-6 sm:p-8 h-full flex flex-col justify-between gap-6">
          <div className="space-y-5">
            <div className="flex items-center justify-between gap-4">
              <span className="text-[11px] font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-semibold">
                Career Snapshot
              </span>
              <Link
                href="/experience"
                className="text-xs font-semibold text-slate-500 dark:text-zinc-400 hover:text-indigo-500 transition shrink-0"
              >
                Full Timeline →
              </Link>
            </div>

            <div className="space-y-4">
              {[
                {
                  role: "Founder",
                  org: "AETHER NUSANTARA",
                  period: "2025 — Sekarang",
                },
                {
                  role: "Senior Developer",
                  org: "PT Kodingin Digital Nusantara",
                  period: "2025",
                },
                {
                  role: "Senior Developer",
                  org: "PT Elshad Teknologi Indonesia",
                  period: "2025",
                },
                {
                  role: "Junior Developer & Mentor",
                  org: "PT Humma Teknologi Indonesia",
                  period: "2023 — 2024",
                },
              ].map((exp) => (
                <div
                  key={`${exp.role}-${exp.org}`}
                  className="flex items-start sm:items-center justify-between gap-4 pb-3.5 border-b border-slate-200/70 dark:border-white/[0.06] last:border-0 last:pb-0"
                >
                  <div className="space-y-0.5">
                    <div className="text-sm font-bold text-slate-900 dark:text-white">
                      {exp.role}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-zinc-400">
                      {exp.org}
                    </div>
                  </div>
                  <span className="text-[11px] font-mono tabular-nums text-slate-400 dark:text-zinc-500 shrink-0 pt-0.5 sm:pt-0">
                    {exp.period}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </SpotlightCard>

        <SpotlightCard className="p-6 sm:p-8 h-full flex flex-col justify-between gap-6">
          <div className="space-y-5">
            <div className="flex items-center justify-between gap-4">
              <span className="text-[11px] font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-semibold">
                Awards &amp; Credentials
              </span>
              <Link
                href="/certificates"
                className="text-xs font-semibold text-slate-500 dark:text-zinc-400 hover:text-indigo-500 transition shrink-0"
              >
                38+ Certificates →
              </Link>
            </div>

            <div className="space-y-4">
              {[
                {
                  title: "Juara 1 — 3CC UI/UX Competition",
                  org: "Creative Computer Club · 2026",
                },
                {
                  title: "Huawei APAC Developer & AI Class",
                  org: "Huawei Developer APAC · 2025",
                },
                {
                  title: "Juara 3 — LKS IT Software Solutions",
                  org: "Kab. Probolinggo (.NET & SQL Server) · 2023",
                },
              ].map((aw) => (
                <div
                  key={aw.title}
                  className="flex items-center justify-between gap-4 pb-3.5 border-b border-slate-200/70 dark:border-white/[0.06] last:border-0 last:pb-0"
                >
                  <div className="space-y-0.5">
                    <div className="text-sm font-bold text-slate-900 dark:text-white">
                      {aw.title}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-zinc-400">
                      {aw.org}
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                    <i className="fa-solid fa-award text-indigo-500 text-xs" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SpotlightCard>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SpotlightCard className="p-8 sm:p-12 lg:p-14 text-center">
          <div className="max-w-2xl mx-auto space-y-5">
            <span className="inline-block px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-[11px] font-mono font-semibold uppercase tracking-wider">
              Let&apos;s Collaborate
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
              <DecryptedText text="Siap Membangun Produk Digital Berikutnya?" speed={24} />
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed">
              Diskusikan kebutuhan web, mobile, cloud, atau sistem IoT Anda bersama saya.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <MagneticButton>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-transparent bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-indigo-500/25 transition"
                >
                  <i className="fa-solid fa-paper-plane text-xs" />
                  Kirim Pesan
                </Link>
              </MagneticButton>
              <MagneticButton>
                <button
                  type="button"
                  onClick={openCvModal}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-white dark:bg-zinc-900 text-slate-800 dark:text-zinc-100 text-xs sm:text-sm font-semibold hover:border-indigo-500/40 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                >
                  <i className="fa-solid fa-file-pdf text-rose-500 text-xs" />
                  Lihat CV PDF
                </button>
              </MagneticButton>
            </div>
          </div>
        </SpotlightCard>
      </section>

      {/* Preview Modal */}
      {previewProj && (
        <ClientPortal>
          <div
            className="fixed inset-0 z-[100] w-screen h-screen bg-black/80 backdrop-blur-xl grid place-items-center p-4 backdrop-fade"
            onClick={() => setPreviewProj(null)}
          >
          <div
            className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bento-card p-5 sm:p-6 space-y-4 modal-pop bg-white dark:bg-zinc-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-semibold">
                  {previewProj.category}
                </span>
                <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                  {previewProj.title}
                </h3>
              </div>
              <button
                onClick={() => setPreviewProj(null)}
                aria-label="Close preview"
                className="w-8 h-8 rounded-lg border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white"
              >
                <i className="fa-solid fa-xmark" />
              </button>
            </div>

            <img
              src={previewProj.img}
              alt={previewProj.title}
              className="w-full max-h-[55vh] object-contain rounded-xl bg-slate-100 dark:bg-zinc-950 border border-slate-200 dark:border-white/10"
            />

            <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 leading-relaxed">
              {previewProj.desc}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-200/70 dark:border-white/10">
              <div className="flex flex-wrap gap-1.5">
                {previewProj.tags.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-zinc-950/70 border border-slate-200 dark:border-white/10 text-[10px] font-mono text-slate-600 dark:text-zinc-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
              {previewProj.url && (
                <a
                  href={previewProj.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition"
                >
                  Kunjungi Website
                  <i className="fa-solid fa-arrow-up-right-from-square text-[10px]" />
                </a>
              )}
            </div>
          </div>
          </div>
        </ClientPortal>
      )}

      <BackToTop />
    </div>
  );
}
