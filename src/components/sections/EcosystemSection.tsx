"use client";

import { motion, useInView, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useRef, useState, type MouseEvent } from "react";
import {
  Brain, Users, Rocket, BarChart3, BookOpen, Palette,
  Target, Zap, Shield, ArrowRight,
} from "lucide-react";
import { StaggerContainer, StaggerItem, MotionSection } from "@/components/motion";

const ecosystemCards = [
  { icon: <Brain size={24} />, title: "Hermes Intelligence Engine", desc: "Core AI orchestration layer — multi-agent coordination, reasoning, and execution.", color: "#5B8CFF", status: "Active", section: "agents" },
  { icon: <Users size={24} />, title: "Agent Empire", desc: "Deploy autonomous agents for research, building, trading, and operations.", color: "#7C3AED", status: "Active", section: "agents" },
  { icon: <Rocket size={24} />, title: "Startup Studio", desc: "Idea validation → MVP → Launch → Scale. Full lifecycle automation.", color: "#00D4AA", status: "Active", section: "studio" },
  { icon: <BarChart3 size={24} />, title: "Wealth OS", desc: "Autonomous portfolio management, risk analysis, and opportunity detection.", color: "#F59E0B", status: "Active", section: "wealth" },
  { icon: <BookOpen size={24} />, title: "Knowledge Vault", desc: "2,536+ knowledge points across 22 collections. RAG-powered intelligence.", color: "#5B8CFF", status: "Active", section: "knowledge" },
  { icon: <Palette size={24} />, title: "Design Godmode", desc: "AI-powered design system generation. From concept to production-ready UI.", color: "#7C3AED", status: "Beta", section: "design" },
  { icon: <Target size={24} />, title: "Market War Room", desc: "Real-time market intelligence, whale tracking, and sentiment analysis.", color: "#EF4444", status: "Active", section: "wealth" },
  { icon: <Zap size={24} />, title: "Execution Engine", desc: "Autonomous task execution across chains, platforms, and protocols.", color: "#00D4AA", status: "Active", section: "stack" },
  { icon: <Shield size={24} />, title: "Sovereign Stack", desc: "Self-hosted infrastructure. Full data sovereignty. Zero vendor lock-in.", color: "#5B8CFF", status: "Active", section: "stack" },
];

function TiltCard({ card, index }: { card: (typeof ecosystemCards)[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-100, 100], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-8, 8]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const handleClick = () => {
    const el = document.getElementById(card.section);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className="glass rounded-2xl p-6 cursor-pointer group relative overflow-hidden transition-colors duration-300 hover:border-white/15"
      data-cursor-hover="true"
    >
      {/* Glow on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle at 50% 50%, ${card.color}08, transparent 70%)` }}
        animate={isHovered ? { scale: [0.8, 1.2] } : {}}
        transition={{ duration: 0.5 }}
      />

      {/* Particle burst on hover */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{ backgroundColor: card.color, left: "50%", top: "50%" }}
              initial={{ x: 0, y: 0, opacity: 1 }}
              animate={{
                x: (Math.random() - 0.5) * 100,
                y: (Math.random() - 0.5) * 100,
                opacity: 0,
              }}
              transition={{ duration: 0.8, delay: i * 0.05 }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <motion.div
            className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300"
            style={{ backgroundColor: `${card.color}15`, color: card.color }}
            animate={isHovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
          >
            {card.icon}
          </motion.div>
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
        <p className="text-sm text-white/30 leading-relaxed mb-4">
          {card.desc}
        </p>

        <motion.div
          className="flex items-center gap-1 text-xs font-mono"
          style={{ color: card.color }}
          initial={{ opacity: 0, x: -10 }}
          animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
          transition={{ duration: 0.3 }}
        >
          EXPLORE
          <ArrowRight size={12} />
        </motion.div>
      </div>
    </motion.div>
  );
}

export function EcosystemSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="ecosystem" className="relative py-32 md:py-40" ref={ref}>
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <MotionSection className="text-center mb-16">
          <div className="section-label mb-6">// HELIX ECOSYSTEM</div>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
            Nine Pillars of <span className="text-gradient">Intelligence</span>
          </h2>
          <p className="text-white/40 text-lg max-w-2xl mx-auto">
            Every module works independently or as part of the unified intelligence layer.
          </p>
        </MotionSection>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" staggerDelay={0.06}>
          {ecosystemCards.map((card, i) => (
            <StaggerItem key={i}>
              <TiltCard card={card} index={i} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
