import { getTranslations } from "next-intl/server";
import { OG_SIZE, renderOgImage } from "@/lib/og";
import { routing } from "@/i18n/routing";
import { MIRROR } from "@/lib/constants";

export const size = OG_SIZE;
export const contentType = "image/png";
/** Static by Next's contract — see the note in the root OG route. */
export const alt = `${MIRROR.needsAttention} of ${MIRROR.total} images need attention — scan your Shopify store free`;

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
    /**
     * MIRROR passes as a raw integer: en renders "1,847", de "1.847",
     * fr "1 847". The separator is never written into a translated string.
     */
    title: t("altText.title", { needsAttention: MIRROR.needsAttention }),
    kicker: t("altText.kicker"),
  });
}
