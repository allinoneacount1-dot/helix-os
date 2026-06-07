"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Rocket, Plus, Search, ChevronRight,
  Lightbulb, FlaskConical, Hammer, Rocket as RocketLaunch, TrendingUp,
  Users, Clock, FileText, CheckCircle2, Circle,
  X, ChevronDown, Briefcase,
  Calendar, Paperclip, ArrowUpRight, MoreHorizontal,
  Eye, Edit3, Copy,
  Check, CircleDot,
} from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/Layout";

/* ═══════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════ */

type Stage = "Idea" | "Validate" | "Build" | "Launch" | "Scale";

interface Agent {
  name: string;
  role: string;
  avatar: string;
  color: string;
}

interface Task {
  id: number;
  label: string;
  done: boolean;
}

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  type: "milestone" | "task" | "document";
}

interface Document {
  name: string;
  type: "pdf" | "doc" | "sheet" | "link";
  size: string;
  added: string;
}

interface Project {
  id: number;
  name: string;
  description: string;
  stage: Stage;
  progress: number;
  industry: string;
  targetMarket: string;
  agents: Agent[];
  tasks: Task[];
  timeline: TimelineEvent[];
  documents: Document[];
  lastUpdated: string;
  color: string;
}

/* ═══════════════════════════════════════════════════════
   CONSTANTS
   ═══════════════════════════════════════════════════════ */

const STAGES: Stage[] = ["Idea", "Validate", "Build", "Launch", "Scale"];

const STAGE_CONFIG: Record<Stage, { icon: React.ReactNode; color: string; bg: string }> = {
  Idea: { icon: <Lightbulb size={14} />, color: "#A78BFA", bg: "rgba(167,139,250,0.12)" },
  Validate: { icon: <FlaskConical size={14} />, color: "#F59E0B", bg: "rgba(245,158,11,0.12)" },
  Build: { icon: <Hammer size={14} />, color: "#5B8CFF", bg: "rgba(91,140,255,0.12)" },
  Launch: { icon: <RocketLaunch size={14} />, color: "#00D4AA", bg: "rgba(0,212,170,0.12)" },
  Scale: { icon: <TrendingUp size={14} />, color: "#EF4444", bg: "rgba(239,68,68,0.12)" },
};

const INDUSTRIES = ["DeFi", "AI", "Gaming", "Social", "Infrastructure", "Other"];

const PROJECT_COLORS = ["#5B8CFF", "#7C3AED", "#00D4AA", "#F59E0B", "#EF4444", "#EC4899", "#06B6D4", "#8B5CF6"];

/* ═══════════════════════════════════════════════════════
   SAMPLE DATA
   ═══════════════════════════════════════════════════════ */

