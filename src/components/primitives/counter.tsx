"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

function prefersReduced(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

type CounterProps = {
  value: number;
  suffix?: string;
  className?: string;
};

export function Counter({ value, suffix = "", className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = prefersReduced();
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, {
    damping: 45,
    stiffness: 55,
    mass: 1,
    restDelta: 0.5,
  });
  const [display, setDisplay] = useState(reduced ? value : 0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) return;
    const unsub = spring.on("change", (latest) => {
      setDisplay(Math.round(latest));
    });
    motionValue.set(value);
    return unsub;
  }, [inView, value, reduced, spring, motionValue]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}