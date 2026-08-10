import { OG_SIZE, renderOgImage } from "@/lib/og";
import { MIRROR } from "@/lib/constants";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = `${MIRROR.needsAttention.toLocaleString()} of ${MIRROR.total.toLocaleString()} images need attention — scan your Shopify store free`;

export default function OgImage() {
  return renderOgImage({
    title: `${MIRROR.needsAttention.toLocaleString()} of your images may be saying nothing`,
    kicker: "Alt text, actually looked at",
  });
}
