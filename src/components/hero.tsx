"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { SiteConfig } from "@/lib/types";
import { AccentText } from "@/components/primitives/accent-text";

export function Hero({ site }: { site: SiteConfig }) {
  const reduce = useReducedMotion();
  const [firstName, ...rest] = site.name.split(" ");
  const lastName = rest.join(" ");

  return (
    <section id="top" className="relative flex min-h-dvh flex-col">
      <motion.div
        initial={{ opacity: 0, y: reduce ? 0 : 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-end px-5 pt-28 pb-12 sm:px-8"
      >
        <p className="mb-6 flex items-center gap-3 font-mono text-[11px] tracking-[0.25em] text-fog-500 uppercase">
          <span className="inline-block h-px w-8 bg-accent-400" />
          {site.hero.eyebrow}
        </p>

        <div className="grid items-end gap-10 lg:grid-cols-[1fr_auto]">
          <div>
            <h1 className="font-display text-6xl leading-[0.98] font-normal tracking-tight text-bone-100 sm:text-7xl md:text-[6.5rem]">
              {firstName}
              {lastName ? (
                <>
                  <br />
                  {lastName}
                </>
              ) : null}
              <span className="text-accent-400">.</span>
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-snug font-medium text-bone-200 sm:text-2xl">
              <AccentText text={site.hero.line1} />
            </p>
            <p className="mt-1 max-w-xl text-lg leading-snug font-medium text-bone-200 sm:text-2xl">
              {site.hero.line2}
            </p>
          </div>

          <div className="hidden lg:block">
            <figure className="relative w-56 xl:w-64">
              <div className="overflow-hidden rounded-md border border-line">
                <Image
                  src="/images/profile.jpg"
                  alt={site.hero.portraitLabel}
                  width={1086}
                  height={1448}
                  priority
                  className="aspect-[3/4] w-full object-cover [filter:saturate(0.88)]"
                />
              </div>
              <figcaption className="mt-2.5 font-mono text-[10px] tracking-[0.2em] text-fog-500 uppercase">
                {site.hero.portraitLabel}
              </figcaption>
            </figure>
          </div>
        </div>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-fog-500 sm:text-lg">
          {site.hero.body ?? site.hero.warning}
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          {(
            [
              [site.hero.primaryCta, "/work", "primary"],
              [site.hero.secondaryCta, site.resume, "ghost"],
            ] as const
          ).map(([label, href, kind]) => (
            <a
              key={label}
              href={href}
              download={kind === "ghost"}
              className={
                kind === "primary"
                  ? "group inline-flex items-center gap-2 rounded-full bg-accent-400 px-6 py-3 font-medium text-accent-fg transition-colors hover:bg-accent-500"
                  : "inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3 font-medium text-bone-100 transition-colors hover:border-accent-400 hover:text-accent-400"
              }
            >
              {label}
              {kind === "primary" ? (
                <span aria-hidden>↓</span>
              ) : null}
            </a>
          ))}
        </div>

        <p className="mt-10 font-mono text-[11px] tracking-[0.18em] text-fog-500 uppercase">
          {site.relocationBadge}
        </p>
      </motion.div>

      <div className="mx-auto flex w-full max-w-6xl items-end justify-between px-5 pb-7 sm:px-8">
        <p className="font-mono text-[11px] tracking-[0.2em] text-fog-500 uppercase">
          {site.hero.scrollHint}
        </p>
      </div>

      <div aria-hidden className="absolute inset-0 border-b border-line" />
    </section>
  );
}