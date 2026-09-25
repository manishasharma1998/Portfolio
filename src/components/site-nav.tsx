"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { NavLink, UiStrings } from "@/lib/types";
import type { Locale } from "@/lib/locales";
import { LanguageSelector } from "@/components/language-selector";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteNav({
  links,
  resumeHref,
  locale,
  ui,
}: {
  links: NavLink[];
  resumeHref: string;
  locale: Locale;
  ui: UiStrings;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background,border-color] duration-300 ${
        scrolled || open
          ? "border-b border-line bg-background/90 backdrop-blur-sm"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8"
        aria-label={ui.nav.primaryAria}
      >
        <a
          href="/"
          onClick={close}
          className="font-display text-xl font-normal tracking-tight text-bone-100"
        >
          Manisha<span className="text-accent-400">.</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-full px-3.5 py-2 text-sm text-fog-400 transition-colors hover:text-bone-100"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 md:flex">
          <LanguageSelector locale={locale} ariaLabel={ui.language.switcherAria} />
          <ThemeToggle />
          <a
            href={resumeHref}
            download
            className="inline-flex h-9 items-center gap-2 rounded-full border border-line-strong px-4 text-sm text-bone-100 transition-colors hover:border-accent-400 hover:text-accent-400"
          >
            {ui.nav.resume}
          </a>
        </div>

        <button
          type="button"
          className="relative flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? ui.nav.closeMenu : ui.nav.openMenu}
        >
          <span
            className={`block h-px w-5 bg-bone-100 transition-transform duration-300 ${
              open ? "translate-y-[4px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-px w-5 bg-bone-100 transition-transform duration-300 ${
              open ? "-translate-y-[4px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-line bg-background/95 backdrop-blur-sm md:hidden"
          >
            <ul className="flex flex-col gap-1 px-5 py-4">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={close}
                    className="block rounded-lg px-3 py-2.5 text-base text-fog-300 transition-colors hover:bg-wash hover:text-bone-100"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="mt-2 flex items-center justify-between gap-3 px-3">
                <LanguageSelector locale={locale} ariaLabel={ui.language.switcherAria} />
                <ThemeToggle />
                <a
                  href={resumeHref}
                  download
                  onClick={close}
                  className="flex-1 rounded-full border border-line-strong px-3 py-2 text-center text-sm text-bone-100 transition-colors hover:border-accent-400 hover:text-accent-400"
                >
                  {ui.nav.downloadResume}
                </a>
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}