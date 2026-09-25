import Image from "next/image";
import { getSiteConfig } from "@/lib/content";
import { Reveal } from "@/components/primitives/reveal";
import { AccentText } from "@/components/primitives/accent-text";

export async function About() {
  const about = (await getSiteConfig()).about;
  const { polisci, ux, photos } = about;

  return (
    <section id="about" className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <Reveal className="lg:sticky lg:top-24">
            <p className="font-mono text-[11px] tracking-[0.25em] text-fog-500 uppercase">
              {about.kicker}
            </p>
            <h2 className="mt-3 font-display text-4xl leading-[1.05] font-normal tracking-tight text-bone-100 sm:text-5xl">
              {about.titleBefore}
              {about.titleAccent ? (
                <>
                  <br />
                  <AccentText text={`*${about.titleAccent.replace(/\*/g, "")}*`} />
                </>
              ) : null}
            </h2>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal delay={0.05}>
            <div className="space-y-5 text-[17px] leading-relaxed text-fog-500">
              {about.paragraphs.map((p) => (
                <p key={p.slice(0, 24)}>
                  <AccentText text={p} />
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
              <div>
                <p className="font-mono text-[11px] tracking-[0.2em] text-fog-500 uppercase">
                  {about.polisciLabel}
                </p>
                <ul className="mt-4 space-y-2.5 border-t border-line pt-4">
                  {polisci.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-[15px] leading-relaxed text-fog-500"
                    >
                      <span aria-hidden className="mt-[11px] inline-block h-px w-5 bg-accent-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-mono text-[11px] tracking-[0.2em] text-fog-500 uppercase">
                  {about.uxLabel}
                </p>
                <ul className="mt-4 space-y-2.5 border-t border-line pt-4">
                  {ux.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-[15px] leading-relaxed text-fog-500"
                    >
                      <span aria-hidden className="mt-[11px] inline-block h-px w-5 bg-accent-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <aside className="mt-12 border-l-2 border-accent-400 pl-5 sm:pl-6">
              <p className="font-mono text-[11px] tracking-[0.25em] text-fog-500 uppercase">
                {about.pivotLabel}
              </p>
              <p className="mt-3 max-w-2xl font-display text-xl leading-snug font-normal text-bone-100 sm:text-2xl">
                {about.pivot}
              </p>
              <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-fog-500 italic">
                {about.noVibe}
              </p>
            </aside>
          </Reveal>
        </div>
      </div>

      <div className="mt-14 grid gap-8 sm:grid-cols-3">
        {photos.map((p, i) => (
          <Reveal key={p.src} delay={i * 0.06} className="h-full">
            <figure className="group flex h-full flex-col">
              <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-line">
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover [filter:saturate(0.86)]"
                />
              </div>
              <figcaption className="mt-2.5 font-mono text-[10px] tracking-[0.15em] text-fog-500 uppercase">
                Fig. 0{i + 1} — {p.caption}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}