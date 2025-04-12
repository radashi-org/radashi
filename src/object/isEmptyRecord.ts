/**
 * Checks if a plain object has 0 own keys.
 *
 * @example
 * ```ts
 * isEmptyRecord({}); // => true
 * isEmptyRecord({ a: 1 }); // => false
 * ```
 */
export function isEmptyRecord(record: Record<PropertyKey, unknown>): boolean {
  for (const key in record) {
    if (Object.prototype.hasOwnProperty.call(record, key)) {
      return false
    }
  }
  return true
}
