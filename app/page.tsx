"use client";

import { useEffect, useState } from "react";
import BackToTop from "./components/BackToTop";
import Link from "next/link";

export default function Page() {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [courseTab, setCourseTab] = useState<"laravel" | "react" | "next">("laravel");
  const [copied, setCopied] = useState(false);
  const [showExplain, setShowExplain] = useState(false);

  const roles = ["Programmer", "Fullstack Developer", "Project Manager"];

  const marqueeSkills = [
    { name: "Laravel", icon: <i className="devicon-laravel-plain colored text-2xl sm:text-3xl" /> },
    { name: "React", icon: <i className="devicon-react-original colored text-2xl sm:text-3xl" /> },
    { name: "Next.js", icon: <i className="devicon-nextjs-plain text-2xl sm:text-3xl text-slate-800" /> },
    { name: "Node.js", icon: <i className="devicon-nodejs-plain colored text-2xl sm:text-3xl" /> },
    { name: "Go", icon: <i className="devicon-go-plain colored text-2xl sm:text-3xl" /> },
    { name: "PHP 8", icon: <i className="devicon-php-plain colored text-2xl sm:text-3xl" /> },
    { name: "C# .NET", icon: <i className="devicon-dotnetcore-plain colored text-2xl sm:text-3xl" /> },
    { name: "MySQL", icon: <i className="devicon-mysql-plain colored text-2xl sm:text-3xl" /> },
    { name: "PostgreSQL", icon: <i className="devicon-postgresql-plain colored text-2xl sm:text-3xl" /> },
    { name: "Redis", icon: <i className="devicon-redis-plain colored text-2xl sm:text-3xl" /> },
    { name: "Docker", icon: <i className="devicon-docker-plain colored text-2xl sm:text-3xl" /> },
    { name: "AWS", icon: <i className="devicon-amazonwebservices-plain colored text-2xl sm:text-3xl" /> },
    { name: "Git", icon: <i className="devicon-git-plain colored text-2xl sm:text-3xl" /> },
    { name: "Figma", icon: <i className="devicon-figma-plain colored text-2xl sm:text-3xl" /> },
    { name: "IoT / MQTT", icon: <i className="fa-solid fa-microchip text-emerald-600 text-2xl sm:text-3xl" /> },
  ];

  const doubleSkills = [...marqueeSkills, ...marqueeSkills, ...marqueeSkills];

  useEffect(() => {
    const current = roles[index % roles.length];
    const speed = isDeleting ? 40 : 90;

    const typing = setTimeout(() => {
      setText((prev) =>
        isDeleting
          ? current.substring(0, prev.length - 1)
          : current.substring(0, prev.length + 1)
      );

      if (!isDeleting && text === current) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setIndex((prev) => prev + 1);
      }
    }, speed);

    return () => clearTimeout(typing);
  }, [text, isDeleting, index]);

  const snippets = {
    laravel: `// routes/web.php
use Illuminate\\Support\\Facades\\Route;
use App\\Http\\Controllers\\HelloController;

Route::get('/', [HelloController::class, 'index']);

// app/Http/Controllers/HelloController.php
namespace App\\Http\\Controllers;
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
</html>`,
    react: `// src/App.jsx
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
}`,
    next: `// app/page.tsx
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
  return Response.json({ ok: true, message: 'Hello from Next.js!' });
}`
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippets[courseTab]);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy text", err);
    }
  };

  return (
    <>
      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 lg:py-32">
        {/* Ambient background glows */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] bg-gradient-to-tr from-blue-300/15 to-indigo-300/10 rounded-full blur-3xl animate-float-slow" />
          <div
            className="absolute bottom-[10%] right-[5%] w-[450px] h-[450px] bg-gradient-to-br from-purple-300/15 to-pink-300/10 rounded-full blur-3xl animate-float-medium"
            style={{ animationDelay: "3s" }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Hero Text */}
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left hero-animate">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-blue-50/90 text-blue-700 border border-blue-100 shadow-sm backdrop-blur-md">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_0_4px_rgba(34,197,94,0.35)]" />{" "}
                Available for Projects
              </div>
              
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 leading-none tracking-tight">
                Hi, I&apos;m Abdul Kader <br />
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent animate-bg-move font-black block mt-3">
                  {text || "\u00A0"}
                  <span className="border-r-2 border-indigo-600 animate-pulse ml-1" />
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-655 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Full Stack Developer berpengalaman lebih dari 4 tahun membangun solusi web, mobile, serta integrasi sistem. Berfokus pada rilis cepat, keamanan sistem, dan dampak bisnis. Saat ini menjabat sebagai Founder AETHER NUSANTARA.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
                <Link
                  href="/portfolio"
                  className="group inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-slate-950 text-white font-bold rounded-2xl shadow-lg hover:bg-black transition-all hover:-translate-y-0.5 active:translate-y-0 text-sm"
                >
                  <i className="fas fa-briefcase text-xs transition-transform group-hover:translate-x-1" /> Lihat Portfolio
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-2xl shadow-lg hover:from-blue-700 hover:to-indigo-750 transition-all hover:-translate-y-0.5 active:translate-y-0 text-sm"
                >
                  <i className="fa-solid fa-paper-plane text-xs" /> Hubungi Saya
                </Link>
              </div>

              {/* Stats Row */}
              <div className="flex items-center justify-center lg:justify-start gap-8 pt-8 border-t border-slate-100 max-w-md mx-auto lg:mx-0">
                <div>
                  <span className="block text-3xl font-black text-slate-900 leading-none">4+</span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1.5 block">Years Exp</span>
                </div>
                <div className="h-8 w-[1px] bg-slate-250/50" />
                <div>
                  <span className="block text-3xl font-black text-slate-900 leading-none">25+</span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1.5 block">Projects</span>
                </div>
                <div className="h-8 w-[1px] bg-slate-250/50" />
                <div>
                  <span className="block text-3xl font-black text-slate-900 leading-none">10+</span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1.5 block">Clients</span>
                </div>
              </div>
            </div>

            {/* Right Column: Profile Photo in Elegant Asymmetrical Floating Frame */}
            <div className="lg:col-span-5 relative flex justify-center items-center">
              <div className="relative w-80 h-80 lg:w-[400px] lg:h-[400px] animate-float-medium">
                {/* Background glowing gradients */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-[2rem_4rem_2rem_4rem] rotate-6 opacity-40 blur-md" />
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400/20 to-indigo-500/20 rounded-[2rem_4rem_2rem_4rem] -rotate-3 opacity-40 blur-md" />
                
                {/* Photo glass panel */}
                <div className="relative w-full h-full bg-white/70 backdrop-blur-xl rounded-[2rem_4rem_2rem_4rem] p-4 shadow-xl border border-white/80">
                  <div className="relative w-full h-full rounded-[1.5rem_3.5rem_1.5rem_3.5rem] overflow-hidden bg-slate-50 border border-slate-100">
                    <img
                      src="/assets/foto/im.png"
                      alt="Abdul Kader"
                      className="w-full h-full object-cover rounded-[1.5rem_3.5rem_1.5rem_3.5rem] transition duration-700 hover:scale-105"
                    />
                    {/* Active Status Badge */}
                    <span className="absolute right-4 bottom-4 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-[9px] font-bold text-slate-800 shadow-sm border border-slate-100">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                      Online
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= INFINITE MARQUEE TECH TICKER ================= */}
      <div className="w-full overflow-hidden bg-white/40 backdrop-blur-md border-y border-slate-250/50 py-6 relative z-10" data-reveal>
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#fafbfc] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#fafbfc] to-transparent z-10 pointer-events-none" />
        
        <div className="w-full flex overflow-hidden">
          <div className="animate-infinite-marquee flex gap-16 items-center">
            {doubleSkills.map((tech, idx) => (
              <div key={idx} className="flex items-center gap-3.5 text-slate-700 font-bold text-xs sm:text-sm tracking-wider uppercase shrink-0">
                {tech.icon}
                <span>{tech.name}</span>
              </div>
            ))}
          </div>
        </div>

        <style dangerouslySetInnerHTML={{__html: `
          @keyframes marquee {
            0% { transform: translate3d(0, 0, 0); }
            100% { transform: translate3d(-33.3333%, 0, 0); }
          }
          .animate-infinite-marquee {
            display: flex;
            width: max-content;
            animation: marquee 30s linear infinite;
          }
        `}} />
      </div>

      {/* ================= SERVICES SECTION ================= */}
      <section id="services" className="py-24 relative overflow-hidden bg-slate-50/40 border-y border-slate-100" data-reveal>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-bold border border-blue-100 shadow-sm">
              Layanan &amp; Keahlian
            </span>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mt-4 tracking-tight">
              Apa yang Saya Lakukan
            </h2>
            <p className="text-slate-500 text-sm mt-2">
              Solusi digital berkualitas tinggi untuk menunjang performa dan pertumbuhan bisnis Anda.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "fa-code",
                title: "Web Development",
                desc: "Pengembangan web interaktif, cepat, dan SEO-friendly menggunakan Next.js, React, dan Laravel.",
                glow: "glow-blue",
                color: "text-blue-500",
                bg: "bg-blue-50 border-blue-100/60"
              },
              {
                icon: "fa-mobile-screen-button",
                title: "Mobile Development",
                desc: "Aplikasi mobile cross-platform berskala produksi yang responsif menggunakan React Native atau Flutter.",
                glow: "glow-purple",
                color: "text-purple-500",
                bg: "bg-purple-50 border-purple-100/60"
              },
              {
                icon: "fa-cloud-arrow-up",
                title: "Cloud & DevOps",
                desc: "Arsitektur server scalable di AWS/GCP, otomatisasi CI/CD pipelines, dan containerisasi (Docker/K8s).",
                glow: "glow-emerald",
                color: "text-emerald-500",
                bg: "bg-emerald-50 border-emerald-100/60"
              },
              {
                icon: "fa-compass-drafting",
                title: "UI/UX & System Design",
                desc: "Desain antarmuka modern di Figma dengan penekanan pada fungsionalitas dan kenyamanan navigasi.",
                glow: "glow-orange",
                color: "text-orange-500",
                bg: "bg-orange-50 border-orange-100/60"
              },
            ].map((c) => (
              <div
                key={c.title}
                className={`group p-6 rounded-3xl bg-white/70 backdrop-blur-md border border-slate-250 shadow-sm hover:shadow-md transition duration-300 ${c.glow}`}
              >
                <div className={`w-11 h-11 rounded-2xl ${c.bg} border ${c.color} flex items-center justify-center mb-5 group-hover:scale-105 transition`}>
                  <i className={`fas ${c.icon} text-lg`} />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {c.title}
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= WHY CHOOSE ME SECTION ================= */}
      <section className="py-24 relative overflow-hidden" data-reveal>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Interactive Stats Cards */}
            <div className="lg:col-span-5 order-last lg:order-first">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { percent: "90%", title: "Fast Response", desc: "Komunikasi aktif", color: "text-blue-600" },
                  { percent: "98%", title: "On Time", desc: "Siklus rilis teratur", color: "text-purple-600" },
                  { percent: "95%", title: "DX Satisfaction", desc: "Dokumentasi & kode rapi", color: "text-emerald-600" },
                  { percent: "24/7", title: "Active Support", desc: "Garansi SLA stabil", color: "text-orange-600" },
                ].map((item, idx) => (
                  <div
                    key={item.title}
                    className={`rounded-3xl bg-white/60 border border-slate-100 p-5 shadow-sm hover:shadow-md transition duration-350 ${idx % 2 === 1 ? 'mt-4' : ''}`}
                  >
                    <div className={`text-3xl font-black ${item.color} tracking-tight`}>
                      {item.percent}
                    </div>
                    <h4 className="text-xs font-bold text-slate-800 mt-2">{item.title}</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5 leading-tight">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Values & Text */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-block px-3 py-1.5 bg-purple-50 text-purple-700 rounded-full text-xs font-bold border border-purple-100 shadow-sm">
                Mengapa Memilih Saya
              </span>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Hasil Nyata Berdasarkan Data &amp; Kualitas
              </h2>
              <p className="text-slate-650 text-sm leading-relaxed">
                Setiap baris kode dirancang untuk memberikan kinerja optimal bagi pengguna sekaligus efisiensi pemeliharaan infrastruktur.
              </p>

              <div className="space-y-4 pt-4 border-t border-slate-100">
                {[
                  { icon: "fa-gauge-high", title: "Performa di Level Produk", text: "Mengoptimasi Web Vitals untuk loading instan, SEO ramah, dan retensi pengguna maksimal.", color: "text-blue-500", bg: "bg-blue-50 border-blue-100" },
                  { icon: "fa-shield-halved", title: "Keamanan Terintegrasi", text: "Implementasi standar keamanan OWASP, penanganan celah otentikasi, dan perlindungan SQL Injection.", color: "text-purple-500", bg: "bg-purple-50 border-purple-100" },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className={`w-10 h-10 rounded-xl ${item.bg} border ${item.color} flex items-center justify-center shrink-0`}>
                      <i className={`fas ${item.icon} text-base`} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 mb-1">{item.title}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= RECENT WORK (PORTFOLIO HIGHLIGHTS) ================= */}
      <section className="py-24 relative overflow-hidden bg-slate-50/40 border-t border-slate-100" data-reveal>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block px-3 py-1.5 bg-cyan-50 text-cyan-700 rounded-full text-xs font-bold border border-cyan-100 shadow-sm">
              Highlight Proyek
            </span>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mt-4 tracking-tight">
              Karya Pilihan Terbaik
            </h2>
            <p className="text-slate-500 text-sm mt-2">
              Proyek unggulan pilihan yang menampilkan performa stabil dan kualitas rekayasa sistem.
            </p>
          </div>

          {/* Staggered Portfolio Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            
            {/* Item 1: Wide Layout */}
            <div className="md:col-span-2 group rounded-3xl bg-white border border-slate-150 overflow-hidden shadow-sm hover:shadow-md transition duration-300 flex flex-col justify-between">
              <div className="aspect-[16/9] w-full overflow-hidden bg-slate-100 relative">
                <img
                  src="/assets/foto/travel.png"
                  alt="Travel Booking Landing"
                  className="w-full h-full object-cover group-hover:scale-102 transition duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-2.5 py-1 rounded-lg text-[9px] font-bold bg-white/95 text-slate-800 shadow-sm border border-slate-100 uppercase tracking-wide">
                    Travel / Landing Page
                  </span>
                </div>
              </div>
              
              <div className="p-6 lg:p-8 space-y-4">
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  Travel Booking Landing Page
                </h3>
                <p className="text-slate-550 text-xs sm:text-sm leading-relaxed">
                  Landing page pemesanan perjalanan interaktif dengan visual premium. Berfokus pada perolehan CTA konversi tinggi serta performa loading instan untuk mendukung SEO.
                </p>
                <div className="flex flex-wrap gap-1.5 border-t border-slate-100 pt-4">
                  {["Next.js", "Tailwind CSS", "Node.js"].map((t) => (
                    <span key={t} className="px-2 py-0.5 bg-slate-50 text-slate-500 text-[10px] font-bold rounded-lg border border-slate-100">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="pt-2">
                  <a
                    href="https://mytravel2637.netlify.app/paket"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800"
                  >
                    Kunjungi Website <i className="fa-solid fa-arrow-right text-[10px]" />
                  </a>
                </div>
              </div>
            </div>

            {/* Item 2: Tall Portrait Layout */}
            <div className="md:col-span-1 group rounded-3xl bg-white border border-slate-150 overflow-hidden shadow-sm hover:shadow-md transition duration-300 flex flex-col justify-between">
              <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100 relative shrink-0">
                <img
                  src="/assets/foto/game.png"
                  alt="Edu Game"
                  className="w-full h-full object-cover group-hover:scale-102 transition duration-500"
                />
              </div>
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-purple-600 transition-colors">
                    Quiz: Kuis Edukatif Interaktif
                  </h3>
                  <p className="text-slate-550 text-xs leading-relaxed">
                    Game kuis bertema bahasa, budaya, dan lingkungan. Memiliki papan skor langsung secara real-time yang didukung sinkronisasi state server database.
                  </p>
                </div>
                
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <div className="flex flex-wrap gap-1.5">
                    {["React", "Firebase", "Socket.IO"].map((t) => (
                      <span key={t} className="px-2 py-0.5 bg-slate-50 text-slate-500 text-[10px] font-bold rounded-lg border border-slate-100">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div>
                    <a
                      href="https://drive.google.com/file/d/1Liuvh_yqmua69AvoL4VDpavwjRI9nm52/view?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-600 hover:text-purple-800"
                    >
                      Lihat Demo Video <i className="fa-solid fa-arrow-right text-[10px]" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Item 3: Full Width Banner Layout */}
            <div className="md:col-span-3 group rounded-3xl bg-white border border-slate-150 overflow-hidden shadow-sm hover:shadow-md transition duration-300 p-6 lg:p-8 flex flex-col md:flex-row gap-6 items-center">
              <div className="w-full md:w-1/3 aspect-[16/10] overflow-hidden rounded-2xl bg-slate-100 relative shrink-0 border border-slate-200/40">
                <img
                  src="/assets/foto/greenguard.png"
                  alt="GreenGuard"
                  className="w-full h-full object-cover group-hover:scale-102 transition duration-500"
                />
              </div>

              <div className="flex-1 space-y-4">
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                  GreenGuard — Tree Hazard Monitoring &amp; Reporting
                </h3>
                <p className="text-slate-550 text-xs sm:text-sm leading-relaxed">
                  Sistem monitoring kerawanan pohon tumbang berbasis Internet of Things (IoT) dan sensor akselerasi. Membantu dinas terkait melakukan mitigasi bencana secara responsif melalui dasbor pengawasan berbasis GIS.
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {["Vue.js", "Python", "MQTT/IoT", "PostgreSQL"].map((t) => (
                    <span key={t} className="px-2 py-0.5 bg-slate-50 text-slate-500 text-[10px] font-bold rounded-lg border border-slate-100">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="pt-2">
                  <a
                    href="https://green-guard-one.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-800"
                  >
                    Kunjungi Aplikasi <i className="fa-solid fa-arrow-right text-[10px]" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-slate-950 text-white font-bold rounded-xl shadow-sm hover:bg-black transition active:scale-95 text-xs"
            >
              <i className="fas fa-briefcase text-xs" /> Lihat Semua Proyek
            </Link>
          </div>
        </div>
      </section>

      {/* ================= COURSE INTERACTIVE PLAYGROUND ================= */}
      <section id="course" className="py-24 relative overflow-hidden" data-reveal>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-bold border border-blue-100 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              Sorotan Kursus / Snippet
            </span>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mt-4 tracking-tight">
              Playground &amp; Contoh Code
            </h2>
            <p className="text-slate-500 text-sm mt-2">
               Starter-code ringkas untuk memahami alur dasar Laravel, React, dan Next.js secara terarah.
            </p>
          </div>

          {/* Clean Glassmorphic Editor Panel */}
          <div className="max-w-4xl mx-auto rounded-3xl bg-white/70 border border-slate-200 shadow-xl backdrop-blur-md p-2">
            <div className="rounded-2xl bg-white overflow-hidden border border-slate-150/60 shadow-inner">
              
              {/* Tab Header Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between px-5 py-3.5 bg-slate-50 border-b border-slate-200/80 gap-3">
                <div className="flex items-center gap-2 shrink-0">
                  <span className="w-3 h-3 rounded-full bg-slate-200 block" />
                  <span className="w-3 h-3 rounded-full bg-slate-200 block" />
                  <span className="w-3 h-3 rounded-full bg-slate-200 block" />
                </div>
                
                {/* Clean Tab Options */}
                <div className="flex items-center gap-1.5 bg-slate-100/60 p-1 rounded-2xl border border-slate-200/50">
                  {[
                    { id: "laravel", label: "Laravel Starter", icon: "fa-brands fa-laravel text-red-500" },
                    { id: "react", label: "React Hooks", icon: "fa-brands fa-react text-blue-500" },
                    { id: "next", label: "Next.js Router", icon: "fa-solid fa-code text-slate-600" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setCourseTab(tab.id as any);
                        setShowExplain(false);
                      }}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition font-mono ${
                        courseTab === tab.id
                          ? "bg-white text-slate-900 shadow-sm border border-slate-200"
                          : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      <i className={tab.icon} />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>

                <span className="hidden sm:block w-12" />
              </div>

              {/* Code Panel Display */}
              <div className="relative">
                <pre className="p-6 text-xs sm:text-sm font-mono leading-relaxed text-slate-800 overflow-x-auto max-h-[380px] bg-slate-50/50">
                  <code>{snippets[courseTab]}</code>
                </pre>

                {/* Floating copy actions */}
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <button
                    onClick={() => setShowExplain(!showExplain)}
                    className="h-8 px-3 rounded-lg text-[10px] font-bold font-mono bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 transition shadow-sm"
                  >
                    {showExplain ? "Sembunyikan Info" : "Penjelasan"}
                  </button>
                  <button
                    onClick={handleCopy}
                    className="h-8 px-3.5 rounded-lg text-[10px] font-bold font-mono bg-blue-600 text-white border border-blue-500 hover:bg-blue-700 transition shadow-sm"
                  >
                    {copied ? "Tersalin!" : "Salin Kode"}
                  </button>
                </div>
              </div>

              {/* Explanation Drawer */}
              {showExplain && (
                <div className="p-6 bg-slate-50/80 border-t border-slate-200 text-xs sm:text-sm leading-relaxed text-slate-600 space-y-3 font-mono">
                  <div className="font-bold text-slate-800 uppercase tracking-wider text-[10px] text-blue-600"># Penjelasan Alur Kode</div>
                  {courseTab === "laravel" && (
                    <p>Alur Request: User mengakses rute homepage `/` → Server memanggil `HelloController@index` → Controller meneruskan data array `['name' =&gt; 'Abdul']` ke file template Blade `hello.blade.php` → View me-render tulisan di halaman browser user.</p>
                  )}
                  {courseTab === "react" && (
                    <p>Fungsi reaktif: Hook `useState(0)` mendefinisikan state awal `count = 0`. Ketika elemen button diklik, event trigger memicu handler `setCount(count + 1)` yang memperbarui state secara instan dan memicu render ulang DOM.</p>
                  )}
                  {courseTab === "next" && (
                    <p>App Router routing &amp; REST API: Halaman diakses secara statis via `app/page.tsx`. API Route handler di `app/api/hello/route.ts` merespon request GET dengan data JSON standar menggunakan Class Response bawaan Next.js 14.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="py-24 relative overflow-hidden" data-reveal>
        <div className="max-w-4xl mx-auto text-center px-6 sm:px-8 relative z-10 space-y-6">
          <span className="inline-block px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-bold border border-blue-100 shadow-sm">
            Siap Bekerja Sama
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Mari Wujudkan Proyek <br />Digital Impian Anda
          </h2>
          <p className="text-slate-650 text-base max-w-xl mx-auto">
            Hubungi saya untuk mendiskusikan implementasi teknologi modern, skalabilitas server, dan optimalisasi performa aplikasi Anda.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <a
              href="mailto:abdulkader0126@gmail.com?subject=Project%20Inquiry%20from%20Portfolio"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-blue-600 text-white font-bold rounded-xl shadow-md hover:bg-blue-750 transition active:scale-95 text-xs"
            >
              <i className="fas fa-calendar text-xs" /> Jadwalkan Diskusi
            </a>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 px-6 py-3.5 border border-slate-200 bg-white text-slate-800 font-bold rounded-xl shadow-sm hover:bg-slate-50 transition active:scale-95 text-xs"
            >
              <i className="fas fa-eye text-xs" /> Lihat Seluruh Karya
            </Link>
          </div>
        </div>
      </section>

      <BackToTop />
    </>
  );
}
