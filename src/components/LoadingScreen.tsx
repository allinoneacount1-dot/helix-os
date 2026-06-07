"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap } from "lucide-react";

const neuralNodes = [
  { x: 50, y: 20, delay: 0 },
  { x: 25, y: 40, delay: 0.2 },
  { x: 75, y: 40, delay: 0.4 },
  { x: 15, y: 65, delay: 0.6 },
  { x: 50, y: 60, delay: 0.3 },
  { x: 85, y: 65, delay: 0.5 },
  { x: 35, y: 85, delay: 0.7 },
  { x: 65, y: 85, delay: 0.8 },
];

const neuralConnections = [
  [0, 1], [0, 2], [1, 3], [1, 4], [2, 4], [2, 5],
  [3, 6], [4, 6], [4, 7], [5, 7], [3, 4], [5, 4],
];

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const duration = 2500;
    const steps = 100;
    const interval = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current++;
      setProgress(current);
      if (current >= 25 && phase === 0) setPhase(1);
      if (current >= 50 && phase === 1) setPhase(2);
      if (current >= 75 && phase === 2) setPhase(3);
      if (current >= 100) {
        clearInterval(timer);
        setTimeout(onComplete, 300);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete, phase]);

  const phaseLabels = [
    "Initializing neural network...",
    "Loading intelligence modules...",
    "Connecting agent nodes...",
    "System ready.",
  ];

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] bg-[#050816] flex flex-col items-center justify-center"
    >
      {/* Neural network animation */}
      <div className="relative w-48 h-48 mb-8">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Connections */}
          {neuralConnections.map(([from, to], i) => (
            <motion.line
              key={`line-${i}`}
              x1={neuralNodes[from].x}
              y1={neuralNodes[from].y}
              x2={neuralNodes[to].x}
              y2={neuralNodes[to].y}
              stroke="#5B8CFF"
              strokeWidth="0.3"
              initial={{ strokeOpacity: 0.05 }}
              animate={{
                strokeOpacity: progress > (i + 1) * 10 ? [0.05, 0.4, 0.15] : 0.05,
              }}
              transition={{ duration: 0.8, repeat: progress > (i + 1) * 10 ? Infinity : 0, repeatType: "reverse" }}
            />
          ))}

          {/* Nodes */}
          {neuralNodes.map((node, i) => (
            <motion.circle
              key={`node-${i}`}
              cx={node.x}
              cy={node.y}
              fill="#5B8CFF"
              initial={{ r: 0, opacity: 0 }}
              animate={{
                r: progress > node.delay * 100 ? [2, 4, 3] : 0,
                opacity: progress > node.delay * 100 ? [0.3, 1, 0.6] : 0,
              }}
              transition={{ duration: 0.6, delay: node.delay }}
            />
          ))}
        </svg>

        {/* Center logo */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: progress > 50 ? 1 : 0, opacity: progress > 50 ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#5B8CFF] to-[#7C3AED] flex items-center justify-center">
            <Zap size={20} className="text-white" />
          </div>
        </motion.div>
      </div>

      {/* Logo text */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center mb-6"
      >
        <div className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold tracking-tight">
          HELIX<span className="text-[#5B8CFF]"> OS</span>
        </div>
      </motion.div>

      {/* Progress bar */}
      <div className="w-48 h-0.5 rounded-full bg-white/5 overflow-hidden mb-3">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-[#5B8CFF] to-[#7C3AED]"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Phase label */}
      <motion.div
        key={phase}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xs font-mono text-white/30"
      >
        {phaseLabels[phase]}
      </motion.div>
    </motion.div>
  );
}
