import Link from "next/link";
import { getDesignSystem } from "@/lib/design-system";
import { SectionHeading } from "@/components/primitives/section-heading";
import { Reveal } from "@/components/primitives/reveal";
import { renderStarred } from "@/components/primitives/accent-text";
import { ComponentBoard } from "@/components/nebula/previews";

export function DesignSystemSection() {
  const ds = getDesignSystem();
  const copy = ds.home;

  return (
    <section id="design-system" className="border-t border-line py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            kicker={copy.kicker}
            title={
              <>
                {copy.titleBefore} {renderStarred(copy.titleBreak, "ds")}
              </>
            }
          />
          <Reveal delay={0.1}>
            <Link
              href="/design-system"
              className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.15em] text-bone-100 uppercase transition-colors hover:text-accent-400"
            >
              {copy.cta}
              <span aria-hidden>→</span>
            </Link>
          </Reveal>
        </div>

        <p className="mt-4 max-w-xl text-base leading-relaxed text-fog-500">{copy.sub}</p>

        <Reveal className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
          {ds.stats.map((s) => (
            <div key={s.label} className="bg-background px-5 py-6">
              <p className="font-display text-4xl tracking-tight text-bone-100 tnum">{s.value}</p>
              <p className="mt-1 text-sm text-fog-500">{s.label}</p>
            </div>
          ))}
        </Reveal>

        <Reveal className="mt-8">
          <Link href="/design-system" className="group block" aria-label={copy.cta}>
            <div className="transition-transform duration-300 group-hover:-translate-y-1">
              <ComponentBoard />
            </div>
          </Link>
        </Reveal>

        <div className="mt-6 flex flex-wrap gap-2">
          {ds.groups.slice(0, 8).map((g) => (
            <span
              key={g.name}
              className="rounded-full border border-line px-3 py-1.5 font-mono text-[11px] tracking-[0.1em] text-fog-400 uppercase"
            >
              {g.name} · {g.count}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
