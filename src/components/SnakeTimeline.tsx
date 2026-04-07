"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Flag, Zap, Factory, Code, BookOpen, Rocket, FileText, 
  Lightbulb, Upload, Brain, School, Leaf, Globe, 
  Wrench, Trophy, Sprout, Medal, Cpu, Droplets,
  Users, Target, Building, Network, Mic, Bot, PartyPopper, GraduationCap, ArrowRight, Hourglass
} from "lucide-react";

const timelineEvents = [
  {
    id: "01", date: "AUG 2019", title: "THE BEGINNING",
    desc: "Chapter established as a non-profit for community engineering.",
    icon: Flag
  },
  {
    id: "02", date: "NOV 8-9, 2024", title: "INNOFIESTA 2024",
    desc: "Flagship multidisciplinary fest at HITAM.",
    icon: Zap
  },
  {
    id: "03", date: "MAR 29, 2025", title: "AKSHAYA PATRA VISIT",
    desc: "Industrial visit to the world's largest automated NGO kitchen.",
    icon: Factory
  },
  {
    id: "04", date: "MAY 9-10, 2025", title: "HACK YOUR PATH 6.0",
    desc: "24-hour hackathon with 60 interdisciplinary teams.",
    icon: Code
  },
  {
    id: "05", date: "MAY 27, 2025", title: "RESEARCH WRITING WORKSHOP",
    desc: "Training on paper structure and citation practices.",
    icon: BookOpen
  },
  {
    id: "06", date: "JULY 11-13, 2025", title: "AUNSF 3.0",
    desc: "Participation in Aeronox and Ignova domains at Anurag University.",
    icon: Rocket
  },
  {
    id: "07", date: "JULY 25, 2025", title: "INTRODUCTION TO ICTIEE",
    desc: "Session on academic research publication culture.",
    icon: FileText
  },
  {
    id: "08", date: "JULY 26 & 28, 2025", title: "DT PROJECT EXPO I",
    desc: "Showcasing prototypes developed through Design Thinking.",
    icon: Lightbulb
  },
  {
    id: "09", date: "AUG 31, 2025", title: "ICTIEE SUBMISSIONS",
    desc: "4 research papers submitted on GenAI, AR, and Gamification.",
    icon: Upload
  },
  {
    id: "10", date: "SEP 5, 2025", title: "THINKSPRINT IDEATHON",
    desc: "SDG-focused ideathon involving 7 pitching teams.",
    icon: Brain
  },
  {
    id: "11", date: "OCT 25, 2025", title: "SCHOOL VISITS",
    desc: "Needs assessment at Krushi Home and ZPHS Gowdavelly.",
    icon: School
  },
  {
    id: "12", date: "OCT 31, 2025", title: "AKSHAYAKALPA FARM VISIT",
    desc: "Exploration of tech integration in organic farming.",
    icon: Leaf
  },
  {
    id: "13", date: "DEC 9, 2025", title: "MR. PETER INTERACTION",
    desc: "Session with ED of EWB East Africa on humanitarian engineering.",
    icon: Globe
  },
  {
    id: "14", date: "DEC 19-20, 2025", title: "DT PROJECT EXPO II",
    desc: "Platform for human-centered solutions addressing real-world problems.",
    icon: Wrench
  },
  {
    id: "15", date: "JAN 7-10, 2026", title: "ICTIEE 2026 AWARD",
    desc: "Won the Student Chapter Award at the national conference.",
    icon: Trophy
  },
  {
    id: "16", date: "JAN 15, 2026", title: "IASF MENTORSHIP",
    desc: "AI Crop Disease & Waste Mgmt projects selected for elite mentorship.",
    icon: Sprout
  },
  {
    id: "17", date: "JAN 20, 2026", title: "EDUAITHON TOP 15",
    desc: "Team Label2Learn ranked among the top 15 teams nationally.",
    icon: Medal
  },
  {
    id: "18", date: "JAN 28-29, 2026", title: "INNOFIESTA 2026",
    desc: "Innovation event featuring Reverse Engineering challenges.",
    icon: Cpu
  },
  {
    id: "19", date: "FEB 2026", title: "RO PLANT INSTALLATION",
    desc: "Implementation of safe drinking water infrastructure at ZPHS Gowdavelly.",
    icon: Droplets
  },
  {
    id: "20", date: "APR 10, 2026", title: "FRESHERS",
    desc: "Welcoming the incoming batch to the chapter.",
    icon: PartyPopper
  },
  {
    id: "21", date: "APR 24, 2026", title: "SDG INTRODUCTION",
    desc: "Introduction to Sustainable Development Goals and our approach.",
    icon: Target
  },
  {
    id: "22", date: "MAY 1, 2026", title: "DT EXPO",
    desc: "Design Thinking exhibition showcasing student projects.",
    icon: Lightbulb
  },
  {
    id: "23", date: "JUN 19, 2026", title: "NGO VISIT",
    desc: "Visit to local NGOs to understand grassroots challenges.",
    icon: Building
  },
  {
    id: "24", date: "JUN 26, 2026", title: "INDUSTRIAL VISIT",
    desc: "Field visit to understand practical industrial applications.",
    icon: Factory
  },
  {
    id: "25", date: "JUL 4, 2026", title: "SYNERGY",
    desc: "Interactive session fostering teamwork and collaborative problem-solving.",
    icon: Network
  },
  {
    id: "26", date: "AUG 14, 2026", title: "INDUSTRIAL VISIT",
    desc: "Continued exposure to industry practices and operations.",
    icon: Factory
  },
  {
    id: "27", date: "SEP 11, 2026", title: "ZERO TO PAPER RESEARCH WORKSHOP",
    desc: "Comprehensive guide to writing and publishing research papers.",
    icon: BookOpen
  },
  {
    id: "28", date: "SEP 25, 2026", title: "PAPER PRESENTATION",
    desc: "Students presenting their research and project findings.",
    icon: Mic
  },
  {
    id: "29", date: "OCT 9, 2026", title: "AI FOR EVERYONE WORKSHOP",
    desc: "Democratizing AI knowledge and hands-on applications.",
    icon: Bot
  },
  {
    id: "30", date: "NOV 13-14, 2026", title: "INNOFIESTA-2K26",
    desc: "Next edition of the flagship multidisciplinary college fest.",
    icon: Zap
  },
  {
    id: "31", date: "DEC 5, 2026", title: "ALUMNI INTERACTION",
    desc: "Engaging with chapter alumni to share insights and networking.",
    icon: Users
  },
  {
    id: "32", date: "FIRST WEEK 2027", title: "IASF-2027",
    desc: "Participation in the International Action Student Forum 2027.",
    icon: Globe
  },
  {
    id: "33", date: "JAN 29, 2027", title: "IUCEE-EWB HITAM CHAPTER FAREWELL",
    desc: "Farewell ceremony celebrating the graduating chapter members.",
    icon: GraduationCap
  },
  {
    id: "34", date: "FEB 26, 2027", title: "INVESTITURE CEREMONY",
    desc: "Handover of leadership and inducting the new core team.",
    icon: Medal
  },
  {
    id: "35", date: "FUTURE", title: "TO BE CONTINUED...",
    desc: "Our journey of impact and innovation never stops.",
    icon: Hourglass
  }
];

