"use client";

import type { ComponentProps } from "react";
import { Link } from "@/i18n/navigation";
import { trackCta, type CtaEvent } from "@/lib/analytics";

type TrackedLinkProps = ComponentProps<typeof Link> & {
  event: CtaEvent;
  eventProps?: Record<string, string>;
};

/**
 * Link that reports a CTA event on click. Use for every primary CTA so the
 * click-through numbers exist from day one.
 *
 * Wraps the locale-aware `Link`, not `next/link` — a CTA must not drop the
 * visitor out of their language.
 */
export function TrackedLink({
  event,
  eventProps,
  onClick,
  ...props
}: TrackedLinkProps) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        trackCta(event, eventProps);
        onClick?.(e);
      }}
    />
  );
}
