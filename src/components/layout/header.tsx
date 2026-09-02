"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { Link, usePathname } from "@/i18n/navigation";
import type { CtaEvent } from "@/lib/analytics";
import { Container } from "./container";

/**
 * The header CTA is per-page, because the next step is per-page: from the
 * homepage it is "go look at the live app", from an app page it is the
 * action that page is arguing for. `usePathname` is locale-stripped, so the
 * lookup is one table for all six locales.
 */
const ctaByRoute = {
  "/image-voice": {
    href: "/image-voice#scan",
    key: "freeScan",
    event: "cta_scan_click",
  },
  "/hidden-margin": {
    href: "/hidden-margin#waitlist",
    key: "earlyAccess",
    event: "cta_waitlist_join",
  },
  "/reorder-engine": {
    href: "/reorder-engine#waitlist",
    key: "joinWaitlist",
    event: "cta_waitlist_join",
  },
} as const satisfies Record<
  string,
  { href: string; key: string; event: CtaEvent }
>;

/** Everywhere else — the homepage, privacy, support — points at the live app. */
const defaultCta = {
  href: "/image-voice",
  key: "freeScan",
  event: "cta_scan_click",
} as const;

export function Header() {
  const t = useTranslations("common");
  const pathname = usePathname();
  const cta = ctaByRoute[pathname as keyof typeof ctaByRoute] ?? defaultCta;

  return (
    /* `header-settle` withholds the border and shadow until the page has
     * moved a little — at rest the header sits on the hero with no seam. */
    <header className="header-settle border-hairline-soft sticky top-0 z-50 border-b bg-white/75 backdrop-blur-[24px] backdrop-saturate-[1.4]">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center">
          {/* The v1 nav logo, verbatim: mark + wordmark in one 478×84 SVG. */}
          <Image
            src="/brand/leaf-logo.svg"
            alt="Leaf digital"
            width={159}
            height={28}
            className="h-7 w-auto"
            priority
          />
        </Link>
        <nav aria-label={t("nav.label")}>
          <ul className="flex items-center gap-1.5">
            <li>
              {/* The apps grid lives on the homepage — there is no /apps index. */}
              <Link
                href="/#apps"
                className="text-muted-foreground hover:text-foreground px-3.5 py-2 text-sm font-medium transition-colors duration-150"
              >
                {t("nav.apps")}
              </Link>
            </li>
            <li className="ml-1.5">
              <Button asChild size="sm" className="shadow-cta-sm">
                <TrackedLink
                  href={cta.href}
                  event={cta.event}
                  eventProps={{ location: "header" }}
                >
                  {t(`nav.${cta.key}`)}
                </TrackedLink>
              </Button>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
}
