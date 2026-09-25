import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { getSiteConfig } from "@/lib/content";
import { getLocale } from "@/lib/i18n";
import { dirOf } from "@/lib/locales";
import { ChatBot } from "@/components/chat-bot";
import { AnnouncementBar } from "@/components/announcement-bar";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Manisha Sharma — UX, UI & XR Designer",
    template: "%s · Manisha Sharma",
  },
  description:
    "UX & XR designer who turns user research into measurable results: 70+ products shipped, 42% less checkout drop-off, a 200+ component design system. Arabic–English RTL experience. IIT Delhi-certified in VR/AR. Available immediately.",
  keywords: [
    "UX Designer",
    "XR Designer",
    "UI Designer",
    "AR VR Designer",
    "Manisha Sharma",
    "Spatial design",
    "Design systems",
  ],
  openGraph: {
    title: "Manisha Sharma — UX, UI & XR Designer",
    description:
      "I design products people finish, and spaces people step into.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Manisha Sharma — UX, UI & XR Designer",
    description:
      "I design products people finish, and spaces people step into.",
  },
  metadataBase: new URL("https://manishasharma.design"),
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const locale = await getLocale();
  const site = await getSiteConfig(locale);

  return (
    <html
      lang={locale}
      dir={dirOf(locale)}
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <body className="min-h-dvh bg-background font-sans text-bone-100 antialiased selection:bg-accent-500/40">
        <script
          dangerouslySetInnerHTML={{
            __html: `if (location.hash) history.replaceState(null, "", location.pathname + location.search); if (location.hash || window.scrollY > 0) scrollTo(0, 0);`,
          }}
        />
        <AnnouncementBar
          locale={locale}
          notice={site.ui.announcement.notice}
          change={site.ui.announcement.change}
          dismiss={site.ui.announcement.dismiss}
          switcherAria={site.ui.language.switcherAria}
        />
        {children}
        <ChatBot
          name={site.name}
          email={site.email}
          whatsapp={site.whatsapp}
          resume={site.resume}
          locale={locale}
          chat={site.ui.chat}
        />
      </body>
    </html>
  );
}