import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { APP_NAME, SITE_NAME, SUPPORT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: `How ${SITE_NAME} handles data across this website and the ${APP_NAME} app — what we access, what we store, how long we keep it, and the AI processing we disclose plainly.`,
};

/* DRAFT — maintainer + legal review required before publish (LF-220 AC).
 * The Badge below is the visible marker; remove it at sign-off. */
export default function PrivacyPage() {
  return (
    <Section>
      <article className="mx-auto max-w-2xl">
        <Badge variant="outline">Draft — under legal review</Badge>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight">
          Privacy policy
        </h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Last updated: August 10, 2026
        </p>

        <div className="mt-10 space-y-10 leading-relaxed">
          <section aria-labelledby="plain-version">
            <h2 id="plain-version" className="text-2xl font-bold">
              The plain version
            </h2>
            <p className="text-muted-foreground mt-3">
              We run this website and the {APP_NAME} app for Shopify. The
              website collects almost nothing. The app reads your product images
              and their alt text through Shopify’s API, sends images to an AI
              model provider to be described, and writes alt text back — with
              your approval. We never see or store your customers’ personal
              data. Everything below is that, in detail.
            </p>
          </section>

          <section aria-labelledby="website">
            <h2 id="website" className="text-2xl font-bold">
              This website
            </h2>
            <ul className="text-muted-foreground mt-3 list-disc space-y-2 pl-6">
              <li>
                <strong className="text-foreground">Analytics.</strong> We use
                Vercel Analytics, which is cookieless and collects aggregate
                page views and anonymized interaction events. No cross-site
                tracking, no advertising identifiers, nothing that names you.
              </li>
              <li>
                <strong className="text-foreground">Forms and email.</strong> If
                you email us or join a waitlist, we keep your address and
                message to answer you. We don’t sell it, share it, or add it to
                marketing lists you didn’t ask for.
              </li>
            </ul>
          </section>

          <section aria-labelledby="app">
            <h2 id="app" className="text-2xl font-bold">
              The {APP_NAME} app
            </h2>
            <h3 className="mt-4 text-lg font-bold">What we access</h3>
            <p className="text-muted-foreground mt-2">
              Through the Shopify API, with the permissions you grant at
              install: your product images, their current alt text, product
              titles, and theme image references. That is the working set — the
              app does not request access to orders, customers, or payment data.
            </p>
            <h3 className="mt-6 text-lg font-bold">
              AI processing — disclosed plainly
            </h3>
            <p className="text-muted-foreground mt-2">
              To write a description, your product images are sent to our AI
              model provider, which returns the text. Images are transmitted for
              that purpose only. No customer personal data is involved at any
              point — the model sees product photography, nothing else.
            </p>
            <h3 className="mt-6 text-lg font-bold">What we store</h3>
            <p className="text-muted-foreground mt-2">
              Scan results (coverage grades per image), proposed and applied alt
              text, and the before/after history that powers the 30-day undo. We
              store image references, not copies of your image library.
            </p>
            <h3 className="mt-6 text-lg font-bold">Retention</h3>
            <p className="text-muted-foreground mt-2">
              Change history is kept for 30 days to power restore, then pruned.
              If you uninstall, app data tied to your store is deleted in line
              with Shopify’s mandatory data-erasure webhooks — within 48 hours
              of Shopify’s request.
            </p>
          </section>

          <section aria-labelledby="rights">
            <h2 id="rights" className="text-2xl font-bold">
              Your rights and how to reach us
            </h2>
            <p className="text-muted-foreground mt-3">
              You can request an export or erasure of any data we hold about you
              or your store — GDPR and equivalent frameworks apply. Write to{" "}
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="text-foreground underline underline-offset-4"
              >
                {SUPPORT_EMAIL}
              </a>{" "}
              and we’ll respond within 30 days, usually much faster.
            </p>
          </section>
        </div>
      </article>
    </Section>
  );
}
