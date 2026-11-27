// Helpers for the privacy-filtered portfolio data in public/data/.
// Everything here derives from the normalized index series; no absolute amounts.

export interface SeriesPoint {
  date: string; // YYYY-MM-DD, month end
  portfolio: number;
  benchmark: number;
}

const MINUS = "−";

/** 0.172 -> "17.2%"; signed: "+17.2%" / "−8.1%" (true minus sign). */
export function pct(value: number, { signed = false, digits = 1 } = {}): string {
  const abs = Math.abs(value * 100).toFixed(digits);
  if (Number(abs) === 0) return `${(0).toFixed(digits)}%`;
  if (value < 0) return `${MINUS}${abs}%`;
  return `${signed ? "+" : ""}${abs}%`;
}

export function num(value: number, digits = 1): string {
  return value < 0 ? `${MINUS}${Math.abs(value).toFixed(digits)}` : value.toFixed(digits);
}

/** Drawdown from running peak, per point (0 or negative fractions). */
export function drawdowns(series: SeriesPoint[], key: "portfolio" | "benchmark" = "portfolio") {
  let peak = -Infinity;
  return series.map((p) => {
    peak = Math.max(peak, p[key]);
    return { date: p.date, value: p[key] / peak - 1 };
  });
}

/** Month-over-month returns grouped by year: { 2024: [null, 0.018, ...12] }. */
export function monthlyReturns(series: SeriesPoint[]) {
  const byYear = new Map<number, (number | null)[]>();
  for (let i = 1; i < series.length; i++) {
    const [y, m] = series[i].date.split("-").map(Number);
    const r = series[i].portfolio / series[i - 1].portfolio - 1;
    if (!byYear.has(y)) byYear.set(y, Array(12).fill(null));
    byYear.get(y)![m - 1] = r;
  }
  // Year total = compounded available months; chained from the index itself.
  return [...byYear.entries()]
    .sort(([a], [b]) => a - b)
    .map(([year, months]) => ({
      year,
      months,
      total: months.reduce<number>((acc, r) => (r === null ? acc : (1 + acc) * (1 + r) - 1), 0),
    }));
}

export function lastPoint(series: SeriesPoint[]) {
  return series[series.length - 1];
}
