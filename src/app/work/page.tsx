import type { Metadata } from "next";
import { getSiteConfig } from "@/lib/content";
import { getLocale } from "@/lib/i18n";
import { SiteNav } from "@/components/site-nav";
import { Work } from "@/components/work-section";
import { BehanceGallery } from "@/components/behance-gallery";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Work · Manisha Sharma",
  description:
    "Selected case studies and Behance projects by Manisha Sharma, UX & XR Designer.",
};

export default async function WorkPage() {
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
      <div className="pt-16">
        <Work />
        <BehanceGallery />
      </div>
      <Footer />
    </main>
  );
}