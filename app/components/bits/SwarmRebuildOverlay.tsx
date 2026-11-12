"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

type AgentCursor = {
  id: string;
  name: string;
  color: string;
  badgeBg: string;
  x: number;
  y: number;
  task: string;
};

type WireframeBox = {
  key: string;
  left: number;
  top: number;
  width: number;
  height: number;
  color: string;
  label: string;
};

const INITIAL_AGENTS: AgentCursor[] = [
  {
    id: "architect",
    name: "Architect AI",
    color: "#6366f1",
    badgeBg: "bg-indigo-600",
    x: 180,
    y: 180,
    task: "ready",
  },
  {
    id: "style",
    name: "Style Agent",
    color: "#06b6d4",
    badgeBg: "bg-cyan-600",
    x: 340,
    y: 220,
    task: "ready",
  },
  {
    id: "content",
    name: "Text & QA AI",
    color: "#10b981",
    badgeBg: "bg-emerald-600",
    x: 500,
    y: 200,
    task: "ready",
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

/**
 * AI Swarm Rebuild Overlay:
 * Builds each [data-reveal] / .reveal element one-by-one in a 3-agent pipeline:
 * 1. Architect AI measures the empty slot & draws a wireframe box with dimensions (W × H)
 * 2. Style Agent builds the card shell (.swarm-shell)
 * 3. Text & QA AI injects the crisp text & content (.revealed)
 */
export default function SwarmRebuildOverlay() {
  const pathname = usePathname();
  const [agents, setAgents] = useState<AgentCursor[]>(INITIAL_AGENTS);
  const [wireframes, setWireframes] = useState<WireframeBox[]>([]);
  const [active, setActive] = useState(false);

  const queueRef = useRef<HTMLElement[]>([]);
  const queuedSetRef = useRef<WeakSet<HTMLElement>>(new WeakSet());
  const runningRef = useRef(false);
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

  const sortQueue = () => {
    queueRef.current.sort((a, b) => {
      const ra = a.getBoundingClientRect();
      const rb = b.getBoundingClientRect();
      if (Math.abs(ra.top - rb.top) > 24) return ra.top - rb.top;
      return ra.left - rb.left;
    });
  };

  const clampPos = (x: number, y: number) => ({
    x: Math.round(Math.max(16, Math.min(window.innerWidth - 170, x))),
    y: Math.round(Math.max(16, Math.min(window.innerHeight - 56, y))),
  });

  const runPipeline = useCallback(async () => {
    if (runningRef.current) return;
    runningRef.current = true;
    const myRunId = runIdRef.current;

    while (queueRef.current.length > 0) {
      if (myRunId !== runIdRef.current) break;

      sortQueue();
      const el = queueRef.current.shift();
      if (!el) break;

      const r0 = el.getBoundingClientRect();
      if (r0.width === 0 || r0.height === 0 || el.classList.contains("revealed")) {
        materializeElement(el);
        continue;
      }

      setActive(true);
      const boxKey = `wf-${++boxCounterRef.current}`;

      // STEP 1: Architect AI moves to top-left & measures the card slot
      const p1 = clampPos(r0.left + 16, r0.top + 16);
      updateAgent("architect", {
        ...p1,
        task: `measuring ${Math.round(r0.width)}×${Math.round(r0.height)}px`,
      });
      await wait(200);
      if (myRunId !== runIdRef.current) break;

      const r1 = el.getBoundingClientRect();
      setWireframes((prev) => [
        ...prev,
        {
          key: boxKey,
          left: Math.round(r1.left),
          top: Math.round(r1.top),
          width: Math.round(r1.width),
          height: Math.round(r1.height),
          color: "#6366f1",
          label: `${Math.round(r1.width)} × ${Math.round(r1.height)}px`,
        },
      ]);
      await wait(160);
      if (myRunId !== runIdRef.current) break;

      // STEP 2: Style Agent moves to card & builds the container shell
      const r2 = el.getBoundingClientRect();
      const p2 = clampPos(
        r2.left + Math.min(r2.width * 0.45, 160),
        r2.top + Math.min(r2.height * 0.35, 70)
      );
      updateAgent("style", { ...p2, task: "styling card..." });
      await wait(180);
      if (myRunId !== runIdRef.current) break;

      el.classList.add("swarm-shell");
      setWireframes((prev) =>
        prev.map((w) =>
          w.key === boxKey ? { ...w, color: "#06b6d4", label: "container ✓" } : w
        )
      );
      await wait(140);
      if (myRunId !== runIdRef.current) break;

      // STEP 3: Text & QA AI moves to content area & injects crisp text
      const r3 = el.getBoundingClientRect();
      const p3 = clampPos(
        r3.left + Math.min(r3.width * 0.25, 90),
        r3.top + Math.min(r3.height * 0.6, 110)
      );
      updateAgent("content", { ...p3, task: "writing text..." });
      await wait(180);
      if (myRunId !== runIdRef.current) break;

      materializeElement(el);
      updateAgent("content", { task: "done ✓" });
      setWireframes((prev) => prev.filter((w) => w.key !== boxKey));
      await wait(100);
    }

    if (myRunId === runIdRef.current) {
      runningRef.current = false;
      await wait(650);
      if (myRunId === runIdRef.current && queueRef.current.length === 0) {
        setActive(false);
      }
    } else {
      runningRef.current = false;
    }
  }, [updateAgent]);

  const enqueueElement = useCallback(
    (el: HTMLElement) => {
      if (el.classList.contains("revealed") || queuedSetRef.current.has(el)) return;
      queuedSetRef.current.add(el);
      queueRef.current.push(el);

      // Generous safety fallback so no element can stay hidden even on huge pages
      window.setTimeout(() => {
        if (!el.classList.contains("revealed")) {
          materializeElement(el);
        }
      }, 18000);

      runPipeline();
    },
    [runPipeline]
  );

  useEffect(() => {
    runIdRef.current += 1;
    runningRef.current = false;
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
      { threshold: 0.02, rootMargin: "0px 0px -10px 0px" }
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
      className={`pointer-events-none fixed inset-0 z-40 overflow-hidden transition-opacity duration-500 ${
        active ? "opacity-100" : "opacity-0"
      }`}
    >
        {wireframes.map((wf) => (
          <div
            key={wf.key}
            style={{
              left: `${wf.left}px`,
              top: `${wf.top}px`,
              width: `${wf.width}px`,
              height: `${wf.height}px`,
              borderColor: wf.color,
            }}
            className="fixed rounded-2xl border-2 border-dashed bg-indigo-500/[0.05] transition-colors duration-200"
          >
            <span
              style={{ backgroundColor: wf.color }}
              className="absolute -top-5 left-2 px-1.5 py-0.5 rounded text-[9px] font-mono text-white shadow"
            >
              {wf.label}
            </span>
          </div>
        ))}

        {agents.map((agent) => (
          <div
            key={agent.id}
            style={{
              left: `${agent.x}px`,
              top: `${agent.y}px`,
              transition:
                "left 0.2s cubic-bezier(0.22, 1, 0.36, 1), top 0.2s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
            className="fixed -translate-x-1 -translate-y-1"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              className="drop-shadow-md"
            >
              <path
                d="M4 3L20 10.5L12.5 13L10 20.5L4 3Z"
                fill={agent.color}
                stroke="white"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>

            <div
              className={`ml-3.5 -mt-1 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full ${agent.badgeBg} text-white text-[10px] font-mono shadow-lg whitespace-nowrap`}
            >
              <span className="font-bold">{agent.name}</span>
              <span className="opacity-90 hidden sm:inline">· {agent.task}</span>
            </div>
          </div>
        ))}
      </div>
  );
}
