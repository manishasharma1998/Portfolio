import type { TimelineConfig } from "@/lib/types";
import { SectionHeading } from "@/components/primitives/section-heading";
import { Reveal, RevealItem } from "@/components/primitives/reveal";

export function Timeline({ copy }: { copy: TimelineConfig }) {
  return (
    <section id="journey" className="border-t border-line py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          kicker={copy.kicker}
          title={
            <>
              {copy.titleBefore}
              <br />
              {copy.titleBreak}
            </>
          }
          content={<p>{copy.blurb}</p>}
        />

        <div className="mt-14 grid items-start gap-12 lg:grid-cols-2 lg:gap-14">
          <div className="min-w-0">
            <p className="font-mono text-[11px] tracking-[0.25em] text-fog-500 uppercase">
              Experience
            </p>

            <div className="border-t border-line">
              {copy.items.map((node) => (
                <RevealItem key={node.org} className="border-b border-line py-6">
                  <p className="font-mono text-[11px] tracking-[0.2em] text-fog-500 uppercase tnum">
                    {node.period}
                  </p>
                  <h3 className="mt-1.5 font-display text-xl font-normal tracking-tight text-bone-100 sm:text-2xl">
                    {node.role}
                  </h3>
                  <p className="text-sm font-medium text-fog-400">{node.org}</p>
                  {node.bullets?.length ? (
                    <ul className="mt-3 max-w-2xl space-y-2">
                      {node.bullets.map((b) => (
                        <li
                          key={b}
                          className="flex items-start gap-3 text-sm leading-relaxed text-fog-500"
                        >
                          <span
                            aria-hidden
                            className="mt-[9px] inline-block h-px w-4 bg-accent-400"
                          />
                          {b}
                        </li>
                      ))}
                    </ul>
                  ) : node.body ? (
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-fog-500">
                      {node.body}
                    </p>
                  ) : null}
                </RevealItem>
              ))}
            </div>
          </div>

          <div className="min-w-0">
            <p className="font-mono text-[11px] tracking-[0.25em] text-fog-500 uppercase">
              {copy.education.label}
            </p>

            {copy.educationIntro ? (
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-fog-500">
                {copy.educationIntro}
              </p>
            ) : null}

            <div className="mt-6 border-t border-line">
              {copy.education.items.map((e, i) => (
                <RevealItem key={e.role} className="border-b border-line py-5">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[10px] text-fog-500 tnum">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-display text-lg font-normal tracking-tight text-bone-100">
                        {e.role}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-fog-400">{e.org}</p>
                    </div>
                    <p className="font-mono text-[10px] tracking-[0.15em] text-fog-500 uppercase whitespace-nowrap tnum">
                      {e.period}
                    </p>
                  </div>
                  {e.note ? (
                    <p className="mt-2 pl-6 font-mono text-[10px] tracking-[0.2em] text-fog-500 uppercase">
                      {e.note}
                    </p>
                  ) : null}
                </RevealItem>
              ))}
            </div>
          </div>
        </div>

        {copy.overlapNote ? (
          <Reveal delay={0.1}>
            <p className="mt-12 max-w-2xl text-xs leading-relaxed text-fog-500">
              {copy.overlapNote}
            </p>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}