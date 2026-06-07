"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function HelixStrand({
  color,
  offset,
  radius = 1.2,
  height = 4,
  turns = 3,
  pointCount = 80,
}: {
  color: string;
  offset: number;
  radius?: number;
  height?: number;
  turns?: number;
  pointCount?: number;
}) {
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i < pointCount; i++) {
      const t = i / (pointCount - 1);
      const angle = t * Math.PI * 2 * turns + offset;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = (t - 0.5) * height;
      pts.push(new THREE.Vector3(x, y, z));
    }
    return pts;
  }, [offset, radius, height, turns, pointCount]);

  const curve = useMemo(() => new THREE.CatmullRomCurve3(points), [points]);

  return (
    <mesh>
      <tubeGeometry args={[curve, 64, 0.04, 8, false]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
}

function ConnectionLines() {
  const groupRef = useRef<THREE.Group>(null);

  const lines = useMemo(() => {
    const result: THREE.TubeGeometry[] = [];
    const radius = 1.2;
    const height = 4;
    const turns = 3;
    const count = 12;

    for (let i = 0; i < count; i++) {
      const t = i / count;
      const angle1 = t * Math.PI * 2 * turns;
      const angle2 = t * Math.PI * 2 * turns + Math.PI;
      const y = (t - 0.5) * height;

      const curve = new THREE.LineCurve3(
        new THREE.Vector3(Math.cos(angle1) * radius, y, Math.sin(angle1) * radius),
        new THREE.Vector3(Math.cos(angle2) * radius, y, Math.sin(angle2) * radius)
      );
      result.push(new THREE.TubeGeometry(curve, 4, 0.015, 4, false));
    }
    return result;
  }, []);

  return (
    <group ref={groupRef}>
      {lines.map((geometry, i) => (
        <mesh key={i} geometry={geometry}>
          <meshBasicMaterial color="#5B8CFF" transparent opacity={0.15} />
        </mesh>
      ))}
    </group>
  );
}

function AgentNodes() {
  const groupRef = useRef<THREE.Group>(null);

  const nodes = useMemo(() => {
    const radius = 1.8;
    return [
      { pos: [0, 1.5, 0] as const, color: "#5B8CFF", size: 0.12, label: "CEO" },
      { pos: [radius, 0.5, 0] as const, color: "#7C3AED", size: 0.08, label: "Founder" },
      { pos: [-radius, 0.5, 0] as const, color: "#00D4AA", size: 0.08, label: "Research" },
      { pos: [0, -0.5, radius] as const, color: "#F59E0B", size: 0.08, label: "Builder" },
      { pos: [0, -0.5, -radius] as const, color: "#EF4444", size: 0.08, label: "Design" },
      { pos: [radius, -1.5, 0] as const, color: "#5B8CFF", size: 0.08, label: "Trading" },
    ];
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <Float key={i} speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
          <mesh position={node.pos}>
            <sphereGeometry args={[node.size, 16, 16]} />
            <meshStandardMaterial
              color={node.color}
              emissive={node.color}
              emissiveIntensity={1}
              transparent
              opacity={0.9}
            />
          </mesh>
          {/* Glow */}
          <mesh position={node.pos}>
            <sphereGeometry args={[node.size * 2.5, 16, 16]} />
            <meshBasicMaterial color={node.color} transparent opacity={0.08} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const count = 200;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#5B8CFF"
        transparent
        opacity={0.3}
        sizeAttenuation
      />
    </points>
  );
}

export function HelixCore() {
  return (
    <div className="w-full h-full min-h-[400px] md:min-h-[500px]">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={0.5} color="#5B8CFF" />
        <pointLight position={[-5, -3, 3]} intensity={0.3} color="#7C3AED" />
        <pointLight position={[0, 3, -3]} intensity={0.2} color="#00D4AA" />

        <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
          <HelixStrand color="#5B8CFF" offset={0} />
          <HelixStrand color="#7C3AED" offset={Math.PI} />
          <ConnectionLines />
          <AgentNodes />
        </Float>

        <ParticleField />
      </Canvas>
    </div>
  );
}
