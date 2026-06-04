"use client";

import { useEffect, useMemo, useState, useCallback } from "react";

type Year = 2023 | 2024 | 2025 | 2026;
type Kind = "image" | "pdf";

type CertItem = {
  key: string;
  year: Year;
  title: string;
  file: string; // path relatif di /public
  kind: Kind; // image | pdf
  desc: string; // deskripsi singkat yang muncul di kartu & modal
  tags?: string[];
};

const enc = (p: string) => encodeURI(p);
const pdfThumbParams =
  "#toolbar=0&navpanes=0&scrollbar=0&page=1&zoom=page-width";
const pdfModalParams = "#toolbar=1&navpanes=0&scrollbar=1&zoom=page-fit";

export default function Certificates() {
  // ====== MODAL ======
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<CertItem | null>(null);
  
  const openModal = useCallback((it: CertItem) => {
    setActive(it);
    setOpen(true);
    document.documentElement.style.overflow = "hidden";
  }, []);
  
  const closeModal = useCallback(() => {
    setOpen(false);
    setActive(null);
    document.documentElement.style.overflow = "";
  }, []);
  
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeModal();
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeModal]);

  // ====== DATA ======
  const items: CertItem[] = [
    // 2023
    {
      key: "lks-2023",
      year: 2023,
      title: "LKS Kabupaten — IT Software",
      file: "/assets/sertifikat/2023/Sertifikat LKS.pdf",
      kind: "pdf",
      desc: "Partisipasi & penghargaan ajang LKS tingkat kabupaten bidang IT Software.",
      tags: ["LKS", "IT Software"],
    },

    // 2024
    {
      key: "cp-humma-2024",
      year: 2024,
      title: "Company Profile HummaTech",
      file: "/assets/sertifikat/2024/company profile hummatech.jpg",
      kind: "image",
      desc: "Penyusunan materi dan implementasi halaman profil perusahaan HummaTech.",
    },
    {
      key: "hummatask-2024",
      year: 2024,
      title: "HummaTask — Product Certificate",
      file: "/assets/sertifikat/2024/hummatask.jpg",
      kind: "image",
      desc: "Pengembangan tugas & pelacakan progres internal berbasis web.",
    },
    {
      key: "sertifikat-a-2024",
      year: 2024,
      title: "Penghargaan Proyek A (2024)",
      file: "/assets/sertifikat/2024/IMG-20240908-WA0001.jpg",
      kind: "image",
      desc: "Apresiasi atas kontribusi penyelesaian proyek A tepat waktu.",
    },
    {
      key: "sertifikat-b-2024",
      year: 2024,
      title: "Penghargaan Proyek B (2024)",
      file: "/assets/sertifikat/2024/IMG-20240908-WA0002.jpg",
      kind: "image",
      desc: "Penghargaan kolaborasi lintas tim untuk proyek B.",
    },
    {
      key: "sertifikat-c-2024",
      year: 2024,
      title: "Penghargaan Proyek C (2024)",
      file: "/assets/sertifikat/2024/IMG-20240908-WA0003.jpg",
      kind: "image",
      desc: "Kontribusi modul kunci dan optimasi kinerja aplikasi.",
    },
    {
      key: "sertifikat-d-2024",
      year: 2024,
      title: "Penghargaan Proyek D (2024)",
      file: "/assets/sertifikat/2024/IMG-20240908-WA0004.jpg",
      kind: "image",
      desc: "Kualitas rilis dan proses QA yang konsisten untuk proyek D.",
    },
    {
      key: "jokotole-2024",
      year: 2024,
      title: "Program Inovasi Jokotole",
      file: "/assets/sertifikat/2024/jokotole.jpg",
      kind: "image",
      desc: "Inovasi digital untuk efisiensi proses bisnis skala daerah.",
    },
    {
      key: "metaverse-2024",
      year: 2024,
      title: "Seminar Metaverse & XR",
      file: "/assets/sertifikat/2024/metaverse.jpg",
      kind: "image",
      desc: "Eksplorasi tren metaverse, XR, dan dampaknya pada produk digital.",
    },
    {
      key: "mischool-2024",
      year: 2024,
      title: "Mischool — E-Learning",
      file: "/assets/sertifikat/2024/mischool.jpg",
      kind: "image",
      desc: "Implementasi modul kelas, kuis, serta evaluasi pembelajaran.",
    },
    {
      key: "pkl-humma-2024",
      year: 2024,
      title: "PKL HummaTech",
      file: "/assets/sertifikat/2024/pkl humma.jpg",
      kind: "image",
      desc: "Monitoring PKL dengan integrasi Face Recognition & geofencing.",
    },
    {
      key: "pkl-2024",
      year: 2024,
      title: "PKL — Pengalaman Industri",
      file: "/assets/sertifikat/2024/pkl.jpg",
      kind: "image",
      desc: "Praktik industri: pengembangan fitur & dokumentasi teknis.",
    },
    {
      key: "pn-2024",
      year: 2024,
      title: "Pelatihan PN",
      file: "/assets/sertifikat/2024/pn.jpg",
      kind: "image",
      desc: "Pelatihan proses & standar internal untuk project delivery.",
    },
    {
      key: "programmer-2024",
      year: 2024,
      title: "Programmer — HummaTech",
      file: "/assets/sertifikat/2024/programmer.jpg",
      kind: "image",
      desc: "Junior Developer fokus Laravel: CRUD, REST API, autentikasi, kolaborasi tim.",
      tags: ["Laravel", "MySQL"],
    },
    {
      key: "dicoding-c-2024",
      year: 2024,
      title: "Dicoding — Pemrograman C",
      file: "/assets/sertifikat/2024/sertifikat dicoding kelas pemrograman C.pdf",
      kind: "pdf",
      desc: "Kompetensi dasar C: tipe data, kontrol alur, pointer, modularisasi.",
    },
    {
      key: "dicoding-java-2024",
      year: 2024,
      title: "Dicoding — Pemrograman Java",
      file: "/assets/sertifikat/2024/sertifikat dicoding kelas pemrograman java.pdf",
      kind: "pdf",
      desc: "Dasar OOP, koleksi, exception, dan pemrograman berorientasi objek di Java.",
    },
    {
      key: "unmer-2024",
      year: 2024,
      title: "Universitas Merdeka Malang",
      file: "/assets/sertifikat/2024/SERTIFIKAT UNIVERSITAS MERDEKA MALANG-Abdul kader.pdf",
      kind: "pdf",
      desc: "Pengakuan partisipasi/kelulusan kegiatan akademik Unmer Malang.",
    },
    {
      key: "sipjaki-2024",
      year: 2024,
      title: "SIPJAKI Pasuruan",
      file: "/assets/sertifikat/2024/sipjaki pasuruan.jpg",
      kind: "image",
      desc: "Sistem informasi jasa konstruksi: perizinan & daftar penyedia.",
    },

    // 2025
    {
      key: "huawei-dev-apac-2025",
      year: 2025,
      title: "Huawei APAC Developer 2025",
      file: "/assets/sertifikat/2025/SERTIFIKAT HUAWEI APAC DEVELOPER 2025.pdf",
      kind: "pdf",
      desc: "Program pengembang tingkat regional Asia-Pasifik yang berfokus pada ekosistem teknologi.",
    },
    {
      key: "huawei-ai-class-2025",
      year: 2025,
      title: "Huawei AI Certification Class",
      file: "/assets/sertifikat/2025/huawei class.png",
      kind: "image",
      desc: "Pelatihan intensif mengenai implementasi Artificial Intelligence dan fundamental AI dari Huawei.",
    },
    {
      key: "comp-webdev-2025",
      year: 2025,
      title: "Competition Web Development",
      file: "/assets/sertifikat/2025/competition web devlopment.png",
      kind: "image",
      desc: "Kompetisi pengembangan web dengan penekanan performa & UX.",
    },
    {
      key: "go-develop-2025",
      year: 2025,
      title: "Go_Develop — Penghargaan",
      file: "/assets/sertifikat/2025/Go_Develop - Abdul Kader.png",
      kind: "image",
      desc: "Penghargaan kontribusi pada komunitas/produk Go_Develop.",
    },
    {
      key: "hrd-2025",
      year: 2025,
      title: "Sertifikat HRD",
      file: "/assets/sertifikat/2025/HRD.pdf",
      kind: "pdf",
      desc: "Pengetahuan pipeline rekrutmen, rubric teknis, dan onboarding.",
    },
    {
      key: "indevpro-2025",
      year: 2025,
      title: "Indevro — Apresiasi",
      file: "/assets/sertifikat/2025/indevpro.png",
      kind: "image",
      desc: "Apresiasi atas kolaborasi proyek dan delivery di Indevpro.",
    },
    {
      key: "senior-2025",
      year: 2025,
      title: "Senior Developer — Full-Stack",
      file: "/assets/sertifikat/2025/Senior Developer.pdf",
      kind: "pdf",
      desc: "End-to-end dev, standardisasi CI/CD, code review lintas tim.",
      tags: ["Full-Stack"],
    },
    {
      key: "ai-2025",
      year: 2025,
      title: "Artificial Intelligence — Pelatihan",
      file: "/assets/sertifikat/2025/Sertifikat Artifical intelegency.pdf",
      kind: "pdf",
      desc: "Dasar AI/ML: supervised, evaluasi model, dan use-case praktis.",
    },
    {
      key: "komsen-2025",
      year: 2025,
      title: "Diklat KOMSEN",
      file: "/assets/sertifikat/2025/sertifikat diklat KOMSEN.png",
      kind: "image",
      desc: "Pengembangan kompetensi komunikasi organisasi & manajemen.",
    },
    {
      key: "haskell-2025",
      year: 2025,
      title: "Pemrograman Haskell",
      file: "/assets/sertifikat/2025/Sertifikat pemrograman Haskell.pdf",
      kind: "pdf",
      desc: "Paradigma fungsional: tipe, pure function, dan komposisi.",
    },
    {
      key: "smart-pump-2025",
      year: 2025,
      title: "Smart Pump System (IoT)",
      file: "/assets/sertifikat/2025/Smart Pump System.pdf",
      kind: "pdf",
      desc: "Kontrol & monitoring pompa via sensor, dashboard & integrasi app.",
    },
    {
      key: "webinar-bridging-2025",
      year: 2025,
      title: "Webinar — Kreativitas & Strategi",
      file: "/assets/sertifikat/2025/Webinar Bridging Creativity and Strategy The Role of Social Media Management in Content Creation.pdf",
      kind: "pdf",
      desc: "Strategi konten & peran social media management dalam produksi.",
    },
    {
      key: "ethical-2025",
      year: 2025,
      title: "Webinar — Ethical Pathway",
      file: "/assets/sertifikat/2025/webinar ethichal pathway.jpg",
      kind: "image",
      desc: "Etika profesional & best practice dalam dunia kerja digital.",
    },
    {
      key: "genz-2025",
      year: 2025,
      title: "Webinar — Komunikasi & Budaya Gen Z",
      file: "/assets/sertifikat/2025/Webinar evolusi Komunikasi dan Budaya Digital dalam Generasi Z.pdf",
      kind: "pdf",
      desc: "Evolusi komunikasi & budaya digital serta implikasinya.",
    },
    {
      key: "hamd-2025",
      year: 2025,
      title: "Webinar — HAMD",
      file: "/assets/sertifikat/2025/webinar hamd.jpg",
      kind: "image",
      desc: "Sesi webinar tematik untuk pengayaan literasi digital.",
    },
    {
      key: "lifestyle-2025",
      year: 2025,
      title: "Webinar — Lifestyle Digital",
      file: "/assets/sertifikat/2025/Webinar lifestyle digital.png",
      kind: "image",
      desc: "Dampak gaya hidup digital pada produktivitas & kesehatan.",
    },

    // 2026
    {
      key: "juara-1-3cc-uiux-2026",
      year: 2026,
      title: "Juara 1 Lomba 3CC UI/UX Competition",
      file: "/assets/sertifikat/2026/Juara 1 Lomva 3CC UI UX.PNG",
      kind: "image",
      desc: "Juara 1 dalam kompetisi UI/UX Design di ajang Creative Computer Club (3CC), merancang solusi antarmuka pengguna yang inovatif, intuitif, dan fungsional.",
      tags: ["UI/UX", "Competition", "Juara 1"],
    },
    {
      key: "web-design-competition-2026",
      year: 2026,
      title: "Lomba Web Design Competition",
      file: "/assets/sertifikat/2026/Lomba Web Design Competition.jpg",
      kind: "image",
      desc: "Penghargaan partisipasi dan pencapaian dalam kompetisi desain web, merancang halaman web interaktif yang estetis dengan performa optimal.",
      tags: ["Web Design", "Competition"],
    },
    {
      key: "webinar-literasi-digital-2026",
      year: 2026,
      title: "Webinar Literasi Digital",
      file: "/assets/sertifikat/2026/WEBINAR LITERACY DIGITAL.png",
      kind: "image",
      desc: "Pemahaman mendalam mengenai etika, keamanan, dan kecakapan dalam menggunakan platform digital.",
      tags: ["Literasi Digital", "Edukasi"],
    },
    {
      key: "informasi-era-40-2026",
      year: 2026,
      title: "Kunci Menghadapi Informasi di Era 4.0",
      file: "/assets/sertifikat/2026/kunci menghadapi informasi di era 4.0.png",
      kind: "image",
      desc: "Strategi mengelola arus informasi besar (Big Data) dan memverifikasi data di era Revolusi Industri 4.0.",
      tags: ["Big Data", "Informasi", "Industri 4.0"],
    },
    {
      key: "pengaruh-media-digital-2026",
      year: 2026,
      title: "Webinar Pengaruh Media Digital",
      file: "/assets/sertifikat/2026/WEBINAR PENGARUH MEDIA DIGITAL.png",
      kind: "image",
      desc: "Analisis dampak media digital terhadap perilaku sosial dan perkembangan teknologi informasi.",
      tags: ["Social Media", "Digital Impact"],
    },
  ];

  // ====== FILTER + SEARCH + PAGINATION ======
  const [yearFilter, setYearFilter] = useState<Year | "all">("all");
  const [q, setQ] = useState("");
  const pageSize = 12;

  const filtered = useMemo(() => {
    const byYear =
      yearFilter === "all" ? items : items.filter((i) => i.year === yearFilter);
    const query = q.trim().toLowerCase();
    if (!query) return byYear;
    return byYear.filter(
      (i) =>
        i.title.toLowerCase().includes(query) ||
        i.desc.toLowerCase().includes(query) ||
        i.tags?.some((t) => t.toLowerCase().includes(query))
    );
  }, [items, yearFilter, q]);

  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  
  useEffect(() => setPage(1), [yearFilter, q]);

  const clampedPage = Math.min(page, totalPages);
  const startIdx = (clampedPage - 1) * pageSize;
  const endIdx = Math.min(startIdx + pageSize, filtered.length);
  const pageItems = filtered.slice(startIdx, endIdx);

  const renderPages = () => {
    const Btn = (p: number) => (
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

    if (totalPages <= 7)
      return Array.from({ length: totalPages }, (_, i) => Btn(i + 1));

    const nodes: React.ReactNode[] = [];
    nodes.push(Btn(1));
    if (clampedPage > 3)
      nodes.push(
        <span key="e1" className="px-1 text-gray-500">
          …
        </span>
      );
    const s = Math.max(2, clampedPage - 1);
    const t = Math.min(totalPages - 1, clampedPage + 1);
    for (let p = s; p <= t; p++) nodes.push(Btn(p));
    if (clampedPage < totalPages - 2)
      nodes.push(
        <span key="e2" className="px-1 text-gray-500">
          …
        </span>
      );
    nodes.push(Btn(totalPages));
    return nodes;
  };

  return (
    <div
      id="cert-page"
      className="page relative overflow-hidden py-10"
    >
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <header className="text-center max-w-3xl mx-auto mb-10" data-reveal>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 ring-1 ring-blue-100">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />{" "}
            Sertifikat
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
            Certificates & Achievements
          </h1>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            Koleksi sertifikat dan penghargaan yang mencerminkan perjalanan
            profesional saya— mulai dari pengembangan web hingga teknologi AI
            dan IoT, semuanya dapat dilihat langsung dalam tampilan interaktif.
          </p>
        </header>

        {/* Controls */}
        <div
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8"
          data-reveal
          data-reveal-delay="50ms"
        >
          <div className="flex flex-wrap gap-2.5">
            {([ "all", 2026, 2025, 2024, 2023] as const).map((y) => (
              <button
                key={String(y)}
                onClick={() => setYearFilter(y)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  yearFilter === y
                    ? "bg-slate-950 text-white shadow-md scale-105"
                    : "bg-white/60 hover:bg-white text-slate-700 border border-slate-200/80 shadow-sm"
                }`}
              >
                {y === "all" ? "Semua" : y}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-72">
            <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-3 text-slate-400 text-sm" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Cari judul / deskripsi / tag…"
              className="pl-10 pr-4 py-2.5 w-full rounded-xl bg-white/60 focus:bg-white border border-slate-200/85 focus:ring-2 focus:ring-blue-500 outline-none text-sm shadow-sm transition-all"
            />
          </div>
        </div>

        {/* Info jumlah */}
        <div
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6 text-sm text-slate-500 font-medium"
          data-reveal
          data-reveal-delay="100ms"
        >
          <div>
            Menampilkan{" "}
            <span className="font-bold text-slate-900">
              {filtered.length ? startIdx + 1 : 0}–{endIdx}
            </span>{" "}
            dari{" "}
            <span className="font-bold text-slate-900">{filtered.length}</span>{" "}
            sertifikat
          </div>
          <div>
            Halaman{" "}
            <span className="font-bold text-slate-900">{clampedPage}</span> /{" "}
            <span className="font-bold text-slate-900">{totalPages}</span>
          </div>
        </div>

        {/* Grid */}
        <div className="grid xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {pageItems.map((c, idx) => {
            const src = enc(c.file);
            return (
              <article
                key={c.key}
                data-reveal
                data-reveal-delay={`${(idx % 12) * 40}ms`}
                className="group rounded-2xl glass-card glass-card-hover border border-white/60 p-4 shadow-sm hover:shadow-md glow-blue"
              >
                {/* THUMB */}
                <div className="relative rounded-xl overflow-hidden ring-1 ring-slate-100 bg-slate-50 aspect-[4/3]">
                  {c.kind === "image" ? (
                    <img
                      src={src}
                      alt={c.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <object
                      data={src + pdfThumbParams}
                      type="application/pdf"
                      className="w-full h-full bg-white pointer-events-none"
                    >
                      <iframe
                        src={src + pdfThumbParams}
                        className="w-full h-full"
                      />
                      <div className="w-full h-full grid place-items-center bg-rose-50 text-rose-600">
                        <i className="fa-regular fa-file-pdf text-2xl" />
                        <span className="text-xs mt-1">Open PDF</span>
                      </div>
                    </object>
                  )}

                  {/* badges */}
                  <div className="absolute top-2 left-2 flex gap-1.5 z-10">
                    <span className="px-2 py-0.5 rounded-lg text-[9px] font-bold bg-white/95 text-slate-800 shadow-sm border border-slate-100 uppercase">
                      {c.kind}
                    </span>
                    <span className="px-2 py-0.5 rounded-lg text-[9px] font-bold bg-white/95 text-slate-800 shadow-sm border border-slate-100">
                      {c.year}
                    </span>
                  </div>

                  {/* hover actions */}
                  <div className="absolute bottom-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition z-10 duration-300">
                    <button
                      type="button"
                      onClick={() => openModal(c)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/95 text-slate-800 text-xs font-semibold hover:bg-white active:scale-95 shadow-sm"
                    >
                      <i className="fa-solid fa-eye text-xs" /> Preview
                    </button>
                  </div>
                </div>

                {/* TEXT */}
                <div className="mt-4">
                  <h4 className="font-bold text-slate-900 text-sm leading-snug line-clamp-2">
                    {c.title}
                  </h4>
                  <p className="mt-1.5 text-xs text-slate-500 leading-relaxed line-clamp-2">
                    {c.desc}
                  </p>
                  {c.tags?.length ? (
                    <div className="mt-3 flex flex-wrap gap-1.5 pt-3 border-t border-slate-100/60">
                      {c.tags.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded-lg text-[9px] bg-slate-50 text-slate-500 font-semibold ring-1 ring-slate-200/80"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>

        {/* Pagination */}
        {filtered.length > pageSize && (
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
        )}
      </section>

      {/* ===== MODAL PREVIEW ===== */}
      {open && active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cert-title"
          className="fixed inset-0 z-[100] flex items-center justify-center px-4 backdrop-fade"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          {/* backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          <div className="relative z-10 w-full max-w-4xl modal-pop">
            <div className="p-[2px] rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 shadow-2xl">
              <div className="rounded-3xl bg-white">
                {/* header */}
                <div className="flex items-start gap-4 p-5 border-b border-slate-100">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 grid place-items-center shadow-sm shrink-0">
                    <i className="fa-solid fa-award text-blue-600 text-xl" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3
                      id="cert-title"
                      className="text-base font-bold text-slate-900 leading-snug truncate"
                    >
                      {active.title}
                    </h3>
                    <p className="text-xs text-slate-400 font-semibold mt-0.5">{active.year}</p>
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

                {/* body */}
                <div className="p-5 grid md:grid-cols-2 gap-5">
                  <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 flex items-center justify-center">
                    {active.kind === "image" ? (
                      <img
                        src={enc(active.file)}
                        alt={active.title}
                        className="w-full max-h-[58vh] object-contain shadow-inner"
                        loading="lazy"
                      />
                    ) : (
                      <object
                        data={enc(active.file) + pdfModalParams}
                        type="application/pdf"
                        className="w-full h-[58vh] bg-white"
                      >
                        <iframe
                          src={enc(active.file) + pdfModalParams}
                          className="w-full h-[58vh]"
                        />
                      </object>
                    )}
                  </div>

                  <div className="flex flex-col justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">
                        Deskripsi Sertifikat
                      </h4>
                      <p className="mt-2.5 text-sm text-slate-650 leading-relaxed">{active.desc}</p>

                      {active.tags?.length ? (
                        <>
                          <h5 className="mt-6 text-xs font-bold text-slate-400 uppercase tracking-wider">
                            Tags / Bidang
                          </h5>
                          <div className="mt-2.5 flex flex-wrap gap-2">
                            {active.tags.map((s) => (
                              <span
                                key={s}
                                className="px-3 py-1 rounded-xl text-xs bg-slate-100 text-slate-600 border border-slate-200/50 font-semibold shadow-sm"
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                        </>
                      ) : null}
                    </div>

                    <div className="mt-8 pt-4 border-t border-slate-100/50 flex justify-end">
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
                    * Untuk PDF, Anda dapat menggunakan kontrol bawaan browser untuk zoom atau print. Tekan <span className="font-bold">Esc</span> untuk menutup.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
