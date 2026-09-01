import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/**
 * Locale-aware navigation. `<Link href="/apps">` on a `/de` page resolves to
 * `/de/apps` — visitors never fall out of their language mid-journey.
 *
 * These are the ONLY navigation primitives the app may use: `next/link` and
 * the navigation exports of `next/navigation` are banned by eslint everywhere
 * outside this directory (docs/i18n.md §3).
 *
 * Pass an explicit `locale` prop only to cross locales on purpose — that is
 * the language switcher, and nothing else.
 */
export const {
  Link,
  redirect,
  permanentRedirect,
  usePathname,
  useRouter,
  getPathname,
} = createNavigation(routing);
