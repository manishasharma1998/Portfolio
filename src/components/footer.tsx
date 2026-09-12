import { getSiteConfig } from "@/lib/content";

export function Footer() {
  const site = getSiteConfig();
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/[0.06] bg-ink-950">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="font-display text-sm font-medium text-bone-100">
          {site.name}
          <span className="ml-2 font-mono text-[11px] font-normal tracking-[0.15em] text-fog-500">
            · UX & XR · {year}
          </span>
        </p>

        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
          {site.nav.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono text-[11px] tracking-[0.15em] text-fog-500 uppercase transition-colors hover:text-lens-300"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <p className="flex flex-wrap items-center gap-x-4 font-mono text-[11px] text-fog-500">
          <span>
            Designed & built in <span className="text-bone-100">Next.js</span> ·
            available in <span className="text-lens-300">Dubai</span>
          </span>
          <a
            href="/admin/index.html"
            className="uppercase tracking-[0.15em] transition-colors hover:text-lens-300"
          >
            Manage content
          </a>
        </p>
      </div>
    </footer>
  );
}