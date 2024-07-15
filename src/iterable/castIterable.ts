export type CastIterableItem<Input extends object> = Input extends Iterable<
  infer Item
>
  ? Item
  : [string, unknown]

export type CastIterable<Input> = Input extends object
  ? Input extends Iterable<any>
    ? Input
    : Iterable<CastIterableItem<Input>>
  : never

export function castIterable<Input extends object>(
  input: Input,
): CastIterable<Input> {
  return (
    (input as any)[Symbol.iterator] ? input : Object.entries(input)
  ) as CastIterable<Input>
}
