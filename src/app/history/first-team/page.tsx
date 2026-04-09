"use client";

import React, { useRef, useEffect, useState } from "react";
import { ArrowLeft, Target, Eye, Settings, Heart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import PerspectiveGrid from "@/components/PerspectiveGrid";

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    io.observe(el);
    return () => io.unobserve(el);
  }, []);
  return (
    <div ref={ref} className={`transition-all ease-out duration-700 ${className}`} style={{ transitionDelay: `${delay}ms`, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)" }}>
      {children}
    </div>
  );
}

const FOUNDATION_DATA = [
  {
    title: "Organizational Identity & Purpose",
    icon: Target,
    items: [
      { label: "Establishment", text: "Founded on August 17, 2019, as a non-profit organization." },
      { label: "Core Philosophy", text: "Operates on the belief that engineers must apply practical implementation to solve community-oriented problems." },
      { label: "Inspiration", text: "Inspired by the goals of EWB-INDIA, focusing on sustainable rural development and assisting backward communities." },
      { label: "Commitment to Justice", text: "Aims to work across national boundaries for social and economic justice while promoting the responsible use of technology." }
    ]
  },
  {
    title: "Strategic Vision & Mission",
    icon: Eye,
    items: [
      { label: "Vision", text: "To become global leaders by executing society-based engineering projects that provide sustainable solutions." },
      { label: "Mission Objectives", list: [
        "Applying engineering skills toward social service.",
        "Generating innovative ideas to reduce societal 'pain'.",
        "Maintaining sensitivity and consciousness regarding societal structures.",
        "Developing experience in handling ethical dilemmas while working within society."
      ]}
    ]
  },
  {
    title: "Operational Principles & Activities",
    icon: Settings,
    items: [
      { label: "Working Principle Flow", text: "Survey → Picking up Idea → Brainstorming session → Developing Prototype → Showcasing product to Stakeholder → Review & suggestion → Real time Product → To Stakeholder." },
      { label: "Planned Activities", list: [
        "Executing feasible recreational projects.",
        "Raising awareness about the importance of community service.",
        "Promoting education in backward communities.",
        "Advocating for sanitation and the conservation of natural resources."
      ]}
    ]
  },
  {
    title: "Motivation for Involvement",
    icon: Heart,
    items: [
      { label: "Responsibility", text: "Those born into regions with access to basic needs have a responsibility to assist those who struggle for food, shelter, and education." },
      { label: "Self-Improvement", text: "Volunteering is encouraged not only to help those in need but also as a means for engineers to improve themselves." }
    ]
  }
];

const FIRST_TEAM_SECTIONS = [
  {
    title: "Faculty Leadership",
    description: "The chapter is guided by faculty members specializing in engineering and student development:",
    members: [
      { name: "Mr. Santosh Naik", role: "Faculty Coordinator", image: "/images/first-team/santosh.jpg", desc: "Assistant Professor in Mechanical Engineering with over 3 years of teaching experience. His research interests include Fracture Mechanics and Composite Materials, and he has published in 8 international journals." },
      { name: "Mr. Surendra Bandi", role: "Faculty Advisor", image: null, desc: "Serves as an advisor for the chapter." },
      { name: "Mrs. Hema Mahajan", role: "Faculty Advisor", image: null, desc: "Serves as an advisor for the chapter." },
    ]
  },
  {
    title: "Office Bearers",
    description: "These students lead the administrative and strategic operations of the chapter:",
    members: [
      { name: "Syed Majeedullah", role: "President", image: "/images/first-team/syed.jpg", desc: "3rd-year ECE student responsible for maintaining a positive, collaborative environment and ensuring all members contribute to the mission and vision." },
      { name: "Aashish Sharma", role: "Vice-President", image: "/images/first-team/aashish.jpg", desc: "2nd-year MECH student who ensures tasks are completed on time according to protocol and addresses member inconveniences." },
      { name: "B Sai Chandrika", role: "Secretary", image: "/images/first-team/saichandrika.jpg", desc: "3rd-year ECE student tasked with tracking work progress, maintaining records, and ensuring the proper delivery of projects." },
      { name: "Praveen Kullu", role: "Treasurer", image: "/images/first-team/praveen.jpg", desc: "3rd-year ECE student who acts as the custodian of funds and maintains transparent accounting procedures." },
      { name: "Alankar Achadian", role: "PR & Social Media Head", image: "/images/first-team/alankar.jpg", desc: "3rd-year MECH student responsible for promotional publications, social media updates, newsletters, and organizing event promotions." }
    ]
  },
  {
    title: "Project Managers",
    description: "The management team focuses on the technical execution and completion of social service projects:",
    members: [
      { name: "N Ravali", role: "Project Manager", image: "/images/first-team/ravali.jpg", desc: "3rd-year ECE student responsible for initiating projects, motivating the team, and ensuring successful delivery." },
      { name: "Purna Viswanadha Varma", role: "Project Manager", image: "/images/first-team/purna.jpg", desc: "2nd-year MECH student who handles project completion and works with the Secretary to provide detailed progress documentation to the President." },
    ]
  },
  {
    title: "Department Coordinators",
    description: "Coordinators bridge the gap between their specific engineering departments and the EWB chapter:",
    members: [
      { name: "P V S Pranay", role: "ECE Coordinator", image: "/images/first-team/pranay.jpg", desc: "3rd-year ECE student who oversees departmental work and ensures students gain practical engineering experience through projects." },
      { name: "Y Nagarjuna Reddy", role: "MECH Coordinator", image: "/images/first-team/nagarjuna.jpg", desc: "2nd-year MECH student responsible for encouraging active participation and recruitment within the mechanical department." },
      { name: "S Bhargav", role: "EEE Coordinator", image: "/images/first-team/bhargav.jpg", desc: "3rd-year EEE student who supports electrical students in developing innovative ideas and solutions for the community." },
      { name: "Rahul Agarwal", role: "CSE Coordinator", image: "/images/first-team/rahul.jpg", desc: "3rd-year ECE student tasked with involving the CSE department in active participation with chapter activities." }
    ]
  }
];

