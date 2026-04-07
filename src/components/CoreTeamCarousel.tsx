"use client";

import Image from "next/image";
import { Linkedin } from "lucide-react";

const CORE_TEAM = [
  { id: 1, name: "Ameena", role: "President", image: "/images/team/Testimony_PIcs/Ameena.jpeg" },
  { id: 2, name: "Kanishka", role: "Vice President", image: "/images/team/Testimony_PIcs/Kanishka.jpeg" },
  { id: 3, name: "Alankrusha", role: "Secretary", image: "/images/team/Testimony_PIcs/AlankrushaBhaiyya.jpeg" },
  { id: 4, name: "Jahnavi", role: "Treasurer", image: "/images/team/Testimony_PIcs/Jahnavi.jpeg" },
  { id: 5, name: "Satvik", role: "Project Manager", image: "/images/team/Testimony_PIcs/Satvik.jpeg" },
  { id: 6, name: "Charlson", role: "Project Manager", image: "/images/team/Testimony_PIcs/Charlson.jpeg" },
  { id: 7, name: "Bhargav", role: "Lead R&D", image: "/images/team/Testimony_PIcs/Bastard.jpeg", imageClass: "object-center" },
  { id: 8, name: "Yeshashwini", role: "Event Manager", image: "/images/team/Testimony_PIcs/Yeshashwini.jpeg" },
  { id: 9, name: "Harshith", role: "PR Lead", image: "/images/team/Testimony_PIcs/Harshith.jpeg" },
  { id: 10, name: "Kranthi", role: "Lead Co-ordinator", image: "/images/team/Testimony_PIcs/KranthiAnna.jpeg" },
];

export default function CoreTeamCarousel() {
  return (
    <section className="py-24 bg-[#050505] overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl mb-14">
        <span className="inline-block text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-400 mb-4">The people</span>
        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">Meet our core team</h2>
      </div>

      {/* Scrollable carousel */}
      <div className="w-full overflow-x-auto pb-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex w-max gap-4 px-6 md:px-[max(24px,calc(50vw-560px))]">
          {CORE_TEAM.map((member) => (
            <div
              key={member.id}
              className="group flex-none w-[240px] rounded-3xl bg-[#0a0a0a] border border-white/5 p-6 flex flex-col items-center transition-all duration-400 hover:-translate-y-2 hover:border-emerald-500/30 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)]"
            >
              {/* Photo */}
              <div className="relative w-24 h-24 rounded-full overflow-hidden mb-5 border-2 border-white/10 group-hover:border-emerald-500/30 transition-colors duration-400 shrink-0">
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className={`object-cover ${member.imageClass ?? "object-top"}`}
                  />
                ) : (
                  <div className="w-full h-full bg-emerald-900/20 flex items-center justify-center">
                    <span className="text-2xl font-black text-emerald-400">{member.name[0]}</span>
                  </div>
                )}
              </div>

              {/* Name + role */}
              <h3 className="text-sm font-semibold text-white text-center tracking-tight mb-1 group-hover:text-emerald-400 transition-colors duration-300">
                {member.name}
              </h3>
              <p className="text-[11px] font-medium text-zinc-400 uppercase tracking-[0.12em] text-center mb-6">
                {member.role}
              </p>

              {/* LinkedIn */}
              <a
                href="#"
                aria-label={`LinkedIn for ${member.name}`}
                className="mt-auto w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 border border-white/10 text-zinc-400 hover:bg-[#0A66C2]/20 hover:border-[#0A66C2]/40 hover:text-[#0A66C2] transition-all duration-300"
              >
                <Linkedin size={14} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
