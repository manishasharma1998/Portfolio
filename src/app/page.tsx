import { getSiteConfig } from "@/lib/content";
import { SiteNav } from "@/components/site-nav";
import { Hero } from "@/components/hero";
import { SignalBar } from "@/components/signal-bar";
import { About } from "@/components/about";
import { XRPlayground } from "@/components/xr-playground";
import { Skills } from "@/components/skills";
import { Timeline } from "@/components/timeline";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  const site = getSiteConfig();

  return (
    <main>
      <SiteNav links={site.nav} resumeHref={site.resume} />
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