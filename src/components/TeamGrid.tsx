import Image from "next/image";
import teamData from "@/data/team.json";
import { Linkedin } from "lucide-react";

export default function TeamGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {teamData.filter(m => !m.advisor).map((member) => (
        <div
          key={member.id}
          className="group flex flex-col items-center bg-white rounded-2xl p-8 shadow-sm border border-gray-100 transition-all hover:shadow-lg hover:-translate-y-1 dark:bg-[#0a0a0a] dark:border-white/10 dark:hover:border-emerald-500/30"
        >
          <div className="relative w-32 h-32 mb-6 rounded-full overflow-hidden bg-gray-50 border-4 border-white shadow-md group-hover:border-hitam-green/20 transition-colors">
            {/* Placeholder for actual image */}
            <div className="w-full h-full bg-hitam-green/10 flex items-center justify-center text-hitam-green font-bold text-3xl">
              {member.name.charAt(0)}
            </div>
          </div>
          <h3 className="text-xl font-bold text-gray-900 text-center mb-1 dark:text-white">
            {member.name}
          </h3>
          <p className="text-sm font-semibold tracking-wide text-hitam-green mb-6 text-center uppercase">
            {member.role}
          </p>
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 text-gray-400 hover:bg-[#0A66C2] hover:text-white transition-colors shadow-sm dark:bg-white/5 dark:text-zinc-400 dark:hover:bg-[#0A66C2] dark:hover:text-white"
            aria-label={`${member.name}'s LinkedIn`}
          >
            <Linkedin size={20} />
          </a>
        </div>
      ))}
    </div>
  );
}