export default function FirstTeamPage() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 overflow-x-hidden relative dark:bg-[#050505] dark:text-zinc-50 pt-32 pb-24">
      <PerspectiveGrid className="fixed inset-0 z-0 opacity-40 dark:opacity-20 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <Reveal>
          <Link href="/history" className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors mb-10 bg-emerald-50 dark:bg-white/5 px-4 py-2 rounded-full border border-emerald-100 dark:border-white/10 backdrop-blur-md shadow-sm">
            <ArrowLeft size={16} /> Back to History
          </Link>
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-zinc-900 dark:text-white uppercase mb-6 drop-shadow-sm">
            THE <span className="text-emerald-500">BEGINNING</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl leading-relaxed mb-16 font-light">
            Founded on August 17, 2019, our chapter established the core blueprint for community engineering. Below is the operational framework and the pioneers who brought this vision to life.
          </p>
        </Reveal>

        {/* Foundational Purpose Grid */}
        <div className="mb-32">
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white mb-8 tracking-tight border-b border-zinc-200 dark:border-white/10 pb-4 inline-block">
              Foundational Framework
            </h2>
          </Reveal>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {FOUNDATION_DATA.map((block, bIdx) => (
              <Reveal key={block.title} delay={bIdx * 100} className="h-full">
                <div className="p-8 rounded-3xl bg-zinc-50 border border-zinc-200 dark:bg-[#0a0a0a] dark:border-white/5 h-full relative overflow-hidden group hover:border-emerald-500/30 transition-colors">
                   <div className="absolute top-0 right-0 p-6 opacity-5 text-emerald-600 dark:text-emerald-400 transform translate-x-4 -translate-y-4 group-hover:scale-110 group-hover:opacity-10 transition-all duration-500 pointer-events-none">
                     <block.icon size={140} strokeWidth={1} />
                   </div>
                   
                   <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-6 relative z-10 flex items-center gap-3">
                     <span className="p-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-lg"><block.icon size={20} /></span>
                     {block.title}
                   </h3>

                   <div className="space-y-5 relative z-10">
                     {block.items.map((item, iIdx) => (
                       <div key={iIdx}>
                         <h4 className="text-sm font-bold text-emerald-700 dark:text-emerald-500 uppercase tracking-wider mb-1">
                           {item.label}
                         </h4>
                         {item.text && (
                           <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                             {item.text}
                           </p>
                         )}
                         {item.list && (
                           <ul className="list-disc list-inside text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed space-y-1 mt-1 marker:text-emerald-500/50">
                             {item.list.map((li, lIdx) => (
                               <li key={lIdx}>{li}</li>
                             ))}
                           </ul>
                         )}
                       </div>
                     ))}
                   </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* The First Team List */}
        <div className="space-y-16">
          <Reveal>
             <h2 className="text-3xl md:text-5xl font-black tracking-tight text-zinc-900 dark:text-white uppercase drop-shadow-sm mb-4">
               The <span className="text-emerald-500">First Team</span>
             </h2>
             <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl text-lg mb-4">
                The pioneers who established and led the chapter in its inaugural year.
             </p>
          </Reveal>

          {FIRST_TEAM_SECTIONS.map((section, sIdx) => (
            <section key={section.title} className="relative pt-6">
              <Reveal delay={100}>
                <div className="mb-8">
                  <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white mb-3 tracking-tight border-l-4 border-emerald-500 pl-4">
                    {section.title}
                  </h3>
                  <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl ml-5 text-[15px]">
                    {section.description}
                  </p>
                </div>
              </Reveal>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {section.members.map((member, mIdx) => (
                  <Reveal key={member.name} delay={mIdx * 100}>
                    <div className="h-full group p-8 rounded-3xl bg-zinc-50 border border-zinc-200 dark:bg-[#0a0a0a] dark:border-white/5 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/5 dark:hover:shadow-[0_4px_20px_rgba(16,185,129,0.1)] hover:-translate-y-2 hover:border-emerald-500/40 flex flex-col items-start relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      
                      {/* Actual Photo Container (Only displays if image exists) */}
                      {member.image && (
                        <div className="w-20 h-20 rounded-full mb-6 overflow-hidden flex flex-col items-center justify-center transition-colors z-10 relative shadow-inner border-2 border-emerald-500/20 group-hover:border-emerald-500/50 bg-white dark:bg-[#0a0a0a]">
                          <Image src={member.image} alt={member.name} fill sizes="80px" className="object-cover" />
                        </div>
                      )}

                      <h4 className="text-xl font-bold text-zinc-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors relative z-10 tracking-tight">
                        {member.name}
                      </h4>
                      <span className="inline-block px-3 py-1.5 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-widest rounded-lg mb-5 relative z-10">
                        {member.role}
                      </span>
                      <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed relative z-10 mt-auto font-medium">
                         {member.desc}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
              
              {/* Divider */}
              {sIdx !== FIRST_TEAM_SECTIONS.length - 1 && (
                <div className="mt-16 h-[1px] w-full bg-gradient-to-r from-transparent via-zinc-200 dark:via-white/10 to-transparent" />
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
