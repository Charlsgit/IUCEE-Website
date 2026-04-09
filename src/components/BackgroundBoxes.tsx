"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const BackgroundBoxes = ({
  className,
  ...rest
}: {
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>) => {
  const rows = new Array(20).fill(1); // 20 columns
  const cols = new Array(100).fill(1); // 100 cells per column to cover timeline length

  const colors = [
    "var(--sky-300)",
    "var(--pink-300)",
    "var(--green-300)",
    "var(--yellow-300)",
    "var(--red-300)",
    "var(--purple-300)",
    "var(--blue-300)",
    "var(--indigo-300)",
    "var(--violet-300)",
  ];

  const colorPalette = [
    "#ef476f",
    "#ffd166",
    "#06d6a0",
    "#118ab2",
    "#073b4c",
    "#8338ec",
    "#ff006e",
    "#fb5607",
    "#3a86ff",
    "#FF9800",
    "#4CAF50",
    "#F44336",
    "#9C27B0",
  ];

  const getRandomColor = () => {
    return colorPalette[Math.floor(Math.random() * colorPalette.length)];
  };

  return (
    <div
      style={{
        transform: `translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)`,
      }}
      className={cn(
        "absolute left-1/4 p-4 -top-1/4 flex -translate-x-1/2 -translate-y-1/2 w-full h-full z-0 ",
        className
      )}
      {...rest}
    >
      {rows.map((_, i) => (
        <motion.div
          key={`row` + i}
          className="w-32 h-16 border-l border-zinc-200 dark:border-white/5 relative"
        >
          {cols.map((_, j) => (
            <motion.div
              whileHover={{
                backgroundColor: getRandomColor(),
                transition: { duration: 0 },
              }}
              animate={{
                backgroundColor: "rgba(0, 0, 0, 0)",
                transition: { duration: 2 },
              }}
              key={`col` + j}
              className="w-32 h-16 border-r border-t border-zinc-200 dark:border-white/5 relative"
            >
              {j % 2 === 0 && i % 2 === 0 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="absolute h-6 w-10 -top-[14px] -left-[22px] text-zinc-200 dark:text-white/5 pointer-events-none"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              ) : null}
            </motion.div>
          ))}
        </motion.div>
      ))}
    </div>
  );
};
