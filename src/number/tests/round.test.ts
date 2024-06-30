import * as _ from 'radashi'

describe('round function', () => {
  test('rounds to default precision (2 decimal places)', () => {
    expect(_.round(123.456)).toBe(123.46)
    expect(_.round(987.654321)).toBe(987.65)
    expect(_.round(0.123456789)).toBe(0.12)
  })

  test('rounds to specified precision', () => {
    expect(_.round(123.456, 0)).toBe(123)
    expect(_.round(987.654, 3)).toBe(987.654)
  })

  test('handles negative precisions', () => {
    expect(_.round(123.456, -1)).toBe(120)
    expect(_.round(123.456, -2)).toBe(100)
    expect(_.round(987.654, -2)).toBe(1000)
  })

  test('handles zero precision', () => {
    expect(_.round(123.456, 0)).toBe(123)
    expect(_.round(987.654, 0)).toBe(988)
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
})
