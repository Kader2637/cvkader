"use client";

import { useEffect } from "react";

export default function Contact() {
  useEffect(() => {
    // =============== COPY EMAIL + TOAST ===============
    const btn = document.getElementById("copyEmail");
    const text = document.getElementById("emailText");

    const showToast = (msg: string) => {
      const toast = document.getElementById("toast")!;
      const span = document.getElementById("toastMsg")!;
      span.textContent = msg;
      toast.classList.remove("hidden");
      const box = toast.firstElementChild as HTMLElement;
      box.classList.remove("toast-leave");
      box.classList.add("toast-enter");
      setTimeout(() => {
        box.classList.remove("toast-enter");
        box.classList.add("toast-leave");
        setTimeout(() => toast.classList.add("hidden"), 250);
      }, 2200);
    };

    const onCopy = async () => {
      try {
        await navigator.clipboard.writeText((text?.textContent || "").trim());
        showToast("Email copied to clipboard.");
      } catch {
        showToast("Failed to copy email.");
      }
    };
    btn?.addEventListener("click", onCopy);

    // =============== LIVE CHAR COUNT ===============
    const msg = document.getElementById("message") as HTMLTextAreaElement | null;
    const cc = document.getElementById("charCount");
    const onInput = () => {
      if (cc && msg) cc.textContent = String(msg.value.length);
    };
    msg?.addEventListener("input", onInput);
    onInput();

    // =============== SUBMIT (DUMMY) ===============
    const form = document.getElementById("contactForm") as HTMLFormElement | null;
    const onSubmit = async (e: Event) => {
      e.preventDefault();
      // honeypot
      // @ts-ignore
      if ((form as any).company && (form as any).company.value) return;

      const name = (form!.querySelector("#name") as HTMLInputElement).value.trim();
      const email = (form!.querySelector("#email") as HTMLInputElement).value.trim();
      const subject = (form!.querySelector("#subject") as HTMLSelectElement).value;
      const message = (form!.querySelector("#message") as HTMLTextAreaElement).value.trim();

      const invalid: string[] = [];
      if (name.length < 2) invalid.push("name");
      if (!/^\S+@\S+\.\S+$/.test(email)) invalid.push("email");
      if (!subject) invalid.push("subject");
      if (message.length < 20) invalid.push("message");

      if (invalid.length) {
        invalid.forEach((id) => {
          const el = form!.querySelector("#" + id) as HTMLElement;
          el.classList.add("shake", "ring-2", "ring-red-400");
          setTimeout(() => el.classList.remove("shake", "ring-2", "ring-red-400"), 500);
        });
        showToast("Please complete the required fields.");
        return;
      }

      const submitBtn = form!.querySelector('button[type="submit"]') as HTMLButtonElement;
      const originalHTML = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

      await new Promise((r) => setTimeout(r, 1200));

      submitBtn.disabled = false;
      submitBtn.innerHTML = originalHTML;
      form!.reset();
      if (cc) cc.textContent = "0";
      showToast("Thanks! Your message has been sent.");
    };
    form?.addEventListener("submit", onSubmit);

   // =============== REVEAL ON SCROLL ===============
const reveal: HTMLElement[] = [];
const header = document.querySelector<HTMLElement>("#contact header");
const formBox = document.querySelector<HTMLElement>("#contact #contactForm");
const asideItems = Array.from(
  document.querySelectorAll<HTMLElement>("#contact aside > *")
);

// set delay (ms) via data-delay
if (header) {
  header.dataset.delay = "0";
  reveal.push(header);
}
if (formBox) {
  formBox.dataset.delay = "80";
  reveal.push(formBox);
}
asideItems.forEach((el, i) => {
  el.dataset.delay = String(140 + i * 90); // 140ms, 230ms, 320ms...
  reveal.push(el);
});

// state awal
reveal.forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(26px) scale(.985)";
  el.style.filter = "blur(6px)";
  el.style.willChange = "opacity, transform, filter";
});

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const el = entry.target as HTMLElement; // <-- penting
      const delay = Number(el.dataset.delay || 0);

      // hormati prefers-reduced-motion
      const reduced =
        typeof window !== "undefined" &&
        "matchMedia" in window &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduced) {
        el.style.opacity = "1";
        el.style.transform = "none";
        el.style.filter = "none";
      } else if ("animate" in el && typeof (el as any).animate === "function") {
        // Web Animations API
        (el as any).animate(
          [
            { opacity: 0, transform: "translateY(26px) scale(.985)", filter: "blur(6px)" },
            { opacity: 1, transform: "translateY(0) scale(1)", filter: "blur(0)" },
          ],
          {
            duration: 720,
            easing: "cubic-bezier(.22,1,.36,1)",
            delay,
            fill: "forwards",
          }
        );
      } else {
        // fallback CSS transition
        el.style.transition = "opacity .72s ease, transform .72s ease, filter .72s ease";
        setTimeout(() => {
          el.style.opacity = "1";
          el.style.transform = "translateY(0) scale(1)";
          el.style.filter = "blur(0)";
        }, delay);
      }

      io.unobserve(el);
    });
  },
  { threshold: 0.18, rootMargin: "0px 0px -10% 0px" }
);

