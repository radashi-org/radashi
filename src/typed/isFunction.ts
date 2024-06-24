export const isFunction = (value: any): value is Function => {
  return !!(value && value.constructor && value.call && value.apply)
}
