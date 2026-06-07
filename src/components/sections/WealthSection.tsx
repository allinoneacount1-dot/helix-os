"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { PieChart, Shield, TrendingUp, Eye, ArrowUpRight, ArrowDownRight, Activity } from "lucide-react";
import { StaggerContainer, StaggerItem, MotionSection } from "@/components/motion";

const allocationData = [
  { label: "SOL", value: 35, color: "#9945FF" },
  { label: "ETH", value: 25, color: "#627EEA" },
  { label: "BTC", value: 20, color: "#F7931A" },
  { label: "USDC", value: 12, color: "#2775CA" },
  { label: "Other", value: 8, color: "#5B8CFF" },
];

const sentimentData = [
  { label: "Bullish", value: 68, color: "#00D4AA" },
  { label: "Neutral", value: 22, color: "#F59E0B" },
  { label: "Bearish", value: 10, color: "#EF4444" },
];

const whaleAlerts = [
  { action: "Bought", amount: "12,450 SOL", whale: "0x7a3...f2d1", time: "3m ago" },
  { action: "Sold", amount: "890 ETH", whale: "0x9b2...a4e3", time: "7m ago" },
  { action: "Bought", amount: "2.1M USDC", whale: "0x3c1...b8f7", time: "12m ago" },
];

const opportunities = [
  { name: "SOL/USDC LP", apy: "24.5%", risk: "Low", chain: "Solana" },
  { name: "ETH Lending", apy: "8.2%", risk: "Low", chain: "Ethereum" },
  { name: "New Token Launch", apy: "N/A", risk: "High", chain: "Base" },
];

function DonutChart({ data, size = 120 }: { data: typeof allocationData; size?: number }) {
  const radius = size / 2 - 8;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {data.map((item, i) => {
        const dashLength = (item.value / 100) * circumference;
        const dashOffset = -offset;
        offset += dashLength;
        return (
          <motion.circle
            key={i}
            cx={size / 2} cy={size / 2} r={radius}
            fill="none" stroke={item.color} strokeWidth="6"
            strokeDasharray={`${dashLength} ${circumference - dashLength}`}
            strokeDashoffset={dashOffset}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{ opacity: 0.8, pathLength: 1 }}
            transition={{ duration: 1, delay: i * 0.15 }}
          />
        );
      })}
      <text x={size / 2} y={size / 2} textAnchor="middle" className="fill-white/50 text-xs font-mono">Allocation</text>
    </svg>
  );
}

