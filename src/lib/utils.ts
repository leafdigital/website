import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge only knows Tailwind's stock scales. Our type ramp adds
 * `text-hero`, `text-h2`, `text-kicker` and friends — and left unregistered,
 * merge files them under `text-color` and lets any `text-ink-faint` in the
 * same `cn()` call delete them. That failure is silent and it is a size
 * regression, not a colour one, so it is invisible in review.
 *
 * Registering them as font sizes restores the real behaviour: a size beats a
 * size, a colour beats a colour, and the two never touch each other.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: ["hero", "h2", "h2-lg", "h3", "kicker", "fine", "caption"],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
