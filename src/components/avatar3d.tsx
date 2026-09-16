"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";

const SKIN = "#c68a6b";
const SKIN_DARK = "#b07454";
const HAIR = "#23140d";
const BLOUSE = "#2a3a86";
const SKIRT = "#232f6e";

function useRadialTexture(center: string, edge: string) {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 256;
    const ctx = c.getContext("2d");
    if (ctx) {
      const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
      g.addColorStop(0, center);
      g.addColorStop(0.4, center.replace(/[\d.]+\)$/, "0.25)"));
      g.addColorStop(1, edge);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 256, 256);
    }
    const tex = new THREE.CanvasTexture(c);
    return tex;
  }, [center, edge]);
}

function Girl({ speaking }: { speaking: boolean }) {
  const reduce = useReducedMotion();
  const root = useRef<THREE.Group>(null);
  const breath = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  const hair = useRef<THREE.Group>(null);
  const wave = useRef<THREE.Group>(null);
  const idleArm = useRef<THREE.Group>(null);
  const orbit = useRef<THREE.Group>(null);
  const eyeL = useRef<THREE.Group>(null);
  const eyeR = useRef<THREE.Group>(null);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  const shadowMesh = useRef<THREE.Mesh>(null);
  const glowTex = useRadialTexture("rgba(120,152,255,0.9)", "rgba(120,152,255,0)");
  const shadowTex = useRadialTexture("rgba(6,8,16,0.8)", "rgba(6,8,16,0)");

  useFrame(({ clock }) => {
    if (reduce) return;
    const t = clock.getElapsedTime();
    if (root.current) {
      root.current.position.y = Math.sin(t * 1.5) * 0.055;
      root.current.rotation.y = Math.sin(t * 0.35) * 0.2;
    }
    if (breath.current) {
      const b = 1 + Math.sin(t * 1.9) * 0.006;
      breath.current.scale.set(b, b, b);
    }
    if (head.current) {
      const nod = speaking ? Math.sin(t * 2.4) * 0.035 - 0.03 : 0;
      head.current.rotation.x = nod + Math.sin(t * 0.8) * 0.015;
      head.current.rotation.z = Math.sin(t * 0.7) * 0.02;
    }
    if (hair.current) {
      hair.current.rotation.z = -Math.sin(t * 1.6) * 0.03;
      hair.current.rotation.y = Math.sin(t * 0.6) * 0.05;
    }
    if (wave.current) {
      const base = speaking ? 1.18 : 1.02;
      const amp = speaking ? 0.4 : 0.14;
      const speed = speaking ? 4.3 : 1.25;
      wave.current.rotation.z =
        base + Math.sin(t * speed) * amp + Math.sin(t * 2.3) * 0.05;
    }
    if (idleArm.current) {
      idleArm.current.rotation.z = -0.08 + Math.sin(t * 0.9) * 0.04;
    }
    if (orbit.current) {
      orbit.current.rotation.y += 0.006;
    }
    const blink = Math.sin((t * Math.PI) / 1.7) > 0.99 ? 0.08 : 1;
    if (eyeL.current) eyeL.current.scale.set(1, blink, 1);
    if (eyeR.current) eyeR.current.scale.set(1, blink, 1);
    if (ringA.current) ringA.current.rotation.x = 1.35 + Math.sin(t * 0.9) * 0.28;
    if (ringB.current) ringB.current.rotation.x = 1.5 + Math.sin(t * 0.9 + Math.PI) * 0.28;
    if (shadowMesh.current) {
      shadowMesh.current.scale.setScalar(1 + Math.sin(t * 1.5) * 0.04);
    }
  });

  return (
    <group ref={root} position={[0, 0.02, 0]}>
      <sprite position={[0, 1.9, -1.05]} scale={[4.4, 4.4, 1]}>
        <spriteMaterial map={glowTex} transparent opacity={0.9} depthWrite={false} blending={THREE.AdditiveBlending} />
      </sprite>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.008, 0]}>
        <planeGeometry args={[2.6, 2.6]} />
        <meshBasicMaterial map={shadowTex} transparent opacity={0.65} depthWrite={false} />
      </mesh>
      <mesh ref={shadowMesh} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.012, 0]}>
        <planeGeometry args={[1.9, 1.9]} />
        <meshBasicMaterial map={shadowTex} transparent opacity={0.5} depthWrite={false} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
        <planeGeometry args={[3, 3]} />
        <meshBasicMaterial map={glowTex} transparent opacity={0.4} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>

      <mesh ref={ringA} position={[0, 0.95, 0]}>
        <torusGeometry args={[0.95, 0.014, 8, 64]} />
        <meshBasicMaterial color="#6c8cff" transparent opacity={0.4} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh ref={ringB} position={[0, 0.55, 0]}>
        <torusGeometry args={[1.18, 0.01, 8, 64]} />
        <meshBasicMaterial color="#9d7fff" transparent opacity={0.28} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>

      <group ref={orbit} position={[0, 1.5, 0]} rotation={[0.5, 0, 0]}>
        <mesh position={[1.3, 0, 0]}>
          <sphereGeometry args={[0.035, 8, 8]} />
          <meshBasicMaterial color="#9d7fff" transparent opacity={0.9} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
        <mesh position={[0, 0, 1.3]}>
          <sphereGeometry args={[0.026, 8, 8]} />
          <meshBasicMaterial color="#6c8cff" transparent opacity={0.85} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
      </group>

      {/* legs + feet */}
      <group position={[0, 0.02, 0]} scale={[0.85, 1, 0.85]}>
        <mesh position={[-0.09, 0.24, 0]}>
          <capsuleGeometry args={[0.065, 0.4, 4, 12]} />
          <meshStandardMaterial color={SKIN_DARK} roughness={0.55} />
        </mesh>
        <mesh position={[0.09, 0.24, 0]}>
          <capsuleGeometry args={[0.065, 0.4, 4, 12]} />
          <meshStandardMaterial color={SKIN_DARK} roughness={0.55} />
        </mesh>
        <mesh position={[-0.09, 0.045, 0.045]}>
          <boxGeometry args={[0.09, 0.05, 0.17]} />
          <meshStandardMaterial color="#10122a" roughness={0.35} metalness={0.6} />
        </mesh>
        <mesh position={[0.09, 0.045, 0.045]}>
          <boxGeometry args={[0.09, 0.05, 0.17]} />
          <meshStandardMaterial color="#10122a" roughness={0.35} metalness={0.6} />
        </mesh>
      </group>

      {/* skirt */}
      <mesh position={[0, 0.56, 0]}>
        <cylinderGeometry args={[0.21, 0.3, 0.62, 28, 1, true]} />
        <meshPhysicalMaterial color={SKIRT} roughness={0.55} metalness={0.2} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0.285, 0]}>
        <cylinderGeometry args={[0.31, 0.31, 0.03, 28]} />
        <meshStandardMaterial color="#27357e" roughness={0.5} metalness={0.25} />
      </mesh>

      {/* torso / blouse */}
      <group ref={breath} position={[0, 0, 0]}>
        <mesh position={[0, 0.98, 0]} scale={[0.95, 1.15, 0.82]}>
          <sphereGeometry args={[0.3, 28, 28]} />
          <meshPhysicalMaterial color={BLOUSE} roughness={0.45} metalness={0.1} clearcoat={0.35} />
        </mesh>
        <mesh position={[0, 1.25, 0]} scale={[1.1, 0.85, 0.85]}>
          <sphereGeometry args={[0.24, 28, 28]} />
          <meshPhysicalMaterial color={BLOUSE} roughness={0.45} metalness={0.1} clearcoat={0.35} />
        </mesh>
        <mesh position={[0, 0.92, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.27, 0.012, 8, 40]} />
          <meshPhysicalMaterial color="#0e1330" roughness={0.25} metalness={0.9} clearcoat={0.8} />
        </mesh>
        <mesh position={[0, 0.92, 0.264]}>
          <boxGeometry args={[0.035, 0.05, 0.03]} />
          <meshStandardMaterial color="#d4a96a" metalness={0.9} roughness={0.25} />
        </mesh>
      </group>

      {/* collar glow */}
      <mesh position={[0, 1.4, 0]} rotation={[Math.PI / 2 - 0.35, 0, 0]}>
        <torusGeometry args={[0.12, 0.008, 6, 24]} />
        <meshBasicMaterial color="#6c8cff" transparent opacity={0.95} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>

      {/* neck */}
      <mesh position={[0, 1.42, 0]}>
        <cylinderGeometry args={[0.065, 0.075, 0.13, 18]} />
        <meshPhysicalMaterial color={SKIN} roughness={0.5} sheen={0.3} sheenColor={new THREE.Color("#d8a08a")} />
      </mesh>

      {/* ARMS */}
      {/* left arm (viewer right) */}
      <group ref={idleArm} position={[-0.37, 1.32, 0]} rotation={[0, 0, -0.08]}>
        <mesh position={[0, -0.014, 0]} scale={[1.15, 0.6, 1]}>
          <sphereGeometry args={[0.085, 16, 16]} />
          <meshPhysicalMaterial color={BLOUSE} roughness={0.45} metalness={0.1} clearcoat={0.35} />
        </mesh>
        <mesh position={[0, -0.14, 0]}>
          <capsuleGeometry args={[0.065, 0.22, 4, 12]} />
          <meshPhysicalMaterial color={SKIN} roughness={0.5} sheen={0.3} sheenColor={new THREE.Color("#d8a08a")} />
        </mesh>
        <mesh position={[0, -0.3, 0.02]} rotation={[0.12, 0, 0]}>
          <capsuleGeometry args={[0.05, 0.18, 4, 12]} />
          <meshPhysicalMaterial color={SKIN} roughness={0.5} sheen={0.3} sheenColor={new THREE.Color("#d8a08a")} />
        </mesh>
        <mesh position={[0, -0.43, 0.05]} scale={[0.85, 1.1, 0.95]}>
          <sphereGeometry args={[0.058, 16, 16]} />
          <meshPhysicalMaterial color={SKIN} roughness={0.45} sheen={0.3} sheenColor={new THREE.Color("#d8a08a")} />
        </mesh>
      </group>

      {/* right arm (viewer left) — waving */}
      <group ref={wave} position={[0.37, 1.32, 0]} rotation={[0, 0, 1.02]}>
        <mesh position={[0, -0.014, 0]} scale={[1.15, 0.6, 1]}>
          <sphereGeometry args={[0.085, 16, 16]} />
          <meshPhysicalMaterial color={BLOUSE} roughness={0.45} metalness={0.1} clearcoat={0.35} />
        </mesh>
        <mesh position={[0, -0.14, 0]}>
          <capsuleGeometry args={[0.065, 0.22, 4, 12]} />
          <meshPhysicalMaterial color={SKIN} roughness={0.5} sheen={0.3} sheenColor={new THREE.Color("#d8a08a")} />
        </mesh>
        <mesh position={[0, -0.3, 0.02]} rotation={[0.12, 0, 0]}>
          <capsuleGeometry args={[0.05, 0.18, 4, 12]} />
          <meshPhysicalMaterial color={SKIN} roughness={0.5} sheen={0.3} sheenColor={new THREE.Color("#d8a08a")} />
        </mesh>
        <mesh position={[0, -0.43, 0.05]} scale={[0.85, 1.1, 0.95]}>
          <sphereGeometry args={[0.058, 16, 16]} />
          <meshPhysicalMaterial color={SKIN} roughness={0.45} sheen={0.3} sheenColor={new THREE.Color("#d8a08a")} />
        </mesh>
      </group>

      {/* HEAD */}
      <group ref={head} position={[0, 0, 0]}>
        <mesh position={[0, 1.58, 0]} scale={[0.82, 1, 0.9]}>
          <sphereGeometry args={[0.2, 32, 32]} />
          <meshPhysicalMaterial color={SKIN} roughness={0.5} sheen={0.3} sheenColor={new THREE.Color("#d8a08a")} />
        </mesh>
        <mesh position={[0, 1.61, -0.02]} scale={[0.8, 0.96, 0.78]}>
          <sphereGeometry args={[0.19, 24, 24]} />
          <meshPhysicalMaterial color={SKIN_DARK} roughness={0.55} sheen={0.3} sheenColor={new THREE.Color("#c98a68")} />
        </mesh>

        {/* ears */}
        <mesh position={[-0.205, 1.585, 0]} scale={[0.5, 0.85, 0.62]}>
          <sphereGeometry args={[0.042, 16, 16]} />
          <meshPhysicalMaterial color={SKIN} roughness={0.5} sheen={0.3} sheenColor={new THREE.Color("#d8a08a")} />
        </mesh>
        <mesh position={[0.205, 1.585, 0]} scale={[0.5, 0.85, 0.62]}>
          <sphereGeometry args={[0.042, 16, 16]} />
          <meshPhysicalMaterial color={SKIN} roughness={0.5} sheen={0.3} sheenColor={new THREE.Color("#d8a08a")} />
        </mesh>

        {/* eyes */}
        <group ref={eyeL} position={[-0.08, 1.735, 0.145]}>
          <mesh>
            <sphereGeometry args={[0.026, 16, 16]} />
            <meshPhysicalMaterial color="#f5efe6" roughness={0.12} clearcoat={0.4} />
          </mesh>
          <mesh position={[-0.004, 0, 0.012]}>
            <sphereGeometry args={[0.015, 16, 16]} />
            <meshStandardMaterial color="#4a2f1f" roughness={0.25} />
          </mesh>
          <mesh position={[-0.007, 0, 0.02]}>
            <sphereGeometry args={[0.0065, 12, 12]} />
            <meshStandardMaterial color="#0b0710" roughness={0.2} />
          </mesh>
          <mesh position={[0.018, -0.014, 0.014]}>
            <sphereGeometry args={[0.0055, 10, 10]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.9} />
          </mesh>
          <mesh position={[0, 0.028, 0.015]} rotation={[0.35, 0, 0]}>
            <capsuleGeometry args={[0.026, 0.035, 2, 10]} />
            <meshPhysicalMaterial color={SKIN} roughness={0.5} sheen={0.3} sheenColor={new THREE.Color("#d8a08a")} />
          </mesh>
        </group>
        <group ref={eyeR} position={[0.08, 1.735, 0.145]}>
          <mesh>
            <sphereGeometry args={[0.026, 16, 16]} />
            <meshPhysicalMaterial color="#f5efe6" roughness={0.12} clearcoat={0.4} />
          </mesh>
          <mesh position={[-0.004, 0, 0.012]}>
            <sphereGeometry args={[0.015, 16, 16]} />
            <meshStandardMaterial color="#4a2f1f" roughness={0.25} />
          </mesh>
          <mesh position={[-0.007, 0, 0.02]}>
            <sphereGeometry args={[0.0065, 12, 12]} />
            <meshStandardMaterial color="#0b0710" roughness={0.2} />
          </mesh>
          <mesh position={[0.018, -0.014, 0.014]}>
            <sphereGeometry args={[0.0055, 10, 10]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.9} />
          </mesh>
          <mesh position={[0, 0.028, 0.015]} rotation={[0.35, 0, 0]}>
            <capsuleGeometry args={[0.026, 0.035, 2, 10]} />
            <meshPhysicalMaterial color={SKIN} roughness={0.5} sheen={0.3} sheenColor={new THREE.Color("#d8a08a")} />
          </mesh>
        </group>

        {/* brows */}
        <mesh position={[-0.082, 1.795, 0.17]} rotation={[0.12, 0, 0.14]}>
          <capsuleGeometry args={[0.0075, 0.05, 2, 8]} />
          <meshStandardMaterial color="#17100a" roughness={0.7} />
        </mesh>
        <mesh position={[0.082, 1.795, 0.17]} rotation={[0.12, 0, -0.14]}>
          <capsuleGeometry args={[0.0075, 0.05, 2, 8]} />
          <meshStandardMaterial color="#17100a" roughness={0.7} />
        </mesh>

        {/* nose */}
        <mesh position={[0, 1.66, 0.185]} scale={[0.55, 0.72, 0.6]}>
          <sphereGeometry args={[0.028, 16, 16]} />
          <meshPhysicalMaterial color={SKIN_DARK} roughness={0.55} sheen={0.3} sheenColor={new THREE.Color("#c98a68")} />
        </mesh>
        <mesh position={[0, 1.645, 0.207]} scale={[0.5, 0.5, 0.55]}>
          <sphereGeometry args={[0.014, 12, 12]} />
          <meshPhysicalMaterial color={SKIN_DARK} roughness={0.6} sheen={0.25} sheenColor={new THREE.Color("#c98a68")} />
        </mesh>

        {/* lips */}
        <mesh position={[0, 1.598, 0.176]} scale={[1.5, 0.4, 0.7]}>
          <sphereGeometry args={[0.027, 16, 16]} />
          <meshPhysicalMaterial color="#a85c52" roughness={0.28} clearcoat={0.9} clearcoatRoughness={0.2} />
        </mesh>
        <mesh position={[0, 1.572, 0.18]} scale={[1.25, 0.42, 0.7]}>
          <sphereGeometry args={[0.025, 16, 16]} />
          <meshPhysicalMaterial color="#a85c52" roughness={0.3} clearcoat={0.9} clearcoatRoughness={0.25} />
        </mesh>

        {/* nose highlight */}
        <mesh position={[0, 1.672, 0.212]} scale={[0.5, 0.4, 0.4]}>
          <sphereGeometry args={[0.012, 10, 10]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.18} />
        </mesh>
      </group>

      {/* HAIR */}
      <group ref={hair} position={[0, 0, 0]}>
        <mesh position={[0, 1.66, -0.13]} scale={[1.02, 1.05, 0.85]}>
          <sphereGeometry args={[0.26, 24, 24]} />
          <meshStandardMaterial color={HAIR} roughness={0.55} metalness={0.08} />
        </mesh>
        <mesh position={[0, 1.78, -0.02]} scale={[1.04, 0.72, 0.98]}>
          <sphereGeometry args={[0.225, 24, 24]} />
          <meshStandardMaterial color={HAIR} roughness={0.55} metalness={0.08} />
        </mesh>
        <mesh position={[0, 1.9, 0]} scale={[0.95, 0.4, 0.9]}>
          <sphereGeometry args={[0.2, 20, 20]} />
          <meshStandardMaterial color={HAIR} roughness={0.55} metalness={0.08} />
        </mesh>
        {/* side strands */}
        <mesh position={[-0.24, 1.58, 0.02]} rotation={[0, 0, 0.2]} scale={[0.32, 1.15, 0.55]}>
          <sphereGeometry args={[0.16, 16, 16]} />
          <meshStandardMaterial color={HAIR} roughness={0.55} metalness={0.08} />
        </mesh>
        <mesh position={[0.24, 1.58, 0.02]} rotation={[0, 0, -0.2]} scale={[0.32, 1.15, 0.55]}>
          <sphereGeometry args={[0.16, 16, 16]} />
          <meshStandardMaterial color={HAIR} roughness={0.55} metalness={0.08} />
        </mesh>
        {/* bangs */}
        <mesh position={[0, 1.795, 0.105]} rotation={[1.72, 0, 0]}>
          <capsuleGeometry args={[0.032, 0.22, 3, 12]} />
          <meshStandardMaterial color={HAIR} roughness={0.55} metalness={0.08} />
        </mesh>
        <mesh position={[-0.085, 1.82, 0.105]} rotation={[1.72, 0, 0.25]}>
          <capsuleGeometry args={[0.026, 0.14, 3, 12]} />
          <meshStandardMaterial color={HAIR} roughness={0.55} metalness={0.08} />
        </mesh>
        <mesh position={[0.085, 1.82, 0.105]} rotation={[1.72, 0, -0.25]}>
          <capsuleGeometry args={[0.026, 0.14, 3, 12]} />
          <meshStandardMaterial color={HAIR} roughness={0.55} metalness={0.08} />
        </mesh>
      </group>
    </group>
  );
}

export function Avatar3D({ speaking = false }: { speaking?: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 1.35, 4.9], fov: 40 }}
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      className="!pointer-events-none"
      style={{ position: "absolute", inset: 0 }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[2.5, 3, 2]} intensity={1.5} />
      <pointLight position={[-2, 1.5, 2.5]} intensity={0.5} color="#9d7fff" />
      <pointLight position={[1.5, 2.5, 2]} intensity={0.35} color="#ffd9b8" />
      <Girl speaking={speaking} />
    </Canvas>
  );
}