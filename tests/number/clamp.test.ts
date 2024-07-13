import * as _ from 'radashi'

describe('clamp', () => {
  test('clamps a number within the given range', () => {
    expect(_.clamp(5, 1, 10)).toBe(5)
    expect(_.clamp(0, 1, 10)).toBe(1)
    expect(_.clamp(15, 1, 10)).toBe(10)
  })
  test('handles min being null or undefined', () => {
    expect(_.clamp(5, null, 10)).toBe(5)
    expect(_.clamp(15, null, 10)).toBe(10)
    expect(_.clamp(5, undefined, 10)).toBe(5)
    expect(_.clamp(15, undefined, 10)).toBe(10)
  })
  test('handles max being null or undefined', () => {
    expect(_.clamp(5, 1, null)).toBe(5)
    expect(_.clamp(0, 1, null)).toBe(1)
    expect(_.clamp(5, 1, undefined)).toBe(5)
    expect(_.clamp(0, 1, undefined)).toBe(1)
  })
  test('handles both min and max being null or undefined', () => {
    expect(_.clamp(5, null, null)).toBe(5)
    expect(_.clamp(5, undefined, undefined)).toBe(5)
    expect(_.clamp(-10, null, undefined)).toBe(-10)
    expect(_.clamp(100, undefined, null)).toBe(100)
  })
  test('handles edge cases', () => {
    expect(_.clamp(Number.POSITIVE_INFINITY, 1, 10)).toBe(10)
    expect(_.clamp(Number.NEGATIVE_INFINITY, 1, 10)).toBe(1)
    expect(_.clamp(Number.NaN, 1, 10)).toBe(Number.NaN)
  })
  test('throw on invalid range', () => {
    expect(() => _.clamp(5, 10, 1)).toThrow('invalid clamp range')
  })
})
