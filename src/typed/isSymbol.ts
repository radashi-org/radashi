export function isSymbol(value: any): value is symbol {
  return !!value && value.constructor === Symbol
}
