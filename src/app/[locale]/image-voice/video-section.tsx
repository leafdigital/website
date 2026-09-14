"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Kicker, Section } from "@/components/layout/section";
import { trackEvent } from "@/lib/analytics";
import {
  APP_VIDEO_DURATION,
  APP_VIDEO_EMBED_URL,
  APP_VIDEO_POSTER,
} from "@/lib/constants";

/**
 * The marketing video, framed the way the rest of the page frames evidence.
 *
 * **Click to play, not embed to play.** A YouTube iframe is roughly half a
 * megabyte of script and a set of advertising cookies, both spent before
 * anyone has decided to watch. So the section ships a poster and a button;
 * the iframe is created by the click that asks for it. Three things fall out
 * of that, and all three are the reason it is built this way:
 *
 *   - the privacy policy stays true. Nothing reaches Google until a visitor
 *     asks it to, so there is no third-party cookie to disclose and nothing
 *     for the consent banner to gate.
 *   - the section costs a 64 KB image instead of the heaviest thing on the
 *     page, which matters directly: this sits second, inside the window the
 *     LCP is measured in.
 *   - the poster is ours. It is served from our own origin, so the fallback
 *     for a blocked or dead embed is still on-brand rather than a grey box.
 *
 * The frame is a dark mat around the player because the video's own ground
 * is `surface-dark` — the mat reads as the film's border rather than as a
 * container someone dropped a YouTube box into.
 */
export function VideoSection() {
  const t = useTranslations("imageVoice.video");
  const [playing, setPlaying] = useState(false);
  /* Set on the first hint of intent — hover, focus, touch — so the DNS,
   * TLS and connection cost of the embed is paid during the moment someone
   * spends moving to the button rather than after they press it. */
  const [warm, setWarm] = useState(false);
  const warmUp = () => setWarm(true);

  return (
    <Section
      id="video"
      tone="wash"
      className="relative isolate scroll-mt-24 overflow-hidden"
    >
      {/* Decoration only: a soft green lift under the frame, so the mat sits
          on the wash rather than on top of it. */}
      <div
        aria-hidden="true"
        className="animate-aurora pointer-events-none absolute top-[22%] left-1/2 -z-10 h-[520px] w-[900px] -translate-x-1/2 rounded-[50%] blur-[44px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(67,160,71,0.16), transparent 72%)",
        }}
      />
      {warm ? (
        <>
          {/* React 19 hoists these into <head>. Rendered rather than
              hard-coded so a visitor who never goes near the player never
              opens a connection to Google at all. */}
          <link rel="preconnect" href="https://www.youtube-nocookie.com" />
          <link rel="preconnect" href="https://www.google.com" />
        </>
      ) : null}

      <div className="mx-auto max-w-[720px] text-center">
        <Kicker data-reveal>{t("kicker")}</Kicker>
        <h2
          data-reveal
          className="sm:text-h2 mt-3.5 text-3xl leading-[1.1] tracking-[-0.03em] [--reveal-delay:80ms]"
        >
          {t("title")}
        </h2>
        <p
          data-reveal
          className="text-muted-foreground mt-3.5 text-lg leading-[1.6] text-pretty [--reveal-delay:160ms]"
        >
          {t("sub")}
        </p>
      </div>

      <figure
        data-reveal
        className="relative mx-auto mt-12 max-w-[920px] [--reveal-delay:240ms] sm:mt-[60px]"
      >
        <div className="border-hairline bg-surface-dark shadow-card-lifted rounded-2xl border p-2 sm:p-2.5">
          <div className="bg-surface-dark relative aspect-video overflow-hidden rounded-xl">
            {playing ? (
              <iframe
                /* `autoplay=1` is honest here: the visitor pressed play,
                 * and the iframe only exists because they did. */
                src={`${APP_VIDEO_EMBED_URL}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                title={t("title")}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="absolute inset-0 size-full border-0"
              />
            ) : (
              <button
                type="button"
                onClick={() => {
                  trackEvent("video_play", { location: "image-voice" });
                  setPlaying(true);
                }}
                onMouseEnter={warmUp}
                onFocus={warmUp}
                onTouchStart={warmUp}
                aria-label={t("play")}
                className="group focus-visible:ring-brand-400 absolute inset-0 size-full cursor-pointer focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:outline-none"
              >
                <Image
                  src={APP_VIDEO_POSTER}
                  alt=""
                  width={1280}
                  height={720}
                  sizes="(max-width: 960px) 100vw, 920px"
                  className="size-full object-cover transition-transform duration-500 ease-[var(--ease-leaf)] group-hover:scale-[1.02]"
                />
                {/* A flat scrim, lifted on hover: it says "this is a film,
                    not a screenshot" and guarantees the button's contrast
                    whatever frame the poster happens to be. Flat rather than
                    a radial pool under the button, which sits exactly where
                    the poster's own headline is and dims the one thing on it
                    worth reading. */}
                <span
                  aria-hidden="true"
                  className="bg-surface-dark/15 absolute inset-0 transition-opacity duration-300 group-hover:opacity-0"
                />
                <span
                  aria-hidden="true"
                  className="bg-brand-600 shadow-cta group-hover:bg-brand-500 absolute top-1/2 left-1/2 flex size-[68px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full ring-1 ring-white/25 transition duration-300 ease-[var(--ease-leaf)] group-hover:scale-105 sm:size-[84px]"
                >
                  {/* Nudged right by a hair: a triangle centred on its
                        bounding box reads as sitting left in a circle. */}
                  <svg
                    viewBox="0 0 24 24"
                    className="ml-[3px] size-7 fill-white sm:size-9"
                  >
                    <path d="M8 5.14v13.72a1 1 0 0 0 1.54.84l10.28-6.86a1 1 0 0 0 0-1.68L9.54 4.3A1 1 0 0 0 8 5.14Z" />
                  </svg>
                </span>
                <span
                  aria-hidden="true"
                  className="text-fine bg-ink/70 absolute right-3 bottom-3 rounded-full px-2.5 py-1 font-semibold text-white backdrop-blur-sm sm:right-4 sm:bottom-4"
                >
                  {APP_VIDEO_DURATION}
                </span>
              </button>
            )}
          </div>
        </div>
        <figcaption className="text-caption text-ink-faint mt-3.5 text-center">
          {t("caption")}
        </figcaption>
      </figure>
    </Section>
  );
}
