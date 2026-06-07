"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Bot, Search, Code, Palette, TrendingUp, Crown, ArrowRight } from "lucide-react";
import { StaggerContainer, StaggerItem, MotionSection } from "@/components/motion";

const agents = [
  { id: "ceo", label: "CEO Agent", icon: <Crown size={18} />, color: "#5B8CFF", x: 50, y: 50, desc: "Orchestrates all agents, makes strategic decisions" },
  { id: "founder", label: "Founder Agent", icon: <Bot size={18} />, color: "#7C3AED", x: 20, y: 25, desc: "Validates ideas, builds business plans" },
  { id: "research", label: "Research Agent", icon: <Search size={18} />, color: "#00D4AA", x: 80, y: 25, desc: "Deep market & technology research" },
  { id: "builder", label: "Builder Agent", icon: <Code size={18} />, color: "#F59E0B", x: 15, y: 70, desc: "Full-stack development & deployment" },
  { id: "design", label: "Design Agent", icon: <Palette size={18} />, color: "#EF4444", x: 85, y: 70, desc: "UI/UX design & brand systems" },
  { id: "trading", label: "Trading Agent", icon: <TrendingUp size={18} />, color: "#5B8CFF", x: 50, y: 85, desc: "Autonomous trading & portfolio management" },
];

const connections = [
  [0, 1], [0, 2], [0, 3], [0, 4], [0, 5],
  [1, 2], [2, 3], [3, 4], [4, 5], [5, 1],
];

function getCapabilities(index: number): string[] {
  const caps: string[][] = [
    ["Strategic planning & decision making", "Agent coordination & delegation", "Resource allocation", "Priority management"],
    ["Idea validation & market research", "Business model creation", "Pitch deck generation", "Go-to-market strategy"],
    ["Market analysis & intelligence", "Competitor research", "Technology scouting", "Report generation"],
    ["Full-stack development", "Smart contract deployment", "CI/CD automation", "Testing & QA"],
    ["UI/UX design systems", "Brand identity creation", "Design-to-code conversion", "Accessibility audit"],
    ["Portfolio management", "Risk assessment", "Opportunity detection", "Automated execution"],
  ];
  return caps[index] || [];
}

export function AgentSystemSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeAgent, setActiveAgent] = useState<number | null>(null);
  const [pulsePhase, setPulsePhase] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setPulsePhase((p) => (p + 1) % connections.length), 1500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="agents" className="relative py-32 md:py-40" ref={ref}>
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <MotionSection className="text-center mb-16">
          <div className="section-label mb-6">// AGENT SYSTEM</div>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
            Autonomous <span className="text-gradient">Agent Network</span>
          </h2>
          <p className="text-white/40 text-lg max-w-2xl mx-auto">
            Six specialized agents working in concert. Each with unique capabilities, all sharing one intelligence layer.
          </p>
        </MotionSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Network visualization */}
          <MotionSection direction="scale" delay={0.2}>
            <div className="relative glass rounded-2xl p-8 aspect-square max-w-lg mx-auto w-full">
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                {connections.map(([from, to], i) => (
                  <motion.line
                    key={i}
                    x1={agents[from].x} y1={agents[from].y}
                    x2={agents[to].x} y2={agents[to].y}
                    stroke={i === pulsePhase ? "#5B8CFF" : "rgba(255,255,255,0.05)"}
                    strokeWidth={i === pulsePhase ? "0.5" : "0.2"}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1, strokeOpacity: i === pulsePhase ? [0.1, 0.6, 0.1] : 0.05 }}
                    transition={{ pathLength: { duration: 1, delay: i * 0.1 }, strokeOpacity: { duration: 1.5, repeat: Infinity } }}
                  />
                ))}
              </svg>

              {agents.map((agent, i) => (
                <motion.button
                  key={agent.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1, type: "spring" }}
                  onClick={() => setActiveAgent(activeAgent === i ? null : i)}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                  style={{ left: `${agent.x}%`, top: `${agent.y}%` }}
                  data-cursor-hover="true"
                >
                  <motion.div
                    className="absolute inset-0 rounded-full blur-xl"
                    style={{ backgroundColor: agent.color, width: 60, height: 60, transform: "translate(-50%, -50%)", left: "50%", top: "50%" }}
                    animate={{ opacity: activeAgent === i ? 0.3 : 0.08, scale: activeAgent === i ? [1, 1.3, 1] : 1 }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <motion.div
                    className="relative w-12 h-12 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: `${agent.color}20`,
                      border: `1px solid ${activeAgent === i ? agent.color : `${agent.color}40`}`,
                      color: agent.color,
                    }}
                    whileHover={{ scale: 1.15 }}
                    animate={activeAgent === i ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {agent.icon}
                  </motion.div>
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-mono text-white/30">
                    {agent.label}
                  </div>
                </motion.button>
              ))}
            </div>
          </MotionSection>

          {/* Agent details */}
          <MotionSection direction="right" delay={0.3}>
            {activeAgent !== null ? (
              <motion.div
                key={activeAgent}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="glass rounded-2xl p-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  <motion.div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${agents[activeAgent].color}15`, color: agents[activeAgent].color }}
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    {agents[activeAgent].icon}
                  </motion.div>
                  <div>
                    <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold">{agents[activeAgent].label}</h3>
                    <span className="text-xs font-mono text-[#00D4AA]">● ACTIVE</span>
                  </div>
                </div>
                <p className="text-white/45 mb-6">{agents[activeAgent].desc}</p>
                <div className="text-xs font-mono text-white/25 mb-3">CAPABILITIES</div>
                <StaggerContainer className="space-y-2">
                  {getCapabilities(activeAgent).map((cap, i) => (
                    <StaggerItem key={i}>
                      <div className="flex items-center gap-2 text-sm text-white/55">
                        <ArrowRight size={12} style={{ color: agents[activeAgent].color }} />
                        {cap}
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass rounded-2xl p-8 text-center"
              >
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Bot size={48} className="text-white/10 mx-auto mb-4" />
                </motion.div>
                <p className="text-white/25 text-sm">Click on any agent node to view details</p>
              </motion.div>
            )}

            {/* Agent list */}
            <div className="mt-4 grid grid-cols-2 gap-2">
              {agents.map((agent, i) => (
                <motion.button
                  key={agent.id}
                  onClick={() => setActiveAgent(i)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center gap-2 p-3 rounded-xl text-left transition-all duration-200 ${
                    activeAgent === i ? "glass border-white/15" : "hover:bg-white/[0.02]"
                  }`}
                  data-cursor-hover="true"
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${agent.color}15`, color: agent.color }}
                  >
                    {agent.icon}
                  </div>
                  <span className="text-xs text-white/45 truncate">{agent.label}</span>
                </motion.button>
              ))}
            </div>
          </MotionSection>
        </div>
      </div>
    </section>
  );
}
