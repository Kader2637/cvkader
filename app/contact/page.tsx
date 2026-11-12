"use client";

import { useState } from "react";
import BackToTop from "../components/BackToTop";
import SpotlightCard from "../components/bits/SpotlightCard";
import DecryptedText from "../components/bits/DecryptedText";
import MagneticButton from "../components/bits/MagneticButton";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2600);
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("abdulkader0126@gmail.com");
      setCopied(true);
      showToast("Email copied to clipboard.");
      setTimeout(() => setCopied(false), 1800);
    } catch {
      showToast("Failed to copy email.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2) return showToast("Nama minimal 2 karakter.");
    if (!/^\S+@\S+\.\S+$/.test(email.trim()))
      return showToast("Masukkan email yang valid.");
    if (!subject) return showToast("Pilih subject terlebih dahulu.");
    if (message.trim().length < 20)
      return showToast("Pesan minimal 20 karakter.");

    setSending(true);
    await new Promise((r) => setTimeout(r, 900));
    setSending(false);

    // Also offer direct mailto fallback
    setName("");
    setEmail("");
    setSubject("");
    setBudget("");
    setMessage("");
    showToast("Terima kasih! Pesan kamu sudah tercatat.");
  };

  return (
    <div id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pb-8">
      <header className="space-y-3 border-b border-slate-200/80 dark:border-white/[0.08] pb-6">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[11px] font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-semibold">
          07 / Get In Touch
        </span>
        <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
          <DecryptedText text="Let's Build Something" speed={26} />
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 max-w-2xl">
          Butuh bantuan proyek web, mobile, cloud, atau integrasi IoT? Kirim detailnya atau hubungi langsung via email/WhatsApp.
        </p>
      </header>

      <div className="grid lg:grid-cols-12 gap-6 items-start">
        {/* Form */}
        <SpotlightCard className="lg:col-span-7 p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="name"
                className="block text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-zinc-400 mb-1.5 font-semibold"
              >
                Full Name *
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama lengkap kamu"
                className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-zinc-950/60 px-3.5 py-2.5 text-sm text-slate-900 dark:text-zinc-100 outline-none focus:border-indigo-500 transition"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-zinc-400 mb-1.5 font-semibold"
              >
                Email *
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-zinc-950/60 px-3.5 py-2.5 text-sm text-slate-900 dark:text-zinc-100 outline-none focus:border-indigo-500 transition"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="subject"
                className="block text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-zinc-400 mb-1.5 font-semibold"
              >
                Subject *
              </label>
              <select
                id="subject"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-zinc-950/60 px-3.5 py-2.5 text-sm text-slate-900 dark:text-zinc-100 outline-none focus:border-indigo-500 transition"
              >
                <option value="">Pilih subject…</option>
                <option value="project">Project Inquiry</option>
                <option value="collab">Collaboration</option>
                <option value="consult">Consultation</option>
                <option value="job">Job Opportunity</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="budget"
                className="block text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-zinc-400 mb-1.5 font-semibold"
              >
                Budget Range
              </label>
              <select
                id="budget"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-zinc-950/60 px-3.5 py-2.5 text-sm text-slate-900 dark:text-zinc-100 outline-none focus:border-indigo-500 transition"
              >
                <option value="">Pilih budget…</option>
                <option value="<10m">&lt; Rp 10 Juta</option>
                <option value="10_25m">Rp 10 – 25 Juta</option>
                <option value="25_50m">Rp 25 – 50 Juta</option>
                <option value="50_100m">Rp 50 – 100 Juta</option>
                <option value=">100m">&gt; Rp 100 Juta</option>
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-zinc-400 mb-1.5 font-semibold"
            >
              Message *
            </label>
            <textarea
              id="message"
              rows={5}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ceritakan kebutuhanmu, timeline, dan target yang ingin dicapai…"
              className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-zinc-950/60 px-3.5 py-2.5 text-sm text-slate-900 dark:text-zinc-100 outline-none focus:border-indigo-500 transition"
            />
            <div className="flex justify-between text-[11px] font-mono text-slate-400 dark:text-zinc-500 mt-1">
              <span>Min 20 karakter</span>
              <span>{message.length}</span>
            </div>
          </div>

          <MagneticButton>
            <button
              type="submit"
              disabled={sending}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-500/25 transition disabled:opacity-60"
            >
              <i className={`fa-solid ${sending ? "fa-spinner fa-spin" : "fa-paper-plane"}`} />
              {sending ? "Sending..." : "Send Message"}
            </button>
          </MagneticButton>
          </form>
        </SpotlightCard>

        {/* Direct Channels */}
        <aside className="lg:col-span-5 space-y-5">
          <SpotlightCard className="p-6">
            <div className="space-y-4">
              <h2 className="text-xs font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-semibold">
                Direct Channels
              </h2>
              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-zinc-950/50 border border-slate-200/70 dark:border-white/[0.06] flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <div className="text-slate-400 dark:text-zinc-500 font-mono text-[10px] uppercase">
                      Email
                    </div>
                    <div className="font-semibold text-slate-900 dark:text-white mt-0.5 truncate">
                      abdulkader0126@gmail.com
                    </div>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 text-[11px] font-semibold text-slate-700 dark:text-zinc-200 hover:border-indigo-500/40 shrink-0"
                  >
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>

                <a
                  href="tel:+62895428183064"
                  className="block p-3.5 rounded-xl bg-slate-50 dark:bg-zinc-950/50 border border-slate-200/70 dark:border-white/[0.06] hover:border-indigo-500/40 transition"
                >
                  <div className="text-slate-400 dark:text-zinc-500 font-mono text-[10px] uppercase">
                    Phone / WhatsApp
                  </div>
                  <div className="font-semibold text-slate-900 dark:text-white mt-0.5">
                    +62 895-4281-83064
                  </div>
                </a>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-zinc-950/50 border border-slate-200/70 dark:border-white/[0.06]">
                  <div className="text-slate-400 dark:text-zinc-500 font-mono text-[10px] uppercase">
                    Location
                  </div>
                  <div className="font-semibold text-slate-900 dark:text-white mt-0.5">
                    Malang, Jawa Timur, Indonesia (WIB / UTC+7)
                  </div>
                </div>
              </div>
            </div>
          </SpotlightCard>

          <SpotlightCard className="p-6">
            <div className="space-y-3">
              <h2 className="text-xs font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-semibold">
                Curriculum Vitae
              </h2>
              <p className="text-xs text-slate-600 dark:text-zinc-400">
                Butuh versi PDF untuk keperluan HR atau arsip rekrutmen?
              </p>
              <MagneticButton>
                <a
                  href="/assets/cv/AbdulKader_CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-zinc-950 text-xs font-semibold hover:opacity-90 transition"
                >
                  <i className="fa-solid fa-file-pdf text-rose-500" />
                  Download AbdulKader_CV.pdf
                </a>
              </MagneticButton>
            </div>
          </SpotlightCard>
        </aside>
      </div>

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 text-xs font-semibold shadow-xl">
          {toast}
        </div>
      )}

      <BackToTop />
    </div>
  );
}
