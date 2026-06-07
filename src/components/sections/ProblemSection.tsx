"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { AlertTriangle, X, Zap, Brain, Coins, Workflow } from "lucide-react";
import { StaggerContainer, StaggerItem, MotionSection } from "@/components/motion";

const problems = [
  { icon: <Brain size={20} />, title: "AI tools are isolated", desc: "Each tool works in silos — no shared context, no compounding intelligence.", color: "#5B8CFF" },
  { icon: <Workflow size={20} />, title: "Workflows are disconnected", desc: "Manual handoffs between tools kill momentum and create friction.", color: "#7C3AED" },
  { icon: <Zap size={20} />, title: "Knowledge is scattered", desc: "Insights lost across platforms — no unified knowledge layer.", color: "#00D4AA" },
  { icon: <Coins size={20} />, title: "Wealth systems are manual", desc: "No autonomous capital allocation — every decision requires human intervention.", color: "#F59E0B" },
];

const consequences = ["Lost leverage", "Lost compounding", "Lost intelligence"];

export function ProblemSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="problem" className="relative py-32 md:py-40" ref={ref}>
      {/* Section divider */}
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <MotionSection direction="left">
            <div className="section-label mb-6">// THE PROBLEM</div>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
              Modern tools are{" "}
              <span className="text-white/30 line-through">fragmented</span>{" "}
              <span className="text-gradient-warm">broken</span>
            </h2>
            <p className="text-white/40 text-lg mb-8">
              The current toolstack creates more problems than it solves.
            </p>

            <StaggerContainer className="space-y-4">
              {problems.map((p, i) => (
                <StaggerItem key={i}>
                  <motion.div
                    whileHover={{ x: 8, backgroundColor: "rgba(255,255,255,0.03)" }}
                    className="flex items-start gap-4 p-4 rounded-xl transition-colors group cursor-default"
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
                      style={{ backgroundColor: `${p.color}15`, color: p.color }}
                    >
                      {p.icon}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white/80 mb-1">{p.title}</div>
                      <div className="text-xs text-white/30">{p.desc}</div>
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </MotionSection>

          {/* Right: Glitch card */}
          <MotionSection direction="right" delay={0.2}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="glass rounded-2xl p-8 md:p-12 relative overflow-hidden"
            >
              {/* Animated glitch lines */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute h-px w-full"
                    style={{
                      top: `${15 + i * 14}%`,
                      background: `linear-gradient(90deg, transparent, ${i % 2 === 0 ? "rgba(239,68,68,0.2)" : "rgba(91,140,255,0.15)"}, transparent)`,
                    }}
                    animate={{ x: ["-100%", "100%"], opacity: [0, 1, 0] }}
                    transition={{ duration: 4, delay: i * 0.6, repeat: Infinity, repeatDelay: 3 }}
                  />
                ))}
              </div>

              <div className="relative z-10 text-center">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="w-20 h-20 rounded-2xl bg-[#EF4444]/10 flex items-center justify-center mx-auto mb-6"
                >
                  <AlertTriangle size={32} className="text-[#EF4444]" />
                </motion.div>

                <h3 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold mb-4">Result</h3>

                <StaggerContainer className="space-y-3">
                  {consequences.map((c, i) => (
                    <StaggerItem key={i}>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center justify-center gap-2 text-[#EF4444] cursor-default"
                      >
                        <X size={14} />
                        <span className="font-mono text-sm">{c}</span>
                      </motion.div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>

                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: 1, type: "spring" }}
                  className="mt-8 pt-6 border-t border-white/5"
                >
                  <div className="text-5xl font-bold font-[family-name:var(--font-space-grotesk)] text-[#EF4444]">
                    -87%
                  </div>
                  <div className="text-xs text-white/25 mt-1">Efficiency Loss</div>
                </motion.div>
              </div>
            </motion.div>
          </MotionSection>
        </div>
      </div>
    </section>
  );
}
