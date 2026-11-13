"use client";

import BackToTop from "../components/BackToTop";
import SpotlightCard from "../components/bits/SpotlightCard";
import TiltedCard from "../components/bits/TiltedCard";
import DecryptedText from "../components/bits/DecryptedText";

type Item = {
  role: string;
  company: string;
  location: string;
  period: string;
  desc: string;
  bullets: string[];
  tags: string[];
  img: { src: string; alt: string };
  active?: boolean;
  featured?: boolean;
  stats?: { label: string; val: string }[];
};

export default function Experience() {
  const items: Item[] = [
    {
      role: "Founder",
      company: "AETHER NUSANTARA",
      location: "Malang, Indonesia",
      period: "2025 — Sekarang",
      active: true,
      featured: true,
      desc: "Mendirikan dan memimpin visi teknologi, arsitektur sistem, dan roadmap produk digital end-to-end. Berfokus pada kecepatan rilis, keandalan sistem berstandar industri (high reliability & security), serta efisiensi biaya infrastruktur cloud.",
      stats: [
        { label: "Status", val: "Active Founder" },
        { label: "Focus", val: "Full Stack & Cloud" },
        { label: "Standard", val: "Enterprise QA" },
      ],
      bullets: [
        "Merancang arsitektur service-oriented & full observability (metrics, logs, distributed traces)",
        "Mengembangkan CI/CD pipeline otomatis dengan automated testing, security lint, canary & zero-downtime deployment",
        "Menetapkan standar rekayasa perangkat lunak, coding guidelines, review gate, dan mentoring developer",
      ],
      tags: ["Laravel", "Next.js", "PHP 8", "MySQL / PostgreSQL", "Redis", "Docker", "DevOps"],
      img: {
        src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&h=600&fit=crop",
        alt: "AETHER NUSANTARA Workspace",
      },
    },
    {
      role: "Senior Developer",
      company: "PT Kodingin Digital Nusantara",
      location: "Malang, Indonesia",
      period: "2025",
      desc: "Mengembangkan arsitektur aplikasi produksi berskala enterprise, memimpin implementasi modul inti, mengawal standar code review, serta mementoring tim engineering guna memastikan stabilitas rilis produk.",
      stats: [
        { label: "Level", val: "Senior Role" },
        { label: "Core", val: "Backend & Systems" },
        { label: "Impact", val: "High Stability" },
      ],
      bullets: [
        "Perancangan arsitektur backend, manajemen database relasional kompleks, dan integrasi REST API berkinerja tinggi",
        "Penerapan review gate ketat dan pendampingan technical pairing untuk peningkatan kapabilitas engineer internal",
        "Optimasi query, caching strategi dengan Redis, dan dockerisasi lingkungan server",
      ],
      tags: ["Laravel", "Next.js", "PHP 8", "MySQL", "Docker", "Architecture", "Mentoring"],
      img: { src: "/assets/foto/kodinusco.jpg", alt: "PT Kodingin Digital Nusantara" },
    },
    {
      role: "Senior Developer",
      company: "PT Elshad Teknologi Indonesia",
      location: "Indonesia",
      period: "2025",
      desc: "Pengembangan modul sistem inti dan optimasi latensi response time. Melakukan refactoring sistem ke arsitektur Laravel modern, caching bertingkat, serta queue worker terdistribusi.",
      stats: [
        { label: "Focus", val: "API & Microservice" },
        { label: "Performance", val: "Redis Queue" },
        { label: "Automation", val: "GitHub Actions" },
      ],
      bullets: [
        "Perancangan API scalable dan query tuning pada schema database berskala jutaan record",
        "Implementasi cache Redis, Laravel Horizon/Queue, retry backoff, dan failover protection",
        "Automasi testing pipeline via GitHub Actions untuk validasi PR sebelum merge ke staging/production",
      ],
      tags: ["Laravel 10", "MySQL", "Redis", "Horizon", "CI/CD", "Security"],
      img: {
        src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=900&h=600&fit=crop",
        alt: "Elshad Teknologi Indonesia",
      },
    },
    {
      role: "Junior Developer & Mentor",
      company: "PT Humma Teknologi Indonesia",
      location: "Indonesia",
      period: "2023 — 2024",
      desc: "Membangun sistem web interaktif (Laravel + React) untuk berbagai klien dan berperan aktif sebagai mentor peserta magang serta bootcamp internal perusahaan.",
      stats: [
        { label: "Tenure", val: "1+ Year" },
        { label: "Stack", val: "Laravel & React" },
        { label: "Mentored", val: "Intern Cohorts" },
      ],
      bullets: [
        "Pembangunan modul otentikasi role-based, dashboard admin dinamis, dan RESTful endpoints",
        "Penerapan praktik clean code, Git branch flow terstruktur, dan penulisan unit test",
        "Memandu sesi sharing teknis, evaluasi proyek magang, serta troubleshooting bug tim",
      ],
      tags: ["Laravel", "React", "MySQL", "Git Flow", "Mentoring"],
      img: { src: "/assets/foto/hummatech.jpg", alt: "Humma Teknologi Indonesia" },
    },
  ];

  return (
    <div id="experience" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pb-16">
      {/* Header */}
      <header className="space-y-4 border-b border-slate-200/80 dark:border-white/[0.08] pb-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[11px] font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-semibold">
            Career Experience
          </span>
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
            4+ Years Experience
          </span>
        </div>
        <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white">
          <DecryptedText text="Professional Journey" speed={24} />
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 max-w-3xl leading-relaxed">
          Rekam jejak kontribusi nyata dalam merancang arsitektur sistem, memimpin pengembangan produk digital, serta mengawal eksekusi engineering mulai dari level mentor hingga founder.
        </p>
      </header>

      {/* Dynamic Timeline Stream Layout */}
      <div className="relative">
        {/* Glowing vertical spine for desktop */}
        <div className="hidden lg:block absolute left-8 top-6 bottom-6 w-0.5 bg-gradient-to-b from-indigo-500 via-cyan-400 to-transparent opacity-40 z-0" />

        <div className="space-y-8 sm:space-y-10 relative z-10">
          {items.map((it, idx) => (
            <div key={`${it.role}-${it.company}`} className="relative lg:pl-20">
              {/* Step indicator node on timeline spine */}
              <div className="hidden lg:flex absolute left-5 top-8 w-6 h-6 rounded-full bg-white dark:bg-zinc-950 border-2 border-indigo-500 items-center justify-center shadow-lg shadow-indigo-500/30">
                <span className={`w-2 h-2 rounded-full ${it.active ? "bg-emerald-400 animate-ping" : "bg-indigo-500"}`} />
              </div>

              <SpotlightCard className={`overflow-hidden transition-all duration-300 ${it.featured ? "ring-1 ring-indigo-500/30 shadow-xl shadow-indigo-500/10" : ""}`}>
                <div className="p-6 sm:p-8 space-y-6">
                  {/* Top Bar: Company badge, Period, Role */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 dark:border-white/[0.08] pb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl overflow-hidden bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-white/10 shrink-0 flex items-center justify-center">
                        <img
                          src={it.img.src}
                          alt={it.img.alt}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-bold">
                            {it.company}
                          </span>
                          {it.active && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[10px] font-mono text-emerald-600 dark:text-emerald-400">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              Current
                            </span>
                          )}
                        </div>
                        <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                          {it.role}
                        </h2>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-center">
                      <span className="px-3 py-1.5 rounded-xl bg-slate-100/90 dark:bg-zinc-800/90 border border-slate-200 dark:border-white/10 text-xs font-mono font-medium text-slate-700 dark:text-zinc-200 whitespace-nowrap">
                        <i className="fa-regular fa-calendar mr-1.5 text-indigo-500 text-[11px]" />
                        {it.period}
                      </span>
                      <span className="hidden md:inline-flex px-2.5 py-1.5 rounded-xl bg-slate-100/50 dark:bg-zinc-900/50 border border-slate-200/70 dark:border-white/[0.06] text-xs font-mono text-slate-500 dark:text-zinc-400">
                        <i className="fa-solid fa-location-dot mr-1.5 text-rose-500 text-[10px]" />
                        {it.location}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    <div className="lg:col-span-8 space-y-4">
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 leading-relaxed">
                        {it.desc}
                      </p>

                      <div className="space-y-2 pt-1">
                        <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 dark:text-zinc-500 font-semibold">
                          Key Deliverables &amp; Achievements
                        </div>
                        <ul className="space-y-2">
                          {it.bullets.map((b) => (
                            <li key={b} className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-zinc-300">
                              <i className="fa-solid fa-check text-indigo-500 mt-0.5 text-[11px] shrink-0" />
                              <span className="leading-relaxed">{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Tech Pills */}
                      <div className="pt-2">
                        <div className="flex flex-wrap gap-1.5">
                          {it.tags.map((t) => (
                            <span
                              key={t}
                              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-zinc-950/70 border border-slate-200/80 dark:border-white/10 text-[11px] font-mono text-slate-700 dark:text-zinc-300"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right column: Highlights and Visual Photo */}
                    <div className="lg:col-span-4 space-y-3">
                      {it.stats && (
                        <div className="grid grid-cols-3 gap-2">
                          {it.stats.map((st) => (
                            <div
                              key={st.label}
                              className="p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-950/60 border border-slate-200/70 dark:border-white/[0.06] text-center"
                            >
                              <div className="text-[10px] font-mono text-slate-400 dark:text-zinc-500 uppercase">
                                {st.label}
                              </div>
                              <div className="text-xs font-bold font-display text-slate-900 dark:text-zinc-100 truncate mt-0.5">
                                {st.val}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      <TiltedCard maxTilt={6}>
                        <div className="aspect-[16/10] w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-zinc-950 group">
                          <img
                            src={it.img.src}
                            alt={it.img.alt}
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        </div>
                      </TiltedCard>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </div>
          ))}
        </div>
      </div>

      <BackToTop />
    </div>
  );
}
