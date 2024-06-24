import { isNumber } from './isNumber'

export const isFloat = (value: any): value is number => {
  return isNumber(value) && value % 1 !== 0
}
