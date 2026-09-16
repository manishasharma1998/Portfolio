"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";

const CARD_W = 1.72;

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

function Portrait({ speaking }: { speaking: boolean }) {
  const reduce = useReducedMotion();
  const tex = useLoader(THREE.TextureLoader, "/avatar/manisha.png");
  const [aspect, setAspect] = useState(1);
  const card = useRef<THREE.Group>(null);
  const orbit = useRef<THREE.Group>(null);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  const glowTex = useRadialTexture("rgba(120,152,255,0.9)", "rgba(120,152,255,0)");

  useEffect(() => {
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
    tex.needsUpdate = true;
    const img = tex.image as HTMLImageElement | undefined;
    if (img && img.naturalHeight > 0 && img.naturalWidth > 0) {
      setAspect(img.naturalHeight / img.naturalWidth);
    }
  }, [tex]);

  useFrame(({ clock }) => {
    if (reduce) return;
    const t = clock.getElapsedTime();
    if (card.current) {
      const speed = speaking ? 3.2 : 1.15;
      card.current.position.y = Math.sin(t * (speaking ? 2.1 : 1.5)) * 0.05;
      card.current.rotation.y = Math.sin(t * speed) * (speaking ? 0.3 : 0.16);
      card.current.rotation.x = Math.sin(t * 1.7) * 0.045;
      const breath = 1 + Math.sin(t * 1.9) * 0.008;
      card.current.scale.setScalar(breath);
    }
    if (orbit.current) orbit.current.rotation.y += 0.007;
    if (ringA.current) ringA.current.rotation.x = 1.35 + Math.sin(t * 0.9) * 0.28;
    if (ringB.current) ringB.current.rotation.x = 1.5 + Math.sin(t * 0.9 + Math.PI) * 0.28;
  });

  const h = CARD_W * aspect;

  return (
    <>
      <sprite position={[0, 1.1, -0.9]} scale={[4, 4, 1]}>
        <spriteMaterial map={glowTex} transparent opacity={0.9} depthWrite={false} blending={THREE.AdditiveBlending} />
      </sprite>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <planeGeometry args={[3, 3]} />
        <meshBasicMaterial map={glowTex} transparent opacity={0.4} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>

      <mesh ref={ringA} position={[0, 1.05, 0]}>
        <torusGeometry args={[0.98, 0.013, 8, 64]} />
        <meshBasicMaterial color="#6c8cff" transparent opacity={0.42} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh ref={ringB} position={[0, 0.72, 0]}>
        <torusGeometry args={[1.24, 0.01, 8, 64]} />
        <meshBasicMaterial color="#9d7fff" transparent opacity={0.28} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>

      <group ref={orbit} position={[0, 1.05, 0]} rotation={[0.45, 0, 0]}>
        <mesh position={[1.34, 0, 0]}>
          <sphereGeometry args={[0.035, 8, 8]} />
          <meshBasicMaterial color="#9d7fff" transparent opacity={0.9} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
        <mesh position={[0, 0, 1.34]}>
          <sphereGeometry args={[0.026, 8, 8]} />
          <meshBasicMaterial color="#6c8cff" transparent opacity={0.85} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
      </group>

      {/* portrait card */}
      <group ref={card} position={[0, 1.05, 0]}>
        <mesh position={[0, 0, -0.005]}>
          <boxGeometry args={[CARD_W + 0.07, h + 0.07, 0.09]} />
          <meshStandardMaterial color="#0e1330" metalness={0.85} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0, 0.041]}>
          <planeGeometry args={[CARD_W, h]} />
          <meshBasicMaterial map={tex} toneMapped={false} />
        </mesh>
        <mesh position={[0, 0, 0.052]}>
          <planeGeometry args={[CARD_W, h]} />
          <meshStandardMaterial
            color="#6c8cff"
            transparent
            opacity={0.14}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>
    </>
  );
}

export function Avatar3D({ speaking = false }: { speaking?: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 1.1, 4.8], fov: 40 }}
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
        <Portrait speaking={speaking} />
      </Suspense>
    </Canvas>
  );
}