"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  Activity,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Zap,
} from "lucide-react";

const agentActivities = [
  { agent: "Research Agent", action: "Analyzed 12 market reports", time: "2m ago", status: "success" },
  { agent: "Builder Agent", action: "Deployed smart contract to Base", time: "5m ago", status: "success" },
  { agent: "Trading Agent", action: "Executed SOL/USDC swap", time: "8m ago", status: "success" },
  { agent: "Design Agent", action: "Generated 3 UI variants", time: "12m ago", status: "processing" },
  { agent: "CEO Agent", action: "Prioritized Q3 roadmap", time: "15m ago", status: "success" },
];

const portfolioMetrics = [
  { label: "Total Value", value: "$284,592", change: "+12.4%", up: true },
  { label: "Day P&L", value: "+$3,241", change: "+1.15%", up: true },
  { label: "Open Positions", value: "7", change: "3 chains", up: true },
  { label: "Risk Score", value: "34/100", change: "Low", up: true },
];

const workflows = [
  { name: "Market Analysis", progress: 100, status: "Complete" },
  { name: "Portfolio Rebalance", progress: 72, status: "Running" },
  { name: "Content Generation", progress: 45, status: "Running" },
  { name: "Code Review", progress: 100, status: "Complete" },
];

function MiniChart({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  return (
    <div className="flex items-end gap-0.5 h-10">
      {data.map((val, i) => (
        <div
          key={i}
          className="w-1 rounded-full transition-all duration-300"
          style={{
            height: `${((val - min) / range) * 100}%`,
            backgroundColor: color,
            opacity: 0.3 + (i / data.length) * 0.7,
          }}
        />
      ))}
    </div>
  );
}

export function LivePreviewSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [liveTime, setLiveTime] = useState("00:00:00");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setLiveTime(now.toLocaleTimeString("en-US", { hour12: false }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const chartData = [20, 35, 28, 45, 38, 52, 48, 65, 58, 72, 68, 80, 75, 88, 82, 95];

  return (
    <section id="preview" className="relative py-32 md:py-40" ref={ref}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="section-label mb-6">// LIVE SYSTEM PREVIEW</div>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
            Your Intelligence{" "}
            <span className="text-gradient">Command Center</span>
          </h2>
          <p className="text-white/40 text-lg max-w-2xl mx-auto">
            Real-time dashboard. Live agent activity. Autonomous execution.
          </p>
        </motion.div>

        {/* Dashboard mock */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="glass rounded-2xl overflow-hidden"
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-6 py-3 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
                <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
                <div className="w-3 h-3 rounded-full bg-[#00D4AA]" />
              </div>
              <span className="text-xs font-mono text-white/30 ml-2">helix-dashboard</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-xs text-[#00D4AA]">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00D4AA] animate-pulse" />
                LIVE
              </div>
              <span className="text-xs font-mono text-white/30">{liveTime}</span>
            </div>
          </div>

          <div className="p-6">
            {/* Portfolio metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {portfolioMetrics.map((m, i) => (
                <div key={i} className="glass rounded-xl p-4">
                  <div className="text-xs text-white/30 mb-1">{m.label}</div>
                  <div className="text-xl font-bold font-[family-name:var(--font-space-grotesk)]">
                    {m.value}
                  </div>
                  <div className={`text-xs mt-1 flex items-center gap-1 ${m.up ? "text-[#00D4AA]" : "text-[#EF4444]"}`}>
                    {m.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                    {m.change}
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Chart */}
              <div className="lg:col-span-2 glass rounded-xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm font-medium">Portfolio Performance</div>
                  <div className="flex items-center gap-2">
                    {["1H", "1D", "1W", "1M"].map((tf) => (
                      <button
                        key={tf}
                        className="px-2 py-1 text-[10px] font-mono rounded bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        {tf}
                      </button>
                    ))}
                  </div>
                </div>
                <MiniChart data={chartData} color="#5B8CFF" />
                <div className="flex items-center justify-between mt-3 text-[10px] text-white/20">
                  <span>00:00</span>
                  <span>06:00</span>
                  <span>12:00</span>
                  <span>18:00</span>
                  <span>Now</span>
                </div>
              </div>

              {/* Agent activity */}
              <div className="glass rounded-xl p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Activity size={14} className="text-[#5B8CFF]" />
                  <span className="text-sm font-medium">Agent Activity</span>
                </div>
                <div className="space-y-3 max-h-40 overflow-y-auto">
                  {agentActivities.map((a, i) => (
                    <div key={i} className="flex items-start gap-2">
                      {a.status === "success" ? (
                        <CheckCircle2 size={12} className="text-[#00D4AA] mt-0.5 shrink-0" />
                      ) : (
                        <div className="w-3 h-3 rounded-full border border-[#F59E0B] border-t-transparent animate-spin mt-0.5 shrink-0" />
                      )}
                      <div className="min-w-0">
                        <div className="text-xs text-white/60 truncate">{a.agent}</div>
                        <div className="text-[10px] text-white/30">{a.action}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Workflows */}
            <div className="mt-4 glass rounded-xl p-4">
              <div className="flex items-center gap-2 mb-4">
                <Zap size={14} className="text-[#7C3AED]" />
                <span className="text-sm font-medium">Active Workflows</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {workflows.map((w, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-white/60">{w.name}</span>
                        <span className="text-[10px] font-mono text-white/30">{w.progress}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${w.progress}%` } : {}}
                          transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                          className="h-full rounded-full"
                          style={{
                            backgroundColor: w.progress === 100 ? "#00D4AA" : "#5B8CFF",
                          }}
                        />
                      </div>
                    </div>
                    <span className={`text-[10px] font-mono ${w.status === "Complete" ? "text-[#00D4AA]" : "text-[#F59E0B]"}`}>
                      {w.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
