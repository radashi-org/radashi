export function castArray<T, U = never>(
  value: T,
): T extends readonly (infer U)[] ? U[] : [T]

export function castArray<T>(value: T | readonly T[]): any {
  return Array.isArray(value) ? value.slice() : [value]
}
