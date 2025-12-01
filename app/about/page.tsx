"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    THREE?: any;
  }
}

export default function About() {
  const threeRef = useRef<HTMLDivElement | null>(null);

  // ========= COUNTER =========
  useEffect(() => {
    const about = document.getElementById("about");
    if (!about) return;

    const counters = about.querySelectorAll<HTMLElement>(".counter");
    let started = false;

    const run = () => {
      if (started) return;
      started = true;
      counters.forEach((el) => {
        const target = parseInt(el.dataset.target || "0", 10) || 0;
        const duration = 1100;
        const startTime = performance.now();
        const showPlus = (el.dataset.plus || "").toLowerCase() === "true";

        const step = (now: number) => {
          const p = Math.min((now - startTime) / duration, 1);
          const ease = 1 - Math.pow(1 - p, 3); // easeOutCubic biar lebih smooth
          const val = Math.floor(ease * target);
          el.textContent = String(val) + (p === 1 && showPlus ? "+" : "");
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    };

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && run()),
      { threshold: 0.35 }
    );
    io.observe(about);
    return () => io.disconnect();
  }, []);

  // ========= TILT CARD =========
  useEffect(() => {
    const card = document.querySelector<HTMLDivElement>("#about .tilt-card");
    if (!card) return;
    const maxTilt = 10;
    const reset = () => {
      card.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
    };
    const move = (e: PointerEvent) => {
      const r = card.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) / (r.width / 2);
      const dy = (e.clientY - cy) / (r.height / 2);
      const rx = (-dy * maxTilt).toFixed(2);
      const ry = (dx * maxTilt).toFixed(2);
      card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) scale(1.04)`;
    };
    card.addEventListener("pointermove", move);
    card.addEventListener("pointerleave", reset);
    card.addEventListener("pointerdown", reset);
    return () => {
      card.removeEventListener("pointermove", move);
      card.removeEventListener("pointerleave", reset);
      card.removeEventListener("pointerdown", reset);
    };
  }, []);

  // ========= REVEAL ON SCROLL (STAGGER) =========
  useEffect(() => {
    const toReveal = document.querySelectorAll<HTMLElement>("#about [data-reveal]");
    toReveal.forEach((el) => el.classList.add("will-reveal"));

    const groups = document.querySelectorAll<HTMLElement>(
      "#about [data-reveal-group]"
    );
    groups.forEach((group) => {
      const children = group.querySelectorAll<HTMLElement>("[data-reveal-child]");
      children.forEach((child, idx) => {
        child.style.setProperty("--d", `${idx * 110}ms`);
        child.classList.add("will-reveal");
      });
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;

          if (el.hasAttribute("data-reveal-group")) {
            const children = el.querySelectorAll<HTMLElement>("[data-reveal-child]");
            children.forEach((c) => {
              c.classList.remove("will-reveal");
              c.classList.add("revealed");
            });
          } else {
            el.classList.remove("will-reveal");
            el.classList.add("revealed");
          }

          io.unobserve(el);
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );

    toReveal.forEach((el) => io.observe(el));
    groups.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, []);

  // ========= THREE.JS VIA CDN =========
  useEffect(() => {
    const container = threeRef.current;
    if (!container) return;

    let cleanup: (() => void) | undefined;
    let initialized = false;

    const setupThree = () => {
      if (!window.THREE || initialized) return;
      initialized = true;
      const THREE = window.THREE;

      const width = container.clientWidth || 320;
      const height = container.clientHeight || 220;

      const scene = new THREE.Scene();
      scene.fog = new THREE.Fog(0xf9fafb, 6, 16);

      const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
      camera.position.set(0, 0, 7);

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(window.devicePixelRatio);
      container.appendChild(renderer.domElement);

      const geoOuter = new THREE.IcosahedronGeometry(1.9, 1);
      const matOuter = new THREE.MeshStandardMaterial({
        color: 0x4f46e5,
        wireframe: true,
        metalness: 0.4,
        roughness: 0.3,
        transparent: true,
        opacity: 0.6,
      });
      const meshOuter = new THREE.Mesh(geoOuter, matOuter);
      scene.add(meshOuter);

      const geoInner = new THREE.SphereGeometry(1.05, 32, 32);
      const matInner = new THREE.MeshStandardMaterial({
        color: 0xa855f7,
        metalness: 0.65,
        roughness: 0.25,
        emissive: 0x22c55e,
        emissiveIntensity: 0.6,
      });
      const meshInner = new THREE.Mesh(geoInner, matInner);
      scene.add(meshInner);

      // small orbiting dots biar lebih hidup
      const dotGeo = new THREE.SphereGeometry(0.06, 16, 16);
      const dotMat = new THREE.MeshBasicMaterial({ color: 0x0ea5e9 });
      const dots: any[] = [];
      for (let i = 0; i < 8; i++) {
        const m = new THREE.Mesh(dotGeo, dotMat);
        const radius = 2.4 + Math.random() * 0.3;
        const angle = (i / 8) * Math.PI * 2;
        m.userData = { radius, angle };
        m.position.set(
          Math.cos(angle) * radius,
          Math.sin(angle) * 0.4,
          Math.sin(angle) * radius * 0.3
        );
        dots.push(m);
        scene.add(m);
      }

      const light1 = new THREE.PointLight(0x60a5fa, 1.6, 18);
      light1.position.set(3, 4, 4);
      scene.add(light1);

      const light2 = new THREE.PointLight(0xf97316, 1.4, 14);
      light2.position.set(-4, -3, 3);
      scene.add(light2);

      const ambient = new THREE.AmbientLight(0xffffff, 0.7);
      scene.add(ambient);

      let frameId: number;
      let t = 0;

      const animate = () => {
        frameId = requestAnimationFrame(animate);
        t += 0.008;
        meshOuter.rotation.y += 0.004;
        meshOuter.rotation.x += 0.002;
        meshInner.rotation.y -= 0.003;

        dots.forEach((d) => {
          const r = d.userData.radius;
          const base = d.userData.angle;
          d.position.x = Math.cos(base + t * 0.7) * r;
          d.position.z = Math.sin(base + t * 0.7) * r * 0.3;
        });

        renderer.render(scene, camera);
      };
      animate();

      const handleResize = () => {
        const w = container.clientWidth;
        const h = container.clientHeight;
        if (!w || !h) return;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };

      window.addEventListener("resize", handleResize);

      cleanup = () => {
        cancelAnimationFrame(frameId);
        window.removeEventListener("resize", handleResize);
        renderer.dispose();
        geoOuter.dispose();
        geoInner.dispose();
        dotGeo.dispose();
        matOuter.dispose();
        matInner.dispose();
        dotMat.dispose();
        if (renderer.domElement.parentNode === container) {
          container.removeChild(renderer.domElement);
        }
      };
    };

    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[data-three-cdn="true"]'
    );

    if (existingScript) {
      if (window.THREE) {
        setupThree();
      } else {
        existingScript.addEventListener("load", setupThree, { once: true });
      }
    } else {
      const script = document.createElement("script");
      script.src =
        "https://unpkg.com/three@0.160.0/build/three.min.js";
      script.async = true;
      script.dataset.threeCdn = "true";
      script.addEventListener("load", setupThree, { once: true });
      document.body.appendChild(script);
    }

    return () => {
      cleanup?.();
    };
  }, []);

  return (
    <div
      id="about"
      className="page relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 py-16 sm:py-20"
    >
      {/* soft gradient blobs */}
      <div className="pointer-events-none absolute inset-0 opacity-80">
        <div className="absolute -top-40 -left-32 h-72 w-72 rounded-full bg-blue-200/70 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-purple-200/70 blur-3xl" />
        <div className="absolute inset-y-0 left-1/2 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-slate-200 to-transparent" />
      </div>

      <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="max-w-3xl" data-reveal>
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/80 px-3 py-1 text-xs font-medium text-blue-700 backdrop-blur-sm shadow-sm shadow-blue-100/60">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(34,197,94,0.35)]" />
            <span>Available for collaboration</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-white/80 px-2 py-0.5 text-[10px] text-slate-500">
              <i className="fa-solid fa-circle-play text-[9px]" />
              Live portfolio
            </span>
          </div>

          <h2 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight text-slate-900">
            Abdul Kader
          </h2>
          <p className="mt-1 text-lg font-medium text-blue-700">
            Full Stack Developer · Co-Founder &amp; CTO @ Kodingin
          </p>

          <p className="mt-4 text-base sm:text-lg text-slate-600">
            <strong>4+ tahun</strong> membangun solusi{" "}
            <span className="font-medium text-slate-900">terukur</span>,{" "}
            <span className="font-medium text-slate-900">aman</span>, dan{" "}
            <span className="font-medium text-slate-900">berdampak bisnis</span>{" "}
            untuk startup &amp; enterprise. Fokus pada{" "}
            <em>release speed</em>, <em>system security</em>, dan{" "}
            <em>business impact</em>. Saat ini menjabat sebagai{" "}
            <strong>Co-Founder &amp; CTO</strong> di PT Kodingin Digital
            Nusantara.
          </p>
        </header>

        <div className="mt-12 grid items-start gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.5fr)]">
          {/* Profile / Stats */}
          <aside className="lg:col-span-1" data-reveal>
            <div className="float-soft rounded-3xl bg-gradient-to-tr from-blue-500/18 via-purple-500/18 to-cyan-500/18 p-[1.5px] shadow-lg shadow-blue-500/10">
              <div className="group relative rounded-3xl bg-white ring-1 ring-slate-100 shadow-xl shadow-slate-200/70">
                <div className="p-6">
                  <div className="tilt-card relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-slate-50">
                    {/* Three.js orb */}
                    <div
                      ref={threeRef}
                      className="pointer-events-none absolute inset-0 opacity-75 mix-blend-multiply"
                    />
                    {/* Foto */}
                    <img
                      src="/assets/foto/i'm1.png"
                      className="relative h-full w-full object-cover"
                      alt="Abdul Kader"
                      loading="lazy"
                    />
                    <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-slate-200/80" />
                    <div className="pointer-events-none absolute inset-x-5 bottom-4 flex items-center justify-between gap-3 text-[11px] text-slate-900/90">
                      <span className="inline-flex items-center gap-1 rounded-full bg-white/85 px-3 py-1 shadow-sm">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        Open to remote & on-site
                      </span>
                      <span className="hidden rounded-full bg-white/85 px-3 py-1 shadow-sm sm:inline">
                        Backend · Frontend · DevOps aware
                      </span>
                    </div>
                  </div>

                  <ul className="mt-6 space-y-3 text-sm text-slate-700">
                    <li className="flex items-center gap-3">
                      <i className="fa-solid fa-location-dot w-5 text-center text-slate-400" />
                      Malang, Indonesia
                    </li>
                    <li className="flex items-center gap-3">
                      <i className="fa-solid fa-briefcase w-5 text-center text-slate-400" />
                      Co-Founder &amp; CTO • PT Kodingin Digital Nusantara
                    </li>
                    <li className="flex items-center gap-3">
                      <i className="fa-solid fa-envelope w-5 text-center text-slate-400" />
                      <a
                        href="mailto:abdulkader0126@gmail.com"
                        className="hover:underline"
                      >
                        abdulkader0126@gmail.com
                      </a>
                    </li>
                    <li className="flex items-center gap-3">
                      <i className="fa-solid fa-phone w-5 text-center text-slate-400" />
                      <a href="tel:+62895428183064" className="hover:underline">
                        0895-4281-83064
                      </a>
                    </li>
                  </ul>

                  <div className="mt-6 grid grid-cols-3 gap-3">
                    <div className="rounded-xl border border-slate-200 bg-slate-50/90 p-4 text-center shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-transform">
                      <div
                        className="counter text-2xl font-bold text-slate-900"
                        data-target="4"
                        data-plus="true"
                      >
                        0
                      </div>
                      <div className="mt-0.5 text-xs text-slate-500">
                        Years
                      </div>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-slate-50/90 p-4 text-center shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-transform">
                      <div
                        className="counter text-2xl font-bold text-slate-900"
                        data-target="25"
                        data-plus="true"
                      >
                        0
                      </div>
                      <div className="mt-0.5 text-xs text-slate-500">
                        Projects
                      </div>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-slate-50/90 p-4 text-center shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-transform">
                      <div
                        className="counter text-2xl font-bold text-slate-900"
                        data-target="10"
                        data-plus="true"
                      >
                        0
                      </div>
                      <div className="mt-0.5 text-xs text-slate-500">
                        Clients
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <a
                      href="mailto:abdulkader0126@gmail.com?subject=Project%20Inquiry%20via%20Portfolio"
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2.5 text-sm font-medium text-white shadow-md shadow-blue-500/30 transition hover:-translate-y-0.5 hover:from-blue-700 hover:to-purple-700 active:translate-y-0"
                    >
                      <i className="fa-solid fa-paper-plane" /> Let&apos;s talk
                    </a>
                    <div className="flex gap-2">
                      <a
                        href="https://www.linkedin.com/in/abdul-kader-53b22930a"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50"
                        aria-label="LinkedIn"
                      >
                        <i className="fa-brands fa-linkedin" />
                      </a>
                      <a
                        href="https://github.com/Kader2637"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50"
                        aria-label="GitHub"
                      >
                        <i className="fa-brands fa-github" />
                      </a>
                      <a
                        href="https://instagram.com/abdulkader2637"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50"
                        aria-label="Instagram"
                      >
                        <i className="fa-brands fa-instagram" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Content kanan */}
          <div className="space-y-10 lg:col-span-1.5" data-reveal-group>
            {/* Value prop */}
            <section
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white/90 backdrop-blur shadow-sm hover:shadow-md transition-shadow"
              data-reveal-child
            >
              <div className="h-1 w-full rounded-t-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400 animate-[bg-move_6s_linear_infinite]" />
              <div className="p-7 sm:p-8">
                <h3 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-blue-50 text-blue-600 text-sm">
                    <i className="fa-solid fa-bolt" />
                  </span>
                  Rilis cepat, risiko tetap terkendali
                </h3>
                <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600">
                  Saya biasa bekerja dari{" "}
                  <span className="font-semibold text-slate-900">
                    discovery → architecture → implementation → observability →
                    handover
                  </span>
                  , dengan fokus ke{" "}
                  <span className="font-medium text-slate-900">
                    Core Web Vitals, konversi, dan efisiensi biaya infra
                  </span>
                  . Tim tetap bisa bergerak cepat tanpa mengorbankan kualitas
                  teknis jangka panjang.
                </p>
              </div>
            </section>

            {/* Mini capabilities cards */}
            <section
              className="grid gap-4 md:grid-cols-3"
              data-reveal-child
            >
              {[
                {
                  icon: "fa-gauge-high",
                  title: "Performance & DX",
                  desc: "Next.js, caching, Web Vitals, DX yang enak untuk tim dev.",
                },
                {
                  icon: "fa-shield-halved",
                  title: "Security & Reliability",
                  desc: "Auth yang rapi, logging, rate limit, dan rollback strategy.",
                },
                {
                  icon: "fa-diagram-project",
                  title: "Scalable Architecture",
                  desc: "Dari monolith rapi sampai microservices yang terukur.",
                },
              ].map((c) => (
                <article
                  key={c.title}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white/90 p-4 text-sm shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
                >
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-slate-50 text-blue-600">
                      <i className={`fa-solid ${c.icon}`} />
                    </span>
                    <h4 className="text-sm font-semibold text-slate-900">
                      {c.title}
                    </h4>
                  </div>
                  <p className="mt-2 text-xs text-slate-600">{c.desc}</p>
                </article>
              ))}
            </section>

            {/* Primary Stack */}
            <section data-reveal-child>
              <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Primary Stack
              </h4>
              <div className="mt-3 flex flex-wrap gap-2">
                {[
                  { label: "Laravel · PHP 8 · MySQL", icon: "fa-brands fa-laravel" },
                  { label: "React · Next.js · TS", icon: "fa-brands fa-react" },
                  { label: "Node.js · Express", icon: "fa-brands fa-node-js" },
                  { label: "PostgreSQL · Redis", icon: "fa-solid fa-database" },
                  { label: "Docker · Kubernetes", icon: "fa-brands fa-docker" },
                  { label: "AWS · GCP", icon: "fa-solid fa-cloud" },
                ].map((item) => (
                  <span
                    key={item.label}
                    className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs sm:text-[13px] text-slate-800 ring-1 ring-slate-200 transition hover:bg-blue-50 hover:ring-blue-200"
                  >
                    <i className={`${item.icon} text-[11px] text-slate-500`} />
                    {item.label}
                  </span>
                ))}
              </div>
            </section>

            {/* Experience Highlights */}
            <section data-reveal-child>
              <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Experience Highlights
              </h4>
              <div className="mt-4 space-y-5">
                {[
                  {
                    role: "Co-Founder & CTO — PT Kodingin Digital Nusantara",
                    time: "2025 — Sekarang",
                    text: "Memimpin produk & teknologi; orkestrasi roadmap, arsitektur, dan kualitas rilis.",
                  },
                  {
                    role: "Senior Developer — PT Elshad Teknologi Indonesia",
                    time: "2025",
                    text: "Pengembangan fitur inti & optimasi performa; kolaborasi lintas tim.",
                  },
                  {
                    role: "HRD — PT Kodingin Digital Nusantara",
                    time: "2025",
                    text: "Rekrutmen, proses interview teknis, dan pengembangan talenta.",
                  },
                  {
                    role: "Junior Developer & Mentor — PT Humma Teknologi Indonesia",
                    time: "2023 — 2024",
                    text: "Pengembangan aplikasi & mentoring; membangun dasar praktik engineering yang baik.",
                  },
                ].map((t, idx) => (
                  <article
                    className="relative flex gap-3 border-l-2 border-slate-200 pl-4 transition hover:translate-x-0.5"
                    key={t.role}
                  >
                    <span className="absolute -left-[7px] mt-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-gradient-to-tr from-blue-500 to-purple-500 shadow-sm shadow-blue-300" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-4">
                        <h5 className="text-sm font-semibold text-slate-900">
                          {t.role}
                        </h5>
                        <span className="shrink-0 text-xs text-slate-500">
                          {t.time}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-slate-600">{t.text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* CTA */}
            <section className="pt-1" data-reveal-child>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href="/portfolio"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-sm font-medium text-white shadow-md shadow-blue-500/30 transition hover:-translate-y-0.5 hover:from-blue-700 hover:to-purple-700 active:translate-y-0"
                >
                  <i className="fa-solid fa-briefcase" /> Lihat Portfolio
                </a>
                <a
                  href="mailto:abdulkader0126@gmail.com?subject=Project%20Inquiry%20via%20Portfolio"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-800 shadow-sm transition hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50/40"
                >
                  <i className="fa-solid fa-calendar-check" /> Jadwalkan Diskusi
                </a>
                <a
                  href="/assets/cv/AbdulKader_CV.pdf"
                  download
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-800 shadow-sm transition hover:bg-slate-100"
                >
                  <i className="fa-solid fa-file-arrow-down" /> Download CV
                </a>
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
