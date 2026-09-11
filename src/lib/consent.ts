/**
 * Analytics consent — one module, because three things have to agree on it:
 * the proxy (which knows the visitor's country), the inline script that sets
 * Google's consent defaults before GA loads, and the banner.
 *
 * The rule, and why it is regional:
 *
 * - EU/EEA, UK and Switzerland (ePrivacy + GDPR) and Brazil (LGPD) need opt-in
 *   before analytics cookies are set. Visitors there get a banner, and until
 *   they accept, everything runs cookieless: GA4 in Consent Mode "denied"
 *   (cookieless pings, nothing stored), PostHog in cookieless mode, Vercel
 *   Analytics is cookieless anyway.
 * - Everywhere else, analytics cookies are on by default with no banner — US
 *   law asks for an opt-out only where data is sold or shared for ads, and we
 *   do neither. The footer's "Privacy choices" still lets anyone turn them off.
 *
 * Declining is honoured, and the banner says what it means: no cookies, but
 * visits are still counted without them. That sentence is the difference
 * between a banner that is honest and one that is theatre.
 *
 * Both cookies below are strictly necessary — one says which rule applies, the
 * other remembers the answer — and neither identifies anyone.
 */

/** Set by the proxy from `x-vercel-ip-country`; value is `gated` or absent. */
export const REGION_COOKIE = "leaf_region";
/** The visitor's answer: `granted` or `denied`. Absent means not asked yet. */
export const CONSENT_COOKIE = "leaf_consent";

/** Six months, the ceiling most EU regulators accept for a consent record. */
const CONSENT_MAX_AGE = 60 * 60 * 24 * 180;

/** Countries where analytics cookies wait for an explicit yes. */
// prettier-ignore
export const GATED_COUNTRIES = new Set([
  // EU
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR",
  "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK",
  "SI", "ES", "SE",
  // EEA outside the EU
  "IS", "LI", "NO",
  // UK GDPR + PECR, Swiss FADP
  "GB", "CH",
  // LGPD
  "BR",
]);

export type ConsentChoice = "granted" | "denied";

/**
 * Google's consent defaults, set before gtag.js loads. It has to be an inline
 * script rather than an effect: GA reads the defaults on its first command,
 * and anything that runs after hydration runs after that.
 *
 * Ads signals are denied everywhere and always — there are no ads to consent
 * to, and saying so in the defaults means no future tag can quietly assume it.
 */
export const CONSENT_DEFAULTS_SCRIPT = `(function(){
var w=window;w.dataLayer=w.dataLayer||[];
w.gtag=w.gtag||function(){w.dataLayer.push(arguments)};
var c=document.cookie,
g=/(?:^|; )${REGION_COOKIE}=gated/.test(c),
m=c.match(/(?:^|; )${CONSENT_COOKIE}=(granted|denied)/),
s=m?m[1]:(g?'denied':'granted');
w.gtag('consent','default',{analytics_storage:s,ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
})();`;

function readCookie(name: string) {
  return (
    document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${name}=`))
      ?.split("=")[1] ?? null
  );
}

export function isGatedRegion() {
  return readCookie(REGION_COOKIE) === "gated";
}

export function readConsent(): ConsentChoice | null {
  const value = readCookie(CONSENT_COOKIE);
  return value === "granted" || value === "denied" ? value : null;
}

/* An external store, like the locale hint: the banner, the footer button and
 * the PostHog loader all read it, and all of them must see a change at once. */
const listeners = new Set<() => void>();
let bannerForcedOpen = false;

export function subscribeConsent(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function notify() {
  listeners.forEach((listener) => listener());
}

/** Whether the banner should be on screen. */
export function bannerSnapshot() {
  return bannerForcedOpen || (isGatedRegion() && readConsent() === null);
}

/** The footer's "Privacy choices": reopen the banner, wherever you are. */
export function openConsentBanner() {
  bannerForcedOpen = true;
  notify();
}

type ConsentHandler = (choice: ConsentChoice) => void;
const handlers = new Set<ConsentHandler>();

/** Analytics loaders register here to hear the answer. */
export function onConsentChange(handler: ConsentHandler) {
  handlers.add(handler);
  return () => handlers.delete(handler);
}

export function setConsent(choice: ConsentChoice) {
  document.cookie = `${CONSENT_COOKIE}=${choice}; max-age=${CONSENT_MAX_AGE}; path=/; samesite=lax`;
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void })
    .gtag;
  gtag?.("consent", "update", { analytics_storage: choice });
  handlers.forEach((handler) => handler(choice));
  bannerForcedOpen = false;
  notify();
}
