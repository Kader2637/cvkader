"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";

function cx(...cls: Array<string | false | null | undefined>) {
  return cls.filter(Boolean).join(" ");
}

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/education", label: "Education" },
  { href: "/skills", label: "Skills" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/certificates", label: "Certificates" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme, setCmdOpen, openCvModal } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) => pathname === href;

  return (
    <header className="fixed top-3 inset-x-0 z-50 px-3 sm:px-6 lg:px-8">
      <nav
        aria-label="Primary Navigation"
        className={cx(
          "max-w-7xl mx-auto rounded-2xl border transition-all duration-300 px-4 py-2",
          scrolled
            ? "bg-white/85 dark:bg-zinc-900/85 backdrop-blur-xl border-slate-200/80 dark:border-white/[0.08] shadow-lg shadow-slate-200/40 dark:shadow-black/40"
            : "bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md border-slate-200/60 dark:border-white/[0.06]"
        )}
      >
        <div className="h-11 flex items-center justify-between gap-3">
          {/* Brand */}
          <Link
            href="/"
            className="flex items-center gap-2.5 shrink-0 group"
            aria-label="Abdul Kader Home"
          >
            <Image
              src="/assets/foto/favicon.png"
              alt="AK"
              width={32}
              height={32}
              className="w-8 h-8 object-contain"
              priority
            />
            <div className="hidden sm:flex flex-col leading-none">
              <span className="font-display font-bold text-sm text-slate-900 dark:text-zinc-100 tracking-tight group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors">
                Abdul Kader
              </span>
              <span className="text-[10px] font-mono text-slate-400 dark:text-zinc-500">
                Full Stack Dev
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-0.5 bg-slate-100/80 dark:bg-zinc-950/60 p-1 rounded-xl border border-slate-200/70 dark:border-white/[0.06]">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cx(
                  "px-3 py-1.5 text-xs font-medium rounded-lg transition-all",
                  isActive(item.href)
                    ? "bg-white dark:bg-zinc-800 text-slate-900 dark:text-white shadow-sm"
                    : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2">
            {/* Command Palette Trigger */}
            <button
              onClick={() => setCmdOpen(true)}
              className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-zinc-950/60 text-xs text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100 hover:border-slate-300 dark:hover:border-white/20 transition"
              title="Command Palette (⌘K)"
              aria-label="Quick Jump Search"
            >
              <i className="fa-solid fa-magnifying-glass text-[11px]" />
              <span className="hidden xl:inline font-mono text-[11px]">Quick Jump</span>
              <kbd className="hidden sm:inline px-1.5 py-0.5 rounded bg-white dark:bg-zinc-800 border border-slate-200 dark:border-white/10 text-[10px] font-mono">
                ⌘K
              </kbd>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="w-8 h-8 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-zinc-950/60 text-slate-600 dark:text-zinc-300 hover:text-indigo-500 dark:hover:text-indigo-400 flex items-center justify-center transition"
              title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              <i
                className={`fa-solid ${
                  theme === "dark" ? "fa-sun" : "fa-moon"
                } text-xs`}
              />
            </button>

            {/* Preview CV PDF */}
            <button
              type="button"
              onClick={openCvModal}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-zinc-800/80 text-xs font-semibold text-slate-800 dark:text-zinc-100 hover:border-indigo-500/40 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
              title="Preview CV PDF langsung di web"
            >
              <i className="fa-solid fa-file-pdf text-rose-500 text-xs" />
              <span>CV PDF</span>
            </button>

            {/* Contact CTA */}
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-sm shadow-indigo-500/20 transition"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Hire / Contact</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden w-8 h-8 rounded-xl border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-700 dark:text-zinc-200"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              <i className={`fa-solid ${open ? "fa-xmark" : "fa-bars"} text-sm`} />
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        <div
          className={cx(
            "lg:hidden overflow-hidden transition-all duration-300",
            open ? "max-h-[480px] opacity-100 pt-3 pb-2" : "max-h-0 opacity-0 pointer-events-none"
          )}
        >
          <div className="grid grid-cols-2 gap-1.5 border-t border-slate-200/70 dark:border-white/[0.06] pt-3">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cx(
                  "px-3 py-2 rounded-xl text-xs font-medium transition",
                  isActive(item.href)
                    ? "bg-indigo-600 text-white"
                    : "text-slate-600 dark:text-zinc-300 bg-slate-100/70 dark:bg-zinc-800/60"
                )}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="px-3 py-2 rounded-xl text-xs font-semibold bg-emerald-600 text-white text-center"
            >
              Contact Me
            </Link>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openCvModal();
              }}
              className="flex-1 text-center py-2 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-zinc-200 hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              <i className="fa-solid fa-file-pdf text-rose-500 mr-1.5" />
              Preview CV PDF
            </button>
            <a
              href="https://catatan-kader.web.id"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center py-2 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-zinc-200"
            >
              <i className="fa-solid fa-rss text-indigo-500 mr-1.5" />
              Blog
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
