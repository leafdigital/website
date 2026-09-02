"use client";

import { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { rememberLocaleChoice } from "@/i18n/locale-choice";
import { routing, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

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

/** `dark` is the footer, which is the only place this currently renders. */
export function LocaleSwitcher({
  tone = "light",
}: {
  tone?: "light" | "dark";
}) {
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
          rememberLocaleChoice();
          startTransition(() => {
            /**
             * The explicit `locale` is the one legitimate cross-locale
             * navigation in the app, and it writes the NEXT_LOCALE cookie so
             * the choice outlives the session.
             */
            router.replace(pathname, { locale: next });
          });
        }}
        className={cn(
          "cursor-pointer rounded-lg bg-transparent py-1 text-sm transition-colors duration-150 disabled:opacity-50",
          tone === "dark"
            ? "text-white/55 hover:text-white"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        {routing.locales.map((l) => (
          /* Native options inherit the OS menu ground, not the footer's —
           * so they need ink text regardless of the trigger's tone. */
          <option key={l} value={l} className="text-ink">
            {localeNames[l]}
          </option>
        ))}
      </select>
    </label>
  );
}
