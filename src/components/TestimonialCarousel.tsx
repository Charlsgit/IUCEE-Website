"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    id: 1,
    quote: "During my tenure in IUCEE–EWB HITAM 24-25, I developed strong ownership, accountability, and the ability to manage responsibilities under pressure. More than experience, it has been a defining part of my student life — giving me a sense of responsibility, a strong community, a family, and a foundation for my personal and professional growth.",
    author: "Architha Reddy Pabbathi",
    role: "EX-PRESIDENT",
    image: "/images/team/Testimony_PIcs/Architha_Akka.jpeg"
  },
  {
    id: 2,
    quote: "My tenure as Treasurer of the IUCEE-EWB-HITAM Student Chapter (2025–2026) was a transformative experience in professional accountability and leadership. I developed essential skills in event management, high-pressure decision-making, and professional communication while leveraging the IUCEE network to build meaningful academic and industry connections. This role was fundamental in shaping my work ethic and professional confidence.",
    author: "Harsith Gourishetti",
    role: "EX-TREASURER (2024-25)",
    image: "/images/team/Testimony_PIcs/Harshit_Anna.jpeg"
  },
  {
    id: 3,
    quote: "Being part of this chapter allowed me to apply my skills to real-world challenges and grow as a leader.",
    author: "Sai kumar",
    role: "EX-PROJECT MANAGER",
    image: "/images/team/Testimony_PIcs/SaiKUMARANNATRUE.jpeg"
  },
  {
    id: 4,
    quote: "We've seen incredible innovation from this group. Their ability to deliver practical solutions to complex problems is unmatched.",
    author: "Aligeti Sharanya",
    role: "EX-LEAD R&D",
    image: ""
  },
  {
    id: 5,
    quote: "My tenure as Social Media Manager of the IUCEE EWB Student Chapter (2025–2026) was a highly enriching experience that strengthened my skills in digital communication and teamwork. Beginning as a PR volunteer during Innofiesta 2024, I gained valuable exposure to the organization’s dynamic environment. Being entrusted with the newly created role of Social Media Manager allowed me to contribute to event promotions and enhance our digital presence. Despite challenges, including Innofiesta 2026, each experience added to my growth and professional confidence. I am grateful to have been part of this journey.",
    author: "Vishnu",
    role: "EX-PR LEAD",
    image: "/images/team/Testimony_PIcs/VishnuAnna.PNG"
  }
];

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  // 3D Tilt Setup
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });
  
  const rotateX = useTransform(springY, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeaveInner = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 12000); // 12 seconds
    return () => clearInterval(interval);
  }, [isHovered]);

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const onTouchStart = (e: React.TouchEvent) => setTouchStart(e.targetTouches[0].clientX);
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 50) handleNext();
    if (diff < -50) handlePrev();
    setTouchStart(null);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') handlePrev();
    if (e.key === 'ArrowRight') handleNext();
  };

  // Animation variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemFadeIn = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section className="relative min-h-screen py-20 flex items-center justify-center overflow-hidden bg-zinc-50">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/bg/network_background.png"
          alt="Network map"
          fill
          className="object-cover opacity-5 select-none mix-blend-multiply"
          priority
        />
        {/* Subtle radial gradients overlay for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-50 via-transparent to-zinc-50 pointer-events-none" />
      </div>

      <div 
        className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 xl:px-0 focus:outline-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onKeyDown={onKeyDown}
        tabIndex={0}
      >
        
        {/* Navigation Arrows (Fixed at sides) */}
        <button 
          onClick={handlePrev} 
          className="absolute left-2 lg:left-[-3rem] top-1/2 -translate-y-1/2 z-30 p-3 text-zinc-400 hover:text-zinc-900 bg-white hover:bg-emerald-50 rounded-full transition-all duration-300 hidden md:flex items-center justify-center border border-zinc-200 shadow-sm focus:outline-none"
          aria-label="Previous Testimonial"
        >
          <ChevronLeft size={32} />
        </button>
        
        <button 
          onClick={handleNext} 
          className="absolute right-2 lg:right-[-3rem] top-1/2 -translate-y-1/2 z-30 p-3 text-zinc-400 hover:text-zinc-900 bg-white hover:bg-emerald-50 rounded-full transition-all duration-300 hidden md:flex items-center justify-center border border-zinc-200 shadow-sm focus:outline-none"
          aria-label="Next Testimonial"
        >
          <ChevronRight size={32} />
        </button>

        <div className="relative w-full perspective-1000">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="w-full"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeaveInner}
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            >
              <div className="bg-white rounded-3xl p-6 lg:p-12 shadow-[0_8px_40px_rgba(0,0,0,0.08)] border border-zinc-100 flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
                
                {/* 1. Dominant Picture Feature */}
                <motion.div 
                   variants={staggerContainer}
                   initial="hidden"
                   animate="show"
                   className="w-full lg:w-[40%] flex justify-center items-center shrink-0 relative"
                >
                  <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[450px] lg:h-[450px]">
                    {/* Glowing Halo */}
                    <div className="absolute inset-[-10%] bg-gradient-to-tr from-emerald-200 via-emerald-100 to-white opacity-60 rounded-full blur-2xl" style={{ animationDuration: '4s' }} />
                    
                    {/* Abstract Blob Shape specific to Image */}
                    <motion.div 
                      className="relative w-full h-full overflow-hidden border-[3px] border-white/30 backdrop-blur-md shadow-2xl"
                      style={{ borderRadius: '45% 55% 70% 30% / 40% 50% 60% 50%' }}
                      animate={{
                        borderRadius: [
                          '45% 55% 70% 30% / 40% 50% 60% 50%',
                          '35% 65% 50% 50% / 50% 40% 70% 40%',
                          '50% 50% 40% 60% / 60% 70% 30% 40%',
                          '45% 55% 70% 30% / 40% 50% 60% 50%'
                        ]
                      }}
                      transition={{ duration: 10, ease: "linear", repeat: Infinity }}
                    >
                      {testimonials[currentIndex].image ? (
                        <Image 
                          src={testimonials[currentIndex].image} 
                          alt={testimonials[currentIndex].author} 
                          fill 
                          className="object-cover object-top scale-105 hover:scale-110 transition-transform duration-1000" 
                          priority
                        />
                      ) : (
                        <div className="w-full h-full bg-hitam-green/20 flex items-center justify-center">
                          <span className="text-7xl font-bold text-hitam-green/60">{testimonials[currentIndex].author.charAt(0)}</span>
                        </div>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
                
                {/* 2. Content & Glassmorphism Text Layer */}
                <motion.div 
                  variants={staggerContainer}
                  initial="hidden"
                  animate="show"
                  className="w-full lg:w-[60%] flex flex-col justify-center relative z-10"
                  style={{ transform: "translateZ(30px)" }} // 3D popup off the card
                >
                  {/* Subtle translucent watermark quotes */}
                  <Quote className="absolute -top-10 -left-6 lg:-top-16 lg:-left-12 w-24 h-24 lg:w-40 lg:h-40 text-white/5 rotate-180 pointer-events-none" />

                  <motion.div variants={itemFadeIn}>
                    <p className="font-sans text-lg md:text-xl lg:text-2xl text-zinc-700 leading-relaxed font-light italic mb-8 relative z-10">
                      &quot;{testimonials[currentIndex].quote}&quot;
                    </p>
                  </motion.div>
                  
                  <motion.div variants={itemFadeIn} className="flex flex-col mt-auto relative z-10 pt-4 border-t border-white/10">
                    <h4 className="font-sans font-bold text-zinc-900 text-2xl lg:text-4xl mb-2 tracking-tight">
                      {testimonials[currentIndex].author}
                    </h4>
                    <span className="font-sans text-sm lg:text-base font-extrabold text-emerald-600 tracking-[0.2em]">
                      {testimonials[currentIndex].role}
                    </span>
                  </motion.div>
                </motion.div>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Dot Indicators */}
        <div className="flex justify-center gap-4 mt-12 relative z-20">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`h-1.5 rounded-full transition-all duration-500 ease-out focus:outline-none ${
                index === currentIndex 
                  ? 'bg-emerald-600 w-12' 
                  : 'bg-zinc-300 w-3 hover:bg-zinc-500'
              }`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
