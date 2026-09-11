import { track } from "@vercel/analytics";
import { sendGAEvent } from "@next/third-parties/google";
import type { PostHog } from "posthog-js";
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
 * Behaviour events, fired by the site-wide listeners in `SiteAnalytics` and by
 * the waitlist form. They are GA4 events first — GA does not autocapture
 * clicks the way PostHog does — so the names follow GA4's rules: snake_case,
 * under 40 characters, and `generate_lead` is GA's own recommended name.
 */
export type SiteEvent =
  /** Any same-site link that is not already a named CTA. */
  | "internal_link_click"
  /** A FAQ question (or "show all") opened. */
  | "faq_open"
  /** 25 / 50 / 75 / 90 % of the page reached, once each per page view. */
  | "scroll_depth"
  /** A waitlist email accepted — GA4's recommended lead event. */
  | "generate_lead"
  | "waitlist_error";

type Props = Record<string, string | number>;

/*
 * PostHog loads lazily after first paint, so events can fire before it
 * exists. They queue here and flush the moment the loader registers the
 * client; nothing is lost to the race, and nothing is sent if it never loads.
 */
let posthog: PostHog | null = null;
const queue: [string, Props][] = [];

export function registerPostHog(client: PostHog) {
  posthog = client;
  for (const [event, props] of queue.splice(0)) client.capture(event, props);
}

function toPostHog(event: string, props: Props) {
  if (posthog) posthog.capture(event, props);
  else if (queue.length < 50) queue.push([event, props]);
}

function toGA(event: string, props: Props) {
  /* Guarded: off a real deployment there is no gtag, and pushing to a
   * dataLayer nothing will ever read just builds a queue in memory. */
  if (GA_ENABLED) sendGAEvent("event", event, props);
}

/**
 * Fires a CTA into every analytics destination from one call site.
 *
 * Vercel Analytics is cookieless and answers "did this button get clicked";
 * GA4 answers "which campaign sent the person who clicked it"; PostHog puts
 * the click on the visitor's path. No call site knows there are three.
 *
 * `eventProps` keys arrive in GA4 as custom dimensions, which have to be
 * registered in the GA admin before they appear in reports — sending them is
 * not the same as seeing them.
 */
export function trackCta(event: CtaEvent, props?: Record<string, string>) {
  track(event, props);
  toGA(event, props ?? {});
  toPostHog(event, props ?? {});
}

/**
 * A behaviour event. `posthog: false` for the ones PostHog already records on
 * its own — autocaptured link clicks, and scroll depth on page leave — so its
 * data is not doubled.
 */
export function trackEvent(
  event: SiteEvent,
  props: Props = {},
  { posthog: sendToPostHog = true }: { posthog?: boolean } = {},
) {
  toGA(event, props);
  if (sendToPostHog) toPostHog(event, props);
}
