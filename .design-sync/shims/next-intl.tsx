/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * design-sync shim for `next-intl`.
 *
 * The real package is a Next client-runtime module: it reads `process.env` at
 * module scope, which throws in a plain browser bundle and — because the
 * whole design system ships as one module — takes every other preview down
 * with it. Before this existed the render check was 0/37 clean, all "root
 * empty", including primitives that have nothing to do with i18n.
 *
 * It serves the REAL English copy out of `messages/en/*.json` rather than
 * inventing placeholder strings, so previews show the words the site ships.
 * Nothing is duplicated: these are the same files Next loads.
 *
 * Formatting goes through `intl-messageformat`, which is what next-intl uses
 * underneath, so ICU arguments, plurals and number skeletons behave the same
 * as in production instead of being approximated.
 */
import * as React from "react";
import { IntlMessageFormat } from "intl-messageformat";
import common from "../messages/en/common.json";
import og from "../messages/en/og.json";
import support from "../messages/en/support.json";
import home from "../messages/en/home.json";
import imageVoice from "../messages/en/imageVoice.json";
import hiddenMargin from "../messages/en/hiddenMargin.json";
import reorderEngine from "../messages/en/reorderEngine.json";

const LOCALE = "en";

const messages: Record<string, unknown> = {
  common,
  og,
  support,
  home,
  imageVoice,
  hiddenMargin,
  reorderEngine,
};

/** `"footer.rights"` -> the string at that path, or undefined. */
function lookup(path: string): unknown {
  return path
    .split(".")
    .reduce<any>((node, key) => (node == null ? node : node[key]), messages);
}

type Values = Record<string, unknown>;

function format(path: string, values?: Values, rich = false) {
  const message = lookup(path);
  /* A missing key is a bug in the preview, not something to hide behind a
   * blank: surface the path so it is obvious which one. */
  if (typeof message !== "string") return `[[${path}]]`;
  const out = new IntlMessageFormat(message, LOCALE).format(values as any);
  if (rich) return out as React.ReactNode;
  return Array.isArray(out) ? out.join("") : String(out);
}

export function useTranslations(namespace?: string) {
  const prefix = namespace ? `${namespace}.` : "";
  const t = (key: string, values?: Values) => format(prefix + key, values);
  t.rich = (key: string, values?: Values) =>
    format(prefix + key, values, true) as React.ReactNode;
  t.markup = (key: string, values?: Values) => format(prefix + key, values);
  t.raw = (key: string) => lookup(prefix + key);
  t.has = (key: string) => typeof lookup(prefix + key) === "string";
  return t;
}

export function useLocale() {
  return LOCALE;
}

export function useFormatter() {
  return {
    number: (value: number, options?: Intl.NumberFormatOptions) =>
      new Intl.NumberFormat(LOCALE, options).format(value),
    dateTime: (value: Date, options?: Intl.DateTimeFormatOptions) =>
      new Intl.DateTimeFormat(LOCALE, options).format(value),
    list: (value: Iterable<string>) => [...value].join(", "),
    relativeTime: (value: Date) => String(value),
  };
}

/** The provider is a no-op here — there is one locale and no request. */
export function NextIntlClientProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  return <>{children}</>;
}
