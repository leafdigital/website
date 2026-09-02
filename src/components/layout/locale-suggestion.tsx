"use client";

import { useSyncExternalStore } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { LOCALE_HINT_COOKIE, rememberLocaleChoice } from "@/i18n/locale-choice";
import { isLocale } from "@/i18n/routing";
import strings from "../../../messages/locale-suggestion.json";

const HINT = LOCALE_HINT_COOKIE;

/**
 * The hint lives in a cookie the proxy writes, which makes it an external
 * store rather than component state — so it is read through
 * useSyncExternalStore: correct on the server (no cookie, no banner), correct
 * after hydration, and re-read when we clear it on dismiss.
 */
const listeners = new Set<() => void>();
const notify = () => listeners.forEach((listener) => listener());

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function readHint() {
  return (
    document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${HINT}=`))
      ?.split("=")[1] ?? null
  );
}

/**
 * Offers — never imposes — the language the visitor's country suggests. A
 * visitor whose browser says English but whose IP says Brazil keeps the
 * English page and gets a dismissible prompt; auto-redirecting on geo would
 * override a signal they explicitly set (docs/i18n.md §3).
 *
 * Copy is shown in the SUGGESTED language, not the current one — a prompt
 * offering Portuguese is useless written in German.
 */
export function LocaleSuggestion() {
  const active = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const hint = useSyncExternalStore(subscribe, readHint, () => null);

  if (!hint || !isLocale(hint) || hint === active) return null;

  const copy = strings[hint];

  /* Dismissing is itself a choice: stop offering, and don't re-ask next page. */
  const dismiss = () => {
    rememberLocaleChoice();
    notify();
  };

  const accept = () => {
    rememberLocaleChoice();
    router.replace(pathname, { locale: hint });
  };

  return (
    <div lang={hint} className="border-border bg-accent border-b">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-3 px-4 py-2 text-sm">
        {/* `lang` above matters: this text is not in the page's language. */}
        <span>{copy.message}</span>
        <button
          type="button"
          onClick={accept}
          className="text-foreground font-semibold underline underline-offset-4 transition-colors duration-150"
        >
          {copy.accept}
        </button>
        <button
          type="button"
          onClick={dismiss}
          className="text-muted-foreground hover:text-foreground transition-colors duration-150"
        >
          {copy.dismiss}
        </button>
      </div>
    </div>
  );
}
