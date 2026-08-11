import { track } from "@vercel/analytics";

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

export function trackCta(event: CtaEvent, props?: Record<string, string>) {
  track(event, props);
}
