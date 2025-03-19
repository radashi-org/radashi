import { withoutTrailingSlash } from 'radashi'

describe('withoutTrailingSlash', () => {
  test('should return undefined if input is undefined', () => {
    expect(withoutTrailingSlash(undefined)).toBe(undefined)
  })
  test('should return null if input is null', () => {
    expect(withoutTrailingSlash(null)).toBe(null)
  })
  test('should remove trailing slash if present', () => {
    expect(withoutTrailingSlash('foo/')).toBe('foo')
  })
  test('should do nothing if input is an empty string', () => {
    expect(withoutTrailingSlash('')).toBe('')
  })
  test('should do nothing if input does not have a trailing slash', () => {
    expect(withoutTrailingSlash('text-without-slash')).toBe(
      'text-without-slash',
    )
  })
  test('should remove last slash if input is a string of slashes', () => {
    expect(withoutTrailingSlash('/////////')).toBe('////////')
  })
  test('should return an empty string if input is a single slash', () => {
    expect(withoutTrailingSlash('/')).toBe('')
  })
})
