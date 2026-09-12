"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { CaseFigure, CaseVisual } from "@/lib/types";

const col = (h: number, s: number, l: number, a?: number) =>
  a === undefined ? `hsl(${h} ${s}% ${l}%)` : `hsl(${h} ${s}% ${l}% / ${a})`;

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
    <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/[0.07]">
      <motion.div
        initial={reduce ? false : { width: "0%" }}
        whileInView={{ width: `${pct}%` }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.9, ease: "easeOut", delay }}
        className="h-full rounded-full"
        style={{ backgroundColor: color }}
      />
    </div>
  );
}

function CompareCard({
  d,
  hue,
  idx,
  reduce,
}: {
  d: Extract<CaseVisual, { kind: "compare" }>;
  hue: number;
  idx: number;
  reduce: boolean | null;
}) {
  const max = Math.max(d.before, d.after, 1);
  const delta = d.before - d.after;
  const sign = delta >= 0 ? "−" : "+";
  const before = d.beforeLabel ?? "Before";
  const after = d.afterLabel ?? "After";
  return (
    <div className="space-y-5">
      <div>
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-[10px] tracking-[0.18em] text-fog-400 uppercase">
            {before}
          </span>
          <span className="font-display text-xl font-semibold text-bone-100">
            {d.before}
            {d.unit ?? ""}
          </span>
        </div>
        <Track
          pct={(d.before / max) * 100}
          color="#81889e"
          delay={idx * 0.1}
          reduce={reduce}
        />
      </div>
      <div>
        <div className="flex items-center justify-between gap-3">
          <span
            className="font-mono text-[10px] tracking-[0.18em] uppercase"
            style={{ color: col(hue, 80, 72) }}
          >
            {after}
          </span>
          <span
            className="font-display text-xl font-semibold"
            style={{ color: col(hue, 85, 65) }}
          >
            {d.after}
            {d.unit ?? ""}
          </span>
        </div>
        <Track
          pct={(d.after / max) * 100}
          color={col(hue, 88, 62)}
          delay={idx * 0.1 + 0.15}
          reduce={reduce}
        />
      </div>
      <p
        className="inline-block rounded-full px-3 py-1 font-mono text-[11px] tracking-[0.18em] uppercase"
        style={{
          backgroundColor: col(hue, 80, 55, 0.14),
          color: col(hue, 85, 70),
        }}
      >
        Δ {sign}
        {Math.abs(delta)}
        {d.unit ?? ""}
      </p>
    </div>
  );
}

function FunnelCard({ d, hue }: { d: Extract<CaseVisual, { kind: "funnel" }>; hue: number }) {
  const n = d.steps.length;
  return (
    <ol className="flex flex-col">
      {d.steps.map((s, i) => (
        <li key={s.label} style={{ width: `${Math.max(50, 100 - i * 14)}%` }}>
          <div
            className="flex items-center justify-between gap-3 rounded-xl border px-4 py-3"
            style={
              i === 0
                ? {
                    borderColor: col(hue, 90, 62, 0.35),
                    backgroundColor: col(hue, 85, 55, 0.12),
                  }
                : {
                    borderColor: "rgba(255,255,255,0.08)",
                    backgroundColor: "rgba(255,255,255,0.03)",
                  }
            }
          >
            <span className="text-sm leading-snug text-fog-300">{s.label}</span>
            <span
              className="font-display text-base font-semibold whitespace-nowrap"
              style={{
                color: i === 0 ? col(hue, 85, 68) : "#f4f1ec",
              }}
            >
              {s.value}
            </span>
          </div>
          {i < n - 1 ? <div className="h-3 w-px bg-white/[0.12]" /> : null}
        </li>
      ))}
    </ol>
  );
}

function BarsCard({
  d,
  hue,
  idx,
  reduce,
}: {
  d: Extract<CaseVisual, { kind: "bars" }>;
  hue: number;
  idx: number;
  reduce: boolean | null;
}) {
  const max = Math.max(...d.bars.map((b) => b.value), 1);
  return (
    <div className="space-y-5">
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
            color={col(hue + i * 45, 88, 62)}
            delay={idx * 0.08 + i * 0.06}
            reduce={reduce}
          />
        </div>
      ))}
    </div>
  );
}

