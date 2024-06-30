/**
 * Like partial but for unary functions that accept a single object
 * argument
 */
export function partob<T, K, PartialArgs extends Partial<T>>(
  fn: (args: T) => K,
  argobj: PartialArgs,
): (restobj: Omit<T, keyof PartialArgs>) => K {
  return restobj => fn({ ...argobj, ...restobj } as T)
}
