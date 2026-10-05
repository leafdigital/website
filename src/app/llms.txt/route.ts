import {
  APP_INSTALL_URL,
  APP_NAME,
  APP_VIDEO_WATCH_URL,
  BILL_CHECK_NAME,
  LEDGER_NAME,
  RUNWAY_NAME,
  PRICING,
  SITE_NAME,
  SITE_URL,
  SUPPORT_EMAIL,
} from "@/lib/constants";
import { absoluteUrl } from "@/lib/metadata";
import { routing } from "@/i18n/routing";

/**
 * `/llms.txt` — the site, described for the thing that reads it.
 *
 * Leaf sells the argument that a catalog no machine can read is a catalog
 * that does not exist to the buyer using one. A site making that argument
 * with no machine-readable summary of itself was arguing against its own
 * shopfront. This is the shopfront.
 *
 * English only, and deliberately: llms.txt is a single document by
 * convention, and the localized pages advertise themselves through hreflang.
 * The URLs are built with the same helper the canonicals use, so a route
 * rename cannot leave a dead link here.
 *
 * Every line is a statement of fact that already appears on the site. Nothing
 * is claimed here that a visitor could not verify by reading the page it
 * points at.
 */
export const dynamic = "force-static";

const url = (route: Parameters<typeof absoluteUrl>[0]) =>
  absoluteUrl(route, routing.defaultLocale);

