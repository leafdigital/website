import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { Faq } from "@/components/faq";
import { buttonVariants } from "@/components/ui/button";
import { APP_NAME, SUPPORT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Support",
  description: `Get help with ${APP_NAME} and every Leaf app: email support, undo and billing answers, and exactly what our apps do and don't touch.`,
};

const faq = [
  {
    q: "How do I undo something the app wrote?",
    a: "Every applied alt text keeps its before and after for 30 days. Open the app, find the image (or the change in your digest), and hit restore — one click, no support ticket needed. If anything resists undoing, email us and we'll fix it personally.",
  },
  {
    q: "How does billing work?",
    a: "Billing runs through Shopify — flat monthly prices with usage caps, no metered surprises. Paid tiers carry a 14-day trial. Cancel from the Shopify admin at any time; everything already written stays in your store.",
  },
  {
    q: "What do Leaf apps touch in my store?",
    a: `${APP_NAME} reads your product and theme images and writes one thing: the alt field. No theme code, no product content, no images. Nothing is written without your approval unless you've turned auto-pilot on — and that is reversible per source.`,
  },
  {
    q: "How fast do you answer?",
    a: "Within one business day, usually much faster. You'll get an answer from the person who built the app — there is no tier-one script between you and a fix.",
  },
];

export default function SupportPage() {
  return (
    <Section>
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-extrabold tracking-tight">Support</h1>
        <p className="text-muted-foreground mt-4 text-lg leading-relaxed">
          Stuck, curious, or something looks wrong? Email is the fastest path —
          it lands with the engineer who built the app.
        </p>
        <div className="mt-8">
          <TrackedLink
            href={`mailto:${SUPPORT_EMAIL}`}
            event="cta_contact_click"
            eventProps={{ location: "support" }}
            className={buttonVariants({ size: "lg" })}
          >
            {SUPPORT_EMAIL}
          </TrackedLink>
        </div>
      </div>
      <div className="mx-auto mt-16 max-w-2xl">
        <h2 className="text-2xl font-bold tracking-tight">
          Frequent questions
        </h2>
        <Faq items={faq} className="mt-6" />
      </div>
    </Section>
  );
}
