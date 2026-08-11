import { OG_SIZE, renderOgImage } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt =
  "Leaf Digital — the work your store needs done, handled correctly";

export default function OgImage() {
  return renderOgImage({
    title: "The work your store needs done — handled, correctly.",
  });
}
