"use client";

import { useEffect, useMemo, useState } from "react";
import BackToTop from "../components/BackToTop";
import SpotlightCard from "../components/bits/SpotlightCard";
import TiltedCard from "../components/bits/TiltedCard";
import DecryptedText from "../components/bits/DecryptedText";

type Cat = "all" | "web" | "mobile" | "iot" | "game";

type Item = {
  cat: Exclude<Cat, "all">;
  img: string;
  title: string;
  desc: string;
  tags: string[];
  full: string;
  url?: string;
};

const PORTFOLIO_ITEMS: Item[] = [
  { cat: "web", img: "/assets/portfolio/e-mawarist.png", title: "e-Mawaris — Pembagian Hak Waris (Ber-HKI)", desc: "Website pembagian hak waris menggunakan 3 hukum (Islam, Perdata, Adat Jawa) dan konversi harta. Penelitian dosen bersertifikat HKI dengan saya sebagai salah satu anggota penciptanya.", tags: ["3 Hukum Waris", "Konversi Harta", "HKI", "Web App"], full: "/assets/portfolio/e-mawarist.png", url: "https://www.mawarist.web.id" },
  { cat: "web", img: "/assets/portfolio/smart-desa.png", title: "Smart Desa — E-Government & UMKM Desa", desc: "Website e-government desa dengan layanan desa digital, etalase UMKM desa, dan laporan desa yang transparan.", tags: ["E-Government", "UMKM Desa", "Transparansi", "Web App"], full: "/assets/portfolio/smart-desa.png" },
  { cat: "web", img: "/assets/portfolio/sipjaki.png", title: "SIPJAKI — Pasuruan (Konstruksi)", desc: "Sistem informasi jasa konstruksi: perizinan, daftar penyedia, dan laporan.", tags: ["Laravel", "REST API", "MySQL"], full: "/assets/portfolio/sipjaki.png" },
  { cat: "mobile", img: "/assets/portfolio/krmoney.jpg", title: "KR_Money — Catatan Keuangan", desc: "Aplikasi mobile pencatatan pengeluaran/anggaran, grafik & reminder.", tags: ["React Native", "SQLite", "Redux"], full: "/assets/portfolio/krmoney.jpg" },
  { cat: "web", img: "/assets/portfolio/getmedia.png", title: "Get Media — Portal Berita", desc: "Website berita cepat & SEO-friendly, modul redaksi, editor WYSIWYG, dan manajemen iklan.", tags: ["Next.js", "Laravel API", "MySQL", "SEO"], full: "/assets/portfolio/getmedia.png" },
  { cat: "web", img: "/assets/portfolio/pkl-humma.png", title: "PKL HummaTech — Magang + Face Recognition", desc: "Monitoring presensi siswa magang dengan Face Recognition & geofencing.", tags: ["Laravel", "Face Recognition", "OpenCV", "MySQL"], full: "/assets/portfolio/pkl-humma.png", url: "https://pkl.hummatech.com/" },
  { cat: "web", img: "/assets/portfolio/cp-humma.png", title: "Company Profile — HummaTech", desc: "Company profile modern dengan CMS, blog, dan landing produk.", tags: ["Next.js", "Tailwind", "Headless CMS"], full: "/assets/portfolio/cp-humma.png" },
  { cat: "web", img: "/assets/portfolio/cp-cakra.png", title: "Company Profile — PT Cakra Parama", desc: "Situs profil perusahaan konstruksi: project gallery & tender highlight.", tags: ["Laravel", "Blade", "Bootstrap"], full: "/assets/portfolio/cp-cakra.png" },
  { cat: "web", img: "/assets/portfolio/tracer-balikpapan.png", title: "Tracer Study — Balikpapan", desc: "Aplikasi tracer alumni: kuisioner, analitik serapan kerja, dan export laporan.", tags: ["Laravel", "Chart.js", "PostgreSQL"], full: "/assets/portfolio/tracer-balikpapan.png" },
  { cat: "web", img: "/assets/portfolio/mischoll.png", title: "Mischoll — E-Learning Sekolah", desc: "Platform pembelajaran: kelas, kuis, bank soal, dan rapor.", tags: ["Laravel", "Livewire", "MySQL"], full: "/assets/portfolio/mischoll.png" },
  { cat: "web", img: "/assets/portfolio/travel.png", title: "Landing — Travel", desc: "Landing page travel responsif dengan booking CTA & testimoni.", tags: ["Next.js", "Tailwind", "SEO"], full: "/assets/portfolio/travel.png", url: "https://mytravel2637.netlify.app/paket" },
  { cat: "web", img: "/assets/portfolio/nolima.png", title: "Landing — Brand Nolima", desc: "Brand landing untuk awareness & konversi social traffic.", tags: ["Next.js", "Tailwind"], full: "/assets/portfolio/nolima.png" },
  { cat: "iot", img: "/assets/portfolio/greenguard.png", title: "GreenGuard — Monitoring Pohon (IoT + AI)", desc: "Deteksi potensi tumbang, laporan warga, integrasi sensor & model AI.", tags: ["IoT", "Edge AI", "Laravel", "MQTT"], full: "/assets/portfolio/greenguard.png", url: "https://green-guard-one.vercel.app/" },
  { cat: "game", img: "/assets/portfolio/game.png", title: "MindMasters — Quiz Game", desc: "Game kuis budaya & lingkungan, leaderboard & streak harian.", tags: ["React", "Node.js", "WebSocket"], full: "/assets/portfolio/game.png", url: "https://drive.google.com/file/d/1Liuvh_yqmua69AvoL4VDpavwjRI9nm52/view?usp=sharing" },
  { cat: "mobile", img: "/assets/portfolio/sisfo-akun-sus.png", title: "SISFO Akuntansi Keberlanjutan", desc: "Aplikasi mobile pencatatan & pelaporan keberlanjutan.", tags: ["React Native", "REST API", "Secure Storage"], full: "/assets/portfolio/sisfo-akun-sus.png" },
  { cat: "web", img: "/assets/portfolio/lqs_question.png", title: "LQS_Question — Q&A Platform", desc: "Website Q&A internal: thread, voting, tagging, dan search.", tags: ["Laravel", "MySQL", "Redis"], full: "/assets/portfolio/lqs_question.png" },
  { cat: "web", img: "/assets/portfolio/belajar-catatan.png", title: "Landing — Belajar Catatan Kader", desc: "Landing edukasi untuk materi catatan kader.", tags: ["Next.js", "Tailwind"], full: "/assets/portfolio/belajar-catatan.png" },
  { cat: "web", img: "/assets/portfolio/birthday.png", title: "Landing — Birthday", desc: "Landing page ulang tahun interaktif dan animasi ringan.", tags: ["Next.js", "Framer Motion"], full: "/assets/portfolio/birthday.png" },
  { cat: "web", img: "/assets/portfolio/chat-realtime.png", title: "Chat Real-Time", desc: "Chatting real-time multi-room dengan presence & typing indicator.", tags: ["Node.js", "Socket.IO", "Redis"], full: "/assets/portfolio/chat-realtime.png" },
  { cat: "web", img: "/assets/portfolio/newlearning-era.png", title: "NewLearning Era — Kursus Online", desc: "Platform kursus & learning path, pembayaran, sertifikat.", tags: ["Laravel", "Vue", "Midtrans"], full: "/assets/portfolio/newlearning-era.png" },
  { cat: "web", img: "/assets/portfolio/journal-smk1.png", title: "Journal — SMKN 1 Kraksaan", desc: "Sistem jurnal digital: submission, review, dan publikasi.", tags: ["Laravel", "Blade", "MySQL"], full: "/assets/portfolio/journal-smk1.png" },
  { cat: "iot", img: "/assets/portfolio/smart-pump.png", title: "IoT Smart Pump + Mobile", desc: "Kontrol & monitoring pompa via sensor, dashboard, dan app mobile.", tags: ["IoT", "MQTT", "React Native", "Laravel"], full: "/assets/portfolio/smart-pump.png" },
];

