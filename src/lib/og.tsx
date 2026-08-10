import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

/**
 * Shared OG-image template, v1 style: green-on-white, wordmark bottom-left
 * (brand/BRAND.md continuity notes). Route files pass a title and optional
 * kicker; everything else is fixed so cards stay uniform across pages.
 */
export function renderOgImage({
  title,
  kicker = "Leaf Digital",
}: {
  title: string;
  kicker?: string;
}) {
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
        fontFamily: "sans-serif",
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
    OG_SIZE,
  );
}
