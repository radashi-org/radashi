export function toArray<T, U = never>(
  value: T,
): T extends readonly (infer U)[] ? U[] : [T]

export function toArray<T>(value: T | readonly T[]): any {
  return Array.isArray(value) ? [...value] : [value]
}
