import {
  APP_INSTALL_URL,
  APP_NAME,
  APP_VIDEO_EMBED_URL,
  APP_VIDEO_LENGTH,
  APP_VIDEO_POSTER,
  APP_VIDEO_UPLOADED,
  APP_VIDEO_WATCH_URL,
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

/**
 * Stable node ids. Fragments on the site root, so the same organisation is
 * one entity across every page and locale rather than six of them.
 *
 * There is deliberately NO `WebSite` node, and this is the one piece of
 * structured data the site removes on purpose rather than never having added.
 *
 * Google does not print a homepage's `<title>` in the result. It prints the
 * site name, and it looks for one in this order: `WebSite.name`, then
 * `og:site_name`, then the `<title>`, then the h1. A `WebSite` node was added
 * with the rest of the schema work, and the effect was immediate and
 * unwanted: a homepage carrying a deliberate 55-character title started
 * printing as the two words "Leaf Digital".
 *
 * Setting `WebSite.name` to the full line was tried first and is the wrong
 * shape of fix — Google asks for a name there, not a tagline, and is free to
 * decide a sentence is not a name. Removing the node instead leaves no
 * site-name source at all, which is what makes Google fall back to the title
 * it was given. `og:site_name` is left unset for the same reason (see the note
 * in the layout). The cost is real and accepted: no site-name line on a Slack
 * or LinkedIn card, and no site-icon treatment in the SERP.
 *
 * Re-adding either one moves the homepage back to "Leaf Digital". That is the
 * trade, not a bug.
 */
const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const IMAGE_VOICE_ID = `${SITE_URL}/#image-voice`;
const IMAGE_VOICE_VIDEO_ID = `${SITE_URL}/#image-voice-video`;

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
    video: ref(IMAGE_VOICE_VIDEO_ID),
    offers: [
      offer(planNames.audit, PRICING.audit),
      offer(planNames.keeper, PRICING.keeper),
      offer(planNames.curator, PRICING.curator),
    ],
  };
}

/**
 * The marketing video, told to a machine.
 *
 * Worth a node of its own rather than a property on the application: video is
 * one of the few rich results Google still prints for a commercial page, and
 * it needs `thumbnailUrl`, `uploadDate` and `duration` to qualify for one.
 *
 * `contentUrl` is the watch page and `embedUrl` the no-cookie player — the
 * two are different surfaces, and giving Google the watch page is what lets
 * the result link somewhere a person can actually land.
 *
 * Name and description come from the same message file the section renders,
 * so the node can never describe a video the page does not.
 */
export function imageVoiceVideo({
  locale,
  name,
  description,
}: {
  locale: string;
  name: string;
  description: string;
}): JsonLdNode {
  return {
    "@type": "VideoObject",
    "@id": IMAGE_VOICE_VIDEO_ID,
    name,
    description,
    thumbnailUrl: `${SITE_URL}${APP_VIDEO_POSTER}`,
    uploadDate: APP_VIDEO_UPLOADED,
    duration: APP_VIDEO_LENGTH,
    contentUrl: APP_VIDEO_WATCH_URL,
    embedUrl: APP_VIDEO_EMBED_URL,
    inLanguage: languageTag(locale),
    publisher: ref(ORGANIZATION_ID),
    /* Where the video is watched on this site — the section's own anchor,
     * not the bare page, so a "jump to video" result lands on the player. */
    url: `${absoluteUrl("/image-voice", locale)}#video`,
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

/**
 * A dated, sourced document — the guide and the two comparisons.
 *
 * `Article` rather than `BlogPosting`: these are reference pages that get
 * revised, not posts that get published once, and `dateModified` is the field
 * that matters for both. The date comes from the MDX `meta.updated`, which is
 * the same string the page prints at the top, so the machine-readable date and
 * the human-readable one cannot disagree.
 */
export function article({
  url,
  headline,
  description,
  updated,
  locale,
}: {
  url: string;
  headline: string;
  description: string;
  updated: string;
  locale: string;
}): JsonLdNode {
  return {
    "@type": "Article",
    "@id": `${url}#article`,
    headline,
    description,
    url,
    dateModified: updated,
    inLanguage: languageTag(locale),
    author: ref(ORGANIZATION_ID),
    publisher: ref(ORGANIZATION_ID),
  };
}

/**
 * The /about page, as a page ABOUT the organisation rather than a second
 * description of it. `about` and `mainEntity` both point at the one
 * `Organization` node by id — the page adds no facts of its own to the
 * entity, it just says which entity it is the page for. That is what lets
 * the name, logo, contact point and App Store `sameAs` stay stated once.
 *
 * No `isPartOf` a `WebSite`: there is deliberately no `WebSite` node — see
 * the note on the ids above.
 */
export function aboutPage({
  url,
  name,
  description,
  locale,
}: {
  url: string;
  name: string;
  description: string;
  locale: string;
}): JsonLdNode {
  return {
    "@type": "AboutPage",
    "@id": `${url}#about`,
    url,
    name,
    description,
    inLanguage: languageTag(locale),
    about: ref(ORGANIZATION_ID),
    mainEntity: ref(ORGANIZATION_ID),
    publisher: ref(ORGANIZATION_ID),
  };
}
