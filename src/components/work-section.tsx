import { getProjects, getSiteConfig } from "@/lib/content";
import { CaseStudyCard } from "@/components/case-study-card";
import {
  SectionHeading,
  Pill,
} from "@/components/primitives/section-heading";
import { Reveal } from "@/components/primitives/reveal";

export async function Work() {
  const site = await getSiteConfig();
  const work = site.work;
  const projects = await getProjects();

  return (
    <section id="work" className="relative border-t border-white/[0.05] py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            kicker={work.kicker}
            title={
              <>
                {work.titleBefore}
                <br />
                {work.titleBreak}
              </>
            }
            content={
              <>
                <p>{work.blurb}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {projects.slice(0, 3).map((p) => (
                    <Pill key={p.slug}>{p.chips[0] ?? p.category}</Pill>
                  ))}
                </div>
              </>
            }
          />
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {projects.map((study, i) => (
            <Reveal key={study.slug} delay={i * 0.1} className="h-full">
              <CaseStudyCard study={study} labels={site.ui.caseCard} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <p className="mt-10 max-w-xl text-sm leading-relaxed text-fog-500">
            {work.closer}
          </p>
        </Reveal>
      </div>
    </section>
  );
}