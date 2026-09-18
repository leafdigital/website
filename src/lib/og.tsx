import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

/**
 * Satori ships a Latin-only default face, so Japanese and Korean cards render
 * as boxes. For those, fetch a Noto subset holding exactly the glyphs on the
 * card — a few KB rather than the multi-MB full font — at build time, when
 * the cards prerender. Hangul decides Korean; any other CJK is Japanese.
 */
const HANGUL = /[\u1100-\u11ff\u3130-\u318f\uac00-\ud7af]/;
const CJK = /[\u3040-\u30ff\u3400-\u9fff\uff00-\uffef]/;

/**
 * The build depends on Google Fonts being reachable, so ride out a blip —
 * then fail the build rather than ship a card full of boxes.
 */
async function fetchWithRetry(url: string, attempts = 4): Promise<Response> {
  for (let i = 1; ; i++) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(10_000) });
      if (res.ok) return res;
      throw new Error(`HTTP ${res.status}`);
    } catch (error) {
      if (i >= attempts) {
        throw new Error(`OG font fetch failed after ${i} tries: ${url}`, {
          cause: error,
        });
      }
      await new Promise((r) => setTimeout(r, 500 * 2 ** i));
    }
  }
}

async function cjkFont(text: string) {
  const family = HANGUL.test(text)
    ? "Noto Sans KR"
    : CJK.test(text)
      ? "Noto Sans JP"
      : null;
  if (!family) return undefined;

  const css = await fetchWithRetry(
    `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, "+")}:wght@800&text=${encodeURIComponent(text)}`,
  ).then((r) => r.text());
  const src = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/);
  if (!src) throw new Error(`OG: no ${family} subset for "${text}"`);
  const data = await fetchWithRetry(src[1]).then((r) => r.arrayBuffer());
  return [
    { name: family, data, weight: 800 as const, style: "normal" as const },
  ];
}

/**
 * Shared OG-image template, v1 style: green-on-white, wordmark bottom-left
 * (brand/BRAND.md continuity notes). Route files pass a title and optional
 * kicker; everything else is fixed so cards stay uniform across pages.
 */
export async function renderOgImage({
  title,
  kicker = "Leaf Digital",
}: {
  title: string;
  kicker?: string;
}) {
  /* The subset must hold every glyph drawn: the kicker as rendered
   * (uppercased) and the wordmark, not just the title. */
  const fonts = await cjkFont(`${kicker.toUpperCase()}${title}Leaf digital`);
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 80,
        backgroundColor: "#ffffff",
        backgroundImage: "linear-gradient(135deg, #f0fdf4 0%, #ffffff 55%)",
        fontFamily: fonts ? `${fonts[0].name}, sans-serif` : "sans-serif",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "#2e7d32",
          }}
        >
          {kicker}
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 72,
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: -1,
            color: "#111827",
            maxWidth: 980,
          }}
        >
          {title}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          fontSize: 36,
          fontWeight: 700,
          color: "#176639",
        }}
      >
        {/* Simplified leaf mark — ImageResponse can't load local SVG files. */}
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: "50% 0 50% 50%",
            backgroundColor: "#176639",
          }}
        />
        Leaf digital
      </div>
    </div>,
    { ...OG_SIZE, fonts },
  );
}
