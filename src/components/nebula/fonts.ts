import { DM_Sans, Sora } from "next/font/google";

export const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-nebula-display",
  display: "swap",
});

export const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-nebula-body",
  display: "swap",
});

/** Put this on any wrapper that shows Nebula UI so it renders in Nebula's own fonts. */
export const nebulaFonts = `${sora.variable} ${dmSans.variable}`;
