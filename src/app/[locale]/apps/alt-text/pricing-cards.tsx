"use client";

import { useEffect, useRef } from "react";
import { trackCta } from "@/lib/analytics";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { APP_INSTALL_URL } from "@/lib/constants";

/* Prices are load-bearing copy from the product blueprint (in-category
 * strategy A: $9.99 / $24.99, Scale $59). */
const tiers = [
  {
    name: "Free",
    price: "$0",
    tagline: "Forever",
    features: [
      "Full coverage scan, graded — missing, weak, good",
      "The gap report: your number, always current",
      "25 real fixes, lifetime — the taste test",
    ],
    cta: "Scan my store free",
  },
  {
    name: "Starter",
    price: "$9.99",
    tagline: "per month",
    features: [
      "Up to 500 images handled monthly",
      "Product images, review mode or auto-pilot",
      "Every write reversible for 30 days",
    ],
    cta: "Start with Starter",
    featured: true,
  },
  {
    name: "Growth",
    price: "$24.99",
    tagline: "per month",
    features: [
      "Up to 2,500 images handled monthly",
      "Everything in Starter, plus theme images",
      "Weekly digest: handled, coverage, needs-your-eyes",
    ],
    cta: "Grow with Growth",
  },
];

/**
 * Pricing section is a client component so viewing it can be counted — the
 * cta_pricing_view event fires once when the cards scroll into view.
 */
export function PricingCards() {
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          trackCta("cta_pricing_view", { page: "alt-text" });
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <ul ref={ref} className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-3">
      {tiers.map((tier) => (
        <li key={tier.name}>
          <Card
            className={
              tier.featured ? "border-brand-600 h-full border-2" : "h-full"
            }
          >
            <CardContent className="flex h-full flex-col pt-6">
              <div className="flex items-center justify-between">
                <h3 className="font-bold">{tier.name}</h3>
                {tier.featured ? <Badge>Most popular</Badge> : null}
              </div>
              <p className="mt-4 text-4xl font-extrabold tracking-tight">
                {tier.price}
                <span className="text-muted-foreground ml-1 text-sm font-normal">
                  {tier.tagline}
                </span>
              </p>
              <ul className="text-muted-foreground mt-6 flex-1 space-y-2 text-sm leading-relaxed">
                {tier.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <div className="mt-8">
                <TrackedLink
                  href={APP_INSTALL_URL}
                  event="cta_install_click"
                  eventProps={{ location: "pricing", tier: tier.name }}
                  className={buttonVariants({
                    variant: tier.featured ? "default" : "outline",
                    className: "w-full",
                  })}
                >
                  {tier.cta}
                </TrackedLink>
              </div>
            </CardContent>
          </Card>
        </li>
      ))}
    </ul>
  );
}
