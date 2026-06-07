"use client";

import { useRef, useMemo, useState, useEffect, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Float,
  OrbitControls,
  Environment,
} from "@react-three/drei";
import * as THREE from "three";

/* ═══════════════════════════════════════════════════════════════
   COLOR PALETTE
   ═══════════════════════════════════════════════════════════════ */

const COLORS = {
  primary: new THREE.Color("#5B8CFF"),
  secondary: new THREE.Color("#7C3AED"),
  accent: new THREE.Color("#00D4AA"),
  white: new THREE.Color("#ffffff"),
  bg: new THREE.Color("#050816"),
};

/* ═══════════════════════════════════════════════════════════════
   SCENE TIMING (seconds)
   ═══════════════════════════════════════════════════════════════ */

const SCENES = {
  void: { start: 0, end: 2 },
  awakening: { start: 2, end: 5 },
  formation: { start: 5, end: 8 },
  genesis: { start: 8, end: 12 },
  agents: { start: 12, end: 16 },
  knowledge: { start: 16, end: 20 },
  sovereign: { start: 20, end: 25 },
  loop: { start: 25, end: Infinity },
};

/* ═══════════════════════════════════════════════════════════════
   HELIX DNA STRAND
   ═══════════════════════════════════════════════════════════════ */

function HelixStrand({
  color,
  offset,
  radius = 1.2,
  height = 4,
  turns = 3,
  pointCount = 100,
  progress = 1,
}: {
  color: THREE.Color;
  offset: number;
  radius?: number;
  height?: number;
  turns?: number;
  pointCount?: number;
  progress?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  const geometry = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const count = Math.floor(pointCount * progress);
    for (let i = 0; i < count; i++) {
      const t = i / (pointCount - 1);
      const angle = t * Math.PI * 2 * turns + offset;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = (t - 0.5) * height;
      pts.push(new THREE.Vector3(x, y, z));
    }
    if (pts.length < 2) return null;
    const curve = new THREE.CatmullRomCurve3(pts);
    return new THREE.TubeGeometry(curve, 64, 0.035, 8, false);
  }, [offset, radius, height, turns, pointCount, progress]);

  useFrame((state) => {
    if (materialRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 0.8 + offset) * 0.3 + 0.7;
      materialRef.current.emissiveIntensity = pulse * 0.6;
    }
  });

  if (!geometry) return null;

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshStandardMaterial
        ref={materialRef}
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        transparent
        opacity={0.85}
        roughness={0.2}
        metalness={0.8}
      />
    </mesh>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CONNECTION LINES BETWEEN HELIX STRANDS
   ═══════════════════════════════════════════════════════════════ */

