import type { Metadata } from "next";
import { AppCard } from "@/components/app-card";
import { Section } from "@/components/layout/section";
import { apps } from "@/lib/apps";

export const metadata: Metadata = {
  title: "Apps",
  description:
    "The Leaf app suite for Shopify: make your catalog legible to the machines that are becoming the shoppers — images first, attributes next, answers after that.",
};

export default function AppsPage() {
  return (
    <Section>
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-balance">
          Apps
        </h1>
        <p className="text-muted-foreground mt-4 text-lg leading-relaxed">
          One narrative, app by app: make your catalog legible to machines —
          images first, attributes next, answers after that.
        </p>
      </div>
      <ul className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-3">
        {apps.map((app) => (
          <li key={app.name}>
            <AppCard app={app} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
