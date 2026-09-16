"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";

function useGlowTexture() {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 256;
    const ctx = c.getContext("2d");
    if (ctx) {
      const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
      g.addColorStop(0, "rgba(120, 152, 255, 0.85)");
      g.addColorStop(0.4, "rgba(120, 152, 255, 0.25)");
      g.addColorStop(1, "rgba(120, 152, 255, 0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 256, 256);
    }
    const tex = new THREE.CanvasTexture(c);
    return tex;
  }, []);
}

function Girl({ speaking }: { speaking: boolean }) {
  const reduce = useReducedMotion();
  const root = useRef<THREE.Group>(null);
  const wave = useRef<THREE.Group>(null);
  const orbit = useRef<THREE.Group>(null);
  const eyeL = useRef<THREE.Mesh>(null);
  const eyeR = useRef<THREE.Mesh>(null);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  const glowTex = useGlowTexture();

  useFrame(({ clock }) => {
    if (reduce) return;
    const t = clock.getElapsedTime();
    if (root.current) {
      root.current.position.y = Math.sin(t * 1.6) * 0.06;
      root.current.rotation.y = Math.sin(t * 0.4) * 0.22;
    }
    if (wave.current) {
      const base = speaking ? 1.22 : 1.1;
      const amp = speaking ? 0.42 : 0.16;
      const speed = speaking ? 4.4 : 1.3;
      wave.current.rotation.z =
        base + Math.sin(t * speed) * amp + Math.sin(t * 2.3) * 0.06;
    }
    if (orbit.current) {
      orbit.current.rotation.y += 0.006;
    }
    const blink = Math.sin((t * Math.PI) / 1.6) > 0.99 ? 0.08 : 1;
    if (eyeL.current) eyeL.current.scale.set(1, blink, 1);
    if (eyeR.current) eyeR.current.scale.set(1, blink, 1);
    if (ringA.current) {
      ringA.current.rotation.x = 1.35 + Math.sin(t * 0.9) * 0.28;
    }
    if (ringB.current) {
      ringB.current.rotation.x = 1.5 + Math.sin(t * 0.9 + Math.PI) * 0.28;
    }
  });

  return (
    <group ref={root} position={[0, 0.02, 0]}>
      <sprite position={[0, 1.6, -1.05]} scale={[4.2, 4.2, 1]}>
        <spriteMaterial
          map={glowTex}
          transparent
          opacity={0.9}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </sprite>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, 0]}>
        <planeGeometry args={[3, 3]} />
        <meshBasicMaterial
          map={glowTex}
          transparent
          opacity={0.55}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <mesh ref={ringA} position={[0, 0.62, 0]}>
        <torusGeometry args={[0.95, 0.014, 8, 64]} />
        <meshBasicMaterial
          color="#6c8cff"
          transparent
          opacity={0.4}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh ref={ringB} position={[0, 0.34, 0]}>
        <torusGeometry args={[1.18, 0.01, 8, 64]} />
        <meshBasicMaterial
          color="#9d7fff"
          transparent
          opacity={0.28}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <group ref={orbit} position={[0, 1.15, 0]} rotation={[0.55, 0, 0]}>
        <mesh position={[1.28, 0, 0]}>
          <sphereGeometry args={[0.035, 8, 8]} />
          <meshBasicMaterial color="#9d7fff" transparent opacity={0.9} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
        <mesh position={[0, 0, 1.28]}>
          <sphereGeometry args={[0.026, 8, 8]} />
          <meshBasicMaterial color="#6c8cff" transparent opacity={0.85} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
      </group>

      {/* dress */}
      <mesh position={[0, 0.52, 0]}>
        <coneGeometry args={[0.56, 1.04, 24]} />
        <meshStandardMaterial color="#1a2254" roughness={0.3} metalness={0.65} />
      </mesh>
      <mesh position={[0, 0.02, 0]}>
        <cylinderGeometry args={[0.34, 0.56, 0.1, 24]} />
        <meshStandardMaterial color="#131a40" roughness={0.4} metalness={0.7} emissive="#33448f" emissiveIntensity={0.25} />
      </mesh>

      {/* bodice */}
      <mesh position={[0, 0.98, 0]} scale={[1, 1.15, 0.9]}>
        <sphereGeometry args={[0.34, 24, 24]} />
        <meshStandardMaterial color="#161e4e" roughness={0.32} metalness={0.6} />
      </mesh>

      {/* collar */}
      <mesh position={[0, 1.16, 0]} rotation={[Math.PI / 2 - 0.35, 0, 0]}>
        <torusGeometry args={[0.17, 0.008, 6, 28]} />
        <meshStandardMaterial color="#6c8cff" emissive="#6c8cff" emissiveIntensity={1.4} />
      </mesh>

      {/* neck */}
      <mesh position={[0, 1.22, 0]}>
        <cylinderGeometry args={[0.1, 0.11, 0.16, 16]} />
        <meshStandardMaterial color="#7f96ef" roughness={0.5} metalness={0.1} emissive="#6c8cff" emissiveIntensity={0.12} />
      </mesh>

      {/* head */}
      <mesh position={[0, 1.42, 0]}>
        <sphereGeometry args={[0.37, 32, 32]} />
        <meshStandardMaterial color="#8fa3ff" roughness={0.45} metalness={0.15} emissive="#6c8cff" emissiveIntensity={0.1} />
      </mesh>

      {/* hair */}
      <mesh position={[0, 1.54, 0]} scale={[1.06, 0.6, 1.06]}>
        <sphereGeometry args={[0.4, 24, 24]} />
        <meshStandardMaterial color="#080a1c" roughness={0.6} metalness={0.2} />
      </mesh>
      <mesh position={[0, 1.4, -0.1]} scale={[1, 0.9, 0.72]}>
        <sphereGeometry args={[0.42, 24, 24]} />
        <meshStandardMaterial color="#080a1c" roughness={0.6} metalness={0.2} />
      </mesh>
      <mesh position={[0.42, 1.12, 0.04]} scale={[0.5, 1.2, 0.55]}>
        <sphereGeometry args={[0.19, 16, 16]} />
        <meshStandardMaterial color="#080a1c" roughness={0.6} metalness={0.2} />
      </mesh>
      <mesh position={[-0.42, 1.12, 0.04]} scale={[0.5, 1.2, 0.55]}>
        <sphereGeometry args={[0.19, 16, 16]} />
        <meshStandardMaterial color="#080a1c" roughness={0.6} metalness={0.2} />
      </mesh>

      {/* eyes */}
      <mesh ref={eyeL} position={[-0.15, 1.46, 0.32]}>
        <sphereGeometry args={[0.048, 16, 16]} />
        <meshStandardMaterial color="#04122e" emissive="#9fd0ff" emissiveIntensity={2.2} />
      </mesh>
      <mesh ref={eyeR} position={[0.15, 1.46, 0.32]}>
        <sphereGeometry args={[0.048, 16, 16]} />
        <meshStandardMaterial color="#04122e" emissive="#9fd0ff" emissiveIntensity={2.2} />
      </mesh>

      {/* chest accent */}
      <mesh position={[0, 1.02, 0.3]}>
        <sphereGeometry args={[0.03, 12, 12]} />
        <meshBasicMaterial color="#9d7fff" transparent opacity={0.95} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>

      {/* left arm (viewer right) */}
      <group position={[-0.42, 1.12, 0]} rotation={[0, 0, -0.08]}>
        <mesh position={[0, -0.26, 0]}>
          <capsuleGeometry args={[0.09, 0.42, 4, 12]} />
          <meshStandardMaterial color="#7f96ef" roughness={0.45} metalness={0.15} emissive="#6c8cff" emissiveIntensity={0.12} />
        </mesh>
        <mesh position={[0, -0.5, 0]}>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial color="#6c8cff" emissive="#6c8cff" emissiveIntensity={0.7} />
        </mesh>
      </group>

      {/* right arm (viewer left) — waving */}
      <group ref={wave} position={[0.42, 1.12, 0]} rotation={[0, 0, 1.1]}>
        <mesh position={[0, -0.26, 0]}>
          <capsuleGeometry args={[0.09, 0.42, 4, 12]} />
          <meshStandardMaterial color="#7f96ef" roughness={0.45} metalness={0.15} emissive="#6c8cff" emissiveIntensity={0.12} />
        </mesh>
        <mesh position={[0, -0.5, 0]}>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial color="#9d7fff" emissive="#9d7fff" emissiveIntensity={1.1} />
        </mesh>
      </group>
    </group>
  );
}

export function Avatar3D({ speaking = false }: { speaking?: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 1.2, 4.6], fov: 42 }}
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      className="!pointer-events-none"
      style={{ position: "absolute", inset: 0 }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[2, 3, 2]} intensity={1.5} />
      <pointLight position={[-2, 1, 2.5]} intensity={0.7} color="#9d7fff" />
      <pointLight position={[0, 2.4, -2]} intensity={0.6} color="#6c8cff" />
      <Girl speaking={speaking} />
    </Canvas>
  );
}