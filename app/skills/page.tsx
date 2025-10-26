"use client";

import { useEffect, useMemo, useState } from "react";
import React from "react";

type Cat =
  | "all"
  | "frontend"
  | "backend"
  | "mobile"
  | "iot"
  | "cloud"
  | "data"
  | "tools";

type Skill = {
  cat: Exclude<Cat, "all">;
  icon: React.ReactNode;
  title: string;
  sub: string;
  chips?: string[];
  grad?: string;
};

export default function Skills() {
  const [filter, setFilter] = useState<Cat>("all");
  const [page, setPage] = useState<number>(1);
  const pageSize = 12;

  // ====== DATA (ditambah Next.js, Bootstrap, HTML/CSS, Go, Dart, Flutter, Arduino) ======
  const SKILLS: Skill[] = [
    // Backend
    {
      cat: "backend",
      icon: <i className="devicon-laravel-plain colored text-4xl" />,
      title: "Laravel",
      sub: "REST • Auth • Queues",
      chips: ["Get Media", "Mischoll", "SIPJAKI", "Tracer Study"],
      grad: "from-red-500/40 via-rose-500/40 to-orange-500/40",
    },
    {
      cat: "backend",
      icon: <i className="devicon-php-plain colored text-4xl" />,
      title: "PHP 8+",
      sub: "Modern PHP • Clean Code",
      chips: ["Policy/ACL", "Service/Repo"],
      grad: "from-amber-500/30 via-fuchsia-500/30 to-blue-500/30",
    },
    {
      cat: "backend",
      icon: <i className="devicon-dotnetcore-plain colored text-4xl" />,
      title: ".NET (C#)",
      sub: "MVC • EF • API",
      chips: ["LKS Juara 3", "SQL Server"],
      grad: "from-amber-500/30 via-fuchsia-500/30 to-blue-500/30",
    },
    {
      cat: "backend",
      icon: <i className="devicon-go-plain colored text-4xl" />,
      title: "Go",
      sub: "HTTP • Concurrency • CLI",
      chips: ["Service kecil & tooling"],
      grad: "from-amber-500/30 via-fuchsia-500/30 to-blue-500/30",
    },

    // Frontend
    {
      cat: "frontend",
      icon: <i className="devicon-react-original colored text-4xl" />,
      title: "React",
      sub: "SPA • Realtime • Hooks",
      chips: ["Chat Real-Time", "MindMasters"],
      grad: "from-blue-500/30 via-purple-500/30 to-cyan-500/30",
    },
    {
      cat: "frontend",
      icon: <i className="devicon-nextjs-plain text-4xl" />, // Next.js (ikon default hitam/monokrom)
      title: "Next.js",
      sub: "SSR • ISR • App Router",
      chips: ["My Website" , "Api"],
      grad: "from-blue-500/30 via-purple-500/30 to-cyan-500/30",
    },
    {
      cat: "frontend",
      icon: <i className="devicon-vuejs-plain colored text-4xl" />,
      title: "Vue / Nuxt",
      sub: "SPA • SSR",
      chips: ["NewLearning Era"],
      grad: "from-blue-500/30 via-purple-500/30 to-cyan-500/30",
    },
    {
      cat: "frontend",
      icon: <i className="devicon-bootstrap-plain colored text-4xl" />,
      title: "Bootstrap",
      sub: "Rapid UI • Utility",
      chips: ["Company Profile", "Dashboard CRUD"],
      grad: "from-blue-500/30 via-purple-500/30 to-cyan-500/30",
    },
    {
      cat: "frontend",
      icon: <i className="devicon-html5-plain colored text-4xl" />,
      title: "HTML5",
      sub: "Semantic • A11y",
      chips: ["Landing", "CMS Pages"],
      grad: "from-blue-500/30 via-purple-500/30 to-cyan-500/30",
    },
    {
      cat: "frontend",
      icon: <i className="devicon-css3-plain colored text-4xl" />,
      title: "CSS3",
      sub: "Responsive • Flex/Grid",
      chips: ["Marketing Site", "Microsite"],
      grad: "from-blue-500/30 via-purple-500/30 to-cyan-500/30",
    },
    {
      cat: "frontend",
      icon: <i className="devicon-tailwindcss-plain colored text-4xl" />,
      title: "Tailwind CSS",
      sub: "Design System • Responsive",
      chips: ["Landing Nolima", "LQS Question"],
      grad: "from-blue-500/30 via-purple-500/30 to-cyan-500/30",
    },

    // Mobile
    {
      cat: "mobile",
      icon: <i className="devicon-react-original colored text-4xl" />,
      title: "React Native",
      sub: "iOS • Android",
      chips: ["KR_Money", "Smart Pump App"],
      grad: "from-pink-500/30 via-purple-500/30 to-indigo-500/30",
    },
    {
      cat: "mobile",
      icon: <i className="devicon-dart-plain colored text-4xl" />,
      title: "Dart",
      sub: "Async • Isolates",
      chips: ["Flutter base"],
      grad: "from-pink-500/30 via-purple-500/30 to-indigo-500/30",
    },
    {
      cat: "mobile",
      icon: <i className="devicon-flutter-plain colored text-4xl" />,
      title: "Flutter",
      sub: "Widget • State • REST",
      chips: ["Prototype Mobile"],
      grad: "from-pink-500/30 via-purple-500/30 to-indigo-500/30",
    },

    // IoT / Vision
    {
      cat: "iot",
      icon: <i className="fa-solid fa-microchip text-emerald-600 text-3xl" />,
      title: "IoT • MQTT",
      sub: "ESP32/8266 • Telemetry",
      chips: ["GreenGuard", "Smart Pump"],
      grad: "from-emerald-500/30 via-lime-500/30 to-teal-500/30",
    },
    {
      cat: "iot",
      icon: <i className="devicon-arduino-plain colored text-4xl" />,
      title: "Arduino",
      sub: "Sensors • Serial • PWM",
      chips: ["Smart Pump", "Prototyping"],
      grad: "from-emerald-500/30 via-lime-500/30 to-teal-500/30",
    },
    {
      cat: "iot",
      icon: <i className="fa-solid fa-brain text-teal-600 text-3xl" />,
      title: "Computer Vision",
      sub: "OpenCV • Face Recognition",
      chips: ["PKL HummaTech"],
      grad: "from-emerald-500/30 via-lime-500/30 to-teal-500/30",
    },

    // Cloud/DevOps
    {
      cat: "cloud",
      icon: <i className="devicon-docker-plain colored text-4xl" />,
      title: "Docker / Kubernetes",
      sub: "Images • Orchestration",
      chips: ["CI/CD", "Scaling"],
      grad: "from-emerald-500/30 via-teal-500/30 to-cyan-500/30",
    },
    {
      cat: "cloud",
      icon: <i className="devicon-amazonwebservices-plain colored text-4xl" />,
      title: "AWS",
      sub: "ECS/EKS • VPC • IAM",
      chips: ["S3", "CloudFront"],
      grad: "from-emerald-500/30 via-teal-500/30 to-cyan-500/30",
    },
    {
      cat: "cloud",
      icon: <i className="devicon-googlecloud-plain colored text-4xl" />,
      title: "Google Cloud",
      sub: "GKE • Cloud Run • Pub/Sub",
      chips: ["Logs", "Tracing"],
      grad: "from-emerald-500/30 via-teal-500/30 to-cyan-500/30",
    },

    // Data
    {
      cat: "data",
      icon: <i className="devicon-mysql-plain colored text-4xl" />,
      title: "MySQL",
      sub: "Index • Query Plan",
      chips: ["Mayoritas Laravel"],
      grad: "from-indigo-500/30 via-sky-500/30 to-cyan-500/30",
    },
    {
      cat: "data",
      icon: <i className="devicon-postgresql-plain colored text-4xl" />,
      title: "PostgreSQL",
      sub: "Schema • TX",
      chips: ["Tracer Study", "Analytics"],
      grad: "from-indigo-500/30 via-sky-500/30 to-cyan-500/30",
    },
    {
      cat: "data",
      icon: <i className="devicon-redis-plain colored text-4xl" />,
      title: "Redis",
      sub: "Cache • Queue • Rate-limit",
      chips: ["SIPJAKI", "Chat RT"],
      grad: "from-indigo-500/30 via-sky-500/30 to-cyan-500/30",
    },
    {
      cat: "data",
      icon: <i className="devicon-microsoftsqlserver-plain colored text-4xl" />,
      title: "SQL Server",
      sub: "T-SQL • Index",
      chips: ["LKS IT Software"],
      grad: "from-indigo-500/30 via-sky-500/30 to-cyan-500/30",
    },

    // Tools
    {
      cat: "tools",
      icon: <i className="devicon-git-plain colored text-4xl" />,
      title: "Git (GitHub/GitLab)",
      sub: "Flow • PR • Release",
      chips: ["Code Review", "Release"],
      grad: "from-slate-500/30 via-gray-500/30 to-zinc-500/30",
    },
    {
      cat: "tools",
      icon: <i className="devicon-githubactions-plain colored text-4xl" />,
      title: "CI/CD",
      sub: "GitHub Actions • Jenkins",
      chips: ["Tests", "Auto Deploy"],
      grad: "from-slate-500/30 via-gray-500/30 to-zinc-500/30",
    },
    {
      cat: "tools",
      icon: <i className="devicon-visualstudio-plain colored text-4xl" />,
      title: "Visual Studio",
      sub: ".NET Dev",
      chips: ["C#", "EF Core"],
      grad: "from-slate-500/30 via-gray-500/30 to-zinc-500/30",
    },
    {
      cat: "tools",
      icon: <i className="devicon-vscode-plain colored text-4xl" />,
      title: "VS Code",
      sub: "Daily Driver • Ext",
      chips: ["Laravel", "React"],
      grad: "from-slate-500/30 via-gray-500/30 to-zinc-500/30",
    },
    {
      cat: "tools",
      icon: <i className="devicon-arduino-plain colored text-4xl" />,
      title: "Arduino IDE",
      sub: "ESP32/8266 • Serial",
      chips: ["IoT Smart Pump"],
      grad: "from-slate-500/30 via-gray-500/30 to-zinc-500/30",
    },
    {
      cat: "tools",
      icon: <i className="devicon-androidstudio-plain colored text-4xl" />,
      title: "Android Studio",
      sub: "RN Modules • Debug",
      chips: ["KR_Money"],
      grad: "from-slate-500/30 via-gray-500/30 to-zinc-500/30",
    },
    {
      cat: "tools",
      icon: <i className="fa-solid fa-vial text-purple-600 text-3xl" />,
      title: "Postman",
      sub: "API Testing • Mock",
      chips: ["Collections", "Envs"],
      grad: "from-slate-500/30 via-gray-500/30 to-zinc-500/30",
    },
    {
      cat: "tools",
      icon: <i className="devicon-figma-plain colored text-4xl" />,
      title: "Figma",
      sub: "Wireframe • Handoff",
      chips: ["Nolima", "GreenGuard","All"],
      grad: "from-slate-500/30 via-gray-500/30 to-zinc-500/30",
    },
  ];

  // ====== DERIVED (filter + pagination) ======
  const filtered = useMemo(
    () => SKILLS.filter((s) => filter === "all" || s.cat === filter),
    [filter]
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const clampedPage = Math.min(page, totalPages);
  const startIdx = (clampedPage - 1) * pageSize;
  const endIdx = Math.min(startIdx + pageSize, filtered.length);
  const pageItems = filtered.slice(startIdx, endIdx);

  useEffect(() => setPage(1), [filter]);

  // ====== REVEAL ANIMATION (dipertahankan) ======
  useEffect(() => {
    const revealNodes = new Set<HTMLElement>();
    document
      .querySelectorAll<HTMLElement>(
        "#skills [data-reveal], #skills header, #skills .filters-wrap"
      )
      .forEach((el) => revealNodes.add(el));

    document
      .querySelectorAll<HTMLElement>("#skills .skill-card")
      .forEach((el, idx) => {
        el.dataset.delay = String(70 * (idx % 8));
        revealNodes.add(el);
      });

    revealNodes.forEach((el: HTMLElement) => {
      const node = el as HTMLElement;
      node.style.opacity = "0";
      node.style.transform = "translateY(26px) scale(.98)";
      node.style.filter = "blur(6px)";
      node.style.willChange = "opacity, transform, filter";
    });

    const ioReveal = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const reduced =
            window.matchMedia &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          const delay = Number(el.dataset.delay || 0);
          if (reduced) {
            el.style.opacity = "1";
            el.style.transform = "none";
            el.style.filter = "none";
          } else if ("animate" in el) {
            el.animate(
              [
                {
                  opacity: 0,
                  transform: "translateY(26px) scale(.98)",
                  filter: "blur(6px)",
                },
                {
                  opacity: 1,
                  transform: "translateY(0) scale(1)",
                  filter: "blur(0)",
                },
              ],
              {
                duration: 680,
                easing: "cubic-bezier(.22,1,.36,1)",
                delay,
                fill: "forwards",
              }
            );
          } else {
            const node = el as HTMLElement;
            node.style.transition =
              "opacity .68s ease, transform .68s ease, filter .68s ease";
            window.setTimeout(() => {
              node.style.opacity = "1";
              node.style.transform = "translateY(0) scale(1)";
              node.style.filter = "blur(0)";
            }, delay);
          }
          ioReveal.unobserve(el);
        });
      },
      { threshold: 0.18 }
    );

    revealNodes.forEach((n) => ioReveal.observe(n));
    return () => ioReveal.disconnect();
  }, [filter, clampedPage]);

  // ====== UI ======
  const filters: Cat[] = [
    "all",
    "frontend",
    "backend",
    "mobile",
    "iot",
    "cloud",
    "data",
    "tools",
  ];

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

    if (totalPages <= 7)
      return Array.from({ length: totalPages }, (_, i) => btn(i + 1));

    const nodes: React.ReactNode[] = [];
    const push = (n: React.ReactNode) => nodes.push(n);
    push(btn(1));
    if (clampedPage > 3)
      push(
        <span key="e1" className="px-1 text-gray-500">
          …
        </span>
      );
    const start = Math.max(2, clampedPage - 1);
    const stop = Math.min(totalPages - 1, clampedPage + 1);
    for (let p = start; p <= stop; p++) push(btn(p));
    if (clampedPage < totalPages - 2)
      push(
        <span key="e2" className="px-1 text-gray-500">
          …
        </span>
      );
    push(btn(totalPages));
    return nodes;
  };

  return (
    <div id="skills" className="page relative overflow-hidden bg-white py-10">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -top-24 -left-16 w-72 h-72 rounded-full bg-gradient-to-tr from-blue-200 to-purple-200 blur-3xl"></div>
        <div className="absolute -bottom-28 -right-20 w-80 h-80 rounded-full bg-gradient-to-tr from-cyan-200 to-indigo-200 blur-3xl"></div>
      </div>

      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center max-w-3xl mx-auto mb-12" data-reveal>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 ring-1 ring-blue-100">
            <span className="size-2 rounded-full bg-blue-500 animate-pulse"></span>{" "}
            Skills
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">
            Stack Utama, Tools & Platform
          </h2>
          <p className="mt-2 text-gray-600">
            Disarikan dari proyek: Get Media, PKL HummaTech (Face Recognition),
            Company Profile (HummaTech & Cakra Parama), Tracer Study Balikpapan,
            SIPJAKI Pasuruan, Mischoll, Travel, Brand Nolima, GreenGuard (IoT),
            KR_Money, MindMasters, Sisfo Akuntansi Keberlanjutan, LQS Question,
            NewLearning Era, Journal SMKN 1, dan IoT Smart Pump.
          </p>
        </header>

        {/* Filter */}
        <div
          className="filters-wrap flex flex-wrap justify-center gap-3 mb-8"
          data-reveal
        >
          {["all","frontend","backend","mobile","iot","cloud","data","tools"].map((f, i) => (
            <button
              key={f}
              onClick={() => setFilter(f as Cat)}
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
        <div
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6 text-sm text-gray-600"
          data-reveal
        >
          <div>
            Showing{" "}
            <span className="font-medium text-gray-900">
              {filtered.length ? startIdx + 1 : 0}
            </span>
            –<span className="font-medium text-gray-900">{endIdx}</span> of{" "}
            <span className="font-medium text-gray-900">{filtered.length}</span>{" "}
            skills
          </div>
          <div>
            Page{" "}
            <span className="font-medium text-gray-900">{clampedPage}</span> /{" "}
            <span className="font-medium text-gray-900">{totalPages}</span>
          </div>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {pageItems.map((s, idx) => (
            <div
              key={`${s.title}-${idx}`}
              className={`skill-card group p-[1.5px] rounded-2xl bg-gradient-to-tr ${
                s.grad || "from-slate-500/30 via-gray-500/30 to-zinc-500/30"
              }`}
              data-cat={s.cat}
              data-reveal
            >
              <div className="rounded-2xl bg-white/80 backdrop-blur-xl p-5 shadow-sm hover:shadow-lg transition hover:-translate-y-1">
                <div className="flex items-center gap-4">
                  {s.icon}
                  <div>
                    <div className="font-semibold text-gray-900">{s.title}</div>
                    <div className="text-xs text-gray-500">{s.sub}</div>
                  </div>
                </div>
                {!!s.chips?.length && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {s.chips!.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded text-[11px] bg-gray-100 text-gray-700 ring-1 ring-gray-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div
            className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4"
            data-reveal
          >
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
              {Array.from({ length: totalPages }).length <= 7
                ? Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
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
                  ))
                : renderPages()}
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
        )}
      </section>
    </div>
  );
}
