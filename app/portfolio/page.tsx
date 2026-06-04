"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Cat = "all" | "web" | "mobile" | "iot" | "game";

type Item = {
  cat: Exclude<Cat, "all">;
  img: string;
  title: string;
  desc: string;
  tags: string[];
  full: string;
  url?: string;
  glow: string;
};

export default function Portfolio() {
  const [modalSrc, setModalSrc] = useState<string | null>(null);
  const [modalTitle, setModalTitle] = useState<string>("");
  const [filter, setFilter] = useState<Cat>("all");
  const [page, setPage] = useState<number>(1);
  const pageSize = 6;

  // ==== DATA PORTFOLIO (20 items) ====
  const items: Item[] = [
    { cat: "web", img: "/assets/portfolio/getmedia.png", title: "Get Media — Portal Berita", desc: "Website berita cepat & SEO-friendly, modul redaksi, editor WYSIWYG, dan manajemen iklan.", tags: ["Next.js","Laravel API","MySQL","SEO"], full: "/assets/portfolio/getmedia.png", url: "#", glow: "glow-blue" },
    { cat: "web", img: "/assets/portfolio/pkl-humma.png", title: "PKL HummaTech — Magang + Face Recognition", desc: "Monitoring presensi siswa magang dengan Face Recognition & geofencing.", tags: ["Laravel","Face Recognition","OpenCV","MySQL"], full: "/assets/portfolio/pkl-humma.png", url: "#", glow: "glow-blue" },
    { cat: "web", img: "/assets/portfolio/cp-humma.png", title: "Company Profile — HummaTech", desc: "Company profile modern dengan CMS, blog, dan landing produk.", tags: ["Next.js","Tailwind","Headless CMS"], full: "/assets/portfolio/cp-humma.png", url: "#", glow: "glow-blue" },
    { cat: "web", img: "/assets/portfolio/cp-cakra.png", title: "Company Profile — PT Cakra Parama", desc: "Situs profil perusahaan konstruksi: project gallery & tender highlight.", tags: ["Laravel","Blade","Bootstrap"], full: "/assets/portfolio/cp-cakra.png", url: "#", glow: "glow-blue" },
    { cat: "web", img: "/assets/portfolio/tracer-balikpapan.png", title: "Tracer Study — Balikpapan", desc: "Aplikasi tracer alumni: kuisioner, analitik serapan kerja, dan export laporan.", tags: ["Laravel","Chart.js","PostgreSQL"], full: "/assets/portfolio/tracer-balikpapan.png", url: "#", glow: "glow-blue" },
    { cat: "web", img: "/assets/portfolio/sipjaki.png", title: "SIPJAKI — Pasuruan (Konstruksi)", desc: "Sistem informasi jasa konstruksi: perizinan, daftar penyedia, dan laporan.", tags: ["Laravel","REST API","MySQL"], full: "/assets/portfolio/sipjaki.png", url: "#", glow: "glow-blue" },
    { cat: "web", img: "/assets/portfolio/mischoll.png", title: "Mischoll — E-Learning Sekolah", desc: "Platform pembelajaran: kelas, kuis, bank soal, dan rapor.", tags: ["Laravel","Livewire","MySQL"], full: "/assets/portfolio/mischoll.png", url: "#", glow: "glow-blue" },
    { cat: "web", img: "/assets/portfolio/travel.png", title: "Landing — Travel", desc: "Landing page travel responsif dengan booking CTA & testimoni.", tags: ["Next.js","Tailwind","SEO"], full: "/assets/portfolio/travel.png", url: "#", glow: "glow-blue" },
    { cat: "web", img: "/assets/portfolio/nolima.png", title: "Landing — Brand Nolima", desc: "Brand landing untuk awareness & konversi social traffic.", tags: ["Next.js","Tailwind"], full: "/assets/portfolio/nolima.png", url: "#", glow: "glow-blue" },
    { cat: "iot", img: "/assets/portfolio/greenguard.png", title: "GreenGuard — Monitoring Pohon (IoT + AI)", desc: "Deteksi potensi tumbang, laporan warga, integrasi sensor & model AI.", tags: ["IoT","Edge AI","Laravel","MQTT"], full: "/assets/portfolio/greenguard.png", url: "#", glow: "glow-emerald" },
    { cat: "mobile", img: "/assets/portfolio/krmoney.jpg", title: "KR_Money — Catatan Keuangan", desc: "Aplikasi mobile pencatatan pengeluaran/anggaran, grafik & reminder.", tags: ["React Native","SQLite","Redux"], full: "/assets/portfolio/krmoney.jpg", url: "#", glow: "glow-purple" },
    { cat: "game", img: "/assets/portfolio/game.png", title: "MindMasters — Quiz Game", desc: "Game kuis budaya & lingkungan, leaderboard & streak harian.", tags: ["React","Node.js","WebSocket"], full: "/assets/portfolio/game.png", url: "#", glow: "glow-orange" },
    { cat: "mobile", img: "/assets/portfolio/sisfo-akun-sus.png", title: "SISFO Akuntansi Keberlanjutan", desc: "Aplikasi mobile pencatatan & pelaporan keberlanjutan.", tags: ["React Native","REST API","Secure Storage"], full: "/assets/portfolio/sisfo-akun-sus.png", url: "#", glow: "glow-purple" },
    { cat: "web", img: "/assets/portfolio/lqs_question.png", title: "LQS_Question — Q&A Platform", desc: "Website Q&A internal: thread, voting, tagging, dan search.", tags: ["Laravel","MySQL","Redis"], full: "/assets/portfolio/lqs_question.png", url: "#", glow: "glow-blue" },
    { cat: "web", img: "/assets/portfolio/belajar-catatan.png", title: "Landing — Belajar Catatan Kader", desc: "Landing edukasi untuk materi catatan kader.", tags: ["Next.js","Tailwind"], full: "/assets/portfolio/belajar-catatan.png", url: "#", glow: "glow-blue" },
    { cat: "web", img: "/assets/portfolio/birthday.png", title: "Landing — Birthday", desc: "Landing page ulang tahun interaktif dan animasi ringan.", tags: ["Next.js","Framer Motion"], full: "/assets/portfolio/birthday.png", url: "#", glow: "glow-blue" },
    { cat: "web", img: "/assets/portfolio/chat-realtime.png", title: "Chat Real-Time", desc: "Chatting real-time multi-room dengan presence & typing indicator.", tags: ["Node.js","Socket.IO","Redis"], full: "/assets/portfolio/chat-realtime.png", url: "#", glow: "glow-blue" },
    { cat: "web", img: "/assets/portfolio/newlearning-era.png", title: "NewLearning Era — Kursus Online", desc: "Platform kursus & learning path, pembayaran, sertifikat.", tags: ["Laravel","Vue","Midtrans"], full: "/assets/portfolio/newlearning-era.png", url: "#", glow: "glow-blue" },
    { cat: "web", img: "/assets/portfolio/journal-smk1.png", title: "Journal — SMKN 1 Kraksaan", desc: "Sistem jurnal digital: submission, review, dan publikasi.", tags: ["Laravel","Blade","MySQL"], full: "/assets/portfolio/journal-smk1.png", url: "#", glow: "glow-blue" },
    { cat: "iot", img: "/assets/portfolio/smart-pump.png", title: "IoT Smart Pump + Mobile", desc: "Kontrol & monitoring pompa via sensor, dashboard, dan app mobile.", tags: ["IoT","MQTT","React Native","Laravel"], full: "/assets/portfolio/smart-pump.png", url: "#", glow: "glow-emerald" },
  ];

  // ==== DERIVED DATA ====
  const filtered = useMemo(
    () => items.filter((it) => filter === "all" || it.cat === filter),
    [filter, items]
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const clampedPage = Math.min(page, totalPages);
  const startIdx = (clampedPage - 1) * pageSize;
  const endIdx = Math.min(startIdx + pageSize, filtered.length);
  const pageItems = filtered.slice(startIdx, endIdx);

  // reset page saat filter berubah
  useEffect(() => setPage(1), [filter]);

  // helper render nomor halaman
  const renderPages = () => {
    const btn = (p: number) => (
      <button
        key={`p-${p}`}
        onClick={() => setPage(p)}
        className={`min-w-9 h-9 px-3 rounded-lg text-sm font-semibold transition ${
          p === clampedPage
            ? "bg-slate-900 text-white shadow-sm"
            : "bg-slate-100/80 text-slate-800 hover:bg-slate-200/80"
        }`}
        aria-current={p === clampedPage ? "page" : undefined}
      >
        {p}
      </button>
    );

    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => btn(i + 1));
    }

    const nodes: React.ReactNode[] = [];
    const push = (n: React.ReactNode) => nodes.push(n);
    push(btn(1));
    if (clampedPage > 3) push(<span key="e1" className="px-1 text-gray-500">…</span>);
    const start = Math.max(2, clampedPage - 1);
    const stop = Math.min(totalPages - 1, clampedPage + 1);
    for (let p = start; p <= stop; p++) push(btn(p));
    if (clampedPage < totalPages - 2) push(<span key="e2" className="px-1 text-gray-500">…</span>);
    push(btn(totalPages));
    return nodes;
  };

  const filters: Cat[] = ["all", "web", "mobile", "iot", "game"];

  return (
    <div
      id="portfolio"
      className="relative overflow-hidden pt-12 pb-12 sm:pt-16 sm:pb-16"
    >
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <header className="max-w-3xl mx-auto text-center mb-16" data-reveal>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 ring-1 ring-blue-100">
            <span className="size-2 rounded-full bg-blue-500 animate-pulse" /> Portfolio
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
            Featured Projects
          </h2>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            Dari platform web & mobile hingga solusi IoT dan game interaktif.
          </p>
        </header>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-10" data-reveal data-reveal-delay="50ms">
          {filters.map((f, i) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                filter === f
                  ? "bg-slate-950 text-white shadow-md scale-105"
                  : "bg-white/60 hover:bg-white text-slate-700 border border-slate-200/80 shadow-sm"
              }`}
            >
              {f === "all" ? "All" : f[0].toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Info jumlah */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6 text-sm text-slate-500 font-medium" data-reveal data-reveal-delay="100ms">
          <div>
            Showing <span className="font-bold text-slate-900">{filtered.length ? startIdx + 1 : 0}</span>
            –<span className="font-bold text-slate-900">{endIdx}</span> of{" "}
            <span className="font-bold text-slate-900">{filtered.length}</span> projects
          </div>
          <div>
            Page <span className="font-bold text-slate-900">{clampedPage}</span> /{" "}
            <span className="font-bold text-slate-900">{totalPages}</span>
          </div>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {pageItems.map((it, idx) => (
            <article
              key={`${it.title}-${idx}`}
              className={`portfolio-card group relative overflow-hidden rounded-2xl glass-card glass-card-hover border border-white/60 shadow-sm ${it.glow}`}
              data-reveal
              data-reveal-delay={`${(idx % 6) * 50}ms`}
            >
              {/* Image + overlay */}
              <div className="relative overflow-hidden aspect-[16/10] bg-slate-100">
                <img src={it.img} alt={it.title} className="w-full h-full object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1.5 rounded-lg text-[10px] font-bold bg-white/95 text-slate-800 ring-1 ring-slate-100 shadow-sm uppercase">
                    {it.cat}
                  </span>
                </div>
                <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition duration-300">
                  <button
                    onClick={() => {
                      setModalSrc(it.full);
                      setModalTitle(it.title);
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/95 text-slate-800 text-xs font-semibold hover:bg-white active:scale-95 shadow-sm"
                    title="Preview"
                  >
                    <i className="fa-solid fa-magnifying-glass text-xs" /> Preview
                  </button>
                  <a
                    href="#"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 active:scale-95 shadow-sm"
                    title="Visit Site"
                  >
                    <i className="fa-solid fa-arrow-up-right-from-square text-[10px]" /> Visit
                  </a>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-slate-950 mb-1 leading-snug">{it.title}</h3>
                <p className="text-slate-500 text-sm mb-4 leading-relaxed line-clamp-2">{it.desc}</p>
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100/60">
                  {it.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded-lg text-[10px] bg-slate-50 text-slate-500 font-semibold ring-1 ring-slate-200/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4" data-reveal data-reveal-delay="100ms">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={clampedPage === 1}
            className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold ${
              clampedPage === 1
                ? "bg-slate-100/80 text-slate-400 cursor-not-allowed"
                : "bg-white text-slate-800 border border-slate-200/80 hover:bg-slate-50 shadow-sm"
            }`}
          >
            <i className="fa-solid fa-chevron-left" /> Prev
          </button>

          <div className="flex flex-wrap items-center gap-2">
            {renderPages()}
          </div>

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={clampedPage === totalPages}
            className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold ${
              clampedPage === totalPages
                ? "bg-slate-100/80 text-slate-400 cursor-not-allowed"
                : "bg-white text-slate-800 border border-slate-200/80 hover:bg-slate-50 shadow-sm"
            }`}
          >
            Next <i className="fa-solid fa-chevron-right" />
          </button>
        </div>
      </section>

      {/* Modal Preview */}
      {modalSrc && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm grid place-items-center p-4 backdrop-fade"
          onClick={() => setModalSrc(null)}
        >
          <div
            className="relative rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 p-[2.5px] shadow-2xl w-[92%] max-w-4xl modal-pop"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="rounded-3xl bg-white p-6">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <h4 className="text-base font-bold text-slate-900">{modalTitle}</h4>
                <button
                  onClick={() => setModalSrc(null)}
                  className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:text-red-500 hover:bg-red-50 hover:border-red-100 flex items-center justify-center transition active:scale-90"
                  aria-label="Close"
                  title="Close"
                >
                  <i className="fa-solid fa-xmark text-sm" />
                </button>
              </div>
              <div className="rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/60 shadow-inner">
                <img
                  src={modalSrc}
                  alt="Project Preview"
                  className="w-full max-h-[66vh] object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
