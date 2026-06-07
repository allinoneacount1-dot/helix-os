"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Upload, Brain, Database, Clock, HardDrive,
  FileText, Link, X, Filter, ChevronDown, Tag,
  File, BookOpen, Sparkles, Eye, MoreHorizontal,
  Plus, Layers, Zap, ArrowUpRight, Check, AlertCircle,
} from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/Layout";

/* ═══════════════════════════════════════════════════════════════
   MOCK DATA
   ═══════════════════════════════════════════════════════════════ */

const collections = [
  {
    id: "ai-agents",
    name: "AI Agents",
    points: 847,
    color: "#5B8CFF",
    updated: "2 min ago",
    documents: 34,
  },
  {
    id: "defi-protocols",
    name: "DeFi Protocols",
    points: 612,
    color: "#7C3AED",
    updated: "15 min ago",
    documents: 28,
  },
  {
    id: "design-systems",
    name: "Design Systems",
    points: 423,
    color: "#00D4AA",
    updated: "1 hr ago",
    documents: 19,
  },
  {
    id: "web3-infra",
    name: "Web3 Infrastructure",
    points: 389,
    color: "#F59E0B",
    updated: "3 hr ago",
    documents: 22,
  },
  {
    id: "market-research",
    name: "Market Research",
    points: 264,
    color: "#EF4444",
    updated: "6 hr ago",
    documents: 15,
  },
  {
    id: "legal-compliance",
    name: "Legal & Compliance",
    points: 178,
    color: "#EC4899",
    updated: "1 day ago",
    documents: 11,
  },
];

const recentDocuments = [
  { id: 1, name: "Agent Orchestration v3.pdf", type: "PDF", collection: "AI Agents", size: "2.4 MB", uploaded: "2 min ago", status: "indexed" },
  { id: 2, name: "DeFi Yield Strategies.md", type: "MD", collection: "DeFi Protocols", size: "184 KB", uploaded: "15 min ago", status: "indexed" },
  { id: 3, name: "Design Token System.txt", type: "TXT", collection: "Design Systems", size: "56 KB", uploaded: "1 hr ago", status: "processing" },
  { id: 4, name: "https://docs.ethereum.org", type: "URL", collection: "Web3 Infrastructure", size: "—", uploaded: "3 hr ago", status: "indexed" },
  { id: 5, name: "Q2 Market Analysis.pdf", type: "PDF", collection: "Market Research", size: "5.1 MB", uploaded: "6 hr ago", status: "indexed" },
  { id: 6, name: "GDPR Compliance Checklist.pdf", type: "PDF", collection: "Legal & Compliance", size: "890 KB", uploaded: "1 day ago", status: "failed" },
  { id: 7, name: "RAG Optimization Guide.md", type: "MD", collection: "AI Agents", size: "312 KB", uploaded: "1 day ago", status: "indexed" },
  { id: 8, name: "Smart Contract Patterns.txt", type: "TXT", collection: "Web3 Infrastructure", size: "78 KB", uploaded: "2 days ago", status: "indexed" },
];

