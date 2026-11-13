"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import BackToTop from "../components/BackToTop";
import SpotlightCard from "../components/bits/SpotlightCard";
import TiltedCard from "../components/bits/TiltedCard";
import DecryptedText from "../components/bits/DecryptedText";
import ClientPortal from "../components/ClientPortal";

type Year = 2023 | 2024 | 2025 | 2026;
type Kind = "image" | "pdf";

type CertItem = {
  key: string;
  year: Year;
  title: string;
  file: string;
  kind: Kind;
  desc: string;
  tags?: string[];
};

const enc = (p: string) => encodeURI(p);
const pdfThumbParams = "#toolbar=0&navpanes=0&scrollbar=0&page=1&zoom=page-width";
const pdfModalParams = "#toolbar=1&navpanes=0&scrollbar=1&zoom=page-fit";

const CERT_ITEMS: CertItem[] = [
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

  // 2025
  {
    key: "huawei-dev-apac-2025",
    year: 2025,
    title: "Huawei APAC Developer 2025",
    file: "/assets/sertifikat/2025/SERTIFIKAT HUAWEI APAC DEVELOPER 2025.pdf",
    kind: "pdf",
    desc: "Program pengembang tingkat regional Asia-Pasifik yang berfokus pada ekosistem teknologi.",
    tags: ["Huawei", "APAC"],
  },
  {
    key: "huawei-ai-class-2025",
    year: 2025,
    title: "Huawei AI Certification Class",
    file: "/assets/sertifikat/2025/huawei class.png",
    kind: "image",
    desc: "Pelatihan intensif mengenai implementasi Artificial Intelligence dan fundamental AI dari Huawei.",
    tags: ["AI", "Huawei"],
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
    title: "Indevpro — Apresiasi",
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
];

export default function Certificates() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<CertItem | null>(null);
  const [yearFilter, setYearFilter] = useState<Year | "all">("all");
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 12;

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

  const filtered = useMemo(() => {
    const byYear =
      yearFilter === "all"
        ? CERT_ITEMS
        : CERT_ITEMS.filter((i) => i.year === yearFilter);
    const query = q.trim().toLowerCase();
    if (!query) return byYear;
    return byYear.filter(
      (i) =>
        i.title.toLowerCase().includes(query) ||
        i.desc.toLowerCase().includes(query) ||
        i.tags?.some((t) => t.toLowerCase().includes(query))
    );
  }, [yearFilter, q]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  useEffect(() => setPage(1), [yearFilter, q]);

  const clampedPage = Math.min(page, totalPages);
  const startIdx = (clampedPage - 1) * pageSize;
  const endIdx = Math.min(startIdx + pageSize, filtered.length);
  const pageItems = filtered.slice(startIdx, endIdx);

  return (
    <div id="cert-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pb-8">
      <header className="space-y-3 border-b border-slate-200/80 dark:border-white/[0.08] pb-6">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[11px] font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-semibold">
          Credentials Archive
        </span>
        <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
          <DecryptedText text="Certificates & Awards" speed={26} />
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 max-w-2xl">
          Koleksi sertifikat dan penghargaan (2023—2026) mulai dari kompetisi UI/UX, Huawei APAC Developer, hingga proyek IoT &amp; Web.
        </p>
      </header>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {(["all", 2026, 2025, 2024, 2023] as const).map((y) => (
            <button
              key={String(y)}
              onClick={() => setYearFilter(y)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                yearFilter === y
                  ? "bg-slate-900 dark:bg-white text-white dark:text-zinc-950"
                  : "bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {y === "all" ? "Semua" : y}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <i className="fa-solid fa-magnifying-glass absolute left-3 top-2.5 text-slate-400 text-xs" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Cari judul, deskripsi, tag..."
            className="pl-9 pr-4 py-2 w-full rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 focus:border-indigo-500 outline-none text-xs text-slate-900 dark:text-zinc-100"
          />
        </div>
      </div>

      {/* Count */}
      <div className="text-xs font-mono text-slate-500 dark:text-zinc-400">
        Showing {filtered.length ? startIdx + 1 : 0}–{endIdx} of {filtered.length} certificates
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 items-stretch">
        {pageItems.map((it) => (
          <TiltedCard key={it.key} maxTilt={7} className="h-full">
            <SpotlightCard className="overflow-hidden cursor-pointer h-full group">
              <div onClick={() => openModal(it)} className="h-full flex flex-col justify-between">
                <div>
                  <div className="relative aspect-[16/11] bg-slate-100 dark:bg-zinc-950 overflow-hidden">
                    {it.kind === "image" ? (
                      <img
                        src={enc(it.file)}
                        alt={it.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full relative">
                        <iframe
                          src={`${enc(it.file)}${pdfThumbParams}`}
                          title={it.title}
                          className="w-full h-full pointer-events-none"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      </div>
                    )}
                    <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-zinc-950/80 text-white text-[10px] font-mono">
                      {it.year} · {it.kind.toUpperCase()}
                    </span>
                  </div>

                  <div className="p-4 space-y-1.5">
                    <h2 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2">
                      {it.title}
                    </h2>
                    <p className="text-xs text-slate-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                      {it.desc}
                    </p>
                  </div>
                </div>

                {it.tags && (
                  <div className="px-4 pb-4 flex flex-wrap gap-1">
                    {it.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-zinc-950/60 border border-slate-200 dark:border-white/10 text-[10px] font-mono text-slate-600 dark:text-zinc-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
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

      {/* Modal */}
      {open && active && (
        <ClientPortal>
          <div
            className="fixed inset-0 z-[100] w-screen h-screen bg-black/80 backdrop-blur-xl grid place-items-center p-4 backdrop-fade"
            onClick={closeModal}
          >
            <div
              className="w-full max-w-4xl bento-card p-5 space-y-4 modal-pop bg-white dark:bg-zinc-900 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                    {active.title}
                  </h3>
                  <p className="text-xs font-mono text-indigo-600 dark:text-indigo-400">
                    {active.year} · {active.kind.toUpperCase()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={enc(active.file)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
                  >
                    Open File
                  </a>
                  <button
                    onClick={closeModal}
                    aria-label="Close modal"
                    className="w-8 h-8 rounded-lg border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white"
                  >
                    <i className="fa-solid fa-xmark" />
                  </button>
                </div>
              </div>

              {active.kind === "image" ? (
                <img
                  src={enc(active.file)}
                  alt={active.title}
                  className="w-full max-h-[65vh] object-contain rounded-xl bg-slate-100 dark:bg-zinc-950"
                />
              ) : (
                <iframe
                  src={`${enc(active.file)}${pdfModalParams}`}
                  title={active.title}
                  className="w-full h-[65vh] rounded-xl border border-slate-200 dark:border-white/10"
                />
              )}

              <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300">
                {active.desc}
              </p>
            </div>
          </div>
        </ClientPortal>
      )}

      <BackToTop />
    </div>
  );
}
