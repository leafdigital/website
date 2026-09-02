import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { SUPPORT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Leaf takes on a small number of Shopify engineering engagements. Email us and tell us what you're building.",
};

/* Quiet door — the services sunset decision is pending; this stub exists so
 * the nav link resolves. No manifesto, no packages. */
export default function ServicesPage() {
  return (
    <Section className="text-center">
      <h1 className="sm:text-h2 text-3xl tracking-[-0.03em]">Services</h1>
      <p className="text-muted-foreground mx-auto mt-4 max-w-xl text-lg leading-[1.65]">
        Leaf takes on a small number of Shopify engineering engagements
        alongside the apps. If that sounds like what you need, email{" "}
        <TrackedLink
          href={`mailto:${SUPPORT_EMAIL}`}
          event="cta_contact_click"
          eventProps={{ location: "services" }}
          className="text-foreground hover:text-primary underline underline-offset-4 transition-colors duration-150"
        >
          {SUPPORT_EMAIL}
        </TrackedLink>{" "}
        and tell us what you’re building.
      </p>
    </Section>
  );
}
