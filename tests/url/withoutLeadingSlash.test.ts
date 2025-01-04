import { withoutLeadingSlash } from 'radashi'

describe('withoutLeadingSlash', () => {
  test('should return undefined if input is undefined', () => {
    expect(withoutLeadingSlash(undefined)).toBe(undefined)
  })
  test('should return null if input is null', () => {
    expect(withoutLeadingSlash(null)).toBe(null)
  })
  test('should remove leading slash if present', () => {
    expect(withoutLeadingSlash('/foo')).toBe('foo')
  })
  test('should do nothing if input is an empty string', () => {
    expect(withoutLeadingSlash('')).toBe('')
  })
  test('should do nothing if input does not have a leading slash', () => {
    expect(withoutLeadingSlash('text-without-slash')).toBe('text-without-slash')
  })
  test('should remove first slash if input is a string of slashes', () => {
    expect(withoutLeadingSlash('/////////')).toBe('////////')
  })
  test('should return an empty string if input is a single slash', () => {
    expect(withoutLeadingSlash('/')).toBe('')
  })
})
