import createNextIntlPlugin from "next-intl/plugin";
import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** Tier-3 documents (privacy, terms) are authored per locale as MDX. */
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  /**
   * Routes the product line retired. Each one had been advertised — in the
   * sitemap, in llms.txt, from every page's cross-links — so each 301s to
   * the page that replaced it instead of spending what it earned on a 404.
   *
   * `/reorder-engine` and `/lost-sales` have real successors: same app, new
   * name. `/hidden-margin` has none — the app was killed, not renamed — so it
   * goes to the homepage rather than being passed off as a survivor.
   *
   * 301, not Next's default 308 for `permanent`. Both are permanent to
   * Google; 301 is the one every crawler, audit tool and old HTTP client
   * reads the same way, and it is what the SEO audit checks for.
   *
   * Three rules per route, all one hop:
   *   bare    — the unprefixed default locale
   *   /en/…   — without this the proxy strips `/en` first and the visitor
   *             takes two redirects to arrive
   *   /xx/…   — every other locale keeps its segment. Not an optional
   *             segment on one rule: an unmatched optional param leaves a
   *             `//` in the destination.
   */
  async redirects() {
    const retired = [
      { from: "/reorder-engine", to: "/reorder-loop" },
      { from: "/lost-sales", to: "/runway" },
      { from: "/hidden-margin", to: "/" },
    ];
    return retired.flatMap(({ from, to }) => [
      { source: from, destination: to, statusCode: 301 as const },
      { source: `/en${from}`, destination: to, statusCode: 301 as const },
      {
        source: `/:locale(de|es|fr|it|pt-br)${from}`,
        destination: to === "/" ? "/:locale" : `/:locale${to}`,
        statusCode: 301 as const,
      },
    ]);
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
