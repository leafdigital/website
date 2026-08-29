---
category: Patterns
---

# WaitlistForm

The early-access capture form: an app-choice chip row, one email field, and a
first-person submit button. Takes no props — there is deliberately one instance,
in the homepage's bottom CTA section, and lab cards link to it.

- Posts to `/api/waitlist`; on success it replaces itself with a confirmation
  line rather than clearing the field.
- Choices are `Both` / `Catalog Readiness` / `AI Answer Accuracy`.
- Includes a hidden honeypot field.

Because the whole form is self-contained, design _around_ it — don't rebuild the
fields to add your own copy.
