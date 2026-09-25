import { getSiteConfig } from "@/lib/content";
import { Reveal } from "@/components/primitives/reveal";
import { SectionHeading } from "@/components/primitives/section-heading";

export async function UxWriting() {
  const site = await getSiteConfig();
  const uxw = site.uxWriting;
  if (!uxw?.examples?.length) return null;

  const ui = site.ui.uxWriting ?? {
    before: "Before",
    after: "After",
    why: "Why",
  };

  return (
    <section id="ux-writing" className="border-t border-white/[0.05] py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          kicker={uxw.kicker}
          title={
            <>
              {uxw.titleBefore}
              <br />
              {uxw.titleBreak}
            </>
          }
          content={<p>{uxw.body}</p>}
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {uxw.examples.map((ex, i) => (
            <Reveal key={ex.label} delay={i * 0.1} className="h-full">
              <article className="flex h-full flex-col gap-5 rounded-2xl border border-white/[0.07] bg-ink-850 p-6 sm:p-7">
                <p className="font-mono text-[11px] tracking-[0.2em] text-lens-300 uppercase">
                  {ex.label}
                </p>

                <div className="space-y-2">
                  <span className="inline-block rounded-full border border-white/10 px-2.5 py-0.5 font-mono text-[10px] tracking-[0.18em] text-fog-500 uppercase">
                    {ui.before}
                  </span>
                  <p className="text-sm leading-relaxed text-fog-500 line-through decoration-fog-500/40">
                    {ex.before}
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="inline-block rounded-full border border-lens-400/30 bg-lens-400/[0.08] px-2.5 py-0.5 font-mono text-[10px] tracking-[0.18em] text-lens-300 uppercase">
                    {ui.after}
                  </span>
                  <p className="text-sm leading-relaxed font-medium text-bone-100">
                    {ex.after}
                  </p>
                </div>

                <div className="mt-auto border-t border-white/[0.06] pt-4">
                  <span className="font-mono text-[10px] tracking-[0.18em] text-fog-500 uppercase">
                    {ui.why}
                  </span>
                  <p className="mt-1.5 text-sm leading-relaxed text-fog-400">
                    {ex.why}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}