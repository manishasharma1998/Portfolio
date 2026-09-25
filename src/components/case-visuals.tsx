"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { CaseFigure, CaseVisual } from "@/lib/types";

function Track({
  pct,
  color,
  delay,
  reduce,
}: {
  pct: number;
  color: string;
  delay: number;
  reduce: boolean | null;
}) {
  return (
    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-line">
      <motion.div
        initial={reduce ? false : { width: "0%" }}
        whileInView={{ width: `${pct}%` }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7, ease: "easeOut", delay }}
        className="h-full rounded-full"
        style={{ backgroundColor: color }}
      />
    </div>
  );
}

function CompareCard({
  d,
  idx,
  reduce,
  labels,
}: {
  d: Extract<CaseVisual, { kind: "compare" }>;
  idx: number;
  reduce: boolean | null;
  labels: { before: string; after: string };
}) {
  const max = Math.max(d.before, d.after, 1);
  const delta = d.before - d.after;
  const sign = delta >= 0 ? "−" : "+";
  const before = d.beforeLabel ?? labels.before;
  const after = d.afterLabel ?? labels.after;
  return (
    <div className="space-y-5">
      <div>
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-[10px] tracking-[0.18em] text-fog-500 uppercase">
            {before}
          </span>
          <span className="font-display text-xl font-normal text-bone-100 tnum">
            {d.before}
            {d.unit ?? ""}
          </span>
        </div>
        <Track
          pct={(d.before / max) * 100}
          color="var(--fog-500)"
          delay={idx * 0.1}
          reduce={reduce}
        />
      </div>
      <div>
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-[10px] tracking-[0.18em] text-accent-400 uppercase">
            {after}
          </span>
          <span className="font-display text-xl font-normal text-accent-400 tnum">
            {d.after}
            {d.unit ?? ""}
          </span>
        </div>
        <Track
          pct={(d.after / max) * 100}
          color="var(--c-accent)"
          delay={idx * 0.1 + 0.12}
          reduce={reduce}
        />
      </div>
      <p className="font-mono text-[11px] tracking-[0.15em] text-accent-400 tnum">
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
    <ol className="flex flex-col">
      {d.steps.map((s, i) => (
        <li key={s.label} style={{ width: `${Math.max(50, 100 - i * 14)}%` }}>
          <div
            className={`flex items-center justify-between gap-3 rounded-md border px-4 py-3 ${
              i === 0
                ? "border-accent-400/40 bg-accent-soft"
                : "border-line bg-wash"
            }`}
          >
            <span className="text-sm leading-snug text-fog-500">{s.label}</span>
            <span
              className={`font-display text-base font-normal whitespace-nowrap tnum ${
                i === 0 ? "text-accent-400" : "text-bone-100"
              }`}
            >
              {s.value}
            </span>
          </div>
          {i < n - 1 ? <div className="h-3 w-px bg-line" /> : null}
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
    <div className="space-y-5">
      {d.bars.map((b, i) => (
        <div key={b.label}>
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm leading-snug text-fog-500">{b.label}</span>
            <span className="font-display text-base font-normal whitespace-nowrap text-bone-100 tnum">
              {b.value}
              {b.suffix ?? ""}
            </span>
          </div>
          <Track
            pct={(b.value / max) * 100}
            color="var(--c-accent)"
            delay={idx * 0.06 + i * 0.05}
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
          className="flex items-start gap-3 rounded-md border border-line bg-wash px-4 py-3"
        >
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-line bg-ink-850 font-mono text-[10px] text-accent-400 tnum">
            {i + 1}
          </span>
          <span className="text-sm leading-relaxed text-fog-500">{s}</span>
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
          className="rounded-md border border-line bg-wash px-4 py-3"
        >
          <p className="flex items-center gap-2 text-sm font-medium text-bone-100">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent-400" />
            {l.label}
          </p>
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

export function CaseVisuals({
  visuals,
  hue,
  labels,
}: {
  visuals: CaseVisual[];
  hue: number;
  labels?: { before: string; after: string };
}) {
  const reduce = useReducedMotion();
  const beforeLabel = labels?.before ?? "Before";
  const afterLabel = labels?.after ?? "After";
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {visuals.map((v, i) => (
        <div
          key={`${v.kind}-${i}`}
          className={`rounded-md border border-line bg-ink-850 p-6 sm:p-7 ${
            visuals.length === 1 ? "lg:col-span-2" : ""
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-line bg-wash font-mono text-[10px] text-accent-400 tnum">
              {i + 1}
            </span>
            <p className="font-mono text-[11px] tracking-[0.2em] text-bone-100 uppercase">
              {v.title}
            </p>
          </div>
          {v.caption ? (
            <p className="mt-3 text-sm leading-relaxed text-fog-500">{v.caption}</p>
          ) : null}
          <div className="mt-6">
            {v.kind === "compare" && (
              <CompareCard
                d={v}
                idx={i}
                reduce={reduce}
                labels={{ before: beforeLabel, after: afterLabel }}
              />
            )}
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

export function CasePoster({
  figure,
  hue,
  index,
}: {
  figure: CaseFigure;
  hue: number;
  index: number;
}) {
  return (
    <div className="relative overflow-hidden rounded-md border border-line bg-ink-850">
      <div className="grid gap-6 p-7 sm:p-10 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          {figure.eyebrow ? (
            <p className="font-mono text-[11px] tracking-[0.2em] text-accent-400 uppercase">
              {figure.eyebrow}
            </p>
          ) : null}
          {figure.title ? (
            <h3 className="mt-2 font-display text-2xl font-normal tracking-tight text-bone-100 sm:text-3xl">
              {figure.title}
            </h3>
          ) : null}
          {figure.text ? (
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-fog-500 sm:text-base">
              {figure.text}
            </p>
          ) : null}
        </div>
        <span
          aria-hidden
          className="hidden font-display text-7xl leading-none font-normal md:block"
          style={{ color: `hsl(${hue} 55% 45%)` }}
        >
          {String(index).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}

export function CaseGallery({ images, alt }: { images: string[]; alt?: string }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {images.map((src, i) => (
        <figure
          key={src}
          className="relative aspect-[16/10] overflow-hidden rounded-md border border-line bg-ink-850"
        >
          <Image
            src={src}
            alt={`${alt ?? "Case study visual"} ${i + 1}`}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover [filter:saturate(0.88)]"
          />
        </figure>
      ))}
    </div>
  );
}