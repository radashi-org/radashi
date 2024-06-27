// biome-ignore lint/complexity/noBannedTypes:
export function isFunction(value: any): value is Function {
  return typeof value === 'function'
}
