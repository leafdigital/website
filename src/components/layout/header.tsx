import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { Container } from "./container";

const nav = [
  { href: "/apps", label: "Apps" },
  // Quiet door — sunset decision pending; link only, no page work this sweep.
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
];

export function Header() {
  return (
    <header className="border-border sticky top-0 z-50 border-b bg-white/85 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/"
          className="text-brand-logo flex items-center gap-2 text-lg font-bold tracking-tight"
        >
          <Image src="/brand/leaf-mark.svg" alt="" width={28} height={28} />
          Leaf <span className="font-normal">digital</span>
        </Link>
        <nav aria-label="Main">
          <ul className="flex items-center gap-1 sm:gap-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground rounded-md px-2 py-2 text-sm sm:px-3"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="ml-2">
              <TrackedLink
                href="/apps/alt-text#scan"
                event="cta_scan_click"
                eventProps={{ location: "header" }}
                className={buttonVariants({ size: "sm" })}
              >
                Free scan
              </TrackedLink>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
}
