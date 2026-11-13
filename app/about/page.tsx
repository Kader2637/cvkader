"use client";

import Link from "next/link";
import BackToTop from "../components/BackToTop";
import SpotlightCard from "../components/bits/SpotlightCard";
import TiltedCard from "../components/bits/TiltedCard";
import DecryptedText from "../components/bits/DecryptedText";
import MagneticButton from "../components/bits/MagneticButton";

export default function About() {
  return (
    <div id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 pb-8">
      {/* Header */}
      <header className="space-y-3 border-b border-slate-200/80 dark:border-white/[0.08] pb-6">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[11px] font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-semibold">
          About Me
        </span>
        <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
          <DecryptedText text="Abdul Kader" speed={30} />
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 max-w-2xl">
          Full Stack Developer · Systems Architect · Founder AETHER NUSANTARA
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
        {/* Left Sidebar */}
        <aside className="lg:col-span-4 space-y-5 lg:sticky lg:top-24">
          <TiltedCard maxTilt={10}>
            <SpotlightCard className="p-3">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-slate-100 dark:bg-zinc-950 border border-slate-200 dark:border-white/10">
                <img
                  src="/assets/foto/i'm1.png"
                  alt="Abdul Kader"
                  className="w-full h-full object-cover"
                />
                <span className="absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-full bg-zinc-950/80 backdrop-blur px-2.5 py-1 text-[10px] font-mono text-white border border-white/10">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Remote &amp; On-site
                </span>
              </div>
            </SpotlightCard>
          </TiltedCard>

          <SpotlightCard className="p-5">
            <div className="space-y-4">
              <h2 className="text-xs font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-bold">
                Contact &amp; Info
              </h2>
            <ul className="space-y-3 text-xs text-slate-700 dark:text-zinc-300 font-medium">
              <li className="flex items-center gap-3">
                <i className="fa-solid fa-location-dot w-4 text-center text-indigo-500" />
                Malang, Indonesia
              </li>
              <li className="flex items-center gap-3">
                <i className="fa-solid fa-briefcase w-4 text-center text-indigo-500" />
                Founder AETHER NUSANTARA
              </li>
              <li className="flex items-center gap-3">
                <i className="fa-solid fa-envelope w-4 text-center text-indigo-500" />
                <a
                  href="mailto:abdulkader0126@gmail.com"
                  className="hover:text-indigo-500 transition-colors"
                >
                  abdulkader0126@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <i className="fa-solid fa-phone w-4 text-center text-emerald-500" />
                <a
                  href="tel:+62895428183064"
                  className="hover:text-indigo-500 transition-colors"
                >
                  0895-4281-83064
                </a>
              </li>
            </ul>

            <div className="pt-4 border-t border-slate-200/70 dark:border-white/[0.08] flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-zinc-500">
                Socials
              </span>
              <div className="flex gap-2">
                {[
                  {
                    icon: "linkedin-in",
                    href: "https://www.linkedin.com/in/abdul-kader-53b22930a",
                    label: "LinkedIn",
                  },
                  {
                    icon: "github",
                    href: "https://github.com/Kader2637",
                    label: "GitHub",
                  },
                  {
                    icon: "instagram",
                    href: "https://instagram.com/abdulkader2637",
                    label: "Instagram",
                  },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-8 h-8 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-zinc-950/60 text-slate-600 dark:text-zinc-400 hover:text-indigo-500 dark:hover:text-indigo-400 flex items-center justify-center text-xs transition"
                  >
                    <i className={`fa-brands fa-${s.icon}`} />
                  </a>
                ))}
              </div>
            </div>
            </div>
          </SpotlightCard>
        </aside>

        {/* Right Content */}
        <main className="lg:col-span-8 space-y-6">
          <SpotlightCard className="p-6 sm:p-8">
            <div className="space-y-5">
              <h2 className="text-xs font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-semibold">
                <DecryptedText text="Summary" speed={30} />
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-300 leading-relaxed">
                Saya berpengalaman lebih dari <strong>4 tahun</strong> membangun solusi web, mobile, serta integrasi sistem terdistribusi. Fokus utama saya adalah pengiriman fitur secara cepat dan terencana, pengoptimalan performa server, keamanan data, dan dampak bisnis nyata.
              </p>

              <div className="grid grid-cols-3 gap-2.5 sm:gap-4 pt-4 border-t border-slate-200/70 dark:border-white/[0.08]">
                {[
                  { val: "4+", label: "Years Exp" },
                  { val: "25+", label: "Projects" },
                  { val: "10+", label: "Clients" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="p-3 sm:p-4 rounded-xl bg-slate-50 dark:bg-zinc-950/50 border border-slate-200/70 dark:border-white/[0.06]"
                  >
                    <div className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                      {s.val}
                    </div>
                    <div className="text-[10px] font-mono text-slate-500 dark:text-zinc-400 uppercase mt-1">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </SpotlightCard>

          <SpotlightCard className="p-6">
            <div className="space-y-4">
              <h2 className="text-xs font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-semibold">
                <DecryptedText text="Prinsip & Siklus Kerja" speed={28} />
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    title: "Rilis Cepat & Terkendali",
                    desc: "Menyediakan delivery fitur yang cepat dengan pipeline CI/CD yang terintegrasi pengujian otomatis.",
                  },
                  {
                    title: "Performa di Level Produk",
                    desc: "Mendesain skema database teroptimasi untuk response time server minimal dan efisiensi query.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="h-full p-4 rounded-xl bg-slate-50 dark:bg-zinc-950/50 border border-slate-200/70 dark:border-white/[0.06] space-y-1.5"
                  >
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </SpotlightCard>

          <SpotlightCard className="p-6">
            <div className="space-y-4">
              <h2 className="text-xs font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-semibold">
                <DecryptedText text="Primary Stack" speed={30} />
              </h2>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "Laravel · PHP 8 · MySQL", icon: "fa-brands fa-laravel" },
                  { label: "React · Next.js · TS", icon: "fa-brands fa-react" },
                  { label: "Node.js · Express", icon: "fa-brands fa-node-js" },
                  { label: "PostgreSQL · Redis", icon: "fa-solid fa-database" },
                  { label: "Docker · Kubernetes", icon: "fa-brands fa-docker" },
                  { label: "AWS · GCP", icon: "fa-solid fa-cloud" },
                ].map((item) => (
                  <span
                    key={item.label}
                    className="inline-flex items-center gap-2 rounded-xl bg-slate-50 dark:bg-zinc-950/60 border border-slate-200 dark:border-white/10 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-zinc-200"
                  >
                    <i className={`${item.icon} text-indigo-500`} />
                    {item.label}
                  </span>
                ))}
              </div>
            </div>
          </SpotlightCard>

          <SpotlightCard className="p-6">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
              <h2 className="text-xs font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-semibold">
                <DecryptedText text="Experience Highlights" speed={28} />
              </h2>
              <MagneticButton>
                <Link
                  href="/experience"
                  className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  Detail Timeline →
                </Link>
              </MagneticButton>
            </div>

            <div className="space-y-4 border-l border-slate-200 dark:border-white/10 pl-5">
              {[
                {
                  role: "Founder — AETHER NUSANTARA",
                  time: "2025 — Sekarang",
                  text: "Memimpin arah produk & teknologi end-to-end; orkestrasi roadmap sistem, arsitektur backend, dan kualitas performa perilisan.",
                },
                {
                  role: "Senior Developer — PT Elshad Teknologi Indonesia",
                  time: "2025",
                  text: "Pengembangan fitur inti berskala besar dan optimasi backend; kolaborasi intensif dengan tim produk.",
                },
                {
                  role: "Senior Developer — PT Kodingin Digital Nusantara",
                  time: "2025",
                  text: "Perancangan arsitektur backend & API produksi, code review, standar engineering, dan mentoring tim developer.",
                },
                {
                  role: "Junior Developer & Mentor — PT Humma Teknologi Indonesia",
                  time: "2023 — 2024",
                  text: "Pengembangan aplikasi klien sekaligus mementor peserta magang; membentuk dasar praktik coding standar industri.",
                },
              ].map((t) => (
                <div key={t.role} className="relative">
                  <span className="absolute -left-[25px] top-1.5 w-2.5 h-2.5 rounded-full bg-indigo-500 ring-4 ring-white dark:ring-zinc-900" />
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                      {t.role}
                    </h3>
                    <span className="text-[11px] font-mono text-slate-400 dark:text-zinc-500">
                      {t.time}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                    {t.text}
                  </p>
                </div>
              ))}
            </div>
            </div>
          </SpotlightCard>
        </main>
      </div>

      <BackToTop />
    </div>
  );
}
