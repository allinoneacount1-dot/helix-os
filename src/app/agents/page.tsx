"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Bot,
  Cpu,
  MemoryStick,
  Settings,
  Play,
  Square,
  Trash2,
  X,
  ChevronRight,
  Activity,
  Clock,
  Zap,
  Search,
  Filter,
  MoreHorizontal,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Terminal,
  Gauge,
  TrendingUp,
  MessageSquare,
  Code2,
  Palette,
  BarChart3,
  FlaskConical,
  Rocket,
  Crown,
} from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/Layout";

/* ═══════════════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════════════ */

type AgentType = "CEO" | "Founder" | "Research" | "Builder" | "Design" | "Trading";
type AgentStatus = "active" | "idle" | "processing";

interface Agent {
  id: string;
  name: string;
  type: AgentType;
  status: AgentStatus;
  cpu: number;
  memory: number;
  lastAction: string;
  uptime: string;
  model: string;
  temperature: number;
  systemPrompt: string;
  tools: string[];
  activityLog: ActivityEntry[];
  metrics: AgentMetrics;
}

interface ActivityEntry {
  timestamp: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
}

interface AgentMetrics {
  tasksCompleted: number;
  avgResponseTime: string;
  successRate: number;
  tokensUsed: string;
}

/* ═══════════════════════════════════════════════════════════════
   CONSTANTS
   ═══════════════════════════════════════════════════════════════ */

const AGENT_TYPES: AgentType[] = ["CEO", "Founder", "Research", "Builder", "Design", "Trading"];

const MODELS = [
  "claude-sonnet-4-20250514",
  "claude-opus-4-20250514",
  "gpt-4o",
  "gpt-4o-mini",
  "gemini-2.5-pro",
  "gemini-2.5-flash",
  "llama-4-maverick",
  "deepseek-v3",
];

const AVAILABLE_TOOLS = [
  { id: "web_search", label: "Web Search", icon: <Search size={14} /> },
  { id: "code_interpreter", label: "Code Interpreter", icon: <Code2 size={14} /> },
  { id: "file_system", label: "File System", icon: <Terminal size={14} /> },
  { id: "browser", label: "Browser", icon: <Activity size={14} /> },
  { id: "image_gen", label: "Image Generation", icon: <Palette size={14} /> },
  { id: "data_analysis", label: "Data Analysis", icon: <BarChart3 size={14} /> },
  { id: "memory", label: "Long-term Memory", icon: <MemoryStick size={14} /> },
  { id: "api_calls", label: "API Calls", icon: <Zap size={14} /> },
];

