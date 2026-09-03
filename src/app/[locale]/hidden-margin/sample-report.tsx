import { useTranslations } from "next-intl";
import { SAMPLE } from "@/lib/constants";

const rows = ["trailRunner", "tote", "merino", "cap"] as const;

/**
 * A real table, not a grid of divs: four rows of product, blank field, and
 * what the blank costs. The cost column is mono because two of the four are
 * money and the eye should read the column as one thing.
 */
export function SampleReport() {
  const t = useTranslations("hiddenMargin.report");
  const amounts: Partial<Record<(typeof rows)[number], number>> = {
    trailRunner: SAMPLE.report.trailRunnerRevenue,
    tote: SAMPLE.report.toteLeakPerOrder,
  };

  return (
    <div
      data-reveal
      className="border-hairline mt-14 overflow-x-auto rounded-xl border shadow-[0_1px_2px_rgb(23_33_26/0.04),0_12px_32px_rgb(23_33_26/0.05)]"
    >
      <table className="w-full min-w-[640px] border-collapse text-left">
        <thead>
          <tr className="text-ink-faint bg-surface-muted text-[12px] font-bold tracking-[0.05em] uppercase">
            <th scope="col" className="w-[37.14%] px-7 py-3.5">
              {t("colProduct")}
            </th>
            <th scope="col" className="w-[28.57%] px-7 py-3.5">
              {t("colMissing")}
            </th>
            <th scope="col" className="px-7 py-3.5">
              {t("colCost")}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((key) => (
            <tr key={key} className="border-hairline-soft border-t text-sm">
              <th
                scope="row"
                className="px-7 py-4.5 text-left font-semibold text-balance"
              >
                {t(`${key}.product`)}
              </th>
              <td className="text-ink-faint px-7 py-4.5">
                {t(`${key}.missing`)}
              </td>
              <td className="px-7 py-4.5 font-mono tabular-nums">
                {t(`${key}.cost`, { amount: amounts[key] ?? 0 })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
