import { isTagged } from 'radashi'

export function isObject(value: unknown): value is object {
  return isTagged(value, '[object Object]')
}
