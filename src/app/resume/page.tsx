import type { Metadata } from "next";
import Link from "next/link";
import { getSiteConfig } from "@/lib/content";
import { getLocale } from "@/lib/i18n";
import { SiteNav } from "@/components/site-nav";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Résumé · Manisha Sharma",
  description:
    "Manisha Sharma's résumé — UI/UX & XR designer. View it here, or download the PDF from the top right.",
};

export default async function ResumePage() {
  const locale = await getLocale();
  const site = await getSiteConfig(locale);

  return (
    <main className="bg-background">
      <SiteNav
        links={site.nav}
        resumeHref={site.resume}
        locale={locale}
        ui={site.ui}
      />

      {/* Sticky toolbar: resume title left, download top-right */}
      <div className="sticky top-16 z-40 border-b border-line bg-background/90 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
          <div className="flex items-baseline gap-3">
            <h1 className="font-display text-xl tracking-tight text-bone-100">
              Résumé
            </h1>
            <p className="hidden font-mono text-[11px] tracking-[0.2em] text-fog-500 uppercase sm:block">
              One page · every line earns its place
            </p>
          </div>
          <Link
            href={site.resumeFile}
            download
            className="inline-flex h-10 items-center gap-2 rounded-full bg-accent-400 px-5 text-sm font-medium text-accent-fg transition-opacity hover:opacity-90"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
            </svg>
            Download résumé
          </Link>
        </div>
      </div>

      {/* Embedded PDF viewer */}
      <section className="mx-auto max-w-6xl px-5 pt-6 pb-16 sm:px-8">
        <div className="overflow-hidden rounded-2xl border border-line bg-wash">
          <iframe
            src={site.resumeFile}
            title="Manisha Sharma résumé"
            className="h-[82dvh] w-full"
          />
        </div>
        <p className="mt-4 flex flex-wrap items-center justify-between gap-2 text-sm text-fog-500">
          <span>Designed to be read on screen or printed to A4.</span>
          <Link
            href={site.resumeFile}
            download
            className="font-medium text-accent-400 hover:underline"
          >
            Having trouble viewing? Download the PDF.
          </Link>
        </p>
      </section>

      <Footer />
    </main>
  );
}