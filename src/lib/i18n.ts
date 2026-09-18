import { cookies, headers } from "next/headers";
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE,
  isLocale,
  localeFromAcceptLanguage,
  localeFromCountry,
  type Locale,
} from "./locales";

export { LOCALE_COOKIE };

export async function getLocale(): Promise<Locale> {
  try {
    const cookieStore = await cookies();
    const stored = cookieStore.get(LOCALE_COOKIE)?.value;
    if (isLocale(stored)) return stored;
  } catch {
    /* noop — headers/cookies unavailable outside a request */
  }

  try {
    const headerStore = await headers();
    const byCountry = localeFromCountry(headerStore.get("x-vercel-ip-country"));
    if (byCountry) return byCountry;

    const byHeader = localeFromAcceptLanguage(headerStore.get("accept-language"));
    if (byHeader) return byHeader;
  } catch {
    /* noop */
  }

  return DEFAULT_LOCALE;
}
