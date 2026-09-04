import { routing } from "@/i18n/routing";
import {
  contentOgContentType,
  contentOgImage,
  contentOgSize,
} from "@/lib/content-og";

export const size = contentOgSize;
export const contentType = contentOgContentType;
/** Next requires a static `alt` export; the card itself is English-only. */
export const alt = "Image Voice compared with AltText.ai";

/** One card per locale route, though the document is English in all of them. */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default contentOgImage("vs-alttext-ai", "Image Voice");
