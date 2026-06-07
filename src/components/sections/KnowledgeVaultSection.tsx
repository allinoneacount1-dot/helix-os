"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Search, BookOpen, Clock, Sparkles, ArrowRight, X } from "lucide-react";
import { StaggerContainer, StaggerItem, MotionSection } from "@/components/motion";

const knowledgeNodes = [
  { id: "ai-agents", label: "AI Agents", category: "System", x: 25, y: 30, connections: ["rag", "patterns"] },
  { id: "rag", label: "RAG System", category: "Infrastructure", x: 55, y: 20, connections: ["knowledge", "ai-agents"] },
  { id: "patterns", label: "Design Patterns", category: "Design", x: 40, y: 55, connections: ["ai-agents", "knowledge"] },
  { id: "knowledge", label: "Knowledge Base", category: "Data", x: 70, y: 45, connections: ["rag", "patterns", "insights"] },
  { id: "insights", label: "Insights", category: "Output", x: 80, y: 70, connections: ["knowledge"] },
  { id: "defi", label: "DeFi Protocols", category: "Finance", x: 20, y: 65, connections: ["patterns"] },
  { id: "web3", label: "Web3 Stack", category: "Infrastructure", x: 60, y: 75, connections: ["knowledge", "defi"] },
];

const searchResults = [
  { title: "Agent Orchestration Patterns", category: "System", snippet: "Multi-agent coordination using shared context and task delegation..." },
  { title: "RAG Retrieval Optimization", category: "Infrastructure", snippet: "Hybrid search combining semantic similarity with keyword matching..." },
  { title: "Design System Architecture", category: "Design", snippet: "Scalable component libraries with token-based theming..." },
  { title: "DeFi Yield Strategies", category: "Finance", snippet: "Automated yield farming across multiple chains..." },
];

export function KnowledgeVaultSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [pulseIndex, setPulseIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setPulseIndex((p) => (p + 1) % knowledgeNodes.length), 2000);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    setTimeout(() => setIsSearching(false), 1500);
  };

  return (
    <section id="knowledge" className="relative py-32 md:py-40" ref={ref}>
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <MotionSection className="text-center mb-16">
          <div className="section-label mb-6">// KNOWLEDGE VAULT</div>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
            Your <span className="text-gradient">Intelligence Galaxy</span>
          </h2>
          <p className="text-white/40 text-lg max-w-2xl mx-auto">
            2,536+ knowledge points across 22 collections. Search, navigate, and extract insights.
          </p>
        </MotionSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <MotionSection direction="left" delay={0.2}>
            <div className="glass rounded-2xl p-6 aspect-square relative overflow-hidden">
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                {knowledgeNodes.map((node) =>
                  node.connections.map((targetId) => {
                    const target = knowledgeNodes.find((n) => n.id === targetId);
                    if (!target) return null;
                    return (
                      <motion.line
                        key={`${node.id}-${targetId}`}
                        x1={node.x} y1={node.y} x2={target.x} y2={target.y}
                        stroke="rgba(91,140,255,0.06)" strokeWidth="0.3"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                      />
                    );
                  })
                )}
              </svg>

              {knowledgeNodes.map((node, i) => (
                <motion.button
                  key={node.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.4 + i * 0.05, type: "spring" }}
                  onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  data-cursor-hover="true"
                >
                  <motion.div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${selectedNode === node.id ? "scale-125" : ""} ${pulseIndex === i ? "animate-pulse" : ""}`}
                    style={{
                      backgroundColor: selectedNode === node.id ? "#5B8CFF25" : "#5B8CFF10",
                      border: `1px solid ${selectedNode === node.id ? "#5B8CFF" : "#5B8CFF30"}`,
                    }}
                    whileHover={{ scale: 1.3 }}
                  >
                    <motion.div
                      className="w-2 h-2 rounded-full bg-[#5B8CFF]"
                      animate={pulseIndex === i ? { scale: [1, 1.5, 1] } : {}}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  </motion.div>
                  <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-mono text-white/25">{node.label}</div>
                </motion.button>
              ))}

              {selectedNode && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="absolute bottom-4 left-4 right-4 glass rounded-xl p-4">
                  {(() => {
                    const node = knowledgeNodes.find((n) => n.id === selectedNode);
                    if (!node) return null;
                    return (
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">{node.label}</span>
                          <button onClick={() => setSelectedNode(null)} className="text-white/25 hover:text-white/50"><X size={14} /></button>
                        </div>
                        <span className="text-[10px] font-mono text-[#5B8CFF]">{node.category}</span>
                        <div className="text-xs text-white/25 mt-1">{node.connections.length} connections</div>
                      </div>
                    );
                  })()}
                </motion.div>
              )}
            </div>
          </MotionSection>

          <MotionSection direction="right" delay={0.3} className="flex flex-col gap-4">
            <div className="glass rounded-xl p-4">
              <div className="flex items-center gap-3">
                <Search size={18} className="text-white/25 shrink-0" />
                <input
                  type="text" value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  placeholder="Search knowledge base..."
                  className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-white/15"
                />
                <motion.button
                  onClick={handleSearch}
                  disabled={isSearching}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-1.5 rounded-lg bg-[#5B8CFF]/10 text-[#5B8CFF] text-xs font-mono hover:bg-[#5B8CFF]/20 transition-colors disabled:opacity-50"
                >
                  {isSearching ? "..." : "SEARCH"}
                </motion.button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Collections", value: "22", icon: <BookOpen size={14} /> },
                { label: "Knowledge Points", value: "2,536+", icon: <Sparkles size={14} /> },
                { label: "Last Updated", value: "Live", icon: <Clock size={14} /> },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="glass rounded-xl p-3 text-center"
                >
                  <div className="text-white/15 mb-1 flex justify-center">{stat.icon}</div>
                  <div className="text-lg font-bold font-[family-name:var(--font-space-grotesk)]">{stat.value}</div>
                  <div className="text-[10px] text-white/15">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <div className="glass rounded-xl p-4 flex-1">
              <div className="text-xs font-mono text-white/25 mb-3">{searchQuery ? "SEARCH RESULTS" : "RECENT INSIGHTS"}</div>
              <StaggerContainer className="space-y-2">
                {(searchQuery ? searchResults.filter((r) =>
                  r.title.toLowerCase().includes(searchQuery.toLowerCase()) || r.snippet.toLowerCase().includes(searchQuery.toLowerCase())
                ) : searchResults).map((result, i) => (
                  <StaggerItem key={i}>
                    <motion.button whileHover={{ x: 4 }} className="w-full text-left p-3 rounded-lg hover:bg-white/[0.02] transition-colors group">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-white/60 group-hover:text-white transition-colors">{result.title}</span>
                        <ArrowRight size={12} className="text-white/10 group-hover:text-white/25 transition-colors" />
                      </div>
                      <div className="text-[10px] font-mono text-[#5B8CFF] mb-1">{result.category}</div>
                      <div className="text-xs text-white/20 line-clamp-1">{result.snippet}</div>
                    </motion.button>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </MotionSection>
        </div>
      </div>
    </section>
  );
}
