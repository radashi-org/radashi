import { isTagged } from 'radashi'

export function isWeakSet<T extends WeakKey = WeakKey>(
  value: unknown,
): value is WeakSet<T> {
  return isTagged(value, '[object WeakSet]')
}
