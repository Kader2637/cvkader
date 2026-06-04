import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  const socials = [
    {
      icon: "globe",
      href: "https://abdkader.vercel.app",
      label: "Website Portfolio",
      hover: "hover:bg-blue-600",
    },
    {
      icon: "instagram",
      href: "https://instagram.com/abdulkader2637",
      label: "Instagram",
      hover: "hover:bg-pink-600",
    },
    {
      icon: "linkedin-in",
      href: "https://linkedin.com/in/abdul-kader-53b22930a",
      label: "LinkedIn",
      hover: "hover:bg-blue-700",
    },
  ];

  const quickLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/experience", label: "Experience" },
    { href: "/education", label: "Education" },
    { href: "/skills", label: "Skills" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/contact", label: "Contact" },
  ];

  const services = [
    { href: "/#services", label: "Web Development" },
    { href: "/#services", label: "Mobile Apps" },
    { href: "/#services", label: "UI/UX Design" },
    { href: "/#services", label: "Cloud Solutions" },
  ];

  return (
    <footer className="relative overflow-hidden bg-[#fafbfc]/60 border-t border-gray-200/60 text-slate-600 backdrop-blur-xl">
      {/* background gradient glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-30">
        <div className="absolute -top-24 -left-16 w-72 h-72 rounded-full bg-gradient-to-tr from-blue-200 to-purple-200 blur-3xl" />
        <div className="absolute -bottom-28 -right-24 w-96 h-96 rounded-full bg-gradient-to-tr from-cyan-200 to-indigo-200 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-5">
            <Link href="/" className="inline-flex items-center gap-3 hover:scale-[1.02] transition-transform">
              <Image
                src="/assets/foto/favicon.png"
                alt="Abdul Kader Logo"
                width={42}
                height={42}
                className="rounded-xl shadow-sm border border-gray-100"
                priority
              />
              <span className="text-xl font-bold text-slate-900 tracking-wide">
                Abdul Kader
              </span>
            </Link>

            <p className="mt-5 max-w-md leading-relaxed text-slate-500">
              Full Stack Developer yang berfokus pada solusi digital modern —
              dari frontend interaktif, backend tangguh, hingga integrasi cloud
              yang efisien.
            </p>

            <div className="mt-6 flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.icon}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-xl grid place-items-center bg-white border border-gray-200/80 text-slate-600 shadow-sm transition-all duration-300 hover:text-white ${s.hover} hover:-translate-y-1`}
                >
                  <i className={`fa-${s.icon === "globe" ? "solid" : "brands"} fa-${s.icon}`} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3">
            <h3 className="text-slate-900 font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors"
                  >
                    <span className="size-1.5 rounded-full bg-slate-200" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-4">
            <h3 className="text-slate-900 font-bold mb-4">Services</h3>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s.label}>
                  <Link
                    href={s.href}
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors"
                  >
                    <i className="fa-solid fa-arrow-up-right-from-square text-[10px] opacity-70" />
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mini contact card */}
            <div className="mt-6 p-[1.5px] rounded-2xl bg-gradient-to-tr from-blue-500/20 via-purple-500/20 to-cyan-500/20">
              <div className="rounded-2xl bg-white/80 backdrop-blur-md p-4 border border-white/40">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 grid place-items-center border border-blue-100">
                    <i className="fa-solid fa-paper-plane text-blue-600" />
                  </div>
                  <div className="text-sm">
                    <div className="text-slate-900 font-semibold">Ada ide proyek?</div>
                    <p className="text-slate-500 text-xs">
                      Kirim detailnya—aku akan balas secepatnya.
                    </p>
                    <Link
                      href="/contact"
                      className="mt-2.5 inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-1.5 text-xs text-white hover:bg-black hover:shadow-md transition-all"
                    >
                      Hubungi saya <i className="fa-solid fa-chevron-right text-[10px]" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col-reverse items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-slate-500">
            © {year} <span className="text-slate-800 font-medium">Abdul Kader</span>. All rights reserved.
          </p>

          <div className="flex items-center gap-4 text-sm text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <i className="fa-brands fa-react text-blue-500 animate-spin-slow" style={{ animationDuration: '10s' }} /> Built with Next.js & Tailwind CSS
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
