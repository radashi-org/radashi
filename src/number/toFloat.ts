export function toFloat<T extends number | null = number>(
  value: any,
  defaultValue?: T,
): number | T {
  const def = defaultValue === undefined ? 0.0 : defaultValue
  if (value === null || value === undefined) {
    return def
  }
  const result = Number.parseFloat(value)
  return Number.isNaN(result) ? def : result
}
