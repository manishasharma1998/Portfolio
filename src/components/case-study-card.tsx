"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { CaseStudy } from "@/lib/types";

export function CaseStudyCard({ study }: { study: CaseStudy }) {
  const reduce = useReducedMotion();
  const outer = study.external ?? `/work/${study.slug}`;
  const isExternal = Boolean(study.external);

  const inner = (
    <>
      <div
        className="relative aspect-[16/10] overflow-hidden"
        style={{
          background: `radial-gradient(120% 120% at 20% 0%, hsl(${study.cover.hue} 70% 26% / 0.85), hsl(${study.cover.hue} 60% 12% / 0.9) 60%, hsl(${study.cover.hue} 50% 7% / 1))`,
        }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:28px_28px]" />

        <div className="absolute inset-0 flex flex-col items-start justify-end p-6 sm:p-7">
          <motion.div
            initial={false}
            whileHover={reduce ? undefined : { y: -4 }}
            transition={{ duration: 0.4, ease: [0.21, 0.6, 0.26, 1] }}
            className="flex flex-col gap-1"
          >
            <span className="font-display text-4xl font-semibold tracking-tight text-bone-100 sm:text-5xl">
              {study.cover.title}
            </span>
            <span className="max-w-[24ch] font-mono text-[11px] leading-snug tracking-[0.12em] text-bone-100/60 uppercase">
              {study.cover.subtitle}
            </span>
          </motion.div>
        </div>

        <span className="absolute top-5 right-6 font-mono text-[11px] tracking-[0.2em] text-bone-100/50">
          {study.index}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6 sm:p-7">
        <div>
          <p className="font-mono text-[11px] tracking-[0.2em] text-lens-300 uppercase">
            {study.category}
          </p>
          <h3 className="mt-2 font-display text-xl font-medium tracking-tight text-bone-100 sm:text-2xl">
            {study.title}
          </h3>
        </div>

        <p className="text-sm leading-relaxed text-fog-400">{study.problem}</p>

        <div className="mt-auto flex flex-wrap items-center gap-2">
          {study.chips.map((c) => (
            <span
              key={c}
              className="rounded-full border border-white/10 px-3 py-1 font-mono text-[11px] text-fog-300"
            >
              {c}
            </span>
          ))}
        </div>

        <span className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.15em] text-bone-100 uppercase">
          {isExternal ? "Open project" : "View case study"}
          <span className="transition-transform duration-300 group-hover:translate-x-1.5">
            →
          </span>
        </span>
      </div>
    </>
  );

  if (isExternal) {
    return (
      <a
        href={outer}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-ink-850 transition-colors duration-300 hover:border-lens-400/30"
      >
        {inner}
      </a>
    );
  }

  return (
    <Link
      href={outer}
      className="group flex flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-ink-850 transition-colors duration-300 hover:border-lens-400/30"
    >
      {inner}
    </Link>
  );
}