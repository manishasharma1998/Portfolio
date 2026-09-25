import { getSiteConfig } from "@/lib/content";

export async function Footer() {
  const site = await getSiteConfig();
  const year = new Date().getFullYear();

  const label = site.ui.contactLinks;
  const connect = [
    { label: label.email, href: `mailto:${site.email}` },
    { label: label.linkedin, href: site.linkedin },
    { label: label.behance, href: site.behance },
    { label: label.whatsapp, href: site.whatsapp },
  ] as const;

  const footerUi = site.ui.footer;

  const header = "font-mono text-[11px] tracking-[0.25em] text-fog-500 uppercase";
  const dash =
    "h-px w-3 bg-accent-400 opacity-0 transition-all duration-300 group-hover:w-5 group-hover:opacity-100";

  return (
    <footer className="relative border-t border-line bg-background">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr] md:gap-8">
          <div>
            <p className="font-display text-3xl font-normal tracking-tight text-bone-100">
              {site.name}
              <span className="text-accent-400">.</span>
            </p>
            <p className="mt-2 font-mono text-[11px] tracking-[0.2em] text-accent-400 uppercase">
              {site.role}
            </p>
            {site.tagline ? (
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-fog-500">
                {site.tagline}
              </p>
            ) : null}
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-fog-500">
              {site.location}
            </p>
          </div>

          <div>
            <p className={header}>{footerUi.navigate}</p>
            <ul className="mt-4 space-y-2.5">
              {site.nav.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="group inline-flex items-center gap-2 text-sm text-fog-500 transition-colors hover:text-bone-100"
                  >
                    {l.label}
                    <span className={dash} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className={header}>{footerUi.connect}</p>
            <ul className="mt-4 space-y-2.5">
              {connect.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group inline-flex items-center gap-2 text-sm text-fog-500 transition-colors hover:text-bone-100"
                  >
                    {c.label}
                    <span className={dash} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:gap-8">
          <p className="font-mono text-[11px] tracking-[0.15em] text-fog-500 uppercase">
            © {year} {site.name}
          </p>
          <p className="font-mono text-[11px] tracking-[0.15em] text-fog-500 uppercase">
            {footerUi.built}
          </p>
        </div>
      </div>
    </footer>
  );
}