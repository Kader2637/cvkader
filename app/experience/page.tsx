"use client";

import { useEffect } from "react";

export default function Experience() {
  // reveal animation on scroll (fadeUp) persis behavior HTML
  useEffect(() => {
    const elements = document.querySelectorAll("#experience .relative.flex");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting)
            entry.target.classList.add("animate-fadeUp");
        });
      },
      { threshold: 0.2 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      id="experience"
      className="page relative overflow-hidden bg-gradient-to-br from-gray-50 to-white py-10"
    >
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -top-24 left-0 w-72 h-72 rounded-full bg-gradient-to-br from-blue-200 to-purple-200 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-gradient-to-tr from-cyan-200 to-indigo-200 blur-3xl"></div>
      </div>

      <section className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="max-w-3xl mx-auto text-center mb-20">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 ring-1 ring-blue-100">
            <span className="size-2 rounded-full bg-blue-500 animate-pulse"></span>{" "}
            Experience
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">
            Professional Journey
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Jejak karier saya membangun produk dan tim yang berdampak besar
            untuk bisnis dan pengguna.
          </p>
        </header>

        <div className="relative before:absolute before:inset-y-0 before:left-1/2 before:w-0.5 before:-translate-x-1/2 before:bg-gradient-to-b from-blue-500 via-purple-400 to-cyan-400">
          <div className="space-y-20">
            {/* Item 1 */}
            <div className="relative flex flex-col lg:flex-row items-center gap-10">
              <div className="w-full lg:w-1/2 lg:pr-12 text-right order-2 lg:order-1">
                <h3 className="text-2xl font-bold text-gray-900">
                  Lead Full-Stack Engineer
                </h3>
                <p className="text-blue-600 font-semibold mb-1">
                  TechVision Solutions · Jakarta
                </p>
                <p className="text-gray-500 text-sm mb-3">
                  Jan 2022 — Sekarang
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Memimpin pengembangan platform SaaS enterprise untuk 200k+
                  user. Membangun arsitektur microservices, CI/CD pipeline, dan
                  observability system.
                </p>
                <ul className="mt-3 text-sm text-gray-600 space-y-1">
                  <li>• Docker, Kubernetes, AWS ECS deployment</li>
                  <li>
                    • Mentoring 8 developer & improving code review process
                  </li>
                  <li>• Observability: Prometheus, Grafana, ELK Stack</li>
                </ul>
                <div className="mt-3 flex flex-wrap justify-end gap-2">
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                    React
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                    Node.js
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                    Kubernetes
                  </span>
                </div>
              </div>

              <div className="relative z-10 order-1 lg:order-2">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg">
                  <i className="fa-solid fa-rocket"></i>
                </div>
              </div>

              <div className="w-full lg:w-1/2 order-3 lg:order-3">
                <div className="p-[1.5px] rounded-2xl bg-gradient-to-tr from-blue-500/50 via-purple-500/50 to-cyan-500/50">
                  <div className="rounded-2xl bg-white/80 backdrop-blur-xl p-5 shadow-lg hover:-translate-y-1 transition">
                    <img
                      src="https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=900&h=600&fit=crop"
                      className="rounded-xl w-full h-56 object-cover"
                      alt="TechVision Solutions"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Item 2 */}
            <div className="relative flex flex-col lg:flex-row items-center gap-10">
              <div className="w-full lg:w-1/2 lg:pl-12 order-2">
                <h3 className="text-2xl font-bold text-gray-900">
                  Full-Stack Developer
                </h3>
                <p className="text-purple-600 font-semibold mb-1">
                  Digital Innovators Inc · Singapore
                </p>
                <p className="text-gray-500 text-sm mb-3">
                  Mar 2020 — Dec 2021
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Mengembangkan e-commerce platform bertrafik tinggi dan
                  dashboard analitik real-time yang mendorong revenue tahunan
                  +$2.5M.
                </p>
                <ul className="mt-3 text-sm text-gray-600 space-y-1">
                  <li>• Real-time dashboard (1M+ events/day)</li>
                  <li>• Optimisasi DB query: response time −65%</li>
                  <li>• Integrasi 8+ payment gateway</li>
                </ul>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                    Vue.js
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                    MongoDB
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                    Docker
                  </span>
                </div>
              </div>

              <div className="relative z-10">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg">
                  <i className="fa-solid fa-code"></i>
                </div>
              </div>

              <div className="w-full lg:w-1/2 order-1 lg:order-1 lg:pr-12">
                <div className="p-[1.5px] rounded-2xl bg-gradient-to-tr from-purple-500/50 via-pink-500/50 to-blue-500/50">
                  <div className="rounded-2xl bg-white/80 backdrop-blur-xl p-5 shadow-lg hover:-translate-y-1 transition">
                    <img
                      src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=900&h=600&fit=crop"
                      className="rounded-xl w-full h-56 object-cover"
                      alt="Digital Innovators"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Item 3 */}
            <div className="relative flex flex-col lg:flex-row items-center gap-10">
              <div className="w-full lg:w-1/2 lg:pr-12 text-right order-2 lg:order-1">
                <h3 className="text-2xl font-bold text-gray-900">
                  Frontend Developer
                </h3>
                <p className="text-emerald-600 font-semibold mb-1">
                  Startup Hub Indonesia · Jakarta
                </p>
                <p className="text-gray-500 text-sm mb-3">
                  Jun 2018 — Feb 2020
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Mengembangkan lebih dari 12 MVP startup hingga skala 50k+
                  pengguna dengan UI yang cepat, ringan, dan SEO-friendly.
                </p>
                <ul className="mt-3 text-sm text-gray-600 space-y-1">
                  <li>• React + Tailwind untuk front-end modern</li>
                  <li>• SEO improvement → traffic +180%</li>
                  <li>• Implementasi design system reusable</li>
                </ul>
                <div className="mt-3 flex flex-wrap justify-end gap-2">
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                    React
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                    Tailwind CSS
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                    Git
                  </span>
                </div>
              </div>

              <div className="relative z-10 order-1 lg:order-2">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg">
                  <i className="fa-solid fa-laptop-code"></i>
                </div>
              </div>

              <div className="w-full lg:w-1/2 order-3 lg:order-3">
                <div className="p-[1.5px] rounded-2xl bg-gradient-to-tr from-emerald-500/50 via-teal-500/50 to-cyan-500/50">
                  <div className="rounded-2xl bg-white/80 backdrop-blur-xl p-5 shadow-lg hover:-translate-y-1 transition">
                    <img
                      src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=900&h=600&fit=crop"
                      className="rounded-xl w-full h-56 object-cover"
                      alt="Startup Hub"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* keyframes fadeUp */}
      <style jsx>{`
        @keyframes fadeUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeUp {
          animation: fadeUp 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
