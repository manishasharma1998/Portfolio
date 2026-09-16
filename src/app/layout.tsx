import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
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
    default: "Manisha Sharma — UX & XR Designer",
    template: "%s · Manisha Sharma",
  },
  description:
    "UX Designer with a research-first brain. XR Designer with a headset on. 70+ projects shipped, 42% drop-off reduced, IIT Delhi certified. Instantly available to relocate.",
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
    title: "Manisha Sharma — UX & XR Designer",
    description:
      "UX Designer with a research-first brain. XR Designer with a headset on. Instantly available to relocate.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Manisha Sharma — UX & XR Designer",
    description:
      "UX Designer with a research-first brain. XR Designer with a headset on.",
  },
  metadataBase: new URL("https://manishasharma.design"),
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <body className="min-h-dvh bg-background font-sans text-bone-100 antialiased selection:bg-accent-500/40">
        <script
          dangerouslySetInnerHTML={{
            __html: `if (location.hash) history.replaceState(null, "", location.pathname + location.search); if (location.hash || window.scrollY > 0) scrollTo(0, 0);`,
          }}
        />
        {children}
      </body>
    </html>
  );
}