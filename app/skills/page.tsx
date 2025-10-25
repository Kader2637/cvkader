"use client";

import { useEffect } from "react";

export default function Skills() {
  useEffect(() => {
    // Filter kategori skills
    const buttons = document.querySelectorAll<HTMLButtonElement>(
      "#skills .skill-filter"
    );
    const cards = document.querySelectorAll<HTMLElement>("#skills .skill-card");
    buttons.forEach((btn) => {
      const onClick = () => {
        buttons.forEach((b) => {
          b.classList.remove("bg-gray-900", "text-white");
          b.classList.add("bg-gray-100");
        });
        btn.classList.add("bg-gray-900", "text-white");
        btn.classList.remove("bg-gray-100");
        const f = btn.dataset.filter!;
        cards.forEach((c) => {
          const show = f === "all" || c.dataset.cat!.includes(f);
          (c as HTMLElement).style.display = show ? "" : "none";
        });
      };
      btn.addEventListener("click", onClick);
    });

    // Progress bar animation
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.querySelectorAll<HTMLElement>(".bar-fill").forEach((b) => {
              const v = parseInt(b.dataset.value || "0", 10) || 0;
              b.style.width = v + "%";
              b.style.transition = "width .8s ease-out";
            });
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    document
      .querySelectorAll("#skills .skill-card")
      .forEach((card) => io.observe(card));
    // ====== REVEAL ON SCROLL (Web Animations API, lebih “kerasa”) ======
    const revealNodes = new Set<HTMLElement>();

    // header + filter area + paragraf/keterangan opsional
    document
      .querySelectorAll<HTMLElement>(
        "#skills [data-reveal], #skills header, #skills .filters-wrap"
      )
      .forEach((el) => revealNodes.add(el));

    // semua kartu (stagger otomatis)
    document
      .querySelectorAll<HTMLElement>("#skills .skill-card")
      .forEach((el, idx) => {
        el.dataset.delay = String(70 * (idx % 8)); // 0..490ms per baris
        revealNodes.add(el);
      });

    // SESUDAH (fix: el dipastikan HTMLElement, hilang error "style on never")
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
                easing: "cubic-bezier(.22,1,.36,1)", // smooth decel
                delay,
                fill: "forwards",
              }
            );
          } else {
            const node = el as HTMLElement; // pastikan tipe bukan 'never'
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

    return () => io.disconnect();
  }, []);

  return (
    <div id="skills" className="page relative overflow-hidden bg-white py-10">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -top-24 -left-16 w-72 h-72 rounded-full bg-gradient-to-tr from-blue-200 to-purple-200 blur-3xl"></div>
        <div className="absolute -bottom-28 -right-20 w-80 h-80 rounded-full bg-gradient-to-tr from-cyan-200 to-indigo-200 blur-3xl"></div>
      </div>

      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 ring-1 ring-blue-100">
            <span className="size-2 rounded-full bg-blue-500 animate-pulse"></span>{" "}
            Skills
          </span>
        </header>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <button
            className="skill-filter px-4 py-2 rounded-full text-sm font-medium bg-gray-900 text-white"
            data-filter="all"
          >
            All
          </button>
          <button
            className="skill-filter px-4 py-2 rounded-full text-sm font-medium bg-gray-100 hover:bg-gray-200"
            data-filter="frontend"
          >
            Frontend
          </button>
          <button
            className="skill-filter px-4 py-2 rounded-full text-sm font-medium bg-gray-100 hover:bg-gray-200"
            data-filter="backend"
          >
            Backend
          </button>
          <button
            className="skill-filter px-4 py-2 rounded-full text-sm font-medium bg-gray-100 hover:bg-gray-200"
            data-filter="mobile"
          >
            Mobile
          </button>
          <button
            className="skill-filter px-4 py-2 rounded-full text-sm font-medium bg-gray-100 hover:bg-gray-200"
            data-filter="cloud"
          >
            Cloud/DevOps
          </button>
          <button
            className="skill-filter px-4 py-2 rounded-full text-sm font-medium bg-gray-100 hover:bg-gray-200"
            data-filter="data"
          >
            Data
          </button>
          <button
            className="skill-filter px-4 py-2 rounded-full text-sm font-medium bg-gray-100 hover:bg-gray-200"
            data-filter="tools"
          >
            Tools
          </button>
        </div>

        {/* Logo Wall (copy struktur dari HTML) */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* LARAVEL */}
          <div
            className="skill-card group p-[1.5px] rounded-2xl bg-gradient-to-tr from-red-500/40 via-rose-500/40 to-orange-500/40"
            data-cat="backend"
          >
            <div className="rounded-2xl bg-white/80 backdrop-blur-xl p-5 shadow-sm hover:shadow-lg transition hover:-translate-y-1">
              <div className="flex items-center gap-4">
                <i className="devicon-laravel-plain colored text-4xl"></i>
                <div>
                  <div className="font-semibold text-gray-900">Laravel</div>
                  <div className="text-xs text-gray-500">
                    Backend • REST • Queues
                  </div>
                </div>
              </div>
              <div className="mt-4 skill-bar">
                <div className="flex justify-between text-xs text-gray-700">
                  <span>Proficiency</span>
                  <span>92%</span>
                </div>
                <div className="bar-container">
                  <div className="bar-fill" data-value="92"></div>
                </div>
              </div>
            </div>
          </div>

          {/* FRONTEND */}
          <div
            className="skill-card p-[1.5px] rounded-2xl bg-gradient-to-tr from-blue-500/30 via-purple-500/30 to-cyan-500/30"
            data-cat="frontend"
          >
            <div className="rounded-2xl bg-white/80 backdrop-blur-xl p-5 hover:-translate-y-1 hover:shadow-lg transition">
              <div className="flex items-center gap-4">
                <i className="devicon-react-original colored text-4xl"></i>
                <div>
                  <div className="font-semibold text-gray-900">
                    React / Next.js
                  </div>
                  <div className="text-xs text-gray-500">
                    SSR • ISR • Web Vitals
                  </div>
                </div>
              </div>
              <div className="mt-4 skill-bar">
                <div className="flex justify-between text-xs text-gray-700">
                  <span>Proficiency</span>
                  <span>95%</span>
                </div>
                <div className="bar-container">
                  <div className="bar-fill" data-value="95"></div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="skill-card p-[1.5px] rounded-2xl bg-gradient-to-tr from-blue-500/30 via-purple-500/30 to-cyan-500/30"
            data-cat="frontend"
          >
            <div className="rounded-2xl bg-white/80 backdrop-blur-xl p-5 hover:-translate-y-1 hover:shadow-lg transition">
              <div className="flex items-center gap-4">
                <i className="devicon-vuejs-plain colored text-4xl"></i>
                <div>
                  <div className="font-semibold text-gray-900">Vue / Nuxt</div>
                  <div className="text-xs text-gray-500">SPAs • SSR</div>
                </div>
              </div>
              <div className="mt-4 skill-bar">
                <div className="flex justify-between text-xs text-gray-700">
                  <span>Proficiency</span>
                  <span>88%</span>
                </div>
                <div className="bar-container">
                  <div className="bar-fill" data-value="88"></div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="skill-card p-[1.5px] rounded-2xl bg-gradient-to-tr from-blue-500/30 via-purple-500/30 to-cyan-500/30"
            data-cat="frontend"
          >
            <div className="rounded-2xl bg-white/80 backdrop-blur-xl p-5 hover:-translate-y-1 hover:shadow-lg transition">
              <div className="flex items-center gap-4">
                <i className="devicon-tailwindcss-plain colored text-4xl"></i>
                <div>
                  <div className="font-semibold text-gray-900">
                    Tailwind CSS
                  </div>
                  <div className="text-xs text-gray-500">
                    Design system • Responsive
                  </div>
                </div>
              </div>
              <div className="mt-4 skill-bar">
                <div className="flex justify-between text-xs text-gray-700">
                  <span>Proficiency</span>
                  <span>94%</span>
                </div>
                <div className="bar-container">
                  <div className="bar-fill" data-value="94"></div>
                </div>
              </div>
            </div>
          </div>

          {/* BACKEND */}
          <div
            className="skill-card p-[1.5px] rounded-2xl bg-gradient-to-tr from-amber-500/30 via-fuchsia-500/30 to-blue-500/30"
            data-cat="backend"
          >
            <div className="rounded-2xl bg-white/80 backdrop-blur-xl p-5 hover:-translate-y-1 hover:shadow-lg transition">
              <div className="flex items-center gap-4">
                <i className="devicon-nodejs-plain colored text-4xl"></i>
                <div>
                  <div className="font-semibold text-gray-900">
                    Node.js / Express
                  </div>
                  <div className="text-xs text-gray-500">REST • Workers</div>
                </div>
              </div>
              <div className="mt-4 skill-bar">
                <div className="flex justify-between text-xs text-gray-700">
                  <span>Proficiency</span>
                  <span>93%</span>
                </div>
                <div className="bar-container">
                  <div className="bar-fill" data-value="93"></div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="skill-card p-[1.5px] rounded-2xl bg-gradient-to-tr from-amber-500/30 via-fuchsia-500/30 to-blue-500/30"
            data-cat="backend"
          >
            <div className="rounded-2xl bg-white/80 backdrop-blur-xl p-5 hover:-translate-y-1 hover:shadow-lg transition">
              <div className="flex items-center gap-4">
                <i className="devicon-php-plain colored text-4xl"></i>
                <div>
                  <div className="font-semibold text-gray-900">PHP 8+</div>
                  <div className="text-xs text-gray-500">
                    Modern PHP • Laravel-ready
                  </div>
                </div>
              </div>
              <div className="mt-4 skill-bar">
                <div className="flex justify-between text-xs text-gray-700">
                  <span>Proficiency</span>
                  <span>90%</span>
                </div>
                <div className="bar-container">
                  <div className="bar-fill" data-value="90"></div>
                </div>
              </div>
            </div>
          </div>

          {/* MOBILE */}
          <div
            className="skill-card p-[1.5px] rounded-2xl bg-gradient-to-tr from-pink-500/30 via-purple-500/30 to-indigo-500/30"
            data-cat="mobile"
          >
            <div className="rounded-2xl bg-white/80 backdrop-blur-xl p-5 hover:-translate-y-1 hover:shadow-lg transition">
              <div className="flex items-center gap-4">
                <i className="devicon-react-original colored text-4xl"></i>
                <div>
                  <div className="font-semibold text-gray-900">
                    React Native
                  </div>
                  <div className="text-xs text-gray-500">iOS & Android</div>
                </div>
              </div>
              <div className="mt-4 skill-bar">
                <div className="flex justify-between text-xs text-gray-700">
                  <span>Proficiency</span>
                  <span>86%</span>
                </div>
                <div className="bar-container">
                  <div className="bar-fill" data-value="86"></div>
                </div>
              </div>
            </div>
          </div>

          {/* CLOUD/DEVOPS */}
          <div
            className="skill-card p-[1.5px] rounded-2xl bg-gradient-to-tr from-emerald-500/30 via-teal-500/30 to-cyan-500/30"
            data-cat="cloud"
          >
            <div className="rounded-2xl bg-white/80 backdrop-blur-xl p-5 hover:-translate-y-1 hover:shadow-lg transition">
              <div className="flex items-center gap-4">
                <i className="devicon-amazonwebservices-plain colored text-4xl"></i>
                <div>
                  <div className="font-semibold text-gray-900">AWS</div>
                  <div className="text-xs text-gray-500">
                    ECS/EKS • VPC • IAM
                  </div>
                </div>
              </div>
              <div className="mt-4 skill-bar">
                <div className="flex justify-between text-xs text-gray-700">
                  <span>Proficiency</span>
                  <span>92%</span>
                </div>
                <div className="bar-container">
                  <div className="bar-fill" data-value="92"></div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="skill-card p-[1.5px] rounded-2xl bg-gradient-to-tr from-emerald-500/30 via-teal-500/30 to-cyan-500/30"
            data-cat="cloud"
          >
            <div className="rounded-2xl bg-white/80 backdrop-blur-xl p-5 hover:-translate-y-1 hover:shadow-lg transition">
              <div className="flex items-center gap-4">
                <i className="devicon-googlecloud-plain colored text-4xl"></i>
                <div>
                  <div className="font-semibold text-gray-900">
                    Google Cloud
                  </div>
                  <div className="text-xs text-gray-500">
                    GKE • Cloud Run • Pub/Sub
                  </div>
                </div>
              </div>
              <div className="mt-4 skill-bar">
                <div className="flex justify-between text-xs text-gray-700">
                  <span>Proficiency</span>
                  <span>90%</span>
                </div>
                <div className="bar-container">
                  <div className="bar-fill" data-value="90"></div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="skill-card p-[1.5px] rounded-2xl bg-gradient-to-tr from-emerald-500/30 via-teal-500/30 to-cyan-500/30"
            data-cat="cloud"
          >
            <div className="rounded-2xl bg-white/80 backdrop-blur-xl p-5 hover:-translate-y-1 hover:shadow-lg transition">
              <div className="flex items-center gap-4">
                <i className="devicon-docker-plain colored text-4xl"></i>
                <div>
                  <div className="font-semibold text-gray-900">
                    Docker / Kubernetes
                  </div>
                  <div className="text-xs text-gray-500">
                    Images • Orchestration
                  </div>
                </div>
              </div>
              <div className="mt-4 skill-bar">
                <div className="flex justify-between text-xs text-gray-700">
                  <span>Proficiency</span>
                  <span>90%</span>
                </div>
                <div className="bar-container">
                  <div className="bar-fill" data-value="90"></div>
                </div>
              </div>
            </div>
          </div>

          {/* DATA */}
          <div
            className="skill-card p-[1.5px] rounded-2xl bg-gradient-to-tr from-indigo-500/30 via-sky-500/30 to-cyan-500/30"
            data-cat="data"
          >
            <div className="rounded-2xl bg-white/80 backdrop-blur-xl p-5 hover:-translate-y-1 hover:shadow-lg transition">
              <div className="flex items-center gap-4">
                <i className="devicon-postgresql-plain colored text-4xl"></i>
                <div>
                  <div className="font-semibold text-gray-900">PostgreSQL</div>
                  <div className="text-xs text-gray-500">
                    Schema • Perf • TX
                  </div>
                </div>
              </div>
              <div className="mt-4 skill-bar">
                <div className="flex justify-between text-xs text-gray-700">
                  <span>Proficiency</span>
                  <span>92%</span>
                </div>
                <div className="bar-container">
                  <div className="bar-fill" data-value="92"></div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="skill-card p-[1.5px] rounded-2xl bg-gradient-to-tr from-indigo-500/30 via-sky-500/30 to-cyan-500/30"
            data-cat="data"
          >
            <div className="rounded-2xl bg-white/80 backdrop-blur-xl p-5 hover:-translate-y-1 hover:shadow-lg transition">
              <div className="flex items-center gap-4">
                <i className="devicon-mongodb-plain colored text-4xl"></i>
                <div>
                  <div className="font-semibold text-gray-900">MongoDB</div>
                  <div className="text-xs text-gray-500">
                    Doc DB • Aggregation
                  </div>
                </div>
              </div>
              <div className="mt-4 skill-bar">
                <div className="flex justify-between text-xs text-gray-700">
                  <span>Proficiency</span>
                  <span>89%</span>
                </div>
                <div className="bar-container">
                  <div className="bar-fill" data-value="89"></div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="skill-card p-[1.5px] rounded-2xl bg-gradient-to-tr from-indigo-500/30 via-sky-500/30 to-cyan-500/30"
            data-cat="data"
          >
            <div className="rounded-2xl bg-white/80 backdrop-blur-xl p-5 hover:-translate-y-1 hover:shadow-lg transition">
              <div className="flex items-center gap-4">
                <i className="devicon-redis-plain colored text-4xl"></i>
                <div>
                  <div className="font-semibold text-gray-900">Redis</div>
                  <div className="text-xs text-gray-500">
                    Cache • Queue • Rate-limit
                  </div>
                </div>
              </div>
              <div className="mt-4 skill-bar">
                <div className="flex justify-between text-xs text-gray-700">
                  <span>Proficiency</span>
                  <span>90%</span>
                </div>
                <div className="bar-container">
                  <div className="bar-fill" data-value="90"></div>
                </div>
              </div>
            </div>
          </div>

          {/* TOOLS */}
          <div
            className="skill-card p-[1.5px] rounded-2xl bg-gradient-to-tr from-slate-500/30 via-gray-500/30 to-zinc-500/30"
            data-cat="tools"
          >
            <div className="rounded-2xl bg-white/80 backdrop-blur-xl p-5 hover:-translate-y-1 hover:shadow-lg transition">
              <div className="flex items-center gap-4">
                <i className="devicon-git-plain colored text-4xl"></i>
                <div>
                  <div className="font-semibold text-gray-900">
                    Git (GitHub/GitLab)
                  </div>
                  <div className="text-xs text-gray-500">
                    Flow • PR • Release
                  </div>
                </div>
              </div>
              <div className="mt-4 skill-bar">
                <div className="flex justify-between text-xs text-gray-700">
                  <span>Proficiency</span>
                  <span>96%</span>
                </div>
                <div className="bar-container">
                  <div className="bar-fill" data-value="96"></div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="skill-card p-[1.5px] rounded-2xl bg-gradient-to-tr from-slate-500/30 via-gray-500/30 to-zinc-500/30"
            data-cat="tools"
          >
            <div className="rounded-2xl bg-white/80 backdrop-blur-xl p-5 hover:-translate-y-1 hover:shadow-lg transition">
              <div className="flex items-center gap-4">
                <i className="devicon-githubactions-plain colored text-4xl"></i>
                <div>
                  <div className="font-semibold text-gray-900">CI/CD</div>
                  <div className="text-xs text-gray-500">
                    GitHub Actions • Jenkins
                  </div>
                </div>
              </div>
              <div className="mt-4 skill-bar">
                <div className="flex justify-between text-xs text-gray-700">
                  <span>Proficiency</span>
                  <span>87%</span>
                </div>
                <div className="bar-container">
                  <div className="bar-fill" data-value="87"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          * Nilai persentase bersifat indikatif kemampuan kerja harian.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="/portfolio"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-700 text-white font-medium hover:from-blue-700 hover:to-purple-800 transition"
          >
            <i className="fa-solid fa-briefcase"></i> Lihat Portfolio
          </a>
          <a
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-gray-300 text-gray-800 hover:border-blue-500 hover:text-blue-600 transition"
          >
            <i className="fa-solid fa-paper-plane"></i> Diskusi Proyek
          </a>
        </div>
      </section>
    </div>
  );
}
