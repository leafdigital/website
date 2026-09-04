import { OG_SIZE, renderOgImage } from "./og";

/**
 * Share cards for the content layer.
 *
 * `opengraph-image` is a per-segment file convention, not an inherited one:
 * a card defined at `[locale]` does not reach `[locale]/guides/…`, and a page
 * with no card of its own ships a small `summary` Twitter card instead of a
 * large one. That is how /support shipped before it was noticed, and these
 * three pages are the ones most likely to be pasted into a Slack channel by
 * somebody comparing apps — a bare link is the wrong thing to arrive.
 *
 * The headline comes from the document's own `meta.title`, so the card and
 * the page cannot drift apart. English only, like the documents themselves.
 */
export function contentOgImage(doc: string, kicker: string) {
  return async function OgImage() {
    const { meta } = (await import(`../../content/en/${doc}.mdx`)) as {
      meta: { title: string };
    };
    return renderOgImage({ kicker, title: meta.title });
  };
}

export const contentOgSize = OG_SIZE;
export const contentOgContentType = "image/png";
