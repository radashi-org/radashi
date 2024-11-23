import { type Any, type CompatibleProperty, isFunction } from 'radashi'

/**
 * Cast the `mapping` value into a mapping function.
 *
 * - If `mapping` is a function, it's returned as is.
 * - If `mapping` is a property name, the mapping uses it to retrieve
 *   the property value from a given object.
 * - If `mapping` is nullish, the mapping is `(input: T) => input`.
 *
 * @see https://radashi.js.org/reference/function/castMapping
 * @example
 * ```ts
 * const getName = castMapping('name')
 * const getFullName = castMapping(person => {
 *   return `${person.firstName} ${person.lastName}`
 * })
 *
 * getName({ name: 'John' }) // => 'John'
 * getFullName({ firstName: 'John', lastName: 'Doe' }) // => 'John Doe'
 * ```
 * @version 12.2.0
 */
export function castMapping<TMapping extends Mapping | null | undefined>(
  mapping: TMapping,
): MappingFunction<TMapping> {
  return isFunction(mapping)
    ? mapping
    : mapping != null
      ? <TInput extends MappedInput<TMapping>>(input: TInput) =>
          input[mapping as keyof object] as MappedOutput<TMapping>
      : input => input as MappedOutput<TMapping>
}

/**
 * A value that can be casted with `castMapping`.
 *
 * @see https://radashi.js.org/reference/function/castMapping
 */
export type Mapping<T = any, U = any> =
  | ((arg: T) => U)
  | CompatibleProperty<T, U>

/**
 * A value that can be casted with `castMapping`.
 *
 * @see https://radashi.js.org/reference/function/castMapping
 */
export type OptionalMapping<T = any, U = any> = Mapping<T, U> | null | undefined

/**
 * The input type of a mapping function created with `castMapping`.
 *
 * @see https://radashi.js.org/reference/function/castMapping
 */
export type MappedInput<TMapping, TPropertyValue = any> = TMapping extends (
  arg: infer Arg,
) => any
  ? [Arg] extends [Any]
    ? unknown
    : Arg
  : TMapping extends keyof any
    ?
        | { [P in TMapping]: TPropertyValue }
        | (TMapping extends number ? readonly TPropertyValue[] : never)
    : unknown

/**
 * The return type of a mapping function created with `castMapping`.
 *
 * @see https://radashi.js.org/reference/function/castMapping
 */
export type MappedOutput<TMapping, TInput = any> = TMapping extends (
  data: TInput,
) => infer Result
  ? [Result] extends [Any]
    ? unknown
    : Result
  : [TInput] extends [Any]
    ? unknown
    : TMapping extends null | undefined
      ? TInput
      : TMapping extends keyof TInput
        ? TInput[TMapping]
        : never

/**
 * A mapping function created with `castMapping`.
 *
 * @see https://radashi.js.org/reference/function/castMapping
 */
export type MappingFunction<TMapping extends Mapping | null | undefined> = <
  TInput extends MappedInput<TMapping>,
>(
  input: TInput,
) => MappedOutput<TMapping, TInput>
