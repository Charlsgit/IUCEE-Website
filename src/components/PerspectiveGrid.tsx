"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface PerspectiveGridProps {
  className?: string;
}

export default function PerspectiveGrid({ className }: PerspectiveGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Use window coordinates if we want the glow to follow the mouse anywhere on the page
      // but shifted so it matches the container's relative position.
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      containerRef.current.style.setProperty("--mouse-x", `${x}px`);
      containerRef.current.style.setProperty("--mouse-y", `${y}px`);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute inset-0 z-0 pointer-events-none overflow-hidden",
        className
      )}
      style={{
        perspective: "1000px",
      }}
    >
      <div
        className="absolute inset-x-0 bottom-0 h-[150%] origin-bottom"
        style={{
          transform: "rotateX(70deg) translateY(100px)",
          backgroundImage: `
            linear-gradient(to right, rgba(16, 185, 129, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(16, 185, 129, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          
          /* Mask so the top fades out before the horizon */
          maskImage: "linear-gradient(to top, black 20%, transparent 80%)",
          WebkitMaskImage: "linear-gradient(to top, black 20%, transparent 80%)",
          
          animation: "moveGrid 15s linear infinite"
        }}
      />

      {/* Interactive Glowing Spotlight */}
      <div
        className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-300"
        style={{
          background: "radial-gradient(circle 350px at var(--mouse-x, -500px) var(--mouse-y, -500px), rgba(16, 185, 129, 0.2), transparent 80%)",
          mixBlendMode: "screen"
        }}
      />
      
      {/* Global styles for the animation, since Tailwind doesn't have an arbitrary keyframe utility for this specific dynamic translation without config */}
      <style>{`
        @keyframes moveGrid {
          0% {
            background-position: 0px 0px;
          }
          100% {
            background-position: 0px 60px; /* Moves exactly one grid cell size so it loops seamlessly */
          }
        }
      `}</style>
    </div>
  );
}
