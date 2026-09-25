import { getSiteConfig } from "@/lib/content";
import { SectionHeading } from "@/components/primitives/section-heading";
import { AccentText } from "@/components/primitives/accent-text";

export async function Skills() {
  const skills = (await getSiteConfig()).skills;
  const toolkit = skills.toolkit;
  const columns = [
    { key: "research", data: skills.columns.research },
    { key: "design", data: skills.columns.design },
    { key: "xr", data: skills.columns.xr },
  ] as const;

  return (
    <section id="skills" className="border-t border-line py-20 sm:py-28">
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

        <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-0 md:divide-x md:divide-line">
          {columns.map(({ key, data }, i) => (
            <div
              key={key}
              className={`pb-10 md:px-8 ${i === 0 ? "md:pl-0" : ""} ${
                i === columns.length - 1 ? "md:pr-0" : ""
              }`}
            >
              <h3 className="font-display text-2xl font-normal tracking-tight text-bone-100">
                {data.title}
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-fog-500">
                {data.note}
              </p>
              <ul className="mt-5 space-y-2.5">
                {data.items.map((item, j) => (
                  <li
                    key={item}
                    className="flex items-baseline gap-3 border-t border-line pt-2.5 text-sm text-fog-500"
                  >
                    <span className="font-mono text-[10px] text-fog-500 tnum">
                      {String(j + 1).padStart(2, "0")}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-line pt-6">
          <p className="font-mono text-[11px] tracking-[0.25em] text-fog-500 uppercase">
            {skills.toolkitLabel}
          </p>
          <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-fog-500">
            {toolkit.join("  ·  ")}
          </p>
        </div>
      </div>
    </section>
  );
}