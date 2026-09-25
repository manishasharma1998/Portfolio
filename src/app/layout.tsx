import type { Metadata } from "next";
import { Instrument_Serif, JetBrains_Mono, Manrope } from "next/font/google";
import { getSiteConfig } from "@/lib/content";
import { getLocale } from "@/lib/i18n";
import { dirOf } from "@/lib/locales";
import { ChatBot } from "@/components/chat-bot";
import { AnnouncementBar } from "@/components/announcement-bar";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
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
      className={`${instrumentSerif.variable} ${manrope.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('theme');var t=(s==='light'||s==='dark')?s:(window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme='dark';}})();`,
          }}
        />
      </head>
      <body className="min-h-dvh bg-background font-sans text-bone-100 antialiased">
        <script
          dangerouslySetInnerHTML={{
            __html: `if (location.hash) history.replaceState(null, "", location.pathname + location.search); if (location.hash || window.scrollY > 0) scrollTo(0, 0);`,
          }}
        />
        <ThemeProvider>
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
        </ThemeProvider>
      </body>
    </html>
  );
}