const initialProjects: Project[] = [
  {
    id: 1,
    name: "Nexus Protocol",
    description: "Decentralized lending protocol with AI-powered risk assessment. Targeting underbanked markets in Southeast Asia with micro-loan capabilities.",
    stage: "Build",
    progress: 62,
    industry: "DeFi",
    targetMarket: "Southeast Asia",
    agents: [
      { name: "Builder", role: "Lead Engineer", avatar: "B", color: "#5B8CFF" },
      { name: "Research", role: "Risk Analyst", avatar: "R", color: "#00D4AA" },
      { name: "Design", role: "UI/UX", avatar: "D", color: "#EC4899" },
    ],
    tasks: [
      { id: 1, label: "Smart contract audit", done: true },
      { id: 2, label: "Frontend dashboard v2", done: true },
      { id: 3, label: "Risk model integration", done: false },
      { id: 4, label: "Liquidity pool setup", done: false },
      { id: 5, label: "Security review", done: false },
    ],
    timeline: [
      { date: "2026-01-15", title: "Project Kickoff", description: "Initial team assembly and planning", type: "milestone" },
      { date: "2026-02-20", title: "Smart Contract v1", description: "Core lending contracts deployed to testnet", type: "milestone" },
      { date: "2026-04-10", title: "AI Risk Model", description: "First iteration of risk assessment engine", type: "task" },
      { date: "2026-06-01", title: "Beta Launch", description: "Public beta with limited markets", type: "milestone" },
    ],
    documents: [
      { name: "Nexus_Whitepaper_v3.pdf", type: "pdf", size: "2.4 MB", added: "2 days ago" },
      { name: "Technical_Specs.doc", type: "doc", size: "890 KB", added: "5 days ago" },
      { name: "Token_Model.xlsx", type: "sheet", size: "1.1 MB", added: "1 week ago" },
    ],
    lastUpdated: "2 hours ago",
    color: "#5B8CFF",
  },
  {
    id: 2,
    name: "Synthia AI",
    description: "Personalized AI companion for mental health and productivity. Uses adaptive NLP to provide contextual support and habit tracking.",
    stage: "Validate",
    progress: 35,
    industry: "AI",
    targetMarket: "Global (US-first)",
    agents: [
      { name: "CEO", role: "Product Lead", avatar: "C", color: "#7C3AED" },
      { name: "Research", role: "ML Engineer", avatar: "R", color: "#00D4AA" },
    ],
    tasks: [
      { id: 1, label: "User research interviews", done: true },
      { id: 2, label: "MVP prototype", done: true },
      { id: 3, label: "NLP model fine-tuning", done: false },
      { id: 4, label: "Beta user onboarding", done: false },
    ],
    timeline: [
      { date: "2026-03-01", title: "Idea Validation", description: "Market research and competitor analysis", type: "milestone" },
      { date: "2026-04-15", title: "Prototype Complete", description: "Working MVP with core features", type: "milestone" },
      { date: "2026-06-30", title: "Beta Program", description: "100-user closed beta", type: "milestone" },
    ],
    documents: [
      { name: "Market_Analysis.pdf", type: "pdf", size: "3.1 MB", added: "3 days ago" },
      { name: "User_Personas.doc", type: "doc", size: "450 KB", added: "1 week ago" },
    ],
    lastUpdated: "5 hours ago",
    color: "#7C3AED",
  },
  {
    id: 3,
    name: "MetaForge",
    description: "Web3 gaming platform with cross-chain asset interoperability. Play-to-earn mechanics with sustainable tokenomics.",
    stage: "Idea",
    progress: 12,
    industry: "Gaming",
    targetMarket: "Global Gaming Community",
    agents: [
      { name: "Founder", role: "Vision Lead", avatar: "F", color: "#F59E0B" },
    ],
    tasks: [
      { id: 1, label: "Game design document", done: true },
      { id: 2, label: "Tokenomics model", done: false },
      { id: 3, label: "Art style guide", done: false },
      { id: 4, label: "Chain selection analysis", done: false },
      { id: 5, label: "Community building plan", done: false },
    ],
    timeline: [
      { date: "2026-05-20", title: "Concept Finalized", description: "Core game loop and mechanics defined", type: "milestone" },
      { date: "2026-07-01", title: "Design Phase", description: "Art, sound, and narrative design", type: "task" },
    ],
    documents: [
      { name: "Game_Design_Doc.pdf", type: "pdf", size: "5.2 MB", added: "1 day ago" },
    ],
    lastUpdated: "1 day ago",
    color: "#F59E0B",
  },
  {
    id: 4,
    name: "Pulse Social",
    description: "Decentralized social media platform with creator-first monetization. No ads, no algorithms — just direct creator-audience connections.",
    stage: "Launch",
    progress: 88,
    industry: "Social",
    targetMarket: "Content Creators (US/EU)",
    agents: [
      { name: "Builder", role: "Full Stack", avatar: "B", color: "#5B8CFF" },
      { name: "Design", role: "UI/UX Lead", avatar: "D", color: "#EC4899" },
      { name: "CEO", role: "Strategy", avatar: "C", color: "#7C3AED" },
      { name: "Research", role: "Growth", avatar: "R", color: "#00D4AA" },
    ],
    tasks: [
      { id: 1, label: "Core platform build", done: true },
      { id: 2, label: "Creator onboarding flow", done: true },
      { id: 3, label: "Payment integration", done: true },
      { id: 4, label: "Mobile app v1", done: true },
      { id: 5, label: "Launch marketing campaign", done: false },
      { id: 6, label: "Press outreach", done: false },
    ],
    timeline: [
      { date: "2025-11-01", title: "Development Start", description: "Engineering team onboarded", type: "milestone" },
      { date: "2026-02-15", title: "Alpha Release", description: "Internal testing with 50 creators", type: "milestone" },
      { date: "2026-05-01", title: "Public Beta", description: "Open beta with 500 creators", type: "milestone" },
      { date: "2026-06-15", title: "Public Launch", description: "Full public release", type: "milestone" },
    ],
    documents: [
      { name: "Launch_Playbook.pdf", type: "pdf", size: "1.8 MB", added: "1 day ago" },
      { name: "Creator_Agreement.doc", type: "doc", size: "320 KB", added: "3 days ago" },
      { name: "Marketing_Budget.xlsx", type: "sheet", size: "670 KB", added: "1 week ago" },
      { name: "Press_Kit.zip", type: "link", size: "12 MB", added: "2 weeks ago" },
    ],
    lastUpdated: "30 minutes ago",
    color: "#00D4AA",
  },
];

