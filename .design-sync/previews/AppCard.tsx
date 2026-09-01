import { AppCard } from "leaf-website";

// Content is the real portfolio from src/lib/apps.ts.

/** A shipped app: green Live badge and a CTA to the app page. */
export const Live = () => (
  <div className="max-w-sm">
    <AppCard
      app={{
        name: "Leaf Alt Text",
        status: "live",
        description:
          "Sees every product image the way a shopper — or a shopping agent — does, and writes the alt text your catalog is missing. Scan free, taste the quality on 25 of your own images, stay for the auto-pilot.",
        href: "/apps/alt-text",
        cta: "See the app",
      }}
    />
  </div>
);

/** A lab app: outline badge, no dates promised, CTA points at early access. */
export const Lab = () => (
  <div className="max-w-sm">
    <AppCard
      app={{
        name: "Catalog Readiness",
        status: "lab",
        description:
          "A readiness score for the agentic shelf: how legible are your products to the AI assistants your customers already ask? Attribute by attribute, with the fixes ranked.",
      }}
    />
  </div>
);

/** The portfolio strip — equal-height cards, which is what `h-full` buys. */
export const PortfolioGrid = () => (
  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    <AppCard
      app={{
        name: "Leaf Alt Text",
        status: "live",
        description:
          "Writes the alt text your catalog is missing. Scan free, stay for the auto-pilot.",
        href: "/apps/alt-text",
        cta: "See the app",
      }}
    />
    <AppCard
      app={{
        name: "Catalog Readiness",
        status: "lab",
        description:
          "A readiness score for the agentic shelf, attribute by attribute, with the fixes ranked.",
      }}
    />
    <AppCard
      app={{
        name: "AI Answer Accuracy",
        status: "lab",
        description:
          "When ChatGPT talks about your products, is it right? Catch the answers that cost you sales.",
      }}
    />
  </div>
);
