/**
 * Marks that the visitor picked a language *themselves* — switched, accepted
 * the suggestion, or dismissed it.
 *
 * This cannot be inferred from `NEXT_LOCALE`: next-intl writes that cookie on
 * every locale-prefixed request, so its presence says nothing about intent.
 * Using it to suppress the geo banner would hide the banner after the very
 * first page view.
 */
export const LOCALE_CHOICE_COOKIE = "LEAF_LOCALE_CHOSEN";
export const LOCALE_HINT_COOKIE = "LEAF_LOCALE_HINT";

/** Client-side: remember the choice and stop offering alternatives. */
export function rememberLocaleChoice() {
  const year = 60 * 60 * 24 * 365;
  document.cookie = `${LOCALE_CHOICE_COOKIE}=1; Max-Age=${year}; Path=/; SameSite=Lax`;
  document.cookie = `${LOCALE_HINT_COOKIE}=; Max-Age=0; Path=/`;
}
