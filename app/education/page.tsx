"use client";

import { useEffect, useState, useCallback } from "react";

type Certificate = {
  key: string;
  title: string;
  org: string;
  subtitle?: string;
  description?: string;
  skills?: string[];
  image: string; // path ke gambar sertifikat
};

export default function Education() {
  // ====== STATE MODAL SERTIFIKAT ======
  const [open, setOpen] = useState(false);
  const [activeCert, setActiveCert] = useState<Certificate | null>(null);

  const certificates: Certificate[] = [
    {
      key: "humma",
      title: "Programmer",
      org: "PT Humma Teknologi Indonesia",
      subtitle: "Sertifikat kompetensi pemrograman (internal)",
      description:
        "Pengembangan aplikasi web serta mentoring praktik engineering dasar di lingkungan tim.",
      skills: ["Laravel", "MySQL", "Git"],
      image: "/assets/cert/programmer.jpg",
    },
    {
      key: "lks",
      title: "LKS Kabupaten Probolinggo — Juara 3",
      org: "Bidang IT Software Solutions for Business",
      subtitle: "Kompetisi resmi tingkat kabupaten",
      description:
        "Perancangan solusi perangkat lunak end-to-end: analisis kebutuhan, desain model data, hingga implementasi prototipe.",
      skills: ["UML", "ERD", "Web Dev"],
      image: "/assets/cert/lks.png",
    },
    {
      key: "kodingin",
      title: "Senior Developer",
      org: "PT Kodingin Digital Nusantara",
      subtitle: "Pengakuan/sertifikasi internal",
      description:
        "Kontribusi pada fitur inti produk, optimasi performa, serta standarisasi proses rilis (CI/CD).",
      skills: ["Laravel 10", "Redis", "CI/CD"],
      image: "/assets/cert/senior.png",
    },
  ];

  const openModal = useCallback((cert: Certificate) => {
    setActiveCert(cert);
    setOpen(true);
    // lock scroll
    document.documentElement.style.overflow = "hidden";
  }, []);

  const closeModal = useCallback(() => {
    setOpen(false);
    setActiveCert(null);
    document.documentElement.style.overflow = "";
  }, []);

  // tutup modal dengan ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeModal]);

  // ====== REVEAL ON SCROLL ======
  useEffect(() => {
    // Ambil elemen yang akan direveal (dibatasi ke dalam #education)
    const nodes: HTMLElement[] = Array.from(
      document.querySelectorAll<HTMLElement>("#education [data-reveal]")
    );

    if (!nodes.length) return;

    // State awal (invisible + siap animasi)
    nodes.forEach((el: HTMLElement) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(24px)";
      el.style.willChange = "opacity, transform";
    });

    const io = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const el = entry.target as HTMLElement;
          const delay = Number(el.dataset.delay || 0);

          const reduced =
            typeof window !== "undefined" &&
            "matchMedia" in window &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;

          if (reduced) {
            // Tanpa animasi untuk prefer-reduced-motion
            el.style.opacity = "1";
            el.style.transform = "none";
          } else if ((el as any).animate && typeof (el as any).animate === "function") {
            // Web Animations API
            (el as any).animate(
              [
                { opacity: 0, transform: "translateY(24px)" },
                { opacity: 1, transform: "translateY(0px)" },
              ],
              {
                duration: 650,
                easing: "cubic-bezier(.22,1,.36,1)",
                delay,
                fill: "forwards",
              }
            );
          } else {
            // Fallback CSS transition
            el.style.transition = "opacity .65s ease, transform .65s ease";
            window.setTimeout(() => {
              el.style.opacity = "1";
              el.style.transform = "translateY(0)";
            }, delay);
          }

          io.unobserve(el);
        });
      },
      { threshold: 0.18 }
    );

    nodes.forEach((n: HTMLElement) => io.observe(n));

    return () => io.disconnect();
  }, []);

  return (
    <div id="education" className="page relative overflow-hidden bg-white py-10">
      {/* soft bg blobs */}
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -top-24 -left-16 w-72 h-72 rounded-full bg-gradient-to-tr from-blue-200 to-purple-200 blur-3xl" />
        <div className="absolute -bottom-28 -right-20 w-80 h-80 rounded-full bg-gradient-to-tr from-cyan-200 to-indigo-200 blur-3xl" />
      </div>

      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="text-center max-w-3xl mx-auto mb-14" data-reveal>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 ring-1 ring-blue-100">
            <span className="size-2 rounded-full bg-blue-500 animate-pulse" /> Pendidikan
          </span>
        <h2 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">
            Riwayat Akademik
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Fondasi akademik di rekayasa perangkat lunak dan sistem informasi untuk mendukung praktik profesional.
          </p>
        </header>

        {/* Timeline */}
        <div className="relative max-w-5xl mx-auto mb-20">
          {/* Garis vertikal tengah */}
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-blue-500 via-purple-400 to-cyan-400" />

          <div className="space-y-16">
            {/* Universitas Merdeka Malang — Sistem Informasi */}
            <div className="relative flex flex-col lg:flex-row items-start lg:items-center gap-8">
              {/* text */}
              <div
                className="w-full lg:w-1/2 lg:pr-10 text-right order-2 lg:order-1"
                data-reveal
                data-delay="80"
              >
                <h3 className="text-2xl font-bold text-gray-900">
                  Sarjana Sistem Informasi (Bachelor of Information Systems)
                </h3>
                <p className="text-blue-600 font-semibold">Universitas Merdeka Malang</p>
                <p className="text-gray-500 text-sm mt-1">Mahasiswa aktif</p>
                <div className="inline-block mt-4 text-left">
                  <div className="rounded-2xl border border-gray-200/70 bg-white/70 backdrop-blur-xl p-5 shadow-sm">
                    <p className="text-gray-700">
                      Fokus pada{" "}
                      <span className="font-medium text-gray-900">
                        analisis bisnis, arsitektur sistem, data & integrasi
                      </span>
                      .
                    </p>
                    <ul className="mt-3 text-sm text-gray-600 space-y-1">
                      <li>• Business Process & System Analysis</li>
                      <li>• Database Systems & Data Modelling</li>
                      <li>• Web/App Development & Integrations</li>
                    </ul>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="px-2.5 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">UML/BPMN</span>
                      <span className="px-2.5 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">SQL</span>
                      <span className="px-2.5 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">React/Next.js</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* node */}
              <div className="relative z-10 order-1 lg:order-2" data-reveal data-delay="0">
                <div className="flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg">
                  <i className="fa-solid fa-graduation-cap" />
                </div>
              </div>

              {/* image/side card */}
              <div className="w-full lg:w-1/2 order-3" data-reveal data-delay="160">
                <div className="p-[1.5px] rounded-2xl bg-gradient-to-tr from-blue-500/50 via-purple-500/50 to-cyan-500/50">
                  <div className="rounded-2xl bg-white/80 backdrop-blur-xl p-5 shadow-lg hover:-translate-y-1 transition">
                    <img
                      src="/assets/foto/unmer.jpg"
                      className="rounded-xl w-full h-52 object-cover"
                      alt="Universitas Merdeka Malang"
                      loading="lazy"
                    />
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <span className="inline-flex items-center gap-2 px-3 py-1 text-xs rounded-full bg-blue-50 text-blue-700 ring-1 ring-blue-100">
                        <i className="fa-solid fa-award" /> Ongoing
                      </span>
                      <a href="#" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                        Lihat kurikulum →
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SMKN 1 Kraksaan — RPL */}
            <div className="relative flex flex-col lg:flex-row items-start lg:items-center gap-8">
              {/* text */}
              <div className="w-full lg:w-1/2 order-2 lg:order-3 lg:pl-10" data-reveal data-delay="80">
                <h3 className="text-2xl font-bold text-gray-900">Rekayasa Perangkat Lunak (RPL)</h3>
                <p className="text-purple-600 font-semibold">SMKN 1 Kraksaan</p>
                <p className="text-gray-500 text-sm mt-1">Lulusan</p>
                <div className="mt-4">
                  <div className="rounded-2xl border border-gray-200/70 bg-white/70 backdrop-blur-xl p-5 shadow-sm">
                    <p className="text-gray-700">
                      Fondasi kuat pada{" "}
                      <span className="font-medium text-gray-900">
                        pemrograman, OOP, web development, dan basis data
                      </span>
                      .
                    </p>
                    <ul className="mt-3 text-sm text-gray-600 space-y-1">
                      <li>• Algoritma, Struktur Data, OOP</li>
                      <li>• Web Programming (HTML/CSS/JS, PHP/Laravel dasar)</li>
                      <li>• Database (MySQL) & Version Control (Git)</li>
                    </ul>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="px-2.5 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">PHP/Laravel</span>
                      <span className="px-2.5 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">MySQL</span>
                      <span className="px-2.5 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">Git</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* node */}
              <div className="relative z-10 order-1" data-reveal data-delay="0">
                <div className="flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg">
                  <i className="fa-solid fa-user-graduate" />
                </div>
              </div>

              {/* image/side card */}
              <div className="w-full lg:w-1/2 order-3 lg:order-1 lg:pr-10" data-reveal data-delay="160">
                <div className="p-[1.5px] rounded-2xl bg-gradient-to-tr from-purple-500/50 via-pink-500/50 to-blue-500/50">
                  <div className="rounded-2xl bg-white/80 backdrop-blur-xl p-5 shadow-lg hover:-translate-y-1 transition">
                    <img
                      src="/assets/foto/smkn1.jpg"
                      className="rounded-xl w-full h-52 object-cover"
                      alt="SMKN 1 Kraksaan RPL"
                      loading="lazy"
                    />
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <span className="inline-flex items-center gap-2 px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                        <i className="fa-solid fa-trophy text-amber-500" /> Project-Based Learning
                      </span>
                      <a href="#" className="text-sm text-purple-600 hover:text-purple-800 font-medium">
                        Lihat project akhir →
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /item */}
          </div>
        </div>

        {/* Sertifikasi (disesuaikan & ada gambar) */}
        <div className="mt-6" data-reveal>
          <div className="flex items-center justify-between gap-4 mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Sertifikasi Profesional</h3>
            <a href="#" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
              Lihat semua →
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* 1) Programmer — PT Humma Teknologi Indonesia */}
            <article
              className="group rounded-2xl border border-gray-200/70 bg-white/70 backdrop-blur-xl p-5 shadow-sm hover:-translate-y-1 hover:shadow-lg transition"
              data-reveal
              data-delay="0"
            >
              <div className="flex items-start gap-4">
                <img
                  src="/assets/cert/programmer.jpg"
                  alt="Programmer — PT Humma Teknologi Indonesia"
                  className="w-12 h-12 rounded-lg object-contain ring-1 ring-gray-200 bg-white"
                  loading="lazy"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Programmer — PT Humma Teknologi Indonesia
                  </h4>
                  <p className="text-xs text-gray-500">
                    Sertifikat kompetensi pemrograman (internal).
                  </p>
                </div>
              </div>
              <p className="mt-3 text-sm text-gray-700">
                Pengembangan aplikasi web & mentoring dasar praktik engineering.
              </p>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {["Laravel", "MySQL", "Git"].map((s) => (
                    <span key={s} className="px-2 py-0.5 bg-gray-100 text-gray-800 text-xs rounded">
                      {s}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => openModal(certificates[0])}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Lihat sertifikat →
                </button>
              </div>
            </article>

            {/* 2) LKS Kab. Probolinggo — Juara 3 (IT Software) */}
            <article
              className="group rounded-2xl border border-gray-200/70 bg-white/70 backdrop-blur-xl p-5 shadow-sm hover:-translate-y-1 hover:shadow-lg transition"
              data-reveal
              data-delay="60"
            >
              <div className="flex items-start gap-4">
                <img
                  src="/assets/cert/lks.png"
                  alt="LKS Probolinggo — Juara 3 IT Software"
                  className="w-12 h-12 rounded-lg object-contain ring-1 ring-gray-200 bg-white"
                  loading="lazy"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    LKS Kabupaten Probolinggo — Juara 3 (IT Software)
                  </h4>
                  <p className="text-xs text-gray-500">Bidang Lomba: IT Software Solutions for Business</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-gray-700">
                Perancangan solusi perangkat lunak: analisis kebutuhan, desain, dan implementasi.
              </p>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {["UML", "ERD", "Web Dev"].map((s) => (
                    <span key={s} className="px-2 py-0.5 bg-gray-100 text-gray-800 text-xs rounded">
                      {s}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => openModal(certificates[1])}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Lihat piagam →
                </button>
              </div>
            </article>

            {/* 3) Senior Developer — PT Kodingin Digital Nusantara */}
            <article
              className="group rounded-2xl border border-gray-200/70 bg-white/70 backdrop-blur-xl p-5 shadow-sm hover:-translate-y-1 hover:shadow-lg transition"
              data-reveal
              data-delay="120"
            >
              <div className="flex items-start gap-4">
                <img
                  src="/assets/cert/senior.png"
                  alt="Senior Developer — PT Kodingin Digital Nusantara"
                  className="w-12 h-12 rounded-lg object-contain ring-1 ring-gray-200 bg-white"
                  loading="lazy"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Senior Developer — PT Kodingin Digital Nusantara
                  </h4>
                  <p className="text-xs text-gray-500">Pengakuan/sertifikasi internal</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-gray-700">
                Kontribusi fitur inti, optimasi performa, dan standarisasi proses rilis (CI/CD).
              </p>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {["Laravel 10", "Redis", "CI/CD"].map((s) => (
                    <span key={s} className="px-2 py-0.5 bg-gray-100 text-gray-800 text-xs rounded">
                      {s}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => openModal(certificates[2])}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Lihat sertifikat →
                </button>
              </div>
            </article>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 flex flex-col sm:flex-row gap-3 justify-center" data-reveal data-delay="80">
          <a
            href="/assets/cv/AbdulKader_CV.pdf"
            download
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-700 text-white font-medium hover:from-blue-700 hover:to-purple-800 transition"
          >
            <i className="fa-solid fa-file-arrow-down" /> Download CV
          </a>
          <a
            href="/portfolio"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-gray-300 text-gray-800 hover:border-blue-500 hover:text-blue-600 transition"
          >
            <i className="fa-solid fa-briefcase" /> Lihat Portfolio
          </a>
        </div>
      </section>

      {/* ===== MODAL SERTIFIKAT ===== */}
      {open && activeCert && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[999] flex items-center justify-center px-4"
          onClick={(e) => {
            // close kalau klik backdrop
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          {/* backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          <div className="relative z-10 w-full max-w-3xl">
            <div className="p-[2px] rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 shadow-2xl">
              <div className="rounded-2xl bg-white">
                <div className="flex items-start gap-5 p-5 border-b border-gray-100">
                  <div className="w-12 h-12 rounded-lg bg-gray-50 grid place-items-center ring-1 ring-gray-200">
                    <i className="fa-solid fa-award text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {activeCert.title}
                    </h3>
                    <p className="text-sm text-gray-500">{activeCert.org}</p>
                    {activeCert.subtitle && (
                      <p className="text-xs text-gray-500 mt-0.5">
                        {activeCert.subtitle}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={closeModal}
                    className="inline-flex items-center justify-center w-9 h-9 rounded-lg hover:bg-gray-100 transition"
                    aria-label="Tutup"
                    title="Tutup"
                  >
                    <i className="fa-solid fa-xmark text-gray-600" />
                  </button>
                </div>

                <div className="p-5 grid md:grid-cols-2 gap-5">
                  <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                    <img
                      src={activeCert.image}
                      alt={activeCert.title}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">
                      Detail Sertifikat
                    </h4>
                    {activeCert.description && (
                      <p className="mt-2 text-sm text-gray-700">
                        {activeCert.description}
                      </p>
                    )}

                    {activeCert.skills && activeCert.skills.length > 0 && (
                      <>
                        <h5 className="mt-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Skills/Scope
                        </h5>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {activeCert.skills.map((s) => (
                            <span
                              key={s}
                              className="px-2.5 py-1 rounded-full text-xs bg-gray-100 text-gray-800"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </>
                    )}

                    <div className="mt-6 flex flex-wrap gap-3">
                      <a
                        href={activeCert.image}
                        download
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
                      >
                        <i className="fa-solid fa-download" /> Unduh Sertifikat
                      </a>
                      <button
                        onClick={closeModal}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-800 text-sm hover:bg-gray-50 transition"
                      >
                        <i className="fa-solid fa-check" /> Tutup
                      </button>
                    </div>
                  </div>
                </div>

                {/* footer kecil */}
                <div className="px-5 pb-5">
                  <p className="text-xs text-gray-500">
                    Tekan <span className="font-semibold">Esc</span> untuk menutup.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* kecilkan z-index blob supaya di bawah modal */}
      <style jsx>{`
        :global(#education .pointer-events-none) {
          z-index: 0;
        }
      `}</style>
    </div>
  );
}
