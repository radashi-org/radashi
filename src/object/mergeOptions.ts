type NonNull<T> = {} & T

type Expand<T> = T extends object ? { [K in keyof T]: Expand<T[K]> } : T

type UndefinedToPartial<T> = T extends object
  ? undefined extends T
    ? Partial<Omit<T, undefined>>
    : T
  : T

type MergeObjects<A extends object, B extends object> = {
  [K in keyof A | keyof B]: K extends keyof B
    ? B[K]
    : K extends keyof A
      ? A[K]
      : never
}

export type MergeOptions<
  A extends object | undefined,
  B extends object | undefined,
> = [A, B] extends [undefined, undefined]
  ? undefined
  : [A] extends [undefined]
    ? Expand<NonNull<B>>
    : [B] extends [undefined]
      ? Expand<NonNull<A>>
      : Expand<MergeObjects<UndefinedToPartial<NonNullable<A>>, NonNullable<B>>>

export function mergeOptions<
  A extends object | undefined,
  B extends object | undefined,
>(a: A, b: B): MergeOptions<A, B>

export function mergeOptions(
  a: object | undefined,
  b: object | undefined,
): object | undefined {
  if (a === undefined) {
    return b
  }
  if (b === undefined) {
    return a
  }
  return { ...a, ...b }
}
