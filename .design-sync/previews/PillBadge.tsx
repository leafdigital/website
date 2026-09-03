import { PillBadge } from "leaf-website";

// The real hero badges, from messages/en/{home,hiddenMargin,reorderEngine}.json.

/**
 * `tone="brand"` (the default) is the live app — green wash, green hairline,
 * brand-900 text. The dot is the caller's, and aria-hidden.
 */
export const Default = () => (
  <PillBadge>
    <span aria-hidden="true" className="bg-brand-600 size-1.5 rounded-full" />
    Image Voice is live on the Shopify App Store
  </PillBadge>
);

/**
 * The tone decision, side by side: green for the app you can install today,
 * neutral for the ones you cannot. In the lab is a status, not an action.
 */
export const Tones = () => (
  <div className="flex flex-col items-start gap-3">
    <PillBadge>
      <span aria-hidden="true" className="bg-brand-600 size-1.5 rounded-full" />
      Live on the Shopify App Store
    </PillBadge>
    <PillBadge tone="neutral">
      Hidden Margin · in the lab · early access open
    </PillBadge>
    <PillBadge tone="neutral">
      Reorder Engine · coming soon · waitlist open
    </PillBadge>
  </div>
);
