import { LocaleSuggestion } from "leaf-website";

/**
 * Correctly renders nothing: the bar only appears when the edge proxy has set
 * a geo hint cookie that disagrees with the active locale, and a design
 * preview has no proxy. The dashed box is this story's, not the component's.
 */
export const Default = () => (
  <div>
    <LocaleSuggestion />
    <p className="border-hairline-strong text-ink-faint text-fine rounded-lg border border-dashed px-4 py-3">
      No geo hint cookie here, so the bar is absent — which is what most
      visitors see. On the site it would sit above the header, on the green
      wash, offering the suggested language in that language.
    </p>
  </div>
);
