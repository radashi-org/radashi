export function castArrayIfExists<T>(
  value: T | readonly T[],
): T extends any[]
  ? T[number][]
  : T extends readonly any[]
    ? readonly T[number][]
    : Exclude<T, null | undefined>[] | undefined

export function castArrayIfExists<T>(value: T | readonly T[]): any {
  return Array.isArray(value)
    ? value.slice()
    : value != null
      ? [value]
      : undefined
}
