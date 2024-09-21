/**
 * Rounds a number to the given precision. The default `precision` is
 * zero. An optional rounding function (e.g. `Math.floor` or
 * `Math.ceil`) can be provided.
 *
 * The `precision` argument is limited to be within the range of -323
 * to +292. Without this limit, precision values outside this range
 * can result in NaN.
 *
 * @see https://radashi.js.org/reference/number/round
 * @example
 * ```ts
 * round(123.456)
 * // => 123.5
 *
 * round(1234.56, -2)
 * // => 1200
 *
 * round(1234.56, 1, Math.floor)
 * // => 1234.5
 *
 * round(1234.54, 1, Math.ceil)
 * // => 1234.6
 * ```
 * @version 12.2.0
 */
export function round(
  value: number,
  precision?: number,
  toInteger: (value: number) => number = Math.round,
): number {
  if (precision) {
    // Limit the precision to avoid NaN results.
    const p =
      precision > 0 ? Math.min(precision, 292) : Math.max(precision, -323)

    // By using exponential notation, we can avoid floating-point
    // precision issues. The "q" is quantity, "e" is exponent.
    let [q, e] = `${value}e`.split('e')
    ;[q, e] = `${toInteger(+`${q}e${+e + p}`)}e`.split('e')
    return +`${q}e${+e - p}`
  }

  return toInteger(value)
}
