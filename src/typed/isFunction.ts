// biome-ignore lint/complexity/noBannedTypes:
export function isFunction(value: any): value is Function {
  return !!(value?.constructor && value.call && value.apply)
}
