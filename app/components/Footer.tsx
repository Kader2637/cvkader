import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const year = new Date().getFullYear();

  const socials = [
    {
      icon: "fa-brands fa-github",
      href: "https://github.com/Kader2637",
      label: "GitHub",
    },
    {
      icon: "fa-brands fa-linkedin-in",
      href: "https://linkedin.com/in/abdul-kader-53b22930a",
      label: "LinkedIn",
    },
    {
      icon: "fa-solid fa-rss",
      href: "https://catatan-kader.web.id",
      label: "Blog",
    },
  ];

  const links = [
    { href: "/", label: "Workspace" },
    { href: "/about", label: "About" },
    { href: "/experience", label: "Experience" },
    { href: "/education", label: "Education" },
    { href: "/skills", label: "Skills" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/certificates", label: "Certificates" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <footer className="border-t border-slate-200/80 dark:border-white/[0.08] bg-white/50 dark:bg-zinc-950/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          {/* Left: Identity */}
          <div className="space-y-3 max-w-md">
            <div className="flex items-center gap-3">
              <Image
                src="/assets/foto/favicon.png"
                alt="Abdul Kader"
                width={32}
                height={32}
                className="w-8 h-8 object-contain"
              />
              <div>
                <div className="font-display font-bold text-sm text-slate-900 dark:text-zinc-100">
                  Abdul Kader
                </div>
                <div className="text-[11px] font-mono text-slate-500 dark:text-zinc-500">
                  Full Stack Developer · Founder AETHER NUSANTARA
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
              Membangun sistem web, mobile, cloud, dan integrasi IoT + AI dengan fokus pada keandalan produksi dan pengalaman pengguna modern.
            </p>
          </div>

          {/* Right: Links & Socials */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-slate-500 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-8 h-8 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-zinc-900 text-slate-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-500/40 flex items-center justify-center text-xs transition"
                >
                  <i className={s.icon} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200/70 dark:border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-mono text-slate-400 dark:text-zinc-500">
          <span>© {year} Abdul Kader. Malang, Indonesia.</span>
          <span>Press ⌘K anywhere to navigate</span>
        </div>
      </div>
    </footer>
  );
}