const TYPE_CONFIG: Record<AgentType, { color: string; bg: string; border: string; icon: React.ReactNode }> = {
  CEO: { color: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/20", icon: <Crown size={14} /> },
  Founder: { color: "text-[#5B8CFF]", bg: "bg-[#5B8CFF]/10", border: "border-[#5B8CFF]/20", icon: <Rocket size={14} /> },
  Research: { color: "text-[#7C3AED]", bg: "bg-[#7C3AED]/10", border: "border-[#7C3AED]/20", icon: <FlaskConical size={14} /> },
  Builder: { color: "text-[#00D4AA]", bg: "bg-[#00D4AA]/10", border: "border-[#00D4AA]/20", icon: <Code2 size={14} /> },
  Design: { color: "text-pink-400", bg: "bg-pink-400/10", border: "border-pink-400/20", icon: <Palette size={14} /> },
  Trading: { color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/20", icon: <BarChart3 size={14} /> },
};

const STATUS_CONFIG: Record<AgentStatus, { color: string; bg: string; label: string; icon: React.ReactNode }> = {
  active: { color: "text-emerald-400", bg: "bg-emerald-400", label: "Active", icon: <CheckCircle2 size={12} /> },
  idle: { color: "text-white/30", bg: "bg-white/30", label: "Idle", icon: <AlertCircle size={12} /> },
  processing: { color: "text-[#5B8CFF]", bg: "bg-[#5B8CFF]", label: "Processing", icon: <Loader2 size={12} className="animate-spin" /> },
};

const INITIAL_AGENTS: Agent[] = [
  {
    id: "agent-1",
    name: "Atlas",
    type: "CEO",
    status: "active",
    cpu: 34,
    memory: 62,
    lastAction: "Reviewed Q3 strategic roadmap",
    uptime: "14d 6h 23m",
    model: "claude-opus-4-20250514",
    temperature: 0.7,
    systemPrompt: "You are Atlas, the CEO agent of HELIX OS. You coordinate all other agents, make high-level strategic decisions, and ensure alignment with business objectives. You think in systems, prioritize ruthlessly, and communicate with clarity.",
    tools: ["web_search", "memory", "api_calls", "data_analysis"],
    activityLog: [
      { timestamp: "2 min ago", message: "Delegated market analysis to Hermes", type: "info" },
      { timestamp: "15 min ago", message: "Completed strategic review cycle", type: "success" },
      { timestamp: "1h ago", message: "Resource allocation optimized", type: "info" },
      { timestamp: "3h ago", message: "Agent coordination protocol updated", type: "warning" },
    ],
    metrics: { tasksCompleted: 847, avgResponseTime: "1.2s", successRate: 98.4, tokensUsed: "2.4M" },
  },
  {
    id: "agent-2",
    name: "Hermes",
    type: "Research",
    status: "processing",
    cpu: 78,
    memory: 85,
    lastAction: "Analyzing competitor landscape",
    uptime: "21d 2h 11m",
    model: "claude-sonnet-4-20250514",
    temperature: 0.3,
    systemPrompt: "You are Hermes, the research agent. You conduct deep market research, competitive analysis, and synthesize complex information into actionable insights. You are thorough, analytical, and cite your sources.",
    tools: ["web_search", "browser", "data_analysis", "memory", "file_system"],
    activityLog: [
      { timestamp: "Just now", message: "Processing competitor data batch #47", type: "info" },
      { timestamp: "8 min ago", message: "Research report generated: Market Trends Q3", type: "success" },
      { timestamp: "32 min ago", message: "Data source API rate limit warning", type: "warning" },
      { timestamp: "2h ago", message: "Knowledge base updated with 12 new entries", type: "success" },
    ],
    metrics: { tasksCompleted: 2341, avgResponseTime: "2.8s", successRate: 96.7, tokensUsed: "8.1M" },
  },
  {
    id: "agent-3",
    name: "Daedalus",
    type: "Builder",
    status: "active",
    cpu: 56,
    memory: 71,
    lastAction: "Deployed v2.4.1 to production",
    uptime: "30d 14h 45m",
    model: "gpt-4o",
    temperature: 0.2,
    systemPrompt: "You are Daedalus, the builder agent. You write, review, and deploy code. You follow best practices, write tests, and ensure code quality. You think about architecture, scalability, and maintainability.",
    tools: ["code_interpreter", "file_system", "api_calls", "memory"],
    activityLog: [
      { timestamp: "5 min ago", message: "CI/CD pipeline passed — all 847 tests green", type: "success" },
      { timestamp: "22 min ago", message: "Refactored auth module", type: "info" },
      { timestamp: "1h ago", message: "Dependency vulnerability detected in lodash", type: "error" },
      { timestamp: "4h ago", message: "Feature branch merged: agent-dashboard-v2", type: "success" },
    ],
    metrics: { tasksCompleted: 4521, avgResponseTime: "0.8s", successRate: 99.1, tokensUsed: "12.7M" },
  },
  {
    id: "agent-4",
    name: "Athena",
    type: "Design",
    status: "idle",
    cpu: 12,
    memory: 28,
    lastAction: "Generated dashboard mockups",
    uptime: "7d 3h 18m",
    model: "gemini-2.5-pro",
    temperature: 0.9,
    systemPrompt: "You are Athena, the design agent. You create beautiful, functional designs with attention to detail. You understand UX principles, accessibility, and create designs that delight users.",
    tools: ["image_gen", "browser", "file_system", "memory"],
    activityLog: [
      { timestamp: "2h ago", message: "Design system tokens updated", type: "info" },
      { timestamp: "5h ago", message: "Mobile responsive layouts generated", type: "success" },
      { timestamp: "8h ago", message: "Accessibility audit completed — 3 issues found", type: "warning" },
      { timestamp: "12h ago", message: "Component library exported to Figma", type: "success" },
    ],
    metrics: { tasksCompleted: 634, avgResponseTime: "3.4s", successRate: 94.2, tokensUsed: "1.8M" },
  },
  {
    id: "agent-5",
    name: "Midas",
    type: "Trading",
    status: "active",
    cpu: 45,
    memory: 53,
    lastAction: "Executed rebalancing strategy",
    uptime: "45d 12h 33m",
    model: "deepseek-v3",
    temperature: 0.4,
    systemPrompt: "You are Midas, the trading agent. You analyze market data, execute trading strategies, and manage portfolio risk. You are data-driven, disciplined, and always consider risk/reward ratios.",
    tools: ["data_analysis", "api_calls", "web_search", "memory"],
    activityLog: [
      { timestamp: "1 min ago", message: "Portfolio rebalanced: +2.3% expected yield", type: "success" },
      { timestamp: "18 min ago", message: "Market volatility alert: VIX spike detected", type: "warning" },
      { timestamp: "1h ago", message: "Backtesting completed for strategy #12", type: "info" },
      { timestamp: "6h ago", message: "Daily P&L report generated: +$1,247", type: "success" },
    ],
    metrics: { tasksCompleted: 12847, avgResponseTime: "0.3s", successRate: 97.8, tokensUsed: "5.2M" },
  },
  {
    id: "agent-6",
    name: "Prometheus",
    type: "Founder",
    status: "idle",
    cpu: 8,
    memory: 15,
    lastAction: "Scouted 3 startup opportunities",
    uptime: "3d 8h 52m",
    model: "llama-4-maverick",
    temperature: 0.8,
    systemPrompt: "You are Prometheus, the founder agent. You identify opportunities, validate ideas, and build business cases. You think creatively, move fast, and are not afraid to challenge assumptions.",
    tools: ["web_search", "browser", "data_analysis", "memory", "api_calls"],
    activityLog: [
      { timestamp: "4h ago", message: "Opportunity analysis: AI-powered legal tech", type: "info" },
      { timestamp: "8h ago", message: "Market sizing completed for 3 verticals", type: "success" },
      { timestamp: "16h ago", message: "Competitive moat analysis — weak differentiation detected", type: "warning" },
      { timestamp: "1d ago", message: "Pitch deck outline generated for Project Nova", type: "success" },
    ],
    metrics: { tasksCompleted: 189, avgResponseTime: "1.8s", successRate: 91.3, tokensUsed: "890K" },
  },
];

/* ═══════════════════════════════════════════════════════════════
   ANIMATION VARIANTS
   ═══════════════════════════════════════════════════════════════ */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 400, damping: 28 },
  },
};

