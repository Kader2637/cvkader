"use client";

import { useEffect, useState } from "react";
import BackToTop from "./components/BackToTop";
import UseRevealOnScroll from "./components/UseRevealOnScroll";
import VideoIntro from "./components/VideoIntro";

export default function Page() {
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    // Event delegation: aman untuk Next/StrictMode
    const onClick = async (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;

      // Toggle show/hide code blocks
      const togBtn = t.closest(".course-toggle") as HTMLButtonElement | null;
      if (togBtn) {
        const targetSel = togBtn.getAttribute("data-target") || "";
        const code = document.querySelector<HTMLElement>(targetSel);
        if (!code) return;
        const hidden = code.classList.toggle("hidden");
        togBtn.textContent = hidden ? "Show" : "Hide";
        return;
      }

      // Copy code to clipboard
      const copyBtn = t.closest(".course-copy") as HTMLButtonElement | null;
      if (copyBtn) {
        const targetSel = copyBtn.getAttribute("data-target") || "";
        const code = document.querySelector<HTMLElement>(targetSel);
        if (!code) return;
        const text = code.innerText.trim();
        try {
          await navigator.clipboard.writeText(text);
          copyBtn.textContent = "Copied!";
          setTimeout(() => (copyBtn.textContent = "Copy"), 1200);
        } catch {
          copyBtn.textContent = "Failed";
          setTimeout(() => (copyBtn.textContent = "Copy"), 1200);
        }
        return;
      }
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <>
      <VideoIntro onFinish={() => setIntroDone(true)} />

      {/* Fade-in container kecil untuk transisi awal setelah intro */}
      <div
        className={`transition-all duration-700 ease-out ${
          introDone ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
        }`}
      ></div>

      {/* Observer untuk efek reveal */}
      <UseRevealOnScroll />

      {/* === HERO === */}
      <section
        className={`relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden ${
          introDone ? "hero-animate" : ""
        }`}
      >
        {/* Background Elements (non-interaktif biar gak nutup klik) */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply blur-xl opacity-20 animate-float" />
          <div
            className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply blur-xl opacity-20 animate-float"
            style={{ animationDelay: "2s" }}
          />
          <div
            className="absolute -bottom-8 left-20 w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply blur-xl opacity-20 animate-float"
            style={{ animationDelay: "4s" }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Text */}
            <div className="text-center lg:text-left animate-slide-in-left" data-reveal>
              <div className="inline-flex items-center px-4 py-2 bg-white/70 backdrop-blur rounded-full text-sm font-medium text-blue-800 ring-1 ring-blue-100 mb-6">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />{" "}
                Available for New Projects
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
                Abdul Kader{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Senior Developer
                </span>{" "}
                Jawa Timur
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
                Full Stack Developer &amp; Solution Architect (7+ yrs) — web, mobile, dan cloud. Fokus
                kecepatan rilis, keamanan, dan impact bisnis.
              </p>

              {/* Buttons wrapper — INI yang sebelumnya belum ditutup */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a
                  href="#services"
                  className="inline-flex items-center px-7 py-4 bg-gray-900 text-white font-medium rounded-xl shadow-lg hover:bg-black transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  <i className="fas fa-rocket mr-2" /> View My Work
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-700 text-white font-medium rounded-lg shadow-lg hover:from-blue-700 hover:to-purple-800 transform hover:scale-105 transition"
                >
                  <i className="fa-solid fa-paper-plane mr-2" /> Collaborate
                </a>
              </div>
              {/* <-- TERTUTUP sekarang */}

              {/* Stats */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-6 mt-12">
                <div
                  className="min-w-[120px] text-center rounded-xl bg-white/70 backdrop-blur ring-1 ring-gray-200 p-4"
                  data-reveal
                  data-reveal-delay="0.05s"
                >
                  <div className="text-3xl font-extrabold text-gray-900">7+</div>
                  <div className="text-xs text-gray-600">Years Experience</div>
                </div>
                <div
                  className="min-w-[120px] text-center rounded-xl bg-white/70 backdrop-blur ring-1 ring-gray-200 p-4"
                  data-reveal
                  data-reveal-delay="0.1s"
                >
                  <div className="text-3xl font-extrabold text-gray-900">100+</div>
                  <div className="text-xs text-gray-600">Projects Done</div>
                </div>
                <div
                  className="min-w-[120px] text-center rounded-xl bg-white/70 backdrop-blur ring-1 ring-gray-200 p-4"
                  data-reveal
                  data-reveal-delay="0.15s"
                >
                  <div className="text-3xl font-extrabold text-gray-900">50+</div>
                  <div className="text-xs text-gray-600">Happy Clients</div>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative animate-slide-in-right" data-reveal data-reveal-delay="0.1s">
              <div className="relative mx-auto lg:mx-0 w-80 h-80 lg:w-[420px] lg:h-[420px]">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 rounded-3xl rotate-6 opacity-20" />
                <div className="relative bg-white rounded-3xl p-3 shadow-2xl -rotate-2 hover:rotate-0 transition-transform duration-500">
                  <div className="relative rounded-2xl overflow-hidden">
                    <img
                      src="/assets/foto/i'm.jpg"
                      alt="Abdul Kader"
                      className="w-full h-full object-cover rounded-2xl"
                    />
                    <span className="absolute right-3 bottom-3 w-3.5 h-3.5 bg-emerald-500 rounded-full ring-4 ring-white" />
                  </div>
                </div>
                {/* Badge bulat “lompat” */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-lg animate-bounce-slow">
                  <i className="fas fa-code text-2xl" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center text-white shadow-lg animate-float">
                  <i className="fas fa-laptop text-xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === SERVICES === */}
      <section id="services" className="py-20 bg-white" data-reveal>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-slide-up" data-reveal>
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
              What I Do
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Services &amp; Expertise</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive digital solutions from concept to deployment
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "fa-code",
                title: "Web Development",
                desc:
                  "Modern, responsive websites and web applications using React, Next.js, Vue.js, and Node.js with focus on performance and SEO.",
                items: ["• Frontend Development", "• Backend API Development", "• Database Design", "• Performance Optimization"],
                grad: "from-blue-500 to-cyan-500",
                delay: "0.1s",
              },
              {
                icon: "fa-mobile-alt",
                title: "Mobile Development",
                desc: "Cross-platform mobile applications using React Native and Flutter. Native iOS and Android development when needed.",
                items: ["• React Native Apps", "• Flutter Development", "• App Store Deployment", "• Push Notifications"],
                grad: "from-purple-500 to-pink-500",
                delay: "0.2s",
              },
              {
                icon: "fa-cloud",
                title: "Cloud Solutions",
                desc:
                  "Scalable cloud infrastructure on AWS, Google Cloud, and Azure. DevOps, CI/CD, and containerization with Docker & Kubernetes.",
                items: ["• AWS/GCP/Azure Setup", "• Docker & Kubernetes", "• CI/CD Pipelines", "• Monitoring & Logging"],
                grad: "from-green-500 to-teal-500",
                delay: "0.3s",
              },
              {
                icon: "fa-paint-brush",
                title: "UI/UX Design",
                desc:
                  "User-centered design approach with wireframing, prototyping, and visual design using Figma, Adobe XD, and design systems.",
                items: ["• User Research & Testing", "• Wireframing & Prototyping", "• Design Systems", "• Responsive Design"],
                grad: "from-orange-500 to-red-500",
                delay: "0.4s",
              },
              {
                icon: "fa-database",
                title: "Data Solutions",
                desc:
                  "Database design, data analytics, business intelligence dashboards, and machine learning integration for data-driven insights.",
                items: ["• Database Architecture", "• Analytics Dashboards", "• Data Visualization", "• API Integration"],
                grad: "from-indigo-500 to-purple-500",
                delay: "0.5s",
              },
              {
                icon: "fa-cogs",
                title: "Technical Consulting",
                desc:
                  "Strategic technology consulting, code reviews, architecture planning, and team mentoring for optimal development practices.",
                items: ["• Technology Strategy", "• Code Reviews", "• Team Mentoring", "• Best Practices"],
                grad: "from-yellow-500 to-orange-500",
                delay: "0.6s",
              },
            ].map((c, i) => (
              <div
                key={i}
                className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 animate-slide-up"
                style={{ animationDelay: c.delay }}
                data-reveal
                data-reveal-delay={c.delay}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${c.grad} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <i className={`fas ${c.icon} text-2xl text-white`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{c.title}</h3>
                <p className="text-gray-600 mb-4">{c.desc}</p>
                <ul className="text-sm text-gray-500 space-y-1">
                  {c.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === FEATURES === */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-purple-50" data-reveal>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-slide-in-left" data-reveal>
              <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
                Why Choose Me
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Delivering Excellence in Every Project</h2>
              <p className="text-lg text-gray-600 mb-8">
                I combine technical expertise with business acumen to deliver solutions that not only work flawlessly but also drive real
                business value.
              </p>

              <div className="space-y-6">
                {[
                  {
                    icon: "fa-gauge-high",
                    title: "Performance First",
                    text: "Core Web Vitals hijau, caching pintar, dan time-to-first-byte rendah.",
                    bg: "bg-blue-100",
                    color: "text-blue-600",
                  },
                  {
                    icon: "fa-shield-halved",
                    title: "Security by Design",
                    text: "OWASP best practices, OAuth2/OIDC, rate-limit, dan audit trail.",
                    bg: "bg-purple-100",
                    color: "text-purple-600",
                  },
                  {
                    icon: "fa-diagram-project",
                    title: "Scalable Architecture",
                    text: "Microservices, autoscaling, observability menyeluruh.",
                    bg: "bg-green-100",
                    color: "text-green-600",
                  },
                ].map((f, idx) => (
                  <div className="flex items-start space-x-4" key={f.title} data-reveal data-reveal-delay={`${0.05 * (idx + 1)}s`}>
                    <div className={`flex-shrink-0 w-12 h-12 ${f.bg} rounded-xl flex items-center justify-center`}>
                      <i className={`fas ${f.icon} ${f.color} text-xl`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{f.title}</h3>
                      <p className="text-gray-600">{f.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative animate-slide-in-right" data-reveal data-reveal-delay="0.1s">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-white p-6 rounded-2xl shadow-lg transform rotate-3 hover:rotate-0 transition-transform" data-reveal>
                    <div className="text-3xl font-bold text-blue-600 mb-2">99.9%</div>
                    <div className="text-sm text-gray-600">Uptime Achieved</div>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-lg transform -rotate-2 hover:rotate-0 transition-transform" data-reveal data-reveal-delay="0.1s">
                    <div className="text-3xl font-bold text-purple-600 mb-2">2.5s</div>
                    <div className="text-sm text-gray-600">Avg Load Time</div>
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="bg-white p-6 rounded-2xl shadow-lg transform -rotate-3 hover:rotate-0 transition-transform" data-reveal data-reveal-delay="0.15s">
                    <div className="text-3xl font-bold text-green-600 mb-2">A+</div>
                    <div className="text-sm text-gray-600">Security Grade</div>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-lg transform rotate-2 hover:rotate-0 transition-transform" data-reveal data-reveal-delay="0.2s">
                    <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
                    <div className="text-sm text-gray-600">Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === RECENT WORK === */}
      <section className="py-20 bg-gray-50" data-reveal>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-slide-up" data-reveal>
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
              Recent Work
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">A showcase of recent successful projects and solutions</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                grad: "from-blue-400 to-purple-500",
                icon: "fa-shopping-cart",
                tag: "E-Commerce",
                title: "Multi-Vendor Marketplace",
                desc: "Complete marketplace solution with vendor management, payment processing, and analytics dashboard.",
                tech: ["React", "Node.js", "PostgreSQL"],
                delay: "0.1s",
              },
              {
                grad: "from-green-400 to-teal-500",
                icon: "fa-chart-line",
                tag: "Analytics",
                title: "Real-time Dashboard",
                desc: "Business intelligence dashboard with real-time data visualization and automated reporting.",
                tech: ["Vue.js", "Python", "MongoDB"],
                delay: "0.2s",
              },
              {
                grad: "from-purple-400 to-pink-500",
                icon: "fa-mobile-alt",
                tag: "Mobile App",
                title: "Health & Fitness App",
                desc: "Cross-platform mobile app with workout tracking, nutrition planning, and social features.",
                tech: ["React Native", "Firebase", "GraphQL"],
                delay: "0.3s",
              },
            ].map((p, i) => (
              <div
                key={i}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 animate-slide-up"
                style={{ animationDelay: p.delay }}
                data-reveal
                data-reveal-delay={p.delay}
              >
                <div className={`aspect-[16/9] bg-gradient-to-r ${p.grad} p-8 flex items-center justify-center`}>
                  <i className={`fas ${p.icon} text-4xl text-white`} />
                </div>
                <div className="p-6">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full mb-3">
                    {p.tag}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{p.title}</h3>
                  <p className="text-gray-600 mb-4">{p.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {p.tech.map((t) => (
                      <span key={t} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                  <a href="/portfolio" className="text-blue-600 font-medium hover:text-blue-800 transition-colors">
                    View Details →
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12" data-reveal>
            <a
              href="/portfolio"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200"
            >
              <i className="fas fa-briefcase mr-2" /> View All Projects
            </a>
          </div>
        </div>
      </section>

      {/* === COURSE HIGHLIGHTS === */}
      <section id="course" className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden" data-reveal>
        <div className="pointer-events-none absolute inset-0 opacity-50">
          <div className="absolute -top-24 -left-16 w-72 h-72 rounded-full bg-gradient-to-tr from-blue-200 to-purple-200 blur-3xl" />
          <div className="absolute -bottom-28 -right-20 w-80 h-80 rounded-full bg-gradient-to-tr from-cyan-200 to-indigo-200 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14" data-reveal>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 ring-1 ring-blue-200">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" /> Course Highlights
            </span>
            <h2 className="mt-4 text-3xl lg:text-4xl font-bold text-gray-900">Quick Tutorials: Laravel, React, Next.js</h2>
            <p className="mt-3 text-lg text-gray-600">Starter ringkas biar kamu langsung ngoding &amp; paham alur dasarnya.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* LARAVEL */}
            <article className="group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-xl border border-gray-100 shadow-lg hover:-translate-y-1 hover:shadow-2xl transition" data-reveal data-reveal-delay="0.1s">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-red-500 to-orange-500 text-white">
                    <i className="fab fa-laravel" />
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Laravel — Route → Controller → View</h3>
                    <p className="text-sm text-gray-500">PHP 8+, Artisan</p>
                  </div>
                </div>

                <div className="rounded-xl border border-gray-200 overflow-hidden">
                  <div className="flex items-center justify-between px-3 py-2 bg-gray-50">
                    <span className="text-xs font-medium text-gray-600">Snippet</span>
                    <div className="flex gap-2">
                      <button className="course-toggle text-xs px-2 py-1 rounded-md border border-gray-200 hover:bg-white" data-target="#code-laravel">
                        Show
                      </button>
                      <button className="course-copy text-xs px-2 py-1 rounded-md border border-gray-200 hover:bg-white" data-target="#code-laravel">
                        Copy
                      </button>
                    </div>
                  </div>
                  <pre id="code-laravel" className="course-code hidden p-4 bg-gray-900 text-gray-100 text-xs leading-relaxed overflow-x-auto">
                    <code>
                      {String.raw`// routes/web.php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HelloController;

Route::get('/', [HelloController::class, 'index']);

// app/Http/Controllers/HelloController.php
namespace App\Http\Controllers;
class HelloController extends Controller {
  public function index() {
    return view('hello', ['name' => 'Abdul']);
  }
}

// resources/views/hello.blade.php
<!DOCTYPE html>
<html>
  <body>
    <h1>Hello, {{ $name }} 👋</h1>
  </body>
</html>`}
                    </code>
                  </pre>
                </div>
              </div>
            </article>

            {/* REACT */}
            <article className="group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-xl border border-gray-100 shadow-lg hover:-translate-y-1 hover:shadow-2xl transition" data-reveal data-reveal-delay="0.2s">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-cyan-500 text-white">
                    <i className="fab fa-react" />
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">React — Counter Hooks</h3>
                    <p className="text-sm text-gray-500">Vite/CRA • useState</p>
                  </div>
                </div>

                <div className="rounded-xl border border-gray-200 overflow-hidden">
                  <div className="flex items-center justify-between px-3 py-2 bg-gray-50">
                    <span className="text-xs font-medium text-gray-600">Snippet</span>
                    <div className="flex gap-2">
                      <button className="course-toggle text-xs px-2 py-1 rounded-md border border-gray-200 hover:bg-white" data-target="#code-react">
                        Show
                      </button>
                      <button className="course-copy text-xs px-2 py-1 rounded-md border border-gray-200 hover:bg-white" data-target="#code-react">
                        Copy
                      </button>
                    </div>
                  </div>
                  <pre id="code-react" className="course-code hidden p-4 bg-gray-900 text-gray-100 text-xs leading-relaxed overflow-x-auto">
                    <code>
                      {/* eslint-disable-next-line react/no-unescaped-entities */}
                      {`// src/App.jsx
import { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);
  return (
    <main style={{ fontFamily: 'Inter, system-ui', padding: 24 }}>
      <h1>Halo, Abdul 🚀</h1>
      <p>Counter sederhana pakai React Hooks.</p>
      <button onClick={() => setCount(count + 1)}>
        Klik saya: {count}
      </button>
    </main>
  );
}`}
                    </code>
                  </pre>
                </div>
              </div>
            </article>

            {/* NEXT.JS */}
            <article className="group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-xl border border-gray-100 shadow-lg hover:-translate-y-1 hover:shadow-2xl transition" data-reveal data-reveal-delay="0.3s">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white">
                    <i className="fas fa-code" />
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Next.js 14 — App Router + API Route</h3>
                    <p className="text-sm text-gray-500">SSR • Route Handler</p>
                  </div>
                </div>

                <div className="rounded-xl border border-gray-200 overflow-hidden">
                  <div className="flex items-center justify-between px-3 py-2 bg-gray-50">
                    <span className="text-xs font-medium text-gray-600">Snippet</span>
                    <div className="flex gap-2">
                      <button className="course-toggle text-xs px-2 py-1 rounded-md border border-gray-200 hover:bg-white" data-target="#code-next">
                        Show
                      </button>
                      <button className="course-copy text-xs px-2 py-1 rounded-md border border-gray-200 hover:bg-white" data-target="#code-next">
                        Copy
                      </button>
                    </div>
                  </div>
                  <pre id="code-next" className="course-code hidden p-4 bg-gray-900 text-gray-100 text-xs leading-relaxed overflow-x-auto">
                    <code>
                      {`// app/page.tsx
export default function Page() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Welcome, Abdul 👋</h1>
      <p>Starter Next.js dengan App Router.</p>
    </main>
  );
}

// app/api/hello/route.ts
export async function GET() {
  return Response.json({ ok: true, message: 'Hello from Next.js API!' });
}`}
                    </code>
                  </pre>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* === CTA (Light Theme) === */}
      <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden" data-reveal>
        <div className="max-w-4xl mx-auto text-center px-6 sm:px-8 lg:px-10 animate-slide-up" data-reveal>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6">Ready to Start Your Next Project?</h2>
          <p className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto">
            Let&apos;s discuss how I can help bring your ideas to life with cutting-edge technology and innovative solutions.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transform hover:scale-105 hover:shadow-lg transition-all duration-300"
            >
              <i className="fas fa-calendar mr-3" /> Schedule a Call
            </a>
            <a
              href="/portfolio"
              className="inline-flex items-center px-8 py-4 border-2 border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-600 hover:text-white transform hover:scale-105 hover:shadow-lg transition-all duration-300"
            >
              <i className="fas fa-eye mr-3" /> View Portfolio
            </a>
          </div>
        </div>

        {/* efek pencahayaan halus di background */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-200/30 to-transparent pointer-events-none"></div>
      </section>

      <BackToTop />
    </>
  );
}
