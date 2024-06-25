import { isString } from './isString'

export const isIntString = (value: any): value is string => {
  if (!isString(value)) return false
  const num = +value
  return Number.isInteger(num) && `${num}` === value
}