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
    <footer className="relative overflow-hidden bg-gray-950 text-gray-300">
      {/* background gradient glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-40">
        <div className="absolute -top-24 -left-16 w-72 h-72 rounded-full bg-gradient-to-tr from-blue-500/30 to-purple-600/30 blur-3xl" />
        <div className="absolute -bottom-28 -right-24 w-96 h-96 rounded-full bg-gradient-to-tr from-cyan-500/30 to-indigo-600/30 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-5">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src="/assets/foto/favicon.png"
                alt="Abdul Kader Logo"
                width={42}
                height={42}
                className="rounded-lg"
                priority
              />
              <span className="text-xl font-bold text-white tracking-wide">
                Abdul Kader
              </span>
            </Link>

            <p className="mt-5 max-w-md leading-relaxed text-gray-300">
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
                  className={`w-10 h-10 rounded-xl grid place-items-center bg-white/5 ring-1 ring-white/10 hover:ring-white/20 transition ${s.hover}`}
                >
                  <i className={`fa-${s.icon === "globe" ? "solid" : "brands"} fa-${s.icon} text-white`} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3">
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition"
                  >
                    <span className="size-1.5 rounded-full bg-white/20" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-4">
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s.label}>
                  <Link
                    href={s.href}
                    className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition"
                  >
                    <i className="fa-solid fa-arrow-up-right-from-square text-xs opacity-70" />
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mini contact card */}
            <div className="mt-6 p-[1.5px] rounded-2xl bg-gradient-to-tr from-blue-600/40 via-purple-600/40 to-cyan-500/40">
              <div className="rounded-2xl bg-gray-900/70 backdrop-blur p-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/5 grid place-items-center ring-1 ring-white/10">
                    <i className="fa-solid fa-paper-plane text-white" />
                  </div>
                  <div className="text-sm">
                    <div className="text-white font-medium">Ada ide proyek?</div>
                    <p className="text-gray-400">
                      Kirim detailnya—aku akan balas secepatnya.
                    </p>
                    <Link
                      href="/contact"
                      className="mt-2 inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm text-white ring-1 ring-white/10 hover:bg-white/15"
                    >
                      Hubungi saya <i className="fa-solid fa-chevron-right text-xs" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col-reverse items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-gray-400">
            © {year} <span className="text-gray-200">Abdul Kader</span>. All rights reserved.
          </p>

          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span className="inline-flex items-center gap-1">
              <i className="fa-brands fa-react" /> Built with Next.js & Tailwind CSS
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
