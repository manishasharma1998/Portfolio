import { getSiteConfig } from "@/lib/content";
import { SectionHeading } from "@/components/primitives/section-heading";
import { Reveal } from "@/components/primitives/reveal";

export async function Testimonials() {
  const site = await getSiteConfig();
  const t = site.testimonials;
  if (!t?.items?.length) return null;

  return (
    <section id="testimonials" className="border-t border-line py-20 sm:py-28">
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

        <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {t.items.map((item, i) => (
            <Reveal key={item.name} delay={i * 0.06} className="h-full">
              <figure className="flex h-full flex-col justify-between gap-8 border-t border-line pt-6">
                <blockquote className="space-y-3">
                  <span
                    aria-hidden
                    className="block font-display text-2xl leading-none text-fog-500"
                  >
                    "
                  </span>
                  <p className="font-display text-xl leading-snug font-normal text-bone-100 italic">
                    {item.quote}
                  </p>
                </blockquote>
                <figcaption>
                  <p className="text-sm font-medium text-bone-100">{item.name}</p>
                  <p className="mt-0.5 font-mono text-[11px] tracking-[0.15em] text-fog-500 uppercase">
                    {item.role}, {item.company}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}