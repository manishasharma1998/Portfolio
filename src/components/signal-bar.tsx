"use client";

import type { Metric } from "@/lib/types";
import { Counter } from "@/components/primitives/counter";
import { RevealStagger, RevealItem } from "@/components/primitives/reveal";

export function SignalBar({ metrics }: { metrics: Metric[] }) {
  return (
    <section aria-label="Key results" className="border-b border-white/[0.06]">
      <RevealStagger className="mx-auto grid max-w-6xl grid-cols-2 divide-white/[0.06] sm:grid-cols-4 sm:divide-x">
        {metrics.map((m) => (
          <RevealItem
            key={m.label}
            className="flex flex-col gap-1.5 px-6 py-9 sm:px-8"
          >
            <span className="font-display text-4xl font-semibold tracking-tight text-bone-100 sm:text-5xl">
              <Counter value={m.value} suffix={m.suffix} />
            </span>
            <span className="font-mono text-[11px] tracking-[0.18em] text-fog-500 uppercase">
              {m.label}
            </span>
          </RevealItem>
        ))}
      </RevealStagger>
    </section>
  );
}