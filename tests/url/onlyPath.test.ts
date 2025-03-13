import { onlyPath } from 'radashi'

describe('onlyPath', () => {
  test('should return the path without query and fragment', () => {
    expect(onlyPath('/path')).toBe('/path')
  })
  test('should return the path without query and fragment when query is present', () => {
    expect(onlyPath('/path?query=thing')).toBe('/path')
  })
  test('should return the path without query and fragment when fragment is present', () => {
    expect(onlyPath('/path#fragment')).toBe('/path')
  })
  test('should return the path without query and fragment when both query and fragment are present', () => {
    expect(onlyPath('/path?query=thing#fragment')).toBe('/path')
  })
  test('should return undefined if input is undefined', () => {
    expect(onlyPath(undefined)).toBe(undefined)
  })
  test('should return null if input is null', () => {
    expect(onlyPath(null)).toBe(null)
  })
})
