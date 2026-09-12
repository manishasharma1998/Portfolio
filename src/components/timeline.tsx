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
    <section id="journey" className="border-t border-white/[0.05] py-24 sm:py-32">
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
          content={
            <p>
              {copy.blurb}
            </p>
          }
        />

        <div ref={ref} className="relative mt-14 lg:ml-2">
          {/* track */}
          <div className="absolute top-0 left-[7px] h-full w-px bg-white/[0.08]" />
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
                        ? "border-lens-400 bg-ink-900 shadow-[0_0_18px_rgba(108,140,255,0.7)]"
                        : "border-white/25 bg-ink-900"
                    }`}
                  />
                </span>
                <div className="flex flex-col gap-1">
                  <p className="font-mono text-[11px] tracking-[0.2em] text-fog-500 uppercase">
                    {node.period}
                  </p>
                  <h3 className="font-display text-lg font-medium text-bone-100 sm:text-xl">
                    {node.role}
                    {i === 0 ? (
                      <span className="ml-3 rounded-full bg-lens-400/15 px-2.5 py-0.5 align-middle font-mono text-[10px] tracking-[0.15em] text-lens-300">
                        CURRENT
                      </span>
                    ) : null}
                  </h3>
                  <p className="text-sm font-medium text-fog-300">{node.org}</p>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-fog-500">
                    {node.body}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>

        <Reveal delay={0.1}>
          <p className="mt-12 max-w-2xl text-xs leading-relaxed text-fog-500 italic">
            {copy.overlapNote}
          </p>
        </Reveal>
      </div>
    </section>
  );
}