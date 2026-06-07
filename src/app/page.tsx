"use client";

import { Navbar } from "@/components/Navbar";
import { CommandPalette } from "@/components/CommandPalette";
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
import { Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="noise-bg relative">
      {/* Mesh gradient background */}
      <div className="mesh-gradient">
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
      <footer className="relative z-10 border-t border-white/5 py-12">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#5B8CFF] to-[#7C3AED] flex items-center justify-center">
                  <Zap size={16} className="text-white" />
                </div>
                <span className="font-[family-name:var(--font-space-grotesk)] font-bold text-lg">
                  HELIX<span className="text-[#5B8CFF]"> OS</span>
                </span>
              </div>
              <p className="text-xs text-white/25 leading-relaxed">
                The sovereign operating system for builders, founders & investors.
              </p>
            </div>

            {/* Links */}
            {[
              {
                title: "Product",
                links: ["Ecosystem", "Agents", "Wealth OS", "Startup Studio", "Knowledge Vault"],
              },
              {
                title: "Resources",
                links: ["Documentation", "API Reference", "Guides", "Blog", "Changelog"],
              },
              {
                title: "Company",
                links: ["About", "Careers", "Contact", "Privacy", "Terms"],
              },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="text-xs font-mono text-white/30 mb-3">{col.title}</h4>
                <div className="space-y-2">
                  {col.links.map((link) => (
                    <button
                      key={link}
                      className="block text-sm text-white/20 hover:text-white/50 transition-colors"
                    >
                      {link}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-xs text-white/15">
              © 2026 HELIX OS. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              {["Twitter", "GitHub", "Discord", "Telegram"].map((social) => (
                <button
                  key={social}
                  className="text-xs text-white/15 hover:text-white/40 transition-colors"
                >
                  {social}
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Command Palette */}
      <CommandPalette />
    </div>
  );
}
