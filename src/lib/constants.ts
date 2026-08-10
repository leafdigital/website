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
 * The mirror number — the coverage deficit shown on the homepage and the
 * alt-text landing hero. Load-bearing copy from the product blueprint:
 * a real-looking store scan, not a round marketing number.
 */
export const MIRROR = { covered: 1255, total: 3102 } as const;
