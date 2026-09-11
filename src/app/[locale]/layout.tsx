import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ConsentBanner } from "@/components/analytics/consent-banner";
import { SiteAnalytics } from "@/components/analytics/site-analytics";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { LocaleSuggestion } from "@/components/layout/locale-suggestion";
import { isLocale, routing } from "@/i18n/routing";
import { languageTag, openGraphLocale } from "@/lib/metadata";
import {
  GA_ENABLED,
  GA_MEASUREMENT_ID,
  SITE_INDEXABLE,
  SITE_NAME,
  SITE_URL,
} from "@/lib/constants";
import { CONSENT_DEFAULTS_SCRIPT } from "@/lib/consent";
import { REVEAL_SCRIPT } from "@/lib/reveal-script";
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

  return {
    metadataBase: new URL(SITE_URL),
    // Belt to robots.ts's braces: pre-cutover deploys must not be indexed.
    robots: SITE_INDEXABLE ? undefined : { index: false, follow: false },
    title: {
      default: t("meta.defaultTitle"),
      template: `%s — ${SITE_NAME}`,
    },
    description: t("meta.defaultDescription"),
    /**
     * Deliberately no `alternates` here. Canonical and hreflang are per-route
     * and metadata inherits, so a block set at this level would overwrite
     * every page's URL with the layout's — see src/lib/metadata.ts. Pages
     * call `localeMetadata(route, locale)` instead.
     */
    /* `og:locale` wants language_TERRITORY — a bare `de` is dropped. */
    /**
     * Deliberately no `siteName`. `og:site_name` is one of the sources Google
     * reads for the site name it prints instead of a homepage's `<title>`
     * (see src/lib/schema.ts), so setting it undoes the WebSite removal.
     *
     * It was in fact never emitted: pages call `localeMetadata`, Next REPLACES
     * `openGraph` rather than merging it, and the layout's copy was dropped on
     * every page. Removing it makes that an intention rather than an accident
     * — restoring it means accepting "Leaf Digital" as the homepage result.
     */
    openGraph: {
      type: "website",
      locale: openGraphLocale(locale),
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
      /* The BCP-47 tag, not the URL segment: `pt-BR`, never `pt-br`. */
      lang={languageTag(locale)}
      dir="ltr"
      className={`${geist.variable} ${geistMono.variable}`}
    >
      <body className="flex min-h-screen flex-col">
        {/* First thing in <body>: it blocks parsing, so nothing paints before
         * the reveal state is decided and there is no flash of shown-then-
         * hidden content. See src/lib/reveal-script.ts. */}
        <script dangerouslySetInnerHTML={{ __html: REVEAL_SCRIPT }} />
        {/* Google's consent defaults, before gtag.js can read anything: GA
         * loads after hydration and takes whatever defaults it finds first.
         * See src/lib/consent.ts. */}
        {GA_ENABLED ? (
          <script
            dangerouslySetInnerHTML={{ __html: CONSENT_DEFAULTS_SCRIPT }}
          />
        ) : null}
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
          <ConsentBanner />
          <SiteAnalytics />
        </NextIntlClientProvider>
        <Analytics />
        {/* Loads after hydration, so it never competes with first paint.
         * GA4's enhanced measurement picks up App Router navigations from
         * History API events, so client-side route changes are counted
         * without a per-page call. */}
        {GA_ENABLED ? <GoogleAnalytics gaId={GA_MEASUREMENT_ID} /> : null}
      </body>
    </html>
  );
}
