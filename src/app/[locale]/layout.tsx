import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Analytics } from "@vercel/analytics/next";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { LocaleSuggestion } from "@/components/layout/locale-suggestion";
import { isLocale, routing } from "@/i18n/routing";
import { SITE_INDEXABLE, SITE_NAME, SITE_URL } from "@/lib/constants";
import "../globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

/* Numbers and data render in mono (v3 §type). Geist Mono is the same
 * typeface family as the sans, so the one-face rule holds. */
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
});

/** Every locale is a build-time static artifact — no SSR regression. */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "common" });

  /**
   * The proxy already sets alternate-language `Link` headers, but a good deal
   * of SEO tooling only reads the document head — so emit the tags too.
   */
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, `/${l}`]),
  );

  return {
    metadataBase: new URL(SITE_URL),
    // Belt to robots.ts's braces: pre-cutover deploys must not be indexed.
    robots: SITE_INDEXABLE ? undefined : { index: false, follow: false },
    title: {
      default: t("meta.defaultTitle"),
      template: `%s — ${SITE_NAME}`,
    },
    description: t("meta.defaultDescription"),
    alternates: {
      canonical: `/${locale}`,
      languages: { ...languages, "x-default": `/${routing.defaultLocale}` },
    },
    openGraph: {
      siteName: SITE_NAME,
      type: "website",
      url: `${SITE_URL}/${locale}`,
      locale,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  /** `[locale]` is effectively a catch-all, so unknown segments must 404. */
  if (!isLocale(locale)) notFound();

  const t = await getTranslations("common");

  return (
    <html
      lang={locale}
      dir="ltr"
      className={`${geist.variable} ${geistMono.variable}`}
    >
      <body className="flex min-h-screen flex-col">
        <NextIntlClientProvider>
          <a
            href="#main"
            className="focus:bg-primary focus:text-primary-foreground sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-100 focus:rounded-md focus:px-4 focus:py-2"
          >
            {t("skipToContent")}
          </a>
          <LocaleSuggestion />
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
