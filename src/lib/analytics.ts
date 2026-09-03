import { track } from "@vercel/analytics";
import { sendGAEvent } from "@next/third-parties/google";
import { GA_ENABLED } from "./constants";

/**
 * CTA event vocabulary. One place so dashboards never chase free-form
 * strings. Scan clicks are the number that matters.
 */
export type CtaEvent =
  | "cta_scan_click"
  | "cta_install_click"
  | "cta_pricing_view"
  | "cta_contact_click"
  /** Internal navigation toward an app page — not an install. */
  | "cta_app_view"
  | "cta_waitlist_join";

/**
 * Fires into both analytics properties from one call site.
 *
 * Two destinations, deliberately: Vercel Analytics is cookieless and answers
 * "did this button get clicked", GA4 answers "which campaign sent the person
 * who clicked it". Neither call site nor component knows there are two — the
 * whole reason this vocabulary is a union type in one file is so a rename
 * cannot silently orphan a dashboard.
 *
 * The names are already GA4-shaped: snake_case and under 40 characters. Note
 * that `eventProps` keys arrive as GA4 custom dimensions, which have to be
 * registered in the GA admin before they appear in reports — sending them is
 * not the same as seeing them.
 */
export function trackCta(event: CtaEvent, props?: Record<string, string>) {
  track(event, props);
  /* Guarded: off a real deployment there is no gtag, and pushing to a
   * dataLayer nothing will ever read just builds a queue in memory. */
  if (GA_ENABLED) sendGAEvent("event", event, props ?? {});
}
