import { getTranslations } from "next-intl/server";
import { OG_SIZE, renderOgImage } from "@/lib/og";
import { routing } from "@/i18n/routing";
import { SITE_NAME } from "@/lib/constants";

export const size = OG_SIZE;
export const contentType = "image/png";
/**
 * Next requires `alt` to be a static export, so it stays English while the
 * card itself is localized. It is the fallback description on the social
 * card, not the card's visible copy.
 */
export const alt = `${SITE_NAME} — support`;

/** One card per locale, prerendered. */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function OgImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  /* Route handlers cannot read next/root-params yet, so pass it through. */
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "og" });
  return renderOgImage({
    kicker: t("support.kicker"),
    title: t("support.title"),
  });
}
