import { AppCard } from "leaf-website";

// The real suite, verbatim from messages/en/home.json → `suite`.

/** The live app. `featured` is the green treatment — one card per grid gets it. */
export const Featured = () => (
  <div className="max-w-sm">
    <AppCard
      featured
      app={{
        name: "Image Voice",
        status: "live",
        statusLabel: "LIVE",
        description:
          "Your images are silent — to Google, to AI shoppers, to screen readers. Free scan, a real description for every image.",
        href: "/image-voice",
        cta: "See the app →",
      }}
    />
  </div>
);

/** A lab app: neutral pill, hairline border, ink lift. No dates promised. */
export const Lab = () => (
  <div className="max-w-sm">
    <AppCard
      app={{
        name: "Hidden Margin",
        status: "lab",
        statusLabel: "IN THE LAB",
        description:
          "Hidden margins kill businesses. Your catalog has holes — missing costs, HS codes, countries of origin. One readiness score, gaps priced in dollars.",
        href: "/hidden-margin",
        cta: "Join the waitlist →",
      }}
    />
  </div>
);

/**
 * The homepage grid: one featured card, two lab cards, each cell a flex `li`
 * so the three cards match height.
 */
export const SuiteGrid = () => (
  <ul className="grid gap-[18px] md:grid-cols-3">
    <li className="flex">
      <AppCard
        featured
        app={{
          name: "Image Voice",
          status: "live",
          statusLabel: "LIVE",
          description:
            "Your images are silent — to Google, to AI shoppers, to screen readers. Free scan, a real description for every image.",
          href: "/image-voice",
          cta: "See the app →",
        }}
      />
    </li>
    <li className="flex">
      <AppCard
        app={{
          name: "Hidden Margin",
          status: "lab",
          statusLabel: "IN THE LAB",
          description:
            "Hidden margins kill businesses. Your catalog has holes — missing costs, HS codes, countries of origin. One readiness score, gaps priced in dollars.",
          href: "/hidden-margin",
          cta: "Join the waitlist →",
        }}
      />
    </li>
    <li className="flex">
      <AppCard
        app={{
          name: "Reorder Engine",
          status: "lab",
          statusLabel: "IN THE LAB",
          description:
            "Nine apps forecast your inventory. Not one sends the PO. We’re building the missing last mile — proven in shadow first.",
          href: "/reorder-engine",
          cta: "Join the waitlist →",
        }}
      />
    </li>
  </ul>
);