/* ═══════════════════════════════════════════════════════
   ANIMATION VARIANTS
   ═══════════════════════════════════════════════════════ */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 10,
    transition: { duration: 0.25 },
  },
};

const slideOverVariants = {
  hidden: { x: "100%", opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
  exit: {
    x: "100%",
    opacity: 0,
    transition: { duration: 0.3 },
  },
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const pipelinePulse = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: (i: number) => ({
    scale: 1,
    opacity: 1,
    transition: { delay: i * 0.12, duration: 0.5, ease: "easeOut" as const },
  }),
};

/* ═══════════════════════════════════════════════════════
   SUB-COMPONENTS
   ═══════════════════════════════════════════════════════ */

function StageBadge({ stage }: { stage: Stage }) {
  const config = STAGE_CONFIG[stage];
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold tracking-wide uppercase"
      style={{ background: config.bg, color: config.color }}
    >
      {config.icon}
      {stage}
    </span>
  );
}

function ProgressBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="w-full h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1.2, ease: "easeOut" as const, delay: 0.3 }}
        className="h-full rounded-full"
        style={{
          background: `linear-gradient(90deg, ${color}88, ${color})`,
          boxShadow: `0 0 12px ${color}40`,
        }}
      />
    </div>
  );
}

/* ─── Project Card ─── */

