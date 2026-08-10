"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { trackCta, type CtaEvent } from "@/lib/analytics";

type TrackedLinkProps = ComponentProps<typeof Link> & {
  event: CtaEvent;
  eventProps?: Record<string, string>;
};

/**
 * Link that reports a CTA event on click. Use for every primary CTA so the
 * click-through numbers exist from day one.
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
