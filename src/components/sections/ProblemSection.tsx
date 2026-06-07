"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { AlertTriangle, X, Zap, Brain, Coins, Workflow } from "lucide-react";

const problems = [
  {
    icon: <Brain size={20} />,
    title: "AI tools are isolated",
    desc: "Each tool works in silos — no shared context, no compounding intelligence.",
  },
  {
    icon: <Workflow size={20} />,
    title: "Workflows are disconnected",
    desc: "Manual handoffs between tools kill momentum and create friction.",
  },
  {
    icon: <Zap size={20} />,
    title: "Knowledge is scattered",
    desc: "Insights lost across platforms — no unified knowledge layer.",
  },
  {
    icon: <Coins size={20} />,
    title: "Wealth systems are manual",
    desc: "No autonomous capital allocation — every decision requires human intervention.",
  },
];

const consequences = [
  "Lost leverage",
  "Lost compounding",
  "Lost intelligence",
];

export function ProblemSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="problem" className="relative py-32 md:py-40" ref={ref}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="section-label mb-6">// THE PROBLEM</div>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
              Modern tools are{" "}
              <span className="text-white/40 line-through">fragmented</span>{" "}
              <span className="text-[#EF4444]">broken</span>
            </h2>
            <p className="text-white/40 text-lg mb-8">
              The current toolstack creates more problems than it solves.
            </p>

            <div className="space-y-4">
              {problems.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/[0.02] transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#EF4444]/10 flex items-center justify-center text-[#EF4444] shrink-0 group-hover:bg-[#EF4444]/20 transition-colors">
                    {p.icon}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white/80 mb-1">{p.title}</div>
                    <div className="text-xs text-white/30">{p.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Glitch animation */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative"
          >
            <div className="glass rounded-2xl p-8 md:p-12 relative overflow-hidden">
              {/* Glitch lines */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute h-px bg-gradient-to-r from-transparent via-[#EF4444]/30 to-transparent w-full"
                    style={{ top: `${20 + i * 15}%` }}
                    animate={{
                      x: ["-100%", "100%"],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 3,
                      delay: i * 0.5,
                      repeat: Infinity,
                      repeatDelay: 2,
                    }}
                  />
                ))}
              </div>

              <div className="relative z-10 text-center">
                <div className="w-20 h-20 rounded-2xl bg-[#EF4444]/10 flex items-center justify-center mx-auto mb-6">
                  <AlertTriangle size={32} className="text-[#EF4444]" />
                </div>

                <h3 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold mb-4">
                  Result
                </h3>

                <div className="space-y-3">
                  {consequences.map((c, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.4, delay: 0.5 + i * 0.15 }}
                      className="flex items-center justify-center gap-2 text-[#EF4444]"
                    >
                      <X size={14} />
                      <span className="font-mono text-sm">{c}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-white/5">
                  <div className="text-4xl font-bold font-[family-name:var(--font-space-grotesk)] text-[#EF4444]">
                    -87%
                  </div>
                  <div className="text-xs text-white/30 mt-1">Efficiency Loss</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
