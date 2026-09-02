/**
 * Single source for site-wide facts. Pages import from here so a rename or
 * address change is a one-line edit.
 */

/** The live app. Named in the v3 handoff; replaces the old placeholder. */
export const APP_NAME = "Image Voice";

export const SITE_NAME = "Leaf Digital";
export const SITE_URL = "https://www.leafdigital.co";
export const SUPPORT_EMAIL = "hello@leafdigital.co";

/**
 * False until domain cutover: the v1 site owns leafdigital.co, and search
 * engines must not index this deploy before then. Flipped by setting
 * NEXT_PUBLIC_SITE_INDEXABLE=true on the Vercel project (cutover checklist).
 */
export const SITE_INDEXABLE = process.env.NEXT_PUBLIC_SITE_INDEXABLE === "true";

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
  /** Hidden Margin hero: this store’s score against its size cohort. */
  readinessScore: 61,
  benchmarkScore: 74,
  /** The three gap rows under the score. */
  gaps: {
    missingCost: 131,
    missingWeight: 342,
    missingCustoms: 89,
  },
  /** Hidden Margin’s sample report: the two rows the arithmetic can price. */
  report: {
    trailRunnerRevenue: 18400,
    toteLeakPerOrder: 0.8,
  },
  /**
   * Reorder Engine’s opening claim: how many apps forecast inventory, and
   * how many of them will actually place the order.
   */
  forecastingApps: 9,
  appsThatSendThePo: 0,
} as const;

/**
 * Plan prices, in USD. Passed to ICU as raw numbers so each locale formats
 * its own symbol placement and separators — never written into a message.
 */
export const PRICING = {
  audit: 0,
  keeper: 18.9,
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
  /** Hidden Margin — top plan at the middle plan's price. */
  foundingMerchants: 15,
  /** Reorder Engine — Charter pricing, locked for life. */
  charterStores: 50,
} as const;
