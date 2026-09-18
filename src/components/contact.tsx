import { getSiteConfig } from "@/lib/content";
import { Reveal } from "@/components/primitives/reveal";
import { AccentText } from "@/components/primitives/accent-text";

export async function Contact() {
  const site = await getSiteConfig();
  const ui = site.ui.contactLinks;

  const links = [
    { label: ui.email, href: `mailto:${site.email}`, note: site.email },
    { label: ui.linkedin, href: site.linkedin, note: ui.linkedinNote },
    { label: ui.behance, href: site.behance, note: ui.behanceNote },
    { label: ui.whatsapp, href: site.whatsapp, note: site.phone },
  ] as const;

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-white/[0.06]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(108,140,255,0.12),transparent_65%)] blur-3xl"
      />
      <div className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <Reveal className="text-center">
          <p className="font-mono text-xs tracking-[0.3em] text-lens-300 uppercase">
            {site.contact.kicker}
          </p>
          <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-medium tracking-tight text-bone-100 sm:text-4xl md:text-5xl">
            {site.contact.titleBefore}
            <br />
            <AccentText text={site.contact.titleBreak ?? ""} />
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-fog-400 sm:text-lg">
            {site.contact.blurb}
          </p>
          <p className="mx-auto mt-5 max-w-xl text-sm text-fog-500">
            <span className="font-mono text-lens-300">
              {site.contact.relocationNote.split(":")[0]}:
            </span>{" "}
            {site.contact.relocationNote.split(":")[1] ?? site.contact.relocationNote}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <div className="mx-auto grid w-full max-w-4xl grid-cols-2 gap-3 sm:flex sm:flex-row">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex min-w-0 flex-1 items-center justify-between gap-2 rounded-2xl border border-white/[0.07] bg-ink-850 px-3 py-3.5 transition-colors duration-300 hover:border-lens-400/40 sm:px-4 sm:py-4"
              >
                <span className="min-w-0">
                  <span className="block truncate font-display text-sm font-medium text-bone-100 sm:text-base">
                    {l.label}
                  </span>
                  <span className="mt-0.5 hidden font-mono text-[11px] text-fog-500 sm:block">
                    {l.note}
                  </span>
                </span>
                <span className="shrink-0 text-fog-500 transition-all duration-300 group-hover:translate-x-1 group-hover:text-lens-300">
                  →
                </span>
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.18} className="mt-10 text-center">
          <a
            href={site.resume}
            download
            className="inline-flex items-center gap-2 rounded-full bg-lens-400 px-7 py-3.5 font-medium text-ink-950 transition-colors hover:bg-lens-300"
          >
            {site.contact.resumeLabel}
            <span aria-hidden>↓</span>
          </a>
          <p className="mt-4 font-mono text-[11px] tracking-[0.18em] text-fog-500 uppercase">
            {site.contact.resumeNote}
          </p>
        </Reveal>
      </div>
    </section>
  );
}