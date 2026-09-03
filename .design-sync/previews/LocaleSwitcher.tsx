import { LocaleSwitcher } from "leaf-website";

/**
 * `tone="dark"` on the deepest ground — the footer, which is the only place
 * this renders on the site. Six locales, each named in its own language.
 */
export const Default = () => (
  <div className="bg-surface-deep px-6 py-5">
    <LocaleSwitcher tone="dark" />
  </div>
);

/** `tone="light"` for a light bar. Unused today, but the tone exists. */
export const Light = () => <LocaleSwitcher />;
