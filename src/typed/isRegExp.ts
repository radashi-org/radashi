import { isTagged } from 'radashi'

export function isRegExp(value: unknown): value is RegExp {
  return isTagged(value, '[object RegExp]')
}
