import {
  APP_INSTALL_URL,
  APP_NAME,
  PRICING,
  SITE_NAME,
  SITE_URL,
  SUPPORT_EMAIL,
} from "./constants";
import { absoluteUrl, languageTag } from "./metadata";
import type { AppRoute } from "./routes";

/**
 * Structured data, assembled here and nowhere else.
 *
 * The site's whole argument is that machines cannot read what you do not
 * describe. It shipped with no `application/ld+json` anywhere, which made the
 * site the thing it sells against — a page a crawler has to infer rather than
 * read. These builders are the description.
 *
 * Every page emits ONE script holding a `@graph`, so the nodes can reference
 * each other by `@id` instead of repeating the publisher on each one. Text
 * comes from the same message files the visible page uses: a schema that
 * restates the page in its own words is a second copy to keep in sync, and it
 * would be the one that rots.
 *
 * Nothing here is claimed that is not true on the page. In particular there is
 * no `aggregateRating` — the App Store listing has no reviews yet, and an
 * invented one is both a manual action and a lie.
 */
export type JsonLdNode = Record<string, unknown>;

/* Stable node ids. Fragments on the site root, so the same organisation is
 * one entity across every page and locale rather than six of them. */
const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const IMAGE_VOICE_ID = `${SITE_URL}/#image-voice`;

const ref = (id: string) => ({ "@id": id });

/** The publisher. One node, referenced by everything else. */
export function organization(): JsonLdNode {
  return {
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    email: SUPPORT_EMAIL,
    logo: {
      "@type": "ImageObject",
      /* Raster, not the SVG the site renders: Google's logo guidance wants a
       * format it indexes as an image. Generated from the same source file. */
      url: `${SITE_URL}/brand/leaf-logo.png`,
      width: 956,
      height: 168,
    },
    /* The App Store listing is the only profile Leaf has. When a LinkedIn or
     * X account exists, it belongs here — `sameAs` is how a knowledge panel
     * learns that those accounts and this site are the same company. */
    sameAs: [APP_INSTALL_URL],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: SUPPORT_EMAIL,
      availableLanguage: ["en", "de", "fr", "es", "it", "pt"],
    },
  };
}

export function website(locale: string): JsonLdNode {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE_NAME,
    url: absoluteUrl("/", locale),
    inLanguage: languageTag(locale),
    publisher: ref(ORGANIZATION_ID),
  };
}

/**
 * Image Voice as a product rather than a page.
 *
 * `operatingSystem: "Shopify"` is the honest answer for an embedded app — it
 * does not run on an OS, it runs in an admin — and it is what the category's
 * other listings use.
 */
export function imageVoiceApplication({
  locale,
  description,
  planNames,
}: {
  locale: string;
  description: string;
  planNames: { audit: string; keeper: string; curator: string };
}): JsonLdNode {
  const offer = (name: string, price: number) => ({
    "@type": "Offer",
    name,
    price: price.toFixed(2),
    priceCurrency: "USD",
    url: `${absoluteUrl("/image-voice", locale)}#pricing`,
    availability: "https://schema.org/InStock",
  });

  return {
    "@type": "SoftwareApplication",
    "@id": IMAGE_VOICE_ID,
    name: APP_NAME,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "SEO & Accessibility",
    operatingSystem: "Shopify",
    url: absoluteUrl("/image-voice", locale),
    installUrl: APP_INSTALL_URL,
    description,
    inLanguage: languageTag(locale),
    publisher: ref(ORGANIZATION_ID),
    offers: [
      offer(planNames.audit, PRICING.audit),
      offer(planNames.keeper, PRICING.keeper),
      offer(planNames.curator, PRICING.curator),
    ],
  };
}

export type FaqEntry = { q: string; a: string };

/**
 * The questions already on the page, told to a machine.
 *
 * Note what this does and does not buy: Google restricted FAQ rich results to
 * government and health sites in 2023, so this will not draw an accordion in
 * the SERP. It is here because Bing still uses it and because answer engines
 * read it — which, for a company selling to AI shoppers, is the surface that
 * matters.
 */
export function faqPage(url: string, items: readonly FaqEntry[]): JsonLdNode {
  return {
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    mainEntity: items.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

/**
 * The trail from the homepage to here. The site has no visible breadcrumb
 * row, and this does not invent one — it states the hierarchy the header nav
 * already walks, which is what the markup is for.
 */
export function breadcrumbs(
  locale: string,
  trail: readonly { name: string; route: AppRoute }[],
): JsonLdNode {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map(({ name, route }, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: absoluteUrl(route, locale),
    })),
  };
}
