import { getSiteConfig } from "@/lib/content";

export function Footer() {
  const site = getSiteConfig();
  const year = new Date().getFullYear();

  const connect = [
    { label: "Email", href: `mailto:${site.email}` },
    { label: "LinkedIn", href: site.linkedin },
    { label: "Behance", href: site.behance },
    { label: "WhatsApp", href: site.whatsapp },
  ] as const;

  const header = "font-mono text-[11px] tracking-[0.25em] text-fog-500 uppercase";
  const dash =
    "h-px w-3 bg-lens-400 opacity-0 transition-all duration-300 group-hover:w-5 group-hover:opacity-100";

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] bg-ink-950">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[720px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(108,140,255,0.08),transparent_70%)] blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr] md:gap-8">
          {/* Brand */}
          <div>
            <p className="font-display text-2xl font-semibold tracking-tight text-bone-100">
              {site.name}
              <span className="text-lens-400">.</span>
            </p>
            <p className="mt-1.5 font-mono text-[11px] tracking-[0.2em] text-lens-300 uppercase">
              {site.role}
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-fog-500">{site.location}</p>
          </div>

          {/* Navigate */}
          <div>
            <p className={header}>Navigate</p>
            <ul className="mt-4 space-y-2.5">
              {site.nav.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="group inline-flex items-center gap-2 text-sm text-fog-400 transition-colors hover:text-bone-100"
                  >
                    {l.label}
                    <span className={dash} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <p className={header}>Connect</p>
            <ul className="mt-4 space-y-2.5">
              {connect.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group inline-flex items-center gap-2 text-sm text-fog-400 transition-colors hover:text-bone-100"
                  >
                    {c.label}
                    <span className={dash} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-4 border-t border-white/[0.06] pt-6 sm:flex-row sm:items-center sm:gap-8">
          <p className="font-mono text-[11px] tracking-[0.15em] text-fog-500 uppercase">
            © {year} {site.name}
          </p>
          <p className="font-mono text-[11px] tracking-[0.15em] text-fog-500 uppercase">
            Designed &amp; built in <span className="text-bone-100">Next.js</span> · relocation-ready
          </p>
          <a
            href="/admin/index.html"
            className="font-mono text-[11px] tracking-[0.15em] text-fog-500 uppercase transition-colors hover:text-lens-300"
          >
            Manage content
          </a>
        </div>
      </div>
    </footer>
  );
}