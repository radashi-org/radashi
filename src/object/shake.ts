/**
 * Removes (shakes out) undefined entries from an object. Optional
 * second argument shakes out values by custom evaluation.
 */
export const shake = <T extends object>(
  obj: T,
  filter = (value: T[keyof T]): boolean => value === undefined
): T => {
  if (!obj) return {} as T
  const keys = Object.keys(obj) as (keyof T)[]
  return keys.reduce((acc, key) => {
    if (!filter(obj[key])) {
      acc[key] = obj[key]
    }
    return acc
  }, {} as T)
}
