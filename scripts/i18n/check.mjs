#!/usr/bin/env node
/**
 * The guard that keeps the locale tree honest (docs/i18n.md §8). Fails CI on:
 *
 *   1. key parity      — a locale missing or inventing a key vs. `en`
 *   2. ICU arg parity  — a translation that dropped or renamed a placeholder
 *   3. staleness       — English changed after the translation was stamped
 *
 * Tiers 1 and 2 never fall back silently: a missing key is a build failure, so
 * a half-translated page cannot ship. Tier-3 documents are the deliberate
 * exception and are handled in src/lib/documents.ts, not here.
 */
import { existsSync, readFileSync } from "node:fs";
import {
  SOURCE_LOCALE,
  STATE_FILE,
  hash,
  icuArgs,
  locales,
  namespaces,
  readNamespace,
} from "./lib.mjs";

const problems = [];
const targets = locales().filter((l) => l !== SOURCE_LOCALE);
const state = existsSync(STATE_FILE)
  ? JSON.parse(readFileSync(STATE_FILE, "utf8"))
  : {};

let checked = 0;
let stale = 0;

for (const namespace of namespaces()) {
  const source = readNamespace(SOURCE_LOCALE, namespace);

  for (const locale of targets) {
    const translated = readNamespace(locale, namespace);
    if (translated === null) {
      problems.push(`${locale}: missing namespace "${namespace}.json"`);
      continue;
    }

    const stamped = state[locale] ?? {};

    for (const key of Object.keys(source)) {
      const id = `${namespace}.${key}`;
      checked++;

      if (!(key in translated)) {
        problems.push(`${locale}: missing key "${id}"`);
        continue;
      }

      const expected = icuArgs(source[key]);
      const actual = icuArgs(translated[key]);
      const dropped = [...expected].filter((a) => !actual.has(a));
      const invented = [...actual].filter((a) => !expected.has(a));
      if (dropped.length || invented.length) {
        problems.push(
          `${locale}: "${id}" ICU arguments differ` +
            (dropped.length ? ` — dropped {${dropped.join("}, {")}}` : "") +
            (invented.length ? ` — invented {${invented.join("}, {")}}` : ""),
        );
      }

      const current = hash(source[key]);
      if (!(id in stamped)) {
        problems.push(`${locale}: "${id}" was never stamped — run i18n:stamp`);
      } else if (stamped[id] !== current) {
        stale++;
        problems.push(
          `${locale}: "${id}" is STALE — the English source changed since translation`,
        );
      }
    }

    for (const key of Object.keys(translated)) {
      if (!(key in source)) {
        problems.push(
          `${locale}: key "${namespace}.${key}" does not exist in ${SOURCE_LOCALE}`,
        );
      }
    }
  }
}

if (problems.length === 0) {
  console.log(
    `i18n ok — ${checked} keys across ${targets.length} locales, all present, argument-compatible and current.`,
  );
  process.exit(0);
}

console.error(`i18n check failed — ${problems.length} problem(s):\n`);
for (const problem of problems) console.error(`  • ${problem}`);
if (stale > 0) {
  console.error(
    `\n${stale} stale translation(s). Retranslate the affected keys, then run \`npm run i18n:stamp\` to record the new baseline.`,
  );
}
process.exit(1);
