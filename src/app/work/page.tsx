import type { Metadata } from "next";
import { getSiteConfig } from "@/lib/content";
import { SiteNav } from "@/components/site-nav";
import { Work } from "@/components/work-section";
import { BehanceGallery } from "@/components/behance-gallery";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Work · Manisha Sharma",
  description:
    "Selected case studies and Behance projects by Manisha Sharma, UX & XR Designer.",
};

export default function WorkPage() {
  const site = getSiteConfig();

  return (
    <main className="bg-background">
      <SiteNav links={site.nav} resumeHref={site.resume} />
      <div className="pt-16">
        <Work />
        <BehanceGallery />
      </div>
      <Footer />
    </main>
  );
}