import { getSiteConfig } from "@/lib/content";
import { SectionHeading } from "@/components/primitives/section-heading";
import { Reveal } from "@/components/primitives/reveal";

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
    <section id="ux-writing" className="border-t border-line py-20 sm:py-28">
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

        <div className="mt-12 border-t border-line">
          {uxw.examples.map((ex, i) => (
            <Reveal key={ex.label} className="h-full">
              <article className="grid gap-3 border-b border-line py-8 sm:grid-cols-12 sm:gap-8">
                <p className="font-mono text-[11px] tracking-[0.2em] text-bone-100 uppercase sm:col-span-3">
                  {ex.label}
                </p>
                <div className="sm:col-span-9">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <span className="font-mono text-[10px] tracking-[0.18em] text-fog-500 uppercase">
                        {ui.before}
                      </span>
                      <p className="mt-1.5 text-[15px] leading-relaxed text-fog-500 line-through decoration-fog-500/40">
                        {ex.before}
                      </p>
                    </div>
                    <div>
                      <span className="font-mono text-[10px] tracking-[0.18em] text-accent-400 uppercase">
                        {ui.after}
                      </span>
                      <p className="mt-1.5 text-[15px] leading-relaxed font-medium text-bone-100">
                        {ex.after}
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-fog-500">
                    <span className="font-mono text-[10px] tracking-[0.18em] text-bone-100 uppercase">
                      {ui.why}
                    </span>{" "}
                    {ex.why}
                  </p>
                  <span aria-hidden className="mt-5 hidden font-mono text-[10px] text-fog-500 tnum sm:block">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}