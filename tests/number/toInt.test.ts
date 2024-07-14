import * as _ from 'radashi'

describe('toInt', () => {
  test('handles null', () => {
    expect(_.toInt(null)).toBe(0)
  })
  test('uses null default', () => {
    expect(_.toInt('x', null)).toBeNull()
  })
  test('handles undefined', () => {
    expect(_.toInt(undefined)).toBe(0)
  })
  test('handles bad input', () => {
    expect(_.toInt({})).toBe(0)
  })
  test('do not throw on symbols', () => {
    expect(_.toInt(Symbol())).toBe(0)
  })
  test('convert "20" to 20', () => {
    expect(_.toInt('20')).toBe(20)
  })
  test('convert 1.23 to 1', () => {
    expect(_.toInt(1.23)).toBe(1)
  })
  test('convert infinite values to default', () => {
    expect(_.toInt(Number.POSITIVE_INFINITY, 1)).toBe(1)
    expect(_.toInt(Number.NEGATIVE_INFINITY, 1)).toBe(1)
  })
  test('convert NaN to default', () => {
    expect(_.toInt(Number.NaN, 1)).toBe(1)
  })
})
