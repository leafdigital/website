import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/apps", "/apps/alt-text", "/privacy", "/support"].map(
    (path) => ({
      url: `${SITE_URL}${path === "/" ? "" : path}`,
      changeFrequency: "weekly",
      priority: path === "/" ? 1 : 0.8,
    }),
  );
}
