import { getSiteConfig } from "@/lib/content";
import { getLocale } from "@/lib/i18n";
import { SiteNav } from "@/components/site-nav";
import { Hero } from "@/components/hero";
import { SignalBar } from "@/components/signal-bar";
import { About } from "@/components/about";
import { XRPlayground } from "@/components/xr-playground";
import { Skills } from "@/components/skills";
import { Timeline } from "@/components/timeline";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default async function Home() {
  const locale = await getLocale();
  const site = await getSiteConfig(locale);

  return (
    <main>
      <SiteNav
        links={site.nav}
        resumeHref={site.resume}
        locale={locale}
        ui={site.ui}
      />
      <Hero site={site} />
      <SignalBar metrics={site.metrics} />
      <About />
      <XRPlayground copy={site.xr} />
      <Skills />
      <Timeline copy={site.timeline} />
      <Contact />
      <Footer />
    </main>
  );
}