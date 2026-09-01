"use client";

import { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

/**
 * Endonyms — each language named in itself. Someone looking for Portuguese
 * scans for "Português", not for "Portuguese" rendered in a language they
 * cannot read.
 */
const localeNames: Record<Locale, string> = {
  en: "English",
  es: "Español",
  "pt-br": "Português (BR)",
  de: "Deutsch",
  fr: "Français",
  it: "Italiano",
};

export function LocaleSwitcher() {
  const t = useTranslations("common");
  const locale = useLocale();
  const router = useRouter();
  /** Locale-stripped pathname, so the same page is kept across the switch. */
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  return (
    <label className="flex items-center">
      <span className="sr-only">{t("localeSwitcher.label")}</span>
      <select
        value={locale}
        disabled={isPending}
        onChange={(e) => {
          const next = e.target.value as Locale;
          startTransition(() => {
            /**
             * The explicit `locale` is the one legitimate cross-locale
             * navigation in the app, and it writes the NEXT_LOCALE cookie so
             * the choice outlives the session.
             */
            router.replace(pathname, { locale: next });
          });
        }}
        className="text-muted-foreground hover:text-foreground cursor-pointer rounded-md bg-transparent py-1 text-sm disabled:opacity-50"
      >
        {routing.locales.map((l) => (
          <option key={l} value={l}>
            {localeNames[l]}
          </option>
        ))}
      </select>
    </label>
  );
}
