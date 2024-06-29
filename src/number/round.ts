/**
 * Computes `number` rounded to `precision`.
 *
 * @param {number} number The number to round.
 * @param {number} [precision=2] The precision to round to.
 * @returns {number} Returns the rounded number.
 * @example
 *
 * round(4.006)
 * // => 4.01
 *
 */
export function round<T extends number | null = number>(
    value: any,
    precision: number = 2,
): number | T {
    if (value === null || value === undefined ) {
      return 0
    }
    
    const result = Number.parseFloat(value);

    if (Number.isNaN(result)) {
        return NaN;
    }

    const factor = 10 ** precision;
    return Math.round(result * factor) / factor;
  }
  