export function WealthSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState<"portfolio" | "market" | "whales">("portfolio");

  return (
    <section id="wealth" className="relative py-32 md:py-40" ref={ref}>
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <MotionSection className="text-center mb-16">
          <div className="section-label mb-6">// WEALTH INTELLIGENCE</div>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
            Autonomous <span className="text-gradient">Capital Intelligence</span>
          </h2>
          <p className="text-white/40 text-lg max-w-2xl mx-auto">
            Real-time portfolio tracking, market sentiment, whale monitoring, and opportunity detection.
          </p>
        </MotionSection>

        <MotionSection delay={0.2}>
          <div className="glass rounded-2xl overflow-hidden">
            <div className="flex border-b border-white/5">
              {([
                { id: "portfolio" as const, label: "Portfolio", icon: <PieChart size={14} /> },
                { id: "market" as const, label: "Market", icon: <Activity size={14} /> },
                { id: "whales" as const, label: "Whales", icon: <Eye size={14} /> },
              ]).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.id ? "text-[#5B8CFF]" : "text-white/25 hover:text-white/50"
                  }`}
                >
                  {tab.icon}{tab.label}
                  {activeTab === tab.id && (
                    <motion.div layoutId="wealth-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5B8CFF]" transition={{ type: "spring", stiffness: 300, damping: 30 }} />
                  )}
                </button>
              ))}
            </div>

            <div className="p-6">
              {activeTab === "portfolio" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center">
                    <DonutChart data={allocationData} />
                    <div className="flex flex-wrap gap-3 mt-4 justify-center">
                      {allocationData.map((item, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-xs text-white/35">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                          {item.label} {item.value}%
                        </div>
                      ))}
                    </div>
                  </motion.div>
                  <StaggerContainer className="space-y-4">
                    <StaggerItem>
                      <motion.div whileHover={{ scale: 1.02 }} className="glass rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2"><Shield size={14} className="text-[#00D4AA]" /><span className="text-sm font-medium">Risk Score</span></div>
                        <div className="text-3xl font-bold font-[family-name:var(--font-space-grotesk)] text-[#00D4AA]">34<span className="text-lg text-white/25">/100</span></div>
                        <div className="text-xs text-white/25 mt-1">Low Risk Profile</div>
                      </motion.div>
                    </StaggerItem>
                    <StaggerItem>
                      <motion.div whileHover={{ scale: 1.02 }} className="glass rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2"><TrendingUp size={14} className="text-[#5B8CFF]" /><span className="text-sm font-medium">30-Day Return</span></div>
                        <div className="text-3xl font-bold font-[family-name:var(--font-space-grotesk)] text-[#00D4AA]">+18.4%</div>
                        <div className="text-xs text-white/25 mt-1">Outperforming BTC by 6.2%</div>
                      </motion.div>
                    </StaggerItem>
                  </StaggerContainer>
                </div>
              )}

              {activeTab === "market" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <div>
                    <div className="text-sm font-medium mb-4">Market Sentiment</div>
                    <div className="flex gap-4">
                      {sentimentData.map((item, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="flex-1 glass rounded-xl p-4 text-center">
                          <div className="text-2xl font-bold font-[family-name:var(--font-space-grotesk)]" style={{ color: item.color }}>{item.value}%</div>
                          <div className="text-xs text-white/25 mt-1">{item.label}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium mb-4">Opportunity Radar</div>
                    <StaggerContainer className="space-y-2">
                      {opportunities.map((opp, i) => (
                        <StaggerItem key={i}>
                          <motion.div whileHover={{ x: 4 }} className="flex items-center justify-between glass rounded-xl p-4 cursor-pointer">
                            <div><div className="text-sm font-medium">{opp.name}</div><div className="text-xs text-white/25">{opp.chain}</div></div>
                            <div className="flex items-center gap-4">
                              <div className="text-right"><div className="text-sm font-mono">{opp.apy}</div><div className={`text-[10px] ${opp.risk === "Low" ? "text-[#00D4AA]" : "text-[#EF4444]"}`}>{opp.risk} Risk</div></div>
                              <ArrowUpRight size={16} className="text-white/15" />
                            </div>
                          </motion.div>
                        </StaggerItem>
                      ))}
                    </StaggerContainer>
                  </div>
                </motion.div>
              )}

              {activeTab === "whales" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="text-sm font-medium mb-4 flex items-center gap-2"><Eye size={14} className="text-[#F59E0B]" />Whale Activity Monitor</div>
                  <StaggerContainer className="space-y-2">
                    {whaleAlerts.map((alert, i) => (
                      <StaggerItem key={i}>
                        <motion.div whileHover={{ x: 4 }} className="flex items-center justify-between glass rounded-xl p-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${alert.action === "Bought" ? "bg-[#00D4AA]/10 text-[#00D4AA]" : "bg-[#EF4444]/10 text-[#EF4444]"}`}>
                              {alert.action === "Bought" ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                            </div>
                            <div><div className="text-sm"><span className={alert.action === "Bought" ? "text-[#00D4AA]" : "text-[#EF4444]"}>{alert.action}</span>{" "}{alert.amount}</div><div className="text-xs text-white/25 font-mono">{alert.whale}</div></div>
                          </div>
                          <div className="text-xs text-white/15">{alert.time}</div>
                        </motion.div>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </motion.div>
              )}
            </div>
          </div>
        </MotionSection>
      </div>
    </section>
  );
}
