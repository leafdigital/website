import Link from "next/link";
import { SITE_NAME, SUPPORT_EMAIL } from "@/lib/constants";
import { Container } from "./container";

const links = [
  { href: "/privacy", label: "Privacy" },
  { href: "/support", label: "Support" },
  { href: `mailto:${SUPPORT_EMAIL}`, label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-border border-t">
      <Container className="text-muted-foreground flex flex-col items-center justify-between gap-4 py-10 text-sm sm:flex-row">
        <p>
          © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
        </p>
        <nav aria-label="Footer">
          <ul className="flex items-center gap-6">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-foreground">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </footer>
  );
}
