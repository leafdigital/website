import type { MDXComponents } from "mdx/types";

/**
 * Prose styling for tier-3 documents. Long-form legal copy is authored as MDX
 * per locale (docs/i18n.md §4), so the element styles live here once rather
 * than as classes sprinkled through six translations of the same document.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: (props) => (
      <h2 className="mt-10 text-2xl tracking-[-0.02em]" {...props} />
    ),
    h3: (props) => <h3 className="text-h3 mt-6" {...props} />,
    p: (props) => <p className="text-muted-foreground mt-3" {...props} />,
    ul: (props) => (
      <ul
        className="text-muted-foreground mt-3 list-disc space-y-2 pl-6"
        {...props}
      />
    ),
    strong: (props) => <strong className="text-foreground" {...props} />,
    a: (props) => (
      <a
        className="text-foreground hover:text-primary underline underline-offset-4 transition-colors duration-150"
        {...props}
      />
    ),
    ...components,
  };
}
