"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import type { SiteConfig } from "@/lib/types";
import { CursorGlow } from "@/components/primitives/cursor-glow";
import { AccentText } from "@/components/primitives/accent-text";

function GridPlane() {
  return (
    <div aria-hidden className="absolute inset-0 grid-recede overflow-hidden">
      <div className="grid-plane" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(11,13,18,0.55)_55%,#0b0d12_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-900 to-transparent" />
    </div>
  );
}

export function Hero({ site }: { site: SiteConfig }) {
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { damping: 30, stiffness: 90, mass: 0.6 });
  const sy = useSpring(py, { damping: 30, stiffness: 90, mass: 0.6 });

  const rotX = useTransform(sy, [-0.5, 0.5], [3.5, -3.5]);
  const rotY = useTransform(sx, [-0.5, 0.5], [-3.5, 3.5]);
  const textX = useTransform(sx, [-0.5, 0.5], [-8, 8]);
  const textY = useTransform(sy, [-0.5, 0.5], [-5, 5]);

  function onMove(e: React.MouseEvent) {
    if (reduce) return;
    const r = heroRef.current?.getBoundingClientRect();
    if (!r) return;
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  }

  return (
    <section
      ref={heroRef}
      onMouseMove={onMove}
      className="relative flex min-h-dvh flex-col overflow-hidden"
      id="top"
    >
      <GridPlane />
      <CursorGlow className="left-1/2 top-1/2" size={640} />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-end px-5 pt-28 pb-16 sm:px-8">
        <motion.div
          style={reduce ? undefined : { rotateX: rotX, rotateY: rotY }}
          className="origin-bottom-left"
        >
          <p className="mb-5 flex items-center gap-3 font-mono text-[11px] tracking-[0.25em] text-fog-500 uppercase">
            <span className="inline-block h-px w-8 bg-lens-400" />
            {site.hero.eyebrow}
          </p>

          <div className="grid items-end gap-10 lg:grid-cols-[1fr_auto]">
            <div>
              <h1 className="font-display text-5xl leading-[0.95] font-semibold tracking-tight text-bone-100 sm:text-7xl md:text-8xl">
                {site.name.split(" ")[0]}

                <br />
                {site.name
                  .split(" ")
                  .slice(1)
                  .join(" ")}
                .
              </h1>

              <p className="mt-7 max-w-xl text-lg leading-snug font-medium text-bone-200 sm:text-2xl">
                <AccentText text={site.hero.line1} />
              </p>
              <p className="mt-1 max-w-xl text-lg leading-snug font-medium text-bone-200 sm:text-2xl">
                {site.hero.line2}
              </p>
            </div>

            <div className="hidden lg:block">
              <div className="relative w-56 xl:w-64">
                <div className="absolute -inset-1 rounded-2xl bg-lens-400/25 blur-lg" />
                <div className="absolute -inset-2 rounded-[20px] border border-white/10" />
                <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-ink-800 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]">
                  <Image
                    src="/images/profile.jpg"
                    alt={site.hero.portraitLabel}
                    width={1086}
                    height={1448}
                    priority
                    className="aspect-[3/4] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 via-transparent to-transparent" />
                  <p className="absolute bottom-3 left-4 font-mono text-[10px] tracking-[0.2em] text-bone-100/80 uppercase">
                    {site.hero.portraitLabel}
                  </p>
                </div>
                <motion.p
                  style={reduce ? undefined : { x: textX, y: textY }}
                  className="absolute -bottom-3 -left-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-ink-900/90 px-3.5 py-1.5 font-mono text-[10px] tracking-[0.15em] text-fog-300 shadow-lg backdrop-blur-md sm:-left-8"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-lens-400" />
                  {site.hero.portraitCaption}
                </motion.p>
              </div>
            </div>
          </div>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-fog-400 sm:text-lg">
            {site.hero.body ?? site.hero.warning}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {(
              [
                [site.hero.primaryCta, "/work", "primary"],
                [site.hero.secondaryCta, site.resume, "ghost"],
              ] as const
            ).map(([label, href, kind]) => (
              <a
                key={label}
                href={href}
                download={kind === "ghost"}
                className={
                  kind === "primary"
                    ? "group inline-flex items-center gap-2 rounded-full bg-lens-400 px-6 py-3 font-medium text-ink-950 transition-colors hover:bg-lens-300"
                    : "inline-flex items-center gap-2 rounded-full border border-white/12 px-6 py-3 font-medium text-bone-100 transition-colors hover:border-lens-400/60 hover:bg-lens-400/10"
                }
              >
                {label}
                {kind === "primary" ? (
                  <span className="transition-transform group-hover:translate-y-0.5">
                    ↓
                  </span>
                ) : null}
              </a>
            ))}
          </div>

          <motion.div
            style={reduce ? undefined : { x: textX, y: textY }}
            className="mt-10 inline-flex items-center gap-2 rounded-full border border-lens-400/30 bg-lens-400/[0.07] px-4 py-2"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lens-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-lens-400" />
            </span>
            <span className="font-mono text-xs tracking-wide text-lens-300">
              {site.relocationBadge}
            </span>
          </motion.div>
        </motion.div>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl items-end justify-between px-5 pb-7 sm:px-8">
        <p className="font-mono text-[11px] tracking-[0.2em] text-fog-500 uppercase">
          {site.hero.scrollHint}
        </p>
      </div>

      <div className="pointer-events-none absolute inset-0 border-b border-white/[0.05]" />
    </section>
  );
}