function HelixConnections({
  radius = 1.2,
  height = 4,
  turns = 3,
  count = 16,
  progress = 1,
}: {
  radius?: number;
  height?: number;
  turns?: number;
  count?: number;
  progress?: number;
}) {
  const linesRef = useRef<THREE.Group>(null);

  const geometries = useMemo(() => {
    const result: THREE.TubeGeometry[] = [];
    const actualCount = Math.floor(count * progress);
    for (let i = 0; i < actualCount; i++) {
      const t = i / count;
      const angle1 = t * Math.PI * 2 * turns;
      const angle2 = t * Math.PI * 2 * turns + Math.PI;
      const y = (t - 0.5) * height;
      const curve = new THREE.LineCurve3(
        new THREE.Vector3(Math.cos(angle1) * radius, y, Math.sin(angle1) * radius),
        new THREE.Vector3(Math.cos(angle2) * radius, y, Math.sin(angle2) * radius)
      );
      result.push(new THREE.TubeGeometry(curve, 4, 0.012, 4, false));
    }
    return result;
  }, [radius, height, turns, count, progress]);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.children.forEach((child, i) => {
        const mat = (child as THREE.Mesh).material as THREE.MeshBasicMaterial;
        if (mat && mat.opacity !== undefined) {
          const pulse = Math.sin(state.clock.elapsedTime * 1.2 + i * 0.3) * 0.5 + 0.5;
          mat.opacity = pulse * 0.2;
        }
      });
    }
  });

  return (
    <group ref={linesRef}>
      {geometries.map((geo, i) => (
        <mesh key={i} geometry={geo}>
          <meshBasicMaterial color={COLORS.primary} transparent opacity={0.15} />
        </mesh>
      ))}
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════════
   AGENT NODES — Orbiting spheres representing AI agents
   ═══════════════════════════════════════════════════════════════ */

const AGENT_DATA = [
  { color: COLORS.primary, orbitRadius: 2.0, orbitSpeed: 0.3, phase: 0, size: 0.14, label: "CEO" },
  { color: COLORS.secondary, orbitRadius: 2.2, orbitSpeed: 0.25, phase: Math.PI * 0.5, size: 0.1, label: "Founder" },
  { color: COLORS.accent, orbitRadius: 2.4, orbitSpeed: 0.35, phase: Math.PI, size: 0.1, label: "Research" },
  { color: new THREE.Color("#F59E0B"), orbitRadius: 2.1, orbitSpeed: 0.28, phase: Math.PI * 1.5, size: 0.1, label: "Builder" },
  { color: new THREE.Color("#EF4444"), orbitRadius: 2.3, orbitSpeed: 0.32, phase: Math.PI * 0.25, size: 0.1, label: "Design" },
  { color: COLORS.primary, orbitRadius: 2.5, orbitSpeed: 0.22, phase: Math.PI * 0.75, size: 0.1, label: "Trading" },
];

function AgentNodes({
  visible,
  mousePos,
}: {
  visible: boolean;
  mousePos: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current || !visible) return;
    groupRef.current.children.forEach((child, i) => {
      const data = AGENT_DATA[i];
      if (!data) return;
      const t = state.clock.elapsedTime * data.orbitSpeed + data.phase;
      const x = Math.cos(t) * data.orbitRadius;
      const z = Math.sin(t) * data.orbitRadius;
      const y = Math.sin(t * 0.5) * 0.5;

      // Mouse reactivity
      const mouseInfluence = 0.15;
      child.position.x = x + mousePos.current.x * mouseInfluence;
      child.position.z = z + mousePos.current.y * mouseInfluence;
      child.position.y = y;

      // Pulse glow
      const glow = child.children[1] as THREE.Mesh;
      if (glow) {
        const scale = 1 + Math.sin(state.clock.elapsedTime * 2 + i) * 0.2;
        glow.scale.setScalar(scale);
      }
    });
  });

  if (!visible) return null;

  return (
    <group ref={groupRef}>
      {AGENT_DATA.map((agent, i) => (
        <group key={i}>
          {/* Core sphere */}
          <mesh>
            <sphereGeometry args={[agent.size, 24, 24]} />
            <meshStandardMaterial
              color={agent.color}
              emissive={agent.color}
              emissiveIntensity={1.2}
              transparent
              opacity={0.95}
              roughness={0.1}
              metalness={0.9}
            />
          </mesh>
          {/* Glow sphere */}
          <mesh>
            <sphereGeometry args={[agent.size * 3, 16, 16]} />
            <meshBasicMaterial color={agent.color} transparent opacity={0.06} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════════
   AGENT CONNECTION LINES — Data pulses between agents
   ═══════════════════════════════════════════════════════════════ */

function AgentConnections({ visible }: { visible: boolean }) {
  const linesRef = useRef<THREE.Group>(null);

  const connections = useMemo(() => {
    const pairs: [number, number][] = [];
    for (let i = 0; i < AGENT_DATA.length; i++) {
      pairs.push([i, (i + 1) % AGENT_DATA.length]);
      pairs.push([i, (i + 3) % AGENT_DATA.length]);
    }
    return pairs;
  }, []);

  useFrame((state) => {
    if (!linesRef.current || !visible) return;
    linesRef.current.children.forEach((child, i) => {
      const mat = (child as THREE.Line).material as THREE.LineBasicMaterial;
      if (mat) {
        const pulse = Math.sin(state.clock.elapsedTime * 1.5 + i * 0.5) * 0.5 + 0.5;
        mat.opacity = pulse * 0.25;
      }
    });
  });

  if (!visible) return null;

  return (
    <group ref={linesRef}>
      {connections.map(([from, to], i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[
                new Float32Array([
                  Math.cos(0) * AGENT_DATA[from].orbitRadius,
                  0,
                  Math.sin(0) * AGENT_DATA[from].orbitRadius,
                  Math.cos(0) * AGENT_DATA[to].orbitRadius,
                  0,
                  Math.sin(0) * AGENT_DATA[to].orbitRadius,
                ]),
                3,
              ]}
            />
          </bufferGeometry>
          <lineBasicMaterial color={COLORS.primary} transparent opacity={0.15} />
        </line>
      ))}
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════════
   KNOWLEDGE GRAPH — Constellation of intelligence nodes
   ═══════════════════════════════════════════════════════════════ */

function KnowledgeGraph({ visible }: { visible: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.Group>(null);

  const { positions, colors, connections } = useMemo(() => {
    const count = 200;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const conns: THREE.BufferGeometry[] = [];

    for (let i = 0; i < count; i++) {
      // Spherical distribution expanding outward
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 3 + Math.random() * 4;

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      // Color mix
      const colorChoice = Math.random();
      const c = colorChoice < 0.4 ? COLORS.primary : colorChoice < 0.7 ? COLORS.secondary : COLORS.accent;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;

      // Create connections to nearby nodes
      if (i > 0 && Math.random() < 0.15) {
        const j = Math.floor(Math.random() * i);
        const linePts = [
          new THREE.Vector3(pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2]),
          new THREE.Vector3(pos[j * 3], pos[j * 3 + 1], pos[j * 3 + 2]),
        ];
        conns.push(new THREE.BufferGeometry().setFromPoints(linePts));
      }
    }

    return { positions: pos, colors: col, connections: conns };
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.015;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
    }
    if (linesRef.current) {
      linesRef.current.rotation.y = state.clock.elapsedTime * 0.015;
    }
  });

  if (!visible) return null;

  return (
    <>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          vertexColors
          transparent
          opacity={0.6}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
      <group ref={linesRef}>
        {connections.map((geo, i) => (
          <line key={i}>
            <primitive object={geo} attach="geometry" />
            <lineBasicMaterial color={COLORS.primary} transparent opacity={0.04} />
          </line>
        ))}
      </group>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PARTICLE FIELD — 5000+ intelligent particles
   ═══════════════════════════════════════════════════════════════ */

function ParticleField({
  count = 5000,
  sceneProgress,
}: {
  count?: number;
  sceneProgress: number;
}) {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, colors, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Start scattered, will converge during formation
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12;

      // Random velocities for organic movement
      vel[i * 3] = (Math.random() - 0.5) * 0.02;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.02;

      // Color distribution
      const colorChoice = Math.random();
      const c = colorChoice < 0.4 ? COLORS.primary : colorChoice < 0.7 ? COLORS.secondary : COLORS.accent;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }

    return { positions: pos, colors: col, velocities: vel };
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const posAttr = pointsRef.current.geometry.attributes.position;
    const arr = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      // Organic drift
      arr[i * 3] += velocities[i * 3] * Math.sin(state.clock.elapsedTime * 0.5 + i * 0.01);
      arr[i * 3 + 1] += velocities[i * 3 + 1] * Math.cos(state.clock.elapsedTime * 0.3 + i * 0.01);
      arr[i * 3 + 2] += velocities[i * 3 + 2] * Math.sin(state.clock.elapsedTime * 0.4 + i * 0.01);

      // Boundary wrap
      for (let j = 0; j < 3; j++) {
        const idx = i * 3 + j;
        if (arr[idx] > 8) arr[idx] = -8;
        if (arr[idx] < -8) arr[idx] = 8;
      }
    }
    posAttr.needsUpdate = true;

    // Slow rotation
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.008;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        vertexColors
        transparent
        opacity={Math.min(sceneProgress * 2, 0.5)}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ENERGY PULSES — Traveling light along connections
   ═══════════════════════════════════════════════════════════════ */

function EnergyPulses({ visible }: { visible: boolean }) {
  const pulsesRef = useRef<THREE.Group>(null);

  const pulseData = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      offset: i * 0.5,
      speed: 0.3 + Math.random() * 0.4,
      radius: 1.2,
      color: i % 3 === 0 ? COLORS.primary : i % 3 === 1 ? COLORS.secondary : COLORS.accent,
    }));
  }, []);

  useFrame((state) => {
    if (!pulsesRef.current || !visible) return;
    pulsesRef.current.children.forEach((child, i) => {
      const data = pulseData[i];
      const t = ((state.clock.elapsedTime * data.speed + data.offset) % 1);
      const angle = t * Math.PI * 2 * 3;
      const y = (t - 0.5) * 4;
      child.position.x = Math.cos(angle) * data.radius;
      child.position.y = y;
      child.position.z = Math.sin(angle) * data.radius;

      const mat = (child as THREE.Mesh).material as THREE.MeshBasicMaterial;
      mat.opacity = Math.sin(t * Math.PI) * 0.8;
    });
  });

  if (!visible) return null;

  return (
    <group ref={pulsesRef}>
      {pulseData.map((pulse, i) => (
        <mesh key={i}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshBasicMaterial color={pulse.color} transparent opacity={0.6} blending={THREE.AdditiveBlending} />
        </mesh>
      ))}
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════════
   AURORA LIGHTS — Volumetric-style light beams
   ═══════════════════════════════════════════════════════════════ */

function AuroraLights({ visible }: { visible: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current || !visible) return;
    groupRef.current.children.forEach((child, i) => {
      const mesh = child as THREE.Mesh;
      const mat = mesh.material as THREE.MeshBasicMaterial;
      const wave = Math.sin(state.clock.elapsedTime * 0.3 + i * 1.2) * 0.5 + 0.5;
      mat.opacity = wave * 0.08;
      mesh.rotation.z = Math.sin(state.clock.elapsedTime * 0.1 + i) * 0.1;
    });
  });

  if (!visible) return null;

  return (
    <group ref={groupRef}>
      {[
        { pos: [0, 3, -2] as const, color: COLORS.primary, scale: [6, 0.3] as const },
        { pos: [0, -2, -1] as const, color: COLORS.secondary, scale: [5, 0.2] as const },
        { pos: [2, 1, -3] as const, color: COLORS.accent, scale: [4, 0.15] as const },
        { pos: [-2, 0, -2] as const, color: COLORS.primary, scale: [7, 0.25] as const },
      ].map((aurora, i) => (
        <mesh key={i} position={aurora.pos} rotation={[0, 0, Math.PI * 0.1 * (i - 1.5)]}>
          <planeGeometry args={aurora.scale} />
          <meshBasicMaterial color={aurora.color} transparent opacity={0.06} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} />
        </mesh>
      ))}
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CAMERA CONTROLLER — Cinematic camera movements
   ═══════════════════════════════════════════════════════════════ */

function CameraController() {
  const { camera } = useThree();
  const initialPos = useRef(new THREE.Vector3(0, 0, 6));

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // Very slow, deliberate dolly
    const dollyZ = 6 + Math.sin(t * 0.08) * 0.5;
    const dollyY = Math.sin(t * 0.06) * 0.15;
    const dollyX = Math.sin(t * 0.04) * 0.2;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, initialPos.current.x + dollyX, 0.02);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, initialPos.current.y + dollyY, 0.02);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, dollyZ, 0.02);

    camera.lookAt(0, 0, 0);
  });

  return null;
}

