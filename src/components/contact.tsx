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
    <section id="contact" className="border-t border-line">
      <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8 sm:py-28">
        <Reveal className="text-center">
          <p className="font-mono text-[11px] tracking-[0.25em] text-fog-500 uppercase">
            {site.contact.kicker}
          </p>
          <h2 className="mt-3 font-display text-4xl leading-[1.05] font-normal tracking-tight text-bone-100 sm:text-5xl">
            {site.contact.titleBefore}
            <br />
            <AccentText text={site.contact.titleBreak ?? ""} />
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-fog-500 sm:text-lg">
            {site.contact.blurb}
          </p>
          <p className="mx-auto mt-5 max-w-xl text-sm text-fog-500">
            <span className="font-mono text-accent-400">
              {site.contact.relocationNote.split(":")[0]}:
            </span>{" "}
            {site.contact.relocationNote.split(":")[1] ??
              site.contact.relocationNote}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <div className="border-t border-line">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex items-center justify-between gap-4 border-b border-line py-4.5 transition-colors hover:bg-wash"
              >
                <span className="min-w-0">
                  <span className="block font-display text-xl font-normal tracking-tight text-bone-100 sm:text-2xl">
                    {l.label}
                  </span>
                  <span className="mt-0.5 block font-mono text-[11px] text-fog-500">
                    {l.note}
                  </span>
                </span>
                <span
                  aria-hidden
                  className="shrink-0 text-fog-500 transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent-400"
                >
                  →
                </span>
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15} className="mt-12 text-center">
          <a
            href={site.resume}
            download
            className="inline-flex items-center gap-2 rounded-full bg-accent-400 px-6 py-3 font-medium text-accent-fg transition-colors hover:bg-accent-500"
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