export type ToIterableItem<Input extends object> = Input extends Iterable<
  infer Item
>
  ? Item
  : keyof Input extends infer Key
    ? Key extends string & keyof Input
      ? [Key, Input[Key]]
      : never
    : never

export type ToIterable<Input> = Input extends object
  ? Input extends Iterable<any>
    ? Input
    : Iterable<ToIterableItem<Input>>
  : never

export function toIterable<Input extends object>(
  input: Input,
): ToIterable<Input>

export function toIterable(input: object) {
  return Symbol.iterator in input
    ? (input as Iterable<unknown>)
    : Object.entries(input)
}