function StepsCard({ d, hue }: { d: Extract<CaseVisual, { kind: "steps" }>; hue: number }) {
  return (
    <ol className="space-y-3">
      {d.steps.map((s, i) => (
        <li
          key={s}
          className="flex items-start gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3"
        >
          <span
            className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg font-mono text-[11px]"
            style={{
              backgroundColor: col(hue, 80, 55, 0.14),
              color: col(hue, 85, 72),
              border: `1px solid ${col(hue, 80, 62, 0.35)}`,
            }}
          >
            {i + 1}
          </span>
          <span className="text-sm leading-relaxed text-fog-300">{s}</span>
        </li>
      ))}
    </ol>
  );
}

function StackCard({ d, hue }: { d: Extract<CaseVisual, { kind: "stack" }>; hue: number }) {
  return (
    <ol className="space-y-3">
      {d.layers.map((l, i) => (
        <li
          key={l.label}
          style={{ marginLeft: i * 16 }}
          className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3"
        >
          <p className="flex items-center gap-2 text-sm font-medium text-bone-100">
            <span
              className="h-2 w-2 shrink-0 rounded-full"
              style={{ backgroundColor: col(hue + i * 30, 90, 60) }}
            />
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

export function CaseVisuals({ visuals, hue }: { visuals: CaseVisual[]; hue: number }) {
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
          <div className="flex items-center gap-3">
            <span
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md font-mono text-[10px] font-semibold"
              style={{
                backgroundColor: col(hue, 80, 55, 0.14),
                color: col(hue, 85, 72),
                border: `1px solid ${col(hue, 80, 62, 0.3)}`,
              }}
            >
              {i + 1}
            </span>
            <p
              className="font-mono text-[11px] tracking-[0.2em] uppercase"
              style={{ color: col(hue, 75, 72) }}
            >
              {v.title}
            </p>
          </div>
          {v.caption ? (
            <p className="mt-3 text-sm leading-relaxed text-fog-500">{v.caption}</p>
          ) : null}
          <div className="mt-6">
            {v.kind === "compare" && <CompareCard d={v} hue={hue} idx={i} reduce={reduce} />}
            {v.kind === "funnel" && <FunnelCard d={v} hue={hue} />}
            {v.kind === "bars" && <BarsCard d={v} hue={hue} idx={i} reduce={reduce} />}
            {v.kind === "steps" && <StepsCard d={v} hue={hue} />}
            {v.kind === "stack" && <StackCard d={v} hue={hue} />}
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
  const h = figure.hue ?? hue;
  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-white/[0.08]"
      style={{
        background: `linear-gradient(135deg, ${col(h, 85, 32)}, ${col(h + 50, 90, 16)})`,
      }}
    >
      <div
        className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full opacity-50"
        style={{
          background: `radial-gradient(circle, ${col(h, 95, 60, 0.9)}, transparent 70%)`,
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-24 -left-10 h-72 w-72 rounded-full opacity-40"
        style={{
          background: `radial-gradient(circle, ${col(h + 70, 95, 65, 0.7)}, transparent 70%)`,
        }}
      />
      <div className="relative z-10 grid gap-8 p-7 sm:p-10 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-3 py-1 font-mono text-[10px] tracking-[0.2em] text-white uppercase backdrop-blur-sm">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: col(h, 95, 70) }}
            />
            {figure.eyebrow}
          </span>
          <h3 className="mt-4 font-display text-2xl font-medium tracking-tight text-white sm:text-3xl">
            {figure.title}
          </h3>
          {figure.text ? (
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">
              {figure.text}
            </p>
          ) : null}
        </div>
        <div className="hidden items-center gap-5 pr-4 md:flex">
          <span
            className="font-display text-6xl font-bold leading-none"
            style={{ color: col(h + 65, 95, 72, 0.35) }}
          >
            {String(index).padStart(2, "0")}
          </span>
          <div className="flex flex-col gap-2">
            {[0, 1, 2].map((r) => (
              <span
                key={r}
                className="block h-1.5 w-16 rounded-full"
                style={{
                  backgroundColor: col(h + 30, 90, 65, 0.45 - r * 0.12),
                  width: `${[68, 48, 30][r]}px`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
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