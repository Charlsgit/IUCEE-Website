"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Cpu, Zap, ChevronRight } from "lucide-react";
import projectsData from "@/data/projects.json";

const techColors: Record<string, string> = {
  "ESP32": "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  "ESP8266": "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  "Arduino": "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  "Python": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "C++": "bg-purple-500/10 text-purple-400 border-purple-500/20",
  "ML": "bg-pink-500/10 text-pink-400 border-pink-500/20",
  "IoT": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  "ROS": "bg-red-500/10 text-red-400 border-red-500/20",
  "Pixhawk": "bg-orange-500/10 text-orange-400 border-orange-500/20",
  "MAVLink": "bg-orange-500/10 text-orange-400 border-orange-500/20",
  "Raspberry Pi": "bg-rose-500/10 text-rose-400 border-rose-500/20",
  "OpenCV": "bg-sky-500/10 text-sky-400 border-sky-500/20",
  "YOLOv8": "bg-violet-500/10 text-violet-400 border-violet-500/20",
  "Node-RED": "bg-red-500/10 text-red-400 border-red-500/20",
  "FreeRTOS": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  "React Native": "bg-sky-500/10 text-sky-400 border-sky-500/20",
};

function TechBadge({ label }: { label: string }) {
  const style = techColors[label] ?? "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide border ${style}`}>
      {label}
    </span>
  );
}

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] text-zinc-900 dark:text-zinc-50 overflow-x-hidden">
      {/* Header */}
      <section className="relative pt-40 pb-24 overflow-hidden border-b border-zinc-100 dark:border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(30,86,49,0.08),transparent)] pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)", backgroundSize: "64px 64px" }} />
        <div className="container mx-auto px-6 max-w-5xl relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-600 mb-4">Engineering Work</span>
            <h1 className="text-5xl md:text-7xl font-black tracking-[-0.03em] leading-tight mb-6 dark:text-white">
              Our <span className="text-emerald-500">Projects</span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 max-w-xl font-light leading-relaxed">
              Five active engineering initiatives tackling real-world problems across energy, environment, accessibility, and water systems.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Project Grid */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectsData.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-5%" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Link href={`/projects/${project.id}`} className="group flex flex-col h-full rounded-3xl border border-zinc-200 dark:border-white/8 bg-zinc-50 dark:bg-[#0a0a0a] overflow-hidden hover:-translate-y-1 hover:border-emerald-500/30 dark:hover:border-emerald-500/30 transition-all duration-300 shadow-sm hover:shadow-[0_0_30px_rgba(16,185,129,0.06)]">
                  {/* Card Image Bar */}
                  <div className="relative h-44 bg-black overflow-hidden">
                    <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "linear-gradient(rgba(16,185,129,1) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,1) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/40 via-transparent to-black" />
                    <div className="absolute -top-10 -left-10 w-48 h-48 bg-emerald-500/20 rounded-full blur-[60px] group-hover:bg-emerald-500/30 transition-colors duration-500" />
                    <div className="absolute bottom-4 left-4 z-10">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                        <Cpu size={18} className="text-emerald-400" />
                      </div>
                    </div>
                  </div>
                  {/* Card Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h2 className="text-base font-bold text-zinc-900 dark:text-white mb-3 group-hover:text-emerald-500 transition-colors leading-snug">
                      {project.title}
                    </h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed flex-grow mb-5">
                      {project.teaser}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.techStack.slice(0, 3).map((t) => (
                        <TechBadge key={t} label={t} />
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-white/5">
                      <span className="text-xs text-zinc-400 dark:text-zinc-500 font-medium">
                        {project.milestones.filter((m) => m.completed).length}/{project.milestones.length} milestones
                      </span>
                      <span className="flex items-center gap-1 text-emerald-500 text-xs font-bold group-hover:gap-2 transition-all">
                        View Details <ChevronRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
