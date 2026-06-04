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
  glow: string;
};

export default function Skills() {
  const [filter, setFilter] = useState<Cat>("all");
  const [page, setPage] = useState<number>(1);
  const pageSize = 12;

  // ====== DATA ======
  const SKILLS: Skill[] = [
    // Backend
    {
      cat: "backend",
      icon: <i className="devicon-laravel-plain colored text-4xl" />,
      title: "Laravel",
      sub: "REST • Auth • Queues",
      chips: ["Get Media", "Mischoll", "SIPJAKI", "Tracer Study"],
      grad: "from-red-500/20 to-orange-500/20",
      glow: "glow-red",
    },
    {
      cat: "backend",
      icon: <i className="devicon-php-plain colored text-4xl" />,
      title: "PHP 8+",
      sub: "Modern PHP • Clean Code",
      chips: ["Policy/ACL", "Service/Repo"],
      grad: "from-blue-500/10 to-indigo-500/10",
      glow: "glow-red",
    },
    {
      cat: "backend",
      icon: <i className="devicon-dotnetcore-plain colored text-4xl" />,
      title: ".NET (C#)",
      sub: "MVC • EF • API",
      chips: ["LKS Juara 3", "SQL Server"],
      grad: "from-purple-500/10 to-indigo-500/10",
      glow: "glow-purple",
    },
    {
      cat: "backend",
      icon: <i className="devicon-go-plain colored text-4xl" />,
      title: "Go",
      sub: "HTTP • Concurrency • CLI",
      chips: ["Service kecil & tooling"],
      grad: "from-cyan-500/10 to-teal-500/10",
      glow: "glow-cyan",
    },

    // Frontend
    {
      cat: "frontend",
      icon: <i className="devicon-react-original colored text-4xl" />,
      title: "React",
      sub: "SPA • Realtime • Hooks",
      chips: ["Chat Real-Time", "MindMasters"],
      grad: "from-blue-500/20 to-cyan-500/20",
      glow: "glow-blue",
    },
    {
      cat: "frontend",
      icon: <i className="devicon-nextjs-plain text-4xl text-slate-800" />,
      title: "Next.js",
      sub: "SSR • ISR • App Router",
      chips: ["My Website", "Api"],
      grad: "from-slate-500/10 to-slate-800/10",
      glow: "glow-slate",
    },
    {
      cat: "frontend",
      icon: <i className="devicon-vuejs-plain colored text-4xl" />,
      title: "Vue / Nuxt",
      sub: "SPA • SSR",
      chips: ["NewLearning Era"],
      grad: "from-emerald-500/15 to-teal-500/15",
      glow: "glow-emerald",
    },
    {
      cat: "frontend",
      icon: <i className="devicon-bootstrap-plain colored text-4xl" />,
      title: "Bootstrap",
      sub: "Rapid UI • Utility",
      chips: ["Company Profile", "Dashboard CRUD"],
      grad: "from-purple-500/15 to-indigo-500/15",
      glow: "glow-purple",
    },
    {
      cat: "frontend",
      icon: <i className="devicon-html5-plain colored text-4xl" />,
      title: "HTML5",
      sub: "Semantic • A11y",
      chips: ["Landing", "CMS Pages"],
      grad: "from-orange-500/15 to-red-500/15",
      glow: "glow-orange",
    },
    {
      cat: "frontend",
      icon: <i className="devicon-css3-plain colored text-4xl" />,
      title: "CSS3",
      sub: "Responsive • Flex/Grid",
      chips: ["Marketing Site", "Microsite"],
      grad: "from-blue-500/15 to-indigo-500/15",
      glow: "glow-blue",
    },
    {
      cat: "frontend",
      icon: <i className="devicon-tailwindcss-plain colored text-4xl" />,
      title: "Tailwind CSS",
      sub: "Design System • Responsive",
      chips: ["Landing Nolima", "LQS Question"],
      grad: "from-cyan-500/15 to-blue-500/15",
      glow: "glow-cyan",
    },

    // Mobile
    {
      cat: "mobile",
      icon: <i className="devicon-react-original colored text-4xl" />,
      title: "React Native",
      sub: "iOS • Android",
      chips: ["KR_Money", "Smart Pump App"],
      grad: "from-blue-500/15 to-purple-500/15",
      glow: "glow-blue",
    },
    {
      cat: "mobile",
      icon: <i className="devicon-dart-plain colored text-4xl" />,
      title: "Dart",
      sub: "Async • Isolates",
      chips: ["Flutter base"],
      grad: "from-blue-500/15 to-cyan-500/15",
      glow: "glow-blue",
    },
    {
      cat: "mobile",
      icon: <i className="devicon-flutter-plain colored text-4xl" />,
      title: "Flutter",
      sub: "Widget • State • REST",
      chips: ["Prototype Mobile"],
      grad: "from-blue-400/15 to-indigo-500/15",
      glow: "glow-purple",
    },

    // IoT / Vision
    {
      cat: "iot",
      icon: <i className="fa-solid fa-microchip text-emerald-600 text-3xl animate-pulse" />,
      title: "IoT • MQTT",
      sub: "ESP32/8266 • Telemetry",
      chips: ["GreenGuard", "Smart Pump"],
      grad: "from-emerald-500/15 to-teal-500/15",
      glow: "glow-emerald",
    },
    {
      cat: "iot",
      icon: <i className="devicon-arduino-plain colored text-4xl" />,
      title: "Arduino",
      sub: "Sensors • Serial • PWM",
      chips: ["Smart Pump", "Prototyping"],
      grad: "from-teal-500/15 to-emerald-500/15",
      glow: "glow-emerald",
    },
    {
      cat: "iot",
      icon: <i className="fa-solid fa-brain text-teal-600 text-3xl animate-float-gentle" />,
      title: "Computer Vision",
      sub: "OpenCV • Face Recognition",
      chips: ["PKL HummaTech"],
      grad: "from-cyan-500/15 to-teal-500/15",
      glow: "glow-cyan",
    },

    // Cloud/DevOps
    {
      cat: "cloud",
      icon: <i className="devicon-docker-plain colored text-4xl" />,
      title: "Docker / Kubernetes",
      sub: "Images • Orchestration",
      chips: ["CI/CD", "Scaling"],
      grad: "from-blue-500/15 to-cyan-500/15",
      glow: "glow-cyan",
    },
    {
      cat: "cloud",
      icon: <i className="devicon-amazonwebservices-plain colored text-4xl" />,
      title: "AWS",
      sub: "ECS/EKS • VPC • IAM",
      chips: ["S3", "CloudFront"],
      grad: "from-orange-500/15 to-yellow-500/15",
      glow: "glow-orange",
    },
    {
      cat: "cloud",
      icon: <i className="devicon-googlecloud-plain colored text-4xl" />,
      title: "Google Cloud",
      sub: "GKE • Cloud Run • Pub/Sub",
      chips: ["Logs", "Tracing"],
      grad: "from-blue-500/15 to-red-500/15",
      glow: "glow-blue",
    },

    // Data
    {
      cat: "data",
      icon: <i className="devicon-mysql-plain colored text-4xl" />,
      title: "MySQL",
      sub: "Index • Query Plan",
      chips: ["Mayoritas Laravel"],
      grad: "from-blue-500/15 to-orange-500/15",
      glow: "glow-blue",
    },
    {
      cat: "data",
      icon: <i className="devicon-postgresql-plain colored text-4xl" />,
      title: "PostgreSQL",
      sub: "Schema • TX",
      chips: ["Tracer Study", "Analytics"],
      grad: "from-blue-500/15 to-indigo-500/15",
      glow: "glow-purple",
    },
    {
      cat: "data",
      icon: <i className="devicon-redis-plain colored text-4xl" />,
      title: "Redis",
      sub: "Cache • Queue • Rate-limit",
      chips: ["SIPJAKI", "Chat RT"],
      grad: "from-red-500/15 to-rose-500/15",
      glow: "glow-red",
    },
    {
      cat: "data",
      icon: <i className="devicon-microsoftsqlserver-plain colored text-4xl" />,
      title: "SQL Server",
      sub: "T-SQL • Index",
      chips: ["LKS IT Software"],
      grad: "from-red-500/15 to-slate-500/15",
      glow: "glow-red",
    },

    // Tools
    {
      cat: "tools",
      icon: <i className="devicon-git-plain colored text-4xl" />,
      title: "Git (GitHub/GitLab)",
      sub: "Flow • PR • Release",
      chips: ["Code Review", "Release"],
      grad: "from-orange-500/15 to-slate-700/15",
      glow: "glow-orange",
    },
    {
      cat: "tools",
      icon: <i className="devicon-githubactions-plain colored text-4xl" />,
      title: "CI/CD",
      sub: "GitHub Actions • Jenkins",
      chips: ["Tests", "Auto Deploy"],
      grad: "from-blue-500/15 to-slate-600/15",
      glow: "glow-blue",
    },
    {
      cat: "tools",
      icon: <i className="devicon-visualstudio-plain colored text-4xl" />,
      title: "Visual Studio",
      sub: ".NET Dev",
      chips: ["C#", "EF Core"],
      grad: "from-purple-500/15 to-slate-600/15",
      glow: "glow-purple",
    },
    {
      cat: "tools",
      icon: <i className="devicon-vscode-plain colored text-4xl" />,
      title: "VS Code",
      sub: "Daily Driver • Ext",
      chips: ["Laravel", "React"],
      grad: "from-blue-500/15 to-slate-700/15",
      glow: "glow-blue",
    },
    {
      cat: "tools",
      icon: <i className="devicon-arduino-plain colored text-4xl" />,
      title: "Arduino IDE",
      sub: "ESP32/8266 • Serial",
      chips: ["IoT Smart Pump"],
      grad: "from-teal-500/15 to-slate-600/15",
      glow: "glow-emerald",
    },
    {
      cat: "tools",
      icon: <i className="devicon-androidstudio-plain colored text-4xl" />,
      title: "Android Studio",
      sub: "RN Modules • Debug",
      chips: ["KR_Money"],
      grad: "from-green-500/15 to-slate-700/15",
      glow: "glow-emerald",
    },
    {
      cat: "tools",
      icon: <i className="fa-solid fa-vial text-orange-600 text-3xl" />,
      title: "Postman",
      sub: "API Testing • Mock",
      chips: ["Collections", "Envs"],
      grad: "from-orange-500/15 to-slate-600/15",
      glow: "glow-orange",
    },
    {
      cat: "tools",
      icon: <i className="devicon-figma-plain colored text-4xl" />,
      title: "Figma",
      sub: "Wireframe • Handoff",
      chips: ["Nolima", "GreenGuard", "All"],
      grad: "from-purple-500/15 to-pink-500/15",
      glow: "glow-pink",
    },
  ];

  // ====== DERIVED ======
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
    <div id="skills" className="page relative overflow-hidden py-10">
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <header className="text-center max-w-3xl mx-auto mb-12" data-reveal>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 ring-1 ring-blue-100">
            <span className="size-2 rounded-full bg-blue-500 animate-pulse"></span>{" "}
            Skills
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Stack Utama, Tools & Platform
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed text-sm sm:text-base">
            Disarikan dari proyek: Get Media, PKL HummaTech (Face Recognition),
            Company Profile (HummaTech & Cakra Parama), Tracer Study Balikpapan,
            SIPJAKI Pasuruan, Mischoll, Travel, Brand Nolima, GreenGuard (IoT),
            KR_Money, MindMasters, Sisfo Akuntansi Keberlanjutan, LQS Question,
            NewLearning Era, Journal SMKN 1, dan IoT Smart Pump.
          </p>
        </header>

        {/* Filter */}
        <div
          className="filters-wrap flex flex-wrap justify-center gap-2.5 mb-10"
          data-reveal
          data-reveal-delay="50ms"
        >
          {filters.map((f, i) => (
            <button
              key={f}
              onClick={() => setFilter(f as Cat)}
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
        <div
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6 text-sm text-slate-500 font-medium"
          data-reveal
          data-reveal-delay="100ms"
        >
          <div>
            Showing{" "}
            <span className="font-bold text-slate-900">
              {filtered.length ? startIdx + 1 : 0}
            </span>
            –<span className="font-bold text-slate-900">{endIdx}</span> of{" "}
            <span className="font-bold text-slate-900">{filtered.length}</span>{" "}
            skills
          </div>
          <div>
            Page{" "}
            <span className="font-bold text-slate-900">{clampedPage}</span> /{" "}
            <span className="font-bold text-slate-900">{totalPages}</span>
          </div>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {pageItems.map((s, idx) => (
            <div
              key={`${s.title}-${idx}`}
              className={`skill-card group p-[1px] rounded-2xl bg-gradient-to-tr ${
                s.grad || "from-slate-200 to-slate-100"
              } shadow-sm border border-slate-200/60 transition-all duration-300 ${s.glow}`}
              data-cat={s.cat}
              data-reveal
              data-reveal-delay={`${(idx % 12) * 40}ms`}
            >
              <div className="rounded-2xl bg-white/70 backdrop-blur-md p-5 border border-white/40 shadow-inner">
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-xl bg-white flex items-center justify-center shadow-sm border border-slate-100 transition duration-300 group-hover:scale-110 group-hover:rotate-2">
                    {s.icon}
                  </div>
                  <div>
                    <div className="font-bold text-slate-950 text-sm leading-snug">{s.title}</div>
                    <div className="text-[11px] text-slate-400 font-medium mt-0.5">{s.sub}</div>
                  </div>
                </div>
                {!!s.chips?.length && (
                  <div className="mt-4 flex flex-wrap gap-1.5 border-t border-slate-100/60 pt-3">
                    {s.chips!.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded-lg text-[10px] bg-slate-50 text-slate-500 font-semibold ring-1 ring-slate-200/80"
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
            className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4"
            data-reveal
            data-reveal-delay="100ms"
          >
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
              {Array.from({ length: totalPages }).length <= 7
                ? Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={`p-${p}`}
                      onClick={() => setPage(p)}
                      className={`min-w-9 h-9 px-3 rounded-lg text-sm font-semibold ${
                        p === clampedPage
                          ? "bg-slate-900 text-white shadow-md"
                          : "bg-slate-100/80 text-slate-800 hover:bg-slate-200/80"
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
    </div>
  );
}
