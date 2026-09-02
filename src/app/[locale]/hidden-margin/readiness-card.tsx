import { useTranslations } from "next-intl";
import { SAMPLE } from "@/lib/constants";

const rows = [
  { key: "cost", count: SAMPLE.gaps.missingCost },
  { key: "weight", count: SAMPLE.gaps.missingWeight },
  { key: "customs", count: SAMPLE.gaps.missingCustoms },
] as const;

/**
 * The hero visual: one number a merchant can compare against their peers,
 * then the three gaps that produced it. The bar is decorative — the score
 * is already stated in text beside it, so it carries no ARIA of its own.
 */
export function ReadinessCard() {
  const t = useTranslations("hiddenMargin.score");
  const { readinessScore, benchmarkScore } = SAMPLE;

  return (
    <figure className="w-full">
      <div className="border-hairline bg-card shadow-card flex flex-col gap-[18px] rounded-2xl border p-[30px]">
        <p className="text-fine text-ink-faint font-semibold">{t("label")}</p>
        <div className="flex items-baseline gap-2">
          <span className="text-[60px] leading-none font-extrabold tracking-[-0.03em]">
            {t("value", { score: readinessScore })}
          </span>
          <span className="text-ink-faint text-sm">{t("ready")}</span>
        </div>
        <div
          aria-hidden="true"
          className="bg-ink/8 h-2.5 overflow-hidden rounded-full"
        >
          <div
            className="bg-brand-600 h-full rounded-full"
            style={{ width: `${readinessScore}%` }}
          />
        </div>
        <p className="text-ink-faint text-sm">
          {t.rich("benchmark", {
            benchmark: benchmarkScore,
            lead: (chunks) => (
              <strong className="text-foreground font-semibold">
                {chunks}
              </strong>
            ),
          })}
        </p>
        <dl className="border-hairline-soft flex flex-col gap-2.5 border-t pt-4 text-sm">
          {rows.map((row) => (
            <div key={row.key} className="flex justify-between gap-3">
              <dt>{t(`${row.key}Label`, { count: row.count })}</dt>
              <dd className="text-ink-faint font-mono tabular-nums">
                {t(`${row.key}Note`)}
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <figcaption className="text-caption text-ink-faint mt-3.5 text-center">
        {t("caption")}
      </figcaption>
    </figure>
  );
}
