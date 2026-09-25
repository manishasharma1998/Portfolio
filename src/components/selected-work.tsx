import Link from "next/link";
import { getSiteConfig } from "@/lib/content";
import { SectionHeading } from "@/components/primitives/section-heading";
import { Reveal } from "@/components/primitives/reveal";

export async function SelectedWork() {
  const site = await getSiteConfig();
  const selected = site.selectedWork;
  if (!selected?.cards?.length) return null;

  return (
    <section id="selected-work" className="border-t border-line py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            kicker={selected.kicker}
            title={
              <>
                {selected.titleBefore} {selected.titleBreak}
              </>
            }
          />
          <Reveal delay={0.1}>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.15em] text-bone-100 uppercase transition-colors hover:text-accent-400"
            >
              {selected.seeAll}
              <span aria-hidden>→</span>
            </Link>
          </Reveal>
        </div>

        <p className="mt-4 max-w-xl text-base leading-relaxed text-fog-500">
          {selected.sub}
        </p>

        <Reveal className="mt-12 border-t border-line">
          {selected.cards.map((card, i) => {
            const lead = i === 0;
            return (
              <Link
                key={card.slug}
                href={`/work/${card.slug}`}
                className="group grid gap-3 border-b border-line py-7 transition-colors hover:bg-wash sm:py-9 lg:grid-cols-[3rem_1fr_auto] lg:items-baseline lg:gap-8"
              >
                <span className="font-mono text-sm tracking-[0.1em] text-fog-500 tnum">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-mono text-[11px] tracking-[0.2em] text-fog-500 uppercase">
                    {card.category}
                  </p>
                  <h3
                    className={`mt-1.5 font-display font-normal tracking-tight text-bone-100 ${
                      lead
                        ? "text-3xl leading-[1.05] sm:text-5xl"
                        : "text-2xl leading-[1.1] sm:text-3xl"
                    }`}
                  >
                    {card.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-fog-500 sm:text-base">
                    {card.body}
                  </p>
                </div>
                <div className="flex flex-col gap-2 lg:items-end lg:text-right">
                  <p className="font-mono text-[11px] tracking-[0.15em] text-fog-500 uppercase">
                    {card.result}
                  </p>
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs tracking-[0.15em] text-bone-100 uppercase">
                    Read case study
                    <span
                      aria-hidden
                      className="transition-transform duration-300 group-hover:translate-x-1.5"
                    >
                      →
                    </span>
                  </span>
                </div>
              </Link>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}