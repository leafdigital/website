import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

const steps = ["connect", "shadow", "run"] as const;

/**
 * The plan, as a descent rather than a row.
 *
 * Three steps side by side are three options; three steps hung off a line
 * that draws itself downward are a sequence you are being walked through —
 * and this page's whole argument is that the order matters (you do not get
 * autonomy until the shadow month has paid for it). The steps alternate
 * across the spine so the eye has to travel, which is the point.
 *
 * On a phone the spine moves to the left edge and every step sits to the
 * right of it: an alternating layout in a 320px column is just a ragged one.
 */
export function PlanTimeline() {
  const t = useTranslations("home.plan");

  return (
    <div className="relative mx-auto mt-14 max-w-[920px] sm:mt-16">
      {/*
       * The thread. It stops short at both ends so it runs between the first
       * and last chips rather than past them — 58px is half a chip plus the
       * row's padding. Decoration; the sequence is carried by the <ol>.
       */}
      <span
        aria-hidden="true"
        data-reveal
        data-motion="spine"
        className="absolute top-[58px] bottom-[58px] left-6 -ml-px w-px bg-linear-to-b from-[rgb(46_125_50/0.5)] to-[rgb(23_33_26/0.08)] md:left-1/2"
      />
      <ol>
        {steps.map((key, i) => {
          /* Odd steps sit right of the spine, even steps left of it. */
          const right = i % 2 === 1;
          return (
            <li
              key={key}
              className="grid grid-cols-[48px_1fr] items-center gap-6 py-6 md:grid-cols-[1fr_96px_1fr] md:gap-0 md:py-[34px]"
            >
              <span
                aria-hidden="true"
                data-reveal
                data-motion="dot"
                className={cn(
                  "relative z-1 flex size-12 items-center justify-center rounded-lg text-[18px] font-bold md:col-start-2 md:row-start-1 md:mx-auto",
                  /* The ring paints the page ground over the thread, so the
                   * line reads as passing behind the chip. */
                  i === 0
                    ? "bg-primary text-primary-foreground shadow-[0_0_0_10px_var(--color-background),0_4px_14px_rgb(46_125_50/0.3)]"
                    : "bg-brand-50 text-brand-800 shadow-[0_0_0_10px_var(--color-background)]",
                )}
              >
                {i + 1}
              </span>
              <div
                data-reveal
                data-motion={right ? "right" : "left"}
                className={cn(
                  "flex flex-col gap-2 md:row-start-1",
                  right
                    ? "md:col-start-3 md:items-start md:text-left"
                    : "md:col-start-1 md:items-end md:text-right",
                )}
              >
                <h3 className="text-[23px] tracking-[-0.015em]">
                  {t(`${key}.title`)}
                </h3>
                <p className="text-muted-foreground max-w-[360px] leading-[1.6]">
                  {t(`${key}.body`)}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
