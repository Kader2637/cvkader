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
};

export default function Experience() {
  const items: Item[] = [
    {
      role: "Founder",
      company: "AETHER NUSANTARA",
      location: "Malang",
      period: "2025 — Sekarang",
      active: true,
      desc: "Memimpin arah produk & teknologi end-to-end: roadmap, arsitektur, quality gate, dan rilis. Fokus kecepatan rilis, reliability (SLO/SLI), dan efisiensi biaya.",
      bullets: [
        "Arsitektur service-oriented & full observability (traces, metrics, logs)",
        "CI/CD aman: review gate, SAST/DAST, canary & rollback",
        "Skala tim: coding guideline, code review, mentoring",
      ],
      tags: ["Laravel", "Node.js", "PHP 8", "MySQL/PostgreSQL", "Redis", "Docker/K8s"],
      img: {
        src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&h=600&fit=crop",
        alt: "AETHER NUSANTARA",
      },
    },
    {
      role: "Senior Developer",
      company: "PT Kodingin Digital Nusantara",
      location: "Malang",
      period: "2025",
      desc: "Mengembangkan sistem & arsitektur aplikasi produksi, mentoring tim engineering, serta menjaga kualitas kode dan rilis di PT Kodingin Digital Nusantara.",
      bullets: [
        "Perancangan arsitektur backend & API berkinerja tinggi",
        "Code review, standar engineering, dan mentoring developer",
        "Optimasi database, caching, dan deployment pipeline",
      ],
      tags: ["Laravel", "Next.js", "PHP 8", "MySQL", "Docker"],
      img: { src: "/assets/foto/kodinusco.jpg", alt: "PT Kodingin Digital Nusantara" },
    },
    {
      role: "Senior Developer",
      company: "PT Elshad Teknologi Indonesia",
      location: "Indonesia",
      period: "2025",
      desc: "Pengembangan fitur inti & optimasi performa. Refactor ke Laravel 10, implementasi caching Redis & queue worker, serta pipeline CI/CD yang cepat & aman.",
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
    },
    {
      role: "HRD (Talent & Process)",
      company: "PT Kodingin Digital Nusantara",
      location: "Malang",
      period: "2025",
      desc: "Merancang pipeline rekrutmen end-to-end, menyelaraskan rubric interview teknis, dan mempercepat hiring untuk kebutuhan delivery & growth.",
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
    },
    {
      role: "Junior Developer & Mentor",
      company: "PT Humma Teknologi Indonesia",
      location: "Indonesia",
      period: "2023 — 2024",
      desc: "Pengembangan aplikasi web (Laravel + React) & mentoring internal/bootcamp. Menerapkan standard coding, testing, dan versioning.",
      bullets: [
        "RESTful API, Blade/React, Authentication & Role",
        "Unit & feature testing; Git flow",
        "Review PR & knowledge sharing",
      ],
      tags: ["Laravel", "React", "MySQL", "Git"],
      img: { src: "/assets/foto/hummatech.jpg", alt: "Humma Teknologi Indonesia" },
    },
  ];

  return (
    <div id="experience" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 pb-8">
      <header className="space-y-3 border-b border-slate-200/80 dark:border-white/[0.08] pb-6">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[11px] font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-semibold">
          02 / Career Timeline
        </span>
        <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
          <DecryptedText text="Professional Journey" speed={26} />
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 max-w-2xl">
          Jejak karier dalam membangun produk, arsitektur sistem, tim, dan proses engineering yang nyata terasa bagi bisnis dan pengguna.
        </p>
      </header>

      <div className="space-y-6">
        {items.map((it) => (
          <SpotlightCard key={it.role} className="p-5 sm:p-7">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-4">
                <TiltedCard maxTilt={8}>
                  <div className="aspect-[16/10] rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-zinc-950">
                    <img
                      src={it.img.src}
                      alt={it.img.alt}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </TiltedCard>
              </div>

              <div className="lg:col-span-8 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      {it.active && (
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      )}
                      <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                        {it.role}
                      </h2>
                    </div>
                    <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mt-0.5">
                      {it.company} · {it.location}
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-white/10 text-[11px] font-mono text-slate-600 dark:text-zinc-300 self-start sm:self-auto shrink-0 whitespace-nowrap">
                    {it.period}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
                  {it.desc}
                </p>

                <ul className="space-y-1.5 text-xs text-slate-600 dark:text-zinc-300 pt-2 border-t border-slate-200/70 dark:border-white/[0.06]">
                  {it.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {it.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-zinc-950/60 border border-slate-200 dark:border-white/10 text-[10px] font-mono text-slate-600 dark:text-zinc-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </SpotlightCard>
        ))}
      </div>

      <BackToTop />
    </div>
  );
}
