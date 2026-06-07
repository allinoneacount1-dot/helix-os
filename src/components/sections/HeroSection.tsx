"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { CinematicHero } from "@/components/CinematicHero";
import { Play, Rocket, ArrowRight, ChevronDown } from "lucide-react";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2500;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

const textReveal = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.8 + i * 0.15,
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
};

export function HeroSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const helixScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const helixOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  const handleWatchDemo = () => {
    const el = document.getElementById("preview");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleLaunch = () => {
    const el = document.getElementById("cta");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleScrollDown = () => {
    const el = document.getElementById("problem");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" ref={sectionRef} className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[calc(100vh-4rem)]">
          {/* Left: Text with parallax */}
          <motion.div
            style={{ y: textY, opacity: textOpacity }}
            className="py-12 lg:py-0"
          >
            <motion.div
              custom={0}
              variants={textReveal}
              initial="hidden"
              animate="visible"
              className="section-label mb-6"
            >
              // INTELLIGENCE COMMAND CENTER
            </motion.div>

            <motion.h1
              custom={1}
              variants={textReveal}
              initial="hidden"
              animate="visible"
              className="font-[family-name:var(--font-space-grotesk)] text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] tracking-tight mb-6"
            >
              The Sovereign{" "}
              <span className="text-gradient">Operating System</span>{" "}
              for Builders, Founders & Investors
            </motion.h1>

            <motion.p
              custom={2}
              variants={textReveal}
              initial="hidden"
              animate="visible"
              className="text-lg md:text-xl text-white/40 leading-relaxed mb-8 max-w-xl"
            >
              AI agents, startup creation, wealth intelligence, and autonomous execution unified into one intelligence layer.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              custom={3}
              variants={textReveal}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-4"
            >
              <motion.button
                onClick={handleLaunch}
                whileHover={{ scale: 1.03, boxShadow: "0 0 40px rgba(91,140,255,0.3)" }}
                whileTap={{ scale: 0.97 }}
                className="group px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#5B8CFF] to-[#7C3AED] text-white font-medium text-sm flex items-center gap-2 transition-all duration-300"
              >
                <Rocket size={16} />
                Launch Helix
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                onClick={handleWatchDemo}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group px-6 py-3.5 rounded-xl glass text-white/55 hover:text-white font-medium text-sm flex items-center gap-2 hover:border-white/20 transition-all duration-300"
              >
                <Play size={14} />
                Watch Intelligence Demo
              </motion.button>
            </motion.div>

            {/* Trust metrics */}
            <motion.div
              custom={4}
              variants={textReveal}
              initial="hidden"
              animate="visible"
              className="mt-12 flex items-center gap-8"
            >
              <div>
                <div className="text-2xl font-bold font-[family-name:var(--font-space-grotesk)] text-gradient-blue">
                  <AnimatedCounter target={2536} suffix="+" />
                </div>
                <div className="text-xs text-white/20 mt-1">Knowledge Points</div>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div>
                <div className="text-2xl font-bold font-[family-name:var(--font-space-grotesk)] text-gradient-blue">
                  <AnimatedCounter target={22} />
                </div>
                <div className="text-xs text-white/20 mt-1">AI Collections</div>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div>
                <div className="text-2xl font-bold font-[family-name:var(--font-space-grotesk)] text-gradient-blue">
                  <AnimatedCounter target={6} />
                </div>
                <div className="text-xs text-white/20 mt-1">Agent Types</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Cinematic 3D Helix */}
          <motion.div
            style={{ scale: helixScale, opacity: helixOpacity }}
            className="relative w-full h-[400px] lg:h-[600px]"
          >
            <CinematicHero />
            {/* Glow behind */}
            <div className="absolute inset-0 -z-10">
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-[#5B8CFF]/10 blur-[100px]"
              />
              <motion.div
                animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute top-1/3 left-1/3 w-[200px] h-[200px] rounded-full bg-[#7C3AED]/10 blur-[80px]"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={handleScrollDown}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/15 hover:text-white/40 transition-colors hidden md:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={24} />
        </motion.div>
      </motion.button>
    </section>
  );
}
