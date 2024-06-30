/**
 * Computes `number` rounded to `precision`.
 *
 * @param {number} number The number to round.
 * @param {number} [precision=2] The precision to round to.
 * @returns {number} Returns the rounded number.
 *
 *
 * round(4.006)
 * // => 4.01
 *
 * round(1234.56, -2);
 * // => 1200
 *
 *
 */
export function round(value: number, precision = 2): number {
  const factor = 10 ** precision
  return Math.round(value * factor) / factor
}
