import { withLeadingSlash } from 'radashi'

describe('withLeadingSlash', () => {
  test('should return undefined if input is undefined', () => {
    expect(withLeadingSlash(undefined)).toBe(undefined)
  })
  test('should return null if input is null', () => {
    expect(withLeadingSlash(null)).toBe(null)
  })
  test('should do nothing if leading slash is already present', () => {
    expect(withLeadingSlash('/foo')).toBe('/foo')
  })
  test('should add leading slash to an empty string', () => {
    expect(withLeadingSlash('')).toBe('/')
  })
  test('should add leading slash to a string without leading slash', () => {
    expect(withLeadingSlash('text-without-slash')).toBe('/text-without-slash')
  })
  test('should do nothing if input is a string of slashes', () => {
    expect(withLeadingSlash('/////////')).toBe('/////////')
  })
  test('should do nothing if input is a single slash', () => {
    expect(withLeadingSlash('/')).toBe('/')
  })
})
