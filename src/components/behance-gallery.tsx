import Image from "next/image";
import { getBehanceProjects } from "@/lib/content";
import { SectionHeading } from "@/components/primitives/section-heading";
import { RevealItem, RevealStagger } from "@/components/primitives/reveal";

export function BehanceGallery({
  labels,
}: {
  labels?: { open: string; views: string; appreciations: string };
}) {
  const config = getBehanceProjects();
  const { projects, profileUrl } = config;

  return (
    <section id="behance" className="border-t border-white/[0.05] py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          kicker={config.kicker}
          title={
            <>
              {config.titleBefore}
              <br />
              {config.titleBreak}
            </>
          }
          content={<p>{config.blurb}</p>}
        />

        <RevealStagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <RevealItem key={p.url}>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-ink-850 transition-colors duration-300 hover:border-lens-400/30"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={p.cover}
                    alt={p.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-900/70 via-transparent to-transparent" />
                </div>
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <h3 className="font-display text-base font-medium leading-snug text-bone-100">
                    {p.title}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-white/10 px-2.5 py-0.5 font-mono text-[10px] tracking-wide text-fog-400"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-2">
                    <span className="font-mono text-[11px] text-fog-500">
                      {p.views} {labels?.views ?? "views"} · {p.appreciations}{" "}
                      {labels?.appreciations ?? "♥"}
                    </span>
                    <span className="font-mono text-xs tracking-[0.15em] text-bone-100 uppercase">
                      {labels?.open ?? "Open"} →
                    </span>
                  </div>
                </div>
              </a>
            </RevealItem>
          ))}

          <RevealItem>
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-full min-h-[180px] flex-col items-start justify-between gap-4 rounded-2xl border border-dashed border-white/12 bg-white/[0.02] p-5 transition-colors duration-300 hover:border-lens-400/40 hover:bg-lens-400/[0.04]"
            >
              <p className="font-mono text-[11px] tracking-[0.2em] text-lens-300 uppercase">
                {config.profileLabel}
              </p>
              <p className="text-sm leading-relaxed text-fog-400">
                {config.profileBlurb}
              </p>
              <p className="font-mono text-xs tracking-[0.15em] text-bone-100 uppercase">
                {profileUrl.replace("https://", "")} →
              </p>
            </a>
          </RevealItem>
        </RevealStagger>
      </div>
    </section>
  );
}