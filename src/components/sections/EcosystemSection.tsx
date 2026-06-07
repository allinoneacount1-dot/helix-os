"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Brain,
  Users,
  Rocket,
  BarChart3,
  BookOpen,
  Palette,
  Target,
  Zap,
  Shield,
  ArrowRight,
} from "lucide-react";

const ecosystemCards = [
  {
    icon: <Brain size={24} />,
    title: "Hermes Intelligence Engine",
    desc: "Core AI orchestration layer — multi-agent coordination, reasoning, and execution.",
    color: "#5B8CFF",
    status: "Active",
  },
  {
    icon: <Users size={24} />,
    title: "Agent Empire",
    desc: "Deploy autonomous agents for research, building, trading, and operations.",
    color: "#7C3AED",
    status: "Active",
  },
  {
    icon: <Rocket size={24} />,
    title: "Startup Studio",
    desc: "Idea validation → MVP → Launch → Scale. Full lifecycle automation.",
    color: "#00D4AA",
    status: "Active",
  },
  {
    icon: <BarChart3 size={24} />,
    title: "Wealth OS",
    desc: "Autonomous portfolio management, risk analysis, and opportunity detection.",
    color: "#F59E0B",
    status: "Active",
  },
  {
    icon: <BookOpen size={24} />,
    title: "Knowledge Vault",
    desc: "2,536+ knowledge points across 22 collections. RAG-powered intelligence.",
    color: "#5B8CFF",
    status: "Active",
  },
  {
    icon: <Palette size={24} />,
    title: "Design Godmode",
    desc: "AI-powered design system generation. From concept to production-ready UI.",
    color: "#7C3AED",
    status: "Beta",
  },
  {
    icon: <Target size={24} />,
    title: "Market War Room",
    desc: "Real-time market intelligence, whale tracking, and sentiment analysis.",
    color: "#EF4444",
    status: "Active",
  },
  {
    icon: <Zap size={24} />,
    title: "Execution Engine",
    desc: "Autonomous task execution across chains, platforms, and protocols.",
    color: "#00D4AA",
    status: "Active",
  },
  {
    icon: <Shield size={24} />,
    title: "Sovereign Stack",
    desc: "Self-hosted infrastructure. Full data sovereignty. Zero vendor lock-in.",
    color: "#5B8CFF",
    status: "Active",
  },
];

function EcosystemCard({
  card,
  index,
  isInView,
}: {
  card: (typeof ecosystemCards)[0];
  index: number;
  isInView: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        // Scroll to relevant section
        const sectionMap: Record<string, string> = {
          "Hermes Intelligence Engine": "agents",
          "Agent Empire": "agents",
          "Startup Studio": "studio",
          "Wealth OS": "wealth",
          "Knowledge Vault": "knowledge",
          "Design Godmode": "design",
          "Market War Room": "wealth",
          "Execution Engine": "stack",
          "Sovereign Stack": "stack",
        };
        const target = sectionMap[card.title];
        if (target) {
          const el = document.getElementById(target);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }
      }}
      className="glass rounded-2xl p-6 cursor-pointer group relative overflow-hidden transition-all duration-300 hover:border-white/15"
      style={{
        boxShadow: isHovered ? `0 0 40px ${card.color}15, 0 20px 60px rgba(0,0,0,0.3)` : "none",
      }}
    >
      {/* Glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${card.color}08, transparent 70%)`,
        }}
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300"
            style={{
              backgroundColor: `${card.color}15`,
              color: card.color,
            }}
          >
            {card.icon}
          </div>
          <span
            className="text-[10px] font-mono px-2 py-1 rounded-full"
            style={{
              backgroundColor: card.status === "Active" ? "#00D4AA15" : "#F59E0B15",
              color: card.status === "Active" ? "#00D4AA" : "#F59E0B",
            }}
          >
            {card.status}
          </span>
        </div>

        <h3 className="font-[family-name:var(--font-space-grotesk)] text-base font-semibold mb-2 group-hover:text-white transition-colors">
          {card.title}
        </h3>
        <p className="text-sm text-white/35 leading-relaxed mb-4">
          {card.desc}
        </p>

        <div className="flex items-center gap-1 text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ color: card.color }}
        >
          EXPLORE
          <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
}

export function EcosystemSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="ecosystem" className="relative py-32 md:py-40" ref={ref}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="section-label mb-6">// HELIX ECOSYSTEM</div>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
            Nine Pillars of{" "}
            <span className="text-gradient">Intelligence</span>
          </h2>
          <p className="text-white/40 text-lg max-w-2xl mx-auto">
            Every module works independently or as part of the unified intelligence layer.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ecosystemCards.map((card, i) => (
            <EcosystemCard key={i} card={card} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}
