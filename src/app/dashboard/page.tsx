"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot, Brain, DollarSign, CheckCircle2,
  Cpu, MemoryStick, Clock, TrendingUp,
  Plus, Upload, Wallet, FolderPlus,
  Activity, Zap, ArrowUpRight, ArrowDownRight,
  MoreHorizontal, Eye, Settings2, Play,
  BarChart3, Users, Target, Sparkles,
} from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/Layout";

/* ═══════════════════════════════════════════════════════
   ANIMATED COUNTER HOOK
   ═══════════════════════════════════════════════════════ */
function useAnimatedCounter(target: number, duration = 1500) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.floor(eased * target);
      setCount(start);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [target, duration]);

  return count;
}

/* ═══════════════════════════════════════════════════════
   STAT CARD DATA
   ═══════════════════════════════════════════════════════ */
interface StatCardData {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  icon: React.ReactNode;
  change: number;
  color: string;
  glowClass: string;
}

const statsData: StatCardData[] = [
  {
    label: "Active Agents",
    value: 12,
    icon: <Bot size={20} />,
    change: 2.4,
    color: "#5B8CFF",
    glowClass: "glow-primary",
  },
  {
    label: "Knowledge Points",
    value: 8473,
    icon: <Brain size={20} />,
    change: 12.8,
    color: "#7C3AED",
    glowClass: "glow-secondary",
  },
  {
    label: "Portfolio Value",
    value: 284750,
    prefix: "$",
    suffix: "",
    icon: <DollarSign size={20} />,
    change: 5.2,
    color: "#00D4AA",
    glowClass: "glow-accent",
  },
  {
    label: "Tasks Completed",
    value: 1249,
    icon: <CheckCircle2 size={20} />,
    change: -1.8,
    color: "#F59E0B",
    glowClass: "",
  },
];

/* ═══════════════════════════════════════════════════════
   AGENT DATA
   ═══════════════════════════════════════════════════════ */
interface AgentData {
  name: string;
  role: string;
  status: "online" | "busy" | "idle";
  cpu: number;
  memory: number;
  lastAction: string;
  color: string;
  tasks: number;
}

const agentsData: AgentData[] = [
  { name: "CEO", role: "Chief Executive", status: "online", cpu: 72, memory: 58, lastAction: "Reviewed Q4 strategy", color: "#5B8CFF", tasks: 8 },
  { name: "Founder", role: "Vision & Growth", status: "online", cpu: 45, memory: 34, lastAction: "Scouted 3 startups", color: "#7C3AED", tasks: 5 },
  { name: "Research", role: "Deep Analysis", status: "busy", cpu: 91, memory: 82, lastAction: "Analyzing market data", color: "#00D4AA", tasks: 12 },
  { name: "Builder", role: "Engineering", status: "online", cpu: 67, memory: 71, lastAction: "Deployed v2.4.1", color: "#F59E0B", tasks: 6 },
  { name: "Design", role: "UI/UX", status: "idle", cpu: 12, memory: 22, lastAction: "Updated design system", color: "#EC4899", tasks: 3 },
  { name: "Trading", role: "Wealth Ops", status: "online", cpu: 88, memory: 65, lastAction: "Executed 5 trades", color: "#EF4444", tasks: 15 },
];

/* ═══════════════════════════════════════════════════════
   ACTIVITY DATA
   ═══════════════════════════════════════════════════════ */
interface ActivityItem {
  id: number;
  agent: string;
  action: string;
  time: string;
  type: "success" | "info" | "warning" | "error";
}

const activitiesData: ActivityItem[] = [
  { id: 1, agent: "Research", action: "Completed deep analysis on AI market trends", time: "2m ago", type: "success" },
  { id: 2, agent: "Trading", action: "Executed buy order: 2.5 ETH @ $3,240", time: "5m ago", type: "info" },
  { id: 3, agent: "Builder", action: "Deployed hotfix to production cluster", time: "12m ago", type: "success" },
  { id: 4, agent: "CEO", action: "Flagged budget review for Q3 planning", time: "18m ago", type: "warning" },
  { id: 5, agent: "Founder", action: "Identified 3 acquisition targets", time: "25m ago", type: "info" },
  { id: 6, agent: "Design", action: "Published new component library v3.0", time: "32m ago", type: "success" },
  { id: 7, agent: "Trading", action: "Alert: Portfolio rebalancing triggered", time: "45m ago", type: "warning" },
  { id: 8, agent: "Research", action: "Knowledge base updated: 47 new entries", time: "1h ago", type: "info" },
];

