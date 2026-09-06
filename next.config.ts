import createNextIntlPlugin from "next-intl/plugin";
import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** Tier-3 documents (privacy, terms) are authored per locale as MDX. */
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  /**
   * The v3 product line retired two routes, and both had been advertised —
   * in the sitemap, in llms.txt, and from every page's cross-links. A 301
   * carries whatever equity they earned to the page that replaced them
   * instead of spending it on a 404.
   *
   * `/reorder-engine` has a real successor: same app, new name. `/hidden-
   * margin` has none — the app was killed, not renamed — so it lands on the
   * suite index rather than being passed off as one of the survivors.
   *
   * Two rules per route, not one with an optional segment: an unmatched
   * optional param leaves a `//` in the destination. The prefixed rule keeps
   * a German visitor on `/de/…` rather than dropping them into English; the
   * bare rule covers the unprefixed default locale.
   */
  async redirects() {
    return [
      {
        source: "/:locale(de|es|fr|it|pt-br)/reorder-engine",
        destination: "/:locale/reorder-loop",
        permanent: true,
      },
      {
        source: "/reorder-engine",
        destination: "/reorder-loop",
        permanent: true,
      },
      {
        source: "/:locale(de|es|fr|it|pt-br)/hidden-margin",
        destination: "/:locale#apps",
        permanent: true,
      },
      { source: "/hidden-margin", destination: "/#apps", permanent: true },
    ];
  },
};

/**
 * GFM, for one feature: tables. The content layer argues in them — a
 * comparison page that lists a competitor's plans as prose is a page nobody
 * finishes reading — and MDX does not parse tables without this.
 *
 * Named as a string rather than imported: Turbopack serialises loader options
 * to pass them across workers, and an imported plugin function cannot be
 * serialised. It resolves the name itself.
 */
const withMDX = createMDX({ options: { remarkPlugins: [["remark-gfm", {}]] } });
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

export default withNextIntl(withMDX(nextConfig));
