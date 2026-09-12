import Image from "next/image";
import { getSiteConfig } from "@/lib/content";
import { Reveal } from "@/components/primitives/reveal";
import { SectionHeading } from "@/components/primitives/section-heading";
import { AccentText } from "@/components/primitives/accent-text";

export function About() {
  const about = getSiteConfig().about;
  const { polisci, ux, photos } = about;

  return (
    <section id="about" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <SectionHeading
        kicker={about.kicker}
        title={
          <>
            {about.titleBefore}
            <br />
            {about.titleAccent ? (
              <AccentText text={`*${about.titleAccent.replace(/\*/g, "")}*`} />
            ) : null}
          </>
        }
      />

      <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal delay={0.05}>
          <div className="space-y-5 text-base leading-relaxed text-fog-400 sm:text-lg">
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>
                <AccentText text={p} />
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="grid gap-4">
            <div className="rounded-2xl border border-white/[0.07] bg-ink-850 p-6 sm:p-7">
              <p className="font-mono text-[11px] tracking-[0.25em] text-fog-500 uppercase">
                {about.polisciLabel}
              </p>
              <ul className="mt-4 space-y-2.5 text-fog-300">
                {polisci.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm sm:text-base">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-center gap-4 font-mono text-[11px] tracking-[0.2em] text-fog-500 uppercase">
              <span className="h-px flex-1 bg-white/[0.06]" />
              {about.bridge}
              <span className="h-px flex-1 bg-white/[0.06]" />
            </div>

            <div className="rounded-2xl border border-lens-400/20 bg-lens-400/[0.05] p-6 sm:p-7">
              <p className="font-mono text-[11px] tracking-[0.25em] text-lens-300 uppercase">
                {about.uxLabel}
              </p>
              <ul className="mt-4 space-y-2.5 text-fog-300">
                {ux.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm sm:text-base">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-lens-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.1} className="mt-12">
        <div className="rounded-2xl border border-white/[0.07] bg-gradient-to-br from-ink-850 via-ink-900 to-ink-850 p-6 sm:p-8">
          <p className="font-mono text-[11px] tracking-[0.25em] text-fog-500 uppercase">
            {about.pivotLabel}
          </p>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-fog-400 sm:text-lg">
            {about.pivot}
          </p>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-fog-500 italic sm:text-lg">
            {about.noVibe}
          </p>
        </div>
      </Reveal>

      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        {photos.map((p, i) => (
          <Reveal key={p.src} delay={i * 0.08} className="h-full">
            <figure className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-ink-850">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
                <div
                  className="absolute inset-0 opacity-40 mix-blend-overlay"
                  style={{
                    background: `radial-gradient(80% 80% at 20% 0%, hsl(${p.hue} 70% 30% / 0.7), transparent 70%)`,
                  }}
                />
              </div>
              <figcaption className="mt-auto px-4 py-3 font-mono text-[11px] tracking-[0.12em] text-fog-400 uppercase">
                {p.caption}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}