/* ═══════════════════════════════════════════════════════
   PERFORMANCE CHART DATA
   ═══════════════════════════════════════════════════════ */
const chartData = [
  { label: "Mon", value: 42 }, { label: "Tue", value: 58 },
  { label: "Wed", value: 35 }, { label: "Thu", value: 72 },
  { label: "Fri", value: 88 }, { label: "Sat", value: 64 },
  { label: "Sun", value: 78 }, { label: "Mon", value: 55 },
  { label: "Tue", value: 91 }, { label: "Wed", value: 67 },
  { label: "Thu", value: 83 }, { label: "Fri", value: 76 },
  { label: "Sat", value: 95 }, { label: "Sun", value: 60 },
];

const maxChartValue = Math.max(...chartData.map((d) => d.value));

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

const slideInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const slideInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

/* ═══════════════════════════════════════════════════════
   SUB-COMPONENTS
   ═══════════════════════════════════════════════════════ */

function AnimatedStatCard({ stat, index }: { stat: StatCardData; index: number }) {
  const count = useAnimatedCounter(stat.value, 1800 + index * 200);
  const [hovered, setHovered] = useState(false);

  const formatValue = (v: number) => {
    if (stat.prefix === "$") return `${stat.prefix}${v.toLocaleString()}`;
    return v.toLocaleString();
  };

  return (
    <motion.div
      variants={itemVariants}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => {}}
      className={`relative group cursor-pointer rounded-2xl p-5 glass transition-all duration-300 hover:scale-[1.02] hover:border-white/10 ${stat.glowClass}`}
      style={{
        boxShadow: hovered ? `0 0 60${stat.color}22` : undefined,
      }}
    >
      {/* Shimmer overlay on hover */}
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

      <div className="flex items-start justify-between mb-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
          style={{ background: `${stat.color}15`, color: stat.color }}
        >
          {stat.icon}
        </div>
        <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-lg ${
          stat.change >= 0 ? "text-[#00D4AA] bg-[#00D4AA]/10" : "text-[#EF4444] bg-[#EF4444]/10"
        }`}>
          {stat.change >= 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {Math.abs(stat.change)}%
        </div>
      </div>

      <div className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold tracking-tight mb-1">
        {formatValue(count)}
      </div>
      <div className="text-xs text-white/35 font-medium uppercase tracking-wider">
        {stat.label}
      </div>
    </motion.div>
  );
}

function StatusDot({ status }: { status: AgentData["status"] }) {
  const colors = {
    online: "#00D4AA",
    busy: "#F59E0B",
    idle: "#6B7280",
  };
  return (
    <div className="relative">
      <div
        className="w-2.5 h-2.5 rounded-full"
        style={{ background: colors[status] }}
      />
      {status === "online" && (
        <div
          className="absolute inset-0 w-2.5 h-2.5 rounded-full animate-ping"
          style={{ background: colors[status], opacity: 0.4 }}
        />
      )}
    </div>
  );
}

function UsageBar({ value, color, label }: { value: number; color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] font-mono text-white/30 w-7 uppercase">{label}</span>
      <div className="flex-1 h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${color}88, ${color})`,
            boxShadow: `0 0 8px ${color}40`,
          }}
        />
      </div>
      <span className="text-[10px] font-mono text-white/40 w-8 text-right">{value}%</span>
    </div>
  );
}

