"use client";

import type { ComponentProps } from "react";
import { trackCta, type CtaEvent } from "@/lib/analytics";

/**
 * The off-site twin of `TrackedLink`. Leaving the site is exactly the event
 * worth counting — the App Store install — and a locale-aware `Link` cannot
 * carry an absolute URL, so this is a plain anchor with the same reporting.
 */
export function TrackedExternalLink({
  event,
  eventProps,
  onClick,
  ...props
}: ComponentProps<"a"> & {
  event: CtaEvent;
  eventProps?: Record<string, string>;
}) {
  return (
    <a
      {...props}
      onClick={(e) => {
        trackCta(event, eventProps);
        onClick?.(e);
      }}
    />
  );
}
