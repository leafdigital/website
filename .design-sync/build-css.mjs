// Compiles the site's Tailwind v4 source (src/app/globals.css) into a real
// stylesheet for the design-sync bundle. The site never ships compiled CSS —
// Next does it at build time — so design-sync has to produce it here.
// Scanned sources: src/ (the components) + .design-sync/previews/ (authored
// preview compositions), so utilities used only by a preview still emit.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import postcss from "postcss";
import tailwind from "@tailwindcss/postcss";

const root = resolve(import.meta.dirname, "..");
const entry = resolve(root, ".design-sync/.cache/tw-entry.css");
const out = resolve(root, ".design-sync/.cache/leaf.css");

/* The v3 ink ramp, surfaces and hairlines. These are semantic names too —
 * they just are not shadcn's. Without them a design agent typing
 * `text-ink-muted` or `bg-surface-deep` gets a class that does nothing,
 * because Tailwind only emits what it finds in the scanned sources and the
 * site happens to use only some of them. */
const INK = [
  "ink",
  "ink-muted",
  "ink-faint",
  "ink-wash",
  "surface-dark",
  "surface-deep",
  "surface-muted",
  "on-dark",
  "on-dark-muted",
  "brand-on-dark",
  "hairline",
  "hairline-soft",
  "hairline-strong",
];
/* On a dark band everything is white at some alpha. */
const WHITE_ALPHA = "white/{8,10,12,20,25,55,60,70,75,80,82,90}";
const SEMANTIC = [
  "background",
  "foreground",
  "card",
  "card-foreground",
  "popover",
  "popover-foreground",
  "primary",
  "primary-foreground",
  "secondary",
  "secondary-foreground",
  "muted",
  "muted-foreground",
  "accent",
  "accent-foreground",
  "destructive",
  "border",
  "input",
  "ring",
];
const BRAND = [
  "brand-50",
  "brand-100",
  "brand-200",
  "brand-400",
  "brand-500",
  "brand-600",
  "brand-700",
  "brand-800",
  "brand-900",
];
const NEUTRAL = [
  "neutral-50",
  "neutral-100",
  "neutral-200",
  "neutral-300",
  "neutral-400",
  "neutral-500",
  "neutral-600",
  "neutral-700",
  "neutral-800",
  "neutral-900",
  "white",
  "transparent",
];
const SPACE =
  "{0,0.5,1,1.5,2,2.5,3,3.5,4,5,6,7,8,9,10,11,12,14,16,20,24,28,32}";
