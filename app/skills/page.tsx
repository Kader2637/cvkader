"use client";

import React, { useEffect, useMemo, useState } from "react";
import BackToTop from "../components/BackToTop";
import SpotlightCard from "../components/bits/SpotlightCard";
import DecryptedText from "../components/bits/DecryptedText";

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
};

const SKILLS: Skill[] = [
  // Backend
  {
    cat: "backend",
    icon: <i className="devicon-laravel-plain colored text-3xl" />,
    title: "Laravel",
    sub: "REST • Auth • Queues",
    chips: ["Get Media", "Mischoll", "SIPJAKI", "Tracer Study"],
  },
  {
    cat: "backend",
    icon: <i className="devicon-php-plain colored text-3xl" />,
    title: "PHP 8+",
    sub: "Modern PHP • Clean Code",
    chips: ["Policy/ACL", "Service/Repo"],
  },
  {
    cat: "backend",
    icon: <i className="devicon-dotnetcore-plain colored text-3xl" />,
    title: ".NET (C#)",
    sub: "MVC • EF • API",
    chips: ["LKS Juara 3", "SQL Server"],
  },
  {
    cat: "backend",
    icon: <i className="devicon-go-plain colored text-3xl" />,
    title: "Go",
    sub: "HTTP • Concurrency • CLI",
    chips: ["Service kecil & tooling"],
  },

  // Frontend
  {
    cat: "frontend",
    icon: <i className="devicon-react-original colored text-3xl" />,
    title: "React",
    sub: "SPA • Realtime • Hooks",
    chips: ["Chat Real-Time", "MindMasters"],
  },
  {
    cat: "frontend",
    icon: <i className="devicon-nextjs-plain text-3xl text-slate-900 dark:text-white" />,
    title: "Next.js",
    sub: "SSR • ISR • App Router",
    chips: ["My Website", "API"],
  },
  {
    cat: "frontend",
    icon: <i className="devicon-vuejs-plain colored text-3xl" />,
    title: "Vue / Nuxt",
    sub: "SPA • SSR",
    chips: ["NewLearning Era", "GreenGuard"],
  },
  {
    cat: "frontend",
    icon: <i className="devicon-tailwindcss-plain colored text-3xl" />,
    title: "Tailwind CSS",
    sub: "Design System • Responsive",
    chips: ["Landing Nolima", "LQS Question"],
  },
  {
    cat: "frontend",
    icon: <i className="devicon-bootstrap-plain colored text-3xl" />,
    title: "Bootstrap",
    sub: "Rapid UI • Utility",
    chips: ["Company Profile", "Dashboard CRUD"],
  },
  {
    cat: "frontend",
    icon: <i className="devicon-html5-plain colored text-3xl" />,
    title: "HTML5",
    sub: "Semantic • A11y",
    chips: ["Landing", "CMS Pages"],
  },
  {
    cat: "frontend",
    icon: <i className="devicon-css3-plain colored text-3xl" />,
    title: "CSS3",
    sub: "Responsive • Flex/Grid",
    chips: ["Marketing Site", "Microsite"],
  },

  // Mobile
  {
    cat: "mobile",
    icon: <i className="devicon-react-original colored text-3xl" />,
    title: "React Native",
    sub: "iOS • Android",
    chips: ["KR_Money", "Smart Pump App"],
  },
  {
    cat: "mobile",
    icon: <i className="devicon-dart-plain colored text-3xl" />,
    title: "Dart",
    sub: "Async • Isolates",
    chips: ["Flutter base"],
  },
  {
    cat: "mobile",
    icon: <i className="devicon-flutter-plain colored text-3xl" />,
    title: "Flutter",
    sub: "Widget • State • REST",
    chips: ["Prototype Mobile"],
  },

  // IoT / Vision
  {
    cat: "iot",
    icon: <i className="fa-solid fa-microchip text-emerald-500 text-2xl" />,
    title: "IoT • MQTT",
    sub: "ESP32/8266 • Telemetry",
    chips: ["GreenGuard", "Smart Pump"],
  },
  {
    cat: "iot",
    icon: <i className="devicon-arduino-plain colored text-3xl" />,
    title: "Arduino",
    sub: "Sensors • Serial • PWM",
    chips: ["Smart Pump", "Prototyping"],
  },
  {
    cat: "iot",
    icon: <i className="fa-solid fa-brain text-teal-500 text-2xl" />,
    title: "Computer Vision",
    sub: "OpenCV • Face Recognition",
    chips: ["PKL HummaTech"],
  },

  // Cloud/DevOps
  {
    cat: "cloud",
    icon: <i className="devicon-docker-plain colored text-3xl" />,
    title: "Docker / Kubernetes",
    sub: "Images • Orchestration",
    chips: ["CI/CD", "Scaling"],
  },
  {
    cat: "cloud",
    icon: <i className="devicon-amazonwebservices-plain-wordmark colored text-3xl" />,
    title: "AWS",
    sub: "ECS/EKS • VPC • IAM",
    chips: ["S3", "CloudFront"],
  },
  {
    cat: "cloud",
    icon: <i className="devicon-googlecloud-plain colored text-3xl" />,
    title: "Google Cloud",
    sub: "GKE • Cloud Run • Pub/Sub",
    chips: ["Logs", "Tracing"],
  },

  // Data
  {
    cat: "data",
    icon: <i className="devicon-mysql-plain colored text-3xl" />,
    title: "MySQL",
    sub: "Index • Query Plan",
    chips: ["Mayoritas Laravel"],
  },
  {
    cat: "data",
    icon: <i className="devicon-postgresql-plain colored text-3xl" />,
    title: "PostgreSQL",
    sub: "Schema • TX",
    chips: ["Tracer Study", "Analytics"],
  },
  {
    cat: "data",
    icon: <i className="devicon-redis-plain colored text-3xl" />,
    title: "Redis",
    sub: "Cache • Queue • Rate-limit",
    chips: ["SIPJAKI", "Chat RT"],
  },
  {
    cat: "data",
    icon: <i className="devicon-microsoftsqlserver-plain colored text-3xl" />,
    title: "SQL Server",
    sub: "T-SQL • Index",
    chips: ["LKS IT Software"],
  },

  // Tools
  {
    cat: "tools",
    icon: <i className="devicon-git-plain colored text-3xl" />,
    title: "Git (GitHub/GitLab)",
    sub: "Flow • PR • Release",
    chips: ["Code Review", "Release"],
  },
  {
    cat: "tools",
    icon: <i className="devicon-githubactions-plain colored text-3xl" />,
    title: "CI/CD",
    sub: "GitHub Actions • Jenkins",
    chips: ["Tests", "Auto Deploy"],
  },
  {
    cat: "tools",
    icon: <i className="devicon-visualstudio-plain colored text-3xl" />,
    title: "Visual Studio",
    sub: ".NET Dev",
    chips: ["C#", "EF Core"],
  },
  {
    cat: "tools",
    icon: <i className="devicon-vscode-plain colored text-3xl" />,
    title: "VS Code",
    sub: "Daily Driver • Ext",
    chips: ["Laravel", "React"],
  },
  {
    cat: "tools",
    icon: <i className="devicon-arduino-plain colored text-3xl" />,
    title: "Arduino IDE",
    sub: "ESP32/8266 • Serial",
    chips: ["IoT Smart Pump"],
  },
  {
    cat: "tools",
    icon: <i className="devicon-androidstudio-plain colored text-3xl" />,
    title: "Android Studio",
    sub: "RN Modules • Debug",
    chips: ["KR_Money"],
  },
  {
    cat: "tools",
    icon: <i className="fa-solid fa-vial text-orange-500 text-2xl" />,
    title: "Postman",
    sub: "API Testing • Mock",
    chips: ["Collections", "Envs"],
  },
  {
    cat: "tools",
    icon: <i className="devicon-figma-plain colored text-3xl" />,
    title: "Figma",
    sub: "Wireframe • Handoff",
    chips: ["Nolima", "GreenGuard"],
  },
];

