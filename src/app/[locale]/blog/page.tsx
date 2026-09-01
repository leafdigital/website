import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Writing on agentic commerce and machine-legible catalogs is on its way. The v1 essays return here after the domain cutover.",
};

/* Placeholder — the v1 blog posts migrate here in Milestone 2 (cutover). */
export default function BlogPage() {
  return (
    <Section className="text-center">
      <Badge variant="outline">Coming back soon</Badge>
      <h1 className="mt-4 text-4xl font-extrabold tracking-tight">Blog</h1>
      <p className="text-muted-foreground mx-auto mt-4 max-w-xl text-lg leading-relaxed">
        The writing on agentic commerce and machine-legible catalogs is moving
        in with the new site. It lands here shortly after the domain switches
        over.
      </p>
    </Section>
  );
}
