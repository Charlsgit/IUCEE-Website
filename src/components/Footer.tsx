import Link from "next/link";
import Image from "next/image";
import { Instagram, Linkedin, Twitter, Youtube, ArrowRight } from "lucide-react";

const DiscordIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-zinc-50 border-t border-zinc-200 dark:bg-[#020202] dark:border-white/10 transition-colors duration-300">
      <div className="container mx-auto max-w-7xl px-6 py-16 lg:py-20">
        
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">

          {/* Column 1: Brand & Socials */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-4 mb-5">
              <div className="relative h-9 w-10">
                <Image src="/images/Untitled-design-54.webp" alt="HITAM" fill className="object-contain" />
              </div>
              <div className="w-px h-5 bg-zinc-300 dark:bg-white/10" />
              <div className="relative h-9 w-10">
                <Image src="/images/Untitled-design-55.webp" alt="IUCEE-EWB" fill className="object-contain" />
              </div>
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xs mb-6">
              IUCEE-EWB HITAM — a student engineering chapter building practical, sustainable solutions for real communities.
            </p>
            {/* Glass tab behind IUCEE letters */}
            <div className="inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-white/50 dark:bg-white/[0.08] border border-white/60 dark:border-white/15 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] ring-1 ring-inset ring-white/30 dark:ring-white/5 transition-all duration-300">
              {[
                { id: "twitter", letter: "I", color: "#0099D6", icon: <Twitter size={16} /> },
                { id: "instagram", letter: "U", color: "#D641B9", icon: <Instagram size={16} /> },
                { id: "youtube", letter: "C", color: "#D42121", icon: <Youtube size={16} /> },
                { id: "linkedin", letter: "E", color: "#087EB1", icon: <Linkedin size={16} /> },
                { id: "discord", letter: "E", color: "#7289da", icon: <DiscordIcon size={16} /> },
              ].map((social) => (
                <a key={social.id} href="#" aria-label={social.id} className="group relative w-10 h-10 block" style={{ perspective: "1000px" }}>
                  <div 
                    className="w-full h-full transition-transform duration-500 group-hover:[transform:rotateY(180deg)] rounded-full"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Front: Letter */}
                    <div 
                      className="absolute inset-0 flex items-center justify-center rounded-full text-white text-lg font-bold cursor-pointer"
                      style={{ backfaceVisibility: "hidden", backgroundColor: social.color, fontFamily: "var(--font-nunito), sans-serif" }}
                    >
                      {social.letter}
                    </div>
                    {/* Back: Social Icon */}
                    <div 
                      className="absolute inset-0 flex items-center justify-center rounded-full text-white cursor-pointer"
                      style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)", backgroundColor: social.color }}
                    >
                      {social.icon}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Explore */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white mb-5">Explore</h3>
            <ul className="space-y-3.5">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About Us" },
                { href: "/events", label: "Projects & History" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-zinc-500 hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400 transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white mb-5">Resources</h3>
            <ul className="space-y-3.5">
              {[
                { href: "#", label: "Join the Team" },
                { href: "#", label: "Field Guidelines" },
                { href: "#", label: "Hardware Assets" },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-zinc-500 hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400 transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white mb-5">Stay Updated</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4 leading-relaxed">
              Subscribe to get updates on our field deployments and new projects.
            </p>
            <form className="flex flex-col gap-3" action="#">
              <input
                type="email"
                placeholder="email@example.com"
                className="w-full px-4 py-3 rounded-xl bg-white border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition-all dark:bg-[#0a0a0a] dark:border-white/10 dark:text-white dark:placeholder:text-zinc-600 dark:focus:ring-emerald-500/20 dark:focus:border-emerald-500"
                required
              />
              <button
                type="button"
                className="group flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition-all active:scale-[0.98]"
              >
                Subscribe
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-zinc-200 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            © {new Date().getFullYear()} IUCEE-EWB HITAM Chapter. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-xs text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-xs text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
