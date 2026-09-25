"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LOCALE_META, type Locale } from "@/lib/locales";
import { LanguageSelector } from "./language-selector";

export function AnnouncementBar({
  locale,
  notice,
  change,
  dismiss,
  switcherAria,
}: {
  locale: Locale;
  notice: string;
  change: string;
  dismiss: string;
  switcherAria: string;
}) {
  const [hidden, setHidden] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem("lang-notice-dismissed")) setHidden(true);
    } catch {
      /* noop */
    }
    setReady(true);
  }, []);

  const close = () => {
    try {
      sessionStorage.setItem("lang-notice-dismissed", "1");
    } catch {
      /* noop */
    }
    setHidden(true);
  };

  const text = notice.replace("{language}", LOCALE_META[locale].native);

  return (
    <AnimatePresence>
      {ready && !hidden ? (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="pointer-events-none fixed inset-x-0 top-16 z-40 flex justify-center px-4 pt-2"
        >
          <div className="pointer-events-auto flex max-w-3xl flex-wrap items-center justify-center gap-x-3 gap-y-2 rounded-lg border border-line bg-background/95 px-4 py-2.5 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.25)] backdrop-blur-sm">
            <p className="text-center text-xs leading-relaxed text-fog-300">
              {text} <span className="text-fog-500">{change}</span>
            </p>
            <LanguageSelector locale={locale} ariaLabel={switcherAria} tone="bar" />
            <button
              type="button"
              onClick={close}
              aria-label={dismiss}
              className="flex h-6 w-6 items-center justify-center rounded-full border border-white/10 text-fog-500 transition-colors hover:border-white/20 hover:text-bone-100"
            >
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path
                  d="M1 1l10 10M11 1L1 11"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
