import { getSiteConfig } from "@/lib/content";
import { Reveal } from "@/components/primitives/reveal";
import { SectionHeading } from "@/components/primitives/section-heading";

export async function Testimonials() {
  const site = await getSiteConfig();
  const t = site.testimonials;
  if (!t?.items?.length) return null;

  return (
    <section id="testimonials" className="border-t border-white/[0.05] py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          kicker={t.kicker}
          title={
            <>
              {t.titleBefore}
              <br />
              {t.titleBreak}
            </>
          }
          content={<p>{t.sub}</p>}
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {t.items.map((item, i) => (
            <Reveal key={item.name} delay={i * 0.1} className="h-full">
              <blockquote className="flex h-full flex-col gap-5 rounded-2xl border border-white/[0.07] bg-ink-850 p-6 sm:p-7">
                <span aria-hidden className="font-display text-4xl leading-none text-lens-400">
                  "
                </span>
                <p className="text-base leading-relaxed text-fog-300">{item.quote}</p>
                <footer className="mt-auto border-t border-white/[0.06] pt-4">
                  <p className="font-display text-sm font-medium text-bone-100">
                    {item.name}
                  </p>
                  <p className="mt-0.5 font-mono text-[11px] tracking-[0.15em] text-fog-500 uppercase">
                    {item.role}, {item.company}
                  </p>
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}