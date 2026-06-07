"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { HelixCore } from "@/components/HelixCore3D";
import { Play, Rocket, ArrowRight, ChevronDown } from "lucide-react";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
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

export function HeroSection() {
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
    <section id="hero" className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[calc(100vh-4rem)]">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="py-12 lg:py-0"
          >
            <div className="section-label mb-6">
              // INTELLIGENCE COMMAND CENTER
            </div>

            <h1 className="font-[family-name:var(--font-space-grotesk)] text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] tracking-tight mb-6">
              The Sovereign{" "}
              <span className="text-gradient">Operating System</span>{" "}
              for Builders, Founders & Investors
            </h1>

            <p className="text-lg md:text-xl text-white/50 leading-relaxed mb-8 max-w-xl">
              AI agents, startup creation, wealth intelligence, and autonomous execution unified into one intelligence layer.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleLaunch}
                className="group px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#5B8CFF] to-[#7C3AED] text-white font-medium text-sm flex items-center gap-2 hover:shadow-lg hover:shadow-[#5B8CFF]/20 transition-all duration-300 hover:scale-[1.02]"
              >
                <Rocket size={16} />
                Launch Helix
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={handleWatchDemo}
                className="group px-6 py-3.5 rounded-xl glass text-white/70 hover:text-white font-medium text-sm flex items-center gap-2 hover:border-white/20 transition-all duration-300"
              >
                <Play size={14} />
                Watch Intelligence Demo
              </button>
            </div>

            {/* Trust metrics */}
            <div className="mt-12 flex items-center gap-8">
              <div>
                <div className="text-2xl font-bold font-[family-name:var(--font-space-grotesk)]">
                  <AnimatedCounter target={2536} suffix="+" />
                </div>
                <div className="text-xs text-white/30 mt-1">Knowledge Points</div>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div>
                <div className="text-2xl font-bold font-[family-name:var(--font-space-grotesk)]">
                  <AnimatedCounter target={22} />
                </div>
                <div className="text-xs text-white/30 mt-1">AI Collections</div>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div>
                <div className="text-2xl font-bold font-[family-name:var(--font-space-grotesk)]">
                  <AnimatedCounter target={6} />
                </div>
                <div className="text-xs text-white/30 mt-1">Agent Types</div>
              </div>
            </div>
          </motion.div>

          {/* Right: 3D Helix */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="relative w-full h-[400px] lg:h-[600px]"
          >
            <HelixCore />
            {/* Glow behind */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-[#5B8CFF]/10 blur-[100px]" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={handleScrollDown}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/20 hover:text-white/50 transition-colors"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown size={24} />
        </motion.div>
      </motion.button>
    </section>
  );
}
