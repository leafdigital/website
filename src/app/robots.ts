import type { MetadataRoute } from "next";
import { SITE_INDEXABLE, SITE_URL } from "@/lib/constants";

/**
 * Indexing is off until the domain cutover — the live v1 site owns
 * leafdigital.co until then, and this deploy must not compete with it.
 * Cutover checklist: set NEXT_PUBLIC_SITE_INDEXABLE=true on the Vercel
 * project (see README).
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: SITE_INDEXABLE
      ? { userAgent: "*", allow: "/" }
      : { userAgent: "*", disallow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