function body() {
  return `# ${SITE_NAME}

> ${SITE_NAME} builds small, single-purpose Shopify apps that find money hiding in the gaps between a store's systems, then do the work of closing them. Every app follows the same ladder: a free audit that grades rather than counts, changes you approve one by one, and automation the app only earns once your own approval record justifies it.

## Apps

- [${APP_NAME}](${url("/image-voice")}): alt text for Shopify stores. Free forever audit that grades existing alt text as missing / junk / weak / good, then writes a real description for every image. Live on the Shopify App Store. Plans: Audit $${PRICING.audit.toFixed(2)}, Keeper $${PRICING.keeper.toFixed(2)}/mo, Curator $${PRICING.curator.toFixed(2)}/mo.
- [${LEDGER_NAME}](${url("/ledger")}): the flagship. A purchase-order tracker kept from the documents themselves — supplier confirmations, invoices, freight and customs paperwork, and the 3PL's receiving reports — so that what was ordered, what was billed and what actually landed sit side by side for every PO, with every gap priced and dated while it can still be claimed. Writes one thing to Shopify, the true cost per unit, only after confirmation; produces a month-end close the merchant's bookkeeper can tie to the books. In development. The first ten POs are built free, by email, in about 30 minutes.
- [${BILL_CHECK_NAME}](${url("/3pl-bill-check")}): reads a 3PL invoice line by line against the merchant's rate card and against what actually happened — orders shipped, units received, stock on hand — and returns the lines that don't match, priced, aged and written in the 3PL's own vocabulary (fee code, contract rate, billed rate, order count, difference), ready to forward while the contract's claim window is still open. Reads the invoice, the contract, the orders and the 3PL's reports; writes nothing to the store. In development. The first invoice is read free, by email, the same day.
- [${RUNWAY_NAME}](${url("/runway")}): one weekly list of what is running out, measured as days of cover against each supplier's real lead time rather than a unit threshold. Sell rate is computed only over the days a product could actually be bought, so stockouts stop reading as low demand, and every line states what the order costs and how long it ties the cash up. It can only count from the day it is connected. In development; waitlist open.

One villain across the line — silence between systems. Runway: nobody told you. Bill Check: nobody caught it. Ledger: nobody counted.

## Guides and comparisons

The guide is available in all eight site languages; the comparisons are English only. Each is dated, and every figure about another app is cited to that app's own App Store listing, with the date it was checked.

- [The complete guide to alt text on Shopify](${url("/guides/shopify-alt-text")}): what alt text is for, Shopify's own rules (512-character field limit, 125 recommended, empty alt for decorative images), what good and weak descriptions read like, everywhere alt text lives in a Shopify store, and a ten-minute audit a merchant can run by hand with no app installed.
- [The best Shopify alt text apps, compared](${url("/guides/best-shopify-alt-text-apps")}): eleven Shopify alt text apps plus ${APP_NAME}, compared from their own App Store listings — rating, review count, Built for Shopify status, starting price, how each says it writes alt text (template, product data, or the image), and whether it checks existing alt text. Discloses that Leaf makes ${APP_NAME} and that the apps were not installed or tested.
- [Alternatives to AltText.ai, AltKing and Pixc](${url("/image-voice/alternatives")}): alt text app alternatives grouped by the reason for switching — per-image pricing on a large backlog, template text repeated across images, no check of existing alt text, too few languages, needing a full SEO suite, or accessibility compliance — including the cases where ${APP_NAME} is not the answer.
- [${APP_NAME} vs AltText.ai](${url("/image-voice/vs-alttext-ai")}): AltText.ai analyses images, uses product data on Shopify, writes in 130+ languages and has 141 reviews; it meters by the image. The comparison is about metering and about grading existing alt text.
- [${APP_NAME} vs AltKing](${url("/image-voice/vs-altking")}): AltKing builds alt text from variables and is free, with 199 reviews. For stores whose photography is packshots, the page says AltKing is the right choice.
- [${APP_NAME} vs Pixc](${url("/image-voice/vs-pixc")}): Pixc writes from product data or a template and scans for poorly written alt text; its top plan covers 25,000 images for $100 a month.
- [${APP_NAME} vs ALTerator](${url("/image-voice/vs-alterator")}): ALTerator scores alt text 0–100 for SEO and writes in 18 languages; ${APP_NAME} grades whether each description describes its photograph and writes in 9.
- [${APP_NAME} vs SEO HERO](${url("/image-voice/vs-seo-hero")}): SEO HERO injects SEO keywords using image context, with 171 reviews and the Built for Shopify badge.
- [${APP_NAME} vs StoreSEO](${url("/image-voice/vs-storeseo")}): StoreSEO is a full SEO suite in which alt text is one feature; the page suggests many stores could run both.
- [${APP_NAME} vs Alt Text Generator AI](${url("/image-voice/vs-alttextgenerator")}): credits that never expire, and two billing statements on its listing a buyer should confirm.

## Site

- [Home](${url("/")}): the problem all four apps address — Shopify, the 3PL, the supplier's paperwork and the spreadsheet disagreeing about the same numbers.
- [About](${url("/about")}): where Leaf comes from, what it believes, and the five commitments it asks to be held to — apps built only when they're world-class, nothing changed without approval, numbers that reconcile to Shopify's own reports, a waitlist instead of a sale when a plan doesn't fit, and building only for problems seen costing real stores real money.
- [Support](${url("/support")}): undo, billing, response times, and exactly what the apps read and write.
- [Security](${url("/security")}): the six Shopify scopes Image Voice requests and what each is for, what it can change, token encryption and store isolation, AI processing, retention, the mandatory erasure webhooks, and the records erasure does not reach yet.
- [Terms of service](${url("/terms")}): billing through Shopify, published prices, approval before changes, the 30-day undo, and the limits of what the apps promise. Draft pending legal review.
- [Privacy](${url("/privacy")}): what is accessed, what is stored, how long it is kept, and the AI processing involved.

## Elsewhere

- [${APP_NAME} on the Shopify App Store](${APP_INSTALL_URL})
- [${APP_NAME} in seventy seconds](${APP_VIDEO_WATCH_URL}): the product tour — the audit's grade, the review queue, and what an image says afterwards.

## Contact

- ${SUPPORT_EMAIL}

## Notes

- Available in English, German, Spanish, French, Italian and Brazilian Portuguese. English pages are unprefixed; other locales carry a path segment, e.g. ${SITE_URL}/de/image-voice.
- ${APP_NAME} writes only the alt field of an image. It cannot modify theme code, product content, or the images themselves, and every change it makes is reversible for 30 days.
- No app applies a change to a store without approval unless the merchant has explicitly turned on auto-pilot.
- ${LEDGER_NAME} and ${BILL_CHECK_NAME} are not yet installable. Each starts as a free audit run by Leaf on documents the merchant emails in; the findings are the merchant's to keep whether or not they continue.
`;
}

export function GET() {
  return new Response(body(), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=0, s-maxage=86400",
    },
  });
}
