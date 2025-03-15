/**
 * Extracts values of a specified property from an array of objects.
 * Returns a new array containing the values of the specified key.
 *
 * @example
 * ```ts
 * interface God {
 *   name: string;
 *   power: number;
 *   domain: string;
 * }
 *
 * const gods: God[] = [
 *   {
 *     name: 'Ra',
 *     power: 100,
 *     domain: 'Sun',
 *   },
 *   {
 *     name: 'Zeus',
 *     power: 98,
 *     domain: 'Lightning',
 *   },
 *   {
 *     name: 'Loki',
 *     power: 72,
 *     domain: 'Tricks',
 *   },
 * ];
 *
 * // Extract single property
 * const names = pluck(gods, 'name');
 * console.log(names); // Output: ['Ra', 'Zeus', 'Loki']
 *
 * // Extract multiple properties
 * const powerDomains = pluck(gods, 'power', 'domain');
 * console.log(powerDomains); // Output: [[100, 'Sun'], [98, 'Lightning'], [72, 'Tricks']]
 *
 * // Extract all properties
 * const allProps = pluck(gods);
 * console.log(allProps); // Output: [['Ra', 100, 'Sun'], ['Zeus', 98, 'Lightning'], ['Loki', 72, 'Tricks']]
 * ```
 */
export function pluck<T extends object, K extends keyof T>(
  array: readonly T[],
  ...keys: K[]
): T[K][] | T[K][][] {
  if (!array || array.length === 0) {
    return []
  }

  if (keys.length === 1) {
    return array.map(item => item[keys[0]])
  }

  if (keys.length === 0) {
    keys = Object.keys(array[0]) as K[]
  }
  return array.map(item => keys.map(key => item[key]))
}
