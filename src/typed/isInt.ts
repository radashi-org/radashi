import { isNumber } from 'radashi'

export function isInt(value: any): value is number {
  return isNumber(value) && value % 1 === 0
}
