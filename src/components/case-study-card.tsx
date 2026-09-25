"use client";

import Link from "next/link";
import type { CaseStudy } from "@/lib/types";

export function CaseStudyCard({
  study,
  labels,
}: {
  study: CaseStudy;
  labels?: { view: string; open: string };
}) {
  const outer = study.external ?? `/work/${study.slug}`;
  const isExternal = Boolean(study.external);

  const inner = (
    <>
      <div className="relative flex aspect-[16/10] flex-col items-start justify-between overflow-hidden border-b border-line bg-ink-800 p-6 sm:p-7">
        <span
          className="font-mono text-xs tracking-[0.2em] tnum"
          style={{ color: `hsl(${study.cover.hue} 55% 45%)` }}
        >
          {study.index}
        </span>
        <div className="flex flex-col gap-1.5">
          <span className="font-display text-3xl leading-[1.02] font-normal tracking-tight text-bone-100 sm:text-4xl">
            {study.cover.title}
          </span>
          <span className="max-w-[24ch] font-mono text-[10px] leading-snug tracking-[0.12em] text-fog-500 uppercase">
            {study.cover.subtitle}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6 sm:p-7">
        <div>
          <p className="font-mono text-[11px] tracking-[0.2em] text-accent-400 uppercase">
            {study.category}
          </p>
          <h3 className="mt-2 font-display text-2xl font-normal tracking-tight text-bone-100">
            {study.title}
          </h3>
        </div>

        <p className="text-sm leading-relaxed text-fog-500">{study.problem}</p>

        <p className="mt-auto font-mono text-[11px] tracking-[0.12em] text-fog-500 uppercase">
          {study.chips.join("  ·  ")}
        </p>

        <span className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.15em] text-bone-100 uppercase transition-colors group-hover:text-accent-400">
          {isExternal ? labels?.open ?? "Open project" : labels?.view ?? "View case study"}
          <span
            aria-hidden
            className="transition-transform duration-300 group-hover:translate-x-1.5"
          >
            →
          </span>
        </span>
      </div>
    </>
  );

  const cls =
    "group flex h-full flex-col overflow-hidden rounded-md border border-line bg-ink-850 transition-colors duration-300 hover:border-accent-400/50";

  if (isExternal) {
    return (
      <a
        href={outer}
        target="_blank"
        rel="noopener noreferrer"
        className={cls}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link href={outer} className={cls}>
      {inner}
    </Link>
  );
}