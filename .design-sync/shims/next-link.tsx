// Stands in for `next/link` when the components are bundled for Claude Design.
// There is no Next router in a design context, and pulling the real module in
// drags the Next client runtime (and its bare `process.env` reads) into the
// bundle, which throws before anything mounts.
// Only the delegation target changes — every component's own markup, classes
// and props are untouched.
/* eslint-disable @typescript-eslint/no-unused-vars -- the Next-only props are
   destructured precisely so they are NOT forwarded to the DOM element. */
import * as React from "react";

type LinkProps = Omit<React.ComponentPropsWithoutRef<"a">, "href"> & {
  href: string | { pathname?: string };
  replace?: boolean;
  scroll?: boolean;
  shallow?: boolean;
  prefetch?: boolean | null;
  locale?: string | false;
  legacyBehavior?: boolean;
};

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { href, replace, scroll, shallow, prefetch, locale, legacyBehavior, ...rest },
  ref,
) {
  const url = typeof href === "string" ? href : (href?.pathname ?? "#");
  return <a ref={ref} href={url} {...rest} />;
});

export default Link;
