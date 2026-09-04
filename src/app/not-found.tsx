import Image from "next/image";
import { Geist } from "next/font/google";
import common from "../../messages/en/common.json";
import { SITE_NAME } from "@/lib/constants";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

/**
 * The global 404, for a URL whose first segment is not a locale at all —
 * `/nonsense`, or any path the proxy lets through to a segment that then fails
 * `isLocale`. Because `[locale]/layout.tsx` is this app's root layout and it
 * is the thing that rejected the URL, Next cannot render a not-found *inside*
 * it: there is no html or body element at that point. So this file supplies
 * its own, and it is the one page on the site with no header and no footer.
 *
 * The copy is imported from the English message file rather than typed here,
 * so the two 404s cannot drift apart. It cannot use `useTranslations` — there
 * is no locale to translate into, which is the whole reason this page exists —
 * and a visitor who has landed on a URL with no valid locale segment has given
 * us nothing to guess from anyway.
 */
export const metadata = {
  title: `${common.notFound.title} — ${SITE_NAME}`,
};

export default function GlobalNotFound() {
  const t = common.notFound;

  return (
    <html lang="en" dir="ltr" className={geist.variable}>
      <body className="flex min-h-screen flex-col">
        <main className="flex flex-1 items-center justify-center px-6 py-20">
          <div className="relative isolate flex max-w-[620px] flex-col items-center gap-6 text-center">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-[-20%] left-1/2 -z-10 h-[520px] w-[820px] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(67,160,71,0.08),transparent_70%)] blur-[40px]"
            />
            <Image
              src="/brand/leaf-logo.svg"
              alt={SITE_NAME}
              width={132}
              height={23}
              priority
            />
            <p className="text-ink-faint mt-4 font-mono text-[13px] tracking-[0.08em]">
              {"404"}
            </p>
            <h1 className="text-4xl tracking-[-0.04em] sm:text-6xl">
              {t.title}
            </h1>
            <p className="text-muted-foreground text-lg leading-[1.6] text-balance">
              {t.sub}
            </p>
            {/* A plain anchor, deliberately, and the Next rule that wants a
             * <Link/> here is wrong about this one case. This page sits
             * outside the locale tree, so there is no active locale for the
             * localized Link to resolve against — and `next/link` is banned
             * project-wide for exactly that reason. A full document load to
             * `/` re-runs language negotiation in the proxy, which is the
             * correct landing for a visitor we have no locale for. */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a
              href="/"
              className="bg-primary text-primary-foreground mt-2 inline-flex h-[52px] items-center rounded-lg px-6 text-[15px] font-semibold transition-opacity duration-150 hover:opacity-90"
            >
              {t.home}
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
