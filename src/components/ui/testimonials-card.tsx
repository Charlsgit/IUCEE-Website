"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote, X, Linkedin } from "lucide-react";

export interface TestimonialItem {
  id: string | number;
  title: string;
  subtitle?: string;
  description: string;
  image?: string;
  imagePosition?: string; // CSS object-position, e.g. "50% 20%"
  linkedin?: string;
}

interface TestimonialsCardProps {
  items: TestimonialItem[];
  className?: string;
  autoPlayInterval?: number;
}

// ── macOS Genie spring physics ───────────────────────────────────────────────
// The "genie" warp: card unrolls from bottom-center, scaleX compresses first,
// then blooms open with dampened spring — mimicking the dock pop.
const genieCard = {
  hidden: {
    opacity: 0,
    scaleX: 0.45,
    scaleY: 0.08,
    y: 48,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    scaleX: 1,
    scaleY: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      scaleY: { type: "spring", stiffness: 340, damping: 22, mass: 0.7 },
      scaleX: { type: "spring", stiffness: 280, damping: 26, mass: 0.8, delay: 0.04 },
      opacity: { duration: 0.18 },
      filter: { duration: 0.25 },
      y:      { type: "spring", stiffness: 380, damping: 28 },
      staggerChildren: 0.07,
      delayChildren: 0.18,
    },
  },
  exit: {
    opacity: 0,
    scaleX: 0.3,
    scaleY: 0.06,
    y: 32,
    filter: "blur(12px)",
    transition: {
      duration: 0.26,
      ease: [0.4, 0, 0.8, 1], // fast accelerate — genie "suck"
      staggerChildren: 0.03,
      staggerDirection: -1,
    },
  },
};

const genieChild: any = {
  hidden: { opacity: 0, y: 14, filter: "blur(4px)" },
  visible: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.38, ease: [0.16, 1, 0.3, 1] },
  },
  exit: { opacity: 0, y: 6, filter: "blur(2px)",
    transition: { duration: 0.14 } },
};

// ── Slide variants for testimonial card ─────────────────────────────────────
const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ?  72 : -72, opacity: 0, scale: 0.97 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit:  (dir: number) => ({ x: dir > 0 ? -72 :  72, opacity: 0, scale: 0.97 }),
};

