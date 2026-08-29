// One entry point for a design-sync build of this repo, in the order that
// matters: Tailwind is compiled from the component sources AND the authored
// previews, so a utility used only by a preview still exists in the shipped
// CSS; then the package dir is regenerated (it carries copies of that CSS, the
// fonts, the docs and the shims); then the converter runs.
// Run this instead of package-build.mjs directly — a bare converter run ships
// stale CSS the moment a preview introduces a new utility class.
import { execFileSync } from "node:child_process";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const run = (args) =>
  execFileSync("node", args, { cwd: root, stdio: "inherit", env: process.env });

run([".design-sync/build-css.mjs"]);
run([".design-sync/setup-pkgdir.mjs"]);
run([
  ".ds-sync/package-build.mjs",
  "--config",
  ".design-sync/config.json",
  "--node-modules",
  ".design-sync/.cache/nm",
  "--out",
  "./ds-bundle",
  ...process.argv.slice(2),
]);
