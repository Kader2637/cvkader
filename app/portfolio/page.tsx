"use client";
import { useEffect, useState } from "react";

export default function Portfolio() {
  const [modalSrc, setModalSrc] = useState<string | null>(null);

  useEffect(() => {
    // === FILTER (dengan cleanup yang rapi) ===
    const buttons = document.querySelectorAll<HTMLButtonElement>("#portfolio .portfolio-filter");
    const cards = document.querySelectorAll<HTMLElement>("#portfolio .portfolio-card");

    const disposers: Array<() => void> = [];

    buttons.forEach((btn) => {
      const handler = () => {
        buttons.forEach((b) => {
          b.classList.remove("bg-gray-900", "text-white");
          b.classList.add("bg-gray-100");
        });
        btn.classList.add("bg-gray-900", "text-white");
        btn.classList.remove("bg-gray-100");
        const f = btn.dataset.filter;
        cards.forEach((c) => {
          const show = f === "all" || (c.dataset.cat || "").includes(f || "");
          (c.style as any).display = show ? "" : "none";
        });
      };
      btn.addEventListener("click", handler);
      disposers.push(() => btn.removeEventListener("click", handler));
    });

    // === REVEAL ON SCROLL (fade + slide + blur + zoom + stagger) ===
    const revealSet = new Set<HTMLElement>();

    // Header keseluruhan
    document.querySelectorAll<HTMLElement>("#portfolio header").forEach((el) => revealSet.add(el));
    // Tombol filter
    document.querySelectorAll<HTMLElement>("#portfolio .portfolio-filter").forEach((el, idx) => {
      el.dataset.delay = String(idx * 40); // stagger kecil antar tombol
      revealSet.add(el);
    });
    // Kartu
    document.querySelectorAll<HTMLElement>("#portfolio .portfolio-card").forEach((el, idx) => {
      // kalau belum ada, kasih delay default berbasis kolom (bikin gelombang halus)
      if (!el.dataset.delay) el.dataset.delay = String((idx % 6) * 70);
      revealSet.add(el);
    });
    // CTA
    document.querySelectorAll<HTMLElement>("#portfolio .cta-reveal").forEach((el) => revealSet.add(el));

    // Initial state sebelum muncul
    revealSet.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(26px) scale(.98)";
      el.style.filter = "blur(6px)";
      el.style.willChange = "opacity, transform, filter";
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const delay = Number(el.dataset.delay || 0);
          const reduced =
            window.matchMedia &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;

          if (reduced) {
            el.style.opacity = "1";
            el.style.transform = "none";
            el.style.filter = "none";
          } else if ("animate" in el) {
            el.animate(
              [
                { opacity: 0, transform: "translateY(26px) scale(.98)", filter: "blur(6px)" },
                { opacity: 1, transform: "translateY(0) scale(1)", filter: "blur(0)" },
              ],
              {
                duration: 680,
                easing: "cubic-bezier(.22,1,.36,1)",
                delay,
                fill: "forwards",
              }
            );
          } else {
            // fallback CSS transition
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
      { threshold: 0.18 }
    );

    revealSet.forEach((el) => io.observe(el));

    return () => {
      // bersihkan semua listener & observer
      disposers.forEach((fn) => fn());
      io.disconnect();
    };
  }, []);

  const items = [
    {
      cat: "web",
      img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=900&h=600&fit=crop",
      title: "Enterprise E-Commerce",
      desc: "Platform multi-vendor skala besar (Laravel + React) dengan pembayaran & analytics.",
      tags: ["Laravel", "React", "PostgreSQL"],
      full: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200",
    },
    {
      cat: "mobile",
      img: "https://images.unsplash.com/photo-1573164574572-cb89e39749b4?w=900&h=600&fit=crop",
      title: "Health & Fitness App",
      desc: "React Native workout tracking, meal planner, smartwatch.",
      tags: ["React Native", "Firebase", "GraphQL"],
      full: "https://images.unsplash.com/photo-1573164574572-cb89e39749b4?w=1200",
    },
    {
      cat: "cloud",
      img: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=900&h=600&fit=crop",
      title: "Cloud Migration Platform",
      desc: "Multi-cloud (AWS + GCP) Docker & Kubernetes untuk deployment otomatis.",
      tags: ["Docker", "Kubernetes", "AWS"],
      full: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=1200",
    },
    {
      cat: "design",
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&h=600&fit=crop",
      title: "Fintech Dashboard",
      desc: "Desain interaktif visualisasi data keuangan.",
      tags: ["Figma", "Tailwind", "Vue"],
      full: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200",
    },
    {
      cat: "web",
      img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=900&h=600&fit=crop",
      title: "SaaS Analytics Platform",
      desc: "Laravel + Vue realtime chart, billing, OAuth2.",
      tags: ["Laravel", "Vue", "MySQL"],
      full: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200",
    },
    {
      cat: "cloud",
      img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=900&h=600&fit=crop",
      title: "DevOps Monitoring Suite",
      desc: "Observability realtime untuk microservices di Kubernetes.",
      tags: ["Prometheus", "Grafana", "Docker"],
      full: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200",
    },
  ];

  return (
    <div
      id="portfolio"
      className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 py-10"
    >
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <div className="absolute -top-24 left-0 w-72 h-72 rounded-full bg-gradient-to-br from-blue-200 to-purple-200 blur-3xl" />
        <div className="absolute -bottom-28 right-0 w-96 h-96 rounded-full bg-gradient-to-tr from-cyan-200 to-indigo-200 blur-3xl" />
      </div>

      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="max-w-3xl mx-auto text-center mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 ring-1 ring-blue-100">
            <span className="size-2 rounded-full bg-blue-500 animate-pulse" />{" "}
            Portfolio
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">
            Featured Projects
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Dari platform web skala besar hingga aplikasi mobile & solusi cloud.
          </p>
        </header>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {["all", "web", "mobile", "cloud", "design"].map((f, i) => (
            <button
              key={f}
              data-filter={f}
              className={`portfolio-filter px-4 py-2 rounded-full text-sm font-medium ${
                i === 0 ? "bg-gray-900 text-white" : "bg-gray-100 hover:bg-gray-200"
              }`}
              // kasih delay untuk stagger halus di filter
              data-delay={String(i * 40)}
            >
              {f === "all" ? "All" : f[0].toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((it, idx) => (
            <div
              key={it.title}
              className="portfolio-card group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-xl shadow-lg border border-gray-100 hover:-translate-y-2 hover:shadow-2xl transition"
              data-cat={it.cat}
              // delay per kolom/baris biar wave efeknya natural
              data-delay={String((idx % 6) * 70)}
            >
              <img
                src={it.img}
                alt={it.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {it.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{it.desc}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {it.tags.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => setModalSrc(it.full)}
                  className="text-blue-600 font-medium hover:text-blue-800"
                >
                  View Project →
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center cta-reveal">
          <a
            href="#contact"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-700 text-white font-medium rounded-lg shadow-lg hover:from-blue-700 hover:to-purple-800 transform hover:scale-105 transition"
          >
            <i className="fa-solid fa-paper-plane mr-2" /> Let's Collaborate
          </a>
        </div>
      </section>

      {/* Modal */}
      {modalSrc && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm grid place-items-center"
          onClick={() => setModalSrc(null)}
        >
          <div
            className="relative bg-white/90 backdrop-blur-xl rounded-2xl p-4 w-[90%] max-w-3xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalSrc(null)}
              className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-xl"
            >
              <i className="fa-solid fa-xmark" />
            </button>
            <img
              src={modalSrc}
              alt="Project Preview"
              className="rounded-xl w-full max-h-[70vh] object-contain shadow-md"
            />
          </div>
        </div>
      )}
    </div>
  );
}
