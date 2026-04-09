"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: "/",        label: "Home" },
    { href: "/about",   label: "About" },
    { href: "/team",    label: "Our Team" },
    { href: "/events",  label: "Upcoming Events" },
    { href: "/projects", label: "Projects" },
    { href: "/history", label: "Our History" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 inset-x-0 z-50 flex justify-center pointer-events-none transition-all duration-300 ${montserrat.className}`}
      >
        <div 
          className={`
            pointer-events-auto flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
            ${isScrolled 
              ? "w-[98%] md:w-[95%] lg:max-w-[70rem] h-[72px] mt-4 bg-white/60 backdrop-blur-xl border border-zinc-200/50 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.05)] px-6 dark:bg-black/60 dark:border-white/10 dark:shadow-black/20" 
              : "w-full h-28 bg-white/30 backdrop-blur-md border-b border-zinc-200/50 px-6 md:px-12 dark:bg-black/20 dark:border-white/10"
            }
          `}
        >
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3.5 group z-20 shrink-0">
            <div className={`relative overflow-hidden rounded-full border-2 border-transparent group-hover:border-emerald-500/50 ring-2 ring-zinc-200 dark:ring-white/10 transition-all duration-300 shadow-sm bg-white ${isScrolled ? "w-11 h-11" : "w-14 h-14"}`}>
              <Image 
                src="/images/logos/LOGO.jpg" 
                alt="IUCEE EWB HITAM Logo" 
                fill 
                className="object-cover"
                sizes="56px"
              />
            </div>
            <span className="font-extrabold text-zinc-900 tracking-tight drop-shadow-sm group-hover:text-emerald-600 transition-colors text-sm sm:text-xl dark:text-white pb-0.5">
              IUCEE EWB HITAM
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 md:gap-2 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    relative px-4 py-2 text-sm font-semibold rounded-full flex items-center transition-colors duration-300
                    ${isActive ? "text-emerald-600 dark:text-emerald-400" : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white dark:text-zinc-400"}
                  `}
                >
                  {isActive && (
                    <motion.div
                      layoutId="navbar-active-pill"
                      className="absolute inset-0 bg-emerald-500/10 dark:bg-emerald-500/10 rounded-full"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action & Mobile Toggle */}
          <div className="flex items-center gap-4 z-20">
            <ThemeToggle />


            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden flex items-center justify-center p-2 text-zinc-900 rounded-full transition-colors focus:outline-none dark:text-zinc-100"
              aria-label="Toggle mobile menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isOpen ? (
                  <motion.div key="close" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.15 }}>
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -90 }} transition={{ duration: 0.15 }}>
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-3xl pt-24 pb-6 px-6 md:hidden flex flex-col pointer-events-auto dark:bg-[#050505]/95"
          >
            <div className="flex flex-col gap-4 mt-8 flex-1">
              {navLinks.map((link, i) => (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  key={link.href}
                >
                  <Link
                    href={link.href}
                    className={`block text-3xl font-bold py-4 border-b border-zinc-100 transition-colors ${
                      pathname === link.href ? "text-emerald-600" : "text-zinc-500 hover:text-zinc-900"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
            

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
