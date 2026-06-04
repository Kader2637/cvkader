"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function About() {
  // ========= COUNTER =========
  useEffect(() => {
    const about = document.getElementById("about");
    if (!about) return;

    const counters = about.querySelectorAll<HTMLElement>(".counter");
    let started = false;

    const run = () => {
      if (started) return;
      started = true;
      counters.forEach((el) => {
        const target = parseInt(el.dataset.target || "0", 10) || 0;
        const duration = 1100;
        const startTime = performance.now();
        const showPlus = (el.dataset.plus || "").toLowerCase() === "true";

        const step = (now: number) => {
          const p = Math.min((now - startTime) / duration, 1);
          const ease = 1 - Math.pow(1 - p, 3); // easeOutCubic
          const val = Math.floor(ease * target);
          el.textContent = String(val) + (p === 1 && showPlus ? "+" : "");
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    };

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && run()),
      { threshold: 0.2 }
    );
    io.observe(about);
    return () => io.disconnect();
  }, []);

  return (
    <div
      id="about"
      className="page relative overflow-hidden pt-12 pb-16 sm:pt-16 sm:pb-24"
    >
      <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* ================= TWO-COLUMN EDITORIAL LAYOUT ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Portrait & Details (4 cols) */}
          <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-28">
            
            {/* Portrait Container */}
            <div className="relative rounded-3xl bg-white/70 backdrop-blur-md p-4 shadow-xl border border-slate-200/60 overflow-hidden" data-reveal>
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-slate-50 border border-slate-100">
                {/* Profile Photo */}
                <img
                  src="/assets/foto/i'm1.png"
                  className="relative h-full w-full object-cover z-0"
                  alt="Abdul Kader"
                  loading="lazy"
                />
                
                {/* Online Tag */}
                <span className="absolute right-4 bottom-4 flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[9px] font-bold text-slate-800 shadow-sm border border-slate-100">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Remote &amp; On-site
                </span>
              </div>
            </div>

            {/* Profile Info Cards */}
            <div className="rounded-3xl bg-white/70 backdrop-blur-md p-6 border border-slate-200/65 shadow-sm space-y-4" data-reveal data-reveal-delay="100ms">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Contact &amp; Info</h3>
              <ul className="space-y-3.5 text-xs text-slate-600 font-semibold">
                <li className="flex items-center gap-3">
                  <i className="fa-solid fa-location-dot w-5 text-center text-blue-500 text-sm" />
                  Malang, Indonesia
                </li>
                <li className="flex items-center gap-3">
                  <i className="fa-solid fa-briefcase w-5 text-center text-purple-500 text-sm" />
                  Founder AETHER NUSANTARA
                </li>
                <li className="flex items-center gap-3">
                  <i className="fa-solid fa-envelope w-5 text-center text-cyan-500 text-sm" />
                  <a
                    href="mailto:abdulkader0126@gmail.com"
                    className="hover:text-blue-600 transition-colors"
                  >
                    abdulkader0126@gmail.com
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <i className="fa-solid fa-phone w-5 text-center text-emerald-500 text-sm" />
                  <a href="tel:+62895428183064" className="hover:text-blue-600 transition-colors">
                    0895-4281-83064
                  </a>
                </li>
              </ul>

              {/* Social Channels */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Follow Me</span>
                <div className="flex gap-2">
                  {[
                    { icon: "linkedin", href: "https://www.linkedin.com/in/abdul-kader-53b22930a" },
                    { icon: "github", href: "https://github.com/Kader2637" },
                    { icon: "instagram", href: "https://instagram.com/abdulkader2637" },
                  ].map((s) => (
                    <a
                      key={s.icon}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200/80 bg-white text-slate-500 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50 hover:text-slate-800"
                      aria-label={s.icon}
                    >
                      <i className={`fa-brands fa-${s.icon} text-xs`} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

          </aside>

          {/* Right Column: Narrative & Timeline (8 cols) */}
          <main className="lg:col-span-8 space-y-12">
            
            {/* Header / Intro */}
            <div className="space-y-4" data-reveal data-reveal-delay="50ms">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/80 px-3.5 py-1.5 text-xs font-semibold text-blue-700 backdrop-blur-sm shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(34,197,94,0.35)]" />
                <span>Founder AETHER NUSANTARA</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Abdul Kader
              </h2>
              <p className="text-sm font-semibold text-blue-600">
                Full Stack Developer · Founder AETHER NUSANTARA
              </p>
              
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed pt-2">
                Saya berpengalaman lebih dari <strong>4 tahun</strong> membangun solusi web, mobile, serta integrasi sistem terdistribusi. Fokus utama saya adalah pengiriman fitur secara cepat dan terencana, pengoptimalan performa server, keamanan data, dan dampak bisnis nyata.
              </p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-100" data-reveal data-reveal-delay="100ms">
              {[
                { val: "4+", label: "Years Exp" },
                { val: "25+", label: "Projects" },
                { val: "10+", label: "Clients" },
              ].map((s) => (
                <div key={s.label} className="rounded-2xl bg-white/70 border border-slate-200/80 p-5 shadow-sm flex flex-col justify-between h-full">
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 leading-none">
                    <span className="counter" data-target={s.val.replace("+", "")} data-plus="true">0</span>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-2 font-bold uppercase tracking-wider leading-tight">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Core Values Cards */}
            <div className="space-y-4 pt-6 border-t border-slate-100" data-reveal data-reveal-delay="150ms">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Prinsip &amp; Siklus Kerja</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    title: "Rilis Cepat &amp; Terkendali",
                    desc: "Menyediakan delivery fitur yang cepat dengan pipeline CI/CD yang terintegrasi pengujian otomatis."
                  },
                  {
                    title: "Performa di Level Produk",
                    desc: "Mendesain skema database teroptimasi untuk response time server minimal dan efisiensi query."
                  }
                ].map((item) => (
                  <div key={item.title} className="rounded-2xl bg-white/70 border border-slate-200/60 p-5 shadow-sm space-y-2">
                    <h4 className="text-xs font-bold text-slate-900" dangerouslySetInnerHTML={{ __html: item.title }} />
                    <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack Radar */}
            <div className="space-y-4 pt-6 border-t border-slate-100" data-reveal data-reveal-delay="200ms">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Primary Stack</h3>
              <div className="flex flex-wrap gap-2.5">
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
                    className="inline-flex items-center gap-2 rounded-xl bg-white border border-slate-200 px-3.5 py-1.5 text-xs text-slate-700 font-semibold shadow-sm"
                  >
                    <i className={`${item.icon} text-slate-500`} />
                    {item.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Career Timeline */}
            <div className="space-y-6 pt-6 border-t border-slate-100" data-reveal data-reveal-delay="250ms">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Experience Highlights</h3>
              <div className="relative pl-6 border-l border-slate-200 space-y-8">
                {[
                  {
                    role: "Founder — AETHER NUSANTARA",
                    time: "2025 — Sekarang",
                    text: "Memimpin arah produk & teknologi end-to-end; orkestrasi roadmap sistem, arsitektur backend, dan kualitas performa perilisan."
                  },
                  {
                    role: "Senior Developer — PT Elshad Teknologi Indonesia",
                    time: "2025",
                    text: "Pengembangan fitur inti berskala besar dan melakukan optimasi backend; kolaborasi intensif dengan tim produk."
                  },
                  {
                    role: "HRD — PT Kodingin Digital Nusantara",
                    time: "2025",
                    text: "Mendukung proses rekrutmen engineer, technical interview teknis talenta baru, serta pengawasan mutu tim."
                  },
                  {
                    role: "Junior Developer & Mentor — PT Humma Teknologi Indonesia",
                    time: "2023 — 2024",
                    text: "Pengembangan aplikasi klien sekaligus mementor peserta magang; membentuk dasar praktik coding standar industri."
                  },
                ].map((t) => (
                  <div className="relative" key={t.role}>
                    {/* Timeline Node dot */}
                    <span className="absolute -left-[30px] top-1 h-3.5 w-3.5 rounded-full bg-blue-500 border-2 border-white shadow-sm" />
                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <h4 className="text-xs font-bold text-slate-900">{t.role}</h4>
                        <span className="text-[10px] font-bold text-slate-400 shrink-0">{t.time}</span>
                      </div>
                      <p className="mt-1 text-xs text-slate-500 leading-relaxed">{t.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Actions */}
            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-3" data-reveal data-reveal-delay="300ms">
              <Link
                href="/portfolio"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-xs font-bold text-white shadow-sm hover:bg-black transition active:scale-95"
              >
                <i className="fa-solid fa-briefcase text-xs" /> Lihat Portfolio
              </Link>
              <a
                href="mailto:abdulkader0126@gmail.com?subject=Project%20Inquiry%252520via%252520Portfolio"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-xs font-bold text-white shadow-md hover:from-blue-700 hover:to-indigo-700 transition active:scale-95"
              >
                <i className="fa-solid fa-paper-plane text-xs" /> Hubungi Saya
              </a>
              <a
                href="/assets/cv/AbdulKader_CV.pdf"
                download
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-xs font-bold text-slate-800 shadow-sm hover:bg-slate-50 transition active:scale-95"
              >
                <i className="fa-solid fa-file-arrow-down text-xs text-slate-500" /> Unduh CV
              </a>
            </div>

          </main>

        </div>

      </section>
    </div>
  );
}
