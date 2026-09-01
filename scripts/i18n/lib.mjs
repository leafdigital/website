import { createHash } from "node:crypto";
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";

export const MESSAGES_DIR = path.join(process.cwd(), "messages");
export const STATE_FILE = path.join(MESSAGES_DIR, ".translation-state.json");
export const SOURCE_LOCALE = "en";

export function locales() {
  return readdirSync(MESSAGES_DIR, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort();
}

export function namespaces() {
  return readdirSync(path.join(MESSAGES_DIR, SOURCE_LOCALE))
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.replace(/\.json$/, ""))
    .sort();
}

/** `{a: {b: "x"}}` -> `{"a.b": "x"}`, so key sets are directly comparable. */
export function flatten(obj, prefix = "") {
  const out = {};
  for (const [key, value] of Object.entries(obj)) {
    const full = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === "object" && !Array.isArray(value)) {
      Object.assign(out, flatten(value, full));
    } else {
      out[full] = String(value);
    }
  }
  return out;
}

export function readNamespace(locale, namespace) {
  const file = path.join(MESSAGES_DIR, locale, `${namespace}.json`);
  try {
    return flatten(JSON.parse(readFileSync(file, "utf8")));
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw new Error(
      `${locale}/${namespace}.json is not valid JSON: ${error.message}`,
    );
  }
}

export const hash = (value) =>
  createHash("sha256").update(value).digest("hex").slice(0, 16);

/**
 * ICU argument names, ignoring the format/options tail: `{count, plural, ...}`
 * yields `count`. A translation that drops or renames one still parses, then
 * renders a literal brace or throws at runtime — so it is checked structurally.
 */
export function icuArgs(message) {
  return new Set(
    [...message.matchAll(/\{\s*([A-Za-z0-9_]+)\s*(?:,|\})/g)].map((m) => m[1]),
  );
}
