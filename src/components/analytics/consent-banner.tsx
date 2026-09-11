"use client";

import { useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import {
  bannerSnapshot,
  openConsentBanner,
  setConsent,
  subscribeConsent,
} from "@/lib/consent";

/**
 * The consent banner — shown only where the law asks for opt-in (see
 * `GATED_COUNTRIES`), and on demand from the footer everywhere else.
 *
 * Two buttons of identical weight — same style, same size, no green on the
 * yes. EU regulators treat a banner whose "reject" is harder to find than its
 * "accept" as no consent at all, and a brand that sells on honesty does not
 * get to make that trade either.
 *
 * Fixed to the bottom and rendered only after hydration (the server snapshot
 * is "closed"), so it never shifts the page and never ships in the static
 * HTML a crawler or Lighthouse reads.
 */
export function ConsentBanner() {
  const t = useTranslations("common.consent");
  const open = useSyncExternalStore(
    subscribeConsent,
    bannerSnapshot,
    () => false,
  );

  if (!open) return null;

  return (
    <div
      role="region"
      aria-label={t("label")}
      className="fixed inset-x-3 bottom-3 z-60 sm:inset-x-auto sm:right-5 sm:bottom-5 sm:max-w-[420px]"
    >
      <div className="border-hairline bg-card shadow-card rounded-xl border p-5">
        <p className="text-muted-foreground text-[14.5px] leading-[1.55]">
          {t("body")}{" "}
          <Link href="/privacy" className="text-brand-800 font-semibold">
            {t("policy")}
          </Link>
        </p>
        <div className="mt-4 grid grid-cols-2 gap-2.5">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setConsent("denied")}
          >
            {t("decline")}
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setConsent("granted")}
          >
            {t("accept")}
          </Button>
        </div>
      </div>
    </div>
  );
}

/** The footer's way back to the banner, in every region. */
export function PrivacyChoicesButton({ className }: { className?: string }) {
  const t = useTranslations("common.consent");
  return (
    <button type="button" onClick={openConsentBanner} className={className}>
      {t("label")}
    </button>
  );
}
