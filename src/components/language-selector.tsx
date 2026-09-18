"use client";

import { LOCALES, LOCALE_COOKIE, LOCALE_META, type Locale } from "@/lib/locales";

export function setLocaleCookie(next: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
}

export function LanguageSelector({
  locale,
  ariaLabel,
  tone = "nav",
}: {
  locale: Locale;
  ariaLabel: string;
  tone?: "nav" | "bar";
}) {
  const onChange = (next: string) => {
    setLocaleCookie(next as Locale);
    window.location.reload();
  };

  const base =
    tone === "bar"
      ? "rounded-full border border-lens-400/40 bg-ink-900/70 px-3 py-1.5 text-xs text-bone-100 backdrop-blur"
      : "rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-xs text-fog-300";

  return (
    <label className="relative inline-flex items-center">
      <span className="sr-only">{ariaLabel}</span>
      <span aria-hidden className="pointer-events-none absolute left-3 text-sm leading-none">
        {LOCALE_META[locale].flag}
      </span>
      <select
        value={locale}
        onChange={(e) => onChange(e.target.value)}
        aria-label={ariaLabel}
        className={`${base} cursor-pointer appearance-none pr-7 pl-8 outline-none transition-colors hover:border-lens-400/50 focus:border-lens-400/60`}
      >
        {LOCALES.map((code) => (
          <option key={code} value={code} className="bg-ink-900 text-bone-100">
            {LOCALE_META[code].native}
          </option>
        ))}
      </select>
      <span
        aria-hidden
        className="pointer-events-none absolute right-2.5 text-[8px] text-fog-500"
      >
        ▼
      </span>
    </label>
  );
}
