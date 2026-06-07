"use client";

import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { CommandPalette } from "@/components/CommandPalette";
import { CustomCursor } from "@/components/CustomCursor";
import { LoadingScreen } from "@/components/LoadingScreen";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { EcosystemSection } from "@/components/sections/EcosystemSection";
import { LivePreviewSection } from "@/components/sections/LivePreviewSection";
import { AgentSystemSection } from "@/components/sections/AgentSystemSection";
import { WealthSection } from "@/components/sections/WealthSection";
import { StartupStudioSection } from "@/components/sections/StartupStudioSection";
import { KnowledgeVaultSection } from "@/components/sections/KnowledgeVaultSection";
import { DesignGodmodeSection } from "@/components/sections/DesignGodmodeSection";
import { SovereignStackSection } from "@/components/sections/SovereignStackSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { FinalCTASection } from "@/components/sections/FinalCTASection";
import { Zap, ArrowRight, GitFork, MessageCircle, AtSign } from "lucide-react";

function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="relative z-10 border-t border-white/5 py-16">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          {/* Brand + Newsletter */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#5B8CFF] to-[#7C3AED] flex items-center justify-center">
                <Zap size={16} className="text-white" />
              </div>
              <span className="font-[family-name:var(--font-space-grotesk)] font-bold text-lg">
                HELIX<span className="text-[#5B8CFF]"> OS</span>
              </span>
            </div>
            <p className="text-sm text-white/25 leading-relaxed mb-6 max-w-xs">
              The sovereign operating system for builders, founders & investors. One intelligence layer. Infinite leverage.
            </p>

            {/* Newsletter */}
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                placeholder="Enter your email"
                className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white placeholder:text-white/20 outline-none focus:border-[#5B8CFF]/40 transition-colors"
              />
              <button
                onClick={handleSubscribe}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#5B8CFF] to-[#7C3AED] text-white text-sm font-medium flex items-center gap-1 hover:opacity-90 transition-opacity shrink-0"
              >
                {subscribed ? "✓" : <ArrowRight size={14} />}
              </button>
            </div>
            {subscribed && (
              <p className="text-xs text-[#00D4AA] mt-2">You're in. Welcome to the intelligence layer.</p>
            )}
          </div>

          {/* Links */}
          {[
            { title: "Product", links: ["Ecosystem", "Agents", "Wealth OS", "Startup Studio", "Knowledge Vault"] },
            { title: "Resources", links: ["Documentation", "API Reference", "Guides", "Blog", "Changelog"] },
            { title: "Company", links: ["About", "Careers", "Contact", "Privacy", "Terms"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-mono text-white/25 mb-3">{col.title}</h4>
              <div className="space-y-2">
                {col.links.map((link) => (
                  <button key={link} className="block text-sm text-white/20 hover:text-white/50 transition-colors">
                    {link}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs text-white/15">© 2026 HELIX OS. All rights reserved.</div>
          <div className="flex items-center gap-4">
            {[
              { icon: <AtSign size={16} />, label: "Twitter" },
              { icon: <GitFork size={16} />, label: "GitHub" },
              { icon: <MessageCircle size={16} />, label: "Discord" },
            ].map((social) => (
              <button
                key={social.label}
                className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/5 flex items-center justify-center text-white/20 hover:text-white/50 hover:border-white/10 transition-all"
                title={social.label}
              >
                {social.icon}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen onComplete={handleLoadComplete} />}
      </AnimatePresence>

      {!isLoading && (
        <div className="noise-bg relative">
          {/* Custom cursor */}
          <CustomCursor />

          {/* Mesh gradient background */}
          <div className="mesh-gradient">
            <div className="orb" />
            <div className="orb" />
            <div className="orb" />
            <div className="orb" />
          </div>

          {/* Navigation */}
          <Navbar />

          {/* Main content */}
          <main className="relative z-10">
            <HeroSection />
            <ProblemSection />
            <EcosystemSection />
            <LivePreviewSection />
            <AgentSystemSection />
            <WealthSection />
            <StartupStudioSection />
            <KnowledgeVaultSection />
            <DesignGodmodeSection />
            <SovereignStackSection />
            <PricingSection />
            <FinalCTASection />
          </main>

          {/* Footer */}
          <Footer />

          {/* Command Palette */}
          <CommandPalette />
        </div>
      )}
    </>
  );
}