reveal.forEach((el) => io.observe(el));
return () => io.disconnect();


    // =============== CLEANUP ===============
    return () => {
      btn?.removeEventListener("click", onCopy);
      msg?.removeEventListener("input", onInput);
      form?.removeEventListener("submit", onSubmit);
      io.disconnect();
    };
  }, []);

  return (
    <div id="contact" className="page relative overflow-hidden bg-white py-10">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -top-24 -left-16 w-72 h-72 rounded-full bg-gradient-to-tr from-blue-200 to-purple-200 blur-3xl"></div>
        <div className="absolute -bottom-28 -right-20 w-80 h-80 rounded-full bg-gradient-to-tr from-cyan-200 to-indigo-200 blur-3xl"></div>
      </div>

      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 ring-1 ring-blue-100">
            <span className="size-2 rounded-full bg-blue-500 animate-pulse"></span>{" "}
            Get In Touch
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">
            Let’s Build Something Great
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Butuh bantuan proyek web, mobile, atau cloud? Kirim detailnya—aku
            balas cepat.
          </p>
        </header>

        <div className="grid lg:grid-cols-5 gap-10 max-w-6xl mx-auto">
          {/* Form */}
          <form
            id="contactForm"
            className="lg:col-span-3 space-y-6 p-8 rounded-2xl bg-white/70 backdrop-blur-xl border border-gray-200/70 shadow-sm"
          >
            <input type="text" name="company" className="hidden" tabIndex={-1} autoComplete="off" />
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-800 mb-2">
                  Full Name *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nama lengkap kamu"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-800 mb-2">
                  Email *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="you@email.com"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-gray-800 mb-2">
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="" disabled> Pilih subject…</option>
                  <option value="project">Project Inquiry</option>
                  <option value="collab">Collaboration</option>
                  <option value="consult">Consultation</option>
                  <option value="job">Job Opportunity</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="budget" className="block text-sm font-semibold text-gray-800 mb-2">
                  Budget Range
                </label>
                <select
                  id="budget"
                  name="budget"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="" disabled> Pilih budget…</option>
                  <option value="<10m">&lt; Rp 10 Juta</option>
                  <option value="10_25m">Rp 10 – 25 Juta</option>
                  <option value="25_50m">Rp 25 – 50 Juta</option>
                  <option value="50_100m">Rp 50 – 100 Juta</option>
                  <option value=">100m">&gt; Rp 100 Juta</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-gray-800 mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ceritakan kebutuhanmu, timeline, dan target yang ingin dicapai…"
              ></textarea>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Min 20 karakter</span>
                <span id="charCount">0</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <input id="nda" name="nda" type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
              <label htmlFor="nda" className="text-sm text-gray-700">
                Butuh NDA (Non-Disclosure Agreement)
              </label>
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-700 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-800 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
            >
              <i className="fa-solid fa-paper-plane"></i> Send Message
            </button>

            <p className="text-xs text-gray-500 text-center">
              Dengan mengirim form ini, kamu menyetujui untuk dihubungi kembali via email/WhatsApp.
            </p>
          </form>

          {/* Sidebar */}
          <aside className="lg:col-span-2 space-y-6">
            <div className="p-[1.5px] rounded-2xl bg-gradient-to-tr from-blue-500/50 via-purple-500/50 to-cyan-500/50">
              <div className="rounded-2xl bg-white/80 backdrop-blur-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid sm:grid-cols-3 gap-3">
                  <a
                    href="mailto:abdul.kader@email.com"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 hover:bg-gray-50 transition"
                  >
                    <i className="fa-solid fa-envelope text-blue-600"></i> Email
                  </a>
                  <a
                    href="https://wa.me/6281234567890?text=Halo%20Abdul%2C%20saya%20ingin%20diskusi%20proyek."
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 hover:bg-gray-50 transition"
                  >
                    <i className="fa-brands fa-whatsapp text-emerald-600"></i> WhatsApp
                  </a>
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 hover:bg-gray-50 transition"
                  >
                    <i className="fa-solid fa-calendar-days text-purple-600"></i> Schedule
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200/70 bg-white/70 backdrop-blur-xl p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-4 text-gray-700">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <i className="fa-solid fa-envelope text-blue-600"></i>
                    <span id="emailText">abdulkader0126@email.com</span>
                  </div>
                  <button id="copyEmail" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                    Copy
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <i className="fa-solid fa-phone text-purple-600"></i>
                  <span>+62 895 4281 8306 4</span>
                </div>
                <div className="flex items-center gap-3">
                  <i className="fa-solid fa-location-dot text-cyan-600"></i>
                  <span>Malang, Indonesia</span>
                </div>
                <div className="flex items-center gap-3">
                  <i className="fa-solid fa-clock text-amber-600"></i>
                  <span>Mon–Fri: 09.00–18.00 WIB</span>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-semibold mb-3 text-gray-900">Socials</h4>
                <div className="flex gap-3">
                  <a href="#" className="w-10 h-10 rounded-xl bg-gray-100 grid place-items-center hover:bg-gray-200 transition">
                    <i className="fab fa-linkedin-in text-gray-700"></i>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-xl bg-gray-100 grid place-items-center hover:bg-gray-200 transition">
                    <i className="fab fa-github text-gray-700"></i>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-xl bg-gray-100 grid place-items-center hover:bg-gray-200 transition">
                    <i className="fab fa-twitter text-gray-700"></i>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-xl bg-gray-100 grid place-items-center hover:bg-gray-200 transition">
                    <i className="fab fa-instagram text-gray-700"></i>
                  </a>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-gray-200">
              <img
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1200&h=600&fit=crop"
                className="w-full h-48 object-cover"
                alt="Jakarta"
              />
              <div className="p-5 bg-white">
                <div className="font-semibold text-gray-900">Malang - Indonesia</div>
                <div className="text-sm text-gray-600">Central Malang • abdul kader</div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Toast */}
      <div id="toast" className="hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <div className="toast-enter flex items-center gap-3 bg-gray-900 text-white px-4 py-3 rounded-xl shadow-2xl">
          <i className="fa-solid fa-circle-check"></i>
          <span id="toastMsg">Message sent successfully.</span>
        </div>
      </div>

      {/* animations */}
      <style jsx>{`
        @keyframes toastIn {
          from { transform: translate(-50%, 20px); opacity: 0; }
          to { transform: translate(-50%, 0); opacity: 1; }
        }
        @keyframes toastOut {
          from { transform: translate(-50%, 0); opacity: 1; }
          to { transform: translate(-50%, 20px); opacity: 0; }
        }
        .toast-enter { animation: toastIn 0.25s ease-out forwards; }
        .toast-leave { animation: toastOut 0.25s ease-in forwards; }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
        .shake { animation: shake 0.3s ease-in-out; }

        .size-2 { width: 0.5rem; height: 0.5rem; }
      `}</style>
    </div>
  );
}
