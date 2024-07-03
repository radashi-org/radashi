import { isTagged } from 'radashi'

export function isWeakMap<K extends WeakKey = WeakKey, V = unknown>(
  value: unknown,
): value is WeakMap<K, V> {
  return isTagged(value, '[object WeakMap]')
}
