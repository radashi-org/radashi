export const isNumber = (value: any): value is number => {
  try {
    return Number(value) === value
  } catch {
    return false
  }
}
