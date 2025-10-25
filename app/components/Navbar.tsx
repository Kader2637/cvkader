"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// Utility untuk gabung kelas
function cx(...cls: Array<string | false | null | undefined>) {
  return cls.filter(Boolean).join(" ");
}

// Daftar navigasi utama (✅ sudah termasuk Certificates)
const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/education", label: "Education" },
  { href: "/skills", label: "Skills" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/certificates", label: "Certificates" }, // 🔥 Tambahan menu baru
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Ganti background dan shadow saat di-scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Tutup menu mobile saat berpindah halaman
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) => pathname === href;

  return (
    <nav
      id="navbar"
      className={cx(
        "fixed top-0 inset-x-0 z-50 border-b transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur shadow-sm border-gray-200"
          : "bg-transparent border-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3" aria-label="AK Home">
            <Image
              src="/assets/foto/logo.png"
              alt="Abdul Kader Logo"
              width={120}
              height={40}
              className="object-contain"
              priority
            />
          </Link>

          {/* MENU DESKTOP */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cx(
                  "relative px-3 py-2 text-sm font-medium transition-colors",
                  "text-gray-700 hover:text-gray-900",
                  isActive(item.href) && "text-gray-900"
                )}
              >
                {item.label}
                <span
                  className={cx(
                    "absolute left-2 right-2 -bottom-[2px] h-[2px] rounded-full transition-all",
                    isActive(item.href)
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 opacity-100"
                      : "opacity-0"
                  )}
                />
              </Link>
            ))}

            {/* Tombol Contact */}
            <Link
              href="/contact"
              className="ml-2 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transform hover:scale-[1.03] transition-all"
            >
              <i className="fas fa-paper-plane" />
              Contact
            </Link>
          </div>

          {/* TOGGLE MOBILE */}
          <button
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <i className={`fas ${open ? "fa-xmark" : "fa-bars"} text-xl`} />
          </button>
        </div>
      </div>

      {/* MENU MOBILE */}
      <div
        className={cx(
          "md:hidden overflow-hidden border-t transition-all duration-300",
          open ? "max-h-[480px] border-gray-200" : "max-h-0 border-transparent"
        )}
      >
        <div className="px-4 py-3 bg-white">
          <div className="grid gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cx(
                  "block px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive(item.href)
                    ? "text-gray-900 bg-gray-100"
                    : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                )}
              >
                {item.label}
              </Link>
            ))}

            {/* Tombol Contact (mobile) */}
            <Link
              href="/contact"
              className="block px-3 py-2 rounded-md text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