export default function Skills() {
  const [filter, setFilter] = useState<Cat>("all");
  const [page, setPage] = useState<number>(1);
  const pageSize = 12;

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

  return (
    <div id="skills" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pb-8">
      <header className="space-y-3 border-b border-slate-200/80 dark:border-white/[0.08] pb-6">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[11px] font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-semibold">
          04 / Tech Matrix
        </span>
        <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
          <DecryptedText text="Skills & Technologies" speed={26} />
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 max-w-2xl">
          Ekosistem teknologi yang saya gunakan untuk membangun produk web, mobile, cloud, data, dan IoT.
        </p>
      </header>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap gap-1.5">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                filter === f
                  ? "bg-slate-900 dark:bg-white text-white dark:text-zinc-950"
                  : "bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {f === "all" ? "All" : f === "iot" ? "IoT / AI" : f[0].toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <div className="text-xs font-mono text-slate-500 dark:text-zinc-400">
          Showing {filtered.length ? startIdx + 1 : 0}–{endIdx} of {filtered.length}
        </div>
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-stretch">
        {pageItems.map((s) => (
          <SpotlightCard
            key={s.title}
            className="p-5 h-full hover:-translate-y-0.5 transition-transform"
          >
            <div className="h-full flex flex-col justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-zinc-950 border border-slate-200 dark:border-white/10 flex items-center justify-center shrink-0">
                  {s.icon}
                </div>
                <div className="min-w-0">
                  <h2 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                    {s.title}
                  </h2>
                  <p className="text-[11px] font-mono text-slate-500 dark:text-zinc-400 mt-0.5">
                    {s.sub}
                  </p>
                </div>
              </div>

              {s.chips && (
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-200/70 dark:border-white/[0.06]">
                  {s.chips.map((c) => (
                    <span
                      key={c}
                      className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-zinc-950/60 border border-slate-200 dark:border-white/10 text-[10px] font-mono text-slate-600 dark:text-zinc-300"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </SpotlightCard>
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

      <BackToTop />
    </div>
  );
}
