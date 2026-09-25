"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import type { TimelineConfig } from "@/lib/types";
import { SectionHeading } from "@/components/primitives/section-heading";
import { Reveal, RevealItem, RevealStagger } from "@/components/primitives/reveal";

export function Timeline({ copy }: { copy: TimelineConfig }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.7", "end 0.7"],
  });
  const fill = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 30,
    mass: 0.4,
  });

  return (
    <section id="journey" className="border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          kicker={copy.kicker}
          title={
            <>
              {copy.titleBefore}
              <br />
              {copy.titleBreak}
            </>
          }
          content={<p>{copy.blurb}</p>}
        />

        <div className="mt-14 grid items-start gap-12 lg:grid-cols-2 lg:gap-8">
          {/* Experience */}
          <div className="min-w-0">
            <p className="font-mono text-xs tracking-[0.3em] text-lens-300 uppercase">
              Experience
            </p>

            <div ref={ref} className="relative mt-8 lg:ml-2">
              {/* track */}
              <div className="absolute top-0 left-[7px] h-full w-px bg-line-strong" />
              {/* fill */}
              {!reduce ? (
                <motion.div
                  aria-hidden
                  style={{ scaleY: fill }}
                  className="absolute top-0 left-[7px] h-full w-px origin-top bg-gradient-to-b from-lens-400 via-accent-400 to-lens-400/40"
                />
              ) : null}

              <RevealStagger className="flex flex-col gap-10" stagger={0.12}>
                {copy.items.map((node, i) => (
                  <RevealItem key={node.org} className="relative pl-10">
                    <span className="absolute top-1 left-0 flex items-center justify-center">
                      <span
                        className={`h-[15px] w-[15px] rounded-full border-2 ${
                          i === 0
                            ? "border-lens-400 bg-background shadow-[0_0_18px_rgba(108,140,255,0.7)]"
                            : "border-line-strong bg-background"
                        }`}
                      />
                    </span>
                    <div className="flex flex-col gap-1">
                      <p className="font-mono text-[11px] tracking-[0.2em] text-fog-500 uppercase">
                        {node.period}
                      </p>
                      <h3 className="font-display text-lg font-medium text-bone-100 sm:text-xl">
                        {node.role}
                      </h3>
                      <p className="text-sm font-medium text-fog-300">{node.org}</p>
                      {node.bullets?.length ? (
                        <ul className="mt-2 max-w-2xl space-y-2">
                          {node.bullets.map((b) => (
                            <li
                              key={b}
                              className="flex items-start gap-2 text-sm leading-relaxed text-fog-500"
                            >
                              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-lens-400" />
                              {b}
                            </li>
                          ))}
                        </ul>
                      ) : node.body ? (
                        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-fog-500">
                          {node.body}
                        </p>
                      ) : null}
                    </div>
                  </RevealItem>
                ))}
              </RevealStagger>
            </div>
          </div>

          {/* Education */}
          <div className="min-w-0">
            <p className="font-mono text-xs tracking-[0.3em] text-lens-300 uppercase">
              {copy.education.label}
            </p>

            {copy.educationIntro ? (
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-fog-500 italic">
                {copy.educationIntro}
              </p>
            ) : null}

            <RevealStagger
              className="mt-6 flex flex-col gap-3"
              stagger={0.07}
              delayChildren={0.05}
            >
              {copy.education.items.map((e, i) => (
                <RevealItem
                  key={e.role}
                  className="group rounded-2xl border border-line bg-ink-850 transition-colors duration-300 hover:border-lens-400/30"
                >
                  <div className="flex items-start gap-3 p-4 sm:p-5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-lens-400/25 bg-lens-400/[0.08] font-mono text-[11px] text-lens-300">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
                        <h3 className="font-display text-base font-medium leading-snug text-bone-100">
                          {e.role}
                        </h3>
                        <span className="inline-flex rounded-full border border-line-strong px-2.5 py-1 font-mono text-[10px] leading-none tracking-[0.15em] whitespace-nowrap text-lens-300">
                          {e.period}
                        </span>
                      </div>
                      <p className="mt-1 text-sm font-medium text-fog-300">{e.org}</p>
                      {e.note ? (
                        <p className="mt-2 font-mono text-[10px] tracking-[0.2em] text-fog-500 uppercase">
                          {e.note}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </RevealItem>
              ))}
            </RevealStagger>
          </div>
        </div>

        {copy.overlapNote ? (
          <Reveal delay={0.1}>
            <p className="mt-12 max-w-2xl text-xs leading-relaxed text-fog-500 italic">
              {copy.overlapNote}
            </p>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}