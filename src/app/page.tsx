"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Leaf, Users, Lightbulb, CheckCircle2, Rocket, Handshake, TrendingUp, Zap, X } from "lucide-react";
import projectsData from "@/data/projects.json";


// Reusable scroll reveal
function Reveal({
  children,
  delay = 0,
  y = 24,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.unobserve(el);
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all ease-out ${className}`}
      style={{
        transitionDuration: "750ms",
        transitionDelay: `${delay}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : `translateY(${y}px)`,
      }}
    >
      {children}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-600 mb-4">
      {children}
    </span>
  );
}

function FeatureCard({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: React.ElementType;
}) {
  return (
    <div className="group relative rounded-2xl bg-zinc-50 border border-zinc-200 p-7 transition-all duration-300 hover:border-zinc-300 cursor-default dark:bg-[#0a0a0a] dark:border-white/10 dark:hover:border-emerald-500/30">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-lg bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-500 group-hover:text-emerald-600 transition-colors duration-300 shrink-0 dark:bg-white/5 dark:border-white/10 dark:text-zinc-400 dark:group-hover:text-emerald-400">
          <Icon size={15} strokeWidth={1.5} />
        </div>
        <h3 className="text-sm font-semibold text-zinc-900 tracking-tight dark:text-white">{title}</h3>
      </div>
      <p className="text-sm text-zinc-500 leading-relaxed pl-11 dark:text-zinc-400">{description}</p>
    </div>
  );
}

function ApproachCard({
  title,
  description,
  step,
  icon: Icon,
}: {
  title: string;
  description: string;
  step: string;
  icon: React.ElementType;
}) {
  return (
    <div className="group relative h-full rounded-2xl border border-zinc-200 bg-zinc-50 p-7 transition-all duration-300 hover:border-zinc-300 flex flex-col gap-7 cursor-default dark:bg-[#0a0a0a] dark:border-white/10 dark:hover:border-emerald-500/30">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] dark:text-zinc-400">{step}</span>
        <div className="w-7 h-7 rounded-lg border border-zinc-200 flex items-center justify-center text-zinc-500 group-hover:text-emerald-600 group-hover:border-emerald-600/30 transition-colors duration-300 dark:border-white/10 dark:text-zinc-400 dark:group-hover:text-emerald-400 dark:group-hover:border-emerald-500/30">
          <Icon size={14} strokeWidth={1.5} />
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-zinc-900 tracking-tight mb-2 dark:text-white">{title}</h3>
        <p className="text-sm text-zinc-500 leading-relaxed dark:text-zinc-400">{description}</p>
      </div>
    </div>
  );
}

