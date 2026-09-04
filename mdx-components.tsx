import type { MDXComponents } from "mdx/types";

/**
 * Prose styling for tier-3 documents. Long-form copy is authored as MDX per
 * locale (docs/i18n.md §4), so the element styles live here once rather than
 * as classes sprinkled through six translations of the same document.
 *
 * The set grew with the content layer: the privacy policy only ever needed
 * headings, paragraphs, lists and links, but a comparison page argues in
 * tables, quotes merchants, and shows alt text as code. Those three are the
 * argument, not decoration — a specimen of real alt text set in body copy
 * reads as a claim about it rather than the thing itself.
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
    ol: (props) => (
      <ol
        className="text-muted-foreground mt-3 list-decimal space-y-2 pl-6"
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
    /* A quoted merchant is evidence, so it is set apart from our own voice
     * rather than blended into it. */
    blockquote: (props) => (
      <blockquote
        className="border-primary/40 text-muted-foreground mt-5 border-l-2 pl-5 italic"
        {...props}
      />
    ),
    /* Alt text specimens. Mono, wrapping — these are sentences that happen to
     * live in an attribute, not code to be copied, so they must not scroll
     * sideways on a phone. */
    pre: (props) => (
      <pre
        /* The nested <code> resets its own chip styling — MDX maps inline
         * code and fenced blocks to the same element, and a block that keeps
         * the inline background paints a box inside a box. */
        className="border-hairline bg-surface-muted text-foreground mt-5 overflow-x-auto rounded-lg border px-5 py-4 font-mono text-[13px] leading-[1.6] whitespace-pre-wrap [&>code]:bg-transparent [&>code]:p-0 [&>code]:text-[inherit]"
        {...props}
      />
    ),
    code: (props) => (
      <code
        className="bg-surface-muted rounded px-1.5 py-0.5 font-mono text-[0.9em]"
        {...props}
      />
    ),
    /* Wide tables scroll inside their own container; the page never does. */
    table: (props) => (
      <div className="border-hairline mt-6 overflow-x-auto rounded-lg border">
        <table
          className="w-full border-collapse text-left text-[15px]"
          {...props}
        />
      </div>
    ),
    th: (props) => (
      <th
        className="border-hairline text-foreground border-b px-4 py-3 font-semibold"
        {...props}
      />
    ),
    td: (props) => (
      <td
        className="border-hairline-soft text-muted-foreground border-b px-4 py-3 align-top"
        {...props}
      />
    ),
    ...components,
  };
}
