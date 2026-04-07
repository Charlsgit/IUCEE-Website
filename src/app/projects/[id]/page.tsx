"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { use } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Circle, AlertTriangle, Lightbulb, Cpu, Radio, Activity } from "lucide-react";
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
    <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold tracking-wide border ${style}`}>
      {label}
    </span>
  );
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const project = projectsData.find((p) => p.id === id);

  if (!project) notFound();

  const completedCount = project.milestones.filter((m) => m.completed).length;
  const progress = Math.round((completedCount / project.milestones.length) * 100);

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] text-zinc-900 dark:text-zinc-50 overflow-x-hidden">

      {/* ── HERO ───────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(16,185,129,0.08),transparent)] pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(16,185,129,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.04) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />

        <div className="container mx-auto px-6 max-w-5xl relative z-10">
          {/* Back Button */}
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 dark:text-zinc-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors mb-10 group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
              Back to Projects
            </Link>
          </motion.div>

          {/* Title & badges */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.techStack.map((t) => <TechBadge key={t} label={t} />)}
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight mb-6 dark:text-white">
              {project.title}
            </h1>
            <p className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl leading-relaxed">{project.teaser}</p>
          </motion.div>

          {/* Hero Placeholder Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 relative h-64 md:h-96 rounded-3xl overflow-hidden border border-emerald-500/20 shadow-[0_0_60px_rgba(16,185,129,0.08)]"
          >
            <div className="absolute inset-0 bg-black" />
            <div className="absolute inset-0 opacity-[0.1]" style={{ backgroundImage: "linear-gradient(rgba(16,185,129,1) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,1) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/50 via-transparent to-black/80" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-emerald-500/20 rounded-full blur-[80px]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Cpu size={48} className="text-emerald-500/60 mx-auto mb-3" />
                <span className="text-emerald-500/60 text-sm font-mono tracking-widest uppercase">Project Visual</span>
              </div>
            </div>
            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-zinc-800">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PROBLEM VS SOLUTION ────────────────────────────────────── */}
      <section className="py-20 px-6 border-t border-zinc-100 dark:border-white/5">
        <div className="container mx-auto max-w-5xl">
          <Reveal>
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-500 mb-4">The Challenge</span>
            <h2 className="text-3xl md:text-4xl font-black mb-12 dark:text-white">Problem <span className="text-emerald-500">vs.</span> Solution</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Problem */}
            <Reveal delay={0.1}>
              <div className="h-full p-8 rounded-3xl bg-red-500/5 border border-red-500/15 backdrop-blur-sm relative overflow-hidden group hover:border-red-500/30 transition-colors duration-300">
                <div className="absolute top-0 right-0 w-40 h-40 bg-red-500/5 rounded-full blur-[60px] pointer-events-none" />
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
                    <AlertTriangle size={18} className="text-red-400" />
                  </div>
                  <h3 className="font-bold text-red-400 uppercase tracking-widest text-xs">The Pain Point</h3>
                </div>
                <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-base">{project.problem}</p>
              </div>
            </Reveal>
            {/* Solution */}
            <Reveal delay={0.2}>
              <div className="h-full p-8 rounded-3xl bg-emerald-500/5 border border-emerald-500/15 backdrop-blur-sm relative overflow-hidden group hover:border-emerald-500/30 transition-colors duration-300">
                <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/5 rounded-full blur-[60px] pointer-events-none" />
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                    <Lightbulb size={18} className="text-emerald-400" />
                  </div>
                  <h3 className="font-bold text-emerald-400 uppercase tracking-widest text-xs">The Innovation</h3>
                </div>
                <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-base">{project.solution}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── TECHNICAL SPECS ────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-zinc-50/50 dark:bg-white/[0.01] border-t border-zinc-100 dark:border-white/5">
        <div className="container mx-auto max-w-5xl">
          <Reveal>
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-500 mb-4">Under the Hood</span>
            <h2 className="text-3xl md:text-4xl font-black mb-12 dark:text-white">Technical <span className="text-emerald-500">Specifications</span></h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { label: "Primary Controller", value: project.techSpecs.controller, icon: Cpu },
              { label: "Sensors Used", value: project.techSpecs.sensors, icon: Activity },
              { label: "Communication Protocol", value: project.techSpecs.protocol, icon: Radio },
            ].map((spec, i) => (
              <Reveal key={spec.label} delay={i * 0.1}>
                <div className="p-7 rounded-3xl bg-white dark:bg-[#0a0a0a] border border-zinc-200 dark:border-white/8 hover:border-emerald-500/30 transition-all duration-300 group hover:-translate-y-1 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-5 group-hover:bg-emerald-500/20 transition-colors">
                    <spec.icon size={18} className="text-emerald-400" />
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-500/70 mb-2">{spec.label}</p>
                  <p className="text-base font-semibold text-zinc-900 dark:text-white leading-snug">{spec.value}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE MILESTONES STEPPER ─────────────────────────── */}
      <section className="py-20 px-6 border-t border-zinc-100 dark:border-white/5">
        <div className="container mx-auto max-w-3xl">
          <Reveal>
            <span className="inline-block text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-500 mb-4">Implementation</span>
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl md:text-4xl font-black dark:text-white">Project <span className="text-emerald-500">Roadmap</span></h2>
              <span className="text-sm font-bold text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full">{progress}% Complete</span>
            </div>
          </Reveal>

          <div className="relative">
            {/* Vertical connector line */}
            <div className="absolute left-5 top-5 bottom-5 w-[2px] bg-zinc-200 dark:bg-white/10 rounded-full">
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: `${progress}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: "easeOut", delay: 0.3 }}
                className="w-full bg-gradient-to-b from-emerald-500 to-emerald-400 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]"
              />
            </div>

            <div className="flex flex-col gap-6 pl-16">
              {project.milestones.map((milestone, i) => (
                <Reveal key={i} delay={i * 0.12}>
                  <div className="relative group">
                    {/* Node */}
                    <div className={`absolute -left-[52px] top-1 w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${milestone.completed ? "border-emerald-500 bg-emerald-500/15 group-hover:bg-emerald-500/25" : "border-zinc-300 dark:border-zinc-700 bg-white dark:bg-[#0a0a0a] group-hover:border-zinc-400"}`}>
                      {milestone.completed ? (
                        <CheckCircle2 size={20} className="text-emerald-500" strokeWidth={2.5} />
                      ) : (
                        <Circle size={20} className="text-zinc-400" />
                      )}
                    </div>

                    {/* Card */}
                    <div className={`p-6 rounded-2xl border transition-all duration-300 group-hover:-translate-y-0.5 ${milestone.completed ? "bg-emerald-500/5 border-emerald-500/20 dark:border-emerald-500/15 group-hover:border-emerald-500/40" : "bg-white dark:bg-[#0a0a0a] border-zinc-200 dark:border-white/8 group-hover:border-zinc-300 dark:group-hover:border-white/15"}`}>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className={`font-bold text-base mb-1.5 ${milestone.completed ? "text-emerald-600 dark:text-emerald-400" : "text-zinc-900 dark:text-white"}`}>
                            {milestone.title}
                          </h3>
                          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{milestone.desc}</p>
                        </div>
                        <span className={`shrink-0 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${milestone.completed ? "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" : "text-zinc-400 bg-zinc-100 dark:bg-white/5 border-zinc-200 dark:border-white/8"}`}>
                          {milestone.completed ? "Done" : "Pending"}
                        </span>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER NAV ──────────────────────────────────────────────── */}
      <section className="py-16 px-6 border-t border-zinc-100 dark:border-white/5">
        <div className="container mx-auto max-w-5xl flex items-center justify-between">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-zinc-300 font-semibold hover:border-emerald-500/40 hover:text-emerald-500 transition-all duration-300 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
            Back to Projects
          </Link>
          <span className="text-xs text-zinc-400 dark:text-zinc-600">{completedCount} of {project.milestones.length} milestones completed</span>
        </div>
      </section>
    </div>
  );
}
