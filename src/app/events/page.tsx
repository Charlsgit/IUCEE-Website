"use client";

import { useState, useRef, useEffect } from "react";
import SnakeTimeline from "@/components/SnakeTimeline";
import EventContainer from "@/components/EventContainer";
import eventsData from "@/data/events.json";
import { motion, AnimatePresence } from "framer-motion";

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.08 });
    io.observe(el);
    return () => io.unobserve(el);
  }, []);
  return (
    <div ref={ref} className={`transition-all ease-out duration-700 ${className}`} style={{ transitionDelay: `${delay}ms`, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)" }}>
      {children}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <span className="inline-block text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-600 mb-4">{children}</span>;
}

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "history">("upcoming");

  return (
    <div className="min-h-screen bg-white text-zinc-900 overflow-x-hidden dark:bg-[#050505] dark:text-zinc-50">

      {/* ── PAGE HEADER ──────────────────────────────────────────────── */}
      <section className="relative pt-40 pb-24 overflow-hidden border-b border-zinc-100">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(30,86,49,0.06),transparent)] pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)", backgroundSize: "64px 64px" }} />
        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <Reveal>
            <Label>What's happening</Label>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-[-0.03em] text-zinc-900 leading-tight mb-8 dark:text-white">
              Events &{" "}
              <span className="text-emerald-600">Our History</span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 leading-relaxed max-w-xl font-light">
              Upcoming workshops and activities — plus a timeline of what we've done since we started.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── TABS ─────────────────────────────────────────────────────── */}
      <section className="sticky top-[72px] z-30 bg-white/90 backdrop-blur-xl border-b border-zinc-200 dark:bg-[#050505]/90 dark:border-white/10">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex gap-1 py-3">
            {(["upcoming", "history"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 capitalize focus:outline-none ${
                  activeTab === tab
                    ? "text-zinc-900 bg-zinc-100 dark:text-white dark:bg-white/10"
                    : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-white/5"
                }`}
              >
                {tab === "upcoming" ? "Upcoming Events" : "Chapter History"}
                {activeTab === tab && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute inset-0 rounded-xl bg-zinc-100 dark:bg-white/10"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    style={{ zIndex: -1 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── TAB CONTENT ──────────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {activeTab === "upcoming" ? (
            <section className="py-16 pb-28">
              <div className="container mx-auto px-6 max-w-6xl">
                <EventContainer events={eventsData} />
              </div>
            </section>
          ) : (
            <section className="">
              <SnakeTimeline />
            </section>
          )}
        </motion.div>
      </AnimatePresence>

    </div>
  );
}
