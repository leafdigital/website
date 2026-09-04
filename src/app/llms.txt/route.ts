import {
  APP_INSTALL_URL,
  APP_NAME,
  HIDDEN_MARGIN_NAME,
  PRICING,
  REORDER_ENGINE_NAME,
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
- [${HIDDEN_MARGIN_NAME}](${url("/hidden-margin")}): a readiness score for a Shopify catalog's missing costs, weights and HS codes, with each gap priced in dollars. In development; waitlist open.
- [${REORDER_ENGINE_NAME}](${url("/reorder-engine")}): reorder points and purchase-order automation for Shopify inventory, proven in shadow against a store's own orders before it places one. In development; waitlist open.

## Guides and comparisons

English only. Each is dated, and the comparisons cite the competitor's own App Store listing for every figure, with the date it was checked.

- [The complete guide to alt text on Shopify](${url("/guides/shopify-alt-text")}): what alt text is for, Shopify's own rules (512-character field limit, 125 recommended, empty alt for decorative images), what good and weak descriptions read like, everywhere alt text lives in a Shopify store, and a ten-minute audit a merchant can run by hand with no app installed.
- [${APP_NAME} vs AltText.ai](${url("/image-voice/vs-alttext-ai")}): AltText.ai analyses images and is well reviewed; it meters by the image and does not grade alt text that already exists. The comparison is about metering and auditing, not writing quality.
- [${APP_NAME} vs AltKing](${url("/image-voice/vs-altking")}): AltKing builds alt text from variables (product title, variant, type, tags) and is free. For stores whose photography is packshots, the page says AltKing is the right choice.

## Site

- [Home](${url("/")}): the problem all three apps address — Shopify, the 3PL and the spreadsheet disagreeing about the same numbers.
- [Support](${url("/support")}): undo, billing, response times, and exactly what the apps read and write.
- [Privacy](${url("/privacy")}): what is accessed, what is stored, how long it is kept, and the AI processing involved.

## Elsewhere

- [${APP_NAME} on the Shopify App Store](${APP_INSTALL_URL})

## Contact

- ${SUPPORT_EMAIL}

## Notes

- Available in English, German, Spanish, French, Italian and Brazilian Portuguese. English pages are unprefixed; other locales carry a path segment, e.g. ${SITE_URL}/de/image-voice.
- ${APP_NAME} writes only the alt field of an image. It cannot modify theme code, product content, or the images themselves, and every change it makes is reversible for 30 days.
- No app applies a change to a store without approval unless the merchant has explicitly turned on auto-pilot.
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
