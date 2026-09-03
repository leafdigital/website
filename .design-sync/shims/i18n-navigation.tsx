/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * design-sync shim for `@/i18n/navigation`.
 *
 * The real module is `createNavigation(routing)` from next-intl, which drags
 * the Next router and its `process.env` reads into the bundle. In a design
 * preview there is no router and no locale segment to preserve, so a `Link`
 * is just an anchor — the same trade the `next/link` shim already makes.
 *
 * `locale` is destructured off deliberately: forwarding it would put a
 * `locale="de"` attribute on the rendered anchor.
 */
import * as React from "react";

export function Link({
  href,
  locale,
  ...props
}: React.ComponentProps<"a"> & { href?: string; locale?: string }) {
  return <a href={typeof href === "string" ? href : "#"} {...props} />;
}

/** Previews render one page, so the path is the site root. */
export const usePathname = () => "/";

export const useRouter = () => ({
  push: () => {},
  replace: () => {},
  back: () => {},
  forward: () => {},
  refresh: () => {},
  prefetch: () => {},
});

export const getPathname = ({ href }: { href: string; locale?: string }) =>
  href;

export const redirect = (href: string) => href;
export const permanentRedirect = (href: string) => href;
