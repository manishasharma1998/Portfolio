"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { CaseVisual } from "@/lib/types";

function Track({
  pct,
  tone,
  delay,
  reduce,
}: {
  pct: number;
  tone: "lens" | "fog";
  delay: number;
  reduce: boolean | null;
}) {
  return (
    <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/[0.06]">
      <motion.div
        initial={reduce ? false : { width: "0%" }}
        whileInView={{ width: `${pct}%` }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.9, ease: "easeOut", delay }}
        className={`h-full rounded-full ${tone === "lens" ? "bg-lens-400" : "bg-fog-500/70"}`}
      />
    </div>
  );
}

function CompareCard({
  d,
  idx,
  reduce,
}: {
  d: Extract<CaseVisual, { kind: "compare" }>;
  idx: number;
  reduce: boolean | null;
}) {
  const max = Math.max(d.before, d.after, 1);
  const delta = d.before - d.after;
  const sign = delta >= 0 ? "−" : "+";
  return (
    <div className="space-y-5">
      <div>
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-[10px] tracking-[0.18em] text-fog-400 uppercase">
            {d.beforeLabel ?? "Before"}
          </span>
          <span className="font-display text-xl font-semibold text-bone-100">
            {d.before}
            {d.unit ?? ""}
          </span>
        </div>
        <Track pct={(d.before / max) * 100} tone="fog" delay={idx * 0.1} reduce={reduce} />
      </div>
      <div>
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-[10px] tracking-[0.18em] text-lens-300 uppercase">
            {d.afterLabel ?? "After"}
          </span>
          <span className="font-display text-xl font-semibold text-lens-400">
            {d.after}
            {d.unit ?? ""}
          </span>
        </div>
        <Track pct={(d.after / max) * 100} tone="lens" delay={idx * 0.1 + 0.15} reduce={reduce} />
      </div>
      <p className="inline-block rounded-full bg-accent-400/10 px-3 py-1 font-mono text-[11px] tracking-[0.18em] text-accent-400 uppercase">
        Δ {sign}
        {Math.abs(delta)}
        {d.unit ?? ""}
      </p>
    </div>
  );
}

function FunnelCard({ d }: { d: Extract<CaseVisual, { kind: "funnel" }> }) {
  const n = d.steps.length;
  return (
    <ol className="flex flex-col items-center">
      {d.steps.map((s, i) => (
        <li
          key={s.label}
          className="w-full"
          style={{ width: `${Math.max(40, 100 - i * 16)}%` }}
        >
          <div
            className={`flex items-center justify-between gap-3 rounded-xl border px-4 py-3 ${
              i === 0
                ? "border-lens-400/30 bg-lens-400/[0.06]"
                : "border-white/[0.08] bg-white/[0.03]"
            }`}
          >
            <span className="text-sm leading-snug text-fog-300">{s.label}</span>
            <span className="font-display text-base font-semibold whitespace-nowrap text-bone-100">
              {s.value}
            </span>
          </div>
          {i < n - 1 ? <div className="mx-auto h-3 w-px bg-white/[0.12]" /> : null}
        </li>
      ))}
    </ol>
  );
}

function BarsCard({
  d,
  idx,
  reduce,
}: {
  d: Extract<CaseVisual, { kind: "bars" }>;
  idx: number;
  reduce: boolean | null;
}) {
  const max = Math.max(...d.bars.map((b) => b.value), 1);
  return (
    <div className="space-y-4">
      {d.bars.map((b, i) => (
        <div key={b.label}>
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm leading-snug text-fog-300">{b.label}</span>
            <span className="font-display text-base font-semibold whitespace-nowrap text-bone-100">
              {b.value}
              {b.suffix ?? ""}
            </span>
          </div>
          <Track
            pct={(b.value / max) * 100}
            tone="lens"
            delay={idx * 0.08 + i * 0.06}
            reduce={reduce}
          />
        </div>
      ))}
    </div>
  );
}

function StepsCard({ d }: { d: Extract<CaseVisual, { kind: "steps" }> }) {
  return (
    <ol className="space-y-3">
      {d.steps.map((s, i) => (
        <li
          key={s}
          className="flex items-start gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3"
        >
          <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-lens-400/25 bg-lens-400/[0.08] font-mono text-[11px] text-lens-300">
            {i + 1}
          </span>
          <span className="text-sm leading-relaxed text-fog-300">{s}</span>
        </li>
      ))}
    </ol>
  );
}

function StackCard({ d }: { d: Extract<CaseVisual, { kind: "stack" }> }) {
  return (
    <ol className="space-y-3">
      {d.layers.map((l, i) => (
        <li
          key={l.label}
          style={{ marginLeft: i * 16 }}
          className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3"
        >
          <p className="text-sm font-medium text-bone-100">{l.label}</p>
          {l.detail ? (
            <p className="mt-1 font-mono text-[10px] tracking-[0.15em] text-fog-500 uppercase">
              {l.detail}
            </p>
          ) : null}
        </li>
      ))}
    </ol>
  );
}

export function CaseVisuals({ visuals }: { visuals: CaseVisual[] }) {
  const reduce = useReducedMotion();
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {visuals.map((v, i) => (
        <div
          key={`${v.kind}-${i}`}
          className={`rounded-2xl border border-white/[0.07] bg-ink-850 p-6 sm:p-7 ${
            visuals.length === 1 ? "lg:col-span-2" : ""
          }`}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-[11px] tracking-[0.2em] text-lens-300 uppercase">
                {v.title}
              </p>
              {v.caption ? (
                <p className="mt-2 text-sm leading-relaxed text-fog-500">{v.caption}</p>
              ) : null}
            </div>
            <span className="shrink-0 font-mono text-[10px] tracking-[0.2em] text-fog-500 uppercase">
              {String(i + 1).padStart(2, "0")}
            </span>
          </div>
          <div className="mt-6">
            {v.kind === "compare" && <CompareCard d={v} idx={i} reduce={reduce} />}
            {v.kind === "funnel" && <FunnelCard d={v} />}
            {v.kind === "bars" && <BarsCard d={v} idx={i} reduce={reduce} />}
            {v.kind === "steps" && <StepsCard d={v} />}
            {v.kind === "stack" && <StackCard d={v} />}
          </div>
        </div>
      ))}
    </div>
  );
}

export function CaseGallery({ images }: { images: string[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {images.map((src, i) => (
        <figure
          key={src}
          className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/[0.07] bg-ink-850"
        >
          <Image
            src={src}
            alt={`Case study visual ${i + 1}`}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover"
          />
        </figure>
      ))}
    </div>
  );
}