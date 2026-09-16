"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";

const BLOUSE = "#22306a";
const SKIRT = "#26326e";
const SKIN = "#c68a6b";
const SKIN_DARK = "#b07454";
const HAIR = "#241510";

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

function Figure({ speaking }: { speaking: boolean }) {
  const reduce = useReducedMotion();
  const face = useLoader(THREE.TextureLoader, "/avatar/manisha.png");
  const root = useRef<THREE.Group>(null);
  const breath = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  const hair = useRef<THREE.Group>(null);
  const wave = useRef<THREE.Group>(null);
  const idleArm = useRef<THREE.Group>(null);
  const orbit = useRef<THREE.Group>(null);
  const shadowMesh = useRef<THREE.Mesh>(null);
  const glowTex = useRadialTexture("rgba(120,152,255,0.9)", "rgba(120,152,255,0)");
  const shadowTex = useRadialTexture("rgba(6,8,16,0.8)", "rgba(6,8,16,0)");

  useEffect(() => {
    face.colorSpace = THREE.SRGBColorSpace;
    face.anisotropy = 8;
    face.needsUpdate = true;
  }, [face]);

  useFrame(({ clock }) => {
    if (reduce) return;
    const t = clock.getElapsedTime();
    if (root.current) {
      root.current.position.y = Math.sin(t * 1.5) * 0.055;
      root.current.rotation.y = Math.sin(t * 0.35) * 0.18;
    }
    if (breath.current) {
      const b = 1 + Math.sin(t * 1.9) * 0.005;
      breath.current.scale.set(b, b, b);
    }
    if (head.current) {
      const nod = speaking ? Math.sin(t * 2.4) * 0.04 - 0.035 : 0;
      head.current.rotation.x = nod + Math.sin(t * 0.8) * 0.02;
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
    if (orbit.current) orbit.current.rotation.y += 0.007;
    if (shadowMesh.current) {
      shadowMesh.current.scale.setScalar(1 + Math.sin(t * 1.5) * 0.04);
    }
  });

  return (
    <group ref={root} position={[0, 0.02, 0]}>
      <sprite position={[0, 1.9, -1.05]} scale={[4.4, 4.4, 1]}>
        <spriteMaterial map={glowTex} transparent opacity={0.85} depthWrite={false} blending={THREE.AdditiveBlending} />
      </sprite>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.008, 0]}>
        <planeGeometry args={[2.6, 2.6]} />
        <meshBasicMaterial map={shadowTex} transparent opacity={0.65} depthWrite={false} />
      </mesh>
      <mesh ref={shadowMesh} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.012, 0]}>
        <planeGeometry args={[1.7, 1.7]} />
        <meshBasicMaterial map={shadowTex} transparent opacity={0.5} depthWrite={false} />
      </mesh>

      <group ref={orbit} position={[0, 1.5, 0]} rotation={[0.45, 0, 0]}>
        <mesh position={[1.34, 0, 0]}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshBasicMaterial color="#9d7fff" transparent opacity={0.85} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
        <mesh position={[0, 0, 1.34]}>
          <sphereGeometry args={[0.022, 8, 8]} />
          <meshBasicMaterial color="#6c8cff" transparent opacity={0.8} blending={THREE.AdditiveBlending} depthWrite={false} />
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
        <cylinderGeometry args={[0.22, 0.3, 0.62, 28, 1, true]} />
        <meshPhysicalMaterial color={SKIRT} roughness={0.55} metalness={0.2} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0.28, 0]}>
        <cylinderGeometry args={[0.305, 0.305, 0.03, 28]} />
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
      </group>

      {/* neck */}
      <mesh position={[0, 1.42, 0]}>
        <cylinderGeometry args={[0.06, 0.08, 0.14, 18]} />
        <meshPhysicalMaterial color={SKIN} roughness={0.5} sheen={0.3} sheenColor={new THREE.Color("#d8a08a")} />
      </mesh>

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

      {/* HEAD — photo textured on a real 3D head */}
      <group ref={head} position={[0, 0, 0]}>
        <group position={[0, 1.58, 0]}>
          <mesh scale={[0.86, 1.05, 0.94]}>
            <sphereGeometry args={[0.215, 48, 48]} />
            <meshBasicMaterial map={face} toneMapped={false} />
          </mesh>
          {/* hair */}
          <group ref={hair}>
            <mesh position={[0, 0.05, -0.13]} scale={[1.02, 1.02, 0.85]}>
              <sphereGeometry args={[0.25, 24, 24]} />
              <meshStandardMaterial color={HAIR} roughness={0.55} metalness={0.08} />
            </mesh>
            <mesh position={[0, 0.19, -0.02]} scale={[1.04, 0.7, 0.98]}>
              <sphereGeometry args={[0.225, 24, 24]} />
              <meshStandardMaterial color={HAIR} roughness={0.55} metalness={0.08} />
            </mesh>
            <mesh position={[0, 0.3, 0]} scale={[0.95, 0.4, 0.9]}>
              <sphereGeometry args={[0.2, 20, 20]} />
              <meshStandardMaterial color={HAIR} roughness={0.55} metalness={0.08} />
            </mesh>
            <mesh position={[-0.23, -0.02, 0.02]} rotation={[0, 0, 0.2]} scale={[0.32, 1.1, 0.55]}>
              <sphereGeometry args={[0.16, 16, 16]} />
              <meshStandardMaterial color={HAIR} roughness={0.55} metalness={0.08} />
            </mesh>
            <mesh position={[0.23, -0.02, 0.02]} rotation={[0, 0, -0.2]} scale={[0.32, 1.1, 0.55]}>
              <sphereGeometry args={[0.16, 16, 16]} />
              <meshStandardMaterial color={HAIR} roughness={0.55} metalness={0.08} />
            </mesh>
            <mesh position={[0, 0.21, 0.13]} rotation={[1.72, 0, 0]}>
              <capsuleGeometry args={[0.014, 0.15, 3, 12]} />
              <meshStandardMaterial color={HAIR} roughness={0.55} metalness={0.08} />
            </mesh>
          </group>
        </group>
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
      <Suspense fallback={null}>
        <Figure speaking={speaking} />
      </Suspense>
    </Canvas>
  );
}