import Link from "next/link";
import { getSiteConfig } from "@/lib/content";
import { Reveal } from "@/components/primitives/reveal";
import { SectionHeading } from "@/components/primitives/section-heading";

export async function SelectedWork() {
  const site = await getSiteConfig();
  const selected = site.selectedWork;
  if (!selected?.cards?.length) return null;

  return (
    <section id="selected-work" className="border-t border-white/[0.05] py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          kicker={selected.kicker}
          title={
            <>
              {selected.titleBefore}
              <br />
              {selected.titleBreak}
            </>
          }
          content={<p>{selected.sub}</p>}
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {selected.cards.map((card, i) => (
            <Reveal key={card.slug} delay={i * 0.1} className="h-full">
              <Link
                href={`/work/${card.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-ink-850 transition-colors duration-300 hover:border-lens-400/30"
              >
                <div className="flex flex-1 flex-col gap-4 p-6 sm:p-7">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-mono text-[11px] tracking-[0.2em] text-lens-300 uppercase">
                      {card.category}
                    </p>
                    <span className="font-mono text-[11px] tracking-[0.2em] text-fog-500">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-medium tracking-tight text-bone-100 sm:text-2xl">
                    {card.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-fog-400">{card.body}</p>
                  <span className="mt-auto flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-lens-400/30 bg-lens-400/[0.07] px-3 py-1 font-mono text-[11px] tracking-[0.12em] text-lens-300 uppercase">
                      {card.result}
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-mono text-xs tracking-[0.15em] text-bone-100 uppercase">
                      Read case study
                      <span className="text-lens-300 transition-transform duration-300 group-hover:translate-x-1.5">
                        →
                      </span>
                    </span>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <Link
            href="/work"
            className="mt-10 inline-flex items-center gap-2 rounded-full border border-white/12 px-6 py-3 font-medium text-bone-100 transition-colors hover:border-lens-400/60 hover:bg-lens-400/10"
          >
            {selected.seeAll}
            <span aria-hidden>→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}