import { OG_SIZE, renderOgImage } from "@/lib/og";
import { MIRROR } from "@/lib/constants";
import { routing } from "@/i18n/routing";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = `${MIRROR.needsAttention.toLocaleString()} of ${MIRROR.total.toLocaleString()} images need attention — scan your Shopify store free`;

/** Prerender one card per locale. Copy is still English-only — Phase 5. */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function OgImage() {
  return renderOgImage({
    title: `${MIRROR.needsAttention.toLocaleString()} of your images may be saying nothing`,
    kicker: "Alt text, actually looked at",
  });
}