function ProjectCard({
  title,
  description,
  tags,
  number,
  href,
}: {
  title: string;
  description: string;
  tags: string[];
  number: string;
  href: string;
}) {
  return (
    <Link href={href} className="group relative flex flex-col h-full rounded-2xl border border-zinc-200 bg-zinc-50 p-7 transition-all duration-300 hover:border-emerald-500/30 hover:-translate-y-0.5 cursor-pointer dark:bg-[#0a0a0a] dark:border-white/10 dark:hover:border-emerald-500/30 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.18em] dark:text-zinc-400">{number}</span>
        <div className="flex flex-wrap gap-1.5 justify-end">
          {tags.map((tag) => (
            <span key={tag} className="px-2 py-0.5 bg-zinc-100 border border-zinc-200 text-zinc-500 text-[10px] font-medium rounded uppercase tracking-wider dark:bg-white/5 dark:border-white/10 dark:text-zinc-400">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="h-px w-full bg-zinc-100 mb-6 dark:bg-white/10" />
      <h3 className="text-sm font-semibold text-zinc-900 group-hover:text-emerald-600 transition-colors duration-300 mb-3 dark:text-white dark:group-hover:text-emerald-400">{title}</h3>
      <p className="text-sm text-zinc-500 leading-relaxed flex-grow dark:text-zinc-400">{description}</p>
      <div className="mt-5 pt-4 border-t border-zinc-100 dark:border-white/5 flex items-center justify-end">
        <span className="text-xs font-semibold text-emerald-500 flex items-center gap-1 group-hover:gap-2 transition-all">
          View Details <ArrowRight size={12} />
        </span>
      </div>
    </Link>
  );
}

function StatBlock({ value, label, sub }: { value: string; label: string; sub: string }) {
  return (
    <div className="group flex flex-col p-8 rounded-2xl bg-zinc-50 border border-zinc-200 hover:border-emerald-600/30 transition-all duration-300 cursor-default dark:bg-[#0a0a0a] dark:border-white/10 dark:hover:border-emerald-500/30">
      <span className="text-5xl md:text-6xl font-black text-zinc-900 tracking-tighter mb-2 dark:text-white">{value}</span>
      <span className="text-sm font-semibold text-zinc-900 mb-1 dark:text-white">{label}</span>
      <span className="text-xs text-zinc-500 dark:text-zinc-400">{sub}</span>
    </div>
  );
}

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white text-zinc-900 overflow-x-hidden dark:bg-[#050505] dark:text-zinc-50">

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-32">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070"
            alt="Engineers at work"
            fill
            className="object-cover opacity-[0.1] grayscale"
            priority
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(30,86,49,0.08),transparent)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white" />
        </div>

        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        <div className="relative z-10 container mx-auto px-6 max-w-4xl text-center">
          <AnimatePresence>
            {mounted && (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="mb-8 flex justify-center"
                >
                  <span className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 text-[11px] font-semibold uppercase tracking-[0.14em]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    HITAM Student Chapter
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                  className="text-6xl sm:text-7xl md:text-[84px] font-black text-zinc-900 tracking-[-0.03em] leading-[1.04] mb-7 dark:text-white"
                >
                  Engineering for<br className="hidden sm:block" />{" "}
                  <span className="text-emerald-600 relative">
                    Communities
                    <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-emerald-800/60 rounded" />
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
                  className="text-base md:text-lg text-zinc-600 max-w-xl mx-auto leading-relaxed mb-10 font-light dark:text-zinc-400"
                >
                  We're a student chapter at HITAM focused on one thing — building engineering solutions that actually get deployed and used by people who need them.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col sm:flex-row items-center justify-center gap-3"
                >
                  <Link
                    href="/events"
                    className="group flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-zinc-900 text-white text-sm font-semibold hover:bg-zinc-800 transition-colors duration-200 w-full sm:w-auto dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                  >
                    See our work
                    <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                  <Link
                    href="/about"
                    className="flex items-center justify-center px-6 py-3 rounded-full bg-white border border-zinc-200 text-zinc-900 text-sm font-medium hover:bg-zinc-50 transition-colors duration-200 w-full sm:w-auto dark:bg-[#0a0a0a] dark:border-white/10 dark:text-zinc-300 dark:hover:bg-[#111]"
                  >
                    About us
                  </Link>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Partner logos */}
          <Reveal delay={700} className="mt-28 pb-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500 mb-7">Affiliated with</p>
            <div className="flex justify-center items-center gap-12">
              <div className="relative h-16 w-36">
                <Image src="/images/Untitled-design-54.webp" alt="HITAM" fill className="object-contain" />
              </div>
              <X className="text-zinc-300 dark:text-zinc-600" size={24} strokeWidth={1.5} />
              <div className="relative h-16 w-36">
                <Image src="/images/Untitled-design-55.webp" alt="IUCEE-EWB" fill className="object-contain" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="py-24 border-t border-zinc-200">
        <div className="container mx-auto px-6 max-w-5xl">
          <Reveal className="mb-12">
            <Label>What we do</Label>
            <h2 className="text-3xl md:text-4xl font-black text-zinc-900 tracking-tight dark:text-white">
              Three commitments we don't compromise on
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Reveal delay={60}><FeatureCard title="Durable hardware" description="Everything we build has to survive real conditions and keep running without us around to fix it constantly." icon={Leaf} /></Reveal>
            <Reveal delay={130}><FeatureCard title="Community input first" description="We spend time with the people a project will affect before we write a single line of code or spec." icon={Users} /></Reveal>
            <Reveal delay={200}><FeatureCard title="Student ownership" description="Teams own outcomes end-to-end — from initial scoping through field handoff. Advisors guide, students ship." icon={Lightbulb} /></Reveal>
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="py-24 border-t border-zinc-200 dark:border-white/10">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Reveal delay={0}>
              <div className="h-full rounded-3xl border border-zinc-200 bg-zinc-50 p-10 relative overflow-hidden group hover:border-zinc-300 transition-colors dark:bg-[#0a0a0a] dark:border-white/10 dark:hover:border-emerald-500/30">
                <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-200/20 blur-3xl pointer-events-none group-hover:bg-emerald-300/30 transition-colors dark:bg-emerald-900/20 dark:group-hover:bg-emerald-800/30" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-white border border-zinc-200 flex items-center justify-center text-emerald-600 mb-8 shadow-sm dark:bg-[#111] dark:border-white/10 dark:text-emerald-500">
                    <Rocket size={20} strokeWidth={2} />
                  </div>
                  <h3 className="text-2xl font-bold text-zinc-900 mb-4 tracking-tight dark:text-white">Our Mission</h3>
                  <p className="text-zinc-600 leading-relaxed dark:text-zinc-400">
                    To bridge the gap between engineering theory and real-world application. We build sustainable, community-driven hardware solutions that create tangible, lasting impact beyond the classroom.
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="h-full rounded-3xl border border-zinc-200 bg-zinc-50 p-10 relative overflow-hidden group hover:border-zinc-300 transition-colors dark:bg-[#0a0a0a] dark:border-white/10 dark:hover:border-emerald-500/30">
                <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-200/20 blur-3xl pointer-events-none group-hover:bg-emerald-300/30 transition-colors dark:bg-emerald-900/20 dark:group-hover:bg-emerald-800/30" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-white border border-zinc-200 flex items-center justify-center text-emerald-600 mb-8 shadow-sm dark:bg-[#111] dark:border-white/10 dark:text-emerald-500">
                    <Lightbulb size={20} strokeWidth={2} />
                  </div>
                  <h3 className="text-2xl font-bold text-zinc-900 mb-4 tracking-tight dark:text-white">Our Vision</h3>
                  <p className="text-zinc-600 leading-relaxed dark:text-zinc-400">
                    To shape a generation of engineers who don't just pass coursework, but actively solve localized problems and deploy resilient systems that endure and serve communities.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="py-24 border-t border-zinc-200 dark:border-white/10">
        <div className="container mx-auto px-6 max-w-5xl">
          <Reveal className="mb-12">
            <Label>Our process</Label>
            <h2 className="text-3xl md:text-4xl font-black text-zinc-900 tracking-tight dark:text-white">
              How we take things from sketch to deployed
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Reveal delay={60}><div className="h-full"><ApproachCard step="01" icon={Rocket} title="Prototype early, fail cheap" description="Version one doesn't have to be right. It has to teach us something we couldn't learn in a classroom." /></div></Reveal>
            <Reveal delay={130}><div className="h-full"><ApproachCard step="02" icon={Handshake} title="Work where it's going to be used" description="We visit sites, ask hard questions, and adjust based on real feedback — not what we assumed from campus." /></div></Reveal>
            <Reveal delay={200}><div className="h-full"><ApproachCard step="03" icon={TrendingUp} title="Document before handing over" description="Every project ships with maintenance guides and hands-on training so communities aren't stuck if something breaks." /></div></Reveal>
          </div>
        </div>
      </section>

      {/* IUCEE CONTEXT */}
      <section className="py-24 border-t border-zinc-200 dark:border-white/10">
        <div className="container mx-auto px-6 max-w-5xl">
          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
              <div>
                <Label>Our foundation</Label>
                <h2 className="text-3xl md:text-4xl font-black text-zinc-900 tracking-tight leading-tight dark:text-white">
                  What does IUCEE-EWB actually mean?
                </h2>
              </div>
              <div className="space-y-5 text-sm text-zinc-400 leading-relaxed">
                <p>
                  <strong className="text-zinc-200 font-semibold">IUCEE</strong> (Indo-Universal Collaboration for Engineering Education) connects engineering institutions across India to push for more applied, relevant technical education.
                </p>
                <p>
                  <strong className="text-zinc-200 font-semibold">EWB</strong> (Engineers Without Borders) means our projects are humanitarian in focus — engineering applied where it's actually needed, not where it's commercially safe.
                </p>
                <p>
                  Our HITAM chapter sits at the intersection: academic structure from IUCEE, field-application from EWB's model.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* STATS */}
      <section className="py-20 border-t border-zinc-200 dark:border-white/10">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Reveal delay={0}><StatBlock value="10+" label="Projects shipped" sub="Most still operational in the field" /></Reveal>
            <Reveal delay={80}><StatBlock value="50+" label="Active members" sub="Across five engineering disciplines" /></Reveal>
            <Reveal delay={160}><StatBlock value="3 yrs" label="Chapter history" sub="Operating continuously since 2022" /></Reveal>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="py-24 border-t border-zinc-200 dark:border-white/10">
        <div className="container mx-auto px-6 max-w-5xl">
          <Reveal className="mb-12">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
              <div>
                <Label>Active projects</Label>
                <h2 className="text-3xl md:text-4xl font-black text-zinc-900 tracking-tight dark:text-white">
                  What we're working on
                </h2>
              </div>
              <Link href="/projects" className="group hidden sm:flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-900 transition-colors duration-200 font-medium dark:hover:text-white">
                All Projects <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {projectsData.slice(0, 3).map((project, i) => (
              <Reveal key={project.id} delay={i * 70}>
                <div className="h-full">
                  <ProjectCard
                    number={String(i + 1).padStart(2, "0")}
                    title={project.title}
                    description={project.teaser}
                    tags={project.techStack.slice(0, 2)}
                    href={`/projects/${project.id}`}
                  />
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-8 sm:hidden">
            <Link href="/projects" className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl border border-zinc-200 dark:border-white/10 text-sm font-medium text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors">
              All Projects <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* WHY JOIN */}
      <section className="py-24 border-t border-zinc-200">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <Reveal>
              <Label>Join us</Label>
              <h2 className="text-3xl md:text-4xl font-black text-zinc-900 tracking-tight leading-tight mb-6 dark:text-white">
                Why people stay after they join
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                Most organizations sell you on community. We're not going to do that. What we'll say is this: members who stick around do so because the work is genuinely interesting and you're held to real accountability.
              </p>
              <p className="text-sm text-zinc-400 leading-relaxed">
                You'll debug things that need to work in actual fields and homes. That's a different experience from coursework.
              </p>
            </Reveal>

            <div className="flex flex-col gap-3">
              {[
                { icon: Zap, title: "Hardware that goes to the field", desc: "Not simulations. Systems that get installed and used by real people in real conditions." },
                { icon: Users, title: "Mixed discipline teams", desc: "ECE, mechanical, civil, and CS students working together on the same problem." },
                { icon: Rocket, title: "Fast responsibility", desc: "Proactive first-years can lead sub-projects within a semester. There's no waiting line." },
                { icon: CheckCircle2, title: "IUCEE network", desc: "Workshops, competitions, and research collaborations across chapters in India." },
              ].map((item, i) => (
                <Reveal key={item.title} delay={i * 70}>
                  <div className="flex items-start gap-4 p-5 rounded-2xl bg-zinc-50 border border-zinc-200 group hover:border-zinc-300 transition-colors duration-300 cursor-default dark:bg-[#0a0a0a] dark:border-white/10 dark:hover:border-emerald-500/30">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-zinc-100 border border-zinc-200 text-zinc-500 group-hover:text-emerald-600 group-hover:border-emerald-600/30 transition-colors duration-300 shrink-0 dark:bg-white/5 dark:border-white/10 dark:text-zinc-400 dark:group-hover:text-emerald-400">
                      <item.icon size={14} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-zinc-900 mb-1 dark:text-white">{item.title}</h4>
                      <p className="text-xs text-zinc-500 leading-relaxed dark:text-zinc-400">{item.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* CTA */}
      <section className="py-36 border-t border-zinc-200 relative overflow-hidden dark:border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_100%,rgba(30,86,49,0.06),transparent)] pointer-events-none dark:bg-[radial-gradient(ellipse_50%_40%_at_50%_100%,rgba(16,185,129,0.05),transparent)]" />
        <div className="container mx-auto px-6 max-w-2xl text-center relative z-10">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-black text-zinc-900 tracking-tight mb-5 dark:text-white">
              Want to get involved?
            </h2>
            <p className="text-base text-zinc-500 mb-10 leading-relaxed font-light max-w-lg mx-auto dark:text-zinc-400">
              We open applications each semester. If you want to work on hardware that actually gets deployed, reach out or show up to an open session.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/about"
                className="group flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-zinc-900 text-white text-sm font-semibold hover:bg-zinc-800 transition-colors w-full sm:w-auto dark:bg-white dark:text-black dark:hover:bg-zinc-200"
              >
                Learn about us
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/events"
                className="flex items-center justify-center px-7 py-3.5 rounded-full border border-zinc-200 bg-white text-zinc-900 text-sm font-medium hover:bg-zinc-50 transition-colors w-full sm:w-auto dark:bg-[#0a0a0a] dark:border-white/10 dark:text-zinc-300 dark:hover:bg-[#111]"
              >
                See events & history
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
