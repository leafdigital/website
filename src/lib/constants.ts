/**
 * Single source for site-wide facts. Pages import from here so a rename or
 * address change is a one-line edit.
 */

/**
 * Public name of the alt-text app. BLOCKER: final name undecided — this
 * placeholder is the one string to change when the maintainer picks it.
 * Must not ship to the App Store listing as-is.
 */
export const APP_NAME = "Leaf Alt Text";

export const SITE_NAME = "Leaf Digital";
export const SITE_URL = "https://leafdigital.co";
export const SUPPORT_EMAIL = "hello@leafdigital.co";

/**
 * False until domain cutover: the v1 site owns leafdigital.co, and search
 * engines must not index this deploy before then. Flipped by setting
 * NEXT_PUBLIC_SITE_INDEXABLE=true on the Vercel project (cutover checklist).
 */
export const SITE_INDEXABLE = process.env.NEXT_PUBLIC_SITE_INDEXABLE === "true";

/**
 * Future App Store listing. BLOCKER: handle depends on the final app name —
 * update alongside APP_NAME. Dead until the Sep 5 submission is approved.
 */
export const APP_INSTALL_URL = "https://apps.shopify.com/leaf-alt-text";

/**
 * The mirror number — the coverage deficit shown on the homepage and the
 * alt-text landing hero. Load-bearing copy from the product blueprint
 * (verbatim: "1,847 of 3,102"): a real-looking store scan, not a round
 * marketing number.
 */
export const MIRROR = { needsAttention: 1847, total: 3102 } as const;
