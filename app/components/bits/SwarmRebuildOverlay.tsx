"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

type AgentCursor = {
  id: string;
  teamId: number;
  name: string;
  color: string;
  badgeBg: string;
  x: number;
  y: number;
  task: string;
  active: boolean;
};

type WireframeBox = {
  key: string;
  teamId: number;
  left: number;
  top: number;
  width: number;
  height: number;
  color: string;
  label: string;
};

const INITIAL_AGENTS: AgentCursor[] = [
  // Team 1 (Alpha)
  {
    id: "arch-1",
    teamId: 0,
    name: "Architect AI",
    color: "#6366f1",
    badgeBg: "bg-indigo-600",
    x: 140,
    y: 180,
    task: "origin [0,0]",
    active: false,
  },
  {
    id: "style-1",
    teamId: 0,
    name: "Style Agent",
    color: "#06b6d4",
    badgeBg: "bg-cyan-600",
    x: 240,
    y: 220,
    task: "ready",
    active: false,
  },
  {
    id: "content-1",
    teamId: 0,
    name: "Text & QA AI",
    color: "#10b981",
    badgeBg: "bg-emerald-600",
    x: 340,
    y: 260,
    task: "ready",
    active: false,
  },

  // Team 2 (Beta)
  {
    id: "arch-2",
    teamId: 1,
    name: "Architect AI",
    color: "#f59e0b",
    badgeBg: "bg-amber-600",
    x: 520,
    y: 180,
    task: "origin [0,0]",
    active: false,
  },
  {
    id: "style-2",
    teamId: 1,
    name: "Style Agent",
    color: "#ec4899",
    badgeBg: "bg-pink-600",
    x: 620,
    y: 220,
    task: "ready",
    active: false,
  },
  {
    id: "content-2",
    teamId: 1,
    name: "Text & QA AI",
    color: "#8b5cf6",
    badgeBg: "bg-violet-600",
    x: 720,
    y: 260,
    task: "ready",
    active: false,
  },

  // Team 3 (Gamma)
  {
    id: "arch-3",
    teamId: 2,
    name: "Architect AI",
    color: "#f43f5e",
    badgeBg: "bg-rose-600",
    x: 900,
    y: 180,
    task: "origin [0,0]",
    active: false,
  },
  {
    id: "style-3",
    teamId: 2,
    name: "Style Agent",
    color: "#14b8a6",
    badgeBg: "bg-teal-600",
    x: 1000,
    y: 220,
    task: "ready",
    active: false,
  },
  {
    id: "content-3",
    teamId: 2,
    name: "Text & QA AI",
    color: "#3b82f6",
    badgeBg: "bg-blue-600",
    x: 1100,
    y: 260,
    task: "ready",
    active: false,
  },
];

const TEAM_CONFIGS = [
  {
    archId: "arch-1",
    styleId: "style-1",
    contentId: "content-1",
    archColor: "#6366f1",
    styleColor: "#06b6d4",
  },
  {
    archId: "arch-2",
    styleId: "style-2",
    contentId: "content-2",
    archColor: "#f59e0b",
    styleColor: "#ec4899",
  },
  {
    archId: "arch-3",
    styleId: "style-3",
    contentId: "content-3",
    archColor: "#f43f5e",
    styleColor: "#14b8a6",
  },
];

function materializeElement(el: HTMLElement) {
  el.classList.remove("swarm-shell");
  if (el.classList.contains("revealed")) return;
  el.style.transitionDelay = "0ms";
  el.classList.add("revealed", "swarm-just-built");
  window.setTimeout(() => {
    el.classList.remove("swarm-just-built");
  }, 450);
}

const wait = (ms: number) => new Promise<void>((res) => window.setTimeout(res, ms));

function clampPos(x: number, y: number) {
  if (typeof window === "undefined") return { x, y };
  return {
    x: Math.round(Math.max(16, Math.min(window.innerWidth - 180, x))),
    y: Math.round(Math.max(16, Math.min(window.innerHeight - 56, y))),
  };
}

