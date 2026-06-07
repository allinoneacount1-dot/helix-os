"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Bot,
  Brain,
  Zap,
  Coins,
  Share2,
  Shield,
  Server,
  Layers,
} from "lucide-react";

const layers = [
  {
    id: "agents",
    icon: <Bot size={20} />,
    title: "AI Agents",
    desc: "Autonomous agent network — CEO, Founder, Research, Builder, Design, Trading.",
    color: "#5B8CFF",
    components: ["Agent Runtime", "Task Queue", "Memory System", "Coordination Protocol"],
  },
  {
    id: "knowledge",
    icon: <Brain size={20} />,
    title: "Knowledge System",
    desc: "RAG-powered intelligence layer with 2,536+ knowledge points.",
    color: "#7C3AED",
    components: ["Vector DB", "Embedding Engine", "Retrieval Pipeline", "Knowledge Graph"],
  },
  {
    id: "execution",
    icon: <Zap size={20} />,
    title: "Execution Engine",
    desc: "Autonomous task execution across chains, platforms, and protocols.",
    color: "#00D4AA",
    components: ["Workflow Runner", "Chain Abstraction", "Gas Optimizer", "Error Handler"],
  },
  {
    id: "capital",
    icon: <Coins size={20} />,
    title: "Capital System",
    desc: "Autonomous portfolio management, risk analysis, and yield optimization.",
    color: "#F59E0B",
    components: ["Portfolio Tracker", "Risk Engine", "Yield Router", "Whale Monitor"],
  },
  {
    id: "distribution",
    icon: <Share2 size={20} />,
    title: "Distribution System",
    desc: "Content generation, community management, and growth automation.",
    color: "#EF4444",
    components: ["Content Engine", "Social Manager", "Growth Analytics", "A/B Testing"],
  },
  {
    id: "security",
    icon: <Shield size={20} />,
    title: "Security Layer",
    desc: "Multi-sig, access control, audit logging, and threat detection.",
    color: "#5B8CFF",
    components: ["Access Control", "Audit Log", "Threat Detection", "Key Management"],
  },
  {
    id: "infrastructure",
    icon: <Server size={20} />,
    title: "Infrastructure",
    desc: "Self-hosted or cloud. Docker, Kubernetes, or bare metal.",
    color: "#7C3AED",
    components: ["Container Runtime", "Service Mesh", "Load Balancer", "Monitoring"],
  },
];

export function SovereignStackSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeLayer, setActiveLayer] = useState(0);

  return (
    <section id="stack" className="relative py-32 md:py-40" ref={ref}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="section-label mb-6">// SOVEREIGN STACK</div>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
            Seven Layers of{" "}
            <span className="text-gradient">Infrastructure</span>
          </h2>
          <p className="text-white/40 text-lg max-w-2xl mx-auto">
            Full-stack intelligence infrastructure. Every layer autonomous. Every layer composable.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Stack visualization */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-2"
          >
            {layers.map((layer, i) => (
              <motion.button
                key={layer.id}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.05 }}
                onClick={() => setActiveLayer(i)}
                className={`w-full glass rounded-xl p-4 text-left transition-all duration-300 flex items-center gap-4 group ${
                  activeLayer === i ? "border-white/15 scale-[1.02]" : "hover:border-white/10"
                }`}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-300"
                  style={{
                    backgroundColor: `${layer.color}${activeLayer === i ? "25" : "10"}`,
                    color: layer.color,
                  }}
                >
                  {layer.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-white/20">Layer {i + 1}</span>
                    <h3 className={`text-sm font-semibold transition-colors ${activeLayer === i ? "text-white" : "text-white/50"}`}>
                      {layer.title}
                    </h3>
                  </div>
                </div>
                <div
                  className="w-2 h-2 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: activeLayer === i ? layer.color : `${layer.color}30`,
                    boxShadow: activeLayer === i ? `0 0 10px ${layer.color}40` : "none",
                  }}
                />
              </motion.button>
            ))}
          </motion.div>

          {/* Layer detail */}
          <motion.div
            key={activeLayer}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="glass rounded-2xl p-8 sticky top-24">
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{
                    backgroundColor: `${layers[activeLayer].color}15`,
                    color: layers[activeLayer].color,
                  }}
                >
                  {layers[activeLayer].icon}
                </div>
                <div>
                  <div className="text-[10px] font-mono text-white/20 mb-1">Layer {activeLayer + 1} of 7</div>
                  <h3 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold">
                    {layers[activeLayer].title}
                  </h3>
                </div>
              </div>

              <p className="text-white/40 mb-6">{layers[activeLayer].desc}</p>

              <div className="text-xs font-mono text-white/30 mb-3">COMPONENTS</div>
              <div className="grid grid-cols-2 gap-2">
                {layers[activeLayer].components.map((comp, i) => (
                  <motion.div
                    key={comp}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-2 p-3 rounded-lg bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
                  >
                    <Layers size={12} style={{ color: layers[activeLayer].color }} />
                    <span className="text-xs text-white/50">{comp}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