/* ═══════════════════════════════════════════════════════════════
   MAIN CINEMATIC SCENE — Orchestrates all 7 scenes
   ═══════════════════════════════════════════════════════════════ */

function CinematicScene() {
  const groupRef = useRef<THREE.Group>(null);
  const [elapsed, setElapsed] = useState(0);
  const mousePos = useRef({ x: 0, y: 0 });

  // Track mouse for interactivity
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mousePos.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state) => {
    setElapsed(state.clock.elapsedTime);
  });

  // Calculate scene visibility and progress
  const showParticles = elapsed >= SCENES.awakening.start;
  const particleOpacity = Math.min((elapsed - SCENES.awakening.start) / 3, 1);

  const showHelixFormation = elapsed >= SCENES.formation.start;
  const helixProgress = Math.min(
    Math.max((elapsed - SCENES.formation.start) / (SCENES.genesis.end - SCENES.formation.start), 0),
    1
  );

  const showHelixFull = elapsed >= SCENES.genesis.start;
  const showConnections = elapsed >= SCENES.genesis.start;

  const showAgents = elapsed >= SCENES.agents.start;
  const showKnowledge = elapsed >= SCENES.knowledge.start;
  const showAurora = elapsed >= SCENES.sovereign.start;
  const showPulses = elapsed >= SCENES.genesis.start;

  // Idle loop breathing
  const isIdle = elapsed >= SCENES.loop.start;
  const breathe = isIdle ? Math.sin(elapsed * 0.5) * 0.05 : 0;

  return (
    <group ref={groupRef}>
      <CameraController />

      {/* Lighting */}
      <ambientLight intensity={0.15} />
      <pointLight position={[5, 5, 5]} intensity={0.6} color={COLORS.primary} />
      <pointLight position={[-5, -3, 3]} intensity={0.4} color={COLORS.secondary} />
      <pointLight position={[0, 3, -3]} intensity={0.3} color={COLORS.accent} />
      <pointLight position={[0, 0, 4]} intensity={0.2} color={COLORS.white} />

      {/* Scene 01-02: Particle Field (awakens at 2s) */}
      <ParticleField count={5000} sceneProgress={particleOpacity} />

      {/* Scene 03-04: Helix Formation (forms 5s-12s) */}
      {showHelixFormation && !showHelixFull && (
        <group scale={[1 + breathe, 1 + breathe, 1 + breathe]}>
          <HelixStrand color={COLORS.primary} offset={0} progress={helixProgress} />
          <HelixStrand color={COLORS.secondary} offset={Math.PI} progress={helixProgress} />
          <HelixConnections progress={helixProgress} />
        </group>
      )}

      {/* Scene 04+: Full Helix (complete at 12s) */}
      {showHelixFull && (
        <group scale={[1 + breathe, 1 + breathe, 1 + breathe]}>
          <Float speed={0.5} rotationIntensity={0.05} floatIntensity={0.1}>
            <HelixStrand color={COLORS.primary} offset={0} progress={1} />
            <HelixStrand color={COLORS.secondary} offset={Math.PI} progress={1} />
          </Float>
          {showConnections && <HelixConnections progress={1} />}
          {showPulses && <EnergyPulses visible={true} />}
        </group>
      )}

      {/* Scene 05: Agent Activation (12s-16s) */}
      <AgentNodes visible={showAgents} mousePos={mousePos} />
      <AgentConnections visible={showAgents} />

      {/* Scene 06: Knowledge Expansion (16s-20s) */}
      <KnowledgeGraph visible={showKnowledge} />

      {/* Scene 07: Aurora Lights (20s+) */}
      <AuroraLights visible={showAurora} />
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════════
   EXPORT — CinematicHero Canvas
   ═══════════════════════════════════════════════════════════════ */

export function CinematicHero() {
  return (
    <div className="w-full h-full min-h-[400px] md:min-h-[600px]">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]}
        style={{ background: "transparent" }}
      >
        <color attach="background" args={["#050816"]} />
        <fog attach="fog" args={["#050816", 8, 20]} />
        <CinematicScene />
      </Canvas>
    </div>
  );
}
