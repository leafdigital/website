import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
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
      <h1 className="text-4xl font-extrabold tracking-tight">Services</h1>
      <p className="text-muted-foreground mx-auto mt-4 max-w-xl text-lg leading-relaxed">
        Leaf takes on a small number of Shopify engineering engagements
        alongside the apps. If that sounds like what you need, email{" "}
        <a
          href={`mailto:${SUPPORT_EMAIL}`}
          className="text-foreground underline underline-offset-4"
        >
          {SUPPORT_EMAIL}
        </a>{" "}
        and tell us what you’re building.
      </p>
    </Section>
  );
}
