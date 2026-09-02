import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { SITE_NAME, SUPPORT_EMAIL } from "@/lib/constants";
import { Container } from "./container";

const links = [
  { href: "/privacy", key: "privacy" },
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
        <div className="flex items-center gap-6">
          <nav aria-label={t("footer.label")}>
            <ul className="flex items-center gap-6">
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
                {/* External scheme — plain anchor, nothing to localize. */}
                <a
                  href={`mailto:${SUPPORT_EMAIL}`}
                  className="transition-colors duration-150 hover:text-white"
                >
                  {t("footer.contact")}
                </a>
              </li>
            </ul>
          </nav>
          <LocaleSwitcher tone="dark" />
        </div>
      </Container>
    </footer>
  );
}
