import { OG_SIZE, renderOgImage } from "@/lib/og";
import { routing } from "@/i18n/routing";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt =
  "Leaf Digital — the work your store needs done, handled correctly";

/** Prerender one card per locale. Copy is still English-only — Phase 5. */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function OgImage() {
  return renderOgImage({
    title: "The work your store needs done — handled, correctly.",
  });
}
