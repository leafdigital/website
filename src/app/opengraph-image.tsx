import { OG_SIZE, renderOgImage } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt =
  "Leaf Digital — Shopify apps that make your store legible to AI";

export default function OgImage() {
  return renderOgImage({
    title: "Shopify apps that make your store legible to AI",
  });
}
