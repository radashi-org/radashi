export function isString(value: any): value is string {
  return typeof value === 'string' || value instanceof String
}