const graphNodes = [
  { id: "ai", label: "AI Agents", x: 20, y: 25, color: "#5B8CFF", size: 18, connections: ["rag", "patterns", "knowledge"] },
  { id: "rag", label: "RAG", x: 50, y: 15, color: "#7C3AED", size: 14, connections: ["ai", "knowledge"] },
  { id: "patterns", label: "Patterns", x: 35, y: 50, color: "#00D4AA", size: 12, connections: ["ai", "design"] },
  { id: "knowledge", label: "Knowledge", x: 70, y: 35, color: "#5B8CFF", size: 16, connections: ["ai", "rag", "insights", "web3"] },
  { id: "insights", label: "Insights", x: 85, y: 55, color: "#F59E0B", size: 10, connections: ["knowledge", "market"] },
  { id: "design", label: "Design", x: 25, y: 72, color: "#00D4AA", size: 12, connections: ["patterns"] },
  { id: "web3", label: "Web3", x: 60, y: 70, color: "#7C3AED", size: 14, connections: ["knowledge", "defi"] },
  { id: "defi", label: "DeFi", x: 45, y: 85, color: "#EF4444", size: 11, connections: ["web3"] },
  { id: "market", label: "Market", x: 90, y: 78, color: "#EC4899", size: 9, connections: ["insights"] },
  { id: "legal", label: "Legal", x: 10, y: 50, color: "#EC4899", size: 8, connections: ["knowledge"] },
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

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const cardHover = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.02,
    y: -4,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════ */

export default function KnowledgePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [docFilter, setDocFilter] = useState("");
  const [uploadOpen, setUploadOpen] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [graphPulse, setGraphPulse] = useState(0);

  /* Upload modal state */
  const [uploadFileType, setUploadFileType] = useState<"PDF" | "TXT" | "MD" | "URL">("PDF");
  const [uploadCollection, setUploadCollection] = useState("ai-agents");
  const [uploadTags, setUploadTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadDone, setUploadDone] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /* Graph pulse animation */
  useEffect(() => {
    const timer = setInterval(() => setGraphPulse((p) => (p + 1) % graphNodes.length), 2500);
    return () => clearInterval(timer);
  }, []);

  /* Stats */
  const totalPoints = collections.reduce((s, c) => s + c.points, 0);
  const totalCollections = collections.length;
  const totalStorage = "1.2 GB";

  /* Filtered documents */
  const filteredDocs = recentDocuments.filter((doc) => {
    const matchesSearch = !docFilter ||
      doc.name.toLowerCase().includes(docFilter.toLowerCase()) ||
      doc.collection.toLowerCase().includes(docFilter.toLowerCase());
    const matchesCollection = !selectedCollection || doc.collection === selectedCollection;
    return matchesSearch && matchesCollection;
  });

  /* Tag handling */
  const addTag = useCallback(() => {
    const t = tagInput.trim();
    if (t && !uploadTags.includes(t)) {
      setUploadTags((prev) => [...prev, t]);
      setTagInput("");
    }
  }, [tagInput, uploadTags]);

  const removeTag = (tag: string) => setUploadTags((prev) => prev.filter((t) => t !== tag));

  /* Upload simulation */
  const handleUpload = () => {
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setUploadDone(true);
      setTimeout(() => {
        setUploadDone(false);
        setUploadOpen(false);
        setUploadTags([]);
      }, 1500);
    }, 2000);
  };

  /* Status badge */
  const statusBadge = (status: string) => {
    switch (status) {
      case "indexed":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#00D4AA]/10 text-[#00D4AA] border border-[#00D4AA]/20">
            <Check size={10} /> Indexed
          </span>
        );
      case "processing":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/20">
            <Sparkles size={10} className="animate-spin" /> Processing
          </span>
        );
      case "failed":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#EF4444]/10 text-[#EF4444] border border-[#EF4444]/20">
            <AlertCircle size={10} /> Failed
          </span>
        );
      default:
        return null;
    }
  };

  /* File type icon */
  const fileTypeIcon = (type: string) => {
    switch (type) {
      case "PDF": return <FileText size={14} className="text-[#EF4444]" />;
      case "MD": return <File size={14} className="text-[#5B8CFF]" />;
      case "TXT": return <File size={14} className="text-white/40" />;
      case "URL": return <Link size={14} className="text-[#00D4AA]" />;
      default: return <File size={14} className="text-white/40" />;
    }
  };

  return (
    <DashboardLayout activePage="knowledge">
      {/* Background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute w-[600px] h-[600px] rounded-full bg-[#5B8CFF]/[0.04] blur-[120px] top-[-10%] left-[-5%]" />
        <div className="absolute w-[500px] h-[500px] rounded-full bg-[#7C3AED]/[0.04] blur-[120px] bottom-[-10%] right-[-5%]" />
        <div className="absolute w-[400px] h-[400px] rounded-full bg-[#00D4AA]/[0.03] blur-[100px] top-[40%] left-[50%]" />
      </div>

      <div className="relative z-10 space-y-8">
        {/* ═══ HEADER ═══ */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div>
            <h1 className="font-[family-name:var(--font-space-grotesk)] text-2xl md:text-3xl font-bold">
              Knowledge <span className="text-gradient">Base</span>
            </h1>
            <p className="text-white/30 text-sm mt-1">
              Manage, search, and explore your intelligence galaxy
            </p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Search */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.06] flex-1 sm:w-72 group focus-within:border-[#5B8CFF]/30 transition-colors">
              <Search size={15} className="text-white/20 group-focus-within:text-[#5B8CFF]/50 transition-colors" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search knowledge..."
                className="flex-1 bg-transparent text-sm text-white/70 placeholder:text-white/15 outline-none"
              />
              <kbd className="hidden sm:inline text-[10px] font-mono text-white/10 px-1.5 py-0.5 rounded bg-white/5 border border-white/10">⌘K</kbd>
            </div>
            {/* Upload button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setUploadOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#5B8CFF] to-[#7C3AFF] text-white text-sm font-medium shadow-lg shadow-[#5B8CFF]/20 hover:shadow-[#5B8CFF]/30 transition-shadow whitespace-nowrap"
            >
              <Upload size={15} />
              <span className="hidden sm:inline">Upload</span>
            </motion.button>
          </div>
        </motion.div>

        {/* ═══ STATS ROW ═══ */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {[
            { label: "Total Points", value: totalPoints.toLocaleString(), icon: <Brain size={18} />, color: "#5B8CFF", change: "+12%" },
            { label: "Collections", value: totalCollections.toString(), icon: <Layers size={18} />, color: "#7C3AED", change: "+2" },
            { label: "Last Indexed", value: "2 min ago", icon: <Clock size={18} />, color: "#00D4AA", change: "Live" },
            { label: "Storage Used", value: totalStorage, icon: <HardDrive size={18} />, color: "#F59E0B", change: "68%" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
              className="glass rounded-2xl p-5 relative overflow-hidden group cursor-default"
            >
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-[0.06] blur-2xl transition-opacity group-hover:opacity-[0.12]"
                style={{ background: stat.color }} />
              <div className="flex items-start justify-between mb-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: `${stat.color}15`, color: stat.color }}>
                  {stat.icon}
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full"
                  style={{ background: `${stat.color}10`, color: stat.color }}>
                  {stat.change}
                </span>
              </div>
              <div className="text-xl md:text-2xl font-bold font-[family-name:var(--font-space-grotesk)] text-white/90">
                {stat.value}
              </div>
              <div className="text-xs text-white/25 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* ═══ COLLECTIONS GRID ═══ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold text-white/80">
              Collections
            </h2>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-[#5B8CFF] bg-[#5B8CFF]/10 border border-[#5B8CFF]/20 hover:bg-[#5B8CFF]/15 transition-colors"
            >
              <Plus size={12} /> New
            </motion.button>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {collections.map((col) => (
              <motion.div
                key={col.id}
                variants={itemVariants}
                whileHover="hover"
                initial="rest"
                animate="rest"
                onClick={() => setSelectedCollection(selectedCollection === col.id ? null : col.id)}
                className={`glass rounded-2xl p-5 relative overflow-hidden cursor-pointer group transition-all duration-300 ${
                  selectedCollection === col.id ? "ring-1" : ""
                }`}
                style={{
                  ...(selectedCollection === col.id ? { ringColor: `${col.color}40`, borderColor: `${col.color}30` } : {}),
                }}
              >
                {/* Glow */}
                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-[0.08] group-hover:opacity-[0.18] transition-opacity duration-500"
                  style={{ background: col.color }} />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: `${col.color}15` }}>
                      <Database size={18} style={{ color: col.color }} />
                    </div>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="w-2 h-2 rounded-full"
                      style={{ background: col.color, boxShadow: `0 0 8px ${col.color}60` }}
                    />
                  </div>

                  <h3 className="font-[family-name:var(--font-space-grotesk)] font-semibold text-white/85 mb-1 group-hover:text-white transition-colors">
                    {col.name}
                  </h3>

                  <div className="flex items-center gap-3 text-xs text-white/25 mb-4">
                    <span className="flex items-center gap-1">
                      <Sparkles size={10} style={{ color: col.color }} />
                      {col.points.toLocaleString()} points
                    </span>
                    <span>·</span>
                    <span>{col.documents} docs</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-white/20 flex items-center gap-1">
                      <Clock size={10} /> {col.updated}
                    </span>
                    <motion.div
                      whileHover={{ x: 2 }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ArrowUpRight size={14} style={{ color: col.color }} />
                    </motion.div>
                  </div>
                </div>

                {/* Bottom accent bar */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, transparent, ${col.color}60, transparent)` }} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* ═══ BOTTOM SECTION: DOCUMENTS + GRAPH ═══ */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* ═══ RECENT DOCUMENTS ═══ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="lg:col-span-3 glass rounded-2xl overflow-hidden"
          >
            <div className="p-5 border-b border-white/5">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-[family-name:var(--font-space-grotesk)] text-base font-semibold text-white/80 flex items-center gap-2">
                  <BookOpen size={16} className="text-[#5B8CFF]" />
                  Recent Documents
                </h2>
                <span className="text-[10px] font-mono text-white/20">{filteredDocs.length} items</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] flex-1">
                  <Filter size={12} className="text-white/15" />
                  <input
                    type="text"
                    value={docFilter}
                    onChange={(e) => setDocFilter(e.target.value)}
                    placeholder="Filter documents..."
                    className="flex-1 bg-transparent text-xs text-white/60 placeholder:text-white/15 outline-none"
                  />
                </div>
                {selectedCollection && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={() => setSelectedCollection(null)}
                    className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-[10px] font-mono bg-[#5B8CFF]/10 text-[#5B8CFF] border border-[#5B8CFF]/20 hover:bg-[#5B8CFF]/15 transition-colors whitespace-nowrap"
                  >
                    {collections.find((c) => c.id === selectedCollection)?.name}
                    <X size={10} />
                  </motion.button>
                )}
              </div>
            </div>

            <div className="divide-y divide-white/[0.03] max-h-[420px] overflow-y-auto">
              <AnimatePresence mode="popLayout">
                {filteredDocs.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-8 text-center text-white/20 text-sm"
                  >
                    No documents match your filter.
                  </motion.div>
                ) : (
                  filteredDocs.map((doc) => (
                    <motion.div
                      key={doc.id}
                      layout
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      whileHover={{ backgroundColor: "rgba(255,255,255,0.015)" }}
                      className="flex items-center gap-4 px-5 py-3.5 group cursor-pointer transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.05] flex items-center justify-center shrink-0">
                        {fileTypeIcon(doc.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-white/60 group-hover:text-white/80 transition-colors truncate">
                          {doc.name}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[10px] font-mono text-white/15">{doc.type}</span>
                          <span className="text-white/10">·</span>
                          <span className="text-[10px] text-white/15">{doc.size}</span>
                          <span className="text-white/10">·</span>
                          <span className="text-[10px] text-white/15">{doc.uploaded}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {statusBadge(doc.status)}
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                            className="w-7 h-7 rounded-lg bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-white/25 hover:text-white/50 transition-colors">
                            <Eye size={12} />
                          </motion.button>
                          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                            className="w-7 h-7 rounded-lg bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-white/25 hover:text-white/50 transition-colors">
                            <MoreHorizontal size={12} />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* ═══ KNOWLEDGE GRAPH ═══ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="lg:col-span-2 glass rounded-2xl overflow-hidden flex flex-col"
          >
            <div className="p-5 border-b border-white/5">
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-base font-semibold text-white/80 flex items-center gap-2">
                <Zap size={16} className="text-[#00D4AA]" />
                Knowledge Graph
              </h2>
              <p className="text-[10px] font-mono text-white/20 mt-1">
                {graphNodes.length} nodes · {graphNodes.reduce((s, n) => s + n.connections.length, 0)} connections
              </p>
            </div>

            <div className="relative flex-1 min-h-[350px] p-4">
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
                {/* Edges */}
                {graphNodes.map((node) =>
                  node.connections.map((targetId) => {
                    const target = graphNodes.find((n) => n.id === targetId);
                    if (!target) return null;
                    const isHighlighted = hoveredNode === node.id || hoveredNode === targetId;
                    return (
                      <motion.line
                        key={`${node.id}-${targetId}`}
                        x1={node.x} y1={node.y}
                        x2={target.x} y2={target.y}
                        stroke={isHighlighted ? "rgba(91,140,255,0.3)" : "rgba(255,255,255,0.04)"}
                        strokeWidth={isHighlighted ? "0.4" : "0.2"}
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5, delay: 0.3 }}
                      />
                    );
                  })
                )}
              </svg>

              {/* Nodes */}
              {graphNodes.map((node, i) => {
                const isHovered = hoveredNode === node.id;
                const isConnected = hoveredNode
                  ? graphNodes.find((n) => n.id === hoveredNode)?.connections.includes(node.id)
                  : false;
                const isPulsing = graphPulse === i;

                return (
                  <motion.button
                    key={node.id}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.3 + i * 0.04, type: "spring" as const }}
                    onMouseEnter={() => setHoveredNode(node.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  >
                    <motion.div
                      animate={{
                        scale: isHovered ? 1.4 : isConnected ? 1.2 : 1,
                      }}
                      transition={{ duration: 0.2 }}
                      className="relative"
                    >
                      {/* Pulse ring */}
                      {isPulsing && (
                        <motion.div
                          className="absolute inset-0 rounded-full"
                          style={{ border: `1px solid ${node.color}` }}
                          initial={{ scale: 1, opacity: 0.6 }}
                          animate={{ scale: 2.5, opacity: 0 }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                      )}

                      <div
                        className="rounded-full flex items-center justify-center"
                        style={{
                          width: node.size * 1.6,
                          height: node.size * 1.6,
                          background: isHovered
                            ? `${node.color}30`
                            : isConnected
                            ? `${node.color}20`
                            : `${node.color}10`,
                          border: `1px solid ${isHovered ? node.color : `${node.color}30`}`,
                          boxShadow: isHovered ? `0 0 20px ${node.color}30` : "none",
                        }}
                      >
                        <motion.div
                          className="rounded-full"
                          style={{
                            width: node.size * 0.5,
                            height: node.size * 0.5,
                            background: node.color,
                          }}
                          animate={isPulsing ? { scale: [1, 1.4, 1] } : {}}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                      </div>
                    </motion.div>

                    {/* Label */}
                    <div className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-[8px] font-mono transition-all duration-200 ${
                      isHovered ? "text-white/70 -bottom-5" : "text-white/20 -bottom-4"
                    }`}>
                      {node.label}
                    </div>
                  </motion.button>
                );
              })}

              {/* Hover info */}
              <AnimatePresence>
                {hoveredNode && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute bottom-3 left-3 right-3 glass rounded-xl p-3 z-20"
                  >
                    {(() => {
                      const node = graphNodes.find((n) => n.id === hoveredNode);
                      if (!node) return null;
                      return (
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-medium text-white/80">{node.label}</span>
                            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded"
                              style={{ background: `${node.color}15`, color: node.color }}>
                              {node.connections.length} links
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {node.connections.map((cId) => {
                              const c = graphNodes.find((n) => n.id === cId);
                              return c ? (
                                <span key={cId} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/[0.03] text-white/25">
                                  {c.label}
                                </span>
                              ) : null;
                            })}
                          </div>
                        </div>
                      );
                    })()}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ═══ UPLOAD MODAL ═══ */}
      <AnimatePresence>
        {uploadOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setUploadOpen(false)}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const }}
              className="fixed z-[70] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg"
            >
              <div className="glass-strong rounded-2xl border border-white/10 overflow-hidden shadow-2xl shadow-black/40">
                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b border-white/5">
                  <div>
                    <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold text-white/90">
                      Upload Knowledge
                    </h3>
                    <p className="text-xs text-white/25 mt-0.5">Add documents, text, or URLs to your knowledge base</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setUploadOpen(false)}
                    className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/30 hover:text-white/60 transition-colors"
                  >
                    <X size={16} />
                  </motion.button>
                </div>

                <div className="p-5 space-y-5">
                  {/* Drag & Drop Zone */}
                  <motion.div
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={(e) => { e.preventDefault(); setDragOver(false); }}
                    onClick={() => fileInputRef.current?.click()}
                    animate={{
                      borderColor: dragOver ? "rgba(91,140,255,0.4)" : "rgba(255,255,255,0.06)",
                      background: dragOver ? "rgba(91,140,255,0.05)" : "rgba(255,255,255,0.02)",
                    }}
                    whileHover={{ borderColor: "rgba(91,140,255,0.25)" }}
                    className="relative rounded-xl border-2 border-dashed p-8 text-center cursor-pointer transition-colors group"
                  >
                    <input ref={fileInputRef} type="file" className="hidden" accept=".pdf,.txt,.md" />
                    <motion.div
                      animate={dragOver ? { scale: 1.1, y: -4 } : { scale: 1, y: 0 }}
                      className="flex flex-col items-center gap-3"
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                        dragOver ? "bg-[#5B8CFF]/20" : "bg-white/[0.04]"
                      }`}>
                        <Upload size={20} className={dragOver ? "text-[#5B8CFF]" : "text-white/20"} />
                      </div>
                      <div>
                        <p className="text-sm text-white/50 group-hover:text-white/70 transition-colors">
                          {dragOver ? "Drop files here" : "Drag & drop files here"}
                        </p>
                        <p className="text-[10px] font-mono text-white/15 mt-1">or click to browse</p>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* File Type Selection */}
                  <div>
                    <label className="text-[10px] font-mono text-white/25 uppercase tracking-wider mb-2 block">
                      File Type
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {(["PDF", "TXT", "MD", "URL"] as const).map((type) => (
                        <motion.button
                          key={type}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => setUploadFileType(type)}
                          className={`py-2.5 rounded-xl text-xs font-mono transition-all ${
                            uploadFileType === type
                              ? "bg-[#5B8CFF]/15 text-[#5B8CFF] border border-[#5B8CFF]/30"
                              : "bg-white/[0.03] text-white/30 border border-white/[0.05] hover:bg-white/[0.05]"
                          }`}
                        >
                          {type}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Collection Selector */}
                  <div>
                    <label className="text-[10px] font-mono text-white/25 uppercase tracking-wider mb-2 block">
                      Collection
                    </label>
                    <div className="relative">
                      <select
                        value={uploadCollection}
                        onChange={(e) => setUploadCollection(e.target.value)}
                        className="w-full appearance-none px-3 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white/60 outline-none focus:border-[#5B8CFF]/30 transition-colors cursor-pointer"
                      >
                        {collections.map((c) => (
                          <option key={c.id} value={c.id} className="bg-[#0B1120]">
                            {c.name}
                          </option>
                        ))}
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none" />
                    </div>
                  </div>

                  {/* Tags Input */}
                  <div>
                    <label className="text-[10px] font-mono text-white/25 uppercase tracking-wider mb-2 block">
                      Tags
                    </label>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {uploadTags.map((tag) => (
                        <motion.span
                          key={tag}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-mono bg-[#5B8CFF]/10 text-[#5B8CFF] border border-[#5B8CFF]/20"
                        >
                          <Tag size={8} />
                          {tag}
                          <button onClick={() => removeTag(tag)} className="hover:text-white/60 transition-colors">
                            <X size={10} />
                          </button>
                        </motion.span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") { e.preventDefault(); addTag(); }
                        }}
                        placeholder="Add tag..."
                        className="flex-1 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs text-white/60 placeholder:text-white/15 outline-none focus:border-[#5B8CFF]/30 transition-colors"
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={addTag}
                        className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/25 hover:text-[#5B8CFF] transition-colors"
                      >
                        <Plus size={14} />
                      </motion.button>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 p-5 border-t border-white/5">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setUploadOpen(false)}
                    className="px-4 py-2 rounded-xl text-sm text-white/30 hover:text-white/50 bg-white/[0.03] border border-white/[0.05] transition-colors"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleUpload}
                    disabled={uploading}
                    className="px-5 py-2 rounded-xl text-sm font-medium bg-gradient-to-r from-[#5B8CFF] to-[#7C3AED] text-white shadow-lg shadow-[#5B8CFF]/15 hover:shadow-[#5B8CFF]/25 transition-shadow disabled:opacity-50 flex items-center gap-2"
                  >
                    {uploading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        />
                        Uploading...
                      </>
                    ) : uploadDone ? (
                      <>
                        <Check size={14} />
                        Done!
                      </>
                    ) : (
                      <>
                        <Upload size={14} />
                        Upload
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}
