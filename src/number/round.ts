/**
 * Computes `number` rounded to `precision`.
 *
 * @param {number} number The number to round.
 * @param {number} [precision=0] The precision to round to.
 * @returns {number} Returns the rounded number.
 *
 *
 * round(123.456)
 * // => 123.5
 *
 * round(1234.56, -2);
 * // => 1200
 *
 *
 */
export function round(value: number, precision?: number): number {
  precision =
    precision == null
      ? 0
      : precision >= 0
        ? Math.min(precision, 307)
        : Math.max(precision, -323)
  const factor = 10 ** precision
  return Math.round(value * factor) / factor
}
