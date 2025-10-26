"use client";

import { useEffect } from "react";

export default function About() {
  // counter ketika container #about kelihatan
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
        const duration = 900;
        const startTime = performance.now();
        const showPlus = (el.dataset.plus || "").toLowerCase() === "true"; // kontrol tanda "+"

        const step = (now: number) => {
          const p = Math.min((now - startTime) / duration, 1);
          const val = Math.floor(p * target);
          el.textContent = String(val) + (p === 1 && showPlus ? "+" : "");
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    };

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && run()),
      { threshold: 0.35 }
    );
    io.observe(about);
    return () => io.disconnect();
  }, []);

  // tilt card
  useEffect(() => {
    const card = document.querySelector<HTMLDivElement>("#about .tilt-card");
    if (!card) return;
    const maxTilt = 8;
    const reset = () => (card.style.transform = "rotateX(0deg) rotateY(0deg)");
    const move = (e: PointerEvent) => {
      const r = card.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) / (r.width / 2);
      const dy = (e.clientY - cy) / (r.height / 2);
      const rx = (-dy * maxTilt).toFixed(2);
      const ry = (dx * maxTilt).toFixed(2);
      card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
    };
    card.addEventListener("pointermove", move);
    card.addEventListener("pointerleave", reset);
    card.addEventListener("pointerdown", reset);
    return () => {
      card.removeEventListener("pointermove", move);
      card.removeEventListener("pointerleave", reset);
      card.removeEventListener("pointerdown", reset);
    };
  }, []);

  // === REVEAL ON SCROLL (stagger) ===
  useEffect(() => {
    const toReveal = document.querySelectorAll<HTMLElement>("#about [data-reveal]");
    toReveal.forEach((el) => el.classList.add("will-reveal"));

    const groups = document.querySelectorAll<HTMLElement>("#about [data-reveal-group]");
    groups.forEach((group) => {
      const children = group.querySelectorAll<HTMLElement>("[data-reveal-child]");
      children.forEach((child, idx) => {
        child.style.setProperty("--d", `${idx * 100}ms`);
        child.classList.add("will-reveal");
      });
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;

          if (el.hasAttribute("data-reveal-group")) {
            const children = el.querySelectorAll<HTMLElement>("[data-reveal-child]");
            children.forEach((c) => {
              c.classList.remove("will-reveal");
              c.classList.add("revealed");
            });
          } else {
            el.classList.remove("will-reveal");
            el.classList.add("revealed");
          }

          io.unobserve(el);
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );

    toReveal.forEach((el) => io.observe(el));
    groups.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, []);

  return (
    <div id="about" className="page relative overflow-hidden bg-white py-10">
      {/* soft gradient blobs */}
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -top-24 -left-20 w-72 h-72 rounded-full bg-gradient-to-tr from-blue-200 to-purple-200 blur-3xl" />
        <div className="absolute -bottom-28 -right-24 w-80 h-80 rounded-full bg-gradient-to-tr from-cyan-200 to-indigo-200 blur-3xl" />
      </div>

      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="max-w-3xl" data-reveal>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 ring-1 ring-blue-100">
            <span className="size-2 rounded-full bg-blue-500 animate-pulse" />{" "}
            About Me
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">
            Abdul Kader — Full Stack Developer
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            <strong>4+ tahun</strong> membangun solusi{" "}
            <span className="font-medium text-gray-800">terukur</span>,{" "}
            <span className="font-medium text-gray-800">aman</span>, dan{" "}
            <span className="font-medium text-gray-800">berdampak bisnis</span> untuk startup & enterprise.
            Fokus pada <em>release speed</em>, <em>system security</em>, dan <em>business impact</em>. Saat ini
            menjabat sebagai <strong>Co-Founder & CTO</strong> di PT Kodingin Digital Nusantara.
          </p>
        </header>

        <div className="mt-12 grid lg:grid-cols-3 gap-10 items-start">
          {/* Profile / Stats */}
          <aside className="lg:col-span-1" data-reveal>
            <div className="p-[1.5px] rounded-2xl bg-gradient-to-tr from-blue-500/50 via-purple-500/50 to-cyan-500/50">
              <div className="group relative rounded-2xl bg-white/70 backdrop-blur-xl ring-1 ring-white/40">
                <div className="p-6">
                  <div className="tilt-card relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-gray-100 will-change-transform">
                    <img
                      src="/assets/foto/im1.png"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      alt="Abdul Kader"
                      loading="lazy"
                    />
                  </div>

                  <ul className="mt-6 space-y-3 text-sm text-gray-700">
                    <li className="flex items-center gap-3">
                      <i className="fa-solid fa-location-dot text-gray-500 w-5 text-center" />{" "}
                      Malang, Indonesia
                    </li>
                    <li className="flex items-center gap-3">
                      <i className="fa-solid fa-briefcase text-gray-500 w-5 text-center" />{" "}
                      Co-Founder & CTO • PT Kodingin Digital Nusantara
                    </li>
                    <li className="flex items-center gap-3">
                      <i className="fa-solid fa-envelope text-gray-500 w-5 text-center" />{" "}
                      <a href="mailto:abdulkader0126@gmail.com" className="hover:underline">
                        abdulkader0126@gmail.com
                      </a>
                    </li>
                    <li className="flex items-center gap-3">
                      <i className="fa-solid fa-phone text-gray-500 w-5 text-center" />{" "}
                      <a href="tel:+62895428183064" className="hover:underline">
                        0895-4281-83064
                      </a>
                    </li>
                  </ul>

                  <div className="mt-6 grid grid-cols-3 gap-3">
                    <div className="rounded-xl border border-gray-200/70 bg-white/60 p-4 text-center">
                      <div
                        className="text-2xl font-bold text-gray-900 counter"
                        data-target="4"
                        data-plus="true"
                      >
                        0
                      </div>
                      <div className="text-xs text-gray-500">Years</div>
                    </div>
                    <div className="rounded-xl border border-gray-200/70 bg-white/60 p-4 text-center">
                      <div
                        className="text-2xl font-bold text-gray-900 counter"
                        data-target="25"
                        data-plus="true"
                      >
                        0
                      </div>
                      <div className="text-xs text-gray-500">Projects</div>
                    </div>
                    <div className="rounded-xl border border-gray-200/70 bg-white/60 p-4 text-center">
                      <div
                        className="text-2xl font-bold text-gray-900 counter"
                        data-target="10"
                        data-plus="true"
                      >
                        0
                      </div>
                      <div className="text-xs text-gray-500">Clients</div>
                    </div>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <a
                      href="mailto:abdulkader0126@gmail.com?subject=Project%20Inquiry%20via%20Portfolio"
                      className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-white bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 transition will-change-transform hover:-translate-y-0.5"
                    >
                      <i className="fa-solid fa-paper-plane" /> Contact
                    </a>
                    <a
                      href="https://www.linkedin.com/in/abdul-kader-53b22930a"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-11 h-11 rounded-lg border border-gray-200/80 bg-white/70 hover:bg-white transition"
                      aria-label="LinkedIn"
                    >
                      <i className="fa-brands fa-linkedin text-gray-700" />
                    </a>
                    <a
                      href="https://github.com/Kader2637"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-11 h-11 rounded-lg border border-gray-200/80 bg-white/70 hover:bg-white transition"
                      aria-label="GitHub"
                    >
                      <i className="fa-brands fa-github text-gray-700" />
                    </a>
                    <a
                      href="https://instagram.com/abdulkader2637"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-11 h-11 rounded-lg border border-gray-200/80 bg-white/70 hover:bg-white transition"
                      aria-label="Instagram"
                    >
                      <i className="fa-brands fa-instagram text-gray-700" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Content kanan */}
          <div className="lg:col-span-2 space-y-10" data-reveal-group>
            <section
              className="rounded-2xl border border-gray-200/70 bg-white/70 backdrop-blur-xl"
              data-reveal-child
            >
              <div className="h-1 w-full bg-[length:200%_100%] bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 animate-bg-move rounded-t-2xl" />
              <div className="p-8">
                <h3 className="text-xl font-semibold text-gray-900">
                  Rilis lebih cepat, risiko lebih rendah
                </h3>
                <p className="mt-3 text-gray-700 leading-relaxed">
                  Fokus pada arsitektur yang solid, codebase yang maintainable, dan metrik nyata
                  (Core Web Vitals, konversi, biaya infra). Biasa bekerja end-to-end:{" "}
                  <span className="text-gray-800 font-medium">
                    discovery → architecture → implementation → observability → handover
                  </span>
                  .
                </p>
              </div>
            </section>

            {/* capabilities 3 kolom — disesuaikan persis */}
            {/* <section className="grid md:grid-cols-3 gap-6" data-reveal-child>
              {[
                {
                  title: "Performance & DX",
                  items: [
                    "Web Vitals (LCP/TBT/CLS), SSR/ISR",
                    "TypeScript, ESLint, Turborepo",
                    "CI/CD cepat & aman",
                  ],
                  icons: ["fa-bolt", "fa-wrench", "fa-rocket"],
                  color: "text-blue-600",
                },
                {
                  title: "Security & Reliability",
                  items: [
                    "OWASP, OAuth2/OIDC",
                    "Rate-limit, audit trail",
                    "SLO/SLI, rollback strategy",
                  ],
                  icons: ["fa-shield-halved", "fa-gauge-high", "fa-rotate-left"],
                  color: "text-purple-600",
                },
                {
                  title: "Scalability & Observability",
                  items: [
                    "Microservices, MQ",
                    "OTel tracing, metrics, logs",
                    "Autoscaling & cost guardrails",
                  ],
                  icons: ["fa-diagram-project", "fa-eye", "fa-chart-line"],
                  color: "text-emerald-600",
                },
              ].map((c) => (
                <div
                  key={c.title}
                  className="rounded-xl border border-gray-200/70 bg-white/70 backdrop-blur-xl p-6 transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="text-sm font-semibold text-gray-900 mb-2">
                    {c.title}
                  </div>
                  <ul className="text-sm text-gray-700 space-y-2">
                    {c.items.map((t, i) => (
                      <li className="flex gap-2" key={i}>
                        <i className={`fa-solid ${c.icons[i]} ${c.color} mt-0.5`} /> {t}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </section> */}

            {/* Primary Stack — Laravel ditaruh paling depan */}
            <section data-reveal-child>
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Primary Stack
              </h4>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 transition">
                  Laravel • PHP 8 • MySQL
                </span>
                <span className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 transition">
                  React • Next.js • TS
                </span>
                <span className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 transition">
                  Node.js • Express
                </span>
                <span className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 transition">
                  PostgreSQL • Redis
                </span>
                <span className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 transition">
                  Docker • Kubernetes
                </span>
                <span className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 transition">
                  AWS • GCP
                </span>
              </div>
            </section>

            {/* timeline ringkas */}
            <section data-reveal-child>
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Experience Highlights
              </h4>
              <div className="mt-4 space-y-6">
                {[
                  {
                    role: "Co-Founder & CTO — PT Kodingin Digital Nusantara",
                    time: "2025 — Sekarang",
                    text: "Memimpin produk & teknologi; orkestrasi roadmap, arsitektur, dan kualitas rilis.",
                  },
                  {
                    role: "Senior Developer — PT Elshad Teknologi Indonesia",
                    time: "2025",
                    text: "Pengembangan fitur inti & optimasi performa; kolaborasi lintas tim.",
                  },
                  {
                    role: "HRD — PT Kodingin Digital Nusantara",
                    time: "2025",
                    text: "Rekrutmen, proses interview teknis, dan pengembangan talenta.",
                  },
                  {
                    role: "Junior Developer & Mentor — PT Humma Teknologi Indonesia",
                    time: "2023 — 2024",
                    text: "Pengembangan aplikasi & mentoring; membangun dasar praktik engineering yang baik.",
                  },
                ].map((t) => (
                  <article
                    className="border-l-2 border-gray-200 pl-4 transition hover:translate-x-0.5"
                    key={t.role}
                  >
                    <div className="flex items-center justify-between">
                      <h5 className="font-semibold text-gray-900">{t.role}</h5>
                      <span className="text-xs text-gray-500">{t.time}</span>
                    </div>
                    <p className="mt-1 text-sm text-gray-700">{t.text}</p>
                  </article>
                ))}
              </div>
            </section>

            {/* CTA */}
            <section className="pt-2" data-reveal-child>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="/portfolio"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-700 text-white font-medium hover:from-blue-700 hover:to-purple-800 transition will-change-transform hover:-translate-y-0.5"
                >
                  <i className="fa-solid fa-briefcase" /> Lihat Portfolio
                </a>
                <a
                  href="mailto:abdulkader0126@gmail.com?subject=Project%20Inquiry%20via%20Portfolio"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-gray-300 text-gray-800 hover:border-blue-500 hover:text-blue-600 transition"
                >
                  <i className="fa-solid fa-calendar" /> Jadwalkan Diskusi
                </a>
                <a
                  href="/assets/cv/AbdulKader_CV.pdf"
                  download
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-gray-300 text-gray-800 hover:bg-gray-50 transition"
                >
                  <i className="fa-solid fa-file-arrow-down" /> Download CV
                </a>
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
