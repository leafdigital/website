import createNextIntlPlugin from "next-intl/plugin";
import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** Tier-3 documents (privacy, terms) are authored per locale as MDX. */
  pageExtensions: ["ts", "tsx", "md", "mdx"],
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