const slideOverVariants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 32 },
  },
  exit: { x: "100%", transition: { duration: 0.25 } },
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

/* ═══════════════════════════════════════════════════════════════
   SUB-COMPONENTS
   ═══════════════════════════════════════════════════════════════ */

function StatusDot({ status }: { status: AgentStatus }) {
  const config = STATUS_CONFIG[status];
  return (
    <span className="relative flex h-2.5 w-2.5">
      {status === "active" && (
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />
      )}
      {status === "processing" && (
        <span className="absolute inline-flex h-full w-full animate-pulse rounded-full bg-[#5B8CFF] opacity-40" />
      )}
      <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${config.bg}`} />
    </span>
  );
}

function ResourceBar({ value, label, color }: { value: number; label: string; color: string }) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-[11px]">
        <span className="text-white/30 font-mono">{label}</span>
        <span className="text-white/50 font-mono">{value}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        />
      </div>
    </div>
  );
}

function AgentCard({ agent, onConfigure }: { agent: Agent; onConfigure: (agent: Agent) => void }) {
  const typeConf = TYPE_CONFIG[agent.type];
  const statusConf = STATUS_CONFIG[agent.status];

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group relative rounded-2xl glass border border-white/[0.06] p-5 hover:border-white/[0.12] transition-all duration-300 hover:shadow-[0_0_40px_rgba(91,140,255,0.06)]"
    >
      {/* Glow accent on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-[#5B8CFF]/[0.03] to-transparent" />

      {/* Header */}
      <div className="relative flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl ${typeConf.bg} ${typeConf.border} border flex items-center justify-center ${typeConf.color}`}>
            <Bot size={18} />
          </div>
          <div>
            <h3 className="font-semibold text-sm text-white/90">{agent.name}</h3>
            <div className="flex items-center gap-2 mt-0.5">
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium ${typeConf.color} ${typeConf.bg} border ${typeConf.border}`}>
                {typeConf.icon}
                {agent.type}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <StatusDot status={agent.status} />
          <span className={`text-[11px] font-medium ${statusConf.color}`}>{statusConf.label}</span>
        </div>
      </div>

      {/* Resource bars */}
      <div className="space-y-2.5 mb-4">
        <ResourceBar value={agent.cpu} label="CPU" color="bg-gradient-to-r from-[#5B8CFF] to-[#7C3AED]" />
        <ResourceBar value={agent.memory} label="MEM" color="bg-gradient-to-r from-[#00D4AA] to-[#5B8CFF]" />
      </div>

      {/* Info */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-[11px]">
          <Activity size={11} className="text-white/20" />
          <span className="text-white/30 truncate">{agent.lastAction}</span>
        </div>
        <div className="flex items-center gap-2 text-[11px]">
          <Clock size={11} className="text-white/20" />
          <span className="text-white/30 font-mono">{agent.uptime}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onConfigure(agent)}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-white/50 bg-white/[0.03] border border-white/[0.06] hover:text-white/80 hover:bg-white/[0.06] hover:border-white/[0.1] transition-all duration-200"
        >
          <Settings size={13} />
          Configure
        </button>
        <button className="w-9 h-9 rounded-xl flex items-center justify-center text-white/20 bg-white/[0.02] border border-white/[0.04] hover:text-white/50 hover:bg-white/[0.04] transition-all duration-200">
          <MoreHorizontal size={14} />
        </button>
      </div>
    </motion.div>
  );
}

function CreateAgentModal({ isOpen, onClose, onCreate }: { isOpen: boolean; onClose: () => void; onCreate: (agent: Agent) => void }) {
  const [name, setName] = useState("");
  const [type, setType] = useState<AgentType>("Research");
  const [model, setModel] = useState(MODELS[0]);
  const [temperature, setTemperature] = useState(0.7);
  const [systemPrompt, setSystemPrompt] = useState("");
  const [selectedTools, setSelectedTools] = useState<string[]>(["web_search", "memory"]);

  const toggleTool = (toolId: string) => {
    setSelectedTools((prev) =>
      prev.includes(toolId) ? prev.filter((t) => t !== toolId) : [...prev, toolId]
    );
  };

  const handleCreate = () => {
    if (!name.trim()) return;
    const newAgent: Agent = {
      id: `agent-${Date.now()}`,
      name: name.trim(),
      type,
      status: "idle",
      cpu: 0,
      memory: 0,
      lastAction: "Agent created",
      uptime: "0d 0h 0m",
      model,
      temperature,
      systemPrompt: systemPrompt || `You are ${name}, a ${type} agent.`,
      tools: selectedTools,
      activityLog: [
        { timestamp: "Just now", message: "Agent created and initialized", type: "success" },
      ],
      metrics: { tasksCompleted: 0, avgResponseTime: "0s", successRate: 0, tokensUsed: "0" },
    };
    onCreate(newAgent);
    setName("");
    setType("Research");
    setModel(MODELS[0]);
    setTemperature(0.7);
    setSystemPrompt("");
    setSelectedTools(["web_search", "memory"]);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-strong rounded-2xl border border-white/10 pointer-events-auto shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
                <div>
                  <h2 className="text-lg font-semibold text-white/90">Create New Agent</h2>
                  <p className="text-xs text-white/30 mt-0.5">Configure a new AI agent for your workspace</p>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white/30 hover:text-white/60 hover:bg-white/[0.04] transition-all"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Form */}
              <div className="px-6 py-5 space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-xs font-medium text-white/50 mb-2">Agent Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., Atlas, Hermes, Daedalus..."
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white/80 placeholder:text-white/15 outline-none focus:border-[#5B8CFF]/40 focus:bg-white/[0.05] transition-all"
                  />
                </div>

                {/* Type + Model row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-white/50 mb-2">Agent Type</label>
                    <div className="relative">
                      <select
                        value={type}
                        onChange={(e) => setType(e.target.value as AgentType)}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white/80 outline-none focus:border-[#5B8CFF]/40 appearance-none cursor-pointer transition-all"
                      >
                        {AGENT_TYPES.map((t) => (
                          <option key={t} value={t} className="bg-[#0B1120]">{t}</option>
                        ))}
                      </select>
                      <ChevronRight size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/20 rotate-90 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-white/50 mb-2">Model</label>
                    <div className="relative">
                      <select
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white/80 outline-none focus:border-[#5B8CFF]/40 appearance-none cursor-pointer transition-all"
                      >
                        {MODELS.map((m) => (
                          <option key={m} value={m} className="bg-[#0B1120]">{m}</option>
                        ))}
                      </select>
                      <ChevronRight size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/20 rotate-90 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Temperature */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-medium text-white/50">Temperature</label>
                    <span className="text-xs font-mono text-[#5B8CFF]">{temperature.toFixed(1)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="2"
                    step="0.1"
                    value={temperature}
                    onChange={(e) => setTemperature(parseFloat(e.target.value))}
                    className="w-full h-1.5 rounded-full appearance-none bg-white/[0.06] cursor-pointer accent-[#5B8CFF] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#5B8CFF] [&::-webkit-slider-thumb]:shadow-[0_0_12px_rgba(91,140,255,0.4)] [&::-webkit-slider-thumb]:cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-white/15 mt-1">
                    <span>Precise</span>
                    <span>Balanced</span>
                    <span>Creative</span>
                  </div>
                </div>

                {/* System Prompt */}
                <div>
                  <label className="block text-xs font-medium text-white/50 mb-2">System Prompt</label>
                  <textarea
                    value={systemPrompt}
                    onChange={(e) => setSystemPrompt(e.target.value)}
                    placeholder="Define the agent's personality, role, and capabilities..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-white/80 placeholder:text-white/15 outline-none focus:border-[#5B8CFF]/40 focus:bg-white/[0.05] transition-all resize-none font-mono"
                  />
                </div>

                {/* Tools */}
                <div>
                  <label className="block text-xs font-medium text-white/50 mb-3">Tools & Capabilities</label>
                  <div className="grid grid-cols-2 gap-2">
                    {AVAILABLE_TOOLS.map((tool) => {
                      const isSelected = selectedTools.includes(tool.id);
                      return (
                        <button
                          key={tool.id}
                          onClick={() => toggleTool(tool.id)}
                          className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium border transition-all duration-200 ${
                            isSelected
                              ? "bg-[#5B8CFF]/10 border-[#5B8CFF]/25 text-[#5B8CFF]"
                              : "bg-white/[0.02] border-white/[0.05] text-white/30 hover:text-white/50 hover:border-white/[0.08]"
                          }`}
                        >
                          <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                            isSelected
                              ? "bg-[#5B8CFF]/20 border-[#5B8CFF]/30"
                              : "bg-white/[0.02] border-white/[0.06]"
                          }`}>
                            {isSelected ? <CheckCircle2 size={12} className="text-[#5B8CFF]" /> : tool.icon}
                          </div>
                          {tool.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-white/[0.06]">
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-white/40 hover:text-white/60 hover:bg-white/[0.04] transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreate}
                  disabled={!name.trim()}
                  className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-medium bg-gradient-to-r from-[#5B8CFF] to-[#7C3AED] text-white hover:shadow-[0_0_24px_rgba(91,140,255,0.3)] transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:shadow-none"
                >
                  <Plus size={14} />
                  Create Agent
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function AgentDetailPanel({ agent, onClose, onUpdate }: { agent: Agent; onClose: () => void; onUpdate: (agent: Agent) => void }) {
  const typeConf = TYPE_CONFIG[agent.type];
  const statusConf = STATUS_CONFIG[agent.status];

  const handleToggleStatus = () => {
    const newStatus: AgentStatus = agent.status === "active" ? "idle" : "active";
    onUpdate({ ...agent, status: newStatus });
  };

  const handleDelete = () => {
    onUpdate({ ...agent, id: `__deleted__${agent.id}` });
    onClose();
  };

  return (
    <AnimatePresence>
      <>
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />
        <motion.div
          variants={slideOverVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed top-0 right-0 z-[70] h-full w-full max-w-lg glass-strong border-l border-white/10 overflow-y-auto shadow-2xl"
        >
          {/* Header */}
          <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-white/[0.06] bg-[#050816]/80 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl ${typeConf.bg} ${typeConf.border} border flex items-center justify-center ${typeConf.color}`}>
                <Bot size={18} />
              </div>
              <div>
                <h2 className="font-semibold text-white/90">{agent.name}</h2>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium ${typeConf.color} ${typeConf.bg} border ${typeConf.border}`}>
                    {typeConf.icon}
                    {agent.type}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <StatusDot status={agent.status} />
                    <span className={`text-[11px] font-medium ${statusConf.color}`}>{statusConf.label}</span>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white/30 hover:text-white/60 hover:bg-white/[0.04] transition-all"
            >
              <X size={16} />
            </button>
          </div>

          <div className="px-6 py-5 space-y-6">
            {/* Quick Actions */}
            <div>
              <h3 className="text-xs font-medium text-white/40 uppercase tracking-wider mb-3">Actions</h3>
              <div className="flex gap-2">
                <button
                  onClick={handleToggleStatus}
                  className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-medium border transition-all duration-200 ${
                    agent.status === "active"
                      ? "bg-amber-400/10 border-amber-400/20 text-amber-400 hover:bg-amber-400/15"
                      : "bg-emerald-400/10 border-emerald-400/20 text-emerald-400 hover:bg-emerald-400/15"
                  }`}
                >
                  {agent.status === "active" ? <Square size={13} /> : <Play size={13} />}
                  {agent.status === "active" ? "Stop Agent" : "Start Agent"}
                </button>
                <button
                  onClick={handleDelete}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/15 transition-all duration-200"
                >
                  <Trash2 size={13} />
                  Delete
                </button>
              </div>
            </div>

            {/* Performance Metrics */}
            <div>
              <h3 className="text-xs font-medium text-white/40 uppercase tracking-wider mb-3">Performance</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Tasks Completed", value: agent.metrics.tasksCompleted.toLocaleString(), icon: <CheckCircle2 size={14} className="text-emerald-400" /> },
                  { label: "Avg Response", value: agent.metrics.avgResponseTime, icon: <Zap size={14} className="text-[#5B8CFF]" /> },
                  { label: "Success Rate", value: `${agent.metrics.successRate}%`, icon: <TrendingUp size={14} className="text-[#00D4AA]" /> },
                  { label: "Tokens Used", value: agent.metrics.tokensUsed, icon: <MessageSquare size={14} className="text-[#7C3AED]" /> },
                ].map((metric) => (
                  <div key={metric.label} className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                    <div className="flex items-center gap-2 mb-1.5">
                      {metric.icon}
                      <span className="text-[10px] text-white/30">{metric.label}</span>
                    </div>
                    <span className="text-sm font-semibold text-white/80 font-mono">{metric.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Resource Usage */}
            <div>
              <h3 className="text-xs font-medium text-white/40 uppercase tracking-wider mb-3">Resource Usage</h3>
              <div className="space-y-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                <ResourceBar value={agent.cpu} label="CPU" color="bg-gradient-to-r from-[#5B8CFF] to-[#7C3AED]" />
                <ResourceBar value={agent.memory} label="Memory" color="bg-gradient-to-r from-[#00D4AA] to-[#5B8CFF]" />
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-1.5 text-[11px] text-white/30">
                    <Clock size={11} />
                    Uptime
                  </div>
                  <span className="text-[11px] font-mono text-white/50">{agent.uptime}</span>
                </div>
              </div>
            </div>

            {/* Configuration */}
            <div>
              <h3 className="text-xs font-medium text-white/40 uppercase tracking-wider mb-3">Configuration</h3>
              <div className="space-y-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/30">Model</span>
                  <span className="text-xs font-mono text-white/60">{agent.model}</span>
                </div>
                <div className="h-px bg-white/[0.04]" />
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/30">Temperature</span>
                  <span className="text-xs font-mono text-white/60">{agent.temperature.toFixed(1)}</span>
                </div>
                <div className="h-px bg-white/[0.04]" />
                <div>
                  <span className="text-xs text-white/30 block mb-2">System Prompt</span>
                  <p className="text-[11px] font-mono text-white/40 leading-relaxed bg-black/20 rounded-lg p-3 border border-white/[0.03]">
                    {agent.systemPrompt}
                  </p>
                </div>
                <div className="h-px bg-white/[0.04]" />
                <div>
                  <span className="text-xs text-white/30 block mb-2">Tools</span>
                  <div className="flex flex-wrap gap-1.5">
                    {agent.tools.map((toolId) => {
                      const tool = AVAILABLE_TOOLS.find((t) => t.id === toolId);
                      return tool ? (
                        <span key={toolId} className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-medium bg-white/[0.04] border border-white/[0.06] text-white/40">
                          {tool.icon}
                          {tool.label}
                        </span>
                      ) : null;
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Activity Log */}
            <div>
              <h3 className="text-xs font-medium text-white/40 uppercase tracking-wider mb-3">Activity Log</h3>
              <div className="space-y-0">
                {agent.activityLog.map((entry, i) => {
                  const colors = {
    info: "text-[#5B8CFF]",
    success: "text-emerald-400",
    warning: "text-amber-400",
    error: "text-red-400",
                  };
                  const dotColors = {
                    info: "bg-[#5B8CFF]",
                    success: "bg-emerald-400",
                    warning: "bg-amber-400",
                    error: "bg-red-400",
                  };
                  return (
                    <div key={i} className="flex gap-3 pb-4 last:pb-0">
                      <div className="flex flex-col items-center">
                        <div className={`w-2 h-2 rounded-full mt-1.5 ${dotColors[entry.type]}`} />
                        {i < agent.activityLog.length - 1 && (
                          <div className="w-px flex-1 bg-white/[0.04] mt-1" />
                        )}
                      </div>
                      <div className="flex-1 -mt-0.5">
                        <p className="text-xs text-white/50 leading-relaxed">{entry.message}</p>
                        <span className="text-[10px] text-white/20 font-mono mt-0.5 block">{entry.timestamp}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </>
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════ */

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>(INITIAL_AGENTS);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleCreateAgent = useCallback((newAgent: Agent) => {
    setAgents((prev) => [newAgent, ...prev]);
  }, []);

  const handleUpdateAgent = useCallback((updatedAgent: Agent) => {
    if (updatedAgent.id.startsWith("__deleted__")) {
      setAgents((prev) => prev.filter((a) => a.id !== updatedAgent.id.replace("__deleted__", "")));
    } else {
      setAgents((prev) => prev.map((a) => (a.id === updatedAgent.id ? updatedAgent : a)));
      setSelectedAgent(updatedAgent);
    }
  }, []);

  const filteredAgents = agents.filter(
    (a) =>
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeCount = agents.filter((a) => a.status === "active").length;
  const processingCount = agents.filter((a) => a.status === "processing").length;

  return (
    <DashboardLayout activePage="agents">
      <div className="space-y-6">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold text-white/90 font-[family-name:var(--font-space-grotesk)]">
                Agents
              </h1>
              <span className="px-2.5 py-0.5 rounded-lg text-[11px] font-medium bg-[#5B8CFF]/10 text-[#5B8CFF] border border-[#5B8CFF]/20">
                {agents.length} total
              </span>
            </div>
            <p className="text-sm text-white/30">
              Manage and monitor your AI agent workforce
            </p>
          </div>
          <button
            onClick={() => setCreateModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium bg-gradient-to-r from-[#5B8CFF] to-[#7C3AED] text-white hover:shadow-[0_0_32px_rgba(91,140,255,0.3)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus size={16} />
            Create Agent
          </button>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3"
        >
          {[
            { label: "Total Agents", value: agents.length, icon: <Bot size={15} />, color: "text-[#5B8CFF]" },
            { label: "Active", value: activeCount, icon: <CheckCircle2 size={15} />, color: "text-emerald-400" },
            { label: "Processing", value: processingCount, icon: <Loader2 size={15} className="animate-spin" />, color: "text-[#7C3AED]" },
            { label: "Idle", value: agents.length - activeCount - processingCount, icon: <AlertCircle size={15} />, color: "text-white/30" },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center gap-3 p-3.5 rounded-xl glass border border-white/[0.05]">
              <div className={`${stat.color} opacity-60`}>{stat.icon}</div>
              <div>
                <div className="text-lg font-bold text-white/80 font-mono">{stat.value}</div>
                <div className="text-[10px] text-white/25">{stat.label}</div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Search & Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="flex items-center gap-3"
        >
          <div className="flex-1 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <Search size={14} className="text-white/20" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search agents..."
              className="flex-1 bg-transparent text-sm text-white/70 placeholder:text-white/15 outline-none"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium text-white/30 bg-white/[0.03] border border-white/[0.06] hover:text-white/50 hover:border-white/[0.1] transition-all">
            <Filter size={14} />
            Filter
          </button>
        </motion.div>

        {/* Agent Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
        >
          {filteredAgents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} onConfigure={setSelectedAgent} />
          ))}
        </motion.div>

        {/* Empty state */}
        {filteredAgents.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-4">
              <Bot size={28} className="text-white/15" />
            </div>
            <h3 className="text-sm font-medium text-white/40 mb-1">No agents found</h3>
            <p className="text-xs text-white/20">
              {searchQuery ? "Try a different search term" : "Create your first agent to get started"}
            </p>
          </motion.div>
        )}
      </div>

      {/* Create Agent Modal */}
      <CreateAgentModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onCreate={handleCreateAgent}
      />

      {/* Agent Detail Slide-over */}
      <AnimatePresence>
        {selectedAgent && (
          <AgentDetailPanel
            key={selectedAgent.id}
            agent={selectedAgent}
            onClose={() => setSelectedAgent(null)}
            onUpdate={handleUpdateAgent}
          />
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}