export default function Portfolio() {
  const [modalItem, setModalItem] = useState<Item | null>(null);
  const [filter, setFilter] = useState<Cat>("all");
  const [page, setPage] = useState<number>(1);
  const pageSize = 6;

  const filtered = useMemo(
    () => PORTFOLIO_ITEMS.filter((it) => filter === "all" || it.cat === filter),
    [filter]
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const clampedPage = Math.min(page, totalPages);
  const startIdx = (clampedPage - 1) * pageSize;
  const endIdx = Math.min(startIdx + pageSize, filtered.length);
  const pageItems = filtered.slice(startIdx, endIdx);

  useEffect(() => setPage(1), [filter]);

  useEffect(() => {
    if (modalItem) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalItem(null);
    };
    if (modalItem) window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [modalItem]);

  const filters: Cat[] = ["all", "web", "mobile", "iot", "game"];

  return (
    <div id="portfolio" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pb-8">
      <header className="space-y-3 border-b border-slate-200/80 dark:border-white/[0.08] pb-6">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[11px] font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-semibold">
          05 / Shipped Work
        </span>
        <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
          <DecryptedText text="Featured Projects" speed={26} />
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 max-w-2xl">
          Dari platform web &amp; mobile hingga solusi IoT + AI dan game interaktif.
        </p>
      </header>

      {/* Filter & Count */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap gap-1.5">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                filter === f
                  ? "bg-slate-900 dark:bg-white text-white dark:text-zinc-950"
                  : "bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {f === "all" ? "All" : f === "iot" ? "IoT" : f[0].toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <div className="text-xs font-mono text-slate-500 dark:text-zinc-400">
          Showing {filtered.length ? startIdx + 1 : 0}–{endIdx} of {filtered.length} projects
        </div>
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {pageItems.map((it) => (
          <TiltedCard key={it.title} maxTilt={7} className="h-full">
            <SpotlightCard className="overflow-hidden h-full group">
              <div className="h-full flex flex-col justify-between">
                <div>
                  <div className="relative aspect-[16/10] bg-slate-100 dark:bg-zinc-950 overflow-hidden">
                    <img
                      src={it.img}
                      alt={it.title}
                      className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-zinc-950/80 backdrop-blur text-white text-[10px] font-mono uppercase">
                      {it.cat}
                    </span>
                  </div>
                  <div className="p-5 space-y-2">
                    <h2 className="font-display text-base font-bold text-slate-900 dark:text-white">
                      {it.title}
                    </h2>
                    <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed line-clamp-2">
                      {it.desc}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-5 space-y-3">
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-200/70 dark:border-white/[0.06]">
                    {it.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-zinc-950/60 border border-slate-200 dark:border-white/10 text-[10px] font-mono text-slate-600 dark:text-zinc-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setModalItem(it)}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-zinc-200 hover:border-indigo-500/40 transition"
                    >
                      <i className="fa-solid fa-magnifying-glass mr-1.5 text-[10px]" />
                      Preview
                    </button>
                    {it.url && (
                      <a
                        href={it.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition"
                      >
                        Kunjungi Web{" "}
                        <i className="fa-solid fa-arrow-up-right-from-square ml-1 text-[10px]" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </TiltedCard>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={clampedPage === 1}
            className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-semibold disabled:opacity-40 text-slate-700 dark:text-zinc-200"
          >
            ← Prev
          </button>
          <div className="flex gap-1.5">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-8 h-8 rounded-lg text-xs font-mono font-semibold ${
                  p === clampedPage
                    ? "bg-indigo-600 text-white"
                    : "bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-zinc-300"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={clampedPage === totalPages}
            className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-semibold disabled:opacity-40 text-slate-700 dark:text-zinc-200"
          >
            Next →
          </button>
        </div>
      )}

      {/* Preview Modal */}
      {modalItem && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm grid place-items-center p-4 backdrop-fade"
          onClick={() => setModalItem(null)}
        >
          <div
            className="w-full max-w-4xl bento-card p-5 sm:p-6 space-y-4 modal-pop bg-white dark:bg-zinc-900 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-semibold">
                  {modalItem.cat}
                </span>
                <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                  {modalItem.title}
                </h3>
              </div>
              <button
                onClick={() => setModalItem(null)}
                aria-label="Close preview"
                className="w-8 h-8 rounded-lg border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white"
              >
                <i className="fa-solid fa-xmark" />
              </button>
            </div>
            <img
              src={modalItem.full}
              alt={modalItem.title}
              className="w-full max-h-[60vh] object-contain rounded-xl bg-slate-100 dark:bg-zinc-950 border border-slate-200 dark:border-white/10"
            />
            <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 leading-relaxed">
              {modalItem.desc}
            </p>
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-200/70 dark:border-white/10">
              <div className="flex flex-wrap gap-1.5">
                {modalItem.tags.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-zinc-950/70 border border-slate-200 dark:border-white/10 text-[10px] font-mono text-slate-600 dark:text-zinc-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
              {modalItem.url && (
                <a
                  href={modalItem.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition"
                >
                  Kunjungi Web
                  <i className="fa-solid fa-arrow-up-right-from-square text-[10px]" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      <BackToTop />
    </div>
  );
}
