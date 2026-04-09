"use client";

import { useRef, useEffect, useState } from "react";
import LightLines from "@/components/LightLines";
import EventContainer from "@/components/EventContainer";
import eventsData from "@/data/events.json";

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
  return (
    <div className="min-h-screen bg-white text-zinc-900 overflow-x-hidden dark:bg-[#050505] dark:text-zinc-50">

      {/* ── PAGE HEADER ──────────────────────────────────────────────── */}
      <section className="relative pt-40 pb-24 overflow-hidden border-b border-zinc-100 dark:border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(30,86,49,0.06),transparent)] pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)", backgroundSize: "64px 64px" }} />
        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <Reveal>
            <Label>What's happening</Label>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-[-0.03em] text-zinc-900 leading-tight mb-8 dark:text-white">
              Upcoming{" "}
              <span className="text-emerald-600">Events</span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 leading-relaxed max-w-xl font-light">
              Workshops, competitions, and activities — here's what's coming up next at IUCEE-EWB HITAM.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── EVENTS ───────────────────────────────────────────────────── */}
      <section className="relative py-16 pb-28 min-h-screen overflow-hidden">
        <div className="fixed inset-0 z-0 pointer-events-none select-none opacity-60 dark:opacity-100">
          <LightLines />
        </div>
        <div className="relative z-10 container mx-auto px-6 max-w-6xl">
          <EventContainer events={eventsData} />
          
          {/* Coming Soon Card */}
          <Reveal delay={200} className="mt-12">
            <div className="w-full relative overflow-hidden rounded-[2rem] bg-white/40 dark:bg-white/[0.02] backdrop-blur-xl border border-zinc-200/70 dark:border-white/10 p-10 md:p-14 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] flex flex-col items-center justify-center group transition-all duration-500 hover:border-emerald-500/30 dark:hover:border-emerald-500/30">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-zinc-50/50 dark:to-black/20 pointer-events-none" />
              
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center mb-6 text-3xl shadow-inner border border-emerald-200 dark:border-emerald-500/20 group-hover:scale-110 transition-transform duration-500">
                  👨‍🍳
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-white mb-3 tracking-tight">
                  More on the horizon
                </h3>
                <p className="text-zinc-500 dark:text-zinc-400 font-medium text-lg max-w-md">
                  We are cooking something else soon! Stay tuned to our socials for the next big drop.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
