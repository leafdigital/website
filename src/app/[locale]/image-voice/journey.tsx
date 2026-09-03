import { useTranslations } from "next-intl";
import { Kicker } from "@/components/layout/section";
import { SAMPLE } from "@/lib/constants";

/**
 * The promises, told as a timeline instead of a grid.
 *
 * A card grid says "here are eleven features" and gets skimmed as a list of
 * eleven. The same sentences hung off a spine, under four chapters, say
 * "here is what happens to you, in order" — and the order is the argument:
 * everything up to chapter IV happens before any money moves.
 *
 * Each chapter's roman numeral is set in mono deliberately. Geist Sans
 * renders "I" as a bare vertical bar, which at 124px and 14% opacity reads
 * as a stray rule rather than a numeral.
 */
const chapters = [
  {
    key: "chapterOne",
    numeral: "I",
    beats: ["one", "two"],
  },
  {
    key: "chapterTwo",
    numeral: "II",
    beats: ["three", "four", "six"],
    /* The limits aside closes chapter II because that is the chapter where
     * the app touches the store — the moment the question occurs to you. */
    limits: true,
  },
  {
    key: "chapterThree",
    numeral: "III",
    beats: ["eight", "nine", "five", "ten"],
  },
  {
    key: "chapterFour",
    numeral: "IV",
    beats: ["eleven"],
  },
] as const;

export function Journey() {
  const t = useTranslations("imageVoice.benefits");
  const { silentImages, bulkRemaining } = SAMPLE;

  return (
    <div className="mt-16">
      {chapters.map((chapter) => (
        <div
          key={chapter.key}
          className="border-hairline-soft grid gap-10 border-t py-12 last:border-b md:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] md:gap-[72px] md:py-[76px]"
        >
          {/* The rail holds its chapter while the beats scroll past it. */}
          <div className="flex flex-col gap-3 md:sticky md:top-[130px] md:self-start">
            <span
              aria-hidden="true"
              className="text-brand-800/14 font-mono text-[84px] leading-[0.85] font-bold tracking-[-0.06em] md:text-[124px]"
            >
              {chapter.numeral}
            </span>
            <span
              aria-hidden="true"
              className="bg-brand-800/45 mt-1 h-px w-11"
            />
            <Kicker>{t(`${chapter.key}.label`)}</Kicker>
            <p className="text-ink-faint text-[15px] leading-[1.5]">
              {t(`${chapter.key}.note`)}
            </p>
          </div>

          <div className="relative flex flex-col gap-12 pl-11 sm:gap-14">
            {/* The thread the beats hang from — drawn, not printed. */}
            <span
              aria-hidden="true"
              data-reveal
              data-motion="spine"
              className="absolute top-2 bottom-2 left-0 w-px bg-linear-to-b from-[rgb(46_125_50/0.45)] to-[rgb(23_33_26/0.06)]"
            />
            {chapter.beats.map((beat) => (
              <div
                key={beat}
                data-reveal
                className="relative flex flex-col gap-2.5"
              >
                <span
                  aria-hidden="true"
                  data-reveal
                  data-motion="dot"
                  className="bg-primary absolute top-[13px] -left-[48.5px] size-[9px] rounded-full shadow-[0_0_0_5px_var(--color-background)] [--reveal-delay:140ms]"
                />
                <h3 className="text-[26px] tracking-[-0.02em]">
                  {t(`${beat}.title`)}
                </h3>
                <p className="text-muted-foreground max-w-[560px] leading-[1.6]">
                  {t(`${beat}.body`, {
                    silent: silentImages,
                    remaining: bulkRemaining,
                  })}
                </p>
              </div>
            ))}
            {"limits" in chapter && chapter.limits ? (
              /* Dashed, not solid: this is the one block on the page that is
               * an aside to the argument rather than a step in it. */
              <aside
                data-reveal
                className="border-ink/18 bg-surface-muted flex max-w-[600px] flex-col gap-2 rounded-lg border border-dashed px-6 py-6"
              >
                <h3 className="text-[17px] tracking-[-0.01em]">
                  {t("limits.title")}
                </h3>
                <p className="text-muted-foreground text-[15px] leading-[1.6]">
                  {t("limits.body")}
                </p>
              </aside>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}