function AgentCard({ agent, index }: { agent: AgentData; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={itemVariants}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => {}}
      className="relative group cursor-pointer rounded-2xl p-5 glass transition-all duration-300 hover:scale-[1.02] hover:border-white/10"
      style={{
        boxShadow: hovered ? `0 8px 40px ${agent.color}10` : undefined,
      }}
    >
      {/* Top row */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-transform duration-300 group-hover:scale-110"
            style={{ background: `${agent.color}18`, color: agent.color }}
          >
            {agent.name.charAt(0)}
          </div>
          <div>
            <div className="text-sm font-semibold text-white/85">{agent.name}</div>
            <div className="text-[11px] text-white/30">{agent.role}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <StatusDot status={agent.status} />
          <span className="text-[10px] font-mono text-white/30 uppercase">{agent.status}</span>
        </div>
      </div>

      {/* Usage bars */}
      <div className="space-y-2 mb-4">
        <UsageBar value={agent.cpu} color={agent.color} label="CPU" />
        <UsageBar value={agent.memory} color={agent.color} label="MEM" />
      </div>

      {/* Bottom row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-[11px] text-white/25">
          <Clock size={10} />
          <span className="truncate max-w-[140px]">{agent.lastAction}</span>
        </div>
        <div className="flex items-center gap-1 text-[10px] font-mono text-white/30">
          <Target size={10} />
          {agent.tasks} tasks
        </div>
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
              <Settings2 size={12} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ActivityFeedItem({ item, index }: { item: ActivityItem; index: number }) {
  const [hovered, setHovered] = useState(false);

  const typeColors = {
    success: "#00D4AA",
    info: "#5B8CFF",
    warning: "#F59E0B",
    error: "#EF4444",
  };

  const typeIcons = {
    success: <CheckCircle2 size={12} />,
    info: <Activity size={12} />,
    warning: <Zap size={12} />,
    error: <Zap size={12} />,
  };

  return (
    <motion.div
      variants={itemVariants}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => {}}
      className="flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 hover:bg-white/[0.03] group"
    >
      <div
        className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 transition-transform duration-200 group-hover:scale-110"
        style={{ background: `${typeColors[item.type]}15`, color: typeColors[item.type] }}
      >
        {typeIcons[item.type]}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm text-white/70 leading-snug">
          <span className="font-semibold text-white/85">{item.agent}</span>{" "}
          {item.action}
        </div>
        <div className="text-[11px] text-white/25 mt-1 flex items-center gap-1">
          <Clock size={10} />
          {item.time}
        </div>
      </div>
      <AnimatePresence>
        {hovered && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex-shrink-0 w-7 h-7 rounded-lg bg-white/[0.04] border border-white/5 flex items-center justify-center text-white/25 hover:text-white/60 transition-colors"
          >
            <MoreHorizontal size={14} />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function QuickActionButton({
  icon,
  label,
  description,
  color,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  description: string;
  color: string;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.button
      variants={itemVariants}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      className="flex items-center gap-3 p-3.5 rounded-xl glass cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:border-white/10 text-left w-full group"
      style={{
        boxShadow: hovered ? `0 4px 30px ${color}10` : undefined,
      }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
        style={{ background: `${color}15`, color }}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold text-white/80 group-hover:text-white/95 transition-colors">
          {label}
        </div>
        <div className="text-[11px] text-white/25 truncate">{description}</div>
      </div>
      <ArrowUpRight
        size={14}
        className="text-white/15 group-hover:text-white/40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 flex-shrink-0"
      />
    </motion.button>
  );
}

function PerformanceChart() {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold text-white/85">
            Performance
          </h3>
          <p className="text-xs text-white/30 mt-0.5">Agent throughput over 14 days</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-[10px] text-white/30">
            <div className="w-2 h-2 rounded-full bg-[#5B8CFF]" />
            Tasks
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-white/30">
            <div className="w-2 h-2 rounded-full bg-[#00D4AA]" />
            Efficiency
          </div>
        </div>
      </div>

      {/* Chart area */}
      <div className="flex-1 flex items-end gap-1.5 min-h-[160px]">
        {chartData.map((point, i) => {
          const height = (point.value / maxChartValue) * 100;
          const isHovered = hoveredBar === i;

          return (
            <motion.div
              key={i}
              className="flex-1 flex flex-col items-center gap-1.5 relative"
              onMouseEnter={() => setHoveredBar(i)}
              onMouseLeave={() => setHoveredBar(null)}
            >
              {/* Tooltip */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1.5 rounded-lg glass-strong border border-white/10 text-[10px] font-mono text-white/70 whitespace-nowrap z-10"
                  >
                    {point.value} tasks
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Bar */}
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: `${height}%`, opacity: 1 }}
                transition={{ duration: 0.8, delay: i * 0.05, ease: "easeOut" }}
                className="w-full rounded-t-md cursor-pointer relative overflow-hidden"
                style={{
                  background: isHovered
                    ? "linear-gradient(180deg, #5B8CFF, #7C3AED)"
                    : "linear-gradient(180deg, #5B8CFF88, #5B8CFF22)",
                  boxShadow: isHovered ? "0 0 20px #5B8CFF30" : undefined,
                  minHeight: 4,
                }}
              >
                {/* Shimmer on hover */}
                {isHovered && (
                  <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  />
                )}
              </motion.div>

              {/* Label */}
              <span className={`text-[9px] font-mono transition-colors ${
                isHovered ? "text-white/60" : "text-white/20"
              }`}>
                {point.label}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN DASHBOARD PAGE
   ═══════════════════════════════════════════════════════ */
export default function DashboardPage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const hour = currentTime.getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 17) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, [currentTime]);

  const formatDate = (d: Date) =>
    d.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const formatTime = (d: Date) =>
    d.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

  const handleQuickAction = useCallback((action: string) => {
    console.log(`Quick action: ${action}`);
  }, []);

  return (
    <DashboardLayout activePage="dashboard">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6 max-w-[1600px] mx-auto"
      >
        {/* ═══ WELCOME HEADER ═══ */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={14} className="text-[#5B8CFF]" />
              <span className="section-label text-[#5B8CFF]">Overview</span>
            </div>
            <h1 className="font-[family-name:var(--font-space-grotesk)] text-3xl md:text-4xl font-bold tracking-tight">
              {greeting},{" "}
              <span className="text-gradient">Hermes</span>
            </h1>
            <p className="text-sm text-white/30 mt-1.5">
              Here&apos;s what&apos;s happening across your HELIX OS today.
            </p>
          </div>
          <div className="text-right">
            <div className="font-[family-name:var(--font-jetbrains-mono)] text-lg font-medium text-white/60 tabular-nums">
              {formatTime(currentTime)}
            </div>
            <div className="text-xs text-white/25 mt-0.5">
              {formatDate(currentTime)}
            </div>
          </div>
        </motion.div>

        {/* ═══ STATS CARDS ROW ═══ */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {statsData.map((stat, i) => (
            <AnimatedStatCard key={stat.label} stat={stat} index={i} />
          ))}
        </motion.div>

        {/* ═══ MAIN GRID: Agents + Sidebar ═══ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ═══ AGENT STATUS GRID (2 cols) ═══ */}
          <motion.div variants={slideInLeft} className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Users size={14} className="text-[#7C3AED]" />
                <h2 className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold text-white/80">
                  Agent Fleet
                </h2>
              </div>
              <button
                onClick={() => handleQuickAction("view-all-agents")}
                className="text-xs text-white/25 hover:text-white/50 transition-colors flex items-center gap-1"
              >
                View all <ArrowUpRight size={10} />
              </button>
            </div>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
            >
              {agentsData.map((agent, i) => (
                <AgentCard key={agent.name} agent={agent} index={i} />
              ))}
            </motion.div>
          </motion.div>

          {/* ═══ RIGHT SIDEBAR ═══ */}
          <motion.div variants={slideInRight} className="space-y-6">
            {/* Quick Actions */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Zap size={14} className="text-[#00D4AA]" />
                <h2 className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold text-white/80">
                  Quick Actions
                </h2>
              </div>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-2"
              >
                <QuickActionButton
                  icon={<Plus size={18} />}
                  label="Create Agent"
                  description="Deploy a new AI agent"
                  color="#5B8CFF"
                  onClick={() => handleQuickAction("create-agent")}
                />
                <QuickActionButton
                  icon={<Upload size={18} />}
                  label="Upload Knowledge"
                  description="Add data to the knowledge base"
                  color="#7C3AED"
                  onClick={() => handleQuickAction("upload-knowledge")}
                />
                <QuickActionButton
                  icon={<Wallet size={18} />}
                  label="Connect Wallet"
                  description="Link a Web3 wallet"
                  color="#00D4AA"
                  onClick={() => handleQuickAction("connect-wallet")}
                />
                <QuickActionButton
                  icon={<FolderPlus size={18} />}
                  label="New Project"
                  description="Start a new initiative"
                  color="#F59E0B"
                  onClick={() => handleQuickAction("new-project")}
                />
              </motion.div>
            </div>

            {/* Recent Activity */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Activity size={14} className="text-[#5B8CFF]" />
                  <h2 className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold text-white/80">
                    Recent Activity
                  </h2>
                </div>
                <button
                  onClick={() => handleQuickAction("view-all-activity")}
                  className="text-xs text-white/25 hover:text-white/50 transition-colors"
                >
                  View all
                </button>
              </div>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="glass rounded-2xl p-2 max-h-[420px] overflow-y-auto"
              >
                {activitiesData.map((item, i) => (
                  <ActivityFeedItem key={item.id} item={item} index={i} />
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* ═══ PERFORMANCE CHART ═══ */}
        <motion.div
          variants={itemVariants}
          className="glass rounded-2xl p-6"
        >
          <PerformanceChart />
        </motion.div>

        {/* ═══ BOTTOM STATUS BAR ═══ */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-between gap-4 px-5 py-3 rounded-xl glass text-[11px] text-white/25"
        >
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00D4AA] animate-pulse" />
              <span>System Online</span>
            </div>
            <span>•</span>
            <span>6 agents active</span>
            <span>•</span>
            <span>Uptime: 99.97%</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono">v2.4.1</span>
            <span>•</span>
            <span>Last sync: 12s ago</span>
          </div>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
