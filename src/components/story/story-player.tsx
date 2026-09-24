"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

type Step = {
  screen: string;
  chapter: string;
  title: string;
  body: string;
  quote?: string;
  notes?: { n: number; text: string; x?: number; y?: number }[];
};

type Ui = {
  label: string;
  steps: string;
  prev: string;
  next: string;
};

export function StoryPlayer({
  story,
  hue,
  ui,
}: {
  story: Step[];
  hue: number;
  ui: Ui;
}) {
  const total = story.length;
  const accent = `hsl(${hue} 80% 60%)`;
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const prevGlyph = "left";
  const nextGlyph = "right";

  const go = useCallback((target: number) => {
    setDirection(target > page ? 1 : -1);
    setPage(Math.max(0, Math.min(total - 1, target)));
  }, [page, total]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => go(page + (e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0));
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, page]);

  const step = story[page];
  const isLast = page === total - 1;

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -60 : 60, opacity: 0 }),
  };

  return (
    <section aria-label={ui.label} className="bg-ink-950">
      <div className="pointer-events-none absolute left-1/2 top-16 -translate-x-1/2 font-mono text-[10rem] font-bold uppercase text-white/[0.04]">
        {String(page + 1).padStart(2, "0")}
      </div>

      <div className="mx-auto flex h-dvh max-w-6xl flex-col pt-16">
        <div className="flex items-center justify-between px-5 py-4 sm:px-8">
          <Link href="/work" className="font-mono text-xs text-fog-400 uppercase">{"<-"} {ui.prev}</Link>
          <span className="font-mono text-[10px] tracking-[0.18em] text-fog-500 uppercase">{ui.label}</span>
          <span className="font-mono text-[10px] text-fog-500">{page + 1}/{total}</span>
        </div>

        <div className="flex flex-1 items-center gap-8 overflow-hidden px-5 sm:px-8">
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.div
              key={page}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="flex h-full min-h-0 w-full items-center justify-center gap-8"
            >
              <div className="relative hidden w-full max-w-[320px] shrink-0 lg:block">
                <div className="relative mx-auto aspect-[3/4] w-full max-w-[260px]">
                  <span className="absolute left-0 top-8 h-3 w-3 rounded-full" style={{ background: accent }} />
                  <span className="absolute right-2 top-4 h-2 w-2 rounded-full bg-fog-500/40" />
                  <span className="absolute bottom-6 left-3 h-2 w-2 rounded-full bg-fog-500/40" />

                  <div className="absolute bottom-0 left-1/2 w-[16rem] -translate-x-1/2 overflow-hidden rounded-t-[6rem]" style={{ background: `hsl(${hue} 42% 20%)` }}>
                    <div className="flex items-end justify-center gap-5 px-6 pb-4">
                      <span className="block h-10 w-14 rounded-t-[3rem] bg-ink-900" />
                      <span className="block h-16 w-14 rounded-t-[3.4rem] bg-ink-800" />
                      <span className="block h-9 w-14 rounded-t-[3rem] bg-ink-900" />
                    </div>
                  </div>

                  <div className="absolute bottom-24 left-1/2 h-36 w-36 -translate-x-1/2 rounded-full" style={{ background: accent }}>
                    <div className="absolute inset-0">
                      <span className="absolute top-11 left-1/2 block h-16 w-10 -translate-x-1/2 rounded-full bg-ink-800" />
                      <span className="absolute bottom-10 left-1/2 block h-14 w-9 -translate-x-1/2 rounded-full bg-ink-800" />
                    </div>
                    <span className="absolute left-1/2 top-[4.4rem] z-10 h-4 w-24 -translate-x-1/2 rounded-full bg-ink-950" />
                  </div>
                </div>

                <div className="absolute inset-x-0 top-0">
                  <div className="relative rounded-2xl rounded-bl-none border border-white/10 bg-ink-800 p-4">
                    <span className="absolute -bottom-2 left-4 h-4 w-4 rotate-45 border-b border-r border-white/10 bg-ink-800" />
                    <p className="font-mono text-[10px] tracking-[0.15em] text-fog-400 uppercase">{step.chapter}</p>
                    <p className="mt-2 text-sm leading-relaxed italic text-bone-100">
                      {"\u201c"}{step.quote ?? step.title}{"\u201d"}
                    </p>
                  </div>
                </div>

                {step.notes?.length ? (
                  <div className="absolute inset-0">
                    {step.notes.map((n) => (
                      <span
                        key={n.n}
                        aria-hidden
                        className="absolute grid h-6 w-6 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-[10px] font-bold text-ink-950"
                        style={{ left: `${n.x ?? 8}%`, top: `${n.y ?? 8}%`, background: accent }}
                      >
                        {n.n}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>

              <div className="max-w-xl">
                <p className="font-mono text-[10px] tracking-[0.15em] text-fog-400 uppercase">{step.chapter}</p>
                <h2 className="mt-2 font-mono text-2xl font-semibold tracking-tight text-bone-100 sm:text-3xl">
                  {step.title}
                </h2>
                <p className="mt-3 text-fog-300">{step.body}</p>
                {step.quote ? (
                  <blockquote className="mt-4 rounded-2xl rounded-bl-none border border-lens-400/40 bg-lens-400/5 p-4 italic text-bone-100">
                    {"\u201c"}{step.quote}{"\u201d"}
                  </blockquote>
                ) : null}
                {step.notes?.length ? (
                  <ul className="mt-5 space-y-2">
                    {step.notes.map((n) => (
                      <li key={n.n} className="flex items-start gap-2 text-sm text-fog-400">
                        <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full text-[10px] font-bold text-ink-950" style={{ background: accent }}>
                          {n.n}
                        </span>
                        <span>{n.text}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <footer className="border-t border-white/10">
          <div className="h-1 w-full bg-white/10">
            <span className="block h-full transition-all duration-300" style={{ width: `${((page + 1) / total) * 100}%`, background: accent }} />
          </div>
          <div className="flex items-center justify-between px-5 py-3 sm:px-8">
            <button type="button" onClick={() => go(page - 1)} disabled={page === 0} className="font-mono text-xs text-fog-400 uppercase disabled:opacity-30" aria-label={ui.prev}>
              {prevGlyph}
            </button>
            <button type="button" onClick={() => go(page + 1)} disabled={isLast} className="font-mono text-xs text-fog-400 uppercase disabled:opacity-30" aria-label={ui.next}>
              {nextGlyph}
            </button>
          </div>
        </footer>
      </div>
    </section>
  );
}
