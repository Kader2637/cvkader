"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// Utility untuk gabung kelas
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) => pathname === href;

  return (
    <nav
      id="navbar"
      className="fixed top-4 inset-x-0 z-50 transition-all duration-500 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div
        className={cx(
          "w-full rounded-2xl border transition-all duration-500 px-6 py-2 flex flex-col md:flex-row md:items-center justify-between",
          scrolled
            ? "bg-white/85 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] border-white/60"
            : "bg-transparent border-transparent shadow-none"
        )}
      >
        <div className="h-12 flex items-center justify-between w-full md:w-auto">
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3 hover:scale-105 transition-transform" aria-label="AK Home">
            <Image
              src="/assets/foto/logo.png"
              alt="Abdul Kader Logo"
              width={105}
              height={34}
              className="object-contain"
              priority
            />
          </Link>

          {/* TOGGLE MOBILE */}
          <button
            className="md:hidden p-2 rounded-xl text-gray-700 hover:bg-white/40 transition active:scale-95"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <i className={`fas ${open ? "fa-xmark" : "fa-bars"} text-xl`} />
          </button>
        </div>

        {/* MENU DESKTOP */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cx(
                "relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg hover:bg-white/50",
                isActive(item.href)
                  ? "text-blue-600 bg-white/70 font-semibold"
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              {item.label}
              {isActive(item.href) && (
                <span className="absolute left-3 right-3 -bottom-[2px] h-[3px] rounded-full bg-gradient-to-r from-blue-500 to-purple-600 animate-pulse-slow" />
              )}
            </Link>
          ))}

          <div className="flex items-center gap-2 ml-4">
            {/* BLOG BUTTON */}
            <a
              href="https://catatan-kader.web.id"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 border border-blue-500/20 rounded-xl overflow-hidden transition-all hover:text-white"
            >
              <span className="absolute inset-0 w-0 bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-300 ease-out group-hover:w-full"></span>
              <span className="relative flex items-center gap-2">
                <i className="fas fa-rss text-xs" />
                Blog
                <i className="fas fa-external-link-alt text-[10px] opacity-50 group-hover:opacity-100" />
              </span>
            </a>

            {/* CONTACT BUTTON */}
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 hover:shadow-[0_4px_15px_rgba(37,99,235,0.3)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
            >
              <i className="fas fa-paper-plane" />
              Contact
            </Link>
          </div>
        </div>

        {/* MENU MOBILE */}
        <div
          className={cx(
            "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
            open ? "max-h-[550px] opacity-100 mt-2 pb-4" : "max-h-0 opacity-0 pointer-events-none"
          )}
        >
          <div className="space-y-3 pt-2">
            <div className="grid gap-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cx(
                    "block px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                    isActive(item.href)
                      ? "text-blue-600 bg-white/80 font-semibold shadow-sm"
                      : "text-gray-600 hover:text-gray-900 hover:bg-white/40"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <hr className="border-white/10" />

            <div className="flex flex-col gap-2">
              <a
                href="https://catatan-kader.web.id"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-blue-600 border border-blue-500/20 bg-white/60 hover:bg-white transition-all duration-200"
              >
                <i className="fas fa-rss" />
                Kunjungi Blog
              </a>

              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-md"
              >
                <i className="fas fa-paper-plane" />
                Contact Me
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}