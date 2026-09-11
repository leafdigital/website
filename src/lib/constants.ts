/**
 * Single source for site-wide facts. Pages import from here so a rename or
 * address change is a one-line edit.
 */

/** The live app. Named in the v3 handoff; replaces the old placeholder. */
export const APP_NAME = "Image Voice";

/**
 * The three apps still in the lab. Named here for the same reason APP_NAME
 * is: they are brand terms, never translated (i18n/glossary.json), and
 * structured data has to call them something.
 *
 * v3 retired Hidden Margin and renamed Reorder Engine to Reorder Loop; Lost
 * Sales then became Runway. Every old route 301s to its successor in
 * next.config.ts.
 */
export const REORDER_LOOP_NAME = "Reorder Loop";
export const COUNT_CHECK_NAME = "Count Check";
export const RUNWAY_NAME = "Runway";

export const SITE_NAME = "Leaf Digital";
export const SITE_URL = "https://www.leafdigital.io";
export const SUPPORT_EMAIL = "hello@leafdigital.io";

/**
 * False until domain cutover: the v1 site still answers on leafdigital.co,
 * and search engines must not index this deploy before then. Flipped by setting
 * NEXT_PUBLIC_SITE_INDEXABLE=true on the Vercel project (cutover checklist).
 */
export const SITE_INDEXABLE = process.env.NEXT_PUBLIC_SITE_INDEXABLE === "true";

/**
 * GA4 property for leafdigital.io.
 *
 * Not secret — a measurement ID ships in the page source by definition, so
 * it lives here with the other site facts rather than in an env var. What IS
 * environment-dependent is whether it loads at all: see `GA_ENABLED`.
 */
export const GA_MEASUREMENT_ID = "G-7RHWEPW611";

/**
 * GA loads on the real site and nowhere else.
 *
 * It rides `SITE_INDEXABLE` deliberately. Both flags answer the same
 * question — "is this the deployment the public actually visits?" — and the
 * alternative is worse than the coupling: `npm run start` is a production
 * build, so a NODE_ENV check alone means every Lighthouse CI run posts
 * eighteen synthetic sessions to the property, and the first thing you would
 * ask of the data ("how many real people ran the free scan") is the thing it
 * can no longer answer. Preview deploys are excluded for the same reason.
 *
 * NEXT_PUBLIC_* is inlined at build time, so this is decided when the site is
 * built, not when the server boots.
 */
export const GA_ENABLED = SITE_INDEXABLE;

/**
 * PostHog, for behaviour: every click (autocapture), the path through the
 * site, funnels and heatmaps. GA4 stays for acquisition — which campaign sent
 * the visitor — and PostHog answers what they did once they arrived.
 *
 * Like the GA ID, the project key is public by design (it ships in the page),
 * so it lives here rather than in an env var. Empty means off. It rides
 * `GA_ENABLED` for the same reason GA does: previews, local builds and every
 * Lighthouse run must never post synthetic sessions to the real project.
 *
 * No session replay on this site, deliberately — the app promises none, and a
 * buyer who reads the privacy policy should find the website keeps the same
 * promise. Replay is disabled in the client config, not just in the project.
 */
export const POSTHOG_KEY: string =
  "phc_o6viozdbPiPtSN4kW35DZi3bhayqcsSZSLFUpkoYghdn";
/** The project's region host — `https://us.i.posthog.com` or `https://eu.i.posthog.com`. */
export const POSTHOG_HOST = "https://us.i.posthog.com";
export const POSTHOG_ENABLED = GA_ENABLED && POSTHOG_KEY !== "";

/**
 * The App Store listing. BLOCKER: guessed from the app name — the real
 * handle is whatever Shopify assigns on approval. Every "Install on the
 * Shopify App Store" button on /image-voice points here.
 */
export const APP_INSTALL_URL = "https://apps.shopify.com/image-voice";

/**
 * Sample figures. Every one of these renders under a visible "sample data"
 * caption — we never present them as a case study — and every one is
 * expected to change, which is why they live here and not in a message file.
 * They are passed to ICU as raw integers so each locale formats its own
 * separators: 2,451 in en, 2.451 in de, 2 451 in fr.
 */
export const SAMPLE = {
  /**
   * Home hero: the same SKU set counted by three systems on the same day,
   * and the gap between the highest and lowest count priced at cost.
   */
  inventory: {
    shopify: 12480,
    threePl: 12118,
    spreadsheet: 12940,
    gapUnits: 822,
    gapDollars: 19700,
  },
  /** Image Voice hero + benefits: silent images out of the catalogue. */
  silentImages: 2451,
  totalImages: 3102,
  /** The bulk-apply prompt in benefit 06: what is left after a review run. */
  bulkRemaining: 1750,
  /**
   * Reorder Loop’s opening claim: how many apps forecast inventory, and how
   * many of them will actually finish the order.
   */
  forecastingApps: 9,
  appsThatFinishTheOrder: 0,
  /**
   * Count Check’s opening claim: one SKU, two systems, on the same day. The
   * gap is derived below rather than typed in — a hand-entered third number
   * is a number that can drift out of arithmetic with the two above it.
   */
  countCheck: {
    threePl: 412,
    shopify: 447,
  },
  /**
   * Runway’s hero: one line of the Monday list. Days of cover against the
   * supplier’s real lead time is the whole argument — nine days is fine
   * against a 3-day supplier and already late against a 26-day one — so the
   * card states both, then what closing the gap costs and ties up.
   */
  runway: {
    daysOfCover: 4,
    leadTimeDays: 26,
    shortUnits: 282,
    orderCost: 9900,
    cashTiedDays: 74,
  },
} as const;

/** The gap Count Check exists to show: the two counts, subtracted. */
export const COUNT_CHECK_GAP = Math.abs(
  SAMPLE.countCheck.shopify - SAMPLE.countCheck.threePl,
);

/**
 * Plan prices, in USD. Passed to ICU as raw numbers so each locale formats
 * its own symbol placement and separators — never written into a message.
 */
export const PRICING = {
  audit: 0,
  keeper: 8.9,
  curator: 28.9,
} as const;

/**
 * What a Founding Curator pays for Curator, for life. Derived, not typed in:
 * the offer copy says "half price" in six languages, so a hand-entered figure
 * that drifts from half of `curator` turns that sentence into a false claim.
 */
export const FOUNDING_CURATOR_PRICE = PRICING.curator / 2;

/**
 * Founder-offer inventory. Counts down as spots go; the copy around each one
 * is written so a changed number never breaks the sentence.
 */
export const OFFER = {
  /** Image Voice — Curator at half price, for life. */
  foundingCurators: 25,
  /** Every lab app — Charter pricing, locked for life. */
  charterStores: 50,
} as const;
