"use client";

import { useEffect, type ReactNode, useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

export function CursorGlow({
  className = "",
  color = "rgba(108, 140, 255, 0.16)",
  size = 520,
  children,
}: {
  className?: string;
  color?: string;
  size?: number;
  children?: ReactNode;
}) {
  const reduce = useReducedMotion();
  const gl = useRef<HTMLDivElement>(null);
  const gx = useMotionValue(-400);
  const gy = useMotionValue(-400);
  const sx = useSpring(gx, { damping: 40, stiffness: 140 });
  const sy = useSpring(gy, { damping: 40, stiffness: 140 });

  useEffect(() => {
    if (reduce) return;
    const root = gl.current?.parentElement ?? document.body;
    const onMove = (e: MouseEvent) => {
      const r = root.getBoundingClientRect();
      gx.set(e.clientX - r.left);
      gy.set(e.clientY - r.top);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduce, gx, gy]);

  return (
    <motion.div
      ref={gl}
      aria-hidden
      className={`pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl ${className}`}
      style={{
        left: sx,
        top: sy,
        width: size,
        height: size,
        background: color,
        opacity: reduce ? 0 : 1,
      }}
    >
      {children}
    </motion.div>
  );
}