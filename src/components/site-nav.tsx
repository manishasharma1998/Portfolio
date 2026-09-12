"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { NavLink } from "@/lib/types";

export function SiteNav({
  links,
  resumeHref,
}: {
  links: NavLink[];
  resumeHref: string;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background,border-color,backdrop-filter] duration-300 ${
        scrolled || open
          ? "border-b border-white/[0.06] bg-ink-900/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8"
        aria-label="Primary"
      >
        <a
          href="#top"
          onClick={close}
          className="font-display text-base font-semibold tracking-tight text-bone-100"
        >
          Manisha<span className="text-lens-400">.</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group relative rounded-full px-3.5 py-2 text-sm text-fog-400 transition-colors hover:text-bone-100"
              >
                {l.label}
                <span className="absolute inset-x-3.5 -bottom-px h-px origin-left scale-x-0 bg-lens-400 transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <a
            href={resumeHref}
            download
            className="inline-flex h-9 items-center gap-2 rounded-full border border-lens-400/40 px-4 text-sm text-lens-300 transition-colors hover:border-lens-400 hover:bg-lens-400/10"
          >
            Resume
          </a>
        </div>

        <button
          type="button"
          className="relative flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
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
            className="overflow-hidden border-t border-white/[0.06] bg-ink-900/95 backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col gap-1 px-5 py-4">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={close}
                    className="block rounded-lg px-3 py-2.5 text-base text-fog-300 transition-colors hover:bg-white/[0.04] hover:text-bone-100"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="mt-2">
                <a
                  href={resumeHref}
                  download
                  onClick={close}
                  className="block rounded-lg border border-lens-400/40 px-3 py-2.5 text-center text-base text-lens-300"
                >
                  Download resume
                </a>
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}