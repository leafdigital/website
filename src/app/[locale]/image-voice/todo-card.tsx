import { useTranslations } from "next-intl";

const tasks = ["one", "two", "three", "four"] as const;

/**
 * The to-do list every store already has, with the same line rewritten four
 * quarters running. The strikes are the argument: they draw themselves as
 * you scroll past, one after another, so the deferral happens in front of
 * you rather than being asserted. Then the one row that does get checked
 * lands last — and it is a four-minute scan, not the job itself.
 *
 * The strike spans are decoration on top of text that is already in the DOM
 * and already muted, so they are `aria-hidden`; a screen reader gets the
 * four tasks and the checked row, which is the whole content of the joke.
 */
export function TodoCard() {
  const t = useTranslations("imageVoice.task");

  return (
    <figure className="mx-auto mt-16 flex max-w-[520px] flex-col gap-3.5 sm:mt-[84px]">
      <div
        data-reveal
        className="border-hairline bg-card shadow-card-lifted rounded-xl border px-7 py-6"
      >
        <p className="text-caption text-ink-faint mb-3 font-bold tracking-[0.06em] uppercase">
          {t("listLabel")}
        </p>
        <ul>
          {tasks.map((key, i) => (
            <li
              key={key}
              className="border-hairline-soft flex items-center gap-3 border-t py-3"
            >
              <span
                aria-hidden="true"
                className="border-ink/25 size-4 flex-none rounded-[5px] border-[1.5px]"
              />
              {/*
               * Staggered by delay rather than by four separate triggers:
               * the card is short enough that all four cross the viewport
               * line together, so a shared trigger and offset delays are
               * what actually produce the cascade.
               */}
              {/* Two spans, not one: the outer is a flex item and would be
                  blockified, and a blockified box has no line fragments for
                  the strike to clone onto. The inner one stays inline. */}
              <span className="text-ink-faint text-[15px]">
                <span
                  data-reveal
                  data-motion="strike-text"
                  style={
                    { "--reveal-delay": `${i * 140}ms` } as React.CSSProperties
                  }
                >
                  {t(`${key}.task`)}
                </span>
              </span>
              <span className="text-ink-faint ml-auto flex-none font-mono text-[11.5px]">
                {t(`${key}.tag`)}
              </span>
            </li>
          ))}
        </ul>
        <p
          data-reveal
          data-motion="pop"
          className="border-brand-800/30 bg-brand-50 mt-3 flex items-center gap-3 rounded-lg border px-4 py-3.5 shadow-[0_6px_20px_rgb(46_125_50/0.15)] [--reveal-delay:600ms]"
        >
          <span
            aria-hidden="true"
            className="bg-primary flex size-4 flex-none items-center justify-center rounded-[5px]"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path
                d="M1.5 5.5L4 8L8.5 2.5"
                stroke="#ffffff"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="text-[15px] font-semibold">{t("done")}</span>
          <span className="text-brand-800 ml-auto flex-none font-mono text-[11.5px] font-semibold">
            {t("doneTime")}
          </span>
        </p>
      </div>
      <figcaption className="text-caption text-ink-faint text-center">
        {t("caption")}
      </figcaption>
    </figure>
  );
}
