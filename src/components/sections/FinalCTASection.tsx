"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Rocket, ArrowRight, Sparkles } from "lucide-react";

export function FinalCTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isHovered, setIsHovered] = useState(false);

  const handleLaunch = () => {
    // In production, this would open the app
    window.open("#", "_blank");
  };

  return (
    <section id="cta" className="relative py-32 md:py-48 overflow-hidden" ref={ref}>
      {/* Cosmic background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#5B8CFF]/5 blur-[150px]" />
        <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] rounded-full bg-[#7C3AED]/5 blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/3 w-[300px] h-[300px] rounded-full bg-[#00D4AA]/5 blur-[100px]" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
            className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#5B8CFF] to-[#7C3AED] flex items-center justify-center mx-auto mb-8"
          >
            <Sparkles size={32} className="text-white" />
          </motion.div>

          <h2 className="font-[family-name:var(--font-space-grotesk)] text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6">
            Build Your
            <br />
            <span className="text-gradient">Sovereign Intelligence</span>
            <br />
            System
          </h2>

          <p className="text-lg md:text-xl text-white/40 max-w-2xl mx-auto mb-12">
            Join the intelligence revolution. Deploy agents. Automate wealth. Launch startups. All from one command center.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              onClick={handleLaunch}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-[#5B8CFF] to-[#7C3AED] text-white font-medium text-lg flex items-center gap-3 hover:shadow-2xl hover:shadow-[#5B8CFF]/20 transition-shadow duration-300"
            >
              <Rocket size={20} />
              Launch Helix OS
              <ArrowRight size={18} className={`transition-transform duration-300 ${isHovered ? "translate-x-1" : ""}`} />
            </motion.button>

            <button
              onClick={() => {
                const el = document.getElementById("ecosystem");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-8 py-4 rounded-2xl glass text-white/60 hover:text-white font-medium text-lg flex items-center gap-2 hover:border-white/15 transition-all duration-300"
            >
              Explore Ecosystem
            </button>
          </div>

          {/* Trust line */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-6 text-xs text-white/20">
            <span className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00D4AA]" />
              No credit card required
            </span>
            <span className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00D4AA]" />
              Free tier available
            </span>
            <span className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00D4AA]" />
              Cancel anytime
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
