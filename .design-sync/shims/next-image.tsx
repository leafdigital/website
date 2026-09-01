// Stands in for `next/image` when the components are bundled for Claude Design
// (see next-link.tsx for why). Renders a plain <img>; the Next-only
// optimization props are accepted and dropped so callers need no changes.
//
// Components reference site assets by absolute path ("/brand/leaf-logo.svg"),
// which resolves against a Next server that does not exist here. Those files
// are inlined as data URIs instead, so a preview shows the real artwork rather
// than a broken image. Add a line per asset when a component starts using one.
/* eslint-disable @typescript-eslint/no-unused-vars, @next/next/no-img-element, jsx-a11y/alt-text --
   this shim exists to replace next/image with a plain <img>: the Next-only
   props are destructured so they are not forwarded, and `alt` reaches the
   element through {...rest} from the caller. */
import * as React from "react";
import leafLogo from "../public/brand/leaf-logo.svg";

const PUBLIC_ASSETS: Record<string, string> = {
  "/brand/leaf-logo.svg": leafLogo,
};

type ImageProps = Omit<React.ComponentPropsWithoutRef<"img">, "src"> & {
  src: string | { src: string };
  fill?: boolean;
  priority?: boolean;
  quality?: number;
  placeholder?: string;
  blurDataURL?: string;
  unoptimized?: boolean;
  loader?: unknown;
};

const Image = React.forwardRef<HTMLImageElement, ImageProps>(function Image(
  {
    src,
    fill,
    priority,
    quality,
    placeholder,
    blurDataURL,
    unoptimized,
    loader,
    style,
    ...rest
  },
  ref,
) {
  const raw = typeof src === "string" ? src : src?.src;
  const url = (raw && PUBLIC_ASSETS[raw]) ?? raw;
  return (
    <img
      ref={ref}
      src={url}
      style={
        fill
          ? {
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              ...style,
            }
          : style
      }
      {...rest}
    />
  );
});

export default Image;
