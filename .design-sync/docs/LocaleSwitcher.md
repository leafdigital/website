---
category: Layout
---

# LocaleSwitcher

i18n plumbing, not a design surface. A native `<select>` of the six shipped
locales, each named in its own language (English, Español, Português (BR),
Deutsch, Français, Italiano) — someone looking for Portuguese scans for
"Português", not for the word "Portuguese" set in a language they cannot read.

- It renders in exactly one place: the [Footer](./Footer.md), as
  `tone="dark"`. `tone="light"` exists for a light bar and is currently unused.
- Changing the value replaces the current path in the chosen locale and writes
  the language choice to a cookie, so the switch keeps the page you were on and
  outlives the session.
- The visible label is `sr-only` by design — the footer has no room for a
  "Language" caption, and the select's own value states the current language.

Leave it alone when composing. It is a native control on purpose: the OS menu
handles six long endonyms and six writing systems better than a custom popover,
and the options need ink text because they inherit the OS ground rather than the
footer's. If a screen needs a language control, place this one; do not rebuild
it as a dropdown.

```tsx
<LocaleSwitcher tone="dark" />
```
