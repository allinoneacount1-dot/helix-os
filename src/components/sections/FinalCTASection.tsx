"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Rocket, ArrowRight, Sparkles } from "lucide-react";
import { MotionSection } from "@/components/motion";

export function FinalCTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isHovered, setIsHovered] = useState(false);

  const handleLaunch = () => window.open("#", "_blank");

  return (
    <section id="cta" className="relative py-32 md:py-48 overflow-hidden" ref={ref}>
      {/* Cosmic background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#5B8CFF]/5 blur-[150px]"
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/3 left-1/3 w-[400px] h-[400px] rounded-full bg-[#7C3AED]/5 blur-[120px]"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/3 w-[300px] h-[300px] rounded-full bg-[#00D4AA]/5 blur-[100px]"
          animate={{ scale: [1, 1.4, 1], opacity: [0.15, 0.4, 0.15] }}
          transition={{ duration: 7, repeat: Infinity }}
        />

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#5B8CFF]/20"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 0.6, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              delay: Math.random() * 3,
              repeat: Infinity,
            }}
          />
        ))}
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        <MotionSection className="text-center">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={isInView ? { scale: 1, rotate: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
            className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#5B8CFF] to-[#7C3AED] flex items-center justify-center mx-auto mb-8"
          >
            <Sparkles size={32} className="text-white" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-[family-name:var(--font-space-grotesk)] text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6"
          >
            Build Your
            <br />
            <span className="text-gradient">Sovereign Intelligence</span>
            <br />
            System
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-lg md:text-xl text-white/35 max-w-2xl mx-auto mb-12"
          >
            Join the intelligence revolution. Deploy agents. Automate wealth. Launch startups. All from one command center.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.button
              onClick={handleLaunch}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              whileHover={{ scale: 1.03, boxShadow: "0 0 60px rgba(91,140,255,0.4)" }}
              whileTap={{ scale: 0.97 }}
              className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-[#5B8CFF] to-[#7C3AED] text-white font-medium text-lg flex items-center gap-3 transition-shadow duration-300"
              data-cursor-hover="true"
            >
              <Rocket size={20} />
              Launch Helix OS
              <motion.span animate={isHovered ? { x: 4 } : { x: 0 }}>
                <ArrowRight size={18} />
              </motion.span>
            </motion.button>

            <motion.button
              onClick={() => { const el = document.getElementById("ecosystem"); if (el) el.scrollIntoView({ behavior: "smooth" }); }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-4 rounded-2xl glass text-white/50 hover:text-white font-medium text-lg flex items-center gap-2 hover:border-white/15 transition-all duration-300"
              data-cursor-hover="true"
            >
              Explore Ecosystem
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-6 text-xs text-white/15"
          >
            {["No credit card required", "Free tier available", "Cancel anytime"].map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.1 + i * 0.1 }}
                className="flex items-center gap-1.5"
              >
                <motion.div
                  className="w-1.5 h-1.5 rounded-full bg-[#00D4AA]"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                />
                {item}
              </motion.div>
            ))}
          </motion.div>
        </MotionSection>
      </div>
    </section>
  );
}