const RESP = "{,sm:,md:,lg:,xl:}";
const SAFELIST = [
  // layout + flex/grid
  `@source inline("${RESP}{block,inline-block,inline,flex,inline-flex,grid,inline-grid,hidden,contents}");`,
  `@source inline("${RESP}{flex-row,flex-col,flex-wrap,flex-nowrap,flex-1,flex-auto,flex-none,shrink-0,grow}");`,
  `@source inline("${RESP}{items-start,items-center,items-end,items-baseline,items-stretch}");`,
  `@source inline("${RESP}{justify-start,justify-center,justify-end,justify-between,justify-around,justify-evenly}");`,
  `@source inline("${RESP}{self-start,self-center,self-end,text-left,text-center,text-right}");`,
  `@source inline("${RESP}grid-cols-{1,2,3,4,5,6,12}");`,
  `@source inline("${RESP}{col-span,row-span}-{1,2,3,4,5,6}");`,
  `@source inline("${RESP}{gap,gap-x,gap-y}-${SPACE}");`,
  // spacing
  `@source inline("${RESP}{p,px,py,pt,pb,pl,pr}-${SPACE}");`,
  `@source inline("${RESP}{m,mx,my,mt,mb,ml,mr}-${SPACE}");`,
  `@source inline("${RESP}{mx-auto,ml-auto,mr-auto,space-y-4,space-y-6,space-y-8}");`,
  // sizing
  `@source inline("${RESP}{w-full,w-auto,w-fit,h-full,h-auto,h-screen,min-h-screen,size-4,size-5,size-6,size-8,size-10,size-12}");`,
  `@source inline("${RESP}max-w-{xs,sm,md,lg,xl,2xl,3xl,4xl,5xl,6xl,7xl,full,none,prose}");`,
  // typography
  `@source inline("${RESP}text-{xs,sm,base,lg,xl,2xl,3xl,4xl,5xl,6xl}");`,
  // the v3 type ramp — the named steps, not the generic scale
  `@source inline("${RESP}text-{hero,h2,h2-lg,h3,kicker,fine,caption}");`,
  `@source inline("${RESP}font-{normal,medium,semibold,bold,extrabold,sans,heading}");`,
  `@source inline("${RESP}{leading-none,leading-tight,leading-snug,leading-normal,leading-relaxed,leading-loose}");`,
  `@source inline("${RESP}{tracking-tight,tracking-normal,tracking-wide,tracking-wider,uppercase,capitalize,lowercase}");`,
  `@source inline("${RESP}{text-balance,text-pretty,truncate,tabular-nums,underline,no-underline,underline-offset-4,italic,sr-only,not-sr-only}");`,
  // colour — semantic first, then the raw brand/neutral scales
  `@source inline("${RESP}{bg,text,border,ring,fill,stroke,divide}-{${SEMANTIC.join(",")}}");`,
  `@source inline("${RESP}{bg,text,border,ring,fill,stroke}-{${BRAND.join(",")}}");`,
  `@source inline("${RESP}{bg,text,border}-{${NEUTRAL.join(",")}}");`,
  `@source inline("${RESP}{bg,text,border,divide,ring}-{${INK.join(",")}}");`,
  `@source inline("${RESP}{bg,text,border,divide}-${WHITE_ALPHA}");`,
  // borders, radius, shadow, misc
  `@source inline("${RESP}{border,border-0,border-2,border-t,border-b,border-l,border-r,border-x,border-y,divide-y,divide-x}");`,
  `@source inline("${RESP}rounded-{none,sm,md,lg,xl,2xl,3xl,full}");`,
  `@source inline("${RESP}shadow-{none,sm,md,lg,xl,card,cta,cta-sm,featured,on-dark}");`,
  // entrance + the drifting hero glow; the scroll reveals are plain CSS and
  // ship in the stylesheet already (they need no utility class)
  `@source inline("animate-{fade-up,aurora,aurora-slow}");`,
  `@source inline("${RESP}{relative,absolute,fixed,sticky,static,inset-0,top-0,bottom-0,left-0,right-0,z-10,z-50}");`,
  `@source inline("${RESP}{overflow-hidden,overflow-auto,overflow-x-auto,object-cover,object-contain,cursor-pointer,select-none,transition-all,transition-colors}");`,
  `@source inline("${RESP}{opacity-0,opacity-50,opacity-70,opacity-100,order-first,order-last,list-none,antialiased}");`,
];

mkdirSync(dirname(entry), { recursive: true });
// Entry lives next to the output but resolves imports/sources from repo root.
writeFileSync(
  entry,
  [
    '@import "../../src/app/globals.css";',
    '@source "../../src";',
    '@source "../previews";',
    "",
    "/* globals.css declares `--font-sans: var(--font-sans)` inside @theme inline:",
    "   on the real site Next resolves that by setting --font-sans on <html> via",
    "   the next/font className. Nothing sets it in a plain bundle, so the var is",
    "   self-referential and every component falls back to a serif. Declaring the",
    "   real stack here is the static equivalent of what Next does at runtime.",
    "   The @font-face itself ships separately via cfg.extraFonts. */",
    ':root { --font-sans: "Geist", ui-sans-serif, system-ui, -apple-system, sans-serif; }',
    "",
    "/* Tailwind only emits utilities it finds in the scanned sources, so a CSS",
    "   built from this repo alone carries ~190 classes — exactly the ones the",
    "   site happens to use. The design agent composes NEW layouts with these",
    "   components, and any class outside that set would silently do nothing.",
    "   The safelist below ships the standard layout/spacing/type/colour",
    "   vocabulary (with sm:/md:/lg: variants) so agent-authored markup styles",
    "   correctly. Keep it in sync with the family table in conventions.md. */",
    ...SAFELIST,
    "",
  ].join("\n"),
);

const css = readFileSync(entry, "utf8");
const result = await postcss([tailwind()]).process(css, {
  from: entry,
  to: out,
});
writeFileSync(out, result.css);
console.log(`[tw] wrote ${out} (${(result.css.length / 1024).toFixed(1)} KB)`);
