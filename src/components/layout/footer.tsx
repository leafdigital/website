import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { PrivacyChoicesButton } from "@/components/analytics/consent-banner";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { SITE_NAME } from "@/lib/constants";
import { Container } from "./container";

const links = [
  { href: "/about", key: "about" },
  { href: "/privacy", key: "privacy" },
  { href: "/terms", key: "terms" },
  { href: "/security", key: "security" },
  { href: "/support", key: "support" },
] as const;

/**
 * The page ends a shade darker than the CTA band it follows — `surface-deep`,
 * not `surface-dark`. Everything here is 55% white: a footer that competes
 * for attention with the thing above it is a footer doing the wrong job.
 */
export function Footer() {
  const t = useTranslations("common");

  return (
    <footer className="bg-surface-deep">
      <Container className="flex flex-col items-center justify-between gap-6 border-t border-white/10 py-9 text-sm text-white/55 sm:flex-row">
        {/* Year and site name are ICU arguments — never baked into the string. */}
        <p>
          {t("footer.rights", {
            year: new Date().getFullYear(),
            siteName: SITE_NAME,
          })}
        </p>
        <div className="flex flex-col items-center gap-6 sm:flex-row">
          <nav aria-label={t("footer.label")}>
            {/* Wraps rather than pushing the row past a phone. */}
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors duration-150 hover:text-white"
                  >
                    {t(`footer.${link.key}`)}
                  </Link>
                </li>
              ))}
              <li>
                {/* A button, not a link: it reopens the consent banner in
                 * place. Present in every region — anyone can turn analytics
                 * cookies off, not only the visitors the law says must be asked. */}
                <PrivacyChoicesButton className="cursor-pointer transition-colors duration-150 hover:text-white" />
              </li>
            </ul>
          </nav>
          <LocaleSwitcher tone="dark" />
        </div>
      </Container>
    </footer>
  );
}
