"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type TabKey = "caseStudies" | "designs";

export function WorkTabs({
  labels,
  caseStudies,
  designs,
}: {
  labels: { caseStudies: string; designs: string };
  caseStudies: ReactNode;
  designs: ReactNode;
}) {
  const [tab, setTab] = useState<TabKey>("caseStudies");
  const reduce = useReducedMotion();

  const tabs: { key: TabKey; label: string }[] = [
    { key: "caseStudies", label: labels.caseStudies },
    { key: "designs", label: labels.designs },
  ];

  return (
    <div className="border-t border-white/[0.05]">
      <div className="mx-auto max-w-6xl px-5 pt-14 sm:px-8">
        <div
          role="tablist"
          aria-label={`${labels.caseStudies} · ${labels.designs}`}
          className="inline-flex rounded-full border border-white/10 bg-ink-900 p-1"
        >
          {tabs.map((t) => {
            const active = tab === t.key;
            return (
              <button
                key={t.key}
                role="tab"
                id={`work-tab-${t.key}`}
                aria-selected={active}
                aria-controls={`work-panel-${t.key}`}
                onClick={() => setTab(t.key)}
                className={`relative rounded-full px-5 py-2 font-mono text-xs tracking-[0.2em] uppercase transition-colors duration-300 ${
                  active ? "text-bone-100" : "text-fog-500 hover:text-bone-100/80"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="work-tab-pill"
                    className="absolute inset-0 rounded-full bg-lens-400/15 ring-1 ring-lens-400/40"
                    transition={{ duration: 0.35, ease: [0.21, 0.6, 0.26, 1] }}
                  />
                )}
                <span className="relative z-10">{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={tab}
          role="tabpanel"
          id={`work-panel-${tab}`}
          aria-labelledby={`work-tab-${tab}`}
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: [0.21, 0.6, 0.26, 1] }}
        >
          {tab === "caseStudies" ? caseStudies : designs}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}