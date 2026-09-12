"use client";

import { type ReactNode, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  depth?: "near" | "far";
  y?: number;
};

export function Reveal({
  children,
  className,
  delay = 0,
  depth = "near",
  y = 28,
}: RevealProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.21, 0.6, 0.26, 1],
      }}
      style={{
        transformStyle: "preserve-3d",
        transformPerspective: depth === "far" ? 900 : 1200,
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealStagger({
  children,
  className,
  delayChildren = 0,
  stagger = 0.12,
}: {
  children: ReactNode;
  className?: string;
  delayChildren?: number;
  stagger?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
  y = 22,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: reduce ? 0 : y },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: [0.21, 0.6, 0.26, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}