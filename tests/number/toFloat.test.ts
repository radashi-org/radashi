import * as _ from 'radashi'

describe('toFloat', () => {
  test('handles null', () => {
    const result = _.toFloat(null)
    expect(result).toBe(0.0)
  })
  test('handles undefined', () => {
    const result = _.toFloat(undefined)
    expect(result).toBe(0.0)
  })
  test('uses null default', () => {
    const result = _.toFloat('x', null)
    expect(result).toBeNull()
  })
  test('handles bad input', () => {
    const result = _.toFloat({})
    expect(result).toBe(0.0)
  })
  test('do not throw on symbols', () => {
    expect(_.toFloat(Symbol())).toBe(0)
  })
  test('convert "12.34" to 12.34', () => {
    expect(_.toFloat('12.34')).toBe(12.34)
  })
  test('preserve infinite values', () => {
    expect(_.toFloat(Number.POSITIVE_INFINITY)).toBe(Number.POSITIVE_INFINITY)
    expect(_.toFloat(Number.NEGATIVE_INFINITY)).toBe(Number.NEGATIVE_INFINITY)
  })
  test('convert NaN to default', () => {
    expect(_.toFloat(Number.NaN, 1)).toBe(1)
  })
})
