"use client";

import { useEffect } from "react";

export default function Education() {
  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]")
    );

    // set initial style (agar pasti invisible sebelum di-reveal)
    nodes.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(24px)";
      el.style.willChange = "opacity, transform";
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;

          // prefer-reduced-motion: jangan animasi, langsung tampil
          const reduced =
            window.matchMedia &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;

          const delay = Number(el.dataset.delay || 0); // bisa set data-delay="120" dlsb

          if (reduced) {
            el.style.opacity = "1";
            el.style.transform = "none";
          } else if ("animate" in el) {
            el.animate(
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
            // fallback CSS transition
            el.style.transition = "opacity .65s ease, transform .65s ease";
            setTimeout(() => {
              el.style.opacity = "1";
              el.style.transform = "translateY(0)";
            }, delay);
          }

          io.unobserve(el);
        });
      },
      { threshold: 0.18 }
    );

    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  return (
    <div
      id="education"
      className="page relative overflow-hidden bg-white py-10"
    >
      {/* soft bg blobs */}
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -top-24 -left-16 w-72 h-72 rounded-full bg-gradient-to-tr from-blue-200 to-purple-200 blur-3xl" />
        <div className="absolute -bottom-28 -right-20 w-80 h-80 rounded-full bg-gradient-to-tr from-cyan-200 to-indigo-200 blur-3xl" />
      </div>

      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="text-center max-w-3xl mx-auto mb-14" data-reveal>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 ring-1 ring-blue-100">
            <span className="size-2 rounded-full bg-blue-500 animate-pulse" />{" "}
            Education
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">
            Academic Background
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Fondasi akademik yang kuat di rekayasa perangkat lunak dan sistem
            informasi.
          </p>
        </header>

        {/* Timeline */}
        <div className="relative max-w-5xl mx-auto mb-20">
          {/* vertical line */}
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
                  Bachelor of Information Systems (Sistem Informasi)
                </h3>
                <p className="text-blue-600 font-semibold">
                  Universitas Merdeka Malang
                </p>
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
                      <span className="px-2.5 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                        UML/BPMN
                      </span>
                      <span className="px-2.5 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                        SQL
                      </span>
                      <span className="px-2.5 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                        React/Next.js
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* node */}
              <div
                className="relative z-10 order-1 lg:order-2"
                data-reveal
                data-delay="0"
              >
                <div className="flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg">
                  <i className="fa-solid fa-graduation-cap" />
                </div>
              </div>

              {/* image/side card */}
              <div
                className="w-full lg:w-1/2 order-3"
                data-reveal
                data-delay="160"
              >
                <div className="p-[1.5px] rounded-2xl bg-gradient-to-tr from-blue-500/50 via-purple-500/50 to-cyan-500/50">
                  <div className="rounded-2xl bg-white/80 backdrop-blur-xl p-5 shadow-lg hover:-translate-y-1 transition">
                    <img
                      src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1000&h=600&fit=crop"
                      className="rounded-xl w-full h-52 object-cover"
                      alt="Universitas Merdeka Malang"
                    />
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <span className="inline-flex items-center gap-2 px-3 py-1 text-xs rounded-full bg-blue-50 text-blue-700 ring-1 ring-blue-100">
                        <i className="fa-solid fa-award" /> Ongoing
                      </span>
                      <a
                        href="#"
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                      >
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
              <div
                className="w-full lg:w-1/2 order-2 lg:order-3 lg:pl-10"
                data-reveal
                data-delay="80"
              >
                <h3 className="text-2xl font-bold text-gray-900">
                  Rekayasa Perangkat Lunak (RPL)
                </h3>
                <p className="text-purple-600 font-semibold">SMKN 1 Kraksaan</p>
                <p className="text-gray-500 text-sm mt-1">Lulusan</p>
                <div className="mt-4">
                  <div className="rounded-2xl border border-gray-200/70 bg-white/70 backdrop-blur-xl p-5 shadow-sm">
                    <p className="text-gray-700">
                      Dasar kuat di{" "}
                      <span className="font-medium text-gray-900">
                        pemrograman, OOP, web development, dan basis data
                      </span>
                      .
                    </p>
                    <ul className="mt-3 text-sm text-gray-600 space-y-1">
                      <li>• Algoritma, Struktur Data, OOP</li>
                      <li>
                        • Web Programming (HTML/CSS/JS, PHP/Laravel dasar)
                      </li>
                      <li>• Database (MySQL) & Version Control (Git)</li>
                    </ul>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="px-2.5 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                        PHP/Laravel
                      </span>
                      <span className="px-2.5 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                        MySQL
                      </span>
                      <span className="px-2.5 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                        Git
                      </span>
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
              <div
                className="w-full lg:w-1/2 order-3 lg:order-1 lg:pr-10"
                data-reveal
                data-delay="160"
              >
                <div className="p-[1.5px] rounded-2xl bg-gradient-to-tr from-purple-500/50 via-pink-500/50 to-blue-500/50">
                  <div className="rounded-2xl bg-white/80 backdrop-blur-xl p-5 shadow-lg hover:-translate-y-1 transition">
                    <img
                      src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1000&h=600&fit=crop"
                      className="rounded-xl w-full h-52 object-cover"
                      alt="SMKN 1 Kraksaan RPL"
                    />
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <span className="inline-flex items-center gap-2 px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                        <i className="fa-solid fa-trophy text-amber-500" />{" "}
                        Project-Based Learning
                      </span>
                      <a
                        href="#"
                        className="text-sm text-purple-600 hover:text-purple-800 font-medium"
                      >
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

        {/* Certifications */}
        <div className="mt-6" data-reveal>
          <div className="flex items-center justify-between gap-4 mb-6">
            <h3 className="text-xl font-semibold text-gray-900">
              Professional Certifications
            </h3>
            <a
              href="#"
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Lihat semua →
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* AWS */}
            <div
              className="group rounded-2xl border border-gray-200/70 bg-white/70 backdrop-blur-xl p-5 shadow-sm hover:-translate-y-1 hover:shadow-lg transition"
              data-reveal
              data-delay="0"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-200 to-amber-200 grid place-items-center">
                  <i className="fa-brands fa-aws text-amber-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    AWS Solutions Architect — Professional
                  </h4>
                  <p className="text-xs text-gray-500">
                    Issued Jan 2023 • Expires Jan 2026
                  </p>
                </div>
              </div>
              <p className="mt-3 text-sm text-gray-700">
                Arsitektur cloud, cost optimization, reliability &amp; security.
              </p>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-800 text-xs rounded">
                    VPC
                  </span>
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-800 text-xs rounded">
                    EKS
                  </span>
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-800 text-xs rounded">
                    IAM
                  </span>
                </div>
                <a
                  href="#"
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Verify →
                </a>
              </div>
            </div>

            {/* GCP */}
            <div
              className="group rounded-2xl border border-gray-200/70 bg-white/70 backdrop-blur-xl p-5 shadow-sm hover:-translate-y-1 hover:shadow-lg transition"
              data-reveal
              data-delay="60"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-200 to-cyan-200 grid place-items-center">
                  <i className="fa-solid fa-cloud text-sky-700" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Google Cloud Professional Developer
                  </h4>
                  <p className="text-xs text-gray-500">
                    Issued Mar 2023 • Expires Mar 2025
                  </p>
                </div>
              </div>
              <p className="mt-3 text-sm text-gray-700">
                Design &amp; implement aplikasi pada GCP dengan best practices.
              </p>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-800 text-xs rounded">
                    GKE
                  </span>
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-800 text-xs rounded">
                    Pub/Sub
                  </span>
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-800 text-xs rounded">
                    Cloud Run
                  </span>
                </div>
                <a
                  href="#"
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Verify →
                </a>
              </div>
            </div>

            {/* CKA */}
            <div
              className="group rounded-2xl border border-gray-200/70 bg-white/70 backdrop-blur-xl p-5 shadow-sm hover:-translate-y-1 hover:shadow-lg transition"
              data-reveal
              data-delay="120"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-200 to-teal-200 grid place-items-center">
                  <i className="fa-solid fa-cubes-stacked text-emerald-700" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Certified Kubernetes Administrator
                  </h4>
                  <p className="text-xs text-gray-500">
                    Issued Oct 2022 • Expires Oct 2025
                  </p>
                </div>
              </div>
              <p className="mt-3 text-sm text-gray-700">
                Cluster admin, networking, security, dan troubleshooting.
              </p>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-800 text-xs rounded">
                    RBAC
                  </span>
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-800 text-xs rounded">
                    CNI
                  </span>
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-800 text-xs rounded">
                    Helm
                  </span>
                </div>
                <a
                  href="#"
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Verify →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div
          className="mt-12 flex flex-col sm:flex-row gap-3 justify-center"
          data-reveal
          data-delay="80"
        >
          <a
            href="#"
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
    </div>
  );
}
