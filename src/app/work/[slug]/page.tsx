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
        {/* Header cover */}
        <header className="relative overflow-hidden border-b border-white/[0.06]">
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(120% 140% at 15% 0%, hsl(${study.cover.hue} 70% 24% / 0.9), hsl(${study.cover.hue} 60% 10% / 0.95) 55%, hsl(${study.cover.hue} 50% 6% / 1))`,
            }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:40px_40px]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(7,8,12,0.55)_100%)]" />

          <div className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
            <Reveal>
              <Link
                href="/work"
                className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-fog-400 uppercase transition-colors hover:text-lens-300"
              >
                <span aria-hidden>←</span> {caseUi.backAllWork}
              </Link>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="mt-10 flex flex-col gap-3">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] tracking-[0.22em] uppercase">
                  <span className="text-lens-300">{study.category}</span>
                  <span className="text-fog-500">· {study.year}</span>
                  <span className="text-fog-500">· {study.index}</span>
                </div>
                <h1 className="max-w-3xl font-display text-4xl font-semibold leading-[1.02] tracking-tight text-bone-100 sm:text-5xl md:text-6xl">
                  {study.title}
                </h1>
                <p className="mt-2 max-w-2xl text-lg leading-relaxed text-fog-300 sm:text-xl">
                  {study.hero}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="mt-10">
              <dl className="grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] sm:grid-cols-4">
                {[
                  [caseUi.labels.role, study.role],
                  [caseUi.labels.duration, study.duration],
                  [caseUi.labels.platform, study.platform],
                  [caseUi.labels.year, study.year],
                ].map(([k, v]) => (
                  <div key={k} className="bg-ink-900/70 p-4 backdrop-blur-sm">
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
        <section aria-label={caseUi.metricsAria} className="border-b border-white/[0.06]">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px px-5 sm:grid-cols-4 sm:px-8">
            {study.metrics.map((m) => (
              <Reveal key={m.label} className="min-w-0 border-b border-white/[0.06] py-8 sm:border-b-0">
                <p className="font-display text-xl font-semibold tracking-tight text-accent-400 sm:text-3xl">
                  {m.value}
                </p>
                <p className="mt-1 font-mono text-[10px] tracking-[0.18em] text-fog-500 uppercase">
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
          <div className="mb-14 max-w-2xl space-y-4">
            {study.intro.map((p, i) => (
              <p key={i} className="text-lg leading-relaxed text-fog-300">
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

          <div className="flex flex-col gap-14 sm:gap-20">
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
                  <Reveal delay={i * 0.03}>
                    <div className="grid gap-6 md:grid-cols-[220px_1fr] md:gap-10">
                  <div className="md:sticky md:top-28 md:self-start">
                    <p className="font-mono text-[11px] tracking-[0.25em] text-lens-300 uppercase">
                      {s.kicker}
                    </p>
                    <h2 className="mt-2 font-display text-2xl font-medium tracking-tight text-bone-100">
                      {s.heading}
                    </h2>
                  </div>
                  <div className="max-w-2xl space-y-4">
                    {s.body.map((p, j) => (
                      <p key={j} className="text-base leading-relaxed text-fog-400">
                        {p}
                      </p>
                    ))}
                    {s.bullets ? (
                      <ul className="mt-2 space-y-2.5">
                        {s.bullets.map((b) => (
                          <li
                            key={b}
                            className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-sm leading-relaxed text-fog-300"
                          >
                            <span className="mt-2 h-1 w-2 shrink-0 rounded-full bg-lens-400" />
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
            <div className="rounded-2xl border border-accent-400/20 bg-accent-400/[0.05] p-6 sm:p-8">
              <p className="font-mono text-[11px] tracking-[0.25em] text-accent-400 uppercase">
                {caseUi.reflection}
              </p>
              <div className="mt-4 space-y-3">
                {study.reflection.body.map((p, i) => (
                  <p key={i} className="text-base leading-relaxed text-fog-300 italic">
                    {p}
                  </p>
                ))}
                {study.reflection.bullets ? (
                  <ul className="space-y-2.5 pt-1">
                    {study.reflection.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-3 rounded-xl border border-accent-400/15 bg-accent-400/[0.06] p-4 text-sm leading-relaxed text-fog-300 italic"
                      >
                        <span className="mt-2 h-1 w-2 shrink-0 rounded-full bg-accent-400" />
                        {b}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
          </Reveal>
          </div>
        )}
      </article>

      {/* Next project */}
      <section className="border-t border-white/[0.06]">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <div className="grid gap-6 sm:grid-cols-2">
            <Reveal>
              <Link
                href="/work"
                className="group flex h-full flex-col justify-between gap-6 rounded-2xl border border-white/[0.07] bg-ink-850 p-6 transition-colors hover:border-lens-400/30 sm:p-8"
              >
                <p className="font-mono text-[11px] tracking-[0.2em] text-fog-500 uppercase">
                  {caseUi.backToIndex}
                </p>
                <p className="font-display text-lg font-medium text-bone-100">
                  {caseUi.backToIndexBody}
                </p>
              </Link>
            </Reveal>
            <Reveal delay={0.08}>
              <Link
                href={`/work/${next.slug}`}
                className="group relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-2xl border border-white/[0.07] p-6 transition-colors hover:border-lens-400/30 sm:p-8"
                style={{
                  background: `linear-gradient(135deg, hsl(${next.cover.hue} 70% 18% / 0.9), hsl(${next.cover.hue} 50% 8% / 1))`,
                }}
              >
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:32px_32px]" />
                <div className="relative">
                  <p className="font-mono text-[11px] tracking-[0.2em] text-bone-100/60 uppercase">
                    {caseUi.nextLabel}
                  </p>
                  <h3 className="mt-3 font-display text-xl font-medium text-bone-100">
                    {next.title}
                  </h3>
                </div>
                <span className="relative inline-flex items-center gap-2 font-mono text-xs tracking-[0.15em] text-bone-100 uppercase">
                  {caseUi.readIt}
                  <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                    →
                  </span>
                </span>
              </Link>
            </Reveal>
          </div>

          <Reveal delay={0.12} className="mt-14 text-center">
            <p className="font-mono text-[11px] tracking-[0.25em] text-fog-500 uppercase">
              {caseUi.twoThings}
            </p>
            <h2 className="mx-auto mt-3 max-w-xl font-display text-2xl font-medium tracking-tight text-bone-100 sm:text-3xl">
              {caseUi.ctaTitle}
            </h2>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2 rounded-full bg-lens-400 px-6 py-3 font-medium text-ink-950 transition-colors hover:bg-lens-300"
              >
                {caseUi.emailCta}
              </a>
              <Link
                href="/work"
                className="inline-flex items-center gap-2 rounded-full border border-white/12 px-6 py-3 font-medium text-bone-100 transition-colors hover:border-lens-400/60 hover:bg-lens-400/10"
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