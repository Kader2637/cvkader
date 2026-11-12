"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "./ThemeProvider";

type CmdItem = {
  id: string;
  label: string;
  hint?: string;
  icon: string;
  group: "Navigation" | "Actions" | "Socials";
  action: () => void;
};

export default function CommandPalette() {
  const { cmdOpen, setCmdOpen, theme, toggleTheme } = useTheme();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const [copied, setCopied] = useState(false);

  const items: CmdItem[] = useMemo(
    () => [
      {
        id: "home",
        label: "Workspace / Home",
        hint: "Interactive CV & Terminal",
        icon: "fa-solid fa-terminal",
        group: "Navigation",
        action: () => router.push("/"),
      },
      {
        id: "about",
        label: "About Me",
        hint: "Profile, Principles & Stack",
        icon: "fa-solid fa-user",
        group: "Navigation",
        action: () => router.push("/about"),
      },
      {
        id: "experience",
        label: "Experience",
        hint: "Career Timeline",
        icon: "fa-solid fa-briefcase",
        group: "Navigation",
        action: () => router.push("/experience"),
      },
      {
        id: "education",
        label: "Education",
        hint: "Academic & Core Certs",
        icon: "fa-solid fa-graduation-cap",
        group: "Navigation",
        action: () => router.push("/education"),
      },
      {
        id: "skills",
        label: "Skills & Tech Matrix",
        hint: "27+ Technologies",
        icon: "fa-solid fa-microchip",
        group: "Navigation",
        action: () => router.push("/skills"),
      },
      {
        id: "portfolio",
        label: "Portfolio Projects",
        hint: "20+ Shipped Products",
        icon: "fa-solid fa-folder-open",
        group: "Navigation",
        action: () => router.push("/portfolio"),
      },
      {
        id: "certificates",
        label: "Certificates & Awards",
        hint: "2023 — 2026 Archive",
        icon: "fa-solid fa-award",
        group: "Navigation",
        action: () => router.push("/certificates"),
      },
      {
        id: "contact",
        label: "Contact & Inquiry",
        hint: "Send a message",
        icon: "fa-solid fa-paper-plane",
        group: "Navigation",
        action: () => router.push("/contact"),
      },
      {
        id: "download-cv",
        label: "Download CV (PDF)",
        hint: "AbdulKader_CV.pdf",
        icon: "fa-solid fa-file-arrow-down",
        group: "Actions",
        action: () => {
          window.open("/assets/cv/AbdulKader_CV.pdf", "_blank");
        },
      },
      {
        id: "copy-email",
        label: copied ? "Email Copied!" : "Copy Email Address",
        hint: "abdulkader0126@gmail.com",
        icon: "fa-solid fa-copy",
        group: "Actions",
        action: async () => {
          try {
            await navigator.clipboard.writeText("abdulkader0126@gmail.com");
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          } catch {
            // ignore
          }
        },
      },
      {
        id: "toggle-theme",
        label: `Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`,
        hint: "Appearance",
        icon: theme === "dark" ? "fa-solid fa-sun" : "fa-solid fa-moon",
        group: "Actions",
        action: () => toggleTheme(),
      },
      {
        id: "github",
        label: "GitHub Profile",
        hint: "github.com/Kader2637",
        icon: "fa-brands fa-github",
        group: "Socials",
        action: () => window.open("https://github.com/Kader2637", "_blank"),
      },
      {
        id: "linkedin",
        label: "LinkedIn Profile",
        hint: "Abdul Kader",
        icon: "fa-brands fa-linkedin",
        group: "Socials",
        action: () =>
          window.open(
            "https://www.linkedin.com/in/abdul-kader-53b22930a",
            "_blank"
          ),
      },
      {
        id: "blog",
        label: "Blog — Catatan Kader",
        hint: "catatan-kader.web.id",
        icon: "fa-solid fa-rss",
        group: "Socials",
        action: () => window.open("https://catatan-kader.web.id", "_blank"),
      },
    ],
    [router, theme, toggleTheme, copied]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (i) =>
        i.label.toLowerCase().includes(q) ||
        (i.hint && i.hint.toLowerCase().includes(q)) ||
        i.group.toLowerCase().includes(q)
    );
  }, [items, query]);

  useEffect(() => {
    setSelected(0);
  }, [query, cmdOpen]);

  useEffect(() => {
    if (!cmdOpen) {
      setQuery("");
      return;
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setCmdOpen(false);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelected((s) => (filtered.length ? (s + 1) % filtered.length : 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelected((s) =>
          filtered.length ? (s - 1 + filtered.length) % filtered.length : 0
        );
      } else if (e.key === "Enter" && filtered[selected]) {
        e.preventDefault();
        filtered[selected].action();
        if (filtered[selected].id !== "copy-email") {
          setCmdOpen(false);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cmdOpen, filtered, selected, setCmdOpen]);

  if (!cmdOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-[14vh] px-4 backdrop-fade"
      onClick={() => setCmdOpen(false)}
    >
      <div
        className="w-full max-w-xl rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-zinc-900 shadow-2xl overflow-hidden modal-pop"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-200 dark:border-white/10">
          <i className="fa-solid fa-magnifying-glass text-slate-400 dark:text-zinc-500 text-sm" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ketik perintah atau cari halaman... (mis. portfolio, cv, dark)"
            className="w-full bg-transparent text-sm text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-500 outline-none"
          />
          <kbd className="px-2 py-0.5 text-[10px] font-mono rounded bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400 border border-slate-200 dark:border-white/10">
            ESC
          </kbd>
        </div>

        <div className="max-h-[360px] overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="py-10 text-center text-xs text-slate-500 dark:text-zinc-500 font-mono">
              Tidak ada perintah yang cocok dengan &quot;{query}&quot;
            </div>
          ) : (
            filtered.map((item, idx) => {
              const active = idx === selected;
              return (
                <button
                  key={item.id}
                  onMouseEnter={() => setSelected(idx)}
                  onClick={() => {
                    item.action();
                    if (item.id !== "copy-email") setCmdOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition ${
                    active
                      ? "bg-indigo-600 text-white"
                      : "text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs ${
                        active
                          ? "bg-white/20 text-white"
                          : "bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400"
                      }`}
                    >
                      <i className={item.icon} />
                    </span>
                    <div className="truncate">
                      <div className="text-sm font-medium truncate">
                        {item.label}
                      </div>
                      {item.hint && (
                        <div
                          className={`text-[11px] truncate ${
                            active
                              ? "text-indigo-100"
                              : "text-slate-400 dark:text-zinc-500"
                          }`}
                        >
                          {item.hint}
                        </div>
                      )}
                    </div>
                  </div>
                  <span
                    className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded ${
                      active
                        ? "bg-white/15 text-white"
                        : "text-slate-400 dark:text-zinc-500"
                    }`}
                  >
                    {item.group}
                  </span>
                </button>
              );
            })
          )}
        </div>

        <div className="px-4 py-2.5 border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-zinc-950/60 flex items-center justify-between text-[11px] text-slate-400 dark:text-zinc-500 font-mono">
          <span>↑↓ Navigate · ↵ Select</span>
          <span>Abdul Kader OS v2.6</span>
        </div>
      </div>
    </div>
  );
}

