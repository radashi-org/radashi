export const isDate = (value: any): value is Date => {
  return Object.prototype.toString.call(value) === '[object Date]'
}
