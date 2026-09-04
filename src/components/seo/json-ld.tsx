import type { JsonLdNode } from "@/lib/schema";

/**
 * One `application/ld+json` block per page, holding a `@graph`.
 *
 * Rendered into the body rather than the head: Next's Metadata API has no
 * slot for structured data, and JSON-LD is valid anywhere in the document —
 * Google reads it from either.
 */
export function JsonLd({ graph }: { graph: JsonLdNode[] }) {
  const json = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": graph,
  })
    /* Every `<` escaped, so a "</script>" appearing inside translated copy
     * cannot close this block early. JSON.stringify will not do it for us,
     * and the strings here are FAQ answers written by people. */
    .replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
