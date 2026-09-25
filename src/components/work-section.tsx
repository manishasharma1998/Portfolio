import { getProjects, getSiteConfig } from "@/lib/content";
import { CaseStudyCard } from "@/components/case-study-card";
import { SectionHeading } from "@/components/primitives/section-heading";
import { Reveal } from "@/components/primitives/reveal";

export async function Work() {
  const site = await getSiteConfig();
  const work = site.work;
  const projects = await getProjects();

  return (
    <section id="work" className="border-t border-line py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
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
              <p className="mt-4 font-mono text-[11px] tracking-[0.18em] text-fog-500 uppercase">
                {projects
                  .slice(0, 3)
                  .map((p) => p.chips[0] ?? p.category)
                  .join("  ·  ")}
              </p>
            </>
          }
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {projects.map((study, i) => (
            <Reveal key={study.slug} delay={Math.min(i * 0.06, 0.18)} className="h-full">
              <CaseStudyCard study={study} labels={site.ui.caseCard} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-10 max-w-xl text-sm leading-relaxed text-fog-500">
            {work.closer}
          </p>
        </Reveal>
      </div>
    </section>
  );
}