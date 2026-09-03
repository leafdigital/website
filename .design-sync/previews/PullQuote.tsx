import { PullQuote } from "leaf-website";

// Both are the real beats from the app pages — each one sits between the dark
// statement band and the section that answers it.

/** The sentence the visitor has already said to themselves, in their words. */
export const Default = () => (
  <PullQuote
    title="“I’ve been meaning to clean it up someday.”"
    sub="So has everyone — and the catalog grows faster than the someday ever comes. Nobody audits 400 products field by field. The blanks pile up quietly, and every report built on them is a guess."
  />
);

/** The other flavour: the flat question the page has been circling. */
export const AsQuestion = () => (
  <PullQuote
    title="Why does nobody send the PO?"
    sub="Because a purchase order commits real money — and that takes trust no forecasting tool has earned. So we’re building trust first: it proves itself on your own orders, in shadow, before it touches anything."
  />
);
