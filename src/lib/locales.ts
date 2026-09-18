export const LOCALES = ["en", "ar", "es", "de", "ja", "fr"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_COOKIE = "NEXT_LOCALE";

export const RTL_LOCALES: Locale[] = ["ar"];

export const LOCALE_META: Record<
  Locale,
  { label: string; native: string; flag: string; dir: "ltr" | "rtl" }
> = {
  en: { label: "English", native: "English", flag: "🇬🇧", dir: "ltr" },
  ar: { label: "Arabic", native: "العربية", flag: "🇸🇦", dir: "rtl" },
  es: { label: "Spanish", native: "Español", flag: "🇪🇸", dir: "ltr" },
  de: { label: "German", native: "Deutsch", flag: "🇩🇪", dir: "ltr" },
  ja: { label: "Japanese", native: "日本語", flag: "🇯🇵", dir: "ltr" },
  fr: { label: "French", native: "Français", flag: "🇫🇷", dir: "ltr" },
};

export function isLocale(value: string | undefined | null): value is Locale {
  return !!value && (LOCALES as readonly string[]).includes(value);
}

export function dirOf(locale: Locale): "ltr" | "rtl" {
  return LOCALE_META[locale].dir;
}

// Country (ISO 3166-1 alpha-2, as provided by x-vercel-ip-country) → locale.
export const COUNTRY_LOCALE: Record<string, Locale> = {
  // Arabic
  SA: "ar", AE: "ar", EG: "ar", QA: "ar", KW: "ar", BH: "ar", OM: "ar",
  JO: "ar", LB: "ar", IQ: "ar", DZ: "ar", MA: "ar", TN: "ar", LY: "ar",
  SD: "ar", YE: "ar", SY: "ar", PS: "ar", MR: "ar", SO: "ar", DJ: "ar",
  KM: "ar",

  // Spanish
  ES: "es", MX: "es", CO: "es", AR: "es", PE: "es", CL: "es", VE: "es",
  EC: "es", GT: "es", CU: "es", BO: "es", DO: "es", HN: "es", PY: "es",
  SV: "es", NI: "es", CR: "es", PA: "es", PR: "es", UY: "es", GQ: "es",

  // German
  DE: "de", AT: "de", CH: "de", LI: "de", LU: "de",

  // Japanese
  JP: "ja",

  // French
  FR: "fr", BE: "fr", MC: "fr", SN: "fr", CI: "fr", CM: "fr", BF: "fr",
  ML: "fr", NE: "fr", TG: "fr", BJ: "fr", GA: "fr", CG: "fr", CD: "fr",
  MG: "fr", HT: "fr", GN: "fr", TD: "fr", CF: "fr", RW: "fr",
};

export function localeFromCountry(country: string | null | undefined): Locale | null {
  if (!country) return null;
  return COUNTRY_LOCALE[country.toUpperCase()] ?? null;
}

export function localeFromAcceptLanguage(header: string | null | undefined): Locale | null {
  if (!header) return null;
  const parts = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { tag: tag.trim().toLowerCase(), q: q ? Number(q) : 1 };
    })
    .filter((p) => p.tag)
    .sort((a, b) => b.q - a.q);

  for (const { tag } of parts) {
    const base = tag.split("-")[0];
    if (isLocale(base)) return base;
  }
  return null;
}
