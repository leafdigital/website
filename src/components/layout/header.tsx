import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { Link } from "@/i18n/navigation";
import { Container } from "./container";

/**
 * Hrefs are locale-relative: `Link` resolves `/apps` against the active locale,
 * so a visitor on `/de` stays on `/de`.
 */
const nav = [
  { href: "/apps", key: "apps" },
  // Quiet door — sunset decision pending; link only, no page work this sweep.
  { href: "/services", key: "services" },
  { href: "/blog", key: "blog" },
] as const;

export function Header() {
  const t = useTranslations("common");

  return (
    <header className="border-border sticky top-0 z-50 border-b bg-white/85 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center">
          {/* The v1 nav logo, verbatim: mark + wordmark in one 478×84 SVG. */}
          <Image
            src="/brand/leaf-logo.svg"
            alt="Leaf digital"
            width={182}
            height={32}
            className="h-8 w-auto"
            priority
          />
        </Link>
        <nav aria-label={t("nav.label")}>
          <ul className="flex items-center gap-1 sm:gap-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground rounded-lg px-2 py-2 text-sm font-medium transition-colors duration-150 sm:px-3"
                >
                  {t(`nav.${item.key}`)}
                </Link>
              </li>
            ))}
            <li className="ml-2">
              <Button asChild size="sm">
                <TrackedLink
                  href="/apps/alt-text#scan"
                  event="cta_scan_click"
                  eventProps={{ location: "header" }}
                >
                  {t("nav.scan")}
                </TrackedLink>
              </Button>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
}
