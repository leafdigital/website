---
category: Layout
---

# LocaleSuggestion

i18n plumbing, not a design surface. A dismissible bar at the very top of the
page — above [Header](./Header.md), inside the root layout — that _offers_ the
language the visitor's country suggests. A visitor whose browser says English
but whose IP says Brazil keeps the English page and gets a prompt; Leaf never
auto-redirects on geo, because that overrides a signal the visitor set
themselves.

- **It renders `null` unless a geo hint cookie is set** (`LEAF_LOCALE_HINT`,
  written by the edge proxy) _and_ the hinted locale differs from the active
  one. That is the normal case: most visitors never see this bar.
- Its copy is shown in the **suggested** language, not the page's — a prompt
  offering Portuguese is useless written in German — and the wrapper carries
  `lang` to match, which is a real accessibility obligation, not decoration.
- Accepting and dismissing are both recorded as a choice, so it asks once.
- Takes no props. There is one instance and the layout already places it.

Its ground is the quiet green wash (`bg-accent`) with a `border-border`
hairline, which is deliberate: it must not compete with the hero it sits above.

## Why its preview card is empty

Nothing renders it in a design preview, and that is the component behaving
correctly — there is no proxy, so there is no hint cookie, so it returns `null`.
The card shows a placeholder rather than a faked banner. Nothing here needs
designing; a screen composition just needs to know the bar can appear above the
header and shift the fold down by about 40px.

```tsx
<LocaleSuggestion />
```
