import { isTagged } from 'radashi'

export function isDate(value: unknown): value is Date {
  return isTagged(value, '[object Date]')
}
