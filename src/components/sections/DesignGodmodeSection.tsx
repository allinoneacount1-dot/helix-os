"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Wand2, ArrowRight, CheckCircle2, X } from "lucide-react";
import { StaggerContainer, StaggerItem, MotionSection } from "@/components/motion";

const beforeFeatures = [
  { label: "Visual Hierarchy", status: "bad" }, { label: "Color System", status: "bad" },
  { label: "Typography", status: "bad" }, { label: "Spacing", status: "bad" },
  { label: "CTA Clarity", status: "bad" }, { label: "Trust Signals", status: "bad" },
  { label: "Mobile UX", status: "bad" }, { label: "Conversion Rate", status: "bad", value: "0.8%" },
];

const afterFeatures = [
  { label: "Visual Hierarchy", status: "good" }, { label: "Color System", status: "good" },
  { label: "Typography", status: "good" }, { label: "Spacing", status: "good" },
  { label: "CTA Clarity", status: "good" }, { label: "Trust Signals", status: "good" },
  { label: "Mobile UX", status: "good" }, { label: "Conversion Rate", status: "good", value: "4.2%" },
];

export function DesignGodmodeSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isTransformed, setIsTransformed] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleTransform = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => { setIsTransformed(!isTransformed); setIsAnimating(false); }, 800);
  };

  const currentFeatures = isTransformed ? afterFeatures : beforeFeatures;

  return (
    <section id="design" className="relative py-32 md:py-40" ref={ref}>
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <MotionSection className="text-center mb-16">
          <div className="section-label mb-6">// DESIGN GODMODE</div>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
            AI-Powered <span className="text-gradient">Design Transformation</span>
          </h2>
          <p className="text-white/40 text-lg max-w-2xl mx-auto">
            Watch the AI redesign engine transform weak interfaces into conversion machines.
          </p>
        </MotionSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <MotionSection direction="left" delay={0.2}>
            <div className="glass rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
                  <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
                  <div className="w-3 h-3 rounded-full bg-[#00D4AA]" />
                </div>
                <span className="text-[10px] font-mono text-white/15">{isTransformed ? "optimized.vercel.app" : "before-redesign.vercel.app"}</span>
              </div>

              <motion.div
                className="p-6"
                animate={isAnimating ? { opacity: 0.5, scale: 0.97 } : { opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <div className={`rounded-xl p-6 transition-all duration-500 ${isTransformed ? "bg-gradient-to-br from-[#0B1120] to-[#050816]" : "bg-[#111]"}`}>
                  <div className="flex items-center justify-between mb-8">
                    <div className={`text-sm font-bold transition-colors duration-500 ${isTransformed ? "text-white" : "text-white/30"}`}>Brand</div>
                    <div className="flex gap-3">
                      {["About", "Features", "Pricing"].map((item) => (
                        <span key={item} className={`text-[10px] transition-colors duration-500 ${isTransformed ? "text-white/35" : "text-white/15"}`}>{item}</span>
                      ))}
                    </div>
                  </div>
                  <div className="mb-6">
                    <div className={`text-2xl font-bold mb-2 transition-colors duration-500 ${isTransformed ? "text-white" : "text-white/25"}`}>
                      {isTransformed ? "Build Something Amazing" : "Welcome to Our Platform"}
                    </div>
                    <div className={`text-xs mb-4 transition-colors duration-500 ${isTransformed ? "text-white/35" : "text-white/12"}`}>
                      {isTransformed ? "The all-in-one platform for modern teams. Ship faster, scale smarter." : "We provide solutions for your business needs and requirements."}
                    </div>
                    <div className="flex gap-2">
                      <div className={`px-4 py-2 rounded-lg text-xs transition-all duration-500 ${isTransformed ? "bg-gradient-to-r from-[#5B8CFF] to-[#7C3AED] text-white" : "bg-white/10 text-white/25"}`}>
                        {isTransformed ? "Get Started Free" : "Click Here"}
                      </div>
                      {isTransformed && (
                        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="px-4 py-2 rounded-lg text-xs border border-white/10 text-white/45">Learn More</motion.div>
                      )}
                    </div>
                  </div>
                  {isTransformed && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4 pt-4 border-t border-white/5">
                      <div className="text-[10px] text-white/25">Trusted by 10,000+ teams</div>
                      <div className="flex gap-1">
                        {["Vercel", "Stripe", "Linear"].map((c) => (
                          <span key={c} className="text-[9px] font-mono text-white/15 px-2 py-0.5 rounded bg-white/5">{c}</span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </div>
          </MotionSection>

          <MotionSection direction="right" delay={0.3} className="space-y-4">
            <motion.button
              onClick={handleTransform}
              disabled={isAnimating}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full glass rounded-xl p-6 text-left transition-all duration-300 group hover:border-white/15 ${isAnimating ? "animate-pulse" : ""}`}
              data-cursor-hover="true"
            >
              <div className="flex items-center gap-4">
                <motion.div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center transition-colors duration-300 ${isTransformed ? "bg-[#00D4AA]/10 text-[#00D4AA]" : "bg-[#7C3AED]/10 text-[#7C3AED]"}`}
                  animate={isAnimating ? { rotate: 360 } : { rotate: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <Wand2 size={24} />
                </motion.div>
                <div className="flex-1">
                  <div className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold mb-1">
                    {isAnimating ? "Transforming..." : isTransformed ? "Transformation Complete" : "AI Redesign Engine"}
                  </div>
                  <div className="text-sm text-white/25">
                    {isAnimating ? "Analyzing and optimizing..." : isTransformed ? "Click to revert and compare" : "Click to transform this landing page"}
                  </div>
                </div>
                <ArrowRight size={18} className={`text-white/15 transition-transform ${isTransformed ? "rotate-90" : "group-hover:translate-x-1"}`} />
              </div>
            </motion.button>

            <div className="glass rounded-xl p-6">
              <div className="text-xs font-mono text-white/25 mb-4">QUALITY METRICS</div>
              <StaggerContainer className="space-y-3">
                {currentFeatures.map((feat, i) => (
                  <StaggerItem key={feat.label}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {feat.status === "good" ? <CheckCircle2 size={14} className="text-[#00D4AA]" /> : <X size={14} className="text-[#EF4444]" />}
                        <span className="text-sm text-white/55">{feat.label}</span>
                      </div>
                      {feat.value && <span className={`text-sm font-mono font-bold ${feat.status === "good" ? "text-[#00D4AA]" : "text-[#EF4444]"}`}>{feat.value}</span>}
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.8, type: "spring" }}
              className="glass rounded-xl p-6 text-center"
            >
              <div className="text-xs font-mono text-white/25 mb-2">CONVERSION LIFT</div>
              <div className="text-4xl font-bold font-[family-name:var(--font-space-grotesk)] text-[#00D4AA]">+425%</div>
              <div className="text-xs text-white/15 mt-1">Average improvement across all redesigns</div>
            </motion.div>
          </MotionSection>
        </div>
      </div>
    </section>
  );
}
