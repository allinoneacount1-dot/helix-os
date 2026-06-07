"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Lightbulb, Search, Code, Rocket, TrendingUp, CheckCircle2 } from "lucide-react";
import { StaggerContainer, StaggerItem, MotionSection } from "@/components/motion";

const stages = [
  { id: 0, icon: <Lightbulb size={20} />, title: "Idea", desc: "Validate market fit, analyze competitors, define value proposition.", color: "#F59E0B", tasks: ["Market research", "Competitor analysis", "Value prop definition"] },
  { id: 1, icon: <Search size={20} />, title: "Validate", desc: "Build MVP, test with real users, iterate based on feedback.", color: "#5B8CFF", tasks: ["MVP development", "User testing", "Feedback loops"] },
  { id: 2, icon: <Code size={20} />, title: "Build", desc: "Full-scale development. Production-ready architecture.", color: "#7C3AED", tasks: ["Full-stack build", "Smart contracts", "Security audit"] },
  { id: 3, icon: <Rocket size={20} />, title: "Launch", desc: "Go-to-market execution. Community building. Growth hacking.", color: "#00D4AA", tasks: ["GTM strategy", "Community launch", "Growth campaigns"] },
  { id: 4, icon: <TrendingUp size={20} />, title: "Scale", desc: "Optimize, expand, and compound. Autonomous growth systems.", color: "#EF4444", tasks: ["Performance optimization", "Market expansion", "Revenue scaling"] },
];

export function StartupStudioSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeStage, setActiveStage] = useState(0);

  return (
    <section id="studio" className="relative py-32 md:py-40" ref={ref}>
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <MotionSection className="text-center mb-16">
          <div className="section-label mb-6">// STARTUP STUDIO</div>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
            From Idea to <span className="text-gradient">Empire</span>
          </h2>
          <p className="text-white/40 text-lg max-w-2xl mx-auto">
            Five-stage startup lifecycle. Each stage automated by specialized agents.
          </p>
        </MotionSection>

        <MotionSection delay={0.2}>
          {/* Timeline */}
          <div className="relative mb-8">
            <div className="absolute top-6 left-0 right-0 h-px bg-white/5 hidden md:block" />
            <motion.div
              className="absolute top-6 left-0 h-px bg-gradient-to-r from-[#5B8CFF] to-[#7C3AED] hidden md:block"
              initial={{ width: "0%" }}
              animate={{ width: `${(activeStage / 4) * 100}%` }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {stages.map((stage, i) => (
                <motion.button
                  key={stage.id}
                  onClick={() => setActiveStage(i)}
                  className="relative text-left group"
                  whileHover={{ y: -4 }}
                  data-cursor-hover="true"
                >
                  <div className="flex md:flex-col items-center md:items-start gap-4 md:gap-0">
                    <motion.div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 z-10"
                      style={{
                        backgroundColor: `${stage.color}${activeStage === i ? "25" : "10"}`,
                        border: `1px solid ${stage.color}${activeStage === i ? "60" : "20"}`,
                        color: stage.color,
                        boxShadow: activeStage === i ? `0 0 30px ${stage.color}20` : "none",
                      }}
                      animate={activeStage === i ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {stage.icon}
                    </motion.div>
                    <div className="md:mt-4">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-white/15">0{stage.id + 1}</span>
                        <h3 className={`font-[family-name:var(--font-space-grotesk)] text-sm font-semibold transition-colors ${activeStage === i ? "text-white" : "text-white/35"}`}>
                          {stage.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Active stage detail */}
          <motion.div
            key={activeStage}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="glass rounded-2xl p-6 md:p-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <motion.div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${stages[activeStage].color}15`, color: stages[activeStage].color }}
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    {stages[activeStage].icon}
                  </motion.div>
                  <div>
                    <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold">Stage {activeStage + 1}: {stages[activeStage].title}</h3>
                    <span className="text-xs font-mono text-white/25">STARTUP LIFECYCLE</span>
                  </div>
                </div>
                <p className="text-white/35 text-sm">{stages[activeStage].desc}</p>
              </div>
              <div>
                <div className="text-xs font-mono text-white/25 mb-3">KEY TASKS</div>
                <StaggerContainer className="space-y-2">
                  {stages[activeStage].tasks.map((task, i) => (
                    <StaggerItem key={i}>
                      <div className="flex items-center gap-2 text-sm text-white/55">
                        <CheckCircle2 size={14} style={{ color: stages[activeStage].color }} />
                        {task}
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </div>
          </motion.div>
        </MotionSection>
      </div>
    </section>
  );
}
