#!/usr/bin/env node
/**
 * Records the English source hash behind every translated key. This is the
 * translation pipeline's memory: `i18n:check` compares against it to tell you
 * exactly which keys drifted when the English copy changes.
 *
 * Run after translating, never before — stamping unreviewed or untranslated
 * keys tells the guard a lie it will keep repeating.
 */
import { writeFileSync } from "node:fs";
import {
  SOURCE_LOCALE,
  STATE_FILE,
  hash,
  locales,
  namespaces,
  readNamespace,
} from "./lib.mjs";

const state = {};
let stamped = 0;

for (const locale of locales().filter((l) => l !== SOURCE_LOCALE)) {
  state[locale] = {};
  for (const namespace of namespaces()) {
    const source = readNamespace(SOURCE_LOCALE, namespace);
    const translated = readNamespace(locale, namespace);
    if (translated === null) continue;

    for (const [key, value] of Object.entries(source)) {
      if (key in translated) {
        state[locale][`${namespace}.${key}`] = hash(value);
        stamped++;
      }
    }
  }
}

writeFileSync(STATE_FILE, `${JSON.stringify(state, null, 2)}\n`);
console.log(
  `Stamped ${stamped} translated keys against the ${SOURCE_LOCALE} source.`,
);
