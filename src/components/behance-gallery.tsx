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
    <section id="behance" className="border-t border-line py-20 sm:py-28">
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

        <RevealStagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <RevealItem key={p.url} className="h-full">
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col overflow-hidden rounded-md border border-line bg-ink-850 transition-colors duration-300 hover:border-accent-400/50"
              >
                <div className="overflow-hidden border-b border-line bg-ink-800">
                  {p.cover ? (
                    <Image
                      src={p.cover}
                      alt={p.title}
                      width={1280}
                      height={800}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="aspect-[16/10] w-full object-cover [filter:saturate(0.88)]"
                    />
                  ) : (
                    <div className="flex aspect-[16/10] flex-col justify-end p-5">
                      <p className="font-display text-5xl font-normal tracking-tight text-bone-100/40">
                        {p.tags[0]?.[0] ?? "N"}.
                      </p>
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <h3 className="font-display text-xl font-normal tracking-tight text-bone-100">
                    {p.title}
                  </h3>
                  <p className="font-mono text-[11px] tracking-[0.12em] text-fog-500 uppercase">
                    {p.tags.join(" · ")}
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-2">
                    {typeof p.views === "number" ? (
                      <span className="font-mono text-[11px] text-fog-500 tnum">
                        {p.views.toLocaleString()}{" "}
                        {labels?.views ?? "views"}
                        {typeof p.appreciations === "number"
                          ? ` · ${p.appreciations.toLocaleString()} ${labels?.appreciations ?? "appreciations"}`
                          : ""}
                      </span>
                    ) : (
                      <span />
                    )}
                    <span className="font-mono text-xs tracking-[0.15em] text-bone-100 uppercase transition-colors group-hover:text-accent-400">
                      {labels?.open ?? "Open"} →
                    </span>
                  </div>
                </div>
              </a>
            </RevealItem>
          ))}

          <RevealItem className="h-full">
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full min-h-[180px] flex-col items-start justify-between gap-4 rounded-md border border-dashed border-line-strong bg-wash p-6 transition-colors duration-300 hover:border-accent-400/50"
            >
              <p className="font-mono text-[11px] tracking-[0.2em] text-accent-400 uppercase">
                {config.profileLabel}
              </p>
              <p className="text-sm leading-relaxed text-fog-500">
                {config.profileBlurb}
              </p>
              <p className="font-mono text-xs tracking-[0.15em] text-bone-100 uppercase transition-colors group-hover:text-accent-400">
                {profileUrl.replace("https://", "")} →
              </p>
            </a>
          </RevealItem>
        </RevealStagger>
      </div>
    </section>
  );
}