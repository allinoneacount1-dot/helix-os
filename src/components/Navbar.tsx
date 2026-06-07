"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Menu,
  X,
  Zap,
  Shield,
  BarChart3,
  Rocket,
  Brain,
  Terminal,
} from "lucide-react";

const navItems = [
  { label: "Ecosystem", href: "#ecosystem", icon: <Brain size={14} /> },
  { label: "Agents", href: "#agents", icon: <Terminal size={14} /> },
  { label: "Wealth", href: "#wealth", icon: <BarChart3 size={14} /> },
  { label: "Studio", href: "#studio", icon: <Rocket size={14} /> },
  { label: "Pricing", href: "#pricing", icon: <Zap size={14} /> },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="fixed top-0 left-0 right-0 z-40 glass-strong"
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNav("#hero")}
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#5B8CFF] to-[#7C3AED] flex items-center justify-center">
              <Zap size={16} className="text-white" />
            </div>
            <span className="font-[family-name:var(--font-space-grotesk)] font-bold text-lg tracking-tight">
              HELIX<span className="text-[#5B8CFF]"> OS</span>
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNav(item.href)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-white/50 hover:text-white/90 hover:bg-white/5 transition-all duration-200"
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => handleNav("#cta")}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#5B8CFF] to-[#7C3AED] text-white text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              <Rocket size={14} />
              Launch Helix
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white/60 hover:text-white transition-colors"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="fixed inset-0 z-30 bg-[#050816]/95 backdrop-blur-xl pt-20 px-6 md:hidden"
        >
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNav(item.href)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/5 transition-all text-left"
              >
                {item.icon}
                {item.label}
              </button>
            ))}
            <button
              onClick={() => handleNav("#cta")}
              className="mt-4 px-4 py-3 rounded-xl bg-gradient-to-r from-[#5B8CFF] to-[#7C3AED] text-white font-medium flex items-center justify-center gap-2"
            >
              <Rocket size={16} />
              Launch Helix
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
}
