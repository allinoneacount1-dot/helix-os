"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wallet, LogOut, ArrowUpRight, ArrowDownRight,
  Clock, ChevronDown, ChevronUp,
  TrendingUp, Shield, Zap, DollarSign,
  ArrowUpDown, Filter, RefreshCw, CheckCircle2,
  AlertTriangle, Info,
} from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/Layout";

/* ═══════════════════════════════════════════════════════
   ANIMATED COUNTER HOOK
   ═══════════════════════════════════════════════════════ */
function useAnimatedCounter(target: number, duration = 1800, prefix = "", suffix = "", decimals = 0) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(eased * target);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration]);

  const formatted = decimals > 0
    ? count.toFixed(decimals)
    : Math.floor(count).toLocaleString();

  return `${prefix}${formatted}${suffix}`;
}

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

const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

/* ═══════════════════════════════════════════════════════
   WALLET CONNECTION
   ═══════════════════════════════════════════════════════ */
function WalletConnection() {
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [address] = useState("0x7a3B...9f2E");
  const [network] = useState("Ethereum");
  const [networkColor] = useState("#627EEA");

  const handleConnect = () => {
    setConnecting(true);
    setTimeout(() => {
      setConnecting(false);
      setConnected(true);
    }, 1200);
  };

  const handleDisconnect = () => {
    setConnected(false);
  };

  return (
    <motion.div variants={itemVariants}>
      <div className="rounded-2xl p-5 glass transition-all duration-300 hover:border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#5B8CFF]/10 flex items-center justify-center text-[#5B8CFF]">
              <Wallet size={20} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white/85">Wallet</h3>
              <p className="text-[11px] text-white/30">
                {connected ? "Connected to network" : "Not connected"}
              </p>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {!connected ? (
              <motion.button
                key="connect"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={handleConnect}
                disabled={connecting}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#5B8CFF] to-[#7C3AED] text-white text-sm font-medium hover:opacity-90 transition-all duration-200 disabled:opacity-60"
              >
                {connecting ? (
                  <>
                    <RefreshCw size={14} className="animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <Wallet size={14} />
                    Connect Wallet
                  </>
                )}
              </motion.button>
            ) : (
              <motion.div
                key="connected"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex items-center gap-2"
              >
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/5">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: networkColor }}
                  />
                  <span className="text-xs font-mono text-white/60">{network}</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/5">
                  <div className="w-2 h-2 rounded-full bg-[#00D4AA] animate-pulse" />
                  <span className="text-xs font-mono text-white/60">{address}</span>
                </div>
                <button
                  onClick={handleDisconnect}
                  className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/5 flex items-center justify-center text-white/30 hover:text-[#EF4444] hover:bg-[#EF4444]/10 hover:border-[#EF4444]/20 transition-all duration-200"
                  title="Disconnect"
                >
                  <LogOut size={14} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   PORTFOLIO OVERVIEW CARDS
   ═══════════════════════════════════════════════════════ */
interface PortfolioStat {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  change?: number;
  changeLabel?: string;
  icon: React.ReactNode;
  color: string;
  glowClass: string;
}

const portfolioStats: PortfolioStat[] = [
  {
    label: "Total Value",
    value: 284750,
    prefix: "$",
    icon: <DollarSign size={20} />,
    color: "#5B8CFF",
    glowClass: "glow-primary",
  },
  {
    label: "Day P&L",
    value: 3241,
    prefix: "+$",
    change: 1.15,
    changeLabel: "vs yesterday",
    icon: <TrendingUp size={20} />,
    color: "#00D4AA",
    glowClass: "glow-accent",
  },
  {
    label: "30D Return",
    value: 18.4,
    suffix: "%",
    decimals: 1,
    change: 18.4,
    changeLabel: "30-day period",
    icon: <Zap size={20} />,
    color: "#7C3AED",
    glowClass: "glow-secondary",
  },
  {
    label: "Risk Score",
    value: 34,
    suffix: "/100",
    icon: <Shield size={20} />,
    color: "#F59E0B",
    glowClass: "",
  },
];

function PortfolioCard({ stat, index }: { stat: PortfolioStat; index: number }) {
  const [hovered, setHovered] = useState(false);
  const animatedValue = useAnimatedCounter(
    stat.value,
    1800 + index * 200,
    stat.prefix || "",
    stat.suffix || "",
    stat.decimals || 0
  );

  const isPositive = stat.label === "Day P&L" || (stat.change !== undefined && stat.change >= 0);
  const isRisk = stat.label === "Risk Score";

  return (
    <motion.div
      variants={itemVariants}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative group cursor-pointer rounded-2xl p-5 glass transition-all duration-300 hover:scale-[1.02] hover:border-white/10 ${stat.glowClass}`}
      style={{
        boxShadow: hovered ? `0 0 60px ${stat.color}15` : undefined,
      }}
    >
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
        {stat.change !== undefined && !isRisk && (
          <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-lg ${
            isPositive ? "text-[#00D4AA] bg-[#00D4AA]/10" : "text-[#EF4444] bg-[#EF4444]/10"
          }`}>
            {isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
            {Math.abs(stat.change)}%
          </div>
        )}
        {isRisk && (
          <div className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-lg text-[#F59E0B] bg-[#F59E0B]/10">
            <Shield size={12} />
            Low
          </div>
        )}
      </div>

      <div className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold tracking-tight mb-1">
        {animatedValue}
      </div>
      <div className="text-xs text-white/35 font-medium uppercase tracking-wider">
        {stat.label}
      </div>
      {stat.changeLabel && (
        <div className="text-[10px] text-white/20 mt-1">{stat.changeLabel}</div>
      )}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   ASSET ALLOCATION DONUT CHART
   ═══════════════════════════════════════════════════════ */
interface AllocationItem {
  label: string;
  value: number;
  color: string;
}

const allocationData: AllocationItem[] = [
  { label: "SOL", value: 35, color: "#9945FF" },
  { label: "ETH", value: 25, color: "#627EEA" },
  { label: "BTC", value: 20, color: "#F7931A" },
  { label: "USDC", value: 12, color: "#2775CA" },
  { label: "Other", value: 8, color: "#6B7280" },
];

function DonutChart() {
  const [hoveredSegment, setHoveredSegment] = useState<number | null>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const size = 180;
  const strokeWidth = 28;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let cumulativePercent = 0;

  const segments = allocationData.map((item, i) => {
    const offset = (cumulativePercent / 100) * circumference;
    const dashLength = (item.value / 100) * circumference;
    cumulativePercent += item.value;
    return { ...item, offset, dashLength, index: i };
  });

  return (
    <motion.div variants={itemVariants}>
      <div className="rounded-2xl p-5 glass transition-all duration-300 hover:border-white/10">
        <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold text-white/85 mb-1">
          Asset Allocation
        </h3>
        <p className="text-xs text-white/30 mb-5">Portfolio distribution by asset</p>

        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Donut SVG */}
          <div className="relative flex-shrink-0">
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
              {/* Background ring */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="rgba(255,255,255,0.03)"
                strokeWidth={strokeWidth}
              />
              {/* Segments */}
              {segments.map((seg) => {
                const isHovered = hoveredSegment === seg.index;
                const expandedRadius = isHovered ? radius + 4 : radius;
                const expandedCircumference = 2 * Math.PI * expandedRadius;
                const expandedDashLength = (seg.value / 100) * expandedCircumference;
                const expandedOffset = ((seg.offset / circumference) * expandedCircumference);

                return (
                  <motion.circle
                    key={seg.label}
                    cx={size / 2}
                    cy={size / 2}
                    r={expandedRadius}
                    fill="none"
                    stroke={seg.color}
                    strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                    strokeDasharray={`${animated ? expandedDashLength : 0} ${expandedCircumference}`}
                    strokeDashoffset={-expandedOffset}
                    strokeLinecap="round"
                    className="transition-all duration-500 cursor-pointer"
                    style={{
                      filter: isHovered ? `drop-shadow(0 0 8px ${seg.color}80)` : `drop-shadow(0 0 2px ${seg.color}30)`,
                      opacity: hoveredSegment !== null && !isHovered ? 0.4 : 1,
                    }}
                    onMouseEnter={() => setHoveredSegment(seg.index)}
                    onMouseLeave={() => setHoveredSegment(null)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: seg.index * 0.15 }}
                  />
                );
              })}
            </svg>
            {/* Center label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <AnimatePresence mode="wait">
                {hoveredSegment !== null ? (
                  <motion.div
                    key="hovered"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="text-center"
                  >
                    <div className="text-2xl font-bold" style={{ color: allocationData[hoveredSegment].color }}>
                      {allocationData[hoveredSegment].value}%
                    </div>
                    <div className="text-xs text-white/40">{allocationData[hoveredSegment].label}</div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="default"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="text-center"
                  >
                    <div className="text-lg font-bold text-white/70">5 Assets</div>
                    <div className="text-[10px] text-white/30">Diversified</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Legend */}
          <div className="flex-1 space-y-3 w-full">
            {allocationData.map((item, i) => {
              const isHovered = hoveredSegment === i;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  onMouseEnter={() => setHoveredSegment(i)}
                  onMouseLeave={() => setHoveredSegment(null)}
                  className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all duration-200 ${
                    isHovered ? "bg-white/[0.04] border border-white/10" : "border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full transition-transform duration-200"
                      style={{
                        background: item.color,
                        transform: isHovered ? "scale(1.3)" : "scale(1)",
                        boxShadow: isHovered ? `0 0 10px ${item.color}60` : "none",
                      }}
                    />
                    <span className="text-sm text-white/70 font-medium">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-mono text-white/50">{item.value}%</span>
                    <div className="w-16 h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.value}%` }}
                        transition={{ duration: 1, delay: 0.3 + i * 0.1, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{ background: item.color }}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   POSITIONS TABLE
   ═══════════════════════════════════════════════════════ */
interface Position {
  token: string;
  symbol: string;
  amount: number;
  value: number;
  change24h: number;
  chain: string;
  chainColor: string;
  logo: string;
}

const positionsData: Position[] = [
  { token: "Solana", symbol: "SOL", amount: 485.2, value: 97040, change24h: 3.42, chain: "Solana", chainColor: "#9945FF", logo: "◎" },
  { token: "Ethereum", symbol: "ETH", amount: 12.8, value: 48640, change24h: 1.87, chain: "Ethereum", chainColor: "#627EEA", logo: "Ξ" },
  { token: "Bitcoin", symbol: "BTC", amount: 0.62, value: 43400, change24h: -0.54, chain: "Bitcoin", chainColor: "#F7931A", logo: "₿" },
  { token: "USD Coin", symbol: "USDC", amount: 34180, value: 34180, change24h: 0.01, chain: "Ethereum", chainColor: "#2775CA", logo: "$" },
  { token: "Render", symbol: "RNDR", amount: 2840, value: 22720, change24h: 5.23, chain: "Ethereum", chainColor: "#FF4F4F", logo: "◈" },
  { token: "Jupiter", symbol: "JUP", amount: 42000, value: 38770, change24h: -2.18, chain: "Solana", chainColor: "#9945FF", logo: "♃" },
];

type SortKey = "token" | "amount" | "value" | "change24h" | "chain";
type SortDir = "asc" | "desc";

function PositionsTable() {
  const [sortKey, setSortKey] = useState<SortKey>("value");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const sortedPositions = useMemo(() => {
    return [...positionsData].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortDir === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      return sortDir === "asc" ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number);
    });
  }, [sortKey, sortDir]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  const columns: { key: SortKey; label: string; align?: string }[] = [
    { key: "token", label: "Token" },
    { key: "amount", label: "Amount", align: "right" },
    { key: "value", label: "Value", align: "right" },
    { key: "change24h", label: "24H Change", align: "right" },
    { key: "chain", label: "Chain", align: "center" },
  ];

  return (
    <motion.div variants={itemVariants}>
      <div className="rounded-2xl p-5 glass transition-all duration-300 hover:border-white/10">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold text-white/85">
              Positions
            </h3>
            <p className="text-xs text-white/30 mt-0.5">{positionsData.length} active positions</p>
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/5 text-xs text-white/40 hover:text-white/70 hover:bg-white/[0.06] transition-all">
            <RefreshCw size={12} />
            Refresh
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    onClick={() => handleSort(col.key)}
                    className={`pb-3 text-[10px] font-semibold uppercase tracking-wider text-white/30 cursor-pointer hover:text-white/60 transition-colors select-none ${
                      col.align === "right" ? "text-right" : col.align === "center" ? "text-center" : "text-left"
                    } ${col.key === "token" ? "pl-2" : ""}`}
                  >
                    <div className={`flex items-center gap-1 ${col.align === "right" ? "justify-end" : col.align === "center" ? "justify-center" : ""}`}>
                      {col.label}
                      {sortKey === col.key ? (
                        sortDir === "asc" ? <ChevronUp size={12} className="text-[#5B8CFF]" /> : <ChevronDown size={12} className="text-[#5B8CFF]" />
                      ) : (
                        <ArrowUpDown size={10} className="text-white/15" />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedPositions.map((pos, i) => (
                <motion.tr
                  key={pos.symbol}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onMouseEnter={() => setHoveredRow(i)}
                  onMouseLeave={() => setHoveredRow(null)}
                  className={`border-b border-white/[0.03] cursor-pointer transition-all duration-200 ${
                    hoveredRow === i ? "bg-white/[0.03]" : ""
                  }`}
                >
                  <td className="py-3 pl-2">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-transform duration-200"
                        style={{
                          background: `${pos.chainColor}15`,
                          color: pos.chainColor,
                          transform: hoveredRow === i ? "scale(1.1)" : "scale(1)",
                        }}
                      >
                        {pos.logo}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white/80">{pos.token}</div>
                        <div className="text-[10px] text-white/30 font-mono">{pos.symbol}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 text-right">
                    <span className="text-sm font-mono text-white/60">
                      {pos.amount.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <span className="text-sm font-mono text-white/70">
                      ${pos.value.toLocaleString()}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <span className={`text-sm font-mono font-medium ${
                      pos.change24h >= 0 ? "text-[#00D4AA]" : "text-[#EF4444]"
                    }`}>
                      {pos.change24h >= 0 ? "+" : ""}{pos.change24h.toFixed(2)}%
                    </span>
                  </td>
                  <td className="py-3 text-center">
                    <span
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium"
                      style={{
                        background: `${pos.chainColor}12`,
                        color: pos.chainColor,
                      }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: pos.chainColor }} />
                      {pos.chain}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   TRANSACTION HISTORY
   ═══════════════════════════════════════════════════════ */
type TxType = "all" | "send" | "swap" | "receive";

interface Transaction {
  id: string;
  type: TxType;
  description: string;
  amount: string;
  value: string;
  time: string;
  status: "completed" | "pending" | "failed";
  hash: string;
}

const transactionsData: Transaction[] = [
  { id: "1", type: "swap", description: "Swapped SOL → USDC", amount: "50 SOL → 1,024 USDC", value: "$1,024", time: "2m ago", status: "completed", hash: "0x3a...f291" },
  { id: "2", type: "receive", description: "Received from 0x8b2c", amount: "+2.4 ETH", value: "$9,120", time: "18m ago", status: "completed", hash: "0x7c...1b44" },
  { id: "3", type: "send", description: "Sent to 0x4d1e", amount: "-15,000 USDC", value: "$15,000", time: "1h ago", status: "completed", hash: "0x9e...8c33" },
  { id: "4", type: "swap", description: "Swapped ETH → SOL", amount: "1.2 ETH → 31.5 SOL", value: "$4,608", time: "3h ago", status: "pending", hash: "0x1d...5a77" },
  { id: "5", type: "receive", description: "Yield from Marinade", amount: "+0.84 SOL", value: "$168", time: "5h ago", status: "completed", hash: "0x5f...2d88" },
  { id: "6", type: "send", description: "Sent to 0x9a3f", amount: "-0.15 BTC", value: "$10,837", time: "8h ago", status: "completed", hash: "0x2b...6e11" },
  { id: "7", type: "swap", description: "Swapped RNDR → ETH", amount: "120 RNDR → 0.18 ETH", value: "$684", time: "12h ago", status: "failed", hash: "0x8c...4f22" },
  { id: "8", type: "receive", description: "Airdrop: JUP claim", amount: "+42,000 JUP", value: "$35,280", time: "1d ago", status: "completed", hash: "0x6a...9b55" },
];

const filterOptions: { key: TxType; label: string }[] = [
  { key: "all", label: "All" },
  { key: "send", label: "Send" },
  { key: "swap", label: "Swap" },
  { key: "receive", label: "Receive" },
];

function TransactionHistory() {
  const [activeFilter, setActiveFilter] = useState<TxType>("all");
  const [hoveredTx, setHoveredTx] = useState<string | null>(null);

  const filtered = activeFilter === "all"
    ? transactionsData
    : transactionsData.filter((tx) => tx.type === activeFilter);

  const typeIcons: Record<string, React.ReactNode> = {
    send: <ArrowUpRight size={14} />,
    swap: <RefreshCw size={14} />,
    receive: <ArrowDownRight size={14} />,
  };

  const typeColors: Record<string, string> = {
    send: "#EF4444",
    swap: "#5B8CFF",
    receive: "#00D4AA",
  };

  const statusIcons: Record<string, React.ReactNode> = {
    completed: <CheckCircle2 size={12} className="text-[#00D4AA]" />,
    pending: <Clock size={12} className="text-[#F59E0B] animate-pulse" />,
    failed: <AlertTriangle size={12} className="text-[#EF4444]" />,
  };

  return (
    <motion.div variants={itemVariants}>
      <div className="rounded-2xl p-5 glass transition-all duration-300 hover:border-white/10">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold text-white/85">
              Transaction History
            </h3>
            <p className="text-xs text-white/30 mt-0.5">{filtered.length} transactions</p>
          </div>
          <div className="flex items-center gap-1 p-1 rounded-xl bg-white/[0.03] border border-white/5">
            {filterOptions.map((opt) => (
              <button
                key={opt.key}
                onClick={() => setActiveFilter(opt.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                  activeFilter === opt.key
                    ? "bg-[#5B8CFF]/15 text-[#5B8CFF] border border-[#5B8CFF]/20"
                    : "text-white/30 hover:text-white/50 border border-transparent"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1 max-h-[400px] overflow-y-auto">
          <AnimatePresence mode="popLayout">
            {filtered.map((tx, i) => (
              <motion.div
                key={tx.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: i * 0.03 }}
                onMouseEnter={() => setHoveredTx(tx.id)}
                onMouseLeave={() => setHoveredTx(null)}
                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                  hoveredTx === tx.id ? "bg-white/[0.03]" : ""
                }`}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-200"
                  style={{
                    background: `${typeColors[tx.type]}15`,
                    color: typeColors[tx.type],
                    transform: hoveredTx === tx.id ? "scale(1.1)" : "scale(1)",
                  }}
                >
                  {typeIcons[tx.type]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-white/70 truncate">{tx.description}</div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] text-white/25">{tx.time}</span>
                    <span className="text-[10px] font-mono text-white/15">{tx.hash}</span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className={`text-sm font-mono ${
                    tx.type === "receive" ? "text-[#00D4AA]" : tx.type === "send" ? "text-[#EF4444]" : "text-white/60"
                  }`}>
                    {tx.type === "receive" ? "+" : tx.type === "send" ? "-" : ""}{tx.value.replace("$", "$")}
                  </div>
                  <div className="text-[10px] text-white/25 mt-0.5">{tx.amount}</div>
                </div>
                <div className="flex-shrink-0">
                  {statusIcons[tx.status]}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   YIELD OPPORTUNITIES
   ═══════════════════════════════════════════════════════ */
interface YieldOpportunity {
  protocol: string;
  chain: string;
  chainColor: string;
  apy: number;
  risk: "Low" | "Medium" | "High";
  riskColor: string;
  tvl: string;
  type: string;
  description: string;
}

const yieldData: YieldOpportunity[] = [
  {
    protocol: "Marinade Finance",
    chain: "Solana",
    chainColor: "#9945FF",
    apy: 7.2,
    risk: "Low",
    riskColor: "#00D4AA",
    tvl: "$1.2B",
    type: "Liquid Staking",
    description: "Stake SOL and receive mSOL while earning staking rewards. Fully liquid.",
  },
  {
    protocol: "Aave V3",
    chain: "Ethereum",
    chainColor: "#627EEA",
    apy: 4.8,
    risk: "Low",
    riskColor: "#00D4AA",
    tvl: "$8.4B",
    type: "Lending",
    description: "Supply USDC to earn yield from borrowers. Audited and battle-tested.",
  },
  {
    protocol: "Jupiter Perps",
    chain: "Solana",
    chainColor: "#9945FF",
    apy: 12.4,
    risk: "Medium",
    riskColor: "#F59E0B",
    tvl: "$340M",
    type: "LP Yield",
    description: "Provide liquidity to perpetual DEX. Higher yield with managed risk.",
  },
];

function YieldOpportunities() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <motion.div variants={itemVariants}>
      <div className="rounded-2xl p-5 glass transition-all duration-300 hover:border-white/10">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold text-white/85">
              Yield Opportunities
            </h3>
            <p className="text-xs text-white/30 mt-0.5">Maximize your portfolio returns</p>
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/5 text-xs text-white/40 hover:text-white/70 hover:bg-white/[0.06] transition-all">
            <Filter size={12} />
            Filter
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {yieldData.map((opp, i) => (
            <motion.div
              key={opp.protocol}
              variants={scaleIn}
              transition={{ delay: i * 0.1 }}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`relative rounded-xl p-4 glass cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:border-white/10 ${
                hoveredCard === i ? "glow-accent" : ""
              }`}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                    style={{ background: `${opp.chainColor}15`, color: opp.chainColor }}
                  >
                    {opp.protocol.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white/80">{opp.protocol}</div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: opp.chainColor }} />
                      <span className="text-[10px] text-white/30">{opp.chain}</span>
                    </div>
                  </div>
                </div>
                <span
                  className="px-2 py-0.5 rounded-md text-[10px] font-semibold"
                  style={{ background: `${opp.riskColor}15`, color: opp.riskColor }}
                >
                  {opp.risk} Risk
                </span>
              </div>

              {/* APY */}
              <div className="mb-3">
                <div className="flex items-baseline gap-1">
                  <span className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-[#00D4AA]">
                    {opp.apy}%
                  </span>
                  <span className="text-xs text-white/30">APY</span>
                </div>
                <div className="text-[10px] text-white/25 mt-0.5">{opp.type}</div>
              </div>

              {/* Description */}
              <p className="text-[11px] text-white/35 leading-relaxed mb-4 line-clamp-2">
                {opp.description}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-[10px] text-white/25">
                  <Info size={10} />
                  TVL: {opp.tvl}
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                    hoveredCard === i
                      ? "bg-[#00D4AA]/20 text-[#00D4AA] border border-[#00D4AA]/30"
                      : "bg-white/[0.04] text-white/40 border border-white/5"
                  }`}
                >
                  Deposit
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════════════════ */
export default function WealthPage() {
  return (
    <DashboardLayout activePage="wealth">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Page Header */}
        <motion.div variants={fadeInUp} className="flex items-center justify-between">
          <div>
            <h1 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-white/90">
              Wealth Management
            </h1>
            <p className="text-sm text-white/35 mt-1">
              Track, manage, and grow your on-chain portfolio
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00D4AA]/10 border border-[#00D4AA]/20">
              <div className="w-2 h-2 rounded-full bg-[#00D4AA] animate-pulse" />
              <span className="text-xs font-medium text-[#00D4AA]">Live</span>
            </div>
          </div>
        </motion.div>

        {/* Wallet Connection */}
        <WalletConnection />

        {/* Portfolio Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {portfolioStats.map((stat, i) => (
            <PortfolioCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>

        {/* Asset Allocation + Positions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DonutChart />
          <PositionsTable />
        </div>

        {/* Transaction History + Yield */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TransactionHistory />
          <YieldOpportunities />
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
