import * as _ from 'radashi'

describe('round function', () => {
  test('rounds to default precision (0 decimal places)', () => {
    expect(_.round(123.456)).toBe(123)
    expect(_.round(987.654321)).toBe(988)
    expect(_.round(0.123456789)).toBe(0)
  })

  test('rounds to specified precision', () => {
    expect(_.round(987.654, 3)).toBe(987.654)
    expect(_.round(1.01, 1000)).toBe(1.01)
  })

  test('handles negative precisions', () => {
    expect(_.round(123.456, -1)).toBe(120)
    expect(_.round(123.456, -2)).toBe(100)
    expect(_.round(987.654, -2)).toBe(1000)
    expect(_.round(987.654, -1000)).toBe(0)
    expect(_.round(1.01, -1000)).toBe(0)
    expect(_.round(1.01, -324)).toBe(0)
  })

  test('handles negative numbers', () => {
    expect(_.round(-123.456, 2)).toBe(-123.46)
    expect(_.round(-987.654, 1)).toBe(-987.7)
    expect(_.round(-0.123456789, 6)).toBe(-0.123457)
  })

  test('handles zero input', () => {
    expect(_.round(0)).toBe(0)
    expect(_.round(0.000000001)).toBe(0)
  })

  test('rounds very small numbers close to zero', () => {
    expect(_.round(0.0000000001, 10)).toBe(0.0000000001)
    expect(_.round(0.00000000005, 10)).toBe(1e-10)
  })

  test('handles infinity and NaN', () => {
    expect(_.round(Number.POSITIVE_INFINITY)).toBe(Number.POSITIVE_INFINITY)
    expect(_.round(Number.NEGATIVE_INFINITY)).toBe(Number.NEGATIVE_INFINITY)
    expect(_.round(Number.NaN)).toBeNaN()
  })

  test('handles extremely large numbers', () => {
    expect(_.round(1e50)).toBe(1e50)
    expect(_.round(1.23456789e50, 5)).toBe(1.23456789e50)
    expect(_.round(1e50, -10)).toBe(1e50)
  })
})
