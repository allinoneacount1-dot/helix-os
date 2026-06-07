"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap } from "lucide-react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);

  const phases = [
    "Initializing neural network...",
    "Loading agent configurations...",
    "Connecting to knowledge base...",
    "Syncing wealth data...",
    "Preparing startup studio...",
    "System ready.",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 600);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    const phaseInterval = setInterval(() => {
      setPhase((prev) => (prev < phases.length - 1 ? prev + 1 : prev));
    }, 500);
    return () => clearInterval(phaseInterval);
  }, []);

  const clampedProgress = Math.min(progress, 100);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-[#050816] flex flex-col items-center justify-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }} />

      {/* Neural network animation */}
      <div className="relative w-64 h-64 mb-8">
        {/* Nodes */}
        {[...Array(12)].map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          const radius = 80;
          const x = 128 + Math.cos(angle) * radius;
          const y = 128 + Math.sin(angle) * radius;
          const isCenter = i === 0;

          return (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full"
              style={{
                left: isCenter ? 128 - 6 : x - 6,
                top: isCenter ? 128 - 6 : y - 6,
                backgroundColor: isCenter ? "#5B8CFF" : "#7C3AED",
                boxShadow: `0 0 ${isCenter ? 20 : 10}px ${isCenter ? "#5B8CFF" : "#7C3AED"}40`,
              }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                delay: i * 0.15,
                repeat: Infinity,
              }}
            />
          );
        })}

        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 256 256">
          {[...Array(12)].map((_, i) => {
            const angle1 = (i / 12) * Math.PI * 2;
            const angle2 = ((i + 1) / 12) * Math.PI * 2;
            const r = 80;
            const x1 = 128 + Math.cos(angle1) * r;
            const y1 = 128 + Math.sin(angle1) * r;
            const x2 = 128 + Math.cos(angle2) * r;
            const y2 = 128 + Math.sin(angle2) * r;

            return (
              <motion.line
                key={i}
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke="#5B8CFF"
                strokeWidth="0.5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: [0, 0.3, 0] }}
                transition={{ duration: 2, delay: i * 0.1, repeat: Infinity, repeatDelay: 1 }}
              />
            );
          })}
          {/* Center connections */}
          {[...Array(6)].map((_, i) => {
            const angle = (i / 6) * Math.PI * 2;
            const r = 80;
            const x = 128 + Math.cos(angle) * r;
            const y = 128 + Math.sin(angle) * r;

            return (
              <motion.line
                key={`c-${i}`}
                x1={128} y1={128} x2={x} y2={y}
                stroke="#7C3AED"
                strokeWidth="0.5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: [0, 0.2, 0] }}
                transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity, repeatDelay: 2 }}
              />
            );
          })}
        </svg>

        {/* Center logo */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-2xl bg-gradient-to-br from-[#5B8CFF] to-[#7C3AED] flex items-center justify-center"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          <Zap size={28} className="text-white" />
        </motion.div>
      </div>

      {/* Logo text */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 text-center"
      >
        <h1 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold tracking-tight">
          HELIX<span className="text-[#5B8CFF]"> OS</span>
        </h1>
        <p className="text-xs text-white/25 mt-1">Sovereign Intelligence System</p>
      </motion.div>

      {/* Progress bar */}
      <div className="w-64 h-1 rounded-full bg-white/5 overflow-hidden mb-4">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-[#5B8CFF] to-[#7C3AED]"
          style={{ width: `${clampedProgress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Phase text */}
      <AnimatePresence mode="wait">
        <motion.p
          key={phase}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          className="text-xs text-white/30 font-mono"
        >
          {phases[phase]}
        </motion.p>
      </AnimatePresence>

      {/* Progress percentage */}
      <motion.span
        className="absolute bottom-8 right-8 text-xs font-mono text-white/15"
      >
        {Math.floor(clampedProgress)}%
      </motion.span>
    </motion.div>
  );
}
