// The converter derives the package dir as <node-modules>/<pkg>, but this repo
// is a Next.js app that never self-installs. Two things go wrong if you just
// symlink the repo into node_modules under its own name:
//   1. leaf-website -> repo-root is a cycle (repo contains that node_modules),
//      and ts-morph's directory walk dies with ENAMETOOLONG.
//   2. even without the cycle, the walk descends the repo's real node_modules
//      (13k .d.ts) and runs node out of memory.
// So: a scratch node_modules that shallow-mirrors the real one for dependency
// resolution, plus a MINIMAL real package dir for leaf-website that contains
// only what discovery needs. src is a symlink (no .d.ts, no node_modules under
// it, no cycle); css/fonts/tsconfig are copied because package-build bounds
// cfg.cssEntry to the realpath of the package dir.
// Regenerate on a fresh clone — everything here is gitignored.
import {
  cpSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  symlinkSync,
  writeFileSync,
  existsSync,
} from "node:fs";
import { join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const real = join(root, "node_modules");
const scratch = join(root, ".design-sync/.cache/nm");
const pkgDir = join(scratch, "leaf-website");

rmSync(scratch, { recursive: true, force: true });
mkdirSync(scratch, { recursive: true });

let n = 0;
for (const name of readdirSync(real)) {
  if (name === "leaf-website") continue;
  if (name.startsWith("@")) {
    mkdirSync(join(scratch, name), { recursive: true });
    for (const sub of readdirSync(join(real, name))) {
      symlinkSync(join(real, name, sub), join(scratch, name, sub));
      n++;
    }
    continue;
  }
  symlinkSync(join(real, name), join(scratch, name));
  n++;
}

// Minimal package dir. No main/module/exports on purpose: that is what makes
// package-build take the synth-entry path and build from src/.
mkdirSync(pkgDir, { recursive: true });
const appPkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
writeFileSync(
  join(pkgDir, "package.json"),
  JSON.stringify(
    { name: "leaf-website", version: appPkg.version, private: true },
    null,
    2,
  ) + "\n",
);
symlinkSync(join(root, "src"), join(pkgDir, "src"));
// public/ so the image shim can inline site assets (the logo Header renders)
// as data URIs — absolute "/brand/..." paths have no server behind them here.
symlinkSync(join(root, "public"), join(pkgDir, "public"));
// messages/ so the next-intl shim can serve the real English copy instead of
// placeholder strings — Header, Footer and WaitlistForm are all copy, and a
// preview of them showing "[[footer.rights]]" would be worse than useless.
symlinkSync(join(root, "messages"), join(pkgDir, "messages"));
// tsconfig is copied (so `@/*` -> ./src/* resolves against pkgDir/src) with
// design-sync-only aliases layered on. esbuild reads these paths, which is the
// only supported way to swap a module for the bundle:
//   next/link, next/image -> plain <a>/<img>; the real modules drag the Next
//     client runtime and its bare process.env reads into the bundle.
//   @/lib/constants -> a shim that loads a process guard first, then re-exports
//     the real file (its module-scope process.env read would otherwise throw).
//   next-intl, @/i18n/*, @/lib/analytics -> shims. Same class of problem, one
//     scale worse: the design system is a single module, so one module-scope
//     process.env read anywhere in the graph empties EVERY preview.
// Exact patterns win over the `@/*` wildcard, so @/lib/* is otherwise untouched.
cpSync(join(root, ".design-sync/shims"), join(pkgDir, "shims"), {
  recursive: true,
});
// Per-component docs become each <Name>.prompt.md, and their `category`
// frontmatter is what groups the cards in the Design System pane.
cpSync(join(root, ".design-sync/docs"), join(pkgDir, "docs"), {
  recursive: true,
});
// Deliberately MINIMAL — paths only, no include/exclude globs. The converter
// strips /* */ comments from tsconfig before JSON.parse, and the repo's own
// config pairs an "@/*" key with a later "**/*.ts" glob: the stripper reads
// that span as one block comment, mangles the JSON, and the paths plugin
// silently resolves to null (aliases never fire). Keeping the include globs
// out means there is no closing */ for "@/*" to open against.
const appTs = JSON.parse(readFileSync(join(root, "tsconfig.json"), "utf8"));
writeFileSync(
  join(pkgDir, "tsconfig.json"),
  JSON.stringify(
    {
      compilerOptions: {
        baseUrl: ".",
        jsx: appTs.compilerOptions.jsx,
        // Exact aliases MUST precede the "@/*" wildcard: the converter's
        // paths plugin is first-match-wins, not longest-prefix, so "@/*"
        // would otherwise shadow "@/lib/constants".
        paths: {
          "next/link": ["./shims/next-link.tsx"],
          "next/image": ["./shims/next-image.tsx"],
          "@/lib/constants": ["./shims/constants.ts"],
          // The i18n layer: next-intl is a Next client-runtime package and
          // reads process.env at module scope. Because the design system
          // ships as ONE module, that throw empties every preview in the
          // bundle — primitives included. These four keep it out entirely.
          "next-intl": ["./shims/next-intl.tsx"],
          "@/i18n/navigation": ["./shims/i18n-navigation.tsx"],
          "@/i18n/routing": ["./shims/i18n-routing.ts"],
          "@/lib/analytics": ["./shims/analytics.ts"],
          ...appTs.compilerOptions.paths,
        },
      },
    },
    null,
    2,
  ) + "\n",
);
const css = join(root, ".design-sync/.cache/leaf.css");
if (!existsSync(css)) throw new Error("run .design-sync/build-css.mjs first");
cpSync(css, join(pkgDir, "styles.css"));
cpSync(join(root, ".design-sync/fonts"), join(pkgDir, "fonts"), {
  recursive: true,
});

console.log(`[pkgdir] mirrored ${n} packages`);
console.log(`[pkgdir] package dir: ${pkgDir} (src -> repo/src)`);