function ProjectCard({
  project,
  index,
  onClick,
}: {
  project: Project;
  index: number;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={itemVariants}
      custom={index}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      className="relative group cursor-pointer rounded-2xl p-5 glass transition-all duration-300 hover:scale-[1.02] hover:border-white/10"
      style={{
        boxShadow: hovered ? `0 8px 40px ${project.color}10` : undefined,
      }}
    >
      {/* Shimmer overlay */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 rounded-2xl animate-shimmer pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Top row */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <motion.div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-transform duration-300 group-hover:scale-110"
            style={{ background: `${project.color}18`, color: project.color }}
          >
            {project.name.charAt(0)}
          </motion.div>
          <div>
            <h3 className="text-sm font-semibold text-white/85 group-hover:text-white/95 transition-colors">
              {project.name}
            </h3>
            <p className="text-[11px] text-white/30 mt-0.5 max-w-[200px] truncate">
              {project.description}
            </p>
          </div>
        </div>
        <StageBadge stage={project.stage} />
      </div>

      {/* Progress */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] font-mono text-white/30 uppercase tracking-wider">Progress</span>
          <span className="text-[10px] font-mono text-white/40">{project.progress}%</span>
        </div>
        <ProgressBar value={project.progress} color={project.color} />
      </div>

      {/* Bottom row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Agent avatars */}
          <div className="flex items-center gap-1">
            <Users size={12} className="text-white/25 mr-0.5" />
            <div className="flex -space-x-1.5">
              {project.agents.slice(0, 3).map((agent, i) => (
                <div
                  key={i}
                  className="w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold border border-[#050816]"
                  style={{ background: `${agent.color}30`, color: agent.color }}
                >
                  {agent.avatar}
                </div>
              ))}
              {project.agents.length > 3 && (
                <div className="w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold bg-white/[0.06] text-white/30 border border-[#050816]">
                  +{project.agents.length - 3}
                </div>
              )}
            </div>
          </div>
          <span className="text-[10px] text-white/20">•</span>
          <div className="flex items-center gap-1 text-[10px] text-white/25">
            <Clock size={10} />
            {project.lastUpdated}
          </div>
        </div>
        <ChevronRight
          size={14}
          className="text-white/15 group-hover:text-white/40 transition-all duration-300 group-hover:translate-x-0.5"
        />
      </div>

      {/* Hover action buttons */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute top-3 right-3 flex gap-1"
          >
            <button
              onClick={(e) => { e.stopPropagation(); }}
              className="w-7 h-7 rounded-lg bg-white/[0.06] border border-white/5 flex items-center justify-center text-white/30 hover:text-white/70 hover:bg-white/10 transition-all"
            >
              <Eye size={12} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); }}
              className="w-7 h-7 rounded-lg bg-white/[0.06] border border-white/5 flex items-center justify-center text-white/30 hover:text-white/70 hover:bg-white/10 transition-all"
            >
              <MoreHorizontal size={12} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── New Project Modal ─── */

function NewProjectModal({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (project: Omit<Project, "id" | "progress" | "agents" | "tasks" | "timeline" | "documents" | "lastUpdated" | "color">) => void;
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [industry, setIndustry] = useState("DeFi");
  const [targetMarket, setTargetMarket] = useState("");
  const [stage, setStage] = useState<Stage>("Idea");
  const [industryOpen, setIndustryOpen] = useState(false);

  const handleSubmit = () => {
    if (!name.trim()) return;
    onSubmit({ name, description, industry, targetMarket, stage });
    setName("");
    setDescription("");
    setIndustry("DeFi");
    setTargetMarket("");
    setStage("Idea");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg glass-strong rounded-2xl border border-white/10 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#5B8CFF] to-[#7C3AED] flex items-center justify-center">
                  <Plus size={16} className="text-white" />
                </div>
                <div>
                  <h2 className="font-[family-name:var(--font-space-grotesk)] text-base font-semibold text-white/90">
                    New Project
                  </h2>
                  <p className="text-[11px] text-white/30">Launch a new startup venture</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/5 flex items-center justify-center text-white/30 hover:text-white/60 hover:bg-white/[0.08] transition-all"
              >
                <X size={16} />
              </button>
            </div>

            {/* Form */}
            <div className="px-6 py-5 space-y-4">
              {/* Project Name */}
              <div>
                <label className="block text-[11px] font-medium text-white/40 uppercase tracking-wider mb-1.5">
                  Project Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Nexus Protocol"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/5 text-sm text-white/80 placeholder:text-white/15 outline-none focus:border-[#5B8CFF]/30 focus:bg-white/[0.06] transition-all"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-[11px] font-medium text-white/40 uppercase tracking-wider mb-1.5">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your project vision..."
                  rows={3}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/5 text-sm text-white/80 placeholder:text-white/15 outline-none focus:border-[#5B8CFF]/30 focus:bg-white/[0.06] transition-all resize-none"
                />
              </div>

              {/* Industry Dropdown */}
              <div className="relative">
                <label className="block text-[11px] font-medium text-white/40 uppercase tracking-wider mb-1.5">
                  Industry
                </label>
                <button
                  onClick={() => setIndustryOpen(!industryOpen)}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/5 text-sm text-white/70 hover:border-white/10 transition-all"
                >
                  <span>{industry}</span>
                  <ChevronDown size={14} className={`text-white/30 transition-transform duration-200 ${industryOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {industryOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="absolute left-0 right-0 top-full mt-1 z-10 glass-strong rounded-xl border border-white/10 overflow-hidden"
                    >
                      {INDUSTRIES.map((ind) => (
                        <button
                          key={ind}
                          onClick={() => { setIndustry(ind); setIndustryOpen(false); }}
                          className={`w-full text-left px-3.5 py-2 text-sm transition-colors ${
                            ind === industry
                              ? "text-[#5B8CFF] bg-[#5B8CFF]/10"
                              : "text-white/50 hover:text-white/80 hover:bg-white/[0.04]"
                          }`}
                        >
                          {ind}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Target Market */}
              <div>
                <label className="block text-[11px] font-medium text-white/40 uppercase tracking-wider mb-1.5">
                  Target Market
                </label>
                <input
                  type="text"
                  value={targetMarket}
                  onChange={(e) => setTargetMarket(e.target.value)}
                  placeholder="e.g. Southeast Asia, Global"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/5 text-sm text-white/80 placeholder:text-white/15 outline-none focus:border-[#5B8CFF]/30 focus:bg-white/[0.06] transition-all"
                />
              </div>

              {/* Initial Stage */}
              <div>
                <label className="block text-[11px] font-medium text-white/40 uppercase tracking-wider mb-1.5">
                  Initial Stage
                </label>
                <div className="flex gap-2">
                  {STAGES.map((s) => {
                    const config = STAGE_CONFIG[s];
                    const isSelected = stage === s;
                    return (
                      <button
                        key={s}
                        onClick={() => setStage(s)}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-[11px] font-medium transition-all duration-200 ${
                          isSelected
                            ? "border"
                            : "bg-white/[0.03] border border-transparent text-white/30 hover:bg-white/[0.06]"
                        }`}
                        style={
                          isSelected
                            ? { background: config.bg, color: config.color, borderColor: `${config.color}30` }
                            : undefined
                        }
                      >
                        {config.icon}
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-white/5">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-sm text-white/40 hover:text-white/60 hover:bg-white/[0.04] transition-all"
              >
                Cancel
              </button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
                className="px-5 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-[#5B8CFF] to-[#7C3AED] text-white hover:shadow-lg hover:shadow-[#5B8CFF]/20 transition-shadow"
              >
                Create Project
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Stage Pipeline Visualization ─── */

function StagePipeline({
  projects,
  activeStage,
  onStageClick,
}: {
  projects: Project[];
  activeStage: Stage | null;
  onStageClick: (stage: Stage | null) => void;
}) {
  const stageCounts = STAGES.reduce((acc, stage) => {
    acc[stage] = projects.filter((p) => p.stage === stage).length;
    return acc;
  }, {} as Record<Stage, number>);

  return (
    <motion.div
      variants={itemVariants}
      className="glass rounded-2xl p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-[family-name:var(--font-space-grotesk)] text-sm font-semibold text-white/70">
          Pipeline
        </h3>
        {activeStage && (
          <button
            onClick={() => onStageClick(null)}
            className="text-[10px] text-white/30 hover:text-white/50 transition-colors"
          >
            Clear filter
          </button>
        )}
      </div>

      <div className="flex items-center gap-1">
        {STAGES.map((stage, i) => {
          const config = STAGE_CONFIG[stage];
          const count = stageCounts[stage];
          const isActive = activeStage === stage;
          const isPast = activeStage ? STAGES.indexOf(stage) < STAGES.indexOf(activeStage) : false;

          return (
            <div key={stage} className="flex items-center flex-1">
              <motion.button
                variants={pipelinePulse}
                custom={i}
                initial="hidden"
                animate="visible"
                onClick={() => onStageClick(isActive ? null : stage)}
                className={`relative flex-1 flex flex-col items-center gap-2 py-3 px-2 rounded-xl transition-all duration-300 cursor-pointer group ${
                  isActive ? "scale-105" : "hover:bg-white/[0.03]"
                }`}
              >
                {/* Glow ring for active */}
                {isActive && (
                  <motion.div
                    layoutId="pipeline-active"
                    className="absolute inset-0 rounded-xl border-2"
                    style={{ borderColor: config.color }}
                    transition={{ type: "spring" as const, stiffness: 300, damping: 30 }}
                  />
                )}

                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  className="relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
                  style={{
                    background: isActive ? config.color : `${config.color}15`,
                    color: isActive ? "#050816" : config.color,
                    boxShadow: isActive ? `0 0 20px ${config.color}40` : undefined,
                  }}
                >
                  {config.icon}
                  {/* Pulse for active stage */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-xl"
                      style={{ border: `2px solid ${config.color}` }}
                      animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </motion.div>

                {/* Label & Count */}
                <div className="text-center">
                  <div
                    className="text-[10px] font-semibold transition-colors"
                    style={{ color: isActive ? config.color : "rgba(255,255,255,0.4)" }}
                  >
                    {stage}
                  </div>
                  <div className="text-[10px] font-mono text-white/20 mt-0.5">
                    {count} {count === 1 ? "project" : "projects"}
                  </div>
                </div>

                {/* Completed indicator */}
                {isPast && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#00D4AA] flex items-center justify-center"
                  >
                    <Check size={10} className="text-[#050816]" />
                  </motion.div>
                )}
              </motion.button>

              {/* Connector */}
              {i < STAGES.length - 1 && (
                <div className="flex-shrink-0 w-4 h-[2px] mx-0.5 relative">
                  <div className="absolute inset-0 bg-white/[0.06] rounded-full" />
                  {activeStage && i < STAGES.indexOf(activeStage) && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                      className="absolute inset-0 rounded-full origin-left"
                      style={{ background: STAGE_CONFIG[STAGES[i]].color }}
                    />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ─── Project Detail Slide-Over ─── */

function ProjectDetailSlideOver({
  project,
  isOpen,
  onClose,
  onToggleTask,
}: {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onToggleTask: (projectId: number, taskId: number) => void;
}) {
  const [activeTab, setActiveTab] = useState<"brief" | "agents" | "tasks" | "timeline" | "documents">("brief");

  if (!project) return null;

  const tabs = [
    { id: "brief" as const, label: "Brief", icon: <Briefcase size={14} /> },
    { id: "agents" as const, label: "Agents", icon: <Users size={14} />, count: project.agents.length },
    { id: "tasks" as const, label: "Tasks", icon: <CheckCircle2 size={14} />, count: project.tasks.filter((t) => t.done).length + "/" + project.tasks.length },
    { id: "timeline" as const, label: "Timeline", icon: <Calendar size={14} /> },
    { id: "documents" as const, label: "Docs", icon: <Paperclip size={14} />, count: project.documents.length },
  ];

  const completedTasks = project.tasks.filter((t) => t.done).length;
  const totalTasks = project.tasks.length;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-[90]"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          {/* Slide-over */}
          <motion.div
            variants={slideOverVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            className="absolute right-0 top-0 bottom-0 w-full max-w-xl glass-strong border-l border-white/10 overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 glass-strong border-b border-white/5">
              <div className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold"
                    style={{ background: `${project.color}18`, color: project.color }}
                  >
                    {project.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="font-[family-name:var(--font-space-grotesk)] text-base font-semibold text-white/90">
                      {project.name}
                    </h2>
                    <div className="flex items-center gap-2 mt-0.5">
                      <StageBadge stage={project.stage} />
                      <span className="text-[10px] text-white/20">•</span>
                      <span className="text-[10px] text-white/25">{project.industry}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/5 flex items-center justify-center text-white/30 hover:text-white/60 hover:bg-white/[0.08] transition-all">
                    <Edit3 size={14} />
                  </button>
                  <button className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/5 flex items-center justify-center text-white/30 hover:text-white/60 hover:bg-white/[0.08] transition-all">
                    <Copy size={14} />
                  </button>
                  <button
                    onClick={onClose}
                    className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/5 flex items-center justify-center text-white/30 hover:text-white/60 hover:bg-white/[0.08] transition-all"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>

              {/* Progress bar */}
              <div className="px-6 pb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono text-white/30">Overall Progress</span>
                  <span className="text-[10px] font-mono" style={{ color: project.color }}>{project.progress}%</span>
                </div>
                <ProgressBar value={project.progress} color={project.color} />
              </div>

              {/* Tabs */}
              <div className="flex px-6 gap-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex items-center gap-1.5 px-3 py-2 text-[11px] font-medium rounded-t-lg transition-all ${
                      activeTab === tab.id
                        ? "text-white/80 bg-white/[0.04]"
                        : "text-white/30 hover:text-white/50"
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                    {tab.count !== undefined && (
                      <span className="text-[9px] font-mono text-white/20">{tab.count}</span>
                    )}
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="detail-tab"
                        className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full"
                        style={{ background: project.color }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="px-6 py-5">
              <AnimatePresence mode="wait">
                {/* Brief Tab */}
                {activeTab === "brief" && (
                  <motion.div
                    key="brief"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-5"
                  >
                    <div>
                      <h4 className="text-[10px] font-semibold text-white/30 uppercase tracking-wider mb-2">Description</h4>
                      <p className="text-sm text-white/60 leading-relaxed">{project.description}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                        <div className="text-[10px] text-white/25 uppercase tracking-wider mb-1">Industry</div>
                        <div className="text-sm text-white/70 font-medium">{project.industry}</div>
                      </div>
                      <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                        <div className="text-[10px] text-white/25 uppercase tracking-wider mb-1">Target Market</div>
                        <div className="text-sm text-white/70 font-medium">{project.targetMarket || "—"}</div>
                      </div>
                      <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                        <div className="text-[10px] text-white/25 uppercase tracking-wider mb-1">Stage</div>
                        <div className="text-sm font-medium" style={{ color: STAGE_CONFIG[project.stage].color }}>
                          {project.stage}
                        </div>
                      </div>
                      <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                        <div className="text-[10px] text-white/25 uppercase tracking-wider mb-1">Last Updated</div>
                        <div className="text-sm text-white/70 font-medium">{project.lastUpdated}</div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Agents Tab */}
                {activeTab === "agents" && (
                  <motion.div
                    key="agents"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-2"
                  >
                    {project.agents.map((agent, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] transition-colors group"
                      >
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold"
                          style={{ background: `${agent.color}18`, color: agent.color }}
                        >
                          {agent.avatar}
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-white/80">{agent.name}</div>
                          <div className="text-[11px] text-white/30">{agent.role}</div>
                        </div>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/5 flex items-center justify-center text-white/25 hover:text-white/60 transition-colors">
                            <Eye size={12} />
                          </button>
                          <button className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/5 flex items-center justify-center text-white/25 hover:text-white/60 transition-colors">
                            <MoreHorizontal size={12} />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                    {/* Add agent button */}
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="w-full flex items-center justify-center gap-2 p-3 rounded-xl border border-dashed border-white/10 text-white/25 hover:text-white/40 hover:border-white/20 transition-all"
                    >
                      <Plus size={14} />
                      <span className="text-xs">Assign Agent</span>
                    </motion.button>
                  </motion.div>
                )}

                {/* Tasks Tab */}
                {activeTab === "tasks" && (
                  <motion.div
                    key="tasks"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-1"
                  >
                    {/* Progress summary */}
                    <div className="flex items-center justify-between mb-4 p-3 rounded-xl bg-white/[0.03] border border-white/5">
                      <span className="text-xs text-white/40">Task Completion</span>
                      <span className="text-xs font-mono" style={{ color: project.color }}>
                        {completedTasks}/{totalTasks}
                      </span>
                    </div>

                    {project.tasks.map((task, i) => (
                      <motion.div
                        key={task.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        onClick={() => onToggleTask(project.id, task.id)}
                        className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 group ${
                          task.done
                            ? "bg-white/[0.02] hover:bg-white/[0.04]"
                            : "bg-white/[0.03] hover:bg-white/[0.06]"
                        }`}
                      >
                        <motion.div
                          whileTap={{ scale: 0.8 }}
                          className="flex-shrink-0"
                        >
                          {task.done ? (
                            <CheckCircle2 size={18} className="text-[#00D4AA]" />
                          ) : (
                            <Circle size={18} className="text-white/15 group-hover:text-white/30 transition-colors" />
                          )}
                        </motion.div>
                        <span
                          className={`text-sm transition-all ${
                            task.done ? "text-white/30 line-through" : "text-white/70"
                          }`}
                        >
                          {task.label}
                        </span>
                      </motion.div>
                    ))}

                    {/* Add task button */}
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="w-full flex items-center justify-center gap-2 p-3 rounded-xl border border-dashed border-white/10 text-white/25 hover:text-white/40 hover:border-white/20 transition-all mt-2"
                    >
                      <Plus size={14} />
                      <span className="text-xs">Add Task</span>
                    </motion.button>
                  </motion.div>
                )}

                {/* Timeline Tab */}
                {activeTab === "timeline" && (
                  <motion.div
                    key="timeline"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-0"
                  >
                    {project.timeline.map((event, i) => {
                      const isLast = i === project.timeline.length - 1;
                      const typeColors = {
                        milestone: "#5B8CFF",
                        task: "#00D4AA",
                        document: "#F59E0B",
                      };
                      const typeIcons = {
                        milestone: <CircleDot size={14} />,
                        task: <CheckCircle2 size={14} />,
                        document: <FileText size={14} />,
                      };
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.08 }}
                          className="flex gap-3"
                        >
                          {/* Timeline line */}
                          <div className="flex flex-col items-center">
                            <div
                              className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                              style={{ background: `${typeColors[event.type]}15`, color: typeColors[event.type] }}
                            >
                              {typeIcons[event.type]}
                            </div>
                            {!isLast && (
                              <div className="w-[2px] flex-1 min-h-[24px] bg-white/[0.06] my-1" />
                            )}
                          </div>

                          {/* Content */}
                          <div className={`pb-5 ${isLast ? "pb-0" : ""}`}>
                            <div className="text-sm text-white/75 font-medium">{event.title}</div>
                            <div className="text-[11px] text-white/30 mt-0.5">{event.description}</div>
                            <div className="text-[10px] font-mono text-white/20 mt-1">{event.date}</div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                )}

                {/* Documents Tab */}
                {activeTab === "documents" && (
                  <motion.div
                    key="documents"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-2"
                  >
                    {project.documents.map((doc, i) => {
                      const typeColors: Record<string, string> = {
                        pdf: "#EF4444",
                        doc: "#5B8CFF",
                        sheet: "#00D4AA",
                        link: "#7C3AED",
                      };
                      const typeIcons: Record<string, React.ReactNode> = {
                        pdf: <FileText size={16} />,
                        doc: <FileText size={16} />,
                        sheet: <FileText size={16} />,
                        link: <Paperclip size={16} />,
                      };
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.06 }}
                          className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] transition-colors group cursor-pointer"
                        >
                          <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{ background: `${typeColors[doc.type]}15`, color: typeColors[doc.type] }}
                          >
                            {typeIcons[doc.type]}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm text-white/70 truncate">{doc.name}</div>
                            <div className="text-[10px] text-white/25">{doc.size} • {doc.added}</div>
                          </div>
                          <ArrowUpRight
                            size={14}
                            className="text-white/15 group-hover:text-white/40 transition-colors flex-shrink-0"
                          />
                        </motion.div>
                      );
                    })}

                    {/* Upload button */}
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="w-full flex items-center justify-center gap-2 p-3 rounded-xl border border-dashed border-white/10 text-white/25 hover:text-white/40 hover:border-white/20 transition-all"
                    >
                      <Plus size={14} />
                      <span className="text-xs">Upload Document</span>
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════════════════ */

export default function StudioPage() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [slideOverOpen, setSlideOverOpen] = useState(false);
  const [activeStage, setActiveStage] = useState<Stage | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = projects.filter((p) => {
    const matchesStage = !activeStage || p.stage === activeStage;
    const matchesSearch =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.industry.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStage && matchesSearch;
  });

  const handleCreateProject = useCallback(
    (data: Omit<Project, "id" | "progress" | "agents" | "tasks" | "timeline" | "documents" | "lastUpdated" | "color">) => {
      const newProject: Project = {
        ...data,
        id: Date.now(),
        progress: 0,
        agents: [],
        tasks: [],
        timeline: [
          {
            date: new Date().toISOString().split("T")[0],
            title: "Project Created",
            description: `${data.name} initialized in ${data.stage} stage`,
            type: "milestone" as const,
          },
        ],
        documents: [],
        lastUpdated: "Just now",
        color: PROJECT_COLORS[projects.length % PROJECT_COLORS.length],
      };
      setProjects((prev) => [newProject, ...prev]);
    },
    [projects.length]
  );

  const handleToggleTask = useCallback((projectId: number, taskId: number) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== projectId) return p;
        const updatedTasks = p.tasks.map((t) =>
          t.id === taskId ? { ...t, done: !t.done } : t
        );
        const completedCount = updatedTasks.filter((t) => t.done).length;
        const newProgress = Math.round((completedCount / updatedTasks.length) * 100);
        const updatedProject = { ...p, tasks: updatedTasks, progress: newProgress };
        // Also update selectedProject if it's the same
        setSelectedProject((sel) => (sel?.id === projectId ? updatedProject : sel));
        return updatedProject;
      })
    );
  }, []);

  const handleStageClick = useCallback((stage: Stage | null) => {
    setActiveStage(stage);
  }, []);

  const handleProjectClick = useCallback((project: Project) => {
    setSelectedProject(project);
    setSlideOverOpen(true);
  }, []);

  return (
    <DashboardLayout activePage="studio">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* ═══ Header ═══ */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#5B8CFF] to-[#7C3AED] flex items-center justify-center">
                <Rocket size={20} className="text-white" />
              </div>
              <div>
                <h1 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold tracking-tight text-white/90">
                  Startup Studio
                </h1>
                <p className="text-xs text-white/30">
                  {projects.length} active {projects.length === 1 ? "venture" : "ventures"} in pipeline
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/5">
              <Search size={14} className="text-white/25" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects..."
                className="bg-transparent text-sm text-white/70 placeholder:text-white/15 outline-none w-40"
              />
            </div>

            {/* Filter indicator */}
            {activeStage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 px-3 py-2 rounded-xl border"
                style={{
                  background: `${STAGE_CONFIG[activeStage].color}10`,
                  borderColor: `${STAGE_CONFIG[activeStage].color}25`,
                }}
              >
                <span className="text-xs font-medium" style={{ color: STAGE_CONFIG[activeStage].color }}>
                  {activeStage}
                </span>
                <button onClick={() => setActiveStage(null)} className="text-white/30 hover:text-white/60">
                  <X size={12} />
                </button>
              </motion.div>
            )}

            {/* New Project Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#5B8CFF] to-[#7C3AED] text-white text-sm font-semibold hover:shadow-lg hover:shadow-[#5B8CFF]/20 transition-shadow"
            >
              <Plus size={16} />
              New Project
            </motion.button>
          </div>
        </motion.div>

        {/* ═══ Stage Pipeline ═══ */}
        <StagePipeline
          projects={projects}
          activeStage={activeStage}
          onStageClick={handleStageClick}
        />

        {/* ═══ Active Projects Grid ═══ */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-sm font-semibold text-white/50">
              {activeStage ? `${activeStage} Stage` : "All Projects"}
              <span className="ml-2 text-white/20 font-normal">({filteredProjects.length})</span>
            </h2>
          </div>

          {filteredProjects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 glass rounded-2xl"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center mb-4">
                <Rocket size={24} className="text-white/15" />
              </div>
              <h3 className="text-sm font-medium text-white/40 mb-1">No projects found</h3>
              <p className="text-xs text-white/20 mb-4">
                {searchQuery || activeStage
                  ? "Try adjusting your filters"
                  : "Create your first project to get started"}
              </p>
              {!searchQuery && !activeStage && (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#5B8CFF] to-[#7C3AED] text-white text-sm font-semibold"
                >
                  <Plus size={14} />
                  New Project
                </motion.button>
              )}
            </motion.div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
            >
              <AnimatePresence>
                {filteredProjects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                    onClick={() => handleProjectClick(project)}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* ═══ Modals ═══ */}
      <NewProjectModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleCreateProject}
      />

      <ProjectDetailSlideOver
        project={selectedProject}
        isOpen={slideOverOpen}
        onClose={() => { setSlideOverOpen(false); }}
        onToggleTask={handleToggleTask}
      />
    </DashboardLayout>
  );
}
