/**
 * Cast an array to be an object by mapping each item to a key/value
 * pair.
 *
 * @see https://radashi-org.github.io/reference/transform/castObject
 * @example
 * ```ts
 * castObject([1, 2, 3], (n) => '#' + n)
 * // { '#1': 1, '#2': 2, '#3': 3 }
 *
 * castObject(
 *   [{id: 1, name: 'John'}, {id: 2, name: 'Jane'}],
 *   (obj) => obj.id,
 *   (obj) => obj.name
 * )
 * // { 1: 'John', 2: 'Jane' }
 * ```
 */
export function castObject<T, Key extends string | number | symbol, Value = T>(
  array: readonly T[],
  getKey: (item: T) => Key,
  getValue: (item: T) => Value = item => item as unknown as Value,
  condition: (value: Value, key: Key) => boolean = () => true,
): Record<Key, Value> {
  let key: Key
  let value: Value
  return array.reduce(
    (acc, item) => {
      if (condition((value = getValue(item)), (key = getKey(item)))) {
        acc[key] = value
      }
      return acc
    },
    {} as Record<Key, Value>,
  )
}

/**
 * @deprecated Use `castObject` instead.
 */
export const objectify: typeof castObject = castObject
