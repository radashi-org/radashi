import { isFunction, type MappedOutput, type Mapping } from 'radashi'

/**
 * Extracts values from an array of objects based on specified
 * mappings. Useful for extracting multiple properties from an array
 * of objects (e.g. for tabular data). Also supports “computed
 * properties” via mapping functions, which can combine and transform
 * values on-the-fly.
 *
 * - If mappings are provided, returns an array of arrays where each
 *   inner array contains the values extracted by applying each
 *   mapping to the corresponding object.
 * - If no mappings are provided, returns an array of arrays
 *   containing all values of each object.
 *
 * @see https://radashi.js.org/reference/array/pluck
 * @example
 * ```ts
 * interface God {
 *   name: string;
 *   power: number;
 *   domain: string;
 * }
 *
 * const gods: God[] = [
 *   { name: 'Ra', power: 100, domain: 'Sun' },
 *   { name: 'Zeus', power: 98, domain: 'Lightning' },
 *   { name: 'Loki', power: 72, domain: 'Tricks' }
 * ];
 *
 * // Extract a set of properties
 * pluck(gods, ['power', 'domain']);
 * // [[100, 'Sun'], [98, 'Lightning'], [72, 'Tricks']]
 *
 * // Extract all properties
 * pluck(gods);
 * // [['Ra', 100, 'Sun'], ['Zeus', 98, 'Lightning'], ['Loki', 72, 'Tricks']]
 * ```
 * @version 12.5.0
 */
export function pluck<T extends object, TMapping extends Mapping<T>>(
  array: readonly T[],
  mappings: readonly TMapping[],
): MappedOutput<TMapping, T>[]

export function pluck<T extends object>(
  array: readonly T[],
  mappings?: readonly Mapping<T>[],
): unknown[]

export function pluck(
  array: readonly object[],
  mappings?: readonly Mapping[],
): unknown[] {
  return array.map(
    mappings
      ? item =>
          mappings.map(mapping =>
            isFunction(mapping) ? mapping(item) : item[mapping as keyof object],
          )
      : Object.values,
  )
}