export default function SnakeTimeline() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const cssContent = `
    @keyframes cyberSnakeStreak {
      0% { stroke-dashoffset: 4000; }
      100% { stroke-dashoffset: 0; }
    }
    .cyber-snake-path {
      animation: cyberSnakeStreak 15s linear infinite;
    }
    @keyframes verticalStreakCyber {
      0% { top: -10%; opacity: 0; }
      20% { opacity: 1; }
      80% { opacity: 1; }
      100% { top: 100%; opacity: 0; }
    }
    .animate-vertical-streak {
      animation: verticalStreakCyber 4s linear infinite;
    }
    .hide-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .hide-scrollbar {
      -ms-overflow-style: none; 
      scrollbar-width: none; 
    }
  `;

  return (
    <section className="relative w-full bg-white overflow-hidden py-24 font-sans mx-auto dark:bg-transparent">
      <style dangerouslySetInnerHTML={{ __html: cssContent }} />
      
      {/* 40px Cyber Grid Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03] z-0" 
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.06) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      {/* Radial Emerald Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-emerald-100 rounded-full blur-[150px] pointer-events-none z-0" />

      {/* Header */}
      <div className="relative z-10 text-center mb-16 px-4">
         <motion.h2 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="text-4xl md:text-6xl font-black tracking-tight text-zinc-900 dark:text-white uppercase drop-shadow-sm mb-4"
         >
           Our <span className="text-emerald-500">Journey</span>
         </motion.h2>
         <motion.p 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: 0.1 }}
           className="text-emerald-500/80 font-bold tracking-[0.3em] uppercase text-sm md:text-base drop-shadow-[0_0_8px_rgba(16,185,129,0.4)]"
         >
           Tracing the footprints of impact
         </motion.p>
      </div>

      <div className="relative z-10 w-full px-4 lg:px-8 max-w-[1600px] mx-auto">
        
        {/* Desktop View: Multi-row Vertical Winding SVG Map */}
        <div className="hidden lg:block relative w-full overflow-x-auto hide-scrollbar pb-24">
          <div className="relative w-[1200px] min-w-[1200px] mx-auto h-[3800px] mt-16">
            
            {/* Base Static Track & Glowing Animated Overlay */}
            <div className="absolute inset-0 pointer-events-none">
              <svg viewBox="0 0 1200 3800" preserveAspectRatio="none" className="w-full h-full overflow-visible">
                <defs>
                  <filter id="neonGlowCyber" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="8" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <linearGradient id="cyberGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="50%" stopColor="#34d399" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                </defs>
                
                {/* Track Ghost Line */}
                <path 
                  d="M 200 250 L 1000 250 A 200 200 0 0 1 1000 650 L 200 650 A 200 200 0 0 0 200 1050 L 1000 1050 A 200 200 0 0 1 1000 1450 L 200 1450 A 200 200 0 0 0 200 1850 L 1000 1850 A 200 200 0 0 1 1000 2250 L 200 2250 A 200 200 0 0 0 200 2650 L 1000 2650 A 200 200 0 0 1 1000 3050 L 200 3050 A 200 200 0 0 0 200 3450 L 1200 3450"
                  stroke="rgba(16, 185, 129, 0.15)"
                  strokeWidth="6"
                  fill="none"
                  strokeLinecap="round"
                />
                
                {/* Flowing Laser Line */}
                {mounted && (
                  <path 
                    d="M 200 250 L 1000 250 A 200 200 0 0 1 1000 650 L 200 650 A 200 200 0 0 0 200 1050 L 1000 1050 A 200 200 0 0 1 1000 1450 L 200 1450 A 200 200 0 0 0 200 1850 L 1000 1850 A 200 200 0 0 1 1000 2250 L 200 2250 A 200 200 0 0 0 200 2650 L 1000 2650 A 200 200 0 0 1 1000 3050 L 200 3050 A 200 200 0 0 0 200 3450 L 1200 3450"
                    stroke="url(#cyberGradient)"
                    strokeWidth="6"
                    fill="none"
                    strokeLinecap="round"
                    filter="url(#neonGlowCyber)"
                    className="cyber-snake-path"
                    strokeDasharray="150 4000"
                  />
                )}
              </svg>
            </div>

            {/* Interactive Nodes and Glass Cards */}
            {timelineEvents.map((event, index) => {
              const r = Math.floor(index / 4);
              const c = index % 4;
              const y = 250 + r * 400;
              const x = r % 2 === 0 ? 200 + c * 266.66 : 1000 - c * 266.66;
              const col_idx = Math.round((x - 200) / 266.66);
              // Cards alternate strictly by column to guarantee no vertical overlapping
              const align = col_idx % 2 === 0 ? "top" : "bottom";
              
              const isCompleted = index < 19;
              const theme = isCompleted ? {
                 nodeBorder: "border-emerald-500 shadow-[0_0_15px_#10b981]",
                 nodeInner: "bg-emerald-300",
                 cardHover: "group-hover:border-emerald-500/50 group-hover:shadow-[0_4px_20px_rgba(16,185,129,0.1)] dark:hover:border-emerald-500/50",
                 tetherTop: "to-emerald-500/50",
                 tetherBottom: "from-emerald-500/50",
                 iconBg: "bg-emerald-500/10 text-emerald-500 group-hover:bg-emerald-500/20 group-hover:text-emerald-400",
                 dateText: "text-emerald-500/90",
                 titleHover: "group-hover:text-emerald-400"
              } : {
                 nodeBorder: "border-cyan-500 shadow-[0_0_15px_#06b6d4]",
                 nodeInner: "bg-cyan-400",
                 cardHover: "group-hover:border-cyan-500/50 group-hover:shadow-[0_4px_20px_rgba(6,182,212,0.1)] dark:hover:border-cyan-500/50",
                 tetherTop: "to-cyan-500/50",
                 tetherBottom: "from-cyan-500/50",
                 iconBg: "bg-cyan-500/10 text-cyan-500 group-hover:bg-cyan-500/20 group-hover:text-cyan-400",
                 dateText: "text-cyan-500/90",
                 titleHover: "group-hover:text-cyan-400"
              };
              
              return (
                <motion.div
                  key={event.id}
                  className="absolute flex items-center justify-center group z-10"
                  style={{
                    top: `${y}px`,
                    left: `${x}px`,
                  }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.5, type: 'spring', bounce: 0.4, delay: c * 0.15 }}
                >
                  {/* Anchor Center */}
                  <div className="absolute w-0 h-0" style={{ transform: 'translate(-50%, -50%)' }}>
                     {/* Glowing Pulse Node */}
                     <div className={`relative w-7 h-7 rounded-full bg-white border-[3px] ${theme.nodeBorder} group-hover:scale-125 transition-transform duration-300 z-30 flex items-center justify-center cursor-pointer animate-pulse mx-auto`}>
                        <div className={`w-2 h-2 rounded-full ${theme.nodeInner} group-hover:bg-white transition-colors`} />
                     </div>

                     {/* Glassmorphism Data Card */}
                     <div 
                       className={`absolute w-[260px] h-[210px] p-5 bg-white border border-zinc-200 rounded-2xl shadow-md transition-all duration-300 group-hover:-translate-y-1 ${theme.cardHover} dark:bg-[#0a0a0a] dark:border-white/10 flex flex-col items-start z-40 origin-center left-1/2 -translate-x-1/2 ${
                         align === 'top' ? 'bottom-full mb-6' : 'top-full mt-6'
                       }`}
                     >
                        {/* Connection Tether */}
                        <div className={`absolute left-1/2 -translate-x-1/2 w-[2px] h-6 bg-gradient-to-b ${
                          align === 'top' ? `from-transparent ${theme.tetherTop} -bottom-6` : `${theme.tetherBottom} to-transparent -top-6`
                        }`} />

                        <div className="flex items-start space-x-3 mb-3 w-full shrink-0">
                          <span className={`p-2 rounded-lg transition-colors shrink-0 ${theme.iconBg}`}>
                            <event.icon size={20} strokeWidth={2.5} />
                          </span>
                          <span className={`${theme.dateText} font-mono text-[11px] tracking-widest font-semibold drop-shadow-sm pt-2`}>{event.date}</span>
                        </div>
                        <h3 className={`text-zinc-900 font-bold text-base leading-tight mb-2 uppercase transition-colors dark:text-white shrink-0 line-clamp-2 w-full ${theme.titleHover}`}>{event.title}</h3>
                        <p className="text-zinc-500 text-xs leading-relaxed dark:text-zinc-400 flex-grow w-full overflow-hidden line-clamp-3">{event.desc}</p>
                     </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Mobile/Tablet View: Vertical Scroll Architecture */}
        <div className="block lg:hidden relative w-full pt-10 pb-20 px-2 sm:px-6">
          <div className="absolute left-[36px] sm:left-[48px] top-10 bottom-20 w-[4px] bg-emerald-500/20 rounded-full">
            <div className="absolute top-0 left-0 w-full h-[150px] bg-emerald-500 blur-[2px] animate-vertical-streak rounded-full" />
          </div>

          <div className="flex flex-col space-y-10 relative z-10 w-full">
                {timelineEvents.map((event, index) => {
                  const isCompleted = index < 19;
                  const theme = isCompleted ? {
                     nodeBorder: "border-emerald-500 shadow-[0_0_15px_#10b981]",
                     nodeInner: "bg-emerald-300",
                     cardHover: "hover:border-emerald-500/30 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] dark:hover:border-emerald-500/30",
                     iconBg: "bg-emerald-500/10 text-emerald-500",
                     dateText: "text-emerald-500/90"
                  } : {
                     nodeBorder: "border-cyan-500 shadow-[0_0_15px_#06b6d4]",
                     nodeInner: "bg-cyan-400",
                     cardHover: "hover:border-cyan-500/30 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] dark:hover:border-cyan-500/30",
                     iconBg: "bg-cyan-500/10 text-cyan-500",
                     dateText: "text-cyan-500/90"
                  };

                  return (
                    <motion.div 
                      key={event.id}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-10%" }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="relative pl-[72px] sm:pl-[96px] pr-2 group"
                    >
                      {/* Node Target */}
                      <div className={`absolute left-[38px] sm:left-[50px] top-8 w-6 h-6 rounded-full bg-white border-[3px] ${theme.nodeBorder} animate-pulse flex items-center justify-center -translate-x-1/2 -translate-y-1/2`}>
                         <div className={`w-1.5 h-1.5 rounded-full ${theme.nodeInner}`} />
                      </div>

                      {/* Mobile Glass Card */}
                      <div className={`p-6 bg-white border border-zinc-200 rounded-2xl shadow-md transition-transform duration-300 hover:-translate-y-1 ${theme.cardHover} dark:bg-[#0a0a0a] dark:border-white/10 flex flex-col items-start w-full relative z-10`}>
                          <div className="flex items-start space-x-3 mb-3 w-full">
                             <span className={`p-2 rounded-lg shrink-0 ${theme.iconBg}`}>
                               <event.icon size={18} strokeWidth={2.5} />
                             </span>
                             <span className={`${theme.dateText} font-mono text-xs sm:text-sm tracking-widest font-semibold drop-shadow-sm pt-1`}>{event.date}</span>
                          </div>
                    <h3 className="text-zinc-900 font-bold text-lg leading-snug mb-2 uppercase dark:text-white">{event.title}</h3>
                    <p className="text-zinc-500 text-sm leading-relaxed dark:text-zinc-400">{event.desc}</p>
                </div>
              </motion.div>
            );
          })}
          </div>
        </div>

      </div>

      {/* Cyber Stats Footer Component */}
      <div className="relative z-20 flex flex-wrap justify-center gap-6 md:gap-12 pt-8 pb-8 px-4 w-full">
         {[
           { value: "11+", label: "Projects" },
           { value: "80+", label: "Members" },
           { value: "₹20K+", label: "Funding" }
         ].map((stat, i) => (
           <motion.div 
             key={i}
             initial={{ opacity: 0, scale: 0.8 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ delay: i * 0.1 + 0.3, type: 'spring' }}
             className="flex flex-col items-center p-6 bg-white rounded-2xl border border-zinc-200 shadow-sm hover:border-emerald-500/30 hover:-translate-y-1 transition-all duration-300 min-w-[160px] group dark:bg-[#0a0a0a] dark:border-white/10"
           >
              <span className="text-4xl md:text-5xl font-black text-zinc-900 group-hover:text-emerald-600 group-hover:drop-shadow-[0_0_15px_rgba(16,185,129,0.5)] transition-all mb-2 dark:text-white">{stat.value}</span>
              <span className="text-emerald-600 font-semibold tracking-widest text-sm uppercase">{stat.label}</span>
           </motion.div>
         ))}
      </div>
    </section>
  );
}
