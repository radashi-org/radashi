import {
  type Comparable,
  type Comparator,
  isFunction,
  type MappedOutput,
  type Mapping,
} from 'radashi'

/**
 * Cast a value into a comparator function.
 *
 * - **Function**: If `mapping` is a function, it maps the input
 *   values to a comparable value.
 * - **Property Name**: If `mapping` is a property name, it maps the
 *   input values to a property of the input values with a comparable
 *   value.
 *
 * Optionally, you can pass a custom `compare` function that receives
 * the mapped values and returns a number. If not provided, values are
 * compared with the `<` and `>` built-in operators. A positive number
 * means the “right value” is greater than the “left value”, a
 * negative number means the “left value” is greater than the “right
 * value”, and 0 means both values are equal.
 *
 * @see https://radashi-org.github.io/reference/casted/castComparator
 * @example
 * ```ts
 * const compareUserNames = castComparator(
 *   (user) => user.name,
 *   (a, b) => a.localeCompare(b),
 * )
 *
 * const users = [
 *   { name: 'John', age: 20 },
 *   { name: 'Jane', age: 25 },
 *   { name: 'Doe', age: 22 },
 * ]
 *
 * users.sort(compareUserNames)
 * // => [Doe, Jane, John]
 * ```
 */
export function castComparator<T, TMapping extends ComparatorMapping<T>>(
  mapping: TMapping,
  compare?: Comparator<MappedOutput<TMapping>>,
): Comparator<T>

export function castComparator(
  mapping: ComparatorMapping<any>,
  compare?: Comparator<any>,
) {
  const map = isFunction(mapping) ? mapping : (obj: any) => obj[mapping]
  return (left: any, right: any) => {
    const mappedLeft = map(left)
    const mappedRight = map(right)
    if (compare) {
      return compare(mappedLeft, mappedRight)
    }
    return mappedLeft > mappedRight ? 1 : mappedLeft < mappedRight ? -1 : 0
  }
}

/**
 * A value that describes how a comparator maps the input values to a
 * comparable value.
 *
 * @see https://radashi-org.github.io/reference/casted/castComparator
 */
export type ComparatorMapping<
  T,
  Compared extends Comparable = Comparable,
> = Mapping<T, Compared>
