"use client";
import { useEffect, useMemo, useState } from "react";

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

export default function Portfolio() {
  const [modalSrc, setModalSrc] = useState<string | null>(null);
  const [modalTitle, setModalTitle] = useState<string>("");
  const [filter, setFilter] = useState<Cat>("all");
  const [page, setPage] = useState<number>(1);
  const pageSize = 6;

  // ==== DATA PORTFOLIO (20 items) ====
  const items: Item[] = [
    { cat: "web", img: "/assets/portfolio/getmedia.png", title: "Get Media — Portal Berita", desc: "Website berita cepat & SEO-friendly, modul redaksi, editor WYSIWYG, dan manajemen iklan.", tags: ["Next.js","Laravel API","MySQL","SEO"], full: "/assets/portfolio/getmedia.png", url: "#" },
    { cat: "web", img: "/assets/portfolio/pkl-humma.png", title: "PKL HummaTech — Magang + Face Recognition", desc: "Monitoring presensi siswa magang dengan Face Recognition & geofencing.", tags: ["Laravel","Face Recognition","OpenCV","MySQL"], full: "/assets/portfolio/pkl-humma.png", url: "#" },
    { cat: "web", img: "/assets/portfolio/cp-humma.png", title: "Company Profile — HummaTech", desc: "Company profile modern dengan CMS, blog, dan landing produk.", tags: ["Next.js","Tailwind","Headless CMS"], full: "/assets/portfolio/cp-humma.png", url: "#" },
    { cat: "web", img: "/assets/portfolio/cp-cakra.png", title: "Company Profile — PT Cakra Parama", desc: "Situs profil perusahaan konstruksi: project gallery & tender highlight.", tags: ["Laravel","Blade","Bootstrap"], full: "/assets/portfolio/cp-cakra.png", url: "#" },
    { cat: "web", img: "/assets/portfolio/tracer-balikpapan.png", title: "Tracer Study — Balikpapan", desc: "Aplikasi tracer alumni: kuisioner, analitik serapan kerja, dan export laporan.", tags: ["Laravel","Chart.js","PostgreSQL"], full: "/assets/portfolio/tracer-balikpapan.png", url: "#" },
    { cat: "web", img: "/assets/portfolio/sipjaki.png", title: "SIPJAKI — Pasuruan (Konstruksi)", desc: "Sistem informasi jasa konstruksi: perizinan, daftar penyedia, dan laporan.", tags: ["Laravel","REST API","MySQL"], full: "/assets/portfolio/sipjaki.png", url: "#" },
    { cat: "web", img: "/assets/portfolio/mischoll.png", title: "Mischoll — E-Learning Sekolah", desc: "Platform pembelajaran: kelas, kuis, bank soal, dan rapor.", tags: ["Laravel","Livewire","MySQL"], full: "/assets/portfolio/mischoll.png", url: "#" },
    { cat: "web", img: "/assets/portfolio/travel.png", title: "Landing — Travel", desc: "Landing page travel responsif dengan booking CTA & testimoni.", tags: ["Next.js","Tailwind","SEO"], full: "/assets/portfolio/travel.png", url: "#" },
    { cat: "web", img: "/assets/portfolio/nolima.png", title: "Landing — Brand Nolima", desc: "Brand landing untuk awareness & konversi social traffic.", tags: ["Next.js","Tailwind"], full: "/assets/portfolio/nolima.png", url: "#" },
    { cat: "iot", img: "/assets/portfolio/greenguard.png", title: "GreenGuard — Monitoring Pohon (IoT + AI)", desc: "Deteksi potensi tumbang, laporan warga, integrasi sensor & model AI.", tags: ["IoT","Edge AI","Laravel","MQTT"], full: "/assets/portfolio/greenguard.png", url: "#" },
    { cat: "mobile", img: "/assets/portfolio/krmoney.jpg", title: "KR_Money — Catatan Keuangan", desc: "Aplikasi mobile pencatatan pengeluaran/anggaran, grafik & reminder.", tags: ["React Native","SQLite","Redux"], full: "/assets/portfolio/krmoney.jpg", url: "#" },
    { cat: "game", img: "/assets/portfolio/game.png", title: "MindMasters — Quiz Game", desc: "Game kuis budaya & lingkungan, leaderboard & streak harian.", tags: ["React","Node.js","WebSocket"], full: "/assets/portfolio/game.png", url: "#" },
    { cat: "mobile", img: "/assets/portfolio/sisfo-akun-sus.png", title: "SISFO Akuntansi Keberlanjutan", desc: "Aplikasi mobile pencatatan & pelaporan keberlanjutan.", tags: ["React Native","REST API","Secure Storage"], full: "/assets/portfolio/sisfo-akun-sus.png", url: "#" },
    { cat: "web", img: "/assets/portfolio/lqs_question.png", title: "LQS_Question — Q&A Platform", desc: "Website Q&A internal: thread, voting, tagging, dan search.", tags: ["Laravel","MySQL","Redis"], full: "/assets/portfolio/lqs_question.png", url: "#" },
    { cat: "web", img: "/assets/portfolio/belajar-catatan.png", title: "Landing — Belajar Catatan Kader", desc: "Landing edukasi untuk materi catatan kader.", tags: ["Next.js","Tailwind"], full: "/assets/portfolio/belajar-catatan.png", url: "#" },
    { cat: "web", img: "/assets/portfolio/birthday.png", title: "Landing — Birthday", desc: "Landing page ulang tahun interaktif dan animasi ringan.", tags: ["Next.js","Framer Motion"], full: "/assets/portfolio/birthday.png", url: "#" },
    { cat: "web", img: "/assets/portfolio/chat-realtime.png", title: "Chat Real-Time", desc: "Chatting real-time multi-room dengan presence & typing indicator.", tags: ["Node.js","Socket.IO","Redis"], full: "/assets/portfolio/chat-realtime.png", url: "#" },
    { cat: "web", img: "/assets/portfolio/newlearning-era.png", title: "NewLearning Era — Kursus Online", desc: "Platform kursus & learning path, pembayaran, sertifikat.", tags: ["Laravel","Vue","Midtrans"], full: "/assets/portfolio/newlearning-era.png", url: "#" },
    { cat: "web", img: "/assets/portfolio/journal-smk1.png", title: "Journal — SMKN 1 Kraksaan", desc: "Sistem jurnal digital: submission, review, dan publikasi.", tags: ["Laravel","Blade","MySQL"], full: "/assets/portfolio/journal-smk1.png", url: "#" },
    { cat: "iot", img: "/assets/portfolio/smart-pump.png", title: "IoT Smart Pump + Mobile", desc: "Kontrol & monitoring pompa via sensor, dashboard, dan app mobile.", tags: ["IoT","MQTT","React Native","Laravel"], full: "/assets/portfolio/smart-pump.png", url: "#" },
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

  // Animasi reveal buat kartu setiap kali halaman/filter berubah
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>("#portfolio .portfolio-card");
    cards.forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(26px) scale(.985)";
      el.style.filter = "blur(6px)";
      el.style.willChange = "opacity, transform, filter";
      el.dataset.delay = String((i % 6) * 70);
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          const delay = Number(el.dataset.delay || 0);
          if ((el as any).animate) {
            (el as any).animate(
              [
                { opacity: 0, transform: "translateY(26px) scale(.985)", filter: "blur(6px)" },
                { opacity: 1, transform: "translateY(0) scale(1)", filter: "blur(0)" },
              ],
              { duration: 680, delay, easing: "cubic-bezier(.22,1,.36,1)", fill: "forwards" }
            );
          } else {
            el.style.transition = "opacity .68s ease, transform .68s ease, filter .68s ease";
            setTimeout(() => {
              el.style.opacity = "1";
              el.style.transform = "translateY(0) scale(1)";
              el.style.filter = "blur(0)";
            }, delay);
          }
          io.unobserve(el);
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -10% 0px" }
    );

    cards.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [filter, clampedPage]);

  // helper render nomor halaman (simple, total halaman <= 10 biasanya)
  const renderPages = () => {
    const btn = (p: number) => (
      <button
        key={`p-${p}`}
        onClick={() => setPage(p)}
        className={`min-w-9 h-9 px-3 rounded-lg text-sm font-medium ${
          p === clampedPage
            ? "bg-gray-900 text-white"
            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
        }`}
        aria-current={p === clampedPage ? "page" : undefined}
      >
        {p}
      </button>
    );

    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => btn(i + 1));
    }

    // ellipsis style
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
      className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 py-12"
    >
      {/* soft blobs */}
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <div className="absolute -top-24 left-0 w-72 h-72 rounded-full bg-gradient-to-br from-blue-200 to-purple-200 blur-3xl" />
        <div className="absolute -bottom-28 right-0 w-96 h-96 rounded-full bg-gradient-to-tr from-cyan-200 to-indigo-200 blur-3xl" />
      </div>

      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="max-w-3xl mx-auto text-center mb-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 ring-1 ring-blue-100">
            <span className="size-2 rounded-full bg-blue-500 animate-pulse" /> Portfolio
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">
            Featured Projects
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Dari platform web & mobile hingga solusi IoT dan game interaktif.
          </p>
        </header>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {filters.map((f, i) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                filter === f
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
              data-delay={String(i * 45)}
            >
              {f === "all" ? "All" : f[0].toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Info jumlah */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6 text-sm text-gray-600">
          <div>
            Showing <span className="font-medium text-gray-900">{filtered.length ? startIdx + 1 : 0}</span>
            –<span className="font-medium text-gray-900">{endIdx}</span> of{" "}
            <span className="font-medium text-gray-900">{filtered.length}</span> projects
          </div>
          <div>
            Page <span className="font-medium text-gray-900">{clampedPage}</span> /{" "}
            <span className="font-medium text-gray-900">{totalPages}</span>
          </div>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {pageItems.map((it, idx) => (
            <article
              key={`${it.title}-${idx}`}
              className="portfolio-card group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-xl shadow-lg border border-gray-100 hover:-translate-y-2 hover:shadow-2xl transition"
            >
              {/* Image + overlay */}
              <div className="relative">
                <img src={it.img} alt={it.title} className="w-full h-56 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition" />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-white/80 text-gray-800 ring-1 ring-white/60 uppercase">
                    {it.cat}
                  </span>
                </div>
                <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                  <button
                    onClick={() => {
                      setModalSrc(it.full);
                      setModalTitle(it.title);
                    }}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/90 text-gray-800 text-xs font-medium hover:bg-white"
                    title="Preview"
                  >
                    <i className="fa-solid fa-magnifying-glass" /> Preview
                  </button>
                  <a
                    href="#"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-medium hover:bg-blue-700"
                    title="Visit Site"
                  >
                    <i className="fa-solid fa-arrow-up-right-from-square" /> Visit
                  </a>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{it.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{it.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {it.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded text-[11px] bg-gray-100 text-gray-700 ring-1 ring-gray-200"
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
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={clampedPage === 1}
            className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${
              clampedPage === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-800 ring-1 ring-gray-200 hover:bg-gray-50"
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
            className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${
              clampedPage === totalPages
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-800 ring-1 ring-gray-200 hover:bg-gray-50"
            }`}
          >
            Next <i className="fa-solid fa-chevron-right" />
          </button>
        </div>
      </section>

      {/* Modal Preview */}
      {modalSrc && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm grid place-items-center p-4"
          onClick={() => setModalSrc(null)}
        >
          <div
            className="relative bg-white/95 backdrop-blur-xl rounded-2xl p-4 w-[92%] max-w-4xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalSrc(null)}
              className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-xl"
              aria-label="Close"
              title="Close"
            >
              <i className="fa-solid fa-xmark" />
            </button>
            <div className="mb-3">
              <h4 className="text-base font-semibold text-gray-900">{modalTitle}</h4>
            </div>
            <img
              src={modalSrc}
              alt="Project Preview"
              className="rounded-xl w-full max-h-[72vh] object-contain shadow-md"
            />
          </div>
        </div>
      )}
    </div>
  );
}
