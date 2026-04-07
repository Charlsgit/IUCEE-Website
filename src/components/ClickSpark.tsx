"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Spark {
  id: number;
  x: number;
  y: number;
}

export default function ClickSpark() {
  const [sparks, setSparks] = useState<Spark[]>([]);

  const handleGlobalClick = useCallback((e: MouseEvent) => {
    // Determine target class or ID to optionally avoid spark on specific things if needed
    // But currently we'll spark everywhere!
    const newSpark: Spark = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY,
    };

    setSparks((prev) => [...prev, newSpark]);

    // Cleanup after animation completes
    setTimeout(() => {
      setSparks((prev) => prev.filter((spark) => spark.id !== newSpark.id));
    }, 600);
  }, []);

  useEffect(() => {
    window.addEventListener("click", handleGlobalClick);
    return () => window.removeEventListener("click", handleGlobalClick);
  }, [handleGlobalClick]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      <AnimatePresence>
        {sparks.map((spark) => (
          <SparkAnimation key={spark.id} x={spark.x} y={spark.y} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function SparkAnimation({ x, y }: { x: number; y: number }) {
  // Generate 8 lines radiating outward
  const lines = Array.from({ length: 8 });

  return (
    <div
      className="absolute"
      style={{ left: x, top: y }}
    >
      {/* Central glow flash */}
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_15px_3px_rgba(16,185,129,0.8)] dark:shadow-[0_0_15px_3px_rgba(16,185,129,1)]"
        initial={{ width: 4, height: 4, opacity: 1, scale: 1 }}
        animate={{ width: 16, height: 16, opacity: 0, scale: 2 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />

      {/* Radiating spark lines */}
      {lines.map((_, i) => {
        const angle = (i * 360) / lines.length;
        // Convert to radians
        const rad = (angle * Math.PI) / 180;
        // Distance the particle travels
        const distance = 40; 
        
        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-emerald-500 dark:bg-emerald-400 origin-left"
            style={{
              height: "2px",
              top: "-1px", // Center it vertically relative to the origin
            }}
            initial={{ 
              width: 0, 
              rotate: angle, 
              opacity: 1,
              x: 0, 
              y: 0 
            }}
            animate={{ 
              width: [0, 15, 0], 
              x: Math.cos(rad) * distance, 
              y: Math.sin(rad) * distance,
              opacity: [1, 1, 0] 
            }}
            transition={{
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1], // snappy ease out
            }}
          />
        );
      })}
    </div>
  );
}
