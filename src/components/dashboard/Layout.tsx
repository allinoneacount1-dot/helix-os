"use client";

import { useState, useEffect, useCallback, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Bot, Brain, BarChart3, Rocket,
  Menu, X, Search, Bell, ChevronDown, Zap, Settings, LogOut,
  Plus, TrendingUp, TrendingDown, Activity, Clock,
} from "lucide-react";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} />, href: "/dashboard" },
  { id: "agents", label: "Agents", icon: <Bot size={18} />, href: "/agents" },
  { id: "knowledge", label: "Knowledge", icon: <Brain size={18} />, href: "/knowledge" },
  { id: "wealth", label: "Wealth", icon: <BarChart3 size={18} />, href: "/wealth" },
  { id: "studio", label: "Studio", icon: <Rocket size={18} />, href: "/studio" },
];

interface DashboardLayoutProps {
  children: ReactNode;
  activePage?: string;
}

export function DashboardLayout({ children, activePage = "dashboard" }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const handleNav = useCallback((href: string) => {
    setMobileOpen(false);
    window.location.href = href;
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#050816] text-white/90">
      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-50 h-full w-64 glass-strong border-r border-white/5 transition-transform duration-300 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } ${mobileOpen ? "translate-x-0" : ""} lg:translate-x-0`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between px-5 h-16 border-b border-white/5">
            <button onClick={() => handleNav("/")} className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#5B8CFF] to-[#7C3AED] flex items-center justify-center">
                <Zap size={16} className="text-white" />
              </div>
              <span className="font-[family-name:var(--font-space-grotesk)] font-bold text-lg tracking-tight">
                HELIX<span className="text-[#5B8CFF]"> OS</span>
              </span>
            </button>
            <button onClick={() => setMobileOpen(false)} className="lg:hidden text-white/40 hover:text-white/70">
              <X size={20} />
            </button>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.href)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                    isActive
                      ? "bg-[#5B8CFF]/10 text-[#5B8CFF] border border-[#5B8CFF]/20"
                      : "text-white/40 hover:text-white/70 hover:bg-white/[0.03]"
                  }`}
                >
                  <span className={isActive ? "text-[#5B8CFF]" : "text-white/30 group-hover:text-white/50"}>
                    {item.icon}
                  </span>
                  {item.label}
                  {isActive && (
                    <motion.div layoutId="sidebar-active" className="ml-auto w-1.5 h-1.5 rounded-full bg-[#5B8CFF]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Bottom */}
          <div className="px-3 py-4 border-t border-white/5 space-y-1">
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/35 hover:text-white/60 hover:bg-white/[0.03] transition-all">
              <Settings size={18} />
              Settings
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/35 hover:text-white/60 hover:bg-white/[0.03] transition-all">
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? "lg:ml-64" : ""}`}>
        {/* Topbar */}
        <header className="sticky top-0 z-30 glass-strong border-b border-white/5">
          <div className="flex items-center justify-between px-4 lg:px-8 h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => { setSidebarOpen(!sidebarOpen); setMobileOpen(!mobileOpen); }}
                className="text-white/40 hover:text-white/70 transition-colors"
              >
                <Menu size={20} />
              </button>

              {/* Search */}
              <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/5 w-72">
                <Search size={14} className="text-white/25" />
                <input
                  type="text"
                  placeholder="Search anything..."
                  className="flex-1 bg-transparent text-sm text-white/70 placeholder:text-white/20 outline-none"
                />
                <kbd className="text-[10px] font-mono text-white/15 px-1.5 py-0.5 rounded bg-white/5 border border-white/10">⌘K</kbd>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Notifications */}
              <button className="relative w-9 h-9 rounded-xl bg-white/[0.04] border border-white/5 flex items-center justify-center text-white/35 hover:text-white/60 transition-colors">
                <Bell size={16} />
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#EF4444] text-[9px] font-bold flex items-center justify-center text-white">3</span>
              </button>

              {/* Profile */}
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-white/[0.04] transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#5B8CFF] to-[#7C3AED] flex items-center justify-center text-xs font-bold">
                    HM
                  </div>
                  <span className="hidden md:block text-sm text-white/60">Hermes</span>
                  <ChevronDown size={14} className="text-white/25" />
                </button>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 5, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.95 }}
                      className="absolute right-0 top-full mt-2 w-56 glass-strong rounded-xl border border-white/10 overflow-hidden"
                    >
                      <div className="p-3 border-b border-white/5">
                        <div className="text-sm font-medium">Hermes AI</div>
                        <div className="text-xs text-white/30">hermes@helixos.ai</div>
                      </div>
                      <div className="p-1">
                        {["Profile", "Settings", "API Keys"].map((item) => (
                          <button key={item} className="w-full text-left px-3 py-2 text-sm text-white/50 hover:text-white/80 hover:bg-white/[0.04] rounded-lg transition-colors">
                            {item}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
