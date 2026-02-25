import { withTrailingSlash } from 'radashi'

describe('withTrailingSlash', () => {
  test('should return undefined if input is undefined', () => {
    expect(withTrailingSlash(undefined)).toBe(undefined)
  })
  test('should return null if input is null', () => {
    expect(withTrailingSlash(null)).toBe(null)
  })
  test('should do nothing if trailing slash is already present', () => {
    expect(withTrailingSlash('foo/')).toBe('foo/')
  })
  test('should add trailing slash to an empty string', () => {
    expect(withTrailingSlash('')).toBe('/')
  })
  test('should add trailing slash to a string without trailing slash', () => {
    expect(withTrailingSlash('text-without-slash')).toBe('text-without-slash/')
  })
  test('should do nothing if input is a string of slashes', () => {
    expect(withTrailingSlash('/////////')).toBe('/////////')
  })
  test('should do nothing if input is a single slash', () => {
    expect(withTrailingSlash('/')).toBe('/')
  })
})
