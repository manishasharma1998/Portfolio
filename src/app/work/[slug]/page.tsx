import type { Metadata } from "next";
import Link from "next/link";
import { Fragment } from "react";
import { notFound } from "next/navigation";
import { getCaseStudy, getDeepProjects, getSiteConfig } from "@/lib/content";
import { getLocale } from "@/lib/i18n";
import { SiteNav } from "@/components/site-nav";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/primitives/reveal";
import { CaseGallery, CasePoster, CaseVisuals } from "@/components/case-visuals";
import { StoryPlayer } from "@/components/story/story-player";

type Props = PageProps<"/work/[slug]">;

export async function generateStaticParams() {
  return (await getDeepProjects("en")).map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = await getCaseStudy(slug, "en");
  if (!study) return { title: "Case study not found" };
  return {
    title: study.title,
    description: study.problem,
    openGraph: {
      title: `${study.title} · Manisha Sharma`,
      description: study.problem,
      type: "website",
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = await getCaseStudy(slug);
  if (!study) notFound();

  const deepProjects = await getDeepProjects();
  const index = deepProjects.findIndex((c) => c.slug === slug);
  const next = deepProjects[(index + 1) % deepProjects.length];
  const site = await getSiteConfig();
  const caseUi = site.ui.casePage;
  const locale = await getLocale();

  return (
    <main className="bg-background">
      <SiteNav
        links={site.nav}
        resumeHref={site.resume}
        locale={locale}
        ui={site.ui}
      />

      <article className="pt-16">
        {/* Header */}
        <header className="border-b border-line">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
            <Reveal>
              <Link
                href="/work"
                className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-fog-500 uppercase transition-colors hover:text-accent-400"
              >
                <span aria-hidden>←</span> {caseUi.backAllWork}
              </Link>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="mt-8 flex flex-col gap-3">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] tracking-[0.22em] uppercase">
                  <span className="text-accent-400">{study.category}</span>
                  <span className="text-fog-500">· {study.year}</span>
                  <span className="text-fog-500">· {study.index}</span>
                </div>
                <h1 className="max-w-3xl font-display text-4xl leading-[1.02] font-normal tracking-tight text-bone-100 sm:text-5xl md:text-6xl">
                  {study.title}
                </h1>
                <p className="mt-2 max-w-2xl text-lg leading-relaxed text-fog-500 sm:text-xl">
                  {study.hero}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="mt-10">
              <dl className="grid max-w-3xl grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4">
                {[
                  [caseUi.labels.role, study.role],
                  [caseUi.labels.duration, study.duration],
                  [caseUi.labels.platform, study.platform],
                  [caseUi.labels.year, study.year],
                ].map(([k, v]) => (
                  <div key={k} className="border-t border-line pt-3">
                    <dt className="font-mono text-[10px] tracking-[0.2em] text-fog-500 uppercase">
                      {k}
                    </dt>
                    <dd className="mt-1 text-sm font-medium text-bone-100">
                      {v}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </header>

        {/* Metric strip */}
        <section aria-label={caseUi.metricsAria} className="border-b border-line">
          <div className="mx-auto grid max-w-6xl grid-cols-2 divide-line sm:grid-cols-4 sm:divide-x">
            {study.metrics.map((m) => (
              <Reveal
                key={m.label}
                className="min-w-0 border-t border-line px-6 py-8 sm:px-8"
              >
                <p className="font-display text-2xl font-normal tracking-tight text-bone-100 sm:text-3xl tnum">
                  {m.value}
                </p>
                <p className="mt-1.5 font-mono text-[10px] tracking-[0.18em] text-fog-500 uppercase">
                  {m.label}
                </p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Body */}
        {study.story?.length ? (
          <StoryPlayer
            story={study.story}
            hue={study.cover.hue}
            ui={caseUi.story}
          />
        ) : (
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
            <div className="mb-14 max-w-3xl space-y-4">
              {study.intro.map((p, i) => (
                <p
                  key={i}
                  className="text-[17px] leading-[1.75] text-fog-500 [text-wrap:balance]"
                >
                  {p}
                </p>
              ))}
            </div>

            {study.visuals?.length ? (
              <div className="mb-16">
                <CaseVisuals
                  visuals={study.visuals}
                  hue={study.cover.hue}
                  labels={site.ui.caseVisuals}
                />
              </div>
            ) : null}

            {study.images?.length ? (
              <div className="mb-16">
                <CaseGallery images={study.images} alt={site.ui.caseVisuals.imageAlt} />
              </div>
            ) : null}

            <div className="flex flex-col gap-16 sm:gap-24">
              {study.sections.map((s, i) => {
                const posters = (study.figures ?? []).filter(
                  (f) => f.after === s.heading
                );
                return (
                  <Fragment key={s.heading}>
                    {posters.map((f, j) => (
                      <CasePoster
                        key={`${s.heading}-${j}`}
                        figure={f}
                        hue={f.hue ?? study.cover.hue}
                        index={i + j + 2}
                      />
                    ))}
                    <Reveal delay={Math.min(i * 0.03, 0.12)}>
                      <div className="grid gap-6 md:grid-cols-[220px_1fr] md:gap-10">
                        <div className="md:sticky md:top-24 md:self-start">
                          <p className="font-mono text-[11px] tracking-[0.25em] text-accent-400 uppercase">
                            {s.kicker}
                          </p>
                          <h2 className="mt-2 font-display text-2xl leading-[1.1] font-normal tracking-tight text-bone-100">
                            {s.heading}
                          </h2>
                        </div>
                        <div className="max-w-2xl space-y-4">
                          {s.body.map((p, j) => (
                            <p
                              key={j}
                              className="text-[17px] leading-[1.75] text-fog-500"
                            >
                              {p}
                            </p>
                          ))}
                          {s.bullets ? (
                            <ul className="mt-4 space-y-3">
                              {s.bullets.map((b) => (
                                <li
                                  key={b}
                                  className="flex items-start gap-3 border-t border-line pt-2.5 text-[15px] leading-relaxed text-fog-500"
                                >
                                  <span
                                    aria-hidden
                                    className="mt-[10px] inline-block h-px w-4 bg-accent-400"
                                  />
                                  {b}
                                </li>
                              ))}
                            </ul>
                          ) : null}
                        </div>
                      </div>
                    </Reveal>
                  </Fragment>
                );
              })}
            </div>

            {/* Reflection */}
            <Reveal className="mt-20">
              <aside className="max-w-3xl border-l-2 border-accent-400 pl-5 sm:pl-6">
                <p className="font-mono text-[11px] tracking-[0.25em] text-accent-400 uppercase">
                  {caseUi.reflection}
                </p>
                <div className="mt-4 space-y-3">
                  {study.reflection.body.map((p, i) => (
                    <p
                      key={i}
                      className="font-display text-xl leading-snug font-normal text-bone-100 sm:text-2xl"
                    >
                      {p}
                    </p>
                  ))}
                  {study.reflection.bullets ? (
                    <ul className="space-y-2.5 pt-1">
                      {study.reflection.bullets.map((b) => (
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
                  ) : null}
                </div>
              </aside>
            </Reveal>
          </div>
        )}
      </article>

      {/* Next project */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <div className="grid gap-6 sm:grid-cols-2">
            <Reveal>
              <Link
                href="/work"
                className="group flex h-full flex-col justify-between gap-6 rounded-md border border-line bg-ink-850 p-6 transition-colors hover:border-accent-400/50 sm:p-8"
              >
                <p className="font-mono text-[11px] tracking-[0.2em] text-fog-500 uppercase">
                  {caseUi.backToIndex}
                </p>
                <p className="font-display text-lg font-normal text-bone-100">
                  {caseUi.backToIndexBody}
                </p>
              </Link>
            </Reveal>
            <Reveal delay={0.06}>
              <Link
                href={`/work/${next.slug}`}
                className="group relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-md border border-line bg-ink-850 p-6 transition-colors hover:border-accent-400/50 sm:p-8"
              >
                <div>
                  <p className="font-mono text-[11px] tracking-[0.2em] text-fog-500 uppercase">
                    {caseUi.nextLabel}
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-normal tracking-tight text-bone-100">
                    {next.title}
                  </h3>
                </div>
                <span className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.15em] text-bone-100 uppercase transition-colors group-hover:text-accent-400">
                  {caseUi.readIt}
                  <span
                    aria-hidden
                    className="transition-transform duration-300 group-hover:translate-x-1.5"
                  >
                    →
                  </span>
                </span>
              </Link>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="mt-16 text-center">
            <p className="font-mono text-[11px] tracking-[0.25em] text-fog-500 uppercase">
              {caseUi.twoThings}
            </p>
            <h2 className="mx-auto mt-3 max-w-xl font-display text-3xl leading-[1.1] font-normal tracking-tight text-bone-100 sm:text-4xl">
              {caseUi.ctaTitle}
            </h2>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2 rounded-full bg-accent-400 px-6 py-3 font-medium text-accent-fg transition-colors hover:bg-accent-500"
              >
                {caseUi.emailCta}
              </a>
              <Link
                href="/work"
                className="inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3 font-medium text-bone-100 transition-colors hover:border-accent-400 hover:text-accent-400"
              >
                {caseUi.keepExploring}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}