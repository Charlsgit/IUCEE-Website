"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface RightSideGridProps {
  className?: string;
}

export default function RightSideGrid({ className }: RightSideGridProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Emerald green shades with varying opacity for a glassmorphism effect
  const colorPalette = [
    "rgba(16, 185, 129, 0.4)",  // emerald-500 @ 40%
    "rgba(5, 150, 105, 0.5)",   // emerald-600 @ 50%
    "rgba(52, 211, 153, 0.25)", // emerald-400 @ 25%
    "rgba(4, 120, 87, 0.6)",    // emerald-700 @ 60%
    "rgba(110, 231, 183, 0.15)",// emerald-300 @ 15%
  ];

  return (
    <div
      className={cn(
        "fixed inset-0 w-full h-full z-0 pointer-events-none overflow-hidden",
        className
      )}
      style={{
        perspective: "1000px",
        perspectiveOrigin: "50% 0%",
      }}
    >
      <div
        className="absolute inset-x-0 top-[-200%] bottom-0 origin-bottom pointer-events-auto overflow-hidden"
        style={{
          transform: "rotateX(65deg) translateY(100px)",
          /* Mask so the top fades out much later, allowing it to reach the top of the screen */
          maskImage: "linear-gradient(to top, black 5%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to top, black 5%, transparent 100%)",
          WebkitMaskComposite: "source-in",
          maskComposite: "intersect",
        }}
      >
         {/* The Grid Layer wrapping the cells, which animates forward */}
         <div 
           className="w-full h-full flex flex-wrap content-start"
           style={{ animation: "moveGridForward 10s linear infinite" }}
         >
           {Array.from({ length: 3000 }).map((_, i) => (
             <div
               key={i}
               className="w-[60px] h-[60px] border-r border-b border-emerald-500/40 transition-colors"
               style={{ borderLeft: i % 50 === 0 ? '1px solid rgba(16, 185, 129, 0.4)' : 'none', borderTop: i < 50 ? '1px solid rgba(16, 185, 129, 0.4)' : 'none' }} // Adding missing top/left borders occasionally isn't critical but good for coverage
               onMouseEnter={(e) => {
                 const el = e.currentTarget;
                 el.style.backgroundColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
                 el.style.transitionDuration = '0s';
               }}
               onMouseLeave={(e) => {
                 const el = e.currentTarget;
                 el.style.backgroundColor = 'transparent';
                 el.style.transitionDuration = '1.5s';
               }}
             />
           ))}
         </div>
      </div>

      {/* Occasional Soft Light Sweep */}
      <div 
        className="absolute inset-0 bg-gradient-to-tr from-transparent via-emerald-400/5 to-transparent mix-blend-screen opacity-0 animate-light-sweep pointer-events-none"
      />

      {/* Global styles for the animations */}
      <style>{`
        @keyframes moveGridForward {
          0% {
            transform: translateY(0px);
          }
          100% {
            transform: translateY(60px); /* Moves exactly one grid cell size (60px) */
          }
        }
        
        @keyframes lightSweepAnim {
          0%, 60% {
            opacity: 0;
            transform: translateX(-100%) skewX(-15deg);
          }
          70% {
            opacity: 1;
          }
          80%, 100% {
            opacity: 0;
            transform: translateX(100%) skewX(-15deg);
          }
        }
        
        .animate-light-sweep {
          animation: lightSweepAnim 12s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
