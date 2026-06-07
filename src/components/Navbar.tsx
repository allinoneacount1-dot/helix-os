"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Zap,
  Brain,
  BarChart3,
  Rocket,
  Terminal,
  Home,
  Layers,
  CreditCard,
} from "lucide-react";

const navItems = [
  { label: "Ecosystem", href: "#ecosystem", icon: <Brain size={14} /> },
  { label: "Agents", href: "#agents", icon: <Terminal size={14} /> },
  { label: "Wealth", href: "#wealth", icon: <BarChart3 size={14} /> },
  { label: "Studio", href: "#studio", icon: <Rocket size={14} /> },
  { label: "Pricing", href: "#pricing", icon: <CreditCard size={14} /> },
];

const mobileDockItems = [
  { label: "Home", href: "#hero", icon: <Home size={18} /> },
  { label: "Ecosystem", href: "#ecosystem", icon: <Brain size={18} /> },
  { label: "Agents", href: "#agents", icon: <Terminal size={18} /> },
  { label: "Stack", href: "#stack", icon: <Layers size={18} /> },
  { label: "Launch", href: "#cta", icon: <Rocket size={18} /> },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Detect active section
      const sections = ["hero", "problem", "ecosystem", "preview", "agents", "wealth", "studio", "knowledge", "design", "stack", "pricing", "cta"];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      {/* Desktop Nav */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? "glass-strong shadow-lg shadow-black/20"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNav("#hero")}
            className="flex items-center gap-2 group"
            data-cursor-hover="true"
          >
            <motion.div
              className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#5B8CFF] to-[#7C3AED] flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Zap size={16} className="text-white" />
            </motion.div>
            <span className="font-[family-name:var(--font-space-grotesk)] font-bold text-lg tracking-tight">
              HELIX<span className="text-[#5B8CFF]"> OS</span>
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <button
                  key={item.href}
                  onClick={() => handleNav(item.href)}
                  className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all duration-300 ${
                    isActive
                      ? "text-white"
                      : "text-white/40 hover:text-white/80"
                  }`}
                  data-cursor-hover="true"
                >
                  {item.icon}
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute inset-0 rounded-lg bg-white/[0.06] -z-10"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <motion.button
              onClick={() => handleNav("#cta")}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#5B8CFF] to-[#7C3AED] text-white text-sm font-medium flex items-center gap-2 hover:shadow-lg hover:shadow-[#5B8CFF]/20 transition-shadow"
              data-cursor-hover="true"
            >
              <Rocket size={14} />
              Launch Helix
            </motion.button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white/60 hover:text-white transition-colors p-2"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-[#050816]/98 backdrop-blur-2xl pt-20 px-6 md:hidden"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col gap-2"
            >
              {navItems.map((item, i) => (
                <motion.button
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  onClick={() => handleNav(item.href)}
                  className="flex items-center gap-3 px-4 py-4 rounded-xl text-white/70 hover:text-white hover:bg-white/5 transition-all text-left"
                >
                  {item.icon}
                  <span className="text-lg">{item.label}</span>
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                onClick={() => handleNav("#cta")}
                className="mt-4 px-4 py-4 rounded-xl bg-gradient-to-r from-[#5B8CFF] to-[#7C3AED] text-white font-medium flex items-center justify-center gap-2"
              >
                <Rocket size={18} />
                Launch Helix
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile bottom command dock */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
        className="fixed bottom-4 left-4 right-4 z-40 md:hidden"
      >
        <div className="glass-strong rounded-2xl px-2 py-2 flex items-center justify-around shadow-2xl shadow-black/40">
          {mobileDockItems.map((item) => {
            const isActive = activeSection === item.href.replace("#", "");
            return (
              <button
                key={item.href}
                onClick={() => handleNav(item.href)}
                className={`flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-all duration-300 ${
                  isActive
                    ? "text-[#5B8CFF] bg-[#5B8CFF]/10"
                    : "text-white/30"
                }`}
              >
                {item.icon}
                <span className="text-[9px] font-mono">{item.label}</span>
              </button>
            );
          })}
        </div>
      </motion.div>
    </>
  );
}
