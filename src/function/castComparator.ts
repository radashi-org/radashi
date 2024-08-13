import {
  type Comparable,
  type Comparator,
  isArray,
  isFunction,
  isObject,
  type MappedInput,
  type MappedOutput,
  type Mapping,
  type Single,
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
 * @see https://radashi-org.github.io/reference/function/castComparator
 * @example
 * ```ts
 * const compareUserNames = castComparator(
 *   (user) => user.name,
 *   (a, b) => b.localeCompare(a),
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
// Support property name:
//     castComparator('name')
export function castComparator<TMapping extends keyof any>(
  mapping: TMapping,
  compare?: null | undefined,
  reverse?: boolean,
): Comparator<MappedInput<TMapping, Comparable>>

// Support property name and compare fn:
//     castComparator('name', (a: number, b: number) => {…})
export function castComparator<T, TMapping extends Mapping<any, T>>(
  mapping: TMapping,
  compare: Comparator<T>,
  reverse?: boolean,
): Comparator<MappedInput<TMapping, T>>

// Support explicit function type:
//     castComparator((data: TInput) => {…})
export function castComparator<TInput, TOutput = Comparable>(
  mapping: (data: TInput) => TOutput,
  compare?: Comparator<TOutput> | null,
  reverse?: boolean,
): Comparator<TInput>

// Support explicit input type parameter:
//     castComparator<TInput>(…)
export function castComparator<TInput>(
  mapping: ComparatorMapping<TInput>,
  compare?: null | undefined,
  reverse?: boolean,
): Comparator<TInput>

// Handle everything else with this signature.
export function castComparator<TMapping extends ComparatorMapping>(
  mapping: TMapping,
  compare?: Comparator<MappedOutput<TMapping>> | null,
  reverse?: boolean,
): Comparator<MappedInput<Single<TMapping>>>

export function castComparator(
  mapping: ComparatorMapping<any>,
  compare?: Comparator<any> | null,
  reverse?: boolean,
) {
  // For mapping arrays, the first non-zero comparator wins.
  if (isArray(mapping)) {
    const comparators = mapping.map(m =>
      isObject(m) && 'mapping' in m
        ? castComparator(m.mapping, m.compare, m.reverse)
        : castComparator(m),
    )
    return (left: any, right: any) => {
      for (const comparator of comparators) {
        const result = comparator(left, right)
        if (result !== 0) {
          return reverse ? -result : result
        }
      }
      return 0
    }
  }

  const map = isFunction(mapping) ? mapping : (obj: any) => obj[mapping]
  return (left: any, right: any) => {
    const mappedLeft = map(left)
    const mappedRight = map(right)

    const result = compare
      ? compare(mappedLeft, mappedRight)
      : mappedLeft > mappedRight
        ? 1
        : mappedLeft < mappedRight
          ? -1
          : 0

    return reverse ? -result : result
  }
}

/**
 * A value that describes how a comparator maps the input values to a
 * comparable value.
 *
 * @see https://radashi-org.github.io/reference/function/castComparator
 */
export type ComparatorMapping<
  T = any,
  Compared extends Comparable = Comparable,
> =
  | Mapping<T, Compared>
  | readonly (
      | Mapping<T, Compared>
      | ComparatorMappingWithOptions<T, Compared>
    )[]

type ComparatorMappingWithOptions<
  T = any,
  Compared extends Comparable = Comparable,
> = {
  mapping: ComparatorMapping<T, Compared>
  compare?: Comparator<MappedOutput<ComparatorMapping<T, Compared>>>
  reverse?: boolean
}
