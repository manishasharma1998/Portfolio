import { getSiteConfig } from "@/lib/content";
import { SectionHeading } from "@/components/primitives/section-heading";
import { Reveal, RevealItem, RevealStagger } from "@/components/primitives/reveal";
import { AccentText } from "@/components/primitives/accent-text";

export async function Skills() {
  const skills = (await getSiteConfig()).skills;
  const toolkit = skills.toolkit;
  const columns = [
    { key: "research", data: skills.columns.research, accent: "lens" },
    { key: "design", data: skills.columns.design, accent: "accent" },
    { key: "xr", data: skills.columns.xr, accent: "bone" },
  ] as const;

  return (
    <section id="skills" className="relative border-t border-white/[0.05] py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          kicker={skills.kicker}
          title={
            <>
              {skills.titleBefore}
              <br />
              <AccentText text={skills.titleBreak ?? ""} />
            </>
          }
          content={<p>{skills.blurb}</p>}
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {columns.map(({ key, data, accent }) => {
            const borderCls =
              accent === "lens"
                ? "border-lens-400/20"
                : accent === "accent"
                ? "border-accent-400/20"
                : "border-bone-100/10";
            const dotCls =
              accent === "lens"
                ? "bg-lens-400"
                : accent === "accent"
                ? "bg-accent-400"
                : "bg-bone-100";
            return (
              <Reveal key={key} className={borderCls} delay={0.08}>
                <div className="flex h-full flex-col rounded-2xl border border-white/[0.07] bg-ink-850 p-6 sm:p-7">
                  <div className="flex items-center gap-2.5">
                    <span className={`h-1.5 w-1.5 rounded-full ${dotCls}`} />
                    <h3 className="font-display text-lg font-medium tracking-tight text-bone-100">
                      {data.title}
                    </h3>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-fog-500">
                    {data.note}
                  </p>
                  <ul className="mt-6 space-y-2.5">
                    {data.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center justify-between gap-3 border-b border-white/[0.05] pb-2.5 text-sm text-fog-300"
                      >
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>

        <RevealStagger className="mt-12" stagger={0.05}>
          <p className="mb-4 font-mono text-[11px] tracking-[0.25em] text-fog-500 uppercase">
            {skills.toolkitLabel}
          </p>
          <div className="flex flex-wrap gap-2.5">
            {toolkit.map((tool) => (
              <RevealItem key={tool}>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 font-mono text-xs text-fog-400 transition-colors duration-300 hover:border-lens-400/40 hover:text-lens-300">
                  <span aria-hidden className="flex h-4 w-4 items-center justify-center rounded-[5px] bg-white/[0.06] font-sans text-[9px] font-bold text-bone-100/70">
                    {tool.replace(/[^a-z0-9]/gi, "").slice(0, 2).toUpperCase()}
                  </span>
                  {tool}
                </span>
              </RevealItem>
            ))}
          </div>
        </RevealStagger>
      </div>
    </section>
  );
}