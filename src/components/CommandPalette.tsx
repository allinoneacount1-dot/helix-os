"use client";

import { useState, useEffect, useCallback, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Zap,
  Shield,
  BarChart3,
  Rocket,
  Brain,
  Terminal,
  X,
  ArrowRight,
  Command,
} from "lucide-react";

interface CommandItem {
  id: string;
  label: string;
  icon: ReactNode;
  action: () => void;
  section: string;
}

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
    setQuery("");
  }, []);

  const commands: CommandItem[] = [
    { id: "hero", label: "Hero — Intelligence Command Center", icon: <Zap size={16} />, action: () => scrollTo("hero"), section: "Navigate" },
    { id: "problem", label: "Problem Statement", icon: <Shield size={16} />, action: () => scrollTo("problem"), section: "Navigate" },
    { id: "ecosystem", label: "Helix Ecosystem", icon: <Brain size={16} />, action: () => scrollTo("ecosystem"), section: "Navigate" },
    { id: "preview", label: "Live System Preview", icon: <BarChart3 size={16} />, action: () => scrollTo("preview"), section: "Navigate" },
    { id: "agents", label: "Agent System", icon: <Terminal size={16} />, action: () => scrollTo("agents"), section: "Navigate" },
    { id: "wealth", label: "Wealth Intelligence", icon: <BarChart3 size={16} />, action: () => scrollTo("wealth"), section: "Navigate" },
    { id: "studio", label: "Startup Studio", icon: <Rocket size={16} />, action: () => scrollTo("studio"), section: "Navigate" },
    { id: "knowledge", label: "Knowledge Vault", icon: <Brain size={16} />, action: () => scrollTo("knowledge"), section: "Navigate" },
    { id: "design", label: "Design Godmode", icon: <Zap size={16} />, action: () => scrollTo("design"), section: "Navigate" },
    { id: "stack", label: "Sovereign Stack", icon: <Shield size={16} />, action: () => scrollTo("stack"), section: "Navigate" },
    { id: "pricing", label: "Pricing", icon: <BarChart3 size={16} />, action: () => scrollTo("pricing"), section: "Navigate" },
    { id: "cta", label: "Launch Helix OS", icon: <Rocket size={16} />, action: () => scrollTo("cta"), section: "Navigate" },
  ];

  const filtered = commands.filter(
    (c) =>
      c.label.toLowerCase().includes(query.toLowerCase()) ||
      c.section.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        setQuery("");
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [isOpen]);

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => { setIsOpen(true); setQuery(""); }}
        className="fixed bottom-6 right-6 z-50 glass rounded-xl px-4 py-3 flex items-center gap-2 text-sm text-white/60 hover:text-white/90 hover:border-white/20 transition-all duration-300 group"
      >
        <Command size={14} />
        <span className="hidden sm:inline">Search</span>
        <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-white/40">
          ⌘K
        </kbd>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
              onClick={() => { setIsOpen(false); setQuery(""); }}
            />

            {/* Palette */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-[20%] left-1/2 -translate-x-1/2 z-[70] w-full max-w-lg glass-strong rounded-2xl overflow-hidden shadow-2xl shadow-black/50"
            >
              {/* Search input */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
                <Search size={18} className="text-white/40 shrink-0" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search sections..."
                  className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-white/30"
                  autoFocus
                />
                <button
                  onClick={() => { setIsOpen(false); setQuery(""); }}
                  className="text-white/40 hover:text-white/80 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Results */}
              <div className="max-h-80 overflow-y-auto py-2">
                {filtered.length === 0 ? (
                  <div className="px-4 py-8 text-center text-white/30 text-sm">
                    No results found
                  </div>
                ) : (
                  filtered.map((cmd) => (
                    <button
                      key={cmd.id}
                      onClick={cmd.action}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-white/5 transition-colors group"
                    >
                      <span className="text-white/40 group-hover:text-[#5B8CFF] transition-colors">
                        {cmd.icon}
                      </span>
                      <span className="text-sm text-white/70 group-hover:text-white transition-colors flex-1">
                        {cmd.label}
                      </span>
                      <ArrowRight size={14} className="text-white/20 group-hover:text-white/50 transition-colors" />
                    </button>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-2 border-t border-white/5 flex items-center gap-4 text-[10px] text-white/30">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
                <span>ESC Close</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
