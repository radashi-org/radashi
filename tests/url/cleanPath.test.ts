import { cleanPath } from 'radashi'

describe('cleanPath', () => {
  test('should remove duplicate slashes', () => {
    expect(cleanPath('/path//to///resource')).toBe('/path/to/resource')
  })
  test('should handle URLs with protocol correctly', () => {
    expect(cleanPath('http://example.com//path//to///resource')).toBe(
      'http://example.com/path/to/resource',
    )
  })
  test('should return undefined if input is undefined', () => {
    expect(cleanPath(undefined)).toBe(undefined)
  })
  test('should return null if input is null', () => {
    expect(cleanPath(null)).toBe(null)
  })
  test('should handle path without duplicate slashes', () => {
    expect(cleanPath('/path/to/resource')).toBe('/path/to/resource')
  })
  test('should handle URLs with fragments and queries', () => {
    expect(cleanPath('/path//to///resource?query=thing#fragment')).toBe(
      '/path/to/resource?query=thing#fragment',
    )
    expect(
      cleanPath('http://example.com//path//to///resource?query=thing#fragment'),
    ).toBe('http://example.com/path/to/resource?query=thing#fragment')
  })
})
