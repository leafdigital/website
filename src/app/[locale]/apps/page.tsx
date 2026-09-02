import type { Metadata } from "next";
import { AppCard } from "@/components/app-card";
import { Section } from "@/components/layout/section";
import { apps } from "@/lib/apps";

export const metadata: Metadata = {
  title: "Apps",
  description:
    "Shopify apps that take on the jobs nobody on your team owns — images first, catalog quality and AI answers next. Each one ships under written laws.",
};

export default function AppsPage() {
  return (
    <Section>
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="sm:text-h2 text-3xl tracking-[-0.03em]">Apps</h1>
        <p className="text-muted-foreground mt-4 text-lg leading-[1.65]">
          One unowned job at a time, done properly: your images first, your
          catalog quality and AI answers next. Every app ships under written
          laws about what it will never touch.
        </p>
      </div>
      <ul className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-3">
        {apps.map((app) => (
          <li key={app.name}>
            <AppCard app={app} headingLevel="h2" />
          </li>
        ))}
      </ul>
    </Section>
  );
}
