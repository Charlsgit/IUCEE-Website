"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

export interface TestimonialItem {
  id: string | number;
  name: string;
  role: string;
  description: string;
  image?: string;
}

interface TestimonialsCardProps {
  items: TestimonialItem[];
  className?: string;
}

export default function TestimonialsCard({ items, className }: TestimonialsCardProps) {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + items.length) % items.length);
  };

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={cn("relative w-full max-w-3xl mx-auto h-[580px] sm:h-[500px] md:h-[420px]", className)}>
      <div className="absolute top-1/2 left-4 md:-left-12 -translate-y-1/2 z-50">
        <button
          onClick={handlePrev}
          className="p-2 rounded-full bg-white border border-zinc-200 text-zinc-600 hover:text-zinc-900 shadow-sm transition-colors dark:bg-[#0a0a0a] dark:border-white/10 dark:text-zinc-400 dark:hover:text-white"
        >
          <ChevronLeft size={24} />
        </button>
      </div>

      <div className="absolute top-1/2 right-4 md:-right-12 -translate-y-1/2 z-50">
        <button
          onClick={handleNext}
          className="p-2 rounded-full bg-white border border-zinc-200 text-zinc-600 hover:text-zinc-900 shadow-sm transition-colors dark:bg-[#0a0a0a] dark:border-white/10 dark:text-zinc-400 dark:hover:text-white"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="relative w-full h-full flex justify-center perspective-[1000px]">
        <AnimatePresence>
          {items.map((item, index) => {
            const isActive = index === active;
            
            // Calculate relative offset
            let offset = index - active;
            // Handle wrap-around visually
            if (offset < 0) {
              offset += items.length;
            }

            // We only show items if they are close in the stack (e.g. up to 3 deep)
            const isVisible = offset < 3;
            
            if (!isVisible) return null;

            return (
              <motion.div
                key={item.id}
                initial={{
                  opacity: 0,
                  y: 50,
                  scale: 0.9,
                  rotateX: 10,
                }}
                animate={{
                  opacity: 1 - offset * 0.3,
                  y: offset * 30, // Stack offsets down
                  scale: 1 - offset * 0.05,
                  z: -offset * 100, // Move back in 3D space
                  rotateX: offset === 0 ? 0 : 5, // Slight tilt for inactive
                }}
                exit={{
                  opacity: 0,
                  y: -50,
                  scale: 1.1,
                  filter: "blur(4px)",
                }}
                transition={{
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1], // Custom bouncy ease
                }}
                className={cn(
                  "absolute inset-0 flex flex-col justify-between p-8 md:p-12 rounded-3xl bg-white border border-zinc-200 dark:bg-[#0a0a0a] dark:border-white/10 shadow-xl",
                  isActive ? "z-40" : "z-30 pointer-events-none"
                )}
                style={{
                  transformOrigin: "top center",
                }}
              >
                <div className="text-zinc-200 dark:text-zinc-700 mb-6 shrink-0">
                  <Quote size={40} className="fill-current" />
                </div>
                
                <p className="text-base md:text-lg leading-relaxed md:leading-relaxed text-zinc-700 dark:text-zinc-300 font-light italic flex-grow relative z-10 overflow-y-auto pr-2" style={{ scrollbarWidth: 'none' }}>
                  "{item.description}"
                </p>

                <div className="flex items-center gap-4 mt-8 pt-6 border-t border-zinc-100 dark:border-white/5 relative z-10 shrink-0">
                  {item.image ? (
                    <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border border-zinc-200 dark:border-white/10">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center shrink-0 border border-emerald-200 dark:border-emerald-800/30">
                      <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                        {item.name[0]}
                      </span>
                    </div>
                  )}
                  <div>
                    <h4 className="font-bold text-zinc-900 dark:text-white leading-tight">
                      {item.name}
                    </h4>
                    <p className="text-[10px] uppercase tracking-[0.16em] text-emerald-600 dark:text-emerald-400 font-bold mt-1">
                      {item.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
