"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrainCircuit, Cpu, Wheat, Code, X, Activity, ChevronRight, CheckCircle2 } from "lucide-react";
import projectsData from "@/data/projects.json";

// Types
type Category = "AI" | "IoT" | "Sustainability" | "Software";

type Project = {
  id: string;
  title: string;
  shortDescription: string;
  problem: string;
  solution: string;
  howItWorks: string[];
  tech: string[];
  progress: number;
  category: Category;
  status: string;
};

// Utilities
const getCategoryColors = (category: Category) => {
  switch (category) {
    case "AI":
      return {
        bg: "bg-blue-500",
        bgLight: "bg-blue-500/10",
        border: "border-blue-500/20",
        hoverBorder: "hover:border-blue-500/40",
        text: "text-blue-500",
        icon: BrainCircuit,
      };
    case "IoT":
      return {
        bg: "bg-emerald-500",
        bgLight: "bg-emerald-500/10",
        border: "border-emerald-500/20",
        hoverBorder: "hover:border-emerald-500/40",
        text: "text-emerald-500",
        icon: Cpu,
      };
    case "Sustainability":
      return {
        bg: "bg-yellow-500",
        bgLight: "bg-yellow-500/10",
        border: "border-yellow-500/20",
        hoverBorder: "hover:border-yellow-500/40",
        text: "text-yellow-500",
        icon: Wheat,
      };
    case "Software":
    default:
      return {
        bg: "bg-purple-500",
        bgLight: "bg-purple-500/10",
        border: "border-purple-500/20",
        hoverBorder: "hover:border-purple-500/40",
        text: "text-purple-500",
        icon: Code,
      };
  }
};

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProject(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#050505] text-zinc-900 dark:text-zinc-50 overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(30,86,49,0.06),transparent)] pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)", backgroundSize: "64px 64px" }} />

      {/* Header Section */}
      <section className="pt-40 pb-12 px-6 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-500 mb-4">
              Active Projects
            </span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight mb-4 dark:text-white">
              Innovative solutions built by students.
            </h1>
            <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl font-light leading-relaxed">
              Explore our portfolio of 20+ active engineering initiatives tackling real-world problems. Scroll horizontally or click below for details.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Horizontal Scroll Layout */}
      <section className="pb-24 relative z-10 px-6 overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-12">
          {projectsData.map((project, i) => {
            const p = project as Project;
            const colors = getCategoryColors(p.category);
            const Icon = colors.icon;

            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedProject(p)}
                className={`group relative flex flex-col h-full rounded-none p-6 cursor-pointer bg-white dark:bg-[#0a0a0a] border border-zinc-200 dark:border-white/10 shadow-sm hover:shadow-xl transition-all duration-300 ${colors.hoverBorder}`}
              >
                {/* Header: Icon + Status Badge */}
                <div className="flex items-center justify-between mb-5">
                  <div className={`w-10 h-10 rounded-none flex items-center justify-center border ${colors.bgLight} ${colors.border}`}>
                    <Icon size={18} className={colors.text} />
                  </div>
                  <span className={`px-2.5 py-1 rounded-none text-[10px] font-bold uppercase tracking-widest border ${colors.text} ${colors.bgLight} ${colors.border}`}>
                    {p.status}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-lg font-black text-zinc-900 dark:text-white leading-snug mb-2 group-hover:text-zinc-700 dark:group-hover:text-zinc-200 transition-colors line-clamp-2">
                  {p.title}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-3 mb-6 flex-grow">
                  {p.shortDescription}
                </p>

                {/* Tech Pills (Truncated to max 3) */}
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {p.tech.slice(0, 3).map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded-none text-[10px] font-medium bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-300">
                      {t}
                    </span>
                  ))}
                  {p.tech.length > 3 && (
                    <span className="px-2 py-0.5 rounded-none text-[10px] font-medium bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-500">
                      +{p.tech.length - 3}
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
          </div>
        </div>
      </section>

      {/* ── EXPANDING MODAL (DETAIL VIEW) ── */}
      <AnimatePresence>
        {selectedProject && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Dialog */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="pointer-events-auto relative w-full max-w-2xl max-h-[85vh] bg-white dark:bg-[#0a0a0a] border border-zinc-200 dark:border-white/10 rounded-none shadow-2xl overflow-hidden flex flex-col"
              >
                {/* Modal Header & Close Button */}
                <div className="flex items-center justify-between p-6 border-b border-zinc-100 dark:border-white/5 shrink-0 bg-zinc-50/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md sticky top-0 z-10">
                  <div className="flex items-center gap-3">
                    {/* Category Icon */}
                    {(() => {
                      const colors = getCategoryColors(selectedProject.category);
                      const Icon = colors.icon;
                      return (
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${colors.bgLight} ${colors.border}`}>
                          <Icon size={18} className={colors.text} />
                        </div>
                      );
                    })()}
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 block mb-0.5">
                        {selectedProject.category}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-zinc-900 dark:text-white border border-zinc-200 dark:border-white/10 px-2 rounded bg-zinc-100 dark:bg-white/5">
                          {selectedProject.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedProject(null)}
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 hover:bg-zinc-200 dark:hover:bg-white/10 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-all focus:outline-none"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Scrollable Content Base */}
                <div className="overflow-y-auto p-6 md:p-10 hide-scrollbar">
                  {/* Title */}
                  <h2 className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white leading-tight mb-8">
                    {selectedProject.title}
                  </h2>

                  <hr className="border-t border-zinc-100 dark:border-white/5 mb-10" />

                  {/* Body Content */}
                  <div className="space-y-12">
                    {/* Problem */}
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-widest text-red-500 mb-3 flex items-center gap-2">
                        <Activity size={14} /> The Problem
                      </h3>
                      <p className="text-base text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium">
                        {selectedProject.problem}
                      </p>
                    </div>

                    {/* Solution */}
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-500 mb-3 flex items-center gap-2">
                         The Solution
                      </h3>
                      <p className="text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
                        {selectedProject.solution}
                      </p>
                    </div>

                    {/* Tech Stack Tags */}
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4 flex items-center gap-2">
                         Technical Foundation
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tech.map(t => (
                          <span key={t} className="px-3 py-1 rounded-full text-xs font-medium bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-zinc-300">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* How It Works / Timeline */}
                    {selectedProject.howItWorks && selectedProject.howItWorks.length > 0 && (
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-5 flex items-center gap-2">
                          How It Works / Phasing
                        </h3>
                        <div className="space-y-4">
                          {selectedProject.howItWorks.map((step, idx) => (
                            <div key={idx} className="flex gap-4 items-start">
                              <div className={`mt-0.5 shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold bg-blue-500/10 text-blue-500 border border-blue-500/20`}>
                                {idx + 1}
                              </div>
                              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                {step}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Bottom padding for scrollability */}
                  <div className="h-8" />
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
      
      {/* CSS overrides for hiding scrollbar */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .mask-edges { mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent); }
      `}} />
    </div>
  );
}
