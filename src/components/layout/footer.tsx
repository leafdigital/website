import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { SITE_NAME, SUPPORT_EMAIL } from "@/lib/constants";
import { Container } from "./container";

const links = [
  { href: "/privacy", key: "privacy" },
  { href: "/support", key: "support" },
] as const;

export function Footer() {
  const t = useTranslations("common");

  return (
    <footer className="border-border border-t">
      <Container className="text-muted-foreground flex flex-col items-center justify-between gap-4 py-10 text-sm sm:flex-row">
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
                  <Link href={link.href} className="hover:text-foreground">
                    {t(`footer.${link.key}`)}
                  </Link>
                </li>
              ))}
              <li>
                {/* External scheme — plain anchor, nothing to localize. */}
                <a
                  href={`mailto:${SUPPORT_EMAIL}`}
                  className="hover:text-foreground"
                >
                  {t("footer.contact")}
                </a>
              </li>
            </ul>
          </nav>
          <LocaleSwitcher />
        </div>
      </Container>
    </footer>
  );
}