export default function SwarmRebuildOverlay() {
  const pathname = usePathname();
  const [agents, setAgents] = useState<AgentCursor[]>(INITIAL_AGENTS);
  const [wireframes, setWireframes] = useState<WireframeBox[]>([]);

  const queueRef = useRef<HTMLElement[]>([]);
  const queuedSetRef = useRef<WeakSet<HTMLElement>>(new WeakSet());
  const busyTeamsRef = useRef<boolean[]>([false, false, false]);
  const currentBuildingElRef = useRef<(HTMLElement | null)[]>([null, null, null]);
  const currentPhaseRef = useRef<("idle" | "measure" | "style" | "content")[]>([
    "idle",
    "idle",
    "idle",
  ]);
  const runIdRef = useRef(0);
  const boxCounterRef = useRef(0);

  const updateAgent = useCallback(
    (id: string, patch: Partial<AgentCursor>) => {
      setAgents((prev) =>
        prev.map((a) => (a.id === id ? { ...a, ...patch } : a))
      );
    },
    []
  );

  // Dynamic viewport-aware queue sorter: elements CURRENTLY in viewport take absolute priority!
  const sortQueue = useCallback(() => {
    const vh = typeof window !== "undefined" ? window.innerHeight : 800;
    queueRef.current.sort((a, b) => {
      const ra = a.getBoundingClientRect();
      const rb = b.getBoundingClientRect();

      const aInView = ra.top < vh && ra.bottom > 0;
      const bInView = rb.top < vh && rb.bottom > 0;

      if (aInView && !bInView) return -1;
      if (!aInView && bInView) return 1;

      if (aInView && bInView) {
        if (Math.abs(ra.top - rb.top) > 24) return ra.top - rb.top;
        return ra.left - rb.left;
      }

      // Out of view: distance to viewport
      const aDist = Math.min(Math.abs(ra.top - vh), Math.abs(ra.bottom));
      const bDist = Math.min(Math.abs(rb.top - vh), Math.abs(rb.bottom));
      return aDist - bDist;
    });
  }, []);

  const runTeamWorker = useCallback(
    async (teamIdx: number) => {
      if (busyTeamsRef.current[teamIdx]) return;
      busyTeamsRef.current[teamIdx] = true;
      const myRunId = runIdRef.current;
      const cfg = TEAM_CONFIGS[teamIdx];

      while (queueRef.current.length > 0) {
        if (myRunId !== runIdRef.current) break;

        sortQueue();
        const el = queueRef.current.shift();
        if (!el) break;

        const r0 = el.getBoundingClientRect();
        // If element is already revealed, zero size, or has already scrolled past above viewport:
        if (
          r0.width === 0 ||
          r0.height === 0 ||
          el.classList.contains("revealed") ||
          r0.bottom <= 0
        ) {
          materializeElement(el);
          continue;
        }

        currentBuildingElRef.current[teamIdx] = el;
        currentPhaseRef.current[teamIdx] = "measure";

        const boxKey = `wf-${teamIdx}-${++boxCounterRef.current}`;
        const targetW = Math.round(r0.width);
        const targetH = Math.round(r0.height);

        // ========================================================
        // STEP 1: ARCHITECT MENGUKUR DARI SUDUT KIRI ATAS HINGGA KANAN BAWAH
        // ========================================================
        const pStart = clampPos(r0.left + 4, r0.top + 4);
        const pStyleInitial = clampPos(
          r0.left + Math.min(targetW * 0.45, 150),
          r0.top + Math.min(targetH * 0.35, 80)
        );
        const pContentInitial = clampPos(
          r0.left + Math.min(targetW * 0.28, 90),
          r0.top + Math.min(targetH * 0.65, 140)
        );

        setAgents((prev) =>
          prev.map((a) => {
            if (a.id === cfg.archId) {
              return { ...a, ...pStart, task: "origin [0,0]...", active: true };
            }
            if (a.id === cfg.styleId) {
              return { ...a, ...pStyleInitial, task: "standby...", active: true };
            }
            if (a.id === cfg.contentId) {
              return { ...a, ...pContentInitial, task: "standby...", active: true };
            }
            return a;
          })
        );

        setWireframes((prev) => [
          ...prev,
          {
            key: boxKey,
            teamId: teamIdx,
            left: Math.round(r0.left),
            top: Math.round(r0.top),
            width: Math.min(60, targetW),
            height: Math.min(36, targetH),
            color: cfg.archColor,
            label: `measuring card...`,
          },
        ]);
        await wait(240);
        if (myRunId !== runIdRef.current) break;

        // Fresh check after wait in case user scrolled
        const rAfterStart = el.getBoundingClientRect();
        if (rAfterStart.bottom <= 0) {
          materializeElement(el);
          setWireframes((prev) => prev.filter((w) => w.key !== boxKey));
          currentBuildingElRef.current[teamIdx] = null;
          currentPhaseRef.current[teamIdx] = "idle";
          continue;
        }

        const pEnd = clampPos(rAfterStart.right - 28, rAfterStart.bottom - 28);
        updateAgent(cfg.archId, {
          ...pEnd,
          task: `measuring ${Math.round(rAfterStart.width)}×${Math.round(rAfterStart.height)}px`,
        });

        setWireframes((prev) =>
          prev.map((w) =>
            w.key === boxKey
              ? {
                  ...w,
                  left: Math.round(rAfterStart.left),
                  top: Math.round(rAfterStart.top),
                  width: Math.round(rAfterStart.width),
                  height: Math.round(rAfterStart.height),
                  label: `${Math.round(rAfterStart.width)} × ${Math.round(rAfterStart.height)}px`,
                }
              : w
          )
        );
        await wait(340);
        if (myRunId !== runIdRef.current) break;

        // ========================================================
        // STEP 2: STYLE AGENT MEMBANGUN FRAME CONTAINER & MEDIA
        // ========================================================
        currentPhaseRef.current[teamIdx] = "style";
        const rStyle = el.getBoundingClientRect();
        if (rStyle.bottom <= 0) {
          materializeElement(el);
          setWireframes((prev) => prev.filter((w) => w.key !== boxKey));
          currentBuildingElRef.current[teamIdx] = null;
          currentPhaseRef.current[teamIdx] = "idle";
          continue;
        }

        const pStyle = clampPos(
          rStyle.left + rStyle.width * 0.48,
          rStyle.top + Math.min(rStyle.height * 0.35, 90)
        );
        updateAgent(cfg.archId, { task: "frame ready ✓" });
        updateAgent(cfg.styleId, {
          ...pStyle,
          task: "building shell & layout...",
        });
        await wait(300);
        if (myRunId !== runIdRef.current) break;

        el.classList.add("swarm-shell");
        setWireframes((prev) =>
          prev.map((w) =>
            w.key === boxKey
              ? { ...w, color: cfg.styleColor, label: "shell assembled ✓" }
              : w
          )
        );
        await wait(240);
        if (myRunId !== runIdRef.current) break;

        // ========================================================
        // STEP 3: TEXT & QA AI MENULIS TYPOGRAPHY & MENYELESAIKAN CARD
        // ========================================================
        currentPhaseRef.current[teamIdx] = "content";
        const rContent = el.getBoundingClientRect();
        if (rContent.bottom <= 0) {
          materializeElement(el);
          setWireframes((prev) => prev.filter((w) => w.key !== boxKey));
          currentBuildingElRef.current[teamIdx] = null;
          currentPhaseRef.current[teamIdx] = "idle";
          continue;
        }

        const pContent = clampPos(
          rContent.left + Math.min(rContent.width * 0.28, 100),
          rContent.top + Math.min(rContent.height * 0.68, 170)
        );
        updateAgent(cfg.styleId, { task: "shell ready ✓" });
        updateAgent(cfg.contentId, {
          ...pContent,
          task: "injecting typography & UI...",
        });
        await wait(300);
        if (myRunId !== runIdRef.current) break;

        materializeElement(el);
        updateAgent(cfg.contentId, { task: "done ✓" });
        setWireframes((prev) => prev.filter((w) => w.key !== boxKey));
        currentBuildingElRef.current[teamIdx] = null;
        currentPhaseRef.current[teamIdx] = "idle";
        await wait(140);
      }

      busyTeamsRef.current[teamIdx] = false;
      currentBuildingElRef.current[teamIdx] = null;
      currentPhaseRef.current[teamIdx] = "idle";

      if (queueRef.current.length > 0 && myRunId === runIdRef.current) {
        runTeamWorker(teamIdx);
      } else {
        setAgents((prev) =>
          prev.map((a) => (a.teamId === teamIdx ? { ...a, active: false } : a))
        );
      }
    },
    [sortQueue, updateAgent]
  );

  const dispatchWorkers = useCallback(() => {
    if (queueRef.current.length === 0) return;
    for (let i = 0; i < 3; i++) {
      if (!busyTeamsRef.current[i] && queueRef.current.length > 0) {
        runTeamWorker(i);
      }
    }
  }, [runTeamWorker]);

  const enqueueElement = useCallback(
    (el: HTMLElement) => {
      if (el.classList.contains("revealed") || queuedSetRef.current.has(el)) return;

      const r = el.getBoundingClientRect();
      // If user already scrolled past it above the screen, materialize immediately with 0 delay!
      if (r.bottom <= 0) {
        materializeElement(el);
        return;
      }

      queuedSetRef.current.add(el);
      queueRef.current.push(el);

      window.setTimeout(() => {
        if (!el.classList.contains("revealed")) {
          materializeElement(el);
        }
      }, 14000);

      sortQueue();
      dispatchWorkers();
    },
    [dispatchWorkers, sortQueue]
  );

  // Dynamic Scroll Listener: keeps active wireframes and cursors pinned to their cards as the user scrolls!
  useEffect(() => {
    const onScroll = () => {
      sortQueue();

      for (let i = 0; i < 3; i++) {
        const el = currentBuildingElRef.current[i];
        if (!el) continue;
        const r = el.getBoundingClientRect();

        // If card was scrolled past above screen, release it immediately!
        if (r.bottom <= 0) {
          materializeElement(el);
          setWireframes((prev) => prev.filter((w) => w.teamId !== i));
          currentBuildingElRef.current[i] = null;
          currentPhaseRef.current[i] = "idle";
          continue;
        }

        // Keep wireframe pinned to scrolling card
        setWireframes((prev) =>
          prev.map((w) =>
            w.teamId === i
              ? {
                  ...w,
                  left: Math.round(r.left),
                  top: Math.round(r.top),
                }
              : w
          )
        );

        // Keep active cursor tracking card position smoothly
        const cfg = TEAM_CONFIGS[i];
        const phase = currentPhaseRef.current[i];
        if (phase === "measure") {
          updateAgent(cfg.archId, clampPos(r.right - 28, r.bottom - 28));
        } else if (phase === "style") {
          updateAgent(
            cfg.styleId,
            clampPos(r.left + r.width * 0.48, r.top + Math.min(r.height * 0.35, 90))
          );
        } else if (phase === "content") {
          updateAgent(
            cfg.contentId,
            clampPos(
              r.left + Math.min(r.width * 0.28, 100),
              r.top + Math.min(r.height * 0.68, 170)
            )
          );
        }
      }

      dispatchWorkers();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [dispatchWorkers, sortQueue, updateAgent]);

  useEffect(() => {
    runIdRef.current += 1;
    busyTeamsRef.current = [false, false, false];
    currentBuildingElRef.current = [null, null, null];
    currentPhaseRef.current = ["idle", "idle", "idle"];
    queueRef.current = [];
    queuedSetRef.current = new WeakSet();
    setWireframes([]);
    setAgents(INITIAL_AGENTS);

    const observed = new Set<HTMLElement>();

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            io.unobserve(el);
            enqueueElement(el);
          }
        });
      },
      { threshold: 0.02, rootMargin: "0px 0px 40px 0px" }
    );

    const setupElement = (el: HTMLElement) => {
      if (observed.has(el) || el.classList.contains("revealed")) return;
      observed.add(el);
      io.observe(el);
    };

    document
      .querySelectorAll<HTMLElement>("[data-reveal], .reveal")
      .forEach(setupElement);

    const mo = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        m.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const el = node as HTMLElement;
            if (el.matches("[data-reveal], .reveal")) setupElement(el);
            el.querySelectorAll<HTMLElement>("[data-reveal], .reveal").forEach(
              setupElement
            );
          }
        });
      });
    });

    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname, enqueueElement]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-40 overflow-hidden"
    >
      {/* Wireframe Outline Boxes with blueprint grid overlay */}
      {wireframes.map((wf) => (
        <div
          key={wf.key}
          style={{
            left: `${wf.left}px`,
            top: `${wf.top}px`,
            width: `${wf.width}px`,
            height: `${wf.height}px`,
            borderColor: wf.color,
            transition:
              "width 0.38s cubic-bezier(0.25, 1, 0.5, 1), height 0.38s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.25s ease",
          }}
          className="fixed rounded-2xl border-2 border-dashed bg-indigo-500/[0.04] backdrop-blur-[1px]"
        >
          <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-25 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:12px_12px]" />

          <span
            style={{ backgroundColor: wf.color }}
            className="absolute -top-5 left-2 px-1.5 py-0.5 rounded text-[9px] font-mono text-white shadow-md font-semibold transition-colors duration-200"
          >
            {wf.label}
          </span>
        </div>
      ))}

      {/* Dynamic Cursors with smooth gliding & radar ping indicator */}
      {agents
        .filter((agent) => agent.active)
        .map((agent) => (
          <div
            key={agent.id}
            style={{
              left: `${agent.x}px`,
              top: `${agent.y}px`,
              transition:
                "left 0.44s cubic-bezier(0.25, 1, 0.5, 1), top 0.44s cubic-bezier(0.25, 1, 0.5, 1)",
            }}
            className="fixed -translate-x-1 -translate-y-1 z-50 pointer-events-none select-none will-change-transform"
          >
            <span
              style={{ borderColor: agent.color }}
              className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full border-2 animate-ping opacity-40"
            />

            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              className="drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)] relative z-10"
            >
              <path
                d="M4 3L20 10.5L12.5 13L10 20.5L4 3Z"
                fill={agent.color}
                stroke="#ffffff"
                strokeWidth="1.75"
                strokeLinejoin="round"
              />
            </svg>

            <div
              className={`ml-4 -mt-1.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${agent.badgeBg} text-white text-[10px] font-mono shadow-xl border border-white/20 whitespace-nowrap backdrop-blur-sm`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span className="font-bold tracking-tight">{agent.name}</span>
              <span className="opacity-90 hidden sm:inline font-medium">
                · {agent.task}
              </span>
            </div>
          </div>
        ))}
    </div>
  );
}
