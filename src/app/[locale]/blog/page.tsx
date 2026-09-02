import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { PillBadge } from "@/components/ui/pill-badge";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Writing on agentic commerce and machine-legible catalogs is on its way. The v1 essays return here after the domain cutover.",
};

/* Placeholder — the v1 blog posts migrate here in Milestone 2 (cutover). */
export default function BlogPage() {
  return (
    <Section className="text-center">
      <PillBadge className="mx-auto">Coming back soon</PillBadge>
      <h1 className="sm:text-h2 mt-6 text-3xl tracking-[-0.03em]">Blog</h1>
      <p className="text-muted-foreground mx-auto mt-4 max-w-xl text-lg leading-[1.65]">
        The writing on agentic commerce and machine-legible catalogs is moving
        in with the new site. It lands here shortly after the domain switches
        over.
      </p>
    </Section>
  );
}
