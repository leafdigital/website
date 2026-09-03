/* eslint-disable @typescript-eslint/no-unused-vars -- the parameters exist
   to keep the real module's signature; the body is deliberately empty. */
/**
 * design-sync shim for `@/lib/analytics`.
 *
 * The real module imports `@vercel/analytics` and `@next/third-parties/google`
 * — both of which expect a Next app shell, and the GA helper is gated on a
 * `process.env`-derived flag. A preview has no analytics to report to, and a
 * design session should never post events to the production properties, so
 * this is a deliberate no-op.
 *
 * The event union is duplicated rather than imported so this file pulls in
 * nothing; it exists only to keep `TrackedLink`'s prop types honest.
 */
export type CtaEvent =
  | "cta_scan_click"
  | "cta_install_click"
  | "cta_pricing_view"
  | "cta_contact_click"
  | "cta_app_view"
  | "cta_waitlist_join";

export function trackCta(_event: CtaEvent, _props?: Record<string, string>) {
  /* no-op: previews report nowhere */
}
