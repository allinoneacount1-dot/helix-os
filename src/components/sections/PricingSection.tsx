"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Check, X, Zap, Crown, Building2, Rocket, ArrowRight } from "lucide-react";
import { StaggerContainer, StaggerItem, MotionSection } from "@/components/motion";

const plans = [
  { id: "free", name: "Free", price: "$0", period: "forever", desc: "Get started with core intelligence features.", icon: <Zap size={20} />, color: "#5B8CFF", features: [{ text: "1 AI Agent", included: true }, { text: "100 Knowledge Points", included: true }, { text: "Basic Dashboard", included: true }, { text: "Community Access", included: true }, { text: "Multi-Agent Coordination", included: false }, { text: "Wealth Intelligence", included: false }, { text: "Startup Studio", included: false }, { text: "Priority Support", included: false }], cta: "Start Free", popular: false },
  { id: "pro", name: "Pro", price: "$49", period: "/month", desc: "For serious builders and founders.", icon: <Crown size={20} />, color: "#7C3AED", features: [{ text: "6 AI Agents", included: true }, { text: "1,000 Knowledge Points", included: true }, { text: "Full Dashboard", included: true }, { text: "Community Access", included: true }, { text: "Multi-Agent Coordination", included: true }, { text: "Wealth Intelligence", included: true }, { text: "Startup Studio", included: false }, { text: "Priority Support", included: false }], cta: "Start Pro Trial", popular: true },
  { id: "sovereign", name: "Sovereign", price: "$199", period: "/month", desc: "Full intelligence stack. Maximum leverage.", icon: <Rocket size={20} />, color: "#00D4AA", features: [{ text: "Unlimited Agents", included: true }, { text: "Unlimited Knowledge", included: true }, { text: "Full Dashboard", included: true }, { text: "Community Access", included: true }, { text: "Multi-Agent Coordination", included: true }, { text: "Wealth Intelligence", included: true }, { text: "Startup Studio", included: true }, { text: "Priority Support", included: true }], cta: "Go Sovereign", popular: false },
  { id: "enterprise", name: "Enterprise", price: "Custom", period: "", desc: "For organizations. Full customization.", icon: <Building2 size={20} />, color: "#F59E0B", features: [{ text: "Everything in Sovereign", included: true }, { text: "Custom Agents", included: true }, { text: "Self-Hosted Option", included: true }, { text: "SLA Guarantee", included: true }, { text: "Dedicated Support", included: true }, { text: "Custom Integrations", included: true }, { text: "Training & Onboarding", included: true }, { text: "White Label", included: true }], cta: "Contact Sales", popular: false },
];

export function PricingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [billingAnnual, setBillingAnnual] = useState(false);

  const handleSelectPlan = (planId: string) => {
    const el = document.getElementById("cta");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="pricing" className="relative py-32 md:py-40" ref={ref}>
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <MotionSection className="text-center mb-12">
          <div className="section-label mb-6">// PRICING</div>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
            Choose Your <span className="text-gradient">Intelligence Tier</span>
          </h2>
          <p className="text-white/40 text-lg max-w-2xl mx-auto mb-8">Start free. Scale infinitely. No hidden fees.</p>

          <div className="flex items-center justify-center gap-3">
            <span className={`text-sm transition-colors ${!billingAnnual ? "text-white" : "text-white/25"}`}>Monthly</span>
            <motion.button
              onClick={() => setBillingAnnual(!billingAnnual)}
              className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${billingAnnual ? "bg-[#5B8CFF]" : "bg-white/10"}`}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-lg"
                animate={{ x: billingAnnual ? 26 : 2 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </motion.button>
            <span className={`text-sm transition-colors ${billingAnnual ? "text-white" : "text-white/25"}`}>Annual <span className="text-[#00D4AA] text-xs">(Save 20%)</span></span>
          </div>
        </MotionSection>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" staggerDelay={0.08}>
          {plans.map((plan, i) => (
            <StaggerItem key={plan.id}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                className={`glass rounded-2xl p-6 relative flex flex-col ${plan.popular ? "border-[#7C3AED]/30" : ""}`}
              >
                {plan.popular && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#7C3AED] text-white text-[10px] font-mono"
                  >
                    MOST POPULAR
                  </motion.div>
                )}

                <div className="mb-6">
                  <motion.div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${plan.color}15`, color: plan.color }}
                    whileHover={{ rotate: 10, scale: 1.1 }}
                  >
                    {plan.icon}
                  </motion.div>
                  <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold mb-1">{plan.name}</h3>
                  <p className="text-xs text-white/25">{plan.desc}</p>
                </div>

                <div className="mb-6">
                  <span className="text-3xl font-bold font-[family-name:var(--font-space-grotesk)]">
                    {billingAnnual && plan.price !== "$0" && plan.price !== "Custom" ? `$${Math.round(parseInt(plan.price.replace("$", "")) * 0.8)}` : plan.price}
                  </span>
                  <span className="text-white/25 text-sm">{plan.period}</span>
                </div>

                <div className="space-y-2 mb-6 flex-1">
                  {plan.features.map((feat, j) => (
                    <div key={j} className="flex items-center gap-2">
                      {feat.included ? <Check size={14} className="text-[#00D4AA] shrink-0" /> : <X size={14} className="text-white/10 shrink-0" />}
                      <span className={`text-xs ${feat.included ? "text-white/55" : "text-white/15"}`}>{feat.text}</span>
                    </div>
                  ))}
                </div>

                <motion.button
                  onClick={() => handleSelectPlan(plan.id)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`w-full py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-all duration-300 group ${
                    plan.popular ? "bg-gradient-to-r from-[#5B8CFF] to-[#7C3AED] text-white hover:shadow-lg hover:shadow-[#7C3AED]/20" : "glass text-white/60 hover:text-white hover:border-white/15"
                  }`}
                  data-cursor-hover="true"
                >
                  {plan.cta}
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
