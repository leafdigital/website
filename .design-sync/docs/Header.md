---
category: Layout
---

# Header

The site's sticky top bar: logo, main nav, and the "Free scan" CTA. Renders the
whole bar including its own Container — drop it in at the top of a page, it
takes no props.

The nav links and the CTA are fixed in the component. To design a different
navigation, compose your own bar from `Container` + `Button`/`TrackedLink`
rather than trying to configure this one.