// ── Component ────────────────────────────────────────────────────────────────
export function TestimonialsCard({
  items,
  className = "",
  autoPlayInterval = 6000,
}: TestimonialsCardProps) {
  const [active, setActive]       = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [expanded, setExpanded]   = useState<TestimonialItem | null>(null);

  const next = useCallback(() => {
    setDirection(1);
    setActive((p) => (p + 1) % items.length);
  }, [items.length]);

  const prev = useCallback(() => {
    setDirection(-1);
    setActive((p) => (p - 1 + items.length) % items.length);
  }, [items.length]);

  // Pause auto-play while profile panel is open
  useEffect(() => {
    if (expanded) return;
    const t = setInterval(next, autoPlayInterval);
    return () => clearInterval(t);
  }, [next, autoPlayInterval, expanded]);

  const current = items[active];

  return (
    <>
      <div className={`relative w-full max-w-3xl mx-auto ${className}`}>

        {/* ── Prev / Next ─────────────────────────────────────────────── */}
        <button onClick={prev} aria-label="Previous testimonial"
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-14 z-20 p-2.5 rounded-full bg-white border border-zinc-200 text-zinc-500 hover:text-zinc-900 shadow-sm hover:shadow-md transition-all dark:bg-[#0a0a0a] dark:border-white/10 dark:text-zinc-400 dark:hover:text-white">
          <ChevronLeft size={20} />
        </button>
        <button onClick={next} aria-label="Next testimonial"
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-14 z-20 p-2.5 rounded-full bg-white border border-zinc-200 text-zinc-500 hover:text-zinc-900 shadow-sm hover:shadow-md transition-all dark:bg-[#0a0a0a] dark:border-white/10 dark:text-zinc-400 dark:hover:text-white">
          <ChevronRight size={20} />
        </button>

        {/* ── Testimonial card ─────────────────────────────────────────── */}
        <div className="overflow-hidden rounded-3xl">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
              className="relative bg-white dark:bg-[#0a0a0a] border border-zinc-100 dark:border-white/[0.07] rounded-3xl p-8 md:p-12 shadow-lg"
            >
              {/* Decorative quote */}
              <div className="absolute top-8 right-8 text-zinc-100 dark:text-white/[0.035] pointer-events-none">
                <Quote size={64} className="fill-current" />
              </div>

              {/* Quote text */}
              <p className="relative z-10 text-base md:text-lg leading-[1.8] text-zinc-600 dark:text-zinc-300 font-light italic mb-10">
                &ldquo;{current.description}&rdquo;
              </p>

              {/* Author row */}
              <div className="flex items-center gap-4">

                {/* Avatar — click triggers genie profile */}
                <button
                  onClick={() => setExpanded(current)}
                  aria-label={`View ${current.title}'s profile`}
                  className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-zinc-100 dark:border-white/10 hover:border-emerald-400/60 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer shadow-sm"
                >
                  {current.image ? (
                    <Image
                      src={current.image}
                      alt={current.title}
                      fill
                      className="object-cover"
                      style={{ objectPosition: current.imagePosition ?? "50% top" }}
                    />
                  ) : (
                    <div className="w-full h-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center">
                      <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                        {current.title[0]}
                      </span>
                    </div>
                  )}
                </button>

                {/* Name + role — also clickable */}
                <button onClick={() => setExpanded(current)} className="text-left group">
                  <p className="font-bold text-zinc-900 dark:text-white leading-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-200">
                    {current.title}
                  </p>
                  {current.subtitle && (
                    <p className="text-[10px] uppercase tracking-[0.16em] text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">
                      {current.subtitle}
                    </p>
                  )}
                </button>

                {/* Dot indicators */}
                <div className="ml-auto flex items-center gap-1.5">
                  {items.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => { setDirection(i > active ? 1 : -1); setActive(i); }}
                      aria-label={`Go to testimonial ${i + 1}`}
                      className={`rounded-full transition-all duration-300 ${
                        i === active
                          ? "w-5 h-1.5 bg-emerald-500"
                          : "w-1.5 h-1.5 bg-zinc-300 dark:bg-white/20 hover:bg-emerald-400"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Premium Profile Panel ─────────────────────────────────────────── */}
      <AnimatePresence>
        {expanded && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-[8px]"
              onClick={() => setExpanded(null)}
            />

            {/* Panel */}
            <div className="fixed inset-0 z-50 flex items-center justify-center px-4 pointer-events-none">
              <motion.div
                variants={genieCard as any}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="pointer-events-auto relative w-full max-w-[320px] overflow-hidden rounded-2xl border border-white/10 shadow-[0_0_60px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.05)]"
                style={{
                  transformOrigin: "center bottom",
                  background: "linear-gradient(145deg, rgba(15,20,25,0.97) 0%, rgba(10,14,20,0.99) 100%)",
                  backdropFilter: "blur(24px)",
                }}
              >
                {/* ── SVG network background ── */}
                <svg className="absolute inset-0 w-full h-full opacity-[0.07] pointer-events-none" aria-hidden>
                  <defs>
                    <radialGradient id="ng" cx="50%" cy="0%" r="70%">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="1"/>
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0"/>
                    </radialGradient>
                  </defs>
                  {/* grid dots */}
                  {Array.from({ length: 6 }).map((_, r) =>
                    Array.from({ length: 5 }).map((_, c) => (
                      <circle key={`${r}-${c}`} cx={c * 64 + 16} cy={r * 60 + 16} r="1.5" fill="#10b981" />
                    ))
                  )}
                  {/* connector lines */}
                  <line x1="80"  y1="16"  x2="208" y2="76"  stroke="#10b981" strokeWidth="0.8"/>
                  <line x1="144" y1="76"  x2="272" y2="16"  stroke="#10b981" strokeWidth="0.8"/>
                  <line x1="16"  y1="76"  x2="144" y2="136" stroke="#10b981" strokeWidth="0.8"/>
                  <line x1="208" y1="136" x2="272" y2="76"  stroke="#10b981" strokeWidth="0.8"/>
                  <rect x="0" y="0" width="100%" height="100%" fill="url(#ng)"/>
                </svg>

                {/* ── Top emerald glow strip ── */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-70" />

                {/* ── Close button ── */}
                <motion.button
                  variants={genieChild}
                  onClick={() => setExpanded(null)}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-all"
                >
                  <X size={14} />
                </motion.button>

                {/* ── Content ── */}
                <div className="relative z-10 flex flex-col items-center px-8 pt-10 pb-8">

                  {/* Avatar with glowing ring */}
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22, delay: 0.1 }}
                    className="relative mb-5"
                  >
                    {/* Outer glow ring */}
                    <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-md scale-110" />
                    {/* Ring */}
                    <div
                      className="relative rounded-full p-[3px]"
                      style={{ background: "linear-gradient(135deg, #10b981, #059669, #34d399)" }}
                    >
                      <div
                        style={{
                          width: 100,
                          height: 100,
                          borderRadius: "50%",
                          overflow: "hidden",
                          position: "relative",
                          background: "#0f1419",
                        }}
                      >
                        {expanded.image ? (
                          <Image
                            src={expanded.image}
                            alt={expanded.title}
                            fill
                            className="object-cover"
                            style={{ objectPosition: expanded.imagePosition ?? "50% top" }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-4xl font-black text-emerald-400">
                              {expanded.title[0]}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>

                  {/* Name */}
                  <motion.h3
                    variants={genieChild}
                    className="text-lg font-black text-white tracking-tight text-center leading-tight mb-3"
                  >
                    {expanded.title}
                  </motion.h3>

                  {/* Role — emerald pill badge */}
                  {expanded.subtitle && (
                    <motion.div variants={genieChild}>
                      <span className="inline-flex items-center px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-300 border border-emerald-500/30 bg-emerald-500/10">
                        {expanded.subtitle}
                      </span>
                    </motion.div>
                  )}

                  {/* Divider */}
                  <motion.div
                    variants={genieChild}
                    className="w-full mt-6 mb-5 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  />

                  {/* LinkedIn CTA */}
                  <motion.div variants={genieChild} className="w-full">
                    {expanded.linkedin ? (
                      <a
                        href={expanded.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative flex items-center justify-center gap-2.5 w-full px-5 py-2.5 rounded-xl text-sm font-semibold text-white overflow-hidden transition-all duration-300 border border-[#0A66C2]/40 hover:border-[#0A66C2]/80"
                        style={{ background: "rgba(10, 102, 194, 0.12)" }}
                      >
                        {/* hover glow sweep */}
                        <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{ background: "linear-gradient(90deg, transparent, rgba(10,102,194,0.25), transparent)" }}
                        />
                        <Linkedin size={15} className="text-[#5ba3e0] shrink-0 relative z-10" />
                        <span className="relative z-10 text-[#5ba3e0] group-hover:text-white transition-colors">View LinkedIn Profile</span>
                      </a>
                    ) : (
                      <span className="flex items-center justify-center gap-2 w-full px-5 py-2.5 rounded-xl text-sm text-zinc-600 border border-white/5 bg-white/[0.03]">
                        <Linkedin size={15} />
                        LinkedIn not linked
                      </span>
                    )}
                  </motion.div>

                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
